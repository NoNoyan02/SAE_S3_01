<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(204);
  exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

require_once __DIR__ . "/../config/db.php";

$input = json_decode(file_get_contents("php://input"), true) ?? [];

/**
 * Champs venant du formulaire donation (adapté à ta capture)
 * - montant (obligatoire)
 * - periodicite: "once" | "monthly" (obligatoire)
 * - email (obligatoire)
 * - civilite, prenom, nom, pays, tel (obligatoires)
 * - adresse, complement_adresse (complement optionnel)
 * - code_postal, ville (obligatoires)
 * - date_naissance (optionnel selon toi)
 * - recu_fiscal: "email" | "courrier" (obligatoire)
 * - mode_paiement: "card" | "paypal" | "gpay" | "virement" (obligatoire)
 * - entreprise: 0/1 (optionnel)
 */

$montant = (float)($input["montant"] ?? 0);
$periodicite = trim($input["periodicite"] ?? ""); // once|monthly
$email = strtolower(trim($input["email"] ?? ""));

$civilite = trim($input["civilite"] ?? "");
$prenom = trim($input["prenom"] ?? "");
$nom = trim($input["nom"] ?? "");
$pays = trim($input["pays"] ?? "FRANCE");
$tel = trim($input["tel"] ?? "");

$adresse = trim($input["adresse"] ?? "");
$complement = trim($input["complement_adresse"] ?? ""); // optionnel
$code_postal = trim($input["code_postal"] ?? "");
$ville = trim($input["ville"] ?? "");

$date_naissance = trim($input["date_naissance"] ?? "");
$recu_fiscal = trim($input["recu_fiscal"] ?? ""); // email|courrier

$mode_paiement = trim($input["mode_paiement"] ?? ""); // card|paypal|gpay|virement
$entreprise = (int)($input["entreprise"] ?? 0);

if ($montant <= 0 || $email === "" || $periodicite === "" || $mode_paiement === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs manquants (montant/email/périodicité/mode_paiement)"]);
  exit;
}

if ($prenom === "" || $nom === "" || $tel === "" || $adresse === "" || $code_postal === "" || $ville === "" || $recu_fiscal === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs manquants (coordonnées)"]);
  exit;
}

try {
  $pdo->beginTransaction();

  // 1) Trouver donateur existant par email (simple)
  // (Tu peux aussi décider phone/email)
  $stmt = $pdo->prepare("SELECT id, donor_number FROM donateurs WHERE email = :email LIMIT 1");
  $stmt->execute([":email" => $email]);
  $donateur = $stmt->fetch();

  if (!$donateur) {
    // 2) Créer donateur
    $donor_number = strtoupper(bin2hex(random_bytes(4))); // ex: 8 hex chars
    // si tu veux un format genre CRF-2026-XXXX, dis-moi

    $stmt = $pdo->prepare("
      INSERT INTO donateurs (
        donor_number, civilite, prenom, nom, email, phone,
        adresse, complement_adresse, code_postal, ville, pays,
        date_naissance, entreprise, recu_fiscal
      )
      VALUES (
        :donor_number, :civilite, :prenom, :nom, :email, :phone,
        :adresse, :complement, :code_postal, :ville, :pays,
        :date_naissance, :entreprise, :recu_fiscal
      )
    ");

    $stmt->execute([
      ":donor_number" => $donor_number,
      ":civilite" => $civilite,
      ":prenom" => $prenom,
      ":nom" => $nom,
      ":email" => $email,
      ":phone" => $tel,
      ":adresse" => $adresse,
      ":complement" => ($complement !== "" ? $complement : null),
      ":code_postal" => $code_postal,
      ":ville" => $ville,
      ":pays" => $pays,
      ":date_naissance" => ($date_naissance !== "" ? $date_naissance : null),
      ":entreprise" => $entreprise,
      ":recu_fiscal" => $recu_fiscal
    ]);

    $donateur_id = (int)$pdo->lastInsertId();
    $donor_number_created = $donor_number;
  } else {
    $donateur_id = (int)$donateur["id"];
    $donor_number_created = $donateur["donor_number"];
  }

  // 3) Créer don
  $stmt = $pdo->prepare("
    INSERT INTO dons (
      donateur_id, montant, periodicite, mode_paiement, statut
    )
    VALUES (:donateur_id, :montant, :periodicite, :mode_paiement, :statut)
  ");

  $stmt->execute([
    ":donateur_id" => $donateur_id,
    ":montant" => $montant,
    ":periodicite" => $periodicite,
    ":mode_paiement" => $mode_paiement,
    ":statut" => "PENDING" // vu que tu ne fais pas un vrai paiement
  ]);

  $don_id = (int)$pdo->lastInsertId();

  $pdo->commit();

  echo json_encode([
    "ok" => true,
    "don_id" => $don_id,
    "donateur_id" => $donateur_id,
    "donor_number" => $donor_number_created,
    "statut" => "PENDING"
  ]);
} catch (Throwable $e) {
  if ($pdo->inTransaction()) $pdo->rollBack();
  http_response_code(500);
  echo json_encode(["error" => "Server error"]);
}

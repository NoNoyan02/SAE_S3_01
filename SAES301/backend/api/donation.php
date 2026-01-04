<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

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

try {
  $input = json_decode(file_get_contents("php://input"), true);

  if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(["error" => "JSON invalide"]);
    exit;
  }

  if (
    !isset($input["donateur"], $input["don"]) ||
    !is_array($input["donateur"]) ||
    !is_array($input["don"])
  ) {
    http_response_code(400);
    echo json_encode(["error" => "Payload invalide (donateur/don manquants)"]);
    exit;
  }

  // ✅ BONNE CLÉ
  $donateur = $input["donateur"];
  $don = $input["don"];

  /* ====== Mapping DONATEURS (colonnes SQL) ====== */
  $email = strtolower(trim($donateur["email"] ?? ""));
  $civilite = trim($donateur["civilite"] ?? ""); // "Madame" | "Monsieur" | "Autre"
  $prenom = trim($donateur["prenom"] ?? "");
  $nom = trim($donateur["nom"] ?? "");
  $telephone = trim($donateur["telephone"] ?? "");
  $adresse = trim($donateur["adresse"] ?? "");
  $code_postal = trim($donateur["code_postal"] ?? "");
  $ville = trim($donateur["ville"] ?? "");
  $pays = trim($donateur["pays"] ?? "");
  $date_naissance = trim($donateur["date_naissance"] ?? "");

  /* ====== Mapping DONS (colonnes SQL) ====== */
  $montant = (float)($don["montant"] ?? 0);
  $frequence = trim($don["frequence"] ?? "");           // "once" | "monthly"
  $moyen_paiement = trim($don["moyen_paiement"] ?? ""); // "card" | "paypal" | ...

  $frequence = trim(strtolower($frequence));
  if (!in_array($frequence, ["once", "monthly"], true)) {
    http_response_code(400);
    echo json_encode(["error" => "Frequence invalide"]);
    exit;
  }


  /* ====== Validations minimales ====== */
  if ($montant <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Montant invalide"]);
    exit;
  }

  if ($frequence === "" || $moyen_paiement === "") {
    http_response_code(400);
    echo json_encode(["error" => "Champs manquants (frequence / moyen_paiement)"]);
    exit;
  }

  if ($email === "" || $civilite === "" || $prenom === "" || $nom === "" || $adresse === "" || $code_postal === "" || $ville === "" || $pays === "") {
    http_response_code(400);
    echo json_encode(["error" => "Champs manquants (coordonnées)"]);
    exit;
  }

  $moyen_paiement = trim(strtolower($moyen_paiement));
  $allowed = ["card", "paypal", "virement", "google-pay-apple-pay"];
  if (!in_array($moyen_paiement, $allowed, true)) {
    http_response_code(400);
    echo json_encode(["error" => "moyen_paiement invalide"]);
    exit;
  }


  // Conversion date_naissance JJ/MM/AAAA -> YYYY-MM-DD
  if ($date_naissance !== "") {
    $dt = DateTime::createFromFormat("d/m/Y", $date_naissance);
    if ($dt === false) {
      http_response_code(400);
      echo json_encode(["error" => "Format de date invalide (attendu JJ/MM/AAAA)"]);
      exit;
    }
    $date_naissance = $dt->format("Y-m-d");
  } else {
    $date_naissance = null;
  }

  $pdo->beginTransaction();

  // 1) Chercher donateur par email
  $stmt = $pdo->prepare("SELECT id, donor_number FROM donateurs WHERE email = :email LIMIT 1");
  $stmt->execute([":email" => $email]);
  $existing = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$existing) {
    // 2) Créer donateur
    $donor_number = strtoupper(bin2hex(random_bytes(4)));

    $stmt = $pdo->prepare("
      INSERT INTO donateurs (
        donor_number, email, civilite, prenom, nom, telephone, adresse,
        code_postal, ville, pays, date_naissance
      ) VALUES (
        :donor_number, :email, :civilite, :prenom, :nom, :telephone, :adresse,
        :code_postal, :ville, :pays, :date_naissance
      )
    ");

    $stmt->execute([
      ":donor_number" => $donor_number,
      ":email" => $email,
      ":civilite" => $civilite,
      ":prenom" => $prenom,
      ":nom" => $nom,
      ":telephone" => ($telephone !== "" ? $telephone : null),
      ":adresse" => $adresse,
      ":code_postal" => $code_postal,
      ":ville" => $ville,
      ":pays" => $pays,
      ":date_naissance" => $date_naissance,
    ]);

    $donateur_id = (int)$pdo->lastInsertId();
    $donor_number_used = $donor_number;
  } else {
    $donateur_id = (int)$existing["id"];
    $donor_number_used = $existing["donor_number"];
  }

  // 3) Créer don
  $stmt = $pdo->prepare("
    INSERT INTO dons (donateur_id, montant, frequence, moyen_paiement)
    VALUES (:donateur_id, :montant, :frequence, :moyen_paiement)
  ");

  $stmt->execute([
    ":donateur_id" => $donateur_id,
    ":montant" => $montant,
    ":frequence" => $frequence,
    ":moyen_paiement" => $moyen_paiement
  ]);

  $don_id = (int)$pdo->lastInsertId();

  $pdo->commit();

  echo json_encode([
    "ok" => true,
    "don_id" => $don_id,
    "donateur_id" => $donateur_id,
    "donor_number" => $donor_number_used
  ]);
} catch (Throwable $e) {
  if (isset($pdo) && $pdo->inTransaction()) {
    $pdo->rollBack();
  }
  http_response_code(500);
  echo json_encode([
    "error" => $e->getMessage(),
    "file"  => $e->getFile(),
    "line"  => $e->getLine()
  ]);
  exit;
}

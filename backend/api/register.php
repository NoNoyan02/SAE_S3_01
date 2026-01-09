<?php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

$donor_number = trim($input["donorNumber"] ?? "");
$full_name = trim($input["nom"] ?? "");
$phone = trim($input["tel"] ?? "");
$email = strtolower(trim($input["email"] ?? ""));
$password = $input["password"] ?? "";

// donorNumber n'est PLUS obligatoire : on en crée un si vide
// if ($donor_number === "") { ... } -> Removed

if ($full_name === "" || $phone === "" || $email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs Manquants (Nom, Tel, Email, Password)"]);
  exit;
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);

try {
  $donateur_id = null;

  if ($donor_number !== "") {
    // CAS 1 : L'utilisateur a fourni un numéro
    $stmt = $pdo->prepare("SELECT id FROM donateurs WHERE donor_number = :dn LIMIT 1");
    $stmt->execute([":dn" => $donor_number]);
    $donateur = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$donateur) {
      http_response_code(404);
      echo json_encode(["error" => "Numéro donateur introuvable"]);
      exit;
    }
    $donateur_id = (int) $donateur["id"];

  } else {
    // CAS 2 : Pas de numéro -> On vérifie si un donateur existe déjà avec cet email
    $stmtCheck = $pdo->prepare("SELECT id, donor_number FROM donateurs WHERE email = :email");
    $stmtCheck->execute([':email' => $email]);
    $existingDonateur = $stmtCheck->fetch(PDO::FETCH_ASSOC);

    if ($existingDonateur) {
        $donateur_id = (int) $existingDonateur['id'];
        // On récupère son numéro s'il en a un
    } else {
        // Sinon, on crée le donateur avec un numéro UNIQUE
        $maxRetries = 5;
        $retryCount = 0;
        $isUnique = false;
        $newDonorNumber = "";

        do {
            $newDonorNumber = strtoupper(bin2hex(random_bytes(4))); 
            
            $stmtCheckNum = $pdo->prepare("SELECT id FROM donateurs WHERE donor_number = :dn");
            $stmtCheckNum->execute([':dn' => $newDonorNumber]);
            if (!$stmtCheckNum->fetch()) {
                $isUnique = true;
            } else {
                $retryCount++;
            }
        } while (!$isUnique && $retryCount < $maxRetries);

        if (!$isUnique) {
             http_response_code(500);
             echo json_encode(["error" => "Erreur interne (génération numéro donateur). Réessayez."]);
             exit;
        }

        // Découpage Nom Prénom (Approximatif)
        $parts = explode(' ', $full_name, 2);
        $prenom = $parts[0] ?? $full_name;
        $nom = $parts[1] ?? ''; 
        if (empty($nom)) {
          $nom = $prenom;
          $prenom = "";
        }

        $stmt = $pdo->prepare("INSERT INTO donateurs (nom, prenom, email, telephone, donor_number) VALUES (:nom, :prenom, :email, :phone, :dn)");
        $stmt->execute([
          ':nom' => $nom,
          ':prenom' => $prenom,
          ':email' => $email,
          ':phone' => $phone,
          ':dn' => $newDonorNumber
        ]);
        $donateur_id = $pdo->lastInsertId();
    }
  }

  // Vérification préalable : Est-ce que ce donateur a DEJA un user associé ?
  $stmtCheckUser = $pdo->prepare("SELECT id FROM users WHERE donateur_id = :did");
  $stmtCheckUser->execute([':did' => $donateur_id]);
  if ($stmtCheckUser->fetch()) {
      http_response_code(409);
      echo json_encode(["error" => "Ce numéro donateur (ou adresse email) est déjà associé à un compte utilisateur."]);
      exit;
  }

  // 2) Créer le user
  $stmt = $pdo->prepare("
    INSERT INTO users (full_name, phone, email, password_hash, donateur_id)
    VALUES (:full_name, :phone, :email, :password_hash, :donateur_id)
  ");

  $stmt->execute([
    ":full_name" => $full_name,
    ":phone" => $phone,
    ":email" => $email,
    ":password_hash" => $password_hash,
    ":donateur_id" => $donateur_id
  ]);

  $userId = $pdo->lastInsertId();

  // Démarrage session immédiat (auto-login)
  session_start();
  setcookie(session_name(), session_id(), [
    'expires' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
  ]);

  $userData = [
      "id" => (int)$userId,
      "full_name" => $full_name,
      "email" => $email,
      "role" => 'Donateur'
  ];
  $_SESSION['user'] = $userData;

  echo json_encode([
    "ok" => true,
    "user" => $userData
  ]);

} catch (PDOException $e) {
  // 23000 = violation contrainte unique (email, phone, donateur_id déjà pris)
  if ((int) $e->getCode() === 23000) {
    http_response_code(409);
    echo json_encode(["error" => "L'e-mail, le numéro de téléphone, ou ce compte donateur est déjà utilisé"]);
    exit;
  }

  http_response_code(500);
  echo json_encode(["error" => "Server error"]);
}

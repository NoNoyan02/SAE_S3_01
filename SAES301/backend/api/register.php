<?php
header("Content-Type: application/json; charset=UTF-8");

// CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Préflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

require_once __DIR__ . "/../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

$donor_number = trim($input["donorNumber"] ?? "");
$full_name = trim($input["nom"] ?? "");
$phone     = trim($input["tel"] ?? "");
$email     = strtolower(trim($input["email"] ?? ""));
$password  = $input["password"] ?? "";

// donorNumber obligatoire pour s'inscrire à l'espace donateur
if ($donor_number === "") {
  http_response_code(400);
  echo json_encode(["error" => "Numéro donateur manquant"]);
  exit;
}

if ($full_name === "" || $phone === "" || $email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs Manquants"]);
  exit;
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);

try {
  // 1) Vérifier que le donor_number existe dans donateurs
  $stmt = $pdo->prepare("SELECT id FROM donateurs WHERE donor_number = :dn LIMIT 1");
  $stmt->execute([":dn" => $donor_number]);
  $donateur = $stmt->fetch(PDO::FETCH_ASSOC);

  if (!$donateur) {
    http_response_code(404);
    echo json_encode(["error" => "Numéro donateur introuvable"]);
    exit;
  }

  $donateur_id = (int)$donateur["id"];

  // 2) Créer le user en liant donateur_id (sans stocker donor_number)
  $stmt = $pdo->prepare("
    INSERT INTO users (full_name, phone, email, password_hash, donateur_id)
    VALUES (:full_name, :phone, :email, :password_hash, :donateur_id)
  ");

  $stmt->execute([
    ":full_name"     => $full_name,
    ":phone"         => $phone,
    ":email"         => $email,
    ":password_hash" => $password_hash,
    ":donateur_id"   => $donateur_id
  ]);

  echo json_encode([
    "ok" => true,
    "user_id" => $pdo->lastInsertId()
  ]);

} catch (PDOException $e) {
  // 23000 = violation contrainte unique (email, phone, donateur_id déjà pris)
  if ((int)$e->getCode() === 23000) {
    http_response_code(409);
    echo json_encode(["error" => "L'e-mail, le numéro de téléphone, ou ce compte donateur est déjà utilisé"]);
    exit;
  }

  http_response_code(500);
  echo json_encode(["error" => "Server error"]);
}

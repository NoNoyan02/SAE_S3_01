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

$full_name = trim($input["nom"] ?? "");
$phone     = trim($input["tel"] ?? "");
$email     = strtolower(trim($input["email"] ?? ""));
$password  = $input["password"] ?? "";

if ($full_name === "" || $phone === "" || $email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs Manquants"]);
  exit;
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);

try {
  $stmt = $pdo->prepare("
    INSERT INTO users (full_name, phone, email, password_hash)
    VALUES (:full_name, :phone, :email, :password_hash)
  ");

  $stmt->execute([
    ":full_name"     => $full_name,
    ":phone"         => $phone,
    ":email"         => $email,
    ":password_hash" => $password_hash
  ]);

  echo json_encode([
    "ok" => true,
    "user_id" => $pdo->lastInsertId()
  ]);

} catch (PDOException $e) {
  if ((int)$e->getCode() === 23000) {
    http_response_code(409);
    echo json_encode(["error" => "L'e-mail ou le numéro de téléphone existe déjà"]);
    exit;
  }

  http_response_code(500);
  echo json_encode(["error" => "Server error"]);
}

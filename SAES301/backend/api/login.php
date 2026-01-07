<?php
// backend/api/login.php

header("Content-Type: application/json; charset=UTF-8");

// CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
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

// Lecture JSON
$input = json_decode(file_get_contents("php://input"), true);
if (!is_array($input)) {
  http_response_code(400);
  echo json_encode(["error" => "Invalid JSON"]);
  exit;
}

$email    = strtolower(trim($input["email"] ?? ""));
$password = (string)($input["password"] ?? "");

if ($email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs Manquants"]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT id, full_name, email, password_hash FROM users WHERE email = :email LIMIT 1");
  $stmt->execute([":email" => $email]);
  $user = $stmt->fetch();

  if (!$user || !password_verify($password, $user["password_hash"])) {
    http_response_code(401);
    echo json_encode(["error" => "Mot de passe ou email incorrect"]);
    exit;
  }

  echo json_encode([
    "ok" => true,
    "user" => [
      "id" => (int)$user["id"],
      "full_name" => $user["full_name"],
      "email" => $user["email"]
    ]
  ]);
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => "Server error"]);
}

<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["error" => "Method not allowed"]);
  exit;
}

require_once __DIR__ . "/../config/db.php";

$input = json_decode(file_get_contents("php://input"), true);

$email    = strtolower(trim($input["email"] ?? ""));
$password = $input["password"] ?? "";

if ($email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Missing fields"]);
  exit;
}

$stmt = $pdo->prepare("SELECT id, full_name, email, password_hash FROM users WHERE email = :email LIMIT 1");
$stmt->execute([":email" => $email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user["password_hash"])) {
  http_response_code(401);
  echo json_encode(["error" => "Invalid credentials"]);
  exit;
}

echo json_encode([
  "ok" => true,
  "user" => [
    "id" => $user["id"],
    "full_name" => $user["full_name"],
    "email" => $user["email"]
  ]
]);

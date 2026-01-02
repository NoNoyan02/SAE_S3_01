<?php
header("Content-Type: application/json");

// CORS (utile si React tourne sur localhost:3000)
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

$full_name = trim($input["full_name"] ?? "");
$phone     = trim($input["phone"] ?? "");
$email     = strtolower(trim($input["email"] ?? ""));
$password  = $input["password"] ?? "";

if ($full_name === "" || $phone === "" || $email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Missing fields"]);
  exit;
}

$password_hash = password_hash($password, PASSWORD_BCRYPT);

try {
    $stmt->execute([
        ":phone" => $phone,
        ":email" => $email,
        ":password_hash" => $password_hash
    ]);

    echo json_encode([
        "ok" => true,
        "user_id" => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {

    // Doublon email ou téléphone (clé UNIQUE)
    if ((int)$e->getCode() === 23000) {
        http_response_code(409);
        echo json_encode([
            "error" => "Email or phone already exists"
        ]);
        exit;
    }

    http_response_code(500);
    echo json_encode([
        "error" => "Server error"
    ]);
}
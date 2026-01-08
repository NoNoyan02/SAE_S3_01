<?php
// backend/api/login.php

require_once __DIR__ . "/security_headers.php"; // En-têtes de sécurité
header("Content-Type: application/json; charset=UTF-8");

// CORS (Si besoin de le garder explicite malgré security_headers)
header("Access-Control-Allow-Origin: http://localhost:3000");
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

// --- RATE LIMITING (Brute Force Protection) ---
$ip_address = $_SERVER['REMOTE_ADDR'];
$limit = 5; // Essais max
$time_window = 15; // Minutes

try {
  // Nettoyer les vieilles tentatives (> 15 min)
  $pdo->query("DELETE FROM login_attempts WHERE last_attempt < DATE_SUB(NOW(), INTERVAL $time_window MINUTE)");

  // Vérifier l'IP actuelle
  $stmt = $pdo->prepare("SELECT attempts, last_attempt FROM login_attempts WHERE ip_address = :ip");
  $stmt->execute([':ip' => $ip_address]);
  $attempt = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($attempt && $attempt['attempts'] >= $limit) {
    http_response_code(429); // Too Many Requests
    echo json_encode(["error" => "Trop de tentatives échouées. Réessayez dans 15 minutes."]);
    exit;
  }

} catch (PDOException $e) {
  // Si erreur table, on continue (fail open ou closed selon politique, ici open pour pas bloquer tout le monde si bug)
  error_log("Rate Limit Error: " . $e->getMessage());
}
// ----------------------------------------------


$input = json_decode(file_get_contents("php://input"), true);
if (!is_array($input)) {
  http_response_code(400);
  echo json_encode(["error" => "Invalid JSON"]);
  exit;
}

$email = strtolower(trim($input["email"] ?? ""));
$password = (string) ($input["password"] ?? "");

if ($email === "" || $password === "") {
  http_response_code(400);
  echo json_encode(["error" => "Champs Manquants"]);
  exit;
}

try {
  $stmt = $pdo->prepare("SELECT u.id, u.full_name, u.email, u.password_hash, r.name as role 
                         FROM users u 
                         LEFT JOIN roles r ON u.role_id = r.id 
                         WHERE u.email = :email 
                         LIMIT 1");
  $stmt->execute([":email" => $email]);
  $user = $stmt->fetch();

  if (!$user || !password_verify($password, $user["password_hash"])) {
    // ÉCHEC LINK -> Enregistrer tentative
    $stmt = $pdo->prepare("INSERT INTO login_attempts (ip_address, attempts, last_attempt) 
                           VALUES (:ip, 1, NOW()) 
                           ON DUPLICATE KEY UPDATE attempts = attempts + 1, last_attempt = NOW()");
    $stmt->execute([':ip' => $ip_address]);

    http_response_code(401);
    echo json_encode(["error" => "Mot de passe ou email incorrect"]);
    exit;
  }

  // SUCCÈS -> Reset tentatives
  $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = :ip")->execute([':ip' => $ip_address]);

  // Start Session SÉCURISÉE
  if (session_status() === PHP_SESSION_NONE) {
    // Configuration des cookies de session (HttpOnly, Secure, SameSite)
    session_set_cookie_params([
      'lifetime' => 0,
      'path' => '/',
      'domain' => 'localhost',
      'secure' => false,
      'httponly' => true,
      'samesite' => 'Lax'
    ]);
    session_start();
  }

  $_SESSION['user'] = [
    "id" => (int) $user["id"],
    "full_name" => $user["full_name"],
    "email" => $user["email"],
    "role" => $user["role"] ?? 'Donateur'
  ];

  // LOG de connexion
  require_once __DIR__ . "/auth_middleware.php";
  logActivity('LOGIN', 'user', $user['id'], "Connexion réussie de " . $user['full_name']);

  echo json_encode([
    "ok" => true,
    "user" => $_SESSION['user']
  ]);

} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => "Server error"]);
}
?>
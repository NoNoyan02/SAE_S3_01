<?php
// backend/api/csrf_token.php
require_once __DIR__ . "/security_headers.php";
require_once __DIR__ . "/auth_middleware.php";

// Démarre la session si ce n'est pas déjà fait
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Content-Type: application/json; charset=UTF-8");

// Générer un token si inexistant
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

echo json_encode(["csrf_token" => $_SESSION['csrf_token']]);
?>
<?php
// backend/api/auth_middleware.php

function checkAdminAuth()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    // Vérifier si l'utilisateur est connecté et si son rôle est 'Admin'
    // Vous pouvez adapter cette logique selon comment vous stockez le rôle en session lors du login.php
    if (!isset($_SESSION['user']) || !isset($_SESSION['user']['role']) || $_SESSION['user']['role'] !== 'Admin') {
        http_response_code(403);
        echo json_encode(["error" => "Rôle insuffisant ou non connecté. Accès refusé."]);
        exit();
    }
}

function verifyCsrfToken()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $headers = apache_request_headers();
    $token = $headers['X-Csrf-Token'] ?? $headers['X-CSRF-TOKEN'] ?? $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;

    if (!$token || empty($_SESSION['csrf_token']) || $token !== $_SESSION['csrf_token']) {
        http_response_code(403);
        echo json_encode(["error" => "Échec de la validation CSRF. Veuillez actualiser la page."]);
        exit();
    }
}
?>
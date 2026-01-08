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
?>
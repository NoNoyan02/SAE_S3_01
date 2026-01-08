<?php
// backend/api/auth_middleware.php

/**
 * Vérifie si l'utilisateur est un Admin
 */
function checkAdminAuth()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['user']) || !isset($_SESSION['user']['role']) || $_SESSION['user']['role'] !== 'Admin') {
        http_response_code(403);
        echo json_encode(["error" => "Réservé aux Administrateurs. Accès refusé."]);
        exit();
    }
}

/**
 * Vérifie si l'utilisateur fait partie du Staff (Admin, Responsables, Collaborateurs)
 * Bloque uniquement les 'Donateur' ou non-connectés
 */
function checkStaffAuth()
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['user']) || !isset($_SESSION['user']['role']) || $_SESSION['user']['role'] === 'Donateur') {
        http_response_code(403);
        echo json_encode(["error" => "Accès réservé au personnel. Accès refusé."]);
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
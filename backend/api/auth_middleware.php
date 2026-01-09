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

/**
 * Enregistre une activité dans la table activity_logs
 */
function logActivity($action_type, $entity_type = null, $entity_id = null, $details = null)
{
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    $userId = $_SESSION['user']['id'] ?? null;
    if (!$userId)
        return false;

    global $pdo;
    if (!$pdo) {
        require_once __DIR__ . '/../config/db.php';
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO activity_logs (user_id, action_type, entity_type, entity_id, details) 
                                VALUES (:user_id, :action_type, :entity_type, :entity_id, :details)");
        $stmt->execute([
            ':user_id' => $userId,
            ':action_type' => $action_type,
            ':entity_type' => $entity_type,
            ':entity_id' => $entity_id,
            ':details' => $details
        ]);
        return true;
    } catch (PDOException $e) {
        // On ne bloque pas l'exécution pour une erreur de log
        return false;
    }
}
?>
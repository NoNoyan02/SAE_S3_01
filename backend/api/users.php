<?php
// backend/api/users.php

require_once __DIR__ . "/security_headers.php";
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

header("Content-Type: application/json; charset=UTF-8");

// Vérification Admin
checkAdminAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Lister tous les utilisateurs (pour Admin)
        try {
            $sql = "SELECT u.id, u.full_name, u.email, u.phone, r.name as role_name, u.role_id, u.donateur_id, u.created_at 
                    FROM users u
                    LEFT JOIN roles r ON u.role_id = r.id
                    ORDER BY u.created_at DESC";
            $stmt = $pdo->query($sql);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        // Modifier le rôle d'un utilisateur
        $input = json_decode(file_get_contents("php://input"), true);
        $userId = $input['id'] ?? null;
        $newRoleId = $input['role_id'] ?? null;

        if (!$userId || !$newRoleId) {
            http_response_code(400);
            echo json_encode(["error" => "ID utilisateur et Role ID requis"]);
            exit;
        }

        try {
            // Empêcher de modifier son propre rôle pour ne pas se bloquer
            // (Optionnel mais recommandé)
            if ($_SESSION['user']['id'] == $userId) {
                http_response_code(400);
                echo json_encode(["error" => "Impossible de modifier son propre rôle depuis cette interface."]);
                exit;
            }

            $stmt = $pdo->prepare("UPDATE users SET role_id = :role_id WHERE id = :id");
            $stmt->execute([':role_id' => $newRoleId, ':id' => $userId]);

            echo json_encode(["message" => "Rôle mis à jour avec succès"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Method Not Allowed"]);
        break;
}
?>
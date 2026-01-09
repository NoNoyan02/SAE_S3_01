<?php
// backend/api/logs.php
require_once __DIR__ . "/security_headers.php";
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

header("Content-Type: application/json; charset=UTF-8");

// Restriction aux Admins uniquement
checkAdminAuth();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Récupérer les 100 derniers logs avec le nom de l'utilisateur
        $sql = "SELECT l.*, u.full_name as user_name 
                FROM activity_logs l
                LEFT JOIN users u ON l.user_id = u.id
                ORDER BY l.created_at DESC
                LIMIT 100";

        $stmt = $pdo->query($sql);
        $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($logs);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de la récupération des logs : " . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Méthode non autorisée"]);
}
?>
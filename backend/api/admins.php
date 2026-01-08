<?php
// backend/api/admins.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkAdminAuth();

try {
    $stmt = $pdo->query("SELECT COUNT(*) as nbAdmins FROM users");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["nbAdmins" => $result['nbAdmins']]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors du comptage : " . $e->getMessage()]);
}
?>
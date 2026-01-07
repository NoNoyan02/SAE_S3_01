<?php
// backend/api/admins.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../config/db.php";

try {
    $stmt = $pdo->query("SELECT COUNT(*) as nbAdmins FROM users");
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["nbAdmins" => $result['nbAdmins']]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors du comptage : " . $e->getMessage()]);
}
?>
<?php
// backend/api/reset_password.php
require_once __DIR__ . "/security_headers.php";
require_once __DIR__ . "/../config/db.php";

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$email = strtolower(trim($input["email"] ?? ""));
$token = $input["token"] ?? "";
$newPassword = $input["password"] ?? "";

if (empty($email) || empty($token) || empty($newPassword)) {
    http_response_code(400);
    echo json_encode(["error" => "Données manquantes"]);
    exit;
}

try {
    // 1. Vérifier Token Validité (< 1 heure)
    $stmt = $pdo->prepare("SELECT id FROM password_resets WHERE email = :email AND token = :token AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
    $stmt->execute([':email' => $email, ':token' => $token]);

    if (!$stmt->fetch()) {
        http_response_code(400);
        echo json_encode(["error" => "Lien invalide ou expiré"]);
        exit;
    }

    // 2. Mettre à jour mot de passe
    $hash = password_hash($newPassword, PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("UPDATE users SET password_hash = :hash WHERE email = :email");
    $stmt->execute([':hash' => $hash, ':email' => $email]);

    // 3. Supprimer le token
    $pdo->prepare("DELETE FROM password_resets WHERE email = :email")->execute([':email' => $email]);

    echo json_encode(["message" => "Mot de passe réinitialisé avec succès !"]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
?>
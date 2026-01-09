<?php
// backend/api/forgot_password.php
require_once __DIR__ . "/security_headers.php";
require_once __DIR__ . "/../config/db.php";

header("Content-Type: application/json; charset=UTF-8");

// CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);
$email = strtolower(trim($input["email"] ?? ""));

if (empty($email)) {
    http_response_code(400);
    echo json_encode(["error" => "Email requis"]);
    exit;
}

try {
    // 1. Vérifier si user existe
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if ($user) {
        // 2. Générer Token
        $token = bin2hex(random_bytes(32));

        // 3. Stocker Token
        // Nettoyer anciens tokens
        $pdo->prepare("DELETE FROM password_resets WHERE email = :email")->execute([':email' => $email]);

        $sql = "INSERT INTO password_resets (email, token, created_at) VALUES (:email, :token, NOW())";
        $pdo->prepare($sql)->execute([':email' => $email, ':token' => $token]);

        // 4. "Envoyer" Email (Simulation)
        // Dans un vrai projet : mail($email, "Reset", "Link: ...");
        // Ici on renvoie le token pour le dev (A NE PAS FAIRE EN PROD STRICTE)
        // Ou on log dans un fichier.
        $resetLink = "http://localhost:3000/reset-password?token=$token&email=" . urlencode($email);
        error_log("RESET LINK FOR $email: $resetLink");
    }

    // On répond TOUJOURS succès pour ne pas fuiter les emails valides (Security best practice)
    echo json_encode(["message" => "Si cet email existe, vous recevrez un lien de réinitialisation."]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur serveur"]);
}
?>
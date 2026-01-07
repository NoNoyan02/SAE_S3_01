<?php
// backend/api/newsletter.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // 1. Récupération des données
        $data = json_decode(file_get_contents("php://input"), true);

        $email = $data['email'] ?? '';
        $acceptConditions = $data['acceptConditions'] ?? false;
        $acceptEntreprise = $data['acceptEntreprise'] ?? false;

        // 2. Validation
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["error" => "Email invalide"]);
            exit();
        }

        if (!$acceptConditions) {
            http_response_code(400);
            echo json_encode(["error" => "Vous devez accepter les conditions."]);
            exit();
        }

        try {
            // 3. Insertion en base (table 'newsletter')
            // On vérifie d'abord si l'email existe déjà
            $check = $pdo->prepare("SELECT id FROM newsletter WHERE email = :email");
            $check->execute([':email' => $email]);
            if ($check->rowCount() > 0) {
                echo json_encode(["message" => "Déjà inscrit !"]);
                exit();
            }

            $sql = "INSERT INTO newsletter (email, accepte_conditions, offre_entreprise, date_inscription) VALUES (:email, :accepte, :entreprise, NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':email' => $email,
                ':accepte' => $acceptConditions ? 1 : 0,
                ':entreprise' => $acceptEntreprise ? 1 : 0
            ]);

            echo json_encode(["message" => "Inscription confirmée !"]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
        }
        break;

    case 'GET':
        // Récupération de la liste pour le Dashboard
        try {
            $stmt = $pdo->query("SELECT * FROM newsletter ORDER BY date_inscription DESC");
            $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($subscribers);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur de récupération : " . $e->getMessage()]);
        }
        break;
}
?>
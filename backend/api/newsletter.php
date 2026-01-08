<?php
// backend/api/newsletter.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkAdminAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        verifyCsrfToken();
        // 1. Récupération des données
        $data = json_decode(file_get_contents("php://input"), true);
        $email = $data['email'] ?? '';
        $acceptConditions = $data['acceptConditions'] ?? false;
        $acceptEntreprise = $data['acceptEntreprise'] ?? false; // Correction variable frontend
        // Support pour "offre_entreprise" si envoyé ainsi
        if (isset($data['offre_entreprise']))
            $acceptEntreprise = $data['offre_entreprise'];

        // ID pour la mise à jour
        $id = $data['id'] ?? null;

        // 2. Validation
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["error" => "Email invalide"]);
            exit();
        }

        try {
            if ($id) {
                // MISE À JOUR (UPDATE)
                $sql = "UPDATE newsletter SET email = :email, accepte_conditions = :accepte, offre_entreprise = :entreprise WHERE id = :id";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([
                    ':email' => $email,
                    ':accepte' => $acceptConditions ? 1 : 0,
                    ':entreprise' => $acceptEntreprise ? 1 : 0,
                    ':id' => $id
                ]);
                echo json_encode(["message" => "Abonné mis à jour !"]);
            } else {
                // CRÉATION (INSERT)
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
            }

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur serveur : " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyCsrfToken();
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant"]);
            exit();
        }
        try {
            $stmt = $pdo->prepare("DELETE FROM newsletter WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(["message" => "Abonné supprimé"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur suppression : " . $e->getMessage()]);
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
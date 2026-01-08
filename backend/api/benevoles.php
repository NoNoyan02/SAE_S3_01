<?php
// backend/api/benevoles.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkAdminAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM benevoles ORDER BY id DESC");
            $benevoles = $stmt->fetchAll();
            echo json_encode($benevoles);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la récupération : " . $e->getMessage()]);
        }
        break;

    case 'POST':
        verifyCsrfToken();
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides"]);
            break;
        }

        try {
            $sql = "INSERT INTO benevoles (nom, prenom, email, telephone, date_naissance, ville, profession, cotisation, disponibilite, regime_alimentaire, restrictions_sante, champs_complementaires) 
                    VALUES (:nom, :prenom, :email, :telephone, :date_naissance, :ville, :profession, :cotisation, :disponibilite, :regime_alimentaire, :restrictions_sante, :champs_complementaires)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nom' => $data['nom'],
                ':prenom' => $data['prenom'],
                ':email' => $data['email'],
                ':telephone' => $data['telephone'],
                ':date_naissance' => $data['dateNaissance'] ?? $data['date_naissance'],
                ':ville' => $data['ville'],
                ':profession' => $data['profession'],
                ':cotisation' => $data['cotisation'],
                ':disponibilite' => $data['dispo'] ?? $data['disponibilite'],
                ':regime_alimentaire' => $data['regime'] ?? $data['regime_alimentaire'],
                ':restrictions_sante' => $data['sante'] ?? $data['restrictions_sante'],
                ':champs_complementaires' => $data['infos'] ?? $data['champs_complementaires']
            ]);

            echo json_encode(["message" => "Bénévole ajouté avec succès", "id" => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout : " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        verifyCsrfToken();
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant"]);
            break;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM benevoles WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(["message" => "Bénévole supprimé"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la suppression : " . $e->getMessage()]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Méthode non autorisée"]);
        break;
}

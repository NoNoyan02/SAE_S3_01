<?php
// backend/api/evenements.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../config/db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM evenements ORDER BY date_debut DESC");
            $data = $stmt->fetchAll();
            echo json_encode($data);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la récupération : " . $e->getMessage()]);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);

        if (!$data) {
            http_response_code(400);
            echo json_encode(["error" => "Données invalides"]);
            break;
        }

        try {
            $sql = "INSERT INTO evenements (type_element, nom_element, date_debut, date_fin, lieu, budget, logistique_materiel, benevoles_inscrits, document_url, notes) 
                    VALUES (:type_element, :nom_element, :date_debut, :date_fin, :lieu, :budget, :logistique_materiel, :benevoles_inscrits, :document_url, :notes)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':type_element' => $data['type'] ?? $data['type_element'],
                ':nom_element' => $data['titre'] ?? $data['nom_element'],
                ':date_debut' => $data['dateDebut'] ?? $data['date_debut'],
                ':date_fin' => $data['dateFin'] ?? $data['date_fin'],
                ':lieu' => $data['lieu'],
                ':budget' => $data['budget'],
                ':logistique_materiel' => $data['materiel'] ?? $data['logistique_materiel'],
                ':benevoles_inscrits' => $data['benevolesInscrits'] ?? $data['benevoles_inscrits'],
                ':document_url' => $data['documents'] ?? $data['document_url'],
                ':notes' => $data['infos'] ?? $data['notes']
            ]);

            echo json_encode(["message" => "Événement ajouté avec succès", "id" => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout : " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant"]);
            break;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM evenements WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(["message" => "Événement supprimé"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la suppression : " . $e->getMessage()]);
        }
        break;
}

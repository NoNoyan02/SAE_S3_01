<?php
// backend/api/evenements.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkStaffAuth();

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
        verifyCsrfToken();
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

            $newId = $pdo->lastInsertId();
            logActivity('CREATE', 'evenement', $newId, "Création de l'élément : " . $data['titre']);

            echo json_encode(["message" => "Événement ajouté avec succès", "id" => $newId]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout : " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyCsrfToken();
        $rawData = file_get_contents("php://input");
        $data = json_decode($rawData, true);
        $id = $data['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant pour la modification"]);
            break;
        }

        try {
            $sql = "UPDATE evenements SET 
                        type_element = :type_element,
                        nom_element = :nom_element,
                        date_debut = :date_debut,
                        date_fin = :date_fin,
                        lieu = :lieu,
                        budget = :budget,
                        logistique_materiel = :logistique_materiel,
                        benevoles_inscrits = :benevoles_inscrits,
                        document_url = :document_url,
                        notes = :notes
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);

            // On s'assure de prendre les bonnes clés (camelCase ou snake_case)
            $type = $data['type'] ?? ($data['type_element'] ?? 'Événement');
            $titre = $data['titre'] ?? ($data['nom_element'] ?? '');
            $dateDebut = $data['dateDebut'] ?? ($data['date_debut'] ?? null);
            $dateFin = $data['dateFin'] ?? ($data['date_fin'] ?? null);
            $lieu = $data['lieu'] ?? null;
            $budget = !empty($data['budget']) ? $data['budget'] : null;
            $materiel = $data['materiel'] ?? ($data['logistique_materiel'] ?? null);
            $beneInscrits = $data['benevolesInscrits'] ?? ($data['benevoles_inscrits'] ?? null);
            $docUrl = $data['documents'] ?? ($data['document_url'] ?? null);
            $notes = $data['infos'] ?? ($data['notes'] ?? null);

            $stmt->execute([
                ':type_element' => $type,
                ':nom_element' => $titre,
                ':date_debut' => $dateDebut,
                ':date_fin' => $dateFin,
                ':lieu' => $lieu,
                ':budget' => $budget,
                ':logistique_materiel' => $materiel,
                ':benevoles_inscrits' => $beneInscrits,
                ':document_url' => $docUrl,
                ':notes' => $notes,
                ':id' => $id
            ]);

            logActivity('UPDATE', 'evenement', $id, "Mise à jour de l'élément : " . $titre);

            echo json_encode(["message" => "Événement mis à jour avec succès"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la modification : " . $e->getMessage()]);
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
            $stmt = $pdo->prepare("DELETE FROM evenements WHERE id = :id");
            $stmt->execute([':id' => $id]);

            logActivity('DELETE', 'evenement', $id, "Suppression de l'élément ID : " . $id);

            echo json_encode(["message" => "Événement supprimé"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la suppression : " . $e->getMessage()]);
        }
        break;
}

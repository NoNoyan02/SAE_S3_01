<?php
// backend/api/subventions.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkStaffAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM subvention ORDER BY id DESC");
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
            $nom = $data['nom'] ?? ($data['nom_aide'] ?? 'Sans nom');
            $sql = "INSERT INTO subvention (nom_aide, organisme, montant, status) 
                    VALUES (:nom_aide, :organisme, :montant, :status)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nom_aide' => $nom,
                ':organisme' => $data['organisme'] ?? '',
                ':montant' => $data['montant'] ?? 0,
                ':status' => $data['status'] ?? 'Reçue'
            ]);

            $newId = $pdo->lastInsertId();
            logActivity('CREATE', 'subvention', $newId, "Création de la subvention : " . $nom);

            echo json_encode(["message" => "Subvention ajoutée avec succès", "id" => $newId]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de l'ajout : " . $e->getMessage()]);
        }
        break;

    case 'PUT':
        verifyCsrfToken();
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data['id'] ?? null;

        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant pour la modification"]);
            break;
        }

        try {
            $sql = "UPDATE subvention SET 
                        nom_aide = :nom_aide,
                        organisme = :organisme,
                        montant = :montant,
                        status = :status
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $nom = $data['nom'] ?? ($data['nom_aide'] ?? '');
            $stmt->execute([
                ':nom_aide' => $nom,
                ':organisme' => $data['organisme'] ?? '',
                ':montant' => !empty($data['montant']) ? $data['montant'] : 0,
                ':status' => $data['status'] ?? 'Reçue',
                ':id' => $id
            ]);

            logActivity('UPDATE', 'subvention', $id, "Mise à jour de la subvention : " . $nom);

            echo json_encode(["message" => "Subvention mise à jour avec succès"]);
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
            $stmt = $pdo->prepare("DELETE FROM subvention WHERE id = :id");
            $stmt->execute([':id' => $id]);

            logActivity('DELETE', 'subvention', $id, "Suppression de la subvention ID : " . $id);

            echo json_encode(["message" => "Subvention supprimée"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la suppression : " . $e->getMessage()]);
        }
        break;
}

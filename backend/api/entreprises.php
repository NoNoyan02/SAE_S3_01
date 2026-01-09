<?php
// backend/api/entreprises.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkStaffAuth();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        try {
            $stmt = $pdo->query("SELECT * FROM entreprise ORDER BY id DESC");
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
            $nom = $data['nom'] ?? ($data['nom_entreprise'] ?? 'Sans nom');
            $sql = "INSERT INTO entreprise (nom_entreprise, contact_nom_prenom, email, telephone) 
                    VALUES (:nom_entreprise, :contact_nom_prenom, :email, :telephone)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nom_entreprise' => $nom,
                ':contact_nom_prenom' => $data['contact'] ?? ($data['contact_nom_prenom'] ?? ''),
                ':email' => $data['email'] ?? '',
                ':telephone' => $data['telephone'] ?? ''
            ]);

            $newId = $pdo->lastInsertId();
            logActivity('CREATE', 'entreprise', $newId, "Création de l'entreprise : " . $nom);

            echo json_encode(["message" => "Entreprise ajoutée avec succès", "id" => $newId]);
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
            $sql = "UPDATE entreprise SET 
                        nom_entreprise = :nom_entreprise,
                        contact_nom_prenom = :contact_nom_prenom,
                        email = :email,
                        telephone = :telephone
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $nom = $data['nom'] ?? ($data['nom_entreprise'] ?? '');
            $stmt->execute([
                ':nom_entreprise' => $nom,
                ':contact_nom_prenom' => $data['contact'] ?? ($data['contact_nom_prenom'] ?? ''),
                ':email' => $data['email'] ?? '',
                ':telephone' => $data['telephone'] ?? '',
                ':id' => $id
            ]);

            logActivity('UPDATE', 'entreprise', $id, "Mise à jour de l'entreprise : " . $nom);

            echo json_encode(["message" => "Entreprise mise à jour avec succès"]);
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
            $stmt = $pdo->prepare("DELETE FROM entreprise WHERE id = :id");
            $stmt->execute([':id' => $id]);

            logActivity('DELETE', 'entreprise', $id, "Suppression de l'entreprise ID : " . $id);

            echo json_encode(["message" => "Entreprise supprimée"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur lors de la suppression : " . $e->getMessage()]);
        }
        break;
}

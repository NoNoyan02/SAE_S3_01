<?php
// backend/api/benevoles.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkStaffAuth();

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
            $nom = $data['nom'] ?? '';
            $prenom = $data['prenom'] ?? '';

            $sql = "INSERT INTO benevoles (nom, prenom, email, telephone, date_naissance, ville, profession, cotisation, disponibilite, regime_alimentaire, restrictions_sante, champs_complementaires) 
                    VALUES (:nom, :prenom, :email, :telephone, :date_naissance, :ville, :profession, :cotisation, :disponibilite, :regime_alimentaire, :restrictions_sante, :champs_complementaires)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':nom' => $nom,
                ':prenom' => $prenom,
                ':email' => $data['email'],
                ':telephone' => $data['telephone'],
                ':date_naissance' => $data['dateNaissance'] ?? ($data['date_naissance'] ?? null),
                ':ville' => $data['ville'],
                ':profession' => $data['profession'],
                ':cotisation' => $data['cotisation'],
                ':disponibilite' => $data['dispo'] ?? ($data['disponibilite'] ?? 'Semaine'),
                ':regime_alimentaire' => $data['regime'] ?? ($data['regime_alimentaire'] ?? null),
                ':restrictions_sante' => $data['sante'] ?? ($data['restrictions_sante'] ?? null),
                ':champs_complementaires' => $data['infos'] ?? ($data['champs_complementaires'] ?? null)
            ]);

            $newId = $pdo->lastInsertId();
            logActivity('CREATE', 'benevole', $newId, "Création du bénévole : " . $nom . " " . $prenom);

            echo json_encode(["message" => "Bénévole ajouté avec succès", "id" => $newId]);
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
            $sql = "UPDATE benevoles SET 
                        nom = :nom,
                        prenom = :prenom,
                        email = :email,
                        telephone = :telephone,
                        date_naissance = :date_naissance,
                        ville = :ville,
                        profession = :profession,
                        cotisation = :cotisation,
                        disponibilite = :disponibilite,
                        regime_alimentaire = :regime_alimentaire,
                        restrictions_sante = :restrictions_sante,
                        champs_complementaires = :champs_complementaires
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);

            $nom = $data['nom'] ?? '';
            $prenom = $data['prenom'] ?? '';
            $email = $data['email'] ?? '';
            $telephone = $data['telephone'] ?? '';
            $dateNaiss = !empty($data['dateNaissance']) ? $data['dateNaissance'] : (!empty($data['date_naissance']) ? $data['date_naissance'] : null);
            $ville = $data['ville'] ?? '';
            $profession = $data['profession'] ?? '';
            $cotisation = $data['cotisation'] ?? 'À jour';
            $dispo = $data['dispo'] ?? ($data['disponibilite'] ?? 'Semaine');
            $regime = $data['regime'] ?? ($data['regime_alimentaire'] ?? null);
            $sante = $data['sante'] ?? ($data['restrictions_sante'] ?? null);
            $infos = $data['infos'] ?? ($data['champs_complementaires'] ?? null);

            $stmt->execute([
                ':nom' => $nom,
                ':prenom' => $prenom,
                ':email' => $email,
                ':telephone' => $telephone,
                ':date_naissance' => $dateNaiss,
                ':ville' => $ville,
                ':profession' => $profession,
                ':cotisation' => $cotisation,
                ':disponibilite' => $dispo,
                ':regime_alimentaire' => $regime,
                ':restrictions_sante' => $sante,
                ':champs_complementaires' => $infos,
                ':id' => $id
            ]);

            logActivity('UPDATE', 'benevole', $id, "Mise à jour du bénévole : " . $nom . " " . $prenom);

            echo json_encode(["message" => "Bénévole mis à jour avec succès"]);
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
            $stmt = $pdo->prepare("DELETE FROM benevoles WHERE id = :id");
            $stmt->execute([':id' => $id]);

            logActivity('DELETE', 'benevole', $id, "Suppression du bénévole ID : " . $id);

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

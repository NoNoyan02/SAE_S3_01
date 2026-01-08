<?php
// backend/api/historique_dons.php
require_once __DIR__ . "/security_headers.php";
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php"; // Pour récupérer la session

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

header("Content-Type: application/json; charset=UTF-8");

// Vérif Auth (soit Admin, soit User connecté)
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["error" => "Non autorisé"]);
    exit;
}

$userRole = $_SESSION['user']['role'] ?? '';
$donateurId = $_SESSION['user']['donateur_id'] ?? null;

try {
    $sql = "SELECT 
                d.id as donateur_id, 
                d.nom, 
                d.prenom, 
                d.email, 
                d.telephone, 
                d.ville, 
                do.id as don_id, 
                do.montant, 
                d.donor_number,
                d.civilite,
                d.adresse,
                d.code_postal,
                d.pays,
                do.frequence,
                do.moyen_paiement,
                do.created_at as date_don 
            FROM donateurs d 
            JOIN dons do ON d.id = do.donateur_id ";

    // Si pas admin, on filtre sur le donateur lié
    if ($userRole !== 'Admin') {
        if (!$donateurId) {
            // User sans profil donateur ? Rien à afficher
            echo json_encode([]);
            exit;
        }
        $sql .= " WHERE d.id = :donateur_id ";
    }

    $sql .= " ORDER BY do.created_at DESC";

    $stmt = $pdo->prepare($sql);

    if ($userRole !== 'Admin') {
        $stmt->execute([':donateur_id' => $donateurId]);
    } else {
        $stmt->execute();
    }

    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la récupération : " . $e->getMessage()]);
}
?>
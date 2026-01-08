<?php
// backend/api/historique_dons.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/../config/db.php";

try {
    // Jointure entre la table 'donateur' et 'dons'
    // On suppose que la clé étrangère est 'id_donateur' dans la table 'dons'
    $sql = "SELECT 
                d.id as donateur_id, 
                d.nom, 
                d.prenom, 
                d.email, 
                d.telephone, 
                d.ville, 
                do.id as don_id, 
                do.montant, 
                do.created_at as date_don 
            FROM donateurs d 
            JOIN dons do ON d.id = do.donateur_id 
            ORDER BY do.created_at DESC";

    $stmt = $pdo->query($sql);
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la récupération : " . $e->getMessage()]);
}
?>
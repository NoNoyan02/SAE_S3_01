<?php
// ### api/donation.php

// 1. Configuration des Headers (CORS & Format)
// En production, remplacez "*" par votre domaine exact (ex: "https://mon-site.com")
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Gestion de la requête préliminaire (Preflight OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Réception des données JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// 3. Validation des données
if (
    empty($data['donateur']['email']) ||
    empty($data['donateur']['prenom']) ||
    empty($data['donateur']['nom']) ||
    empty($data['don']['montant'])
) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Champs obligatoires manquants (Email, Prénom, Nom ou Montant)."]);
    exit();
}

// Nettoyage basique (Sanitization)
$donateur = $data['donateur'];
$don = $data['don'];

$email = filter_var($donateur['email'], FILTER_SANITIZE_EMAIL);
$firstname = htmlspecialchars(strip_tags($donateur['prenom']));
$lastname = htmlspecialchars(strip_tags($donateur['nom']));
$amount = floatval($don['montant']);
$paymentMethod = htmlspecialchars(strip_tags($don['moyen_paiement']));

// Champs adresses (pour le log)
$adresse = isset($donateur['adresse']) ? htmlspecialchars(strip_tags($donateur['adresse'])) : '';
$cp = isset($donateur['code_postal']) ? htmlspecialchars(strip_tags($donateur['code_postal'])) : '';
$ville = isset($donateur['ville']) ? htmlspecialchars(strip_tags($donateur['ville'])) : '';

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Format d'email invalide."]);
    exit();
}

// 4. Logique Métier (Enregistrement BDD)
require_once __DIR__ . "/../config/db.php";

try {
    $pdo->beginTransaction();

    // 1. Vérifier si le donateur existe déjà (par email)
    $stmt = $pdo->prepare("SELECT id FROM donateurs WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $existingDonateur = $stmt->fetch();

    $donateurId = null;

    if ($existingDonateur) {
        $donateurId = $existingDonateur['id'];
        $donorNumber = $existingDonateur['donor_number'];
        // Optionnel : Mettre à jour les infos du donateur
    } else {
        // 2. Créer le donateur
        $donorNumber = strtoupper(bin2hex(random_bytes(4))); // Ex: 797C9A7D
        $sqlDonateur = "INSERT INTO donateurs (nom, prenom, email, telephone, adresse, code_postal, ville, civilite, donor_number) 
                        VALUES (:nom, :prenom, :email, :telephone, :adresse, :code_postal, :ville, :civilite, :donor_number)";
        $stmt = $pdo->prepare($sqlDonateur);
        $stmt->execute([
            ':nom' => $lastname,
            ':prenom' => $firstname,
            ':email' => $email,
            ':telephone' => $donateur['telephone'] ?? null,
            ':adresse' => $donateur['adresse'] ?? null,
            ':code_postal' => $donateur['code_postal'] ?? null,
            ':ville' => $donateur['ville'] ?? null,
            ':civilite' => $donateur['civilite'] ?? null,
            ':donor_number' => $donorNumber
        ]);
        $donateurId = $pdo->lastInsertId();
    }

    // 3. Enregistrer le don
    $sqlDon = "INSERT INTO dons (donateur_id, montant, date_don, moyen_paiement, frequence) 
               VALUES (:donateur_id, :montant, NOW(), :moyen_paiement, :frequence)";
    // Note: donateur_id ou id_donateur ? dans historique_dons c'est id_donateur. Je vais checker historique_dons.php
    // Ah historique_dons.php dit: JOIN dons do ON d.id = do.id_donateur
    // Donc c'est id_donateur
    // 3. Enregistrer le don
    $stmt = $pdo->prepare("INSERT INTO dons (donateur_id, montant, moyen_paiement, frequence) VALUES (:donateur_id, :montant, :moyen_paiement, :frequence)");

    $stmt->execute([
        ':donateur_id' => $donateurId,
        ':montant' => $amount,
        ':moyen_paiement' => $paymentMethod,
        ':frequence' => $don['frequence'] ?? 'once'
    ]);

    $pdo->commit();

    $logEntry = sprintf(
        "[%s] Nouveau don BDD : %s %s - %s€ via %s (%s) | ID Donateur: %s\n",
        date('Y-m-d H:i:s'),
        $firstname,
        $lastname,
        $amount,
        $paymentMethod,
        $email,
        $donateurId
    );

    // Écrire dans les logs du serveur (ne pas faire ça avec des données sensibles de carte bancaire !)
    error_log($logEntry);

    // Simulation d'un délai réseau
    // sleep(1);

    // 5. Réponse Succès
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Don enregistré avec succès. Merci $firstname !",
        "donation_id" => "DON-" . $donateurId,
        "donor_number" => $donorNumber
    ]);

} catch (Exception $e) {
    // Gestion propre des erreurs serveur
    error_log("Erreur Donation : " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Une erreur interne est survenue."]);
}
?>
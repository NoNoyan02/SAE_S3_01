<?php
// backend/api/receipt.php
require_once __DIR__ . "/../config/db.php";

session_start();

$donId = $_GET['id'] ?? null;

if (!$donId || !isset($_SESSION['user'])) {
    die("Accès refusé. Veuillez vous connecter.");
}

$userId = $_SESSION['user']['id'];
$userRole = $_SESSION['user']['role'] ?? '';

try {
    // 1. Récupérer le don et le donateur
    $sql = "SELECT d.id, d.montant, d.date_don, d.moyen_paiement, 
                   do.nom, do.prenom, do.email, do.adresse, do.code_postal, do.ville, do.donor_number,
                   u.id as user_id
            FROM dons d
            JOIN donateurs do ON d.donateur_id = do.id
            LEFT JOIN users u ON u.donateur_id = do.id
            WHERE d.id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $donId]);
    $don = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$don) {
        die("Reçu introuvable.");
    }

    // 2. Vérification Sécurité : Est-ce MON don ou suis-je Admin ?
    // Admin (role 'Admin') ou le propriétaire (user_id match)
    $isAdmin = ($userRole === 'Admin');
    $isOwner = ($don['user_id'] == $userId);

    // Note: Si le compte user n'est pas lié au donateur (cas rare mais possible pour vieux dons),
    // seul l'admin peut voir. Ou alors on check l'email ? 
    // Pour l'instant on garde strict : Owner (via donateur_id linked) or Admin.

    // Si pas admin et pas owner -> bloqué
    if (!$isAdmin && !$isOwner) {
        die("Vous n'avez pas la permission de voir ce reçu.");
    }

    // 3. Affichage HTML propre pour impression
    ?>
    <!DOCTYPE html>
    <html lang="fr">

    <head>
        <meta charset="UTF-8">
        <title>Reçu Fiscal - Don #
            <?php echo $don['id']; ?>
        </title>
        <style>
            body {
                font-family: 'Helvetica', 'Arial', sans-serif;
                color: #333;
                line-height: 1.5;
                padding: 40px;
            }

            .receipt-container {
                max-width: 800px;
                margin: 0 auto;
                border: 1px solid #ddd;
                padding: 40px;
                position: relative;
            }

            .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 2px solid #ED1B24;
                padding-bottom: 20px;
                margin-bottom: 30px;
            }

            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #ED1B24;
                text-transform: uppercase;
            }

            .logo span {
                color: #333;
            }

            .meta {
                text-align: right;
                font-size: 14px;
                color: #666;
            }

            .title {
                text-align: center;
                font-size: 28px;
                font-weight: bold;
                margin-bottom: 40px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            .content {
                display: flex;
                justify-content: space-between;
                margin-bottom: 40px;
            }

            .box {
                width: 45%;
            }

            .box h3 {
                font-size: 14px;
                text-transform: uppercase;
                border-bottom: 1px solid #eee;
                padding-bottom: 5px;
                color: #999;
            }

            .details {
                background: #F9FAFB;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 40px;
            }

            .amount-row {
                display: flex;
                justify-content: space-between;
                font-size: 20px;
                font-weight: bold;
                border-top: 1px solid #ddd;
                padding-top: 15px;
                margin-top: 15px;
            }

            .footer {
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 50px;
                border-top: 1px solid #eee;
                padding-top: 20px;
            }

            .stamp {
                position: absolute;
                bottom: 100px;
                right: 60px;
                border: 3px solid #ED1B24;
                color: #ED1B24;
                font-weight: bold;
                padding: 10px 20px;
                transform: rotate(-15deg);
                font-size: 18px;
                opacity: 0.8;
            }

            @media print {
                body {
                    padding: 0;
                }

                .receipt-container {
                    border: none;
                }

                .no-print {
                    display: none;
                }
            }
        </style>
    </head>

    <body>
        <div class="no-print" style="text-align: center; margin-bottom: 20px;">
            <button onclick="window.print()"
                style="background: #2D3748; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 5px; font-size: 16px;">🖨️
                Imprimer / Sauvegarder en PDF</button>
        </div>

        <div class="receipt-container">
            <div class="header">
                <div class="logo">Croix-Rouge <span>Française</span></div>
                <div class="meta">
                    Reçu N°
                    <?php echo $don['donor_number'] . '-' . $don['id']; ?><br>
                    Date du reçu :
                    <?php echo date('d/m/Y'); ?>
                </div>
            </div>

            <div class="title">Reçu de Don</div>

            <div class="content">
                <div class="box">
                    <h3>Bénéficiaire</h3>
                    <strong>Croix-Rouge Française</strong><br>
                    98 Rue Didot<br>
                    75014 Paris<br>
                    France
                </div>
                <div class="box">
                    <h3>Donateur</h3>
                    <strong>
                        <?php echo htmlspecialchars($don['prenom'] . ' ' . $don['nom']); ?>
                    </strong><br>
                    <?php if ($don['adresse'])
                        echo htmlspecialchars($don['adresse']) . '<br>'; ?>
                    <?php if ($don['code_postal'] || $don['ville'])
                        echo htmlspecialchars($don['code_postal'] . ' ' . $don['ville']) . '<br>'; ?>
                    <?php echo htmlspecialchars($don['email']); ?>
                </div>
            </div>

            <div class="details">
                <p>La Croix-Rouge française certifie avoir reçu, à titre de don manuel ouvrant droit à réduction d'impôt
                    (articles 200 et 238 bis du CGI), la somme de :</p>

                <div class="amount-row">
                    <span>Montant du don :</span>
                    <span>
                        <?php echo number_format($don['montant'], 2, ',', ' '); ?> €
                    </span>
                </div>
                <div style="margin-top: 10px; font-size: 14px; color: #666;">
                    Date du don :
                    <?php echo date('d/m/Y', strtotime($don['date_don'])); ?><br>
                    Mode de règlement :
                    <?php echo htmlspecialchars($don['moyen_paiement']); ?>
                </div>
            </div>

            <div style="font-size: 14px; line-height: 1.6;">
                <p>Ce don ne comporte aucune contrepartie, directe ou indirecte, au profit du donateur.</p>
            </div>

            <div class="stamp">ACQUITTÉ</div>

            <div class="footer">
                Croix-Rouge française - Association reconnue d'utilité publique<br>
                Merci pour votre générosité. Ensemble, nous pouvons sauver des vies.
            </div>
        </div>
    </body>

    </html>
    <?php

} catch (PDOException $e) {
    die("Erreur : " . $e->getMessage());
}
?>
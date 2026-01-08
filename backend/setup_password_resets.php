<?php
require_once __DIR__ . '/config/db.php';

try {
    $sql = "CREATE TABLE IF NOT EXISTS password_resets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(191) NOT NULL,
        token VARCHAR(191) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX (email),
        INDEX (token)
    )";

    $pdo->exec($sql);
    echo "Table 'password_resets' créée avec succès.\n";

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage() . "\n";
}
?>
<?php
require_once __DIR__ . '/config/db.php';

try {
    $sql = "CREATE TABLE IF NOT EXISTS login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        attempts INT DEFAULT 0,
        last_attempt DATETIME,
        UNIQUE KEY unique_ip (ip_address)
    )";

    $pdo->exec($sql);
    echo "Table 'login_attempts' créée avec succès.\n";

} catch (PDOException $e) {
    echo "Erreur : " . $e->getMessage() . "\n";
}
?>
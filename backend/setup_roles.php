<?php
require_once __DIR__ . '/config/db.php';

try {
    // 1. Create 'roles' table
    $pdo->exec("CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    echo "Table 'roles' checked/created.\n";

    // 2. Insert default roles
    $roles = [
        'Admin',
        'Collaborateur',
        'Responsable Bénévoles',
        'Responsable Partenaires',
        'Responsable Événements',
        'Responsable Communication'
    ];

    // First, remove 'Donateurs' if it exists in roles table
    $pdo->exec("DELETE FROM roles WHERE name = 'Donateurs' OR name = 'Donateur'");

    $stmt = $pdo->prepare("INSERT IGNORE INTO roles (name) VALUES (?)");
    foreach ($roles as $role) {
        $stmt->execute([$role]);
    }
    echo "Default roles updated.\n";

    // 3. Add 'role_id' to `users` table
    $stmt = $pdo->query("SHOW COLUMNS FROM users LIKE 'role_id'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE users ADD COLUMN role_id INT DEFAULT NULL");
        $pdo->exec("ALTER TABLE users ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)");
        echo "Column 'role_id' added to 'users' table.\n";
    }

    // 4. Get Role IDs
    $stmt = $pdo->query("SELECT id, name FROM roles");
    $roleMap = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);
    $adminId = array_search('Admin', $roleMap);
    $commId = array_search('Responsable Communication', $roleMap);

    // 5. Create specific users
    $usersToCreate = [
        ['full_name' => 'Noyan', 'email' => 'noyan@example.com', 'password_hash' => password_hash('admin123', PASSWORD_DEFAULT), 'phone' => '0600000001', 'role_id' => $adminId],
        ['full_name' => 'Dorian', 'email' => 'dorian@example.com', 'password_hash' => password_hash('dorian123', PASSWORD_DEFAULT), 'phone' => '0600000002', 'role_id' => $commId]
    ];

    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, password_hash, phone, role_id) VALUES (:full_name, :email, :password_hash, :phone, :role_id) 
                          ON DUPLICATE KEY UPDATE role_id = VALUES(role_id), full_name = VALUES(full_name), password_hash = VALUES(password_hash)");

    foreach ($usersToCreate as $u) {
        $stmt->execute($u);
    }
    echo "Users Noyan and Dorian checked/created.\n";

    // 6. Final Cleanup: Revoke administrative roles from all other users
    // This ensures only the two accounts above have dashboard access
    $pdo->prepare("UPDATE users SET role_id = NULL WHERE email NOT IN ('noyan@example.com', 'dorian@example.com')")->execute();
    echo "Administrative roles revoked for all other legacy users.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
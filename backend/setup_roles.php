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
    $roles = ['Admin', 'Collaborateur'];
    $stmt = $pdo->prepare("INSERT IGNORE INTO roles (name) VALUES (?)");
    foreach ($roles as $role) {
        $stmt->execute([$role]);
    }
    echo "Default roles inserted.\n";

    // 3. Add 'role_id' to `users` table
    // Check if column exists first
    $stmt = $pdo->query("SHOW COLUMNS FROM users LIKE 'role_id'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE users ADD COLUMN role_id INT DEFAULT NULL");
        $pdo->exec("ALTER TABLE users ADD CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id)");
        echo "Column 'role_id' added to 'users' table.\n";
    } else {
        echo "Column 'role_id' already exists in 'users' table.\n";
    }

    // 4. Ensure an Admin user exists (and assign Admin role to all users for now only if they have no role)
    // Get Admin role ID
    $stmt = $pdo->query("SELECT id FROM roles WHERE name = 'Admin'");
    $adminRoleId = $stmt->fetchColumn();

    if ($adminRoleId) {
        // Assign Admin role to existing users who have NULL role_id
        $pdo->exec("UPDATE users SET role_id = $adminRoleId WHERE role_id IS NULL");
        echo "Assigned 'Admin' role to existing users.\n";
    }

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
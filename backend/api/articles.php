<?php
// backend/api/articles.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Public ou Admin ? Pour l'instant public pour l'accueil
        try {
            $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur récupération : " . $e->getMessage()]);
        }
        break;

    case 'POST':
        checkAdminAuth(); // Admin seulement
        verifyCsrfToken(); // CSRF Protection

        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['titre']) || empty($data['contenu'])) {
            http_response_code(400);
            echo json_encode(["error" => "Titre et contenu requis"]);
            break;
        }

        try {
            $sql = "INSERT INTO articles (title, content, image_url, author, created_at) 
                    VALUES (:title, :content, :image_url, :author, NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':title' => $data['titre'],
                ':content' => $data['contenu'],
                ':image_url' => $data['image'] ?? null,
                ':author' => $data['author'] ?? 'Admin'
            ]);
            echo json_encode(["message" => "Article publié !", "id" => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur publication : " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        checkAdminAuth();
        verifyCsrfToken();

        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "ID manquant"]);
            break;
        }

        try {
            $stmt = $pdo->prepare("DELETE FROM articles WHERE id = :id");
            $stmt->execute([':id' => $id]);
            echo json_encode(["message" => "Article supprimé"]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur suppression : " . $e->getMessage()]);
        }
        break;
}
?>
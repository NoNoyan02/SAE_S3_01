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
            if (isset($_GET['id'])) {
                $stmt = $pdo->prepare("SELECT * FROM articles WHERE id = :id");
                $stmt->execute([':id' => $_GET['id']]);
                $article = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($article) {
                    echo json_encode($article);
                } else {
                    http_response_code(404);
                    echo json_encode(["error" => "Article introuvable"]);
                }
            } else {
                $stmt = $pdo->query("SELECT * FROM articles ORDER BY created_at DESC");
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
                echo json_encode($data);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur récupération : " . $e->getMessage()]);
        }
        break;

    case 'POST':
        checkStaffAuth(); // Staff access
        verifyCsrfToken(); // CSRF Protection

        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['titre']) || empty($data['contenu'])) {
            http_response_code(400);
            echo json_encode(["error" => "Titre et contenu requis"]);
            break;
        }

        try {
            // Traitement de l'image (Base64 -> Fichier)
            $imagePath = null;
            if (!empty($data['image'])) {
                // Créer le dossier uploads s'il n'existe pas
                $uploadDir = __DIR__ . '/../uploads/';
                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }

                // Décoder l'image
                $imageParts = explode(";base64,", $data['image']);
                if (count($imageParts) >= 2) {
                    $imageBase64 = base64_decode($imageParts[1]);
                    $fileType = explode("image/", $imageParts[0])[1];
                    $fileName = 'article_' . uniqid() . '.' . $fileType;
                    $fileFullPath = $uploadDir . $fileName;

                    if (file_put_contents($fileFullPath, $imageBase64)) {
                        // On stocke le chemin relatif pour l'accessibilité web
                        // Suppose que le serveur sert 'backend' ou que 'uploads' est accessible via /uploads/
                        // Si le root est backend/, alors c'est uploads/$fileName
                        // On va stocker '/uploads/' . $fileName pour être générique, à voir selon la config serveur
                        $imagePath = '/uploads/' . $fileName;
                    }
                }
            }

            $sql = "INSERT INTO articles (title, content, image_url, author, created_at) 
                    VALUES (:title, :content, :image_url, :author, NOW())";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':title' => $data['titre'],
                ':content' => $data['contenu'],
                ':image_url' => $imagePath, // Utilise le chemin du fichier ou null
                ':author' => $data['author'] ?? 'Admin'
            ]);
            echo json_encode(["message" => "Article publié !", "id" => $pdo->lastInsertId()]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => "Erreur publication : " . $e->getMessage()]);
        }
        break;

    case 'DELETE':
        checkStaffAuth();
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
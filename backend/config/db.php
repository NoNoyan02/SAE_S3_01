<?php
// backend/config/db.php

require_once __DIR__ . "/../vendor/autoload.php";

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/..");
$dotenv->load();

// Récupération des variables
$host = $_ENV['DB_HOST'] ?? '127.0.0.1';
$port = $_ENV['DB_PORT'] ?? '3306';
$db = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$pass = $_ENV['DB_PASS'];
$charset = $_ENV['DB_CHARSET'] ?? 'utf8mb4';

$dsn = "mysql:host=$host;port=$port;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    // CRÉATION DE LA VARIABLE $pdo
    $pdo = new PDO($dsn, $user, $pass, $options);


} catch (PDOException $e) {
    // Si la connexion échoue, on arrête tout immédiatement
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Erreur de connexion BDD : " . $e->getMessage()]);
    exit; // On stoppe le script pour que login.php ne continue pas
}
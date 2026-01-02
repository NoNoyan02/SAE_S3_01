<?php
// backend/config/db.php

$host = "127.0.0.1";
$db   = "croix_rouge";
$user = "croix_user";     // ou root si tu veux en local (moins propre)
$pass = "UnMotDePasseFort!";
$charset = "utf8mb4";

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
  PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
  http_response_code(500);
  header("Content-Type: application/json");
  echo json_encode(["error" => "DB connection failed"]);
  exit;
}

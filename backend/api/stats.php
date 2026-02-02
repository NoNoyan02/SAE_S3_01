<?php
// backend/api/stats.php
require_once __DIR__ . "/security_headers.php";
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/auth_middleware.php";

checkStaffAuth();

try {
    // 1. Donateurs vs Users (Comptes crées après donation)
    // On suppose qu'un user est un donateur si donateur_id n'est pas NULL
    $totalDonateurs = $pdo->query("SELECT COUNT(*) FROM donateurs")->fetchColumn();
    $totalUsers = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
    $nbAdmins = $pdo->query("SELECT COUNT(*) FROM users WHERE role_id = 1")->fetchColumn();
    // Ou peut-être 'Users qui sont donateurs' = SELECT COUNT(*) FROM users WHERE donateur_id IS NOT NULL

    // 2. Dons par semaine (Weekly Donation Amount)
    $sqlWeekly = "SELECT 
                    DATE_FORMAT(DATE_SUB(created_at, INTERVAL WEEKDAY(created_at) DAY), '%Y-%u') as semaine,
                    DATE_FORMAT(DATE_SUB(created_at, INTERVAL WEEKDAY(created_at) DAY), '%d/%m') as date_label,
                    SUM(montant) as total
                  FROM dons 
                  GROUP BY semaine, date_label
                  ORDER BY semaine DESC 
                  LIMIT 12"; // Dernières 12 semaines
    $weeklyStats = $pdo->query($sqlWeekly)->fetchAll(PDO::FETCH_ASSOC) ?: [];

    // 3. Missions/Evènements (Passés vs Futurs)
    $today = date('Y-m-d H:i:s');
    $sqlEvents = "SELECT 
                    SUM(CASE WHEN date_debut < :today1 THEN 1 ELSE 0 END) as passed_events,
                    SUM(CASE WHEN date_debut >= :today2 THEN 1 ELSE 0 END) as future_events
                  FROM evenements";
    $stmtEvents = $pdo->prepare($sqlEvents);
    $stmtEvents->execute(['today1' => $today, 'today2' => $today]);
    $eventStats = $stmtEvents->fetch(PDO::FETCH_ASSOC);

    $response = [
        "donateurs_count" => (int) $totalDonateurs,
        "users_count" => (int) $totalUsers,
        "nbAdmins" => (int) $nbAdmins,
        "weekly_donations" => $weeklyStats,
        "events_stats" => $eventStats
    ];

    echo json_encode($response);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la récupération des stats : " . $e->getMessage()]);
}
?>
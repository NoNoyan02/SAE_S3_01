<?php
// backend/api/debug_session.php
require_once __DIR__ . "/security_headers.php";
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
header("Content-Type: application/json; charset=UTF-8");
echo json_encode([
    "session" => $_SESSION,
    "cookie" => $_COOKIE,
    "session_id" => session_id()
]);
?>
<?php
// backend/api/security_headers.php

// 1. Strict Transport Security (HSTS)
// Force HTTPS pendant 1 an (31536000 sec). À activer seulement si vous êtes en HTTPS.
// header("Strict-Transport-Security: max-age=31536000; includeSubDomains");

// 2. Anti-Clickjacking
// Empêche le site d'être chargé dans une iframe (protection contre le vol de clics)
header("X-Frame-Options: DENY");

// 3. Protection XSS (Cross Site Scripting)
// Active le filtre XSS du navigateur
header("X-XSS-Protection: 1; mode=block");

// 4. Content Type Options
// Empêche le navigateur de "deviner" le type de fichier (MIME sniffing)
header("X-Content-Type-Options: nosniff");

// 5. Referrer Policy
// Ne pas envoyer l'URL complète lors d'un lien sortant
header("Referrer-Policy: strict-origin-when-cross-origin");

// 6. Content Security Policy (CSP)
// C'est le niveau maximum. À configurer avec soin pour ne pas casser vos styles/scripts.
// header("Content-Security-Policy: default-src 'self' 'unsafe-inline' 'unsafe-eval' https:; img-src 'self' data: https:;");

// 7. CORS & Credentials (CRITIQUE pour le dashboard externe)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
// Liste des origines autorisées (Frontend)
$allowed_origins = ['http://localhost:3000'];

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Max-Age: 86400");    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}
?>
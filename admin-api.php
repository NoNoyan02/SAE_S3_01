<?php
header('Content-Type: application/json');
$conn = pg_connect("host=localhost dbname=postgres user=postgres password=1234");
$input = json_decode(file_get_contents('php://input'), true);
$action = $input['action'] ?? '';
$response = [];

if ($action === 'get_stats') {
    // Admins
    $qAdmins = pg_query($conn, "SELECT email, login FROM administrateur ORDER BY id ASC");
    $response['listeAdmins'] = pg_fetch_all($qAdmins) ?: [];
    $response['nbAdmins'] = pg_num_rows($qAdmins);

    // Dons (Sans message)
    $qDons = pg_query($conn, "SELECT c.montant, u.nomcomplet FROM cagnotte c JOIN utilisateur u ON c.id_utilisateur = u.id ORDER BY c.id DESC LIMIT 5");
    $response['listeDons'] = pg_fetch_all($qDons) ?: [];

    // Stats globales
    $qUser = pg_fetch_assoc(pg_query($conn, "SELECT COUNT(*) as t FROM utilisateur"));
    $response['nbUsers'] = $qUser['t'];
    $qArgent = pg_fetch_assoc(pg_query($conn, "SELECT SUM(montant) as t FROM cagnotte"));
    $response['montantTotal'] = $qArgent['t'] ?: 0;
    
    // Membres
    $qMembres = pg_query($conn, "SELECT nomcomplet, email FROM utilisateur ORDER BY id DESC LIMIT 5");
    $response['listeUsers'] = pg_fetch_all($qMembres) ?: [];

    echo json_encode($response);

} elseif ($action === 'logout') {
    $email = $input['email'];
    pg_query_params($conn, "UPDATE administrateur SET login = FALSE WHERE email = $1", array($email));
    echo json_encode(["success" => true]);

} elseif ($action === 'run_sql') {
    $result = @pg_query($conn, $input['query']);
    if (!$result) echo json_encode(["error" => pg_last_error($conn)]);
    else echo json_encode(["success" => true, "data" => pg_fetch_all($result) ?: []]);

} elseif ($action === 'get_schema') {
    $sql = "SELECT table_name, column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' ORDER BY table_name, ordinal_position";
    $res = pg_query($conn, $sql);
    $schema = [];
    while ($row = pg_fetch_assoc($res)) {
        $schema[$row['table_name']][] = $row['column_name'] . " (" . $row['data_type'] . ")";
    }
    echo json_encode(["schema" => $schema]);
}
?>
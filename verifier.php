<?php
header('Content-Type: application/json');
$conn = pg_connect("host=localhost dbname=postgres user=postgres password=1234");

$email = $_POST['email'];
$mdp = $_POST['motdepasse'];
$pin = $_POST['pincode'];

$sql = "SELECT * FROM administrateur WHERE email=$1 AND motdepasse=$2 AND pincode=$3";
$resultat = pg_query_params($conn, $sql, array($email, $mdp, $pin));

if (pg_num_rows($resultat) > 0) {
    pg_query_params($conn, "UPDATE administrateur SET login = TRUE WHERE email = $1", array($email));
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false]);
}
?>
<?php 
// Connexion a la base de donnée en utilisant PDO.
try {
    $hostname = 'localhost';
    $user = 'root';
    $pass = '';
    $database = 'upgrade_speak';
    $db = new PDO( "mysql:host=" . $hostname . ";dbname=" . $database, $user, $pass);
    $db->exec("set names utf8");
} catch(Exeption $e) {
    die('Erreur de connexion à la base de donnée');
}
?>
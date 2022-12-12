<?php 
require_once('../db/data-base.php'); 
session_start();
if (isset($_SESSION['id']) && isset($_SESSION['nom']) && isset($_SESSION['prenom'])) {
    try {
        // récupère les options dans l'url et les stock dans des variables
        $options = json_decode($_GET['options']);
        $message = filter_var($options[0], FILTER_SANITIZE_STRING);
        $salonCode = filter_var($options[1], FILTER_SANITIZE_STRING);
        $salonType = filter_var($options[2], FILTER_SANITIZE_STRING);
    
        
        // Si les options existent
        if (isset($message) && isset($salonCode) && isset($salonType)) {
    
            // récupère l'id du salon ou ajouter le message
            $salon_id = $db->prepare(
                "SELECT id FROM `salon` WHERE code = ? AND size = ?"
            );
            $salon_id->execute([$salonCode, $salonType]);
            
            if( $salon_id->rowCount() > 0 ) {
    
                $salon_id = $salon_id->fetch(PDO::FETCH_ASSOC);
            }
    
            // ajoute le message a la base de données
            $request = $db->prepare(
                "INSERT INTO `chat` (`id_salon`, `id_utilisateur`, `message`) VALUES (?, ?, ?)"
            );
            
            $request->execute([$salon_id['id'], $_SESSION['id'], $message]);
        }
    
    } catch (Exception $error) {
    
    } finally {
        header('Content-type: application/json');
        
        // retourne le message envoyé pour pouvoir l'afficher sans recharger la page
        if (!isset($error)) {
            $dateHour = 'Aujourd’hui à ' . (new \DateTime())->format('H:i:s');
            $data = [
                'hour' => $dateHour,
                'message' => $message,
                'data-time' => (new \DateTime())->modify("+1 hour")->format('Y-m-d H:i:s')
            ];
            echo json_encode( $data );
        }
    }
}
$db_connection = null;
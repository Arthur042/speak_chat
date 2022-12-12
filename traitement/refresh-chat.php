<?php require_once('../db/data-base.php'); 

try {
    // récupère les options dans l'url et les stock dans des variables
    $options = json_decode($_GET['options']);
    $time = filter_var($options[0], FILTER_SANITIZE_STRING);
    $salonCode = filter_var($options[1], FILTER_SANITIZE_STRING);
    $salonType = filter_var($options[2], FILTER_SANITIZE_STRING);
    
    // Si les options existent
    if (isset($time) && isset($salonCode) && isset($salonType)) {
        
        if ($time == 'empty') { // si time == empty c'est qu'il n'y a aucun message dans le caht donc il faut construire la requete pour vérifier si il y a un message dans le salon
            $request = $db->prepare(
                "SELECT * FROM `chat` 
                INNER JOIN salon ON salon.id = chat.id_salon
                WHERE salon.code = ? AND salon.size = ?
                ORDER BY send_at ASC"
            );
            $request->execute([$salonCode, $salonType]);
        } else {    // sinon réscupère les messages dont la date est supérieur a celle du dernier message affiché par l'utilisateur
            $request = $db->prepare(
                "SELECT * FROM `chat` 
                INNER JOIN salon ON salon.id = chat.id_salon
                WHERE salon.code = ? AND salon.size = ?
                AND send_at > ?
                ORDER BY send_at ASC"
            );
            $request->execute([$salonCode, $salonType, $time]);
        }
    }

} catch (Exception $error) {
} finally {
    header('Content-type: application/json');
    
    if (!isset($error)) {
        $data = [];
        
        if( $request->rowCount() > 0 ) {

            $i = 0;

            while ($message = $request->fetch(PDO::FETCH_ASSOC)) {

                $messageDate = date_create($message['send_at']);
                $currentDate = new \DateTime();
                $date = $messageDate->format('Y-m-d H:i:s');

                if (date_format($messageDate, 'Y-m-d') === $currentDate->format('Y-m-d')) $date = 'Aujourd’hui à ' . $messageDate->format('H:i:s');
                if (date_format($messageDate, 'Y-m-d') === $currentDate->modify("-1 day")->format('Y-m-d')) $date = 'Hier à ' . $messageDate->format('H:i:s');

                $messsage_info = [
                    'hour' => $date,
                    'message' => $message['message'],
                    'data-time' => htmlentities($messageDate->format('Y-m-d H:i:s'))
                ];

                array_push($data, $messsage_info);

                $i++;
            }
        } else {
            $data = false;
        }
        echo json_encode( $data );
    }
}
$db_connection = null;
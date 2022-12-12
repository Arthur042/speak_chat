<?php require_once('../db/data-base.php'); 

try {
    // récupère les options dans l'url et les stock dans des variables
    $options = json_decode($_GET['options']);
    $salonCode = filter_var($options[0], FILTER_SANITIZE_STRING);
    $salonType = filter_var($options[1], FILTER_SANITIZE_STRING);
    $time = filter_var($options[2], FILTER_SANITIZE_STRING);
    
    // Si les options existent
    if (isset($time) && isset($salonCode) && isset($salonType)) {
        $request = $db->prepare(
            "SELECT * FROM `chat` 
            INNER JOIN salon ON salon.id = chat.id_salon
            WHERE salon.code = ? AND salon.size = ?
            AND send_at < ?
            ORDER BY send_at DESC
            LIMIT 20"
        );
        $request->execute([$salonCode, $salonType, $time]);
    }

} catch (Exception $error) {
} finally {
    header('Content-type: application/json');
    
    if (!isset($error)) {
        $data = [];

        if( $request->rowCount() > 0 ) {

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
            }
        } else {
            $data = 'empty';
        }
        echo json_encode( $data );
    }
}
$db_connection = null;
<?php require_once('../db/data-base.php'); 

try{
    // récupère les options dans l'url
    $salon_search = json_decode($_GET['salon']);

    // si les options sont présentes, prépare la requète de récupération des messages et l'execute avec les paramètres
    if (isset($salon_search)) {
        $message_request = $db->prepare( '
        SELECT * from (
            SELECT * 
            FROM `chat`
            INNER JOIN salon ON salon.id = chat.id_salon
            WHERE salon.code = ? AND salon.size = ?
            ORDER BY send_at DESC
            LIMIT 20
        ) tmp ORDER BY tmp.send_at ASC
        ' );
        
        $message_request->execute([$salon_search[0], $salon_search[1]]);

        $salon_request = $db->prepare( '
        SELECT * 
        FROM `salon`
        WHERE salon.code = ? AND salon.size = ?
        ' );
        
        $salon_request->execute([$salon_search[0], $salon_search[1]]);
    }

}catch(Exception $error){

    die('Une erreur sur la requête permettant d\'obtenir la liste des messages est apparue, veuillez ressayer plus tard');

}

header('Content-type: application/json');

$data = [
    [$salon_search[0], $salon_search[1]]
];

if( $salon_request->rowCount() > 0 ) {

    // créé la liste de messages
    while( $salon = $salon_request->fetch(PDO::FETCH_ASSOC) ) { 
        $data[1] = $salon['nom'];
    } 
}

// vérifie si le sale possède des messages
if( $message_request->rowCount() > 0 ) {
    
    $i = 2;

    // créé la liste de messages
    while( $message = $message_request->fetch(PDO::FETCH_ASSOC) ) { 
        $messageDate = date_create($message['send_at']);
        $currentDate = new \DateTime();
        $date = $messageDate->format('Y-m-d H:i:s');

        if (date_format($messageDate, 'Y-m-d') === $currentDate->format('Y-m-d')) $date = 'Aujourd’hui à ' . $messageDate->format('H:i:s');
        if (date_format($messageDate, 'Y-m-d') === $currentDate->modify("-1 day")->format('Y-m-d')) $date = 'Hier à ' . $messageDate->format('H:i:s');
        $data[$i] = [
            '<p class="chat__list--message-date">' . htmlentities($date) . '</p><p>' . htmlentities($message['message']) . '</p>',
            htmlentities($messageDate->format('Y-m-d H:i:s'))
        ];

        $i++;
    }   
    echo json_encode( $data );
} else {
    $data[2] = 'empty';
    echo json_encode($data);
}
$db_connection = null;
<?php require_once('../db/data-base.php'); 

try{
    // récupère les options dans l'url et les stock dans des variables
    $salon_search = filter_var(json_decode($_GET['salon']), FILTER_SANITIZE_STRING);

    // Si les options existent
    if (isset($salon_search)) {
        if ($salon_search === 'empty') {    // si l'input est vide, récupère tout les salons
            $salon_request = $db->prepare( '
                SELECT * 
                FROM `salon` 
            ' );
        
            $salon_request->execute();
        } else {        // Sinon récupère les salons correspondant partiellement à la recherche
            $salon_request = $db->prepare( '
                SELECT * 
                FROM `salon` 
                WHERE nom LIKE ?
            ' );
        
            $salon_request->execute(['%' . $salon_search . '%']);
        }
    }
    

}catch(Exception $error){

    die('Une erreur sur la requête permettant d\'obtenir la liste des salons est apparue, veuillez ressayer plus tard');

}

if( $salon_request->rowCount() > 0 ) {  // Si la requete retourne des quelque chose
    $i = 0;
    $data = [];
    
    // boucle sur les résultat et construit la variable à retourner $data
    while( $salon = $salon_request->fetch(PDO::FETCH_ASSOC) ) { 
    
        $data[$i] = [
            'departement' => $salon['nom']
        ];
    
        $i++;
    }   
    
} else {    // Sinon la variable retournera false (pas de résultat correspondant à la recherche)
    $data = false;
}

header('Content-type: application/json');
echo json_encode( $data );

$db_connection = null;
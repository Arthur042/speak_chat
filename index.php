<?php 
require_once('./db/data-base.php');
session_start();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="./assets/styles/style.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossorigin="" />
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
        integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>

    <script>
        function auto_grow(element) {
            element.style.height = "5px";
            element.style.height = (element.scrollHeight) + "px";
        }
    </script>
</head>

<body>
    <div class="nav">
        <a href="./connexion.php"><button>Connexion</button></a>
        <a href="./inscription.php"><button>Inscription</button></a>
        <a href="./traitement/deconnexion.php"><button>Déconnexion</button></a>
    </div>
    <div class="container">
        <?php if (isset($_SESSION['mail']) && isset($_SESSION['prenom']) && isset($_SESSION['nom']) && (isset($_SESSION['id']))) { ?>
        <div class="salon">
            <h2 class="salon--title">Salon</h2>
            <div class="sallon__search">
                <label for="search" class="sallon__search--label">chercher un salon</label>
                <input type="text" class="sallon__search--input" name="search" id="search" placeholder="Rechercher"
                    data-search>
                <svg class="svg-icon search-icon sallon__search--svg" aria-labelledby="title desc" role="img"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7">
                    <title id="title">Search Icon</title>
                    <desc id="desc">A magnifying glass icon.</desc>
                    <g class="search-path" fill="none" stroke="#848F91">
                        <path stroke-linecap="square" d="M18.5 18.3l-5.4-5.4" />
                        <circle cx="8" cy="8" r="7" />
                    </g>
                </svg>
            </div>
            <ul class="salon__list">
                <?php 
                    try{
        
                        $salon_request = $db->prepare( '
                            SELECT * 
                            FROM salon
                            JOIN chat ON chat.id_salon = salon.id
                            WHERE chat.id_utilisateur = ?
                            GROUP BY salon.id
                        ' );
        
                        $salon_request->execute([$_SESSION['id']]);
        
                    }catch(Exception $error){
        
                        die('Une erreur sur la requête permettant d\'obtenir la liste des salons est apparue, veuillez ressayer plus tard');
        
                    }
        
                    if( $salon_request->rowCount() > 0 ) {

                        $i = 0;

                        while( $salon = $salon_request->fetch(PDO::FETCH_ASSOC) ) { 

                            $departement = $salon['nom'];?>

                <li class="salon__list--item<?php if ($i === 0) echo ' active' ?>"
                    data-salon-code="<?=htmlentities($salon['code'])?>"
                    data-salon-type="<?=htmlentities($salon['size'])?>"><?=htmlentities($departement)?></li>

                <?php 
                        $i++;
                        }   
                    }
                ?>
            </ul>
        </div>
       <?php } ?>
        <div class="chat__message">
            <h3 class="chat__list--title">Monde</h3>
            <div class="chat__list--container">
                <div class="chat__list" data-salon-code="0" data-salon-type="0">
                    <?php 
                try{
    
                    $message_request = $db->prepare( '
                        SELECT * from (
                            SELECT * 
                            FROM `chat`
                            INNER JOIN salon ON salon.id = chat.id_salon
                            WHERE salon.code = "0" AND salon.size = "0"
                            ORDER BY send_at DESC
                            LIMIT 20
                        ) tmp ORDER BY tmp.send_at ASC
                    ' );
    
                    $message_request->execute();
    
                }catch(Exception $error){
    
                    die('Une erreur sur la requête permettant d\'obtenir la liste des messages est apparue, veuillez ressayer plus tard');
    
                }
    
                if( $message_request->rowCount() > 0 ) {
    
                    while( $message = $message_request->fetch(PDO::FETCH_ASSOC) ) { 
                        $messageDate = date_create($message['send_at']);
                        $currentDate = new \DateTime();
                        $date = $messageDate->format('Y-m-d H:i:s');
    
                        if (date_format($messageDate, 'Y-m-d') === $currentDate->format('Y-m-d')) $date = 'Aujourd’hui à ' . $messageDate->format('H:i:s');
                        if (date_format($messageDate, 'Y-m-d') === $currentDate->modify("-1 day")->format('Y-m-d')) $date = 'Hier à ' . $messageDate->format('H:i:s');
                        ?>

                    <div class="chat__list--message" data-time="<?=htmlentities($messageDate->format('Y-m-d H:i:s'))?>">
                        <p class="chat__list--message-date"><?=htmlentities($date)?></p>
                        <p><?=htmlentities($message['message'])?></p>
                    </div>

                    <?php }   
                }
                ?>
                </div>
            </div>
            <div class="chat__message--write">
                <label for="chat-send" class="chat__message--label"> Écrire le contenu du message</label>
                <textarea name="chat-send" id="chat-send" class="chat__message--textarea"
                    oninput="auto_grow(this)"></textarea>
                <button class="chat__message--send">Envoyer</button>
            </div>
        </div>
        <div class="map">
            <div class="map__div--button">
                <button class="map__button active" data-url="./json/countries.geojson"
                    data-type="0"> Afficher les pays</button>
                <button class="map__button"
                    data-url="https://france-geojson.gregoiredavid.fr/repo/regions.geojson" data-type="1">Afficher les
                    régions</button>
                <button class="map__button" data-url="https://france-geojson.gregoiredavid.fr/repo/departements.geojson"
                    data-type="2"> Afficher les départements</button>
            </div>
            <div class="map__element" id="map"></div>
        </div>
    </div>

    <script src="./assets/scripts/ajax-send.js"></script>
    <script src="./assets/scripts/ajax-refresh.js"></script>
    <script src="./assets/scripts/ajax-salon.js"></script>
    <script src="./assets/scripts/ajax-search.js"></script>
    <script src="./assets/scripts/leaflet.js"></script>
    <script src="./assets/scripts/ajax-load-old-message.js"></script>
</body>

</html>
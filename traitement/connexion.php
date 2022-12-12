<?php require_once('../db/data-base.php'); 

// verification que le formulaire est bien rempli
        if (!empty($_POST['loginMail'] && $_POST['loginPassword'])) {
            $mail = filter_var($_POST['loginMail'], FILTER_SANITIZE_EMAIL);    // on nettoie le mail
            $password = filter_var($_POST['loginPassword'], FILTER_SANITIZE_STRING);        // on nettoie le password
            // on verifie que le mail est valide
                if (filter_var($mail, FILTER_VALIDATE_EMAIL)){
                    // on requete la base de donnée pour voir si un utilisateur correspond au informations rentré
                    try{
                        $user_request = $db->prepare( '
                                    SELECT * 
                                    FROM `utilisateur` 
                                    WHERE mail = ? AND mot_de_passe = ?
                                ' );
                        $user_request->execute([$mail, hash('sha256', $password)]);
                    }catch(Exception $error){
                    
                        die('Une erreur sur la requête permettant l\'authentification est survenue, veuillez ressayer plus tard');
                    
                    }
                    
                    if( $user_request->rowCount() > 0 ) {  // Si la requete retourne quelque chose

                        // récupère la résultat pour retourner l'utilisateur
                        $salon = $user_request->fetch(PDO::FETCH_ASSOC);

                        session_start();

                        $_SESSION['mail'] = $salon['mail'];
                        $_SESSION['prenom'] = $salon['prenom'];
                        $_SESSION['nom'] = $salon['nom'];
                        $_SESSION['id'] = $salon['id'];
                        header("Location: http://localhost/speak/");
                    } else {
                        // si le n'est pas valide, on affiche un message d'erreur
                        $error = urlencode('<p>L\'adresse mail ou le mot de passe est incorrecte</p>');
                        header("Location:../connexion.php?error=$error&mail=$mail");
                    }
                } else {
                    // si le n'est pas valide, on affiche un message d'erreur
                        $error = urlencode('<p>L\'email n\'est pas valide</p>');
                        header("Location:../connexion.php?error=$error&mail=$mail");
                }
        }

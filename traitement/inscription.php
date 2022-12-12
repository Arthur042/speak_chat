<?php require_once('../db/data-base.php'); 

// verification que le formulaire est bien rempli
        if (!empty($_POST['signInMail'] && $_POST['signInPassword'] && $_POST['signInFirstname'] && $_POST['signInLastname'])) {
            $mail = filter_var($_POST['signInMail'], FILTER_SANITIZE_EMAIL);    // on nettoie le mail
            $password = filter_var($_POST['signInPassword'], FILTER_SANITIZE_STRING);        // on nettoie le password
            $firstname = filter_var($_POST['signInFirstname'], FILTER_SANITIZE_STRING);        // on nettoie le prénom
            $lastname = filter_var($_POST['signInLastname'], FILTER_SANITIZE_STRING);        // on nettoie le nom
    
            // on verifie que le mail est valide
                if (filter_var($mail, FILTER_VALIDATE_EMAIL)){
                    // on requete la base de donnée pour voir si un utilisateur correspond au informations rentré
                    try{
                        $user_request = $db->prepare( '
                        INSERT INTO `utilisateur` (`mail`, `mot_de_passe`, `nom`, `prenom`) 
                        VALUES (?, ?, ?, ?)
                                ' );
                        $user_request->execute([$mail, hash('sha256', $password), $firstname, $lastname]);
                    }catch(Exception $error){

                        // si le n'est pas valide, on affiche un message d'erreur
                        $error = urlencode('<p>Une erreur sur la requête permettant l\'inscription est survenue, veuillez ressayer plus tard</p>');
                        header("Location:../connexion.php?error=$error&mail=$mail");

                    } finally {
                        session_start();

                        $_SESSION['mail'] = $signInMail;
                        $_SESSION['prenom'] = $firstname;
                        $_SESSION['nom'] = $lastname;

                        header("Location: http://localhost/speak/");
                    }
                    
                } else {
                    // si le n'est pas valide, on affiche un message d'erreur
                        $error = urlencode('<p>L\'email n\'est pas valide</p>');
                        header("Location:../connexion.php?error=$error&mail=$mail");
                }
        }

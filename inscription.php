<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="./assets/styles/style.css" rel="stylesheet">
</head>

<body>
    <div class="nav">
        <a href="./connexion.php"><button>Connexion</button></a>
        <a href="./inscription.php"><button>Inscription</button></a>
        <a href="./traitement/deconnexion.php"><button>Déconnexion</button></a>
    </div>
    <div>
        <form action="./traitement/inscription.php" method="post">
            <!-- Email input -->
            <div class="log__input">
                <input type="email" id="signInMail" name="signInMail" <?php if (isset($_GET['error']) && isset($_GET['mail'])) echo 'value="'.$_GET['mail'].'"' ?>/>
                <label for="signInMail">Email</label>
            </div>

            <!-- Password input -->
            <div class="log__input">
                <input type="password" id="signInPassword" name="signInPassword"/>
                <label for="signInPassword">mot de passe</label>
            </div>

            <!-- firstName input -->
            <div class="log__input">
                <input type="text" id="signInFirstname" name="signInFirstname" <?php if (isset($_GET['error']) && isset($_GET['prenom'])) echo 'value="'.$_GET['prenom'].'"' ?>/>
                <label for="signInFirstname">Prénom</label>
            </div>

            <!-- lastName input -->
            <div class="log__input">
                <input type="text" id="signInLastname" name="signInLastname" <?php if (isset($_GET['error']) && isset($_GET['nom'])) echo 'value="'.$_GET['nom'].'"' ?>/>
                <label for="signInLastname">Nom</label>
            </div>
            
            <!-- Submit button -->
            <button type="submit">Inscription</button>
        </form>
        <?php
            if (isset($_GET['error']) && isset($_GET['mail'])) {
                echo $_GET['error'];
            }
        ?>
    </div>
    
</body>

</html>
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
        <form action="./traitement/connexion.php" method="post">
            <!-- Email input -->
            <div class="log__input">
                <input type="email" id="loginMail" name="loginMail" <?php if (isset($_GET['error']) && isset($_GET['mail'])) echo 'value="'.$_GET['mail'].'"' ?>/>
                <label for="loginMail">Email</label>
            </div>

            <!-- Password input -->
            <div class="log__input">
                <input type="password" id="loginPassword" name="loginPassword"/>
                <label for="loginPassword">mot de passe</label>
            </div>

            <!-- Submit button -->
            <button type="submit">Connexion</button>
        </form>
        <?php
            if (isset($_GET['error']) && isset($_GET['mail'])) {
                echo $_GET['error'];
            }
        ?>
    </div>
    
</body>

</html>
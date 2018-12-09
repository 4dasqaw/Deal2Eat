<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';

sec_session_start();
 
if (login_check($mysqli) == true) {
    $logged = 'in';
} else {
    $logged = 'out';
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Connexion sécurisée, page de connexion</title>
        <link rel="stylesheet" href="styles/main.css" />
    </head>
    <body>
        <?php
        if (isset($_GET['error'])) {
            echo '<p class="error">Une erreur s’est produite lors de votre connexion!</p>';
        }
        ?> 
        <form action="includes/process_login.php" method="post" name="login_form">                      
            Email: <input type="text" name="email" />
            Password: <input type="password" 
                             name="password" 
                             id="password"/>
            <input type="submit" 
                   value="Submit" /> 
        </form>
        <p>Si vous n’avez pas de compte, veuillez vous <a href="register.php">enregistrer</a></p>
        <p>Si vous avez terminé, veuillez vous <a href="includes/logout.php">déconnecter</a>.</p>
        <p>Vous êtes connecté <?php echo $logged ?>.</p>
    </body>
</html>
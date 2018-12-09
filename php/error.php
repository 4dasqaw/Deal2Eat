<?php
$error = filter_input(INPUT_GET, 'err', $filter = FILTER_SANITIZE_STRING);
 
if (! $error) {
    $error = 'Oups! Une erreur s’est produite.';
}
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Erreur lors de la connexion sécurisée</title>
        <link rel="stylesheet" href="styles/main.css" />
    </head>
    <body>
        <h1>Une erreur s’est produite</h1>
        <p class="error"><?php echo $error; ?></p>  
    </body>
</html>
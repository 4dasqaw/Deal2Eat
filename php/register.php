<?php
include_once 'includes/register.inc.php';
include_once 'includes/functions.php';
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Connexion sécurisée, formulaire d’enregistrement</title>
        <link rel="stylesheet" href="styles/main.css" />
    </head>
    <body>
        <!-- S’il n’y a pas de variables POST ou si l’enregistrement a retourné une erreur, cette page sera affichée -->
        <h1>Enregistrez-vous</h1>
        <?php
        if (!empty($error_msg)) {
            echo $error_msg;
        }
        ?>
        <ul>
            <li>Le nom d’utilisateur ne peut contenir que des nombres, des lettres en minuscule et majuscule et des underscores</li>
            <li>Les emails doivent avoir un format valide</li>
            <li>Le mot de passe doit avoir au moins 6 caractères</li>
            <li>Le mot de passe doit contenir
                <ul>
                    <li>Au moins une lettre majuscule (A..Z)</li>
                    <li>Au moins une lettre minuscule (a..z)</li>
                    <li>Au moins un chiffre (0..9)</li>
                </ul>
            </li>
            <li>Les deux mots de passe entrés doivent être exactement les mêmes</li>
        </ul>
        <form action="includes/register.inc.php"
                method="post" 
                name="registration_form">
            Username: <input type='text' 
                name='username' 
                id='username' /><br>
            Adresse email: <input type="text" name="email" id="email" /><br>
            Mot de passe: <input type="password"
                             name="password" 
                             id="password"/><br>
            Confirmez le mot de passe: <input type="password" 
                                     name="confirmpwd" 
                                     id="confirmpwd" /><br>
            Prénom: <input type='text' 
                name='fname' 
                id='fname' /><br>
            Nom: <input type='text' 
                name='lname' 
                id='lname' /><br>
            Adresse: <input type='text' 
                name='adress' 
                id='adress' /><br>
            Ville : <input type='text' 
                name='city' 
                id='city' /><br>
            Anniversaire : <input type='date' 
                name='birth' 
                id='birth' /><br>
            <input type="submit" 
                   value="Submit"/> 
        </form>
        <p>Retournez à la page d’<a href="index.php">inscription</a>.</p>
    </body>
</html>
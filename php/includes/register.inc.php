<?php
include_once 'db_connect.php';
include_once 'psl-config.php';

$error_msg = "";

if (isset($_POST['username'], $_POST['email'], $_POST['password'], $_POST['confirmpwd'], $_POST['fname'], $_POST['lname'], $_POST['adress'], $_POST['city'], $_POST['birth'])) {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $fname = filter_input(INPUT_POST, 'fname', FILTER_SANITIZE_STRING);
    $lname = filter_input(INPUT_POST, 'lname', FILTER_SANITIZE_STRING);
    $adress = filter_input(INPUT_POST, 'adress', FILTER_SANITIZE_STRING);
    $city = filter_input(INPUT_POST, 'city', FILTER_SANITIZE_STRING);

    $birth = filter_input(INPUT_POST, 'birth', FILTER_SANITIZE_STRING);
    $birth = preg_replace("([^0-9/] | [^0-9-])", "", $birth);

    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_msg .= '<p class="error">L’adress email que vous avez entrée n’est pas valide</p>';
    }
    $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);
    $confirmpwd = filter_input(INPUT_POST, 'confirmpwd', FILTER_SANITIZE_STRING);
    if ($password != $confirmpwd) {
        $error_msg .= '<p class="error"> Les deux mot de passe ne sont pas identique.</p>';
    }

    $prep_stmt = "SELECT ID FROM user WHERE email = ? LIMIT 1";
    $stmt = $mysqli->prepare($prep_stmt);
 
    if ($stmt) 
    {
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();
        
        if ($stmt->num_rows == 1) 
        {
            $error_msg .= '<p class="error">Il existe déjà un utilisateur avec le même nom.</p>';
        }
    } 
    else 
    {
        $error_msg .= '<p class="error">Erreur de base de données</p>';
    }
 
    if (empty($error_msg)) {
        $hash = password_hash($password.$username, PASSWORD_DEFAULT);
        if ($insert_stmt = $mysqli->prepare("INSERT INTO user (login, password, email, prenom, nom, adresse, ville, birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")) {
            $insert_stmt->bind_param('ssssssss', $username, $hash, $email, $fname, $lname, $adress, $city, $birth);
            if (! $insert_stmt->execute()) {
                //header('Location: ../error.php?err=Registration failure: INSERT');
            }
        }
        //header('Location: ./register_success.php');
    }
}

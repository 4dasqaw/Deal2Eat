<?php
include_once 'db_connect.php';
include_once 'functions.php';

sec_session_start();
 
if (isset($_POST['email'], $_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
 
    if (login($email, $password, $mysqli) == true) {
        echo "Connexion OK";
    } else {
        echo "Erreur de connexion";
    }
} else {
    echo 'Invalid Request';
}
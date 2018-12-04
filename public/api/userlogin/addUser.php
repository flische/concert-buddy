<?php 
$email = $_POST['email'];
$passwordLength = strlen($_POST['password']);
$password = sha1($_POST['password']);
$name = $_POST['name'];
$output = [
    'success' => false,
];
if ($passwordLength < 8) {
    $output['error'] = "Password is too short! Please enter at least 8 characters";
    $output = json_encode($output);
    print($output);
    die();
}
$emailQuery = "SELECT * FROM `user` WHERE `email` = '$email'";
$result = mysqli_query($conn, $emailQuery);
 if(mysqli_num_rows($result)) {
    $output['error'] = "Email already exists";
    $output = json_encode($output);
    print($output);
    die();
}
require_once('mysqlconnect.php');

$query = "INSERT INTO `user`(`email`,`password`,`name`) VALUES ('$email','$password','$name')";

$result = mysqli_query($conn, $query);


    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true;
    }
else {
    $output['error'][] = "New User Was not Added";
}   
 ?>
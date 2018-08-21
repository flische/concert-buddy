<?php 
print_r($_POST);
$email = $_POST['email'];
$password = sha1($_POST['password']);
$name = $_POST['name'];
$output = [
    'success' => false,
    'error'=>[],
];
if (empty($email)) {
    $output['error'][] = "Missing Email";
    $output = json_encode($output);
    print($output);
    die();
}
if (empty($password)) {
    $output['error'][] = "Missing or Invalid Password";
    $output = json_encode($output);
    print($output);
    die();
}
if (empty($name)) {
    $output['error'][] = "Missing or Invalid Email";
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
$output = json_encode($output);
print($output);
    
 ?>
<?php
session_start();
header("Access-Control-Allow-Origin: *");
$email = $_POST['email'];
$password = sha1($_POST['password']); 

$output = [ 
    'success'=> false, 
    'data' => [],
];
require_once('mysqlconnect.php');

$query = "SELECT * FROM `user` WHERE `email` = '$email' AND `password` = '$password'";
$result = mysqli_query($conn, $query);

if ($result) {
    if(mysqli_num_rows($result) === 1) { 
        $row = mysqli_fetch_assoc($result);
        $output['success'] = true;
        $output['data'][] = $row;
        $_SESSION['user_data'] = $output['data'];
    }
}
else {
    $output['errors'] = "Database connection error"; 
   print(mysqli_error($conn));
}

$output = json_encode($output);
print($output);
?>
<?php
header("Access-Control-Allow-Origin: *");
session_start();
$output = [
    'success'=> false,
    
];
if (empty($_SESSION['user_data'])) {
    $output['error'] = "User is not logged in";
    print(json_encode($output));
    die();
}
else { 
    $output['success'] = true;
    $output['data'] = $_SESSION['user_data'];
    
}
?>
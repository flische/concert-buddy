<?php
session_start();
$output = [
    'success'=> false,
    'error'=> [],
];
if (empty($_SESSION)) {
    $output['error'] = "User is not logged in";
    die();
}
else { 
    $output['success'] = true;
    $output['data'] = $_SESSION['user_data'];
}
$output = json_encode($output);
print($output);

?>
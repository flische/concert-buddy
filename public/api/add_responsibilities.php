<?php
header("Access-Control-Allow-Origin: *");
session_start();
$tripID  = 1; //put trip ID youd like to check here , will make dynamic later 
$output = [
    'success'=> false,
];
require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "INSERT INTO `responsib`(`title`, `details`, `name`, `completed`, `trip_id`) VALUES ( $title,$details,$name,$completed,1)"
;

$result = mysqli_query($conn, $query);

if (mysqli_affected_rows($conn)) {
    $output['success'] = true;
    print("successfuly added files
    ");
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}
 $output = json_encode($output);
 print($output);

?> 
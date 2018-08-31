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
$query = "SELECT * FROM `responsib`
 WHERE  `trip_id` = '$tripID' ";

$result = mysqli_query($conn, $query);

if ($result) {
       $output['success'] = true;
       $row  = mysqli_fetch_assoc($result);
       $output['data'][] = $row;
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}
 $output = json_encode($output);
 print($output);

?> 
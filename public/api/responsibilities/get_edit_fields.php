<?php
header("Access-Control-Allow-Origin: *");
session_start();
$tripID  = $_POST['trip_id']; //put trip ID youd like to check here , will make dynamic later 
$editID = $_POST['edit_id'];
$output = [
    'success'=> false,
];
require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "SELECT * FROM `responsib`
 WHERE  `trip_id` = '$tripID' AND `ID` = '$editID'";

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


?> 
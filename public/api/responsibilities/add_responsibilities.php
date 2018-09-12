<?php
header("Access-Control-Allow-Origin: *");
session_start();
$tripID  = $_POST["trip_id"];
$title = $_POST["title"]; 
$details = $_POST["details"];
$name = $_POST["name"];
$completed = $_POST["completed"];


$output = [
    'success'=> false,
];
require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "INSERT INTO `responsib`(`title`, `details`, `name`, `completed`, `trip_id`) VALUES ( \"$title\",\"$details\",\"$name\",$completed,$tripID)";

$result = mysqli_query($conn, $query);
if (mysqli_errno($conn)){
    $output['success'] = false;
    $output['error'] = mysqli_error($conn);
} else if (mysqli_affected_rows($conn)) {
    $output['success'] = true;
    $output['affected_rows'] = mysqli_affected_rows($conn);
    print("successfully added files
    ");
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}


?> 
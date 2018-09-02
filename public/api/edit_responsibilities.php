<?php
header("Access-Control-Allow-Origin: *");
session_start();
$taskID  = $_POST['id']; //required unique id of task to delete targeted task 
$title = $_POST['$title'];
$details = $_POST['details'];
$name = $_POST['name'];
$completed = $_POST['name'];
require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "UPDATE `responsib` SET ,`title`= '$title',`details`='$details',`name`='$name',`completed`='$completed' WHERE `ID`=[value-1]" 
;

$result = mysqli_query($conn, $query);

if (mysqli_affected_rows($conn)) {
    $output['success'] = true;
    print("successfuly edited files");
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}
 $output = json_encode($output);
 print($output);

?> 










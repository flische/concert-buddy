<?php
header("Access-Control-Allow-Origin: *");
session_start();
$tripID  = $_POST['trip_id']; //put trip ID youd like to check here , will make dynamic later 
$deletedID = $_POST['id']; // this will pull id of the task to be deleted 
$output = [
    'success'=> false,
];
$output = [
    'success'=>false,
];
$query = "DELETE FROM `responsib` WHERE `ID` = $deletedID" 
;

$result = mysqli_query($conn, $query);

if (mysqli_affected_rows($conn)>0) {
    $output['success'] = true;
    
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}


?> 
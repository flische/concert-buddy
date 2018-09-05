<?php
header("Access-Control-Allow-Origin: *");
session_start();

$taskID  = $_POST['ID']; //required unique id of task to delete targeted task 
$completed = (int) json_decode($_POST['completed']);
print($completed);
if ($completed === 0) {
  
    $completed = 1;
}
else {
    $completed = 0;
}

require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "UPDATE `responsib` SET `completed`= $completed WHERE `ID`= '$taskID'";

$result = mysqli_query($conn, $query);
if($result) {
if (mysqli_affected_rows($conn) > 0) {
    $output['success'] = true;
    print("True or False Toggled");
  }
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error!".$error;
  }
}
 $output = json_encode($output);
 print($output);
?> 

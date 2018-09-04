<?php
header("Access-Control-Allow-Origin: *");
session_start();
print_r($_POST);
$taskID  = $_POST['ID']; //required unique id of task to delete targeted task 
$title = $_POST['title'];
$details = $_POST['details'];
$name = $_POST['name'];
$completed = (int) $_POST['name'];

require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "UPDATE `responsib` SET `title`= '$title',`details`='$details',`name`='$name',`completed`=$completed WHERE `ID`= '$taskID'" 
;
print_r($query);
$result = mysqli_query($conn, $query);

if (mysqli_affected_rows($conn) > 0) {
    $output['success'] = true;
    print("successfuly edited files");
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error!".$error;
}
 $output = json_encode($output);
 print($output);

?> 










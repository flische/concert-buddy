
<?php
header("Access-Control-Allow-Origin: *");
session_start();
$tripID = $_POST["tripID"];
$userID = $_SESSION['user_data'][0]['ID'];
$output = [

   'success'=>false,
];
$query = "DELETE FROM `user_trip_overview` WHERE `user_id` = '$userID' AND `trip_id` = '$tripID'";

$result = mysqli_query($conn, $query);
if ($result) {
   if (mysqli_affected_rows($conn) > 0) {
       $output['success'] = true;
   }
   else {
       $output['error'] = "Unable to delete Trip";
       die();
   }
}
   else {
       $error = mysqli_error();
       $output['error'] = $error;
   }
?>


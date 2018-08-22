<?php
// $userID = $_SESSION["ID"];
$venue = $_POST["venue"];
$date =  $_POST["dateTime"];
$img = $_POST["img"];
$lat = $_POST["lat"];
$long = $_POST["long"]
$address = $_POST["address"];
$artist = $_POST['artist'];
$output = [
    'success' = false,
];
$query = "INSERT INTO `concerts`(`venuename`,`artist`,`address`,`date`,`time`,`longitude`,`latitude`,`img`) 
                        VALUES ('$venue','$artist','$address','$date','$time', '$longitude', '$latitude', '$img')";
$result = mysqli_query($conn, $result);
 if ( num_affected_rows($conn) {
     $output['success'] = true;
     $output['ID'] = mysqli_insert_id($conn);
 }
 else {
     $output['error'] = "Unable to add Concert";
 }

 print(json_encode($output));
?>
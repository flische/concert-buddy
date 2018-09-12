<?php
header("Access-Control-Allow-Origin: *");
// $userID = $_SESSION["ID"];
$venue = $_POST["venue"];
$artist = $_POST["artist"];
$address = $_POST["address"];
$date =  $_POST["date"];
$time = $_POST["time"];
$lat = $_POST["latitude"];  
$long = $_POST["longitude"];
$img = $_POST["image"];

$output = [
    'success' => false,
];
$query = "INSERT INTO `concerts`(`venue`,`artist`,`address`,`date`,`time`,`longitude`,`latitude`,`img`) 
                        VALUES ('$venue', '$artist', '$address' , '$date', '$time', '$long', '$lat', '$img')";
$result = mysqli_query($conn, $query);
 if (mysqli_affected_rows($conn) > 0) {
     $output['success'] = true;
     $output['ID'] = mysqli_insert_id($conn);
 }
 else {
     $output['error'] = "Unable to add Concert";
 }

?>
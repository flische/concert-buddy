<?php
header("Access-Control-Allow-Origin: *");
session_start();
$concertID = $_POST['ID'];
$tripName = $_POST['trip_name'];
$userID = $_SESSION['user_data'][0]['ID'];

$output = [
 'success' => false,
];

$query = "INSERT INTO `trips`(`trip_name`,`concert_id`,`created_user_id`) VALUES (\"$tripName\", \"$concertID\", \"$userID\")" ;

$result = mysqli_query($conn, $query);
if (mysqli_affected_rows($conn)) {
    $tripID = mysqli_insert_id($conn);
}
else {
    $output['error'] = "Unable to add Trip";
    die();
}

$query2 = "INSERT INTO `user_trip_overview`(`user_id`,`trip_id`) VALUES ('$userID', '$tripID')"; 
$result2 = mysqli_query($conn, $query2);
if ($result2) {
if (mysqli_affected_rows($conn)) {
    $output['success'] = true;
;

}
else {
    $output['error'] = "Unable to add User and Associated Trip";
    die();
}
}
else {
    $error = mysqli_error();
    $output['error'] = $error;

}

?>
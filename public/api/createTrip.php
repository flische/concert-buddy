<?php
$concertID = $_POST['ID'];
$tripName = $_POST['tripname'];
$userID = $_SESSION['id'];
$output = [
 'success' = false,
];

$query = "INSERT INTO `trips`(`trip_name`,`concert_id`,`created_user_id`) VALUES ('$concertID', '$tripName', '$userID')" ;

$result = mysqli_query($conn, $query);
if ( num_affected_rows($conn) {
    $output['success'] = true;
    $tripID = mysqli_insert_id($conn);
}
else {
    $output['error'] = "Unable to add Trip";
    die();
}
$query2 = "INSERT INTO `user_trip_overview`(`user_id`,`trip_id) VALUES ('$userID', '$tripID');" ;
$result = mysqli_query($conn, $query);
if ( num_affected_rows($conn) {
    $output['success'] = true;
    print("successfuly added both");
}
else {
    $output['error'] = "Unable to add User and Associated Trip";
    die();
}


?>
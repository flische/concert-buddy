<?php 
header("Access-Control-Allow-Origin: *");
session_start();
require('mysqlconnect.php');
$userID = $_SESSION['user_data'][0]['ID'];
$token = $_POST['token'];
$tripID = null;
$output = [
    'success'=> false,
];
$query = "SELECT trip_id FROM `triptokens`WHERE `tokens` = '$token'";
$result = mysqli_query($conn, $query); 
if($result) {
    $row = mysqli_fetch_assoc($result);
   $tripID = $row['trip_id'];
}
else {
    $error = mysqli_error($conn); 
    print(json_encode($error));
}

$addQuery = "INSERT INTO `user_trip_overview`(`user_id`,`trip_id`) VALUES ('$userID', '$tripID')";
$result2 = mysqli_query($conn, $addQuery);
if ($result2) {
    if (mysqli_affected_rows($conn) > 0) {
        $output['success'] = true; 
        // $newID = mysqli_insert_id($conn);
        print(json_encode($output));
        // echo "successful added $userID and $tripID and $newID"; 
        
    }

}
else {
    $error = mysqli($conn);
    print(json_encode($error));
}
?> 
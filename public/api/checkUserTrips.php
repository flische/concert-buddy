<?php
session_start();
header("Access-Control-Allow-Origin: *");
$userID  = $_SESSION['user_data'][0]['ID'];

require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "SELECT `trips`.`trip_name`,`trips`.`ID` AS `trip_id`, `trips`.`created_user_id`, `concerts`.`venue`, `concerts`.`artist`, `concerts`.`address`, `concerts`.`time`, 
`concerts`.`date`, `concerts`.`latitude`, `concerts`.`longitude`, `concerts`.`img`  
FROM `user_trip_overview` as `usertrip`
JOIN `trips` 
ON `usertrip`.`trip_id` = `trips`.`ID`
JOIN `concerts`
ON `trips`.`concert_id` = `concerts`.`ID` WHERE  `user_id` = '$userID' ";

$result = mysqli_query($conn, $query);

if ($result) {
       $output['success'] = true;
       $row  = mysqli_fetch_assoc($result);
       $output['data'][] = $row;
       $_SESSION['tripData'] = $output['data'];
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}
 $output = json_encode($output);
 print($output);
?>
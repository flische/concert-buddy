<?php
header("Access-Control-Allow-Origin: *");
$userID = 1;
// $_SESSION['id'];
require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "SELECT `trips`.`trip_name`, `trips`.`created_user_id`, `concerts`.`venue`, `concerts`.`artist`, `concerts`.`address`, `concerts`.`time`, `concerts`.`latitude`, `concerts`.`longitude`, `concerts`.`img`  
FROM `user_trip_overview` as `usertrip`
JOIN `trips` 
ON `usertrip`.`trip_id` = `trips`.`ID`
JOIN `concerts`
ON `trips`.`concert_id` = `concerts`.`ID` WHERE  `user_id` = $userID ";

$result = mysqli_query($conn, $query);

if ($result) {
       $output['success'] = true;
       $row  = mysqli_fetch_assoc($result);
       $output['data'] = $row;
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}
 $output = json_encode($output);
 print($output);
?>
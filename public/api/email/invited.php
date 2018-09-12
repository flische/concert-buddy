<?php
header("Access-Control-Allow-Origin: *");
session_start();

$token  = $_POST['token'];
// $token  = "Gx1DjXxDTWZ0enhtlDVQ3YFl9XrbvXdPiqmIQts0ytn96Gob9wFVrmLURR"; 


require_once('mysqlconnect.php');
$output = [
    'success'=>false,
];
$query = "SELECT `trips`.`trip_name`,`trips`.`ID` AS `trip_id`, `trips`.`created_user_id`, `concerts`.`venue`, `concerts`.`artist`, `concerts`.`address`, `concerts`.`time`, 
`concerts`.`date`, `concerts`.`latitude`, `concerts`.`longitude`, `concerts`.`img`  
FROM `triptokens` 
JOIN `trips` 
ON `triptokens`.`trip_id` = `trips`.`ID`
JOIN `concerts`
ON `trips`.`concert_id` = `concerts`.`ID` WHERE  `tokens` = '$token'";
// print_r($query);
$result = mysqli_query($conn, $query);

if ($result) {
       $output['success'] = true;
       $row  = mysqli_fetch_assoc($result);
       $output['data'][] = $row;
     
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}
$trip_id = $output['data'][0]['trip_id'];
$tripquery = "SELECT `user`.`name` 
FROM `user_trip_overview` as `usertrip`
JOIN `trips` 
ON `usertrip`.`trip_id` = `trips`.`ID`
JOIN `user`
ON `usertrip`.`user_id` = `user`.`ID` WHERE  `trip_id` = '$trip_id'";

$tripresult = mysqli_query($conn, $tripquery);

if ($tripresult) {
    while($row = mysqli_fetch_assoc($tripresult)) {
       $output['success'] = true;
       $output['whosGoing'][] = $row['name'];
    }
}
else {
    $error = mysqli_error($conn);
    $output['error'][] = "Database Error! + $error";
}
?> 
<?php 
 header("Access-Control-Allow-Origin: *");
 $trip_id = $_POST["tripID"];
 require_once("mysqlconnect.php");
 $output = [
    'success'=>false,
    'data' => [],
    'error' => []
];
$query = "SELECT `user`.`name` 
FROM `user_trip_overview` as `usertrip`
JOIN `trips` 
ON `usertrip`.`trip_id` = `trips`.`ID`
JOIN `user`
ON `usertrip`.`user_id` = `user`.`ID` WHERE  `trip_id` = '$trip_id'";

$result = mysqli_query($conn, $query);

if ($result) {
    while($row = mysqli_fetch_assoc($result)) {
       $output['success'] = true;
       $output['data'][] = $row['name'];
    }
}
else {
    $error = mysqli_error($conn);
    $output['error'][] = "Database Error! + $error";
}
 $output = json_encode($output);
 print($output);
?>


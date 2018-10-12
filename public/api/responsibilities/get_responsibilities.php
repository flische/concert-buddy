<?php
header("Access-Control-Allow-Origin: *");
session_start();
$tripID  = $_POST["trip_id"];
$output = [
    'success'=> false,
];
$output = [
    'success'=>false,
];
$query = "SELECT * FROM `responsib`
 WHERE  `trip_id` = '$tripID' ORDER BY `completed` ASC, `ID` DESC";

$result = mysqli_query($conn, $query);

if ($result) {
    $output['success'] = true;
    while($row = mysqli_fetch_assoc($result)){
        $row['completed'] = (bool)$row['completed'];
        foreach ($row as $key => $value) {
            $row[$key] = stripslashes(html_entity_decode($value));
        }
         $output['data'][] = $row;
    }
}
else {
    $error = mysqli_error($conn);
    $output['error'] = "Database Error! + $error";
}

?> 
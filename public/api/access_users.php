<?php 
header('Access-Control-Allow-Origin:*');
$action = $_POST['action'];
$sanitizedPost = [];
require_once("mysqlconnect.php");
foreach ($_POST as $key => $value)  {
    $sanitizedPost[$key] = stripslashes(htmlentities($value));
 }
 $_POST = $sanitizedPost;

switch ($action)
{   case 'check_trips':
        include('user_data/checkUserTrips.php');
        break;
    case 'check_going':
        include('user_data/checkWhosGoing.php');
        break;
    case 'create_concerts':
        include('user_data/createConcerts.php');
        break;
    case 'create_trip':
        include('user_data/createTrip.php');
        break;
    case 'delete_concert':
        include('user_data/deleteConcert.php');
        break;
}
$output = json_encode($output);
 print($output);
?> 
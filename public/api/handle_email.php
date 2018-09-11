<?php 
header('Access-Control-Allow-Origin:*');
$action = $_POST['action'];
$sanitizedPost = [];
require_once("mysqlconnect.php");
foreach ($_POST as $key => $value)  {
   $output[$key] = stripslashes(htmlentities($value));
}

switch ($action)
{   case 'send_email':
        include('email/emailInviteFriends.php');
        break;
    case 'invited':
        include('email/invited.php');
        break;
    case 'create_concerts':
        include('email/);
        break;
    case 'create_trip':
        include('user_data/createTrip.php');
}
$output = json_encode($output);
 print($output);
?> 
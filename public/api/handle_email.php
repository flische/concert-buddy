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
{ 
    case 'invited':
        include('email/invited.php');
        break;
    case 'accept_invite':
        include('email/accept_invite.php');
        break;
}
$output = json_encode($output);
 print($output);
?> 
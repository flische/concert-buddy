<?php 
header('Access-Control-Allow-Origin:*');
$action = $_POST['action'];
$sanitizedPost = [];
require_once("mysqlconnect.php");
foreach ($_POST as $key => $value)  {
   $output[$key] = stripslashes(htmlentities($value));
}

switch ($action)
{   case 'existing_login':
        include('userlogin/checkUserLoggedIn.php');
        break;
    case 'user_login':
        include('userlogin/loginCheck.php');
        break;
    case 'user_logout':
        include('userlogin/logout.php');
        break;


}
$output = json_encode($output);
 print($output);
?> 
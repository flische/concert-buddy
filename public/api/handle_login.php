<?php 
header('Access-Control-Allow-Origin:*');
$action = $_POST['action'];
$sanitizedPost = [];
require_once("mysqlconnect.php");
foreach ($_POST as $key => $value)  {
   $sanitizedPost[$key] =  mysqli_real_escape_string($conn, addslashes(htmlentities($value)));
}
$output;

$_POST = $sanitizedPost;
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
    case 'add_user':
        include('userlogin/addUser.php');
        break;
}
$output = json_encode($output);
 print($output);
?>  
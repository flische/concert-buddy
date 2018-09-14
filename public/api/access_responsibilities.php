<?php 
header('Access-Control-Allow-Origin:*');
$action = $_POST['action'];
$sanitizedPost = [];
foreach ($_POST as $key => $value)  {
   $sanitizedPost[$key] =  mysqli_real_escape_string($conn, addslashes(htmlentities($value)));
}
$_POST = $sanitizedPost;

switch ($_POST["action"])
{
    case 'get_responsibilities':
        include('responsibilities/get_responsibilities.php');
        break;
    case 'add_responsibilities':
        include('responsibilities/add_responsibilities.php');
        break;
    case 'delete_responsibilities':
        include('responsibilities/delete_responsibilities.php');
        break;
    case 'edit_responsibilities':
        include('responsibilities/edit_responsibilities.php');
        break;
    case 'get_edit_fields':
        include('responsibilities/get_edit_fields.php');
        break;
    case 'toggle_responsibilities':
        include('responsibilities/toggle_responsibilities.php');
        break;
    default: 
        return;
}
$output = json_encode($output);
 print($output);
?> 

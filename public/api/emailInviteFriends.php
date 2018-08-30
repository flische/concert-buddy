<?php
header("Access-Control-Allow-Origin: *");
session_start();
print_r($_SERVER);
require_once('email_config.php');
// require_once('mysqlconnect.php');
require '../../PHPMailer/src/PHPMailer.php';
require '../../PHPMailer/src/SMTP.php';
require '../../PHPMailer/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
$name = "Howard";
$query = "www.concertbuddy.app/invited?=";
$trip_id = 1;
// print_r($_SERVER); Ask Scoot and collete to set up information
function token() {
 $output = '';
 $alphanum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
 $alphanumLength = strlen($alphanum);
 for ($i = 0; $i < $alphanumLength; $i++) {
    $randomNum = rand(0,$alphanumLength);
$output .= $alphanum["$randomNum"];
 }
 
 return $output;

}

$token = token();

$mail = new PHPMailer;          
$mail->SMTPDebug = 3;                                 // Enable verbose debug output. Change to 0 to disable debugging output.
$mail->isSMTP();                                     // Set mailer to use SMTP.
$mail->Host = 'smtp.gmail.com';                     // Specify main and backup SMTP servers.
$mail->SMTPAuth = true;                            // Enable SMTP authentication
$mail->Username = EMAIL_USER;                     // SMTP username
$mail->Password = EMAIL_PASS;                    // SMTP password
$mail->SMTPSecure = 'tls';                      // Enable TLS encryption, `ssl` also accepted, but TLS is a newer more-secure encryption
$mail->Port = 587;                             // TCP port to connect to
$options = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
$mail->smtpConnect($options);
$mail->From = 'concertbuddy.mailserver@gmail.com';     // sender's email address (shows in "From" field)
$mail->FromName = "Concert Buddy";         // sender's name (shows in "From" field)
// foreach ($_POST['email'] as $value) {
//     return $mail->addAddress("$value", "$name");
// } 
$mail->addAddress("tmpham1@uci.edu","Tien");
$mail->addReplyTo('example@gmail.com');    // Add a reply-to address
                                          // Add attachments
                                         // Optional name
$mail->isHTML(true);                    // Set email format to HTML

$mail->Subject = 'You have been invited to Concert Buddy!';
// $mail->Body    = "Hello <br>  
// You have been invited to $name's trip. This will hold all the information in the trip below. 
// Click the link provided below to sign up and join the trip. Welcome to concert buddy!<br><br><br><a href=\"".$query.$token."\">Accept Trip</a><br>"; 

$mail->Body    = "<body style='font-family: Arial, Helvetica, sans-serif;'>
<header style='color:white;background-color: #2A363B; height: 100px; text-align: center;'>
    <img src='images/logo.png' style='height: 75px; margin-left: 10px; margin-top: 10px; float: left;'>
    <h2 style='color: #FF847C; display: inline-block; padding-top: 15px;'>CONCERT
        BUDDY</h2>
</header>
<div style='color: #2A363B; margin-top: 30px;'>
    <p>Hello!</p>
    <p>You have been invited by your friend, [USER NAME] to go to [CONCERT INFO]. Click the link below to accept or
        decline the invitation.</p>
    <div style='text-align: center;'>
        <a href=\"".$query.$token."\" style='color:#FF847C;'>Invitation Link</a>
    </div>
    <p>Enjoy the concert!</p>
    <p>-Your friends at Concert Buddy</p>
</div>
</body>";


$mail->AltBody = "Hello 
You have been invited to $name's trip. This will hold all the information in the trip below. 
Click the link provided below to sign up and join the trip. Welcome to concert buddy!".$query.$token; 

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    // print(json_encode($token));
} else {
    echo 'Message has been sent';
}

print(json_encode($token));

// function createTripToken($trip_id, $token) {
//     $output = [
//         'success'=> false,
//     ];
//     $query = "INSERT INTO `triptokens`(`trip_id`,`token`)VALUES('$trip_id', '$token')";
//     $result = mysqli_query($conn, $result); 
//     if($result) {
//         if(mysqli_affected_rows($conn) > 0) {
//             $output['success'] = true;
            

//         }
//     }
//     else {
//         echo ("database error! ");
//     }
// }
?>
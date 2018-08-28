<?php
require_once('email_config.php');
require('phpmailer/PHPMailer/PHPMailerAutoload.php');



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
$mail->From = 'concertbuddy@gmail.com';     // sender's email address (shows in "From" field)
$mail->FromName = "Concert Buddy";         // sender's name (shows in "From" field)
foreach ($_POST['email'] as $value) {
    $mail->addAddress("$value", "$name");
} 
$mail->addReplyTo('example@gmail.com');    // Add a reply-to address
                                          // Add attachments
                                         // Optional name
$mail->isHTML(true);                    // Set email format to HTML

$mail->Subject = 'You have been invited to Concert Buddy!';
$mail->Body    =  "Hello <br>  
You have been invited to ______'s trip. This will hold all the information in the trip below. 
Click the link provided below to sign up and join the trip. Welcome to concert buddy!<br>".$POST['query']."<br>"; 

$mail->AltBody = "Hello <br>  
You have been invited to ______'s trip. This will hold all the information in the trip below. 
Click the link provided below to sign up and join the trip. Welcome to concert buddy!<br>".$POST['query']."<br>"; 

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
?>
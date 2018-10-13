<?php
phpinfo();
require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

$mail->isSMTP();                            // Set mailer to use SMTP
$mail->Host = 'smtp.neoveille.org';             // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                     // Enable SMTP authentication
$mail->Username = 'cartier';          // SMTP username
$mail->Password = 'paris13ldi200'; // SMTP password
$mail->SMTPSecure = 'tls';                  // Enable TLS encryption, `ssl` also accepted
$mail->Port = 993;                          // TCP port to connect to

$mail->setFrom('emmanuel.cartier@lipn.univ-paris13.fr', 'Néoveille');
$mail->addReplyTo('emmanuel.cartier@lipn.univ-paris13.fr', 'Néoveille');
$mail->addAddress('ecartierdijon@gmail.com');   // Add a recipient
$mail->addCC('emmanuel.cartier@univ-paris13.fr');
$mail->addBCC('emmanuel.cartier@lipn.univ-paris13.fr');

$mail->isHTML(true);  // Set email format to HTML

$bodyContent = '<h1>How to Send Email using PHP in Localhost by CodexWorld</h1>';
$bodyContent .= '<p>This is the HTML email sent from localhost using PHP script by <b>CodexWorld</b></p>';

$mail->Subject = 'Email from Localhost by CodexWorld';
$mail->Body    = $bodyContent;

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}
?>
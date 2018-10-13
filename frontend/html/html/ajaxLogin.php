<?php
error_reporting(E_ALL);
session_start();

$db = mysqli_connect('localhost','root','neoveille','rssdata');
if(isSet($_POST['username']) && isSet($_POST['password']))
{
	// username and password sent from Form
	$username=mysqli_real_escape_string($db,$_POST['username']); 
//	$password=md5(mysqli_real_escape_string($db,$_POST['password'])); 
	$password=mysqli_real_escape_string($db,$_POST['password']); 

	$result=mysqli_query($db,"SELECT uid, username FROM users WHERE username='$username' and password='$password'");
//	$result=mysqli_query($db,"SELECT uid FROM users WHERE username='ecartier' and password='dijon200'");
	$count=mysqli_num_rows($result);
	//echo($result);
	//echo($count);

	$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
	// If result matched $myusername and $mypassword, table row must be 1 row
	if($count==1)	
	{
		$_SESSION['login_user']=$row['uid'];
		$_SESSION['user']=$row['username'];
		echo $row['uid'];
	}
}
else
{
  echo("No data received for login...");
}





function send_mail($email,$message,$subject)
 {      
  require_once('mailer/class.phpmailer.php');
  $mail = new PHPMailer();
  $mail->IsSMTP(); 
  $mail->SMTPDebug  = 0;                     
  $mail->SMTPAuth   = true;                  
  $mail->SMTPSecure = "ssl";                 
  $mail->Host       = "smtp.gmail.com";      
  $mail->Port       = 465;             
  $mail->AddAddress($email);
  $mail->Username="ecartierdijon@gmail.com";  
  $mail->Password="dijon200";            
  $mail->SetFrom('admin@neoveille.org','Néoveille');
  $mail->AddReplyTo("admin@neoveille.org","Néoveille");
  $mail->Subject    = $subject;
  $mail->MsgHTML($message);
  $mail->Send();
 } 
}
?>

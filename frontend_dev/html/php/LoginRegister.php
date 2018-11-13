<?php
include '../settings.php';
$host = $GLOBALS['database']['host'];
$passmysql = $GLOBALS['database']['pass'] ;
$usermysql = $GLOBALS['database']['user']; 

error_reporting(E_ALL);
session_start();
//echo "<script>alert( 'mysql user : ' . $usermysql . ', password : ' . $passmysql );</script>";

// login form (only used action at the moment) 
if(isSet($_POST['action']) && $_POST['action']=='login')
{
	//echo "In the login action : " . $_POST['username'] . " : " . $_POST['password'];
	login($_POST['username'],$_POST['password'],$usermysql,$passmysql,$host);
}
else if(isSet($_GET['action']) && $_GET['action']=='login')
{
	login($_GET['username'],$_GET['password'],$usermysql,$passmysql,$host);
}


// check $user and $password exist in database/table and put info in global session variable
function login($user,$password,$usermysql,$passmysql,$host){

	$db = mysqli_connect($host,$usermysql,$passmysql,'rssdata');
	if (!$db) {
		echo json_encode(array('False', "Erreur de connexion : " . mysqli_connect_error() . ". Merci de contacter l'administrateur."));
	}
	$q = "SELECT uid, username, user_rights, language FROM users WHERE username='$user' and password='$password'";
	$result=mysqli_query($db,$q);
	if ( false===$result ) {
  		return array('False',"error: %s\n", mysqli_error($db));
	}
    $count = mysqli_num_rows($result);
    $row=mysqli_fetch_array($result,MYSQLI_ASSOC);
	if($count==1)	
	{
		$_SESSION['login_user']=$row['uid'];
		$_SESSION['user']=$row['username'];
		$_SESSION['user_rights']=$row['user_rights'];
		//echo "In the login function : " . $_SESSION['login_user'] . " : " . $_SESSION['user'] . " : " . $_SESSION['user_rights'] . "\n";
		$resp = get_country_code($row['language'],$usermysql,$passmysql,$host);
		if ($resp[0] == 'True'){
			$_SESSION['language']=$resp[1];
			//echo "\nIn the login function : " . $_SESSION['login_user'] . " : " . $_SESSION['user'] . " : " . $_SESSION['user_rights'] . " : " . $_SESSION['language'];
			echo json_encode(array('True', 'OK'));
		}
		else{
			echo json_encode(array('False',$langcode));
		}
	}
}

// retrieve country code and return it to calling function
function get_country_code($lang,$usermysql,$passmysql,$host){

        $db = mysqli_connect($host,$usermysql,$passmysql,'rssdata');
        if (!$db) {
        	return array('False', "Erreur de connexion : " . mysqli_connect_error());
        }
        $q = "SELECT CODE_LANGUE FROM RSS_LANGUE WHERE ID_LANGUE='$lang'";
        $result=mysqli_query($db,$q);
        if ( false===$result ) {
                return array('False', "Erreur : " .  mysqli_error($db));
        }
    	$count = mysqli_num_rows($result);
    	$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
        if($count==1)   
        {
            return array('True', $row['CODE_LANGUE']);
        }
        else {
        	return array('False', $count);
        }
}

function register($uname,$upass,$email,$firstname,$lastname){       
    $db = mysqli_connect('localhost','root','neoveille','rssdata');
    if (!$db) {
    	echo("Erreur de connexion : " . mysqli_connect_error());
    	die;
	}
   	$stmt=mysqli_prepare($db,"INSERT INTO users(username,email,password,firstname,lastname) 
	  	VALUES(?,?,?,?,?)");
    mysqli_stmt_bind_param($stmt,"sssss", $uname, $email, $upass, $firstname, $lastname);
    $res = mysqli_stmt_execute($stmt);
	if ($res) {
    	echo "Enregistrement réussi. Vous pouvez vous connecter";
	} 
	else {
    	echo "Error: " . $stmt . "<br>" . mysqli_error($db);
	}
  mysqli_close($db);
 }

function send_mail($email,$message,$subject){      
  require_once('mailer/class.phpmailer.php');
  $mail = new PHPMailer();
  $mail->IsSMTP(); 
  $mail->SMTPDebug  = 0;                     
  $mail->SMTPAuth   = true;                  
  $mail->SMTPSecure = "ssl";                 
  $mail->Host       = "smtp.gmail.com";      
  $mail->Port       = 465;             
  $mail->AddAddress($email);
  $mail->Username="YOUR EMAIL";  
  $mail->Password="YOUR PASSWORD";            
  $mail->SetFrom('admin@neoveille.org','Néoveille');
  $mail->AddReplyTo("admin@neoveille.org","Néoveille");
  $mail->Subject    = $subject;
  $mail->MsgHTML($message);
  $mail->Send();
 } 
?>

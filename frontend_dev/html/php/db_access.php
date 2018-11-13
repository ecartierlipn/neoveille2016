<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('memory_limit','512M');

$dbname = "neo3";


include_once '../settings.php';

// Create connection
$conn = new mysqli( $GLOBALS['database']['host'],  $GLOBALS['database']['user'],  $GLOBALS['database']['pass'],  'neo3');
//print_r($conn);
// Check connection
if ($conn->connect_error) {
    echo("Connection failed: " . $conn->connect_error);
    die;
}


if (is_ajax()) {
  if (isset($_GET["action"]) && !empty($_GET["action"])) { //Checks if action value exists
    $action = $_GET["action"];
    switch($action) { //Switch case for value of action
      case "bnf": get_data_bnf($conn); break;
      case "neoveille": get_data_neoveille($conn); break;      	
    }
  }
  elseif (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "bnf": get_data_bnf($conn); break;
      case "neoveille": get_data_neoveille($conn); break;      	
    }
 } 
}
else{
  if (isset($_GET["action"]) && !empty($_GET["action"])) { //Checks if action value exists
    $action = $_GET["action"];
    switch($action) { //Switch case for value of action
      case "bnf": get_data_bnf($conn); break;
      case "neoveille": get_data_neoveille($conn); break;      	
    }
  }
  elseif (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "bnf": get_data_bnf($conn); break;
      case "neoveille": get_data_neoveille($conn); break;      	
    }
 } 
}


//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}




// get data for neoveille
function get_data_neoveille($conn){

$conn->set_charset("utf8");
$sql = 'SELECT * FROM neo3.termes_contextes_tmp3 where forme ="' . $_GET["id"] . '";';

$result = $conn->query($sql);
if (!$result) {
    echo("Echec lors de l'exécution de la requête(" . $conn->errno . ") " . $conn->error);
    die;
}
else{
	//print_r($result);
	$data = array();
    while($row = $result->fetch_assoc()) {
    	//print_r($row);
        $data[] = $row;
    }
    //print_r($data);
    $res = json_encode($data);
	//Get the last JSON error.
    $jsonError = json_last_error();
    
    //In some cases, this will happen.
    if(is_null($res) && $res == JSON_ERROR_NONE){
        throw new Exception('Could not decode JSON!');
    }
    else
    {
      echo $res;
    }
    
    //If an error exists.
    if($jsonError != JSON_ERROR_NONE){
        $error = 'Could not decode JSON! ';
        
        //Use a switch statement to figure out the exact error.
        switch($jsonError){
            case JSON_ERROR_DEPTH:
                $error .= 'Maximum depth exceeded!';
            break;
            case JSON_ERROR_STATE_MISMATCH:
                $error .= 'Underflow or the modes mismatch!';
            break;
            case JSON_ERROR_CTRL_CHAR:
                $error .= 'Unexpected control character found';
            break;
            case JSON_ERROR_SYNTAX:
                $error .= 'Malformed JSON';
            break;
            case JSON_ERROR_UTF8:
                 $error .= 'Malformed UTF-8 characters found!';
            break;
            default:
                $error .= 'Unknown error!';
            break;
        }
        throw new Exception($error);
    }
}

$conn->close();
}


// get data for bnf
function get_data_bnf($conn){

$conn->set_charset("utf8");
//$sql = 'SELECT * FROM neonaute.neologismes_fragments where id_token =' . $_GET["id"] . ';';

$sql = 'SELECT t1.forme as lexie, t2.tag as pos, t3.G5_forme, t3.G4_forme, t3.G3_forme,' 
. 't3.G2_forme, t3.G1_forme, t3.D1_forme, t3.D2_forme, t3.D3_forme, t3.D4_forme, t3.D5_forme,'
. 't4.author,  DATE(t4.crawl_date) as date,t4.domain,t4.title,t4.url'
. ' from neonaute.neologismes as t1'
. ' inner join neonaute.neologismes_forms as t2 on t1.id = t2.id_lexie'
. ' inner join neonaute.neologismes_fragments2 as t3 on t2.id = t3.id_forme'
. ' inner join neonaute.documents_metadata as t4 on t3.id_doc = t4.solr_id'
. ' where t1.id=' . $_GET["id"] . ' ORDER BY date;';


$result = $conn->query($sql);
if (!$result) {
    die("Echec lors de l'exécution de la requête(" . $conn->errno . ") " . $conn->error);
}
else{
	//print_r($result);
	$data = array();
    while($row = $result->fetch_assoc()) {
    	//print_r($row);
        $data[] = $row;
    }
    //print_r($data);
    $res = json_encode($data);
	//Get the last JSON error.
    $jsonError = json_last_error();
    
    //In some cases, this will happen.
    if(is_null($res) && $res == JSON_ERROR_NONE){
        throw new Exception('Could not decode JSON!');
    }
    else
    {
      echo $res;
    }
    
    //If an error exists.
    if($jsonError != JSON_ERROR_NONE){
        $error = 'Could not decode JSON! ';
        
        //Use a switch statement to figure out the exact error.
        switch($jsonError){
            case JSON_ERROR_DEPTH:
                $error .= 'Maximum depth exceeded!';
            break;
            case JSON_ERROR_STATE_MISMATCH:
                $error .= 'Underflow or the modes mismatch!';
            break;
            case JSON_ERROR_CTRL_CHAR:
                $error .= 'Unexpected control character found';
            break;
            case JSON_ERROR_SYNTAX:
                $error .= 'Malformed JSON';
            break;
            case JSON_ERROR_UTF8:
                 $error .= 'Malformed UTF-8 characters found!';
            break;
            default:
                $error .= 'Unknown error!';
            break;
        }
        throw new Exception($error);
    }
}

$conn->close();
}
?>

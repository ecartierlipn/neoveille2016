<?php
error_reporting(E_ALL);
include '../credentials.php';
/* $sql_details = array(
	"type" => "Mysql",
	"user" => $usermysql,
	"pass" => $passmysl,
	"host" => "localhost",
	"port" => "3306",
	"db"   => "datatables",
	"dsn"  => "charset=utf8"
);
*/

if (is_ajax()) {
  if (isset($_GET["action"]) && !empty($_GET["action"])) { //Checks if action value exists
    $action = $_GET["action"];
    switch($action) { //Switch case for value of action
      case "check": getFeed($_GET["url"]); break;
      case "find": feedSearch($_GET["url"]); break;
//      case "dict": save_to_dict($_GET["lang"]); break;
	  case "corpusinfo": getcorpusinfo(); break;
      case "dict": 
      	if (isset($_GET["lang"])){
      		save_to_dict_global($_GET["lang"]); break;
      	}
      	else{
      		save_to_dict(); break;
      	}
      	
    }
  }
  elseif (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "check": getFeed($_GET["url"]); break;
      case "find": feedSearch($_GET["url"]); break;
//      case "dict": save_to_dict($_GET["lang"]); break;
	  case "corpusinfo": getcorpusinfo(); break;
      case "dict": 
      	if (isset($_POST["lang"])){
      		save_to_dict_global($_POST["lang"]); break;
      	}
      	else{
      		save_to_dict(); break;
      	}
      	
    }
 } 
}
else{
  if (isset($_GET["action"]) && !empty($_GET["action"])) { //Checks if action value exists
    $action = $_GET["action"];
    switch($action) { //Switch case for value of action
  	  case "patlex": get_patterns($_GET["lex"]); break;
      case "dict": 
      	if (isset($_GET["lang"])){
      		save_to_dict_global($_GET["lang"]); break;
      	}
      	else{
      		save_to_dict(); break;
      	}      	
    }
  }
  elseif (isset($_POST["action"]) && !empty($_POST["action"])) { //Checks if action value exists
    $action = $_POST["action"];
    switch($action) { //Switch case for value of action
      case "check": getFeed($_GET["url"]); break;
      case "find": feedSearch($_GET["url"]); break;
//    case "dict": save_to_dict($_GET["lang"]); break;
	  case "corpusinfo": getcorpusinfo(); break;
	  case "corpusinfo2": echo("corpusinfo2");getcorpusinfo2(); break;
      case "dict": 
      	if (isset($_POST["lang"])){
      		save_to_dict_global($_POST["lang"]); break;
      	}
      	else{
      		save_to_dict(); break;
      	}
      	
    }
 } 
}


//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}


function save_to_dict_global($lang){
  $return = $_POST;
  $tab1 = 'datatables.dico_termino_' . $lang;
  $tab2 = 'datatables.neologismes_' . $lang;
  $connect= mysqli_connect('localhost','root',$passmysl,'datatables'); 
	if (!$connect)
	{
		echo("Can't connect to MySQL Server." . mysqli_connect_error());
		exit;
	}
	
	//if (!(mysqli_query($connect,"CALL insert_into_dico_termino_test($tab1,$tab2)"))){
	//	echo "Problème à l'exécution de la requête:: (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	//}
	if (!(mysqli_query($connect,"CALL insert_into_dico_excluded_global('$lang')"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_excluded_global($lang)': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{
	if (!(mysqli_query($connect,"CALL insert_into_dico_simple_global('$lang')"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_simple_global($lang)': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{
	if (!(mysqli_query($connect,"CALL insert_into_dico_compose_global('$lang')"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_compose_global($lang)': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{
	if (!(mysqli_query($connect,"CALL insert_into_dico_termino_global('$lang')"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_termino_global($lang)': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{

	  echo "Les formes à exclure ont été enlevées de la base et stockées dans le dictionnaire d'exclusion";
	}
	}
	}
	}
}
function save_to_dict(){
  $return = $_POST;
  $connect= mysqli_connect('localhost','root',$passmysl,'datatables'); 
	if (!$connect)
	{
		echo("Can't connect to MySQL Server." . mysqli_connect_error());
		exit;
	}
	
	//if (!(mysqli_query($connect,"CALL insert_into_dico_termino_test($tab1,$tab2)"))){
	//	echo "Problème à l'exécution de la requête:: (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	//}
	if (!(mysqli_query($connect,"CALL insert_into_excluded()"))){
		echo "Problème à l'exécution de la requête 'insert_into_excluded()': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{
	if (!(mysqli_query($connect,"CALL insert_into_dico_fr_simple()"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_fr_simple()': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{
	if (!(mysqli_query($connect,"CALL insert_into_dico_fr_compose()"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_fr_compose()': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{
	if (!(mysqli_query($connect,"CALL insert_into_dico_fr_termino()"))){
		echo "Problème à l'exécution de la requête 'insert_into_dico_fr_termino()': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
	}
	else{

	  echo "Les formes à exclure ont été enlevées de la base et stockées dans le dictionnaire d'exclusion";
	}
	}
	}
	}
}


function get_patterns($lex){
  $res="";
  $conn= mysqli_connect('localhost','root',$passmysl,'rssdata'); 
  mysqli_set_charset($conn,"utf8");
	if (!$conn)
	{
		#echo("Can't connect to MySQL Server." . mysqli_connect_error());
		$res =  "<tr><td colspan='3'>Aucune donnée à retourner, connextion au serveur Mysql impossible. Contactez l'administrateur.</td></tr>";
		echo $res;
	}
	$sql = "SELECT pattern,wikipediafr_20080618_patterns.count as cnt,size,ref, FROM rssdata.wikipediafr_20080618_patterns where pattern LIKE '%" . $lex . "%'";
	#var_dump($sql);
	if (!($result = mysqli_query($conn, $sql))){echo("Erreur : %s\n" .  mysqli_error($conn));}
	else{
		$num = mysqli_num_rows($result);
		if ( $num > 0) {
			$data = array();
			while($row =mysqli_fetch_assoc($result))
    		{
    			#var_dump($row);
       	 		$data[] = $row;
    		}	   
    		var_dump($data);
#    		var_dump($data, json_encode($data, JSON_PARTIAL_OUTPUT_ON_ERROR));
    		echo json_encode($data);
		} 
		else {
    		echo ("No results");
		}
	}
  	mysqli_close($conn);		
}

?>

<?php
error_reporting(E_ALL);



// one to one relation
function get_look_up_data(){
}


function get_one_to_many(){

}

if (isset($_GET["action"]) && !empty($_GET["action"])) { //Checks if action value exists
    $action = $_GET["action"];
    switch($action) { //Switch case for value of action
      case "check": getFeed($_GET["url"]); break;
      case "find": feedSearch($_GET["url"]); break;
//      case "dict": save_to_dict($_GET["lang"]); break;
	  case "corpusinfo": getcorpusinfo(); break;
      case "neo": 
      	if (isset($_GET["lang"])){
      		save_to_neo($_GET["lang"]); break;
      	}
      	else{
      		save_to_neo('fr'); break;
      	}
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
      case "neo": 
      	if (isset($_POST["lang"])){
      		save_to_neo($_POST["lang"]); break;
      	}
      	else{
      		save_to_neo('fr'); break;
      	}
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
      case "check": getFeed($_GET["url"]); break;
      case "find": feedSearch($_GET["url"]); break;
//      case "dict": save_to_dict($_GET["lang"]); break;
	  case "corpusinfo": getcorpusinfo(); break;
  	  case "corpusinfo2": getcorpusinfo2($_GET["lang"]); break;
      case "neo": 
      	if (isset($_GET["lang"])){
      		save_to_neo($_GET["lang"]); break;
      	}
      	else{
      		save_to_neo('fr'); break;
      	}
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
      case "neo": 
      	if (isset($_POST["lang"])){
      		save_to_neo($_POST["lang"]); break;
      	}
      	else{
      		save_to_neo('fr'); break;
      	}
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

function getFeed($feed_url) {
     
    $content = @file_get_contents($feed_url);
    if ($content === False){
    	echo("This URL does not exist. Please check url or try the RSS finder on the main page.");
    	exit();
    }
    else{
    	//echo($content);
    	libxml_use_internal_errors(true);
		try{
    		$x = new SimpleXmlElement($content);
		} 
		catch (Exception $e){
    		echo 'This URL is not well-formed : ' . $e;
    		exit();
		} 
		$res = $x->xpath('/rss/channel');
		$ct = count($res);
		//echo($ct);
    	if ($ct==0){
    		echo("This RSS Feed does not have the expected elements. Please check url or try the RSS finder on the main page.");
    	}
    	else{
			$title = $x->channel->title;
			$link = $x->channel->link;
			$description = $x->channel->description;	
        	$html = "Congratulations! Your URL is a valid RSS feed :\n";
        	$html .= "Title : $title\n";
			$html .= "Description : $description\n";
			$html .= "Link : $link\n";
			$html .= "You can now create the corpus entry.\n";
			echo $html;

//			echo "This RSS is OK. \n" + $x->channel[0]->title + "\nDescription:" + $x->channel[0]->description + "\link:" + $x->channel[0]->link + "\n";
//    		echo "This RSS is OK. \n" + $res[0]->title;
    	}
    		//foreach($x->channel->item as $entry) {
        	//	echo "<li><a href='$entry->link' title='$entry->title'>" . $entry->title . "</a></li>";
    		//}
    	//}
    }
}

function feedSearch($url) {
	$pos = strpos($url, 'http');
	if ($pos === false){
		echo "URL mal formée : placez le préfixe http ou https devant la chaîne (exemple : http://www.lemonde.fr)";
		return;
	}
    if($html = @DOMDocument::loadHTML(file_get_contents($url))) {

        $xpath = new DOMXPath($html);
//        $feeds = $xpath->query("//head/link[@href][@type='application/rss+xml']/@href");
        $feeds = $xpath->query("//head/link[@href][@type='application/rss+xml']/@href");
        //echo var_dump(count($feeds));
        $ct = 0;
		if (count($feeds)>0){
        $res="<table class='display'><tr><td><b>URL</b></td><td><b>Titre</b></td></tr>";
	        foreach($feeds as $feed) {
	        	//echo var_dump($feed);
	        	$ct = $ct+1;
    	    	$title = $xpath->query('../@title', $feed);
				#echo '<p><b>'. $nom . '</b>="' . $valeur->value . '"</p>';
        		$res = $res . '<tr><td>' . $feed->value . '</td>';
        		$res = $res . '<td>' . $title->item(0)->value . '</td></tr>';
        	}
        	if ($ct == 0){echo "Pas de fil RSS trouvé sur ce site : essayez de les trouver directement sur le site (voir la section Aide pour plus d'informations)!";        } 
        	else {echo $res;}
        }
        else
        {
	    	echo "Pas de fil RSS trouvé sur ce site : essayez de les trouver directement sur le site (voir la section Aide pour plus d'informations)!";        
        }
    }
	else{
	    echo "Erreur pour atteindre l'URL : vérifiez qu'elle existe (voir la section Aide pour plus d'informations)!";
	}

}
#feedSearch('http://www.lefigaro.fr');
//print_r(feedSearch('http://www.flickr.com/photos/tags/bristol/'));

function get_google_search($expr){

	$url = 'https://www.google.fr/search?hl=fr&as_epq=%22' . $expr . '%22&lr=lang_fr';
    $content = @file_get_contents($url);
    if ($content === False){
    	echo("This URL does not exist. Please check url or try the RSS finder on the main page.");
    	exit();
    }
    else{
    	libxml_use_internal_errors(true);
		try{
    		$x = new SimpleXmlElement($content);
		} 
		catch (Exception $e){
    		echo 'This URL is not well-formed : ' . $e;
    		exit();
		} 
	}
}


function save_to_neo($lang){
  $connect= mysqli_connect('localhost','root','neoveille','datatables'); 
	if (!$connect)
	{
		echo("Can't connect to MySQL Server." . mysqli_connect_error());
		exit;
	}
	
	if (!(mysqli_query($connect,"CALL insert_into_neo('$lang')"))){
		echo "Problème à l'exécution de la requête 'insert_into_neo($lang)': (" . mysqli_error($connect) . "). Contactez l'administrateur.";
		exit();
	}
	else{

	  echo "Les néologismes validés ont été reversés dans la base de description générale.";
	}
}



function save_to_dict_global($lang){
  $return = $_POST;
  $tab1 = 'datatables.dico_termino_' . $lang;
  $tab2 = 'datatables.neologismes_' . $lang;
  $connect= mysqli_connect('localhost','root','neoveille','datatables'); 
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
  $connect= mysqli_connect('localhost','root','neoveille','datatables'); 
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


function getcorpusinfo(){
  $res="";
  $conn= mysqli_connect('localhost','root','neoveille','rssdata'); 
  mysqli_set_charset($conn,"utf8");
	if (!$conn)
	{
		#echo("Can't connect to MySQL Server." . mysqli_connect_error());
		$res =  "<tr><td colspan='3'>Aucune donnée à retourner, connextion au serveur Mysql impossible. Contactez l'administrateur.</td></tr>";
		echo $res;
	}
	
	$sql = "SELECT country, count(*) as cnt FROM rssdata.rss_data2  group by country order by cnt";
	$result = mysqli_query($conn, $sql);
	$num = mysqli_num_rows($result);
	if ( $num > 0) {
		$data = array();
		while($row =mysqli_fetch_assoc($result))
    	{
        	$data[] = $row;
    	}	   
    	#var_dump($data, json_encode($data, JSON_PARTIAL_OUTPUT_ON_ERROR));
    	echo json_encode($data);
    	 	
	} 
	else {
    	echo ("No results");
	}
  mysqli_close($conn);		
}


function getcorpusinfo2($lang){
  $res="";
  $conn= mysqli_connect('localhost','root','neoveille','rssdata'); 
  mysqli_set_charset($conn,"utf8");
	if (!$conn)
	{
		#echo("Can't connect to MySQL Server." . mysqli_connect_error());
		$res =  "<tr><td colspan='3'>Aucune donnée à retourner, connextion au serveur Mysql impossible. Contactez l'administrateur.</td></tr>";
		echo $res;
	}
	$sql = "SELECT country, count(*) as cnt FROM rssdata.rss_data2  group by country order by cnt";
#	$sql = 'SELECT ANY_VALUE(country) as country, ANY_VALUE(date_format(DATE_CREATED,"%e-%m-%Y")) as date, count(*) as cnt FROM rssdata.rss_data2 where country="' . $lang . '" and DATE_CREATED IS NOT NULL group by date_format(DATE_CREATED,"%e-%m-%Y")';
#	$sql = 'SELECT country, source_link, count(*) as cnt FROM rssdata.rss_data2 group by country';
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

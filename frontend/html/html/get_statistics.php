<?php

if (is_ajax()) {
  if (isset($_GET["lang"]) && !empty($_GET["lang"])) { //Checks if lang value exists
    $lang = $_GET["lang"];
    if ($lang == 'fr'){
    	$tableNeo = 'neologismes';
    }
    else{
    	$tableNeo = 'neologismes_' . $lang;
    }
  }
  else // no get lang info
  {
    $lang = 'fr';
    $tableNeo = 'neologismes';
  }
}
else // no ajax
{
  $lang = 'fr';
  $tableNeo = 'neologismes';
}


//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}



    $user = "root"; 
    $password = "root";   
    $host = "localhost";
    $database="datatables";

    $mysqli = new mysqli($host, $user, $password, $database);

	if ($mysqli->connect_errno) {
	    echo "Error: Failed to make a MySQL connection, here is why: \n";
    	echo "Errno: " . $mysqli->connect_errno . "\n";
    	echo "Error: " . $mysqli->connect_error . "\n";  
    	exit;
}
	//echo($tableNeo . "\n");
    $sql = "SELECT type, count(lexie) as count from " . $tableNeo . " where type > 'néo' group by type order by count DESC;";
    //echo($sql);
	if (!$result = $mysqli->query($sql)) {
	    echo "Error: Our query failed to execute and here is why: \n";
	    echo "Query: " . $sql . "\n";
	    echo "Errno: " . $mysqli->errno . "\n";
	    echo "Error: " . $mysqli->error . "\n";
    	exit;
	}
	if ($result->num_rows === 0) {
	    echo "We could not find a match for ID $aid, sorry about that. Please try again.";
	    exit;
	}

	$res = array();
	while ($row = mysqli_fetch_assoc($result)) {
		//echo $row;
		$res[] = $row;
	}
	var_dump($res);

    $json = json_encode($res);

	var_dump($json);

    $result->free();
    $mysqli->close();
?>
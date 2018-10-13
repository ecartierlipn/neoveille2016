<?php
session_start();
//error_reporting(E_ALL);
//ini_set('display_errors', '1');

include '../credentials.php';
$sql_details = array(
	"type" => "Mysql",
	"user" => $usermysql,
	"pass" => $passmysl,
	"host" => "localhost",
	"port" => "3306",
	"db"   => "neoveille_sem",
	"dsn"  => "charset=utf8"
);



if (is_ajax()) {
  if (isset($_GET["type"]) && !empty($_GET["type"])) { //Checks if lang value exists
    $type = $_GET["type"];
  }
  else // no get lang info
  {
    $type = 1;
  }
}
else // no ajax
{
  $type = 1;
}

# 
if ($type==1) ## new words :  diff87-06 == 0
{
	$val = 0;
	$op = '=';
}
else if ($type==2) ## big increase:  diff87-06 < 0.5
{
	$val = 0.5;
	$op = '<';
}
else if ($type==3) ## dead words : diff87-06 == inf
{
	$val = 1000;
	$op = '=';

}
else if ($type==4) ## big steep in frequency  : diff87-06 > 1.5
{
	$val = 1.5;
	$op = '>';
}
/*
else if($type==3) ## no change : diff87-07 = 1 ABS( number - 1 )
{

}*/


//Function to check if the request is an AJAX request
function is_ajax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}



// DataTables PHP library
include( "lib/DataTables.php" );


// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Mjoin,
	DataTables\Editor\Upload,
	DataTables\Editor\Validate;


// Build our Editor instance and process the data coming from _POST
Editor::inst( $db, 'neosem-freq'  )
	->fields(
		Field::inst( 'word' ),
		Field::inst( 'pos' ),
		Field::inst( 'annotation' ),
		Field::inst( 'relative_freq8788' ),
		Field::inst( 'relative_freq0506' ),
		Field::inst( 'freq8788' ),
		Field::inst( 'freq0506' ),
		Field::inst( 'relative_freq_pos8788' ),
		Field::inst( 'relative_freq_pos0506' ),
		Field::inst( 'diff87-06' )
	)
	->where('diff87-06',$val,$op)
	//->where(function($r){
	//	->$r->or_where('freq8788',20,'>');
	//	->$r->or_where('freq0506',20,'>');
	//	})
	->process( $_POST )
	->json();

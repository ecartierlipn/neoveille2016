<?php
session_start();
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
/*
 * Example PHP implementation used for the index.html example
 */
//echo "<script>console.log( 'SESSION VARIABLES - LANGUAGE : " . dirname(__FILE__) . "' );</script>";
//echo(dirname(__FILE__));
include ('../credentials.php');
$sql_details = array(
	"type" => "Mysql",
	"user" => $usermysql,
	"pass" => $passmysl,
	"host" => "localhost",
	"port" => "3306",
	"db"   => "datatables",
	"dsn"  => "charset=utf8"
);




// DataTables PHP library
include( "lib/DataTables.php" );
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


// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Mjoin,
	DataTables\Editor\Upload,
	DataTables\Editor\Validate;


// Build our Editor instance and process the data coming from _POST
Editor::inst( $db, $tableNeo  )
	->fields(
		Field::inst('created_by' )->set( Field::SET_CREATE ),
        Field::inst( 'last_modified_by' )->set( Field::SET_EDIT ),
		Field::inst( 'lexie' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'type' )
			->options( 'neologismes_types', 'TYPE_NAME', 'TYPE_NAME' )
            ->validator( 'Validate::dbValues' ),
//			->validator( 'Validate::notEmpty' ),
		Field::inst( 'commentaire' ),
		Field::inst( 'info_auto' ),
		Field::inst( 'frequence' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'date' )
			->validator( 'Validate::dateFormat', array(
				"format"  => Format::DATE_ISO_8601,
				"message" => "Please enter a date in the format yyyy-mm-dd"
			) )
			->getFormatter( 'Format::date_sql_to_format', 'Y-m-d H:i:s' )
			->setFormatter( 'Format::date_format_to_sql', 'Y-m-d H:i:s' )
	)
	->on( 'preCreate', function ( $editor, $values ) {
        $editor
            ->field( 'created_by' )
            ->setValue( $_SESSION['user'] );
    } )
    ->on( 'preEdit', function ( $editor, $values ) {
        $editor
            ->field( 'last_modified_by' )
            ->setValue( $_SESSION['user'] );
    })
    ->where('is_saved_in_db','0','=')
	->process( $_POST )
	->json();

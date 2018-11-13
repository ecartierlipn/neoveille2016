<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', '1');


/*
 * Edit the following with your database connection options
 */
include_once '../settings.php';

$sql_details = array(
	"type" => "Mysql",
	"user" => $GLOBALS['database']['user'],
	"pass" => $GLOBALS['database']['pass'],
	"host" => "localhost",
	"port" => "3306",
	"db"   => "datatables",
	"dsn"  => "charset=utf8"
);



include( "../../lib/Editor/php/DataTables.php" );


if (isset($_GET["lang"]) && !empty($_GET["lang"])) { //Checks if lang value exists
    if ($_GET["lang"] = 'fr') {
    	$lang = $_GET["lang"];
 		$table = 'dico_fr_termino';
    }
    else {
    	$lang = $_GET["lang"];
 		$table = 'dico_termino_' . $lang;
 	}
}
else {
	$lang = $_GET["lang"];
 	$table = 'dico_fr_termino';
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
Editor::inst( $db, $table  )
	->fields(
		Field::inst( 'lexie' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'infomorph' ),
			//->options( 'pos_types', 'TYPE_NAME', 'TYPE_NAME' )
            //->validator( 'Validate::dbValues' ),
		Field::inst( 'timestamp' )
			->validator( 'Validate::dateFormat', array(
				"format"  => Format::DATE_ISO_8601,
				"message" => "Please enter a date in the format yyyy-mm-dd"
			) )
			->getFormatter( 'Format::date_sql_to_format', 'Y-m-d H:i:s' )
			->setFormatter( 'Format::date_format_to_sql', 'Y-m-d H:i:s' )
//			->getFormatter( 'Format::date_sql_to_format', Format::DATE_ISO_8601 )
//			->setFormatter( 'Format::date_format_to_sql', Format::DATE_ISO_8601 )
	)
	->process( $_POST )
	->json();

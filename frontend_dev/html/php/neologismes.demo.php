<?php
/*
 * Example PHP implementation used for the index.html example
 */
require_once '../settings.php';

$sql_details = array(
	"type" => "Mysql",
	"user" => $GLOBALS['database']['user'],
	"pass" => $GLOBALS['database']['pass'],
	"host" => "localhost",
	"port" => "3306",
	"db"   => "datatables",
	"dsn"  => "charset=utf8"
);


// DataTables PHP library
include( "../../lib/Editor/php/DataTables.php" );
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
		Field::inst( 'lexie' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'type' )
			->options( 'neologismes_types', 'TYPE_NAME', 'TYPE_NAME' )
            ->validator( 'Validate::dbValues' ),
//			->validator( 'Validate::notEmpty' ),
		Field::inst( 'commentaire' ),
		//Field::inst( 'info_auto' ),
		Field::inst( 'frequence' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'date' )
			->validator( 'Validate::dateFormat', array(
				"format"  => Format::DATE_ISO_8601,
				"message" => "Please enter a date in the format yyyy-mm-dd"
			) )
			->getFormatter( 'Format::date_sql_to_format', 'Y-m-d H:i:s' )
			->setFormatter( 'Format::date_format_to_sql', 'Y-m-d H:i:s' )
//			->getFormatter( 'Format::date_sql_to_format', Format::DATE_ISO_8601 )
//			->setFormatter( 'Format::date_format_to_sql', Format::DATE_ISO_8601 )
	)
	->where('type','néo','>')
//	->where('frequence','100','>')
	->where('date','(NOW() - INTERVAL 120 DAY)','>=')
	
	->process( $_POST )
	->json();

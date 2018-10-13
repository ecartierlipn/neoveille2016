<?php
/*
 * Example PHP implementation used for the index.html example
 */
include '../credentials.php';
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



// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Mjoin,
	DataTables\Editor\Upload,
	DataTables\Editor\Validate;

// Build our Editor instance and process the data coming from _POST
Editor::inst( $db, 'neologismes' )
	->fields(
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
//			->getFormatter( 'Format::date_sql_to_format', Format::DATE_ISO_8601 )
//			->setFormatter( 'Format::date_format_to_sql', Format::DATE_ISO_8601 )
	)
	->process( $_POST )
	->json();

<?php
session_start();
/*
 * Editor server script for DB table RSS_INFO
 * Created by http://editor.datatables.net/generator
 */

// DataTables PHP library and database connection
//error_reporting("E_ALL");
//phpinfo();
// Enable error reporting for debugging (remove for production)
error_reporting(E_ALL);
ini_set('display_errors', '1');


/*
 * Edit the following with your database connection options
 */
$sql_details = array(
	"type" => "Mysql",
	"user" => "root",
	"pass" => "neoveille",
	"host" => "localhost",
	"port" => "3306",
	"db"   => "rssdata",
	"dsn"  => "charset=utf8"
);


/*
 * Editor server script for DB table RSS_JOURNAL
 * Created by http://editor.datatables.net/generator
 */

// DataTables PHP library and database connection
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
Editor::inst( $db, 'RSS_FORMAT', 'ID_FORMAT' )
	->fields(
		Field::inst( 'RSS_FORMAT.NAME_FORMAT' ),
		Field::inst( 'RSS_FORMAT.DESC_FORMAT' )
	)
	->process( $_POST )
	->json();

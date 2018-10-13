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
include '../credentials.php';
$sql_details = array(
        "type" => "Mysql",
        "user" => $usermysql,
        "pass" => $passmysl,
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
Editor::inst( $db, 'RSS_LANGUE', 'ID_LANGUE' )
	->fields(
		Field::inst( 'RSS_LANGUE.NAME_LANGUE' ),
		Field::inst( 'RSS_LANGUE.CODE_LANGUE' )
	)
	->process( $_POST )
	->json();

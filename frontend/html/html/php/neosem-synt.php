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
Editor::inst( $db, 'neoveille_lexpos_patterns'  )
	->fields(
		Field::inst( 'wordpos' ),
		Field::inst( 'comment' ),
		Field::inst( 'totalcorpus1' ),
		Field::inst( 'totalcorpus2' ),
		Field::inst( 'filedetails' ),
		Field::inst( 'lexpospatterns1' ),
		Field::inst( 'lexpospatterns2' ),
		Field::inst( 'pospatterns1' ),
		Field::inst( 'pospatterns2' ),
		Field::inst( 'possimilarity' ),
		Field::inst( 'commonpos' ),
		Field::inst( 'misspos1' ),
		Field::inst( 'misspos2' ),
		Field::inst( 'miss1lexpos' ),
		Field::inst( 'miss2lexpos' ),
		Field::inst( 'commonlexpos' )
	)
	->process( $_POST )
	->json();

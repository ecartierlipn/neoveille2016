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
	"db"   => "datatables",
	"dsn"  => "charset=utf8"
);





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
Editor::inst( $db, 'neo_tools_debug', 'id' )
	->fields(
		Field::inst( 'neo_tools_debug.module' )
			->options( 'neo_tools_debug_module_def', 'id', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'neo_tools_debug_module_def.description' ),
		
		Field::inst( 'neo_tools_debug.type' )
			->options( 'neo_tools_debug_type_def', 'id', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'neo_tools_debug_type_def.description' ),
		
		Field::inst( 'neo_tools_debug.message' ),

		Field::inst( 'neo_tools_debug.state' )
			->options( 'neo_tools_debug_state_def', 'id', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'neo_tools_debug_state_def.description' ),
        
		Field::inst( 'neo_tools_debug.author' )
    )
    ->on( 'preCreate', function ( $editor, $values ) {
        $editor
            ->field( 'neo_tools_debug.author' )
            ->setValue( $_SESSION['user'] );
        $editor
            ->field( 'neo_tools_debug.state' )
            ->setValue( '1' );
    } )
	->leftJoin( "neo_tools_debug_module_def", "neo_tools_debug_module_def.id", "=", "neo_tools_debug.module" )
	->leftJoin( "neo_tools_debug_type_def", "neo_tools_debug_type_def.id", "=", "neo_tools_debug.type" )
	->leftJoin( "neo_tools_debug_state_def", "neo_tools_debug_state_def.id", "=", "neo_tools_debug.state" )
	->process( $_POST )
	->json();

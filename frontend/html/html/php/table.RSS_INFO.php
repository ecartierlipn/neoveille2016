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
Editor::inst( $db, 'RSS_INFO', 'ID_RSS' )
	->fields(
		Field::inst( 'RSS_INFO.NAME_RSS' )
			->validator( 'Validate::url' , array(
    								'required' => true,
    								'messsage' => "Saisissez une url valide"
			) ),
			//->validator( function ( $val, $data, $opts ) {
    		//		return check_url($val);
			//} ),
		Field::inst( 'RSS_INFO.ID_PAYS' )
			->options( 'RSS_PAYS', 'ID_PAYS', 'NAME_PAYS' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'RSS_PAYS.NAME_PAYS' ),
		Field::inst( 'RSS_INFO.ID_LANGUE' )
			->options( 'RSS_LANGUE', 'ID_LANGUE', 'NAME_LANGUE' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'RSS_LANGUE.NAME_LANGUE' ),
		Field::inst( 'RSS_INFO.ID_JOURNAL' )
			->options( 'RSS_JOURNAL', 'ID_JOURNAL', 'NAME_JOURNAL' )
			->validator( 'Validate::dbValues' ),
		Field::inst( 'RSS_JOURNAL.NAME_JOURNAL' ),
		Field::inst( 'RSS_INFO.ID_TYPE' )
			->options( 'RSS_TYPE', 'ID_TYPE', 'NAME_TYPE' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'RSS_TYPE.NAME_TYPE' ),
		Field::inst( 'RSS_INFO.ID_FREQUENCE' )
			->options( 'RSS_FREQUENCE', 'ID_FREQUENCE', 'NAME_FREQUENCE' )
            ->validator( 'Validate::dbValues' ),
            Field::inst( 'RSS_FREQUENCE.NAME_FREQUENCE' ),
		Field::inst( 'RSS_INFO.ID_LOCALITE' )
			->options( 'RSS_LOCALITE', 'ID_LOCALITE', 'NAME_LOCALITE' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'RSS_LOCALITE.NAME_LOCALITE' ),
		Field::inst( 'RSS_INFO.ID_FORMAT' )
			->options( 'RSS_FORMAT', 'ID_FORMAT', 'NAME_FORMAT' )
            ->validator( 'Validate::dbValues' ),
		Field::inst( 'RSS_FORMAT.NAME_FORMAT' ),
		Field::inst( 'RSS_INFO.ID_ENCODING' )
			->options( 'RSS_ENCODING', 'ID_ENCODING', 'NAME_ENCODING' )
            ->validator( 'Validate::dbValues' ),
		Field::inst( 'RSS_ENCODING.NAME_ENCODING' ),
		Field::inst( 'RSS_INFO.created_by' )->set( Field::SET_CREATE ),
        Field::inst( 'RSS_INFO.last_modified_by' )->set( Field::SET_EDIT )
    )
    ->on( 'preCreate', function ( $editor, $values ) {
        $editor
            ->field( 'RSS_INFO.created_by' )
            ->setValue( $_SESSION['user'] );
    } )
    ->on( 'preEdit', function ( $editor, $values ) {
        $editor
            ->field( 'RSS_INFO.last_modified_by' )
            ->setValue( $_SESSION['user'] );
    })
	->leftJoin( 'RSS_PAYS', 'RSS_PAYS.ID_PAYS', '=', 'RSS_INFO.ID_PAYS' )
	->leftJoin( 'RSS_LANGUE', 'RSS_LANGUE.ID_LANGUE', '=', 'RSS_INFO.ID_LANGUE' )
	->leftJoin( 'RSS_JOURNAL', 'RSS_JOURNAL.ID_JOURNAL', '=', 'RSS_INFO.ID_JOURNAL' )
	->leftJoin( 'RSS_TYPE', 'RSS_TYPE.ID_TYPE', '=', 'RSS_INFO.ID_TYPE' )
	->leftJoin( 'RSS_FREQUENCE', 'RSS_FREQUENCE.ID_FREQUENCE', '=', 'RSS_INFO.ID_FREQUENCE' )
	->leftJoin( 'RSS_LOCALITE', 'RSS_LOCALITE.ID_LOCALITE', '=', 'RSS_INFO.ID_LOCALITE' )
	->leftJoin( 'RSS_FORMAT', 'RSS_FORMAT.ID_FORMAT', '=', 'RSS_INFO.ID_FORMAT' )
	->leftJoin( 'RSS_ENCODING', 'RSS_ENCODING.ID_ENCODING', '=', 'RSS_INFO.ID_ENCODING' )
	->process( $_POST )
	->json();

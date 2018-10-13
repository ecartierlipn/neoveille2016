<?php
session_start();
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
        "db"   => "rssdata",
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
Editor::inst( $db, 'users','uid'  )
	->fields(
		Field::inst( 'users.username' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'users.password' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'users.email' )->validator( 'Validate::notEmpty' ),
//		Field::inst( 'joining_date' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'users.firstname' ),
		Field::inst( 'users.lastname' ),
		Field::inst( 'users.user_rights' )->validator( 'Validate::notEmpty' ),
		Field::inst( 'users.language' )
			->options( 'RSS_LANGUE', 'ID_LANGUE', 'NAME_LANGUE' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'RSS_LANGUE.NAME_LANGUE' )
/*,
		Field::inst( 'users.rights_corpus' )
			->options( 'users_right_def', 'uid', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'lf1.description' ),

		Field::inst( 'users.rights_neoform' )
			->options( 'users_right_def', 'uid', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'lf3.description' ),

		Field::inst( 'users.rights_neosem' )
			->options( 'users_right_def', 'uid', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'lf4.description' ),

		Field::inst( 'users.rights_dict' )
			->options( 'users_right_def', 'uid', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'lf2.description' ),

		Field::inst( 'users.rights_neodb' )
			->options( 'users_right_def', 'uid', 'description' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'lf5.description' )*/
	)
/*	->leftJoin( 'users_right_def as lf1', 'lf1.uid', '=', 'users.rights_corpus' )
	->leftJoin( 'users_right_def as lf2', 'lf2.uid', '=', 'users.rights_dict' )
	->leftJoin( 'users_right_def as lf3', 'lf3.uid', '=', 'users.rights_neoform' )
	->leftJoin( 'users_right_def as lf4', 'lf4.uid', '=', 'users.rights_neosem' )
	->leftJoin( 'users_right_def as lf5', 'lf5.uid', '=', 'users.rights_neodb' )*/
	->leftJoin( 'RSS_LANGUE', 'RSS_LANGUE.ID_LANGUE', '=', 'users.language' )
	->where('users.username',$_SESSION['user'],'=')
	->process( $_POST )
	->json();

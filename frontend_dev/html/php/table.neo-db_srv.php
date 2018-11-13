<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', '1');
ini_set('memory_limit','264M');

include_once '../settings.php';

$sql_details = array(
	"type" => "Mysql",
	"user" => $GLOBALS['database']['user'],
	"pass" => $GLOBALS['database']['pass'],
	"host" => "localhost",
	"port" => "3306",
	"db"   => "neo3",
	"dsn"  => "charset=utf8"
);



$lang='';
// DataTables PHP library
include( "../../lib/Editor/php/DataTables.php" );


if (is_ajax()) {
  if (isset($_GET["lang"]) && !empty($_GET["lang"])) { //Checks if lang value exists
    $lang = $_GET["lang"];
  }
  else // no get lang info
  {
    $lang = 'fr';
  }
}
else // no ajax
{
  $lang = 'fr';
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
Editor::inst( $db, 'termes_copy'  )
	->fields(
//		Field::inst( 'termes_copy.date' )->set( Field::SET_CREATE ),
        Field::inst( 'termes_copy.last_update' )->set( Field::SET_EDIT ),
	Field::inst( 'termes_copy.last_update_author' )->set( Field::SET_EDIT ),

	Field::inst( 'termes_copy.terme' )->validator( 'Validate::notEmpty' ),
	Field::inst( 'termes_copy.matrice_neo' )
		->options( 'matrice_neo_def', 'id', 'description' )
	        ->validator( 'Validate::dbValues' ),
        Field::inst( 'matrice_neo_def.description' ),
	Field::inst( 'termes_copy.cat_synt' )
		->options( 'synt_cat_def', 'id', 'cat_synt' )
            	->validator( 'Validate::dbValues' ),
        Field::inst( 'synt_cat_def.cat_synt' ),
	Field::inst( 'termes_copy.hyperclass' )
		->options( 'classe_def', 'id', 'classe' )
            	->validator( 'Validate::dbValues' ),
        Field::inst( 'classe_def.classe' ),
	Field::inst( 'termes_copy.definition' ),
	Field::inst( 'termes_copy.note' ),
	Field::inst( 'termes_copy.config_phonol' ),
	Field::inst( 'termes_copy.config_morpho' ),
	Field::inst( 'termes_copy.config_phonol_details' ),
	Field::inst( 'termes_copy.config_morpho_details' ),
	Field::inst( 'termes_copy.lexie_base' ),
	Field::inst( 'termes_copy.cat_lexie_base' )
		->options( 'synt_cat_def2', 'id', 'cat_synt' )
            	->validator( 'Validate::dbValues' ),
        Field::inst( 'synt_cat_def2.cat_synt' ),
	Field::inst( 'termes_copy.transcat' )
		->options( 'transcat_def', 'id', 'description' )
            	->validator( 'Validate::dbValues' ),
        Field::inst( 'transcat_def.description' ),

		
	//	Field::inst( 'termes_copy.note' ),
		Field::inst( 'termes_copy.influence_langue' )
			->options( 'languages_def', 'languagecode', 'fr_name' )
//languages_def (languagecode,en_name,fr_name,orginal_name)
            ->validator( 'Validate::dbValues' ),
//        Field::inst( 'languages_def.fr_name' ),
	Field::inst( 'termes_copy.langue' )
			->options( 'language_def', 'CODE_LANGUE', 'NAME_LANGUE' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'language_def.NAME_LANGUE' ),		
        Field::inst( 'termes_copy.auteur' ),
        Field::inst( 'termes_copy.frequency' ),
        Field::inst( 'termes_copy.date_first_occ' )
                        ->getFormatter( 'Format::date_sql_to_format', 'Y-m-d' )
                        ->setFormatter( 'Format::date_format_to_sql', 'Y-m-d H:i:s' )
,


		Field::inst( 'termes_copy.influence_mode' )
			->options( 'influence_mode_def', 'id', 'description' )
            ->validator( 'Validate::dbValues' ),
		Field::inst( 'termes_copy.statut' )
			->options( 'statuts_def', 'statusid', 'statusdesc' )
            ->validator( 'Validate::dbValues' ),
        Field::inst( 'statuts_def.statusdesc' ),
		Field::inst( 'termes_copy.date' )
			->set( Field::SET_CREATE )
			->validator( 'Validate::dateFormat', array(
				"format"  => Format::DATE_ISO_8601,
				"message" => "Please enter a date in the format yyyy-mm-dd"
			) )
			->getFormatter( 'Format::date_sql_to_format', 'Y-m-d' )
			->setFormatter( 'Format::date_format_to_sql', 'Y-m-d H:i:s' )
	)
	->on( 'preCreate', function ( $editor, $values ) {
        $editor
            ->field( 'termes_copy.auteur' )
            ->setValue( $_SESSION['user'] );     
    } )
    ->on( 'preEdit', function ( $editor, $values ) {
        $editor
            ->field( 'termes_copy.last_update_author' )
            ->setValue( $_SESSION['user'] );
    })
    ->leftJoin( 'languages_def', 'languages_def.languagecode', '=', 'termes_copy.influence_langue' )
    ->leftJoin( 'language_def', 'language_def.CODE_LANGUE', '=', 'termes_copy.langue' )
    ->leftJoin( 'influence_mode_def', 'influence_mode_def.description', '=', 'termes_copy.influence_mode' )
    ->leftJoin( 'matrice_neo_def', 'matrice_neo_def.id', '=', 'termes_copy.matrice_neo' )
    ->leftJoin( 'synt_cat_def', 'synt_cat_def.id', '=', 'termes_copy.cat_synt' )
    ->leftJoin( 'synt_cat_def2', 'synt_cat_def2.id', '=', 'termes_copy.cat_lexie_base' )
    ->leftJoin( 'transcat_def', 'transcat_def.id', '=', 'termes_copy.transcat' )
    ->leftJoin( 'statuts_def', 'statuts_def.statusid', '=', 'termes_copy.statut' )
    ->leftJoin( 'classe_def', 'classe_def.id', '=', 'termes_copy.hyperclass' )
    ->where('lower(termes_copy.langue)',$lang,'=')
    ->where('YEAR(termes_copy.date)','2014','>')
	->process( $_POST )
	->json();


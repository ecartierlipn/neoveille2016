<?php

/*
 * Example PHP implementation used for the index.html example
 */

// DataTables PHP library
include( "../../php/DataTables.php" );

// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Mjoin,
	DataTables\Editor\Options,
	DataTables\Editor\Upload,
	DataTables\Editor\Validate,
	DataTables\Editor\ValidateOptions;

// Build our Editor instance and process the data coming from _POST
$out = Editor::inst( $db, 'datatables_demo' )
	->fields(
		Field::inst( 'id' )->set(false), // ID is automatically set by the database on create
		Field::inst( 'first_name' )
		->validator( Validate::notEmpty( ValidateOptions::inst()
			->message( 'A first name is required' )	
		) ),
		Field::inst( 'last_name' )
			->validator( Validate::notEmpty( ValidateOptions::inst()
				->message( 'A last name is required' )	
			) ),
		Field::inst( 'position' ),
		Field::inst( 'email' )
			->validator( Validate::email( ValidateOptions::inst()
				->message( 'Please enter an e-mail address' )	
			) ),
		Field::inst( 'office' ),
		Field::inst( 'extn' ),
		Field::inst( 'age' )
			->validator( Validate::numeric() )
			->setFormatter( Format::ifEmpty(null) ),
		Field::inst( 'salary' )
			->validator( Validate::numeric() )
			->setFormatter( Format::ifEmpty(null) ),
		Field::inst( 'start_date' )
			->validator( Validate::dateFormat( 'Y-m-d' ) )
			->getFormatter( Format::dateSqlToFormat( 'Y-m-d' ) )
			->setFormatter( Format::dateFormatToSql('Y-m-d' ) )
	)
	->process( $_POST )
	->data();

// On 'read' remove the DT_RowId property so we can see fully how the `idSrc`
// option works on the client-side.
if ( Editor::action( $_POST ) === Editor::ACTION_READ ) {
	for ( $i=0, $ien=count($out['data']) ; $i<$ien ; $i++ ) {
		unset( $out['data'][$i]['DT_RowId'] );
	}
}

// Send it back to the client
echo json_encode( $out );

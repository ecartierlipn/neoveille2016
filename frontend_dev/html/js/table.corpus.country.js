
/*
 * Editor client script for DB table RSS_JOURNAL
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'php/table.corpus.country.php',
		table: '#RSS_INFO',
		fields: [
			{
				"label": "pays",
				"name": "RSS_PAYS.NAME_PAYS"
			},
			{
				"label": "code",
				"name": "RSS_PAYS.CODE_PAYS"
			}
		],
		i18n: {
            create: {
                button: "Nouveau",
                title:  "Créer nouvelle entrée",
                submit: "Créer"
            },
            edit: {
                button: "Modifier",
                title:  "Modifier entrée",
                submit: "Actualiser"
            },
            remove: {
                button: "Supprimer",
                title:  "Supprimer",
                submit: "Supprimer",
                confirm: {
                    _: "Etes-vous sûr de vouloir supprimer %d lignes?",
                    1: "Etes-vous sûr de vouloir supprimer 1 ligne?"
                }
            },
            error: {
                system: "Une erreur s’est produite, contacter l’administrateur système"
            },
            datetime: {
                previous: 'Précédent',
                next:     'Premier',
                months:   [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
                weekdays: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ]
            }
        }
	} );

// Filter setup - add a text input to each header cell (filter row)
$('#RSS_INFO thead tr:eq(0) th').each( function () {
	title = $(this).text();
	if (title.length > 0){
        $(this).html( '<input type="text" class="column_search form-control" style="font-size: 0.88em;" placeholder="'+title+'"  />' ); // form-control-sm"  
	}
	else{
        $(this).html( '&nbsp;' );  	
	}
    } );

// Apply the filter
$( 'input.column_search').on( 'keyup',function () {
    	//columindex = $(this).parent().index();
    	//columnvalue = columindex.value;
   		//console.log("["+this.value+"]");
        table
            .column( $(this).parent().index() )
            .search( this.value ,true, false) //
            .draw();
    } );


	var table = $('#RSS_INFO').DataTable( {
		dom: 'Bfrtip',
		ajax: 'php/table.corpus.country.php',
		columns: [
			{
				"data": "RSS_PAYS.NAME_PAYS",
				"name":"pays",
				"width":"50%"
			},
			{
				"data": "RSS_PAYS.CODE_PAYS",
				"name":"code",
				"width":"20%"
			}
			/*,
			{
				"data": "RSS_JOURNAL.ID_JOURNAL",
				"name":"id",
				"width":"10%"
			}*/
		],
		select: true,
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor }
			/*,
			{ extend: 'remove', editor: editor }*/
		]
	} );
} );

}(jQuery));


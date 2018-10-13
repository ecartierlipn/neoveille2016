
/*
 * Editor client script for DB table RSS_JOURNAL
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'php/table.RSS_journaux.php',
		table: '#RSS_INFO',
		fields: [
			{
				"label": "Journal",
				"name": "RSS_JOURNAL.NAME_JOURNAL"
			},
			{
				"label": "Description",
				"name": "RSS_JOURNAL.DESC_JOURNAL"
			}
			/*,
			{
				"label": "ID_JOURNAL",
				"name": "RSS_JOURNAL.ID_JOURNAL"
			}*/
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

	var table = $('#RSS_INFO').DataTable( {
		dom: 'Bfrtip',
		ajax: 'php/table.RSS_journaux.php',
		columns: [
			{
				"data": "RSS_JOURNAL.NAME_JOURNAL",
				"name":"journal",
				"width":"20%"
			},
			{
				"data": "RSS_JOURNAL.DESC_JOURNAL",
				"name":"description",
				"width":"70%"
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



/*
 * Editor client script for DB table RSS_JOURNAL
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: 'php/table.neodb-params.php',
		table: '#RSS_INFO',
		fields: [
			{
				"label": "Code",
				"name": "matrice_neo_def.id"
			},
			{
				"label": "Libellé",
				"name": "matrice_neo_def.description"
			},
			{
				"label": "Catégorie de matrice",
				"name": "matrice_neo_def.cat_matrice",
				"type":"select"
			},
			{
				"label": "Sous-catégorie de matrice",
				"name": "matrice_neo_def.sous_cat_matrice",
				"type":"select"
			},
			{
				"label": "Définition",
				"name": "matrice_neo_def.definition",
				"type":"textarea"
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

	var table = $('#RSS_INFO').DataTable( {
		ajax: 'php/table.neodb-params.php',
		dom: '<B>lfrtip',
		fixedHeader: true,
		scrollY: '150vh',
        scrollCollapse: true,
		lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		lengthChange: true,
		select:true,
		columns: [
			{
				"name": "Catégorie de matrice",
				"data": "matrice_neo_def.cat_matrice",
				"width":"20%"
			},
			{
				"name": "Sous-Catégorie de matrice",
				"data": "matrice_neo_def.sous_cat_matrice",
				"width":"20%"
			},
			{
				"name": "Code",
				"data": "matrice_neo_def.id",
				"width":"10%"
			},
			{
				"name": "Libellé",
				"data": "matrice_neo_def.description",
				"width":"10%"
			},
			{
				"name": "Définition",
				"data": "matrice_neo_def.definition",
				"width":"30%"
			}
		],
		select: true,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor }
			/*,
			{ extend: 'remove', editor: editor }*/
		],
		language: {
            processing:     "Traitement en cours...",
            search:         "Rechercher&nbsp;:",
            lengthMenu:     "Afficher _MENU_ &eacute;l&eacute;ments",
            info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            infoPostFix:    "",
            loadingRecords: "Chargement en cours...",
            zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            emptyTable:     "Aucune donnée disponible dans le tableau",
            paginate: {
                first:      "Premier",
                previous:   "Pr&eacute;c&eacute;dent",
                next:       "Suivant",
                last:       "Dernier"
            },
            aria: {
                sortAscending:  ": activer pour trier la colonne par ordre croissant",
                sortDescending: ": activer pour trier la colonne par ordre décroissant"
            }
        }
	} );
} );

}(jQuery));


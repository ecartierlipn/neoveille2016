
jQuery.support.cors = true;
var editorU; // use a global for the submit and return data rendering in the examples
$(document).ready(function() {
	editorU = new $.fn.dataTable.Editor( {
		ajax: "php/user-management.php",
		table: "#usersT",
		display: "envelope",
		fields: [ 
			{
				label: "Utilisateur",
				name: "users.username"
			}, 
			{
				label: "Mot de passe",
				name: "users.password",
				type:"password"
			}, 
			{
				label: "Email",
				name: "users.email"
			}, 
/*			{
				label: "Date d'inscription",
				name: "joining_date"
			}, 
*/			{
				label: "Nom",
				name: "users.firstname"
			}, 
			{
				label: "Prénom",
				name: "users.lastname"
			}, 
			{
				"label": "Langue de travail",
				"name": "users.language",
				"type": "select",
				"placeholder":"Sélectionnez une langue de travail"
			}
			/*,
			{
				label: "Droits de l'utilisateur",
				name: "title",
				type: "title"
			}, 			
			{
				"label": "Droits gestionnaire de corpus",
				"name": "users.rights_corpus",
				"type": "readonly"
				
			},
			{
				"label": "Droits gestionnaire de dictionnaires",
				"name": "users.rights_dict",
				"type": "readonly",
			},
			{
				"label": "Droits gestionnaire des néologismes de forme (candidats)",
				"name": "users.rights_neoform",
				"type": "readonly",
			},
			{
				"label": "Droits gestionnaire des néologismes sémantiques",
				"name": "users.rights_neosem",
				"type": "readonly",
			},
			{
				"label": "Droits gestionnaire d'analyse des néologismes",
				"name": "users.rights_neodb",
				"type": "readonly",
			}*/
		]
,
        i18n: {
            create: {
                button: "Nouveau",
                title:  "Créer nouvel utilisateur",
                submit: "Créer"
            },
            edit: {
                button: "Modifier",
                title:  "Modifier utilisateur",
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

/* New record
    $('a.editorU_create').on('click', function (e) {
        e.preventDefault();
 
        editorU.create( {
            title: 'Créer un nouvel utilisateur',
            buttons: 'Ajouter'
        } );
    } );*/
    
// Edit record
    $('#usersT').on('click', 'td.editorU_edit', function (e) {
        e.preventDefault();
 
        editorU.edit( $(this).closest('tr'), {
            title: 'Editer utilisateur',
            buttons: 'Mettre à jour'
        } );
    } );
 
// Delete a record
	$('#usersT').on('click', 'td.editorU_remove', function (e) {
        e.preventDefault();
 
        editorU.remove( $(this).closest('tr'), {
            title: 'Supprimer compte',
            message: 'Etes-vous sûr de vouloir supprimer votre compte? Vous en pourrez plus accéder à l\'interface d\'édition',
            buttons: 'Delete'
        } );
    } );

// inline editor type field
	$('#usersT').on( 'click', 'tbody td:nth-child(2)', function () {
    editorU.inline( this , {
        submitOnBlur: true
    } );
} );


// filter for each column
/*$(document).ready( function () {
				$('#usersT').dataTable().columnFilter({
					aoColumns: [ 
						{ sSelector: "#example_username",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_email",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_firstname",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_lastname",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_rights",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_language",type: "text", bRegex: true, bSmart: true }						
					]
		});
} );*/


var table = $('#usersT').DataTable( {
		dom: 't',
		bFilter: false,
		fixedHeader: true,
		scrollY: '150vh',
        scrollCollapse: true,
		ajax: "php/user-management.php",
		//lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		//lengthChange: true,
		//order: [[ 1, "desc" ]],
		//select:true,
		columns: [		
			{ data: "users.username", className: 'editable' },
			{ data: "users.email", className: 'editable' },
			{ data: "users.firstname",className: 'editable' },
			{ data: "users.lastname", className: 'editable' },
			{ data: "users.user_rights",   className: 'noteditable' },
			{ data: "RSS_LANGUE.NAME_LANGUE",  className: 'editable' },
			{
                className:      'editorU_edit',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editorU_remove',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
		],
		/*select: {
            style:    'os',
            selector: 'td:first-child'
        },
		buttons: [
			{ extend: "create", editor: editorU },
			{ extend: "edit",   editor: editorU },
			{ extend: "remove", editor: editorU }
			
		],*/
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

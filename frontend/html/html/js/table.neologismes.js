

jQuery.support.cors = true;
var editor; // use a global for the submit and return data rendering in the examples
$(document).ready(function() {
	editor = new $.fn.dataTable.Editor( {
		ajax: "php/dico-ref.php",
		table: "#example",
		display: "envelope",
		fields: [ {
				label: "Néologisme:",
				name: "lexie"
			}, {
				label: "Type:",
				name: "type",
				type: "select",
				placeholder:"Sélectionnez un type"
/*				options: [
					"",
					"erreurs typo(stoplist)",
					"autres erreurs(stoplist)",
					"dictionnaire (mots simples)",
					"dictionnaire (mots composés)",
					"dictionnaire terminologique",
					"néologisme (tous cas)",					
					"néologisme (préfixation)",
					"néologisme (suffixation)",
					"néologisme (dérivation inverse)",
					"néologisme (composition)",
					"néologisme (composition savante)",
					"néologisme (fracto-composition)",
					"néologisme (compocation)",
					"néologisme (factorisation)",
					"néologisme (mot-valise)",
					"néologisme (onomatopée)",
					"néologisme (paronymie)",
					"néologisme (troncation)",
					"néologisme (siglaison)",
					"néologisme (emprunt)"
				]	*/
			}, 			
			{
				label: "Commentaire:",
				name: "commentaire",
				type: "text"
			}

			
			/*{
				label: "Date:",
				name: "date",
				type: "datetime"
			}*/
		]
,
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

// New record
    $('a.editor_create').on('click', function (e) {
        e.preventDefault();
 
        editor.create( {
            title: 'Create new record',
            buttons: 'Add'
        } );
    } );
    
// Edit record
    $('#example').on('click', 'td.editor_edit', function (e) {
        e.preventDefault();
 
        editor.edit( $(this).closest('tr'), {
            title: 'Edit record',
            buttons: 'Update'
        } );
    } );
 
// Delete a record
    $('#example').on('click', 'td.editor_remove', function (e) {
        e.preventDefault();
 
        editor.remove( $(this).closest('tr'), {
            title: 'Delete record',
            message: 'Are you sure you wish to remove this record?',
            buttons: 'Delete'
        } );
    } );

// inline editor type field
$('#example').on( 'click', 'tbody td:nth-child(2)', function () {
    editor.inline( this , {
        submitOnBlur: true
    } );
} );

// inline editor commentaire field
$('#example').on( 'click', 'tbody td:nth-child(3)', function () {
    editor.inline( this , {
        submitOnBlur: true
    } );
} );


// filter for each column
$(document).ready( function () {
				$('#example').dataTable().columnFilter({
					aoColumns: [ 
						{ sSelector: "#example_neo",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_type",type: "text"},
						null,
						{sSelector: "#example_auto", type: "text" },
            			{sSelector: "#example_freq", type: "number" },
            			{sSelector: "#example_date", type: "date" }
					]
		});
} );


	// gestion childrow
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Lexie</td>'+
            '<td>'+d.lexie+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Type</td>'+
            '<td>'+d.type+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}



function formatajax(d,callback) 
{
		//alert(d.lexie)
		var restable='';
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select',
        data:{  q: '"'+d.lexie+'"',
        		rows:20,
        		df:"contents",
        		wt:"json",
        		indent:"false",
        		hl:"true",
        		"hl.fl":"*",
        		"hl.simple.pre":'<span style="background-color: #FFFF00">',
        		"hl.simple.post":"</span>"
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
        async:false,
        success: function( result) {
            data = result.highlighting;
            meta = result.response;
            num = meta.numFound;
            var thead = '<div>' + num + ' résultat(s)</div><th>Source</th><th>Extrait</th>',  tbody = '';
            for (var key in data) 
            {
                var resultRE = key.match(/^.+\.(com|fr|org|net)/);
                tbody += '<tr><td><a title="Voir la source" href="' + key + '" target="source">' + resultRE[0]+ '</a></td><td>';
                var cts = data[key].contents;
                for (var extr in cts)
                {
                	tbody += "..." + cts[extr] +'...<br/>' ;
                }
                //alert(JSON.stringify(data)); 
                tbody += '</td></tr>';
                //$.each(data, function (i, d) {
            	//   tbody += d[i].contents +'<br/>' ;
            	 //  });

            tbody += '</td></tr>';


            }
             //   $.each(data, function (i, d) {
            //	   tbody += d.contents +'<br/>' ;
            //	   });

           // tbody += '</td></tr>';
            restable = '<table>' + thead + tbody + '</table>';
            callback(restable);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(restable)
        }
    });
	//return restable;
}


	var table = $('#example').DataTable( {
		dom: '<B>lfrtip',
		fixedHeader: true,
		scrollY: '150vh',
        scrollCollapse: true,
		ajax: "php/neologismes.php",
		lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		lengthChange: true,
		order: [[ 5, "desc" ]],
		select:true,
		columns: [
/*			{
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },*/
		
			{ data: "lexie", className: 'editable' },
			{ data: "type", className: 'editable' },
			{ data: "commentaire" , className: 'editable'},
			{ data: "info_auto" },
			{ data: "frequence" },
			{ data: "date" }, // for child row
			{
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editor_edit',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editor_remove',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
/*			{
                data: null,
                className: "center",
                defaultContent: '<a href="" class="editor_edit"></a> / <a href="" class="editor_remove"></a>'
            }*/
		],
		select: {
            style:    'os',
            selector: 'td:first-child'
        },
		buttons: [
			{ extend: "create", editor: editor },
			{ extend: "edit",   editor: editor },
			{ extend: "remove", editor: editor }
			
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
	// Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            formatajax(row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data ).show();
        	    tr.addClass('shown');
            }
            );
        }
    } );
} );

function save_to_dict() {
		var request = $.ajax({
			url: "php/dbprocedures.php",
			type: "GET",
			data:{"action":"dict"},			
			dataType: "html"
		});

		request.done(function(msg) {
			//$("#info").html(msg);
			alert(msg)
			$('#example').DataTable().ajax.reload( null, false );			
		});

		request.fail(function(jqXHR, textStatus) {
			alert( "Echec de l'exécution de la requête : " + textStatus );
		});
	}


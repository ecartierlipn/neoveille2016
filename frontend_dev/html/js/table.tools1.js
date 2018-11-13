
/*
 * Editor client script for DB table RSS_INFO
 * Created by http://editor.datatables.net/generator
 */
var editorNeoTools; // use a global for the submit and return data rendering in the examples
var tableNeoTools
$(document).ready(function() {
	editorNeoTools = new $.fn.dataTable.Editor( {
		ajax: 'php/table.neo-tools.php',
		table: '#table-neo-tools',
		//display: 'jqueryui',
		fields: [
			{
				"label": "Module",
				"name": "neo_tools_debug.module",
				"type": "select",
				"placeholder":"Sélectionnez un module"
			},
			{
				"label": "Type",
				"name": "neo_tools_debug.type",
				"type": "select",
				"placeholder":"Sélectionnez un type"
			},
			{
				"label": "Description",
				"name": "neo_tools_debug.message",
				"type":"textarea"
			},
			/*{
				"label": "Etat",
				"name": "neo_tools_debug.state",
				"type": "select",
				"placeholder":"Sélectionnez un état"
			}
			,
			{
				"label": "Auteur",
				"name": "neo_tools_debug.author",
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

    // New record
    $('a.editorNeoTools_create').on('click', function (e) {
        e.preventDefault();
 
        editorNeoTools.create( {
           // title: 'Create new record',
            buttons: 'Add'
        } );
    } );
 
    // Edit record
    $('#table-neo-tools').on('click', 'td.editorNeoTools_edit', function (e) {
        e.preventDefault();
 
        editorNeoTools.edit( $(this).closest('tr'), {
           // title: 'Edit record',
            buttons: 'Update'
        } );
    } );

	// datatable
	tableNeoTools = $('#table-neo-tools').DataTable( {
		dom: '<B>flrtip',
		ajax: 'php/table.neo-tools.php',
		//"orderCellsTop": true,
		columns: [
			{
				"data": "neo_tools_debug_module_def.description",
				"name":"module",
				"width":"10%"
			},
			{
				"data": "neo_tools_debug_type_def.description",
				"name":"type",
				"width":"5%"
			},
			{
				"data": "neo_tools_debug.message",
				"name":"description",
				"width":"55%"
			},
			{
				"data": "neo_tools_debug_state_def.description",
				"name":"state",
				"width":"10%"
			},
			{
				"data": "neo_tools_debug.author",
				"name":"author",
				"width":"5%"
			},
			{
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editorNeoTools_edit',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
		],
		select: true,
		lengthChange: true,
		buttons: [{ extend: 'create', editor: editorNeoTools}, 
			{ extend: 'edit',   editor: editorNeoTools }
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

	// filter for each column
	$('#table-neo-tools').dataTable().columnFilter({
					aoColumns: [ 
						{sSelector: "#filter_module",type: "text", bRegex: true, bSmart: true },
						{sSelector: "#filter_type",type: "text", bRegex: true, bSmart: true },
						{sSelector: "#filter_message", type: "text", bRegex: true, bSmart: true  },
            			{sSelector: "#filter_state", type: "text", bRegex: true, bSmart: true  },
            			{sSelector: "#filter_author", type: "text", bRegex: true, bSmart: true }
					]
		}); 

	// Add event listener for opening and closing details
	$('#table-neo-tools tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableNeoTools.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            //console.log(row.data())
            //alert(JSON.stringify(row.data()));
            getinfo_tools(row.data(), function(data)
            {
    	        row.child(  data ).show();
        	    tr.addClass('shown');
            }
            );
        }
    } );

});

function getinfo_tools(d,callback) 
{
		var langues = {'5':"rss_french", '7':"RSS_polish", '8':'RSS_brasilian', '4':'RSS_chinese', '3':'RSS_russian', '2':'RSS_czech', '6':'RSS_greek'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]);
		query= d.RSS_JOURNAL.NAME_JOURNAL;
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[d.RSS_INFO.ID_LANGUE] + '/select',
        data:{  "q":'source:"'+ d.RSS_JOURNAL.NAME_JOURNAL + '"',
        		rows:0,
        		df:"dateS",
        		facet:"true",
        		//"facet.query":'source:"'+ d.RSS_JOURNAL.NAME_JOURNAL + '"',
        		"facet.field":"dateS",
        		"facet.field":"neologismes",
        		"facet.mincount":"1",
        		"facet.limit":"3000",
        		"wt":"json",
        		"indent":"false",
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
        async:false,
        success: function( result) {
        	//alert(JSON.stringify(result));
            data = result.facet_counts;
            //alert(JSON.stringify(data.facet_fields));
            timeline =data.facet_fields.dateS;
            //alert(JSON.stringify(timeline));
            neolo = data.facet_fields.neologismes;
            //alert(JSON.stringify(neolo));
            num = result.response.numFound;
            var visual = '<div>' + num + ' articles(s)</div>';
            var neol = '<div>' + (neolo.length/2) + ' néologismes(s)</div>';
            var chart = '<div id="chart"></div>';
            var 
            restable = visual + neol + chart + "<div>" +  neolo.join(", ") + "</div>";
            callback(restable);
            build_timeline(neolo);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(restable)
            
        }
    });
}



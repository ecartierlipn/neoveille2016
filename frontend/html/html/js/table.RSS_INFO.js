
/*
 * Editor client script for DB table RSS_INFO
 * Created by http://editor.datatables.net/generator
 */
var editorCorpus; // use a global for the submit and return data rendering in the examples
var tableCorpus
$(document).ready(function() {
	editorCorpus = new $.fn.dataTable.Editor( {
		ajax: 'php/table.RSS_INFO.php',
		table: '#RSS_INFO',
		//display: 'jqueryui',
		fields: [
			{
				"label": "Adresse du fil",
				"name": "RSS_INFO.NAME_RSS"
			},
			{
				"label": "Pays",
				"name": "RSS_INFO.ID_PAYS",
				"type": "select",
				"placeholder":"Sélectionnez un pays"
			},
			{
				"label": "Langue",
				"name": "RSS_INFO.ID_LANGUE",
				"type": "select",
				"placeholder":"Sélectionnez une langue"
			},
			{
				"label": "Journal",
				"name": "RSS_INFO.ID_JOURNAL",
				"type": "select",
				"placeholder":"Sélectionnez un journal"
			},
			{
				"label": "Domaine",
				"name": "RSS_INFO.ID_TYPE",
				"type": "select",
				"placeholder":"Sélectionnez une catégorie"
			},
			{
				"label": "Fr&eacute;quence de parution",
				"name": "RSS_INFO.ID_FREQUENCE",
				"type": "select",
				"placeholder":"Sélectionnez une fréquence"			},
			{
				"label": "National\/R&eacute;gional",
				"name": "RSS_INFO.ID_LOCALITE",
				"type": "select",
				"placeholder":"Sélectionnez le type"
			},
			{
				"label": "Type corpus",
				"name": "RSS_INFO.ID_FORMAT",
				"type": "select",
				"placeholder":"Sélectionnez le type de ressource"
			},
			{
				"label": "Encodage",
				"name": "RSS_INFO.ID_ENCODING",
				"type": "select",
				"placeholder":"Sélectionnez l'encodage",
				"def":"1"
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

    // New record
    $('a.editorCorpus_create').on('click', function (e) {
        e.preventDefault();
 
        editorCorpus.create( {
           // title: 'Create new record',
            buttons: 'Add'
        } );
    } );
 
	// Edit record
    $('#RSS_INFO').on('click', 'td.editorCorpus_edit', function (e) {
        e.preventDefault();
 
        editorCorpus.edit( $(this).closest('tr'), {
           // title: 'Edit record',
            buttons: 'Update'
        } );
    } );
 

// filter for each column
$(document).ready( function () {
				$('#RSS_INFO').dataTable().columnFilter({
					aoColumns: [ 
						{sSelector: "#filter_url",type: "text", bRegex: true, bSmart: true },
						{sSelector: "#filter_pays",type: "text", bRegex: true, bSmart: true },
						{sSelector: "#filter_langue", type: "text", bRegex: true, bSmart: true  },
            			{sSelector: "#filter_journal", type: "text", bRegex: true, bSmart: true  },
            			{sSelector: "#filter_type", type: "text", bRegex: true, bSmart: true },
            			null,
            			{sSelector: "#filter_localite", type: "text", bRegex: true, bSmart: true  },
            			{sSelector: "#filter_format", type: "text", bRegex: true, bSmart: true  },
            			{sSelector: "#filter_encoding", type: "text", bRegex: true, bSmart: true  }
					]
		});
} );


tableCorpus = $('#RSS_INFO').DataTable( {
		dom: '<B>flrtip',
		ajax: 'php/table.RSS_INFO.php',
		//"orderCellsTop": true,
		columns: [
			{
				"data": "RSS_INFO.NAME_RSS",
				"name":"url",
				"width":"10%"
			},
			{
				"data": "RSS_PAYS.NAME_PAYS",
				"name":"pays",
				"width":"5%"
			},
			{
				"data": "RSS_LANGUE.NAME_LANGUE",
				"name":"langue",
				"width":"5%"
			},
			{
				"data": "RSS_JOURNAL.NAME_JOURNAL",
				"name":"journal",
				"width":"10%"
			},
			{
				"data": "RSS_TYPE.NAME_TYPE",
				"name":"type",
				"width":"5%"
			},
			{
				"data": "RSS_FREQUENCE.NAME_FREQUENCE",
				"name":"freq",
				"width":"5%"
			},
			{
				"data": "RSS_LOCALITE.NAME_LOCALITE",
				"name":"localite",
				"width":"5%"
			},

			{
				"data": "RSS_FORMAT.NAME_FORMAT",
				"name":"format",
				"width":"5%"
			},
			{
				"data": "RSS_ENCODING.NAME_ENCODING",
				"name":"encoding",
				"width":"5%"
			},
			{
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editorCorpus_edit',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
            /*,
			{
                className:      'editorCorpus_remove',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }*/
			/*{
                data: null,
                className: "center",
                defaultContent: '<a href="" class="editorCorpus_edit">Edit</a> / <a href="" class="editorCorpus_remove">Delete</a>'
            }*/
		],
		"columnDefs": [ {
    		"targets": 0,
    		"data": "url",
    		"render": function ( data, type, full, meta ) {
        			return '<a target="new" href="'+data+'">'+data.substr( 0, 20 )+'...</a>';
    		}
  		} ],
		select: true,
		lengthChange: true,
		buttons: [
			{ extend: 'create', editor: editorCorpus, 
			  formButtons:[
			  	'Create',
			  	{	label:'Check RSS feed',
			  		fn:function(){
			  				userdata = this.get( 'RSS_INFO.NAME_RSS' );
							//alert (userdata);
							check_rss(userdata);
			  		}
			  	}] },
			{ extend: 'edit',   editor: editorCorpus }
			//,{ extend: 'remove', editor: editorCorpus }
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
var dataC;
// Add event listener for opening and closing details
$('#RSS_INFO tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableCorpus.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            //console.log(row.data())
            //alert(JSON.stringify(row.data()));
            getinfo(row.data(), function(data)
            {
    	        row.child(  data ).show();
        	    tr.addClass('shown');
            }
            );
        }
    } );
});

function check_rss(url) {
		//alert(lang)
		var request = $.ajax({
			url: "php/dbprocedures.php",
			type: "GET",
			data:{"action":"check","url":url},			
			dataType: "html"
		});

		request.done(function(msg) {
			//$("#info").html(msg);
			alert(msg)
		});

		request.fail(function(jqXHR, textStatus) {
			alert( "Echec de l'exécution de la requête : " + textStatus );
		});
	}

function find_rss(url) {
		//alert(lang)
		$("#results").fadeIn();
		$("#results").html("Looking for RSS Feeds in " + url + "...");
		var request = $.ajax({
			url: "php/dbprocedures.php",
			method: "GET",
			data:{"action":"find","url":url},			
			dataType: "html" /*,
			success:function(msg,textStatus,jqXHR){
				$("#results").html(msg);
			},
			error:function(jqXHR,textStatus, error){
				$("#results").html(textStatus + ":" + error);
			},
			complete:function(jqXHR,textStatus){
				$("#results").html();
				return;
			}*/
		});

		request.done(function(msg) {
			//alert("Success:" + msg);
			$("#results")
				.html(msg)
				.css({'background-color':'#e6e6ff','box-shadow':'10px 10px 5px grey', 'padding':'15px',"margin":'15px', "width":'50%'});
			
		});

		request.fail(function(jqXHR, textStatus) {
			//alert("Error :" + textStatus);
			$("#results")
				.html("Echec de l'exécution de la requête : " + textStatus )
				.css({'background-color':'#e6e6ff','box-shadow':'10px 10px 5px grey', 'padding':'15px',"margin":'15px', "width":'50%'});
		});
		//request.always(function(data, textStatus, error) {
		//	alert("Result :" + textStatus + ":" + data + ":" + error);
		//	$("#results").html(data);
		//});

	}

function getinfo(d,callback) 
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

function getinfo2(d,callback) 
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

function build_timeline(jsondata){
d3.json(jsondata, function(json) {

	if (json === null) return; // parse problem, nothing to do here

	// setup data for chart
	
	json.events.forEach(function(p, i) {
		p.date = +p.date; // coerce into right type
	});

	json.events.sort(function(a,b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });

	// instantiate the chart

	var chart = timelineChart(); 
	
	chart.title(function(d) { return d.name; })	// accessor for event title
		 .date(function(d) { return d.date; })	// accessor for event date
		 .details(function(d) { return d.party; })
		 .width(600);							// width of chart

	// join and render

	d3.select("#chart").datum(json.events).call(chart);
});
}


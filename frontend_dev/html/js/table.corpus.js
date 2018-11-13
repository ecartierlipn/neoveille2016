/* 
Corpus datatable-editor and statistics  
see ../table/datatable-corpus-dev.php for layout and logic 
*/


/* corpus datatable editor */

var editorCorpus; // global object for editor
var tableCorpus; // global object for datatable
$(document).ready(function() {


editorCorpus = new $.fn.dataTable.Editor( {
		ajax: 'php/table.corpus.php',
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
				//"placeholder":"Sélectionnez un pays",
				"opts":{tags: true,placeholder: "Sélectionnez un pays"}
			},
			{
				"label": "Langue",
				"name": "RSS_INFO.ID_LANGUE",
				"type": "select",
				//"placeholder":"Sélectionnez une langue"
				"opts":{tags: true,placeholder: "Sélectionnez une langue"}
			},
			{
				"label": "Journal",
				"name": "RSS_INFO.ID_JOURNAL",
				"type": "select",
				//"placeholder":"Sélectionnez un journal"
				"opts":{tags: true,placeholder: "Sélectionnez un journal"}
			},
			{
				"label": "Domaine",
				"name": "RSS_INFO.ID_TYPE",
				"type": "select",
				//"placeholder":"Sélectionnez une catégorie"
				"opts":{tags: true,placeholder: "Sélectionnez un ou des domaines", multiple:true}
			},
			{
				"label": "Fr&eacute;quence de parution",
				"name": "RSS_INFO.ID_FREQUENCE",
				"type": "select",
				//"placeholder":"Sélectionnez une fréquence"
				"opts":{tags: true,placeholder: "Sélectionnez une fréquence de parution"}
			},
			{
				"label": "National\/R&eacute;gional",
				"name": "RSS_INFO.ID_LOCALITE",
				"type": "select",
				//"placeholder":"Sélectionnez le type"
				"opts":{tags: true,placeholder: "Sélectionnez la portée géographique"}
			},
			{
				"label": "Type corpus",
				"name": "RSS_INFO.ID_FORMAT",
				"type": "select",
				//"placeholder":"Sélectionnez le type de ressource"
				"opts":{tags: true,placeholder: "Sélectionnez le format de la source"}
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

// Filter setup - add a text input to each header cell (filter row)
$('#RSS_INFO thead tr:eq(0) th').each( function () {
	title = $(this).text();
	if (title.length > 0){
        $(this).html( '<input type="text" class="column_search form-control" style="width:80px !important; font-size: 0.88em;" placeholder="'+title+'"  />' ); // form-control-sm"  
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
        tableCorpus
            .column( $(this).parent().index() )
            .search( this.value ,true, false) //
            .draw();
    } );



tableCorpus = $('#RSS_INFO').DataTable( {
		dom: '<B>flrtip',
		ajax: 'php/table.corpus.php',
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
				"width":"5%",
				'className' : 'changevis'
			},
			{
				"data": "RSS_LANGUE.NAME_LANGUE",
				"name":"langue",
				"width":"5%",
				'className' : 'changevis'
			},
			{
				"data": "RSS_JOURNAL.NAME_JOURNAL",
				"name":"journal",
				"width":"10%",
				'className' : 'changevis'
			},
			{
				"data": "RSS_TYPE.NAME_TYPE",
				"name":"type",
				"width":"5%",
				'className' : 'changevis'
			},
			{
				"data": "RSS_FREQUENCE.NAME_FREQUENCE",
				"name":"freq",
				"width":"5%",
				'className' : 'changevis'
			},
			{
				"data": "RSS_LOCALITE.NAME_LOCALITE",
				"name":"localite",
				"width":"5%",
				'className' : 'changevis'
			},

			{
				"data": "RSS_FORMAT.NAME_FORMAT",
				"name":"format",
				"width":"5%",
				'className' : 'changevis'
			},
			{
				"data": "RSS_ENCODING.NAME_ENCODING",
				"name":"encoding",
				"width":"5%",
				'className' : 'changevis'
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
			{ extend: 'edit',   editor: editorCorpus },
			,{ 	extend: 'colvis',
				//columns:'.changevis'  // TBD : does not work to remove last two columns 
				editor: editorCorpus, 
				text:"Afficher/Masquer colonnes",
				columnText: function ( tableCorpus, idx, title ) {
						//console.log(tableCorpus.editorCorpus)
						//console.log(tableCorpus.editorCorpus.Field.name())
						return title;
				}
         		}
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
	
	
// Add event listener for opening and closing details (datatable details)
$('#RSS_INFO tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableCorpus.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
        	$.blockUI({
				message:  '<h1>Veuillez patienter...</h1>', 
    			css: {border: 'none',padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px','-moz-border-radius': '10px', opacity: .5, color: '#fff'}
			});
            // Open this row
            //console.log(row.data())
            //alert(JSON.stringify(row.data()));
             
            getinfo2(row.data(), function(data)
            {
    	        row.child(  data ).show();
        	    tr.addClass('shown');  
        	    $.unblockUI();      	    
    			// Render the Charts
  				//dc.renderAll();
            }
            );
        }
    } );
    

});

//  corpus details for newspaper details
function getinfo2(d,callback) 
{
// TBD : parameters for NAME_LANGUE (collections[editor.lang] from settings.php)
		var langues = {'12':'rss_spanish','13':'rss_german','14':'rss_netherlands','10':"rss_italian",'5':"rss_french", '7':"RSS_polish", 
			'8':'RSS_brasilian', '4':'RSS_chinese', '3':'RSS_russian', '2':'RSS_czech', '6':'RSS_greek'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]);
		query= d.RSS_JOURNAL.NAME_JOURNAL;
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url : solr_host  + langues[d.RSS_INFO.ID_LANGUE] + '/select',
        data:{  "q":'source:"'+ d.RSS_JOURNAL.NAME_JOURNAL + '"',
        		rows:300000,
//        		df:"dateS",
        		fl:"dateS,link",
        		facet:"true",
        		//"facet.query":'source:"'+ d.RSS_JOURNAL.NAME_JOURNAL + '"',
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
            docsdata =result.response.docs;/// doc visualization
//            alert(docsdata);
            //neolo = data.facet_fields.neologismes;
            //alert("ok");
            //alert(JSON.stringify(neolo));
            num = result.response.numFound;
			var tablechart = "<div class='span12' id='dc-time-chart'><h4>Articles par semaine (total période : " + num + ")</h4></div><div class='span12'><table class='table table-hover' id='dc-table-graph'><thead><tr class='header'><th>Date</th><th>Article</th></tr></thead></table></div><div class='span12' id='dc-depth-chart'></div> ";
            callback(tablechart);
            build_timeline(docsdata);
            //build_chart(neolo);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(restable)
            
        }
    });
}

// dc timeline chart (for corpus details)
function build_timeline(jsondata)
{
//alert(jsondata);
// Create the dc.js chart objects & link to div
var dataTableDC = dc.dataTable("#dc-table-graph");
var timeChart = dc.lineChart("#dc-time-chart");
//alert(jsondata);
// load data from a csv file
//d3.json(JSON.parse(jsondata), function (data) {

  // format our data
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
    d.dtg   = dtgFormat.parse(d.dateS.substr(0,19));
  //  alert(d.dtg); 
    d.link  = d.link;
  }); 
//});
  
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);

	// create line chart dimensions
    var volumeByHour = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
  });
  var volumeByHourGroup = volumeByHour.group()
    .reduceCount(function(d) { return d.dtg; });

var volumeByMonth = facts.dimension(function(d) {
    return d3.time.month(d.dtg);
  });
var volumeByMonthGroup = volumeByMonth.group()
    .reduceCount(function(d) { return d.dtg; });


var volumeByWeek = facts.dimension(function(d) {
    return d3.time.week(d.dtg);
  });
var volumeByWeekGroup = volumeByWeek.group()
    .reduceCount(function(d) { return d.dtg; });

    
    // min and max date
    var minDate = volumeByHour.bottom(1)[0].date;
    var maxDate = volumeByHour.top(1)[0].date;
    
  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  var width = document.getElementById('RSS_INFO').offsetWidth;
  // time graph
  timeChart
  	.width(width-10)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(volumeByWeek)
    .group(volumeByWeekGroup)
    .transitionDuration(500)
    .xyTipsOn(true) // incompatible with the preceding attribute
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
	.elasticY(true)
    .elasticX(true)
    .turnOnControls(true)
    .controlsUseVisibility(true)

//    .brushOn(true)
    .title(function(d){
      return dtgFormat2(d.jsondata.key)
      + "\nTotal : " + d.jsondata.value;
      })
//    .elasticY(true)
    .x(d3.time.scale().domain([minDate, maxDate]))
    //.x(d3.time.scale().domain([new Date(2016, 3, 01), new Date(2016, 7, 13)]))
    .xAxis();
  
  /// render the datatable
    dataTableDC.width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return "Corpus Table"
	 })
	.size(10)
    .columns([
      function(d) { return d.dtg; },
      function(d) { 
          return '<a href=\"' + d.link + "\" target=\"_blank\">Article</a>"}
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.ascending);
    //alert(dataTableDC);
    
    // Render the Charts
  	dc.renderAll();
}


// helper functions to add new rss feeds

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
		console.log(url)
		$("#resultsRSS").fadeIn();
		$("#resultsRSS").html("Looking for RSS Feeds in " + url + "...");
		var request = $.ajax({
			url: "php/dbprocedures.php",
			method: "GET",
			data:{"action":"find","url":url},			
			dataType: "html" 
			/*,
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
			console.log("Success:" + msg);
			$("#resultsRSS")
				.html(msg)
				.css({'background-color':'#e6e6ff','box-shadow':'10px 10px 5px grey', 'padding':'15px',"margin":'15px', "width":'50%'});
			
		});

		request.fail(function(jqXHR, textStatus) {
			console.log("Error :" + textStatus);
			$("#resultsRSS")
				.html("Echec de l'exécution de la requête : " + textStatus )
				.css({'background-color':'#e6e6ff','box-shadow':'10px 10px 5px grey', 'padding':'15px',"margin":'15px', "width":'50%'});
		});
		//request.always(function(data, textStatus, error) {
		//	alert("Result :" + textStatus + ":" + data + ":" + error);
		//	$("#results").html(data);
		//});

	}



/**************************** CORPUS STATISTICS INFO (second tab )  *****************************/



/* CORPUS INFO BY LANGUAGE */
// buttons for each language
$("a[id^='corpusinfoBtn']").on('click',function(){ // #corpusinfoBtn.."
	language = $(this).attr("language") ;
	thisId = $(this).id
	console.log("button corpusinfoBtn triggered");
	console.log($(this).id);
	console.log($(this).attr("language"));
	$(thisId).replaceWith('<a  class="btn btn-info" id="' + thisId + '"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données...</a>');
    $.blockUI({
				message:  '<h1>Veuillez patienter...</h1>', 
    			css: {border: 'none',padding: '15px', backgroundColor: '#000', '-webkit-border-radius': '10px','-moz-border-radius': '10px', opacity: .5, color: '#fff'}
			});
    get_corpus_info_jsondata_gen(language, function(data)
            {
            	if (typeof data == 'number'){
					$(thisId).replaceWith('<div>Récupération des données effectuées : ' + data + ' articles. Création des graphes en cours...</div>');
					//$(thisId).replaceWith('<div  class="btn btn-info" id="' + thisId + '2"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' articles. Création des graphes en cours...</div>');
				    $("#corpusResults" + language).show();
				    $.unblockUI();
				}
				else{
					$(thisId).replaceWith('<div></i>' + data + '</div>');
					$.unblockUI();				
				}
            }
            );
});

// retrieve data from csv file
// TBD : exception handler for d3.csv
function get_corpus_info_jsondata_gen(lang,callback) 
{
		//var langCSV = {'Nl':'rss_netherlands.csv','De':'rss_german.csv','It':"rss_italian.csv",'Fr':"rss_french.csv", 'Pl':"RSS_polish.csv", 'Br':'RSS_brasilian.csv', 'Ch':'RSS_chinese.csv', 'Ru':'RSS_russian.csv', 'Cz':'RSS_czech.csv', 'Gr':'RSS_greek.csv'};
		//var langues = {'It':"RSS_italian.json",'Fr':"rss_french.json", 'Pl':"RSS_polish.json", 'Br':'RSS_brasilian.json', 'Ch':'RSS_chinese.json', 'Ru':'RSS_russian.json', 'Cz':'RSS_czech.json', 'Gr':'RSS_greek.json'};
		console.log(corpus_synthesis[lang]);
		file = corpus_synthesis[lang] // from settings.php => corpus_synthesis global variable
		console.log(file); 
		d3.csv(file,function(data){
    		console.log(data[0]);
            num = data.length;
            console.log(num)
            if (num == 0){
            	callback("Il n'y a pas d'article pour cette langue actuellement. Réessayer plus tard. Vous pouvez consulter les données consolidées sur ce corpus dans l'onglet 'Toutes les langues'.");
            }
            else{
	            callback(num);
	            console.log(num + "build_corpus_info_lang_cnt function")
	            build_corpus_info_lang_cnt(data,lang);
	        }
    	}
    	/*, function(error, rows) {
        	callback("Probleme au chargement du fichier [" + file + "] : " + error);
        	console.log(error);
		}*/
    );
}

// build the graph for the given lang corpus
function build_corpus_info_lang_cnt(jsondata, lang){

//console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  var dtgFormat = d3.time.format("%Y-%m-%d");
  var dtgFormat_bk = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b");
  
  jsondata.forEach(function(d) { 
  		
  		if (d.dateS.length!=10){console.log(d.dateS);}
    	//d.dtg   = dtgFormat.parse(d.dateS);
    	d.dtg   = dtgFormat.parse(d.dateS.substr(0,10));
    	d.month = d3.time.month(d.dtg);
 		d.newspaper   = d.source;
 		d.country  = d.country;
    	d.subject  = d.subject;
    	d.count = +d.count; // pre-aggregated data by month
  }); 
 console.log("Data Loaded");
 console.log(jsondata[0]);

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll().reduceSum(function(d){return d.count;});
  var allv = Number(facts.groupAll().reduceSum(function(d){return d.count;}).value()); //.toLocaleString();
  //var all = facts.group().reduceSum(function(d){return d.count;});
  //var facts2 = facts.dimension(function (d) { return d.country; });
  //var all = facts2.group().reduceSum(function(d){return d.count;});


/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc-data-count'+lang);
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>' + allv +'</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser tout</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc-data-count2'+lang);
totalCount2 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>' + allv +'</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
  
console.log("Count chart built"); 		   
console.log(totalCount);

/***************************** COUNTRY PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var countryChart = dc.pieChart("#dc-country-chart"+lang);


//  countrychart  dimensions
    var countryDimension = facts.dimension(function (d) { return d.country; });
    var countryGroup = countryDimension.group().reduceSum(function(d){return d.count;});
	console.log("Country groups :" + countryGroup.size());
  
// country chart
 	countryChart
 		.width(500)
        .height(250)
        .cx(300)
        .slicesCap(10)
        .ordering(function (d) {
    			return -d.value
			})
        .innerRadius(30)
        .externalLabels(30)
        .externalRadiusPadding(20)
        .minAngleForLabel(0.5)
        .drawPaths(true)
        .transitionDuration(500)
        .turnOnControls(true)
	    .controlsUseVisibility(true)
        .dimension(countryDimension)
        .group(countryGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("country chart built");
console.log(countryChart);


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart"+lang);
var periodChart = dc.barChart("#range-chart"+lang);

// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
  });
  //console.log(volumeByDay);
  var volumeByDayGroup = volumeByDay.group()
    .reduceSum(function(d) { return d.count; });
    console.log("Week groups :" + volumeByDayGroup.size());

    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].dtg;
 	var maxDate = volumeByDay.top(1)[0].dtg;
	console.log("Min Date : ");
	console.log(minDate);
	console.log("Max Date : ");
	console.log(maxDate);

  // setup timeline graph
  timeChart
  	//.width($("#dc-time-chart"+lang).parent().width()) => see css
    .height(300)
    .margins({top: 10, right: 0, bottom: 20, left: 40})
    .dotRadius(5) //
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .mouseZoomable(true)
    .brushOn(false)
    //.xyTipsOn(true) // incompatible with the preceding attribute
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return d.key
      + "\nTotal : " + d.value;
      })
    //.yAxisLabel("Période temporelle")
    //.xAxisLabel("Nombre d'articles")
    .elasticY(true)
    //.elasticX(true)
    .xUnits(d3.time.month)
    //.turnOnControls(true)
    .renderHorizontalGridLines(true)
    //.controlsUseVisibility(true)
    .rangeChart(periodChart)
    .x(d3.time.scale().domain([minDate, maxDate]));
//    .xAxis();
  
  
  console.log("Time chart built");
  console.log(timeChart);
  
/***************************** range Chart test *******************/


periodChart /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)
        .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByDay)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);
/***************************** SUBJECT PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var subjectChart = dc.pieChart("#dc-subject-chart"+lang);


//  subjectchart  dimensions
    var subjectDimension = facts.dimension(function (d) { return d.subject; });
    var subjectGroup = subjectDimension.group().reduceSum(function(d){return d.count;});
	console.log("Subject groups :" + subjectGroup.size());
  
// subject chart
 	subjectChart
 		.width(500)
        .height(250)
        .cx(300)
        .slicesCap(10)
        .ordering(function (d) {
    			return -d.value
			})
        .innerRadius(30)
        .externalLabels(30)
        .externalRadiusPadding(20)
        .minAngleForLabel(0.5)
        .drawPaths(true)
        .transitionDuration(500)
        .turnOnControls(true)
	    .controlsUseVisibility(true)
        .dimension(subjectDimension)
        .group(subjectGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("Subject chart built");
console.log(subjectChart);

/***************************** NEWSPAPER ROW BAR CHART ***********************/

var newspaperChart = dc.rowChart("#dc-newspaper-chart"+lang);
//var newspaperChartLow = dc.rowChart("#dc-newspaper-chart-low");

//  newspaperchart dimensions (with a fake group to keep just top and bottom 15
    var newspaperDimension = facts.dimension(function (d) { return d.newspaper; });
    //var newspaperDimensionless100 = facts.dimension(function (d) { return d.newspaper; }).filterRange([0, 100]);
    //var newspaperGroup = newspaperDimension.group().reduceCount(function (d) { return d.newspaper; });
    var newspaperGroup = newspaperDimension.group().reduceSum(function(d){return d.count;})
//    var newspaperTopGroup = newspaperGroup.top(15);

/// for top	
function remove_empty_bins(source_group) {
    function non_zero_pred(d) {
        return d.value != 0;
    }
    return {
        all: function () {
            return source_group.all().filter(non_zero_pred);
        },
        top: function(n) {
            return source_group.top(Infinity)
                .filter(non_zero_pred)
                .slice(0, n);
        }
    };
}
//// for low

var newspaperGroupTop = remove_empty_bins(newspaperGroup);
//var newspaperGroupLow = remove_empty_bins_low(newspaperGroup);

console.log("newspaper groups :" + newspaperGroup.size());

// newspaper setup rowschart (TOP)
    newspaperChart
    		.width(500)
            .height(250)
            .dimension(newspaperDimension)
            .group(newspaperGroupTop)
            .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



// x axis label rotation  	: does not work	
newspaperChart.on("renderlet",function (chart) {
   // rotate x-axis labels
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)');
  });   


console.log("Newspapers chart built");
//console.log(newspaperChartLow);
console.log(newspaperChart);

/***************************** DATATABLES CHART ***********************/


// sauvegarde version limitée datatables
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return "Données"})
	.size(20)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
     // function(d) { return d.neolist; },
      function(d) { return d.country; },
      function(d) { return d.subject; },
      function(d) { return d.newspaper; },
      function(d) { return d.dateS; },
      function(d) { return d.count; }
    ])
    .sortBy(function(d){ return d.count; })
    .order(d3.descending);
    //console.log(dataTableDC);
    
console.log("Datatable chart built");
console.log(timeDimension);



/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
//    $("#corpusresults").show();
     //$("#corpusresults").css( "display", "visible !important");
	$("#corpusinfoBtn"+lang).replaceWith('<a href="" class="btn btn-info" id="corpusinfoBtn2Done">Chargement effectué. ' + allv + ' articles. Début de période : ' + minDate.toLocaleString() + '.</a>');
    // Render the Charts
  	dc.renderAll(); 
  	console.log("All is done");

}

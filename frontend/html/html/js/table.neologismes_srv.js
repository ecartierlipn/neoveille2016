//$(document).ready(function() {
// display global variables
console.log("Working Language : " + languageW);
console.log("Solr Host : " + solr_host);
console.log("Available collections : " + collections);

jQuery.support.cors = true;
var editor; // use a global for the submit and return data rendering in the examples
var table;
$(document).ready(function() {
editor = new $.fn.dataTable.Editor( {
		//ajax: "php/neologismes2.php?lang="+languageW,
		ajax: {url:"./php/neologismes2.php?lang="+languageW,type:"POST"},
		table: "#example",
		lang:languageW,
		display: "envelope",
		fields: [ {
				label: "Néologisme:",
				name: "lexie"
			}, {
				label: "Type:",
				name: "type",
				type: "select",
				placeholder:"Sélectionnez un type"
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

editor.lang=languageW;

// New record
$('a.editor_create').on('click', function (e) {
        e.preventDefault();
 
        editor.create( {
            title: 'Créer une nouvelle entrée',
            buttons: 'Ajouter'
        } );
    } );
    
// Edit record
$('#example').on('click', 'td.editor_edit', function (e) {
        e.preventDefault();
 
        editor.edit( $(this).closest('tr'), {
            title: "Edition d'une entrée",
            buttons: 'Actualiser'
        } );
    } );
 
// Delete a record
$('#example').on('click', 'td.editor_remove', function (e) {
        e.preventDefault();
 		//console.log($(this))
        editor.remove( $(this).closest('tr'), {
            title: "Suppression d'une entrée",
            message: 'Etes-vous certain de vouloir supprimer cette entrée (êtes-vous sûr qu\'il ne s\'agit pas d\'une lexie à intégrer à l\'un des dictionnaires d\'exclusion)?',
            buttons: 'Supprimer'
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


// fonction pour changer de langue source pour interface neologismes
$('body').on('change',"#langDisplay",function(){
                val = this.value;
                console.log(val);
                table.language.url("//cdn.datatables.net/plug-ins/1.10.13/i18n/Greek.json");
            });


// function to change language results
$('body').on('change',"#lang",function(){
                val = this.value;
                console.log(val);
                editor.ajax = "php/neologismes2.php?lang="+val;
                editor.s.ajax = "php/neologismes2.php?lang="+val;
                editor.lang = val;
		table.state.clear();
                table.ajax.url("php/neologismes2.php?lang="+val).load();
                document.getElementById("validate").lang=val;
                document.getElementById("validate2").lang=val;
                document.getElementById("validateb").lang=val;
                document.getElementById("validate2b").lang=val;
            });

// Setup - add a text input to each header cell (filter row)
$('#example thead tr:eq(1) th').each( function () {
	title = $(this).text();
	if (title.length > 0){
        $(this).html( '<input type="text" class="column_search form-control" style="width:1OO%" placeholder="'+title+'"  />' ); // form-control-sm"  
	}
	else{
        $(this).html( '&nbsp;' );  	
	}
    } );


table = $('#example').DataTable( {
		fixedHeader: true,
		dom: '<B>lrtip',
		orderCellsTop: true,
		fixedHeader: true,
		scrollY: '150vh',
	    scrollCollapse: true,
		processing:true,
		serverSide:true,
		search: {regex: true},
		ajax: {url:"./php/neologismes2.php?lang="+languageW,type:"POST"},
		lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100,200, "Tous"]],
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
			{ data: "date" ,type: "date"}, 
			// for child row
			{
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			// for child row 2
			{
                className:      'details-control2',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'details-control3',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editor_edit',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
			/*{
                className:      'editor_remove',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },*/
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
//			"selectAll","selectNone",
			{ extend: "create", editor: editor },
			{ extend: "edit",   editor: editor },
			{ extend: "remove", editor: editor },
		],
		language:{url:"//cdn.datatables.net/plug-ins/1.10.13/i18n/French.json"}
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
            // main function =>
            formatajax(row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data ).show();
        	    tr.addClass('shown');
            }
            );
        }
    } );
    
// Add event listener for opening and closing details button 2 04/11/2016
$('#example tbody').on('click', 'td.details-control2', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 		if (editor.lang == undefined){editor.lang='fr';}
        if ( row.child.isShown() ) {
            // This row is already open - close it
             //$("#corpusResultsFr").hide();
            row.child.hide();
            details = row.child()
            details.removeClass('shown');
            //details.removeClass('stat_res');
        }
        else {
            // Open this row
            //alert(row.data())
            // main function =>
            get_neologism_stat(editor.lang, row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data + " articles" ).show();
	            details = row.child()
        	    details.addClass('shown');
        	    details.addClass('stat_res');
            	if (typeof data == 'number'){
				    $('#corpusResults').clone().appendTo('.stat_res td');
				    $("#corpusResults").show();
				}
        	    
            }
            );
        }
    } );
 
 // external app to have additional information on the neologism
$('#example tbody').on('click', '.details-control3', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        d = row.data() // to get d.lexie
        console.log(d);
		console.log(editor.lang);
		url = external_apps[editor.lang] + d.lexie;
        window.open(url,"external_corpus");
    } );
});


//////////////   STATS FOR SPECIFIC NEOLOGISM 


// ajax call to retrieve from apache solr the json data for the given language and given neologism 4/11/2016
function get_neologism_stat(lang,neo,callback) 
{
		//alert(d.lexie)
		if (editor.lang == undefined){editor.lang='fr';}
//		var langues = {'es':'rss_spanish','it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
		console.log("get_neologism_stat at : " +solr_host + collections[editor.lang] + ", for : " + neo.lexie);
        var request= $.ajax({
        url:solr_host + collections[editor.lang] + '/select',
//        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editor.lang] + '/select',
        data:{  q: 'contents:"' +neo.lexie + '"',
        		rows:1000,
        		"wt":"json",
        		"indent":"false",
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
        success: function( result) {
            docsdata =result.response.docs;/// main results
            num = result.response.numFound;
            if (num == 0){
            	callback("Il n'y a pas de données disponibles pour ce néologisme dans le corpus disponible à : " + solr_host + collections[editor.lang]);
            }
            else{
	            callback(num);
	            build_corpus_info_lang(docsdata, neo.lexie);
	        }
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            res= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(res);
        }
    });
}

// call in case of ajax success : build the graphs
function build_corpus_info_lang(jsondata, lexie){

console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
    	d.dtg   = dtgFormat.parse(d.dateS.substr(0,19));
 		d.newspaper   = d.source;
 		d.subject2= d.subject2;
    	d.subject  = d.subject;
    	d.article= d.link;
    	d.country= d.country
    	d.contents = d.contents
//    	console.log(d);
  }); 
 console.log("Data Loaded");

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll();
  

/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc-data-count');
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc-data-count2');
totalCount2 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
  
console.log("Count chart built"); 		   
console.log(totalCount);
/***************************** COUNTRY ROW BAR CHART ***********************/

var neoChart = dc.rowChart("#dc-neo-chart");

// neologismes dimensions : attention buggy as field = array!!!
var neoDim = facts.dimension(function(d){ return d.country;});
var neoGroup = neoDim.group().reduceCount(function(d) { return d.country; });


/// for top	
function remove_empty_bins_top(source_group) {
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
var neoGroupTop = remove_empty_bins_top(neoGroup);

// neo chart
	neoChart
			.width(350)
            .height(300)
            .dimension(neoDim)
            .group(neoGroupTop)
            .rowsCap(15)
            .othersGrouper(false)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            //.title(function(d){return d.key + ' (' + d.value + ')';})
            .renderLabel(true)
            .gap(0.1)
            //.renderTitleLabel(true)
            .ordering(function (d) {
    			return -d.value
			})
    		.elasticX(true)
		    .turnOnControls(true)
	        .controlsUseVisibility(true);		   


console.log("Neo chart built");
console.log(neoChart);


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart");

// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
  });
	var volumeByMonth = facts.dimension(function(d) {
    return d3.time.month(d.dtg);
  });

  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Day groups :" + volumeByDayGroup.size());

  var volumeByMonthGroup = volumeByMonth.group()
    .reduceCount(function(d) { return d.dtg; });

    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].date;
 	var maxDate = volumeByDay.top(1)[0].date;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	.width(700)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    .renderArea(true)
    .dimension(volumeByMonth)
    .group(volumeByMonthGroup)
//    .dimension(volumeByDay)
//    .group(volumeByDayGroup)
    .transitionDuration(500)
    //.brushOn(true)
    .xyTipsOn(true) // incompatible with the preceding attribute
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return dtgFormat2(d.jsondata.key)
      + "\nTotal : " + d.jsondata.value;
      })
    //.yAxisLabel("Période temporelle")
    //.xAxisLabel("Nombre d'articles")
    .elasticY(true)
    .elasticX(true)
    .turnOnControls(true)
    .controlsUseVisibility(true)
//    .mouseZoomable(true)
    .x(d3.time.scale().domain([minDate, maxDate]))
    //.x(d3.time.scale().domain([new Date(2016, 6, 01), new Date()]))
    .xAxis();
  
  
  console.log("Time chart built");
  console.log(timeChart);
  
  /***************************** TIMELINE ***********************/

/***************************** SUBJECT PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var subjectChart = dc.pieChart("#dc-subject-chart");


//  subjectchart  dimensions
    var subjectDimension = facts.dimension(function (d) { return d.subject; });
    var subjectGroup = subjectDimension.group();
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

var newspaperChart = dc.rowChart("#dc-newspaper-chart");
//var newspaperChartLow = dc.rowChart("#dc-newspaper-chart-low");

//  newspaperchart dimensions (with a fake group to keep just top and bottom 15
    var newspaperDimension = facts.dimension(function (d) { return d.newspaper; });
    //var newspaperDimensionless100 = facts.dimension(function (d) { return d.newspaper; }).filterRange([0, 100]);
    var newspaperGroup = newspaperDimension.group().reduceCount(function (d) { return d.newspaper; });
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

var newspaperGroupTop = remove_empty_bins(newspaperGroup);
//var newspaperGroupLow = remove_empty_bins_low(newspaperGroup);

console.log("newspaper groups :" + newspaperGroup.size());

// newspaper setup rowschart (TOP)
    newspaperChart
    		.width(500)
            .height(250)
            .dimension(newspaperDimension)
            .group(newspaperGroupTop)
            .rowsCap(10)
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
var dataTableDC = dc.dataTable("#dc-table-chart");

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");
 neolo = lexie.toString()
 console.log(neolo)

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return ""})
	//.size(10)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.country; },
      function(d) { return d.subject; },
      function(d) { return d.newspaper; },
      function(d) { return d.dtg; },
    //  function(d) { return '<a href=\"' + d.article + "\" target=\"_blank\">Article</a>";},
      function(d) {return highlight(d.contents.toString(),neolo) + '&nbsp;<a title=\"Voir l\'article complet\" href=\"' + d.article + "\" target=\"_blank\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a>";},
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);

function highlight(text, neo){
	
	var regexp = new RegExp( "(.{0,70})(" + neo.toString() + ")(.{0,70})", 'g');
	//console.log(text);
	console.log(typeof text);
	//console.log(regexp);
	//console.log(typeof regexp)
	var res = text.match(regexp);
	match = regexp.exec(text);
	var res = ''
	while (match != null){
		res = res + "<br/>..." + match[1] + "<mark>" + match[2] + "</mark>" + match[3] + "...";
		match = regexp.exec(text);
	}
	//console.log("Results : " + res);
	return res;
}    
    
console.log("Datatable chart built");
console.log(timeDimension);

/***************************** RENDER ALL THE CHARTS  ***********************/
dc.renderAll(); 

}


/// details
function formatajax(d,callback) 
{
		//alert(d.lexie)
		if (editor.lang == undefined){editor.lang='fr';}
		var restable='';
        var request= $.ajax({
	        url:solr_host + collections[editor.lang] + '/select',
	        data:{  q: 'contents:"'+d.lexie+'"',
        		rows:20,
        		df:"contents",
        		wt:"json",
        		indent:"false",
        		"hl":"true",
        		"hl.fl":"*",
        		"hl.simple.pre":'<span style="background-color: #FFFF00">',
        		"hl.simple.post":"</span>"
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
       // async:false,
        success: function( result) {
            data = result.highlighting;
            meta = result.response;
            num = meta.numFound;
            var thead = '<div>' + num + ' résultat(s)</div><th>Source</th><th>Extrait</th>',  tbody = '';
            for (var key in data) 
            {
                var resultRE = key.match(/^.{30}/);
//                var resultRE = key.match(/^.+\.(pl|com|fr|org|net)/);
                tbody += '<tr><td><a title="Voir la source" href="' + key + '" target="source">' + resultRE[0]+ '...</a></td><td>';
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
            restable = '<table width="100%">' + thead + tbody + '</table>';
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




// sauvegarde néologismes dans base principale de description neo3.termes_copy (utilisateur courant)
function save_to_neo(lang) {
		res = confirm("Vous êtes sur le point de sauver toutes les lexies catégorisées comme néologisme dans la base générale de description des néologismes. Confirmez pour effectuer cette action.");
		if (res == false){return}
		//alert("saving to dict for language " + lang)
                console.log("save_to_dict (this user): " + lang)
		var request = $.ajax({
			url: "php/dbprocedures.php",
			type: "GET",
			data:{"action":"neo2","lang":lang},			
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

// sauvegarde néologismes dans base principale de description neo3.termes_copy (tous utilisateurs)
function save_to_neo_all(lang) {
		console.log()
		res = confirm("Vous êtes sur le point de sauver toutes les lexies catégorisées comme néologisme dans la base générale de description des néologismes. Confirmez pour effectuer cette action.");
		if (res == false){return}
		//alert("saving to dict for language " + lang)
                console.log("save_to_dict (this user): " + lang)
		var request = $.ajax({
			url: "php/dbprocedures.php",
			type: "GET",
			data:{"action":"neo","lang":lang},			
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


// sauvegarde faux néologismes dans dicos (tous utilisateurs)
function save_to_dict_all(lang) {
		console.log("save_to_dict (all users): " + lang)
		var request = $.ajax({
			url: "php/dbprocedures.php",
			type: "GET",
			data:{"action":"dict","lang":lang},			
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
	

// sauvegarde faux néologismes dans dicos (utilisateur courant)
function save_to_dict(lang) {
		alert("saving to dict for language " + lang)
		console.log("save_to_dict (this user): " + lang)
		var request = $.ajax({
			url: "php/dbprocedures.php",
			type: "GET",
			data:{"action":"dict2","lang":lang},			
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
		



function highlight_neo(text, neo,rawquery){
	
	if (neo.indexOf('-')> -1){
	  neo = neo.replace(/-/g,'.?');
//	  rawquery = rawquery.replace(/^.+\((.+?) .+$/,"$1");
	  rawquery = rawquery.replace(/-/g,'.');
	  console.log(neo);
	  console.log(rawquery);
	}
	var nbmatch = 0;
	// with exact neo form
	regexpstr = '(.{0,70})(\\b' + neo.toString() + ")(.{0,70})";
	console.log(regexpstr);
	var regexp = new RegExp( regexpstr, 'gi');
	//console.log(text);
	//console.log(typeof text);
	//console.log(regexp);
	//console.log(typeof regexp)
	match = text.match(regexp);
	var res = ''
	// with rawquery
	if (match == null){
		regexpstr = '(.{0,70})(\\b' + rawquery.toString() + ")(.{0,70})";
		console.log(regexpstr);
		var regexp = new RegExp( regexpstr, 'gi');
		//console.log(text);
		//console.log(typeof text);
		//console.log(regexp);
		//console.log(typeof regexp)
		while ((match = regexp.exec(text))!== null){
			nbmatch = nbmatch + 1;
			res = res + "<br/>..." + match[1] + "<span style='background-color: #ffa366'>" + match[2] + "</span>" + match[3] + "...";
			//match = regexp.exec(text);
		}	

	}
	else {
		while ((match = regexp.exec(text))!= null){
			nbmatch = nbmatch + 1;
			res = res + "<br/>..." + match[1] + "<span style='background-color: #FFFF00'>" + match[2] + "</span>" + match[3] + "...";
			//match = regexp.exec(text);
		}	
	}
	console.log(res);
	console.log(nbmatch);
//	return res + "<br/>" + text;
	return [res,nbmatch];
}    



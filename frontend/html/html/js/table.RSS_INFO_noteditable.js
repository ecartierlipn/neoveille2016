
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

	tableCorpus = $('#RSS_INFO').DataTable( {
		dom: 'frtip',
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
            }
		],
		"columnDefs": [ {
    		"targets": 0,
    		"data": "url",
    		"render": function ( data, type, full, meta ) {
        			return '<a target="new" href="'+data+'">'+data.substr( 0, 20 )+'...</a>';
    		}
  		} ],
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
            // Open this row
            //console.log(row.data())
            //alert(JSON.stringify(row.data()));
            getinfo2(row.data(), function(data)
            {
    	        row.child(  data ).show();
        	    tr.addClass('shown');        	    
    			// Render the Charts
  				//dc.renderAll();
            }
            );
        }
    } );

// filter for each column
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

});


/* CORPUS INFO  */

$("#corpusinfoBtn").click(function(){
// use $.get when works
    $("#corpusinfo-info").load('php/dbprocedures.php?action=corpusinfo', function(responseTxt, statusTxt, xhr){
        if(statusTxt == "success")
            alert("External content loaded successfully!" + responseTxt);
            get_corpus_info(responseTxt);
        if(statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
});

// get summary info for corpus (simple bar chart with total feeds by country)
function get_corpus_info(data) {
//alert(data);
var json = JSON.parse(data);
if (typeof json == "object")
{
	//alert("Well-formed JSON :" + data);
	r=3;
}
else
{
	alert("Bad-formed JSON (exiting after this alert):" + data);
	exit;
}
// Create the dc.js chart objects & link to div 
   json.forEach(function(d) {
        d.total = +d.cnt;
        d.country = d.country;
//   		alert(d.country);
//   		alert(d.total);
    });
var margin = {top: 20, right: 40, bottom: 100, left: 40},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("#chartCorpus").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

 
  x.domain(json.map(function(d) { return d.country; }));
  y.domain([0, d3.max(json, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Nombre d'articles");

  svg.selectAll("bar")
      .data(json)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { return x(d.country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.total); })
      .attr("height", function(d) { return height - y(d.total)
//      .on('mouseover', tip.show)
//      .on('mouseout', tip.hide); 
});

	}


$("#corpusinfoBtn2").on('click',function(){
	$("#corpusinfoBtn2").replaceWith('<a href="#" class="btn btn-info" id="corpusinfoBtn2"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données...</a>');
    $("#corpusResults").show();
    d3.json("data/rsscorpus.json",function(data){
    	console.log(data[0]);
    	build_corpus_info2(data);
    });
    /*queue()
    .defer(d3.json, "data/rssdata.json")
    .await(build_corpus_info2);*/
});

function build_corpus_info2(jsondata, btn){
/* for dc.js, crossfilter 
see:
https://github.com/dc-js/dc.js/blob/master/web/docs/api-1.6.0.md
http://dc-js.github.io/dc.js/

*/
     
/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data
  var dtgFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
    d.dtg   = dtgFormat.parse(d.DATE_CREATED.substr(0,19));
 	d.newspaper   = d.source_link.substring(0,20);
 	d.country= d.country;
    d.subject  = d.subject;
    d.article=d.source_link;
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

var countryChart = dc.rowChart("#dc-country-chart");

   
//  countrychart dimensions
    var countryDimension = facts.dimension(function (d) { return d.country; });
    var countryGroup = countryDimension.group();
	console.log("Country groups :" + countryGroup.size());

// country chart
	countryChart
			.width(350)
            .height(260)
            .dimension(countryDimension)
            .group(countryGroup)
            .renderLabel(true)
            .renderTitleLabel(true)
    		.elasticX(true)
		    .turnOnControls(true)
	        .controlsUseVisibility(true);		   

// yAxisLabel and xAxisLabel not built in...
/*             .yAxisLabel("Pays")
            .xAxisLabel("Nombre d'articles")
*/
/* rotate x-axis labels
see css #dc-country-chart g.axis g text
countryChart.on("renderlet",function (chart) {
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)')
     .attr('text-anchor', 'end !important');
  });*/   		   
console.log("Country chart built");
console.log(countryChart);


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart");

// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
  });
  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Day groups :" + volumeByDayGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].date;
 	var maxDate = volumeByDay.top(1)[0].date;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	.width(700)
    .height(250)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dotRadius(5) //
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
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
//// for low
/*function remove_empty_bins_low(source_group) {
    function non_zero_pred(d) {
        return d.value != 0;
    }
    return {
        all: function () {
            return source_group.all().filter(non_zero_pred);
        },
        bottom: function(n) {
            return source_group.bottom(Infinity)
                .filter(non_zero_pred)
                .slice(0, n);
        }
    };
}*/
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

// newspaper setup rowschart (LOW)
 /*   newspaperChartLow
    		.width(300)
            .height(200)
            .dimension(newspaperDimension)
            .group(newspaperGroupLow)
            .rowsCap(10)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return +d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

*/

// x axis label rotation  	: does not work	
/*newspaperChartLow.on("renderlet",function (chart) {
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)');
  });   

*/

console.log("Newspapers chart built");
//console.log(newspaperChartLow);
console.log(newspaperChart);


/***************************** DATATABLES CHART ***********************/

var dataTableDC = dc.dataTable("#dc-table-chart");

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
	.size(10)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.country; },
      function(d) { return d.subject; },
      function(d) { return d.newspaper; },
      function(d) { return d.dtg; },
      function(d) { 
          return '<a href=\"' + d.article + "\" target=\"_blank\">Article</a>"}
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);
    
console.log("Datatable chart built");
console.log(timeDimension);


/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
//    $("#corpusresults").show();
     //$("#corpusresults").css( "display", "visible !important");
	$("#corpusinfoBtn2").replaceWith('<a href="#" class="btn btn-info" id="corpusinfoBtn2Done">Chargement effectué</a>');
    // Render the Charts
  	dc.renderAll(); 

}


/* test for composite graph */
// get composite lines (test)
function get_composite_graph(){
var experiments = [
    { Run: 1, Age_19_Under: 26.9, Age_19_64: 62.3, Age_65_84: 9.8, Age_85_and_Over: 0.9 },
    { Run: 2, Age_19_Under: 23.5, Age_19_64: 60.3, Age_65_84: 14.5, Age_85_and_Over: 1.8 },
    { Run: 3, Age_19_Under: 24.3, Age_19_64: 62.5, Age_65_84: 11.6, Age_85_and_Over: 1.6 },
    { Run: 4, Age_19_Under: 24.6, Age_19_64: 63.3, Age_65_84: 10.9, Age_85_and_Over: 1.2 },
    { Run: 5, Age_19_Under: 24.5, Age_19_64: 62.1, Age_65_84: 12.1, Age_85_and_Over: 1.3 },
    { Run: 6, Age_19_Under: 24.7, Age_19_64: 63.2, Age_65_84: 10, Age_85_and_Over: 2.2 },
    { Run: 7, Age_19_Under: 25.6, Age_19_64: 58.5, Age_65_84: 13.6, Age_85_and_Over: 2.4 },
    { Run: 8, Age_19_Under: 24.1, Age_19_64: 61.6, Age_65_84: 12.7, Age_85_and_Over: 1.5 },
    { Run: 9, Age_19_Under: 24.8, Age_19_64: 59.5, Age_65_84: 13.5, Age_85_and_Over: 2.2 },
];
var lineChart1=dc.compositeChart("#chart-composite");
var ndx = crossfilter(experiments);
var all = ndx.groupAll();

var runDimension = ndx.dimension(function (d) { return d.Run; });

var age19UnderGroup = runDimension.group().reduceSum(function (d) { return d.Age_19_Under; });
var age19To64Group = runDimension.group().reduceSum(function (d) { return d.Age_19_64; });
var age65To84Group = runDimension.group().reduceSum(function (d) { return d.Age_65_84; });
var age85AndOverGroup = runDimension.group().reduceSum(function (d) { return d.Age_85_and_Over; });

lineChart1.width(800)
    .height(250)
    .margins({ top: 10, right: 10, bottom: 20, left: 40 })
    .dimension(runDimension)
    .yAxisLabel("Nombre d'articles")
    .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
    .renderHorizontalGridLines(true)
    .transitionDuration(500)
    .elasticY(true)
    .brushOn(true)
    .valueAccessor(function (d) {
        return d.value;
    })
    .title(function (d) {
        return "\nNumber of Povetry: " + d.key;

    })
    .x(d3.scale.linear().domain([4, 9]))
    .compose([
        dc.lineChart(lineChart1)
        	.group(age19UnderGroup, "Brésil")
        	.colors('blue')
        	.renderDataPoints({
      			radius: 3,
      			fillOpacity: 0.5,
      			strokeOpacity: 0.8
    		}),
        dc.lineChart(lineChart1)
        	.group(age19To64Group, "France")
        	.colors('red')
        	.renderDataPoints({
      			radius: 3,
      			fillOpacity: 0.5,
      			strokeOpacity: 0.8
    		}),
        dc.lineChart(lineChart1)
        	.group(age65To84Group, "Pologne")
        	.colors('green')
        	.renderDataPoints({
      			radius: 3,
      			fillOpacity: 0.5,
      			strokeOpacity: 0.8
    		}),
        dc.lineChart(lineChart1)
        	.group(age85AndOverGroup, "Russie")
        	.colors("yellow")
        	.renderDataPoints({
      			radius: 3,
      			fillOpacity: 0.5,
      			strokeOpacity: 0.8
    		})
    ])
;

dc.renderAll();
}

/*  corpus details for newspaper details -->
/* main called function to get data from ajax call 
and populate the graph (newspaper detail info) */
function getinfo2(d,callback) 
{
		var langues = {'5':"rss_french", '7':"RSS_polish", '8':'RSS_brasilian', '4':'RSS_chinese', '3':'RSS_russian', '2':'RSS_czech', '6':'RSS_greek'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]);
		query= d.RSS_JOURNAL.NAME_JOURNAL;
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[d.RSS_INFO.ID_LANGUE] + '/select',
        data:{  "q":'source:"'+ d.RSS_JOURNAL.NAME_JOURNAL + '"',
        		rows:300000,
//        		df:"dateS",
        		fl:"dateS,neologismes,link",
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
            docsdata =result.response.docs;/// doc visualization
//            alert(docsdata);
            neolo = data.facet_fields.neologismes;
            //alert("ok");
            //alert(JSON.stringify(neolo));
            num = result.response.numFound;
			var tablechart = "<div class='span12' id='dc-time-chart'><h4>Articles par jour (total :" + num + ")</h4></div><div class='span12'><table class='table table-hover' id='dc-table-graph'><thead><tr class='header'><th>Date</th><th>Néologismes</th><th>Nombre</th><th>Article</th></tr></thead></table></div><div class='span12' id='dc-depth-chart'><h4>Néologismes (total : " + (neolo.length/2) + ")</h4></div> ";
			//var neol = '<div>' + (neolo.length/2) + ' néologismes(s)</div>';
            //var restable = tablechart + neol + "<div>" +  neolo.join(", ") + "</div>";
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
    if (d.neologismes == null)
    {
      d.neo   = "";
      d.neocount=0;
    }
    else
    {
    	d.neo   = d.neologismes.join(", ");
    	d.neocount= d.neologismes.length;
    }
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
    
    // min and max date
    var minDate = volumeByHour.bottom(1)[0].date;
 	var maxDate = volumeByHour.top(1)[0].date;
    
  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  // time graph
  timeChart.width(960)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(volumeByHour)
    .group(volumeByHourGroup)
    .transitionDuration(500)
    .brushOn(true)
    .title(function(d){
      return dtgFormat2(d.jsondata.key)
      + "\nTotal : " + d.jsondata.value;
      })
    .elasticY(true)
    //.x(d3.time.scale().domain([minDate, maxDate]))
    .x(d3.time.scale().domain([new Date(2016, 3, 01), new Date(2016, 7, 13)]))
    .xAxis();
  
  /// render the datatable
    dataTableDC.width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return "Corpus Table"
	 })
	.size(10)
    .columns([
      function(d) { return d.dtg; },
      function(d) { return d.neo; },
      function(d) { return d.neocount; },
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
		//alert(lang)
		$("#resultsRSS").fadeIn();
		$("#resultsRSS").html("Looking for RSS Feeds in " + url + "...");
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
			$("#resultsRSS")
				.html(msg)
				.css({'background-color':'#e6e6ff','box-shadow':'10px 10px 5px grey', 'padding':'15px',"margin":'15px', "width":'50%'});
			
		});

		request.fail(function(jqXHR, textStatus) {
			//alert("Error :" + textStatus);
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



/* Simple statistics table for all corpora (Toutes langues tab) */

// corpus synthesis toggler   
$(document).on('click', 'td.toggler', function(e){
        e.preventDefault();
        console.log(this);
         if ( $(this).hasClass('shown') ) {
         	$(this).removeClass('shown');
         }
         else {
        	$(this).addClass('shown');
         }
        $('.cat_'+$(this).attr('data-corpus-cat')).toggle();
    });

/* CORPUS INFO BY LANGUAGE */
// buttons for each language
$("a[id^='corpusinfoBtn']").on('click',function(){ // #corpusinfoBtn.."
	language = $(this).attr("language") ;
	thisId = $(this).id
	console.log("button corpusinfoBtn triggered");
	console.log($(this).id);
	console.log($(this).attr("language"));
	$(thisId).replaceWith('<a  class="btn btn-info" id="' + thisId + '"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données...</a>');
    get_corpus_info_jsondata_gen(language, function(data)
            {
            	if (typeof data == 'number'){
					$(thisId).replaceWith('<div>Récupération des données effectuées : ' + data + ' articles. Création des graphes en cours...</div>');
					//$(thisId).replaceWith('<div  class="btn btn-info" id="' + thisId + '2"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' articles. Création des graphes en cours...</div>');
				    $("#corpusResults" + language).show();
				}
				else{
					$(thisId).replaceWith('<div></i>' + data + '</div>');				
				}
            }
            );
});

// retrieve data from csv file
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
    });
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

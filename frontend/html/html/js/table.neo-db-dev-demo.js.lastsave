
jQuery.support.cors = true;
////////////////////// global stats for neologism by language
$("#neoinfoBtnFr").on('click',function(){
	$("#neoinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (français)...</a>');
    get_neo_info_jsondata2('Fr', function(data)
            {
            	if (typeof data == 'number'){
					$("#neoinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsFr").show();
				}
				else{
					$("#neoinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr2"></i>' + data + '</a>');				
				}
            }
            );
});

$("#neoinfoBtnRu").on('click',function(){
	$("#neoinfoBtnRu").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnRu"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (russe)...</a>');
    get_neo_info_jsondata2('Ru', function(data)
            {
            	if (typeof data == 'number'){
					$("#neoinfoBtnRu").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnRu"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsRu").show();
				}
				else{
					$("#neoinfoBtnRu").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnRu2"></i>' + data + '</a>');				
				}
            }
            );
});

$("#neoinfoBtnCh").on('click',function(){
	$("#neoinfoBtnCh").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnCh"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (chinois)...</a>');
    get_neo_info_jsondata2('Ch', function(data)
            {
            	if (typeof data == 'number'){
					$("#neoinfoBtnCh").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnCh"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsCh").show();
				}
				else{
					$("#neoinfoBtnCh").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnCh2"></i>' + data + '</a>');				
				}
            }
            );
});

$("#neoinfoBtnIt").on('click',function(){
	$("#neoinfoBtnIt").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnIt"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (russe)...</a>');
    get_neo_info_jsondata2('It', function(data)
            {
            	if (typeof data == 'number'){
					$("#neoinfoBtnIt").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnIt"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsIt").show();
				}
				else{
					$("#neoinfoBtnIt").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnIt2"></i>' + data + '</a>');				
				}
            }
            );
});

// ajax call to retrieve from apache solr the json data for the given language
function get_neo_info_jsondata2(lang,callback) 
{
		var langues = {'It':"it_neo.tsv",'Fr':"fr_neo.tsv", 'Pl':"pl_neo.tsv", 'Br':'br_neo.tsv', 'Ch':'ch_neo.tsv', 'Ru':'ru_neo.tsv', 'Cz':'cz_neo.tsv', 'Gr':'gr_neo.tsv'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]); langues[lang]
		file = "data/" + langues[lang]
		console.log(file);
		console.log(d3.version);
		d3.csv(file,function(error,data){
		if (error) throw error;
		
    	console.log(data[0]);
    	if (data[0] == undefined){
    		console.log("Aucune donnée");return "Aucune donnée dans cette langue.";
    	}
    	//console.log(data[1]);
    	else{
	        console.log("build_corpus_info_lang_cnt2 function")
	        build_corpus_info_lang_cnt2(data,lang);
		}
    });
}


// new version with datatable
function build_corpus_info_lang_cnt2(jsondata, lang){

console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormatM = d3.time.format("%Y-%m-%d");
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  var dtgFormat2M = d3.time.format("%b %a");
  
  jsondata.forEach(function(d) { 
  		
  		//if (d.date.length!=7){console.log(d.date);}
    	//d.dtg   = dtgFormatM.parse(d.dateS);
    	d.dtg   = dtgFormatM.parse(d.date.substr(0,10));
    	//console.log(d.dtg);
 		d.newspaper   = d.source;
 		d.country  = d.country;
    	d.subject  = d.subject;
        d.neo = d.neo;
        d.matrice = d.matrice;
        d.count = +d.number;
  }); 
 console.log("Data Loaded");

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll().reduceSum(function(d){return d.count;});
  var allv = Number(facts.groupAll().reduceSum(function(d){return d.count;}).value()); //.toLocaleString();  

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
/***************************** NEO ROW BAR CHART ***********************/

var neoChart = dc.pieChart("#dc-neo-chart"+lang);

//  countrychart  dimensions
    var neoDimension = facts.dimension(function (d) { return d.matrice; });
    var neoGroup = neoDimension.group().reduceSum(function(d){return d.count;});
	console.log("Neo types groups :" + neoGroup.size());

 	neoChart
 		.width(500)
        .height(250)
        .cx(300)
        .slicesCap(15)
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
        .dimension(neoDimension)
        .group(neoGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));

console.log("Neo chart built");
console.log(neoChart);

$('#resetNeo').on("click",function(){neoChart.filterAll();dc.redrawAll();});



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

$('#resetCountry').on("click",function(){countryChart.filterAll();dc.redrawAll();});


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart"+lang);
//var pChart = dc.barChart("#dc-rangetime-chart"+lang);
// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
    //return d3.time.month(d.dtg)
  });  
  var volumeByDayGroup = volumeByDay.group()
    .reduceSum(function(d) { return d.count; });
    console.log("Month groups :" + volumeByDayGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].dtg;
 	var maxDate = volumeByDay.top(1)[0].dtg;
	console.log("Period : " + String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	//.width(1200)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .mouseZoomable(true)
    .brushOn(true)    
    //.xyTipsOn(true) // incompatible with the preceding attribute
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return d.key
      + "\nTotal : " + d.value;
      })
    //.yAxisLabel("Période temporelle")
    //.xAxisLabel("Nombre d'articles")
    .elasticY(true)
    .xUnits(d3.time.month)
    .elasticX(true)
    //.turnOnControls(true)
    .renderHorizontalGridLines(true)
    //.controlsUseVisibility(true)
//    .mouseZoomable(true)
    //.rangeChart(pChart)
    .x(d3.time.scale().domain([minDate, maxDate]));
    //.x(d3.time.scale().domain([new Date(2016, 6, 01), new Date()]))
//    .xAxis();
  
  
  console.log("Time chart built");
  console.log(timeChart);

//$('#resetTime').on("click",function(){timeChart.filterAll();dc.redrawAll();});

/***************************** range Chart test *******************/

/* Bug : disabled as not combinable with jquery datatable because of refresh table function */
/* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
/* pChart 
        .width(1200)
        //.width("100%")
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
*/

/***************************** SUBJECT PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var subjectChart = dc.pieChart("#dc-subject-chart"+lang);


//  subjectchart  dimensions
    var subjectDimension = facts.dimension(function (d) { return d.subject; });
    var subjectGroup = subjectDimension.group().reduceSum(function(d) { return d.count; });
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

$('#resetSubject').on("click",function(){subjectChart.filterAll();dc.redrawAll();});


/***************************** category PIE CHART ***********************/

// Create the dc.js chart objects & link to div
//var categoryChart = dc.pieChart("#dc-category-chart"+lang);


//  categorychart  dimensions
//    var categoryDimension = facts.dimension(function (d) { return d.category; });
//    var categoryGroup = categoryDimension.group();
//	console.log("category groups :" + categoryGroup.size());
  
// category chart
/* 	categoryChart
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
        .dimension(categoryDimension)
        .group(categoryGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("category chart built");
console.log(categoryChart);

$('#resetCategory').on("click",function(){categoryChart.filterAll();dc.redrawAll();});
*/

/***************************** NEWSPAPER ROW BAR CHART ***********************/

var neooccChart = dc.rowChart("#dc-neoocc-chart"+lang);

//  neooccchart dimensions (with a fake group to keep just top and bottom 15
    var neooccDimension = facts.dimension(function (d) { return d.neo; });
    //var neooccDimensionless100 = facts.dimension(function (d) { return d.neoocc; }).filterRange([0, 100]);
    var neooccGroup = neooccDimension.group().reduceSum(function(d) { return d.count; });

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

var neooccGroupTop = remove_empty_bins(neooccGroup);
//var neooccGroupLow = remove_empty_bins_low(neooccGroup);

console.log("Neo groups :" + neooccGroup.size());

// neoocc setup rowschart (TOP)
    neooccChart
    		.width(500)
            .height(250)
            .dimension(neooccDimension)
            .group(neooccGroupTop)
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
neooccChart.on("renderlet",function (chart) {
   // rotate x-axis labels
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)');
  });   



console.log("neooccs chart built");
//console.log(neooccChartLow);
console.log(neooccChart);

$('#resetNeoocc').on("click",function(){neooccChart.filterAll();dc.redrawAll();});

/***************************** NEWSPAPER ROW BAR CHART ***********************/

var newspaperChart = dc.rowChart("#dc-newspaper-chart"+lang);
//var newspaperChartLow = dc.rowChart("#dc-newspaper-chart-low");

//  newspaperchart dimensions (with a fake group to keep just top and bottom 15
    var newspaperDimension = facts.dimension(function (d) { return d.newspaper; });
    //var newspaperDimensionless100 = facts.dimension(function (d) { return d.newspaper; }).filterRange([0, 100]);
    var newspaperGroup = newspaperDimension.group().reduceSum(function (d) { return d.count; });
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

$('#resetNewspaper').on("click",function(){newspaperChart.filterAll();dc.redrawAll();});

console.log("Newspapers chart built");
//console.log(newspaperChartLow);
console.log(newspaperChart);


/***************************** DATATABLES CHART ***********************/

//table
//dimension for table search
var tDimension = facts.dimension(function (d) { return d.neo;});
var tableDimension = tDimension.group().reduceSum(function (d) { return d.count; });
var tableDimensionTop = remove_empty_bins(tableDimension);
console.log("Dimensions created");
console.log(tableDimension);

//neooccGroup and neooccDimension
//set options and columns

var dOptions = {
        //"bSort": true,
        "order": [[ 1, "desc" ]],
                columnDefs: [
                        {
                                targets: 0,
                                data: function (d) { return d.key; }
                        },
                        {
                                targets: 1,
                                data: function (d) { return d.value; }
                        }
                        /*,{
                                targets: 2,
                                data: function (d) { return get_terms(d); }
                        }*/
                ]
        };

var datatablesynth = $("#dc-table-chart"+lang);
datatablesynth.dataTable(dOptions);

function getcontexts(d,lang,callback) 
{
                //alert(d.termes_copy.terme)
                console.log(lang);
                if (lang == undefined){lang='fr';}
                var restable='';
                var langues = {'It':'rss_italian','Fr':"rss_french", 'Pl':"RSS_polish", 'Br':'RSS_brasilian', 'Ch':'RSS_chinese', 'Ru':'RSS_russian', 'Cz':'RSS_czech', 'Gr':'RSS_greek'};
        		var request= $.ajax({
		        url:'http://tal.lipn.univ-paris13.fr/solr/' +  langues[lang]  + '/select',
        		data:{  q: '"'+d.key+'"',
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
        		type:'POST',
        		//async:false,

        		success: function( result) {
	            data = result.highlighting;
	            meta = result.response;
	            num = meta.numFound;
	            var thead = '<div>' + num + ' résultat(s)</div><th>Source</th><th>Extrait</th>',  tbody = '';
	            for (var key in data) 
	            {
	                var resultRE = key.match(/^.{30}/);
	                tbody += '<tr><td><a title="Voir la source" href="' + key + '" target="source">' + resultRE[0]+ '...</a></td><td>';
    	            var cts = data[key].contents;
        	        for (var extr in cts)
            	    {
                	        tbody += "..." + cts[extr] +'...<br/>' ;
                	}
                	tbody += '</td></tr>';

            	}
            	restable = '<table width="100%">' + thead + tbody + '</table>';
                callback(restable);
        	},
        		error: function (request) {
            	alert("Error : " + request.status + ". Response : " +  request.statusText);
            	restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            	//return restable;
            	callback(restable)
        	}
    });
}

datatablesynth.DataTable().on('click', 'tr[role="row"]', function () {
        var tr = $(this);
        var row = datatablesynth.DataTable().row( tr ); 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            getcontexts(row.data(),lang, function(data){row.child(  data ).show();})
//            row.child( getcontexts(row.data(),lang, function(data){row.child(  data ).show();}) ).show();
  //          row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
} );
        
//custom refresh function, see http://stackoverflow.com/questions/21113513/dcjs-reorder-datatable-by-column/21116676#21116676
function RefreshTable() {
            dc.events.trigger(function () {
                alldata = tableDimensionTop.top(Infinity);
                datatablesynth.fnClearTable();
                datatablesynth.fnAddData(alldata);
                datatablesynth.fnDraw();
            });
}
        
//call RefreshTable when dc-charts are filtered
for (var i = 0; i < dc.chartRegistry.list().length; i++) {
      var chartI = dc.chartRegistry.list()[i];
	  console.log(chartI);
	  console.log(chartI.__dcFlag__);
	  if (chartI.__dcFlag__ != 5){
      chartI.on("filtered", RefreshTable);}
}
        
//filter all charts when using the datatables search box
$(":input").on('keyup',function(){
    text_filter(tDimension, this.value);//cities is the dimension for the data table

    function text_filter(dim,q){
                 if (q!='') {
                        dim.filter(function(d){
                                return d.indexOf (q.toLowerCase()) !== -1;
                        });
                } else {
                        dim.filterAll();
                        }
                RefreshTable();
                dc.redrawAll();}
});
        
//initial table refresh
RefreshTable();
console.log("Datatable chart built");
console.log(tableDimension);
/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
//    $("#neoResults"+lang).show();
    $("#neoResults"+lang).toggle();
//    $("#neoResults"+lang).css( "display", "visible !important");
	$("#neoinfoBtn"+lang).replaceWith('<div class="btn btn-info" id="neoinfoBtn2Done">Chargement effectué. ' + neooccGroup.size().toLocaleString() + ' néologismes. ' + allv.toLocaleString()  + ' occurrences. Début de période : ' + minDate.toLocaleString() + '</div>');

    // Render the Charts
  	dc.renderAll(); 

}





jQuery.support.cors = true;
var editorNeopat; // use a global for the submit and return data rendering in the examples
//console.log("beginning of js file");
$(document).ready(function() {
editorNeopat = new $.fn.dataTable.Editor( {
		ajax: "php/neosem-synt.php",
		table: "#neo-candsempat-table",
		display: "envelope",
		fields: [ 
			{
				name: "wordpos"
			}, 
			{
				name: "comment"
			}, 
			{
				name: "totalcorpus1",
			}, 			
			{
				name: "totalcorpus2",
			}, 			
			{
				name: "lexpospatterns1"
			}, 			
			{
				name: "lexpospatterns2"
			}, 			
			{
				name: "pospatterns1"
			}, 			
			{
				name: "pospatterns2"
			}, 			
			{
				name: "possimilarity"
			}, 			
			{
				name: "filedetails"
			},			
			{
				name: "commonpos"
			},			
			{
				name: "misspos1"
			},			
			{
				name: "misspos2"
			},			
			{
				name: "miss1lexpos"
			},			
			{
				name: "miss2lexpos"
			},			
			{
				name: "commonlexpos"
			}			
		]	
	} );

// inline editor commentaire field
$('#neo-candsempat-table').on( 'click', 'tbody td:nth-child(2)', function () {
    editorNeopat.inline( this , {
        submitOnBlur: true
    } );
} );

// filter for each column
$(document).ready(function() {
	$('#neo-candsempat-table').dataTable().columnFilter({
					aoColumns: [ 
						{ sSelector: "#example_wordpos",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_comment",type: "text", bRegex: true, bSmart: true},
						{ sSelector: "#example_totcorpus1", type: "number"},
            			{sSelector: "#example_totcorpus2", type: "number" },
            			{sSelector: "#example_lexpos1", type: "number" },
            			{sSelector: "#example_lexpos2", type: "number" },
            			{sSelector: "#example_pos1", type: "number" },
            			{sSelector: "#example_pos2", type: "number" },
            			{sSelector: "#example_simpos", type: "number" }
					]
		});
});

// datatable
var tableNeoSem = $('#neo-candsempat-table').DataTable( {
		dom: '<B>lfrtip',
		processing: true,
		fixedHeader: true,
		scrollY: '150vh',
        scrollCollapse: true,
		ajax: {url:"php/neosem-synt.php",type:"POST"},
		lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		lengthChange: true,
		order: [[ 4, "desc" ]],
		select:true,
		columns: [		
			{ data: "wordpos"},
			{ data: "comment", className: 'editable'},
			{ data: "totalcorpus1" , type:"numeric"},
			{ data: "totalcorpus2" , type:"numeric"},
			{ data: "lexpospatterns1" , type:"numeric"},
			{ data: "lexpospatterns2" , type:"numeric"},
			{ data: "pospatterns1" , type:"numeric"},
			{ data: "pospatterns1" , type:"numeric"},
			{ data: "possimilarity" , type:"numeric"},
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
            }
		],
		buttons: [
			/*{ extend: "create", editor: editor },*/
			{ extend: "edit",   editor: editorNeopat },
			{ extend: "remove", editor: editorNeopat },
		]
        ,
		language:{url:"//cdn.datatables.net/plug-ins/1.10.13/i18n/French.json"}
		
	} );

// fonction pour chgt de type de lexies
$('body').on('change',"#changefreq",function(){
                val = this.value;
                console.log(val);
                editorNeopat.ajax = "php/neosem.php?type="+val;
                editorNeopat.s.ajax = "php/neosem.php?type="+val;
                editorNeopat.typec = val;
//                console.log(table);
				tableNeoSem.state.clear();
				//window.location.reload()
                tableNeoSem.ajax.url("php/neosem.php?type="+val).load();
/*                document.getElementById("validate").lang=val;
                document.getElementById("validate2").lang=val;
                document.getElementById("validateb").lang=val;
                document.getElementById("validate2b").lang=val;*/
            });


// Add event listener for google-chart on a given word
$('#neo-candsempat-table tbody').on('click', 'td.details-control3', function () {
        var tr = $(this).closest('tr');
        var row = tableNeoSem.row( tr );
        console.log("td.details-control3" + row)
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            googlechart(row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data ).show();
        	    tr.addClass('shown');
            }
            );
        }
    } );


// Add event listener for opening and closing details 
$('#neo-candsempat-table tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = tableNeoSem.row( tr );
 		console.log("td.details-control" + row)
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
            console.log("closed");
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
    
// Add event listener for opening and closing details statistics
$('#neo-candsempat-table tbody').on('click', 'td.details-control2', function () {
        var tr = $(this).closest('tr');
        var row = tableNeoSem.row( tr );
        console.log("td.details-control2" + row)
 		if (editorNeopat.lang == undefined){editorNeopat.lang='fr';}
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
            get_neologism_stat(editorNeopat.lang, row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data + " articles" ).show();
	            details = row.child()
        	    details.addClass('shown');
        	    details.addClass('stat_res');
            	if (typeof data == 'number'){
				    $('#corpusResults'+ editorNeopat.lang).clone().appendTo('.stat_res td');
				    $("#corpusResults" + editorNeopat.lang).show();
				}
        	    
            }
            );
        }
    } );
 
 // google chart external back
$('#neo-candsempat-table tbody').on('click', '.details-control3-bk', function () {
        var tr = $(this).closest('tr');
        var row = tableNeoSem.row( tr );
        d = row.data()
        console.log(d);
        codesG = {'it':'22','fr':'19','ru':'25','ch':'11'}
url = 'https://www.google.fr/search?hl=' + editorNeopat.lang + '&as_q="'  + d.word +'"'
//        url = 'https://news.google.com/?output=rss&hl=fr&gl=fr&scoring=o&num=100&q=' + row.data().termes_copy.terme ;
url2 = 'https://books.google.com/ngrams/graph?&year_start=1800&year_end=2008&corpus=' + codesG[editorNeopat.lang] + '&smoothing=3&content=' + d.word;
        //alert(row.data().termes_copy.terme);
        window.open(url2,"_details");
    } );
   
    
} );

//////////////   STATS FOR SPECIFIC NEOLOGISM from the main table


// ajax call to retrieve from apache solr the json data for the given language and given neologism 4/11/2016
function get_neologism_stat(lang,neo,callback) {
		//alert(d.word)
		wordpos = neo.value.LEXICALUNIT.split("_");
		word = wordpos[0];
		if (lang == undefined){lang='fr';}
		var langues = {'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
		console.log("get_neologism_stat : " + langues[lang] + " : " + word);
        var request= $.ajax({
//        url:'http://192.168.0.10:8983/solr/rss_french/select?q=neologismes%3A' + d.word + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://localhost:8983/solr/' + langues[lang] + '/select',
//        data:{  "q":'dateS:* AND neologismes:"' +neo.word+ '"',
//        data:{  "q":'"' +neo.word+ '"',
        data:{  q: '"' +word + '"',
        		rows:1000,
        		//fl:"dateS,source,link,subject,subject2, neologismes, country, contents",
        		"wt":"json",
        		//"df":"contents",
        		"indent":"false",
        		//"hl":"true",
        		//"hl.fl":"*",
        		//"hl.simple.pre":'<span style="background-color: #FFFF00">',
        		//"hl.simple.post":"</span>"
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
        async:false,
        success: function( result) {
        	//alert(JSON.stringify(result));
            docsdata =result.response.docs;/// main results
           // highlight = result.highlighting;
            //alert(highlight)
//            alert(docsdata);
            num = result.response.numFound;
            //alert(num)
            if (num == 0){
            	callback("Il n'y a pas de données disponibles pour ce néologisme pour cette langue actuellement. Réessayer plus tard. Vous pouvez consulter le corpus complet dans l'onglet 'Toutes les langues'.");
            }
            else{
	            callback(num);
	            build_corpus_info_lang(docsdata,lang, word);
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
function build_corpus_info_lang(jsondata, lang, word){

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
    	//alert(d.country)
    	//d.country= [48.856614, 2.352222]
    	/*if (d.neologismes == null)
    	{
      		//d.neolist   = "";
      		d.neocount=0;
    	}
    	else
    	{
    		d.neolist   = d.neologismes[0];
//    		d.neolist   = d.neologismes.join(", ");
    		d.neocount= d.neologismes.length;
    	}*/
  }); 
 console.log("Data Loaded");

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll();
  

/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc-data-count'+lang);
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc-data-count2'+lang);
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

var neoChart = dc.rowChart("#dc-neo-chart"+lang);

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
var timeChart = dc.lineChart("#dc-time-chart"+lang);

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
var subjectChart = dc.pieChart("#dc-subject-chart"+lang);


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

var newspaperChart = dc.rowChart("#dc-newspaper-chart"+lang);
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
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");
 neolo = word.toString()
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
	console.log(text);
	console.log(typeof text);
	console.log(regexp);
	console.log(typeof regexp)
	var res = text.match(regexp);
	match = regexp.exec(text);
	var res = ''
	while (match != null){
		res = res + "<br/>..." + match[1] + "<mark>" + match[2] + "</mark>" + match[3] + "...";
		match = regexp.exec(text);
	}
	console.log(res);
	return res;
}    
    
console.log("Datatable chart built");
console.log(timeDimension);






/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
//    $("#corpusresults").show();
     //$("#corpusresults").css( "display", "visible !important");
	$("#corpusinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="corpusinfoBtn2Done">Chargement effectué</a>');
    // Render the Charts
  	dc.renderAll(); 

}

// google chart embedded
function googlechart(d,callback) {
	var posc = {'NOM':"NOUN",'PRP':"ADP", 'ADV':"ADV", 'VER':'VERB', 'ADJ':'ADJ'};

	q = d.word + '_' + posc[d.pos];
	console.log(q);
	url = 'https://books.google.com/ngrams/graph?content=' + q + '&year_start=1950&year_end=2008&corpus=19&smoothing=3';
	res = '<iframe  width=100% height=500 class="embed-responsive-item" src="' + url+'"></iframe>';
//	res = '<iframe name="ngram_chart" src="https://books.google.com/ngrams/interactive_chart?content=' + q + '&year_start=1950&year_end=2008&corpus=19&smoothing=3" width=900 height=500 marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no></iframe>';
    callback(res);
}

/// details
function formatajax(d,callback) {
		//alert(d.word)
		if (editorNeopat.lang == undefined){editorNeopat.lang='fr';}
		var restable='';
		var langues = {'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
        var request= $.ajax({
//        url:'http://192.168.0.10:8983/solr/rss_french/select?q=neologismes%3A' + d.word + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://localhost:8983/solr/' + langues[editorNeopat.lang] + '/select',
        data:{  q: '"'+d.word+'"',
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
        async:false,
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
             //   $.each(data, function (i, d) {
            //	   tbody += d.contents +'<br/>' ;
            //	   });

           // tbody += '</td></tr>';
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

// gestion childrow
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Lexie</td>'+
            '<td>'+d.word+'</td>'+
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



/////////////////// global results for patterns

////////////////////// global stats for patterns by language (French at the moment)
$("#neopatinfoBtnFr").on('click',function(){
	$("#neopatinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (français)...</a>');
    //console.log("here");
    get_neo_info_jsondata2('Fr', function(data)
            {
            	if (typeof data == 'number'){
					$("#neopatinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neopatinfoBtnFr"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsFr").show();
				}
				else{
					$("#neopatinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr2"></i>' + data + '</a>');				
				}
            }
            );
});


// loading of csv file with data
function get_neo_info_jsondata2(lang,callback) 
{ 		
		console.log(lang);
		var langues = {'It':"it_neo.tsv",'Fr':"patterns_synthesisFr.csv", 'Pl':"pl_neo.tsv", 'Br':'br_neo.tsv', 'Ch':'ch_neo.tsv', 'Ru':'ru_neo.tsv', 'Cz':'cz_neo.tsv', 'Gr':'gr_neo.tsv'};
		file = "data/" + langues[lang]
		console.log(file);
		console.log(d3.version);
		console.log(dc.version);
		d3.tsv(file,function(error,data){
		if (error) throw error;
		
    	console.log(data);
    	if (data[0] == undefined){console.log("Aucune donnée");return "Aucune donnée dans cette langue.";}
    	//console.log(data[1]);
//	    if (lang == 'Fr'){
	        console.log("build_corpus_info_lang_cnt2 function")
	        build_corpus_info_lang_cnt2(data,lang);
//	        }
//	    else{
//	        console.log("build_corpus_info_lang function")
	        //build_corpus_info_lang(docsdata,lang);
//	        }	           
//	    }
    });
}

// build dc.js charts
function build_corpus_info_lang_cnt2(jsondata, lang){

console.log(jsondata[0]);
  
jsondata.forEach(function(d,i) { 
  		
  		//if (d.date.length!=7){console.log(d.date);}
  		d.index = i;
        d.SIMILARITY= +d.SIMILARITY;
        d.POSPATTERNSC2= +d.POSPATTERNSC2;
        d.POSPATTERNSC1= +d.POSPATTERNSC1;
        d.LEXPOSPATTERNSC2= +d.LEXPOSPATTERNSC2;
        d.LEXPOSPATTERNSC1= +d.LEXPOSPATTERNSC1;
        d.FILEDETAILS= d.FILEDETAILS;
        d.TOTALCORPUS2= +d.TOTALCORPUS2;
        d.TOTALCORPUS1= +d.TOTALCORPUS1;
        d.LEXICALUNIT = d.LEXICALUNIT;
  }); 
 console.log("Data Loaded");

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll();
  

/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc-data-count'+lang);
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc-data-count2'+lang);
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
/***************************** CORPUS 1 CHART ***********************/

var neoChart = dc.barChart("#dc-neo-chart"+lang);
//  corpus 1 total  dimensions
var c1Dimension = facts.dimension(function (d) {if (d.TOTALCORPUS1 < 100){return d.TOTALCORPUS1;} else{return 99;}  });
var c1Group = c1Dimension.group();
console.log("corpus 1 groups :" + c1Group.size());

var c1Min = +c1Dimension.bottom(1)[0];
var c1Max = +c1Dimension.top(1)[0];
  // setup timeline graph
  neoChart
  	.width(400)
    .height(200)
    .dimension(c1Dimension)
    .group(c1Group)
    .mouseZoomable(true)
    //.brushOn(false)
    .transitionDuration(500)
    .yAxisLabel("Nombre de lexies")
    .xAxisLabel("Fréquence")
    //.elasticY(true)
    .elasticX(true)
    .turnOnControls(true)
    .renderHorizontalGridLines(true)
    //.y(d3.scale.log())
    .x(d3.scale.linear().domain([1,100])) //.range([0, 50]))
    .y(d3.scale.linear().domain([1,100]))     
    .yAxis().tickValues([0,5,10,15,20,30,40,50,100]);
  
  
  console.log("neoChart built");
  console.log(neoChart);
/***************************** CORPUS 2 CHART ***********************/

// Create the dc.js chart objects & link to div
var countryChart = dc.barChart("#dc-country-chart"+lang);
//  corpus2  dimensions
//	var scalec2 = d3.scale.log().domain([0, 20]).range([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
var c2Dimension = facts.dimension(function (d) { if (d.TOTALCORPUS2 < 100){return d.TOTALCORPUS2;} else{return 99;} });
//var c2Dimension = facts.dimension(function (d) {console.log(scalec2(d.TOTALCORPUS2+1));return scalec2(d.TOTALCORPUS2+1); });
var c2Group = c2Dimension.group();
console.log("corpus2 groups :" + c2Group.size());
var c2Min = +c2Dimension.bottom(1)[0];
var c2Max = +c2Dimension.top(1)[0];

  // setup timeline graph
  countryChart
  	.width(400)
    .height(200)
    .dimension(c2Dimension)
    .mouseZoomable(true)
    .group(c2Group)
    .transitionDuration(500)
    .yAxisLabel("Nombre de lexies")
    .xAxisLabel("Fréquence")
    //.elasticY(true)
    .elasticX(true)
    .turnOnControls(true)
    .renderHorizontalGridLines(true)
   //.y(d3.scale.log())
//    .x(d3.scale.linear().domain([c2Min,c2Max]))
     .x(d3.scale.linear().domain([1,100])) 
     .y(d3.scale.linear().domain([1,100])) 
    //.range([0,100]))  
   // .yAxis().ticks(5);
    .yAxis().tickValues([0,5,10,15,20,30,40,50,100]);
    
console.log("countryChart built");
console.log(countryChart);


/***************************** SIMILARITY  ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.barChart("#dc-time-chart"+lang);

//  similarity  dimensions
	var scale = d3.scale.quantize().domain([0, 1]).range([0,1,2,3,4,5,6,7,8,9]);
//	var scale = d3.scale.quantize().domain([0, 1]).range(["0-10","10-20","20-30","30-40","40-50","50-60","60-70","70-80","80-90","90-100"]);
//	var scale = d3.scale.linear().domain([0, 1]);
    var simDimension = facts.dimension(function (d) { return scale(d.SIMILARITY); });
    var simGroup = simDimension.group();
	console.log("Similarity groups :" + simGroup.size());

var simMin = +simDimension.bottom(1)[0];
var simMax = +simDimension.top(1)[0];
   

  // setup timeline graph
  timeChart
  	.width(800)
    .height(250)
    .gap(10)
    .centerBar(true)
    .dimension(simDimension)
    .group(simGroup)
    .yAxisLabel("Nombre de lexies")
    .xAxisLabel("Similarité (en %)")
    .elasticY(true)
    .elasticX(true)
//    .turnOnControls(true)
    .renderHorizontalGridLines(true)
    .y(d3.scale.linear().domain([0,1000]))
    .x(d3.scale.linear().domain([simMin, simMax]));
	//.range([0, 10]))
//    .yAxis().tickValues([0,5,10,50,100,200,300,500]);
  
  
  console.log("Time chart built");
  console.log(timeChart);
  
  
// bar chart linked to the other  
// Create the dc.js chart objects & link to div  

/***************************** DATATABLES CHART ***********************/

//table
//dimension for table search
var tDimension = facts.dimension(function (d) { return d.LEXICALUNIT;});

var tableDimension = tDimension.group().reduce(
            function(a, d) {
        		a= d;
                return a;
            },
            function(a, d) {
                a = {};
                return a;
            },
            function() {
                return  {}; }
            );

/// for top	
function remove_empty_bins_top(source_group) {
    function non_zero_pred(d) {
    	//console.log(d);
        return Object.keys(d.value).length != 0 // != {};
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
var tableDimensionTop = remove_empty_bins_top(tableDimension);
console.log("Dimensions created");
console.log(tableDimension);


var dOptions = {
        "bSort": true,
		columnDefs: [
			{
				targets: 0,
				data: function (d) { return d.key; }
			},
			{
				targets: 1,
				data: function (d) {return d.value.SIMILARITY; }
			},
			{
				targets: 2,
				data: function (d) {return d.value.TOTALCORPUS1; }
			},
			{
				targets: 3,
				data: function (d) {return d.value.TOTALCORPUS2; }
			},
			{
				targets: 4,
				data: function (d) {return d.value.POSPATTERNSC1; }
			},
			{
				targets: 5,
				data: function (d) {return d.value.POSPATTERNSC2; }
			},
			{
				targets: 6,
				data: function (d) {return d.value.LEXPOSPATTERNSC1; }
			},
			{
				targets: 7,
				data: function (d) {
					//console.log(d.value);
					return d.value.LEXPOSPATTERNSC2; }
			},
			{
				targets: 8,
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
			},
			{
				targets: 9,
                className:      'details-control2',
                orderable:      false,
                data:           null,
                defaultContent: ''
			}		
			]
	};
// create datatable
var datatablesynth = $("#dc-table-chart"+lang);
datatablesynth.dataTable(dOptions);


// info childrow (common and distinct  pos and lexpos
function format ( d ) {
    // `d` is the original data object for the row
    console.log(d);
    console.log(jsondata);
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Patrons POS Communs</td>'+
            '<td>'+d.value.COMMONPOS+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Patrons LEXPOS Communs</td>'+
            '<td>'+d.value.COMMONLEXPOS+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Patrons POS Spécifiques Corpus 1</td>'+
            '<td>'+d.value.MISS2POS+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Patrons LEXPOS Spécifiques Corpus 1</td>'+
            '<td>'+d.value.MISS2LEXPOS+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Patrons POS Spécifiques Corpus 2</td>'+
            '<td>'+d.value.MISS1POS+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Patrons LEXPOS Spécifiques Corpus 2</td>'+
            '<td>'+d.value.MISS1LEXPOS+'</td>'+
        '</tr>'+
    '</table>';
}

// to be removed ? (look for word in apache solr)
function getcontexts(d,lang,callback) 
{
		//alert(d.termes_copy.terme)
		console.log(lang);
		if (lang == undefined){lang='fr';}
		var restable='';
		var langues = {'It':'rss_italian','Fr':"rss_french", 'Pl':"RSS_polish", 'Br':'RSS_brasilian', 'Ch':'RSS_chinese', 'Ru':'RSS_russian', 'Cz':'RSS_czech', 'Gr':'RSS_greek'};
        var request= $.ajax({
//        url:'http://localhost:8983/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://localhost:8983/solr/' + langues[lang] + '/select',
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
        type:'GET',
        //async:false,
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
             //   $.each(data, function (i, d) {
            //	   tbody += d.contents +'<br/>' ;
            //	   });

           // tbody += '</td></tr>';
            restable = '<table width="100%">' + thead + tbody + '</table>';
           // return restable;
        	callback(restable);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            //return restable;
            callback(restable)
        }
    });
	//return restable;
}

    
// Add event listener for opening and closing details 1 (
datatablesynth.DataTable().on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = datatablesynth.DataTable().row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
             row.child( format(row.data()) ).show();
        	    tr.addClass('shown');
            }
    } );
    
// Add event listener for opening and closing details button 2=> specific stats on patterns
datatablesynth.DataTable().on('click', 'td.details-control2', function () {
        var tr = $(this).closest('tr');
        var row = datatablesynth.DataTable().row( tr );
        lang='Fr';
 		if (lang == undefined){lang='Fr';}
        if ( row.child.isShown() ) {
            // This row is already open - close it
            $("#patResultsFr").hide();
            row.child.hide();
            details = row.child()
            details.removeClass('shown');
            details.removeClass('det_stat_res');
        }
        else {
            // Open this row
            //alert(row.data())
            get_wordpat_jsondata(lang,row.data(), function(data)
            {
	            //alert(data)
	            if (data == 0){
	            row.child(  "Les données pour cette lexie ne sont pas disponibles." ).show();
	            details = row.child();
        	    details.addClass('shown');
	            }
	            else{
    	        row.child(  data + " patrons" ).show();
	            details = row.child();
        	    details.addClass('shown');
        	    details.addClass('det_stat_res');
				$('#patResults'+ lang).clone().appendTo('.det_stat_res td');
				$("#patResults" + lang).show();
        	    }
            }
            );
        }
    } );
    

	
//custom refresh function, see http://stackoverflow.com/questions/21113513/dcjs-reorder-datatable-by-column/21116676#21116676
function RefreshTable() {
            dc.events.trigger(function () {
				//console.log("dc.events");
				//datatablesynth.api()
        		//	.clear()
        		//	.rows.add( tableDimensionTop.top(Infinity) )
        		//	.draw() ;
                alldata = tableDimensionTop.top(Infinity);
                //console.log(alldata);
                datatablesynth.fnClearTable();
                datatablesynth.fnAddData(alldata);
                datatablesynth.fnDraw();
            });
        }
	
//call RefreshTable when dc-charts are filtered
for (var i = 0; i < dc.chartRegistry.list().length; i++) {
		var chartI = dc.chartRegistry.list()[i];
		chartI.on("filtered", RefreshTable);
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
console.log(tableDimensionTop);


/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
    $("#neoResults"+lang).show();
    $("#neoResults"+lang).css( "display", "visible !important");
	$("#neoinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtn2Done">Chargement effectué. ' + jsondata.length + ' occurrences de néologismes</a>');
    // Render the Charts
  	dc.renderAll(); 

}



///////////////////////////////////////////// detailled results for one word
// loading of csv file with data
function get_wordpat_jsondata(lang,info,callback) 
{ 		
		console.log(info.value.FILEDETAILS);		
		file = "data/" + info.value.FILEDETAILS
		console.log(file);
		console.log(d3.version);
		d3.csv(file,function(error,data){
		if (error) {
			throw error;
			callback(0);
			}
		
    	console.log(data);
    	if (data[0] == undefined){console.log("Aucune donnée");return "Aucune donnée dans cette langue.";}
    	//console.log(data[1]);
	    console.log("build_wordpat_info function" + data.length);
	    callback(data.length);
	    build_wordpat_info(data,lang);
    });
}

// build dc.js charts
function build_wordpat_info(jsondata, lang){


/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms

//left4w,left4p,left3w,left3p,left2w,left2p,left1w,left1p,word,pos,right1w,right1p,right2w,right2p,right3w,right3p,right4w,right4p,freq,period,level,lexpospat,pospat
// to be built : freq,period,level,lexpospat,pospat

 jsondata.forEach(function(d,i) { 
  		
  		//if (d.date.length!=7){console.log(d.date);}
        d.freq= +d.freq;
        d.period= d.period;
        d.lexpospat= d.lexpospat;
        d.pospat= d.pospat;
        d.level= d.level;
  }); 
 console.log("Data Loaded");

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll();
  

/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc-datapat-count'+lang);
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> patrons' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les patrons sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc-datapat-count2'+lang);
totalCount2 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> patrons' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les patrons sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
  
console.log("Count chart built"); 		   
console.log(totalCount);
/***************************** TIME CHART ***********************/
var pattimeChart = dc.rowChart("#dc-pattime-chart"+lang);
// dimension and group
var pattimeDimension = facts.dimension(function (d) { return d.period; });
var pattimeGroup = pattimeDimension.group().reduceCount(function (d) { return d.period; });


var pattimeGroup2 = pattimeDimension.group().reduce(
            function(a, d) {
        		a= a+d.freq;
                return a;
            },
            function(a, d) {
                a = a-d.freq;
                return a;
            },
            function() {
                return  0; }
            );


console.log("pattime groups :" + pattimeGroup2.size());

// newspaper setup rowschart (TOP)
    pattimeChart
    		.width(500)
            .height(200)
            .dimension(pattimeDimension)
            .group(pattimeGroup2)
            .rowsCap(10)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("pattime chart built");
//console.log(newspaperChartLow);
console.log(pattimeChart);


/***************************** PAT LEVEL CHART ***********************/

var patlevelChart = dc.rowChart("#dc-patlevel-chart"+lang);
// dimension and group
var patlevelDimension = facts.dimension(function (d) { return d.level; });
var patlevelGroup = patlevelDimension.group().reduceCount(function (d) { return d.level; });

var patlevelGroup2 = patlevelDimension.group().reduce(
            function(a, d) {
        		a= a+d.freq;
                return a;
            },
            function(a, d) {
                a = a-d.freq;
                return a;
            },
            function() {
                return  0; }
            );

function remove_empty_bins_top2(source_group) {
    function non_zero_pred(d) {
    	//console.log(d);
        return d.value != 0 // != {};
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
var patlevelG = remove_empty_bins_top2(patlevelGroup2);
console.log("patlevel groups :" + patlevelGroup2.size());

// newspaper setup rowschart (TOP)
    patlevelChart
    		.width(500)
            .height(200)
            .dimension(patlevelDimension)
            .group(patlevelGroup2)
            .group(patlevelG)
            .rowsCap(10)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("patlevel chart built");
//console.log(newspaperChartLow);
console.log(patlevelChart);


/***************************** POSPAT CHART ***********************/

var pospatChart = dc.rowChart("#dc-pospat-chart"+lang);
// dimension and group
var pospatDimension = facts.dimension(function (d) { return d.pospat; });
var pospatGroup = pospatDimension.group().reduceCount(function (d) { return d.pospat; });

var pospatGroup2 = pospatDimension.group().reduce(
            function(a, d) {
        		a= a+d.freq;
                return a;
            },
            function(a, d) {
                a = a-d.freq;
                return a;
            },
            function() {
                return  0; }
            );

console.log("pospat groups :" + pospatGroup2.size());
var pospatG = remove_empty_bins_top2(pospatGroup2);

// newspaper setup rowschart (TOP)
    pospatChart
    		.width(500)
            .height(300)
            .dimension(pospatDimension)
            .group(pospatG)
            .rowsCap(10)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("pospat chart built");
console.log(pospatChart);



/***************************** lexpospat CHART ***********************/

var lexpospatChart = dc.rowChart("#dc-lexpospat-chart"+lang);
// dimension and group
var lexpospatDimension = facts.dimension(function (d) { return d.lexpospat; });
var lexpospatGroup = lexpospatDimension.group().reduceCount(function (d) { return d.lexpospat; });

var lexpospatGroup2 = lexpospatDimension.group().reduce(
            function(a, d) {
        		a= a+d.freq;
                return a;
            },
            function(a, d) {
                a = a-d.freq;
                return a;
            },
            function() {
                return  0; }
            );

var lexpospatG = remove_empty_bins_top2(lexpospatGroup2);
console.log("lexpospat groups :" + lexpospatGroup2.size());

// newspaper setup rowschart (TOP)
    lexpospatChart
    		.width(500)
            .height(300)
            .dimension(lexpospatDimension)
            .group(lexpospatG)
            .rowsCap(10)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("lexpospat chart built");
console.log(lexpospatChart);



/***************************** DATATABLES CHART ***********************/
// sauvegarde version limitée datatables
var patdataTable = dc.dataTable("#dc-tablepat-chart"+lang);


  /// render the datatable
    patdataTable
//    .width(960).height(800)
    .dimension(pospatDimension)
	.group(function(d) { return ""})
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.left4p; },
      function(d) { return d.left4w; },
      function(d) { return d.left3p; },
      function(d) { return d.left3w; },
      function(d) { return d.left2p; },
      function(d) { return d.left2w; },
      function(d) { return d.left1p; },
      function(d) { return d.left1w; },
      function(d) { return d.pos; },
      function(d) { return d.word; },
      function(d) { return d.right1p; },
      function(d) { return d.right1w; },
      function(d) { return d.right2p; },
      function(d) { return d.right2w; },
      function(d) { return d.right3p; },
      function(d) { return d.right3w; },
      function(d) { return d.right4p; },
      function(d) { return d.right4w; },
      function(d) { return d.freq; },
      function(d) { return d.level; },
      function(d) { return d.period; }
    ])
    .sortBy(function(d){ return d.freq; })
    .order(d3.descending);
    
    console.log(patdataTable);

/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
   // $('#patResults'+ lang).clone().appendTo('.det_stat_res td');
    //$("#patResults"+lang).show();
    //$("#patResults"+lang).css( "display", "visible !important");
    // Render the Charts
  	dc.renderAll(); 

}






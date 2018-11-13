jQuery.support.cors = true;



// button search
$('#searchbtn').on('click', function () {
		console.log('search btn clicked');
		$("#resneg").hide();
		$('#progress').show();
		req = $('input#req').val();
		lang2 = $('select#langsearch').val();
		max = $('select#limitres').val();
		console.log(req);
		console.log(lang2);
		resdiv = $('#corpusResults');
		resdiv.hide();
        get_neologism_stat(lang2, req, max, function(data)
        {
        	console.log("Data " + data);
            if (typeof data == 'number'){
            	if (data == 0){
					$("#progress").hide();
					$("#resneg").show();
            	}
            	else{
					$('#progress').hide();
					$("#corpusResults").show();
				}
			}    
        }
        );
} );

//  term search
$('#termbtn').on('click', function () {
                console.log('termbtn clicked');
                $("#resneg").hide();
                $('#progress').show();
                req = $('input#req').val();
                lang2 = $('select#langsearch').val();
                max = $('select#limitres').val();
                console.log(req);
                console.log(lang2);
                resdiv = $('#termResults');
                resdiv.hide();
            get_terms_from_seq(lang2, req, max, function(data,data2)
            {
                console.log("Resultsa " + data);
                console.log("Data " + data2);
                        if (data == 0){
                                                $("#progress").hide();
                                                $("#resneg").show();
                        }
                        else{
                                                $('#progress').hide();

						// convert to hash (duplicates removal)
						res = {};
						for (var i=0;i<data;i=i+2){
							word = data2[i].split("/");
						    if (word[0] in res){ res[word[0]]=res[word[0]] + data2[i+1];}
						    else {res[word[0]]=data2[i+1];}
						}
						console.log(res);
						resSorted = getSortedKeys(res);
						console.log(resSorted);
						var html='<div class="col-sm-12"><div>Nombre de termes trouvés : ' + resSorted.length + '</div><table class="table table-hover"><thead><td>Mot-forme</td><td>Fréquence</td></thead><tbody>';
						for (var i = 0; i < resSorted.length; i++) {
							value = res[resSorted[i]];
						    html+='<tr><td>'+resSorted[i]+'</td><td>'+value+'</td></tr>';
						}
						//for (var i=0; i<data; i=i+2) {
						//	
						//    html+='<tr><td>'+word[0]+'</td><td>'+data2[i+1]+'</td></tr>';
						//}
						html+='</tbody></table></div>';
						document.getElementById('termResults').innerHTML= html;
						//var table = $.makeTable(data);
						//data2.appendTo("#termResults");
                                            	$("#termResults").show();
                                        }
            }
            );
    } );

function getSortedKeys(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b]-obj[a]});
}

//  term search
$('#termbtn_bk').on('click', function () {
                console.log('termbtn clicked');
                $("#resneg").hide();
                $('#progress').show();
                req = $('input#req').val();
                lang2 = $('select#langsearch').val();
                max = $('select#limitres').val();
                console.log(req);
                console.log(lang2);
                resdiv = $('#termResults');
                resdiv.hide();
            get_terms_from_seq(lang2, req, max, function(data,data2)
            {
                console.log("Resultsa " + data);
                console.log("Data " + data2);
                        if (data == 0){
                                                $("#progress").hide();
                                                $("#resneg").show();
                        }
                        else{
                                                $('#progress').hide();
						//var div = document.createElement("div");
						//div.innerHTML = data2;
						//termResults.appendChild(div);

						var html='<div class="col-sm-12"><table class="table table-hover"><thead><td>Mot-forme</td><td>Fréquence</td></thead><tbody>';
						for (var i=0; i<data; i=i+2) {
						    html+='<tr><td>'+data2[i]+'</td><td>'+data2[i+1]+'</td></tr>';
						}
						html+='</tbody></table></div>';
						document.getElementById('termResults').innerHTML= html;
						//var table = $.makeTable(data);
						//data2.appendTo("#termResults");
                                            	$("#termResults").show();
                                        }
            }
            );
    } );


//////////////   STATS FOR SPECIFIC NEOLOGISM 

// ajax call to retrieve from apache solr the json data for the given language and given neologism 4/11/2016
function get_terms_from_seq(lang,neo, max, callback) 
{
                //alert(d.lexie)
                if (max=='all'){max=1000;}
		max=1000;
		query = '[\\w\\/-]{0,15}' + neo + '[\\w\\/-]{0,15}';
//		alert(query);
                var langues = {'de':'rss_german','nl':"rss_netherlands",'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
                console.log("term search : " + langues[lang] + " : " + neo);
        var request= $.ajax({
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[lang] + '/terms',
        data:{  'terms.regex': query,
			'terms.stats':true,
			'terms.limit':max,
			'terms.reg.flag':"case_insensitive",
			'terms.fl': 'pos-text',
//                        'terms.fl': 'contents',
                        "wt":"json",
                        "indent":"false",
                        },
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'POST',
        async:false,
        success: function( result) {
            console.log(JSON.stringify(result));
		//alert(JSON.stringify(result));
//            docsdata =result.terms["pos-text"];/// main results
            docsdata =result.terms["pos-text"];/// main results
           // highlight = result.highlighting;
            //alert(highlight)
           // alert(docsdata);
//            num = result.response.numFound;
		num = docsdata.length;
            console.log(num)
            if (num == 0){
                callback(num,'');
            }
            else{
                    callback(num,docsdata);
//                    build_corpus_info_lang(docsdata,lang, neo);
                }
        },
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            res= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(res);
        }
    });
}





// ajax call to retrieve from apache solr the json data for the given language and given neologism 4/11/2016
function get_neologism_stat(lang,neo, max, callback) 
{
		if (max=='all'){max=1000;}
		var langues = {'es':'rss_spanish','de':'rss_german','nl':"rss_netherlands",'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
		console.log("get_neologism_stat : " + langues[lang] + " : " + neo);
        var request= $.ajax({
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[lang] + '/select',
        data:{  q: '"' +neo + '"',
        		rows:max,
        		"wt":"json",
        		"indent":"false",
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'POST',
        async:false,
        success: function( result) {
        	//console.log(JSON.stringify(result));
            docsdata =result.response.docs;/// main results
            num = result.response.numFound;
            console.log(num)
            if (num == 0){
            	callback(num);
            }
            else{
	            callback(num);
	            build_corpus_info_lang(docsdata,lang, neo);
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
function build_corpus_info_lang(jsondata, lang, lexie){


// lang = '' to cover all cases
lang='';
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
    	//if(not("category" in d)){d.category = 'Aucune';}
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
            all: '<strong>%total-count</strong> articles. Cliquez sur les graphes pour effectuer des filtres.'
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
            .height(280)
            .dimension(neoDim)
            .group(neoGroupTop)
            .rowsCap(10)
            .othersGrouper(false)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            //.title(function(d){return d.key + ' (' + d.value + ')';})
            .renderLabel(true)
            //.gap(0.1)
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
  // create timeline chart dimensions
	var volumeByWeek = facts.dimension(function(d) {
    return d3.time.week(d.dtg);
  });

	var volumeByMonth = facts.dimension(function(d) {
    return d3.time.month(d.dtg);
  });

  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Day groups :" + volumeByDayGroup.size());

  var volumeByWeekGroup = volumeByWeek.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Week groups :" + volumeByWeekGroup.size());

  var volumeByMonthGroup = volumeByMonth.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Month groups :" + volumeByMonthGroup.size());

    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].date;
 	var maxDate = volumeByDay.top(1)[0].date;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	.width(1000)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    .renderArea(true)
    .dimension(volumeByWeek)
    .group(volumeByWeekGroup)
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
        //.cx(300)
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

/***************************** SUBJECT2 PIE CHART ***********************/
/*
// Create the dc.js chart objects & link to div
var subjectChart2 = dc.pieChart("#dc-subject2-chart"+lang);


//  subjectchart  dimensions
    var subject2Dimension = facts.dimension(function (d) { return d.category; });
    var subject2Group = subject2Dimension.group();
	console.log("Subject groups :" + subject2Group.size());
  
// subject chart
 	subjectChart2
 		.width(500)
        .height(250)
        //.cx(300)
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
        .dimension(subject2Dimension)
        .group(subject2Group)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("Subject2 chart built");
console.log(subjectChart2);
*/

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
var dOptions = {
        "bSort": true,
		columnDefs: [
			{
				targets: 0,
				data: function (d) { return d.country;  }
			},
			{
				targets: 1,
				data: function (d) { return d.subject; }
			},
			{
				targets: 2,
				data: function (d) { return d.newspaper;}
			},
			{
				targets: 3,
				data: function (d) { return d.dtg; }
			},
			{
				targets: 4,
				data: function (d) { return highlight(d.contents.toString(),lexie) + '&nbsp;<a title=\"Voir l\'article complet\" href=\"' + d.article + "\" target=\"_blank\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a>";}
			}
		]
	};
	
	
// sauvegarde version limitée datatables
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);
//var datatablesynth = $("#dc-table-chart"+lang);
//datatablesynth.dataTable(dOptions);
//var dataTableDC = dc.dataTable("#dc-table-chart"+lang);
//dataTableDC.dataTable(dOptions);

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
//	if (neo.match(" "){
	neo = neo.split(' ').join('.{0,3}');
	//var neo2 = neo.split(' ').join('.{0,3}');
	console.log("Neo : " + neo);
	//text = text.replace(regex, '.\\{0,5\\}'));
	var regexp = new RegExp( "(.{0,70})(" + neo.toString() + ")(.{0,70})", 'gi');
	//console.log(text);
	//console.log(typeof text);
	//console.log(regexp);
	//console.log(typeof regexp)
	//var res = text.match(regexp);
	match = regexp.exec(text);
	var res = ''
	if (match == null)
	{
		neo3 = neo.substring(0, neo.length - 2);
		var regexp = new RegExp( "(.{0,70})(" + neo3.toString() + ")(.{0,70})", 'gi');
		//var res = text.match(regexp);
		match = regexp.exec(text);
		var res = ''
		if (match == null)
		{
			res = "Aucun résultat exact&nbsp;"
		}
		else{
			while (match != null){
				res = res + "<br/>..." + match[1] + "<mark>" + match[2] + "</mark>" + match[3] + "...";
				match = regexp.exec(text);
			}
		}
	}
	else{
		while (match != null){
			res = res + "<br/>..." + match[1] + "<mark>" + match[2] + "</mark>" + match[3] + "...";
			match = regexp.exec(text);
		}
	}
	//console.log(res);
	return res;
}    
    
console.log("Datatable chart built");
console.log(timeDimension);






/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
//    $("#corpusresults").show();
     //$("#corpusresults").css( "display", "visible !important");
     
//	$("#corpusinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="corpusinfoBtn2Done">Chargement effectué</a>');
    // Render the Charts
  	dc.renderAll(); 

}



/////////////////
///// test with editable table and other ui functionalities mai 2017
$('#neoinfoBtn').on('click', function () {
		console.log('neo button btn clicked');
		$("#resneg").hide();
		$('#progress').show();
		//$("#searchbtn").replaceWith('<button class="btn btn-info" id="searchbtn"><i class="fa fa-circle-o-notch fa-spin"></i> Recherche en cours...</button>');

		req = $('input#req').val();
		lang2 = $('select#langsearch').val();
		max = $('select#limitres').val();
		//console.log(req);
		//console.log(lang2);
		//$('#corpusResultssearch').show()
//		resdiv = $('#corpusResults'+ lang2);
		resdiv = $('#neoResults');
		//resdiv.removeClass('shown');
		resdiv.hide();
            get_neologism_stat2(lang2, req, max, function(data)
            {
        	    //resdiv.addClass('shown');
        	    //resdiv.addClass('stat_res');
        	    console.log("Data " + data);
            	if (typeof data == 'number'){
            		if (data == 0){
						$("#progress").hide();
						$("#resneg").show();
//					    $("#corpusResults" + lang2).show();            		
            		}
            		else{
	//				    $('#corpusResults'+ lang2).clone().appendTo('.stat_res td');
						//$("#searchbtn").replaceWith('<button type="button" class="btn btn-info" id="searchbtn">Rechercher</button>');
//					    $("#corpusResults" + lang2).show();
						$('#progress').hide();
					    $("#neoResults").show();
					}
				}
        	    
            }
            );
    } );


// ajax call to retrieve from apache solr the json data for the given language
function get_neologism_stat2(lang,neo, max, callback) 
{
		//alert(d.lexie)
		if (max=='all'){max=1000;}
		var langues = {'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
		console.log("get_neologism_stat : " + langues[lang] + " : " + neo);
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[lang] + '/select',
//        data:{  "q":'dateS:* AND neologismes:"' +neo.lexie+ '"',
//        data:{  "q":'"' +neo.lexie+ '"',
        data:{  q: '"' +neo + '"',
        		rows:max,
        		fl:"dateS,source,link,subject,subject2, neologismes, country, contents,category,",
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
        type:'POST',
        async:false,
        success: function( result) {
        	console.log(JSON.stringify(result));
            docsdata =result.response.docs;/// main results
           // highlight = result.highlighting;
            //alert(highlight)
//            alert(docsdata);
            num = result.response.numFound;
            console.log(num)
            if (num == 0){
            	callback(num);
            }
            else{
	            callback(num);
	            build_corpus_info_lang_cnt2(docsdata,lang, neo);
	        }
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            res= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(res);
        }
    });
}


// new version with datatable
function build_corpus_info_lang_cnt2(jsondata, lang,lexie){


/// to cover all lang
lang ='';
console.log(jsondata);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
   
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
  		
  		if (d.dateS.length!=20){console.log(d.dateS);}
    	//d.dtg   = dtgFormat.parse(d.dateS);
    	d.dtg   = dtgFormat.parse(d.dateS.substr(0,19));
 		d.newspaper   = d.source;
 		d.subject2= d.subject2;
 		d.country  = d.country;
    	d.subject  = d.subject;
        d.article= d.link;
        if (d.category ==''){d.category=='Non spécifie';}
        //d.category= d.category;
        d.contents = d.contents // added

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


/***************************** COUNTRY PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var countryChart = dc.pieChart("#dc-country-chart"+lang);


//  countrychart  dimensions
    var countryDimension = facts.dimension(function (d) { return d.country; });
    var countryGroup = countryDimension.group();
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

// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    //return d3.time.day(d.dtg);
    return d3.time.week(d.dtg)
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
  	.width(1000)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    //.dotRadius(5) //
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
    .renderHorizontalGridLines(true)
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


/***************************** category PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var categoryChart = dc.pieChart("#dc-category-chart"+lang);


//  categorychart  dimensions
    var categoryDimension = facts.dimension(function (d) { return d.category; });
    var categoryGroup = categoryDimension.group();
	console.log("category groups :" + categoryGroup.size());
  
// category chart
 	categoryChart
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



console.log("Newspapers chart built");
//console.log(newspaperChartLow);
console.log(newspaperChart);


/***************************** DATATABLES CHART ***********************/

//table
//dimension for table search
var tableDimension = facts.dimension(function (d) { return d.dtg;});
//var tableDimension = tDimension.group().reduceCount();
console.log("Dimensions created");
console.log(tableDimension);
	
var dOptions = {
        "bSort": true,
		columnDefs: [
			{
				targets: 0,
				data: function (d) { return d.country;  }
			},
			{
				targets: 1,
				data: function (d) { return d.subject; }
			},
			{
				targets: 2,
				data: function (d) { return d.newspaper;}
			},
			{
				targets: 3,
				data: function (d) { return d.dtg; }
			},
			{
				targets: 4,
				data: function (d) { return highlight(d.contents.toString(),lexie) + '&nbsp;<a title=\"Voir l\'article complet\" href=\"' + d.article + "\" target=\"_blank\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a>";}
			}
		]
	};
	
	
// sauvegarde version limitée datatables
//var dataTableDC = dc.dataTable("#dc-table-chart"+lang);
var datatablesynth = $("#dc-table-chart"+lang);
datatablesynth.dataTable(dOptions);


function highlight(text, lexie){
	
	var regexp = new RegExp( "(.{0,70})(" + lexie.toString() + ")(.{0,70})", 'g');
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


	
	//custom refresh function, see http://stackoverflow.com/questions/21113513/dcjs-reorder-datatable-by-column/21116676#21116676
	function RefreshTable() {
            dc.events.trigger(function () {
                alldata = tableDimension.top(Infinity);
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
		text_filter(tableDimension, this.value);// EC mai 2017 problem!!!!

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
    
    $("#neoResults"+lang).show();
    $("#neoResults"+lang).css( "display", "visible !important");
	$("#neoinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtn2Done">Chargement effectué. ' + jsondata.length + ' occurrences de néologismes</a>');
    // Render the Charts
  	dc.renderAll(); 

}




//////////// end test mai 2016

/// details
function formatajax(d,callback) 
{
		//alert(d.lexie)
		if (editor.lang == undefined){editor.lang='fr';}
		var restable='';
		var langues = {'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editor.lang] + '/select',
        data:{  q: '"'+d.lexie+'"',
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


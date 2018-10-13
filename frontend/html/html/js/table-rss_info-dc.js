function build_corpus_info(data){

var jsondata = JSON.parse(data);
if (typeof jsondata == "object")
{
	//alert("Well-formed JSON :" + data);
	r=3;
}
else
{
	alert("Bad-formed JSON (exiting after this alert):" + data);
	exit;
}
     
/********************************************************
*                                                       *
*   Step1: Create the dc.js chart objects & link to div *
*   dimensions : article (=> newspaper), subject, country, DATE_CREATED                                 *
********************************************************/
// Create the dc.js chart objects & link to div
var dataTableDC = dc.dataTable("#dc-table-graph");
var timeChart = dc.lineChart("#dc-time-chart");
var subjectChart = dc.pieChart("#dc-subject-graph");
var newspaperChart = dc.barChart("#dc-newspaper-chart");
var countryChart = dc.rowChart("#dc-country-graph");


  // format our data
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
    d.dtg   = dtgFormat.parse(d.DATE_CREATED.substr(0,19));
 	d.newspaper   = d.article.substring(0,20);
 	d.country= d.country;
    d.subject  = d.subject;
    d.article=d.article;
  }); 

  
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);

	// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
  });
  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0];
 	var maxDate = volumeByDay.top(1)[0];

    
    // for countrychart
    var countryDimension = ndx.dimension(function (d) { return d.country; });
    var countryGroup = countryDimension.group();

    // for subjectchart
    var subjectDimension = ndx.dimension(function (d) { return d.subject; });
    var subjectGroup = subjectDimension.group();


    // for newspaperchart
    var newspaperDimension = ndx.dimension(function (d) { return d.newspaper; });
    var newspaperGroup = newspaperDimension.group();
    
  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  // time graph
  timeChart.width(960)
    .height(150)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .brushOn(true)
    .title(function(d){
      return dtgFormat2(d.jsondata.key)
      + "\nTotal : " + d.jsondata.value;
      })
    .elasticY(true)
    //.x(d3.time.scale().domain([minDate, maxDate]))
    .x(d3.time.scale().domain([new Date(2016, 3, 01), new Date()]))
    .xAxis();
  
  	// subject chart
 	subjectChart.width(200)
        .height(200)
        .transitionDuration(1500)
        .dimension(subjectDimension)
        .group(subjectGroup)
        .radius(90)
        .minAngleForLabel(0)
        .label(function(d) { return d.data.key; });
        
  	// country chart
	countryChart.width(340)
            .height(850)
            .dimension(countryDimension)
            .group(countryGroup)
            .renderLabel(true)
            .colors(["#a60000","#ff0000", "#ff4040","#ff7373","#67e667","#39e639","#00cc00"])
            .colorDomain([0, 0]);
  
  /// render the datatable
    dataTableDC.width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return "Corpus Table"
	 })
	.size(10)
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
    //alert(dataTableDC);
    
    // Render the Charts
  	dc.renderAll(); 
}
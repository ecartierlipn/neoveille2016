<!-- dev version with crossfilter and dc.js libraries to visualize data -->
		<!--<script type="text/javascript" charset="utf-8" src="../js/d3.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/queue.js"></script>
		<script type="text/javascript" charset="utf-8" src="js/table.neosem.js"></script>
		<link href='../css/dc.css' rel='stylesheet' type='text/css'>
		<style>

 .axis {
   font: 10px sans-serif;
 }

 .axis path,
 .axis line {
   fill: none;
   stroke: #000;
   shape-rendering: crispEdges;
 }
.bar {
  fill: orange;
}

.bar:hover {
  fill: lightblue ;
}

#dc-country-chart g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}
[id*=dc-neo-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}
/*
[id*=dc-time-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}
*/
[id*=dc-neo-chart] g.row text {
      fill: black;
    }

 </style>-->
 <link rel="stylesheet" href="../jstree/dist/themes/default/style.min.css" />
 <style>
 /* Tooltip container */
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
 
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
    visibility: visible;
}
 
 </style>
 
    <div class="side-body" id="neosemview-dev">
	<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
    		<li role="neosem" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Profils combinatoires</a></li>
    		<li role="patterncat"><a href="#patterncat" aria-controls="patterncat" role="tab" data-toggle="tab">Catégorie de patrons</a></li>
    		<li role="help"><a href="#helpc" aria-controls="helpc" role="tab" data-toggle="tab">Aide</a></li>
  		</ul>
	<!-- tab panes -->
		<div class="tab-content">
			<!-- main pane for profil combinatoire -->
			<div role="tabpanel" class="tab-pane fade in active" id="home">
            	<div class="page-title">
                	<span class="title">Profils combinatoires des lexies</span>
                	<div class="description">
                         Cette interface vous permet de visualiser, sur un corpus de référence, le profil combinatoire
                         des lexies. Par profil combinatoire, nous entendons les patrons lexico-syntaxiques les plus fréquents
                         d'une lexie donnée. Les patrons sont regroupés par type, correspondant aux différents schémas
                         syntaxiques attestés, pour une partie du discours donnée, dans la langue donnée. Ainsi, pour un verbe 
                         en français, des patrons de type N(sujet) V, et/ou N(sujet) V N (objet) sont attestés dans la langue.
                         Ces types de patrons sont paramétrables et, à terme, l'outil permettra de les découvrir.
                         Les profils sont actuellement proposés pour le français, à partir du corpus Wikipedia (2011), 
                         pour une liste limitée de lexies verbales.
					</div>
					<h5>Choisissez une lexie : 
			<select name="lexie" id="lexie" class="lexie">
      			<option value="courir_VER.json" selected="selected">courir</option>
      			<option value="verser_VER.json">verser</option>
      			<option value="danser_VER.pos.json">danser</option>
      			<option value="arriver_VER.json">arriver</option>
      			<option value="dormir_VER.json">dormir</option>
    		</select>
		  </h5>
            	</div>
            	
	<div class="container" id="content">
		<div class="row page" id="demo" style="display:block;">
			<div class="col-md-12">
				<div class="row">
					<div class="col-md-4 col-sm-8 col-xs-8">
						<button type="button" class="btn btn-success btn-sm" onclick="demo_create();"><i class="glyphicon glyphicon-asterisk"></i> Create</button>
						<button type="button" class="btn btn-warning btn-sm" onclick="demo_rename();"><i class="glyphicon glyphicon-pencil"></i> Rename</button>
						<button type="button" class="btn btn-danger btn-sm" onclick="demo_delete();"><i class="glyphicon glyphicon-remove"></i> Delete</button>
						<button type="button" class="btn btn-success btn-sm" onclick="demo_save();"><i class="glyphicon glyphicon-asterisk"></i> Save</button>
					</div>
					<div class="col-md-2 col-sm-4 col-xs-4" style="text-align:right;">
						<input type="text" value="" style="box-shadow:inset 0 0 4px #eee; width:120px; margin:0; padding:6px 12px; border-radius:4px; border:1px solid silver; font-size:1.1em;" id="demo_q" placeholder="Search" />
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div id="jstree_demo" class="demo" style="margin-top:1em; min-height:200px;"></div>

					</div>
	<!--<script>$.each($q,function(i,f){$(f)});$q=null;</script>  -->          	
            	
            	
            </div>
            <!-- pattern categories pane -->
            <div role="tabpanel" class="tab-pane fade" id="patterncat">		  		
			<!-- Profil combinatoire -->
            	<div class="page-title">
                	<span class="title">Définition des patrons par partie du discours</span>
                	<div class="description">
                         Cette interface vous permet de visualiser et de modifier les patrons liés aux différentes
                         parties du discours. Par exemple, pour les verbes, on s'intéressera aux constructions intransitives,
                         transitives, ditransitives, complétives, ou encore aux constructions modales et adverbiales. Pour 
                         définir les patrons, la syntaxe est relativement simple. Par exemple pour s'intéresser aux patrons
                         transitifs directs, on indiquera N V N; pour les constructions transitives indirectes, on indiquera
                         N V PREP N. Pour obtenir la liste des parties du discours utilisables, cliquez sur l'aide. Pour o
                         obtenir la liste des patrons prédéfinis par partie du discours, choisissez ci-dessous une partie du discours.
					</div>
					<h5>Choisissez une partie du discours : 
			<select name="pos" id="pos" class="pos">
      			<option value="v">Verbe (V)</option>
      			<option value="n" selected="selected">Nom (N)</option>
      			<option value="adj">Adjectif (Adj)</option>
     			<option value="adv">Adverbe (Adv)</option>

    		</select>
		  </h5>
            	</div>
                <!-- results -->
				<div class="row row-example" id="neosemResults" style="display:none;">
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par Langue/Pays</div>
                                                <div class="panel-body">
                                                    <div id="dc-country-chart">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span>
                                                    	<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-count'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chart">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chart">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>		                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par journaux (10 plus importants)</div>
                                                <div class="panel-body">
		                                            <div id="dc-newspaper-chart">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Données</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-count2'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chart'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Langue</th>
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>
                                        <!--<div id="chart-composite"></div>-->

		  		</div>
      		</div>
            <!-- help pane -->
            <div role="tabpanel" class="tab-pane fade" id="helpc">Toto</div>
        </div>
    </div>
    
  <!-- 4 include the jQuery library -->
 <script src="../jstree/dist/jstree.min.js"></script>
 						<script>
						jQuery.noConflict();
						jQuery(document).ready(function($){
						// search function available
						$(function () {
							var to = false;
							$('#demo_q').keyup(function () {
								if(to) { clearTimeout(to); }
								to = setTimeout(function () {
									var v = $('#demo_q').val();
									$('#jstree_demo').jstree(true).search(v);
								}, 250);
							});

							$('#jstree_demo')
								.jstree({
									"core" : {
										"animation" : 0,
										"check_callback" : true,
										'force_text' : true,
										"themes" : { "stripes" : true },
										'data' : { 
											type:"POST",
											cache:false,
											url: '../html/data/courir_VER.json',
											dataType:"json",
											data: function(node){return{'id':node.id};} 
											},
									},
									"types" : {
										"#" : { "max_children" : 1, "max_depth" : -1, "valid_children" : ["root"] },
										"root" : { "icon" : "/static/3.3.4/assets/images/tree_icon.png", "valid_children" : ["default"] },
										"default" : { "valid_children" : ["default","file"] },
										"file" : { "icon" : "glyphicon glyphicon-file", "valid_children" : [] }
									},
//									"plugins" : [ "contextmenu", "search", "state", "types", "wholerow" ]
									"plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow" ,"sort"],
									'sort' : function (a, b) {
										//alert(this.get_node(a).original.freq)
    									return parseInt(this.get_node(a).original.freq) > parseInt(this.get_node(b).original.freq) ? -1 : 1;}
								});
						});
						});
						function demo_create() {
			
							var ref = jQuery('#jstree_demo').jstree(true),
								sel = ref.get_selected();
								console.log(ref);
							if(!sel.length) { return false; }
							sel = sel[0];
							sel = ref.create_node(sel, {"type":"default"});
							if(sel) {
								ref.edit(sel);
							}
						};
						function demo_rename() {
							var ref = jQuery('#jstree_demo').jstree(true),
								sel = ref.get_selected();
							if(!sel.length) { return false; }
							sel = sel[0];
							ref.edit(sel);
						};
						function demo_delete() {
							var ref = jQuery('#jstree_demo').jstree(true),
								sel = ref.get_selected();
							if(!sel.length) { return false; }
							ref.delete_node(sel);
						};
						function demo_save() {
						    // nested format
							//var your_tree_nested = $('#tree').jstree(true).get_json();
							// flat format
							var tree_flat = jQuery('#jstree_demo').jstree(true).get_json(null, { "flat" : true });
							//var json = JSON.stringify(tree_flat);
            				//alert(json);
							console.log(tree_flat);						
							//console.log(json);						
						};
						function load_json_data(word){
							jQuery("#jstree_demo").jstree("destroy");
							jQuery('#jstree_demo')
								.jstree({
									"core" : {
										"animation" : 0,
										"check_callback" : true,
										'force_text' : true,
										"themes" : { "stripes" : true },
										'data' : { 
											type:"POST",
											cache:false,
											url: '../html/data/' + word,
											dataType:"json",
											data: function(node){return{'id':node.id};} 
											},
									},
									"types" : {
										"#" : { "max_children" : 1, "max_depth" : -1, "valid_children" : ["root"] },
										"root" : { "icon" : "/static/3.3.4/assets/images/tree_icon.png", "valid_children" : ["default"] },
										"default" : { "valid_children" : ["default","file"] },
										"file" : { "icon" : "glyphicon glyphicon-file", "valid_children" : [] }
									},
									"plugins" : [ "contextmenu", "dnd", "search", "state", "types", "wholerow","sort" ],
									'sort' : function (a, b) {
										//alert(this.get_node(a).original.freq)
    									return parseInt(this.get_node(a).original.freq) > parseInt(this.get_node(b).original.freq) ? -1 : 1;}
								});						
							//jQuery('#jstree_demo').jstree(true).settings.core.data = '../html/data/' + word;
							jQuery('#jstree_demo').jstree(true).refresh();
							jQuery("#jstree_demo").on('hover_node.jstree', function(e,data){
							console.log(data);
							info = jQuery('#jstree_demo').jstree(true).get_node(data.node.id).original.words
//							info = jQuery('#jstree_demo').jstree(true).get_node("data.node.id").data
							jQuery("#"+data.node.id).prop('title', info);
						});						
						}
						$('select.lexie').on('change', function() {
  							//alert( this.value );
  							load_json_data(this.value);
						});
						jQuery("#jstree_demo").on('hover_node.jstree', function(e,data){
							console.log(data);
							info = jQuery('#jstree_demo').jstree(true).get_node(data.node.id).data.words
//							info = jQuery('#jstree_demo').jstree(true).get_node("data.node.id").data
							jQuery("#"+data.node.id).prop('title', info);
						});
						
						</script>

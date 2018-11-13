<?php 
error_reporting(E_ERROR);
// global variables
require_once('../settings.php');
?>
<!-- dev version with crossfilter and dc.js libraries to visualize data -->
		<script type="text/javascript" charset="utf-8" src="../lib/js/d3.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../lib/js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../lib/js/dc.min.js"></script>
<!-- from settings.php -->
		<script type="text/javascript" charset="utf-8">
		solr_host = <?php echo "'" . $GLOBALS['search_engine']['host'] . "';"; ?>
		collections = <?php echo json_encode($GLOBALS['search_engine']['collection']) . ";"; ?>
		external_apps = <?php echo json_encode($GLOBALS['external_app']) . ";"; ?>
		lang='fr';
		</script>

		<script type="text/javascript" charset="utf-8" src="js/table.neologismes_srv_demo.js"></script>
		 <link href='../lib/css/dc.css' rel='stylesheet' type='text/css'>

    	<div class="page-title">
        	<span class="title">Néologismes récents dans Néoveille</span>
		</div>
		<!-- table pane with results-->
        <div class="description">
        	<!-- filter for languages -->
           <h5>Choisissez une langue : 
			<select name="chooselang" id="chooselang" class="chooselang"  style="width:150px;">
			<?php 
			// echo language select box from $GLOBALS['language']
			ksort($GLOBALS['language']);
			foreach ($GLOBALS['language'] as $lang => $lang_iso) {
				echo '<option value="' . $lang_iso . '" ';
				if ($lang_iso=='fr'){echo 'selected';}
				echo '>' . $lang . '</option>';
			}
			?>			
    		</select>
		  </h5>
		  
		  
            <!-- table results -->
<!--		  <h5>
			<table width="99%">
				<tr><td colspan="5"><h5>Filtres</h5></td></tr>
				<tr><td id="example_neo"></td><td id="example_type"></td><td id="example_auto"></td><td id="example_freq"></td><td id="example_date"></td></tr>
				<tr><td colspan="5"></td></tr>
			</table>
		  </h5>-->
            <div class="row">
            	<div class="col-xs-12">
                	<div class="card">
                    	<div class="card-body">
                            <table class="datatable table" cellspacing="0" id="example">
								<thead>
									<tr>
										<th>Néologisme</th>
										<th>Type</th>
										<th>Commentaire</th>
										<th>Fréquence</th>
										<th>Date</th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
									<tr>
										<th>Néologisme</th>
										<th>Type</th>
										<th>Commentaire</th>
										<th>Fréquence</th>
										<th>Date</th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Néologisme</th>
										<th>Type</th>
										<th>Commentaire</th>
										<th>Fréquence</th>
										<th>Date</th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
								</tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- statistics pane for neologism details-->
            <div class="row row-example" id="corpusResults" style="display:none;">
                                        <!-- country rowschart-->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                	<a data-toggle="collapse" data-target="#togglecountry">
                                                		Répartition par pays
                                                	</a>
                                                	<div>														
                                                		<div id='moreitems' style="position:absolute !important;right:0;top:0;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
														<div id='lessitems' style="position:absolute !important;left:97%;"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></div>
													</div>
												</div>
                                                <div class="panel-body collapse in"  id="togglecountry">
		                                            <div id="dc-neo-chart">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- timeline -->
                                        <div class="col-sm-8">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#toggletime">
                                                Evolution temporelle
                                                </a>
                                                </div>
                                                	<div id="toggletime" class="panel-body collapse in">
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
                                        
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                	<a data-toggle="collapse" data-target="#toggledomain">
                                                		Répartition par domaine
                                                	</a>
                                                </div>
                                                <div id="toggledomain" class="panel-body collapse in">
		                                            <div id="dc-subject-chart">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>		                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- journaux rowschart-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                	<a data-toggle="collapse" data-target="#togglenewspaper">
                                                		Répartition par journaux (10 plus importants)
                                                	</a>
                                                </div>
                                                <div id="togglenewspaper" class="panel-body collapse in">
		                                            <div id="dc-newspaper-chart">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- datatables -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                	<a data-toggle="collapse" data-target="#toggledata">
                                                		Données
                                                	</a>
                                                </div>
                                                <div id="toggledata" class="panel-body collapse in">
                                                	<div class='dc-data-count2'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chart'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Pays</th>
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Extraits</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>

		  </div>

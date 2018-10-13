<!-- dev version with crossfilter and dc.js libraries to visualize data -->
		<script type="text/javascript" charset="utf-8" src="../js/d3.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>
		 <link href='../css/dc.css' rel='stylesheet' type='text/css'>

<script type="text/javascript" charset="utf-8" src="js/table.neo-db-dev-demo.js"></script>
<style>
[id^="dc-"]g.row text {fill: black;}

/*
div.DTE_Body div.DTE_Body_Content div.DTE_Field {
    float: left;
    width: 50%;
    padding: 5px 20px;
    clear: none;
    box-sizing: border-box;
}
 
div.DTE_Body div.DTE_Form_Content:after {
    content: ' ';
    display: block;
    clear: both;
}*/


 .axis {
   font: 10px sans-serif;
 }

 .axis path,
 .axis line {
   fill: none;
   stroke: #000;
   shape-rendering: crispEdges;
 }

.bar:hover {
  fill: lightblue ;
}

[id*=dc-country-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}
[id*=dc-neo-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}

[id*=dc-time-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}

[id*=dc-neoocc-chart] g.row text {
      fill: black;
}

[id*=dc-newspaper-chart] g.row text {
      fill: black;
}

/* timeline test */
[id*=dc-time-chart] { width: 100%; }

 </style>

<div class="side-body">
<div class="page-title">
                <span class="title">Synthèse sur les néologismes validés</span>
                </div>				
<!-- accordion to access statistics by language -->
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <!-- Français -->  
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Français
        </a>
      </h4>
    </div>
    <div id="collapseFour" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
         Ce panneau vous permet d'accéder à une synthèse (générée chaque nuit) sur les néologismes validés, pour le français, depuis 2015, en accédant à l'ensemble des occurrences des néologismes et aux informations diastratiques et diatopiques. Cliquez sur le bouton "Charger les données" (et patientez un peu...) puis naviguez dans les différents graphes de manière interactive, en sélectionnant les élements qui vous intéressent. Il est également possible d'accéder aux contextes pour chaque néologisme, en cliquant sur la ligne le contenant. Pour accéder à toutes les fonctionnalités de la plateforme, merci d'adresser un email à admin@neoveille.org. Attention : interface encore en développement...
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="neoinfoBtnFr">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="neoResultsFr" style="display:none;">
                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#toggletimefr">
                                                Evolution temporelle
                                                </a>
                                                </div>
                                                <div class="panel-body">
                                                	  <div class='dc-data-countFr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                              <div id="dc-time-chartFr">
		                                            </div>
		                                              <div id="dc-rangetime-chartFr">
		                                        </div>

                                            </div>
                                            </div>
                                        </div>

                                        <!-- neologismes chart-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#toggleneofr">
                                                Répartition par néologismes (15 plus importants)
                                                </a>
                                                </div>
                                                <div id="toggleneofr" class="panel-body collapse in">
		                                            <div id="dc-neoocc-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' id="resetNeoocc" style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
				
                                        <!-- journaux rowschart-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglenewsfr">
                                                Répartition par journaux (15 plus importants)
                                                </a>
                                                </div>
                                                <div id="togglenewsfr" class="panel-body collapse in">
		                                            <div id="dc-newspaper-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' id="resetNewspaper" style='visibility: hidden;'>Réinitialiser</a></b> <!--href="javascript:newspaperChart.filterAll();dc.redrawAll();" -->                                     
		                                            </div>
                                                </div>
                                            </div>
                                        </div>

                                                        <!-- neologismes types rowschart-->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary" id="neopanel">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#toggleneotypefr">
                                                	Répartition par types de néologismes
                                                </a>
                        						<!--	<button type="button" class="close" data-target="#neopanel" data-dismiss="alert">
                        							<span aria-hidden="true">&times;</span>
                        							<span class="sr-only">Close</span>
                        							</button>-->


                                                	<div>														
                                                		<div id='moreitems' style="position:absolute !important;right:0;top:0;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
														<div id='lessitems' style="position:absolute !important;left:97%;"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></div>
													</div>
												</div>
                                                <div  id="toggleneotypefr" class="panel-body collapse in">
		                                            <div id="dc-neo-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' id="resetNeo" style='visibility: hidden;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                        
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#toggledomfr">
                                                Répartition par catégorie (Néoveille)
                                                </a>
                                                </div>
                                                <div id="toggledomfr" class="panel-body collapse in">
		                                            <div id="dc-subject-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' id="resetSubject" style='visibility: hidden;'>Réinitialiser</a></b>		                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        

                                        <!-- country rowschart-->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary" id="cntpanel">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglecntfr">
                                                	Répartition par pays
                                                </a>
                        						<!--	<button type="button" class="close" data-target="#cntpanel" data-dismiss="alert">
                        							<span aria-hidden="true">&times;</span>
                        							<span class="sr-only">Close</span>
                        							</button>-->
												</div>
                                                <div id="togglecntfr" class="panel-body collapse in">
		                                            <div id="dc-country-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' id="resetCountry" style='visibility: hidden;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- datatables -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Données</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-count2Fr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> néologismes.
													</div>
                                                <table class='table table-hover' id='dc-table-chartFr' style="width:95%;important!">
                                                	<thead>
                                                	<tr class='header'>
                                                		<!--<th>Néologismes</th>
                                                		<th>Matrice</th>
                                                		<th>Pays</th>
                                                		<th>Thématique 1</th>
                                                		<th>Thématique 2</th>
                                                		<th>Catégorie (journaux)</th>
                                                		<th>Date</th>
                                                		<th>Détails</th>-->
                                                		<th>Néologismes</th>
                                                		<th>Total</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
      </div>
    </div>
</div>
</div>
</div>
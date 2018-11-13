<!-- dev version with crossfilter and dc.js libraries to visualize data -->
		<script type="text/javascript" charset="utf-8" src="../js/d3.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>
		<!--<script type="text/javascript" charset="utf-8" src="../js/queue.js"></script>-->
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

 </style>
    <div class="side-body" id="neosemview">
	<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
    		<li role="neosem" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Profils combinatoires</a></li>
    		<li role="patterncat"><a href="#patterncat" aria-controls="patterncat" role="tab" data-toggle="tab">Catégorie de patrons</a></li>
    		<li role="help"><a href="#helpc" aria-controls="helpc" role="tab" data-toggle="tab">Aide</a></li>
  		</ul>
	<!-- tab panes -->
		<div class="tab-content">
			<!-- main pane for evolution semantique -->
			<div role="tabpanel" class="tab-pane fade in active" id="home">
            	<div class="page-title">
                	<span class="title">Evolution fréquencielle des lexies</span>
                	<div class="alert alert-info alert-dismissible" role="alert" id="neosem-info">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                	<div class="description">
                         Cette interface vous permet de visualiser, sur un corpus diachronique de référence du français (Le Monde 1987-1988 et 2005-2006), l'évolution sémantique des lexies sous trois angles :
                         <ul>
							  <li>Les changements de fréquence</li>
							  <li>Les changements du profil combinatoire</li>
							  <li>les changements sémantiques proprement dits, saisis par l'identification des lexies partagent le plus de contexte avec la lexie à étudier</li>
						</ul>
						Dans l'échantillon présenté ci-dessous sont intégrés les lexies qui ont subi un changement de fréquence significatif d'une période à l'autre. En cliquant sur le premier bouton à droite, vous pourrez visualiser le courbe de fréquence, étendue à la période 1950-2008, obtenue par Google Ngram. En chiquant sur le second bouton, vous pourrez accéder au profil combinatoire de la lexie et à son évolution. En cliquant sur Le troisième bouton, vous accéderez au profil sémantique.
						<br/>Pour plus d'informations, lire <a href="" target="new">Emmanuel Cartier (2017) : Quantifier le changement sémantique</a>  
					</div>
					</div>
            	</div>
	            <div class="row">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-body">
          <!-- choix type changement fréquenciel -->
           <h5>Choisissez le type de changement fréquenciel : 
			<select name="changefreq" id="changefreq" class="changefreq">
      			<option value="1" selected="selected">Les lexies apparues entre 1987-1988 et 2005-2006</option>
      			<option value="2">Les lexies ayant un fort accroissement de fréquence entre 1987-1988 et 2005-2006</option>
      			<option value="3">Les lexies disparues entre 1987-1988 et 2005-2006</option>
      			<option value="4">Les lexies ayant une forte baisse de croissance entre 1987-1988 et 2005-2006</option>
      			<!--<option value="5">Toutes les lexies des deux corpus</option>-->
    		</select>
		  </h5>

			<div id="infosem">
				<table width="99%"><tr><td colspan="5"><h5>Filtres</h5></td></tr>
					<tr>
					<td id="example_word"></td>
					<td id="example_pos"></td>
					<td id="example_annot"></td>
					<td id="example_freq1"></td>
					<td id="example_freq2"></td>
					<!--<td id="example_freq3"></td>
					<td id="example_freq4"></td>-->
					<td id="example_diff"></td>
					</tr>
					<tr><td colspan="5"></td></tr>
				</table>  
            </div>
                          
           <table class="datatable table table-striped" cellspacing="0" id="neo-candsem-table">
				<thead>
					<tr>
						<th>Lexie</th>
						<th>Partie du discours</th>
						<th>Annotations</th>
						<th>Fréquence (1987-1988)</th>
						<th>Fréquence (2005-2006)</th>
						<!--<th>Fréquence 2 (1987-1988)</th>
						<th>Fréquence 2 (2005-2006)</th>-->
						<th>Evolution</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th>Lexie</th>
						<th>Partie du discours</th>
						<th>Annotations</th>
						<th>Fréquence relative (1987-1988)</th>
						<th>Fréquence relative (2005-2006)</th>
						<!--<th>Fréquence relative / Partie du discours (1987-1988)</th>
						<th>Fréquence relative / Partie du discours (2005-2006)</th>-->
						<th>Evolution</th>
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
            <div role="tabpanel" class="tab-pane fade" id="helpc">To be done...</div>
        </div>
    </div>
    <!-- statistical details -->
    <div class="row row-example" id="neosemfreqResultsfr" style="display:none;">
                                        <!-- neologismes rowschart-->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary" id="neopanel">
                                                <div class="panel-heading">
                                                	Répartition par pays
                        							<button type="button" class="close" data-target="#neopanel" data-dismiss="alert">
                        							<span aria-hidden="true">&times;</span>
                        							<span class="sr-only">Close</span>
                        							</button>
                                                	<div>														
                                                		<div id='moreitems' style="position:absolute !important;right:0;top:0;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
														<div id='lessitems' style="position:absolute !important;left:97%;"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></div>
													</div>
												</div>
                                                <div class="panel-body">
		                                            <div id="dc-neo-chartfr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- timeline -->
                                        <div class="col-sm-8">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countfr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartfr">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartfr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>		                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- journaux rowschart-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par journaux (10 plus importants)</div>
                                                <div class="panel-body">
		                                            <div id="dc-newspaper-chartfr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- datatables -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Données</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-count2fr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> néologismes.
													</div>
                                                <table class='table table-hover' id='dc-table-chartfr'>
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

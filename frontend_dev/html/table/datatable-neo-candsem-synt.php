		<script type="text/javascript" charset="utf-8" src="../js/d3.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>
		<link href='../css/dc.css' rel='stylesheet' type='text/css'>
		

<style>
#dc-pospat-chartFr g.row text {fill: black;}
#dc-lexpospat-chartFr g.row text {fill: black;}
/*
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


 </style>
    <div class="side-body" id="neosemview">
	<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
    		<li role="neosem" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Profils combinatoires</a></li>
    		<li role="patterncat"><a href="#patterncat" aria-controls="patterncat" role="tab" data-toggle="tab">Synthèse profils combinatoires</a></li>
    		<li role="help"><a href="#helpc" aria-controls="helpc" role="tab" data-toggle="tab">Aide</a></li>
  		</ul>
	<!-- tab panes -->
		<div class="tab-content">
			<!-- main pane for evolution semantique -->
			<div role="tabpanel" class="tab-pane fade in active" id="home">
            	<div class="page-title">
                	<span class="title">Evolution des lexies : profils combinatoires</span>
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
			<select name="changefreq" id="changefreqbk" class="changefreqbk">
      			<option value="1" selected="selected">Les lexies apparues entre 1987-1988 et 2005-2006</option>
      			<option value="2">Les lexies ayant un fort accroissement de fréquence entre 1987-1988 et 2005-2006</option>
      			<option value="3">Les lexies disparues entre 1987-1988 et 2005-2006</option>
      			<option value="4">Les lexies ayant une forte baisse de croissance entre 1987-1988 et 2005-2006</option>
      			<option value="5">Toutes les lexies des deux corpus</option>
    		</select>
		  </h5>

<!--			<div id="infopat">-->
			<div>
				<table width="99%"><tr><td colspan="9"><h5>Filtres</h5></td></tr>
					<tr>
					<td id="example_wordpos"></td>
					<td id="example_comment"></td>
					<td id="example_totcorpus1"></td>
					<td id="example_totcorpus2"></td>
					<td id="example_lexpos1"></td>
					<td id="example_lexpos2"></td>
					<td id="example_pos1"></td>
					<td id="example_pos2"></td>
					<td id="example_simpos"></td>
					</tr>
					<tr><td colspan="9"></td></tr>
				</table>  
            </div>
                          
           <table class="datatable table table-striped" cellspacing="0" id="neo-candsempat-table">
				<thead>
					<tr>
						<th>Lexie</th>
						<th>Commentaire</th>
						<th>Total corpus 1</th>
						<th>Total corpus 2</th>
						<th>Patrons lexpos corpus 1</th>
						<th>Patrons lexpos corpus 2</th>
						<th>Patrons pos corpus 1</th>
						<th>Patrons pos corpus 2</th>
						<th>Similarité POS</th>
						<th></th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th>Lexie</th>
						<th>Commentaire</th>
						<th>Total corpus 1</th>
						<th>Total corpus 2</th>
						<th>Patrons lexpos corpus 1</th>
						<th>Patrons lexpos corpus 2</th>
						<th>Patrons pos corpus 1</th>
						<th>Patrons pos corpus 2</th>
						<th>Similarité POS</th>
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
				<!-- accordion to access statistics by language -->
				<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <!-- Brésil -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Brésilien
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le brésilien. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="corpusinfoBtnBr">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results generated -->
      </div>
    </div>
  </div>
	<!-- Chinois -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Chinois
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les néologismes, pour le français. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="neoinfoBtnCh">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
      </div>
 
    </div>
  </div>
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
                               		Ce panneau vous permet d'accéder aux statistiques sur l'évolution des profils combinatoires, pour le français. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="neopatinfoBtnFr">Charger les données</a>
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
                                                Similarité des patrons POS (de 0 à 1)
                                                </a>
                                                </div>
                                                	<div id="toggletimefr" class="panel-body collapse in">
                                                	<div class='dc-data-countFr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> lexies.
													</div>
		                                            <div id="dc-time-chartFr">
          												<span class='reset' style='display: none;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='display: none;'>Réinitialiser</a>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
				
                                        <!-- corpus 1 totals-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary" id="neopanel">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#toggleneotypefr">
                                                	Fréquence occurrences Corpus 1 
                                                </a>
												</div>
                                                <div  id="toggleneotypefr" class="panel-body collapse in">
		                                            <div id="dc-neo-chartFr">
          												<b><span class='reset' style='display: none;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='display: none;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- corpus 2 totals-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary" id="cntpanel">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglecntfr">
                                                	Fréquence occurrences Corpus 2
                                                </a>
                        						<!--	<button type="button" class="close" data-target="#cntpanel" data-dismiss="alert">
                        							<span aria-hidden="true">&times;</span>
                        							<span class="sr-only">Close</span>
                        							</button>-->
												</div>
                                                <div id="togglecntfr" class="panel-body collapse in">
		                                            <div id="dc-country-chartFr">
          												<b><span class='reset' style='display: none;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='display: none;'>Réinitialiser</a></b>
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
 														 sur <span class='total-count'></span> lexies.
													</div>
                                                <table class='table table-hover' id='dc-table-chartFr' style="width:95%;important!">
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Lexie</th>
                                                		<th>Similarité</th>
                                                		<th>Total C1</th>
                                                		<th>Total C2</th>
                                                		<th>Patrons POS C1</th>
                                                		<th>Patrons POS C2</th>
                                                		<th>Patrons LEXPOS C1</th>
                                                		<th>Patrons LEXPOS C1</th>
                                                		<th></th>
                                                		<th></th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>
		  		</div>
      </div>
    </div>
  </div> 
  <!-- Grec -->   
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="HeadingFive">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Grec
        </a>
      </h4>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingFive">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le brésilien. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="corpusinfoBtnGr">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
      </div>
    </div>
  </div>  
  <!-- Italien -->   
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="HeadingTen">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
          Italien
        </a>
      </h4>
    </div>
    <div id="collapseTen" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingFive">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le brésilien. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="corpusinfoBtnIt">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
      </div>
    </div>
  </div>  
  <!-- Polonais -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="<HeadingSix">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          Polonais
        </a>
      </h4>
    </div>
    <div id="collapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="<HeadingSix">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le brésilien. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="corpusinfoBtnPl">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
      </div>
    </div>
  </div>  
  <!-- Russe -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="HeadingEight">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
          Russe
        </a>
      </h4>
    </div>
    <div id="collapseEight" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingEight">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les néologismes, pour le français. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="neoinfoBtnRu">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
      </div>
    </div>
  </div>  
  <!-- Tchèque -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="<HeadingNine">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
          Tchèque
        </a>
      </h4>
    </div>
    <div id="collapseNine" class="panel-collapse collapse" role="tabpanel" aria-labelledby="<HeadingNine">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le brésilien. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a href="#" class="btn btn-info" id="corpusinfoBtnCz">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
      </div>
    </div>
  </div>  
</div>
			</div>

            <!-- help pane -->
            <div role="tabpanel" class="tab-pane fade" id="helpc">To be done...</div>
        </div>
    </div>
    
    <!-- statistical pattern details -->	
	<div class="row row-example" id="patResultsFr" style="display:none;">
										<!-- total counts -->
										<div class="col-sm-12">
	                                                	<div class='dc-datapat-countFr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> patrons.
													</div>
	</div>
                                        <!-- period -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglepattimefr">
                                                Répartition par période
                                                </a>
                                                </div>
                                                	<div id="togglepattimefr" class="panel-body collapse in">
		                                            <div id="dc-pattime-chartFr">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>			
                                        <!-- level of patterns-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary" id="neopanel">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglepatlevelfr">
                                                	Répartition par longueur des patrons
                                                </a>
												</div>
                                                <div  id="togglepatlevelfr" class="panel-body collapse in">
		                                            <div id="dc-patlevel-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- pospatterns-->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglepospatfr">
                                                Répartition par patrons POS
                                                </a>
                                                </div>
                                                <div id="togglepospatfr" class="panel-body collapse in">
		                                            <div id="dc-pospat-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>                                      
                                        <!-- lexpospatterns -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">
                                                <a data-toggle="collapse" data-target="#togglelexposfr">
                                                Répartition par patrons LEXPOS
                                                </a>
                                                </div>
                                                <div id="togglelexposfr" class="panel-body collapse in">
		                                            <div id="dc-lexpospat-chartFr">
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
                                                	<div class='dc-datapat-count2Fr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> patrons.
													</div>
                                                <table class='table table-hover' id='dc-tablepat-chartFr' style="width:98%;important!">
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>left4p</th>
                                                		<th>left4w</th>
                                                		<th>left3p</th>
                                                		<th>left3w</th>
                                                		<th>left2p</th>
                                                		<th>left2w</th>
                                                		<th>left1p</th>
                                                		<th>left1w</th>
                                                		<th>pos</th>
                                                		<th>word</th>
                                                		<th>right1p</th>
                                                		<th>right1w</th>
                                                		<th>right2p</th>
                                                		<th>right2w</th>
                                                		<th>right3p</th>
                                                		<th>right3w</th>
                                                		<th>right4p</th>
                                                		<th>freq</th>
                                                		<th>level</th>
                                                		<th>period</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>
	</div>	
	
<!-- javascript libraries -->
<!-- dev version with crossfilter and dc.js libraries to visualize data -->
<!--
		<script type="text/javascript" charset="utf-8" src="https://cdnjs.cloudflare.com/ajax/libs/crossfilter2/1.4.0/crossfilter.min.js"></script>		
		<script type="text/javascript" charset="utf-8" src="http://cdnjs.cloudflare.com/ajax/libs/dc/2.0.0/dc.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.js"></script>
-->
		<script type="text/javascript" charset="utf-8" src="../js/d3.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>

		<script type="text/javascript" charset="utf-8" src="js/table.neosem-synt.js"></script>
  		

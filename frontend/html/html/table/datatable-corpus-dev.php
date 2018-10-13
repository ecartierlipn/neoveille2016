<?php
session_start();
?>
<!-- dev version with crossfilter and dc.js libraries to visualize data -->
		<script type="text/javascript" charset="utf-8" src="../js/d3.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>
		<!--<script type="text/javascript" charset="utf-8" src="../js/queue.js"></script>-->
		<?php
		if ($_SESSION["user_rights"]=="1" or $_SESSION["user_rights"]=="2"){
		  echo '<script type="text/javascript" charset="utf-8" src="js/table.RSS_INFO-dev.js"></script>';
		}
		else{
		  echo '<script type="text/javascript" charset="utf-8" src="js/table.RSS_INFO_noteditable.js"></script>';
		}
		?>
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
/*.bar {
  fill: orange;
}*/

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
[id*=dc-newspaper-chart] g.row text {
      fill: black;
    }
    
/* timeline test */
#chart,#range-chartFr,#range-chartBr,#range-chartCh,#range-chartGr,
#range-chartIt,#range-chartPl,#range-chartRu,#range-chartCz,#range-chartDe,#range-chartNl,
#dc-time-chartFr,#dc-time-chartBr,#dc-time-chartCh
,#dc-time-chartGr,#dc-time-chartIt,#dc-time-chartPl,#dc-time-chartRu
,#dc-time-chartCz,#dc-time-chartNl,#dc-time-chartDe { width: 100%; }

 </style>
<div class="side-body" id="corpusview">
	<!-- Nav tabs -->
		<ul class="nav nav-tabs" role="tablist">
    		<li role="gestionnaire" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Gestionnaire</a></li>
    		<li role="presentation"><a href="#stats" aria-controls="stats" role="tab" data-toggle="tab">Statistiques</a></li>
    		<li role="presentation"><a href="#helpc" aria-controls="helpc" role="tab" data-toggle="tab">Aide</a></li>
  		</ul>
	<!-- tab panes -->
	<div class="tab-content">
			<!-- main pane for gestionnaire -->
			<div role="tabpanel" class="tab-pane fade in active" id="home">
            	<div class="page-title">
                	<span class="title">Gestionnaire de corpus</span>
                	<div class="description">
                        Cette interface vous permet de consulter et d'éditer la liste des sources d'informations utilisées dans Neoveille. 
	Vous pouvez trier et filter les entrées, ainsi qu'obtenir des informations et analyses sur les articles et néologismes récupérés pour chaque fil RSS. 
	Vous pouvez également trouver automatiquement les fils RSS à partir du lien vers le site web visé (expérimental). 
	<a href='javascript:togglevisible("helperform",$("#helperform").css("display"));'>Afficher/Masquer l'outil</a>
	<div id="helperform" style="display:none;">
		<form onsubmit="find_rss(this.url.value);">
			<label for="url">Url</label>
			<input size="100px" width="100px" type="text" placeholder="eg. http://www.lemonde.fr" id="url" />
			<input type="submit" value="Chercher les fils RSS">
			<input type="button" value="Effacer les résultats" onclick='$("#resultsRSS").empty();$("#resultsRSS").toggle();'>
		</form>
	<div id="resultsRSS"></div>	
		</div>
						</div>
            	</div>
            	<!-- alert -->
            	<!--<div>
                	<div class="alert alert-warning alert-dismissible" role="alert">
                           <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                           <strong> Attention! </strong>Cette interface permet de créer une nouvelle source d'information. Si le journal, le pays, la 
                           langue (et les autres paramètres) ne sont pas préalablement définis, vous devez le faire <strong>avant</strong> de saisir votre nouvelle source d'information.  
                	</div>

            	</div>-->

<?php
if ($_SESSION["user_rights"]==0){
	echo '<div>
                	<div class="alert alert-warning alert-dismissible" role="alert">
                           <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                           <strong> Attention! </strong>Vous êtes connecté en tant qu\'invité. Les fonctionnalités d\'édition sont désactivées.  
                	</div>

            	</div>';
}
else{	
	echo '<div>
                	<div class="alert alert-warning alert-dismissible" role="alert">
                           <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                           <strong> Attention! </strong>Cette interface permet de créer une nouvelle source d\'information. Si le journal, le pays, la 
                           langue (et les autres paramètres) ne sont pas préalablement définis, vous devez le faire <strong>avant</strong> de saisir votre nouvelle source d\'information.  
                	</div>

            	</div>';
}
?>

				<div id="info"><!-- see js file for activating filters -->
				<table><tr><td colspan="8"><h5>Filtres</h5></td></tr>
					<tr><td id="filter_url"></td><td id="filter_pays"></td><td id="filter_langue"></td><td id="filter_journal"></td>
					<td id="filter_type"></td><td id="filter_localite"></td><td id="filter_format"></td><td id="filter_encoding"></td></tr>
					<tr><td colspan="8"></td></tr>
				</table>  
            </div>                  
	            <div class="row">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-body">
                                    <table class="datatable table" cellspacing="0" id="RSS_INFO">
				<thead>
					<tr>
						<th>Adresse du fil</th>
						<th>Pays</th>
						<th>Langue</th>
						<th>Journal</th>
						<th>Domaine</th>
						<th>Fréquence</th>
						<th>National / R&eacute;gional</th>
						<th>Type ressource</th>
						<th>Encodage</th>
						<th>&nbsp;</th>
						<?php if ($_SESSION["user_rights"]<>0){echo '<th>&nbsp;</th>';} ?>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<th>Adresse du fil</th>
						<th>Pays</th>
						<th>Langue</th>
						<th>Journal</th>
						<th>Domaine</th>
						<th>Fréquence</th>
						<th>National / R&eacute;gional</th>
						<th>Type ressource</th>
						<th>Encodage</th>
						<th>&nbsp;</th>
						<?php if ($_SESSION["user_rights"]<>0){echo '<th>&nbsp;</th>';} ?>
					</tr>
				</tfoot>				
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <!-- statistics pane -->
            <div role="tabpanel" class="tab-pane fade" id="stats">		  		
<!-- accordion to access statistics by language -->
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="alert alert-info alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    Dans cet onglet, vous pouvez obtenir une synthèse sur la récupération de corpus pour toutes les langues ou par langue. Sélectionnez un onglet, puis cliquez sur "charger les données". Les graphes sont interactifs.   
  </div>
  <!-- toutes langues -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Toutes langues
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-1">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, toutes langues confondues. Cliquez sur le bouton "Charger les données" (patientez un peu...).
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtn2">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results for all-->
				<div class="row row-example" id="corpusResultsAll" style="display:none;">
		  		</div>
      </div>
    </div>
  </div>
  <!-- Allemand -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingDe">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseDe" aria-expanded="false" aria-controls="collapseDe">
          Allemand</a>
      </h4>
    </div>
    <div id="collapseDe" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingDe">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour l'allemand. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnDe">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsDe" style="display:none;">

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countDe'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartDe">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartDe"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartDe">
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
		                                            <div id="dc-newspaper-chartDe">
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
                                                	<div class='dc-data-count2De'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartDe'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
      </div>
    </div>
  </div>
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
                                 <a  class="btn btn-info" id="corpusinfoBtnBr">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsBr" style="display:none;">

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countBr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartBr">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartBr"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartBr">
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
		                                            <div id="dc-newspaper-chartBr">
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
                                                	<div class='dc-data-count2Br'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartBr'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
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
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le chinois. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnCh">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsCh" style="display:none;">

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countCh'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartCh">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartCh"></div>
		                
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartCh">
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
		                                            <div id="dc-newspaper-chartCh">
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
                                                	<div class='dc-data-count2Ch'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartCh'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
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
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le français. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnFr">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsFr" style="display:none;">
                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countFr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartFr">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartFr"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- timeline test -->
                                       <!-- <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle (test)</div>
                                                <div class="panel-body">
                                        			<div id="chart"></div>
    												<div id="range-chart"></div>
    											</div>
    										</div>
                                        </div> -->
                                        <!-- country rowschart-->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary" id="cntpanel">
                                                <div class="panel-heading">
                                                	Pays
                        							<button type="button" class="close" data-target="#cntpanel" data-dismiss="alert">
                        							<span aria-hidden="true">&times;</span>
                        							<span class="sr-only">Close</span>
                        							</button>


                                                	<div>														
                                                		<div id='moreitems' style="position:absolute !important;right:0;top:0;"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
														<div id='lessitems' style="position:absolute !important;left:97%;"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></div>
													</div>
												</div>
                                                <div class="panel-body">
		                                            <div id="dc-country-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>
		                                            </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartFr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>		                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- journaux rowschart-->
                                        <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par journaux (15 plus importants)</div>
                                                <div class="panel-body">
		                                            <div id="dc-newspaper-chartFr">
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
                                                	<div class='dc-data-count2Fr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartFr'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Pays</th>
                                                		<th>Thématique</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Nbre Articles</th>
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
    <div class="panel-heading" role="tab" id="<HeadingFive">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Grec
        </a>
      </h4>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="<HeadingFive">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le grec. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnGr">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsGr" style="display:none;">
                                        <!-- neologismes rowschart-->
                                  <!--      <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Néologismes</div>
                                                <div class="panel-body">
		                                            <div id="dc-neo-chartGr">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>-->

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countGr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartGr">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartGr"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartGr">
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
		                                            <div id="dc-newspaper-chartGr">
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
                                                	<div class='dc-data-count2Gr'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartGr'>
                                                	<thead>
                                                	<tr class='header'>
                                                <!--		<th>Néologismes</th>-->
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
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
    <div id="collapseTen" class="panel-collapse collapse" role="tabpanel" aria-labelledby="HeadingTen">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour l'italien. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnIt">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsIt" style="display:none;">
                                        <!-- neologismes rowschart-->
                               <!--         <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Néologismes</div>
                                                <div class="panel-body">
		                                            <div id="dc-neo-chartIt">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>-->

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countIt'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartIt">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartIt"></div>
		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartIt">
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
		                                            <div id="dc-newspaper-chartIt">
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
                                                	<div class='dc-data-count2It'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartIt'>
                                                	<thead>
                                                	<tr class='header'>
                                                <!--		<th>Néologismes</th>-->
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
      </div>
    </div>
  </div>  
  <!-- Néerlandais -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingNl">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseNl" aria-expanded="false" aria-controls="collapseNl">
          Néerlandais
        </a>
      </h4>
    </div>
    <div id="collapseNl" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingNl">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour l'allemand. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnNl">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsNl" style="display:none;">

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countNl'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartNl">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartNl"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartNl">
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
		                                            <div id="dc-newspaper-chartNl">
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
                                                	<div class='dc-data-count2Nl'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartNl'>
                                                	<thead>
                                                	<tr class='header'>
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
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
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le polonais. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnPl">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsPl" style="display:none;">
                                        <!-- neologismes rowschart-->
                               <!--         <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Néologismes</div>
                                                <div class="panel-body">
		                                            <div id="dc-neo-chartPl">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>-->

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countPl'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartPl">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartPl"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartPl">
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
		                                            <div id="dc-newspaper-chartPl">
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
                                                	<div class='dc-data-count2Pl'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartPl'>
                                                	<thead>
                                                	<tr class='header'>
                                             <!--   		<th>Néologismes</th>-->
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
      </div>
    </div>
  </div>  
  <!-- Russe -->
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="<HeadingEight">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
          Russe
        </a>
      </h4>
    </div>
    <div id="collapseEight" class="panel-collapse collapse" role="tabpanel" aria-labelledby="<HeadingEight">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le russe. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnRu">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsRu" style="display:none;">
                                        <!-- neologismes rowschart-->
                              <!--          <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Néologismes</div>
                                                <div class="panel-body">
		                                            <div id="dc-neo-chartRu">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>-->

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countRu'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartRu">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartRu"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartRu">
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
		                                            <div id="dc-newspaper-chartRu">
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
                                                	<div class='dc-data-count2Ru'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartRu'>
                                                	<thead>
                                                	<tr class='header'>
                                               <!-- 		<th>Néologismes</th>-->
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
                                                	</tr></thead>
                                                </table>
                                                </div>
                                            </div>
                                        </div>

		  		</div>
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
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus, pour le tchèque. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" id="corpusinfoBtnCz">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResultsCz" style="display:none;">
                                        <!-- neologismes rowschart-->
                               <!--         <div class="col-sm-4">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Néologismes</div>
                                                <div class="panel-body">
		                                            <div id="dc-neo-chartCz">
          												<b><span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a></b>                                            
		                                            </div>
                                                </div>
                                            </div>
                                        </div>-->

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-countCz'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chartCz">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chartCz"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chartCz">
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
		                                            <div id="dc-newspaper-chartCz">
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
                                                	<div class='dc-data-count2Cz'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chartCz'>
                                                	<thead>
                                                	<tr class='header'>
                                                <!--		<th>Néologismes</th>-->
                                                		<th>Domaine</th>
                                                		<th>Journal</th>
                                                		<th>Date</th>
                                                		<th>Article</th>
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
            <!-- help pane -->            
            <div role="tabpanel" class="tab-pane" id="helpc">
<div class="card">
    <div class="card-header">
        <div class="card-title">
            <div class="title">Présentation</div>
        </div>
    </div>
    <div class="card-body">
    	<p>Le gestionnaire de corpus vous permet de visualiser, d'analyser, d'ajouter et d'éditer les sources d'informations récupérées automatiquement. Actuellement, seuls les fils RSS sont récupérés, car ils présentent une structure de l'information formalisée et permettant d'éviter de récupérer (en général!) des textes "bruités".</p>
    	<p><b>Pour saisir une nouvelle source d'information</b>, vous devez :</p>
    	<ol>
    	<li>vous assurer que le nom du journal existe, et dans le cas négatif l'ajouter préalablement par la commande "Nouveau" dans l'interface Corpus/Nom des Journaux;</li>
    	<li>saisir toutes les informations nécessaires pour la nouvelle source d'information, via la commande "Nouveau", dans l'interface Corpus/Fils RSS/Sites web.</li>
    	</ol>
    	<p>Vous trouverez ci-dessous une explication sur les différents champs utilisés.
    	</p>
    	<table class="table">
      <thead>
        <tr><th>Champs d'information</th><th>Explication</th></tr>
      </thead>
      <tbody>
       <tr>
         <th scope="row">Nom du journal</th>
         <td>Indication sur le nom des journaux. Avant de saisir une nouvelle source, il est nécessaire de saisir le nom d'un nouveau journal.</td>
       </tr>
       <tr>
         <th scope="row">Domaine</th>
         <td>Indication permettant de catégoriser la source d'information de manière globale, au moyen d'une liste de domaines généraux. Cette liste mériterait approfondissement.</td>
       </tr>
       <tr>
         <th scope="row">Pays</th>
         <td>Pays dont est issu le journal et la source d'information. Cela permet de distinguer, pour une même langue, des sources d'informations de plusieurs pays et de comparer les usages spécifiques.</td>
       </tr>
       <tr>
         <th scope="row">Langues</th>
         <td>Indication sur la langue de la sources d'information. Il est nécessaire de s'assurer que la sources d'information diffuse bien dans la langue en question. Lorsque le site diffuse dans plusieurs langues, s'assurer de pointer sur la source dans la langue donnée. Certaines sites sont difficilement utilisables, car ils mélangent les langues.</td>
       </tr>
       <tr>
         <th scope="row">Registre</th>
         <td>Indication sur le registre de langue. Par défaut, registre général. Possibilité d'ajouter d'autres registres (par exemple : langue des jeunes, presse féminine, etc.)</td>
       </tr>
      </tbody>
    </table>
    <p>Pour plus d'information sur les fils RSS :<mark><a href="http://www.journaldunet.com/solutions/saas-logiciel/rss.shtml" target="corpus">Journal du Net</a></mark><br/>
</p>
    </div>            
</div>

<div class="card">
    <div class="card-header">
        <div class="card-title">
            <div class="title">Créer un flux RSS à partir d'un site qui n'en propose pas</div>
        </div>
    </div>
    <div class="card-body">
    	<p>Certains outils proposent de construire un fil RSS pour les sites qui n'en disposent pas. Cette opération se déroule de manière interactive. Pour plus d'informations :<br/>
    	<mark><a href="http://fr.faq.netvibes.com/knowledgebase/articles/393425-comment-suivre-un-site-qui-ne-fournit-pas-de-flux" target="corpus">Netvibes</a><br/></mark>
    	<mark><a href="https://www.promptcloud.com/blog/web-scraping-tool-kimono-labs-alternatives" target="corpus">Web Scraping tools</a><br/></mark>
    	</p>
    </div>            
</div>


<div class="card">
    <div class="card-header">
        <div class="card-title">
            <div class="title">Pistes pour constituer des sources d'information par langue</div>
        </div>
    </div>
    <div class="card-body">
    	<p>Il est parfois difficile de constituer des listes de sites web. Une recherche google, avec des mots clés adéquats, est une première piste. Vous trouverez ci-dessous des sites permettant de dégrossir ce travail.
    	</p>
    	<table class="table">
      <thead>
        <tr><th>Site web</th><th>Type de contenu</th></tr>
      </thead>
      <tbody>
       <tr>
         <th scope="row"><a href="http://www.onlinenewspapers.com" target="new">http://www.onlinenewspapers.com</a></th>
         <td>Site extrêmement complet organisé par pays, permettant d'obtenir l'url de base des journaux.</td>
       </tr>
       <tr>
         <th scope="row"><a href="https://en.wikipedia.org/wiki/Lists_of_newspapers" target="new">https://en.wikipedia.org/wiki/Lists_of_newspapers</a></th>
         <td>Page wikipedia en anglais consacrée aux journaux du monde, organisée par pays.</td>
       </tr>
       <tr>
         <th scope="row"><a href="http://www.w3newspapers.com" target="new">http://www.w3newspapers.com</a></th>
         <td>Liste extrêmement complète de journaux et magazines du monde. recherche par domaines ou par pays. Les langues des journaux sont indiquées au niveau le plus fin.</td>
       </tr>
       
       <tr>
         <th scope="row">Archives de presse</th>
         <td><a href="http://www.giga-presse.com/archive-presse.htm" target="archives">Liste d'archives de presse du français métropolitain.</a></td>
       </tr>
       <tr>
         <th scope="row">Autres</th>
         <td>Il est également possible de s'abonner à un lecteur de flux rss, pour retrouver les sources d'informations intéressantes. Par exemple : Feedly, Inoreader, FLipboard, RSSOwl, Digg Reader, Google Reader</td>
       </tr>
      </tbody>
    </table>
    </div>            
</div>

  </div>

</div>

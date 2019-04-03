<?php
session_start();
include('../settings.php'); // global variables
?>
<!-- dev version with crossfilter and dc.js libraries to visualize data -->
		<script type="text/javascript" charset="utf-8" src="../js/d3.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/dc.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../js/editor.select2.js"></script>
		
	<!--  global variables from settings.php to send them to following js script -->
		<script type="text/javascript" charset="utf-8">
		solr_host = <?php echo "'" . $GLOBALS['search_engine']['host'] . "';"; ?>
		collections = <?php echo json_encode($GLOBALS['search_engine']['collection']) . ";"; ?>
		external_apps = <?php echo json_encode($GLOBALS['external_app']) . ";"; ?>
		languages = <?php echo json_encode($GLOBALS['language']) . ";"; ?>
		corpus_synthesis = <?php echo json_encode($GLOBALS['corpus_synthesis']) . ";"; ?>
		
		//console.log(solr_host);
		//console.log(collections);
		console.log(corpus_synthesis);
		</script>
<!-- and the main javascript -->
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

[id*=dc-neo-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}
[id*=dc-neo-chart] g.row text {
      fill: black;
}
[id*=dc-newspaper-chart] g.row text {
      fill: black;
}
/* timeline test */
[id*=range-chart] { width: 100%; }
[id*=dc-time-chart] { width: 100%; }

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

				<div id="info"><!-- use of columnfilter.js file for activating filters -->
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
		  
<!-- repeat the panel for each language : dynamically generated from list of languages in settings.php -->
<?php 
	ksort($GLOBALS['language']);
	foreach ($GLOBALS['language'] as $lang => $lang_iso) { 
?>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="heading<?php echo $lang_iso; ?>">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse<?php echo $lang_iso; ?>" aria-expanded="false" aria-controls="collapse<?php echo $lang_iso; ?>">
          <?php echo $lang; ?>
        </a>
      </h4>
    </div>
    <div id="collapse<?php echo $lang_iso; ?>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading<?php echo $lang_iso; ?>">
      <div class="panel-body">

				<!-- heading -->
                <div class="row">
                            <div class="col-sm-12">
                               <div class="alert alert-info alert-dismissible" role="alert" id="corpusinfo-2">
                               <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                               		Ce panneau vous permet d'accéder aux statistiques sur les corpus. Cliquez sur le bouton "Charger les données" (, patientez un peu...) puis naviguez dans les différents graphes. Pour tout signalement de bug ou demande de fonctionnalité additionnelle, allez dans l'onglet "Aide" qui vous permettra de décrire la demande ou le bug. Pour une présentation plus complète, allez également dans l'onglet "Aide".
                               </div>
                               <div class="title">
                                 <a  class="btn btn-info" language="<?php echo $lang_iso; ?>" id="corpusinfoBtn<?php echo $lang_iso; ?>">Charger les données</a>
                               </div>
                			</div>
                </div>
                <!-- results -->
				<div class="row row-example" id="corpusResults<?php echo $lang_iso; ?>" style="display:none;">

                                        <!-- timeline -->
                                        <div class="col-sm-12">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Evolution temporelle</div>
                                                <div class="panel-body">
                                                	<div class='dc-data-count<?php echo $lang_iso; ?>'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
		                                            <div id="dc-time-chart<?php echo $lang_iso; ?>">
          												<span class='reset' style='visibility: hidden;'>Filtre(s): <span class='filter'></span></span> 
		               									<a class='reset' href='javascript:dc.filterAll();dc.redrawAll();' style='visibility: hidden;'>Réinitialiser</a>
		                                            </div>
		                                            <div id="range-chart<?php echo $lang_iso; ?>"></div>		                                            
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Domaine pie chart -->
                                        <div class="col-sm-6">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading">Répartition par domaine</div>
                                                <div class="panel-body">
		                                            <div id="dc-subject-chart<?php echo $lang_iso; ?>">
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
		                                            <div id="dc-newspaper-chart<?php echo $lang_iso; ?>">
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
                                                	<div class='dc-data-count2<?php echo $lang_iso; ?>'>
                                                		<span class='filter-count'></span>
 														 sur <span class='total-count'></span> articles.
													</div>
                                                <table class='table table-hover' id='dc-table-chart<?php echo $lang_iso; ?>'>
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
<?php } ?> <!-- end of foreach lang -->


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

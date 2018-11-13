<?php 
error_reporting(E_ALL);
require('index_header.php'); 
// global variables
require('settings.php'); 
?>



            <!-- Main Content neologismes candidates-->
            <div class="container-fluid" id="container-fluid">

	<div class="side-body">
    	<div class="page-title">
        	<span class="title">Gestionnaire des néologismes candidats
			</span>
		</div>
<!--		<div class="alert alert-warning alert-dismissible" role="alert">
        	<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	<strong>Attention!</strong> Dorénavant les néologismes typés comme tels et envoyés dans la base principale (bouton "sauvegarder les néologismes validés") n'apparaîtront plus ici, mais sont accessibles dans la base principale (Analyse/ suivi des néologismes - base générale), en filtrant les données par lexie ou par auteur.
        </div>
-->
        <div class="description">
				
<?php
#echo $_SESSION['user_rights'];
if ($_SESSION['user_rights'] == 2){
?>
				<button lang="<?php echo $_SESSION['language'];?>" type="button" onclick="save_to_dict_all(this.lang);" id="validateb" class="btn btn-warning" title="En cliquant, les données validées de tous les utilisateurs seront envoyées dans le dictionnaire d'exclusion, ou dans le dictionnaire de référence, soit mots simples, soit mots à traits d'union. Elles ne seront ensuite plus visible dans les candidats néologismes">Valider les faux néologismes (tous utilisateurs)</button>
				<button lang="<?php echo $_SESSION['language'];?>" type="button" class="btn btn-warning" onclick="save_to_neo_all(this.lang);" id="validate2b" title="En cliquant, les néologismes validées de tous les utilisateurs seront envoyés dans la base des néologismes">Sauvegarder les néologismes validés (tous utilisateurs)</button>			
				<button lang="<?php echo $_SESSION['language'];?>" type="button" onclick="save_to_dict(this.lang);" id="validate" class="btn btn-info" title="En cliquant, les données validées seront envoyées dans le dictionnaire d'exclusion, ou dans le dictionnaire de référence, soit mots simples, soit mots à traits d'union. Elles ne seront ensuite plus visible dans les candidats néologismes">Valider les faux néologismes</button>
				<button lang="<?php echo $_SESSION['language'];?>" type="button" class="btn btn-info" onclick="save_to_neo(this.lang);" id="validate2" title="En cliquant, les néologismes validées seront envoyés dans la base des néologismes">Sauvegarder les néologismes validés</button>			
        		<a href="neologismes-cand-help.png" target="new"><button type="button" class="btn btn-success">Aide sur l'interface</button></a>
        		<a href="typologie-neologismes.png" target="new2"><button type="button" class="btn btn-success">Typologie des néologismes</button></a>		

<?php
}
elseif ($_SESSION['user_rights'] == 1){
?>
				<button lang="<?php echo $_SESSION['language'];?>" type="button" onclick="save_to_dict(this.lang);" id="validate" class="btn btn-info" title="En cliquant, les données validées seront envoyées dans le dictionnaire d'exclusion, ou dans le dictionnaire de référence, soit mots simples, soit mots à traits d'union. Elles ne seront ensuite plus visible dans les candidats néologismes">Valider les faux néologismes</button>
				<button lang="<?php echo $_SESSION['language'];?>" type="button" class="btn btn-info" onclick="save_to_neo(this.lang);" id="validate2" title="En cliquant, les néologismes validées seront envoyés dans la base des néologismes">Sauvegarder les néologismes validés</button>			
        		<a href="neologismes-cand-help.png" target="new"><button type="button" class="btn btn-success">Aide sur l'interface</button></a>
        		<a href="typologie-neologismes.png" target="new2"><button type="button" class="btn btn-success">Typologie des néologismes</button></a>		

<?php
}
?>
<hr/>

          <!-- language select box -->
           <h5>Choisissez une langue : 
			<select name="lang" id="lang" class="lang"  style="width:150px;">
			<?php 
			// echo language select box from $GLOBALS['language']
			ksort($GLOBALS['language']);
			foreach ($GLOBALS['language'] as $lang => $lang_iso) {
				echo '<option value="' . $lang_iso . '" ';
				if ($_SESSION['language']== $lang_iso){echo 'selected';}
				echo '>' . $lang . '</option>';
			}
			?>			
    		</select>
		  </h5>

           <div class="row">
            	<div class="col-xs-12">
                	<div class="card">
                    	<div class="card-body">
                            <table class="datatable table" cellspacing="0" id="example"  class="display" style="width:100% !important;font-size: 0.90em;">
								<thead>
									<tr>
										<th>Néologisme candidat</th>
										<th>Type</th>
										<th>Commentaire</th>
										<th>Reco. Automatique</th>
										<th>Fréquence</th>
										<th>Date</th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
									<tr>
										<th>Néologisme candidat</th>
										<th>Type</th>
										<th>Commentaire</th>
										<th>Reco. Automatique</th>
										<th>Fréquence</th>
										<th>Date</th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Néologisme candidat</th>
										<th>Type</th>
										<th>Commentaire</th>
										<th>Reco. Automatique</th>
										<th>Fréquence</th>
										<th>Date</th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<!--<th></th>-->
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
            </div>
        </div>

<?php require('index_footer.php'); ?>
<!-- specific javascripts -->
	<!-- js librairies for visualization and column filter on datatables editor (filter snippet) -->
		<script type="text/javascript" charset="utf-8" src="../lib/js/d3.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../lib/js/crossfilter.min.js"></script>
		<script type="text/javascript" charset="utf-8" src="../lib/js/dc.min.js"></script>
		<!--<script type="text/javascript" src="js/jquery.dataTables.columnFilter.js"></script>-->
	<!--  global variables from settings.php to send them to js scripts -->
		<script type="text/javascript" charset="utf-8">
		solr_host = <?php echo "'" . $GLOBALS['search_engine']['host'] . "';"; ?>
		collections = <?php echo json_encode($GLOBALS['search_engine']['collection']) . ";"; ?>
		external_apps = <?php echo json_encode($GLOBALS['external_app']) . ";"; ?>
		//var lang = <?php echo "'" .  $_SESSION['language'] . "';"; ?>
		//console.log(solr_host);
		//console.log(collections);
		//console.log(lang);
		</script>
	<!-- then load the main javascript -->
        <script type="text/javascript" charset="utf-8" src="js/table.neocand_srv.js"></script>

</body>

</html>

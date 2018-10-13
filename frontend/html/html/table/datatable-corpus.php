
		<script type="text/javascript" charset="utf-8" src="js/table.RSS_INFO.js"></script>

                <div class="side-body">
                    <div class="page-title">
                        <span class="title">Gestionnaire de corpus</span>
                        <div class="description">
                        Cette interface vous permet de consulter et d'éditer la liste des sources d'informations utilisées dans Neoveille. 
	Vous pouvez trier et filter les entrées, ainsi qu'obtenir des informations sur les articles récupérées pour chaque fil RSS. 
	Vous pouvez également trouver automatiquement les fils RSS à partir du lien vers le site web visé. 
	<a href="#" onclick='togglevisible("helperform",$("#helperform").css("display"));'>Afficher/Masquer l'outil</a>
	<div id="helperform" style="display:none;">
		<form onsubmit="find_rss(this.url.value);">
			<label for="url">Url</label>
			<input size="100px" width="100px" type="text" placeholder="eg. http://www.lemonde.fr" id="url" />
			<input type="submit" value="Chercher les fils RSS">
			<input type="button" value="Effacer les résultats" onclick='$("#results").empty();$("#results").fadeOut();'>
		</form>
	<div id="results">&nbsp;</div>
	</div>
						</div>
                    </div>
                    <div>
                        <div class="alert alert-warning alert-dismissible" role="alert">
                           <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                           <strong> Attention! </strong>Cette interface permet de créer une nouvelle source d'information. Si le journal, le pays, la 
                           langue (et les autres paramètres) ne sont pas préalablement définis, vous devez le faire <strong>avant</strong> de saisir votre nouvelle source d'information.
                           
                        </div>
                      </div>
            
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
                                    <table class="datatable table table-striped" cellspacing="0" id="RSS_INFO">
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
						<th>&nbsp;</th>
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
						<th>&nbsp;</th>
					</tr>
				</tfoot>				
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
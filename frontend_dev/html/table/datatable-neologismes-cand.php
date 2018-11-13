
		<script type="text/javascript" charset="utf-8" src="js/table.neologismes.js"></script>

                <div class="side-body">
                    <div class="page-title">
                        <span class="title">Gestionnaire des néologismes candidats</span>
                        <div class="description">
						<div class="alert alert-warning" role="alert">
                        <strong>Instructions : </strong>  sélectionnez les néologismes-candidats et choisissez leur type. Ensuite, vous pouvez cliquer sur <i>Valider les faux néologismes</i> pour que les faux néologismes soient envoyées dans le dictionnaire de référence ou celui d'exclusion (et supprimés de cette base). Vous pouvez également cliquer sur <i>Sauvegarder les néologismes validés</i> pour les sauvegarder dans la base des néologismes pour description ultérieure.
                        <a href="http://dl.free.fr/iwemOMBta" target="new">Présentation vidéo de l'interface</a><br/>
			<button type="button" onclick="save_to_dict();" id="validate" class="btn btn-default" title="En cliquant, les données validées seront envoyées dans le dictionnaire d'exclusion, ou dans le dictionnaire de référence, soit mots simples, soit mots à traits d'union. Elles ne seront ensuite plus visible dans les candidats néologismes">Valider les faux néologismes</button>
			<button type="button" class="btn btn-default" onclick="save_to_neo();" id="validate2" title="En cliquant, les néologismes validées seront envoyés dans la base des néologismes">Sauvegarder les néologismes validés</button>			
                        </div>
			<div id="info">
			<table width="99%"><tr><td colspan="5"><b>Filtres</b></td></tr>
			<tr><td id="example_neo"></td><td id="example_type"></td><td id="example_auto"></td><td id="example_freq"></td><td id="example_date"></td></tr>
			<tr><td colspan="5"></td></tr>
			</table>
                        
                      </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-body">
                                    <table class="datatable table table-striped" cellspacing="0" id="example">
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
					</tr>
				</tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
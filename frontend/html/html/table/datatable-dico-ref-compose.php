
<script type="text/javascript" charset="utf-8" src="js/table.dico-ref-compose.js"></script>

	<div class="side-body">
    	<div class="page-title">
        	<span class="title">Gestionnaire des dictionnaires de référence : mots composés</span>
		</div>
		<div class="alert alert-warning alert-dismissible" role="alert">
           <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
           <strong> Attention! </strong>Cette interface permet de visualiser la partie du dictionnaire des mots composés de référence qui a été alimentée à partir du repérage automatique des néologismes candidats. Elle comprend les formes composés à trait-d'union. Vous pouvez éditer ces données si vous considérez intéressant d'ajouter de nouvelles lexies, d'en supprimer ou d'en éditer certaines.            
        </div>

        <div class="description">
          <!-- choix langue -->
           <h5>Choisissez une langue : 
			<select name="langD2" id="langD2" class="langD2">
      			<option value="ch">Chinois</option>
      			<option value="fr" selected="selected">Français</option>
      			<option value="gr">Grec</option>
      			<option value="it">Italien</option>
     			<option value="pl">Polonais</option>
      			<option value="br">Portugais du Brésil</option>
      			<option value="ru">Russe</option>
      			<option value="cz">Tchèque</option>
    		</select>
		  </h5>
		  <!-- filtres colonnes -->
			<div id="info">
				<table width="99%"><tr><td colspan="3"><h5>Filtres</h5></td></tr>
					<tr><td id="example_lexie"></td><td id="example_morph"></td><td id="example_date"></td></tr>
					<tr><td colspan="3"></td></tr>
				</table>  
            </div>
            <div class="row">
            	<div class="col-xs-12">
                	<div class="card">
                    	<div class="card-body">
                            <table class="datatable table" cellspacing="0" id="example">
								<thead>
									<tr>
										<th>Lexie</th>
										<th>Info morpho-syntaxique</th>
										<th>Date</th>
										<th></th>
										<th></th>
									</tr>
								</thead>
								<tfoot>
									<tr>
										<th>Lexie</th>
										<th>Info morpho-syntaxique</th>
										<th>Date</th>
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
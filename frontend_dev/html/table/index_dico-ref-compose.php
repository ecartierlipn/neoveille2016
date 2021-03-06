<?php
session_start();
include('../settings.php'); // global variables
?>
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
          <!-- language select box -->
           <h5>Choisissez une langue : 
			<select name="langD" id="langD" class="langD"  style="width:150px;">
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
<?php
session_start();
if (!(empty($_GET['logout'])) and $_GET['logout']==1){session_unset();}
if(empty($_SESSION['login_user']) or $_SESSION['login_user'] == 1 )
{
	header('Location: form/login.php?action=login');
}
?>
<!DOCTYPE html>
<html>

<head>
    <title>Néoveille</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300,400' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900' rel='stylesheet' type='text/css'>
    <!-- CSS Libs -->
    <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/animate.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap-switch.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/checkbox3.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/jquery.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/dataTables.bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/select2.min.css">
	<link rel="stylesheet" type="text/css" href="css/editor.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.1.2/css/buttons.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.1.2/css/select.dataTables.min.css">
    
    
    
    <!-- CSS App -->
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/themes/flat-blue.css">
    

<style type="text/css" class="init">
td.editorCorpus_edit {
    background: url('images/pencil_small.png') no-repeat center center;
    cursor: pointer;
}
td.editorCorpus_remove {
    background: url('images/drop.png') no-repeat center center;
    cursor: pointer;}
    
td.details-control {
    background: url('images/details_open.png') no-repeat center center;
    cursor: pointer;
}
tr.shown td.details-control {
    background: url('images/details_close.png') no-repeat center center;
}

td.details-control {
    background: url('images/details_open.png') no-repeat center center;
    cursor: pointer;
}
td.editor_edit {
    background: url('images/pencil_small.png') no-repeat center center;
    cursor: pointer;
}
td.editor_remove {
    background: url('images/drop.png') no-repeat center center;
    cursor: pointer;
    
}


	</style>
<script>
function togglevisible(id, currentvalue) {
	if (currentvalue=="none"){
	    document.getElementById(id).style.display = "block";
	}
	else{
	    document.getElementById(id).style.display = "none";	
	}
}
</script>    
    
</head>

<body class="flat-blue">
    <div class="app-container">
        <div class="row content-container">
        	<!-- top menu -->
            <nav class="navbar navbar-default navbar-fixed-top navbar-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-expand-toggle">
                            <i class="fa fa-bars icon"></i>
                        </button>
                        <ol class="breadcrumb navbar-breadcrumb">
                            <li class="active">Néoveille, plateforme de repérage, analyse et suivi des néologismes en sept langues</li>
                            <img src=""/>
                        </ol>
                        <button type="button" class="navbar-right-expand-toggle pull-right visible-xs">
                            <i class="fa fa-th icon"></i>
                        </button>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <button type="button" class="navbar-right-expand-toggle pull-right visible-xs">
                            <i class="fa fa-times icon"></i>
                        </button>
                        <li class="dropdown profile">
<!--                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Emily Hart <span class="caret"></span></a>-->
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><?php echo $_SESSION['user']; ?><span class="caret"></span></a>
                            <ul class="dropdown-menu animated fadeInDown">
                               <!-- <li class="profile-img">
                                    <img src="../img/profile/picjumbo.com_HNCK4153_resize.jpg" class="profile-img">
                                </li>-->
                                <li>
                                    <div class="profile-info">
                                        <h4 class="username"><?php echo $_SESSION['user']; ?></h4>
                                        <div class="btn-group margin-bottom-2x" role="group">
                                            <button type="button" class="btn btn-default"><i class="fa fa-user"></i> Profil</button>
                                            <a href="index.php?logout=1"><button type="button" class="btn btn-default"><i class="fa fa-sign-out"></i> Déconnexion</button></a>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <!-- left hand toggle menu-->
            <div class="side-menu sidebar-inverse">
                <nav class="navbar navbar-default" role="navigation">
                    <div class="side-menu-container">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <div class="icon fa fa-paper-plane"></div>
                                <div class="title">Néoveille</div>
                            </a>
                           <!-- <button type="button" class="navbar-expand-toggle pull-right visible-xs">
                                <i class="fa fa-times icon"></i>
                            </button> -->
                        </div>
                        <ul class="nav navbar-nav">
<!--                            <li class="active">-->
                            <li>
                                <a href="index.php">
                                    <span class="icon fa fa-home"></span><span class="title">Accueil</span>
                                </a>
                            </li>

<!-- corpus -->
                           <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#corpus-table">
                                    <span class="icon fa fa-files-o"></span><span class="title">Corpus</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="corpus-table" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="sources">Fils RSS/Sites web</a>
                                            </li>
                                            <li><a href="#" id="sources-dev">Fils RSS/Sites web (dvlpt)</a>
                                            </li>
                                            <li><a href="#" id="newspaper">Nom des Journaux</a>
                                            </li>
                                            <li><a href="#" id="domain">Domaines</a>
                                            </li>
                                            <li><a href="#" id="country">Pays</a>
                                            </li>
                                            <li><a href="#" id="lang">Langues</a>
                                            </li>
                                            <li><a href="#" id="format">Format des sources</a>
                                            </li>
                                            <li><a href="#" id="encoding">Encodage des sources</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

<!-- dictionnaires -->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#dico-table">
                                     <span class="icon fa fa-database"></span><span class="title">Dictionnaires</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="dico-table" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#">Dictionnaires de référence</a>
                                            </li>
                                            <li><a href="#">Dictionnaires d'exclusion</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>




<!-- néologismes candidats-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#neo-table">
                                    <span class="icon fa fa-magic"></span><span class="title">Néologismes de forme</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="neo-table" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="neo-cand">Néologismes candidats (français)</a>
                                            </li>
                                            <li><a href="#" id="neo-cand2">Néologismes candidats (toutes langues)</a>
                                            </li>
                                            <li><a href="#" id="neo-cand-type">Typologie des néologismes candidats</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

<!-- néologismes sémantique-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#neo-table2">
                                    <span class="icon fa fa-diamond"></span><span class="title">Néologismes sémantiques</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="neo-table2" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="neo-candsem">Profils lexico-syntaxiques</a>
                                            </li>
                                            <li><a href="#" id="neo-candsem2">Evolution sémantique des profils</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

<!-- néologismes-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#neo-db">
                                    <span class="icon fa fa-book"></span><span class="title">Analyse / suivi des néologismes</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="neo-db" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="neo-db">Base générale</a>
                                            </li>
                                            <li><a href="#" id="neo-db">Paramètres</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

<!-- search -->
							<li>
                                <a href="http://82.240.12.243:8000" target="search">
									<span class="icon fa fa-search"></span><span class="title">Moteur de Recherche</span>
                                </a>
                            </li>


                            <li>
                                <a href="license.php">
                                    <span class="icon fa fa-thumbs-o-up"></span><span class="title">Crédits</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- /.navbar-collapse -->
                </nav>
            </div>
            <!-- Main Content -->
            <div class="container-fluid" id="container-fluid">
                <div class="side-body">
                    <div class="page-title">
                        <span class="title">Présentation</span>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="card">
                                <div class="card-body no-padding">
                                    <div role="tabpanel">
                                        <!-- Nav tabs -->
                                        <ul class="nav nav-tabs" role="tablist">
                                            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Généralités</a></li>
                                            <li role="presentation"><a href="#tuto" aria-controls="tuto" role="tab" data-toggle="tab">Tutoriels</a></li>
                                            <li role="presentation"><a href="#publi" aria-controls="publi" role="tab" data-toggle="tab">Publications</a></li>
                                            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Liens</a></li>
                                        </ul>
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <div role="tabpanel" class="tab-pane active" id="home">
<p>Ce projet collaboratif, financé pour trois ans (juin 2015 - juin 2018) par la COMUE Sorbonne Paris Cité, regroupe plusieurs laboratoires de Sorbonne-Paris-Cité (LIPN, LDI, CLILLAC-ARP, ERTIM), les acteurs du groupe EMPNEO et l'université de Sao Paolo (USP).</p>
<p>Le projet vise à :</p>
<ul>
<li>mettre en place une plateforme multilingue de veille et de suivi des néologismes à partir de corpus contemporains de très grande taille dans sept langues (français, grec, polonais, tchèque -langues du groupe EmpNéo- portugais du Brésil, chinois et russe) ;</li>
<li>utiliser cette plateforme pour mener une étude des emprunts (notamment mais pas exclusivement anglicismes) dans différentes langues (français, grec, polonais, tchèque, portugais du Brésil, chinois et russe) ;</li>
<li>utiliser cette plateforme pour étudier la notion d'innovation sémantique et pour proposer de nouvelles procédures d’identification de nouveaux emplois ;</li>
</ul>

<h2>Architecture générale</h2>
<p>L'architecture générale du système est présentée dans la figure 2. </p>
<img src="images/archi.png" width="50%" border="1" align="center"/>
<p>Dans cette architecture, le trait horizontal sépare les composants où l'expert linguiste pourra intervenir (partie basse) des composants où il n'aura pas accès (domaine de l'expert linguiste informaticien).</p>
<p>On distingue ainsi six grands modules :</p>
<ol>
<li><b>Le gestionnaire de corpus :</b> l'expert linguiste peut déterminer (ajouter, supprimer, modifier) les corpus qu'il souhaite faire analyser par le système, actuellement soit un fil RSS, soit un site web. Il peut expliciter par ailleurs un certain nombre de méta-informations : nom du journal, url d'entrée, catégorie des informations fournies (presse générale ou spécialisée à l'heure actuelle), domaine (informatique, santé, économie, mode, etc.), langue (parmi les sept langues du projet), pays du journal (cette information pourra servir ultérieurement à étudier des différences néologiques par pays pour une même langue), type de la ressource (site web ou fil RSS actuellement), fréquence de parution. Ces informations sont associées à chaque unité d'information (« article ») qui sera récupérée et pourront permettre de filtrer les résultats dans le moteur de recherche. (voir onglet correspondant) </li>
<li><b>La récupération des fils RSS, des articles liés et leur analyse linguistique :</b> ce module permet d'effectuer la récupération régulière des articles de presse explicités dans les fils RSS et les pages web et d'effectuer différents traitements linguistiques : segmentation en mots,  analyse morphosyntaxique puis syntaxique. Ce module permet d'ajouter à chaque fil de presse des éléments de contenu : titre de l'article, description de l'article (dénotant soir un résumé du contenu, soit une accroche), contenu de l'article lui-même, contenu étiqueté morphosyntaxiquement, lemmes du document (restreints aux catégories nom, verbe et adjectif), noms propres du document.</li>
<li><b>Le repérage automatique de néologismes par la méthode du dictionnaire de référence pris comme corpus d'exclusion :</b> ce module permet, à la suite de l'analyse morphosyntaxique, de ne conserver que des candidats néologismes après plusieurs filtres : noms propres, erreurs typographiques, puis précatégorisations des néologismes candidats en emprunts et néologismes ‘internes’.</li>
<li><b>Le moteur de recherche et d'analyse des néologismes :</b> cette interface permet de fouiller les résultats obtenus par les étapes précédentes via un moteur de recherche comprenant différentes propriétés (voir onglet correspondant)</li>
<li><b>Le gestionnaire de néologismes :</b>il s'agit d'une base de données préexistante au projet développée en collaboration avec Jean-François Sablayrolles au LDI. Nous renvoyons à (Cartier et Sablayrolles, 2010) pour le détail de ce module. Neologia est en interaction avec le moteur Neoveille de deux façons principales : d'une part, les néologismes présentés et leurs contextes peuvent être directement exportés dans la base Neologia ; d'autre part, il est toujours possible d'obtenir des informations sur le cycle de vie des néologismes après son insertion dans Neologia, par retour au moteur Neoveille.</li>
<li><b>Le repérage des néologismes sémantiques par la méthode du profil combinatoire</b> est lancé sur les lexies cibles et sera également disponible dans l'interface de recherche et d'analyse.</li>
</ol>
</div>
											<div role="tabpanel" class="tab-pane" id="tuto">
											<p>Ci-dessous, vous trouverez des tutoriels vidéos détaillant les différentes composantes de la plateforme. Pour une présentation détaillée de Néoveille, voir les publications.</p>								
											
											<div class="card">
                                				<div class="card-header">
                                    				<div class="card-title">
                                        				<div class="title">Gestionnaire de corpus</div>
                                    				</div>
                                				</div>
                                				<div class="card-body">							
													<p>Le gestionnaire de corpus vous permet d'indiquer au moteur les corpus web que vous souhaitez utiliser. Les sources d'informations ainsi constituées sont récupérées automatiquement deux fois par jour. Le menu principal "Corpus" donne accès à plusieurs sous-menus permettant de spécifier les différents paramètres de vos sources d'informations. Vous trouverez ci-dessous le descriptif succinct des différentes sous-menus, ainsi qu'un tutoriel vidéo.</p>
													<table class="table table-striped">
															<thead><tr><th>Sous-menu</th><th>Description</th><th>Tutoriel vidéo</th></tr></thead>
															<tbody>
																<tr><th scope="row">Fils RSS/Sites web OU Fils RSS/Sites web (dvlpt)</th><td>interface principale pour ajouter, modifier, supprimer des sources d'informations. La version "dvlpt" (développement) permet d'accéder aux sources d'informations par langue.</td><td><a href="../docs/corpus-neoveille.m4v" target="tuto-video"><span class="glyphicon glyphicon-facetime-video" aria-hidden="true"></a></td></tr>
																<tr><th scope="row">Noms des journaux</th><td>interface permettant de gérer les noms des journaux utilisés comme source d'informations.</td><td><video width="30" controls="controls"><source src="../docs/corpus-neoveille.m4v" type="video/mp4"><source src="../docs/corpus-neoveille.webm" type="video/webm"></video></td></tr>
																<tr><th scope="row">Domaines</th><td>interface permettant de gérer les domaines de chaque source.</td><td></td></tr>
																<tr><th scope="row">Pays</th><td>interface permettant de gérer les pays source des informations web.</td><td></td></tr>
																<tr><th scope="row">Langues</th><td>interface permettant de gérer la langue des sources d'informations.</td><td></td></tr>
																<tr><th scope="row">Format des sources</th><td>interface permettant de gérer les formats des sources d'informations.</td><td></td></tr>
																<tr><th scope="row">Encodage des sources</th><td>interface permettant de gérer les encodages des sources d'informations.</td><td></td></tr>
															</tbody>
													</table>
												</div>
											</div>
												
											<h3>Gestionnaire des néologismes candidats</h3>
											<p></p>
											<h3>Gestionnaire des néologismes</h3>
											<p></p>
											<h3>Gestionnaire des néologismes sémantiques</h3>
											<p></p>
											</div>
											<div role="tabpanel" class="tab-pane" id="publi">
											<p></p>											
											</div>
                                            <div role="tabpanel" class="tab-pane" id="messages"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="app-footer">
            <div class="wrapper">
                <span class="pull-right">2.1 <a href="#"><i class="fa fa-long-arrow-up"></i></a></span> © 2016 Néoveille.
            </div>
        </footer>
        <div>
            <!-- Javascript Libs -->
            <script type="text/javascript" src="../lib/js/jquery.min.js"></script>
            <script type="text/javascript" src="../lib/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="../lib/js/Chart.min.js"></script>
            <script type="text/javascript" src="../lib/js/bootstrap-switch.min.js"></script>
            <script type="text/javascript" src="../lib/js/jquery.matchHeight-min.js"></script>
 			<script type="text/javascript" charset="utf-8" src="https://cdn.datatables.net/s/dt/jqc-1.12.0,moment-2.11.2,dt-1.10.11,b-1.1.2,se-1.1.2/datatables.min.js"></script>
<!--            <script type="text/javascript" src="../lib/js/jquery.dataTables.min.js"></script>-->
            <script type="text/javascript" src="../lib/js/dataTables.bootstrap.min.js"></script>
            <script type="text/javascript" charset="utf-8" src="js/dataTables.editor.min.js"></script>
	    	<script type="text/javascript" src="js/jquery.dataTables.columnFilter.js"></script>

            <script type="text/javascript" src="../lib/js/select2.full.min.js"></script>
            <script type="text/javascript" src="../lib/js/ace/ace.js"></script>
            <script type="text/javascript" src="../lib/js/ace/mode-html.js"></script>
            <script type="text/javascript" src="../lib/js/ace/theme-github.js"></script>
            <!-- Javascript -->
            <script type="text/javascript" src="../js/app.js"></script>
           <!-- <script type="text/javascript" src="../js/index.js"></script>-->
            <script type="text/javascript" src="js/menus.js"></script>

</body>

</html>

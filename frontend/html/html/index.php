<?php
header("Access-Control-Allow-Origin: lipn.univ-paris13.fr"); 
session_start();
//include './credentials.php';
$timeout = 1800; // Number of seconds until it times out.

include('./credentials.php');
 
// Check if the timeout field exists.
if(isset($_SESSION['timeout'])) {
    // See if the number of seconds since the last
    // visit is larger than the timeout period.
    $duration = time() - (int)$_SESSION['timeout'];
    if($duration > $timeout) {
	echo '<script type="text/javascript">alert("Votre session a expiré. Vous allez être déconnecté.");</script>';
        // Destroy the session and restart it.
        session_destroy();
        session_start();
	header('Location: login.php?action=login');
    }
}
 
// Update the timout field with the current time.
$_SESSION['timeout'] = time();


if (!(empty($_GET['logout'])) and $_GET['logout']==1){session_unset();}
if(empty($_SESSION['login_user']) or $_SESSION['login_user'] == 1 )
{
	header('Location: login.php?action=login');
//	header('Location: form/login.php?action=login');
}




echo "<script>console.log( 'SESSION VARIABLES - LANGUAGE : " . $_SESSION['language'] . ':' . $_SERVER["DOCUMENT_ROOT"] . "' );</script>";
?>
<!DOCTYPE html>
<html>

<head>
    <title>Néoveille</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Fonts -->
<!-- 010118    <link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300,400' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900' rel='stylesheet' type='text/css'> -->
    <!-- CSS Libs -->
    <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/font-awesome.min.css"> 
    <link rel="stylesheet" type="text/css" href="../lib/css/animate.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap-switch.min.css">
<!--    <link rel="stylesheet" type="text/css" href="../lib/css/checkbox3.min.css"> -->
    <link rel="stylesheet" type="text/css" href="../lib/css/jquery.dataTables.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/dataTables.bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/select2.min.css">
	<link rel="stylesheet" type="text/css" href="css/editor.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.1.2/css/buttons.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.1.2/css/select.dataTables.min.css">
	<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.2/css/select2.min.css">
    <!-- CSS App -->
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <link rel="stylesheet" type="text/css" href="../css/themes/flat-blue.css">
    

<style type="text/css" class="init">


div.DTE_Field.DTE_Field_Type_title label {
  width: 100% !important;
  font-size: 1.2em;
  font-weight: bold;
  border-bottom: 1px solid #aaa; }
div.DTE_Field.DTE_Field_Type_title div {
  display: none; }
div.DTE_Field.DTE_Field_Type_title:hover {
  background-color: white;
  border: 1px solid transparent; }


td.editorNeoTools_edit {
    background: url('images/pencil_small.png') no-repeat center center;
    cursor: pointer;
}

td.editorNeo_edit {
    background: url('images/pencil_small.png') no-repeat center center;
    cursor: pointer;
}
td.editorNeo_details2 {
    background: url('images/google2.png') no-repeat center center;
    cursor: pointer;
}
td.editorNeo_remove {
    background: url('images/drop.png') no-repeat center center;
    cursor: pointer;}

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
td.details-control3 {
    background: url('images/google2.png') no-repeat center center;
    cursor: pointer;
}
td.details-control2 {
    background: url('images/statistiques-neo.png') no-repeat center center;
    width:20px;
    height:20px;
    cursor: pointer;
}

tr.shown td.details-control2 {
    #background: url('images/details_close.png') no-repeat center center;
}

td.details-control4 {
    background: url('images/statistiques-neo-nlp.png') no-repeat center center;
    width:20px;
    height:20px;
    cursor: pointer;
}

tr.shown td.details-control3 {
    #background: url('images/details_close.png') no-repeat center center;
}


td.editor_edit {
    background: url('images/pencil_small.png') no-repeat center center;
    cursor: pointer;
}
td.editor_remove {
    background: url('images/drop.png') no-repeat center center;
    cursor: pointer;
    
}
td.editorU_edit {
    background: url('images/pencil_small.png') no-repeat center center;
    cursor: pointer;
}
td.editorU_remove {
    background: url('images/drop.png') no-repeat center center;
    cursor: pointer;

td.corpus-details {
    background: url('images/details_open.png') no-repeat center center;
    cursor: pointer;
}
td.corpus-details.shown {
    background: url('images/details_close.png') no-repeat center center;
}

svg.attr({
    "width": "100%",
    "height": "100%",
    "viewBox": "0 0 250 250"
})


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
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><?php echo $_SESSION['user']; ?>-<?php echo $_SESSION['language']; ?><span class="caret"></span></a>
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
<!--  accueil -->
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
                                            <!--<li><a href="#" id="sources">Fils RSS/Sites web</a>
                                            </li>-->
                                            <li><a href="#" id="sources-dev">Fils RSS/Sites web</a>
                                            </li>
                                            <li><a href="#" id="newspaper">Nom des Journaux</a>
                                            </li>
                                            <li><a href="#" id="domain">Domaines</a>
                                            </li>
                                            <li><a href="#" id="country">Pays</a>
                                            </li>
                                            <li><a href="#" id="lang">Langues</a>
                                            </li>
                                           <!-- <li><a href="#" id="format">Format des sources</a>
                                            </li>
                                            <li><a href="#" id="encoding">Encodage des sources</a>
                                            </li>-->
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
                                            <li><a href="#" id="dico-ref">Dictionnaire des mots simples</a>
                                            </li>
                                            <li><a href="#" id="dico-ref2">Dict. des mots composés</a>
                                            </li>
                                            <li><a href="#" id="dico-ref3">Dict. terminologique</a>
                                            </li>
                                            <li><a href="#" id="dico-excl">Dict. d'exclusion</a>
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
                                            <li><a href="#" id="neo-cand2">Néologismes candidats</a>
                                            </li>
                                            <li><a href="index_neo_cand.php">Néologismes candidats (srv)</a>
                                            </li>
                                            <li><a href="#" id="neo-cand-type">Typologie des néologismes candidats</a>
                                            </li>
                                            <!--<li><a href="#" id="neo-cand3">Néologismes candidats (en dvlpt)</a>
                                            </li>-->
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
                                            <li><a href="#" id="neo-candsem-freq">Evolution fréquencielle des lexies</a>
                                            </li>
                                            <li><a href="#" id="neo-candsem-synt">Evolution des patrons lexico-syntaxiques</a>
                                            </li>
                                            <li><a href="#" id="neo-candsem-sem">Evolution des similarités sémantiques</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
<!-- néologismes-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#neo-table3">
                                    <span class="icon fa fa-book"></span><span class="title">Gestionnaire des néologismes</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="neo-table3" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="neo-db-dev">Base générale</a>
                                            </li>
                                            <li><a href="index_neo_db_dev.php">Base générale (srv)</a>
                                            </li>
                                            <li><a href="#" id="neo-db-param">Paramètres</a>
                                            </li>
                                            <li><a href="#" id="neo-db-dev2">Synthèse (dev)</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
<!-- search -->
						<!--	<li>
                                <a href="http://82.240.12.243:8000" target="search">
									<span class="icon fa fa-search"></span><span class="title">Moteur de Recherche</span>
                                </a>
                            </li>-->
<!-- search 2-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#neo-search">
                                    <span  class="icon fa fa-search"></span><span class="title">Recherche</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="neo-search" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
<?php if ($_SESSION["user_rights"]==2){
?>
                                            <li><a href="http://tal.lipn.univ-paris13.fr/solr/" target="search">Interface Solr</a>
                                            </li>
<?php
}
?> 
                                          <li><a href="#" id="neo-search2">Moteur interne</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

<!-- outils-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#neo-tools">
                                    <span class="icon fa fa-cogs"></span><span class="title">Outils</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="neo-tools" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="neo-tools1">Bugs et demandes</a>
                                            </li>
                                            <li><a href="#" id="neo-tools2">Outils divers</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>

<!-- profils-->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#user-params">
                                    <span class="icon fa fa-user"></span><span class="title">Utilisateur</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="user-params" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="user-profile">Profil</a>
                                            </li>
                                            <li><a href="#" id="user-preferences">Préférences</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
<?php if ($_SESSION["user_rights"]==2){
?>
<!-- gestion des utilisateurs pour admin -->
                            <li class="panel panel-default dropdown">
                                <a data-toggle="collapse" href="#users-mngt">
                                    <span class="icon fa fa-users"></span><span class="title">Gestion des utilisateurs</span>
                                </a>
                                <!-- Dropdown level 1 -->
                                <div id="users-mngt" class="panel-collapse collapse">
                                    <div class="panel-body">
                                        <ul class="nav navbar-nav">
                                            <li><a href="#" id="users-list">Utilisateurs</a>
                                            </li>
                                            <li><a href="#" id="users-preferences">Droits et préférences</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
<?php 
}
?>

<!-- crédits -->
                            <!--<li>
                                <a href="license.php">
                                    <span class="icon fa fa-thumbs-o-up"></span><span class="title">Crédits</span>
                                </a>
                            </li>
                            -->
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
                        <!-- tab 1 home -->
                                   <div role="tabpanel" class="tab-pane active" id="home">
										<p>Ce projet collaboratif, financé pour trois ans (juin 2015 - juin 2018) par la COMUE Sorbonne Paris Cité, regroupe plusieurs laboratoires de Sorbonne-Paris-Cité (LIPN, LDI, CLILLAC-ARP, ERTIM), les acteurs du groupe EMPNEO et l'Université de São Paulo (USP).</p>
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
						<!-- tab 2 - tuto dvlpt -->
									<div role="tabpanel" class="tab-pane" id="tuto">
										<p>Ci-dessous, vous trouverez des tutoriels vidéos détaillant les différentes composantes de la plateforme. Pour une présentation détaillée de Néoveille, voir les publications.</p>
										<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  											<!-- présentation générale -->
  											<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Présentation générale
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
<!-- presentation generale -->
		<div class="card">
                                				<div class="card-body">							
													<p>La plateforme Néoveille est présentée dans son ensemble dans la vidéo ci-dessous.</p>
													<video width="640" height="480" controls="controls">
  														<source src="../docs/neoveille-gen.m4v" type="video/mp4" />
														<source src="../docs/neoveille-gen.webm" type="video/webm" />
														Votre navigateur ne prend pas en charge les formats vidéo proposés.
													</video>
												</div>
											</div>
      </div>
    </div>
  </div>
  											<!-- Gestionnaire de corpus -->
  											<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Gestionnaire de corpus
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
<!-- gestionnaire de corpus -->
      <div class="panel-body">
											<!--<div class="card">
                                				<div class="card-body">	
													<p>Le gestionnaire de corpus vous permet d'indiquer au moteur les corpus web que vous souhaitez utiliser. Les sources d'informations ainsi constituées sont récupérées automatiquement deux fois par jour. Le menu principal "Corpus" donne accès à plusieurs sous-menus permettant de spécifier les différents paramètres de vos sources d'informations. Vous trouverez ci-dessous le descriptif succinct des différentes sous-menus, ainsi qu'un tutoriel vidéo.</p>
													<table class="table table-striped">
															<thead><tr><th>Sous-menu</th><th>Description</th><th>Tutoriel vidéo</th></tr></thead>
															<tbody>
																<tr><th scope="row">Fils RSS/Sites web OU Fils RSS/Sites web (dvlpt)</th><td>interface principale pour ajouter, modifier, supprimer des sources d'informations. La version "dvlpt" (développement) permet d'accéder aux sources d'informations par langue.</td><td><a href="../docs/corpus-neoveille.m4v" target="tuto-video"><span class="glyphicon glyphicon-facetime-video" aria-hidden="true"/></a></td></tr>
																<tr><th scope="row">Noms des journaux</th><td>interface permettant de gérer les noms des journaux utilisés comme source d'informations.</td><td></td></tr>
																<tr><th scope="row">Domaines</th><td>interface permettant de gérer les domaines de chaque source.</td><td></td></tr>
																<tr><th scope="row">Pays</th><td>interface permettant de gérer les pays source des informations web.</td><td></td></tr>
																<tr><th scope="row">Langues</th><td>interface permettant de gérer la langue des sources d'informations.</td><td></td></tr>
																<tr><th scope="row">Format des sources</th><td>interface permettant de gérer les formats des sources d'informations.</td><td></td></tr>
																<tr><th scope="row">Encodage des sources</th><td>interface permettant de gérer les encodages des sources d'informations.</td><td></td></tr>
															</tbody>
													</table>                    										
												</div>
											</div>  -->
												<div class="card">
                                				<div class="card-body">	
													<div class="text-indent">L'interface du gestionnaire de corpus vous permet d'accéder aux sources d'information récupérées automatiquement pour chacune des langues du projet. Vous pouvez via cette interface visualiser les sources et différentes informations sur les articles récupérés, ainsi qu'ajouter et modifier les sources à récupérer. Les deux tutoriels ci-dessous présentent les fonctionnalités de cette interface.</div>
													<div class="sub-title">Partie 1</div>
													<video width="640" height="480" controls="controls">
  														<source src="../docs/neoveille-corpus1.m4v" type="video/mp4" />
														<source src="../docs/neoveille-corpus1.webm" type="video/webm" />
														Votre navigateur ne prend pas en charge les formats vidéo proposés.
													</video>
													<div class="sub-title">Partie 2</div>
													<video width="640" height="480" controls="controls">
  														<source src="../docs/neoveille-corpus2.m4v" type="video/mp4" />
														<source src="../docs/neoveille-corpus2.webm" type="video/webm" />
														Votre navigateur ne prend pas en charge les formats vidéo proposés.
													</video>

												</div>
											</div>											    
	  </div>
    </div>
  </div>
											<!-- Gestionnaire de dictionnaires  -->
  											<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Gestionnaire de dictionnaires de référence et d'exclusion (en développement)
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
<!-- gestionnaire de dictionnaires -->
      <div class="panel-body">
											<div class="card">
                                				<div class="card-body">	
													<p>Le gestionnaire de dictionnaires vous permet d'indiquer au moteur les dictionnaires devant être utilisés pour la reconnaissance des néologismes de forme. Deux types de dictionnaires sont utilisés : un dictionnaire de référence, comprenant l'ensemble du lexique de la langue général; un dictionnaire d'exclusion, comprenant la liste des formes devant être exclues de la reconnaissance automatique (par exemple : coquilles); dictionnaire terminologique, si vous souhaitez travailler sur la néologie en terminologie, afin d'exclure les lexies déjà attestées dans le domaine. Dans les interfaces de ce module, vous pouvez ajouter et éditer des dictionnaires. Pour les utiliser, il sera nécessaire de modifier le paramétrage (voir module paramètres)</p>
													<table class="table table-striped">
															<thead><tr><th>Sous-menu</th><th>Description</th></tr></thead>
															<tbody>
																<tr><th scope="row">Dictionnaire de référence</th><td>interface principale pour ajouter, modifier, supprimer des entrées dans le dictionnaire de référence. Vous devez préalablement choisir la langue source. Des méta-informations sont indiquées sur la page, ainsi qu'un lien éventuel vers la ressource complète.</td></tr>
																<tr><th scope="row">Dictionnaire d'exclusion</th><td>interface pour ajouter, modifier, supprimer des entrées dans le dictionnaire d'exclusion. Ce dictionnaire est construit au fur et à mesure du projet lorsque des candidats néologismes sont repérés à tort par le système. (voir néologismes de forme)</td></tr>
																<tr><th scope="row">Dictionnaire(s) terminologique(s) (en cours de développement)</th><td>interface permettant de gérer des dictionnaires additionnels liés à des domaines particuliers.</td></tr>
															</tbody>
													</table>                    										
												</div>
											</div>			
      </div>    
    </div>
  </div>
  											<!-- néologismes de forme -->  
  											<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFour">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          Gestionnaire des néologismes (de formes) candidats
        </a>
      </h4>
    </div>
    <div id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour">
      <div class="panel-body">
											<div class="card">
                                				<div class="card-body">	
													<p>L'interface des néologismes de forme vous permet d'accéder aux néologismes reconnus automatiquement par le système. Vous pouvez choisir la langue de travail, et ensuite visualiser et éditer les néologismes candidats. L'objectif principal de cette interface est de valider ou d'invalider les néologismes reconnus automatiquement, afin soit d'alimenter les dictionnaires de référence ou d'exclusion, soit d'alimenter la base de description des néologismes. Afin de faciliter le travail, un certain nombre de fonctionnalités sont disponibles, présentées dans le tutoriel ci-dessous.</p>
													<video width="640" height="480" controls="controls">
  														<source src="../docs/neoveille-cand-neo.m4v" type="video/mp4" />
														<source src="../docs/neoveille-cand-neo.webm" type="video/webm" />
														Votre navigateur ne prend pas en charge les formats vidéo proposés.
													</video>

												</div>
											</div>      
	  </div>
    </div>
  </div> 
  											<!-- gestionnaire des néologismes -->  
	  										<div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingFive">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          Gestionnaire des néologismes (analyse linguistique et suivi)
        </a>
      </h4>
    </div>
    <div id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFive">
      <div class="panel-body">
											<div class="card">
                                				<div class="card-body">	
													<p>L'interface des néologismes de forme vous permet d'accéder aux néologismes reconnus automatiquement par le système. Vous pouvez choisir la langue de travail, et ensuite visualiser et éditer les néologismes candidats. L'objectif principal de cette interface est de valider ou d'invalider les néologismes reconnus automatiquement, afin soit d'alimenter les dictionnaires de référence ou d'exclusion, soit d'alimenter la base de description des néologismes. Afin de faciliter le travail, un certain nombre de fonctionnalités sont disponibles, présentées dans le tutoriel ci-dessous.</p>
													<!--<video width="640" height="480" controls="controls">
  														<source src="../docs/neoveille-neo.m4v" type="video/mp4" />
														<source src="../docs/neoveille-neo.webm" type="video/webm" />
														<source src="../docs/neoveille-neo.ogv" type="video/ogg" />
														Votre navigateur ne prend pas en charge les formats vidéo proposés.
													</video>-->

												</div>
											</div>      </div>
    </div>
  </div> 
										</div>																			
									</div>
						<!-- tab 3 : publi -->
									<div role="tabpanel" class="tab-pane" id="publi">
											<h4>Présentation générale de Néoveille</h4>
<p>Cartier, Emmanuel (2016), « Neoveille, système de repérage et de suivi des néologismes en sept langues », Neologica 10, p. 101-131. <a href="../docs/Neoveille_neologica2016.pdf" target="new">Pre-print (ce document expose le projet à son démarrage. Pour une version récente, consulter l'article de 2018)</a></p>
<p>Cartier, Emmanuel (2017), Neoveille, <u><a href="https://www.aclweb.org/anthology/E/E17/E17-3024.pdf" target="new">a Web Platform for Neologism Tracking, Proceedings of the EACL 2017 Software Demonstrations, Valencia, Spain, April 3-7 2017.</a></u></p>
<p>Cartier, Emmanuel (2018, à paraître), « Neoveille, plateforme de détection, de repérage et de suivi des néologismes en dix langues », <a href="../docs/Neoveille_neologica2018.pdf" target="new">pdf</a></p>

<h4>Etudes effectuées à partir de Néoveille</h4>
<p>Boutmgharine Idyassner, Najet (2016), « Les stratégies de glose sur l’emprunt en discours », Colloque Emprunts néologiques et équivalents autochtones. Mesure de leurs circulations respectives, Universytet Łódzki, 10-12 octobre 2016, Łódz, Pologne. http://neologie.uni.lodz.pl.</p>
<p>Tallarico Giovanni (2016), « Cinquante nuances de board : les anglicismes néologiques et leurs équivalents dans le domaine des sports de glisse ». Colloque Emprunts néologiques et équivalents autochtones. Mesure de leurs circulations respectives, Universytet Łódzki, 10-12 octobre 2016, Łódz, Pologne. http://neologie.uni.lodz.pl</p>
<p>Viaux Julie, Cartier Emmanuel (2016), « Étude linguistique et quantitative de la pénétration des anglicismes de type (N,ADJ)-Ving dans sept langues à partir d’un corpus contemporain journalistique », Colloque international Emprunts néologiques et équivalents autochtones. Mesure de leurs circulations respectives, Universytet Łódzki, 10-12 octobre 2016, Łódz, Pologne. http://neologie.uni.lodz.pl</p>
<p>Lejeune Gaël, Cartier Emmanuel (2017), <u><a href="http://aclweb.org/anthology/W17-4103" target="new">Character Based Pattern Mining for Neology Detection</a></u>
,Proceedings of the First Workshop on Subword and Character Level Models in NLP , EMNLP 2017, Copenhagen, p.25-30.</p>
										
										</div>
						<!-- tab 4 : liens -->
                                     <div role="tabpanel" class="tab-pane" id="messages">
                                        </div>
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
                <table border="0" width="100%">
                	<tr>
                		<td>&copy; Néoveille 2015-<?php echo date("Y"); ?></td>
                		<td><img src="images/idex.png" width="150px"/></td>
                		<td><img src="images/uspc.png" width="150px"/></td>
                		<td><img src="images/up13.png" width="150px"/></td>
                		<td><img src="images/up7.png" width="130px"/></td>
                		<td><img src="images/inalco.png" width="150px"/></td>
                		<td><img src="images/saopaulo.png" width="150px"/></td>
                		<td>groupe EMPNEO</td>
                	</tr>
                	<tr>
                	   <td colspan="2">&nbsp;</td>
                       <td><a href="https://lipn.univ-paris13.fr/fr/rcln-3" target="new"><img src="images/lipn.png" width="40px"/></a></td>
                		<td><a href="http://www.clillac-arp.univ-paris-diderot.fr" target="new"><img src="images/clillacarp.png" width="40px"/></a></td>
                		<td><a href="http://www.er-tim.fr" target="new"><img src="images/ertim.png" width="30px"/></a></td>
                		<td><a href="http://ldi.cnrs.fr/index.php?lang=fr" target="new"><img src="images/ldi.png" width="40px"/></a></td>
                		<td colspan="2">&nbsp;</td>
                	</tr>
                </table>

            </div>
        </footer>
        <div>
            <!-- Javascript Libs -->
            <script type="text/javascript" src="../lib/js/jquery.min.js"></script>
            <script type="text/javascript" src="../lib/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="../lib/js/bootstrap-switch.min.js"></script>
 	<script type="text/javascript" charset="utf-8" src="https://cdn.datatables.net/s/dt/jqc-1.12.0,moment-2.11.2,dt-1.10.11,b-1.1.2,se-1.1.2/datatables.min.js"></script> 
            <script type="text/javascript" src="../lib/js/dataTables.bootstrap.min.js"></script>
            <script type="text/javascript" charset="utf-8" src="js/dataTables.editor.min.js"></script>
            <script type="text/javascript" charset="utf-8" src="js/editor.title.js"></script>
	    	<script type="text/javascript" src="js/jquery.dataTables.columnFilter.js"></script>
	    	<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
	    	<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
            <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
            <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
	    	<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.colVis.min.js"></script>
	    	<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.2/js/select2.min.js"></script>
<!--            <script type="text/javascript" src="../lib/js/select2.full.min.js"></script> -->
<!-- too heavy            <script src='../lib/js/pdfmake.min.js'></script> -->
 			<script src='../lib/js/vfs_fonts.js'></script>
            <!-- Javascript -->
<!--            <script type="text/javascript" src="../js/app.js"></script> -->
           <!-- <script type="text/javascript" src="../js/index.js"></script>-->
            <script type="text/javascript" src="js/menus.js"></script>
            <script type="text/javascript">
            var user = '<?php echo $_SESSION["user"]; ?>';
            var user_rights = '<?php echo $_SESSION["user_rights"]; ?>';
           var languageW = '<?php echo $_SESSION["language"]; ?>';
	//	document.addEventListener('touchstart', onTouchStart, {passive: true});
           // $(document).ready(function(){
    		//	$('[data-toggle="tooltip"]').tooltip(); 
			//});




            </script>

</body>

</html>

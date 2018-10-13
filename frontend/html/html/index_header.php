<?php
header("Access-Control-Allow-Origin: lipn.univ-paris13.fr"); 
session_start();
//include './credentials.php';
$timeout = 1800; // Number of seconds until it times out.

//include($_SERVER["DOCUMENT_ROOT"] . './html/credentials.php');
 
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
<!--<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.1.2/css/buttons.dataTables.min.css">-->
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/autofill/2.2.2/css/autoFill.bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.5.1/css/buttons.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/colreorder/1.4.1/css/colReorder.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/fixedcolumns/3.2.4/css/fixedColumns.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/fixedheader/3.1.3/css/fixedHeader.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/responsive/2.2.1/css/responsive.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/scroller/1.4.4/css/scroller.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/select/1.2.5/css/select.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="./Editor/css/dataTables.editor.css">
<link rel="stylesheet" type="text/css" href="Editor/css/editor.bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../lib/css/font-awesome.min.css"> 
<link rel="stylesheet" type="text/css" href="../lib/css/jquery.dataTables.min.css">

  
 

    <!-- CSS App -->
<link rel="stylesheet" type="text/css" href="../lib/css/font-awesome.min.css">     
    <link rel="stylesheet" type="text/css" href="../css/style.css"> 
    <link rel="stylesheet" type="text/css" href="../css/themes/flat-blue.css">
    
	<link href='../css/dc.css' rel='stylesheet' type='text/css'>

<style>
/*
.dataTables_wrapper .dataTables_processing {
position: absolute;
top: 1%;
color:white;
background:green;
border-radius: 25px;
background: #73AD21;
//text-shadow:3px 2px black;
left: 50%;
width: 30%;
height: 40px;
margin-left: -20%;
margin-top: -25px;
padding-top: 20px;
text-align: center;
font-size: 1.2em;
}
*/

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

[id*=dc-time-chart] g.axis g text {
    text-anchor: end !important;
    transform: rotate(-25deg);
}

[id*=dc-neo-chart] g.row text {
      fill: black;
    }

 </style>

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
    #width:20px;
    #height:20px;
    cursor: pointer;
}

tr.shown td.details-control2 {
    #background: url('images/details_close.png') no-repeat center center;
}

td.details-control4 {
    background: url('images/statistiques-neo-nlp.png') no-repeat center center;
    #width:20px;
    #height:20px;
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
                                            <li><a href="index_neo_cand.php">Néologismes candidats</a> <!--id="neo-cand2"-->
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
                                            <li><a href="index_neo_db_dev.php" id="neo-db-dev">Base générale (srv)</a>
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
            

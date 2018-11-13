<?php 

require_once('settings.php');
?>

<!DOCTYPE html>
<html>

<head>
<?php header("Access-Control-Allow-Origin: lipn.univ-paris13.fr"); ?>
    <title>Néoveille - connexion</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- CSS Libs -->
    <link rel="stylesheet" type="text/css" href="../lib/css/bootstrap.min.css">
    <!--<link rel="stylesheet" type="text/css" href="../lib/css/buttons.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/css/select.bootstrap.min.css">-->
	 <link rel="stylesheet" type="text/css" href="../lib/css/select2.min.css">
	 
	 <!-- datatables -->
    <link rel="stylesheet" type="text/css" href="../lib/Datatables/datatables.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/Datatables/DataTables-1.10.18/css/dataTables.bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../lib/DataTables/Buttons-1.5.4/css/buttons.bootstrap.css">
	<link rel="stylesheet" type="text/css" href="../lib/DataTables/FixedHeader-3.1.4/css/fixedHeader.bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../lib/DataTables/Responsive-2.2.2/css/responsive.bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../lib/DataTables/Select-1.2.6/css/select.bootstrap.min.css">

	 <!-- Editor -->
    <link rel="stylesheet" type="text/css" href="../lib/Editor/css/editor.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../lib/Editor/css/dataTables.editor.css">
	<link rel="stylesheet" type="text/css" href="../lib/Editor/css/editor.dataTables.min.css">    

    <!-- CSS App -->
    <link rel="stylesheet" type="text/css" href="../lib/app/style.css">
    <link rel="stylesheet" type="text/css" href="../lib/app/themes/flat-blue.css">
    <link rel="stylesheet" type="text/css" href="../lib/app/login.css">
    
    
</head>

<body class="flat-blue">
    <div class="app-container">
        <div class="row content-container">
            <nav class="navbar navbar-default navbar-fixed-top navbar-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-expand-toggle">
                            <i class="fa fa-bars icon"></i>
                        </button>
                        <ol class="breadcrumb navbar-breadcrumb">
                            <li>Néoveille, plateforme de repérage, analyse et suivi des néologismes en sept langues</li>
                        </ol>
                    </div>

                </div>
            </nav>
            <!-- side menu -->
            <div class="side-menu sidebar-inverse">
                <nav class="navbar navbar-default" role="navigation">
                    <div class="side-menu-container">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <div class="icon fa fa-paper-plane"></div>
                                <div class="title">Néoveille</div>
                            </a>
                            <button type="button" class="navbar-expand-toggle pull-right visible-xs">
                                <i class="fa fa-times icon"></i>
                            </button>
                        </div>
                        <ul class="nav navbar-nav">
                            <li>
                                <a href="#" id="accueil" onclick="jQuery('div#neovalsynth').hide();jQuery('div#signupbox').hide(); jQuery('div#loginbox').hide();jQuery('div#neo-search2').hide();jQuery('div#neoval').hide();jQuery('div#presentation-gen').show();">
                                    <span class="glyphicon glyphicon-home"></span><span class="title">Accueil</span>
                                </a>
                            </li>
                            <!-- neologismes valides -->
			    <li>
				<a href="#" id="neo-search2">
				   <span class="glyphicon glyphicon-search"></span><span class="title">Recherche</span>
				</a>
		        </li>
                <li>
                  <a href="#" id="neoval">
                     <span class="glyphicon glyphicon-eye-open"></span><span class="title">Néologismes récents</span>
                  </a>
                </li>

                <li>
                  <a href="#" id="neovaldemo">
                     <span class="glyphicon glyphicon-book"></span><span class="title">Analyse des néologismes</span>
                  </a>
                </li>
<!--			      <li>
                                <a href="#" id="neovalsynth">
                                    <span class="glyphicon glyphicon-signal"></span><span class="title">Synthèse</span>
                                </a>
                            </li>
-->
                            <!-- Connexion-->
                            <li>
                            	<a href="#" id="login2" onclick="jQuery('div#neovalsynth').hide();jQuery('div#signupbox').hide();jQuery('div#neoval').hide();jQuery('div#neovaldemo').hide();jQuery('div#neo-search2').hide(); jQuery('div#loginbox').show();jQuery('div#presentation-gen').hide();">
                            	<span class="glyphicon glyphicon-user"></span><span class="title">Connexion</span></a>
                            </li>
                                            <!--<li><a href="#" id="login3" onclick="jQuery('div#signupbox').show(); jQuery('div#loginbox').hide();jQuery('div#neo-search2').hide();jQuery('div#presentation-gen').hide();">Enregistrement</a>
                                            </li>-->
                        </ul>
                    </div>
                    <!-- /.navbar-collapse -->
                </nav>
            </div>
            <!-- Main Content -->
            <div class="container-fluid">
	   		<!-- search neologisms -->
                <div id="neo-search2" style="display:none;" class="side-body"></div>
            <!-- recent neologisms -->
            	<div id="neoval" style="display:none;" class="side-body"></div>
            <!-- recent neologisms -->
            	<div id="neovaldemo" style="display:none;" class="side-body"></div>
           <!-- synthesis neologisms -->
                <div id="neovalsynth" style="display:none;" class="side-body"></div>

            <!-- presentation generale -->
            <div id="presentation-gen" class="side-body">
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
                                            <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Contributeurs et Publications</a></li>
                                            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Tutoriels</a></li>
                                            <li role="presentation"><a href="#links" aria-controls="links" role="tab" data-toggle="tab">Liens</a></li>
                                        </ul>
                                        <!-- Tab panes -->
                                        <div class="tab-content">
<!-- présentation -->
<div role="tabpanel" class="tab-pane active" id="home">
<p>Ce projet collaboratif, financé pour trois ans (juin 2015 - juin 2018) par la COMUE Sorbonne Paris Cité, regroupe plusieurs laboratoires de Sorbonne-Paris-Cité (LIPN, LDI, CLILLAC-ARP, ERTIM), les acteurs du groupe EMPNEO et l'Université de São Paulo (USP).</p>
<p>Le projet vise à :</p>
<ul>
<li>mettre en place une plateforme multilingue de veille et de suivi des néologismes à partir de corpus contemporains de très grande taille dans sept langues (français, grec, polonais, tchèque -langues du groupe EmpNéo- portugais du Brésil, chinois et russe) ;</li>
<li>utiliser cette plateforme pour mener une étude des emprunts (notamment mais pas exclusivement anglicismes) dans différentes langues (français, grec, polonais, tchèque, portugais du Brésil, chinois et russe) ;</li>
<li>utiliser cette plateforme pour étudier la notion d'innovation sémantique et pour proposer de nouvelles procédures d’identification de nouveaux emplois ;</li>
</ul>
<div class="alert alert-info" role="alert">
Vous pouvez consulter les tutoriels vidéo présentant la plateforme et l'interface publique dans l'onglet "tutoriels".
</div>
<h2>Architecture générale</h2>
<p>L'architecture générale du système est présentée dans la figure 2. </p>
<img src="../lib/app/images/archi.png" width="50%" border="1" align="center"/>
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
<!-- publications -->
<div role="tabpanel" class="tab-pane" id="profile">

<div class="row">
  <div class="col-sm-12">
    <div class="sub-title"><strong>Contributeurs linguistiques</strong></div>
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Contributeurs</th>
      <th>Institution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Français</th>
      <td>Jean-François Sablayrolles(3), Emmanuel Cartier(1), Najet Boutmgharine(2), Massimo Bertocci(1), John Humbley(2), Natalie Kübler(2), Giovanni Tallarico (5), Christine Jacquet-Pfau(4)</td>
      <td>LIPN-RCN (UP13) (1), CLILLAC-ARP (UP7) (2), HTL (UP7) (3), Collège de France (4), Université de Vérone (5) </td>
    </tr>
    <tr>
      <th scope="row">Chinois</th>
      <td>Lichao Zhu (2017)</td>
      <td>Université Paris 13</td>
    </tr>


    <tr>
      <th scope="row">Grec</th>
      <td> Anna Anastassiadis-Symfonidis, Dimitra Alexandridou</td>
      <td>Université de Thessalonique (groupe EMPNEO)</td>
    </tr>
    <tr>
      <th scope="row">Italien</th>
      <td>Jana Altmanova (1), Claudio Grimaldi (1),  Silvia Zollo (1), Michela Murano (2), Maria-Teresa Zanolla (2) </td>
      <td>Université de Naples (1), Université Catholique de Milan (2)</td>
    </tr>

    <tr>
      <th scope="row">Polonais</th>
      <td>Alicja Kacprzak, Anna Bobińska et Andrzej Napieralski</td>
      <td>Instytut Romanistyki Uniwersytet Łódzki (groupe EMPNEO)</td>
    </tr>
    <tr>
      <th scope="row">Portugais (Brésil)</th>
      <td>Ieda Alvès</td>
      <td>Université de Sao Paulo</td>
    </tr>
    <tr>
      <th scope="row">Russe</th>
      <td>Tatiana Iakovleva (2017)</td>
      <td>CLILLAC-ARP (UP7)</td>
    </tr>


    <tr>
      <th scope="row">Tchèque</th>
      <td>Jan Lazar, Radka Mudrochova, Zuzana Hildenbrand</td>
      <td>groupe EMPNEO</td>
    </tr>

  </tbody>
</table>

   </div>
</div>
<!-- contributeurs info -->
<div class="row">
  <div class="col-sm-12">
    <div class="sub-title"><strong>Modélisation et développements informatiques</strong></div>
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>Contribution</th>
      <th>Institution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Emmanuel Cartier</th>
      <td>Coordinateur projet, développement back-end et front-end</td>
      <td>LIPN - RCLN (UP13)</td>
    </tr>


    <tr>
      <th scope="row">Gaël Lejeune (sept. 2016- sept. 2017)</th>
      <td>Développement du module de détection automatique des néologismes formels par machine learning</td>
      <td>LIPN - RCLN (UP13)</td>
    </tr>
    <tr>
      <th scope="row">Loïc Galand (nov. 2017-)</th>
      <td>Mise en oeuvre d'une chaîne de traitement permettant la détection de différentes informations linguistiques (projet Néonaute)</td>
      <td>LIPN - RCLN (UP13)</td>
    </tr>
  </tbody>
</table>

   </div>
</div>


<div class="row">
  <div class="col-sm-12">	
    <div class="sub-title"><strong>Présentation générale de Néoveille</strong></div>
	<div>
<p>Cartier, Emmanuel (2016), « Neoveille, système de repérage et de suivi des néologismes en sept langues », Neologica 10, p. 101-131. <u><a href="../docs/Neoveille_neo
logica2016.pdf" target="new">Pre-print</a></u> (ce document expose le projet à son démarrage. Pour une version récente, consulter l'article de 2018)</p>
<p>Cartier, Emmanuel (2017), Neoveille, <u><a href="https://www.aclweb.org/anthology/E/E17/E17-3024.pdf" target="new">a Web Platform for Neologism Tracking, Proceedi
ngs of the EACL 2017 Software Demonstrations, Valencia, Spain, April 3-7 2017.</a></u></p>
<p>Cartier, Emmanuel (2018, à paraître), « Neoveille, plateforme de détection, de repérage et de suivi des néologismes en dix langues », <u><a href="../docs/Neoveille_n
eologica2018.pdf" target="new">pdf</a></u></p>

	</div>
 </div>
 <div class="col-sm-12">
    <div class="sub-title"><strong>Etudes effectuées à partir de Néoveille</strong></div>
	<div> 
<p>Boutmgharine Idyassner, Najet (2016), « Les stratégies de glose sur l’emprunt en discours », Colloque Emprunts néologiques et équivalents autochtones. Mesure de leurs circulations respectives, Universytet Łódzki, 10-12 octobre 2016, Łódz, Pologne. http://neologie.uni.lodz.pl.</p>
<p>Tallarico Giovanni (2016), « Cinquante nuances de board : les anglicismes néologiques et leurs équivalents dans le domaine des sports de glisse ». Colloque Emprunts néologiques et équivalents autochtones. Mesure de leurs circulations respectives, Universytet Łódzki, 10-12 octobre 2016, Łódz, Pologne. http://neologie.uni.lodz.pl</p>
<p>Viaux Julie, Cartier Emmanuel (2016), <u><a href="../docs/cartier_viaux_20052017.pdf" target="new">« Étude linguistique et quantitative de la pénétration des anglicismes de type (N,ADJ)-Ving dans sept langues à partir d’un corpus contemporain journalistique »</a></u>, Colloque international Emprunts néologiques et équivalents autochtones. Mesure de leurs circulations respectives, Universytet Łódzki, 10-12 octobre 2016, Łódz, Pologne.</p>
<p>Lejeune Gaël, Cartier Emmanuel (2017), <u><a href="http://aclweb.org/anthology/W17-4103" target="new">Character Based Pattern Mining for Neology Detection</a></u>,Proceedings of the First Workshop on Subword and Character Level Models in NLP , EMNLP 2017, Copenhagen, p.25-30. </p>
<p>
Cartier E., Sablayrolles J.-F., Boutmgharine N., Humbley J., Bertocci M., Jacquet-Pfau C., Kübler N. et Tallarico G. (2018),<u><a href="https://www.shs-conferences.org/articles/shsconf/pdf/2018/07/shsconf_cmlf2018_08002.pdf" target="new"> « Détection automatique, description linguistique et suivi des néologismes en corpus : point d'étape sur les tendances du français contemporain » </a></u>, Actes du Congrès Mondial de Linguistique Française, Mons (Belgique), 9-13 juillet 2018, 20p.
</p>
<p>
Cartier E. (2018). « Emprunts en français contemporain : étude linguistique et statistique à partir de la plateforme Néoveille » dans Emprunts en question(s), Kacprzak, A. ; Mudrochová, R. ; Sablayrolles, J.-F. (éds), La Lexicothèque, Limoges, Lambert-Lucas, 27p. 
</p>
	</div>
</div>
</div> <!-- end row-->											

											
											
											</div>
<!-- tutoriels -->
<div role="tabpanel" class="tab-pane" id="messages">
<div class="row">
  <div class="col-sm-6">
    <div class="sub-title">Présentation vidéo de la plateforme Néoveille</div>
	<div>
		<video width="480" height="320" controls="controls">
  			<source src="../docs/neoveille-gen.m4v" type="video/mp4" />
			<source src="../docs/neoveille-gen.webm" type="video/webm" />
			<source src="../docs/neoveille-gen.ogv" type="video/ogg" />
			Votre navigateur ne prend pas en charge les formats vidéo proposés.
		</video>
	</div>
 </div>
 <div class="col-sm-6">
    <div class="sub-title">Présentation vidéo de l'interface publique</div>
	<div> 
		<video width="480" height="320" controls="controls">
  			<source src="../docs/neoveille-public.m4v" type="video/mp4" />
			<source src="../docs/neoveille-public.webm" type="video/webm" />
			<source src="../docs/neoveille-public.ogv" type="video/ogg" />
			Votre navigateur ne prend pas en charge les formats vidéo proposés.
		</video>
	</div>
</div>
</div> <!-- end row-->
                                    </div>                                        
<!-- tutoriels -->
<div role="tabpanel" class="tab-pane" id="links">
                                    </div>                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
<!-- loginbox et signupbox -->
<div id="loginbox" style="display:none;" class="side-body"> 
     <!-- div for login form -->
     <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">                    
            <div class="panel panel-info" >
                    <div class="panel-heading">
                        <div class="panel-title">Connexion</div>
                        <div style="float:right; font-size: 80%; position: relative; top:-10px"><a href="#">Mot de passe oublié?</a></div>
                    </div>     

                    <div style="padding-top:30px" class="panel-body" >

                        <div style="display:none" id="login-info" class="info col-sm-12"></div>
                        <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
             			<!-- form for login -->
             			<form id="loginform" class="form-horizontal" role="form">
                                    
                            <div style="margin-bottom: 25px" class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                        <input id="username" type="text" class="form-control" name="username" value="" placeholder="nom d'utilisateur">                                        
                                    </div>
                                
                            <div style="margin-bottom: 25px" class="input-group">
                                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                                        <input id="password" type="password" class="form-control" name="password" placeholder="mot de passe">
                                    </div>
                                    
                                <div style="margin-top:10px" class="form-group">
                                    <!-- Button -->
                                    <div class="col-sm-12 controls">
                                      <!--<a id="btn-login" href="#" class="btn btn-success">Connexion  </a>-->
                                      <button id="btn-login" type="button" class="btn btn-info">Connexion</button>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <div class="col-md-12 control">
                                        <div style="border-top: 1px solid#888; padding-top:15px; font-size:85%" >
                                           Si vous souhaitez obtenir un compte, merci de nous contacter à admin@neoveille.org<!-- Pas encore de compte! 
                                        <a href="#" onClick="$('#loginbox').hide(); $('#signupbox').show()">
                                            Enregistrez-vous ici
                                        </a>-->
                                        </div>
                                    </div>
                                </div>    
                            </form>     
            		</div>                     
            </div>  
    </div>
    <!-- div for signup form -->
    <div id="signupbox" style="display:none; margin-top:50px" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="panel-title">Enregistrement</div>
                            <div style="float:right; font-size: 85%; position: relative; top:-10px"><a id="signinlink" href="#" onclick="$('#signupbox').hide(); $('#loginbox').show()">Connexion</a></div>
                        </div>  
                        <div class="panel-body" >
                            <form id="signupform" class="form-horizontal" role="form" data-toggle="validator">
                                
                                <div id="signupalert" style="display:none" class="alert alert-danger">
                                    <p>Erreur:</p>
                                    <span></span>
                                </div>

                                <div class="form-group">
                                    <label for="username" class="col-md-3 control-label">Nom d'utilisateur</label>
                                    <div class="col-md-9">
                                    <!-- warning : same id as in loginform for username -->
                                        <input type="text" data-error="Ce nom d'utilisateur est déjà utilisé"  data-remote="ajaxLoginRegister.php?action=checkuser" class="form-control" id="username" name="username" placeholder="Nom d'utilisateur" required>
                                        <div class="help-block with-errors">Minimum de 5 caractères sans espace</div>
                                    </div>
                                </div>                                
                                  
                                <div class="form-group">
                                    <label for="email" class="col-md-3 control-label">Email</label>
                                    <div class="col-md-9">
                                        <input type="email" class="form-control" id="email" name="email" placeholder="Email" data-error="cet email est déjà utilisé"  data-remote="ajaxLoginRegister.php?action=checkemail" required>
                                        <div class="help-block with-errors">Pensez à saisir une adresse email valide</div>
                                    </div>
                                </div>
                                    
                                <div class="form-group">
                                    <label for="firstname" class="col-md-3 control-label">Prénom</label>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Prénom">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="lastname" class="col-md-3 control-label">Nom</label>
                                    <div class="col-md-9">
                                        <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Nom">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label for="password" class="col-md-3 control-label">Mot de passe</label>
                                    <div class="col-md-9">
                                        <input type="password" data-toggle="validator" data-minlength="5" class="form-control" id="passwd" name="passwd" placeholder="Mot de passe" required>
                                    	<div class="help-block">Minimum de 6 caractères</div>
                                    	<input type="password" class="form-control" id="passwordConfirm" data-match="#passwd" data-match-error="Les deux mots de passe ne sont pas identiques" placeholder="Confirmez le mot de passe" required>
							            <div class="help-block with-errors"></div>
                                    </div>
                                </div>
                                                  
                                <div class="form-group">
                                    <!-- Button -->                                        
                                    <div class="col-md-offset-3 col-md-9">
                                        <button id="signup" type="button" class="btn btn-info"><i class="icon-hand-right"></i> &nbsp Enregistrement</button>
                                    </div>
                                </div>
                                                                
                                
                                
                            </form>
                         </div>
                    </div>

               
               
                
         </div> 
    			</div>
	</div>
</div>
<!-- footer -->
        <footer class="app-footer">
            <div class="wrapper">
                <table border="0" width="100%">
                	<tr>
                		<td>&copy; Néoveille 2015-<?php echo date("Y"); ?></td>
                		<td><img src="../lib/app/images/idex.png" width="150px"/></td>
                		<td><img src="../lib/app/images/uspc.png" width="150px"/></td>
                		<td><img src="../lib/app/images/up13.png" width="150px"/></td>
                		<td><img src="../lib/app/images/up7.png" width="130px"/></td>
                		<td><img src="../lib/app/images/inalco.png" width="150px"/></td>
                		<td><img src="../lib/app/images/saopaulo.png" width="150px"/></td>
                		<td>groupe EMPNEO</td>
                	</tr>
                	<tr>
                	   <td colspan="3">&nbsp;</td>
                       <td><a href="https://lipn.univ-paris13.fr/fr/rcln-3" target="new"><img src="../lib/app/images/lipn.png" width="40px"/></a></td>
                		<td><a href="http://www.clillac-arp.univ-paris-diderot.fr" target="new"><img src="../lib/app/images/clillacarp.png" width="40px"/></a></td>
                		<td colspan="3">&nbsp;</td>
                	</tr>
                </table>

            </div>
        </footer>
        <div>
            <!-- Javascript Libs -->
            <script type="text/javascript" src="../lib/js/jquery.min.js"></script>
            <script type="text/javascript" src="../lib/js/bootstrap.min.js"></script>
            <script type="text/javascript" src="../lib/js/jquery.dataTables.columnFilter.js"></script>
            <script type="text/javascript" src="../lib/js/select2.full.min.js"></script>


			<!-- Datatables -->
			<script type="text/javascript" src="../lib/DataTables/datatables.min.js"></script>
			<script type="text/javascript" src="../lib/DataTables/DataTables-1.10.18/js/dataTables.bootstrap.min.js"></script>
			<script type="text/javascript" src="../lib/DataTables/Buttons-1.5.4/js/buttons.bootstrap.js"></script>
			<script type="text/javascript" src="../lib/DataTables/FixedHeader-3.1.4/js/fixedHeader.bootstrap.min.js"></script>
			<script type="text/javascript" src="../lib/DataTables/Responsive-2.2.2/js/responsive.bootstrap.min.js"></script>
			<script type="text/javascript" src="../lib/DataTables/Select-1.2.6/js/select.bootstrap.min.js"></script>

			<!-- Editor -->
            <script type="text/javascript" charset="utf-8" src="../lib/Editor/js/dataTables.editor.min.js"></script>
             <script type="text/javascript" charset="utf-8" src="../lib/Editor/js/editor.bootstrap.min.js"></script>

	   <!-- specifi buttons for saving to various formats -->
	    	<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
	    	<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
            <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.print.min.js"></script>
            <script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
	    	<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/buttons.colVis.min.js"></script>
 			<!--<script src='../lib/js/vfs_fonts.js'></script>-->
			
			<script src='../lib/js/jquery.blockUI.js'></script>



            <!-- Javascript for app -->
            <script type="text/javascript" src="../lib/app/app.js"></script>
            <!--<script type="text/javascript" src="../lib/app/menus.js"></script>-->



            <!-- Javascript -->
            	<script>

           var languageW = 'fr'; // just to have a working initial value

            	
			$(document).ready(function() {

// login action


$('#btn-login').click(function()
			{
			// retrieve username and password from form
			var username=$("form#loginform #username").val();
			var password=$("form#loginform #password").val();
		    //console.log('username='+username+'&password='+password+'&action=login');
		    //if username and password "exists", ajax call to ajaxLoginRegister to check validity
			if($.trim(username).length>0 && $.trim(password).length>0)
			{
				var request = $.ajax({
  					url: "./php/LoginRegister.php",
  					method: "POST",
  					data: { 'username' : username, 'password' : password, 'action' : 'login' },
  					success :  function(msg,status,xhr){
  						resp = JSON.parse(msg);
  						//console.log("Message : " + msg + "Status : " + status + " : " + xhr);
  						//console.log(resp[0]);
  						//console.log(resp[1])
						if (resp[0] == 'True'){
						//alert("OK for index.php")
							window.location = "index.php";
						}
						else{
							$("#login-info").show();
							$("#login-info").html('<div class="alert fresh-color alert-danger" role="alert">Message : ' + resp[1] + '</div>');
						}
  					},
  					error: function(xhr,status,error){
  						alert( "Request :" + xhr +  "status : " + status + " Error : " + error);
  					}
				});
			}
			else{
				$("#login-info").show();
				$("#login-info").html('<div class="alert fresh-color alert-danger" role="alert">Utilisateur ou mot de passe invalide</div>');			
			}
});
			
// signup (desactivated)	
$('#signup').click(function()
			{
			var username=$("form#signupform #username").val();
			var password=$("form#signupform #passwd").val();
			var firstname=$("form#signupform #firstname").val();
			var lastname=$("form#signupform #lastname").val();
			var email=$("form#signupform #email").val();
		    var dataString = 'username='+username+'&password='+password+'&firstname='+firstname+'&lastname='+lastname+'&email='+email+'&action=signup';
		    //alert(dataString)
			if($.trim(username).length>0 && $.trim(password).length>0)
			{
			$.ajax({
            type: "POST",
            url: "ajaxLoginRegister.php",
            data: dataString,
            cache: false,
            beforeSend: function(){$("#signup").val('Enregistrement en cours...');},
            success: function(data){
            //alert(data);
            if(data)
            {
            $('#loginbox').show(); $('#signupbox').hide();$("#login-info").show();
            $("#login-info").html('<div class="alert fresh-color alert-info" role="alert">'+data + '</div>');
//            $("body").load("../index.php").hide().fadeIn(1500).delay(6000);
            }
            else
            {
             /*$('#box').shake();*/
             $("#signup-alert").show();
			 $("#signup-alert").html('<div class="alert fresh-color alert-danger" role="alert">Utilisateur ou mot de passe invalide.</div>');
            }
            }
            });
			
			}
			return false;
			});		

// Néologismes récents	
$('#neoval').click(function()
			{
					//alert($("#container-fluid").html());
					jQuery('div#signupbox').hide(); 
					jQuery('div#loginbox').hide();
					jQuery('div#presentation-gen').hide();
					jQuery('div#neo-search2').hide();
					jQuery('div#neovalsynth').hide();
					jQuery('div#neovaldemo').hide();
					jQuery('div#neoval').show();
        	    	$("div#neoval").load("table/datatable-neologismes-demo.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

// Néologismes validés
$('#neovaldemo').click(function()
			{
					$.blockUI({ css: { 
            			border: 'none', 
            			padding: '15px', 
            			backgroundColor: '#000', 
            			'-webkit-border-radius': '10px', 
            			'-moz-border-radius': '10px', 
            			opacity: .5, 
            			color: '#fff' 
        			} });
					//alert($("#container-fluid").html());
					jQuery('div#signupbox').hide(); 
					jQuery('div#loginbox').hide();
					jQuery('div#presentation-gen').hide();
					jQuery('div#neo-search2').hide();
					jQuery('div#neovalsynth').hide();
					jQuery('div#neoval').hide();
					jQuery('div#neovaldemo').show();
        	    	$("div#neovaldemo").load("table/datatable-neo-db-dev-demo.php",function(responseTxt, statusTxt, xhr)
        	    	{
        	    	$.unblockUI();
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

// recherche
$('#neo-search2').click(function()
                        {
                    //alert($("#container-fluid").html());
                    jQuery('div#signupbox').hide(); 
                    jQuery('div#loginbox').hide();
                    jQuery('div#presentation-gen').hide();
                    jQuery('div#neoval').hide();
                    jQuery('div#neovaldemo').hide();
					jQuery('div#neovalsynth').hide();
					jQuery('div#neo-search2').show();
					var languageW ='fr';
                        $("div#neo-search2").load("table/datatable-search-demo.php",function(responseTxt, statusTxt, xhr)
                        {
                                if(statusTxt == "error")
                                alert("Error: " + xhr.status + ": " + xhr.statusText);
                                });
});

$('#neovalsynth').click(function()
                        {
                                        //alert($("#container-fluid").html());
                                        jQuery('div#signupbox').hide(); 
                                        jQuery('div#loginbox').hide();
                                        jQuery('div#presentation-gen').hide();
                                        jQuery('div#neoval').hide();
                                        jQuery('div#neovaldemo').hide();
                                        jQuery('div#neo-search2').hide();
					jQuery('div#neovalsynth').show();
                        $("div#neovalsynth").load("table/datatable-neo-db-dev-demo.php",function(responseTxt, statusTxt, xhr)
                        {
                                //if(statusTxt == "success")
                                //alert("External content loaded successfully!");
                                if(statusTxt == "error")
                                alert("Error: " + xhr.status + ": " + xhr.statusText);
                                });
});


					
			});
			
		</script>
</body>

</html>



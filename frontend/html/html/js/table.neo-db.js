
// fonction pour changer de langue source pour interface neologismes
$('body').on('change',"#langA",function(){
                val = this.value;
                //alert(val);
                $('#exampleNeo').DataTable().ajax.url("php/neo-db.php?lang="+val).load();
                editorNeo.ajax = "php/neo-db.php?lang="+val;
                editorNeo.s.ajax = "php/neo-db.php?lang="+val;
                editorNeo.lang = val;
            });


jQuery.support.cors = true;
var editorNeo; // use a global for the submit and return data rendering in the examples
$(document).ready(function() {
	editorNeo = new $.fn.dataTable.Editor( {
		ajax: "php/neo-db.php?lang=fr",
		table: "#exampleNeo",
//		title : "Fiche d'édition minimale. <br/><div class='editorNeo_details2'>Accès à la fiche complète</div>",
//		display: "envelope",
		fields: [
			{
				label: "Informations générales",
				name: "title1",
				type: "title"
			}, 			
		 	{	
				label: "Lexie&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.terme",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Forme canonique de la lexie</div>"
			},
			{
				label: "Langue&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name:"termes_copy.langue",
				type: "select",
				placeholder:"Sélectionnez une langue",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Langue du néologisme</div>"
			},
			{
				label: "Partie du discours&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.cat_synt",
				type: "select",
				placeholder:"Sélectionnez une partie du discours",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Partie du discours du néologisme</div>"
			}, 			
			/*{
				label: "<div tooltip='Classe sémantique discours du néologisme'>Partie du discours&nbsp;<span class='icon fa fa-info-circle'></span></div></a>",
				name: "termes_copy.cat_sem",
				type: "select",
				placeholder:"Sélectionnez une catégorie sémantique"
			}, */			
			{
				label: "Hyperclasse&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name:"termes_copy.hyperclass",
				type: "select",
				placeholder:"Sélectionnez une hyperclasse sémantique",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Hyperclasse sémantique du néologisme</div>"
			},
			{
				label: "Définition&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.definition",
				type: "textarea",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Définition succincte du néologisme</div>"
			},
			{
				label: "Notes&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.note",
				type: "textarea",
				group:"general",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Remarques complémentaires sur le néologisme</div>"
			}, 			
			{
				label: "Statut&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.statut",
				type: "select",
				placeholder:"Sélectionnez un statut",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Statut du néologisme, parmi les suivants : à compléter, incomplet, validé, refusé. Ces différentes catégories permettent de suivre une procédure pour valider les néologismes, notamment lorsqu&apos;on travaille à plusieurs.</div>"
			}, 						

			{
				label: "Informations sur le néologisme",
				name: "title2",
				type: "title"
			}, 			
			{
				label: "Matrice néologique&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.matrice_neo",
				type: "select",
				placeholder:"Sélectionnez une matrice néologique",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Type de néologisme. Pour obtenir les détails sur les différents types, cliquez <a href='matrice.pdf' target='matrice'>ici</a></div>"
			}, 			
			{
				label: "Config. phonologique détaillée&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.config_phonol_details",
				data: "termes_copy.terme",
				type: "text",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Configuration phonologique détaillée du néologisme. Découper la chaîne graphique au niveau des syllabes au moyen d&apos;un tiret. S&apos;il s&apos;agit d&apos;une composition comprenant un tiret entre les composants ajouter un espace avant et après.</div>"
				
			},
			{
				label: "Config. phonologique&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.config_phonol",
				type: "text",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Configuration phonologique du néologisme. Employer exclusivement les symboles O (pour syllabe ouverte) et F (pour syllabe fermée). N&apos;utiliser d&apos;espace entre les symboles que lorsque le néologisme est polylexical.</div>"
			},
			{
				label: "Config. morphologique détaillée&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.config_morpho_details",
				data: "termes_copy.terme",
				type: "text",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Configuration morphologique détaillée du néologisme. Découper la chaîne graphique au niveau des composants morphologiques au moyen d&apos;un tiret. S&apos;il s&apos;agit d&apos;une composition comprenant un tiret entre les composants ajouter un espace avant et après.</div>"
			},
			{
				label: "Config. morphologique&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.config_morpho",
				type: "text",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Configuration morphologique du néologisme. Employer exclusivement les symboles RAD (Radical), PRE(Préfixe) et SUFF (suffixe). Utiliser l&apos;espace entre les symboles seulement lorsque le néologisme est polylexical.</div>"
			},
			{
				label: "Lexie base&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name:"termes_copy.lexie_base",
				type: "text",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Lexie servant de base au néologisme</div>"
			},
			{
				label: "Catégorie lexie base&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.cat_lexie_base",
				type: "select",
				def:"Racine/Radical",
				//placeholder:"Sélectionnez la partie du discours de la lexie base",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Partie du discours de la lexie base.</div>"
			}, 			
			{
				label: "Transcatégorisation&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.transcat",
				type: "select",
				def:"Aucune",
				//placeholder:"Sélectionnez la transcatégorisation (def:Aucune)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Choisissez la transcatégorisation opérée entre la lexie base et le néologisme.</div>"
			},
			{
				label: "Influence langue&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.influence_langue",
				type: "select",
				def:"NA",
				//placeholder:"Sélectionnez la langue d'influence (def:NA)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Choisissez la langue ayant influencée la lexie</div>"
			},
			{
				label: "Mode d'influence&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.influence_mode",
				type: "select",
				def:"NA",
				//placeholder:"Sélectionnez le type d'influence (def:NA)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Choisissez le type d'influence ayant eu lieu.</div>"
			}
			/*{
				label: "Date:",
				name: "date",
				type: "datetime"
			}*/
		],
        i18n: {
            create: {
                button: "Nouveau",
                title:  "Créer nouvelle entrée",
                submit: "Créer"
            },
            edit: {
                button: "Modifier",
                title:  "Modifier entrée",
                submit: "Actualiser"
            },
            remove: {
                button: "Supprimer",
                title:  "Supprimer",
                submit: "Supprimer",
                confirm: {
                    _: "Etes-vous sûr de vouloir supprimer %d lignes?",
                    1: "Etes-vous sûr de vouloir supprimer 1 ligne?"
                }
            },
            /*error: {
                system: "Une erreur s’est produite, contacter l’administrateur système"
            },*/
            datetime: {
                previous: 'Précédent',
                next:     'Premier',
                months:   [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
                weekdays: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ]
            }
        }		
	} );

// New record
    $('a.editorNeo_create').on('click', function (e) {
        e.preventDefault();
 
        editorNeo.create( {
            title: 'Créer un nouveau néologisme',
            buttons: 'Add'
        } );
    } );
    
// Edit record
    $('#exampleNeo').on('click', 'td.editorNeo_edit', function (e) {
        e.preventDefault();
 
        editorNeo.edit( $(this).closest('tr'), {
            title: 'Editer un néologisme',
            buttons: 'Modifier'
        } );
        // set display = none to all DTE_Field_Info
        
        $('.DTE_Field_Info').hide();
        // tooltip for every label
		$(".infofield").on("click",function(){
		 //$(this).parents('.DTE_Field').find('.DTE_Field_Info').toggle();
			if($(this).hasClass('opened')){
				$(this).removeClass('opened');
				$(this).parents('.DTE_Field').find('.DTE_Field_Info').slideUp('fast')
			}else{
				closeAllInfos();
				$(this).addClass('opened');
				$(this).parents('.DTE_Field').find('.DTE_Field_Info').slideDown('fast');
			}
		});
	function closeAllInfos() {
		$('.infofield').removeClass('opened');
		$('.DTE_Field_Info').slideUp('fast');
	}	

/*		$(".DTE_Field").on("click",function(){
	  		$(this).find('.DTE_Field_Info').toggle();
		});*/
    } );
 
// Delete a record
    $('#exampleNeo').on('click', 'td.editorNeo_remove', function (e) {
        e.preventDefault();
 
        editorNeo.remove( $(this).closest('tr'), {
            title: 'Supprimer un néologisme',
            message: 'Etes-vous certain de vouloir supprimer cette entrée?',
            buttons: 'Delete'
        } );
    } );

 /* Activate an inline edit on click of a table cell  with classname editable*/
    $('#exampleNeo').on( 'click', 'tbody td.editable', function (e) {
        editorNeo.inline( this );
    } );

//Info
$('.info').click(function(ev) {
		ev.preventDefault();
		if($(this).hasClass('opened')){
			$(this).removeClass('opened');
			$(this).find('p.desc').slideUp('fast')
		}else{
			$(this).addClass('opened');
			$(this).find('p.desc').slideDown('fast')
		}
});
function closeAllInfos() {
		$('.info').removeClass('opened');
		$('p.desc').slideUp('fast');
}	


// filter for each column
$(document).ready( function () {
				$('#exampleNeo').dataTable().columnFilter({
					aoColumns: [ 
						{ sSelector: "#example_neo",type: "text", bRegex: true, bSmart: true },
						{ sSelector: "#example_type",type: "text"},
						{ sSelector: "#example_cat_synt",type: "text"},
						{ sSelector: "#example_cat_sem",type: "text"},
						{ sSelector: "#example_def",type: "text"},
						{ sSelector: "#example_configp",type: "text"},
						{ sSelector: "#example_configm",type: "text"},
						{ sSelector: "#example_auteur", type: "text" },
            			{ sSelector: "#example_statut", type: "text" }
					]
		});
} );



var table = $('#exampleNeo').DataTable( {
		dom: '<B>lfrtip',
		fixedHeader: true,
		scrollY: '150vh',
        scrollCollapse: true,
		ajax: "php/neo-db.php?lang=fr",
		lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		lengthChange: true,
		order: [[ 0, "asc" ]],
		select:true,
		columns: [
/*			{
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },*/

			{ data: "termes_copy.terme", name:"lexie", className: 'editable' },
			{ data:"matrice_neo_def.description", editField:"termes_copy.matrice_neo" ,name: "termes_copy.matrice_neo", className: 'editable' },
			{ data: "synt_cat_def.cat_synt", editField: "termes_copy.cat_synt", name: "termes_copy.cat_synt", className: 'editable' },

			{ data: "classe_def.classe", editField: "termes_copy.hyperclass", name: "termes_copy.hyperclass", className: 'editable' },
//			{ data: "sem_cat_def.valeur", editField: "termes_copy.cat_synt", name: "termes_copy.cat_sem", className: 'editable' },
			{ data: "termes_copy.definition", className: 'editable' },
			{ data: "termes_copy.config_phonol", className: 'editable' },
			{ data: "termes_copy.config_morpho", className: 'editable' },
			{ data: "termes_copy.auteur"},
			{ data: "statuts_def.statusdesc" , editField:"termes_copy.statut" , name: "termes_copy.statut" , className: 'editable'},
			// for child row
			{
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			// for child row 2
			{
                className:      'details-control2',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			{
                className:      'editorNeo_edit',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
            ,
			{
                className:      'editorNeo_remove',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
            ,
			{
                className:      'editorNeo_details2',
                orderable:      false,
                data:           null,
                defaultContent: ''
            }
/*			{
                data: null,
                className: "center",
                defaultContent: '<a href="" class="editorNeo_edit"></a> / <a href="" class="editorNeo_remove"></a>'
            }*/
		],
		select: {
            style:    'os',
            selector: 'td:first-child'
        },
		buttons: [
			{ extend: "create", editor: editorNeo },
			{ extend: "edit",   editor: editorNeo },
			{ extend: "remove", editor: editorNeo },
            //{ extend: 'colvis', text : "Colonnes"},
            {
                extend: 'collection',
                text: 'Exporter',
                exportOptions : {
            	rows : "{search:'applied'}"
            	/*rows : function ( idx, data, node ) {
            				console.log(user);
            				return true;
            				console.log(data);
        					return data.auteur === user;
//        					return data.auteur === user ? true : false;
        				}*/
        		}, 
                buttons: [
                    'copy',
                    'excel',
                    'csv',
                    { 
                    	extend : 'pdfHtml5', 
                    	orientation: 'landscape',
                    	footer:true,
                    	title : "Néoveille export results : www.neoveille.org",
                   		customize: function ( doc ) {
                   			var dt = new Date();
							var utcDate = dt.toLocaleDateString();
                   			doc.pageMargins = [ 40, 60, 40, 60 ];
                    		doc.footer = function(currentPage, pageCount) { return {text : currentPage.toString() + ' / ' + pageCount, alignment : 'center'} };
						    doc.header = function(currentPage, pageCount) {
    							return { text: 'www.neoveille.org : ' +  utcDate, alignment: 'center' };
    						};
						   //)
						}	
                    },
                    'print'
                ]
            }
			
		],
		language: {
            processing:     "Traitement en cours...",
            search:         "Rechercher&nbsp;:",
            lengthMenu:     "Afficher _MENU_ &eacute;l&eacute;ments",
            info:           "Affichage de l'&eacute;lement _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
            infoEmpty:      "Affichage de l'&eacute;lement 0 &agrave; 0 sur 0 &eacute;l&eacute;ments",
            infoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
            infoPostFix:    "",
            loadingRecords: "Chargement en cours...",
            zeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
            emptyTable:     "Aucune donnée disponible dans le tableau",
            paginate: {
                first:      "Premier",
                previous:   "Pr&eacute;c&eacute;dent",
                next:       "Suivant",
                last:       "Dernier"
            },
            aria: {
                sortAscending:  ": activer pour trier la colonne par ordre croissant",
                sortDescending: ": activer pour trier la colonne par ordre décroissant"
            }
        }		
		
	} );
	
// Add event listener for opening and closing details
$('#exampleNeo tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            formatajax(row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data ).show();
        	    tr.addClass('shown');
            }
            );
        }
    } );
    
// Add event listener for opening and closing details button 2 04/11/2016
$('#exampleNeo tbody').on('click', 'td.details-control2', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 		if (editorNeo.lang == undefined){editorNeo.lang='fr';}
        if ( row.child.isShown() ) {
            // This row is already open - close it
             //$("#corpusResultsFr").hide();
            row.child.hide();
            details = row.child()
            details.removeClass('shown');
            //details.removeClass('stat_res');
        }
        else {
            // Open this row
            //alert(row.data())
            get_neologism_stat(editorNeo.lang, row.data(), function(data)
            {
	            //alert(data)
    	        row.child(  data + " articles" ).show();
	            details = row.child()
        	    details.addClass('shown');
        	    details.addClass('stat_res');
            	if (typeof data == 'number'){
				    $('#corpusResults'+ editorNeo.lang).clone().appendTo('.stat_res td');
				    $("#corpusResults" + editorNeo.lang).show();
				}
        	    
            }
            );
        }
    } );
    
// Add event listener for opening and closing details
/*$('#exampleNeo tbody').on('click', '.editorNeo_details2', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        console.log(row.data());
       // alert(row.data().termes_copy.terme);
        $("#container-fluid").load("table/edit_neo.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
    } );*/
$('#exampleNeo tbody').on('click', '.editorNeo_details2', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
        console.log(row.data());
url = 'https://www.google.fr/search?hl=fr&as_q="'  + row.data().termes_copy.terme +'"'
//        url = 'https://news.google.com/?output=rss&hl=fr&gl=fr&scoring=o&num=100&q=' + row.data().termes_copy.terme ;
url2 = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=19&smoothing=3&content=' + row.data().termes_copy.terme;

        //alert(row.data().termes_copy.terme);
        window.open(url2,"_details");
    } );

//https://news.google.com/?output=rss&hl=fr&gl=fr&q=réseaux+sociaux&scoring=o&num=100


} );

//////////////   STATS FOR SPECIFIC NEOLOGISM 

// details 2
// ajax call to retrieve from apache solr the json data for the given language and given neologism 4/11/2016
function get_neologism_stat(lang,neo,callback) 
{
		//alert(d.lexie)
		console.log(neo);
		if (editorNeo.lang == undefined){editorNeo.lang='fr';}
		console.log(editorNeo.lang);
		var langues = {'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek','it':'rss_italian'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]);
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editorNeo.lang] + '/select',
        data:{  "q":'"' +neo.termes_copy.terme+ '"',
        		rows:1000,
        		fl:"dateS,source,link,subject,subject2, neologismes, country, contents",
        		"wt":"json",
        		//"df":"contents",
        		"indent":"false",
        		//"hl":"true",
        		//"hl.fl":"*",
        		//"hl.simple.pre":'<span style="background-color: #FFFF00">',
        		//"hl.simple.post":"</span>"
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
        async:false,
        success: function( result) {
        	//alert(JSON.stringify(result));
            docsdata =result.response.docs;/// main results
           // highlight = result.highlighting;
            //alert(highlight)
//            alert(docsdata);
            num = result.response.numFound;
            if (num == 0){
            	callback("Il n'y a pas de données disponibles pour ce néologisme pour cette langue actuellement. Réessayer plus tard. Vous pouvez consulter le corpus complet dans l'onglet 'Toutes les langues'.");
            }
            else{
	            callback(num);
	            build_corpus_info_lang(docsdata,lang, neo.termes_copy.terme);
	        }
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            res= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(res);
        }
    });
}

// call in case of ajax success : build the graphs
function build_corpus_info_lang(jsondata, lang, lexie){

console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
    	d.dtg   = dtgFormat.parse(d.dateS.substr(0,19));
 		d.newspaper   = d.source;
 		d.subject2= d.subject2;
    	d.subject  = d.subject;
    	d.article= d.link;
    	d.country= d.country
    	d.contents = d.contents
    	//alert(d.country)
    	//d.country= [48.856614, 2.352222]
    	if (d.neologismes == null)
    	{
      		//d.neolist   = "";
      		d.neocount=0;
    	}
    	else
    	{
    		d.neolist   = d.neologismes[0];
//    		d.neolist   = d.neologismes.join(", ");
    		d.neocount= d.neologismes.length;
    	}
  }); 
 console.log("Data Loaded");

/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll();
  

/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc-data-count'+lang);
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc-data-count2'+lang);
totalCount2 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
  
console.log("Count chart built"); 		   
console.log(totalCount);
/***************************** COUNTRY ROW BAR CHART ***********************/

var neoChart = dc.rowChart("#dc-neo-chart"+lang);

// neologismes dimensions : attention buggy as field = array!!!
var neoDim = facts.dimension(function(d){ return d.country;});
var neoGroup = neoDim.group().reduceCount(function(d) { return d.country; });


/// for top	
function remove_empty_bins_top(source_group) {
    function non_zero_pred(d) {
        return d.value != 0;
    }
    return {
        all: function () {
            return source_group.all().filter(non_zero_pred);
        },
        top: function(n) {
            return source_group.top(Infinity)
                .filter(non_zero_pred)
                .slice(0, n);
        }
    };
}
var neoGroupTop = remove_empty_bins_top(neoGroup);

// neo chart
	neoChart
			.width(350)
            .height(300)
            .dimension(neoDim)
            .group(neoGroupTop)
            .rowsCap(15)
            .othersGrouper(false)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            //.title(function(d){return d.key + ' (' + d.value + ')';})
            .renderLabel(true)
            .gap(0.1)
            //.renderTitleLabel(true)
            .ordering(function (d) {
    			return -d.value
			})
    		.elasticX(true)
		    .turnOnControls(true)
	        .controlsUseVisibility(true);		   


console.log("Neo chart built");
console.log(neoChart);


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart"+lang);

// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    return d3.time.day(d.dtg);
  });
	var volumeByMonth = facts.dimension(function(d) {
    return d3.time.month(d.dtg);
  });

  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Day groups :" + volumeByDayGroup.size());

  var volumeByMonthGroup = volumeByMonth.group()
    .reduceCount(function(d) { return d.dtg; });

    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].date;
 	var maxDate = volumeByDay.top(1)[0].date;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	.width(700)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    .renderArea(true)
    .dimension(volumeByMonth)
    .group(volumeByMonthGroup)
//    .dimension(volumeByDay)
//    .group(volumeByDayGroup)
    .transitionDuration(500)
    //.brushOn(true)
    .xyTipsOn(true) // incompatible with the preceding attribute
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return dtgFormat2(d.jsondata.key)
      + "\nTotal : " + d.jsondata.value;
      })
    //.yAxisLabel("Période temporelle")
    //.xAxisLabel("Nombre d'articles")
    .elasticY(true)
    .elasticX(true)
    .turnOnControls(true)
    .controlsUseVisibility(true)
//    .mouseZoomable(true)
    .x(d3.time.scale().domain([minDate, maxDate]))
    //.x(d3.time.scale().domain([new Date(2016, 6, 01), new Date()]))
    .xAxis();
  
  
  console.log("Time chart built");
  console.log(timeChart);
  
  /***************************** TIMELINE ***********************/

/***************************** SUBJECT PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var subjectChart = dc.pieChart("#dc-subject-chart"+lang);


//  subjectchart  dimensions
    var subjectDimension = facts.dimension(function (d) { return d.subject; });
    var subjectGroup = subjectDimension.group();
	console.log("Subject groups :" + subjectGroup.size());
  
// subject chart
 	subjectChart
 		.width(500)
        .height(250)
        .cx(300)
        .slicesCap(10)
        .ordering(function (d) {
    			return -d.value
			})
        .innerRadius(30)
        .externalLabels(30)
        .externalRadiusPadding(20)
        .minAngleForLabel(0.5)
        .drawPaths(true)
        .transitionDuration(500)
        .turnOnControls(true)
	    .controlsUseVisibility(true)
        .dimension(subjectDimension)
        .group(subjectGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("Subject chart built");
console.log(subjectChart);

/***************************** NEWSPAPER ROW BAR CHART ***********************/

var newspaperChart = dc.rowChart("#dc-newspaper-chart"+lang);
//var newspaperChartLow = dc.rowChart("#dc-newspaper-chart-low");

//  newspaperchart dimensions (with a fake group to keep just top and bottom 15
    var newspaperDimension = facts.dimension(function (d) { return d.newspaper; });
    //var newspaperDimensionless100 = facts.dimension(function (d) { return d.newspaper; }).filterRange([0, 100]);
    var newspaperGroup = newspaperDimension.group().reduceCount(function (d) { return d.newspaper; });
//    var newspaperTopGroup = newspaperGroup.top(15);

/// for top	
function remove_empty_bins(source_group) {
    function non_zero_pred(d) {
        return d.value != 0;
    }
    return {
        all: function () {
            return source_group.all().filter(non_zero_pred);
        },
        top: function(n) {
            return source_group.top(Infinity)
                .filter(non_zero_pred)
                .slice(0, n);
        }
    };
}

var newspaperGroupTop = remove_empty_bins(newspaperGroup);
//var newspaperGroupLow = remove_empty_bins_low(newspaperGroup);

console.log("newspaper groups :" + newspaperGroup.size());

// newspaper setup rowschart (TOP)
    newspaperChart
    		.width(500)
            .height(250)
            .dimension(newspaperDimension)
            .group(newspaperGroupTop)
            .rowsCap(10)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



// x axis label rotation  	: does not work	
newspaperChart.on("renderlet",function (chart) {
   // rotate x-axis labels
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)');
  });   



console.log("Newspapers chart built");
//console.log(newspaperChartLow);
console.log(newspaperChart);


/***************************** DATATABLES CHART ***********************/

// sauvegarde version limitée datatables
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");
 neolo = lexie.toString()
 console.log(neolo)

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return ""})
	//.size(10)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.country; },
      function(d) { return d.subject; },
      function(d) { return d.newspaper; },
      function(d) { return d.dtg; },
    //  function(d) { return '<a href=\"' + d.article + "\" target=\"_blank\">Article</a>";},
      function(d) {return highlight(d.contents.toString(),neolo) + '&nbsp;<a title=\"Voir l\'article complet\" href=\"' + d.article + "\" target=\"_blank\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a>";},
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);

function highlight(text, neo){
	
	var regexp = new RegExp( "(.{0,70})(" + neo.toString() + ")(.{0,70})", 'gi');
	console.log(text);
	console.log(typeof text);
	console.log(regexp);
	console.log(typeof regexp)
	var res = text.match(regexp);
	match = regexp.exec(text);
	var res = ''
	while (match != null){
		res = res + "<br/>..." + match[1] + "<mark>" + match[2] + "</mark>" + match[3] + "...";
		match = regexp.exec(text);
	}
	console.log(res);
	return res;
}    
    
console.log("Datatable chart built");
console.log(timeDimension);






/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
//    $("#corpusresults").show();
     //$("#corpusresults").css( "display", "visible !important");
	$("#corpusinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="corpusinfoBtn2Done">Chargement effectué</a>');
    // Render the Charts
  	dc.renderAll(); 

}


/// details 1
function formatajax(d,callback) 
{
		//alert(d.termes_copy.terme)
		if (editorNeo.lang == undefined){editorNeo.lang='fr';}
		var restable='';
		var langues = {'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editorNeo.lang] + '/select',
        data:{  q: '"'+d.termes_copy.terme+'"',
        		rows:20,
        		df:"contents",
        		wt:"json",
        		indent:"false",
        		"hl":"true",
        		"hl.fl":"*",
        		"hl.simple.pre":'<span style="background-color: #FFFF00">',
        		"hl.simple.post":"</span>"
        		},
        dataType: "jsonp",
        jsonp:'json.wrf',
        type:'GET',
        async:false,
        success: function( result) {
            data = result.highlighting;
            meta = result.response;
            num = meta.numFound;
            var thead = '<div>' + num + ' résultat(s)</div><th>Source</th><th>Extrait</th>',  tbody = '';
            for (var key in data) 
            {
                var resultRE = key.match(/^.{30}/);
//                var resultRE = key.match(/^.+\.(pl|com|fr|org|net)/);
                tbody += '<tr><td><a title="Voir la source" href="' + key + '" target="source">' + resultRE[0]+ '...</a></td><td>';
                var cts = data[key].contents;
                for (var extr in cts)
                {
                	tbody += "..." + cts[extr] +'...<br/>' ;
                }
                //alert(JSON.stringify(data)); 
                tbody += '</td></tr>';
                //$.each(data, function (i, d) {
            	//   tbody += d[i].contents +'<br/>' ;
            	 //  });

            tbody += '</td></tr>';


            }
             //   $.each(data, function (i, d) {
            //	   tbody += d.contents +'<br/>' ;
            //	   });

           // tbody += '</td></tr>';
            restable = '<table width="100%">' + thead + tbody + '</table>';
            callback(restable);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(restable)
        }
    });
	//return restable;
}

// gestion childrow
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Lexie</td>'+
            '<td>'+d.lexie+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Type</td>'+
            '<td>'+d.type+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}


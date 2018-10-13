console.log("Working Language : " + languageW);
// fonction pour changer de langue source pour interface neologismes
$('body').on('change',"#langA",function(){
                val = this.value;
                console.log(val);
                $('#exampleNeo').DataTable().ajax.url("php/neo-db_srv.php?lang="+val).load();
                editorNeo.ajax = "php/neo-db_srv.php?lang="+val;
                editorNeo.s.ajax = "php/neo-db_srv.php?lang="+val;
                editorNeo.lang = val;
            });


jQuery.support.cors = true;
var editorNeo; // use a global for the submit and return data rendering in the examples
$(document).ready(function() {
editorNeo = new $.fn.dataTable.Editor( {
		ajax: {url:"php/neo-db_srv.php?lang="+languageW,type:"POST"},
//                ajax: "php/neo-db.php?lang="+languageW,

		table: "#exampleNeo",
		lang:languageW,
//		title : "Fiche d'édition minimale. <br/><div class='editorNeo_details2'>Accès à la fiche complète</div>",
//		display: "envelope",
/*		formOptions: {
        		inline: {
				submit: 'changed'
        		}
    		},
*/
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
				def:1,
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
				def:13,
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
                                label: "Date 1ère occurrence&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
                                name: "termes_copy.date_first_occ",
                                type: "datetime",
				//def:   function () { return new Date(); }
//                                fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Type de néologisme. Pour obtenir les détails sur$
                        },                      

			{
				label: "Config. phonologique détaillée&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.config_phonol_details",
//				def: function(){return editorNeo.val('termes_copy.terme');},
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
//				def: function(){console.log(editorNeo.val('termes_copy.terme'));return editorNeo.val('termes_copy.terme');},
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
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Lexie servant de base au néologisme, séparation par virgule si plusieurs.</div>"
			},
			{
				label: "Catégorie lexie base&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.cat_lexie_base",
				type: "select",
				def:11,
				//placeholder:"Sélectionnez la partie du discours de la lexie base (def:Racine/radical)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Partie du discours de la lexie base (défaut : Racine/Radical).</div>"
			}, 			
			{
				label: "Transcatégorisation&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.transcat",
				type: "select",
				def:13,
				//placeholder:"Sélectionnez la transcatégorisation (def:aucune)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Choisissez la transcatégorisation opérée entre la lexie base et le néologisme (défaut : aucune).</div>"
			},
			{
				label: "Influence langue&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.influence_langue",
				type: "select",
				def:"__",
				//placeholder:"Sélectionnez la langue d'influence (def:aucune)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Choisissez la langue ayant influencée la lexie (défaut : aucune).</div>"
			},
			{
				label: "Mode d'influence&nbsp;<span id='infofield' class='icon fa fa-info-circle infofield'></span>",
				name: "termes_copy.influence_mode",
				type: "select",
				def:"NA",
				//placeholder:"Sélectionnez le type d'influence (def.:NA)",
				fieldInfo:"<div class='alert alert-info alert-dismissible' role='alert'>Choisissez le type d'influence ayant eu lieu (défaut : Non applicable - NA).</div>"
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

editorNeo.lang=languageW;

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


// Activate an inline edit on click of a table cell  with classname editable
/*    $('#exampleNeo').on( 'click', 'tbody td.editable', function (e) {
        editorNeo.inline( this, {
		submit:"changed",
                submitOnBlur: true,
		onFieldError:"focus"
        } );
    } );

*/
// Activate the bubble editor on click of a table cell
/*    $('#exampleNeo').on( 'click', 'tbody td:not(:first-child)', function (e) {
        editorNeo.bubble( this );
    } );
*/
/*
$('#exampleNeo').on( 'click', 'tbody td', function () {
    editorNeo.inline( this );
} );
*/
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


// Setup - add a text input to each header cell
$('#exampleNeo thead tr:eq(1) th').each( function () {
	title = $(this).text();
	if (title.length > 0){
        $(this).html( '<input type="text" class="column_search form-control" style="width:5vw" placeholder="'+title+'"  />' ); // form-control-sm"  
	}
	else{
        $(this).html( '&nbsp;' );  	
	}
    } );

var table = $('#exampleNeo').DataTable( {
		dom: '<B>lrtip',
		fixedHeader: true,
		scrollY: '200vh',
        	scrollCollapse: true,
		orderCellsTop: true,
		processing:true,
		serverSide:true,
		search: {regex: true},
                ajax:{url:"php/neo-db_srv.php?lang="+languageW,type:"POST"},
		lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		lengthChange: true,
		order: [[ 7, "desc" ]],
		select:true,
		columns: [
/*			{
                data: null,
                defaultContent: '',
                className: 'select-checkbox',
                orderable: false
            },*/

                        { data: "termes_copy.terme" },
                        { data:"matrice_neo_def.description", editField:"termes_copy.matrice_neo" ,name: "termes_copy.matrice_neo", className: 'editable',
                          render: function ( data, type, row ) {
                                        //console.log(data);
                                        //console.log(type);
                                        //console.log(row);
                                return row.termes_copy.matrice_neo + ' ('+ data + ')';}
                        },
                        { data: "synt_cat_def.cat_synt", editField: "termes_copy.cat_synt", name: "termes_copy.cat_synt", className: 'editable',
                          render: function ( data, type, row ) {
                                        //console.log(data);
                                        //console.log(type);
                                        //console.log(row);
                                return data;}
 			},

                        { data: "classe_def.classe", editField: "termes_copy.hyperclass", name: "termes_copy.hyperclass", className: 'editable' ,
                          render: function ( data, type, row ) {
                                        //console.log(data);
                                        //console.log(type);
                                        //console.log(row);
                                return data;}

			},
//                      { data: "sem_cat_def.valeur", editField: "termes_copy.cat_synt", name: "termes_copy.cat_sem", className: 'editable' },
                        { data: "termes_copy.lexie_base", name: "termes_copy.lexie_base", className: 'editable' },
                        { data: "termes_copy.config_morpho", className: 'editable' },
                        { data: "termes_copy.config_morpho_details", className: 'editable' },
                        { data: "termes_copy.frequency"},
                       { data: "termes_copy.date_first_occ", className: 'editable' },
                        { data: "termes_copy.auteur"},
                          { data: "termes_copy.note", className: 'editable' },
                      { data: "statuts_def.statusdesc" , editField:"termes_copy.statut" , name: "termes_copy.statut" , className: 'editable'},
			// for child row
			{
                className:      'details-control',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },
			// for child row 2
		/*	{
                className:      'details-control2',
                orderable:      false,
                data:           null,
                defaultContent: ''
            },*/
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
                        { extend: 'colvis', text : "Affichage", editor:editorNeo},
			{ extend: "create", editor: editorNeo },
			{ extend: "edit",   editor: editorNeo },
			{ extend: "remove", editor: editorNeo },
//            		{ extend: 'colvis', text : "Colonnes"},
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


// Apply the search
//    $( '#exampleNeo thead').on( 'keyup', ".column_search",function () {
    $( 'input.column_search').on( 'keyup',function () {
    	//columindex = $(this).parent().index();
    	//columnvalue = columindex.value;
   		console.log("["+this.value+"]");
        table
            .column( $(this).parent().index() )
            .search( this.value ,true, false) //
            .draw();
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
$('#exampleNeo tbody').on('click', 'td.details-control2_bk', function () {
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


//} );

// interactive visualization of retrieved contexts from neoveille for given word
$('#exampleNeo tbody').on('click', 'td.details-control2', function () {
	console.log("here i am");
        var tr = $(this).closest('tr');
        var row = table.row( tr );
	console.log(row.data());
 	if (editorNeo.lang == undefined){editorNeo.lang='fr';}
        if ( row.child.isShown() ) {
            row.child.hide();
            details = row.child()
            details.removeClass('shown');
        }
        else {
            // Open this row
            console.log(row.data())
            get_neo_info_mysqldata(editorNeo.lang, row.data(), function(data) // from mysql
            {
	            //alert(data)
    	        row.child(  data ).show();
	            details = row.child()
        	    details.addClass('shown');
        	    details.addClass('stat_res');
            	if (typeof data == 'number'){
				    $('#neoResults'+ editorNeo.lang).clone().appendTo('.stat_res td');
				    $("#neoResults" + editorNeo.lang).show();
				}
        	    
            }
            );
        }
    } );

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
		var langues = {'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek','it':'rss_italian','de':'rss_german','nl':'rss_netherlands'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]);
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editorNeo.lang] + '/select',
//        url:'http://localhost:8983/solr/' + langues[editorNeo.lang] + '/select',
        data:{  "q":'"' +neo.termes_copy.terme+ '"',
        		rows:1000,
			debug:"true",
			sort:"dateS asc",
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
	    rawquery = result.debug.parsedquery_toString;
            if (num == 0){
            	callback("Il n'y a pas de données disponibles pour ce néologisme pour cette langue actuellement. Réessayer plus tard. Vous pouvez consulter le corpus complet dans l'onglet 'Toutes les langues'.");
            }
            else{
	            callback(num);
	            build_corpus_info_lang(docsdata,lang, neo.termes_copy.terme,rawquery);
	        }
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            res= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(res);
        }
    });
}


function highlight_neo_stat(text, neo,rawquery){
	
	if (neo.indexOf('-')> -1){
	  neo = neo.replace(/-/g,'.?');
//	  rawquery = rawquery.replace(/^.+\((.+?) .+$/,"$1");
	  rawquery = rawquery.replace(/-/g,'.');
	}
	// with exact neo form
	regexpstr = '(.{0,70})\\b(' + neo.toString() + ")(.{0,70})";
	var regexp = new RegExp( regexpstr, 'gi');
	//console.log("Neologism regexp : " +regexpstr);
	match = text.match(regexp);
	var res = ''
	// with rawquery
	if (match == null){
		regexpstr = '(.{0,70})\\b(' + rawquery.toString() + ")(.{0,70})";
	//	console.log("Raw query regexp : "+regexpstr);
		var regexp = new RegExp( regexpstr, 'gi');
		while ((match = regexp.exec(text))!== null){
			res = res + "<br/>..." + match[1] + "<span style='background-color: #ffa366'>" + match[2] + "</span>" + match[3] + "...";
			//match = regexp.exec(text);
		}	

	}
	else {
		while ((match = regexp.exec(text))!= null){
			res = res + "<br/>..." + match[1] + "<span style='background-color: #FFFF00'>" + match[2] + "</span>" + match[3] + "...";
			//match = regexp.exec(text);
		}	
	}
	return res;
} 


// call in case of ajax success : build the graphs
function build_corpus_info_lang(jsondata, lang, lexie,rawquery){

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
    	/*if (d.neologismes == null)
    	{
      		//d.neolist   = "";
      		d.neocount=0;
    	}
    	else
    	{
    		d.neolist   = d.neologismes[0];
//    		d.neolist   = d.neologismes.join(", ");
    		d.neocount= d.neologismes.length;
    	}*/
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
            .rowsCap(10)
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
var periodChart = dc.barChart("#range-chart"+lang);

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
	console.log("Month groups :" + volumeByMonthGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].dtg;
 	var maxDate = volumeByDay.top(1)[0].dtg;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	//.width(700)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    //.renderArea(true)
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .mouseZoomable(true)
    .brushOn(false)
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return dtgFormat2(d.key)
      + "\nTotal : " + d.value;
      })
    .elasticY(true)
    .rangeChart(periodChart)
    .xUnits(d3.time.day)
    .renderHorizontalGridLines(true)    
    .x(d3.time.scale().domain([minDate, maxDate]))
    .xAxis();


  
  console.log("Time chart built");
  console.log(timeChart);
  
/******************  range chart **************/
periodChart /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)
        .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByDay)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);

  
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
      function(d) {return highlight_neo_stat(d.contents.toString(),neolo,rawquery.substring(9).replace(/^.+\((.+?) .+$/,"$1")) + '&nbsp;<a title=\"Voir l\'article complet\" href=\"' + d.article + "\" target=\"_blank\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></a>";},
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);

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


// call in case of ajax success : build the graphs
function build_corpus_info_lang_bk(jsondata, lang, lexie){

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
    //.renderArea(true)
    .dimension(volumeByMonth)
    .group(volumeByMonthGroup)
//    .dimension(volumeByDay)
//    .group(volumeByDayGroup)
    .transitionDuration(500)
    .mouseZoomable(true)
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
  // Create dataTable dimension
  var neoDimension = facts.dimension(function (d) {
    return d.neo;
  });
  var neoGroup = neoDimension.group();
  console.log("Neo groups :" + neoGroup.size());
   
  console.log("Dimensions created");
 neolo = lexie.toString()
 console.log(neolo)

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(neoDimension)
	.group(neoGroup)
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
//	$("#corpusinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="corpusinfoBtn2Done">Chargement effectué</a>');
    // Render the Charts
  	dc.renderAll(); 

}


/// details 1

function formatajax(d,callback) 
{
		console.log(d);
		if (editorNeo.lang == undefined){editorNeo.lang='fr';}
		var restable='';
		var langues = {'it':"rss_italian",'fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
        var request= $.ajax({
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editorNeo.lang] + '/select',
        data:{  q: '"'+d.termes_copy.terme+'"',
        		rows:100,
//        		fl:'contents,ttf(contents,"'+ d.termes_copy.terme + '")',
        		df:'contents',
			sort:"score desc",
			sort:"dateS asc",
        		debug:"true",
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
        success: function( result) {
        	console.log(result);
            data = result.highlighting;
            meta = result.response;
            docs = result.response.docs;
            rawquery = result.debug.parsedquery_toString;
            num = meta.numFound;
	    console.log(num);
            totalocc=0;
            totaldoc=0;
            var tbody = '';
            for (var key in docs) 
            {
             	console.log(key);
             	res = highlight_neo(docs[key].contents[0], d.termes_copy.terme,rawquery.substring(9).replace(/^.+\((.+?) .+$/,"$1"));
             	if (res[1] > 0){
             		totaldoc = totaldoc + 1;
             		totalocc = totalocc + res[1];
             		var link = docs[key].link.substring(0,30);
                	var dateL = docs[key].dateS.substring(0,10);
                	tbody += '<tr><td>' + dateL + '</td><td><a title="Voir la source" href="' + docs[key].link + '" target="source">' + link+ '...</a></td><td>';
             		tbody+=res[0];
             	    tbody += '</td></tr>';
             	}
            }
            var thead = '<div>' + totalocc + ' occurrences(s) dans ' + totaldoc + ' article(s). Recherche limitée à 100 articles.  Requête étendue : "' + rawquery.substring(9).replace(/^.+\((.+?) .+$/,"$1") + '"</div><th>Date</th><th>Source</th><th>Extrait</th>';
            restable = '<table width="100%">' + thead + tbody + '</table>';
            callback(restable);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            callback(restable)
        }
    });
}







function highlight_neo(text, neo,rawquery){
	
	if (neo.indexOf('-')> -1){
	  neo = neo.replace(/-/g,'.?');
//	  rawquery = rawquery.replace(/^.+\((.+?) .+$/,"$1");
	  rawquery = rawquery.replace(/-/g,'.');
	  console.log(neo);
	  console.log(rawquery);
	}
	var nbmatch = 0;
	// with exact neo form
	regexpstr = '(.{0,70})(\\b' + neo.toString() + ")(.{0,70})";
	console.log(regexpstr);
	var regexp = new RegExp( regexpstr, 'gi');
	//console.log(text);
	//console.log(typeof text);
	//console.log(regexp);
	//console.log(typeof regexp)
	match = text.match(regexp);
	var res = ''
	// with rawquery
	if (match == null){
		regexpstr = '(.{0,70})(\\b' + rawquery.toString() + ")(.{0,70})";
		console.log(regexpstr);
		var regexp = new RegExp( regexpstr, 'gi');
		//console.log(text);
		//console.log(typeof text);
		//console.log(regexp);
		//console.log(typeof regexp)
		while ((match = regexp.exec(text))!== null){
			nbmatch = nbmatch + 1;
			res = res + "<br/>..." + match[1] + "<span style='background-color: #ffa366'>" + match[2] + "</span>" + match[3] + "...";
			//match = regexp.exec(text);
		}	

	}
	else {
		while ((match = regexp.exec(text))!= null){
			nbmatch = nbmatch + 1;
			res = res + "<br/>..." + match[1] + "<span style='background-color: #FFFF00'>" + match[2] + "</span>" + match[3] + "...";
			//match = regexp.exec(text);
		}	
	}
	console.log(res);
	console.log(nbmatch);
//	return res + "<br/>" + text;
	return [res,nbmatch];
}    





function formatajax_bk(d,callback) 
{
		//alert(d.termes_copy.terme)
		if (editorNeo.lang == undefined){editorNeo.lang='fr';}
		var restable='';
		var langues = {'it':'rss_italian','fr':"rss_french", 'pl':"RSS_polish", 'br':'RSS_brasilian', 'ch':'RSS_chinese', 'ru':'RSS_russian', 'cz':'RSS_czech', 'gr':'RSS_greek'};
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
        url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[editorNeo.lang] + '/select',
//        url:'http://localhost:8983/solr/' + langues[editorNeo.lang] + '/select',
        data:{  q: '"'+d.termes_copy.terme+'"',
        		rows:20,
        		df:"contents",
			sort:"dateS asc",
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




////////////////////// global stats for neologism by language
$("#neoinfoBtnFr").on('click',function(){
console.log("launching synthesis for french");
	$("#neoinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (français)...</a>');
    get_neo_info_jsondata2('Fr', function(data)
            {
		console.log(typeof(data));
            	if (typeof data == 'number'){
					$("#neoinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsFr").show();
				}
				else{
					$("#neoinfoBtnFr").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnFr2"></i>' + data + '</a>');				
				}
            }
            );
});

$("#neoinfoBtnRu").on('click',function(){
	$("#neoinfoBtnRu").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnRu"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (russe)...</a>');
    get_neo_info_jsondata2('Ru', function(data)
            {
		console.log(typeof(data));
            	if (typeof data == 'number'){
					$("#neoinfoBtnRu").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnRu"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsRu").show();
				}
				else{
					$("#neoinfoBtnRu").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnRu2"></i>' + data + '</a>');				
				}
            }
            );
});

$("#neoinfoBtnCh").on('click',function(){
	$("#neoinfoBtnCh").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnCh"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (chinois)...</a>');
    get_neo_info_jsondata2('Ch', function(data)
            {
		console.log(typeof(data));
            	if (typeof data == 'number'){
					$("#neoinfoBtnCh").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnCh"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsCh").show();
				}
				else{
					$("#neoinfoBtnCh").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnCh2"></i>' + data + '</a>');				
				}
            }
            );
});

$("#neoinfoBtnIt").on('click',function(){
	$("#neoinfoBtnIt").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnIt"><i class="fa fa-circle-o-notch fa-spin"></i> Chargement des données (russe)...</a>');
    get_neo_info_jsondata2('It', function(data)
            {
		console.log(typeof(data));
            	if (typeof data == 'number'){
					$("#neoinfoBtnIt").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnIt"><i class="fa fa-circle-o-notch fa-spin"></i> Récupération des données effectuées : ' + data + ' néologismes. Création des graphes en cours...</a>');
				    $("#neoResultsIt").show();
				}
				else{
					$("#neoinfoBtnIt").replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtnIt2"></i>' + data + '</a>');				
				}
            }
            );
});

// ajax call to retrieve from apache solr the json data for the given language
function get_neo_info_jsondata2(lang,callback) 
{
		var langues = {'It':"it_neo.tsv",'Fr':"fr_neo.tsv", 'Pl':"pl_neo.tsv", 'Br':'br_neo.tsv', 'Ch':'ch_neo.tsv', 'Ru':'ru_neo.tsv', 'Cz':'cz_neo.tsv', 'Gr':'gr_neo.tsv'};
		//alert(langues[d.RSS_INFO.ID_LANGUE]); langues[lang]
		file = "data/" + langues[lang]
		console.log(file);
		console.log(d3.version);
		d3.csv(file,function(error,data){
		if (error) {console.log("Error:"+error);throw error;}
		
    	console.log(data[0]);
    	if (data[0] == undefined){console.log("Aucune donnée");return "Aucune donnée dans cette langue.";}
    	//console.log(data[1]);
//	    if (lang == 'Fr'){
	        console.log("build_corpus_info_lang_cnt2 function")
	        build_corpus_info_lang_cnt2(data,lang);
//	        }
//	    else{
//	        console.log("build_corpus_info_lang function")
	        //build_corpus_info_lang(docsdata,lang);
//	        }	           
//	    }
    });
}

// call in case of ajax success to build the graph (with country info)
function build_corpus_info_lang_cnt(jsondata, lang){

console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  
  jsondata.forEach(function(d) { 
  		
  		if (d.date.length!=20){console.log(d.date);}
    	//d.dtg   = dtgFormat.parse(d.dateS);
    	d.dtg   = dtgFormat.parse(d.date.substr(0,19));
 		d.newspaper   = d.source;
 		d.subject2= d.subject2;
 		d.country  = d.country;
    	d.subject  = d.subject;
        d.article= d.link;
        d.neo = d.neo;
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
/***************************** NEO ROW BAR CHART ***********************/

var neoChart = dc.pieChart("#dc-neo-chart"+lang);

//  countrychart  dimensions
    var neoDimension = facts.dimension(function (d) { return d.matrice; });
    var neoGroup = neoDimension.group();
	console.log("Neo types groups :" + neoGroup.size());

 	neoChart
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
        .dimension(neoDimension)
        .group(neoGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));

console.log("Neo chart built");
console.log(neoChart);




/***************************** COUNTRY PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var countryChart = dc.pieChart("#dc-country-chart"+lang);


//  countrychart  dimensions
    var countryDimension = facts.dimension(function (d) { return d.country; });
    var countryGroup = countryDimension.group();
	console.log("Country groups :" + countryGroup.size());
  
// country chart
 	countryChart
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
        .dimension(countryDimension)
        .group(countryGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("country chart built");
console.log(countryChart);


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart"+lang);

// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    //return d3.time.day(d.dtg);
    return d3.time.week(d.dtg)
  });
  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Day groups :" + volumeByDayGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].date;
 	var maxDate = volumeByDay.top(1)[0].date;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	.width(1000)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    //.dotRadius(5) //
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
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
    .renderHorizontalGridLines(true)
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


/***************************** category PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var categoryChart = dc.pieChart("#dc-category-chart"+lang);


//  categorychart  dimensions
    var categoryDimension = facts.dimension(function (d) { return d.category; });
    var categoryGroup = categoryDimension.group();
	console.log("category groups :" + categoryGroup.size());
  
// category chart
 	categoryChart
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
        .dimension(categoryDimension)
        .group(categoryGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("category chart built");
console.log(categoryChart);

/***************************** NEWSPAPER ROW BAR CHART ***********************/

var neooccChart = dc.rowChart("#dc-neoocc-chart"+lang);

//  neooccchart dimensions (with a fake group to keep just top and bottom 15
    var neooccDimension = facts.dimension(function (d) { return d.neo; });
    //var neooccDimensionless100 = facts.dimension(function (d) { return d.neoocc; }).filterRange([0, 100]);
    var neooccGroup = neooccDimension.group().reduceCount(function (d) { return d.neo; });
//    var neooccTopGroup = neooccGroup.top(15);

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

var neooccGroupTop = remove_empty_bins(neooccGroup);
//var neooccGroupLow = remove_empty_bins_low(neooccGroup);

console.log("neoocc groups :" + neooccGroup.size());

// neoocc setup rowschart (TOP)
    neooccChart
    		.width(500)
            .height(250)
            .dimension(neooccDimension)
            .group(neooccGroupTop)
            .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



// x axis label rotation  	: does not work	
neooccChart.on("renderlet",function (chart) {
   // rotate x-axis labels
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)');
  });   



console.log("neooccs chart built");
//console.log(neooccChartLow);
console.log(neooccChart);


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
//// for low
/*function remove_empty_bins_low(source_group) {
    function non_zero_pred(d) {
        return d.value != 0;
    }
    return {
        all: function () {
            return source_group.all().filter(non_zero_pred);
        },
        bottom: function(n) {
            return source_group.bottom(Infinity)
                .filter(non_zero_pred)
                .slice(0, n);
        }
    };
}*/
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

/*var table = $('#exampleNeo').DataTable( {
		dom: '<B>lfrtip',
		fixedHeader: true,
		scrollY: '150vh',
        scrollCollapse: true,
		lengthMenu: [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Tous"]],
		lengthChange: true,
		order: [[ 0, "asc" ]],
		select:true,
		
	} );*/



// sauvegarde version limitée datatables
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return "Données"})
	.size(25)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.neo; },
      function(d) { return d.matrice; },
      function(d) { return d.country; },
      function(d) { return d.subject; },
      function(d) { return d.subject2; },
      function(d) { return d.category; },
      function(d) { return d.date; },
      function(d) { 
          return '<a href=\"' + d.neo + "\" target=\"_blank\">Details</a>"}
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);
    
console.log("Datatable chart built");
console.log(timeDimension);


/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
    $("#neoResults"+lang).show();
    $("#neoResults"+lang).css( "display", "visible !important");
	$("#neoinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtn2Done">Chargement effectué. ' + jsondata.length + ' occurrences de néologismes</a>');
    // Render the Charts
  	dc.renderAll(); 

}


// new version with datatable
function build_corpus_info_lang_cnt2(jsondata, lang){
console.log(lang);
console.log(jsondata[0]);

//lang='Fr'; // just to keep just one zone for display

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormatM = d3.time.format("%Y-%m-%d");
  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat2 = d3.time.format("%a %e %b %H:%M");
  var dtgFormat2M = d3.time.format("%b %a");
  
  jsondata.forEach(function(d) { 
  		
  		//if (d.date.length!=10){console.log("Date length problem");console.log(d.date);}
    		if (d.date.length!=10 ||  d.date == null || d.date ==""){console.log(d);delete(jsondata[d]);}
		//d.dtg   = dtgFormatM.parse(d.dateS);
		//console.log(d.date);
    		d.dtg   = dtgFormatM.parse(d.date);
// 		d.newspaper   = d.source;
// 		d.subject2= d.subject2;
// 		d.country  = d.country;
//    	d.subject  = d.subject;
//        d.article= d.link;
//        d.neo = d.neo;
  }); 
 console.log("Data Loaded");
console.log(jsondata[0]);
/*******************  GLOBAL DIMENSIONS ****************************/
  // Run the data through crossfilter and load our 'facts'
  var facts = crossfilter(jsondata);
  var all = facts.groupAll();
  

/*************** TOTAL CHART *********************************/
  
totalCount = dc.dataCount('.dc2-data-count'+lang);
totalCount 
        .dimension(facts)
        .group(all)  
        .html({
            some: '<strong>%filter-count</strong> sélectionnés sur <strong>%total-count</strong> articles' +
                ' | <a href=\'javascript:dc.filterAll(); dc.renderAll();\'>Réinitialiser</a>',
            all: 'Tous les articles sélectionnés. Cliquez sur les graphes pour effectuer des filtres.'
        });
  
totalCount2 = dc.dataCount('.dc2-data-count2'+lang);
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
/***************************** NEO ROW BAR CHART ***********************/

var neoChart = dc.pieChart("#dc2-neo-chart"+lang);

//  countrychart  dimensions
    var neoDimension = facts.dimension(function (d) { return d.matrice; });
    var neoGroup = neoDimension.group();
	console.log("Neo types groups :" + neoGroup.size());

 	neoChart
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
        .dimension(neoDimension)
        .group(neoGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));

console.log("Neo chart built");
console.log(neoChart);




/***************************** COUNTRY PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var countryChart = dc.pieChart("#dc2-country-chart"+lang);


//  countrychart  dimensions
    var countryDimension = facts.dimension(function (d) { return d.country; });
    var countryGroup = countryDimension.group();
	console.log("Country groups :" + countryGroup.size());
  
// country chart
 	countryChart
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
        .dimension(countryDimension)
        .group(countryGroup)
 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
console.log("country chart built");
console.log(countryChart);


/***************************** TIMELINE ***********************/
// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html

// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc2-time-chart"+lang);

// create timeline chart dimensions
//	var volumeByDay = facts.dimension(function(d) {
//    //return d3.time.day(d.dtg);
//    return d3.time.week(d.dtg)
//  });
// create timeline chart dimensions
	var volumeByDay = facts.dimension(function(d) {
    //return d3.time.day(d.dtg);
    return d3.time.month(d.dtg)
  });  
  var volumeByDayGroup = volumeByDay.group()
    .reduceCount(function(d) { return d.dtg; });
    console.log("Month groups :" + volumeByDayGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].date;
 	var maxDate = volumeByDay.top(1)[0].date;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	.width(1000)
    .height(300)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    //.dotRadius(5) //
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    //.brushOn(true)
    .xyTipsOn(true) // incompatible with the preceding attribute
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return dtgFormat2M(d.jsondata.key)
      + "\nTotal : " + d.jsondata.value;
      })
    //.yAxisLabel("Période temporelle")
    //.xAxisLabel("Nombre d'articles")
    .elasticY(true)
    .elasticX(true)
    .turnOnControls(true)
    .renderHorizontalGridLines(true)
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
var subjectChart = dc.pieChart("#dc2-subject-chart"+lang);


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


/***************************** category PIE CHART ***********************/
// EC feb 2018 : useless
// Create the dc.js chart objects & link to div
//var categoryChart = dc.pieChart("#dc-category-chart"+lang);


//  categorychart  dimensions
//    var categoryDimension = facts.dimension(function (d) { return d.subject2; });
//    var categoryGroup = categoryDimension.group();
//	console.log("category groups :" + categoryGroup.size());
  
// category chart
// 	categoryChart
// 		.width(500)
//        .height(250)
//        .cx(300)
//        .slicesCap(10)
//        .ordering(function (d) {
//    			return -d.value
//			})
//        .innerRadius(30)
//        .externalLabels(30)
//        .externalRadiusPadding(20)
//        .minAngleForLabel(0.5)
//        .drawPaths(true)
//        .transitionDuration(500)
//        .turnOnControls(true)
//	    .controlsUseVisibility(true)
//        .dimension(categoryDimension)
//        .group(categoryGroup)
// 	    .legend(dc.legend().x(0).y(20).itemHeight(10).gap(5));
        
//console.log("category chart built");
//console.log(categoryChart);

/***************************** NEO ROW BAR CHART ***********************/

var neooccChart = dc.rowChart("#dc2-neoocc-chart"+lang);

//  neooccchart dimensions (with a fake group to keep just top and bottom 15
    var neooccDimension = facts.dimension(function (d) { return d.neo; });
    //var neooccDimensionless100 = facts.dimension(function (d) { return d.neoocc; }).filterRange([0, 100]);
    var neooccGroup = neooccDimension.group().reduceCount(function (d) { return d.neo; });
//    var neooccTopGroup = neooccGroup.top(15);

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

var neooccGroupTop = remove_empty_bins(neooccGroup);
//var neooccGroupLow = remove_empty_bins_low(neooccGroup);

console.log("neoocc groups :" + neooccGroup.size());

// neoocc setup rowschart (TOP)
    neooccChart
    		.width(500)
            .height(250)
            .dimension(neooccDimension)
            .group(neooccGroupTop)
            .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



// x axis label rotation  	: does not work	
neooccChart.on("renderlet",function (chart) {
   // rotate x-axis labels
   chart.selectAll('g.x text')
     .attr('transform', 'translate(-10,10) rotate(315)');
  });   



console.log("neooccs chart built");
//console.log(neooccChartLow);
console.log(neooccChart);


/***************************** NEWSPAPER ROW BAR CHART ***********************/

var newspaperChart = dc.rowChart("#dc2-newspaper-chart"+lang);
//var newspaperChartLow = dc.rowChart("#dc-newspaper-chart-low");

//  newspaperchart dimensions (with a fake group to keep just top and bottom 15
    var newspaperDimension = facts.dimension(function (d) { return d.source; });
    //var newspaperDimensionless100 = facts.dimension(function (d) { return d.newspaper; }).filterRange([0, 100]);
    var newspaperGroup = newspaperDimension.group().reduceCount(function (d) { return d.source; });
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
//// for low
/*function remove_empty_bins_low(source_group) {
    function non_zero_pred(d) {
        return d.value != 0;
    }
    return {
        all: function () {
            return source_group.all().filter(non_zero_pred);
        },
        bottom: function(n) {
            return source_group.bottom(Infinity)
                .filter(non_zero_pred)
                .slice(0, n);
        }
    };
}*/
var newspaperGroupTop = remove_empty_bins(newspaperGroup);
//var newspaperGroupLow = remove_empty_bins_low(newspaperGroup);

console.log("newspaper groups :" + newspaperGroup.size());

// newspaper setup rowschart (TOP)
    newspaperChart
    		.width(500)
            .height(250)
            .dimension(newspaperDimension)
            .group(newspaperGroupTop)
            .rowsCap(15)
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

//table
//dimension for table search
var tDimension = facts.dimension(function (d) { return d.neo;});
var tableDimension = tDimension.group().reduceCount();
var tableDimensionTop = remove_empty_bins(tableDimension);
console.log("Dimensions created");
console.log(tableDimension);

//neooccGroup and neooccDimension
//set options and columns
/*	var dOptions = {
        "bSort": true,
		columnDefs: [
			{
				targets: 0,
				data: function (d) { return d.neo; },
				//type: 'date',
				//defaultContent: 'Not found'
			},
			{
				targets: 1,
				data: function (d) { return d.matrice; },
				defaultContent: ''
			},
			{
				targets: 2,
				data: function (d) { return d.newspaper; },
				defaultContent: ''
			},
			{
				targets: 3,
				data: function (d) { return d.subject;},
				defaultContent: ''
			},
			{
				targets: 4,
				data: function (d) { return d.subject2;},
				defaultContent: ''
			},
			{
				targets: 5,
				data: function (d) {return d.country;},
				defaultContent: ''
			},
			{
				targets: 6, //search column
				data: function (d) {return d.neo;},
				defaultContent: '',
				visible: false
			}
		]
	};*/

	var dOptions = {
        "bSort": true,
		columnDefs: [
			{
				targets: 0,
				data: function (d) { return d.key; }
			},
			{
				targets: 1,
				data: function (d) { return d.value; }
			}
			/*,{
				targets: 2,
				data: function (d) { return get_terms(d); }
			}*/
		]
	};
// sauvegarde version limitée datatables
//var dataTableDC = dc.dataTable("#dc-table-chart"+lang);
var datatablesynth = $("#dc2-table-chart"+lang);
datatablesynth.dataTable(dOptions);


// gestion childrow
function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Lexie</td>'+
            '<td>'+d.key+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Total</td>'+
            '<td>'+d.value+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Behavior</td>'+
            '<td>More to come here about behavior...</td>'+
        '</tr>'+
    '</table>';
}

function getcontexts(d,lang,callback) 
{
		//alert(d.termes_copy.terme)
		console.log(lang);
		if (lang == undefined){lang='fr';}
		var restable='';
		var langues = {'It':'rss_italian','Fr':"rss_french", 'Pl':"RSS_polish", 'Br':'RSS_brasilian', 'Ch':'RSS_chinese', 'Ru':'RSS_russian', 'Cz':'RSS_czech', 'Gr':'RSS_greek'};
        var request= $.ajax({
//        url:'http://tal.lipn.univ-paris13.fr/solr/rss_french/select?q=neologismes%3A' + d.lexie + '&rows=5&df=contents&wt=json&indent=true&hl=true&hl.fl=contents&hl.simple.pre=%3Cem%3E&hl.simple.post=%3C%2Fem%3E',
       url:'http://tal.lipn.univ-paris13.fr/solr/' + langues[lang] + '/select',
//        url:'http://localhost:8983/solr/' + langues[lang] + '/select',
        data:{  q: '"'+d.key+'"',
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
        //async:false,
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
           // return restable;
        	callback(restable);
    	},
        error: function (request) {
            alert("Error : " + request.status + ". Response : " +  request.statusText);
            restable= '<div>Problème :'+ request.status + ". Response : " +  request.statusText + '</div>';
            //return restable;
            callback(restable)
        }
    });
	//return restable;
}

            

//row details
	function get_terms ( d ) {
		return '<b>Link: </b>' + d.link;
	}
	
	datatablesynth.DataTable().on('click', 'tr[role="row"]', function () {
        var tr = $(this);
        var row = datatablesynth.DataTable().row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            getcontexts(row.data(),lang, function(data){row.child(  data ).show();})
//            row.child( getcontexts(row.data(),lang, function(data){row.child(  data ).show();}) ).show();
  //          row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
	
	//custom refresh function, see http://stackoverflow.com/questions/21113513/dcjs-reorder-datatable-by-column/21116676#21116676
	function RefreshTable() {
            dc.events.trigger(function () {
                alldata = tableDimensionTop.top(Infinity);
                datatablesynth.fnClearTable();
                datatablesynth.fnAddData(alldata);
                datatablesynth.fnDraw();
            });
        }
	
	//call RefreshTable when dc-charts are filtered
	for (var i = 0; i < dc.chartRegistry.list().length; i++) {
		var chartI = dc.chartRegistry.list()[i];
		chartI.on("filtered", RefreshTable);
	}
	
	//filter all charts when using the datatables search box
	 $(":input").on('keyup',function(){
		text_filter(tDimension, this.value);//cities is the dimension for the data table

	function text_filter(dim,q){
		 if (q!='') {
			dim.filter(function(d){
				return d.indexOf (q.toLowerCase()) !== -1;
			});
		} else {
			dim.filterAll();
			}
		RefreshTable();
		dc.redrawAll();}
	});
	
	//initial table refresh
	RefreshTable();
console.log("Datatable chart built");
console.log(tableDimension);


/***************************** RENDER ALL THE CHARTS  ***********************/

    // make visible the zone : does not work
    
    $("#neoResults"+lang).show();
    $("#neoResults"+lang).css( "display", "visible !important");
	$("#neoinfoBtn"+lang).replaceWith('<a href="#" class="btn btn-info" id="neoinfoBtn2Done">Chargement effectué. ' + jsondata.length + ' occurrences de néologismes</a>');
    // Render the Charts
  	dc.renderAll(); 

}

/// interactive visualization of data with contexts analyzed (in db)

function get_neo_info_mysqldata(lang,neo,callback) 
{
   
    	console.log(neo);
		d3.json("./php/db_access.php?action=neoveille&id="+neo.termes_copy.terme, function(error, data) {
        	console.log(data);
        	console.log(error);
        	count = data.length;
        	console.log(count);
        	if (count == 0){
            	callback("L'analyse des contextes n'a pas encore été faite pour ce néologisme. Réessayez plus tard.");
            }
            else{
	            callback(count);
	            build_neo_contexts_viz2(data,lang);
	        }
        	
        });

    
    
    
    
}


function build_neo_contexts_viz2(jsondata, lang){

//console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
  
  jsondata.forEach(function(d) { 
  		//console.log(d);
    	d.dtg   = dtgFormat.parse(d.date);
 		d.newspaper   = d.journal;
    	d.subject  = d.subject;
    	d.article= d.link;
    	d.core = d.coreforme + "/" + d.corepos;
    	if (d.corelemma=='unknown'){d.corelemma=d.coreforme;}
    	if (d.l5lemma=='unknown'){d.l5lemma=d.l5forme;}
    	if (d.l4lemma=='unknown'){d.l4lemma=d.l4forme;}
    	if (d.l3lemma=='unknown'){d.l3lemma=d.l3forme;}
    	if (d.l2lemma=='unknown'){d.l2lemma=d.l2forme;}
    	if (d.l1lemma=='unknown'){d.l1lemma=d.l1forme;}
    	if (d.r5lemma=='unknown'){d.r5lemma=d.r5forme;}
    	if (d.r4lemma=='unknown'){d.r4lemma=d.r4forme;}
    	if (d.r3lemma=='unknown'){d.r3lemma=d.r3forme;}
    	if (d.r2lemma=='unknown'){d.r2lemma=d.r2forme;}
    	if (d.r1lemma=='unknown'){d.r1lemma=d.r1forme;}
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
/***************************** NEOPOS ROW BAR CHART ***********************/
var neoChart = dc.rowChart("#dc-neo-chart"+lang);
var neoDim = facts.dimension(function(d){ return d.core;});
var neoGroup = neoDim.group().reduceCount(function(d) { return d.core; });
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
var neoGroupTop = remove_empty_bins(neoGroup);
console.log("Neo groups");
console.log(neoGroupTop.all());
// neo chart
	neoChart
			//.width($(this).parent().innerWidth())
           .height(350)
            .dimension(neoDim)
            .group(neoGroupTop)
            .rowsCap(15)
            //.othersGrouper(true)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            //.title(function(d){return d.key + ' (' + d.value + ')';})
            .renderLabel(true)
            .colors(d3.scale.category10())
            //.colors(["#64baaa", "#8c1132", "#6ce03f", "#8438ba", "#91b84b", "#f75ef0", "#056e12", "#e04f7e", "#21f0b6", "#f24219"]) // http://vrl.cs.brown.edu/color
            .gap(0.3)
            //.renderTitleLabel(true)
            .ordering(function (d) {
    			return -d.value
			})
    		.elasticX(true)
		    .turnOnControls(true)
	        .controlsUseVisibility(true)
	        ;		   


console.log("Neo chart built");
console.log(neoChart);

/***************************** SUBJECT PIE CHART ***********************/

// Create the dc.js chart objects & link to div
var subjectChart = dc.rowChart("#dc-subject-chart"+lang);
var subjectDimension = facts.dimension(function (d) { return d.subject; });
var subjectGroup = subjectDimension.group();
var subjectGroupTop = remove_empty_bins(subjectGroup);
console.log("Subject groups :" + subjectGroupTop.all());
  
// subject chart
 	subjectChart
 		//.width(300)
        .height(300)
        .dimension(subjectDimension)
        .group(subjectGroupTop)
        .rowsCap(10)
        .colors(d3.scale.category10())
        .othersGrouper(false)
        .label(function(d){return d.key + ' (' + d.value + ')';})
        .renderLabel(true)
        .gap(0.3)
        .ordering(function (d) {
    		return -d.value
		})
    	.elasticX(true)
		.turnOnControls(true)
	    .controlsUseVisibility(true)
 	    ;
        
console.log("Subject chart built");
//console.log(subjectChart);

/***************************** NEWSPAPER ROW BAR CHART ***********************/

var newspaperChart = dc.rowChart("#dc-newspaper-chart"+lang);
var newspaperDimension = facts.dimension(function (d) { return d.newspaper; });
var newspaperGroup = newspaperDimension.group().reduceCount(function (d) { return d.newspaper; });
var newspaperGroupTop = remove_empty_bins(newspaperGroup);
console.log("newspaper groups :" + newspaperGroupTop.all());

// newspaper setup rowschart (TOP)
    newspaperChart
    		//.width(300)
            .height(300)
            .dimension(newspaperDimension)
            .group(newspaperGroupTop)
        .rowsCap(10)
        .othersGrouper(false)
        .colors(d3.scale.category10())
        .label(function(d){return d.key + ' (' + d.value + ')';})
        .renderLabel(true)
        .gap(0.3)
        .ordering(function (d) {
    		return -d.value
		})
    	.elasticX(true)
		.turnOnControls(true)
	    .controlsUseVisibility(true)
 	    ;



console.log("Newspapers chart built");
//console.log(newspaperChartLow);
//console.log(newspaperChart);


/***************************** domain series CHART dos not work***********************/
/*
var seriesdomainChart = dc.seriesChart("#dc-seriesdomain-chart"+lang);
var seriesdomainDimension = facts.dimension(function (d) { return [d.subject,d3.time.month(d.dtg)]; });
var seriesdomainGroup = seriesdomainDimension.group().reduceCount();
console.log("seriesdomain groups");
console.log(seriesdomainGroup.all());

    seriesdomainChart
    		//.width(300)
            .height(300)
            .chart(function(c) { 
                  return dc.lineChart(c).interpolate('cardinal').renderDataPoints({radius: 3} ) 
               })
            .dimension(seriesdomainDimension)
            .group(seriesdomainGroup)
               .x(d3.time.scale().domain([minDate, maxDate]))
               .elasticY(true)
               .brushOn(false)
               .seriesAccessor(function(d) { return d.key[0];})
               .keyAccessor(function(d) { return d.key[1]; })
               .valueAccessor(function(d) { return +d.value; })
               .legend(dc.legend().x(350).y(500).itemHeight(13).gap(5).horizontal(1)
                  .legendWidth(120).itemWidth(60));



console.log("seriesdomains chart built");

*/


/***************************** TIMELINE ***********************/



// see http://dc-js.github.io/dc.js/docs/html/dc.lineChart.html
// Create the dc.js chart objects & link to div
var timeChart = dc.lineChart("#dc-time-chart"+lang);
var periodChart = dc.barChart("#range-chart"+lang);

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
	console.log("Month groups :" + volumeByMonthGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].dtg;
 	var maxDate = volumeByDay.top(1)[0].dtg;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	//.width(700)
   .height(250)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    //.renderArea(true)
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .mouseZoomable(true)    
    .brushOn(false)
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return dtgFormat(d.key)
      + "\nTotal : " + d.value;
      })
    .elasticY(true)
    .rangeChart(periodChart)
    .xUnits(d3.time.day)
    //.curve(d3.curveBasisOpen) //d3 > 3
    .interpolate('cardinal') // 'linear', 'linear-closed', 'step', 'step-before', 'step-after', 'basis', 
    //'basis-open', 'basis-closed', 'bundle', 'cardinal', 'cardinal-open', 'cardinal-closed', and 'monotone'.
    .renderHorizontalGridLines(true)    
    .x(d3.time.scale().domain([minDate, maxDate]))
    .xAxis();


  
  console.log("Time chart built");
  console.log(timeChart);
  
/******************  range chart **************/
periodChart /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)
        .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByDay)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);

/********************* composite chart by lemme/pos ***********/
// Composite chart
var compositeChart = dc.compositeChart("#dc-comptime-chart"+lang);
var periodChart2 = dc.barChart("#range-chart2"+lang);

var volumeByDaycoreGroupTmp = volumeByMonth.group().reduce(
    function reduceAdd(p, v) { // add
    	//console.log("reduceAdd : p : ");
    	//console.log(p);
    	//console.log("reduceAdd : v : ");
    	//console.log(v);
        p[v.core] = (p[v.core] || 0) + 1; //for sum : v.value
        return p;
    },
    function reduceRemove(p, v) { // remove
        p[v.core] -= 1; // for sum v.value
        return p;
    },
    function reduceInitial() { // init
        return {};
    }); 

var volumeByDaycoreGroup = remove_empty_bins(volumeByDaycoreGroupTmp)
// build list of neo types
wordkeys= [];
reskeys = neoGroupTop.top(Infinity);
for (var i = 0; i < reskeys.length; i++){wordkeys.push(reskeys[i].key);}
//console.log("Word keys");
//console.log(wordkeys);

console.log(volumeByDaycoreGroup.all());
console.log(wordkeys);
//console.log("color domain for neochart");
//console.log(neoChart.colors());
//console.log(neoChart.colorAccessor());
//console.log(neoChart.getColor(wordkeys[1]));
rescharts = wordkeys.slice(0,15).map(function(name, index) { // .slice(0,5)
//console.log(name)
//console.log(neoChart.getColor(wordkeys[index]))
        	return dc.lineChart(compositeChart)
            	.dimension(volumeByMonth)
            	.group(volumeByDaycoreGroup,name)
            	.colors(neoChart.colors())//'#'+Math.random().toString(16).slice(-6)
            	//.interpolate('basis-open')
            	.renderDataPoints({radius: 3})
				.defined(function(d) {
            		//console.log(d);
    				if(d.y !== undefined) {
       					 return d.y;
    				}
    				else{
    					return 0;
    				}
				})            	
				.renderDataPoints({radius: 3} ) // fillOpacity: 1, strokeOpacity: 1,             	
            	.valueAccessor(function(kv) {
            		//console.log(kv);
                	return kv.value[name];
            	})
            	.xyTipsOn(true)
            	.title(function(kv) {
            		//console.log(kv);
                	return name +  ': ' + kv.value[name]  ;
            	})
            	;
    		});
console.log(rescharts);
//console.log(compositeChart);
compositeChart
    .height(300)
    //.shareTitle(false)
    
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .transitionDuration(500)
    .mouseZoomable(true)
    .brushOn(false)
    //.renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .elasticY(true)
    //.elasticX(true)
    .shareTitle(false) 
    
	.compose(rescharts)
    .rangeChart(periodChart2)
    .xUnits(d3.time.day)
    .renderHorizontalGridLines(true)   
    .x(d3.time.scale().domain([minDate, maxDate]))
    //.legend(dc.legend().x(50).y(30).gap(5)) //
    .xAxis();
/******************  range chart **************/
 periodChart2 
        .height(100)
       // .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByMonth)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);


/********************* composite chart by domain ***********/
// Composite chart
var compositeChart2 = dc.compositeChart("#dc-comptimedomain-chart"+lang);
var periodChart3 = dc.barChart("#range-chart3"+lang);

var volumeByDaycoreGroupTmp2 = volumeByMonth.group().reduce(
    function reduceAdd(p, v) { // add
        p[v.subject] = (p[v.subject] || 0) + 1; //for sum : v.value
        return p;
    },
    function reduceRemove(p, v) { // remove
        p[v.subject] -= 1; // for sum v.value
        return p;
    },
    function reduceInitial() { // init
        return {};
    }); 

var volumeByDaycoreGroup2 = remove_empty_bins(volumeByDaycoreGroupTmp2)
// build list of neo types
wordkeys2= [];
reskeys2 = subjectGroupTop.top(Infinity);
for (var i = 0; i < reskeys2.length; i++){wordkeys2.push(reskeys2[i].key);}
//console.log("Word keys");
//console.log(wordkeys);

console.log(volumeByDaycoreGroup2.all());
console.log(wordkeys2);
rescharts2 = wordkeys2.slice(0,10).map(function(name) { // .slice(0,5)
        	return dc.lineChart(compositeChart2)
            	.dimension(volumeByMonth)
            	.group(volumeByDaycoreGroup2,name)
            	.colors(subjectChart.colors())
//            	.colors('#'+Math.random().toString(16).slice(-6))
            	//.interpolate('basis-open')
				.defined(function(d) {
            		//console.log(d);
    				if(d.y !== undefined) {
       					 return d.y;
    				}
    				else{
    					return 0;
    				}
				})            	
				.renderDataPoints({radius: 3} ) // fillOpacity: 1, strokeOpacity: 1,             	
            	.valueAccessor(function(kv) {
            		//console.log(kv);
                	return kv.value[name];
            	})
            	.xyTipsOn(true)
            	.title(function(kv) {
            		//console.log(kv);
                	return name +  ': ' + kv.value[name]  ;
            	})
            	;
    		});
console.log(rescharts2);
//console.log(compositeChart);
compositeChart2
    .height(300)
    //.shareTitle(false)
    
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .transitionDuration(500)
//    .mouseZoomable(true)
    .brushOn(false)
    //.renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .elasticY(true)
    .shareTitle(false) 
    
	.compose(rescharts2)
    .rangeChart(periodChart3)
    .xUnits(d3.time.day)
    .renderHorizontalGridLines(true)   
    .x(d3.time.scale().domain([minDate, maxDate]))
    //.legend(dc.legend().x(50).y(30).gap(5)) //
    .xAxis();
/******************  range chart **************/
periodChart3 
        .height(100)
       // .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByMonth)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);


/********************* composite chart by newspaper ***********/
// Composite chart
var compositeChart3 = dc.compositeChart("#dc-comptimenews-chart"+lang);
var periodChart4 = dc.barChart("#range-chart4"+lang);

var volumeByDaycoreGroupTmp3 = volumeByMonth.group().reduce(
    function reduceAdd(p, v) { // add
        p[v.newspaper] = (p[v.newspaper] || 0) + 1; //for sum : v.value
        return p;
    },
    function reduceRemove(p, v) { // remove
        p[v.newspaper] -= 1; // for sum v.value
        return p;
    },
    function reduceInitial() { // init
        return {};
    }); 

var volumeByDaycoreGroup3 = remove_empty_bins(volumeByDaycoreGroupTmp3)
// build list of neo types
wordkeys3= [];
reskeys3 = newspaperGroupTop.top(Infinity);
for (var i = 0; i < reskeys3.length; i++){wordkeys3.push(reskeys3[i].key);}
//console.log("Word keys");
//console.log(wordkeys);

console.log(volumeByDaycoreGroup3.all());
console.log(wordkeys3);
rescharts3 = wordkeys3.slice(0,15).map(function(name) { // .slice(0,5)
        	return dc.lineChart(compositeChart3)
            	.dimension(volumeByMonth)
            	.group(volumeByDaycoreGroup3,name)
            	.colors(newspaperChart.colors())
//            	.colors('#'+Math.random().toString(16).slice(-6))
            	//.interpolate('basis-open')
				.defined(function(d) {
            		//console.log(d);
    				if(d.y !== undefined) {
       					 return d.y;
    				}
    				else{
    					return 0;
    				}
				})            	
				.renderDataPoints({radius: 3} ) // fillOpacity: 1, strokeOpacity: 1,             	
            	.valueAccessor(function(kv) {
            		//console.log(kv);
                	return kv.value[name];
            	})
            	.xyTipsOn(true)
            	.title(function(kv) {
            		//console.log(kv);
                	return name +  ': ' + kv.value[name]  ;
            	})
            	;
    		});
console.log(rescharts3);
//console.log(compositeChart);
compositeChart3
    .height(300)
    //.shareTitle(false)
    
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .transitionDuration(500)
//    .mouseZoomable(true)
    .brushOn(false)
    //.renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .elasticY(true)
    .shareTitle(false) 
    
	.compose(rescharts3)
    .rangeChart(periodChart4)
    .xUnits(d3.time.day)
    .renderHorizontalGridLines(true)   
    .x(d3.time.scale().domain([minDate, maxDate]))
    //.legend(dc.legend().x(50).y(30).gap(5)) //
    .xAxis();
/******************  range chart **************/
periodChart4 
        .height(100)
       // .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByMonth)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);




/*****************************  CORE (lemma, forme, pos) ROW BAR CHART ***********************/
// **************************forme
var coreformeChart = dc.rowChart("#dc-coreforme-chart"+lang);

//  coreformechart dimensions (with a fake group to keep just top and bottom 15
    var coreformeDimension = facts.dimension(function (d) { return d.coreforme; });
    var coreformeGroup = coreformeDimension.group().reduceCount(function (d) { return d.coreforme; });


/// for top	
function remove_empty_bins_key(source_group) {
    function non_zero_pred(d) {
    	if (d.key && d.value>0){return d.key;}
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


var coreformeGroupTop = remove_empty_bins_key(coreformeGroup);
//var coreformeGroupLow = remove_empty_bins_low(coreformeGroup);

console.log("coreforme groups :" + coreformeGroup.size());

// coreforme setup rowschart (TOP)
    coreformeChart
    		.width(200)
          .height(300)
            .dimension(coreformeDimension)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .group(coreformeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("coreformes chart built");
console.log(coreformeChart);

//pos
var coreposChart = dc.rowChart("#dc-corepos-chart"+lang);

//  coreposchart dimensions (with a fake group to keep just top and bottom 15
    var coreposDimension = facts.dimension(function (d) { return d.corepos; });
    var coreposGroup = coreposDimension.group().reduceCount(function (d) { return d.corepos; });

var coreposGroupTop = remove_empty_bins_key(coreposGroup);

console.log("corepos groups :" + coreposGroup.size());

// corepos setup rowschart (TOP)
    coreposChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(coreposDimension)
            .group(coreposGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("coreposs chart built");
console.log(coreposChart);

// lemma
var corelemmaChart = dc.rowChart("#dc-corelemma-chart"+lang);

//  corelemmachart dimensions (with a fake group to keep just top and bottom 15
    var corelemmaDimension = facts.dimension(function (d) { return d.corelemma; });
    var corelemmaGroup = corelemmaDimension.group().reduceCount(function (d) { return d.corelemma; });



var corelemmaGroupTop = remove_empty_bins_key(corelemmaGroup);
//var corelemmaGroupLow = remove_empty_bins_low(corelemmaGroup);

console.log("corelemma groups :" + corelemmaGroup.size());

// corelemma setup rowschart (TOP)
    corelemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(corelemmaDimension)
            .group(corelemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("corelemmas chart built");
//console.log(corelemmaChartLow);
console.log(corelemmaChart);




/*********************** contextes *********/
/// lemma

/***************************** LEFT CONTEXT 1 ROW BAR CHART ***********************/

var l1lemmaChart = dc.rowChart("#dc-l1lemma-chart"+lang);

//  l1lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l1lemmaDimension = facts.dimension(function (d) { return d.l1lemma; });
    var l1lemmaGroup = l1lemmaDimension.group().reduceCount(function (d) { return d.l1lemma; });



var l1lemmaGroupTop = remove_empty_bins_key(l1lemmaGroup);
//var l1lemmaGroupLow = remove_empty_bins_low(l1lemmaGroup);

console.log("l1lemma groups :" + l1lemmaGroup.size());
console.log(l1lemmaGroup.all());

// l1lemma setup rowschart (TOP)
    l1lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l1lemmaDimension)
            .group(l1lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l1lemmas chart built");
//console.log(l1lemmaChartLow);
console.log(l1lemmaChart);



/***************************** LEFT CONTEXT 2 ROW BAR CHART ***********************/

var l2lemmaChart = dc.rowChart("#dc-l2lemma-chart"+lang);

//  l2lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l2lemmaDimension = facts.dimension(function (d) { return d.l2lemma; });
    var l2lemmaGroup = l2lemmaDimension.group().reduceCount(function (d) { return d.l2lemma; });

var l2lemmaGroupTop = remove_empty_bins_key(l2lemmaGroup);
//var l2lemmaGroupLow = remove_empty_bins_low(l2lemmaGroup);

console.log("l2lemma groups :" + l2lemmaGroup.size());

// l2lemma setup rowschart (TOP)
    l2lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l2lemmaDimension)
            .group(l2lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("l2lemmas chart built");
//console.log(l2lemmaChartLow);
console.log(l2lemmaChart);



/***************************** LEFT CONTEXT 3 ROW BAR CHART ***********************/

var l3lemmaChart = dc.rowChart("#dc-l3lemma-chart"+lang);

//  l3lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l3lemmaDimension = facts.dimension(function (d) { return d.l3lemma; });
    var l3lemmaGroup = l3lemmaDimension.group().reduceCount(function (d) { return d.l3lemma; });

var l3lemmaGroupTop = remove_empty_bins_key(l3lemmaGroup);
//var l3lemmaGroupLow = remove_empty_bins_low(l3lemmaGroup);

console.log("l3lemma groups :" + l3lemmaGroup.size());

// l3lemma setup rowschart (TOP)
    l3lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l3lemmaDimension)
            .group(l3lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("l3lemmas chart built");
//console.log(l3lemmaChartLow);
console.log(l3lemmaChart);


/***************************** LEFT CONTEXT 4 ROW BAR CHART ***********************/

var l4lemmaChart = dc.rowChart("#dc-l4lemma-chart"+lang);

//  l4lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l4lemmaDimension = facts.dimension(function (d) { return d.l4lemma; });
    var l4lemmaGroup = l4lemmaDimension.group().reduceCount(function (d) { return d.l4lemma; });

var l4lemmaGroupTop = remove_empty_bins_key(l4lemmaGroup);
//var l4lemmaGroupLow = remove_empty_bins_low(l4lemmaGroup);

console.log("l4lemma groups :" + l4lemmaGroup.size());

// l4lemma setup rowschart (TOP)
    l4lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l4lemmaDimension)
            .group(l4lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l4lemmas chart built");
//console.log(l4lemmaChartLow);
console.log(l4lemmaChart);


/***************************** LEFT CONTEXT 5 ROW BAR CHART ***********************/

var l5lemmaChart = dc.rowChart("#dc-l5lemma-chart"+lang);

//  l5lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l5lemmaDimension = facts.dimension(function (d) { return d.l5lemma; });
    var l5lemmaGroup = l5lemmaDimension.group().reduceCount(function (d) { return d.l5lemma; });

var l5lemmaGroupTop = remove_empty_bins_key(l5lemmaGroup);
//var l5lemmaGroupLow = remove_empty_bins_low(l5lemmaGroup);

console.log("l5lemma groups :" + l5lemmaGroup.size());

// l5lemma setup rowschart (TOP)
    l5lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l5lemmaDimension)
            .group(l5lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l5lemmas chart built");
//console.log(l5lemmaChartLow);
console.log(l5lemmaChart);





/***************************** RIGHT CONTEXT 1 ROW BAR CHART ***********************/

var r1lemmaChart = dc.rowChart("#dc-r1lemma-chart"+lang);

//  r1lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r1lemmaDimension = facts.dimension(function (d) { return d.r1lemma; });
    var r1lemmaGroup = r1lemmaDimension.group().reduceCount(function (d) { return d.r1lemma; });

var r1lemmaGroupTop = remove_empty_bins_key(r1lemmaGroup);
//var r1lemmaGroupLow = remove_empty_bins_low(r1lemmaGroup);

console.log("r1lemma groups :" + r1lemmaGroup.size());

// r1lemma setup rowschart (TOP)
    r1lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r1lemmaDimension)
            .group(r1lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("r1lemmas chart built");
console.log(r1lemmaChart);



/***************************** RIGHT CONTEXT 2 ROW BAR CHART ***********************/

var r2lemmaChart = dc.rowChart("#dc-r2lemma-chart"+lang);

//  r2lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r2lemmaDimension = facts.dimension(function (d) { return d.r2lemma; });
    var r2lemmaGroup = r2lemmaDimension.group().reduceCount(function (d) { return d.r2lemma; });

var r2lemmaGroupTop = remove_empty_bins_key(r2lemmaGroup);
//var r2lemmaGroupLow = remove_empty_bins_low(r2lemmaGroup);

console.log("r2lemma groups :" + r2lemmaGroup.size());

// r2lemma setup rowschart (TOP)
    r2lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r2lemmaDimension)
            .group(r2lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r2lemmas chart built");
console.log(r2lemmaChart);



/***************************** RIGHT CONTEXT 3 ROW BAR CHART ***********************/

var r3lemmaChart = dc.rowChart("#dc-r3lemma-chart"+lang);

//  r3lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r3lemmaDimension = facts.dimension(function (d) { return d.r3lemma; });
    var r3lemmaGroup = r3lemmaDimension.group().reduceCount(function (d) { return d.r3lemma; });

var r3lemmaGroupTop = remove_empty_bins_key(r3lemmaGroup);
//var r3lemmaGroupLow = remove_empty_bins_low(r3lemmaGroup);

console.log("r3lemma groups :" + r3lemmaGroup.size());

// r3lemma setup rowschart (TOP)
    r3lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r3lemmaDimension)
            .group(r3lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r3lemmas chart built");
console.log(r3lemmaChart);



/***************************** RIGHT CONTEXT 4 ROW BAR CHART ***********************/

var r4lemmaChart = dc.rowChart("#dc-r4lemma-chart"+lang);

//  r4lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r4lemmaDimension = facts.dimension(function (d) { return d.r4lemma; });
    var r4lemmaGroup = r4lemmaDimension.group().reduceCount(function (d) { return d.r4lemma; });

var r4lemmaGroupTop = remove_empty_bins_key(r4lemmaGroup);
//var r4lemmaGroupLow = remove_empty_bins_low(r4lemmaGroup);

console.log("r4lemma groups :" + r4lemmaGroup.size());

// r4lemma setup rowschart (TOP)
    r4lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r4lemmaDimension)
            .group(r4lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r4lemmas chart built");
console.log(r4lemmaChart);



/***************************** RIGHT CONTEXT 5 ROW BAR CHART ***********************/

var r5lemmaChart = dc.rowChart("#dc-r5lemma-chart"+lang);

//  r5lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r5lemmaDimension = facts.dimension(function (d) { return d.r5lemma; });
    var r5lemmaGroup = r5lemmaDimension.group().reduceCount(function (d) { return d.r5lemma; });

var r5lemmaGroupTop = remove_empty_bins_key(r5lemmaGroup);
//var r5lemmaGroupLow = remove_empty_bins_low(r5lemmaGroup);

console.log("r5lemma groups :" + r5lemmaGroup.size());

// r5lemma setup rowschart (TOP)
    r5lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r5lemmaDimension)
            .group(r5lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r5lemmas chart built");
console.log(r5lemmaChart);


/// forme
/***************************** LEFT CONTEXT 1 ROW BAR CHART ***********************/

var l1formeChart = dc.rowChart("#dc-l1forme-chart"+lang);

//  l1formechart dimensions (with a fake group to keep just top and bottom 15
    var l1formeDimension = facts.dimension(function (d) { return d.l1forme; });
    var l1formeGroup = l1formeDimension.group().reduceCount(function (d) { return d.l1forme; });



var l1formeGroupTop = remove_empty_bins_key(l1formeGroup);
//var l1formeGroupLow = remove_empty_bins_low(l1formeGroup);

console.log("l1forme groups :" + l1formeGroup.size());

// l1forme setup rowschart (TOP)
    l1formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l1formeDimension)
            .group(l1formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l1formes chart built");
//console.log(l1formeChartLow);
console.log(l1formeChart);



/***************************** LEFT CONTEXT 2 ROW BAR CHART ***********************/

var l2formeChart = dc.rowChart("#dc-l2forme-chart"+lang);

//  l2formechart dimensions (with a fake group to keep just top and bottom 15
    var l2formeDimension = facts.dimension(function (d) { return d.l2forme; });
    var l2formeGroup = l2formeDimension.group().reduceCount(function (d) { return d.l2forme; });

var l2formeGroupTop = remove_empty_bins_key(l2formeGroup);
//var l2formeGroupLow = remove_empty_bins_low(l2formeGroup);

console.log("l2forme groups :" + l2formeGroup.size());

// l2forme setup rowschart (TOP)
    l2formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l2formeDimension)
            .group(l2formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("l2formes chart built");
//console.log(l2formeChartLow);
console.log(l2formeChart);



/***************************** LEFT CONTEXT 3 ROW BAR CHART ***********************/

var l3formeChart = dc.rowChart("#dc-l3forme-chart"+lang);

//  l3formechart dimensions (with a fake group to keep just top and bottom 15
    var l3formeDimension = facts.dimension(function (d) { return d.l3forme; });
    var l3formeGroup = l3formeDimension.group().reduceCount(function (d) { return d.l3forme; });

var l3formeGroupTop = remove_empty_bins_key(l3formeGroup);
//var l3formeGroupLow = remove_empty_bins_low(l3formeGroup);

console.log("l3forme groups :" + l3formeGroup.size());

// l3forme setup rowschart (TOP)
    l3formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l3formeDimension)
            .group(l3formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("l3formes chart built");
//console.log(l3formeChartLow);
console.log(l3formeChart);


/***************************** LEFT CONTEXT 4 ROW BAR CHART ***********************/

var l4formeChart = dc.rowChart("#dc-l4forme-chart"+lang);

//  l4formechart dimensions (with a fake group to keep just top and bottom 15
    var l4formeDimension = facts.dimension(function (d) { return d.l4forme; });
    var l4formeGroup = l4formeDimension.group().reduceCount(function (d) { return d.l4forme; });

var l4formeGroupTop = remove_empty_bins_key(l4formeGroup);
//var l4formeGroupLow = remove_empty_bins_low(l4formeGroup);

console.log("l4forme groups :" + l4formeGroup.size());

// l4forme setup rowschart (TOP)
    l4formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l4formeDimension)
            .group(l4formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l4formes chart built");
//console.log(l4formeChartLow);
console.log(l4formeChart);


/***************************** LEFT CONTEXT 5 ROW BAR CHART ***********************/

var l5formeChart = dc.rowChart("#dc-l5forme-chart"+lang);

//  l5formechart dimensions (with a fake group to keep just top and bottom 15
    var l5formeDimension = facts.dimension(function (d) { return d.l5forme; });
    var l5formeGroup = l5formeDimension.group().reduceCount(function (d) { return d.l5forme; });

var l5formeGroupTop = remove_empty_bins_key(l5formeGroup);
//var l5formeGroupLow = remove_empty_bins_low(l5formeGroup);

console.log("l5forme groups :" + l5formeGroup.size());

// l5forme setup rowschart (TOP)
    l5formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l5formeDimension)
            .group(l5formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l5formes chart built");
//console.log(l5formeChartLow);
console.log(l5formeChart);





/***************************** RIGHT CONTEXT 1 ROW BAR CHART ***********************/

var r1formeChart = dc.rowChart("#dc-r1forme-chart"+lang);

//  r1formechart dimensions (with a fake group to keep just top and bottom 15
    var r1formeDimension = facts.dimension(function (d) { return d.r1forme; });
    var r1formeGroup = r1formeDimension.group().reduceCount(function (d) { return d.r1forme; });

var r1formeGroupTop = remove_empty_bins_key(r1formeGroup);
//var r1formeGroupLow = remove_empty_bins_low(r1formeGroup);

console.log("r1forme groups :" + r1formeGroup.size());

// r1forme setup rowschart (TOP)
    r1formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r1formeDimension)
            .group(r1formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("r1formes chart built");
console.log(r1formeChart);



/***************************** RIGHT CONTEXT 2 ROW BAR CHART ***********************/

var r2formeChart = dc.rowChart("#dc-r2forme-chart"+lang);

//  r2formechart dimensions (with a fake group to keep just top and bottom 15
    var r2formeDimension = facts.dimension(function (d) { return d.r2forme; });
    var r2formeGroup = r2formeDimension.group().reduceCount(function (d) { return d.r2forme; });

var r2formeGroupTop = remove_empty_bins_key(r2formeGroup);
//var r2formeGroupLow = remove_empty_bins_low(r2formeGroup);

console.log("r2forme groups :" + r2formeGroup.size());

// r2forme setup rowschart (TOP)
    r2formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r2formeDimension)
            .group(r2formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r2formes chart built");
console.log(r2formeChart);



/***************************** RIGHT CONTEXT 3 ROW BAR CHART ***********************/

var r3formeChart = dc.rowChart("#dc-r3forme-chart"+lang);

//  r3formechart dimensions (with a fake group to keep just top and bottom 15
    var r3formeDimension = facts.dimension(function (d) { return d.r3forme; });
    var r3formeGroup = r3formeDimension.group().reduceCount(function (d) { return d.r3forme; });

var r3formeGroupTop = remove_empty_bins_key(r3formeGroup);
//var r3formeGroupLow = remove_empty_bins_low(r3formeGroup);

console.log("r3forme groups :" + r3formeGroup.size());

// r3forme setup rowschart (TOP)
    r3formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r3formeDimension)
            .group(r3formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r3formes chart built");
console.log(r3formeChart);



/***************************** RIGHT CONTEXT 4 ROW BAR CHART ***********************/

var r4formeChart = dc.rowChart("#dc-r4forme-chart"+lang);

//  r4formechart dimensions (with a fake group to keep just top and bottom 15
    var r4formeDimension = facts.dimension(function (d) { return d.r4forme; });
    var r4formeGroup = r4formeDimension.group().reduceCount(function (d) { return d.r4forme; });

var r4formeGroupTop = remove_empty_bins_key(r4formeGroup);
//var r4formeGroupLow = remove_empty_bins_low(r4formeGroup);

console.log("r4forme groups :" + r4formeGroup.size());

// r4forme setup rowschart (TOP)
    r4formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r4formeDimension)
            .group(r4formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r4formes chart built");
console.log(r4formeChart);



/***************************** RIGHT CONTEXT 5 ROW BAR CHART ***********************/

var r5formeChart = dc.rowChart("#dc-r5forme-chart"+lang);

//  r5formechart dimensions (with a fake group to keep just top and bottom 15
    var r5formeDimension = facts.dimension(function (d) { return d.r5forme; });
    var r5formeGroup = r5formeDimension.group().reduceCount(function (d) { return d.r5forme; });

var r5formeGroupTop = remove_empty_bins_key(r5formeGroup);
//var r5formeGroupLow = remove_empty_bins_low(r5formeGroup);

console.log("r5forme groups :" + r5formeGroup.size());

// r5forme setup rowschart (TOP)
    r5formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r5formeDimension)
            .group(r5formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r5formes chart built");
console.log(r5formeChart);





/// pos

/***************************** LEFT CONTEXT 1 ROW BAR CHART ***********************/

var l1posChart = dc.rowChart("#dc-l1pos-chart"+lang);

//  l1poschart dimensions (with a fake group to keep just top and bottom 15
    var l1posDimension = facts.dimension(function (d) { return d.l1pos; });
    var l1posGroup = l1posDimension.group().reduceCount(function (d) { return d.l1pos; });


var l1posGroupTop = remove_empty_bins_key(l1posGroup);
//var l1posGroupLow = remove_empty_bins_low(l1posGroup);

console.log("l1pos groups :" + l1posGroup.size());

// l1pos setup rowschart (TOP)
    l1posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l1posDimension)
            .group(l1posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l1poss chart built");
//console.log(l1posChartLow);
console.log(l1posChart);



/***************************** LEFT CONTEXT 2 ROW BAR CHART ***********************/

var l2posChart = dc.rowChart("#dc-l2pos-chart"+lang);

//  l2poschart dimensions (with a fake group to keep just top and bottom 15
    var l2posDimension = facts.dimension(function (d) { return d.l2pos; });
    var l2posGroup = l2posDimension.group().reduceCount(function (d) { return d.l2pos; });

var l2posGroupTop = remove_empty_bins_key(l2posGroup);
//var l2posGroupLow = remove_empty_bins_low(l2posGroup);

console.log("l2pos groups :" + l2posGroup.size());

// l2pos setup rowschart (TOP)
    l2posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l2posDimension)
            .group(l2posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("l2poss chart built");
//console.log(l2posChartLow);
console.log(l2posChart);



/***************************** LEFT CONTEXT 3 ROW BAR CHART ***********************/

var l3posChart = dc.rowChart("#dc-l3pos-chart"+lang);

//  l3poschart dimensions (with a fake group to keep just top and bottom 15
    var l3posDimension = facts.dimension(function (d) { return d.l3pos; });
    var l3posGroup = l3posDimension.group().reduceCount(function (d) { return d.l3pos; });

var l3posGroupTop = remove_empty_bins_key(l3posGroup);
//var l3posGroupLow = remove_empty_bins_low(l3posGroup);

console.log("l3pos groups :" + l3posGroup.size());

// l3pos setup rowschart (TOP)
    l3posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l3posDimension)
            .group(l3posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("l3poss chart built");
//console.log(l3posChartLow);
console.log(l3posChart);


/***************************** LEFT CONTEXT 4 ROW BAR CHART ***********************/

var l4posChart = dc.rowChart("#dc-l4pos-chart"+lang);

//  l4poschart dimensions (with a fake group to keep just top and bottom 15
    var l4posDimension = facts.dimension(function (d) { return d.l4pos; });
    var l4posGroup = l4posDimension.group().reduceCount(function (d) { return d.l4pos; });

var l4posGroupTop = remove_empty_bins_key(l4posGroup);
//var l4posGroupLow = remove_empty_bins_low(l4posGroup);

console.log("l4pos groups :" + l4posGroup.size());

// l4pos setup rowschart (TOP)
    l4posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l4posDimension)
            .group(l4posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l4poss chart built");
//console.log(l4posChartLow);
console.log(l4posChart);


/***************************** LEFT CONTEXT 5 ROW BAR CHART ***********************/

var l5posChart = dc.rowChart("#dc-l5pos-chart"+lang);

//  l5poschart dimensions (with a fake group to keep just top and bottom 15
    var l5posDimension = facts.dimension(function (d) { return d.l5pos; });
    var l5posGroup = l5posDimension.group().reduceCount(function (d) { return d.l5pos; });

var l5posGroupTop = remove_empty_bins_key(l5posGroup);
//var l5posGroupLow = remove_empty_bins_low(l5posGroup);

console.log("l5pos groups :" + l5posGroup.size());

// l5pos setup rowschart (TOP)
    l5posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l5posDimension)
            .group(l5posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l5poss chart built");
//console.log(l5posChartLow);
console.log(l5posChart);





/***************************** RIGHT CONTEXT 1 ROW BAR CHART ***********************/

var r1posChart = dc.rowChart("#dc-r1pos-chart"+lang);

//  r1poschart dimensions (with a fake group to keep just top and bottom 15
    var r1posDimension = facts.dimension(function (d) { return d.r1pos; });
    var r1posGroup = r1posDimension.group().reduceCount(function (d) { return d.r1pos; });

var r1posGroupTop = remove_empty_bins_key(r1posGroup);
//var r1posGroupLow = remove_empty_bins_low(r1posGroup);

console.log("r1pos groups :" + r1posGroup.size());

// r1pos setup rowschart (TOP)
    r1posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r1posDimension)
            .group(r1posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("r1poss chart built");
console.log(r1posChart);



/***************************** RIGHT CONTEXT 2 ROW BAR CHART ***********************/

var r2posChart = dc.rowChart("#dc-r2pos-chart"+lang);

//  r2poschart dimensions (with a fake group to keep just top and bottom 15
    var r2posDimension = facts.dimension(function (d) { return d.r2pos; });
    var r2posGroup = r2posDimension.group().reduceCount(function (d) { return d.r2pos; });

var r2posGroupTop = remove_empty_bins_key(r2posGroup);
//var r2posGroupLow = remove_empty_bins_low(r2posGroup);

console.log("r2pos groups :" + r2posGroup.size());

// r2pos setup rowschart (TOP)
    r2posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r2posDimension)
            .group(r2posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r2poss chart built");
console.log(r2posChart);



/***************************** RIGHT CONTEXT 3 ROW BAR CHART ***********************/

var r3posChart = dc.rowChart("#dc-r3pos-chart"+lang);

//  r3poschart dimensions (with a fake group to keep just top and bottom 15
    var r3posDimension = facts.dimension(function (d) { return d.r3pos; });
    var r3posGroup = r3posDimension.group().reduceCount(function (d) { return d.r3pos; });

var r3posGroupTop = remove_empty_bins_key(r3posGroup);
//var r3posGroupLow = remove_empty_bins_low(r3posGroup);

console.log("r3pos groups :" + r3posGroup.size());

// r3pos setup rowschart (TOP)
    r3posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r3posDimension)
            .group(r3posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r3poss chart built");
console.log(r3posChart);



/***************************** RIGHT CONTEXT 4 ROW BAR CHART ***********************/

var r4posChart = dc.rowChart("#dc-r4pos-chart"+lang);

//  r4poschart dimensions (with a fake group to keep just top and bottom 15
    var r4posDimension = facts.dimension(function (d) { return d.r4pos; });
    var r4posGroup = r4posDimension.group().reduceCount(function (d) { return d.r4pos; });

var r4posGroupTop = remove_empty_bins_key(r4posGroup);
//var r4posGroupLow = remove_empty_bins_low(r4posGroup);

console.log("r4pos groups :" + r4posGroup.size());

// r4pos setup rowschart (TOP)
    r4posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r4posDimension)
            .group(r4posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r4poss chart built");
console.log(r4posChart);



/***************************** RIGHT CONTEXT 5 ROW BAR CHART ***********************/

var r5posChart = dc.rowChart("#dc-r5pos-chart"+lang);

//  r5poschart dimensions (with a fake group to keep just top and bottom 15
    var r5posDimension = facts.dimension(function (d) { return d.r5pos; });
    var r5posGroup = r5posDimension.group().reduceCount(function (d) { return d.r5pos; });

var r5posGroupTop = remove_empty_bins_key(r5posGroup);
//var r5posGroupLow = remove_empty_bins_low(r5posGroup);

console.log("r5pos groups :" + r5posGroup.size());

// r5pos setup rowschart (TOP)
    r5posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r5posDimension)
            .group(r5posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r5poss chart built");
console.log(r5posChart);

/***************************** DATATABLES CHART ***********************/

// sauvegarde version limitée datatables
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");
 //neolo = lexie.toString()
 //console.log(neolo)

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return ""})
	//.size(10)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.date; },
      function(d) { return '<a href=\"' + d.link + "\" target=\"_blank\">" +d.newspaper+"</a>";},
      function(d) { return d.subject; },
      function(d) { return get_text_from_neoveille(d);},
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);

console.log("Datatable chart built");
console.log(timeDimension);

/***************************** RENDER ALL THE CHARTS  ***********************/
// Render the Charts
dc.renderAll(); 

}


function build_neo_contexts_viz2_bk(jsondata, lang){

console.log(jsondata[0]);

/********************* GET THE JSON DATA AND TRANSFORM WHEN NECESSARY ***********/
  // format our data : dateS,source,link,subject,subject2, neologisms
  
  
  var dtgFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
  
  jsondata.forEach(function(d) { 
  		//console.log(d);
    	d.dtg   = dtgFormat.parse(d.date);
 	d.newspaper   = d.journal;
    	d.subject  = d.subject;
    	d.article= d.link;
    	//d.core = d.coreforme.toLowerCase() + "/" + d.corepos.toLowerCase();
    	//d.core = d.core.toLowerCase();
    	//res = d.core.split("\/");
    	//if (res.length==3){d.coreforme=res[0];d.corepos=res[1];d.corelemma=res[2];}
    	//else{d.coreforme="";d.corepos="";d.corelemma="";}
    	if (d.corelemma=='unknown'){d.corelemma=d.coreforme;}
    	if (d.l5lemma=='unknown'){d.l5lemma=d.l5forme;}
    	if (d.l4lemma=='unknown'){d.l4lemma=d.l4forme;}
    	if (d.l3lemma=='unknown'){d.l3lemma=d.l3forme;}
    	if (d.l2lemma=='unknown'){d.l2lemma=d.l2forme;}
    	if (d.l1lemma=='unknown'){d.l1lemma=d.l1forme;}
    	if (d.r5lemma=='unknown'){d.r5lemma=d.r5forme;}
    	if (d.r4lemma=='unknown'){d.r4lemma=d.r4forme;}
    	if (d.r3lemma=='unknown'){d.r3lemma=d.r3forme;}
    	if (d.r2lemma=='unknown'){d.r2lemma=d.r2forme;}
    	if (d.r1lemma=='unknown'){d.r1lemma=d.r1forme;}
    	

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
/***************************** NEOPOS ROW BAR CHART ***********************/

var neoChart = dc.rowChart("#dc-neo-chart"+lang);

// neologismes dimensions : attention buggy as field = array!!!
var neoDim = facts.dimension(function(d){ return d.coreforme + "/"+d.corepos;});
var neoGroup = neoDim.group().reduceCount(function(d) { return d.coreforme + "/" + d.corepos; });


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
var periodChart = dc.barChart("#range-chart"+lang);

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
	console.log("Month groups :" + volumeByMonthGroup.size());
    
    // min and max date
    var minDate = volumeByDay.bottom(1)[0].dtg;
 	var maxDate = volumeByDay.top(1)[0].dtg;
	console.log(String(minDate) + ":" + String(maxDate));

  // setup timeline graph
  timeChart
  	//.width(700)
   .height(250)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    .dotRadius(5) //
    //.renderArea(true)
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .mouseZoomable(true)
    .brushOn(false)
    .renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .title(function(d){
      return dtgFormat(d.key)
      + "\nTotal : " + d.value;
      })
    .elasticY(true)
    .rangeChart(periodChart)
    .xUnits(d3.time.day)
    .renderHorizontalGridLines(true)    
    .x(d3.time.scale().domain([minDate, maxDate]))
    .xAxis();


  
  console.log("Time chart built");
  console.log(timeChart);
  
/******************  range chart **************/
periodChart /* dc.barChart('#monthly-volume-chart', 'chartGroup'); */
        .height(100)
        .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByDay)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);

/********************* composite chart ***********/
// Composite chart
var compositeChart = dc.compositeChart("#dc-comptime-chart"+lang);
var periodChart2 = dc.barChart("#range-chart2"+lang);

var volumeByDaycoreGroup = volumeByDay.group().reduce(
    function reduceAdd(p, v) { // add
        p[v.core] = (p[v.core] || 0) + 1; //for sum : v.value
        return p;
    },
    function reduceRemove(p, v) { // remove
        p[v.core] -= 1; // for sum v.value
        return p;
    },
    function reduceInitial() { // init
        return {};
    }); 

// build list of neo types
wordkeys= [];
reskeys = neoGroupTop.all();
for (var i = 0; i < reskeys.length; i++){wordkeys.push(reskeys[i].key);}
//console.log("Word keys");
//console.log(wordkeys);

console.log(volumeByDaycoreGroup.all());
console.log(wordkeys);
rescharts = wordkeys.map(function(name) {
        	return dc.barChart(compositeChart)
            	.dimension(volumeByDay)
            	.colors('#'+Math.random().toString(16).slice(-6))
            	.group(volumeByDaycoreGroup,name)
            	.valueAccessor(function(kv) {
                	return kv.value[name];
            	})
            	.title(function(kv) {
                	return name + ' ' + kv.key + ': ' + kv.value;
            	});
    		});
console.log(rescharts);
//console.log(compositeChart);
compositeChart
    .height(300)
    .shareTitle(false)
    .margins({top: 10, right: 10, bottom: 30, left: 40})
    
    //.dotRadius(5) //
    //.renderArea(true)
    //.dimension(volumeByDay)
    .transitionDuration(500)
    .mouseZoomable(true)
    .brushOn(false)
    //.renderDataPoints({radius: 3, fillOpacity: 0.8, strokeOpacity: 0.8})
    .elasticY(true)
	.compose(rescharts)
    .rangeChart(periodChart2)
    .xUnits(d3.time.day)
    .renderHorizontalGridLines(true)    
    .x(d3.time.scale().domain([minDate, maxDate]))
    .legend(dc.legend()) //.x(50).y(30)
    .xAxis();
/******************  range chart **************/
periodChart2 
        .height(100)
        .margins({top: 0, right: 0, bottom: 20, left: 40})
	    .dimension(volumeByDay)
    	.group(volumeByDayGroup)
        .centerBar(true)
        .elasticY(true)
        //.gap(1)
        .x(d3.time.scale().domain([minDate, maxDate]))
        //.round(d3.time.month.round)
        .alwaysUseRounding(true)
        .xUnits(d3.time.month);

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
            .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("Newspapers chart built");
//console.log(newspaperChartLow);
console.log(newspaperChart);



/*****************************  CORE (lemma, forme, pos) ROW BAR CHART ***********************/
// **************************forme
var coreformeChart = dc.rowChart("#dc-coreforme-chart"+lang);

//  coreformechart dimensions (with a fake group to keep just top and bottom 15
    var coreformeDimension = facts.dimension(function (d) { return d.coreforme; });
    var coreformeGroup = coreformeDimension.group().reduceCount(function (d) { return d.coreforme; });


/// for top	
function remove_empty_bins_key(source_group) {
    function non_zero_pred(d) {
    	if (d.key && d.value>0){return d.key;}
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


var coreformeGroupTop = remove_empty_bins_key(coreformeGroup);
//var coreformeGroupLow = remove_empty_bins_low(coreformeGroup);

console.log("coreforme groups :" + coreformeGroup.size());

// coreforme setup rowschart (TOP)
    coreformeChart
    		.width(200)
          .height(300)
            .dimension(coreformeDimension)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .group(coreformeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("coreformes chart built");
console.log(coreformeChart);

//pos
var coreposChart = dc.rowChart("#dc-corepos-chart"+lang);

//  coreposchart dimensions (with a fake group to keep just top and bottom 15
    var coreposDimension = facts.dimension(function (d) { return d.corepos; });
    var coreposGroup = coreposDimension.group().reduceCount(function (d) { return d.corepos; });

var coreposGroupTop = remove_empty_bins_key(coreposGroup);

console.log("corepos groups :" + coreposGroup.size());

// corepos setup rowschart (TOP)
    coreposChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(coreposDimension)
            .group(coreposGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("coreposs chart built");
console.log(coreposChart);

// lemma
var corelemmaChart = dc.rowChart("#dc-corelemma-chart"+lang);

//  corelemmachart dimensions (with a fake group to keep just top and bottom 15
    var corelemmaDimension = facts.dimension(function (d) { return d.corelemma; });
    var corelemmaGroup = corelemmaDimension.group().reduceCount(function (d) { return d.corelemma; });



var corelemmaGroupTop = remove_empty_bins_key(corelemmaGroup);
//var corelemmaGroupLow = remove_empty_bins_low(corelemmaGroup);

console.log("corelemma groups :" + corelemmaGroup.size());

// corelemma setup rowschart (TOP)
    corelemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(corelemmaDimension)
            .group(corelemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("corelemmas chart built");
//console.log(corelemmaChartLow);
console.log(corelemmaChart);




/*********************** contextes *********/
/// lemma

/***************************** LEFT CONTEXT 1 ROW BAR CHART ***********************/

var l1lemmaChart = dc.rowChart("#dc-l1lemma-chart"+lang);

//  l1lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l1lemmaDimension = facts.dimension(function (d) { return d.l1lemma; });
    var l1lemmaGroup = l1lemmaDimension.group().reduceCount(function (d) { return d.l1lemma; });



var l1lemmaGroupTop = remove_empty_bins_key(l1lemmaGroup);
//var l1lemmaGroupLow = remove_empty_bins_low(l1lemmaGroup);

console.log("l1lemma groups :" + l1lemmaGroup.size());
console.log(l1lemmaGroup.all());

// l1lemma setup rowschart (TOP)
    l1lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l1lemmaDimension)
            .group(l1lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l1lemmas chart built");
//console.log(l1lemmaChartLow);
console.log(l1lemmaChart);



/***************************** LEFT CONTEXT 2 ROW BAR CHART ***********************/

var l2lemmaChart = dc.rowChart("#dc-l2lemma-chart"+lang);

//  l2lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l2lemmaDimension = facts.dimension(function (d) { return d.l2lemma; });
    var l2lemmaGroup = l2lemmaDimension.group().reduceCount(function (d) { return d.l2lemma; });

var l2lemmaGroupTop = remove_empty_bins_key(l2lemmaGroup);
//var l2lemmaGroupLow = remove_empty_bins_low(l2lemmaGroup);

console.log("l2lemma groups :" + l2lemmaGroup.size());

// l2lemma setup rowschart (TOP)
    l2lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l2lemmaDimension)
            .group(l2lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("l2lemmas chart built");
//console.log(l2lemmaChartLow);
console.log(l2lemmaChart);



/***************************** LEFT CONTEXT 3 ROW BAR CHART ***********************/

var l3lemmaChart = dc.rowChart("#dc-l3lemma-chart"+lang);

//  l3lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l3lemmaDimension = facts.dimension(function (d) { return d.l3lemma; });
    var l3lemmaGroup = l3lemmaDimension.group().reduceCount(function (d) { return d.l3lemma; });

var l3lemmaGroupTop = remove_empty_bins_key(l3lemmaGroup);
//var l3lemmaGroupLow = remove_empty_bins_low(l3lemmaGroup);

console.log("l3lemma groups :" + l3lemmaGroup.size());

// l3lemma setup rowschart (TOP)
    l3lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l3lemmaDimension)
            .group(l3lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("l3lemmas chart built");
//console.log(l3lemmaChartLow);
console.log(l3lemmaChart);


/***************************** LEFT CONTEXT 4 ROW BAR CHART ***********************/

var l4lemmaChart = dc.rowChart("#dc-l4lemma-chart"+lang);

//  l4lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l4lemmaDimension = facts.dimension(function (d) { return d.l4lemma; });
    var l4lemmaGroup = l4lemmaDimension.group().reduceCount(function (d) { return d.l4lemma; });

var l4lemmaGroupTop = remove_empty_bins_key(l4lemmaGroup);
//var l4lemmaGroupLow = remove_empty_bins_low(l4lemmaGroup);

console.log("l4lemma groups :" + l4lemmaGroup.size());

// l4lemma setup rowschart (TOP)
    l4lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l4lemmaDimension)
            .group(l4lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l4lemmas chart built");
//console.log(l4lemmaChartLow);
console.log(l4lemmaChart);


/***************************** LEFT CONTEXT 5 ROW BAR CHART ***********************/

var l5lemmaChart = dc.rowChart("#dc-l5lemma-chart"+lang);

//  l5lemmachart dimensions (with a fake group to keep just top and bottom 15
    var l5lemmaDimension = facts.dimension(function (d) { return d.l5lemma; });
    var l5lemmaGroup = l5lemmaDimension.group().reduceCount(function (d) { return d.l5lemma; });

var l5lemmaGroupTop = remove_empty_bins_key(l5lemmaGroup);
//var l5lemmaGroupLow = remove_empty_bins_low(l5lemmaGroup);

console.log("l5lemma groups :" + l5lemmaGroup.size());

// l5lemma setup rowschart (TOP)
    l5lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l5lemmaDimension)
            .group(l5lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l5lemmas chart built");
//console.log(l5lemmaChartLow);
console.log(l5lemmaChart);





/***************************** RIGHT CONTEXT 1 ROW BAR CHART ***********************/

var r1lemmaChart = dc.rowChart("#dc-r1lemma-chart"+lang);

//  r1lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r1lemmaDimension = facts.dimension(function (d) { return d.r1lemma; });
    var r1lemmaGroup = r1lemmaDimension.group().reduceCount(function (d) { return d.r1lemma; });

var r1lemmaGroupTop = remove_empty_bins_key(r1lemmaGroup);
//var r1lemmaGroupLow = remove_empty_bins_low(r1lemmaGroup);

console.log("r1lemma groups :" + r1lemmaGroup.size());

// r1lemma setup rowschart (TOP)
    r1lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r1lemmaDimension)
            .group(r1lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("r1lemmas chart built");
console.log(r1lemmaChart);



/***************************** RIGHT CONTEXT 2 ROW BAR CHART ***********************/

var r2lemmaChart = dc.rowChart("#dc-r2lemma-chart"+lang);

//  r2lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r2lemmaDimension = facts.dimension(function (d) { return d.r2lemma; });
    var r2lemmaGroup = r2lemmaDimension.group().reduceCount(function (d) { return d.r2lemma; });

var r2lemmaGroupTop = remove_empty_bins_key(r2lemmaGroup);
//var r2lemmaGroupLow = remove_empty_bins_low(r2lemmaGroup);

console.log("r2lemma groups :" + r2lemmaGroup.size());

// r2lemma setup rowschart (TOP)
    r2lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r2lemmaDimension)
            .group(r2lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r2lemmas chart built");
console.log(r2lemmaChart);



/***************************** RIGHT CONTEXT 3 ROW BAR CHART ***********************/

var r3lemmaChart = dc.rowChart("#dc-r3lemma-chart"+lang);

//  r3lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r3lemmaDimension = facts.dimension(function (d) { return d.r3lemma; });
    var r3lemmaGroup = r3lemmaDimension.group().reduceCount(function (d) { return d.r3lemma; });

var r3lemmaGroupTop = remove_empty_bins_key(r3lemmaGroup);
//var r3lemmaGroupLow = remove_empty_bins_low(r3lemmaGroup);

console.log("r3lemma groups :" + r3lemmaGroup.size());

// r3lemma setup rowschart (TOP)
    r3lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r3lemmaDimension)
            .group(r3lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r3lemmas chart built");
console.log(r3lemmaChart);



/***************************** RIGHT CONTEXT 4 ROW BAR CHART ***********************/

var r4lemmaChart = dc.rowChart("#dc-r4lemma-chart"+lang);

//  r4lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r4lemmaDimension = facts.dimension(function (d) { return d.r4lemma; });
    var r4lemmaGroup = r4lemmaDimension.group().reduceCount(function (d) { return d.r4lemma; });

var r4lemmaGroupTop = remove_empty_bins_key(r4lemmaGroup);
//var r4lemmaGroupLow = remove_empty_bins_low(r4lemmaGroup);

console.log("r4lemma groups :" + r4lemmaGroup.size());

// r4lemma setup rowschart (TOP)
    r4lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r4lemmaDimension)
            .group(r4lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r4lemmas chart built");
console.log(r4lemmaChart);



/***************************** RIGHT CONTEXT 5 ROW BAR CHART ***********************/

var r5lemmaChart = dc.rowChart("#dc-r5lemma-chart"+lang);

//  r5lemmachart dimensions (with a fake group to keep just top and bottom 15
    var r5lemmaDimension = facts.dimension(function (d) { return d.r5lemma; });
    var r5lemmaGroup = r5lemmaDimension.group().reduceCount(function (d) { return d.r5lemma; });

var r5lemmaGroupTop = remove_empty_bins_key(r5lemmaGroup);
//var r5lemmaGroupLow = remove_empty_bins_low(r5lemmaGroup);

console.log("r5lemma groups :" + r5lemmaGroup.size());

// r5lemma setup rowschart (TOP)
    r5lemmaChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r5lemmaDimension)
            .group(r5lemmaGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r5lemmas chart built");
console.log(r5lemmaChart);


/// forme
/***************************** LEFT CONTEXT 1 ROW BAR CHART ***********************/

var l1formeChart = dc.rowChart("#dc-l1forme-chart"+lang);

//  l1formechart dimensions (with a fake group to keep just top and bottom 15
    var l1formeDimension = facts.dimension(function (d) { return d.l1forme; });
    var l1formeGroup = l1formeDimension.group().reduceCount(function (d) { return d.l1forme; });



var l1formeGroupTop = remove_empty_bins_key(l1formeGroup);
//var l1formeGroupLow = remove_empty_bins_low(l1formeGroup);

console.log("l1forme groups :" + l1formeGroup.size());

// l1forme setup rowschart (TOP)
    l1formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l1formeDimension)
            .group(l1formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l1formes chart built");
//console.log(l1formeChartLow);
console.log(l1formeChart);



/***************************** LEFT CONTEXT 2 ROW BAR CHART ***********************/

var l2formeChart = dc.rowChart("#dc-l2forme-chart"+lang);

//  l2formechart dimensions (with a fake group to keep just top and bottom 15
    var l2formeDimension = facts.dimension(function (d) { return d.l2forme; });
    var l2formeGroup = l2formeDimension.group().reduceCount(function (d) { return d.l2forme; });

var l2formeGroupTop = remove_empty_bins_key(l2formeGroup);
//var l2formeGroupLow = remove_empty_bins_low(l2formeGroup);

console.log("l2forme groups :" + l2formeGroup.size());

// l2forme setup rowschart (TOP)
    l2formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l2formeDimension)
            .group(l2formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("l2formes chart built");
//console.log(l2formeChartLow);
console.log(l2formeChart);



/***************************** LEFT CONTEXT 3 ROW BAR CHART ***********************/

var l3formeChart = dc.rowChart("#dc-l3forme-chart"+lang);

//  l3formechart dimensions (with a fake group to keep just top and bottom 15
    var l3formeDimension = facts.dimension(function (d) { return d.l3forme; });
    var l3formeGroup = l3formeDimension.group().reduceCount(function (d) { return d.l3forme; });

var l3formeGroupTop = remove_empty_bins_key(l3formeGroup);
//var l3formeGroupLow = remove_empty_bins_low(l3formeGroup);

console.log("l3forme groups :" + l3formeGroup.size());

// l3forme setup rowschart (TOP)
    l3formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l3formeDimension)
            .group(l3formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("l3formes chart built");
//console.log(l3formeChartLow);
console.log(l3formeChart);


/***************************** LEFT CONTEXT 4 ROW BAR CHART ***********************/

var l4formeChart = dc.rowChart("#dc-l4forme-chart"+lang);

//  l4formechart dimensions (with a fake group to keep just top and bottom 15
    var l4formeDimension = facts.dimension(function (d) { return d.l4forme; });
    var l4formeGroup = l4formeDimension.group().reduceCount(function (d) { return d.l4forme; });

var l4formeGroupTop = remove_empty_bins_key(l4formeGroup);
//var l4formeGroupLow = remove_empty_bins_low(l4formeGroup);

console.log("l4forme groups :" + l4formeGroup.size());

// l4forme setup rowschart (TOP)
    l4formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l4formeDimension)
            .group(l4formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l4formes chart built");
//console.log(l4formeChartLow);
console.log(l4formeChart);


/***************************** LEFT CONTEXT 5 ROW BAR CHART ***********************/

var l5formeChart = dc.rowChart("#dc-l5forme-chart"+lang);

//  l5formechart dimensions (with a fake group to keep just top and bottom 15
    var l5formeDimension = facts.dimension(function (d) { return d.l5forme; });
    var l5formeGroup = l5formeDimension.group().reduceCount(function (d) { return d.l5forme; });

var l5formeGroupTop = remove_empty_bins_key(l5formeGroup);
//var l5formeGroupLow = remove_empty_bins_low(l5formeGroup);

console.log("l5forme groups :" + l5formeGroup.size());

// l5forme setup rowschart (TOP)
    l5formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l5formeDimension)
            .group(l5formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l5formes chart built");
//console.log(l5formeChartLow);
console.log(l5formeChart);





/***************************** RIGHT CONTEXT 1 ROW BAR CHART ***********************/

var r1formeChart = dc.rowChart("#dc-r1forme-chart"+lang);

//  r1formechart dimensions (with a fake group to keep just top and bottom 15
    var r1formeDimension = facts.dimension(function (d) { return d.r1forme; });
    var r1formeGroup = r1formeDimension.group().reduceCount(function (d) { return d.r1forme; });

var r1formeGroupTop = remove_empty_bins_key(r1formeGroup);
//var r1formeGroupLow = remove_empty_bins_low(r1formeGroup);

console.log("r1forme groups :" + r1formeGroup.size());

// r1forme setup rowschart (TOP)
    r1formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r1formeDimension)
            .group(r1formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("r1formes chart built");
console.log(r1formeChart);



/***************************** RIGHT CONTEXT 2 ROW BAR CHART ***********************/

var r2formeChart = dc.rowChart("#dc-r2forme-chart"+lang);

//  r2formechart dimensions (with a fake group to keep just top and bottom 15
    var r2formeDimension = facts.dimension(function (d) { return d.r2forme; });
    var r2formeGroup = r2formeDimension.group().reduceCount(function (d) { return d.r2forme; });

var r2formeGroupTop = remove_empty_bins_key(r2formeGroup);
//var r2formeGroupLow = remove_empty_bins_low(r2formeGroup);

console.log("r2forme groups :" + r2formeGroup.size());

// r2forme setup rowschart (TOP)
    r2formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r2formeDimension)
            .group(r2formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r2formes chart built");
console.log(r2formeChart);



/***************************** RIGHT CONTEXT 3 ROW BAR CHART ***********************/

var r3formeChart = dc.rowChart("#dc-r3forme-chart"+lang);

//  r3formechart dimensions (with a fake group to keep just top and bottom 15
    var r3formeDimension = facts.dimension(function (d) { return d.r3forme; });
    var r3formeGroup = r3formeDimension.group().reduceCount(function (d) { return d.r3forme; });

var r3formeGroupTop = remove_empty_bins_key(r3formeGroup);
//var r3formeGroupLow = remove_empty_bins_low(r3formeGroup);

console.log("r3forme groups :" + r3formeGroup.size());

// r3forme setup rowschart (TOP)
    r3formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r3formeDimension)
            .group(r3formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r3formes chart built");
console.log(r3formeChart);



/***************************** RIGHT CONTEXT 4 ROW BAR CHART ***********************/

var r4formeChart = dc.rowChart("#dc-r4forme-chart"+lang);

//  r4formechart dimensions (with a fake group to keep just top and bottom 15
    var r4formeDimension = facts.dimension(function (d) { return d.r4forme; });
    var r4formeGroup = r4formeDimension.group().reduceCount(function (d) { return d.r4forme; });

var r4formeGroupTop = remove_empty_bins_key(r4formeGroup);
//var r4formeGroupLow = remove_empty_bins_low(r4formeGroup);

console.log("r4forme groups :" + r4formeGroup.size());

// r4forme setup rowschart (TOP)
    r4formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r4formeDimension)
            .group(r4formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r4formes chart built");
console.log(r4formeChart);



/***************************** RIGHT CONTEXT 5 ROW BAR CHART ***********************/

var r5formeChart = dc.rowChart("#dc-r5forme-chart"+lang);

//  r5formechart dimensions (with a fake group to keep just top and bottom 15
    var r5formeDimension = facts.dimension(function (d) { return d.r5forme; });
    var r5formeGroup = r5formeDimension.group().reduceCount(function (d) { return d.r5forme; });

var r5formeGroupTop = remove_empty_bins_key(r5formeGroup);
//var r5formeGroupLow = remove_empty_bins_low(r5formeGroup);

console.log("r5forme groups :" + r5formeGroup.size());

// r5forme setup rowschart (TOP)
    r5formeChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r5formeDimension)
            .group(r5formeGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r5formes chart built");
console.log(r5formeChart);





/// pos

/***************************** LEFT CONTEXT 1 ROW BAR CHART ***********************/

var l1posChart = dc.rowChart("#dc-l1pos-chart"+lang);

//  l1poschart dimensions (with a fake group to keep just top and bottom 15
    var l1posDimension = facts.dimension(function (d) { return d.l1pos; });
    var l1posGroup = l1posDimension.group().reduceCount(function (d) { return d.l1pos; });


var l1posGroupTop = remove_empty_bins_key(l1posGroup);
//var l1posGroupLow = remove_empty_bins_low(l1posGroup);

console.log("l1pos groups :" + l1posGroup.size());

// l1pos setup rowschart (TOP)
    l1posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l1posDimension)
            .group(l1posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l1poss chart built");
//console.log(l1posChartLow);
console.log(l1posChart);



/***************************** LEFT CONTEXT 2 ROW BAR CHART ***********************/

var l2posChart = dc.rowChart("#dc-l2pos-chart"+lang);

//  l2poschart dimensions (with a fake group to keep just top and bottom 15
    var l2posDimension = facts.dimension(function (d) { return d.l2pos; });
    var l2posGroup = l2posDimension.group().reduceCount(function (d) { return d.l2pos; });

var l2posGroupTop = remove_empty_bins_key(l2posGroup);
//var l2posGroupLow = remove_empty_bins_low(l2posGroup);

console.log("l2pos groups :" + l2posGroup.size());

// l2pos setup rowschart (TOP)
    l2posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l2posDimension)
            .group(l2posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("l2poss chart built");
//console.log(l2posChartLow);
console.log(l2posChart);



/***************************** LEFT CONTEXT 3 ROW BAR CHART ***********************/

var l3posChart = dc.rowChart("#dc-l3pos-chart"+lang);

//  l3poschart dimensions (with a fake group to keep just top and bottom 15
    var l3posDimension = facts.dimension(function (d) { return d.l3pos; });
    var l3posGroup = l3posDimension.group().reduceCount(function (d) { return d.l3pos; });

var l3posGroupTop = remove_empty_bins_key(l3posGroup);
//var l3posGroupLow = remove_empty_bins_low(l3posGroup);

console.log("l3pos groups :" + l3posGroup.size());

// l3pos setup rowschart (TOP)
    l3posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l3posDimension)
            .group(l3posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);



console.log("l3poss chart built");
//console.log(l3posChartLow);
console.log(l3posChart);


/***************************** LEFT CONTEXT 4 ROW BAR CHART ***********************/

var l4posChart = dc.rowChart("#dc-l4pos-chart"+lang);

//  l4poschart dimensions (with a fake group to keep just top and bottom 15
    var l4posDimension = facts.dimension(function (d) { return d.l4pos; });
    var l4posGroup = l4posDimension.group().reduceCount(function (d) { return d.l4pos; });

var l4posGroupTop = remove_empty_bins_key(l4posGroup);
//var l4posGroupLow = remove_empty_bins_low(l4posGroup);

console.log("l4pos groups :" + l4posGroup.size());

// l4pos setup rowschart (TOP)
    l4posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l4posDimension)
            .group(l4posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l4poss chart built");
//console.log(l4posChartLow);
console.log(l4posChart);


/***************************** LEFT CONTEXT 5 ROW BAR CHART ***********************/

var l5posChart = dc.rowChart("#dc-l5pos-chart"+lang);

//  l5poschart dimensions (with a fake group to keep just top and bottom 15
    var l5posDimension = facts.dimension(function (d) { return d.l5pos; });
    var l5posGroup = l5posDimension.group().reduceCount(function (d) { return d.l5pos; });

var l5posGroupTop = remove_empty_bins_key(l5posGroup);
//var l5posGroupLow = remove_empty_bins_low(l5posGroup);

console.log("l5pos groups :" + l5posGroup.size());

// l5pos setup rowschart (TOP)
    l5posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(l5posDimension)
            .group(l5posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("l5poss chart built");
//console.log(l5posChartLow);
console.log(l5posChart);





/***************************** RIGHT CONTEXT 1 ROW BAR CHART ***********************/

var r1posChart = dc.rowChart("#dc-r1pos-chart"+lang);

//  r1poschart dimensions (with a fake group to keep just top and bottom 15
    var r1posDimension = facts.dimension(function (d) { return d.r1pos; });
    var r1posGroup = r1posDimension.group().reduceCount(function (d) { return d.r1pos; });

var r1posGroupTop = remove_empty_bins_key(r1posGroup);
//var r1posGroupLow = remove_empty_bins_low(r1posGroup);

console.log("r1pos groups :" + r1posGroup.size());

// r1pos setup rowschart (TOP)
    r1posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r1posDimension)
            .group(r1posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);

console.log("r1poss chart built");
console.log(r1posChart);



/***************************** RIGHT CONTEXT 2 ROW BAR CHART ***********************/

var r2posChart = dc.rowChart("#dc-r2pos-chart"+lang);

//  r2poschart dimensions (with a fake group to keep just top and bottom 15
    var r2posDimension = facts.dimension(function (d) { return d.r2pos; });
    var r2posGroup = r2posDimension.group().reduceCount(function (d) { return d.r2pos; });

var r2posGroupTop = remove_empty_bins_key(r2posGroup);
//var r2posGroupLow = remove_empty_bins_low(r2posGroup);

console.log("r2pos groups :" + r2posGroup.size());

// r2pos setup rowschart (TOP)
    r2posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r2posDimension)
            .group(r2posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r2poss chart built");
console.log(r2posChart);



/***************************** RIGHT CONTEXT 3 ROW BAR CHART ***********************/

var r3posChart = dc.rowChart("#dc-r3pos-chart"+lang);

//  r3poschart dimensions (with a fake group to keep just top and bottom 15
    var r3posDimension = facts.dimension(function (d) { return d.r3pos; });
    var r3posGroup = r3posDimension.group().reduceCount(function (d) { return d.r3pos; });

var r3posGroupTop = remove_empty_bins_key(r3posGroup);
//var r3posGroupLow = remove_empty_bins_low(r3posGroup);

console.log("r3pos groups :" + r3posGroup.size());

// r3pos setup rowschart (TOP)
    r3posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r3posDimension)
            .group(r3posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r3poss chart built");
console.log(r3posChart);



/***************************** RIGHT CONTEXT 4 ROW BAR CHART ***********************/

var r4posChart = dc.rowChart("#dc-r4pos-chart"+lang);

//  r4poschart dimensions (with a fake group to keep just top and bottom 15
    var r4posDimension = facts.dimension(function (d) { return d.r4pos; });
    var r4posGroup = r4posDimension.group().reduceCount(function (d) { return d.r4pos; });

var r4posGroupTop = remove_empty_bins_key(r4posGroup);
//var r4posGroupLow = remove_empty_bins_low(r4posGroup);

console.log("r4pos groups :" + r4posGroup.size());

// r4pos setup rowschart (TOP)
    r4posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r4posDimension)
            .group(r4posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r4poss chart built");
console.log(r4posChart);



/***************************** RIGHT CONTEXT 5 ROW BAR CHART ***********************/

var r5posChart = dc.rowChart("#dc-r5pos-chart"+lang);

//  r5poschart dimensions (with a fake group to keep just top and bottom 15
    var r5posDimension = facts.dimension(function (d) { return d.r5pos; });
    var r5posGroup = r5posDimension.group().reduceCount(function (d) { return d.r5pos; });

var r5posGroupTop = remove_empty_bins_key(r5posGroup);
//var r5posGroupLow = remove_empty_bins_low(r5posGroup);

console.log("r5pos groups :" + r5posGroup.size());

// r5pos setup rowschart (TOP)
    r5posChart
    		.width(200)
          .height(300)
            .label(function(d){return d.key + ' (' + d.value + ')';})
            .dimension(r5posDimension)
            .group(r5posGroupTop)
           .rowsCap(15)
            .othersGrouper(false)
            .renderLabel(true)
    		.elasticX(true)
    		.ordering(function (d) {
    			return -d.value
			})
		    .turnOnControls(true)
	        .controlsUseVisibility(true);


console.log("r5poss chart built");
console.log(r5posChart);

/***************************** DATATABLES CHART ***********************/

// sauvegarde version limitée datatables
var dataTableDC = dc.dataTable("#dc-table-chart"+lang);

  // Create dataTable dimension
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  });
  
  console.log("Dimensions created");
 //neolo = lexie.toString()
 //console.log(neolo)

  /// render the datatable
    dataTableDC
//    .width(960).height(800)
    .dimension(timeDimension)
	.group(function(d) { return ""})
	//.size(10)
	.turnOnControls(true)
    .controlsUseVisibility(true)
    .columns([
      function(d) { return d.date; },
      function(d) { return '<a href=\"' + d.link + "\" target=\"_blank\">" +d.newspaper+"</a>";},
      function(d) { return d.subject; },
      function(d) { return get_text_from_neoveille(d);},
    ])
    .sortBy(function(d){ return d.dtg; })
    .order(d3.descending);
    //console.log(dataTableDC);

console.log("Datatable chart built");
console.log(timeDimension);

/***************************** RENDER ALL THE CHARTS  ***********************/
// Render the Charts
dc.renderAll(); 

}

function get_text_from_neoveille(d){
	res='...';
	if (d.l10forme){res = res + d.l10forme +' ';}
	if (d.l9forme){res = res + d.l9forme +' '; }
	if (d.l8forme){res = res + d.l8forme +' '; }
	if (d.l7forme){res = res + d.l7forme +' '; }
	if (d.l6forme){res = res + d.l6forme +' '; }
	if (d.l5forme){res = res + d.l5forme +' '; }
	if (d.l4forme){res = res + d.l4forme +' '; }
	if (d.l3forme){res = res + d.l3forme +' '; }
	if (d.l2forme){res = res + d.l2forme +' '; }
	if (d.l1forme){res = res + d.l1forme +' '; }
	if (d.coreforme){res = res + "<span style='background-color: #ffa366'>" + d.coreforme +'</span> '; }
	if (d.r1forme){res = res + d.r1forme +' '; }
	if (d.r2forme){res = res + d.r2forme +' '; }
	if (d.r3forme){res = res + d.r3forme +' '; }
	if (d.r4forme){res = res + d.r4forme +' '; }
	if (d.r5forme){res = res + d.r5forme +' '; }
	if (d.r6forme){res = res + d.r6forme +' '; }
	if (d.r7forme){res = res + d.r7forme +' '; }
	if (d.r8forme){res = res + d.r8forme +' '; }
	if (d.r9forme){res = res + d.r9forme +' '; }
	if (d.r10forme){res = res + d.r10forme +' '; }
	res2 = res.replace("\\",'');
	return res2 + '...';

}


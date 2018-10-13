// user management
$('#users-list').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-users-management.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});
// user profile
$('#user-profile').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-user-profile.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});
// user profile
$('#user-preferences').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-user-profile.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});


// corpus
$('#sources').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#sources-dev').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-dev.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#encoding').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );					
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-encoding.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#format').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-format.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});
                                          
$('#newspaper').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );					
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-newspaper.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#domain').click(function()
{
						$( "li.active" ).attr( "class", "inactive" );
				//alert($("#container-fluid").html());
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-domain.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#country').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-country.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#lang').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-corpus-lang.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

// neologismes de forme
$('#neo-cand').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neologismes-cand.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#neo-cand2').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
			/*		$.post( "table/datatable-neologismes-cand2.php", function( data,statusTxt,xhr ) {
						if(statusTxt == "error"){alert("Error: " + xhr.status + ": " + xhr.statusText);}
						else{
  							$( "#container-fluid" ).html( data );
  							//alert( "Load was performed." );
						}
					});*/
        	    	$("#container-fluid").load("table/datatable-neologismes-cand2.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});


$('#neo-cand3').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neologismes-cand3.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});
$('#neo-cand-type').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neologismes-cand-type.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

/// dicos
$('#dico-ref').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-dico-ref.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#dico-ref2').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-dico-ref-compose.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#dico-ref3').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-dico-ref-termino.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#dico-excl').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-dico-ref-excluded.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

// neologismes semantiques

$('#neo-candsem-freq').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neo-candsem.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#neo-candsem-synt').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neo-candsem-synt.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#neo-candsem-sem-bk').click(function()
{
                                        //alert($("#container-fluid").html());
                                        $( "li.active" ).attr( "class", "inactive" );
                                        $( this ).closest( "li" ).attr( "class", "active" );
                        $("#container-fluid").load("table/datatable-neo-candsem-sem.php",function(responseTxt, statusTxt, xhr)
                        {
                                //if(statusTxt == "success")
                                //alert("External content loaded successfully!");
                                if(statusTxt == "error")
                                alert("Error: " + xhr.status + ": " + xhr.statusText);
                                });
});

/// base description neologismes
$('#neo-db').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neo-db.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

/// base description neologismes
$('#neo-db-dev').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neo-db-dev.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

$('#neo-db-dev2').click(function()
{
                                        //alert($("#container-fluid").html());
                                        $( "li.active" ).attr( "class", "inactive" );
                                        $( this ).closest( "li" ).attr( "class", "active" );
                        $("#container-fluid").load("table/datatable-neo-db-dev-demo.php",function(responseTxt, statusTxt, xhr)
                        {
                                //if(statusTxt == "success")
                                //alert("External content loaded successfully!");
                                if(statusTxt == "error")
                                alert("Error: " + xhr.status + ": " + xhr.statusText);
                                });
});


// search
$('#neo-search2').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-search.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});


$('#neo-db-param').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-neodb-params.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});
    
// outils
$('#neo-tools1').click(function()
{
					//alert($("#container-fluid").html());
					$( "li.active" ).attr( "class", "inactive" );
					$( this ).closest( "li" ).attr( "class", "active" );
        	    	$("#container-fluid").load("table/datatable-tools1.php",function(responseTxt, statusTxt, xhr)
        	    	{
        			//if(statusTxt == "success")
            			//alert("External content loaded successfully!");
        			if(statusTxt == "error")
            			alert("Error: " + xhr.status + ": " + xhr.statusText);
    				});
});

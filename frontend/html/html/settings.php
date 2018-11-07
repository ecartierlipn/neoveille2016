<?php
// global variables
$lang=''
// languages
$GLOBALS['language']['french'] = 'fr' 
$GLOBALS['language']['english'] = 'en' 
$GLOBALS['language']['german'] = 'de' 
$GLOBALS['language']['dutch'] = 'nl' 
$GLOBALS['language']['spanish'] = 'es'
$GLOBALS['language']['italian'] = 'it'  
$GLOBALS['language']['polish'] = 'pl' 
$GLOBALS['language']['greek'] = 'gr' 
$GLOBALS['language']['czech'] = 'cz' 
$GLOBALS['language']['chinese'] = 'zh' 
$GLOBALS['language']['russian'] = 'ru' 

// Databases
$GLOBALS['database']['type'] = 'mysql' 
$GLOBALS['database']['host'] = 'localhost' 
$GLOBALS['database']['user'] = 'root' 
$GLOBALS['database']['pass'] = 'root' 
$GLOBALS['database']['table_users'] = 'rssdata.users' 
$GLOBALS['database']['table_corpus'] = 'rssdata.RSS_INFO' 
$GLOBALS['database']['table_formal_neo'] = 'datatables.neologismes_' + $lang
$GLOBALS['database']['table_sem_neo'] = 'neosem.neologismes_' + $lang
$GLOBALS['database']['table_neologismes'] = 'neo3.terms_'  + $lang



// Apache Solr
$GLOBALS['search_engine']['type'] = 'solr'
$GLOBALS['search_engine']['host'] = 'http://localhost:8983/solr/'
$GLOBALS['search_engine']['collection']['fr'] = 'rss_french' 
$GLOBALS['search_engine']['collection']['en'] = 'rss_english' 
$GLOBALS['search_engine']['collection']['nl'] = 'rss_dutch' 
$GLOBALS['search_engine']['collection']['de'] = 'rss_german' 
$GLOBALS['search_engine']['collection']['es'] = 'rss_spanish' 
$GLOBALS['search_engine']['collection']['pt'] = 'rss_portuguese' 
$GLOBALS['search_engine']['collection']['pl'] = 'rss_polish' 
$GLOBALS['search_engine']['collection']['cz'] = 'rss_czech' 
$GLOBALS['search_engine']['collection']['zh'] = 'rss_chinese' 
$GLOBALS['search_engine']['collection']['ru'] = 'rss_russian'
$GLOBALS['search_engine']['collection']['it'] = 'rss_italian'


 


function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
}
?>

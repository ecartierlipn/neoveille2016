<?php
// global variables. Note : all files position is relative to the current directory

$lang='';
// installed languages
$GLOBALS['language']['french'] = 'fr' ;
$GLOBALS['language']['english'] = 'en' ;
$GLOBALS['language']['german'] = 'de' ;
$GLOBALS['language']['dutch'] = 'nl' ;
$GLOBALS['language']['spanish'] = 'es';
$GLOBALS['language']['italian'] = 'it'  ;
$GLOBALS['language']['polish'] = 'pl' ;
$GLOBALS['language']['greek'] = 'gr' ;
$GLOBALS['language']['czech'] = 'cz' ;
$GLOBALS['language']['chinese'] = 'zh' ;
$GLOBALS['language']['russian'] = 'ru' ;

// Databases
$GLOBALS['database']['type'] = 'mysql' ;
$GLOBALS['database']['host'] = 'localhost'; 
$GLOBALS['database']['user'] = 'root' ;
$GLOBALS['database']['pass'] = 'root' ;
$GLOBALS['database']['table_users'] = 'rssdata.users'; 
$GLOBALS['database']['table_corpus'] = 'rssdata.RSS_INFO'; 
$GLOBALS['database']['table_formal_neo'] = 'datatables.neologismes_' + $lang;
$GLOBALS['database']['table_sem_neo'] = 'neosem.neologismes_' + $lang;
$GLOBALS['database']['table_neologismes'] = 'neo3.terms_'  + $lang;



// Apache Solr
$GLOBALS['search_engine']['type'] = 'solr';
$GLOBALS['search_engine']['host'] = 'https://tal.lipn.univ-paris13.fr/solr/';
$GLOBALS['search_engine']['collection']['fr'] = 'rss_french' ;
$GLOBALS['search_engine']['collection']['en'] = 'rss_english' ;
$GLOBALS['search_engine']['collection']['nl'] = 'rss_dutch' ;
$GLOBALS['search_engine']['collection']['de'] = 'rss_german' ;
$GLOBALS['search_engine']['collection']['es'] = 'rss_spanish' ;
$GLOBALS['search_engine']['collection']['pt'] = 'rss_portuguese'; 
$GLOBALS['search_engine']['collection']['pl'] = 'rss_polish' ;
$GLOBALS['search_engine']['collection']['cz'] = 'rss_czech' ;
$GLOBALS['search_engine']['collection']['zh'] = 'rss_chinese'; 
$GLOBALS['search_engine']['collection']['ru'] = 'rss_russian';
$GLOBALS['search_engine']['collection']['it'] = 'rss_italian';

// external corpus utility (for candidate neologisms) : google ngrams , reference corpus online etc.
$GLOBALS['external_app']['pl'] = 'http://www.nkjp.uni.lodz.pl/index_adv.jsp?Submit=%C2%A0%C2%A0%C2%A0%C2%A0SZUKAJ%C2%A0%C2%A0%C2%A0%C2%A0&span=0&preserve_order=true&perpage=100&sort=srodek&second_sort=srodek&groupBy=---&groupByLimit=1&m_style=---&m_channel=---&m_date_from=RRRR&m_date_to=RRRR&m_nkjpSubcorpus=balanced&m_title_mono=&m_title_mono_NOT=&m_paragraphKWs_MUST=&m_paragraphKWs_MUST_NOT=&m_text_title=&dummystring=%C4%85%C4%84%C4%87%C4%86%C4%99%C4%98%C5%82%C5%81%C5%84%C5%83%C3%B3%C3%93%C5%9B%C5%9A%C5%BA%C5%B9%C5%BC%C5%BB&query=';
// 'http://nkjp.pl/poliqarp/nkjp1800/query/?query='; polycarp corpus
$GLOBALS['external_app']['fr'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=19&smoothing=3&content=';
$GLOBALS['external_app']['de'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=20&smoothing=3&content=';
$GLOBALS['external_app']['en'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=1508&corpus=15&smoothing=3&content=';
$GLOBALS['external_app']['es'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=21&smoothing=3&content=';
$GLOBALS['external_app']['nl'] = 'https://portal.clarin.inl.nl/opensonar_whitelab/search/results?within=&view=1&sort=&first=0&group=&number=50&from=1&query=';
$GLOBALS['external_app']['it'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=22&smoothing=3&content=';
$GLOBALS['external_app']['gr'] = '';
$GLOBALS['external_app']['cz'] = 'https://kontext.korpus.cz/view?ctxattrs=word&attr_vmode=mouseover&pagesize=40&refs=%3Ddoc.title&viewmode=kwic&attrs=word&corpname=syn2015&attr_allpos=all&q=';
$GLOBALS['external_app']['zh'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=11&smoothing=3&content=';
$GLOBALS['external_app']['ru'] = 'https://books.google.com/ngrams/graph?case_insensitive=on&year_start=1800&year_end=2008&corpus=25&smoothing=3&content=';


// static files path
$GLOBALS['static_files']['path']= '../lib/';
$GLOBALS['static_files']['data']= './data/';

/**************************************** MODULES ******************************/
// CORPUS : define textual information sources
// global information
$GLOBALS['corpus']['html_file']= './table/index_corpus.php';
$GLOBALS['corpus']['js_file']= './js/table.corpus.js';
$GLOBALS['corpus']['db_file']= './php/table.corpus.php';
$GLOBALS['corpus']['db']= 'rssdata'; // main db
$GLOBALS['corpus']['table']= 'RSS_INFO'; // main table
$GLOBALS['corpus']['table_fields']= array('NAME_RSS','ID_PAYS','ID_LANGUE', 'ID_JOURNAL', 'ID_TYPE', 'ID_AUDIENCE', 'ID_FREQUENCE', 'ID_LOCALITE', 'ID_FORMAT', 'ID_ENCODING'); // array of metadata to be used
 
// - corpus_synthesis : name of csv file for corpus synthesis. See backend/utils/generate_corpus_synthesis.py
// 	 used by : js/table.corpus.js (function get_corpus_info_jsondata2(lang,callback) ) and  js/table.corpus_noteditable.js (idem)
// TBD : check possibility of querying directly Apache Solr
$GLOBALS['corpus_synthesis']['fr']= 'data/rss_french.csv';
$GLOBALS['corpus_synthesis']['pl']= 'data/rss_polish.csv';
$GLOBALS['corpus_synthesis']['de']= 'data/rss_german.csv';
$GLOBALS['corpus_synthesis']['en']= 'data/rss_english.csv';
$GLOBALS['corpus_synthesis']['es']= 'data/rss_spanish.csv';
$GLOBALS['corpus_synthesis']['nl']= 'data/rss_netherlands.csv';
$GLOBALS['corpus_synthesis']['it']= 'data/rss_italian.csv';
$GLOBALS['corpus_synthesis']['gr']= 'data/rss_greek.csv';
$GLOBALS['corpus_synthesis']['cz']= 'data/rss_czech.csv';
$GLOBALS['corpus_synthesis']['zh']= 'data/rss_chinese.csv';
$GLOBALS['corpus_synthesis']['ru']= 'data/rss_russian.csv';
$GLOBALS['corpus_synthesis']['br']= 'data/rss_brasilian.csv';
$GLOBALS['corpus_synthesis']['pt']= 'data/rss_portuguese.csv';

// FORMAL NEOLOGISMS CANDIDATE : interface to decide of an automatically detected neologisms is one or not
// global information
$GLOBALS['neo_cand']['html_file']= './index_neo_cand.php';
$GLOBALS['neo_cand']['js_file']= './js/table.neocand_srv.js';
$GLOBALS['neo_cand']['db_file']= './php/table.neocand.php';
$GLOBALS['neo_cand']['db']= 'datatables'; // main db
$GLOBALS['neo_cand']['table']= 'neologismes_' + $lang; // main table
$GLOBALS['neo_cand']['table_fields']= array(); // array of metadata to be used
// list of candidate neologisms categories
$GLOBALS['neo_cand']['categories']= array('dictionnaire (mots simples)','dictionnaire (mots composés)','dictionnaire (terminologie)','erreurs (typographie)','erreurs (autres erreurs)', 'xénismes', 'gentilés', 'néologismes (tous cas)');



//  NEOLOGISMS DATABASE : description of neologisms 
// global information
$GLOBALS['neo_db']['html_file']= './index_neo-db.php';
$GLOBALS['neo_db']['js_file']= './js/table.neo-db_srv.js';
$GLOBALS['neo_db']['db_file']= './php/table.neo-db_srv.php';
$GLOBALS['neo_db']['db']= 'neo3'; // main db
$GLOBALS['neo_db']['table']= 'termes_copy'; // main table
$GLOBALS['neo_db']['table_fields']= array(); // array of metadata to be used


?>

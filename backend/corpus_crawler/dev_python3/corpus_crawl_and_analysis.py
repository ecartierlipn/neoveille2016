#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
program to retrieve articles from rss feeds (and potentially other web sources)
See main() function for details - Python 2.7+
'''
import os,sys,re,time
from datetime import datetime
import configparser
import mysql.connector
from mysql.connector import Error
import logging
import pickle,json
import feedparser
feedparser.USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0'
from langdetect import detect
import pysolr

# from lib subdirectory
from lib import URLutils_p3


class corpus:
    '''classe corpus pour gerer les corpus : il suffit de donner la langue, et eventuellement où se trouve la source (db, file),
    et le type de corpus (rss, web twitter) - les deux derniers sont à developper
    '''
    def __init__(self, lang, lang_iso,source,datatype,ling_config):
        "construit une instance avec les attributs de base"
        self.lang = lang
        self.lang_iso = lang_iso
        self.source=source # db
        self.datatype=datatype
        self.ling_config= ling_config

    def get_corpus_list_fromDB(self,mysqluser,mysqlpassword,mysqlhost,mysqldb_corpus):
        """ Connect to MySQL database """
        log.info("retrieving corpus list from db")
        #print ("Retrieving corpus list from db")
        rssfeeds={}
        try:
            conn = mysql.connector.connect(host=mysqlhost,
                                           database=mysqldb_corpus,
                                           user=mysqluser,
                                           password=mysqlpassword)
            if conn.is_connected():
                #print('Connected to MySQL database')
                cursor = conn.cursor()
                args = [lang_iso,self.datatype]
                results = cursor.callproc('GET_CORPUS', args)
                for result in cursor.stored_results():
                    #rows = results.fetchall()
                    #print len(result.fetchall())
                    for row in result.fetchall():
                        #print row[1] + "-" + row[2]
                        log.info("Info : " + str(row))
                        rssfeeds[row[1]]=row[2] + ";" + row[3]+ ";" + row[4]+ ";" + row[5]+ ";" + row[6]+ ";" + row[7]+ ";" + str(row[0]) + ";" + row[8]+ ";" + str(row[9]) + ";" + str(row[10])

                cursor.close()

        except Error as e:
            log.exception(str(e))
            #print(e)
            return False

        finally:
            conn.close()
            self.rssfeeds = rssfeeds

    def get_last_indexed_fromDB(self,mysqluser,mysqlpassword,mysqlhost,mysqldb_corpus):
        """ function to retrieve last indexed articles (last day) to avoid retriveing them again """
        log.info("retrieving last indexed url (last day) from db")
        rssfeeds={}
        try:
            conn = mysql.connector.connect(host=mysqlhost,
                                           database=mysqldb_corpus,
                                           user=mysqluser,
                                           password=mysqlpassword)
            if conn.is_connected():
                #print('Connected to MySQL database')
                cursor = conn.cursor()
                args = [self.lang_iso]
                results = cursor.callproc('get_last_indexed2', args)
                for result in cursor.stored_results():
                    #rows = results.fetchall()
                    #print result.fetchall()
                    for row in result.fetchall():
                        #print row[1] + "-" + row[2]
                        rssfeeds[row[0]]=1

                cursor.close()

        except Error as e:
            log.exception(str(e))
            #print(e)
            return False

        finally:
            conn.close()
            self.lastindexed = rssfeeds


    def retrieve_corpus(self,save=True):
        """main method to retrieve corpus data"""
        log.info("retrieving corpus")
        if self.datatype == 'rss':
            feeds = rssfeeds(self.rssfeeds,self.lang,self.lang_iso,self.ling_config)
            feeds.retrieve_feeds(self.lastindexed,save)
        elif self.datatype =="web":
            retrieve_website(self.websites)
        elif self.datatype=='twitter':
            retrieve_twitter(self.twitterconfig)
        else:
            return False



class rssfeeds(corpus):
    def __init__(self, feedlist, lang, lang_iso,ling_config,constraints={}):
        "construit une instance avec les attributs de base"
        self.feedlist = feedlist
        self.lang=lang
        self.lang_iso=lang_iso
        self.ling_config = ling_config
        if len(constraints)>0:
            self.constraints = constraints

    def retrieve_feeds(self,lastindexed,save=True):
        """recupere les articles de chaque fil"""
        log.info("Retrieving rss feeds from list : ")
        rss= self.feedlist
        log.info(str(len(rss)) + " rss feeds")
        # neologisms (for hunspell and database save)
        neologisms = {}
        for url in rss:
            log.info("Retrieving feeds for :" + url)
            #print ("Retrieving feeds for :" + url)
            d = feedparser.parse(url)
            metas = re.split(r";",rss[url])
            log.info(metas)
            
            #print metas
            lang_en = metas[7] # for solr indexing

            #log.info("Retrieving feeds for :" + url + ":" +  str(metas ) + "..." + "\n")
            entries = d.get("entries")
            row={}
            res=[]
            log.info("\n"+ str(len(entries )) + " articles")
            #print("\n"+ str(len(entries )) + " articles")
            #print str(len(entries )) + " articles" + " for " + url +"\n"
            if len(entries)==0:
                continue
            for e in entries: # to test limit nber of articles [0:2]
                #print(e)
                if e['link'] in lastindexed:
                    log.info("Skipping "+ e["link"] + " : already retrieved")
                    continue
                log.info("Retrieving " + e['link'])
                #print ("Retrieving : " + e['link'])
                #print ("Authors : " + e['author'])
                row['ID_RSS'] = metas[6]
                row['country'] = metas[0]
                row['source'] = metas[1]
                row['subject'] = metas[2]
                row['subject2'] = metas[3]
                row['source-link'] = url
                row['title'] = URLutils_p3.strip_html_tags(e['title'])
                # authors
                if 'authors' in e:
                    row['authors'] = [res['name'] for res in e['authors'] if 'name' in res] # specific for Plone?
                    #print(row['authors'])
                elif 'authors' in e and len(row['authors']) == 0:
                    row['authors'] = e['authors'] # specific for Plone?
                    #print(row['authors'])
                if 'summary' in e:
                    row['description'] =  URLutils_p3.remove_links(URLutils_p3.strip_html_tags(e['summary']))
                    row['contents'] = row['title'] #+ "\n" + row['description']
                elif 'description' in e:
                    row['description'] =  URLutils_p3.remove_links(URLutils_p3.strip_html_tags(e['description']))
                    row['contents'] = row['title'] #+ "\n" + row['description']
                else:
                    row['contents'] = URLutils_p3.remove_links(URLutils_p3.strip_html_tags(e['title']))
                    row['description'] =''
                # plos one : <link rel="related" type="text/xml" href="
                #print(e.links)
                #if e['link'].type =='text/xml':
                #    row['link']= e['link'].href
                row['link'] = e['link']
                #print(row['link'])
                row['dateS'] = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
                if 'media:keywords' in e:
                    row['keywords'] = e['media:keywords']
                else:
                    row['keywords']=""
                if 'category' in e:
                    row['category'] = e['category']
                else:
                    row['category']=""
                article = URLutils_p3.get_url_article2(row['link'],stoplist)
                if article:
                    row['contents']=row['contents'] + "\n" + article
                # lang detection to skip other language contents
                if len(row['contents'])<5:
                    log.warning("Contents empty. Skipping this article.")
                    continue
                langd = detect(row['contents'])
                if (langd not in lang_detect):
                    log.warning("Problem with language detection for contents : " + row['contents'] +
                                "\nAutomatic detection says : [" + langd + "] whereas expected language is " +
                                str(lang_detect) + "\nSkipping analysis for this document and deleting it from database.")
                    continue
                # now ling_pipeline
                # spacy (en, fr, de, es,pt, nl)
                if self.ling_config['type']=='spacy' or self.ling_config['type']=='spacy+hunspell':
                    # linguistic analysis {'tokens': tokens},{'lemmapos': lemmapos},{'oov': oov},{'ne': entities}
                    ling_analysis = get_nlp(ling_config['spacy_server'], row['contents'])
                    if ling_analysis:
                        row['tokens'] = " ".join(ling_analysis[0]['tokens'])
                        row['lemmapos'] = " ".join(ling_analysis[1]['lemmapos'])
                        row['lemmapos_dps'] = " ".join(ling_analysis[2]['lemmapos_dps'])
                        row['oov'] = " ".join(ling_analysis[3]['oov'])
                        
                        # dict of neologisms : add url of source document
                        log.info("OOV : " + str(ling_analysis[3]['oov']))
                        if len(ling_analysis[3]['oov'])>0:
                            for neo in ling_analysis[3]['oov']:
                                log.info("Current neologism : " + str(neo) + " : " + row['link'])
                                #neologisms.get(neo,[]).append(row['link'])
                                neologisms.setdefault(neo, []).append(row['link'])
                        row['ne_dps'] = " ".join(ling_analysis[4]['ne_dps'])
                # hunspell : deprecated
                elif self.ling_config['type']=='hunspell':
                    ling_analysis = get_hunspell(row['contents'])
                    if ling_analysis:
                        #print(type(ling_analysis[0]['tokens']))
                        #print(ling_analysis[0]['tokens'])
                        row['tokens'] = " ".join(ling_analysis[0]['tokens'])
                        #row['lemmapos'] = " ".join(ling_analysis[1]['lemmapos'])
                        #row['lemmapos_dps'] = " ".join(ling_analysis[2]['lemmapos_dps'])
                        row['oov'] = " ".join(ling_analysis[3]['oov'])
                        # dict of neologisms : add url of source document
                        for neo in ling_analysis[3]['oov']:
                            neologisms[neo]= neologisms.get(neo,[]).append(row['link'])
                        #row['ne_dps'] = " ".join(ling_analysis[4]['ne_dps'])                    
                    
                res.append(row)
                #saved_urls[e['link']]=1 # sauvegarde des urls analysees
                #flog.write("Results for link : " + str(row + "\n"))
                row={}
            log.info("All articles parsed. Now saving to db and search engine.")
            if save==True:
                save_rsscorpus_to_DB(res,self.lang_iso) # save links for next retrieval "already indexed"
                update_to_SOLR(res) # save to Solr
        # neologisms
        # TBD : add info with neologism to saved data
        # hunspell check 
        log.info("All rss feeds processed. Processing neologisms : " + str(neologisms))
        if re.search('hunspell',self.ling_config['type']) and len(neologisms)>0:
            log.info("Neologisms after spacy : " + str(len(neologisms)) + " : " + str(neologisms.keys()))
            neos_info = hunspell_check_text(" ".join(neologisms.keys()),ling_config['hunspell'])
            log.info("Neologisms after hunspell : " + str(len(neos_info.keys())) + " : " + str(neos_info))                        
            if len(neos_info.keys())>0:
                add_neologisms_to_db_with_docs(neologisms,neos_info,self.lang_iso.upper()) # save neologisms to database table for the given language
        # exclusion dico
        if re.search('exclusiondico',self.ling_config['type']) and len(neologisms)>0:
            log.info("Neologisms after spacy/hunspell : " + str(len(neologisms)) + " : " + str(neologisms.keys()))
            neos_info = [k for k in neologisms.keys() if not(lc(k) in ling_config['exclusiondico'].keys())]
            for key in neologisms:
                if not(key in neos_info):
                    delete(neologisms[key])            
            log.info("Neologisms after exclusion dico : " + str(len(neos_info.keys())) + " : " + str(neos_info))                        
            if len(neos_info.keys())>0:
                add_neologisms_to_db_with_docs(neologisms,neos_info,self.lang_iso.upper()) # save neologisms to database table for the given language
                                
        else:
            #add_neologisms_to_db(neologisms,{}, self.lang_iso.upper()) # save neologisms to database table for the given language
            add_neologisms_to_db_with_docs(neologisms,{}, self.lang_iso.upper()) # save neologisms to database table for the given language


################## utility functions
            
def load_exclusion_dico(lang):
    """ Connect to MySQL database and return a dictionary with all the excluded forms as keys from all dictionaries 
    for this language lang"""
    dict_exclusion={}
    try:
        conn = mysql.connector.connect(host=mysqlhost,
                                       database=mysqldb_corpus,
                                       user=mysqluser,
                                       password=mysqlpassword)
        if conn.is_connected():
            #log.info('Connected to Mysql database' + "\n")
            cursor = conn.cursor()
            args = [lang]
            results = cursor.callproc('get_dicos_generic', args)
            for result in cursor.stored_results():
                for row in result.fetchall():
                    dict_exclusion[row[0]]=1
            cursor.close()
            conn.close()
            log.info("Exclusion dico loaded : " + str(len(dict_exclusion)) + " entries.")
            return dict_exclusion

    except Error as e:
        log.exception(str(e))
        return False

            
            

def update_to_SOLR(res):
    ''' update solr with all data with pysolr'''
    # delete ID_RSS from res (useless for solr)
    for doc in res:
        del(doc['ID_RSS'])
    try:
        solr =  pysolr.Solr(solr_host+ solr_collection) #, always_commit=True
        resp = solr.add(res, commit=True)
        log.info(resp)
    except Exception as e:
        log.info("Error adding documents to Apache Solr :" + str(e))
        #print("Saving data to be added to dump file :" + str(e))
        timestr = time.strftime("%Y-%m-%d-%H-%M-%S")        
        pickle.dump(res, open("./tobeindexed/lang_en_" +  timestr + ".pickle", 'wb')) # debug tool


def save_rsscorpus_to_DB(res,lang_iso):
    """ Save rss corpus to database - just links, country information (for use to check already retrieved web pages) """
    log.info("Saving rss corpus to database")
    try:
        conn = mysql.connector.connect(host=mysqlhost,
                                       database=mysqldb_corpus,
                                       user=mysqluser,
                                       password=mysqlpassword,
                                       charset='utf8mb4',
                                       collation='utf8mb4_general_ci',
                                       autocommit=True)
        
        cursor=conn.cursor()
        if conn.is_connected():
            str=''
            for rss in res:
                if len(rss['link'])>255:
                    rss['link'] = rss['link'][0:254]
                args = [rss['link'],lang_iso,0]
                results = cursor.callproc('ADD_RSS_DATA', args)
                if results:
                    log.info("Article saved to DB" + rss['link'])
                else:
                    log.error("Problem with this article " + str(results))

    except mysql.connector.Error as e:
        log.error(e.errno)
        log.error(e.sqlstate)
        log.error(e.msg)
        return False

    finally:
        cursor.close()
        conn.close()




def add_neologisms_to_db_with_docs(neolist,neosinfo,lang):
    """ add neologisms to database for web interface validation """
    log.info("Saving neologisms to database" + str(neolist) + ' : and info : ' + str(neosinfo))
    #for  neo in neolist:
    #    log.info("Saving neologism : " + neo + " : " + str(len(neolist[neo])) + ' : ' + neosinfo.get(neo,'spacy:oov'))

    proc_name = 'ADD_NEOLOGISM_DOCS_' + lang
    log.info("Saving with procedure : " + proc_name)
    try:
        conn = mysql.connector.connect(host=mysqlhost,
                                       database=mysqldb_neo,
                                       user=mysqluser,
                                       password=mysqlpassword,
                                       autocommit=True)
        if conn.is_connected():
            for neo in neolist.keys():
                #log.info("Saving neologism : " + neo + " : " + str(len(neolist[neo])) + ' : ' + neosinfo.get(neo,'spacy:oov'))
                args=[neo, len(neolist[neo]), neosinfo.get(neo,'spacy:oov'), json.dumps(neolist[neo]), 0]
                log.info("Saving neologism with following data : " + str(args))
                cursor = conn.cursor()
                results = cursor.callproc(proc_name, args)
                log.info(str(results )+ "\n")
                cursor.close()

    except Error as e:
        log.warning(str(e))
        return False

    finally:
        conn.close()
        return True
 




def add_neologisms_to_db(neolist,neosinfo, lang):
    """ add neologisms to database for web interface validation """
    log.info("Saving neologisms to database" + str(neolist) + ' : and info : ' + str(neosinfo))
    #for  neo in neolist:
    #    log.info("Saving neologism : " + neo + " : " + str(len(neolist[neo])) + ' : ' + neosinfo.get(neo,'spacy:oov'))

    proc_name = 'ADD_NEOLOGISM_' + lang 
    log.info("Saving with procedure : " + proc_name)
    try:
        conn = mysql.connector.connect(host=mysqlhost,
                                       database=mysqldb_neo,
                                       user=mysqluser,
                                       password=mysqlpassword,
                                       autocommit=True)
        if conn.is_connected():
            for neo in neolist.keys():
                #log.info("Saving neologism : " + neo + " : " + str(len(neolist[neo])) + ' : ' + neosinfo.get(neo,'spacy:oov'))
                args=[neo, len(neolist[neo]), neosinfo.get(neo,'spacy:oov'), 0]
                log.info("Saving neologism with following data : " + str(args))
                cursor = conn.cursor()
                results = cursor.callproc(proc_name, args)
                log.info(str(results )+ "\n")
                cursor.close()

    except Error as e:
        log.warning(str(e))
        return False

    finally:
        conn.close()
        return True



# main method
def main(): 
    # now begin processing...
    log.info("Initializing class corpus for : " + lang + " with linguistic config : " + str(ling_config))
    c = corpus(lang,lang_iso, 'db', data_type,ling_config) # initialisation corpus avec info langue, type stockage info et type fichiers
    log.info(" retrieving corpus from corpus class" )
    #print (" retrieving corpus from corpus class")
    c.get_corpus_list_fromDB(mysqluser,mysqlpassword,mysqlhost,mysqldb_corpus) # recup des fils rss à recuperer
    #print (str(len(c.rssfeeds)) + " RSS feeds")
    log.info(str(len(c.rssfeeds)) + " RSS feeds")
    if len(c.rssfeeds)>0:
        c.get_last_indexed_fromDB(mysqluser,mysqlpassword,mysqlhost,mysqldb_corpus) # recup des fils rss recuperes un jour avant max
        #print (str(len(c.lastindexed)) + " already retrieved")
        log.info(str(len(c.lastindexed)) + " already retrieved")
        c.retrieve_corpus()# recup des nouveaux articles
    else:
        log.info("No RSS feeds for this language. Check your configuration" )
        #print ("No RSS feeds for this language. Check your configuration")
    log.info("All is done! Quitting program.")


# main
if __name__ == '__main__':
    start = datetime.now()
    os.makedirs('./log', exist_ok=True) 
    os.makedirs('./tobeindexed', exist_ok=True) 
    
    # loading configuration file
    if len(sys.argv)<2:
        log.info("Please indicate the configuration file as an argument! Exiting.")
        exit()
    configfile = sys.argv[1]
    
    # logger
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./log/corpus_crawl_and_analysis_" + os.path.basename(configfile) + ".log", filemode='w', level=logging.INFO)
    log = logging.getLogger(__name__)
    # to log also on the console. Desactivate in production
    stream_handler = logging.StreamHandler()
    stream_handler.setLevel(logging.INFO)
    log.addHandler(stream_handler)    
    

    # read configfile
    #print("reading configuration file :" + configfile)
    log.info("reading configuration file :" + configfile)
    config = configparser.ConfigParser()
    config.read(configfile)
    #print(config)
    # general parameters
    lang = config['GENERAL']['lang']
    lang_iso=config['GENERAL']['lang_iso']
    ling_pipeline={}
    ling_pipeline = config['GENERAL']['ling_pipeline']
#    ling_pipeline['pipeline'] = [x.strip() for x in config['GENERAL']['ling_pipeline'].split(',')] # list of processes
    data_type = config['GENERAL']['data_type']
    
    # mysql parameters
    mysqluser=config['MYSQL']['user']
    mysqlpassword=config['MYSQL']['password']
    mysqlhost=config['MYSQL']['host']
    mysqldb_corpus=config['MYSQL']['db_corpus']
    mysqldb_neo=config['MYSQL']['db_neo']
    
    # Apache Solr parameters
    solr_host = config['SOLR']['solr_host']
    solr_collection = config['SOLR']['solr_collection']
    solr_schema = config['SOLR']['solr_schema']
    
    # lang detect
    # can be a list (ie : 'en, nl')
    lang_detect=[x.strip() for x in config['LANG_DETECT']['lang_detect'].split(',')] # list of acceptable guessing for the given language
    
    # Justext stoplist
    stoplist=config['JUSTEXT']['stoplist'] 
 
    # ling_analysis : either spacy, spacy+hunspell, hunspell
    ling_config={}
    # SPACY
    if ling_pipeline == 'spacy':
        ling_config['type']='spacy'
        ling_config['spacy_server']=config['SPACY']['spacy_server']
        ling_config['model']=config['SPACY']['model']
        ling_config['token_tags']=[x.strip() for x in config['SPACY']['token_tags'].split(',')]
        from lib.spacy_client import get_nlp,check_server, check_model
        res = check_server(ling_config['spacy_server'])
        if res is False:
            log.error("Spacy server (lib/spacy_server.py <iso_lang>) is not running. Please launch it before running this file. Exiting.")
            #print("Spacy server (lib/spacy_server.py) is not running. Please launch it before running this file. Exiting.")
            exit()
        else:
            # check model
            res = check_model(ling_config['spacy_server'],lang_iso)
            if res is False:
                log.error("Spacy server model not corresponding to language [" + lang_iso + "]. Launch it again (lib/spacy_server.py <iso_lang>) with the current language. Exiting.")
                #print("Spacy server model not corresponding to language" + lang_iso + ". Launch it again (lib/spacy_server.py <iso_lang>) with the current language. Exiting.")
                exit()
            else:
                log.info("Spacy server check OK.")
                #print ('Spacy server check OK.')
    # SPACY+HUNSPELL
    elif ling_pipeline == 'spacy+hunspell':
        ling_config['type']='spacy+hunspell'
        ling_config['spacy_server']=config['SPACY']['spacy_server']
        ling_config['model']=config['SPACY']['model']
        ling_config['token_tags']=[x.strip() for x in config['SPACY']['token_tags'].split(',')]
        ling_config['hunspell']=config['HUNSPELL']['dictionary']
        ling_config['word_filter']=config['HUNSPELL']['word_filter']
        from lib.spacy_client import get_nlp,check_server, check_model
        from lib.hunspell_client import *
        # check hunspell dictionaries are ok
        if not(os.path.isfile(ling_config['hunspell'] + '.dic')) or not(os.path.isfile(ling_config['hunspell'] + '.aff')):
            log.error("Your path to hunspell dictionaries (" + ling_config['hunspell'] + ") is incorrect!. Please check it. Exiting.")
            exit()
        else:
            log.info("Hunspell dictionaries checked!")
        # check spacy server is running
        res = check_server(ling_config['spacy_server'])
        if res is False:
            log.error("Spacy server (lib/spacy_server.py <iso_lang>) is not running. Please launch it before running this file. Exiting.")
            #print("Spacy server (lib/spacy_server.py) is not running. Please launch it before running this file. Exiting.")
            exit()
        else:
            # check model
            res = check_model(ling_config['spacy_server'],lang_iso)
            if res is False:
                log.error("Spacy server model not corresponding to language [" + lang_iso + "]. Launch it again (lib/spacy_server.py <iso_lang>) with the current language. Exiting.")
                #print("Spacy server model not corresponding to language" + lang_iso + ". Launch it again (lib/spacy_server.py <iso_lang>) with the current language. Exiting.")
                exit()
            else:
                log.info("Spacy server check OK.")
                #print ('Spacy server check OK.')

    # SPACY+EXCLUSIONDICO
    elif ling_pipeline == 'spacy+exclusiondico':
        ling_config['type']='spacy+exclusiondico'
        ling_config['spacy_server']=config['SPACY']['spacy_server']
        ling_config['model']=config['SPACY']['model']
        ling_config['token_tags']=[x.strip() for x in config['SPACY']['token_tags'].split(',')]
        ling_config['exclusiondico']=load_exclusion_dico(lang_iso)
        from lib.spacy_client import get_nlp,check_server, check_model
        # check spacy server is running
        res = check_server(ling_config['spacy_server'])
        if res is False:
            log.error("Spacy server (lib/spacy_server.py <iso_lang>) is not running. Please launch it before running this file. Exiting.")
            #print("Spacy server (lib/spacy_server.py) is not running. Please launch it before running this file. Exiting.")
            exit()
        else:
            # check model
            res = check_model(ling_config['spacy_server'],lang_iso)
            if res is False:
                log.error("Spacy server model not corresponding to language [" + lang_iso + "]. Launch it again (lib/spacy_server.py <iso_lang>) with the current language. Exiting.")
                #print("Spacy server model not corresponding to language" + lang_iso + ". Launch it again (lib/spacy_server.py <iso_lang>) with the current language. Exiting.")
                exit()
            else:
                log.info("Spacy server check OK.")
                #print ('Spacy server check OK.')

    #elif ling_pipeline =='hunspell':
    #    import mosestokenizer
    #    import pyspellchecker # require loading frequency list
    #    ling_config['type']='hunspell'
    #    ling_config['dictionary']=config['HUNSPELL']['dictionary']        


    else:
        log.error("No or ill-defined linguistic pipeline [" + ling_pipeline + "]. Please define it in the configuration file and rerun!")
        exit()
    
    main()
else:
    log = logging.getLogger(__name__)

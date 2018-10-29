#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
program to retrieve articles from rss feeds (and potentially other web sources)
See main() function for details - Python 2.7+
'''

import mysql.connector
from mysql.connector import Error
import logging, pickle,codecs
import feedparser,re
feedparser.USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0'

from datetime import datetime
import subprocess
import argparse
import os, shutil
import pysolr

import URLutils_p3
from langdetect import detect
# language code for lang detection (ISO 639-1 codes : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
lang_detect={}
lang_detect['anglais']=['en']
lang_detect['pays-bas']=['nl']
lang_detect['allemagne']=['de']
lang_detect['brésil']=['pt']
lang_detect['france']=['fr']
lang_detect['chine']=['zh-cn','ko']
lang_detect['pologne']=['pl']
lang_detect['russie']=['ru','mk','bg']
lang_detect['grèce']=['el']
lang_detect['Rép. Tchèque']=['cs','sk']

## global config : pointer to solr collections
lang_solr2={'de':'rss_german','nl':'rss_netherlands','pl':'RSS_polish','cz':'RSS_czech','ru':'RSS_russian','ch':'RSS_chinese','gr':'RSS_greek','br':'RSS_brasilian','fr':'rss_french','en':'rss_english'}

iso={}
iso['anglais']='en'
iso['allemagne']='de'
iso['pays-bas']='nl'
iso['brésil']='br'
iso['france']='fr'
iso['chine']='ch'
iso['pologne']='pl'
iso['russie']='ru'
iso['grèce']='gr'
iso['Rép. Tchèque']='cz'

# stoplist for justext
justext={}
justext['anglais']='English'
justext['français']='French'

mysqlinfo={'user':'root','pass':'root','host':'localhost','db':'rssdata'}

class corpus:
    '''classe corpus pour gerer les corpus : il suffit de donner la langue, et eventuellement où se trouve la source (db, file),
    et le type de corpus (rss, web twitter) - les deux derniers sont à developper
    '''
    def __init__(self, lang, source='db',typ='rss'):
        "construit une instance avec les attributs de base"
        self.lang = lang
        self.source=source
        self.typ=typ

    def get_corpus_list_fromDB(self):
        """ Connect to MySQL database """
        log.info("retrieving corpus list from db")
        print ("Retrieving corpus list from db")
        rssfeeds={}
        try:
            conn = mysql.connector.connect(host=mysqlinfo['host'],
                                           database=mysqlinfo['db'],
                                           user=mysqlinfo['user'],
                                           password=mysqlinfo['pass'])
            if conn.is_connected():
                #print('Connected to MySQL database')
                cursor = conn.cursor()
                args = [iso[self.lang],self.typ]
                results = cursor.callproc('GET_CORPUS', args)
                for result in cursor.stored_results():
                    #rows = results.fetchall()
                    #print len(result.fetchall())
                    for row in result.fetchall():
                        #print row[1] + "-" + row[2]
                        print ("Info : " + str(row))
                        rssfeeds[row[1]]=row[2] + ";" + row[3]+ ";" + row[4]+ ";" + row[5]+ ";" + row[6]+ ";" + row[7]+ ";" + str(row[0]) + ";" + row[8]+ ";" + str(row[9]) + ";" + str(row[10])

                cursor.close()

        except Error as e:
            log.exception(str(e))
            #print(e)
            return False

        finally:
            conn.close()
            self.rssfeeds = rssfeeds

    def get_last_indexed_fromDB(self):
        """ function to retrieve last indexed articles (last day) to avoid retriveing them again """
        log.info("retrieving last indexed url (last day) from db")
        rssfeeds={}
        try:
            conn = mysql.connector.connect(host=mysqlinfo['host'],
                                           database=mysqlinfo['db'],
                                           user=mysqlinfo['user'],
                                           password=mysqlinfo['pass'])
            if conn.is_connected():
                #print('Connected to MySQL database')
                cursor = conn.cursor()
                args = [self.lang]
                results = cursor.callproc('get_last_indexed', args)
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
        if self.typ == 'rss':
            feeds = rssfeeds(self.rssfeeds,self.lang)
            feeds.retrieve_feeds(self.lastindexed,save)
        elif self.typ =="web":
            retrieve_website(self.websites)
        elif self.typ=='twitter':
            retrieve_twitter(self.twitterconfig)
        else:
            return False



class rssfeeds(corpus):

    def __init__(self, feedlist, lang, constraints={}):
        "construit une instance avec les attributs de base"
        self.feedlist = feedlist
        self.lang=lang
        if len(constraints)>0:
            self.constraints = constraints

    def retrieve_feeds(self,lastindexed,save=True):
        """recupere les articles de chaque fil"""
        log.info("Retrieving rss feeds from list : ")
        rss= self.feedlist
        log.info(str(len(rss)) + " rss feeds")
        for url in rss:
            log.info("Retrieving feeds for :" + url)
            print ("Retrieving feeds for :" + url)
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
            print("\n"+ str(len(entries )) + " articles")
            #print str(len(entries )) + " articles" + " for " + url +"\n"
            if len(entries)==0:
                continue
            for e in entries:
                print(e)
                if e['link'] in lastindexed:
                    log.info("Skipping "+ e["link"] + " : already retrieved")
                    continue
                log.info("Retrieving " + e['link'])
                print ("Retrieving : " + e['link'])
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
                    row['authors'] = [res['name'] for res in e['authors']] # specific for Plone?
                    print(row['authors'])
                if 'summary' in e:
                    row['description'] =  URLutils_p3.remove_links(URLutils_p3.strip_html_tags(e['summary']))
                    row['contents'] = row['title'] #+ "\n" + row['description']
                elif 'description' in e:
                    row['description'] =  URLutils_p3.remove_links(URLutils_p3.strip_html_tags(e['description']))
                    row['contents'] = row['title'] #+ "\n" + row['description']
                else:
                    row['contents'] = URLutils_p3.remove_links(URLutils_p3.strip_html_tags(e['title']))
                    row['description'] =''
                row['link'] = e['link']
                row['dateS'] = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
                if 'media:keywords' in e:
                    row['keywords'] = e['media:keywords']
                else:
                    row['keywords']=""
                if 'category' in e:
                    row['category'] = e['category']
                else:
                    row['category']=""
                article = URLutils_p3.get_url_article2(row['link'],justext[self.lang])
                if article:
                    row['contents']=row['contents'] + "\n" + article
                # lang detection to skip other languages contents
                if len(row['contents'])<5:
                    log.warning("Contents empty. Skipping this article.")
                    continue
                langd = detect(row['contents'])
                if (langd not in lang_detect[self.lang]):
                    log.warning("Problem with language detection for contents : " + cts + "\nAutomatic detection says : [" + langd + "] whereas expected language is " + str(lang_detect[self.lang]) + "\nSkipping analysis for this document and deleting it from database.")
                    continue
                ######################## here possible ling analysis
                res.append(row)
                #saved_urls[e['link']]=1 # sauvegarde des urls analysees
                #flog.write("Results for link : " + str(row + "\n"))
                row={}
            log.info(str(res))
            pickle.dump(res, open("res.dump", 'wb')) # debug tool
            if save==True:
                self.save_rsscorpus_to_DB(res)
                #ligne a decommenter pour que ce soit bien mis dans SOLR
                #self.save_corpus_to_fileSOLRformat(res,url,lang_en)
                self.update_to_SOLR(res,lang_en)
                # 12/12/2016 test for French self.save_corpus_to_fileSOLRformat(res,url,lang_en)

    def update_to_SOLR(self,res,lang_en):
        ''' update solr with all data with pysolr'''
        # delete ID_RSS from res (useless for solr)
        for doc in res:
            del(doc['ID_RSS'])
        solr =  pysolr.Solr('http://localhost:8983/solr/'+ lang_solr2[lang_en])
        #solr_cmd = "curl 'http://localhost:8983/solr/" + lang_solr2[lang_en] + "/update?commit=true&optimize=true' -H 'Content-type:text/xml' --data-binary @" +filename
        resp = solr.add(res)
        log.info(resp)

    def save_rsscorpus_to_DB(self,res):
        """ Save rss corpus to database """
        log.info("Saving rss corpus to database")
        try:
            conn = mysql.connector.connect(host=mysqlinfo['host'],
                                           database=mysqlinfo['db'],
                                           user=mysqlinfo['user'],
                                           password=mysqlinfo['pass'],
                                           charset='utf8mb4',
                                           collation='utf8mb4_general_ci',
                                           autocommit=True)
            
            #conn.autocommit=True
            cursor=conn.cursor()
            if conn.is_connected():
#                conn.set_charset_collation('utf8', 'utf8')
                #log.info("")
                #cursor = conn.cursor()
                str=''
                for rss in res:
                    if len(rss['link'])>255:
                        rss['link'] = rss['link'][0:254]
                    if len(rss['title'])>255:
                        rss['title'] = rss['title'][0:254]

                    #print rss['ID_RSS']
                    #args = [rss['link'],rss['country'].encode("utf-8"),rss['subject'].encode("utf-8"),rss['ID_RSS'],rss['title'].encode("utf-8"),rss['description'].encode("utf-8"),rss['contents'].encode("utf-8"),rss['category'].encode("utf-8"),rss['keywords'].encode("utf-8"),0]
                    #patch encodage
                    rss['description'] = ''
                    args = [ rss['link'],rss['country'],rss['subject'],rss['ID_RSS'],rss['title'],rss['description'],rss['contents'],rss['category'],rss['keywords'],0]
                    results = cursor.callproc('ADD_RSS_DATA2', args)
                    #print results
                    log.info(results)

                #cursor.close()

        except mysql.connector.Error as e:
            log.error(e.errno)
            log.error(e.sqlstate)
            log.error(e.msg)
            return False

        finally:
            cursor.close()
            conn.close()





# main method
def main():
    typ='rss'
    for lang in ['anglais']:# to be replaced by a select in database
        log.info("Initializing class corpus for : " + lang)
        c = corpus(lang, 'db', 'rss') # initialisation corpus avec info langue, type stockage info et type fichiers
        log.info(" retrieving corpus from corpus class" )
        print (" retrieving corpus from corpus class")
        c.get_corpus_list_fromDB() # recup des fils rss à recuperer
        print (str(len(c.rssfeeds)) + " RSS feeds")
        log.info(str(len(c.rssfeeds)) + " RSS feeds")
        if len(c.rssfeeds)>0:
            c.get_last_indexed_fromDB() # recup des fils rss recuperes un jour avant max
            print (str(len(c.lastindexed)) + " already retrieved")
            log.info(str(len(c.lastindexed)) + " already retrieved")
            c.retrieve_corpus()# recup des nouveaux articles
        else:
            log.info("No RSS feeds for this language. Check your configuration" )
            print ("No RSS feeds for this language. Check your configuration")
    log.info("All is done! Quitting program.")

    #rf =pickle.load(open("res.dump", 'rb'))
    #rss = rssfeeds()
    #rss.save_rsscorpus_to_DB(rf)

# main
if __name__ == '__main__':
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./log/corpus_en.log", filemode='w', level=logging.INFO)
    log = logging.getLogger(__name__)
    main()
else:
    log = logging.getLogger(__name__)

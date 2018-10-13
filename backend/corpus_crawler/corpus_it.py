#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
program to retrieve articles from rss feeds (and potentially other web sources)
See main() function for details
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
import commands
              
import URLutils
from langdetect import detect
# language code for lang detection (ISO 639-1 codes : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
lang_detect={}
lang_detect['brésil']=['pt']
lang_detect['france']=['fr']
lang_detect['chine']=['zh-cn','ko']
lang_detect['pologne']=['pl']
lang_detect['russie']=['ru','mk','bg']
lang_detect['grèce']=['el']
lang_detect['Rép. Tchèque']=['cs','sk']
lang_detect['italie']=['it']
## global config : pointer to solr collections
lang_solr={'it':'italian','pl':'polish','cz':'czech','ru':'russian','ch':'chinese','gr':'greek','br':'brasilian','fr':'french'}
# 13/12/2016 : to integrate french
lang_solr2={'it':'rss_italian','pl':'RSS_polish','cz':'RSS_czech','ru':'RSS_russian','ch':'RSS_chinese','gr':'RSS_greek','br':'RSS_brasilian','fr':'rss_french'}

iso={}
iso['brésil']='br'
iso['france']='fr'
iso['chine']='ch'
iso['pologne']='pl'
iso['russie']='ru'
iso['grèce']='gr'
iso['Rép. Tchèque']='cz'
iso['italie']='it'

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
        print "Retrieving corpus list from db"
        rssfeeds={}
        try:
            conn = mysql.connector.connect(host='localhost',
                                           database='rssdata',
                                           user='root',
                                           password='neoveille')
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
                        print "Info : " + str(row)
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
            conn = mysql.connector.connect(host='localhost',
                                           database='rssdata',
                                           user='root',
                                           password='neoveille')
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
           # if re.search(r"usinenouvelle",url):
                #r = requests.get(url)
                #print r.encoding
                log.info("Retrieving feeds for :" + url)
                print "Retrieving feeds for :" + url
                d = feedparser.parse(url)
                #print d.headers
                #log.info(d.headers)
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
                    if e['link'] in lastindexed:
                        log.info("Skipping "+ e["link"] + " : already retrieved")
                        continue
                    log.info("Retrieving " + e['link'])
                    #print "Retrieving " + e['link']
                    row['ID_RSS'] = metas[6]
                    row['country'] = metas[0]
                    row['source'] = metas[1]
                    row['subject'] = metas[2]
                    row['subject2'] = metas[3]
                    row['source-link'] = url
                    row['title'] = URLutils.strip_html_tags(unicode(e['title']))
        
                    # verifier existence summary / description media:keywords/category published or pubDate avant de les récupérer
                    if 'summary' in e:
                        row['description'] =  URLutils.remove_links(URLutils.strip_html_tags(unicode(e['summary'])))
                        row['contents'] = row['title'] + "\n" + row['description']
                    elif 'description' in e:
                        row['description'] =  URLutils.remove_links(URLutils.strip_html_tags(unicode(e['description'])))
                        row['contents'] = row['title'] + "\n" + row['description']
                    else:
                        row['contents'] = URLutils.strip_html_tags(unicode(e['title']))
                        row['description'] =''
                    row['link'] = e['link']
                    row['dateS'] = datetime.now().strftime("%Y-%m-%dT%H:%M:%S Z")
                    if 'media:keywords' in e:
                        row['keywords'] = unicode(e['media:keywords'])
                    else:
                        row['keywords']=""
                    if 'category' in e:
                        row['category'] = unicode(e['category'])
                    else:
                        row['category']=""
                    # ec 19/04/2016 : remove recherche contenu pour l'instant
                    article = URLutils.get_url_article(row['link'])
                    if article:
                        row['contents']=row['contents'] + "\n" + article
        
                    contents = row['contents']
                    ct = URLutils.strip_html_tags(contents)
                    cts = re.sub(u'([\u0022\u00AB\u00BB\u2018\u201B\u201C\u201D\u201E\u201F\u2039\u203A])','"',ct)# quotation marks
                    row['contents']= cts 
                    # lang detection to skip other languages contents
                    if len(cts)==0:
			log.warning("Contents empty. Skipping this article.")
			continue
                    try:
                        langd = detect(cts)
                    except :
                        log.warning("Error with this contents:", cts)
                        continue
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
                    self.save_corpus_to_fileSOLRformat(res,url,lang_en)
                    # 12/12/2016 test for French self.save_corpus_to_fileSOLRformat(res,url,lang_en)

    def save_rsscorpus_to_DB(self,res):
        """ Save rss corpus to database """
        log.info("Saving rss corpus to database")
        try:
            conn = mysql.connector.connect(host='localhost',
                                           database='rssdata',
                                           user='root',
                                           password='neoveille',
                                           charset='utf8',
                                           collation='utf8_general_ci',
                                           autocommit=True
                                           )
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
#                    args = [rss['link'],rss['country'].encode("utf-8"),rss['subject'].encode("utf-8"),rss['ID_RSS'],rss['title'].encode("utf-8"),rss['description'].encode("utf-8"),rss['contents'].encode("utf-8"),rss['category'].encode("utf-8"),rss['keywords'].encode("utf-8"),0]
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
            
 
        

    def save_corpus_to_fileSOLRformat(self,data,filename,lang_en,index=True):
        fn = re.sub(r"https?|www|\W","",filename)
        now = datetime.now().strftime("%d-%m-%y_%H")
        filen = './tobeindexed/corpus/'+ lang_solr2[lang_en] + "." + fn + "." + now + '.xml'
        log.info("Saving data into :" + filen)
        fout=codecs.open(filen,"w","utf-8")
        fout.write("<add>")
        for doc in data:
            fout.write('<doc>\n')
            for key in doc.keys():
                #flog.write(key + ":" + str(type(doc[key] + "\n")))
                if key =='keywords' or key=='ID_RSS': # not yet handled by solr schema
                    #print doc[key]
                    continue
                if type(doc[key]) in (str,unicode):
                    v=re.sub(r"[<>]", "", doc[key])
                    v2=re.sub(r"&", "&amp;", v)
                    fout.write('<field name="' + key + '">' + v2 + "</field>\n")
                elif type(doc[key]) in (int,None,long):
                    fout.write('<field name="' + key + '">' + str(doc[key]) + "</field>\n")
                elif type(doc[key]) is dict:
                    for elt in doc[key]:
                        v=re.sub(r"[<>]", "", elt)
                        v2=re.sub(r"&", "&amp;", v)
                        fout.write('<field name="' + key + '">' + v2 + "</field>")
                #elif type(doc[key]) is list:
                    #        for elt in doc[key]:
                    #                v=re.sub(r"[<>]", "", elt)
                    #                v2=re.sub(r"&", "&amp;", v)
                    #                fout.write('<field name="' + key + '">' + v2 + "</field>")
                else:
                    fout.write('<field name="' + key + '">' + str(doc[key]) + "</field>\n")
            fout.write("</doc>\n")
        fout.write('</add>')
        fout.close()
        if index==True:
            self.index_rssfeeds_solr2(filen, lang_en,"xml")
            
    def index_rssfeeds_solr(self,filename, lang_en, t="xml"):
        '''index to solr using lang (self.lang) and filename parameters
        Launch the command to index a json of xml file into Apache Solr
        :param filename: the xml or json file with docs to index
        :param t: the format of the file either json or xml
        :seealso: Apache Solr documentation on curl command utility
        '''
        ## to be done : check indexation success and add a field in db.rss_data2 if not
        if t == "json":
            log.info("indexing xith JSON procedure..." + "\n")
            with open("rss_feeds_solr_index_json.sh", "w") as out:	
                out.write("curl 'http://localhost:8983/solr/rss_french/update/json/docs''?commit=true''&optimize=true''&split=/items''&f=/items/**' -H 'Content-type:application/json' --data-binary @./" + filename)
                try:
                    subp = subprocess.Popen(["./rss_feeds_solr_index_json.sh"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
                    curlstdout, curlstderr = subp.communicate()
                    op = str(curlstdout)
                    op2 = str(curlstderr)
                    flog.write(op + "\n")
                    flog.write(op2 + "\n")
                except subprocess.CalledProcessError as e: # to be done : catch the actual error
                    log.error("Error : " + e + "\n")
        
        elif t == "xml":
            log.info("indexing with XML procedure..." + "\n")
            print "indexing with XML procedure..." + "\n"            
#13/12/2016            solr_cmd = "curl 'http://localhost:8983/solr/RSS_" + lang_solr[lang_en] + "/update?commit=true&optimize=true' -H 'Content-type:text/xml' --data-binary @" +filename
            solr_cmd = "curl 'http://localhost:8983/solr/" + lang_solr2[lang_en] + "/update?commit=true&optimize=true' -H 'Content-type:text/xml' --data-binary @" +filename
            log.info(solr_cmd)
            res = commands.getstatusoutput(solr_cmd)
            for i in res:
                log.info(i)            
                print i            
            #with open("rss_feeds_solr_index_xml2.sh", "w") as out:	
            #    out.write(solr_cmd)
            #    
            #    try:
            #        p = subprocess.Popen(["/bin/sh","/Users/emmanuelcartier/prog-neoveille/rss_feeds_solr_index_xml2.sh"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT,close_fds=True)
            #        p.wait()
            #        output = p.stdout.read()
            #        log.info(output + "\n")
            #        print "Output : " +output
            #    except subprocess.CalledProcessError as e: # to be done : catch the actual error
            #        flog.write("Error : " + str(e + "\n"))                
        else:
            log.error("type error: " + t  + "\n")
            
    def index_rssfeeds_solr2(self,filename, lang_en, t="xml"):
        '''index to solr using lang (self.lang) and filename parameters
        Launch the command to index a json of xml file into Apache Solr
        :param filename: the xml or json file with docs to index
        :param t: the format of the file either json or xml
        :seealso: Apache Solr documentation on curl command utility
        '''
        ## to be done : check indexation success and add a field in db.rss_data2 if not
        if t == "xml":
            log.info("indexing with XML procedure..." + "\n")
            with open("corpus_all_solr_index_xml.sh", "w") as out:	
                solr_cmd = "curl 'http://localhost:8983/solr/" + lang_solr2[lang_en] + "/update?commit=true&optimize=true' -H 'Content-type:text/xml' --data-binary @" +filename
                out.write(solr_cmd)
            try:
                p = subprocess.Popen(["sh","./corpus_all_solr_index_xml.sh"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT,close_fds=True)
                p.wait()
                output = p.stdout.read()
                log.info(output + "\n")
                return True
            except subprocess.CalledProcessError as e: # to be done : catch the actual error
                log.error("Error : " + e.message + "\n")
                return False
    
        else:
            log.error("type error: " + t  + "\n")
            return False



# main method
def main():
    lang=''
    typ='rss'
    parser = argparse.ArgumentParser(description="Program to retrieve RSS source feeds from Database, download the items and linked article and save the result into mysql database and in a XML format enabling to index in Solr. To use efficiently this program you need first to setup a mysql database (see documentation and mysql directory) and having a functioning version of Apache Solr (see doc and solr directory)", epilog="Neoveille Project" )
    parser.add_argument("-l", "--lang",  type=str, default=lang, help="language to analyse. Default : " + lang)
    parser.add_argument("-t", "--type", type=str, default=typ, help="Type of web data to retrieve (RSS, web, twitter). Default : " + typ)
    args = parser.parse_args()
    # can call values of arg like : args.lang, args.type, args.out 'france',
#    for lang in ('Rép. Tchèque','pologne','grèce','russie','brésil','chine'):# to be replaced by a select language in database
    for lang in ['italie']:# to be replaced by a select in database
        log.info("Initializing class corpus for : " + lang)
        #print "Initializing class corpus for langue : " + lang
        c = corpus(lang, 'db', 'rss') # initialisation corpus avec info langue, type stockage info et type fichiers 
        log.info(" retrieving corpus from corpus class" )
        print " retrieving corpus from corpus class"
        c.get_corpus_list_fromDB() # recup des fils rss à recuperer
        print str(len(c.rssfeeds)) + " RSS feeds"
        log.info(str(len(c.rssfeeds)) + " RSS feeds")
        if str(len(c.rssfeeds))>0:
            c.get_last_indexed_fromDB() # recup des fils rss recuperes un jour avant max
            print str(len(c.lastindexed)) + " already retrieved"
            log.info(str(len(c.lastindexed)) + " already retrieved")
            c.retrieve_corpus()# recup des nouveaux articles
        else:
            log.info("No RSS feeds for this language. Check your configuration" )
            print "No RSS feeds for this language. Check your configuration"
    log.info("All is done! Quitting program.")
    
    #rf =pickle.load(open("res.dump", 'rb'))
    #rss = rssfeeds()
    #rss.save_rsscorpus_to_DB(rf)

# main
if __name__ == '__main__':
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./log/corpus_it.log", filemode='w', level=logging.INFO)    
    log = logging.getLogger(__name__)
    main()
else:
    log = logging.getLogger(__name__)
    


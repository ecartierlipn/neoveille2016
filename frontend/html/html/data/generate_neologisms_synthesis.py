
# programme pour générer une synthèse sur les neologismes candidats validés (programme dans crontab)
# 1. <lang>_neo.tsv
# 2. <lang>_neocount.tsv
# 3. <lang>_neocontextes.tsv

# algorithme du programme : voir main
# 1. faire la récupération des listes de néologismes validés en récupérant la matrice et la date de dernière mise à jour
# 2. Pour chaque néologisme on interroge apache solr sur les occurrences (pos ou raw) depuis la dernière mise à jour
#    et on récupère les métainformations de chaque document qui matche + contextes (pos ou raw)
# 3. on stocke les résultats dans un pickle puis on écrit les données dans les trois fichiers ci-dessus
# 4. On met à jour la fréquence et la date fréquence dans la table termes_copy où sont stockés les néos
# 5. On met à jour les tables termes_contextes à partir du fichier <lang>_neocontextes.tsv



# PyMySQL
# https://www.tutorialspoint.com/python3/python_database_access.htm
import pymysql
import pymysql.err as MysqlError

import sys,re
import os.path
from datetime import datetime
import logging
#from urllib import quote
#from urllib import urlopen
from urllib.request import urlopen
from urllib.parse import urlencode
import simplejson
import codecs
import pickle

lang_solr={'es':'rss_spanish','nl':'rss_netherlands','de':'rss_german','it':'rss_italian','fr':'rss_french','pl':'RSS_polish','cz':'RSS_czech','ru':'RSS_russian','zh':'RSS_chinese','gr':'RSS_greek','br':'RSS_brasilian'}
lang_mysql={'nl':'rss_netherlands','de':'rss_german','it':'rss_italian','fr':'rss_french','pl':'RSS_polish','cz':'RSS_czech','ru':'RSS_russian','zh':'RSS_chinese','gr':'RSS_greek','br':'RSS_brasilian'}
#path_to_file= '/Users/emmanuelcartier/Desktop/GitHub/neoveille/formal_neology/post_process/' # local path
path_to_file= './' # lipn path

def connect(host='localhost',database='neo3',user='root',password='neoveille'):
    try:
        conn = pymysql.connect(host=host,
                                   database=database,
                                   user=user,
                                   password=password,charset='utf8') # 
        return conn
    except pymysql.err.InternalError as error:
        code, message = error.args
        log.error(str(code) + message)        
        return False

def get_neologisms_from_db(conn,lang):
    '''recupere et renvoie les neologismes valides sous forme de liste'''
    neo={}
    # SELECT terme from neo3.termes_copy where country=V_LANG;
    query = 'SELECT terme,matrice_neo, description,date_frequency from neo3.termes_copy, neo3.matrice_neo_def where langue="'+lang+'" and neo3.termes_copy.matrice_neo=neo3.matrice_neo_def.id and YEAR(date) > 2014 and neo3.termes_copy.matrice_neo REGEXP "ms|exemp"'
    log.info(query)
    try:
            #print('Connected to Mysql database' + "\n")
            cursor = conn.cursor()
            cursor.execute("SET NAMES utf8;")
            #print cursor
            cursor.execute(query)
            results = cursor.fetchall()
            for row in results:                
                neo[row[0]]=row[2] + "("+row[1]+")\t"+str(row[3])
            cursor.close()

    except pymysql.err.InternalError as error:
        code, message = error.args
        log.error("Problem with query : " + str(code) + message)        
        return (False,"")


    finally:
        if len(neo)== 0:
            log.info("No neologism for "+lang)
            return (False,neo)
        else:    
            log.info("Found " +str(len(neo)) +" neologisms for "+lang)
            return (True,neo)


def retrieve_neo_links(neo,mat, lang,fw):
    '''recupere les link contenant la forme neologique validee dans la base rssdata - reduction par mois'''
    links={}
    neo=neo.strip()
    args={'wt':'json','q':'contents:"'+neo+'\"','rows':'1000','fl':'contents,dateS,country,source,subject','debug':'true'}
    res = {}
#    q = 'http://localhost:8983/solr/' + lang_solr[lang] + '/select'
    q = 'http://tal.lipn.univ-paris13.fr/solr/' + lang_solr[lang] + '/select'
    params = urlencode(args).encode("utf-8")
    log.info(q,params)
    connection = urlopen(q,params)
    #print(connection.info())
    response = simplejson.load(connection)
    
    #print(simplejson.load(connection))
    num = response['response']['numFound']
    parsedq = response['debug']['parsedquery_toString']
    log.info(response['response']['numFound']+ " documents found.")
    # query
    log.info("Query = "+ neo + " Parsed query = "+ response['debug']['parsedquery_toString'])   
    parsedq = re.sub(r"contents:","",response['debug']['parsedquery_toString'])
    ## building neo re for matching exact matches only
    #print(parsedq)
    if re.search(r"\s+",neo): # mots composés avec espace
        neore = re.sub(r"\s+",r".?",neo)
    elif re.search(r"\(",parsedq): # mots composés avec traits d'union
        neore0 = re.sub(r"\s.+$",r"",parsedq,re.I)
        neore1 = re.sub(r'\"\(',r"",neore0,re.I)
        neore = re.sub(r"-",r".?",neore1,re.I)
    else:   # autres mots
        neore = re.sub(r"contents:","",parsedq)
    log.info("NEORE : " + neore) 
    if len(neore)<5: # in case of too-short expression get back to initial word (fixing => fix => fixing)
        neore = neo
        #print("NEORE : " + neore)
    numexact=0
    numdoc=0
    listvar={} # variantes neore
    listcxt={} # contextes neore
    
    for document in response['response']['docs']: # attention : doublons car recopie title description dans contents
        #print(str(document['contents']))
        dateparsed = re.sub(r"(^.{10}).+$",r"\1",document['dateS'])# by day
        if re.search(r"\b"+neore+r"\w*\b",str(document['contents']), re.I |re.U): 
            numdoc=numdoc+1
            res = re.findall(r"(.{0,50})\b("+ neore + r"\w*)\b(.{0,50})",str(document['contents']),re.I | re.U)
            #print(res)
            #print(len(res))
            for item in res:
                listvar[item[1]]=1
                #print(str(document.get('pos-text',"")))
                listcxt[item[0]+"\t"+item[1]+"\t"+item[2]+"\t"+document['source']+"\t"+dateparsed]=1
            #print("Matching :" + str(document['contents']))
            numexact= numexact+len(res)
            key = neo.lower()+','+mat+','+dateparsed+','+document['country']+','+document['source']+','+document['subject'].rstrip()
            links[key]= links.get(key,0)+1    
    return (links,numdoc, numexact, parsedq,neore,listvar,listcxt)
    

def retrieve_neo_links_pos(neo,neodata, lang,fw,modelcxt):
    '''recupere les link contenant la forme neologique validee dans la base rssdata - reduction par mois'''
    links={}
    neo=neo.strip()
    (mat,lastupdate)=re.split(r"\t",neodata)
    log.info(mat+":"+str(lastupdate))
    lastupdate = lastupdate.replace(' ','T') + 'Z'
    #print(lastupdate)
    #exit()
    if modelcxt=='raw':
        if lastupdate == 'NoneZ':
            args={'wt':'json','q':'contents:"'+neo+'\"','rows':'1000','fl':'contents,dateS,country,source,subject,link','debug':'true'}
        else:
            args={'wt':'json','q':'dateS:['+lastupdate+' TO NOW] and contents:"'+neo+'\"','rows':'1000','fl':'contents,dateS,country,source,subject,link','debug':'true'}            
    elif modelcxt=='pos':
        if lastupdate =='NoneZ':
            args={'wt':'json','q':'contents:"'+neo+'\"','rows':'1000','fl':'contents,dateS,country,source,subject,pos-text,link','debug':'true'}
        else:
            args={'wt':'json','q':'dateS:['+lastupdate+' TO NOW] and contents:"'+neo+'\"','rows':'1000','fl':'contents,dateS,country,source,subject,pos-text,link','debug':'true'}       
    else:
        log.error("Bad method for retrieval. Exiting. Value of modelcxt : "+ modelcxt)
    res = {}
    q = 'http://localhost:8983/solr/' + lang_solr[lang] + '/select'
#    q = 'http://tal.lipn.univ-paris13.fr/solr/' + lang_solr[lang] + '/select'
    params = urlencode(args).encode("utf-8")
    log.info(q +str(params))
    connection = urlopen(q,params)
    #print(connection.info())
    response = simplejson.load(connection)
    
    #print(simplejson.load(connection))
    num = response['response']['numFound']
    parsedq = response['debug']['parsedquery_toString']
    log.info(str(response['response']['numFound'])+ " documents found.")
    # query
    log.info("Query = "+ neo+ " Parsed query = "+ response['debug']['parsedquery_toString'])   
    parsedq2 = re.sub(r"^.*?contents:","",response['debug']['parsedquery_toString'])
    parsedq = re.sub(r"contents:.+$","",parsedq2) # ec  09 03 2018 cas double contents (ex. auto-but)
    ## building neo re for matching exact matches only
    #print(parsedq)
    if re.search(r"\s+",neo): # mots composés avec espace
        neore = re.sub(r"\s+",r".?",neo)
    elif re.search(r"\(",parsedq): # mots composés avec traits d'union
        neore0 = re.sub(r"\s.+$",r"",parsedq,re.I)
        neore1 = re.sub(r'\"\(',r"",neore0,re.I)
        neore = re.sub(r"-",r".?",neore1,re.I)
    else:   # autres mots
        neore = re.sub(r"contents:","",parsedq)
    log.info("NEORE : [" + neore + "] from query [" + parsedq + "]")
    #print("NEORE : " + neore)
    if len(neore)<5: # in case of too-short expression get back to initial word (fixing => fix => fixing)
        neore = neo
        #print("NEORE : " + neore)
    numexact=0
    numdoc=0
    listvar={} # variantes neore
    listcxt={} # contextes neore
    
    for document in response['response']['docs']: # attention : doublons car recopie title description dans contents
        #print(str(document['contents']))
        dateparsed = re.sub(r"(^.{10}).+$",r"\1",document['dateS'])# by day
        if modelcxt == 'raw' and re.search(r"\b"+neore+r"\w*\b",str(document['contents']), re.I |re.U): 
            numdoc=numdoc+1
            res = re.findall(r"(.{0,100})\b("+ neore + r"\w*)\b(.{0,100})",str(document['contents']),re.I | re.U)
            #print(res)
            #print(len(res))
            for item in res:
                listvar[item[1]]=1
                #print(str(document.get('pos-text',"")))
                listcxt[item[0]+"\t"+item[1]+"\t"+item[2]+"\t"+document['source']+"\t"+document['subject']+"\t"+document['link']+"\t"+dateparsed+"\traw"]=1
            #print("Matching :" + str(document['contents']))
            numexact= numexact+len(res)
            key = neo.lower()+','+mat+','+dateparsed+','+document['country']+','+document['source']+','+document['subject'].rstrip()
            links[key]= links.get(key,0)+1    
        elif modelcxt == 'pos' and 'pos-text' in document.keys() : # pas de pos-text pour toutes les langues et tous les textes (<09-2016)
            if re.search(r"\b"+neore+r"\w*\b",str(document['pos-text']), re.I |re.U): 
                numdoc=numdoc+1
                modelwre = r"\S+?\/\S+?\/\S+?"
                res = re.findall(r"((?:" + modelwre + r" ){0,10})("+ neore + r"\S*?\/\S+?\/\S+?)( (?:" + modelwre + r" ){0,10})",str(document['pos-text']),re.I | re.U)
                #print(res)
                #print(len(res))
                for item in res:
                    listvar[item[1]]=1
                    #print(str(document.get('pos-text',"")))
                    listcxt[item[0]+"\t"+item[1]+"\t"+item[2]+"\t"+document['source']+"\t"+document['subject']+"\t"+document['link']+"\t"+dateparsed+"\tpos"]=1
                    #print("Matching :" + str(document['contents']))
                numexact= numexact+len(res)
                key = neo.lower()+','+mat+','+dateparsed+','+document['country']+','+document['source']+','+document['subject'].rstrip()
                links[key]= links.get(key,0)+1
            elif re.search(r"\b"+neore+r"\w*\b",str(document['contents']), re.I |re.U): 
                numdoc=numdoc+1
                res = re.findall(r"(.{0,100})\b("+ neore + r"\w*)\b(.{0,100})",str(document['contents']),re.I | re.U)
                #print(res)
                #print(len(res))
                for item in res:
                    listvar[item[1]]=1
                    #print(str(document.get('pos-text',"")))
                    listcxt[item[0]+"\t"+item[1]+"\t"+item[2]+"\t"+document['source']+"\t"+"\t"+document['subject']+"\t"+document['link']+"\t"+dateparsed+"\traw"]=1
                numexact= numexact+len(res)
                key = neo.lower()+','+mat+','+dateparsed+','+document['country']+','+document['source']+','+document['subject'].rstrip()
                links[key]= links.get(key,0)+1    
        elif modelcxt == 'pos' and not('pos-text' in document.keys()) : # pas de pos-text pour toutes les langues et tous les textes (<09-2016)
            if re.search(r"\b"+neore+r"\w*\b",str(document['contents']), re.I |re.U): 
                numdoc=numdoc+1
                res = re.findall(r"(.{0,100})\b("+ neore + r"\w*)\b(.{0,100})",str(document['contents']),re.I | re.U)
                #print(res)
                #print(len(res))
                for item in res:
                    listvar[item[1]]=1
                    #print(str(document.get('pos-text',"")))
                    listcxt[item[0]+"\t"+item[1]+"\t"+item[2]+"\t"+document['source']+"\t"+document['subject']+"\t"+document['link']+"\t"+dateparsed+"\traw"]=1
                numexact= numexact+len(res)
                key = neo.lower()+','+mat+','+dateparsed+','+document['country']+','+document['source']+','+document['subject'].rstrip()
                links[key]= links.get(key,0)+1    
            
    return (links,numdoc, numexact, parsedq,neore,listvar,listcxt)
    


def update_frequency_neo(conn,neo,lang,freq):
    '''mise à jour des la fréquence dans la base de donnée'''
        
    
    q= 'UPDATE neo3.termes_copy SET frequency='+str(freq)+',date_frequency=NOW() where terme="'+neo+'" and langue="'+lang+'";'
    #q = 'UPDATE datatables.'+db + ' SET frequence='+str(freq)+ ' where lexie="'+neo+'";'
    log.info(q)
    try:
        #print('Connected to Mysql database' + "\n")
        cursor = conn.cursor()
        cursor.execute("SET NAMES utf8;")
        conn.commit()
        cursor.execute(q)
        conn.commit()
        cursor.close()
        log.info("Update for "+neo+" done.")
        return (True,neo)

    except pymysql.err.InternalError as error:
        code, message = error.args
        log.error("Problem with query : " + str(code) + message)        
        return (False,"")

 
def update_neo_contextes(neocontexts,lang,conn):
    '''Update table termes_contextes for every neologisms from contexts retrieved
    Neologism\tleft_context\tneologism\tright_context\tjournal\tsubject\tlink\tdate\ttype_context    
    '''
    # INSERT INTO tbl_name (a,b,c) VALUES(1,2,3),(4,5,6),(7,8,9);
    tmp = [re.sub("\\n",'',ctx,re.M) for ctx in neocontexts]
    tmp2 = [re.sub(r'"','\'',ctx,re.M) for ctx in tmp]
    neocontextmysql = ['("'+ re.sub(r"\t",'","',ctx)+'","'+lang+'")'+"\n" for ctx in tmp2]
    q = 'INSERT IGNORE INTO neo3.termes_contextes2 (neo,left_context,center,right_context,journal,subject,link,date,type_context,lang) VALUES' + ",".join(neocontextmysql) + ';'
    
    #q = 'LOAD DATA INFILE "'+ fn + '" INTO TABLE neo3.termes_contextes2 FIELDS TERMINATED BY "\\t" IGNORE 1 LINES  (neo,left_context,right_context,journal,subject,link,date,type_context) set lang="'+lang+'";'
    
    log.info(q)
    try:
        cursor = conn.cursor()
        cursor.execute("SET NAMES utf8;")
        conn.commit()
        cursor.execute(q)
        conn.commit()
        cursor.close()
        log.info("Update for contexts done.")
        return (True,neo)

    except pymysql.err.InternalError as error:
        code, message = error.args
        log.error("Problem with query : " + str(code) + message)        
        return (False,"")


#langs = ['fr']
langs = ['fr','it','cz','ru','br','gr','ch','es','de','nl']
    
def main(lang='fr'):
    conn=connect()
    for lang in langs:
        (res,l) = get_neologisms_from_db(conn,lang)
        #print(str(l))
        #exit()
        updatesolr ={}
        res={}
        ## get info from last launch of program (useless to dot all each time, just update data)
        f1=False
        f2=False
        f3=False
        if os.path.isfile(path_to_file+lang + "_neo.tsv"):
            f1=True
        if os.path.isfile(path_to_file+lang + "_neocount.tsv"):
            f2=True
        if os.path.isfile(path_to_file+lang + "_neocontextes.tsv"):
            f3=True
        with open(path_to_file+lang + "_neo.tsv",mode="a",encoding="utf-8") as fw:
            if f1==False:
                fw.write('neo,matrice,date,country,source,subject,number'+"\n")
            for neo in l.keys():
                log.info("Retrieving documents for  "+ neo + " : " + l[neo])
                (links,num,numexact, parsedq,neore,listvar,listcxt) = retrieve_neo_links_pos(neo, l[neo], lang,fw,'pos')
                updatesolr[neo]= (num,numexact, parsedq,neore,listvar,listcxt)
                # writing into <lang>_neo.tsv (for interactive visualization into neoveille)
                for key in links:
                    fw.write(key + "," + str(links[key])+ "\n")
                update_frequency_neo(conn,neo,lang,numexact)
        #update_solr(updatesolr)
        pickle.dump( updatesolr, open( path_to_file+lang+".neologims.pickle", "wb" ) )
        updatesolr = pickle.load( open( path_to_file+lang+".neologims.pickle", "rb" ) )
        fo = open(path_to_file+lang + "_neocount.tsv",mode="a",encoding="utf-8")
        if f2==False:
            fo.write("Neologism\tnb_doc\tnb_total\tsolr_query\tneo_re\tvariant_list\n")
        fo2 = open(path_to_file+lang + "_neocontextes.tsv",mode="a",encoding="utf-8")
        if f3==False:
            fo2.write("Neologism\tleft_context\tneologism\tright_context\tdocument\tsubject\tlink\tdate\ttype_context\n")
        neocontexts = []
        for neo in updatesolr.keys():
            fo.write(neo + "\t"+str(updatesolr[neo][0])+ "\t"+str(updatesolr[neo][1])+ "\t"+str(updatesolr[neo][2])+ "\t"+str(updatesolr[neo][3])+ "\t"+",".join(updatesolr[neo][4])+"\n")
            for cxt in updatesolr[neo][5]:
                fo2.write(neo + "\t"+cxt+"\n")
                #neocontexts.append(neo + "\t"+cxt)
                
        fo.close()
        fo2.close()
#        update_neo_contextes(path_to_file+lang + "_neocontextes.tsv", lang,conn)
        #update_neo_contextes(neocontexts, lang,conn)
        
            

    
if __name__ == '__main__':
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./generate_neologisms_synthesis.log.txt", filemode='w', level=logging.INFO)    
    log = logging.getLogger(__name__)
    main()
else:
    log = logging.getLogger(__name__)

#!/usr/bin/python
# -*- coding: utf-8 -*-

# programme pour obtenir une synthèse pour les corpus
# Pour chaque langue : nombre total d'articles récupérés (date initiale, dernière date)
# par site : nbre total d'articles (début, fin)
# par domaine : nbre total d'articles et nbre par site
# par pays : nbre total d'articles, nbre par site

# ce programme génère une synthèse sous format json facile à convertir en format html
# etapes :
# 1. requête nbre total


import sys,re
import logging
#from urllib import quote
from urllib.request import urlopen
from urllib.parse import urlencode
from urllib.error import URLError, HTTPError
import simplejson
import codecs
import subprocess
import datetime

lang_display={'nl':'Néerlandais','de':'Allemand','it':'Italien','fr':'Français','pl':'Polonais','cz':'Tchèque','ru':'Russe','zh':'Chinois','gr':'Grec','br':'Portugais du Brésil'}

lang_solr={'nl':'rss_netherlands','de':'rss_german','it':'rss_italian','fr':'rss_french','pl':'RSS_polish','cz':'RSS_czech','ru':'RSS_russian','zh':'RSS_chinese','gr':'RSS_greek','br':'RSS_brasilian'}
lang_mysql={'nl':'rss_netherlands','de':'rss_german','it':'rss_italian','fr':'rss_french','pl':'RSS_polish','cz':'RSS_czech','ru':'RSS_russian','zh':'RSS_chinese','gr':'RSS_greek','br':'RSS_brasilian'}
#path_to_file= '/Users/emmanuelcartier/Sites/neoveille-admin2/html/data/' # local path
path_to_file= './' # lipn path


def get_corpus_info(lang):
    #http://tal.lipn.univ-paris13.fr/solr/rss_german/select?q=*%3A*&rows=0&wt=json&indent=true&facet=true&facet.pivot=country,subject,source
    q = 'http://localhost:8983/solr/' + lang_solr[lang] + '/select?q=*%3A*&rows=0&wt=json&indent=true&facet=true&facet.pivot=country,subject,source'
    process = subprocess.Popen(['curl', q], stdout=subprocess.PIPE)
    stdout = process.communicate()[0]
    print('STDOUT:{}'.format(stdout))


def retrieve_corpus_stats(lang,now):
    '''recupere les link contenant la forme neologique validee dans la base rssdata - reduction par mois'''
    #res ='<html><head><title>Néoveille</title><meta charset="UTF-8"></head><body>'
    q = 'http://localhost:8983/solr/' + lang_solr[lang] + '/select?q=*%3A*&rows=0&wt=json&indent=false&facet=true&facet.pivot=country,subject,source'
    print(q)
    connection = urlopen(q)
    #print(connection.info())
    response = simplejson.load(connection)
#    print(simplejson.load(connection))
    num = response['response']['numFound']
    
    res='<div class="panel-heading"><h4 class="panel-title">'+lang_display[lang]+' (dernière mise à jour : ' +now + ')</h4></div>'    
    res+='<table class="table table-bordered table-hover" id="table_corpus"><thead>'
    #res+='<tr><td colspan="4">'+lang+'</td><td>'+str(num)+'</td></tr>'
    res+='<tr><th>Pays</th><th>Thématique</th><th>Source</th><th>Nbre articles</th></tr></thead><tbody>'    
    print(response['response']['numFound'], " documents found.")
    # country
    i=0
    j=0
    for cnt in response['facet_counts']['facet_pivot']['country,subject,source']:
        j=j+1
        field = cnt['field']
        cnt_value = cnt['value']
        cnt_count = str(cnt['count'])
        print(field, cnt_value, cnt_count)
        res += '<tr><td>'+cnt_value+'</td><td colspan="2"></td><td><b>'+cnt_count+'</b></td><td class="corpus-details toggler" data-corpus-cat="cnt_'+lang+str(j)+'"></td></tr>'
        # subject

        for subj in cnt['pivot']:
            i=i+1
            subj_value = subj['value']
            subj_count = str(subj['count'])            
            print("subject", subj_value, subj_count)
            res += "\n"+'<tr class="cat_cnt_'+lang+str(j)+'" style="display:none"><td></td><td>'+subj_value+'</td><td></td><td>'+subj_count+'</td><td class="corpus-details toggler" data-corpus-cat="'+lang+str(i)+'"></td></tr>'+"\n"
            # source
           # res+='<div id="show_'+lang+str(i)+'" style="display:none;" class="table table-bordered table-hover">'+"\n"
            for src in subj['pivot']:
                src_value = src['value']
                src_count = str(src['count'])          
                print("source", src_value, src_count)
                res += '<tr class="cat_'+lang+str(i)+'" style="display:none"><td></td><td></td><td>'+src_value+'</td><td>'+src_count+'</td><td></td></tr>'+"\n"
           # res+='</div>'+"\n"
    res += '<tr><td colspan="3" align="left">Total</td><td><b>'+str(num)+'</b></td></tr>' 
    res+='</tbody></table>'
    #res+='</tbody></table><br/><hr/></body></html>'
    #print(res)
    return res
            
        
    #return (links,num, numexact, parsedq,neore)
    

def retrieve_corpus_stats_json(lang):
    '''recupere les link contenant la forme neologique validee dans la base rssdata - reduction par jour'''
    fout = open(lang_solr[lang] + '.csv',mode="w",encoding='utf-8')
    fout.write("country,subject,source,dateS,count\n")
    q = 'http://localhost:8983/solr/' + lang_solr[lang] + '/select'
    args={'wt':'json','q':'[* TO *]','rows':'0','facet':'true','debug':'true','facet.range':'{!tag=r1}dateS',
          'facet.range.start':'NOW/YEAR-5YEAR','facet.range.end':'NOW','facet.range.gap':'+1DAY',
          'facet.pivot':'{!range=r1}country,subject,source'}
    res = {}
    #q = 'http://tal.lipn.univ-paris13.fr/solr/' + lang_solr[lang] + '/select'
    params = urlencode(args).encode("utf-8")
    print(q,params)
    try:    
        connection = urlopen(q,params)
        #print(connection.info())
        response = simplejson.load(connection)
        #print(simplejson.load(connection))
        num = response['response']['numFound']
    
        print(response['response']['numFound'], " documents found.")
        # country
        #print(response['facet_counts']['facet_pivot']['country,subject,source'])
        for cnt in response['facet_counts']['facet_pivot']['country,subject,source']:
            field = cnt['field']
            cnt_value = cnt['value']
            cnt_count = str(cnt['count'])
            #print(field, cnt_value, cnt_count)
            # subject
            for subj in cnt['pivot']:
                subj_value = subj['value']
                subj_count = str(subj['count'])            
                #print("\tsubject", subj_value, subj_count)
                # source
                for src in subj['pivot']:
                    #print(src)
                    src_value = src['value']
                    src_count = str(src['count'])
                    ranges = src['ranges']['dateS']['counts']
                    #print(ranges)
                    for i,k in zip(ranges[0::2], ranges[1::2]):
                        #print(str(i), str(k))
                        if k>0:
                            d = i[0:10]
                            fout.write(cnt_value +","+ subj_value +","+ src_value +","+ str(d) +","+ str(k) +"\n")
                    #res{}=1
        fout.close() 
        return True
    except HTTPError as e:
        # do something
        print('Error code: ', e)
        return False
    except URLError as e:
        # do something
        print('Reason: ', e.reason)
        return False




#langs = ['fr']
langs = ['fr','it','cz','ru','br','gr','zh','de','nl','pl']
    
def main(lang='fr'):

    timestamp = datetime.datetime.now().timestamp()
    value = datetime.datetime.fromtimestamp(timestamp)
    now = value.strftime('%Y-%m-%d %H:%M:%S')
    for lang in langs:
        retrieve_corpus_stats_json(lang)
    #exit()
    fout=codecs.open("rescorpus.txt",mode="w",encoding="utf-8")
    for lang in langs:
        #get_corpus_info(lang)
        
#        fout=codecs.open("rescorpus_"+lang+".html",mode="w",encoding="utf-8")
        res=retrieve_corpus_stats(lang,now)
        fout.write(res)
    fout.close()
    
        
        

    
if __name__ == '__main__':
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./generate_corpus_synthesis.log.txt", filemode='w', level=logging.INFO)    
    log = logging.getLogger(__name__)
    main()
else:
    log = logging.getLogger(__name__)

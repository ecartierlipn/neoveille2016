#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
URL utils
'''

import re,justext, chardet
import urllib2
from urllib2 import urlopen, URLError, HTTPError, Request
from bs4 import BeautifulSoup as bs
import unicodedata
import requests, os

import logging
log = logging.getLogger(__name__)

### utils
def detect_file_encoding(url):
    log.info(url + "\n")
    r = requests.get(url)
    if r.encoding != None:
        log.info(r.encoding)
        return r.encoding
    else:	
        rawdata = urllib2.urlopen(url).read()		
        res = chardet.detect(rawdata)
        log.info(res['encoding'])
        return res['encoding']		


def remove_control_chars(str):
    stripped = lambda s: "".join(i for i in s if ord(i) not in range(8) + range(11,31) + [127])
    return stripped(str)

#print "DIAPO. Quand les Toques Blanchés font le bonheur \tdes producteurs\n"
#print remove_control_chars("DIAPO. Quand les Toques Blanchés font le bonheur  \tdes producteurs\n")
#exit()

def remove_control_characters(s):

    return "".join(ch for ch in s if unicodedata.category(ch)[0]!="Cc")


def strip_html_tags(str):

    html = bs(str,"html.parser")
    str2 = html.get_text()
    str3=re.sub(r"^[<>]+$","",str2)
    str4=re.sub(r"(https?:\/\/)?(\w+)?(\.\w+){2,4}(\/[\.\w]+){0,4}","",str3)
    str5=re.sub(r"\w+\.\w+","",str4)
    #log.info(str5)
    str6= remove_control_chars(str5)
    #log.info(str6)
    return str6

def remove_links(text):
    #log.info(str)
    res = re.sub(r"<.+?>","", text)
    #log.info(res)
    return res

def get_url_article(link):
    '''
    TO BE DONE : error handling : http://www.voidspace.org.uk/python/articles/urllib2.shtml#handling-exceptions        
    '''
    ### bug encodage
    if len(link)<5:
        return False
    try:
        l = link.decode("utf-8",  errors='ignore')
        log.info("Retrieving : " + l)
        #hdr = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
        hdr='Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:10.0) Gecko/20100101 Firefox/10.0'
        headers={'User-Agent':hdr,'method':'get'}
        req = urllib2.Request(l)
        req.add_header('User-Agent',hdr)
        p = urllib2.urlopen(req,timeout=20)        

        #p = urllib2.urlopen(l)
        #log.info(p.headers)
        page = p.read()
        contents=''
        paragraphs = justext.justext(page, justext.get_stoplist('French'))
        for paragraph in paragraphs:
            if paragraph.class_type == 'good' and re.search(r'Facebook connect|cliquez|Envoyer cet article par email|D.couvrez tous nos packs|d.j.un|recevoirnos|nosoffres|acc.dezà|cliquez ici|En poursuivant votre navigation sur ce site|accédezà|pasencore|Veuillez cliquer|créez gratuitement votre compte]',paragraph.text)== None:
                contents = contents + "\n" + paragraph.text
        cts = remove_control_characters(contents)
        return cts
    except HTTPError as e:
        log.warning("HTTP Error : " + str(e))
        return False
    except URLError as e:
        log.warning("URL Error : " + str(e))
        return False
    except UnicodeEncodeError as e:
        log.warning("UnicodeEncode Exception : " + str(e))
        return False
    except UnicodeDecodeError as e:
        log.warning("UnicodeDecode Exception : " + str(e))
        return False
    except Exception as e:
        log.warning("Exception : " + str(e))
        return False
    except:
        return false

def find_rssfeeds(url):
    '''utility to find rss feeds from webpage'''
    
    page = urllib2.urlopen(url)
    soup = bs(page)
    links = soup.find_all('link', type='application/rss+xml')
    if len(links)>0:
        for l in links:
            print l['href'], l['title']
        return links
    else:
        print "No RSS feeds on this site"
        return False
    

# main method
def main():
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./log/URLutils.log", level=logging.INFO)    
    log = logging.getLogger(__name__)
    find_rssfeeds("http://www.lemonde.fr/rss/index.html")

# main
if __name__ == '__main__':
    main()
else:
    log = logging.getLogger(__name__)

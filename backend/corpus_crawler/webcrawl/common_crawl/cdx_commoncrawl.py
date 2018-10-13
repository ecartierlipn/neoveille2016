# see also : 
# https://github.com/trivio/common_crawl_index
# https://github.com/commoncrawl/cc-crawl-statistics

import cdx_toolkit,pickle
import time
import gzip
import logging
import warnings

import requests
import logging
import os,re,sys
import json
import justext
import spacy
import requests
from urllib.parse import urlparse

from datetime import datetime


FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename=sys.argv[0] + ".log.txt", filemode='w', level=logging.INFO)    
logger = logging.getLogger(__name__)


def get_category_from_url(url2):
    (scheme,domain,path,params,query,fragment) =  urlparse(url2) #urlparse(url2)
    (cat,fn) = os.path.split(path)    
    print(scheme,domain,path,cat,fn)
    logger.info(scheme,domain,path,cat,fn)
    return (domain,cat,fn)
    
#tabres = get_category_from_url('https://www.francetvinfo.fr/actus/monfichier.html')
#print(tabres)
#exit()

def process_spacy(docs):
    '''
    '''  
    logger.info(len(docs))
    # Iterate over each doc and process them
    for doc in docs:        
        logger.info('Morphosyntactic analysis of {}'.format(doc['link']))
        content = doc['contents']
        logger.info(content)
        # Processing content
        spacy_doc = nlp(content)
        
        # Get tokens lemma and tags
        logger.debug('Getting tokens, lemmas and tags')
        tokens = []
        lemmas = []
        lemmas_tags = []
        for token in spacy_doc:
            token_text = token.text
            if token_text == "\n":
                continue
            lemma = token.lemma_.lower()
            tag = token.tag_
            tokens.append(token_text)
            lemmas.append(lemma)
            lemmas_tags.append("{}/{}".format(lemma,tag))
        doc['tokens'] = " ".join(tokens)
        doc['lemmes'] = " ".join(lemmas)
        doc['pos-text'] = " ".join(lemmas_tags)
    
        logger.debug('Analysis complete for {}'.format(doc['link']))
    return docs

def myrequests_get(url, params=None, headers=None):
    if params:
        if 'from_ts' in params:
            params['from'] = params['from_ts']
            del params['from_ts']
        if 'limit' in params:
            if not isinstance(params['limit'], int):
                # this needs to be an int because we subtract from it elsewhere
                params['limit'] = int(params['limit'])

    if headers is None:
        headers = {}
    if 'user-agent' not in headers:
        headers['User-Agent'] = 'pypi_cdx_toolkit/' #+__version__

    retry = True
    connect_errors = 0
    while retry:
        try:
            resp = requests.get(url, params=params, headers=headers, timeout=(30., 30.))
            if resp.status_code == 400 and 'page' not in params:
                raise RuntimeError('invalid url of some sort: '+url)  # pragma: no cover
            if resp.status_code in (400, 404):
                LOGGER.info('giving up with status %d', resp.status_code)
                # 400: html error page -- probably page= is too big
                # 404: {'error': 'No Captures found for: www.pbxxxxxxm.com/*'} -- not an error
                retry = False
                break
            if resp.status_code in (503, 502, 504, 500):  # pragma: no cover
                # 503=slow down, 50[24] are temporary outages, 500=Amazon S3 generic error
                LOGGER.info('retrying after 1s for %d', resp.status_code)
                time.sleep(1)
                continue
            resp.raise_for_status()
            retry = False
        except (requests.exceptions.ConnectionError, requests.exceptions.ChunkedEncodingError,
                requests.exceptions.Timeout) as e:
            connect_errors += 1
            if connect_errors > 10:
                if os.getenv('CDX_TOOLKIT_TEST_REQUESTS'):
                    # used in tests/test.sh
                    print('DYING IN MYREQUEST_GET')
                    exit(0)
                else:  # pragma: no cover
                    print('Final failure for url='+url)
                    raise
            LOGGER.warning('retrying after 1s for '+str(e))
            time.sleep(1)
        except requests.exceptions.RequestException as e:  # pragma: no cover
            LOGGER.warning('something unexpected happened, giving up after %s', str(e))
            raise
    return resp

def fetch_warc_content(capture):
    warnings.warn("this API is not finalized", DeprecationWarning)

    filename = capture['filename']
    offset = int(capture['offset'])
    length = int(capture['length'])

    cc_external_prefix = 'https://commoncrawl.s3.amazonaws.com'
    url = cc_external_prefix + '/' + filename
    headers = {'Range': 'bytes={}-{}'.format(offset, offset+length-1)}

    resp = myrequests_get(url, headers=headers)
    record_bytes = resp.content

    # WARC digests can be represented in multiple ways (rfc 3548)
    # I have code in a pullreq for warcio that does this comparison
    #if 'digest' in capture and capture['digest'] != hashlib.sha1(content_bytes).hexdigest():
    #    LOGGER.error('downloaded content failed digest check')

    if record_bytes[:2] == b'\x1f\x8b':
        # XXX We should respect Content-Encoding here, and not just blindly ungzip
        record_bytes = gzip.decompress(record_bytes)

    # hack the WARC response down to just the content_bytes
    try:
        warcheader, httpheader, content_bytes = record_bytes.strip().split(b'\r\n\r\n', 2)
    except ValueError:  # pragma: no cover
        # not enough values to unpack
        return b''

    # XXX help out with the page encoding? complicated issue.
    return content_bytes


def remove_boilerplate(source_code):
    """
    justext boilerplate removal
    """
    
    stopwords = justext.get_stoplist("French")
    paragraphs = justext.justext(source_code, stopwords)
    content_boiler = "\n".join([paragraph.text
                                        for paragraph
                                        in paragraphs
                                        if paragraph.class_type == 'good'])
    return str(content_boiler)


def save_to_solr(jsonfile):
    ''' curl 
    http://localhost:8983/solr/webfrench/update?commit=true&optimize=true 
    -H 'Content-type:application/json' 
    --data-binary @./lemauricien.spacy.json
    '''
    headers = {'Content-type': 'application/json'}
    params = {'commit': 'true','optimize':'true'}
    data = open(jsonfile, 'rb').read() #'{"text":"Hello, World!"}'
    try:
        resp = requests.post('http://localhost:8983/solr/webfrench/update', headers=headers, params=params, data=data)
        print(resp.__dict__)
        logger.info(resp.__dict__)
        print(resp.status_code)
        logger.info(resp.status_code)
        if resp.status_code != requests.codes.ok:
            print (resp.raise_for_status())
            logger.error(resp.raise_for_status())
            return False
        return True
    except requests.exceptions.RequestException as e:
        logger.error(e.__dict__)
        print("Error : " + str(e.__dict__))
        return False







## main
## to delete webfrench collection
# http://localhost:8983/solr/webfrench/update?commit=true&stream.body=<delete><query>*:*</query></delete>
    
cdx = cdx_toolkit.CDXFetcher(source='cc')
cdx.customize_index_list({'from_ts':'20180601000000','to':'20180801000000' ,'matchType':'host'}) # 'to':'20180901000000',
#url = 'http://www.atlantico.fr/*'
#website="Atlantico"
url ='https://www.francetvinfo.fr/'
website="France TV Info"
nb = cdx.get_size_estimate(url)
print(url, 'size estimate', nb)



# load spacy model
logger.info('Initiliazing Spacy French model')
nlp = spacy.load('fr_core_news_sm', disable=["parser"])
logger.info('French model loaded')



timestamp={}
data=[]
i=0
j=0

urls={}
tmpsp={}
for obj in cdx.items(url, limit=nb): # {'from':'2010','mime':'text/html','status':'200'},
    print(obj)
    if 'status' in obj.keys()  and 'mime' in obj.keys() and obj['status'] =="200" and obj['mime']=='text/html':
        urls[obj['url']]= urls.get(obj['url'],0)+1
        tmpsp[obj['timestamp'][0:8]] = tmpsp.get(obj['timestamp'][0:8],0)+1
print(len(urls))
print(str(urls))
print(len(tmpsp))
print(str(tmpsp))
res = [urls,tmpsp]
pickle.dump(res, open( website + ".pkl", "wb" ))
#docs = pickle.load(open(website + ".pkl"))

exit()

for obj in cdx.items(url, limit=nb): # {'from':'2010','mime':'text/html','status':'200'},
    print(obj)
    if 'status' in obj.keys()  and 'mime' in obj.keys() and obj['status'] =="200" and obj['mime']=='text/html':
        obj2={}
        i+=1
        j+=1
        time = obj['timestamp'][0:8]
        timestp = re.sub(r"^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$", "\\1-\\2-\\3T\\4:\\5:\\6 Z", obj['timestamp'])
        #print(time)
        timestamp[time]=timestamp.get(time,0)+1
        contents = fetch_warc_content(obj)
        #obj['html_contents'] = contents.decode('utf-8')
        obj2['contents'] = remove_boilerplate(contents.decode('utf-8'))
        #obj2['link'] = obj['digest']+ str(i)
        (domain,cat,fn)=get_category_from_url(obj['url'])
        print(domain,cat,fn)
        obj2['category'] = cat
        obj2['link'] = obj['url']
        obj2['source'] = website
        obj2['dateS'] =  timestp #datetime.fromtimestamp(int(timestp)).strftime("%Y-%m-%dT%H:%M:%S Z")
        print(obj2)
        data.append(obj2)
        if i == 50:
            print("lauching Spacy analysis and saving to solr")
            #pickle.dump(data, open( "atlantico.pkl", "wb" ))
            #pickle.dump(timestamp, open( "atlantico.pkl", "wb" ))
            data2 = process_spacy(data)
            json.dump(data2,open("tmp.json",mode="w",encoding="utf8"))
            if save_to_solr('tmp.json') == True:
                logger.info("Import to Solr Done")
                print("Import to Solr Done")
            else:
                logger.info("Error for importing to Solr. Exiting")
                print("Error for importing to Solr.")
                os.rename('./tmp.json','./tmp.error'+ str(j)+'.json' )
            i=0
            data=[]
#        print(contents)
    else:
        print("discarded page :"+ str(obj))

data2 = process_spacy(data)
json.dump(data2,open("tmp.json",mode="w",encoding="utf8"))
if save_to_solr('tmp.json') == True:
    logger.info("Import to Solr Done")
    print("Import to Solr Done")
else:
    logger.info("Error for importing to Solr. Exiting")
    print("Error for importing to Solr.")
    os.rename('./tmp.json','./tmp.error'+ str(j)+'.json' )
print(timestamp)
logger.info(timestamp)
    
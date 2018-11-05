# module to analyse a text chunk with polyglot
# https://polyglot.readthedocs.io/en/latest/index.html

import os.path

#import polyglot
from polyglot.downloader import downloader
from polyglot.text import Text

def get_supported_tasks(lang):
    ''' Get supported tasks for the given language and print package names'''
    tasks = downloader.supported_tasks(lang)
    print(lang,tasks)
    
def check_and_download_model (lang, task):
    '''
    Check if a model is available for the task and language. Check if already downloaded otherwise download. Return False
    if not available
    '''
    tasks = downloader.supported_tasks(lang=lang)
    if task in tasks:
        filename = downloader._download_dir + '/' + task + '.'+ lang
        if os.path.isfile(filename):
            return (True,filename)
        else:
            downloader.download(task + '.'+ lang)            
            return (True,filename)
    else:
        return(False,"The task [" + task +  "] is not available for the given language [" + lang + "]. Please change ling_pipeline in settings file.")
            
def load_model(task,lang):
    '''load model for the given language and task'''
    return True


def analyse_text(contents,lang, tasks):
    '''analyse text and return infos corresponding to tasks. 
    See function spacy_server.py parse_text for model of returned ling information.
    tokens = [token.text for token in doc] 
    oov = [token.text for token in doc if token.is_oov and re.match(r"^\w+(-\w+){1,3}$",token.text,re.I)]
    lemmapos = [token.lemma_ + "/" + token.pos_ for token in doc] 
    lemmapos2 = [token.lemma_ + "|" + token.pos_ for token in doc] 
    entities = [ent.text + "|" + ent.label_ for ent in doc.ents if ent.label_ in ('PERSON','NORP','FAC','ORG','GPE','LOC','PRODUCT','EVENT','WORK_OF_ART')]
    return jsonify({'tokens': tokens},{'lemmapos': lemmapos},{'lemmapos_dps': lemmapos2},{'oov': oov},{'ne_dps': entities})
    
    '''
    corresp = {'pos2': 'tags', 'ner2': 'entities'}
    to_universal_ner ={'I-ORG':"ORG",'I-PERS':"PERS", 'I-LOC':"LOC"}
    doc =  Text(contents, hint_language_code=lang)
    tokens = [token.string for token in doc.words]
#    oov = [token.string for token in doc if token.is_oov and re.match(r"^\w+(-\w+){1,3}$",token.text,re.I)]    
    lemmapos = [token[0] + "/" + token[1] for token in doc.pos_tags] 
    lemmapos2 = [token[0] + "|" + token[1] for token in doc.pos_tags] 
    entities = [" ".join(ent) + "|" + to_universal_ner[ent.tag] for ent in doc.entities]
    return ({'tokens': tokens},{'lemmapos': lemmapos},{'lemmapos_dps': lemmapos2},{'oov': oov},{'ne_dps': entities})
    
    
    

    
# tests
lang= ['en','fr','nl',]
for l in lang:
    get_supported_tasks(l)
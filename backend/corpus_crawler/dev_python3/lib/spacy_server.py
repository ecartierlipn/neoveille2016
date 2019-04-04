#!/usr/bin/env python
# https://dzone.com/articles/restful-web-services-with-python-flask
'''
please check that you first download the model you would like to use! For instructions : https://spacy.io/usage/models
example : python -m spacy download en_core_web_sm 
OR
sudo python -m spacy download en_core_web_sm
'''
lang_models = {'fr':'fr_core_news_sm',
               'en':'en_core_web_sm',
               'de':'de_core_news_sm',
               'es':'es_core_news_md',
               'pt':'pt_core_news_sm',
               'it':'it_core_news_sm',
               'nl':'nl_core_news_sm',
               'xx':'xx_core_news_sm'
               }
from flask import Flask, request,jsonify
import spacy,re,os,sys

if not(sys.argv[1]):
    print("You must give the iso_code of the language model to launch (fr,en,de,es,pt,it,nl,xx). Exiting.")
    exit()
else:
    # get spacy info
    spacy.info()
    # get path of models
    #path = spacy.util.get_data_path()
    #print("Path to models : ",path)
    # now load spacy model for the language 
    lang = sys.argv[1] # CHANGE ACCORDING TO THE LANGUAGE YOU WORK ON !
    try :
        nlp = spacy.load(lang_models[lang])
        app = Flask(__name__)
        print('Model : ' + lang + " loaded!")
    except Exception as e:
        print("Bad iso code or other error : ", str(e))
        exit()


@app.route("/check")
def check():
    return jsonify("True")


@app.route("/model")
def model():
    return jsonify(nlp.lang)

@app.route("/parse/", methods=['POST'])
def parse_text():
    # TBD : put it in config file
    to_universal_ner ={'ORG':"ORG",'PERSON':"PERS", 'LOC':"LOC", 'NORP':"OTH", 'FAC':"OTH", 'GPE':"OTH", 'PRODUCT':"OTH", 'EVENT':"OTH", 'WORK_OF_ART':"OTH"}
    sentence = request.form['sentence']
    #print(sentence)
    doc = nlp(sentence) # sentence.decode('unicode-escape')
    tokens = [token.text for token in doc] 
    oov = [token.text for token in doc if token.is_oov and re.match(r"^\w+(-\w+){1,3}$",token.text,re.I)]
    print(oov)
    lemmapos = [token.lemma_ + "/" + token.pos_ for token in doc] 
    lemmapos2 = [token.lemma_ + "|" + token.pos_ for token in doc] 
    entities = [ent.text + "|" + to_universal_ner[ent.label_] for ent in doc.ents if ent.label_ in ('PERSON','NORP','FAC','ORG','GPE','LOC','PRODUCT','EVENT','WORK_OF_ART')]
    return jsonify({'tokens': tokens},{'lemmapos': lemmapos},{'lemmapos_dps': lemmapos2},{'oov': oov},{'ne_dps': entities})


if __name__ == "__main__":
    app.run(debug=True)
# example
# http://127.0.0.1:5000/parse/?sentence=Robonichou marche sur des oeufs depuis la semaine dernière.

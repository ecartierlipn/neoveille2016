#!/usr/bin/python
# -*- coding: utf-8 -*-
'''
document class for linguistic analysis

'''

import mysql.connector
from mysql.connector import Error
import logging
import codecs
import subprocess
import commands
import re
import unicodedata
from datetime import datetime
import editdistance
from ufal.morphodita import *
from langdetect import detect

# global variables : pos analysis external tools
pos_ana={}
pos_ana['france']='/opt/nlp_tools/treetagger/cmd/tree-tagger-french-utf8 '
pos_ana['brésil']='/opt/nlp_tools/treetagger/cmd/tree-tagger-portuguese '
pos_ana['chine']='/opt/nlp_tools/treetagger/cmd/tree-tagger-chinese '
pos_ana['pologne']='/opt/nlp_tools/treetagger/cmd/tree-tagger-polish '
pos_ana['russie']='/opt/nlp_tools/treetagger/cmd/tree-tagger-russian '
pos_ana['grèce']=''
# tagger model for czech (morphodita)
pos_ana['Rép. Tchèque']='/opt/nlp_tools/czech-morfflex-pdt-161115/czech-morfflex-pdt-161115-pos_only.tagger'
# pos-taggers tag sets
# polish tagset : http://nkjp.pl/poliqarp/help/ense2.html#x3-40002.2
# chinese tagset : http://www.lancaster.ac.uk/fass/projects/corpus/LCMC/lcmc/lcmc_tagset.htm
# portuguese tagset : http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/Portuguese-Tagset.html
# russian tagset : http://corpus.leeds.ac.uk/mocky/ru-table.tab
# french tagset : http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/data/french-tagset.html
# global variables : solr corresp
## global config
lang_solr={'france':'rss_french','pologne':'RSS_polish','Rép. Tchèque':'RSS_czech','russie':'RSS_russian','chine':'RSS_chinese','gr':'RSS_greek','brésil':'RSS_brasilian'}
# global variables : hunspell parameters
hunspell={}
hunspell['brésil']='/opt/nlp_tools/dictionaries/pt_BR/pt_BR'
hunspell['france']='/opt/nlp_tools/dictionaries/fr_FR/fr_FR'
hunspell['chine']='/opt/nlp_tools/dictionaries/cz_CZ/cz_CZ'
hunspell['pologne']='/opt/nlp_tools/dictionaries/pl_PL/pl_PL'
hunspell['russie']='/opt/nlp_tools/dictionaries/ru_RU/ru_RU'
hunspell['grèce']='/opt/nlp_tools/dictionaries/el_GR/el_GR'
hunspell['Rép. Tchèque']='/opt/nlp_tools/dictionaries/cs_CS/cs_CS'

## language code for datatables name
iso={}
iso['brésil']='br'
iso['france']='fr'
iso['chine']='ch'
iso['pologne']='pl'
iso['russie']='ru'
iso['grèce']='gr'
iso['Rép. Tchèque']='cz'
# language code for lang detection (ISO 639-1 codes : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
lang_detect={}
lang_detect['brésil']=['pt']
lang_detect['france']=['fr']
lang_detect['chine']=['zh-cn','ko','vi']
lang_detect['pologne']=['pl']
lang_detect['russie']=['ru','mk','bg']
lang_detect['grèce']=['el']
lang_detect['Rép. Tchèque']=['cs','sk']

dict_exclusion={}


class document:
    '''classe document '''

    def __init__(self, url, lang, metas, contents=''):
        "build an instance with meta-informations"
        self.metas = metas
        self.url = url
        self.lang = lang
        self.tagset = self.get_tagset()
        self.contents=contents
        #print str(self.tagset)

    def get_tagset(self):
        '''help function to get tagset and correpondance to universal categories'''
        tagset={}
        fn = ''
        if self.lang == 'Rép. Tchèque':
            fn = 'tchequie'
        else:
            fn = self.lang
        with codecs.open('lang_tagsets/'+ fn + '_tagset.txt',"r","utf-8") as f:
            for line in f:
                l2 = line.rstrip()
                data = re.split(r"\t",l2)
                if len(data)==3:
                    # tagset[data[0]]= data[1] + ":"+data[2]
                    tagset[data[0]]= data[1]
                else:
                    log.warn( "Error with line : " + l2)

        return tagset   

    def ling_analyze(self, ana_type):
        '''enable to trigger analysis'''
        if ana_type == 'tokenize':
            self.tokenize()
        elif ana_type == 'pos_tagging':
            self.pos_tagging()
        elif ana_type == 'dependency':
            self.dependency_analysis()
        else:
            return (False,"Analysis Type not defined" + ana_type)

    def tokenize(self):
        "tokenize text contents into tokens/word retaining only alphabetic sequences"
        pass

    def pos_tagging(self):
        "function to choose pos_tagging soft to use depending on language"
        if self.lang in ('brésil','chine','pologne','russie','france'):
            f = codecs.open('contentsA.txt','w',"utf-8")
            f.write(self.contents)
            f.close()
            res = self.treetagger_analysis(pos_ana[self.lang], 'contentsA.txt')
            if res == False: ## echec analyse pos tag
                self.postagger = False
            else:
                self.postagger = True
        elif self.lang in ('Rép. Tchèque'):
            #f = codecs.open('contents.txt','w',"utf-8")
            #f.write(self.contents)
            #f.close()
            res = self.morphodita_analysis(pos_ana[self.lang], self.contents)
            if res == False: ## echec analyse pos tag
                self.postagger = False
            else:
                self.postagger = True
        else: ## langue non couverte
            log.warning("Language not supported : " + self.lang)
            self.postagger = False

    def dependency_analysis(self):
        "check if a word is into reference or exclusion dictionary"
        pass

    def morphodita_analysis(self, cmdT,cts):
        '''
            launch the morphodita tagger
            :param cmdT: tagger model
            :param cts: text file contents
            :return: a bunch of linguistic information see process_treetagger_output which process the raw treetagger output (result)
            can also generate an error string if fails to analyze the text

        '''
        tagger = Tagger.load(cmdT)
        if not tagger:
            log.error("Cannot load tagger from file '%s'\n" % cmdT)
            #print("Cannot load tagger from file '%s'\n" % cmdT)
            exit()
        log.info('Tagger model loaded\n')
        forms = Forms()
        lemmas = TaggedLemmas()
#        tagforms = TaggedLemmasForms()
        tokens = TokenRanges()
        tokenizer = tagger.newTokenizer()
        if tokenizer is None:
            # print("No tokenizer is defined for the supplied model!")
            log.error("No tokenizer is defined for the supplied model!")
            exit()  
            # Tag
            # readfile 
        tokenizer.setText(cts.encode("utf-8"))
        t = 0
        text_ana=""
        while tokenizer.nextSentence(forms, tokens):
            tagger.tag(forms, lemmas, 0)
            for i in range(len(lemmas)):
                lemma = lemmas[i]
                token = tokens[i]
                #print "*********"
                #print(t)
                #print(cts[t : token.start])
                text_ana = text_ana + cts[token.start : token.start + token.length] + "\t" + lemma.tag + "\t" + lemma.lemma + "\n"
                #print(cts[token.start : token.start + token.length])
                #print(form.form)                        
#                        print(lemma.lemma)
    #                       print(lemma.tag)
                #if re.search(r"X",lemma.tag):
                #    print "Potential Neologism : " + lemma.lemma + ":" + lemma.tag           
                t = token.start + token.length
        #print text_ana
        #exit()
        log.info("Treetagger analyis done")
        (words,lemmas,lempos,unk,np,text,text2)= self.process_morphodita_output(text_ana)
        self.words = words
        self.lemmas=lemmas
        self.lempos = lempos
        self.unk = unk
        self.np = np
        self.tokenizedText = text2
        self.postaggedText = text
        #exit()
        return True

    def process_morphodita_output(self,ltoutput):
        '''
            function to generate several lists of linguistic information data from a treetagger string output 
            :param loutput: string with treetagger output (one token per line, with token, pos, lemma separated by a tab
            :type loutput : unicode string
            :return: words(list of tokens),lemmas(list of lemmas),lempos(list of lemmas/pos),pos(list of pos),unk(list of lemmas tagged <unknown> not beginning 
            an uppercase letter),np(list of lemmas tagged <unknown> and beginning with a uppercase letter),text(string reformating the treetagger output : token/pos/lemma, 
            tokens separated with a space)
            input : <S> Malgré[malgré/P] cela[cela/R dem m s],[,/M nonfin] le[le/D m s] débat[débat/N m s] sur[sur/P] le[le/D m s] risque[risque/N m s$
            output : dict
            :seealso:treetagger_analysis function
            :note: here we can plug several specific processing for neologisms
            '''
        re.UNICODE
        words={}
        lemmas={}
        lempos={}
        unk={}
        np={}
        text=''
        text2=''
        #    self.tagset['SENT']='SENT'
        lines = re.split("\n",ltoutput)
        for line in lines:
            #log.info(line)
            data= re.split(r"\t",line)
            #log.info(data)
            if len(data) != 3:
                log.info("error in line : " + str(data))
                continue
            elif len(data)==3:# chinese output
                #log.info(data)                
                w = data[0]
                tag = data[1][0]
                lemmainfos = re.split(r"_",data[2])
                lemma= lemmainfos[0]
                tagU=''
                if self.tagset.has_key(tag):
                    tagU = self.tagset[tag]
                else:
                    log.info("No universal tag for :" + tag)
                    tagU=tag
                text = text + w + "/" + tagU + "/" + lemma + " "
                text2 = text2 + w + " "
                words[w]= words.get(w,0)+1
                # lemmes (noun , verb, adj)
                if re.search(r"^[\w-]+$",w) and re.search(r"Noun|Adj|Verb",tagU):
                    lemmas[lemma]=lemmas.get(lemma,0)+1
                    lempos[lemma + "/" + tagU]=lempos.get(lemma + "/" + tagU,0)+1

                # filtre neologismes / proper nouns
                elif tagU == 'UNK' and re.search(r"^\w+(-\w+){0,4}$",w) and re.match(r"[A-Z]",w)==None and re.search(r"[_\d]",w)==None and len(
                    w)>3:
                    log.info("Neologism candidate :" + w + "\n")
                    #print("Neologism candidate :" + w + "\n")
                    unk[w]= unk.get(w, 1)
                #log.info(unk)
                #log.info(words)
                #log.info(lemmas)
        #print(unk)
        #print(words)
        #print(lemmas)
        #print text
        return words,lemmas,lempos,unk,np,text,text2





    def treetagger_analysis(self, cmdT,filename):
        '''
            launch the morphodita tagger
            :param cmdT: tagger model
            :param filename: text file to analyse
            :return: a bunch of linguistic information see process_treetagger_output which process the raw treetagger output (result)
            can also generate an error string if fails to analyze the text

        '''
        cmd = cmdT + filename
        try:
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            result, err = p.communicate()
            p.wait()
            if result:
                #log.info(result + "\n")
                res = result.decode('utf-8')
                #log.info("Treetagger analyis done" + res)
                log.info("Treetagger analyis done"+ res)
                (words,lemmas,lempos,unk,np,text,text2)= self.process_treetagger_output(res)
                self.words = words
                self.lemmas=lemmas
                self.lempos = lempos
                self.unk = unk
                self.np = np
                self.tokenizedText = text2
                self.postaggedText = text
                return True
            else:
                log.warning(err + "\n")
                return False
        except subprocess.CalledProcessError as e: # to be done : catch the actual error
            log.warning(e + "\n")
            return False



    def process_treetagger_output(self,ltoutput):
        '''
                function to generate several lists of linguistic information data from a treetagger string output 
                :param loutput: string with treetagger output (one token per line, with token, pos, lemma separated by a tab
                :type loutput : unicode string
                :return: words(list of tokens),lemmas(list of lemmas),lempos(list of lemmas/pos),pos(list of pos),unk(list of lemmas tagged <unknown> not beginning 
                an uppercase letter),np(list of lemmas tagged <unknown> and beginning with a uppercase letter),text(string reformating the treetagger output : token/pos/lemma, 
                tokens separated with a space)
                input : <S> Malgré[malgré/P] cela[cela/R dem m s],[,/M nonfin] le[le/D m s] débat[débat/N m s] sur[sur/P] le[le/D m s] risque[risque/N m s$
                output : dict
                :seealso:treetagger_analysis function
                :note: here we can plug several specific processing for neologisms
        '''
        re.UNICODE
        words={}
        lemmas={}
        lempos={}
        unk={}
        np={}
        text=''
        text2=''
        self.tagset['SENT']='SENT'
        lines = re.split("\n",ltoutput)
        for line in lines:
            #log.info(line)
            data= re.split(r"\t",line)
            log.info(data)
            if len(data)<2 or len(data)>3:
                log.info("error in line : " +  str(line))
                continue
            elif len(data)>=2:# chinese output
                log.info(data)                
                w = data[0]
                w2= re.sub(r"-","",w)
                tag = re.sub(r"[:-].+$","",data[1])
                tagU=''
                if self.tagset.has_key(tag):
                    tagU = self.tagset[tag]
                elif self.tagset.has_key(tag[0:2]):
                    tagU = self.tagset[tag[0:2]]
                elif self.tagset.has_key(tag[0:1]):
                    tagU = self.tagset[tag[0:1]]
                else:
                    log.info("No universal tag for :" + tag)
                    tagU=tag
                if len(data)==3:
                    lemma= data[2]
                else:
                    lemma=data[0]
                text = text + w + "/" + tagU + "/" + lemma + " "
                text2 = text2 + w + " "
                if data[1] == 'SENT':
                    text = text + "\n"
                    text2 = text2 + "\n"
                #log.info(text)
                # words
                words[w]= words.get(w,0)+1
                # lemmes (noun , verb, adj)
            # if re.search(r"unknown",lemma):
            #     print w + "\t" + lemma + "\t" + tagU 
            #     log.info(w + "\t" + lemma + "\t" + tagU)
                if re.search(r"Noun|Adj|Verb",tagU) and re.search(r"unknown",lemma)==None:
                    lemmas[lemma]=lemmas.get(lemma,0)+1
                    lempos[lemma + "/" + tagU]=lempos.get(lemma + "/" + tagU,0)+1

                # noms propres
                elif re.match(r"unknown",lemma) and tagU =='Np':
                    np[w]=np.get(w,0)+1
                # filtre neologismes / proper nouns
                elif re.search(r"unknown",lemma) and re.search(r"^\w|\w$",w) and re.search(r"^.{3,}$",w) and w2.islower() and re.search(r"[_\d]",w)==None and tagU !='Abr':
                    log.info("Neologism candidate :" + w + "\n")
                    #print "Neologism candidate : " + w + "\t" + lemma + "\t" + tagU 
                    unk[w]= unk.get(w, 1)
                ## chinese has no lemma but a x tag
                elif re.search(r"x",tagU) and re.search(r"^.{3,}$",w) and re.search(r"[_\d]",w)==None:
                    log.info("Neologism candidate :" + w + "\n")
                    #print "Neologism candidate : " + w + "\t" + lemma + "\t" + tagU 
                    unk[w]= unk.get(w, 1)
        #log.info(unk)
        #log.info(words)
        #log.info(lemmas)
        return words,lemmas,lempos,unk,np,text,text2



    def hunspell_check(self, s):
        '''
        spell checking of word through hunspell
        echo 'commenc exist' | hunspell -d /Users/emmanuelcartier/prog-neoveille/dicos/hunspell_FR_fr-v5/fr_FR
        OK:    *
        Root:  + <root>
        Compound: -
        Miss:  & <original> <count> <offset>: <miss>, <miss>, ...
        None:  # <original> <offset>
        examples:
        Hunspell 1.3.3
        + commencer
        & commencear 3 0: commencera, commencer, commencement
        '''
        cmd = "echo '" + s + "' | /usr/bin/hunspell -i UTF-8 -d " + hunspell[self.lang]
        log.info("Input : " + s + "\n")
        try:
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            result, err = p.communicate()
            p.wait()
            if result:
                lines = re.split("\n", result)
                for l2 in lines[1:-2]:
                    l = l2.rstrip()
                    if l[0] in ('*','+') and re.search(r"-",s):
                        log.info("Compound word : " + l + "\n")
                        return (True, u'dico composé')
                    if l[0] in ('*','+'):
                        log.info("Simple word : " + l + "\n")
                        return (True, u'dico simple')
                    elif l[0] in ('#'):
                        log.info("Unknwon word, no suggestion : " + l + "\n")
                        return (True,'unknownspellcheck')
                    elif l[0] == '&':
                        #print "Hunspell results : " + l2
                        m = re.search(r"^& ([^\s]+(?:-[^\s]+){0,4}) ([0-9]+) [0-9]+: (.+)$", l,re.UNICODE)
                        if (m):
                            #flog.write("Mispelled word :" + unicode(m.group(1 + "\n")))
                            log.info("Number of suggestions :" + m.group(2)+ "\n")
                            sugg = re.split(r", ", m.group(3))
                            dist = editdistance.eval(m.group(1),sugg[0])
                            #print str(dist)
                            if dist<2:
                                #print "Distance from : " + unicode(sugg[0]) + ":" + str(dist) 
                                return (True, "suggestion:2-:"+sugg[0]+ ":" + str(dist))
                            else:
                                #print "Distance from : " + unicode(sugg[0]) + ":" + str(dist) 
                                return (True, "suggestion:2+:"+sugg[0]+ ":" + str(dist))
                        else:
                            return(True,"suggestion:"+l2)

                            #for s in sugg:
                            #	print "suggestion :" + s
                            #flog.write(result + "\n")
                            #res = result.decode('utf-8')
            else:
                log.warning(err + "\n")
                return (False, 'err')
        except subprocess.CalledProcessError as e: # to be done : catch the actual error
            log.warning(e + "\n")
            return (False,'err')





    #(res, info)=hunspell_check("petis")
    #print res
    #flog.write(info + "\n")
    #exit()

    def hunspell_check_gen(self, s):
        '''
        spell checking of sentences through hunspell
        echo 'commenc exist' | hunspell -d /Users/emmanuelcartier/prog-neoveille/dicos/hunspell_FR_fr-v5/fr_FR
        OK:    *
        Root:  + <root>
        Compound: -
        Miss:  & <original> <count> <offset>: <miss>, <miss>, ...
        None:  # <original> <offset>
        examples:
        Hunspell 1.3.3
        + commencer
        & commencear 3 0: commencera, commencer, commencement
        '''
        cmd = "echo '" + s + "' | /usr/local/bin/hunspell -i UTF-8 -d " + hunspell[self.lang]
        log.info("Input : " + s + "\n")
        unknown={}
        try:
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
            result, err = p.communicate()
            p.wait()
            if result:
                lines = re.split("\n", result)
                for l2 in lines[1:]:
                    l = l2.rstrip()
                    if l[0] in ('*','+') and re.search(r"-",s):
                        log.info("Compound word : " + l + "\n")
                        continue
                    if l[0] in ('*','+'):
                        log.info("Simple word : " + l + "\n")
                        continue
                    elif l[0] in ('#'):
                        log.info("Unknwon word, no suggestion : " + l + "\n")
                        data = re.split(r" ",l)
                        unknown[data[1]]=1
                    elif l[0] == '&':
                        #print "Hunspell results : " + l2
                        m = re.search(r"^& ([^\s]+(?:-[^\s]+){0,4}) ([0-9]+) [0-9]+: (.+)$", l,re.UNICODE)
                        if (m):
                            #flog.write("Mispelled word :" + unicode(m.group(1 + "\n")))
                            log.info("Number of suggestions :" + m.group(2)+ "\n")
                            sugg = re.split(r", ", m.group(3))
                            dist = editdistance.eval(m.group(1),sugg[0])
                            #print str(dist)
                            if dist<2:
                                #print "Distance from : " + unicode(sugg[0]) + ":" + str(dist) 
                                continue
                            else:
                                #print "Distance from : " + unicode(sugg[0]) + ":" + str(dist) 
                                unknown[m.group(1)]=1
                        else:
                            continue
                    else:
                        log.info("Answer not matching any pattern  :" + l2 + "\n") 
                        continue
                return(True, unknown)
            else:
                log.warning(err + "\n")
                return (False, 'err')
        except subprocess.CalledProcessError as e: # to be done : catch the actual error
            log.warning(e + "\n")
            return (False,'err')








    def detect_language(self,contents):
        '''utility to detect language'''
        return detect(contents)

    def filter_unknown(self, unklist):
        '''
        fonction pour filter les inconnus et ne conserver que candidats néologismes
        '''
        unk2={}
        log.info("checking neologism candidates..." + str(len(unklist)) + " entries" + "\n")
        for u in unklist:
            if re.search(r"^-|-$|-(.+?-){2,}|\u02bc",u,re.UNICODE): # elimination directes de quelques cas  :  or re.search(r"-(.+?-){2,}",u)
                continue

            u2 = re.sub(r"-", "", u)
            u3 = re.sub(r"-e(-s)?$|-(.+?)-s$", "", u) ## pour les mots type élu-e-s
            u4 = remove_accents(unicode(u))
            log.info("conversion unaccented from : " + u + ":" + u4)
            if len(u)<=2 or re.search(r"\W",u2,re.UNICODE) or re.search(r"_",u,re.UNICODE) or u2.islower()== False:
                log.info(u + " not corresponding to typographic constraints for words. Skipping.")
                continue
            elif u in dict_exclusion  or u2 in dict_exclusion  or u3 in dict_exclusion  or u4 in dict_exclusion:
                log.info(u + " is in excluded dico. Skipping")
                continue
            else :
                (res,info)=self.hunspell_check(u)
                log.info(str(res) +"," + info + "\n")
                #print(u(res) +"," + info + "\n")
                res2=re.split(r":",info)
                if res==True and len(res2)==4  and int(res2[3])<3: # correction hunspell infèrieure ou egale à deux pas
#                    log.info(u + " corrected (typo) : " + info + "\n")	## il faut enregistrer dans la base de ref...			)
                    log.info(u + " corrected (typo)")	## il faut enregistrer dans la base de ref...			)
                elif res==True and re.search(r"dico",info):
                    unk2[u]=info
                else:
                    unk2[u]="Aucune suggestion"
        return unk2    

    #filter_unknown([u"crossed"])
    #exit()

# helper functions
def remove_accents(input_str):
    ascii= unicodedata.normalize('NFKD', input_str).encode('ASCII', 'ignore')
#	ascii= unicodedata.normalize('NFKD', unicode(input_str,"UTF-8")).encode('ASCII', 'ignore')
    return ascii

def save_corpus_to_fileSOLRformat(data,lang_en,index=True):
    now = datetime.now().strftime("%d-%m-%y_%H")
    filen = './tobeindexed/'+ lang_en + "." + now + '.xml'
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
        index_rssfeeds_solr(filen, lang_en,"xml")

def save_doc_to_fileSOLRformat(doc,lang_en,index=True):
    now = datetime.now().strftime("%d-%m-%y_%H")
    filen = './tobeindexed/add_'+ lang_en + "." + now + '.xml'
    log.info("Saving data into :" + filen)
    fout=codecs.open(filen,"w","utf-8")
    fout.write("<add>")
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
        res = index_data_solr(filen, lang_en,"xml")
        if res:
            return True
        else:
            return False

def save_doc_to_fileSOLRupdateformat(doc,lang_en,updatecmd, index=True):
    now = datetime.now().strftime("%d-%m-%y_%H")
    filen = './tobeindexed/update_'+ lang_en + "." + now + '.xml'
    log.info("Saving data into :" + filen)
    fout=codecs.open(filen,"w","utf-8")
    fout.write("<add>")
    fout.write('<doc>\n')
    # first write unique key
    v1=re.sub(r"[<>]", "", doc['link'])
    v3=re.sub(r"&", "&amp;", v1)        
    fout.write('<field name="link">' + v3 + "</field>\n")

    for key in doc.keys():
        #flog.write(key + ":" + str(type(doc[key] + "\n")))
        if key =='keywords' or key=='ID_RSS' or key =='link': # not yet handled by solr schema
            #print doc[key]
            continue
        elif key in updatecmd.keys(): ## fields to taken into account
            if type(doc[key]) in (str,unicode):
                v=re.sub(r"[<>]", "", doc[key])
                v2=re.sub(r"&", "&amp;", v)
                fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + v2 + "</field>\n")
            elif type(doc[key]) in (int,None,long):
                fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + str(doc[key]) + "</field>\n")
            elif type(doc[key]) is dict:
                for elt in doc[key]:
                    v=re.sub(r"[<>]", "", elt)
                    v2=re.sub(r"&", "&amp;", v)
                    fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + v2 + "</field>")
                    #elif type(doc[key]) is list:
                    #        for elt in doc[key]:
                    #                v=re.sub(r"[<>]", "", elt)
                    #                v2=re.sub(r"&", "&amp;", v)
                    #                fout.write('<field name="' + key + '">' + v2 + "</field>")
            else:
                fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + str(doc[key]) + "</field>\n")
    fout.write("</doc>\n")
    fout.write('</add>')
    fout.close()
    if index==True:
        res = index_data_solr(filen, lang_en,"xml")
        if res:
            return True
        else:
            return False
    else:
        return False



def write_xml_chunk(fout,doc,lang_en,updatecmd):
    fout.write('<doc>\n')
    # first write unique key
    v1=re.sub(r"[<>]", "", doc['link'])
    v3=re.sub(r"&", "&amp;", v1)        
    fout.write('<field name="link">' + v3 + "</field>\n")

    for key in doc.keys():
        #flog.write(key + ":" + str(type(doc[key] + "\n")))
        if key =='keywords' or key=='ID_RSS' or key =='link': # not yet handled by solr schema
            #print doc[key]
            continue
        elif key in updatecmd.keys(): ## fields to taken into account
            if type(doc[key]) in (str,unicode):
                v=re.sub(r"[<>]", "", doc[key])
                v2=re.sub(r"&", "&amp;", v)
                fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + v2 + "</field>\n")
            elif type(doc[key]) in (int,None,long):
                fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + str(doc[key]) + "</field>\n")
            elif type(doc[key]) is dict:
                for elt in doc[key]:
                    v=re.sub(r"[<>]", "", elt)
                    v2=re.sub(r"&", "&amp;", v)
                    fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + v2 + "</field>")
                    #elif type(doc[key]) is list:
                    #        for elt in doc[key]:
                    #                v=re.sub(r"[<>]", "", elt)
                    #                v2=re.sub(r"&", "&amp;", v)
                    #                fout.write('<field name="' + key + '">' + v2 + "</field>")
            else:
                fout.write('<field name="' + key + '" update="' + updatecmd[key] + '">' + str(doc[key]) + "</field>\n")
    fout.write("</doc>\n")
    return True

def get_corpus_data_fromDB(lang):
    """ Helper function to retrieve data from rss_data database """
    log.info("retrieving corpus data from db for language : " + lang)
    print "Retrieving corpus data from db for " + lang
    res=''
    try:
        conn = mysql.connector.connect(host='localhost',
                                       database='rssdata',
                                       user='root',
                                       password="neoveille", charset="utf8")

        if conn.is_connected():
            cursor = conn.cursor(dictionary=True, buffered=True)
            cursor.execute("SET NAMES utf8;")
            args = [lang]
            #print "ARGS:[" + args[0] + "]"
#            print cursor.callproc('GET_CORPUS_DATA_TMP', args) # To be replaced by GET_CORPUS_DATA
            print cursor.callproc('GET_CORPUS_DATA_TMP2', args) # To be replaced by GET_CORPUS_DATA
            for result in cursor.stored_results():
                res = result.fetchall()
                #print str(result.fetchall())
#                for row in result.fetchall():
#                    print "Info : " + str(row)         
            cursor.close()


    except Error as e:
        log.exception(str(e))
        #print(str(e))
        return False

    finally:
        conn.close()
        return res


def add_neologisms_to_db(neolist,lang):
    """ Connect to MySQL database """
    # open file and retrieve rssfeeds
    proc_name = 'ADD_NEOLOGISM_' + lang 
    try:
        conn = mysql.connector.connect(host='localhost',
                                       database='datatables',
                                       user='root',
                                       password="neoveille",
                                       autocommit=True)
        if conn.is_connected():
            for neo in neolist:
                args=[neo, 1, neolist[neo], 0]
                cursor = conn.cursor()
                results = cursor.callproc(proc_name, args)
                log.info(str(results )+ "\n")
                cursor.close()

    except Error as e:
        log.warning(e)
        return False

    finally:
        conn.close()
        return True


#flog.write(add_neologisms_to_db(["neolist","toto","titi","rateiu"] + "\n"))
#exit()



def index_data_solr(filename, lang_en, t="xml"):
    '''index to solr using lang (self.lang) and filename parameters
    Launch the command to index a json of xml file into Apache Solr
    :param filename: the xml or json file with docs to index
    :param t: the format of the file either json or xml
    :seealso: Apache Solr documentation on curl command utility
    '''
    if t == "xml":
        log.info("indexing with XML procedure..." + "\n")
        with open("rss_feeds_solr_index_xml.sh", "w") as out:	
            solr_cmd = "curl 'http://localhost:8983/solr/" + lang_en + "/update?commit=true&optimize=true' -H 'Content-type:text/xml' --data-binary @" +filename
            out.write(solr_cmd)
        try:
            p = subprocess.Popen(["sh","./rss_feeds_solr_index_xml.sh"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT,close_fds=True)
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



def db_tag_doc_as_processed(iddoc,index_type):
    """ Helper function to add a field value IS_INDEXED=index-type to document to avoid redoing pos-tagging neologism search 
    the next time 
index_type = 1 == analysed and indexed
index_type = 2 == analysed by failed to index
    """
    log.info("updating doc " + iddoc + ":" + str(index_type))
    #print "updating doc : " + iddoc
    try:
        conn = mysql.connector.connect(host='localhost',
                                       database='rssdata',
                                       user='root',
                                       password="neoveille")
        if conn.is_connected():
            cursor = conn.cursor(buffered=False)
            args = [iddoc,index_type]
            cursor.callproc('UPDATE_RSS_DATA2_INDEX_COMPLETED', args) 
            conn.commit()
            cursor.close()


    except Error as e:
        log.exception(e.msg)
        #print(e)
        return False

    finally:
        conn.close()
        return True



def load_exclusion_dico(lang):
    """ Connect to MySQL database and return a dictionary with all the excluded forms as keys from all dictionaries 
    for this language lang"""
    try:
        conn = mysql.connector.connect(host='localhost',
                                       database='datatables',
                                       user='root',
                                       password="neoveille")
        if conn.is_connected():
            #log.info('Connected to Mysql database' + "\n")
            cursor = conn.cursor()
            args = [lang]
            results = cursor.callproc('get_dicos_generic', args)
            for result in cursor.stored_results():
                #rows = results.fetchall()
                #print result.fetchall()
                for row in result.fetchall():
                    #print row[1] + "-" + row[2]
                    dict_exclusion[row[0]]=1
            cursor.close()
            conn.close()
            return True

    except Error as e:
        log.exception(str(e))
        return False


#dict = load_exclusion_dico('cz')
#print len(dict)
#exit()

def main():

    ## test function save_doc_to_fileSOLRupdateformat
    #doc={}
    #doc['lemmes']={"toto":2,"tito":4}
    #doc['link']="coucou"
    #updatecmd={'lemmes':'add','noms_propres':'add','neologismes':'add'}
    #save_doc_to_fileSOLRupdateformat(doc,'Fr',updatecmd, False)
    #exit()    
    #text = '''
    #Česká eurokomisařka Věra Jourová má neděle v drtivé většině pracovní, zato soboty si ráda užívá. Tráví je s rodinou nebo třeba na bleším trhu v Bruselu. V létě si užije trochu volna na festivalu Colours of Ostrava, kam vyráží každý rok.
    #Věra Jourová ráda vzpomíná na nedělní obědy, které připravoval její tatínek, milovník dobrého jídla Česká eurokomisařka Věra Jourová má neděle v drtivé většině pracovní, zato soboty si ráda užívá. Tráví je s rodinou nebo třeba na bleším trhu v Bruselu. V létě si užije trochu volna na festivalu Colours of Ostrava, kam vyráží každý rok.
    #'''
    #d = document("...", 'Rép. Tchèque', "metas",text)
    #d.ling_analyze('pos_tagging') ## to be done : specific return value if fails
    #exit()


    #d = document(url, {'lang':'france', 'source':'db', 'type':'rss'})
#    langs = ['brésil','chine','pologne','russie','Rép. Tchèque']
    #langs = ['france','brésil','pologne','chine','russe','Rép. Tchèque']
#    langs = ['pologne','france','brésil','chine','russie','Rép. Tchèque']
    langs = ['chine']
    for lang in langs:
        res = get_corpus_data_fromDB(lang)
        if res:
            print len(res)
            log.info(str(len(res)) + " articles to parse.")
            log.info("Loading exclusion dico")
            print("loading exclusion dicos")
            load_exclusion_dico(iso[lang])
            log.info("Exclusion dico entries nb : " + str(len(dict_exclusion)))
            print "Exclusion dico entries nb : " + str(len(dict_exclusion))
            i=0
            #dataAll =[]
            ### preparation of solrxmlfile
            now = datetime.now().strftime("%d-%m-%y_%H")
            filenameXML = './tobeindexed/update_rss-data.'+ lang_solr[lang] + "." + now + '.xml'
            fout = codecs.open(filenameXML,mode="w+",encoding="utf-8")
            fout.write("<add>")

            for data in res:
                log.info(data)
                print "Document nb : " + str(i)
                i+=1
                metas={}
                source_link =data[0]
                metas['title'] =data[1]
                metas['subject'] =data[2]
                metas['category'] =data[3]
                #metas['description'] =data[4]
                cts =data[1] + "\n" + data[5]
                contents1 = re.sub(r'[«»]', r' " ', unicode(cts), flags=re.UNICODE)
                contents = re.sub(r'\s+', r' ', unicode(contents1), flags=re.UNICODE)
                metas['ID_RSS'] =data[6]
                d = document(source_link, lang, metas,contents)
                langd = d.detect_language(contents)
                if (langd not in lang_detect[lang]):                
                    log.info("Problem with language detection for contents : " + unicode(contents) + "\nAutomatic detection says : [" + langd + "] whereas expected language is " + str(lang_detect[lang]) + "\nSkipping analysis for this document and deleting it from database.")
                    continue
                d.ling_analyze('pos_tagging') ## to be done : specific return value if fails
                #print str(d)
                ### retrieve info so as to create a dict for saving into solr xml format
                doc = {}
                doc['link']=source_link 
                if d.postagger==False:
                    log.info("Pos tagger has returned false for content")
                    continue
                else:
                    doc['lemmes']= d.lemmas
                    doc['noms_propres']= d.np
                    doc['pos-text']= d.postaggedText # too heavy for apache solr 15-12-2016
                    #print d.unk
                    #continue
                    # neo exclusion list
                    if len(d.unk)>0:
                        log.info(d.unk)
                        if lang == 'chine': ### if else for checking chinese filtering accuracy for Li Chao 
                            unk2 = d.unk
                        else:
                            unk2=d.filter_unknown(d.unk)
                        #unk2 = d.unk
                        log.info(unk2)
                        #continue
                        if len(unk2)>0:
                            #doc['neologismes']=unk2
                            add_neologisms_to_db(unk2,iso[lang])            
                            #doc['neologismes']= d.unk
                            #doc['pos-text']= d.postaggedText
                            #dataAll.append(doc)
                            #log.info(doc)
                            #print str(doc)
                            #updatecmd={'lemmes':'add','noms_propres':'add','neologismes':'add','pos-text':'set'}
                            updatecmd={'lemmes':'add','noms_propres':'add','pos-text':'set'}
                            #res = save_doc_to_fileSOLRupdateformat(doc,lang_solr[lang],updatecmd,True)
                            res = write_xml_chunk(fout,doc,lang_solr[lang],updatecmd)
                            if res:
                                db_tag_doc_as_processed(source_link,1)
                            else:
                                log.error("Error saving data for source link (" +  source_link + "). marking as partially processed")
                                db_tag_doc_as_processed(source_link,2)
                        # no neologismes : index-update anyway with other linguistic information (lemmes, noms-propres)
                        else:
                            log.info("Pas de mot inconnu dans : " + source_link + ". indexing anyway.")
                            updatecmd={'lemmes':'add','noms_propres':'add','pos-text':'set'}
                            #res = save_doc_to_fileSOLRupdateformat(doc,lang_solr[lang],updatecmd,True)
                            res = write_xml_chunk(fout,doc,lang_solr[lang],updatecmd)
                            if res:
                                db_tag_doc_as_processed(source_link,1)
                                #save_corpus_to_fileSOLRformat(dataAll,'pologne',False)
                                # no unknown words but change IS_INDEXED to value 1
                            else:
                                log.error("Error saving data for source link (" +  source_link + "). marking as partially processed")
                                db_tag_doc_as_processed(source_link,2)                      
                    # no unknown words but change IS_INDEXED to value 1
                    else:
                        log.info("Pas de mot inconnu dans : " + source_link + ". indexing anyway.")
                        updatecmd={'lemmes':'add','noms_propres':'add','pos-text':'set'}
                        #res = save_doc_to_fileSOLRupdateformat(doc,lang_solr[lang],updatecmd,True)
                        res = write_xml_chunk(fout,doc,lang_solr[lang],updatecmd)
#                        continue
                        if res:
                            db_tag_doc_as_processed(source_link,2)
                        else:
                            log.error("Error writing data for source link (" +  source_link + "). marking as partially processed")
                            db_tag_doc_as_processed(source_link,2)                              
            fout.write("</add>")
            fout.close()
            # now indexing for lang
            res = index_data_solr(filenameXML, lang_solr[lang],"xml")
            if res:
                log.info("Indexation succeeded for file : " + filenameXML)
            else:
                log.error("Indexation failed for file : " + filenameXML)

        else:
            print "No corpus data to process for " + lang
            log.info("No corpus data to process for " + lang)
    #print c.rssfeeds    
    log.info("All is done. Exiting.")
# main
if __name__ == '__main__':
    FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
    logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./log/detect_neologisms_zh.py.log", filemode='w', level=logging.INFO)    
    log = logging.getLogger(__name__)
    main()
else:
    log = logging.getLogger(__name__)

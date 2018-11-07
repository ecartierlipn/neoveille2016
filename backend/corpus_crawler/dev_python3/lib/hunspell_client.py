# https://github.com/hunspell/hunspell
# dictionaries : look at https://extensions.openoffice.org/ or https://addons.mozilla.org/en-US/firefox/language-tools/
# The dictionaries are distributed as zip files typically with *.xpi or *.oxt extensions. 
# After downloading the desirable language file, rename it to a *.zip file.
# Each downloaded dictionary archive contains two text files with the *.aff and *.dic extensions and the name that (usually) 
# represents the corresponding language ISO codes, e.g. en-US.aff and en-US.dic (English US).
# Put the dictionaries in whatever directory and point to it in the global variable
# alternative to the present code can be to download the hunspell Python binding (pyhunspell), but seems less fine-tuned

import subprocess
import re
import logging
log = logging.getLogger(__name__)
import editdistance
from shlex import quote

# global variables : hunspell dictionaries
hunspell_dico={}
hunspell_dico['br']='/opt/nlp_tools/dictionaries/pt_BR/pt_BR'
hunspell_dico['fr']='/Users/emmanuelcartier/Desktop/GitHub/neoveille/neoveille-dev/resources/hunspell/hunspell-dicos/france/fr_FR'
hunspell_dico['zh']='/opt/nlp_tools/dictionaries/cz_CZ/cz_CZ'
hunspell_dico['pl']='/opt/nlp_tools/dictionaries/pl_PL/pl_PL'
hunspell_dico['ru']='/opt/nlp_tools/dictionaries/ru_RU/ru_RU'
hunspell_dico['gr']='/opt/nlp_tools/dictionaries/el_GR/el_GR'
hunspell_dico['cs']='/opt/nlp_tools/dictionaries/cs_CS/cs_CS'
hunspell_dico['en']='/Users/emmanuelcartier/Desktop/GitHub/neoveille/neoveille-dev/resources/hunspell/hunspell-dicos/anglais/en_US'
hunspell_dico['nl']='/Users/emmanuelcartier/Desktop/GitHub/neoveille/neoveille-dev/resources/hunspell/hunspell-dicos/pays-bas/nl_NL'


def hunspell_check_text(s,lang):
        ''' This function deals with a text and return the candidate neologisms. 
        Can be used as the main program to detect neologisms'''
        '''
        spell checking of text through hunspell
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
        cmd = 'echo "' + s + '" | hunspell -i UTF-8 --check-apostrophe -d ' + lang
        log.info("Input : " + s + "\n")
        try:
                p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
                result, err = p.communicate()
                p.wait()
                if result:
                        print(result.decode("utf-8"))
                        lines = re.split("\n", result.decode("utf-8"))
                        res = {}
                        for l2 in lines[1:-2]:
                                l = l2.rstrip()
                                if l[0] in ('*','+') and re.search(r"-",s):
                                        log.info("Compound word : " + l + "\n")
                                        res[l]="Hunspell : compound word"
                                        #res.append((l[2:],"Compound word"))
                                elif l[0] in ('*','+'):
                                        log.info("Simple word : " + l + "\n")
                                        #res.append((l[2:],"Existing word"))
                                elif l[0] in ('#'):
                                        log.info("Unknwon word, no suggestion : " + l + "\n")
                                        res[l[2:]]="Hunspell : no suggestion"
                                        #res.append((l[2:],"No suggestion"))
                                elif l[0] == '&':
                                        m = re.search(r"^& (.+?) ([0-9]+) [0-9]+: (.+)$", l,re.UNICODE)
                                        if (m):
                                                log.info("Number of suggestions :" + m.group(2)+ "\n")
                                                sugg = re.split(r", ", m.group(3))
                                                dist = editdistance.eval(m.group(1),sugg[0])
                                                print (str(dist),m.group(1),sugg[0])
                                                if dist<2:
                                                        log.info(m.group(1) + "Possible typo with : "+sugg[0])
                                                        res[m.group(1)]= "Hunspell : possible typo with : "+m.group(3)
                                                        #res.append((m.group(1),"Possible typo with : "+sugg[0]))
                                                else:
                                                        res[m.group(1)]= "Hunspell : (distance > 2) - possible typo with : "+m.group(3)                                                        
                                                        #res.append((m.group(1),"Neologism"))
                                        else:
                                                res[l]="Hunspell : no suggestion"                                                
                                                res.append((l,"Neologism"))                                                
                        return res# finally return results

                else:
                        log.warning(str(err) + "\n")
                        return False
        except subprocess.CalledProcessError as e: # to be done : catch the actual error
                log.warning(str(e) + "\n")
                return False


def hunspell_check_word(s,lang):
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
        cmd = "echo '" + s + "' | hunspell -i UTF-8 --check-apostrophe -d " + lang
        log.info("Input : " + s + "\n")
        try:
                p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
                result, err = p.communicate()
                p.wait()
                if result:
                        print(result.decode("utf-8"))
                        lines = re.split("\n", result.decode("utf-8"))
                        for l2 in lines[1:-2]:
                                l = l2.rstrip()
                                if l[0] in ('*','+') and re.search(r"-",s):
                                        log.info("Compound word : " + l + "\n")
                                        return (True, u'compound - '+ l)
                                if l[0] in ('*','+'):
                                        log.info("Simple word : " + l + "\n")
                                        return (False, u'existing unit - '+ l)
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
                                                        return (False, "suggestion:2-:"+sugg[0]+ ":" + str(dist))
                                                else:
                                                        #print "Distance from : " + unicode(sugg[0]) + ":" + str(dist) 
                                                        return (True, "suggestion:2+:"+sugg[0]+ ":" + str(dist))
                                        else:
                                                return(True,"suggestion:"+l2)

                else:
                        log.warning(str(err) + "\n")
                        return (False, 'err')
        except subprocess.CalledProcessError as e: # to be done : catch the actual error
                log.warning(str(e) + "\n")
                return (False,'err')





if __name__ == "__main__":
        FORMAT = "%(levelname)s:%(asctime)s:%(message)s[%(filename)s:%(lineno)s - %(funcName)s()]"
        logging.basicConfig(format=FORMAT, datefmt='%m/%d/%Y %I:%M:%S %p', filename="./hunspell.log", filemode='w', level=logging.INFO)
        log = logging.getLogger(__name__)
        
        (res,info)=hunspell_check_word("toto", hunspell_dico["fr"])
        log.info(str(res) +"," + info + "\n")
        print(res , info)

        (res,info)=hunspell_check_text("tot, c\'est-à-dire cet après-midi, est adminstraté jusqu\'aux bout djfkq fjsf à la maison", hunspell_dico["fr"])
        log.info(str(res) +"," + str(info) + "\n")
        print(res , info)

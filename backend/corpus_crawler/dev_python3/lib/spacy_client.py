import requests,logging

log = logging.getLogger(__name__)

def check_server(url):
    '''Function to check spacy server available'''
    response = requests.get(url + '/check')
    log.info(response.json())
    if response.raise_for_status(): # bad response
        log.error(response.raise_for_status())
        return False
    else:
        return True    

def check_model(url,lang):
    '''Function to check spacy server model loaded'''
    response = requests.get(url + '/model')
    log.info(response.json() + " : "+ lang)
    if response.raise_for_status(): # bad response
        log.error(response.raise_for_status())
        return False
    elif not(response.json() == lang):
        log.error("Bad model loaded [" + str(response.json()) + ']. Please relaunch server with [' + lang + '] model.')
        return False
    else:
        return True    


def get_nlp(url,text):
    response = requests.post(url + "/parse/", data={"sentence":text})
    log.info(response)
    if response.raise_for_status(): # bad response
        log.error(response.raise_for_status())
        return False
    else:
        return response.json()

    
if __name__ == "__main__":
    url = 'http://127.0.0.1:5000'
    res = check_server(url)
    if res is False:
        print("Server not available. Please check spacy_server.py is running. Exiting.")
        exit()
    res = get_nlp(url + '/parse/', "Germany's AngelaMerkelo has marcronized and said she will step down as chancellor in 2021, following recent election setbacks.")
    if res:
        print(res)
       # for token in res.token:
       #     print(token[0],token[1],token[2],token[3],token[4],token[8])
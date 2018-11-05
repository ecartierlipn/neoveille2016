# https://github.com/barrust/pyspellchecker
# https://pyspellchecker.readthedocs.io/en/latest/
# https://github.com/hermitdave/FrequencyWords
''' 
This module enables to do spell checking from a list of known words. It requires that the string stream is already tokenized.


'''

import pyspellchecker

def load_vocabulary(filename):
    '''
    Load a vocabulary file to be the reference vocabulary. Returns
    
    '''
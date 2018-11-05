This directory contains the new version of the backend program (formal neology detection) for Python 3.4+ and Apache Solr 7.5+.
It contains the main program (```corpus_crawl_and_analysis.py```), the list of Python3 dependencies (```requirements.txt```), a ```lib``` subdirectory containing all the local modules, a ```config``` subdirectory containing examples of configuration files.




# Installation

First ensure you have a working Mysql server with all datatases installed, and Apache Solr running with a working collection.

Then, install Python modules :

```
pip install -r requirements.txt
```



# Usage

You must first tune a configuration file before running the main program. Here is an example file (```lib/settings.en.ini```):

```Python

[GENERAL]
# generic parameters
lang = english
lang_iso=en
# type of analysis to be done, either : spacy, spacy+hunspell, hunspell
ling_pipeline = spacy
# types of data to retrieve from the web. Always rss at the moment
data_type=rss


[MYSQL]
# global variables for mysql connection
user=<your database user name>
password=<your database password>
host=localhost
# database where data sources are defined (default table : RSS_INFO)
db_corpus=rssdata
# database where candidate neologisms must be stored (default table : neologismes_<lang_iso>)
db_neo=datatables

[SOLR]
# global variables for Apache Solr url
# host
solr_host = http://localhost:8983/solr/
# name of collection
solr_collection=rss_english

[LANG_DETECT]
# language code for lang detection (ISO 639-1 codes : https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)
# is a list (ie : 'en, nl')
lang_detect=en


[JUSTEXT]
# stoplist for justext (boilerplate removal tool)
stoplist=English

[SPACY]
# specific for spacy depending on ling_analysis method
spacy_server=http://127.0.0.1:5000
model=en
# type of information to retrieve
token_tags=text, lemma, lemmas_pos, is_oov

[HUNSPELL]
# specific for hunspell
# dictionary path : please see resources/hunspell for examples data)
# for medical terminology , install https://e-medtools.com/openmedspel.html or https://github.com/glutanimate/hunspell-en-med-glut
dictionary=

```

Once these settings are OK, you can run the main program ```python corpus_crawl_and_analysis.py <configuration_file>```, for example for English :

```
python corpus_crawl_and_analysis.py lib/settings.en.ini
```



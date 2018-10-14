# Neoveille
 
This is the main place for Neoveille Technical documentation. 
Neoveille is a Sorbonne Paris Cité-funded  Research Project from 2015 to 2018. Its main goals are :

1. Develop programs to detect, analyse and track neologisms in big corpora, in seven languages;
2. Develop a web-based front-end to enable linguists to interact with the main modules : corpus management, neologisms detection results (both formal and semantic neologisms), neologisms manual description and finally analysing neologism lifecycle;

To obtain more information on the project, please refer to documentation on the website : [www.neoveille.org](www.neoveille.org). The present documentation will focus on technical details. A more detailed documentation (in French, at the moment) is available here [https://github.com/ecartierlipn/neoveille2016/blob/master/docs/neoveille-web-doc.pdf].

This documentation has three main sections :

1. Requirements
2. Installation
3. Quick Start

# Architecture of the project
![Néoveille Architecture](https://github.com/ecartierlipn/neoveille2016/blob/master/docs/neoveille-archi.png)


# Requirements
- (for the backend) A Python compiler version >= 2.7 (Python 3+ not tested),
- A MySql Server, 
- An Apache Solr server,
- (for the front-end) a working web server (Apache-Php-Mysql).

## Mysql Database
a working Mysql Server (5.7+) is required. The mysql database is both used by the backend and front-end programs. After installation, create the three databases (rssdata, datatables, neo3), import the mysql scripts (to populate them) contained in resources/mysql subdirectory, to create the three databases: 

1. rssdata (manage the corpus sources)
2. datatables (manage the exclusion dictionaries and neologism candidates for each language)
3. neo3 (database for neology manual linguistic description through front-end)

## Apache Solr server
The Apache Solr server is the main storage point and search engine for retrieved and analyzed corpus. Version 5.3.2 is tested. Once installed, you must create the cores for each language. You can use the example configuration files in [resources/apachesolr/](resources/apachesolr/) for French. A simple copy inside the cores root location (by default in <solr_install_dir>/server/solr) should be enough. restart Solr and check the admin page to see if everuthing is ok. See Apache Solr Installation here : [http://lucene.apache.org/solr/resources.html]. 

## POS Taggers
a POS tagger must be available for every parsed language. As a default, we use treetagger for every language except Greek and Czech. Wherever you install the parser, adapt the path in [backend/formal_neology/detect_neologisms.py](backend/formal_neology/detect_neologisms.py). Check the Treetagger website : [http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/].

Please also note that lang-tagsets are provided in the resources/lang-tagsets directory, to map specific pos tags to a unified one.

## Hunspell
Hunspell is installed by default in every Linux and Mac OS distribution. Just take care of dictionary files for every language. Hunspell dictionaries are available in the [resources/hunspell] directory that you can unzip on your installation directory. Check also the parameter location in [backend/formal_neology/detect_neologisms.py](backend/formal_neology/detect_neologisms.py).

## Python 2.7

##Python dependencies
You should install the langdetect Python module from Google code [https://pypi.python.org/pypi/langdetect].




# Installation
After installing and checking the software above, you just have to clone all the files from the Github repository (here).

See Installation instructions in 

# References
Cartier, Emmanuel (2017), Neoveille, a Web Platform for Neologism Tracking, Proceedi ngs of the EACL 2017 Software Demonstrations, Valencia, Spain, April 3-7 2017. [https://www.aclweb.org/anthology/E/E17/E17-3024.pdf]
Cartier, Emmanuel (2018), « Neoveille, plateforme de détection, de repérage et de suivi des néologismes en dix langues », 

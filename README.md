# Neoveille
This is the main place for Neoveille Technical documentation. 
Neoveille is a Sorbonne Paris Cité-funded  Research Project from 2015 to 2018. Its main goals are :
1. Develop programs to detect, analyse and track neologisms in big corpora, in seven languages;
2. Develop a web-based front-end to enable linguists to interact with the main modules : corpus management, neologisms detection results (both formal and semantic neologisms), neologisms manual description and finally analysing neologism lifecycle;

To obtain more information on the project, please refer to documentation on the website : [www.neoveille.org](www.neoveille.org). The present documentation will focus on technical details.

This documentation has three main sections :

1. Requirements
2. Installation
3. Quick Start


#Requirements
To be working, the Neoveille platform requires several other tools installed, and a Python version >= 2.7 (Python 3+ not tested). For the front-end, you should also have a working Apache-Php-Mysql environment.

##Mysql Database
a working Mysql Server (5.7+) is required. The mysql database is both used by the backend and front-end programs. After installation, import in Mysql the mysql scripts contained the install_files subdirectory, to create the four databases used : 

1. rssdata (manage the corpus sources)
2. datatables (manage the exclusion dictionaries and neologism candidates for each language)
3. neo3 (database for neology manual linguistic description through front-end)
4. neosem (data for semantic neology).

Please change directory parameters in corpus_all.py and file detect_neologisms_all.py to mirror your configuration.

##Apache Solr server
The Apache Solr server is the main storage point and search engine for retrieved and analyzed corpus. Version 5.3.2 is tested, but more recent build should also work (up to but excluding Apache Solr 6). Once installed, you must create the cores for each language, using the config files (conf.zip, for french, please name the French core as rss_french) contained in the install subdirectory. A simple copy should work where the cores are stored (by default in solr_install_dir/server/solr). Please change directory parameters in corpus_all.py and file detect_neologisms_all.py to mirror your configuration.

##POS Taggers
a POS tagger must be available for every parsed language. As a default, we use treetagger for every language except Greek and Czech. The default installation is in a subdirectory "pos-taggers" with respective tagger files in sub-sub-directories. Please consider also using for example TensorFlow / SyntaxNet which is much more robust than Treetagger. 

Please change directory parameters in file detect_neologisms_all.py to mirror your configuration.
Please also note that lang-tagsets are provided in the lang-tagsets directory, to map specific pos tags to a unified one.

##Hunspell
Hunspell is installed by default in every Linux and Mac OS distribution. Just take care of dictionary files for every language. By default, dictionary files are assumed to be in a subdirectory hunspell-dicos (with a sub-subdirectory for every language). For your convenience, this structure and dictionary are available in the install_files directory that you can unzip from the main directory of the repository. Otherwise, Please change directory parameters in file detect_neologisms_all.py to mirror your configuration.

##Python 2.7

##Python dependencies
You should install the langdetect Python module from Google code [https://pypi.python.org/pypi/langdetect].




#Installation
After installing and checking the software above, you just have to copy the two main python programs : 
1. corpus_all.py : main program to retrieve corpora from RSS feeds; NLPutils.py is one dependency of it. corpus_all.py first retrieve available RSS feeds (and the complete linked articles) in the rssdata database for a given language, then retrieve the feeds items, ans store them and their metadata in the mysql database rssdata, and also in Apache Solr;
2. detect_neologism_all.py : main program to POStag the documents, and detect formal neologisms. The detected neologisms are stored in the datatables database forhuman expert validation (with the front-end).


#Quick Start
Just launch the two programs above. Consider adding these programs in your cron scheduler to get more and more corpora and neologisms.

# Neoveille
 
This is the main place for Neoveille Technical documentation. 
Neoveille is a Sorbonne Paris Cité-funded  Research Project from 2015 to 2018. Its main goals are :

1. to develop programs to detect, analyse and track neologisms in big monitor corpora, in several languages;
2. to develop a web-based front-end to enable linguists to interact with the main modules : corpus management, neologisms detection results (both formal and semantic neologisms), neologisms manual description and finally analysing neologism lifecycle;

To obtain more information on the project, please refer to documentation and references on the website : [http://www.neoveille.org](http://www.neoveille.org). The present file will focus on technical details. A more detailed documentation (in French, at the moment) is available in [/docs/neoveille-web-doc.pdf](/docs/neoveille-web-doc.pdf "Detailled documentation").

This documentation has three main sections :

1. Architecture
2. Requirements
3. Installation
4. Quick Start

# News / Warning
A new version of the whole package will be soon available, notably easying the installation process. Check this page! The current version can be tricky to install!


# Architecture of the project
![Néoveille Architecture](/docs/neoveille-archi.png "Néoveille Architecture")

******

# Requirements
- (for the backend) A Python compiler version >= 2.7 (Python 3+ not tested),
- A MySql Server, 
- An Apache Solr server,
- (for the front-end) a working web server (Apache-Php-Mysql),
- and several javascript librairies (for the frontend).

## Mysql Database
a working Mysql Server (5.7+) is required. The mysql database is both used by the backend and front-end programs. After installation, create the three databases (rssdata, datatables, neo3), import the mysql scripts (to populate them) contained in [/resources/mysql] subdirectory, to create the three databases: 

1. **rssdata** (manage the corpus sources)
1. **datatables** (manage the exclusion dictionaries and neologism candidates for each language)
1. **neo3** (database for neology manual linguistic description through front-end)

## Apache Solr server
The Apache Solr server is the main storage point and search engine for retrieved and analyzed corpus. Version 5.3.2 is tested. Once installed, you must create the cores for each language. You can use the example configuration files in [/resources/apachesolr/](/resources/apachesolr/) for French. A simple copy inside the cores root location (by default in <solr_install_dir>/server/solr) should be enough. Restart Solr and check the admin page to see if everything is ok. See Apache Solr Installation here : [http://lucene.apache.org/solr/resources.html]. 

## POS Taggers
a POS tagger must be available for every parsed language. As a default, we use treetagger for every language except Greek and Czech. Wherever you install the parser, adapt the path in [backend/formal_neology/detect_neologisms.py](backend/formal_neology/detect_neologisms.py). Check the Treetagger website : [http://www.cis.uni-muenchen.de/~schmid/tools/TreeTagger/].

Please also note that lang-tagsets are provided in the [/resources/lang-tagsets] directory, to map specific pos tags to a unified one.

## Hunspell
Hunspell is installed by default in every Linux and Mac OS distribution. Just take care of dictionary files for every language. Up-to-date Hunspell dictionaries are available in the [/resources/hunspell] directory that you can unzip on your installation directory. Check also the parameter location in [backend/formal_neology/detect_neologisms.py](backend/formal_neology/detect_neologisms.py).

## Python 2.7

##Python dependencies
You should install the langdetect Python module from Google code [https://pypi.python.org/pypi/langdetect].

## Javascript libraries

### dc.js
dc.js is a great softawre for generating multidimensional graphs and interacting with them. Check [https://dc-js.github.io/dc.js/]. We have already included this library in the frontend.

### datatable Editor
You should acquire a license for this software. Check the website : [https://editor.datatables.net/]. You should acquire the php server-side version

******
# Installation
After installing and checking the software above, you just have to clone all the files from the Github repository (here).

```github clone https://github.com/ecartierlipn/neoveille2016.git```

Or simply download the whole package.

The frontend subdirectory must be placed inside a web-aware directory of your web server. The others parts can be saved in whatever place that suits your needs. All programs have been tested on Mac OS X and Linux.

See detailed installation instructions in (/docs/neoveille-web-doc.pdf "Detailled documentation").

******
# References

If you use this software, please be kind enough to cite the following articles :

Cartier, Emmanuel (2017), Neoveille, a Web Platform for Neologism Tracking, Proceedings of the EACL 2017, Software Demonstrations, Valencia, Spain, April 3-7 2017. [https://www.aclweb.org/anthology/E/E17/E17-3024.pdf]

Cartier, Emmanuel (2019), « Neoveille, plateforme de détection, de repérage et de suivi des néologismes en onze langues », Neologica, 13-2019, [https://tal.lipn.univ-paris13.fr/neoveille/docs/Neoveille_neologica2019.pdf]

******
# Licence
This software is distributed within an Apache License 2.0. Check the license file.



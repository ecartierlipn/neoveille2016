# Apache Solr examples of configuration files

This directory contains illustrative configurations for your corpus collections in Apache Solr. You can use them as examples. One zip file ```solr_collection_example.solr5.3.rss_french.zip``` works with Apache Solr 5.x and the other one   ```solr_collection_example.solr7.5.rss_english.zip ``` for Apache Solr 7.5+.

## Installation
You just need to unzip the files into the collection directory of your Apache Solr installation ```<solr installation directory>/server/solr```.  Copy the zip files in this directory and just type (on Linux) (Solr 5.x):


```
tar -xzvf solr_collection_example.solr5.3.rss_french.zip
```
It will create a subdirectory ``` rss_french ``` which will be available after restarting the Apache server.


For (Solr 7.5+):
```
tar -xzvf solr_collection_example.solr7.5.rss_english.zip
```
It will create a subdirectory ``` rss_english ``` which will be available after restarting the Apache server.

You can also rename the folder name. In this cas, please change the name attribute in the ```<apache solr installation path>/server/solr/<new folder name>/core.properties``` file.

To restart the Apache Solr server, if your installation is standard, just emit :

```<apache solr installation path>/bin/solr restart
```


## Schema.xml

The default configuration file is ``` <rss_english|rss_french>/conf/schema.xml ```. In this file, you define the fields for every item of information (article or more generally a text in Néoveille parlance). Here is an example (from Apache Solr 7.5 example file)
```
 <!-- solr predefined fields -->
 <field name="_root_" type="string" docValues="false" indexed="true" stored="false"/>
  <field name="_text_" type="text_general" multiValued="true" indexed="true" stored="false"/>
  <field name="_version_" type="plong" indexed="false" stored="false"/>
  <!-- metainformation -->
  <field name="authors" type="string" multiValued="true" indexed="true" stored="true"/><!-- list of authors -->
  <field name="subject" type="string" indexed="true" required="false" stored="true"/><!-- the category assigned to the RSS feed-->
  <field name="country" type="string" docValues="true" indexed="true" stored="true"/><!-- the country of the RSS feed -->
  <field name="dateS" type="pdate" indexed="true" stored="true"/><!-- the date in UT of the web page retrieved -->
  <field name="link" type="string" docValues="true" indexed="true" required="true" stored="true"/><!-- the web link of the webpage. This field is also the unique key to ensure no duplicates -->
  <field name="source" type="string" docValues="true" indexed="true" stored="true"/><!-- the name of the newspapers delivering the RSS feed -->
  <field name="source-link" type="string" docValues="true" indexed="false" stored="true"/><!-- the main page of the newspaper-->

<!-- textual content -->
  <field name="title" type="text_en" indexed="true" stored="true"/><!-- the title from the RSS feed-->
  <field name="description" type="text_en" indexed="true" stored="true"/><!-- the description from the RSS feed -->
  <field name="contents" type="text_en" indexed="true" stored="true"/><!-- the raw text from web page-->
  <field name="pos-text" type="text_ws" indexed="true" stored="true"/><!-- morphosyntactical analysis (in the form lemma/POS, each element separated by a white space -->

<!-- linguistic annotation -->
  <field name="tokens" type="shingle" indexed="true" stored="true"/><!-- list of tokens and ngrams (from tokens)-->
  <field name="lemmas" type="shingle" indexed="true" stored="true"/><!-- list of tokens and ngrams (from lemmas)-->
  <field name="lemmas_tags" type="shingle" indexed="true" stored="true"/><!-- list of lemmapos (ex.: chat/N + ngrams -->
  <field name="oov" type="text_ws" indexed="true" stored="true"/><!-- Out of vocabulary tokens (from Linguistic analysis) -->
```

Please note that you have to tune the type of the fields for title, description and contents, depending on the language you work on. Apache Solr has some examples for a bunch of languages in schema Solr. The ```text_ws``` field type is just splitting the input data by the white space.

## References
Please go to Apache Solr for additional information : https://lucene.apache.org/solr/guide/7_5/index.html.

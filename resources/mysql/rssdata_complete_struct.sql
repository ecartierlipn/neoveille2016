-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: rssdata
-- ------------------------------------------------------
-- Server version	5.7.21-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `RSS_ENCODING`
--

DROP TABLE IF EXISTS `RSS_ENCODING`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_ENCODING` (
  `ID_ENCODING` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_ENCODING` varchar(45) NOT NULL DEFAULT 'rss',
  `DATE_CREATED` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DESC_ENCODING` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_ENCODING`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_FORMAT`
--

DROP TABLE IF EXISTS `RSS_FORMAT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_FORMAT` (
  `ID_FORMAT` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_FORMAT` varchar(250) NOT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DESC_FORMAT` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_FORMAT`),
  UNIQUE KEY `UNIQUE_NAME_FORMAT` (`NAME_FORMAT`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_FREQUENCE`
--

DROP TABLE IF EXISTS `RSS_FREQUENCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_FREQUENCE` (
  `ID_FREQUENCE` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_FREQUENCE` varchar(50) NOT NULL,
  `DESC_FREQUENCE` varchar(50) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_FREQUENCE`),
  UNIQUE KEY `UNIQUE_NAME_FREQUENCE` (`NAME_FREQUENCE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_INFO`
--

DROP TABLE IF EXISTS `RSS_INFO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_INFO` (
  `ID_RSS` int(11) NOT NULL AUTO_INCREMENT,
  `NAME_RSS` varchar(100) NOT NULL COMMENT 'url du fil rss',
  `ID_PAYS` int(10) NOT NULL,
  `ID_LANGUE` int(10) NOT NULL,
  `ID_JOURNAL` int(10) NOT NULL,
  `ID_TYPE` int(10) NOT NULL,
  `ID_REGISTER` int(10) DEFAULT '1',
  `ID_FREQUENCE` int(10) NOT NULL DEFAULT '0',
  `ID_LOCALITE` int(10) NOT NULL,
  `ID_FORMAT` int(10) NOT NULL DEFAULT '1',
  `ID_ENCODING` int(10) NOT NULL DEFAULT '1',
  `etag` varchar(100) DEFAULT NULL COMMENT 'etag parameter enables to check if new feeds are available since last retrieval. See https://universal-feedparser.readthedocs.org/en/latest/#using-etags-to-reduce-bandwidth for additional information',
  `last_modified_by` varchar(100) DEFAULT NULL COMMENT 'idem as tag but more explicitly giving the last update as a kind of date',
  `created_by` varchar(100) DEFAULT NULL,
  `date_created_by` datetime DEFAULT NULL,
  `date_modified_by` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_RSS`),
  UNIQUE KEY `UNIQUE_NAME_RSS` (`NAME_RSS`),
  KEY `FK_PAYS` (`ID_PAYS`),
  KEY `FK_LANGUE` (`ID_LANGUE`),
  KEY `FK_JOURNAL` (`ID_JOURNAL`),
  KEY `FK_TYPE` (`ID_TYPE`),
  KEY `FK_LOCALITE` (`ID_LOCALITE`),
  KEY `FK_FREQUENCE` (`ID_FREQUENCE`),
  CONSTRAINT `FK_JOURNAL` FOREIGN KEY (`ID_JOURNAL`) REFERENCES `RSS_JOURNAL` (`ID_JOURNAL`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_LANGUE` FOREIGN KEY (`ID_LANGUE`) REFERENCES `RSS_LANGUE` (`ID_LANGUE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_LOCALITE` FOREIGN KEY (`ID_LOCALITE`) REFERENCES `RSS_LOCALITE` (`ID_LOCALITE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PAYS` FOREIGN KEY (`ID_PAYS`) REFERENCES `RSS_PAYS` (`ID_PAYS`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_TYPE` FOREIGN KEY (`ID_TYPE`) REFERENCES `RSS_TYPE` (`ID_TYPE`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=587 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_JOURNAL`
--

DROP TABLE IF EXISTS `RSS_JOURNAL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_JOURNAL` (
  `ID_JOURNAL` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_JOURNAL` varchar(50) NOT NULL,
  `DESC_JOURNAL` varchar(50) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_JOURNAL`),
  UNIQUE KEY `UNIQUE_NAME_JOURNAL` (`NAME_JOURNAL`)
) ENGINE=InnoDB AUTO_INCREMENT=478 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_LANGUE`
--

DROP TABLE IF EXISTS `RSS_LANGUE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_LANGUE` (
  `ID_LANGUE` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_LANGUE` varchar(50) NOT NULL,
  `CODE_LANGUE` varchar(20) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_LANGUE`),
  UNIQUE KEY `UNIQUE_NAME_LANGUE` (`NAME_LANGUE`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_LOCALITE`
--

DROP TABLE IF EXISTS `RSS_LOCALITE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_LOCALITE` (
  `ID_LOCALITE` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_LOCALITE` varchar(50) NOT NULL,
  `DESC_LOCALITE` varchar(50) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_LOCALITE`),
  UNIQUE KEY `UNIQUE_NAME_LOCALITE` (`NAME_LOCALITE`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_PAYS`
--

DROP TABLE IF EXISTS `RSS_PAYS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_PAYS` (
  `ID_PAYS` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_PAYS` varchar(50) NOT NULL,
  `CODE_PAYS` varchar(10) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_PAYS`),
  UNIQUE KEY `UNIQUE_NAME_PAYS` (`NAME_PAYS`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_REGISTER`
--

DROP TABLE IF EXISTS `RSS_REGISTER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_REGISTER` (
  `ID_REGISTER` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_REGISTER` varchar(50) NOT NULL,
  `DESC_REGISTER` varchar(50) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_REGISTER`),
  UNIQUE KEY `UNIQUE_NAME_REGISTER` (`NAME_REGISTER`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RSS_TYPE`
--

DROP TABLE IF EXISTS `RSS_TYPE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RSS_TYPE` (
  `ID_TYPE` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_TYPE` varchar(50) NOT NULL,
  `DESC_TYPE` varchar(50) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_TYPE`),
  UNIQUE KEY `UNIQUE_NAME_TYPE` (`NAME_TYPE`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `pos_types`
--

DROP TABLE IF EXISTS `pos_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pos_types` (
  `ID_TYPE` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` varchar(100) NOT NULL,
  `TYPE_DESCRIPTION` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_TYPE`),
  UNIQUE KEY `TYPE_NAME_UNIQUE` (`TYPE_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rss_data2`
--

DROP TABLE IF EXISTS `rss_data2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rss_data2` (
  `source_link` varchar(255) NOT NULL,
  `country` varchar(100) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `ID_RSS` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `contents` longtext,
  `category` varchar(100) DEFAULT NULL,
  `keywords` varchar(100) DEFAULT NULL,
  `DATE_CREATED` datetime DEFAULT CURRENT_TIMESTAMP,
  `IS_INDEXED` int(11) DEFAULT '0',
  PRIMARY KEY (`source_link`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_neoveille`
--

DROP TABLE IF EXISTS `termes_neoveille`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_neoveille` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `langue` varchar(2) NOT NULL,
  `terme` varchar(100) NOT NULL,
  `cat_synt` int(2) NOT NULL,
  `cat_sem` int(2) NOT NULL,
  `hyperclass` int(11) NOT NULL,
  `definition` text NOT NULL,
  `note` text NOT NULL,
  `auteur` varchar(100) NOT NULL,
  `statut` int(2) NOT NULL,
  `matrice_neo` varchar(50) NOT NULL,
  `config_morpho` varchar(100) NOT NULL,
  `config_phonol` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `last_update` datetime NOT NULL,
  `last_update_author` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `langue` (`langue`),
  KEY `cat_synt` (`cat_synt`),
  KEY `cat_sem` (`cat_sem`),
  KEY `hyperclass` (`hyperclass`),
  KEY `statut` (`statut`),
  KEY `matrice_neo` (`matrice_neo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(45) NOT NULL,
  `joining_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `language` int(11) NOT NULL,
  `user_rights` int(1) NOT NULL DEFAULT '1',
  `rights_corpus` int(1) NOT NULL DEFAULT '1',
  `rights_corpus_params` int(1) NOT NULL DEFAULT '0',
  `rights_dict` int(1) NOT NULL DEFAULT '1',
  `rights_neoform` int(1) NOT NULL DEFAULT '1',
  `rights_neoform_params` int(1) NOT NULL DEFAULT '0',
  `rights_neosem` int(1) NOT NULL DEFAULT '1',
  `rights_neosem_params` int(1) NOT NULL DEFAULT '0',
  `rights_neodb` int(1) NOT NULL DEFAULT '1',
  `rights_neodb_params` int(1) NOT NULL DEFAULT '0',
  `rights_users` int(1) NOT NULL DEFAULT '0',
  `last_visit` datetime DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

-- insert first admin / user for web interface
INSERT INTO `users`
(`username`,
`password`,
`email`,
`firstname`,
`lastname`,
`language`,
`user_rights`,
)
VALUES
(
'admin',
'admin',
'admin@neoveille.org',
'admin',
'admin',
5,
2,
);

--
-- Table structure for table `users_right_def`
--

DROP TABLE IF EXISTS `users_right_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_right_def` (
  `uid` int(3) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_roles_def`
--

DROP TABLE IF EXISTS `users_roles_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_roles_def` (
  `uid` int(3) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'rssdata'
--
/*!50003 DROP PROCEDURE IF EXISTS `ADD_RSS_DATA2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_RSS_DATA2`(				  
IN  V_link         VARCHAR(255)   ,
IN  V_country         VARCHAR(250)      ,
IN  V_subj       VARCHAR(250)   ,
IN  V_source_link      VARCHAR(250)   ,
IN  V_title     VARCHAR(250)   ,
IN  V_description     TEXT   ,
IN V_contents             TEXT            ,
IN  V_category     VARCHAR(250)   ,
IN  V_keywords     VARCHAR(250),
OUT V_ID_LINK      INT(5)      
)
BEGIN

INSERT IGNORE INTO rss_data2 (
				source_link,
				country,
				subject,
                ID_RSS,
		        title,
		        description,
		        contents,
		        category,
		        keywords
              )
              VALUES(
V_link,
V_country,
V_subj,
V_source_link,
V_title,
V_description,
V_contents,
V_category,
V_keywords
              );

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

END ;;

DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_RSS_DATA`(				  
IN  V_link         VARCHAR(255)   ,
IN  V_country         VARCHAR(250)      ,
OUT V_ID_LINK      INT(5)      
)
BEGIN

INSERT IGNORE INTO rss_data2 (
				source_link,
				country
              )
              VALUES(
V_link,
V_country
              );

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

END ;;


DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_RSS_FEED` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_RSS_FEED`(				  
IN  V_NAME_RSS         VARCHAR(250)      ,
IN  V_NAME_PAYS         VARCHAR(250)   ,
IN  V_NAME_LANGUE       VARCHAR(250)   ,
IN  V_NAME_JOURNAL      VARCHAR(250)   ,
IN  V_NAME_TYPE     VARCHAR(250)   ,
IN  V_NAME_LOCALITE     VARCHAR(250)   ,
OUT V_COUNT             INT            ,
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_ID_JOURNAL INT DEFAULT 1;
DECLARE V_ID_TYPE INT DEFAULT 1;
DECLARE V_ID_LANGUE INT DEFAULT 1;
DECLARE V_ID_PAYS INT DEFAULT 1;
DECLARE V_ID_LOCALITE INT DEFAULT 1;

DECLARE V_COUNT_TMP INT DEFAULT 0;

SELECT COUNT(NAME_RSS) INTO V_COUNT_TMP FROM RSS_INFO
					     WHERE lower(NAME_RSS)=lower(V_NAME_RSS);

IF V_COUNT_TMP =0 THEN

CALL GET_ID_JOURNAL(V_NAME_JOURNAL,V_ID_JOURNAL);
CALL GET_ID_PAYS(V_NAME_PAYS,V_ID_PAYS);
CALL GET_ID_LANGUE(V_NAME_LANGUE,V_ID_LANGUE);
CALL GET_ID_TYPE(V_NAME_TYPE,V_ID_TYPE);
CALL GET_ID_LOCALITE(V_NAME_LOCALITE,V_ID_LOCALITE);

INSERT INTO RSS_INFO (
				NAME_RSS          ,
				ID_PAYS        ,
				ID_LANGUE       ,
				ID_JOURNAL         ,
				ID_TYPE           ,
				ID_LOCALITE,
				ID_FREQUENCE)
			VALUES
				(	V_NAME_RSS          ,
					V_ID_PAYS        ,
					V_ID_LANGUE       ,
					V_ID_JOURNAL         ,
					V_ID_TYPE           ,
					V_ID_LOCALITE,
              2);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;


ELSE
SELECT 1 INTO V_COUNT;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_RSS_LINK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_RSS_LINK`(				  
IN  V_TITLE_LINK        VARCHAR(250)   ,
IN  V_SUBJECT_LINK      VARCHAR(250)   ,
IN  V_CATEGORY_LINK     VARCHAR(250)   ,
IN  V_SOURCE_LINK       VARCHAR(250)   ,
IN  V_NAME_LINK         TEXT(700)      ,
IN  V_DESC_LINK         TEXT(5000)     ,
IN  V_LANGUE_LINK       VARCHAR(250)   ,
IN  V_COPYRIGHT_LINK    TEXT(700)      ,
IN  V_PUBDATE_LINK      DATETIME       ,
IN  V_PUBDATE_LINKSTR   VARCHAR(250)   ,
IN  V_LASTDATE_LINK     DATETIME       , 
IN  V_GUID_LINK         TEXT(700)      ,
IN  V_COMMENTS_LINK     TEXT(700)      ,
IN  V_ID_RSS            INT            ,
IN  V_AUTHOR_NAME       VARCHAR(250)   ,
IN  V_FORMAT_NAME       VARCHAR(250)   ,
IN  V_NAME_PAYS         VARCHAR(250)   ,
IN  V_NAME_JOURNAL      VARCHAR(250)   ,
OUT V_COUNT             INT            ,
OUT V_FILE_LINK         VARCHAR(250)   ,
OUT V_ID_LINK           VARCHAR(250)
)
BEGIN

DECLARE V_ID_AUTHOR INT DEFAULT 1;
DECLARE V_ID_FORMAT INT DEFAULT 1;

DECLARE V_COUNT_TMP INT DEFAULT 0;

SELECT COUNT(NAME_LINK) INTO V_COUNT_TMP FROM RSS_DATA
					     WHERE lower(NAME_LINK)=lower(V_NAME_LINK);

IF V_COUNT_TMP =0 THEN

CALL GET_ID_AUTHOR(V_AUTHOR_NAME,V_ID_AUTHOR);
CALL GET_ID_FORMAT(V_FORMAT_NAME,V_ID_FORMAT);

INSERT INTO RSS_DATA (TITLE_LINK          ,
		      SUBJECT_LINK        ,
                      CATEGORY_LINK       ,
                      SOURCE_LINK         ,
                      NAME_LINK           ,
		      FILE_LINK           ,
                      DESC_LINK           ,
                      LANGUE_LINK         ,
		      COPYRIGHT_LINK      ,
                      PUBDATE_LINK        ,
                      PUBDATE_LINKSTR     ,
                      LASTDATE_LINK       , 
                      GUID_LINK           ,
                      COMMENTS_LINK       ,
                      ID_RSS              ,
                      ID_AUTHOR           ,
                      ID_FORMAT)
                      VALUES
		      (V_TITLE_LINK       ,
		      V_SUBJECT_LINK      ,
                      V_CATEGORY_LINK     ,
                      V_SOURCE_LINK       ,
                      V_NAME_LINK         ,
		      NULL                ,
                      V_DESC_LINK         ,
                      V_LANGUE_LINK       ,
		      V_COPYRIGHT_LINK    ,
                      V_PUBDATE_LINK      ,
                      V_PUBDATE_LINKSTR   ,
                      V_LASTDATE_LINK     , 
                      V_GUID_LINK         ,
                      V_COMMENTS_LINK     ,
                      V_ID_RSS            ,
                      V_ID_AUTHOR         ,
                      V_ID_FORMAT);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

SELECT CONCAT('/',V_NAME_PAYS,'/',V_NAME_JOURNAL,'/',V_NAME_PAYS,'-',V_NAME_JOURNAL,'-',V_ID_LINK,'.txt') INTO V_FILE_LINK;
UPDATE RSS_DATA SET FILE_LINK = V_FILE_LINK WHERE ID_LINK=V_ID_LINK;

ELSE
SELECT 1 INTO V_COUNT;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_CORPUS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CORPUS`(				  
IN  V_LANG     VARCHAR(250),
IN  V_TYPE     VARCHAR(250)
)
BEGIN

SELECT ID_RSS,NAME_RSS,NAME_PAYS,NAME_JOURNAL, NAME_TYPE, NAME_LOCALITE,NAME_FORMAT,NAME_ENCODING, CODE_LANGUE, etag, last_modified_by FROM RSS_INFO,RSS_PAYS,RSS_JOURNAL, RSS_TYPE, RSS_LOCALITE,RSS_ENCODING,RSS_FORMAT,RSS_LANGUE
                                                  WHERE RSS_INFO.ID_PAYS=RSS_PAYS.ID_PAYS AND
                                                        RSS_INFO.ID_TYPE=RSS_TYPE.ID_TYPE AND
                                                        RSS_INFO.ID_JOURNAL=RSS_JOURNAL.ID_JOURNAL AND
                                                        RSS_INFO.ID_LOCALITE=RSS_LOCALITE.ID_LOCALITE AND
                                                        RSS_INFO.ID_FORMAT=RSS_FORMAT.ID_FORMAT AND
                                                        RSS_INFO.ID_ENCODING=RSS_ENCODING.ID_ENCODING
                                                        AND
                                                        RSS_INFO.ID_LANGUE=RSS_LANGUE.ID_LANGUE
                                                        AND
							LOWER(RSS_LANGUE.CODE_LANGUE)=LOWER(V_LANG) AND
                            LOWER(RSS_FORMAT.NAME_FORMAT)=LOWER(V_TYPE) AND
							RSS_PAYS.NAME_PAYS IS NOT NULL;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_CORPUS_DATA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CORPUS_DATA`(				  
IN  V_LANG     VARCHAR(250)
)
BEGIN

SELECT source_link, title, subject, category, description, contents, ID_RSS FROM RSS_DATA2
    WHERE LOWER(country)=LOWER(V_LANG) and IS_INDEXED=0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_CORPUS_DATA_ALL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CORPUS_DATA_ALL`()
BEGIN
SELECT source_link FROM RSS_DATA2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_CORPUS_DATA_TMP` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CORPUS_DATA_TMP`(				  
IN  V_LANG     VARCHAR(250)
)
BEGIN

SELECT source_link, title, subject, category, description, contents, ID_RSS FROM RSS_DATA2
    WHERE LOWER(country)=LOWER(V_LANG) and IS_INDEXED!=0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_CORPUS_DATA_TMP2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_CORPUS_DATA_TMP2`(				  
IN  V_LANG     VARCHAR(250)
)
BEGIN

SELECT source_link, title, subject, category, description, contents, ID_RSS FROM rss_data2
WHERE LOWER(country)=LOWER(V_LANG) and IS_INDEXED=0 LIMIT 5000;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_COUNT_PAYS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_COUNT_PAYS`(				  
IN  V_CRITERE     VARCHAR(50)   ,
OUT V_COUNT       INT
)
BEGIN

SELECT COUNT(*) INTO V_COUNT FROM RSS_PAYS
                                 WHERE lower(NAME_PAYS) = lower(V_CRITERE);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_DATE_CREATED_FROM_URL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_DATE_CREATED_FROM_URL`(				  
IN  V_URL     VARCHAR(255)   ,
OUT V_DATE       datetime
)
BEGIN

SELECT rss_data2.DATE_CREATED INTO V_DATE FROM rss_data2
                                 WHERE source_link  = V_URL;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_AUTHOR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_AUTHOR`(				  
IN  V_CRITERE     VARCHAR(50)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_AUTHOR
                                 WHERE lower(NAME_AUTHOR) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_AUTHOR(NAME_AUTHOR) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_AUTHOR INTO V_ID_TABLE FROM RSS_AUTHOR
                                     WHERE lower(NAME_AUTHOR) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_FORMAT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_FORMAT`(				  
IN  V_CRITERE     VARCHAR(50)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_FORMAT
                                 WHERE lower(NAME_FORMAT) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_FORMAT(NAME_FORMAT) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_FORMAT INTO V_ID_TABLE FROM RSS_FORMAT
                                     WHERE lower(NAME_FORMAT) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_JOURNAL` */;
ALTER DATABASE `rssdata` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_JOURNAL`(				  
IN  V_CRITERE     VARCHAR(250)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_JOURNAL
                                 WHERE lower(NAME_JOURNAL) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_JOURNAL(NAME_JOURNAL) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_JOURNAL INTO V_ID_TABLE FROM RSS_JOURNAL
                                     WHERE lower(NAME_JOURNAL) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `rssdata` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_LANGUE` */;
ALTER DATABASE `rssdata` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_LANGUE`(				  
IN  V_CRITERE     VARCHAR(250)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_LANGUE
                                 WHERE lower(NAME_LANGUE) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_LANGUE(NAME_LANGUE) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_LANGUE INTO V_ID_TABLE FROM RSS_LANGUE
                                     WHERE lower(NAME_LANGUE) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `rssdata` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_LOCALITE` */;
ALTER DATABASE `rssdata` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_LOCALITE`(				  
IN  V_CRITERE     VARCHAR(50)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_LOCALITE
                                 WHERE lower(NAME_LOCALITE) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_LOCALITE(NAME_LOCALITE) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_LOCALITE INTO V_ID_TABLE FROM RSS_LOCALITE
                                     WHERE lower(NAME_LOCALITE) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `rssdata` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_PAYS` */;
ALTER DATABASE `rssdata` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_PAYS`(				  
IN  V_CRITERE     VARCHAR(250)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_PAYS
                                 WHERE lower(NAME_PAYS) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_PAYS(NAME_PAYS) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_PAYS INTO V_ID_TABLE FROM RSS_PAYS
                                     WHERE lower(NAME_PAYS) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `rssdata` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_RSSNAME` */;
ALTER DATABASE `rssdata` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_RSSNAME`(				  
IN  V_CRITERE     VARCHAR(50)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_INFO
                                 WHERE lower(NAME_RSS) = lower(V_CRITERE);

IF V_COUNT=0 THEN
SELECT 1 INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_RSS INTO V_ID_TABLE FROM RSS_INFO
                                     WHERE lower(NAME_RSS) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `rssdata` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_ID_TYPE` */;
ALTER DATABASE `rssdata` CHARACTER SET latin1 COLLATE latin1_swedish_ci ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_ID_TYPE`(				  
IN  V_CRITERE     VARCHAR(250)   ,
OUT V_ID_TABLE    INT
)
BEGIN
DECLARE V_COUNT INT DEFAULT 0;

SELECT COUNT(*) INTO V_COUNT FROM RSS_TYPE
                                 WHERE lower(NAME_TYPE) = lower(V_CRITERE);

IF V_COUNT=0 THEN
INSERT INTO RSS_TYPE(NAME_TYPE) VALUES (V_CRITERE);
SELECT LAST_INSERT_ID() INTO V_ID_TABLE;
ELSE
IF V_COUNT=1 THEN
SELECT ID_TYPE INTO V_ID_TABLE FROM RSS_TYPE
                                     WHERE lower(NAME_TYPE) = lower(V_CRITERE);
ELSE
SELECT 1 INTO V_ID_TABLE;
END IF;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
ALTER DATABASE `rssdata` CHARACTER SET utf8 COLLATE utf8_general_ci ;
/*!50003 DROP PROCEDURE IF EXISTS `get_last_indexed` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_last_indexed`(
V_CRITERE VARCHAR(100)
)
BEGIN
SELECT source_link FROM rssdata.rss_data2 WHERE DATE_CREATED >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                                            and lower(country) = lower(V_CRITERE);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_PATTERNS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_PATTERNS`(				  
IN  KEYWORD     VARCHAR(250)
)
BEGIN

SELECT pattern, wikipediafr_20080618_patterns.count, size, ref FROM rssdata.wikipediafr_20080618_patterns
    WHERE pattern LIKE '%KEYWORD%';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_RSS_INFO` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_RSS_INFO`(				  
IN  V_LANG     VARCHAR(250),
IN V_TYPE      VARCHAR(250)
)
BEGIN

SELECT ID_RSS,NAME_RSS,NAME_PAYS,NAME_JOURNAL, NAME_TYPE, NAME_LOCALITE,NAME_FORMAT,NAME_ENCODING, CODE_LANGUE, etag, last_modified_by FROM RSS_INFO,RSS_PAYS,RSS_JOURNAL, RSS_TYPE, RSS_LOCALITE,RSS_ENCODING,RSS_FORMAT,RSS_LANGUE
                                                  WHERE RSS_INFO.ID_PAYS=RSS_PAYS.ID_PAYS AND
                                                        RSS_INFO.ID_TYPE=RSS_TYPE.ID_TYPE AND
                                                        RSS_INFO.ID_JOURNAL=RSS_JOURNAL.ID_JOURNAL AND
                                                        RSS_INFO.ID_LOCALITE=RSS_LOCALITE.ID_LOCALITE AND
                                                        RSS_INFO.ID_FORMAT=RSS_FORMAT.ID_FORMAT AND
                                                        RSS_INFO.ID_ENCODING=RSS_ENCODING.ID_ENCODING
                                                        AND
                                                        RSS_INFO.ID_LANGUE=RSS_LANGUE.ID_LANGUE
                                                        AND
							LOWER(RSS_LANGUE.CODE_LANGUE) = LOWER(V_LANG) AND
                            LOWER(RSS_FORMAT.NAME_FORMAT)=LOWER(V_TYPE);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GET_SENTENCES` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GET_SENTENCES`(				  
IN  ID_SENTENCE_A     VARCHAR(250)
)
BEGIN

SELECT sentence FROM rssdata.wikipediafr_20080618
    WHERE FIND_IN_SET('id',ID_SENTENCE_A);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_RSS_DATA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_RSS_DATA`(				  
IN  V_ID_LINK     bigint(8)
)
BEGIN

UPDATE RSS_DATA SET IS_RECUPERED = 0 WHERE ID_LINK=V_ID_LINK;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `UPDATE_RSS_DATA2_INDEX_COMPLETED` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `UPDATE_RSS_DATA2_INDEX_COMPLETED`(				 
IN  V_source_link     varchar(255),
IN  V_INDEX_TYPE int(2)
)
BEGIN

UPDATE rss_data2 SET IS_INDEXED = V_INDEX_TYPE WHERE source_link=V_source_link;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-14 13:24:08

-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: datatables
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
-- Table structure for table `dico_compose_br`
--

DROP TABLE IF EXISTS `dico_compose_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=701 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_ch`
--

DROP TABLE IF EXISTS `dico_compose_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_cz`
--

DROP TABLE IF EXISTS `dico_compose_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_de`
--

DROP TABLE IF EXISTS `dico_compose_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_fr`
--

DROP TABLE IF EXISTS `dico_compose_fr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_fr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=999 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_gr`
--

DROP TABLE IF EXISTS `dico_compose_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_it`
--

DROP TABLE IF EXISTS `dico_compose_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_nl`
--

DROP TABLE IF EXISTS `dico_compose_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_pl`
--

DROP TABLE IF EXISTS `dico_compose_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_compose_ru`
--

DROP TABLE IF EXISTS `dico_compose_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_compose_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=239 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_fr_compose`
--

DROP TABLE IF EXISTS `dico_fr_compose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_fr_compose` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=2608 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_fr_prefixes`
--

DROP TABLE IF EXISTS `dico_fr_prefixes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_fr_prefixes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=641 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_fr_simple`
--

DROP TABLE IF EXISTS `dico_fr_simple`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_fr_simple` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=1373730 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_fr_suffixes`
--

DROP TABLE IF EXISTS `dico_fr_suffixes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_fr_suffixes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=450 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_fr_termino`
--

DROP TABLE IF EXISTS `dico_fr_termino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_fr_termino` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1244 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_br`
--

DROP TABLE IF EXISTS `dico_prefixes_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_ch`
--

DROP TABLE IF EXISTS `dico_prefixes_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_cz`
--

DROP TABLE IF EXISTS `dico_prefixes_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_de`
--

DROP TABLE IF EXISTS `dico_prefixes_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_gr`
--

DROP TABLE IF EXISTS `dico_prefixes_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_it`
--

DROP TABLE IF EXISTS `dico_prefixes_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_nl`
--

DROP TABLE IF EXISTS `dico_prefixes_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_pl`
--

DROP TABLE IF EXISTS `dico_prefixes_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_prefixes_ru`
--

DROP TABLE IF EXISTS `dico_prefixes_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_prefixes_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_br`
--

DROP TABLE IF EXISTS `dico_simple_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=1372414 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_ch`
--

DROP TABLE IF EXISTS `dico_simple_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_cz`
--

DROP TABLE IF EXISTS `dico_simple_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_de`
--

DROP TABLE IF EXISTS `dico_simple_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_fr`
--

DROP TABLE IF EXISTS `dico_simple_fr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_fr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=1372711 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_gr`
--

DROP TABLE IF EXISTS `dico_simple_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_it`
--

DROP TABLE IF EXISTS `dico_simple_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=3484 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_nl`
--

DROP TABLE IF EXISTS `dico_simple_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_pl`
--

DROP TABLE IF EXISTS `dico_simple_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=1390063 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_simple_ru`
--

DROP TABLE IF EXISTS `dico_simple_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_simple_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=1373975 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_br`
--

DROP TABLE IF EXISTS `dico_suffixes_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_ch`
--

DROP TABLE IF EXISTS `dico_suffixes_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_cz`
--

DROP TABLE IF EXISTS `dico_suffixes_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_de`
--

DROP TABLE IF EXISTS `dico_suffixes_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_gr`
--

DROP TABLE IF EXISTS `dico_suffixes_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_it`
--

DROP TABLE IF EXISTS `dico_suffixes_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_nl`
--

DROP TABLE IF EXISTS `dico_suffixes_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `type` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_pl`
--

DROP TABLE IF EXISTS `dico_suffixes_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_suffixes_ru`
--

DROP TABLE IF EXISTS `dico_suffixes_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_suffixes_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_br`
--

DROP TABLE IF EXISTS `dico_termino_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_ch`
--

DROP TABLE IF EXISTS `dico_termino_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_cz`
--

DROP TABLE IF EXISTS `dico_termino_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=405 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_de`
--

DROP TABLE IF EXISTS `dico_termino_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_fr`
--

DROP TABLE IF EXISTS `dico_termino_fr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_fr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=565 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_gr`
--

DROP TABLE IF EXISTS `dico_termino_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_it`
--

DROP TABLE IF EXISTS `dico_termino_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_nl`
--

DROP TABLE IF EXISTS `dico_termino_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_pl`
--

DROP TABLE IF EXISTS `dico_termino_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dico_termino_ru`
--

DROP TABLE IF EXISTS `dico_termino_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dico_termino_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_br`
--

DROP TABLE IF EXISTS `excluded_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=36881 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_ch`
--

DROP TABLE IF EXISTS `excluded_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_cz`
--

DROP TABLE IF EXISTS `excluded_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=37370 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_de`
--

DROP TABLE IF EXISTS `excluded_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_fr`
--

DROP TABLE IF EXISTS `excluded_fr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_fr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=45560 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_gr`
--

DROP TABLE IF EXISTS `excluded_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=919 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_it`
--

DROP TABLE IF EXISTS `excluded_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=5028 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_nl`
--

DROP TABLE IF EXISTS `excluded_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_pl`
--

DROP TABLE IF EXISTS `excluded_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=36879 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `excluded_ru`
--

DROP TABLE IF EXISTS `excluded_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `excluded_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB AUTO_INCREMENT=39720 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neo_tools_debug`
--

DROP TABLE IF EXISTS `neo_tools_debug`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neo_tools_debug` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `module` int(11) NOT NULL,
  `type` varchar(45) NOT NULL,
  `message` varchar(255) NOT NULL,
  `state` varchar(45) NOT NULL DEFAULT '0',
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neo_tools_debug_answers`
--

DROP TABLE IF EXISTS `neo_tools_debug_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neo_tools_debug_answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_neo-tools-debug` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neo_tools_debug_module_def`
--

DROP TABLE IF EXISTS `neo_tools_debug_module_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neo_tools_debug_module_def` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neo_tools_debug_state_def`
--

DROP TABLE IF EXISTS `neo_tools_debug_state_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neo_tools_debug_state_def` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neo_tools_debug_type_def`
--

DROP TABLE IF EXISTS `neo_tools_debug_type_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neo_tools_debug_type_def` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes`
--

DROP TABLE IF EXISTS `neologismes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107554 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_br`
--

DROP TABLE IF EXISTS `neologismes_br`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_br` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29409 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_ch`
--

DROP TABLE IF EXISTS `neologismes_ch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_ch` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96539 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_cz`
--

DROP TABLE IF EXISTS `neologismes_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_cz` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33974 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_de`
--

DROP TABLE IF EXISTS `neologismes_de`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_de` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `commentaire` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `last_modified_by` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_fr`
--

DROP TABLE IF EXISTS `neologismes_fr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_fr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26100 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_gr`
--

DROP TABLE IF EXISTS `neologismes_gr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_gr` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1856 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_it`
--

DROP TABLE IF EXISTS `neologismes_it`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_it` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16434 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_nl`
--

DROP TABLE IF EXISTS `neologismes_nl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_nl` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `commentaire` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `last_modified_by` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_pl`
--

DROP TABLE IF EXISTS `neologismes_pl`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_pl` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145396 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_ru`
--

DROP TABLE IF EXISTS `neologismes_ru`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_ru` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `commentaire` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `frequence` int(11) DEFAULT '0',
  `info_auto` varchar(255) DEFAULT NULL,
  `created_by` varchar(45) DEFAULT NULL,
  `last_modified_by` varchar(45) DEFAULT NULL,
  `is_saved_in_db` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27623 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_types`
--

DROP TABLE IF EXISTS `neologismes_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_types` (
  `ID_TYPE` int(11) NOT NULL AUTO_INCREMENT,
  `TYPE_NAME` varchar(100) NOT NULL,
  `TYPE_DESCRIPTION` varchar(255) DEFAULT NULL,
  `TYPE_DIMENSION` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_TYPE`),
  UNIQUE KEY `TYPE_NAME_UNIQUE` (`TYPE_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neosem_params`
--

DROP TABLE IF EXISTS `neosem_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neosem_params` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pos` varchar(10) NOT NULL,
  `schema` varchar(45) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `langue` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tobedone`
--

DROP TABLE IF EXISTS `tobedone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tobedone` (
  `id_request` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` varchar(100) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `author` varchar(45) NOT NULL,
  PRIMARY KEY (`id_request`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tobedone_answers`
--

DROP TABLE IF EXISTS `tobedone_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tobedone_answers` (
  `id_answer` int(11) NOT NULL AUTO_INCREMENT,
  `id_request` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_answer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'datatables'
--
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_BR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_BR`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_br
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_br (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_br SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_CH` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_CH`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_ch
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_ch (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_ch SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_CZ` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_CZ`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_cz
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_cz (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_cz SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_FR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_FR`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes (lexie,frequence, info_auto) VALUES (V_NEO, 1,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_GLOBAL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_GLOBAL`(				  
IN  V_LANG         VARCHAR(250),
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;
DECLARE V_TABLE_NAME VARCHAR(50);
IF V_LANG='fr' THEN 
SET V_TABLE_NAME = 'datatables.neologismes';
else
SET V_TABLE_NAME = CONCAT('datatables.neologismes_', V_LANG);
end if;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM V_TABLE_NAME
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO V_TABLE_NAME (lexie,frequence, info_auto) VALUES (V_NEO, 1,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE V_TABLE_NAME SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_GR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_GR`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_gr
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_gr (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_gr SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_IT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_IT`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_it
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_it (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_it SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_PL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_PL`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_pl
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_pl (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_pl SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ADD_NEOLOGISM_RU` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_RU`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_ru
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP =0 THEN

INSERT INTO datatables.neologismes_ru (lexie,frequence, info_auto) VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_ru SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `copy_neologismes_to_neologismes_fr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `copy_neologismes_to_neologismes_fr`()
BEGIN
INSERT IGNORE INTO datatables.neologismes_fr SELECT * FROM datatables.neologismes;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_dico_fr_compose` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_dico_fr_compose`()
BEGIN
CREATE TABLE datatables.dico_fr_compose (id int(10) auto_increment primary key, lexie varchar(250))
select lexie from datatables.neologismes where type LIKE '%compose%';
delete from datatables.neologismes where type LIKE '%compose%';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_dico_fr_excluded` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_dico_fr_excluded`()
BEGIN
CREATE TABLE datatables.excluded_fr (id int(10) auto_increment primary key, lexie varchar(250))
select lexie from datatables.neologismes where type LIKE '%erreur%';
delete from datatables.neologismes where type LIKE '%erreur%';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_dico_fr_simple` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_dico_fr_simple`()
BEGIN
CREATE TABLE datatables.dico_fr_simple (id int(10) auto_increment primary key, lexie varchar(250))
select lexie from datatables.neologismes where type LIKE '%simples%';
delete from datatables.neologismes where type LIKE '%simples%';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `create_dico_fr_termino` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `create_dico_fr_termino`()
BEGIN
CREATE TABLE datatables.dico_fr_termino (id int(10) auto_increment primary key, lexie varchar(250))
select lexie from datatables.neologismes where type LIKE '%termino%';
delete from datatables.neologismes where type LIKE '%termino%';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dicos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dicos`()
BEGIN
select lexie from datatables.dico_fr_simple
union
select lexie from datatables.dico_fr_compose
union
select lexie from datatables.dico_fr_termino;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dicos_fr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dicos_fr`()
BEGIN
select lexie from datatables.dico_simple_fr
union
select lexie from datatables.dico_compose_fr
union
select lexie from datatables.dico_termino_fr;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dicos_generic` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dicos_generic`(
IN  V_LANG         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_SIMPLE = 'datatables.dico_fr_simple';
SET @DICO_COMPOSE = 'datatables.dico_fr_compose';
SET @DICO_EXCLUDED = 'datatables.excluded_fr';
SET @DICO_TERMINO = 'datatables.dico_fr_termino';

ELSE
SET @DICO_SIMPLE = CONCAT('datatables.dico_simple_', V_LANG);
SET @DICO_COMPOSE = CONCAT('datatables.dico_compose_', V_LANG);
SET @DICO_EXCLUDED = CONCAT('datatables.excluded_', V_LANG);
SET @DICO_TERMINO = CONCAT('datatables.dico_termino_', V_LANG);
END IF;

SET @s = CONCAT(
'select distinct lexie from ', @DICO_SIMPLE, '
UNION DISTINCT select lexie from ', @DICO_COMPOSE, '
UNION DISTINCT select lexie from ', @DICO_EXCLUDED, '
UNION DISTINCT select lexie from ', @DICO_TERMINO, ';
' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dicos_global` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dicos_global`(
IN  V_LANG         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_SIMPLE = 'datatables.dico_fr_simple';
SET @DICO_COMPOSE = 'datatables.dico_fr_compose';
SET @DICO_EXCLUDED = 'datatables.excluded_fr';
SET @DICO_TERMINO = 'datatables.dico_fr_termino';

ELSE
SET @DICO_SIMPLE = CONCAT('datatables.dico_simple_', V_LANG);
SET @DICO_COMPOSE = CONCAT('datatables.dico_compose_', V_LANG);
SET @DICO_EXCLUDED = CONCAT('datatables.excluded_', V_LANG);
SET @DICO_TERMINO = CONCAT('datatables.dico_termino_', V_LANG);
END IF;

SET @s = CONCAT(
'select distinct lexie from ', @DICO_SIMPLE, ' where timestamp > (CURDATE() - INTERVAL 30 DAY) 
UNION DISTINCT select lexie from ', @DICO_COMPOSE, ' where timestamp > (CURDATE() - INTERVAL 30 DAY)
UNION DISTINCT select lexie from ', @DICO_EXCLUDED, ' where timestamp > (CURDATE() - INTERVAL 30 DAY)
UNION DISTINCT select lexie from ', @DICO_TERMINO, ' where timestamp > (CURDATE() - INTERVAL 30 DAY);
' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dico_fr_prefixes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dico_fr_prefixes`()
BEGIN
select lexie from datatables.dico_fr_prefixes order by lexie  desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dico_fr_simple` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dico_fr_simple`()
BEGIN
select lexie from datatables.dico_fr_simple;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_dico_fr_suffixes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_dico_fr_suffixes`()
BEGIN
select lexie from datatables.dico_fr_suffixes order by lexie  desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_excluded_fr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_excluded_fr`()
BEGIN
select lexie from datatables.excluded_fr;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_compose_global` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_compose_global`(
IN  V_LANG         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_NAME = 'datatables.dico_fr_compose';
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @DICO_NAME = CONCAT('datatables.dico_compose_', V_LANG);
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%compose%"  or (info_auto LIKE "%compos%" and type = NULL);' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%compose%"  or (info_auto LIKE "%compos%" and type = NULL);' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_compose_global2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_compose_global2`(
IN  V_LANG         VARCHAR(250),
IN  V_USER         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_NAME = 'datatables.dico_fr_compose';
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @DICO_NAME = CONCAT('datatables.dico_compose_', V_LANG);
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%compose%"  or (info_auto LIKE "%compos%" and type = NULL) and last_modified_by="' , V_USER , '";' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%compose%"  or (info_auto LIKE "%compos%" and type = NULL)  and last_modified_by="' , V_USER , '";' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_excluded_global` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_excluded_global`(
IN  V_LANG         VARCHAR(250)
)
BEGIN

SET @DICO_NAME = CONCAT('datatables.excluded_', V_LANG);

IF (V_LANG = 'fr') THEN
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%erreur%";' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%erreur%";' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_excluded_global2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_excluded_global2`(
IN  V_LANG         VARCHAR(250),
IN  V_USER         VARCHAR(250)
)
BEGIN

SET @DICO_NAME = CONCAT('datatables.excluded_', V_LANG);
SET @USER = V_USER;

IF (V_LANG = 'fr') THEN
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%erreur%" and last_modified_by="' , @USER , '";' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%erreur%" and last_modified_by="' , @USER , '";' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_fr_compose` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_fr_compose`()
BEGIN
insert ignore into datatables.dico_fr_compose (lexie)
select lexie from datatables.neologismes where type LIKE '%compose%'  or (info_auto LIKE "%compos%" and type = NULL);
delete from datatables.neologismes where type LIKE '%compose%'   or (info_auto LIKE "%compos%" and type = NULL);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_fr_simple` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_fr_simple`()
BEGIN
insert ignore into datatables.dico_fr_simple (lexie)
select lexie from datatables.neologismes where type LIKE '%simples%' or (info_auto='dico simple' and type = NULL) ;
delete from datatables.neologismes where type LIKE '%simples%'  or (info_auto='dico simple' and type = NULL);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_fr_termino` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_fr_termino`()
BEGIN
insert ignore into datatables.dico_fr_termino (lexie)
select lexie from datatables.neologismes where type LIKE '%termino%';
delete from datatables.neologismes where type LIKE '%termino%';

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_simple_global` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_simple_global`(
IN  V_LANG         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_NAME = 'datatables.dico_fr_simple';
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @DICO_NAME = CONCAT('datatables.dico_simple_', V_LANG);
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%simples%" or (info_auto="dico simple" and type = NULL) ;' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%simples%" or (info_auto="dico simple" and type = NULL) ;' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_simple_global2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_simple_global2`(
IN  V_LANG         VARCHAR(250),
IN  V_USER         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_NAME = 'datatables.dico_fr_simple';
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @DICO_NAME = CONCAT('datatables.dico_simple_', V_LANG);
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%simples%" or (info_auto="dico simple" and type = NULL) and last_modified_by="' , V_USER , '";' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%simples%" or (info_auto="dico simple" and type = NULL) and last_modified_by="' , V_USER , '";' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_termino_global` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_termino_global`(
IN  V_LANG         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_NAME = 'datatables.dico_fr_termino';
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @DICO_NAME = CONCAT('datatables.dico_termino_', V_LANG);
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%termino%"' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%termino%"' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_dico_termino_global2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_dico_termino_global2`(
IN  V_LANG         VARCHAR(250),
IN  V_USER         VARCHAR(250)
)
BEGIN
IF (V_LANG='fr') THEN
SET @DICO_NAME = 'datatables.dico_fr_termino';
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @DICO_NAME = CONCAT('datatables.dico_termino_', V_LANG);
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;

SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (lexie) select lexie from ', @NEO_NAME,' where type LIKE "%termino%"  and last_modified_by="' , V_USER , '";' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('delete from ', @NEO_NAME, ' where type LIKE "%termino%"  and last_modified_by="' , V_USER , '";' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_excluded` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_excluded`()
BEGIN
insert ignore into datatables.excluded_fr (lexie)
select lexie from datatables.neologismes where type LIKE '%erreur%';
delete from datatables.neologismes where type LIKE '%erreur%';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_neo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_neo`(
IN  V_LANG         VARCHAR(250)
)
BEGIN

SET @DICO_NAME = 'neo3.termes_copy';

IF (V_LANG = 'fr') THEN
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;


SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (terme,langue,matrice_neo,date,auteur, note) select lexie,"',V_LANG,'", neo3.matrice_neo_def.id,now(),last_modified_by, commentaire from ', @NEO_NAME,', neo3.matrice_neo_def where type LIKE "%néo%" and is_saved_in_db =0 and neo3.matrice_neo_def.description=substr(type,13, CHAR_LENGTH(type)-13) and char_length(lexie)>0;' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('update ', @NEO_NAME, ' set is_saved_in_db = 1 where type LIKE "%néolo%" and is_saved_in_db =0;' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insert_into_neo2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_into_neo2`(
IN  V_LANG         VARCHAR(250),
IN  V_USER         VARCHAR(250)
)
BEGIN

SET @DICO_NAME = 'neo3.termes_copy';
SET @USER = V_USER;

IF (V_LANG = 'fr') THEN
SET @NEO_NAME = 'datatables.neologismes';
ELSE
SET @NEO_NAME = CONCAT('datatables.neologismes_', V_LANG);
END IF;


SET @s = CONCAT('insert ignore into ', @DICO_NAME, ' (terme,langue,matrice_neo,date,auteur, note) select lexie,"',V_LANG,'", neo3.matrice_neo_def.id,now(),last_modified_by, commentaire from ', @NEO_NAME,', neo3.matrice_neo_def where last_modified_by="' , @USER , '" and type LIKE "%néo%" and is_saved_in_db =0 and neo3.matrice_neo_def.description=substr(type,13, CHAR_LENGTH(type)-13) and char_length(lexie)>0;' );
PREPARE st1 FROM @s;
EXECUTE st1;
DEALLOCATE PREPARE st1;
SET @s2 = CONCAT('update ', @NEO_NAME, ' set is_saved_in_db = 1 where type LIKE "%néolo%" and is_saved_in_db =0 and last_modified_by="' , @USER , '";' );
PREPARE st2 FROM @s2;
EXECUTE st2;
DEALLOCATE PREPARE st2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `save_dico_excluded_fr` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `save_dico_excluded_fr`()
BEGIN

  
  SELECT lexie INTO OUTFILE  '/Users/emmanuelcartier/prog-neoveille/dicos/excluded-fr-save.csv'
  FIELDS TERMINATED BY '\t' OPTIONALLY ENCLOSED BY '"'
  LINES TERMINATED BY '\n'
  FROM excluded_fr;
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

-- Dump completed on 2018-02-14 13:22:57

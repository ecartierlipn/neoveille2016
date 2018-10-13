-- MySQL dump 10.13  Distrib 5.7.21, for Linux (x86_64)
--
-- Host: localhost    Database: neo3
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
-- Table structure for table `all_domaines_def`
--

DROP TABLE IF EXISTS `all_domaines_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `all_domaines_def` (
  `domaine` varchar(255) CHARACTER SET utf8 NOT NULL,
  `id` bigint(21) NOT NULL AUTO_INCREMENT,
  `Ras_id` bigint(21) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `Ras_id` (`Ras_id`)
) ENGINE=InnoDB AUTO_INCREMENT=339 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `classe_def`
--

DROP TABLE IF EXISTS `classe_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classe_def` (
  `classe` varchar(200) CHARACTER SET utf8 NOT NULL,
  `id` bigint(21) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contextes_source`
--

DROP TABLE IF EXISTS `contextes_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contextes_source` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type_source` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `sous_type_source` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `sous_type_instance` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contextes_type_transmetteur_enonciateur`
--

DROP TABLE IF EXISTS `contextes_type_transmetteur_enonciateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contextes_type_transmetteur_enonciateur` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `statut` varchar(50) COLLATE latin1_german2_ci DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contextes_typographie`
--

DROP TABLE IF EXISTS `contextes_typographie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contextes_typographie` (
  `Element` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contextes_typographie_locale`
--

DROP TABLE IF EXISTS `contextes_typographie_locale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contextes_typographie_locale` (
  `Element` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `datatables.neologismes_fr_save`
--

DROP TABLE IF EXISTS `datatables.neologismes_fr_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `datatables.neologismes_fr_save` (
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
) ENGINE=InnoDB AUTO_INCREMENT=69118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `influence_mode_def`
--

DROP TABLE IF EXISTS `influence_mode_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `influence_mode_def` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `language_def`
--

DROP TABLE IF EXISTS `language_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `language_def` (
  `ID_LANGUE` int(10) NOT NULL AUTO_INCREMENT,
  `NAME_LANGUE` varchar(50) NOT NULL,
  `CODE_LANGUE` varchar(20) DEFAULT NULL,
  `DATE_CREATED` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_LANGUE`),
  UNIQUE KEY `UNIQUE_NAME_LANGUE` (`NAME_LANGUE`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languages_def`
--

DROP TABLE IF EXISTS `languages_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages_def` (
  `languagecode` char(2) CHARACTER SET utf8 NOT NULL,
  `en_name` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `fr_name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `originalname` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
  `encoding` varchar(20) CHARACTER SET utf8 DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  PRIMARY KEY (`languagecode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `matrice_neo_def`
--

DROP TABLE IF EXISTS `matrice_neo_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matrice_neo_def` (
  `id` varchar(50) CHARACTER SET utf8 NOT NULL,
  `description` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `cat_matrice` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `sous_cat_matrice` varchar(45) COLLATE latin1_german2_ci DEFAULT NULL,
  `definition` varchar(255) COLLATE latin1_german2_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `model_morfo_def`
--

DROP TABLE IF EXISTS `model_morfo_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_morfo_def` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `model_morfo` varchar(40) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologie`
--

DROP TABLE IF EXISTS `neologie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologie` (
  `terme_id` varchar(40) NOT NULL,
  `matrice_neo` varchar(50) NOT NULL,
  `transcat` int(11) NOT NULL,
  `config_morpho` varchar(100) NOT NULL DEFAULT 'RAD-SUFF',
  `config_phonol` varchar(100) NOT NULL DEFAULT 'OOOO',
  `influence_ling_mode` char(2) NOT NULL DEFAULT 'FR',
  `influence_ling_lang` varchar(2) DEFAULT 'FR',
  `nom_propre` varchar(100) NOT NULL,
  `nom_propre_base` varchar(100) NOT NULL,
  `last_update` datetime NOT NULL,
  `last_update_author` varchar(100) NOT NULL,
  `locked` int(11) NOT NULL AUTO_INCREMENT,
  `is_neologism` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`locked`),
  KEY `terme_id` (`terme_id`),
  KEY `matrice_neo` (`matrice_neo`),
  KEY `transcat` (`transcat`),
  KEY `influence_ling_mode` (`influence_ling_mode`),
  KEY `influence_ling_lang` (`influence_ling_lang`)
) ENGINE=InnoDB AUTO_INCREMENT=4935 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `neologismes_fr_save`
--

DROP TABLE IF EXISTS `neologismes_fr_save`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `neologismes_fr_save` (
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
) ENGINE=InnoDB AUTO_INCREMENT=69118 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sem_cat_def`
--

DROP TABLE IF EXISTS `sem_cat_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sem_cat_def` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `valeur` varchar(20) NOT NULL,
  `Abrev` varchar(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sem_relation`
--

DROP TABLE IF EXISTS `sem_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sem_relation` (
  `terme_id` varchar(40) DEFAULT NULL,
  `cat_sem` int(2) NOT NULL,
  `hyperclass` bigint(21) NOT NULL,
  `sub_classe` bigint(21) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `terme_id` (`terme_id`),
  KEY `terme_id_2` (`terme_id`),
  KEY `sub_classe` (`sub_classe`),
  KEY `cat_sem` (`cat_sem`),
  KEY `hyperclass` (`hyperclass`)
) ENGINE=InnoDB AUTO_INCREMENT=2465 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sem_rels_def`
--

DROP TABLE IF EXISTS `sem_rels_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sem_rels_def` (
  `linktypeid` int(11) unsigned NOT NULL DEFAULT '0',
  `languagecode` char(2) CHARACTER SET utf8 DEFAULT NULL,
  `linkdesc` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `linkabr` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `linkdescription` longtext CHARACTER SET utf8,
  `createdate` datetime DEFAULT NULL,
  `rlinkcode` int(11) unsigned DEFAULT NULL,
  `parentlinktypeid` int(11) DEFAULT NULL,
  PRIMARY KEY (`linktypeid`),
  UNIQUE KEY `linkabr` (`linkabr`,`languagecode`),
  KEY `languagecode` (`languagecode`),
  KEY `rlinkcode` (`rlinkcode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `statut_concept_def`
--

DROP TABLE IF EXISTS `statut_concept_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statut_concept_def` (
  `id` tinyint(3) NOT NULL DEFAULT '0',
  `descr` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `languagecode` char(2) COLLATE latin1_german2_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `languagecode` (`languagecode`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `statuts_def`
--

DROP TABLE IF EXISTS `statuts_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statuts_def` (
  `statusid` tinyint(3) NOT NULL AUTO_INCREMENT,
  `statusdesc` varchar(60) COLLATE latin1_german2_ci DEFAULT NULL,
  `languagecode` char(2) COLLATE latin1_german2_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`statusid`),
  KEY `languagecode` (`languagecode`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sub_classe_def`
--

DROP TABLE IF EXISTS `sub_classe_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sub_classe_def` (
  `subclass` varchar(100) CHARACTER SET utf8 NOT NULL,
  `id_classe` bigint(21) DEFAULT NULL,
  `id` bigint(21) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `id_classe` (`id_classe`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `synt_attributs_def`
--

DROP TABLE IF EXISTS `synt_attributs_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `synt_attributs_def` (
  `cat` varchar(50) NOT NULL,
  `attribut` varchar(100) NOT NULL,
  `valeur` varchar(100) NOT NULL,
  `Id_synt_attributs_def` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id_synt_attributs_def`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `synt_cat_def`
--

DROP TABLE IF EXISTS `synt_cat_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `synt_cat_def` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `cat_synt` varchar(100) NOT NULL,
  `langue` varchar(2) NOT NULL DEFAULT 'FR',
  PRIMARY KEY (`id`),
  KEY `langue` (`langue`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `synt_cat_def2`
--

DROP TABLE IF EXISTS `synt_cat_def2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `synt_cat_def2` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `cat_synt` varchar(100) NOT NULL,
  `langue` varchar(2) NOT NULL DEFAULT 'FR',
  PRIMARY KEY (`id`),
  KEY `langue` (`langue`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `synt_relation`
--

DROP TABLE IF EXISTS `synt_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `synt_relation` (
  `terme_id` int(10) NOT NULL,
  `cat_synt` int(2) NOT NULL,
  `sscat_synt` varchar(100) NOT NULL,
  `morph_a_model` int(2) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `terme_id` (`terme_id`),
  KEY `cat_synt` (`cat_synt`),
  KEY `morph_a_model` (`morph_a_model`)
) ENGINE=InnoDB AUTO_INCREMENT=2354 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes`
--

DROP TABLE IF EXISTS `termes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `langue` varchar(2) NOT NULL,
  `terme` varchar(100) NOT NULL,
  `cat_synt` int(2) NOT NULL,
  `sscat_synt` varchar(100) NOT NULL,
  `cat_sem` int(2) NOT NULL,
  `hyperclass` int(11) NOT NULL,
  `definition` text NOT NULL,
  `note` text NOT NULL,
  `date` datetime NOT NULL,
  `auteur` varchar(100) NOT NULL,
  `statut` int(2) NOT NULL,
  `matrice_neo` varchar(50) NOT NULL,
  `transcat` int(11) NOT NULL,
  `config_morpho` varchar(100) NOT NULL,
  `config_phonol` varchar(100) NOT NULL,
  `influence_ling_mode` varchar(30) NOT NULL,
  `influence_ling_lang` varchar(30) NOT NULL,
  `nom_propre` varchar(100) NOT NULL,
  `sub_classe` int(11) NOT NULL,
  `nom_propre_base` varchar(100) NOT NULL,
  `last_update` datetime NOT NULL,
  `last_update_author` varchar(100) NOT NULL,
  `locked` tinyint(1) NOT NULL,
  `is_neologism` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `langue` (`langue`),
  KEY `cat_synt` (`cat_synt`),
  KEY `cat_sem` (`cat_sem`),
  KEY `hyperclass` (`hyperclass`),
  KEY `statut` (`statut`),
  KEY `matrice_neo` (`matrice_neo`),
  KEY `transcat` (`transcat`),
  KEY `sub_classe` (`sub_classe`)
) ENGINE=InnoDB AUTO_INCREMENT=2582 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_contextes`
--

DROP TABLE IF EXISTS `termes_contextes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_contextes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_term` int(10) NOT NULL,
  `texte` text NOT NULL,
  `comment` text NOT NULL,
  `date_cont` date DEFAULT NULL,
  `source` int(5) NOT NULL,
  `auteur` varchar(100) DEFAULT NULL,
  `source_details` varchar(200) NOT NULL,
  `infos_typographie` int(11) NOT NULL,
  `infos_typographie_locale` int(11) NOT NULL,
  `infos_typographie_details` varchar(200) NOT NULL,
  `glose` int(1) NOT NULL,
  `auteur_type` int(11) NOT NULL,
  `domaine_cont` int(11) NOT NULL,
  `transmetteur` int(11) NOT NULL,
  `transmetteur_type` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_term` (`id_term`),
  KEY `source` (`source`),
  KEY `infos_typographie` (`infos_typographie`),
  KEY `infos_typographie_locale` (`infos_typographie_locale`),
  KEY `auteur_type` (`auteur_type`),
  KEY `domaine_cont` (`domaine_cont`),
  KEY `transmetteur` (`transmetteur`),
  KEY `transmetteur_type` (`transmetteur_type`)
) ENGINE=InnoDB AUTO_INCREMENT=2609 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_copy`
--

DROP TABLE IF EXISTS `termes_copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_copy` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `langue` varchar(2) NOT NULL,
  `terme` varchar(100) NOT NULL,
  `cat_synt` int(2) NOT NULL,
  `hyperclass` int(11) NOT NULL,
  `definition` text NOT NULL,
  `note` text,
  `matrice_neo` varchar(50) NOT NULL,
  `config_phonol_details` varchar(150) DEFAULT NULL COMMENT 'Découpage syllabique de la lexie par un tiret.',
  `config_phonol` varchar(100) NOT NULL COMMENT 'Explicitation de la configuration phonologique au moyen des notions de syllabe ouverte (O) et de syllabe fermée (F). Pour les unités polylexicales, reprendre le séparateur (espace ou tiret, dans ce dernier cas ajouter un espace avant et après).',
  `config_morpho_details` varchar(150) DEFAULT NULL COMMENT 'Découpage de la chaîne graphique par tiret simple pour expliciter les composantes morphologiques de la lexie',
  `config_morpho` varchar(100) NOT NULL COMMENT 'Explicitation de la configuration morphologique de la lexie au moyen des notions d’affixes (préfixe : PREF, infixe : INF, suffixe:SUFF), de fracto-lexèmes (FRACTO) et de radical (RAD). Pour les unités polylexicales, reprendre le séparateur (espace ou tiret, dans ce dernier cas ajouter des espaces avant et après).',
  `transcat` int(5) DEFAULT '13',
  `lexie_base` varchar(150) DEFAULT NULL COMMENT 'Lexie servant de base au néologisme. Dans le cas d’une composition, indiquer les deux ou plus lexies, séparées par une virgule.',
  `cat_lexie_base` int(5) DEFAULT '11' COMMENT 'partie du discours de la lexie base',
  `statut` int(2) NOT NULL DEFAULT '1',
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `auteur` varchar(100) NOT NULL,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_update_author` varchar(100) DEFAULT NULL,
  `influence_langue` varchar(2) DEFAULT '__',
  `influence_mode` int(2) DEFAULT '8',
  `solr_update` int(1) NOT NULL DEFAULT '0',
  `frequency` int(30) DEFAULT NULL,
  `date_frequency` datetime DEFAULT NULL,
  `solrq` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `terme_UNIQUE` (`terme`),
  KEY `langue` (`langue`),
  KEY `hyperclass` (`hyperclass`)
) ENGINE=InnoDB AUTO_INCREMENT=105181 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_infos_sem`
--

DROP TABLE IF EXISTS `termes_infos_sem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_infos_sem` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_term` int(10) NOT NULL,
  `classe` varchar(200) NOT NULL,
  `subclass` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2458 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_infos_sem_pred_construct`
--

DROP TABLE IF EXISTS `termes_infos_sem_pred_construct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_infos_sem_pred_construct` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_term` int(10) NOT NULL,
  `construct` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_term` (`id_term`)
) ENGINE=MyISAM AUTO_INCREMENT=192 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_infos_sem_rels`
--

DROP TABLE IF EXISTS `termes_infos_sem_rels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_infos_sem_rels` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `id_source` int(10) NOT NULL,
  `relation` varchar(100) NOT NULL,
  `id_cible` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_source` (`id_source`),
  KEY `relation` (`relation`),
  KEY `id_cible` (`id_cible`)
) ENGINE=MyISAM AUTO_INCREMENT=154 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `termes_sol2`
--

DROP TABLE IF EXISTS `termes_sol2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `termes_sol2` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `langue` char(2) NOT NULL,
  `terme` varchar(40) NOT NULL,
  `cat_synt` int(2) NOT NULL,
  `cat_sem` int(2) NOT NULL,
  `definition` text NOT NULL,
  `note` text,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `auteur` varchar(100) DEFAULT NULL,
  `statut` tinyint(3) NOT NULL,
  `matrice_neo` varchar(50) NOT NULL,
  `config_morpho` varchar(100) NOT NULL,
  `config_phonol` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `langue` (`langue`),
  KEY `cat_synt` (`cat_synt`),
  KEY `cat_sem` (`cat_sem`),
  KEY `statut` (`statut`),
  KEY `matrice_neo` (`matrice_neo`)
) ENGINE=InnoDB AUTO_INCREMENT=2588 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transcat_def`
--

DROP TABLE IF EXISTS `transcat_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transcat_def` (
  `id` int(11) NOT NULL,
  `description` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `type_concept_def`
--

DROP TABLE IF EXISTS `type_concept_def`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type_concept_def` (
  `id` tinyint(3) NOT NULL DEFAULT '0',
  `descr` varchar(60) CHARACTER SET utf8 DEFAULT NULL,
  `languagecode` char(2) COLLATE latin1_german2_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `name` varchar(150) COLLATE latin1_german2_ci NOT NULL DEFAULT '',
  `login` varchar(30) COLLATE latin1_german2_ci NOT NULL DEFAULT '',
  `password` varchar(30) COLLATE latin1_german2_ci NOT NULL DEFAULT '',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `createdate` date NOT NULL DEFAULT '0000-00-00',
  `Id_user` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id_user`)
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=latin1 COLLATE=latin1_german2_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'neo3'
--
/*!50003 DROP PROCEDURE IF EXISTS `get_neo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_neo`(
IN  V_LANG         VARCHAR(250)
)
BEGIN

SELECT terme from neo3.termes_copy where country=V_LANG;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_prefixes_count` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_prefixes_count`()
BEGIN
SELECT count(*), substring(termes_copy.terme,1,LOCATE('-',termes_copy.terme)-1) as pref FROM neo3.termes_copy, neo3.matrice_neo_def where neo3.termes_copy.matrice_neo = neo3.matrice_neo_def.id and terme like "%-%" and YEAR(date)> 2014 group by pref;
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

-- Dump completed on 2018-02-14 13:23:31

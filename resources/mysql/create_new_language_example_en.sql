CREATE TABLE datatables.`dico_compose_en` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE datatables.`dico_prefixes_en` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE datatables.`dico_simple_en` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `infomorph` varchar(45) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE datatables.`dico_suffixes_en` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexie_UNIQUE` (`lexie`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE datatables.`dico_termino_en` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `lexie` varchar(250) DEFAULT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `excluded_en` (
  `id` int(10) NOT NULL DEFAULT '0',
  `lexie` varchar(250) CHARACTER SET utf8 NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `infomorph` varchar(45) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `neologismes_en` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ADD_NEOLOGISM_EN`(				  
IN  V_NEO         VARCHAR(250),
IN  V_FREQ         INT,
IN  V_INFO         VARCHAR(250),
OUT V_ID_LINK           INT
)
BEGIN

DECLARE V_COUNT_TMP INT;

SELECT COUNT(lexie) INTO V_COUNT_TMP FROM datatables.neologismes_en
					     WHERE lexie=lower(V_NEO);

IF V_COUNT_TMP=0 THEN

INSERT INTO datatables.neologismes_en (lexie,frequence, info_auto)  VALUES (V_NEO, frequence+V_FREQ,V_INFO);

SELECT LAST_INSERT_ID() INTO V_ID_LINK;

ELSE
UPDATE datatables.neologismes_en SET frequence=frequence+V_FREQ, info_auto=V_INFO WHERE lexie=lower(V_NEO);
SELECT LAST_INSERT_ID() INTO V_ID_LINK;
END IF;
END$$
DELIMITER ;

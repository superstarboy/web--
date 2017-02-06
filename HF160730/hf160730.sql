/*
Navicat MySQL Data Transfer

Source Server         : abc
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : hf160730

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2016-12-05 22:03:06
*/
-- 创建数据库HF160728
drop database if exists HF160730;
create database HF160730
CHARACTER SET 'utf8' 
COLLATE 'utf8_general_ci'; 
use HF160730;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `a_id` char(10) NOT NULL,
  `a_pwd` text NOT NULL,
  `jurisdiction` int(10) NOT NULL,
  `a_time` datetime NOT NULL,
  PRIMARY KEY (`a_id`),
  KEY `jurisdiction` (`jurisdiction`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`jurisdiction`) REFERENCES `jur` (`jurisdiction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('admin', md5('123'), '1', '2016-12-04 14:17:00');

-- ----------------------------
-- Table structure for admin_jur
-- ----------------------------
DROP TABLE IF EXISTS `admin_jur`;
CREATE TABLE `admin_jur` (
  `jurisdiction` int(10) NOT NULL AUTO_INCREMENT,
  `m_id` int(10) NOT NULL,
  PRIMARY KEY (`jurisdiction`,`m_id`),
  KEY `m_id` (`m_id`),
  CONSTRAINT `admin_jur_ibfk_1` FOREIGN KEY (`m_id`) REFERENCES `menu` (`m_id`),
  CONSTRAINT `admin_jur_ibfk_2` FOREIGN KEY (`jurisdiction`) REFERENCES `jur` (`jurisdiction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_jur
-- ----------------------------

-- ----------------------------
-- Table structure for announcements
-- ----------------------------
DROP TABLE IF EXISTS `announcements`;
CREATE TABLE `announcements` (
  `g_id` int(10) NOT NULL AUTO_INCREMENT,
  `g_title` varchar(50) NOT NULL,
  `g_content` varchar(200) NOT NULL,
  `g_validtime` date DEFAULT NULL,
  `g_releasetime` datetime DEFAULT NULL,
  PRIMARY KEY (`g_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of announcements
-- ----------------------------
INSERT INTO `announcements` VALUES ('15', '11111111111111', 'Safari', '2016-12-06', '2016-12-05 17:20:13');
INSERT INTO `announcements` VALUES ('16', '11111111111111', 'Safari', '2016-12-06', '2016-12-05 17:20:18');
INSERT INTO `announcements` VALUES ('17', '11111111111111', 'Safari', '2016-12-06', '2016-12-05 17:20:20');
INSERT INTO `announcements` VALUES ('18', '11111111111111', 'Safari', '2016-12-06', '2016-12-05 17:20:23');
INSERT INTO `announcements` VALUES ('19', '11111111111111', 'Safari', '2016-12-06', '2016-12-05 17:20:24');
INSERT INTO `announcements` VALUES ('20', '冬天', '13', '2016-12-07', '2016-12-05 17:24:42');
INSERT INTO `announcements` VALUES ('21', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:24:57');
INSERT INTO `announcements` VALUES ('22', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:25:02');
INSERT INTO `announcements` VALUES ('23', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:25:04');
INSERT INTO `announcements` VALUES ('24', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:25:07');
INSERT INTO `announcements` VALUES ('25', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:25:09');
INSERT INTO `announcements` VALUES ('27', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:25:16');
INSERT INTO `announcements` VALUES ('28', '冬天开', 'Safari', '2016-12-06', '2016-12-05 17:25:19');
INSERT INTO `announcements` VALUES ('32', '阿萨法', '阿萨法', '2016-11-29', '2016-12-05 17:26:41');
INSERT INTO `announcements` VALUES ('34', '阿法狗', 'Safari是想', '2016-12-06', '2016-12-05 17:30:43');
INSERT INTO `announcements` VALUES ('43', '系统公告', '君名体现诚哥是足控', '2017-12-13', '2016-12-05 17:43:46');
INSERT INTO `announcements` VALUES ('45', '特别消息', '情侣看君名没有感动愤怒分手', '2017-11-05', '2016-12-05 18:19:51');
INSERT INTO `announcements` VALUES ('46', '致新海诚', '诚哥千古', '2017-12-08', '2016-12-05 18:27:12');

-- ----------------------------
-- Table structure for equip
-- ----------------------------
DROP TABLE IF EXISTS `equip`;
CREATE TABLE `equip` (
  `equ_id` int(10) NOT NULL AUTO_INCREMENT,
  `equ_name` varchar(20) NOT NULL,
  `type_id` int(10) NOT NULL,
  `vr_id` int(10) NOT NULL,
  `rule_id` int(10) NOT NULL,
  `equ_money` int(20) NOT NULL,
  `equ_upmoney` int(20) NOT NULL,
  `equ_cri` varchar(200) NOT NULL,
  PRIMARY KEY (`equ_id`),
  UNIQUE KEY `equ_name` (`equ_name`),
  KEY `type_id` (`type_id`),
  KEY `rule_id` (`rule_id`),
  KEY `vr_id` (`vr_id`),
  CONSTRAINT `equip_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `equ_type` (`type_id`),
  CONSTRAINT `equip_ibfk_3` FOREIGN KEY (`rule_id`) REFERENCES `exprule` (`rule_id`),
  CONSTRAINT `equip_ibfk_4` FOREIGN KEY (`vr_id`) REFERENCES `viprule` (`vr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equip
-- ----------------------------
INSERT INTO `equip` VALUES ('1', '普通骑手', '1', '1', '1', '200', '1000', '梦想型骑手，并没有特殊能力');
INSERT INTO `equip` VALUES ('2', '超级骑手', '1', '2', '1', '300', '1000', '潜伏的高手，有着惊人的最高时度');
INSERT INTO `equip` VALUES ('3', '黑风骑手', '1', '2', '1', '400', '1000', '加速度惊人的新晋骑手');
INSERT INTO `equip` VALUES ('4', '可怕骑手', '1', '4', '2', '800', '1000', '雪碧离七喜还差一个美年达');
INSERT INTO `equip` VALUES ('5', '特别骑手', '1', '3', '2', '1200', '1000', '有着深藏不露的实力，神秘的骑手');
INSERT INTO `equip` VALUES ('6', '绿油油骑手', '1', '5', '2', '200', '1000', '外表普通内心却无比坚毅的骑手');
INSERT INTO `equip` VALUES ('7', '绿色摩托', '2', '1', '1', '700', '1000', '澎湃的动力带给你非一般的感觉');
INSERT INTO `equip` VALUES ('8', '蓝色摩托', '2', '2', '2', '100', '1000', '降低在草地行驶的阻力');
INSERT INTO `equip` VALUES ('9', '橘色车轮', '3', '1', '1', '1200', '1000', '并没有介绍');
INSERT INTO `equip` VALUES ('10', '蓝色车轮', '3', '2', '2', '1200', '1000', '增加最高时速但有损加速度');
INSERT INTO `equip` VALUES ('11', '怒火引擎', '4', '1', '1', '1200', '1000', '标配引擎，号称最高性价比');
INSERT INTO `equip` VALUES ('12', '便宜引擎', '4', '2', '1', '1200', '1000', '动力虽然强劲但对车身有着非常严格的要求');
INSERT INTO `equip` VALUES ('13', '可怕引擎', '4', '2', '2', '1200', '1000', '在低速提供更大的动力');
INSERT INTO `equip` VALUES ('14', '火焰引擎', '4', '3', '2', '1200', '1000', '短暂提升巨大的速度');

-- ----------------------------
-- Table structure for equ_img
-- ----------------------------
DROP TABLE IF EXISTS `equ_img`;
CREATE TABLE `equ_img` (
  `equ_id` int(10) NOT NULL,
  `equimg_to` int(10) NOT NULL,
  `equimg_url` varchar(200) NOT NULL,
  PRIMARY KEY (`equ_id`,`equimg_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `equ_img` VALUES ('1','1','src/img/equip/c1s.png');
INSERT INTO `equ_img` VALUES ('1','2','src/img/equip/c1.png');
INSERT INTO `equ_img` VALUES ('1','3','src/img/equip/cha1.png');
INSERT INTO `equ_img` VALUES ('2','1','src/img/equip/c2s.png');
INSERT INTO `equ_img` VALUES ('2','2','src/img/equip/c2.png');
INSERT INTO `equ_img` VALUES ('2','3','src/img/equip/cha2.png');
INSERT INTO `equ_img` VALUES ('3','1','src/img/equip/c3s.png');
INSERT INTO `equ_img` VALUES ('3','2','src/img/equip/c3.png');
INSERT INTO `equ_img` VALUES ('3','3','src/img/equip/cha3.png');
INSERT INTO `equ_img` VALUES ('4','1','src/img/equip/c4s.png');
INSERT INTO `equ_img` VALUES ('4','2','src/img/equip/c4.png');
INSERT INTO `equ_img` VALUES ('4','3','src/img/equip/cha4.png');
INSERT INTO `equ_img` VALUES ('5','1','src/img/equip/c5s.png');
INSERT INTO `equ_img` VALUES ('5','2','src/img/equip/c5.png');
INSERT INTO `equ_img` VALUES ('5','3','src/img/equip/cha5.png');
INSERT INTO `equ_img` VALUES ('6','1','src/img/equip/c6s.png');
INSERT INTO `equ_img` VALUES ('6','2','src/img/equip/c6.png');
INSERT INTO `equ_img` VALUES ('6','3','src/img/equip/cha6.png');
INSERT INTO `equ_img` VALUES ('7','1','src/img/equip/m1s.png');
INSERT INTO `equ_img` VALUES ('7','2','src/img/equip/38.png');
INSERT INTO `equ_img` VALUES ('7','3','src/img/equip/38.png');
INSERT INTO `equ_img` VALUES ('8','1','src/img/equip/m2s.png');
INSERT INTO `equ_img` VALUES ('8','2','src/img/equip/39.png');
INSERT INTO `equ_img` VALUES ('8','3','src/img/equip/39.png');
INSERT INTO `equ_img` VALUES ('9','1','src/img/equip/w1s.png');
INSERT INTO `equ_img` VALUES ('9','2','src/img/equip/BikerExtraParts1.png');
INSERT INTO `equ_img` VALUES ('9','3','src/img/equip/BikerExtraParts1.png');
INSERT INTO `equ_img` VALUES ('10','1','src/img/equip/w2s.png');
INSERT INTO `equ_img` VALUES ('10','2','src/img/equip/BikerExtraParts2.png');
INSERT INTO `equ_img` VALUES ('10','3','src/img/equip/BikerExtraParts2.png');
INSERT INTO `equ_img` VALUES ('11','1','src/img/equip/engine1.png');
INSERT INTO `equ_img` VALUES ('11','2','src/img/equip/engine1.png');
INSERT INTO `equ_img` VALUES ('11','3','src/img/equip/engine1.png');
INSERT INTO `equ_img` VALUES ('12','1','src/img/equip/engine2.jpg');
INSERT INTO `equ_img` VALUES ('12','2','src/img/equip/engine2.jpg');
INSERT INTO `equ_img` VALUES ('12','3','src/img/equip/engine2.jpg');
INSERT INTO `equ_img` VALUES ('13','1','src/img/equip/engine3.jpg');
INSERT INTO `equ_img` VALUES ('13','2','src/img/equip/engine3.jpg');
INSERT INTO `equ_img` VALUES ('13','3','src/img/equip/engine3.jpg');
INSERT INTO `equ_img` VALUES ('14','1','src/img/equip/engine4.jpg');
INSERT INTO `equ_img` VALUES ('14','2','src/img/equip/engine4.jpg');
INSERT INTO `equ_img` VALUES ('14','3','src/img/equip/engine4.jpg');

-- ----------------------------
-- Records of equ_img
-- ----------------------------

-- ----------------------------
-- Table structure for equ_num
-- ----------------------------
DROP TABLE IF EXISTS `equ_num`;
CREATE TABLE `equ_num` (
  `equ_id` int(10) NOT NULL,
  `equ_arrt` varchar(20) NOT NULL,
  `equ_initial` int(10) NOT NULL,
  `equ_upnum` int(10) NOT NULL,
  PRIMARY KEY (`equ_id`,`equ_arrt`),
  CONSTRAINT `equ_num_ibfk_1` FOREIGN KEY (`equ_id`) REFERENCES `equip` (`equ_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equ_num
-- ----------------------------

-- ----------------------------
-- Table structure for equ_type
-- ----------------------------
DROP TABLE IF EXISTS `equ_type`;
CREATE TABLE `equ_type` (
  `type_id` int(10) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(20) NOT NULL,
  `type_mes` varchar(20) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equ_type
-- ----------------------------
INSERT INTO `equ_type` VALUES ('1', '人物', 'player');
INSERT INTO `equ_type` VALUES ('2', '摩托', 'model');
INSERT INTO `equ_type` VALUES ('3', '车轮', 'weel');
INSERT INTO `equ_type` VALUES ('4', '引擎', 'power');

-- ----------------------------
-- Table structure for exprule
-- ----------------------------
DROP TABLE IF EXISTS `exprule`;
CREATE TABLE `exprule` (
  `rule_id` int(10) NOT NULL,
  `need_exp` int(20) NOT NULL,
  PRIMARY KEY (`rule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of exprule
-- ----------------------------
INSERT INTO `exprule` VALUES ('1', '0');
INSERT INTO `exprule` VALUES ('2', '100');
INSERT INTO `exprule` VALUES ('3', '300');

-- ----------------------------
-- Table structure for gamemap
-- ----------------------------
DROP TABLE IF EXISTS `gamemap`;
CREATE TABLE `gamemap` (
  `game_id` int(10) NOT NULL AUTO_INCREMENT,
  `game_name` varchar(20) NOT NULL,
  `game_img` varchar(200) NOT NULL,
  `game_difficulty` int(20) NOT NULL,
  `game_map` varchar(100) NOT NULL,
  `game_fid` int(10) NOT NULL,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gamemap
-- ----------------------------
INSERT INTO `gamemap` VALUES ('1', '沙漠', 'src/img/map/1.png', '1', 'asf', '0');
INSERT INTO `gamemap` VALUES ('2', '城镇', 'src/img/map/2.png', '1', 'asf', '0');
INSERT INTO `gamemap` VALUES ('3', '港口', 'src/img/map/3.png', '1', 'afasa', '0');
INSERT INTO `gamemap` VALUES ('4', '沙漠1-1','src/img/map/map2.jpg', '1', 'saf', '1');
INSERT INTO `gamemap` VALUES ('5', '沙漠1-2', 'src/img/map/map2.jpg', '1', 'fasfg', '1');
INSERT INTO `gamemap` VALUES ('6', '沙漠1-3', 'src/img/map/map2.jpg', '1', 'dsg', '1');
INSERT INTO `gamemap` VALUES ('7', '城镇1-1','src/img/map/map.jpg', '1', 'sfa', '2');
INSERT INTO `gamemap` VALUES ('8', '城镇1-2', 'src/img/map/map.jpg', '1', 'safg', '2');
INSERT INTO `gamemap` VALUES ('9', '港口1-1', 'src/img/map/map3.jpg', '1', 'saf', '3');
INSERT INTO `gamemap` VALUES ('10', '港口1-2','src/img/map/map3.jpg', '1', 'sdagv', '3');

-- ----------------------------
-- Table structure for jur
-- ----------------------------
DROP TABLE IF EXISTS `jur`;
CREATE TABLE `jur` (
  `jurisdiction` int(10) NOT NULL,
  `j_name` varchar(20) NOT NULL,
  PRIMARY KEY (`jurisdiction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jur
-- ----------------------------
INSERT INTO `jur` VALUES ('1', '超级管理员');

-- ----------------------------
-- Table structure for mapstar
-- ----------------------------
DROP TABLE IF EXISTS `mapstar`;
CREATE TABLE `mapstar` (
  `star_id` int(10) NOT NULL,
  `star_url` varchar(200) NOT NULL,
  PRIMARY KEY (`star_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of mapstar
-- ----------------------------
INSERT INTO mapstar VALUES(1,'src/img/map/l1_3.png');
INSERT INTO mapstar VALUES(2,'src/img/map/l1_2.png');
INSERT INTO mapstar VALUES(3,'src/img/map/l1_1.png');
INSERT INTO mapstar VALUES(4,'src/img/map/l1.png');
INSERT INTO mapstar VALUES(5,'src/img/map/lock.png');



-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `m_id` int(10) NOT NULL AUTO_INCREMENT,
  `m_name` varchar(20) NOT NULL,
  `m_fid` int(10) NOT NULL,
  `m_url` varchar(30) NOT NULL,
  PRIMARY KEY (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '用户管理', '0', 'a=player');
INSERT INTO `menu` VALUES ('2', '游戏设定', '0', 'a=game');
INSERT INTO `menu` VALUES ('3', '运营统计', '0', 'a=sum');
INSERT INTO `menu` VALUES ('4', '公告管理', '2', 'c=Menu&a=announce');
INSERT INTO `menu` VALUES ('5', 'VIP规则设置', '2', 'c=Menu&a=vip');
INSERT INTO `menu` VALUES ('6', '赛事赛段管理', '2', 'c=Menu&a=map');
INSERT INTO `menu` VALUES ('7', '交易物品管理', '2', 'c=Menu&a=equip');
INSERT INTO `menu` VALUES ('10', '交易分析', '3', 'c=Game&a=buy');
INSERT INTO `menu` VALUES ('12', '用户管理', '1', 'c=Menu&a=player');
-- INSERT INTO `menu` VALUES ('11', '游戏分析', '3', 'a=gamenum');
-- INSERT INTO `menu` VALUES ('8', '营收分析', '3', 'a=money');
-- INSERT INTO `menu` VALUES ('9', '玩家分析', '3', 'a=playernum');

-- ----------------------------
-- Table structure for people
-- ----------------------------
DROP TABLE IF EXISTS `people`;
CREATE TABLE `people` (
  `peo_id` int(10) NOT NULL,
  `peo_name` varchar(20) NOT NULL,
  `peo_money` int(10) NOT NULL,
  `peo_upmoney` int(10) NOT NULL,
  `vr_id` int(10) NOT NULL,
  `rule_id` int(10) NOT NULL,
  `peo_skill` varchar(50) NOT NULL,
  PRIMARY KEY (`peo_id`),
  UNIQUE KEY `peo_name` (`peo_name`),
  KEY `rule_id` (`rule_id`),
  KEY `vr_id` (`vr_id`),
  CONSTRAINT `people_ibfk_2` FOREIGN KEY (`rule_id`) REFERENCES `exprule` (`rule_id`),
  CONSTRAINT `people_ibfk_3` FOREIGN KEY (`vr_id`) REFERENCES `viprule` (`vr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of people
-- ----------------------------
INSERT INTO `people` VALUES ('1', '马化腾', '1', '1', '3', '1', 'saf');

-- ----------------------------
-- Table structure for peo_arrt
-- ----------------------------
DROP TABLE IF EXISTS `peo_arrt`;
CREATE TABLE `peo_arrt` (
  `peo_id` int(10) NOT NULL,
  `peo_arrtname` varchar(20) NOT NULL,
  `peo_initial` int(10) NOT NULL,
  `peo_upnum` int(10) NOT NULL,
  PRIMARY KEY (`peo_id`,`peo_arrtname`),
  CONSTRAINT `peo_arrt_ibfk_1` FOREIGN KEY (`peo_id`) REFERENCES `people` (`peo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of peo_arrt
-- ----------------------------

-- ----------------------------
-- Table structure for peo_img
-- ----------------------------
DROP TABLE IF EXISTS `peo_img`;
CREATE TABLE `peo_img` (
  `peo_id` int(10) NOT NULL,
  `peoimg_to` varchar(20) NOT NULL,
  `peoimg_url` varchar(20) NOT NULL,
  PRIMARY KEY (`peo_id`,`peoimg_to`),
  CONSTRAINT `peo_img_ibfk_1` FOREIGN KEY (`peo_id`) REFERENCES `people` (`peo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of peo_img
-- ----------------------------

-- ----------------------------
-- Table structure for recharge
-- ----------------------------
DROP TABLE IF EXISTS `recharge`;
CREATE TABLE `recharge` (
  `rec_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_id` int(20) NOT NULL,
  `rec_time` datetime NOT NULL,
  `rec_money` int(20) NOT NULL,
  PRIMARY KEY (`rec_id`),
  KEY `u_id` (`u_id`),
  CONSTRAINT `recharge_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recharge
-- ----------------------------
INSERT INTO `recharge` VALUES ('1', '1', '2016-12-05 09:05:29', '1000');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `u_id` int(20) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(20) DEFAULT NULL,
  `u_pwd` varchar(10) NOT NULL,
  `rule_id` int(10) NOT NULL,
  `vr_id` int(10) NOT NULL,
  `u_rechargenum` int(20) NOT NULL,
  `u_money` int(20) NOT NULL,
  `u_state` int(10) NOT NULL,
  `u_online` int(50) NOT NULL,
  `u_registertime` datetime NOT NULL,
  `u_last` datetime NOT NULL,
  `u_nik` varchar(20) NOT NULL,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `u_name` (`u_name`),
  KEY `rule_id` (`rule_id`),
  KEY `vr_id` (`vr_id`),
  CONSTRAINT `user_ibfk_2` FOREIGN KEY (`rule_id`) REFERENCES `exprule` (`rule_id`),
  CONSTRAINT `user_ibfk_3` FOREIGN KEY (`vr_id`) REFERENCES `viprule` (`vr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '12345678', '12345678', '1', '2', '0', '0', '0', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','冠军');
INSERT INTO `user` VALUES ('2', '125445863', '12345678', '1', '1', '0', '0', '1', '0', '2016-12-04 16:32:32', '2016-12-04 16:32:37','天才小熊猫');
INSERT INTO `user` VALUES ('3', '894565135', '12345678', '1', '3', '0', '0', '1', '0', '2016-12-04 16:33:10', '2016-12-04 16:33:15','热诚');
INSERT INTO `user` VALUES ('4', '211678546', '12345678', '1', '4', '0', '0', '0', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','烈焰');
INSERT INTO `user` VALUES ('5', '241435489', '12345678', '1', '2', '0', '0', '0', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','玩家1');
INSERT INTO `user` VALUES ('6', '958456431', '12345678', '1', '2', '0', '0', '0', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','玩家2');
INSERT INTO `user` VALUES ('7', '9875563125', '12345678', '1', '4', '0', '0', '1', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','玩家3');
INSERT INTO `user` VALUES ('8', '2135458554', '12345678', '1', '1', '0', '0', '1', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','举行玩家');
INSERT INTO `user` VALUES ('9', '2354855951', '12345678', '1', '4', '0', '0', '0', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','不一般的玩家');
INSERT INTO `user` VALUES ('10', '2548563489', '12345678', '1', '2', '0', '0', '0', '0', '2016-12-04 16:33:31', '2016-12-04 16:33:35','可怕的玩家');

-- ----------------------------
-- Table structure for usercustoms
-- ----------------------------
DROP TABLE IF EXISTS `usercustoms`;
CREATE TABLE `usercustoms` (
  `u_id` int(20) NOT NULL,
  `game_id` int(10) NOT NULL,
  `star_id` int(10) NOT NULL,
  PRIMARY KEY (`u_id`,`game_id`),
  KEY `u_id` (`u_id`),
  KEY `game_id` (`game_id`),
  KEY `star_id` (`star_id`),
  CONSTRAINT `usercustoms_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercustoms_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `gamemap` (`game_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usercustoms_ibfk_3` FOREIGN KEY (`star_id`) REFERENCES `mapstar` (`star_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usercustoms
-- ----------------------------

-- ----------------------------
-- Table structure for userequip
-- ----------------------------
DROP TABLE IF EXISTS `userequip`;
CREATE TABLE `userequip` (
  `u_id` int(20) NOT NULL,
  `equ_id` int(10) NOT NULL,
  `userequ_lev` int(10) NOT NULL,
  `userequ_arrt` varchar(20) NOT NULL,
  `uequ_time` datetime NOT NULL,
  `uequ_dress` int(10) NOT NULL,
  `uequ_name` varchar(20) NOT NULL,
  PRIMARY KEY (`u_id`,`equ_id`),
  KEY `u_id` (`u_id`),
  KEY `equ_id` (`equ_id`),
  CONSTRAINT `userequip_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `userequip_ibfk_2` FOREIGN KEY (`equ_id`) REFERENCES `equip` (`equ_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userequip
-- ----------------------------
INSERT INTO `userequip` VALUES ('1', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('1', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('1', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('1', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('2', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('2', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('2', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('2', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('3', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('3', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('3', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('3', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('4', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('4', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('4', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('4', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('5', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('5', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('5', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('5', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('6', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('6', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('6', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('6', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('7', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('7', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('7', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('7', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('8', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('8', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('8', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('8', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('9', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('9', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('9', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('9', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('10', '1', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('10', '7', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('10', '9', '8', '12', '2016-12-04 21:58:19', '1','越野机车');
INSERT INTO `userequip` VALUES ('10', '11', '8', '12', '2016-12-04 21:58:19', '1','越野机车');

-- ----------------------------
-- Table structure for usergame
-- ----------------------------
DROP TABLE IF EXISTS `usergame`;
CREATE TABLE `usergame` (
  `ug_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_id` int(20) NOT NULL,
  `game_id` int(10) NOT NULL,
  `cus_time` varchar(20) NOT NULL,
  `cus_exp` int(10) NOT NULL,
  `cus_money` int(10) NOT NULL,
  `cus_top` int(10) NOT NULL,
  `cus_gametime` datetime NOT NULL,
  PRIMARY KEY (`ug_id`),
  KEY `u_id` (`u_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `usergame_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `usergame_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `gamemap` (`game_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usergame
-- ----------------------------
INSERT INTO `usergame` VALUES ('1', '1', '1', '11', '100', '100', '1', '2016-12-05 09:11:37');

-- ----------------------------
-- Table structure for usernowequ
-- ----------------------------
DROP TABLE IF EXISTS `usernowequ`;
CREATE TABLE `usernowequ` (
  `n_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_id` int(20) NOT NULL,
  `type_id` int(10) NOT NULL,
  `equ_id` int(10) NOT NULL,
  
  PRIMARY KEY (`n_id`),
  KEY `u_id` (`u_id`),
  KEY `type_id` (`type_id`),
  KEY `equ_id` (`equ_id`),
  CONSTRAINT `usernowequ_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `usernowequ_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `equ_type` (`type_id`),
  CONSTRAINT `usernowequ_ibfk_3` FOREIGN KEY (`equ_id`) REFERENCES `equip` (`equ_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usernowequ
-- ----------------------------
INSERT INTO `usernowequ` VALUES ('1', '1', '1', '1');
INSERT INTO `usernowequ` VALUES ('2', '1', '2', '7');
INSERT INTO `usernowequ` VALUES ('3', '1', '3', '9');
INSERT INTO `usernowequ` VALUES ('4', '1', '4', '11');
INSERT INTO `usernowequ` VALUES ('5', '2', '1', '1');
INSERT INTO `usernowequ` VALUES ('6', '2', '2', '7');
INSERT INTO `usernowequ` VALUES ('7', '2', '3', '9');
INSERT INTO `usernowequ` VALUES ('8', '2', '4', '11');
INSERT INTO `usernowequ` VALUES ('9', '3', '1', '1');
INSERT INTO `usernowequ` VALUES ('10', '3', '2', '7');
INSERT INTO `usernowequ` VALUES ('11', '3', '3', '9');
INSERT INTO `usernowequ` VALUES ('12', '3', '4', '11');
INSERT INTO `usernowequ` VALUES ('13', '4', '1', '1');
INSERT INTO `usernowequ` VALUES ('14', '4', '2', '7');
INSERT INTO `usernowequ` VALUES ('15', '4', '3', '9');
INSERT INTO `usernowequ` VALUES ('16', '4', '4', '11');
INSERT INTO `usernowequ` VALUES ('17', '5', '1', '1');
INSERT INTO `usernowequ` VALUES ('18', '5', '2', '7');
INSERT INTO `usernowequ` VALUES ('19', '5', '3', '9');
INSERT INTO `usernowequ` VALUES ('20', '5', '4', '11');
INSERT INTO `usernowequ` VALUES ('21', '6', '1', '1');
INSERT INTO `usernowequ` VALUES ('22', '6', '2', '7');
INSERT INTO `usernowequ` VALUES ('23', '6', '3', '9');
INSERT INTO `usernowequ` VALUES ('24', '6', '4', '11');
INSERT INTO `usernowequ` VALUES ('25', '7', '1', '1');
INSERT INTO `usernowequ` VALUES ('26', '7', '2', '7');
INSERT INTO `usernowequ` VALUES ('27', '7', '3', '9');
INSERT INTO `usernowequ` VALUES ('28', '7', '4', '11');
INSERT INTO `usernowequ` VALUES ('29', '8', '1', '1');
INSERT INTO `usernowequ` VALUES ('30', '8', '2', '7');
INSERT INTO `usernowequ` VALUES ('31', '8', '3', '9');
INSERT INTO `usernowequ` VALUES ('32', '8', '4', '11');
INSERT INTO `usernowequ` VALUES ('33', '9', '1', '1');
INSERT INTO `usernowequ` VALUES ('34', '9', '2', '7');
INSERT INTO `usernowequ` VALUES ('35', '9', '3', '9');
INSERT INTO `usernowequ` VALUES ('36', '9', '4', '11');
INSERT INTO `usernowequ` VALUES ('37', '10', '4', '11');
INSERT INTO `usernowequ` VALUES ('38', '10', '1', '1');
INSERT INTO `usernowequ` VALUES ('39', '10', '2', '7');
INSERT INTO `usernowequ` VALUES ('40', '10', '3', '9');
-- ----------------------------
-- Table structure for userpeople
-- ----------------------------
DROP TABLE IF EXISTS `userpeople`;
CREATE TABLE `userpeople` (
  `upeo_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_id` int(20) NOT NULL,
  `peo_id` int(20) NOT NULL,
  `userpeo_lev` int(10) NOT NULL,
  `userpeo_arrt` varchar(30) NOT NULL,
  `upeo_time` datetime NOT NULL,
  `upeo_dress` int(10) NOT NULL,
  PRIMARY KEY (`upeo_id`),
  KEY `u_id` (`u_id`),
  KEY `peo_id` (`peo_id`),
  CONSTRAINT `userpeople_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `user` (`u_id`),
  CONSTRAINT `userpeople_ibfk_2` FOREIGN KEY (`peo_id`) REFERENCES `people` (`peo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userpeople
-- ----------------------------
INSERT INTO `userpeople` VALUES ('3', 'abc', '1', '12', 'wa', '2016-12-05 09:21:58', '1');

-- ----------------------------
-- Table structure for viprule
-- ----------------------------
DROP TABLE IF EXISTS `viprule`;
CREATE TABLE `viprule` (
  `vr_id` int(10) NOT NULL AUTO_INCREMENT,
  `vr_lev` varchar(20) NOT NULL,
  `vr_limit` int(20) NOT NULL,
  PRIMARY KEY (`vr_id`),
  KEY `vr_id` (`vr_id`),
  UNIQUE (vr_lev)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of viprule
-- ----------------------------
INSERT INTO `viprule` VALUES ('1', '普通玩家', '0');
INSERT INTO `viprule` VALUES ('2', '会员1级', '500');
INSERT INTO `viprule` VALUES ('3', '会员2级', '1000');
INSERT INTO `viprule` VALUES ('4', '会员3级', '1200');
INSERT INTO `viprule` VALUES ('5', '会员4级', '3000');
INSERT INTO `viprule` VALUES ('6', '史诗会员', '1000000');
INSERT INTO `viprule` VALUES ('7', '穷逼会员', '123');

/*
Navicat MySQL Data Transfer

Source Server         : repairSys
Source Server Version : 50615
Source Host           : qnear.org:3306
Source Database       : csm_d

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2014-10-08 22:37:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for csm_complain
-- ----------------------------
DROP TABLE IF EXISTS `csm_complain`;
CREATE TABLE `csm_complain` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `repair_id` int(11) DEFAULT NULL COMMENT '保修单id',
  `content` varchar(255) DEFAULT NULL COMMENT '投诉内容',
  `op_status` int(11) DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改的时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_21` (`repair_id`),
  CONSTRAINT `fk_reference_21` FOREIGN KEY (`repair_id`) REFERENCES `csm_repairlist` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='投诉表';

-- ----------------------------
-- Table structure for csm_pictures
-- ----------------------------
DROP TABLE IF EXISTS `csm_pictures`;
CREATE TABLE `csm_pictures` (
  `t_id` int(11) NOT NULL COMMENT '表ID',
  `path` varchar(255) DEFAULT NULL COMMENT '图片路径',
  `repair_id` int(11) DEFAULT NULL COMMENT '报修单id',
  `name` varchar(255) DEFAULT NULL COMMENT '图片名称',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态（0表示删除，1表示正常）',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `index_path` (`path`),
  KEY `csm_pictures_ibfk_1` (`repair_id`),
  CONSTRAINT `csm_pictures_ibfk_1` FOREIGN KEY (`repair_id`) REFERENCES `csm_repairlist` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='图片表';

-- ----------------------------
-- Table structure for csm_problem
-- ----------------------------
DROP TABLE IF EXISTS `csm_problem`;
CREATE TABLE `csm_problem` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `problem` varchar(255) DEFAULT NULL COMMENT '问题名称',
  `status` int(255) DEFAULT '1' COMMENT '状态',
  `project` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `type` int(11) DEFAULT NULL COMMENT '类型 0：通用，1：项目专用，2：自定义',
  `op_status` int(11) DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改的时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=388 DEFAULT CHARSET=utf8 COMMENT='问题表';

-- ----------------------------
-- Table structure for csm_projects
-- ----------------------------
DROP TABLE IF EXISTS `csm_projects`;
CREATE TABLE `csm_projects` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `name` varchar(255) DEFAULT NULL COMMENT '名称(唯一)',
  `no` varchar(255) DEFAULT NULL COMMENT '项目编号',
  `op_status` int(11) DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `index_name` (`name`) COMMENT '项目名唯一',
  UNIQUE KEY `index_no` (`no`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='项目表';

-- ----------------------------
-- Table structure for csm_property_key
-- ----------------------------
DROP TABLE IF EXISTS `csm_property_key`;
CREATE TABLE `csm_property_key` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `name` varchar(255) DEFAULT NULL COMMENT '属性名称',
  `can_visual` tinyint(4) DEFAULT '1' COMMENT '用户是否可见（1表示可见，0表示不可见）',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `index_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COMMENT='设备属性表';

-- ----------------------------
-- Table structure for csm_property_value
-- ----------------------------
DROP TABLE IF EXISTS `csm_property_value`;
CREATE TABLE `csm_property_value` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `pud_id` int(11) DEFAULT NULL COMMENT '项目单位_设备id',
  `key_id` int(11) NOT NULL COMMENT '属性id',
  `value` varchar(255) DEFAULT NULL COMMENT '属性值',
  `name` varchar(255) NOT NULL,
  `op_status` int(11) DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_22` (`pud_id`),
  KEY `fk_reference_23` (`key_id`),
  CONSTRAINT `fk_reference_23` FOREIGN KEY (`key_id`) REFERENCES `csm_property_key` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_22` FOREIGN KEY (`pud_id`) REFERENCES `csm_pro_unit_devices` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='设备信息表';

-- ----------------------------
-- Table structure for csm_pro_prb_ref
-- ----------------------------
DROP TABLE IF EXISTS `csm_pro_prb_ref`;
CREATE TABLE `csm_pro_prb_ref` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `pro_id` int(11) DEFAULT NULL COMMENT '项目id',
  `prb_id` int(11) DEFAULT NULL COMMENT '问题id',
  `op_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `op_status` int(11) DEFAULT NULL COMMENT '操作状态',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_prb` (`prb_id`),
  KEY `fk_reference_pro` (`pro_id`),
  CONSTRAINT `fk_reference_pro` FOREIGN KEY (`pro_id`) REFERENCES `csm_projects` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_prb` FOREIGN KEY (`prb_id`) REFERENCES `csm_problem` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='问题项目关系表';

-- ----------------------------
-- Table structure for csm_pro_sale_ref
-- ----------------------------
DROP TABLE IF EXISTS `csm_pro_sale_ref`;
CREATE TABLE `csm_pro_sale_ref` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `pro_id` int(11) DEFAULT NULL COMMENT '项目id',
  `user_id` int(11) DEFAULT NULL COMMENT '用户id',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_5` (`pro_id`),
  KEY `fk_reference_6` (`user_id`),
  CONSTRAINT `fk_reference_6` FOREIGN KEY (`user_id`) REFERENCES `csm_user` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_5` FOREIGN KEY (`pro_id`) REFERENCES `csm_projects` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='项目_业务员关系表';

-- ----------------------------
-- Table structure for csm_pro_unit_devices
-- ----------------------------
DROP TABLE IF EXISTS `csm_pro_unit_devices`;
CREATE TABLE `csm_pro_unit_devices` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `prounit_id` int(11) DEFAULT NULL COMMENT '项目单位关系id',
  `no` varchar(255) DEFAULT NULL COMMENT '设备编号',
  `name` varchar(255) DEFAULT NULL COMMENT '设备名称',
  `starttime` varchar(255) DEFAULT NULL,
  `warranty` int(11) DEFAULT NULL COMMENT '保修期（单位：年）',
  `op_status` int(11) NOT NULL COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `cdkey` varchar(255) DEFAULT NULL COMMENT '设备序列号',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  `status` bigint(20) NOT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `unique_no` (`no`) USING BTREE,
  KEY `fk_reference_14` (`prounit_id`),
  CONSTRAINT `fk_reference_14` FOREIGN KEY (`prounit_id`) REFERENCES `csm_pro_unit_ref` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='项目单位—设备表';

-- ----------------------------
-- Table structure for csm_pro_unit_ref
-- ----------------------------
DROP TABLE IF EXISTS `csm_pro_unit_ref`;
CREATE TABLE `csm_pro_unit_ref` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `unit_id` int(11) DEFAULT NULL COMMENT '单位id',
  `pro_id` int(11) DEFAULT NULL COMMENT '项目id',
  `op_status` int(11) DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_11` (`unit_id`),
  KEY `fk_reference_12` (`pro_id`),
  CONSTRAINT `fk_reference_12` FOREIGN KEY (`pro_id`) REFERENCES `csm_projects` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_11` FOREIGN KEY (`unit_id`) REFERENCES `csm_units` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='项目_单位表关系表';

-- ----------------------------
-- Table structure for csm_repairlist
-- ----------------------------
DROP TABLE IF EXISTS `csm_repairlist`;
CREATE TABLE `csm_repairlist` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `phone` varchar(255) DEFAULT NULL COMMENT '报修联系人电话号码',
  `name` varchar(255) DEFAULT NULL COMMENT '报修联系人姓名',
  `user_id` int(11) DEFAULT NULL COMMENT '报修人id',
  `project_name` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `unit_name` varchar(255) DEFAULT NULL COMMENT '单位名称',
  `repair_time` timestamp NULL DEFAULT NULL COMMENT '报修时间',
  `device_no` varchar(255) DEFAULT NULL COMMENT '设备编号',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  `complain_status` int(11) DEFAULT '0' COMMENT '投诉状态',
  `allot_status` int(11) DEFAULT '0' COMMENT '分配员确认状态',
  `engineer_status` int(11) DEFAULT '0' COMMENT '工程师确认状态',
  `op_status` int(11) DEFAULT '1' COMMENT '操作状态',
  `op_time` timestamp NULL DEFAULT NULL COMMENT '最终修改的时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `user_id_fk` (`user_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `csm_user` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8 COMMENT='报修单表';

-- ----------------------------
-- Table structure for csm_repair_engineer_ref
-- ----------------------------
DROP TABLE IF EXISTS `csm_repair_engineer_ref`;
CREATE TABLE `csm_repair_engineer_ref` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `repair_id` int(11) DEFAULT NULL COMMENT '报修单id',
  `engineer_id` int(11) DEFAULT NULL COMMENT '工程师id',
  `is_modified` tinyint(4) DEFAULT NULL COMMENT '是否允许填写进度表',
  `get_time` timestamp NULL DEFAULT NULL COMMENT '分配任务的时间',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_17` (`repair_id`),
  KEY `fk_reference_18` (`engineer_id`),
  CONSTRAINT `fk_reference_18` FOREIGN KEY (`engineer_id`) REFERENCES `csm_user` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_17` FOREIGN KEY (`repair_id`) REFERENCES `csm_repairlist` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='报修单—工程师关系表';

-- ----------------------------
-- Table structure for csm_repair_problem_ref
-- ----------------------------
DROP TABLE IF EXISTS `csm_repair_problem_ref`;
CREATE TABLE `csm_repair_problem_ref` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `repair_id` int(11) DEFAULT NULL COMMENT '保修单id',
  `problem_id` int(11) DEFAULT NULL COMMENT '问题id',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改的时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_15` (`repair_id`),
  KEY `fk_reference_16` (`problem_id`),
  CONSTRAINT `fk_reference_16` FOREIGN KEY (`problem_id`) REFERENCES `csm_problem` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_15` FOREIGN KEY (`repair_id`) REFERENCES `csm_repairlist` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8 COMMENT='报修单_问题关系表';

-- ----------------------------
-- Table structure for csm_role_permission
-- ----------------------------
DROP TABLE IF EXISTS `csm_role_permission`;
CREATE TABLE `csm_role_permission` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `name` varchar(255) DEFAULT NULL COMMENT '角色名',
  `type` int(11) DEFAULT NULL COMMENT '类型',
  `status` int(11) DEFAULT NULL COMMENT '状态',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COMMENT='角色和权限表';

-- ----------------------------
-- Table structure for csm_r_p_ref
-- ----------------------------
DROP TABLE IF EXISTS `csm_r_p_ref`;
CREATE TABLE `csm_r_p_ref` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `r_id` int(11) DEFAULT NULL COMMENT '角色id',
  `p_id` int(11) DEFAULT NULL COMMENT '权限id',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_2` (`r_id`),
  KEY `fk_reference_7` (`p_id`),
  CONSTRAINT `fk_reference_7` FOREIGN KEY (`p_id`) REFERENCES `csm_role_permission` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_2` FOREIGN KEY (`r_id`) REFERENCES `csm_role_permission` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='角色权限关系表';

-- ----------------------------
-- Table structure for csm_schedule
-- ----------------------------
DROP TABLE IF EXISTS `csm_schedule`;
CREATE TABLE `csm_schedule` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `repair_engineer_id` int(11) DEFAULT NULL COMMENT '保修—工程师关系id',
  `scheduletime` timestamp NULL DEFAULT NULL COMMENT '进度填写时间',
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_20` (`repair_engineer_id`),
  CONSTRAINT `fk_reference_20` FOREIGN KEY (`repair_engineer_id`) REFERENCES `csm_repair_engineer_ref` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='工程师进度表';

-- ----------------------------
-- Table structure for csm_units
-- ----------------------------
DROP TABLE IF EXISTS `csm_units`;
CREATE TABLE `csm_units` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id(单位号)',
  `name` varchar(255) DEFAULT NULL COMMENT '单位名称',
  `status` int(11) DEFAULT '1' COMMENT '状态',
  `can_register` int(11) DEFAULT '1' COMMENT '是否允许注册',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态(0表示删除，1表示正常)',
  `op_time` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  `manager_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  UNIQUE KEY `index_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10143 DEFAULT CHARSET=utf8 COMMENT='单位表';

-- ----------------------------
-- Table structure for csm_user
-- ----------------------------
DROP TABLE IF EXISTS `csm_user`;
CREATE TABLE `csm_user` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '表id',
  `role_id` int(11) DEFAULT NULL COMMENT '角色id',
  `unit_id` int(11) DEFAULT NULL COMMENT '单位id',
  `account` varchar(255) DEFAULT NULL COMMENT '账号',
  `pwd` varchar(255) DEFAULT '123456' COMMENT '密码',
  `name` varchar(255) DEFAULT NULL COMMENT '用户名',
  `phone` varchar(255) DEFAULT NULL COMMENT '电话号码',
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '状态\r\n            （\r\n               0：禁用\r\n               1：激活\r\n            ）',
  `op_status` int(11) NOT NULL DEFAULT '1' COMMENT '操作状态',
  `op_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP COMMENT '最终修改时间',
  `add1` varchar(255) DEFAULT NULL,
  `add2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`t_id`),
  KEY `fk_reference_24` (`unit_id`),
  KEY `fk_reference_9` (`role_id`),
  CONSTRAINT `fk_reference_9` FOREIGN KEY (`role_id`) REFERENCES `csm_role_permission` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reference_24` FOREIGN KEY (`unit_id`) REFERENCES `csm_units` (`t_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7023 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- View structure for v_all_user
-- ----------------------------
DROP VIEW IF EXISTS `v_all_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_all_user` AS select `u`.`account` AS `account`,`u`.`name` AS `username`,`u`.`phone` AS `phone`,`u`.`role_id` AS `roleid`,`rp`.`name` AS `rolename`,`u`.`status` AS `status` from (`csm_user` `u` join `csm_role_permission` `rp`) where (`u`.`role_id` = `rp`.`t_id`) order by `u`.`t_id` desc ;

-- ----------------------------
-- View structure for v_csm_devicesmanager_project
-- ----------------------------
DROP VIEW IF EXISTS `v_csm_devicesmanager_project`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_csm_devicesmanager_project` AS select distinct `a`.`name` AS `name`,`c`.`name` AS `uname`,`d`.`t_id` AS `prounit_id`,`d`.`no` AS `no` from (((`csm_projects` `a` join `csm_pro_unit_ref` `b`) join `csm_units` `c`) join `csm_pro_unit_devices` `d`) where ((`a`.`t_id` = `b`.`pro_id`) and (`b`.`pro_id` = `a`.`t_id`) and (`c`.`t_id` = `b`.`unit_id`) and (`d`.`prounit_id` = `b`.`t_id`) and (`a`.`op_status` = 1) and (`b`.`op_status` = 1) and (`c`.`op_status` = 1) and (`d`.`op_status` = 1)) order by `a`.`t_id` desc ;

-- ----------------------------
-- View structure for v_device_project_unit
-- ----------------------------
DROP VIEW IF EXISTS `v_device_project_unit`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_device_project_unit` AS select `csm_pro_unit_devices`.`no` AS `device_id`,`csm_pro_unit_devices`.`name` AS `device_name`,`csm_projects`.`name` AS `project_name`,`csm_units`.`name` AS `unit_name`,`csm_units`.`status` AS `unit_status` from (((`csm_pro_unit_devices` join `csm_pro_unit_ref` on((`csm_pro_unit_devices`.`prounit_id` = `csm_pro_unit_ref`.`t_id`))) join `csm_units` on((`csm_pro_unit_ref`.`unit_id` = `csm_units`.`t_id`))) join `csm_projects` on((`csm_pro_unit_ref`.`pro_id` = `csm_projects`.`t_id`))) order by `device_id` ;

-- ----------------------------
-- View structure for v_device_property
-- ----------------------------
DROP VIEW IF EXISTS `v_device_property`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_device_property` AS select `v`.`t_id` AS `t_id`,`v`.`pud_id` AS `P_id`,`k`.`name` AS `name`,`v`.`value` AS `value`,`k`.`can_visual` AS `can_visual`,`d`.`no` AS `no` from ((`csm_property_key` `k` join `csm_property_value` `v`) join `csm_pro_unit_devices` `d`) where ((`v`.`key_id` = `k`.`t_id`) and (`v`.`pud_id` = `d`.`t_id`)) ;

-- ----------------------------
-- View structure for v_pojmgr_eqmppt
-- ----------------------------
DROP VIEW IF EXISTS `v_pojmgr_eqmppt`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_pojmgr_eqmppt` AS select `csm_property_key`.`t_id` AS `epk_id`,`csm_property_key`.`name` AS `ppt_key`,`csm_property_value`.`t_id` AS `epv_id`,`csm_property_value`.`value` AS `ppt_value`,`csm_property_value`.`op_time` AS `op_time`,`csm_property_value`.`pud_id` AS `pud_id` from ((`csm_property_key` join `csm_property_value`) join `csm_pro_unit_devices`) where ((`csm_property_key`.`op_status` = 1) and (`csm_property_value`.`op_status` = 1) and (`csm_pro_unit_devices`.`op_status` = 1) and (`csm_property_key`.`can_visual` = 1) and (`csm_property_value`.`key_id` = `csm_property_key`.`t_id`)) ;

-- ----------------------------
-- View structure for v_pojmgr_pojlist
-- ----------------------------
DROP VIEW IF EXISTS `v_pojmgr_pojlist`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_pojmgr_pojlist` AS select `csm_user`.`t_id` AS `userid`,`csm_projects`.`t_id` AS `proid`,`csm_pro_sale_ref`.`t_id` AS `puid`,group_concat(`csm_user`.`name` separator ',') AS `salesman`,`csm_projects`.`name` AS `name`,`csm_projects`.`no` AS `num`,`csm_projects`.`op_time` AS `poptime`,`csm_pro_sale_ref`.`op_time` AS `psoptime` from ((`csm_user` join `csm_projects`) join `csm_pro_sale_ref`) where ((`csm_user`.`t_id` = `csm_pro_sale_ref`.`user_id`) and (`csm_projects`.`t_id` = `csm_pro_sale_ref`.`pro_id`) and (`csm_projects`.`op_status` = 1) and (`csm_pro_sale_ref`.`op_status` = 1) and (`csm_user`.`role_id` = 8)) group by `csm_projects`.`t_id` ;

-- ----------------------------
-- View structure for v_pojmgr_pu
-- ----------------------------
DROP VIEW IF EXISTS `v_pojmgr_pu`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_pojmgr_pu` AS select `csm_pro_unit_ref`.`t_id` AS `puid`,`csm_projects`.`t_id` AS `pid`,`csm_projects`.`name` AS `pname`,`csm_projects`.`no` AS `pnum`,`csm_units`.`t_id` AS `uid`,`csm_units`.`name` AS `uname`,`csm_pro_unit_ref`.`op_time` AS `optime` from ((`csm_projects` join `csm_units`) join `csm_pro_unit_ref`) where ((`csm_projects`.`t_id` = `csm_pro_unit_ref`.`pro_id`) and (`csm_units`.`t_id` = `csm_pro_unit_ref`.`unit_id`) and (`csm_pro_unit_ref`.`op_status` = 1)) ;

-- ----------------------------
-- View structure for v_pojmgr_sm
-- ----------------------------
DROP VIEW IF EXISTS `v_pojmgr_sm`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_pojmgr_sm` AS select `csm_user`.`t_id` AS `id`,`csm_user`.`name` AS `name` from `csm_user` where (`csm_user`.`role_id` = 8) ;

-- ----------------------------
-- View structure for v_repair_order
-- ----------------------------
DROP VIEW IF EXISTS `v_repair_order`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_repair_order` AS select `csm_repairlist`.`t_id` AS `order_id`,`csm_repairlist`.`unit_name` AS `unit_name`,`csm_repairlist`.`repair_time` AS `repair_time`,`csm_user`.`name` AS `csa`,`csm_repairlist`.`project_name` AS `project_name`,`csm_pro_unit_devices`.`name` AS `device_name`,`csm_repairlist`.`device_no` AS `device_no`,`csm_repairlist`.`name` AS `name`,`csm_repairlist`.`phone` AS `phone` from ((`csm_repairlist` join `csm_user`) join `csm_pro_unit_devices`) where ((`csm_user`.`t_id` = `csm_repairlist`.`user_id`) and (`csm_pro_unit_devices`.`no` = `csm_repairlist`.`device_no`)) order by `order_id` ;

-- ----------------------------
-- View structure for v_units_user
-- ----------------------------
DROP VIEW IF EXISTS `v_units_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_units_user` AS select `csm_units`.`t_id` AS `t_id`,`csm_units`.`name` AS `name`,`csm_units`.`status` AS `status`,`csm_user`.`account` AS `account`,`csm_user`.`phone` AS `phone` from (`csm_units` join `csm_user` on((`csm_user`.`unit_id` = `csm_units`.`t_id`))) where (`csm_units`.`op_status` = 1) ;

-- ----------------------------
-- View structure for v_unit_pj
-- ----------------------------
DROP VIEW IF EXISTS `v_unit_pj`;
CREATE ALGORITHM=UNDEFINED DEFINER=`csm_d`@`%` SQL SECURITY DEFINER VIEW `v_unit_pj` AS select `csm_user`.`t_id` AS `user_id`,`csm_units`.`t_id` AS `unit_id`,`csm_projects`.`t_id` AS `pj_id`,`csm_pro_unit_ref`.`t_id` AS `pj_unit_id`,`csm_projects`.`name` AS `project_name`,`csm_projects`.`no` AS `project_no`,`csm_projects`.`op_status` AS `project_op_stauts`,`csm_pro_unit_ref`.`op_status` AS `pro_unit_op_status` from (((`csm_units` join `csm_pro_unit_ref` on((`csm_pro_unit_ref`.`unit_id` = `csm_units`.`t_id`))) join `csm_projects` on((`csm_pro_unit_ref`.`pro_id` = `csm_projects`.`t_id`))) join `csm_user` on((`csm_user`.`unit_id` = `csm_units`.`t_id`))) where ((`csm_pro_unit_ref`.`unit_id` = `csm_units`.`t_id`) and (`csm_pro_unit_ref`.`pro_id` = `csm_projects`.`t_id`) and (`csm_user`.`unit_id` = `csm_units`.`t_id`) and (`csm_user`.`role_id` = 4)) ;

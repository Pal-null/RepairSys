drop table if exists csm_schedule;

drop table if exists csm_repair_problem_ref;

drop table if exists csm_repair_engineer_ref;

drop table if exists csm_r_p_ref;

drop table if exists csm_pro_sale_ref;

drop table if exists csm_complain;

drop table if exists csm_repairlist;

drop table if exists csm_property_value;

drop table if exists csm_pro_unit_devices;

drop table if exists csm_pro_unit_ref;

drop table if exists csm_property_key;

drop table if exists csm_problem;

drop table if exists csm_projects;

drop table if exists csm_units;

drop table if exists csm_user;

drop table if exists csm_role_permission;

create table csm_complain
(
   t_id                 int not null auto_increment comment '表id',
   repair_id             int comment '保修单id',
   content              varchar(255) comment '投诉内容',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改的时间',
   primary key (t_id)
);

alter table csm_complain comment '投诉表';


create table csm_problem
(
   t_id                 int not null auto_increment comment '表id',
   problem              varchar(255) comment '问题名称',
   status               varchar(255) comment '状态',
   project              varchar(255) comment '项目名称',
   type                 int comment '类型 ',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改的时间',
   primary key (t_id)
);

alter table csm_problem comment '问题表';

create table csm_projects
(
   t_id                 int not null auto_increment comment '表id',
   name                 varchar(255) comment '名称',
   no                   varchar(255) comment '项目编号',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_projects comment '项目表';

create table csm_property_key
(
   t_id                 int not null auto_increment comment '表id',
   name                 varchar(255) comment '属性名称',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最后修改时间',
   primary key (t_id)
);

alter table csm_property_key comment '设备属性表';


create table csm_property_value
(
   t_id                 int not null auto_increment comment '表id',
   pud_id               int comment '项目单位_设备id',
   key_id               int comment '属性id',
   value                varchar(255) comment '属性值',
   can_visual           tinyint comment '属性是否用户可见',
   op_status            int comment '操作属性',
   op_time              timestamp comment '最后修改时间',
   primary key (t_id)
);

alter table csm_property_value comment '设备信息表';


create table csm_pro_sale_ref
(
   t_id                 int not null auto_increment comment '表id',
   pro_id               int comment '项目id',
   user_id              int comment '用户id',
   op_status            int not null comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_pro_sale_ref comment '项目_业务员关系表';


create table csm_pro_unit_devices
(
   t_id                 int not null auto_increment comment '表id',
   prounit_id           int comment '项目单位关系id',
   no                   varchar(255) comment '设备编号',
   name                 varchar(255) comment '设备名称',
   starttime            timestamp comment '保修起始时间',
   warranty             int comment '保修期（单位：年）',
   op_status            int comment '操作类型',
   op_time              timestamp comment '最后修改时间',
   cdkey                varchar(255) comment '设备序列号',
   primary key (t_id)
);

alter table csm_pro_unit_devices comment '项目单位—设备表';


create table csm_pro_unit_ref
(
   t_id                 int not null auto_increment comment '表id',
   unit_id              int comment '单位id',
   pro_id               int comment '项目id',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最后修改时间',
   primary key (t_id)
);

alter table csm_pro_unit_ref comment '项目_单位表关系表';


create table csm_repairlist
(
   t_id                 int not null auto_increment comment '表id',
   phone                varchar(255) comment '报修联系人电话号码',
   name                 varchar(255) comment '报修联系人姓名',
   user_id              int comment '报修人id',
   project_name         varchar(255) comment '项目名称',
   unit_name            varchar(255) comment '单位名称',
   repair_time          timestamp comment '报修时间',
   device_no            varchar(255) comment '设备编号',
   status               int comment '状态',
   complain_status      varchar(255) comment '投诉状态',
   allot_status         varchar(255) comment '分配员确认状态',
   engineer_status      varchar(255) comment '工程师确认状态',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改的时间',
   primary key (t_id)
);

alter table csm_repairlist comment '报修单表';


create table csm_repair_engineer_ref
(
   t_id                 int not null auto_increment comment '表id',
   repair_id            int comment '报修单id',
   engineer_id          int comment '工程师id',
   is_modified          tinyint comment '是否允许填写进度表',
   get_time             timestamp comment '分配任务的时间',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_repair_engineer_ref comment '报修单—工程师关系表';


create table csm_repair_problem_ref
(
   t_id                 int not null auto_increment comment '表id',
   repair_id            int comment '保修单id',
   problem_id           int comment '问题id',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改的时间',
   primary key (t_id)
);

alter table csm_repair_problem_ref comment '报修单_问题关系表';


create table csm_role_permission
(
   t_id                 int not null auto_increment comment '表id',
   name                 varchar(255) comment '角色名',
   type                 int comment '类型',
   status               int comment '状态',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_role_permission comment '角色和权限表';


create table csm_r_p_ref
(
   t_id                 int not null auto_increment comment '表id',
   r_id                 int comment '角色id',
   p_id                 int comment '权限id',
   op_status            int not null comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_r_p_ref comment '角色权限关系表';


create table csm_schedule
(
   t_id                 int not null auto_increment comment '表id',
   repair_engineer_id   int comment '保修—工程师关系id',
   scheduletime         timestamp comment '进度填写时间',
   content              varchar(255) comment '内容',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_schedule comment '工程师进度表';

create table csm_units
(
   t_id                 int not null auto_increment comment '表id',
   manager_id           int comment '管理员id',
   name                 varchar(255) comment '单位名称',
   no                   int comment '单位号',
   status               int comment '状态',
   can_register         tinyint comment '是否允许注册',
   op_status            int comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_units comment '单位表';


create table csm_user
(
   t_id                 int not null auto_increment comment '表id',
   role_id              int comment '角色id',
   unit_id              int comment '单位id',
   account              varchar(255) comment '账号',
   pwd                  varchar(255) comment '密码',
   name                 varchar(255) comment '用户名',
   phone                int comment '电话号码',
   status               int not null comment '状态
            （
               0：禁用
               1：激活
            ）',
   op_status            int not null comment '操作状态',
   op_time              timestamp comment '最终修改时间',
   primary key (t_id)
);

alter table csm_user comment '用户表';

alter table csm_complain add constraint fk_reference_21 foreign key (repair_id)
      references csm_repairlist (t_id) on delete restrict on update restrict;

alter table csm_property_value add constraint fk_reference_22 foreign key (pud_id)
      references csm_pro_unit_devices (t_id) on delete restrict on update restrict;

alter table csm_property_value add constraint fk_reference_23 foreign key (key_id)
      references csm_property_key (t_id) on delete restrict on update restrict;

alter table csm_pro_sale_ref add constraint fk_reference_5 foreign key (pro_id)
      references csm_projects (t_id) on delete restrict on update restrict;

alter table csm_pro_sale_ref add constraint fk_reference_6 foreign key (user_id)
      references csm_user (t_id) on delete restrict on update restrict;

alter table csm_pro_unit_devices add constraint fk_reference_14 foreign key (prounit_id)
      references csm_pro_unit_ref (t_id) on delete restrict on update restrict;

alter table csm_pro_unit_ref add constraint fk_reference_11 foreign key (unit_id)
      references csm_units (t_id) on delete restrict on update restrict;

alter table csm_pro_unit_ref add constraint fk_reference_12 foreign key (pro_id)
      references csm_projects (t_id) on delete restrict on update restrict;

alter table csm_repair_engineer_ref add constraint fk_reference_17 foreign key (repair_id)
      references csm_repairlist (t_id) on delete restrict on update restrict;

alter table csm_repair_engineer_ref add constraint fk_reference_18 foreign key (engineer_id)
      references csm_user (t_id) on delete restrict on update restrict;

alter table csm_repair_problem_ref add constraint fk_reference_15 foreign key (repair_id)
      references csm_repairlist (t_id) on delete restrict on update restrict;

alter table csm_repair_problem_ref add constraint fk_reference_16 foreign key (problem_id)
      references csm_problem (t_id) on delete restrict on update restrict;

alter table csm_r_p_ref add constraint fk_reference_2 foreign key (r_id)
      references csm_role_permission (t_id) on delete restrict on update restrict;

alter table csm_r_p_ref add constraint fk_reference_7 foreign key (p_id)
      references csm_role_permission (t_id) on delete restrict on update restrict;

alter table csm_schedule add constraint fk_reference_20 foreign key (repair_engineer_id)
      references csm_repair_engineer_ref (t_id) on delete restrict on update restrict;

alter table csm_units add constraint fk_reference_10 foreign key (manager_id)
      references csm_user (t_id) on delete restrict on update restrict;

alter table csm_user add constraint fk_reference_24 foreign key (unit_id)
      references csm_units (t_id) on delete restrict on update restrict;

alter table csm_user add constraint fk_reference_9 foreign key (role_id)
      references csm_role_permission (t_id) on delete restrict on update restrict;


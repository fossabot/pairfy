#!/bin/sh


mysql -u root -ppassword

DROP DATABASE service_gateway;
DROP DATABASE service_product;

CREATE DATABASE service_product;

use service_product;

create table if not exists events(
  id varchar(50) not null,
  event_type varchar(100) not null,
  published boolean default false,
  payload mediumtext not null,
  agent_id varchar(50) default null,
  created_at timestamp default current_timestamp,
  primary key(id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;


CREATE DATABASE service_product;

use service_product;

create table if not exists products(
  id varchar(20) not null,
  seller_id varchar(20) not null,
  name varchar(200) not null,
  price int unsigned default 0,
  collateral int unsigned default 0,
  sku varchar(100) not null,
  model varchar(200) not null,
  brand varchar(200) not null,
  features mediumtext not null,
  category varchar(100) not null,
  keywords varchar(100) not null,
  stock boolean not null,
  color varchar(100) not null,
  color_name varchar(100) default "",
  quality varchar(50) not null,
  country varchar(10) not null,
  moderated boolean default false,
  visible boolean default true,
  media_url varchar(255) not null,
  image_path varchar(255) not null,
  video_path varchar(255) not null,
  image_set varchar(500) not null,
  video_set varchar(500) not null,
  discount boolean default false,
  discount_value int unsigned default 0,
  created_at timestamp default current_timestamp,
  schema_t timestamp default current_timestamp,
  schema_v int unsigned not null,
  primary key(id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;


CREATE DATABASE service_gateway;

use service_gateway;

create table if not exists processed(
  id varchar(50) not null,
  event_type varchar(100) not null,
  processed boolean not null,
  created_at timestamp default current_timestamp,
  primary key(id)
) ENGINE=InnoDB;


CREATE DATABASE service_gateway;

use service_gateway;

create table if not exists products(
  id varchar(20) not null,
  seller_id varchar(20) not null,
  name varchar(200) not null,
  price int unsigned default 0,
  collateral int unsigned default 0,
  sku varchar(100) not null,
  model varchar(200) not null,
  brand varchar(200) not null,
  features mediumtext not null,
  category varchar(100) not null,
  keywords varchar(100) not null,
  stock boolean not null,
  color varchar(100) not null,
  color_name varchar(100) default "",
  quality varchar(50) not null,
  country varchar(10) not null,
  moderated boolean default false,
  visible boolean default true,
  media_url varchar(255) not null,
  image_path varchar(255) not null,
  video_path varchar(255) not null,
  image_set varchar(500) not null,
  video_set varchar(500) not null,
  discount boolean default false,
  discount_value int unsigned default 0,
  created_at timestamp default current_timestamp,
  schema_t timestamp default current_timestamp,
  schema_v int unsigned not null,
  primary key(id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB;







use service_gateway;
SELECT COUNT(*) AS total FROM products;


GRANT ALL PRIVILEGES ON *.* TO 'marketplace'@'%';

GRANT CREATE, ALTER, DROP, INDEX, CREATE TEMPORARY TABLES, LOCK TABLES, REFERENCES ON *.* TO 'marketplace'@'%';

GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'marketplace'@'%';

ALTER USER 'marketplace'@'%' IDENTIFIED BY 'password';


SELECT variable_value as "BINARY LOGGING STATUS (log-bin) ::"
FROM performance_schema.global_variables WHERE variable_name='log_bin';


FLUSH PRIVILEGES;



SET GLOBAL max_connections = 100000;

SET GLOBAL binlog_expire_logs_seconds = 604800;

SET GLOBAL thread_cache_size = 600;

SET GLOBAL innodb_buffer_pool_size = 10000000000;

SET GLOBAL innodb_log_buffer_size = 500000000;

SET GLOBAL innodb_flush_log_at_trx_commit = 2;

SET GLOBAL innodb_io_capacity = 4000;

SET GLOBAL tmp_table_size = 250000000;

SET GLOBAL max_heap_table_size = 250000000;

SET GLOBAL max_allowed_packet = 64000000;

SET GLOBAL net_buffer_length = 64000;
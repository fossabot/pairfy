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
  INDEX idx_created_at (created_at),
  INDEX idx_seller_id (seller_id)
) ENGINE=InnoDB;


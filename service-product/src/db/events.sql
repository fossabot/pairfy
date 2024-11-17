CREATE DATABASE service_product;

use service_product;

create table if not exists events(
  id varchar(50) not null,
  event_type varchar(100) not null,
  published boolean default false,
  payload mediumtext not null,
  agent_id varchar(50) default null,
  created_at timestamp default current_timestamp,
  primary key(id)
) ENGINE=InnoDB;


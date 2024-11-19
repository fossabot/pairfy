CREATE DATABASE service_gateway;

use service_gateway;

create table if not exists processed(
  id varchar(50) not null,
  event_type varchar(100) not null,
  processed boolean not null,
  created_at timestamp default current_timestamp,
  primary key(id)
) ENGINE=InnoDB;


CREATE DATABASE service_gateway;

use service_gateway;

create table if not exists books(
  id varchar(50) not null,
  product_sku varchar(100) not null,
  product_stock bigint default 0,
  ready_stock bigint default 0,
  blocked_orders bigint default 0,
  created_at timestamp default current_timestamp,
  primary key(id),
  KEY idx_product_sku (product_sku)
) ENGINE=InnoDB;


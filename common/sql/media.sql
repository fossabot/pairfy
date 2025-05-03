CREATE TABLE IF NOT EXISTS media (
  id VARCHAR(100) PRIMARY KEY,
  product_id varchar(100) not null,
  type ENUM('image', 'video') NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  alt_text VARCHAR(255),
  resolutions JSON NOT NULL, 
  created_at BIGINT UNSIGNED NOT NULL,
  updated_at BIGINT UNSIGNED NOT NULL,
  schema_v INT UNSIGNED NOT NULL,
  INDEX idx_product_id (product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

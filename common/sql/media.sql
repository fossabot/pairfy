CREATE TABLE IF NOT EXISTS media (
  id VARCHAR(100) PRIMARY KEY,
  media_group_id VARCHAR(100) NOT NULL, 
  agent_id VARCHAR(100) NOT NULL,
  product_id varchar(100) not null,
  mime_type VARCHAR(50), 
  position INT NOT NULL,
  alt_text VARCHAR(255),
  resolutions JSON NOT NULL, 
  created_at BIGINT UNSIGNED NOT NULL,
  updated_at BIGINT UNSIGNED NOT NULL,
  schema_v INT UNSIGNED NOT NULL,
  INDEX idx_product_id (product_id),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

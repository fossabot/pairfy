CREATE TABLE IF NOT EXISTS processed (
  id VARCHAR(100) NOT NULL,
  seq BIGINT NOT NULL,
  type VARCHAR(100) NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at BIGINT UNSIGNED NOT NULL,

  PRIMARY KEY (id),
  INDEX idx_id_processed (id, processed)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_0900_ai_ci;

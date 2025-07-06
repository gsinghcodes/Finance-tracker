CREATE TABLE IF NOT EXISTS reports (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  month VARCHAR(10) NOT NULL, -- e.g., '2025-07'
  total_spent DECIMAL(10, 2) NOT NULL,
  top_category VARCHAR(100),
  overbudget_categories TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

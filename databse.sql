CREATE DATABASE IF NOT EXISTS student_budget_tracker;
USE student_budget_tracker;

CREATE TABLE IF NOT EXISTS students (
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  college_name VARCHAR(100),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(50) NOT NULL,
  category_type VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS monthly_budgets (
  budget_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  month_name VARCHAR(20) NOT NULL,
  year_number INT NOT NULL,
  planned_budget DECIMAL(10,2) NOT NULL,
  notes VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE IF NOT EXISTS transactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  category_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  transaction_type VARCHAR(20) NOT NULL,
  transaction_date DATE NOT NULL,
  description VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES students(student_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE IF NOT EXISTS savings_goals (
  goal_id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  goal_name VARCHAR(100) NOT NULL,
  target_amount DECIMAL(10,2) NOT NULL,
  saved_amount DECIMAL(10,2) DEFAULT 0,
  target_date DATE,
  FOREIGN KEY (student_id) REFERENCES students(student_id)
);

INSERT INTO students (full_name, email, college_name)
VALUES
('Dev Choksi', 'dev@example.com', 'Conestoga College'),
('Jay Dabhi', 'jay@example.com', 'Conestoga College'),
('Jasmine Kaur', 'jas@example.com', 'Conestoga College');

INSERT INTO categories (category_name, category_type)
VALUES
('Part-time Job', 'income'),
('Scholarship', 'income'),
('Rent', 'expense'),
('Food', 'expense'),
('Transport', 'expense'),
('Electricity Bills', 'expense'),
('Fun Activites', 'expense'),
('Education', 'expense');

INSERT INTO monthly_budgets (student_id, month_name, year_number, planned_budget, notes)
VALUES (1, 'June', 2026, 1200.00, 'June student budget');

INSERT INTO transactions (student_id, category_id, amount, transaction_type, transaction_date, description)
VALUES
(1, 1, 1600.00, 'income', '2026-06-01', 'Part-time job income'),
(1, 3, 650.00, 'expense', '2026-06-01', 'Rent'),
(1, 4, 230.00, 'expense', '2026-06-02', 'Groceries'),
(1, 5, 79.00, 'expense', '2026-06-03', 'Bus pass'),
(1, 6, 98.00, 'expense', '2026-06-04', 'Phone bill'),
(1, 7, 100.00, 'expense', '2026-06-05', 'Games'),
(1, 8, 111.00, 'expense', '2026-06-06', 'Books');

INSERT INTO savings_goals (student_id, goal_name, target_amount, saved_amount, target_date)
VALUES (1, 'Emergency Fund', 800.00, 400.00, '2026-12-31');

SELECT * FROM students;
SELECT * FROM categories;
SELECT * FROM monthly_budgets;
SELECT * FROM transactions;
SELECT * FROM savings_goals;
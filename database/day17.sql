--Create Database
CREATE DATABASE day17_db;

USE day17_db;

--Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

--Expenses Table
CREATE TABLE expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    description VARCHAR(255),
    amount DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id)
);

--Insert Users
INSERT INTO users (name, email) VALUES
('Gayathri', 'gayathri@gmail.com'),
('Alex', 'alex@gmail.com');

-- Insert Expenses
INSERT INTO expenses (user_id, description, amount) VALUES
(1, 'Food', 250),
(1, 'Transport', 100),
(2, 'Shopping', 500),
(1, 'Snacks', 50);

--Get all expenses
SELECT * FROM expenses;

--Get expenses for a user
SELECT * FROM expenses
WHERE user_id = 1;

--Total spending/user
SELECT user_id, SUM(amount) AS total_spent
FROM expenses
GROUP BY user_id;

-- Join 
SELECT users.name, expenses.description, expenses.amount
FROM expenses
JOIN users ON expenses.user_id = users.id;

--Order by highest expense
SELECT * FROM expenses
ORDER BY amount DESC;
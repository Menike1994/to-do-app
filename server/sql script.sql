CREATE DATABASE TaskApp;

USE TaskApp;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    UNIQUE (email),
);

CREATE TABLE Tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    ownerId INT,
    status BOOLEAN,
    dueDate DATE,
    FOREIGN KEY (ownerId) REFERENCES Users(id)
);

INSERT INTO Users (email, password) VALUES
('user1@example.com', 'password1'),
('user2@example.com', 'password2'),
('user3@example.com', 'password3');


INSERT INTO Tasks (title, description, ownerId, status, dueDate) VALUES
('Task 1', 'Description for Task 1', 1, TRUE, '2024-04-30'),
('Task 2', 'Description for Task 2', 2, FALSE, '2024-05-05'),
('Task 3', 'Description for Task 3', 3, TRUE, '2024-05-10'),
('Task 4', 'Description for Task 4', 1, TRUE, '2024-04-30');





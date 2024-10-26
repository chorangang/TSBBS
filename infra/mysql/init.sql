CREATE DATABASE IF NOT EXISTS unco_drill_db;
CREATE USER IF NOT EXISTS 'uncodrill'@'%' IDENTIFIED BY 'uncopass';
GRANT ALL PRIVILEGES ON unco_drill_db.* TO 'uncodrill'@'%';
FLUSH PRIVILEGES;

CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Thread (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE
);

CREATE TABLE Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    thread_id INT NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (thread_id) REFERENCES Threads(id) ON DELETE CASCADE
);

-- Users テーブルにデータを挿入
INSERT INTO User (name, email, password, created_at, updated_at) VALUES
('User1', 'user1@example.com', 'P@ssword1', now(), now()),
('User2', 'user2@example.com', 'P@ssword2', now(), now()),
('User3', 'user3@example.com', 'P@ssword3', now(), now()),
('User4', 'user4@example.com', 'P@ssword4', now(), now()),
('User5', 'user5@example.com', 'P@ssword5', now(), now()),
('User6', 'user6@example.com', 'P@ssword6', now(), now()),
('User7', 'user7@example.com', 'P@ssword7', now(), now()),
('User8', 'user8@example.com', 'P@ssword8', now(), now()),
('User9', 'user9@example.com', 'P@ssword9', now(), now()),
('User10', 'user10@example.com', 'P@ssword10', now(), now());

-- Threads テーブルにデータを挿入
INSERT INTO Thread (user_id, title, body, created_at, updated_at) VALUES
(1, 'Thread1 Title', 'Thread1 Body', now(), now()),
(2, 'Thread2 Title', 'Thread2 Body', now(), now()),
(3, 'Thread3 Title', 'Thread3 Body', now(), now()),
(4, 'Thread4 Title', 'Thread4 Body', now(), now()),
(5, 'Thread5 Title', 'Thread5 Body', now(), now()),
(6, 'Thread6 Title', 'Thread6 Body', now(), now()),
(7, 'Thread7 Title', 'Thread7 Body', now(), now()),
(8, 'Thread8 Title', 'Thread8 Body', now(), now()),
(9, 'Thread9 Title', 'Thread9 Body', now(), now()),
(10, 'Thread10 Title', 'Thread10 Body', now(), now());

-- Comments テーブルにデータを挿入
INSERT INTO Comment (user_id, thread_id, body, created_at, updated_at) VALUES
(1, 1, 'Comment1 Body', now(), now()),
(2, 2, 'Comment2 Body', now(), now()),
(3, 3, 'Comment3 Body', now(), now()),
(4, 4, 'Comment4 Body', now(), now()),
(5, 5, 'Comment5 Body', now(), now()),
(6, 6, 'Comment6 Body', now(), now()),
(7, 7, 'Comment7 Body', now(), now()),
(8, 8, 'Comment8 Body', now(), now()),
(9, 9, 'Comment9 Body', now(), now()),
(10, 10, 'Comment10 Body', now(), now());
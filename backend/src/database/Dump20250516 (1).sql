CREATE DATABASE IF NOT EXISTS inovadb;
USE inovadb;

CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `migrations` (`id`, `timestamp`, `name`) VALUES
(1, 1745508112036, 'NewMigrationUserEntity1745508112036'),
(2, 1745522325662, 'AlterColumnUserEntity1745522325662'),
(3, 1746190617945, 'AlterUserTable1746190617945'),
(4, 1746200502538, 'AlterPasswordUserColumn1746200502538');

CREATE TABLE `user` (
  `username` varchar(18) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_78a916df40e02a9deb1c4b75edb` (`username`),
  UNIQUE KEY `UQ_e12875dfb3b1d92d7d7c5377e22` (`email`),
  UNIQUE KEY `UQ_8e1f623798118e629b46a9e6299` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`username`, `email`, `phone`, `id`, `password`) VALUES
('fksldf', 'jdflksa@gmail.com', '423524454', 11, '$2b$08$9HXqgdswKY9BwOJ6azNoqeZ8AAjT1GyQ2B2vmlUGiNLYKXACeOWt.'),
('user1', 'user1#gmail.com', '123456789', 12, '$2b$08$ATLKWdP0DbJLXikGyUmrDOI0dlKgCf4tJrNGW.7nL6fbTHZ5.TWLW'),
('user2', 'user2gmail.com', '123456787', 13, '$2b$08$o1b2oY//n/bH.7bJk5X42e3.E4JsnJFSTS/aFmABA5nWRR0nG4dTe'),
('user3', 'user3gmail.com', '123456783', 14, '$2b$08$ncnYjQAXjgQ3kdg.tbKzguMome97VhCZFD9yNpxsJyDyMQdv/Yr4S');
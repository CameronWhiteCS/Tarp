-- Run this BEFORE flask generates the schema. 

DROP USER IF EXISTS `tarp`@`localhost`;
DROP USER IF EXISTS `tarp`@`%`;
DROP DATABASE IF EXISTS `tarp`;

CREATE USER `tarp`@`localhost` IDENTIFIED BY 'password';
CREATE USER `tarp`@`%` IDENTIFIED BY 'password';

CREATE DATABASE `tarp`;

GRANT ALL PRIVILEGES ON tarp.* TO `tarp`@`localhost`;
GRANT ALL PRIVILEGES ON tarp.* TO `tarp`@`%`;

-- Run this AFTER flask generates the schema. 

USE `tarp`;

-- Users -- 
INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password_hash`, `is_admin`)
VALUES
('1', 'Cameron', 'White', 'cameron.white@ufl.edu', '$2b$12$8tt/BZwRIe5lRVgF7/x9ju6p0BLhhSDtY1.dvNuQgmaPO02hEJX.S', 1),
('2', 'Guh', 'Feng', 'guh.feng@ufl.edu', '$2b$12$8tt/BZwRIe5lRVgF7/x9ju6p0BLhhSDtY1.dvNuQgmaPO02hEJX.S', 1),
('3', 'Ziyang', 'Fang', 'ziyang.fang@ufl.edu', '$2b$12$8tt/BZwRIe5lRVgF7/x9ju6p0BLhhSDtY1.dvNuQgmaPO02hEJX.S', 1),
('4', 'Harrison', 'Schmitt', 'harrison.schmitt@ufl.edu', '$2b$12$8tt/BZwRIe5lRVgF7/x9ju6p0BLhhSDtY1.dvNuQgmaPO02hEJX.S', 1);

-- Courses -- 
INSERT INTO `course` (`id`, `title`, `code`, `description`, `professor_id`)
VALUES
('1', 'History of Modern Singapore', 'HIS4096', 'History of the Republic of Singapore from the British colonial era to present.', '4'),
('2', 'Native American History', 'AMH3661', 'Examines the representations and realities of North American Indian history from the early 19th century to the present.', '4'),
('3', 'The Early Republic', 'AMH4160', 'Social, political, cultural and economic history of America in its formative years.', '4'),
('4', 'The Early Middle Ages', 'EUH3121', 'Studies the formation of the Medieval West from the dissolution of the Roman Empire to the year 1000 A.D.', '4');

-- Course Enrollments -- 
INSERT INTO `course_enrollment` (`user_id`, `course_id`) VALUES
('1', '1'), ('1', '2'), ('1', '3'), ('1', '4'),
('2', '1'), ('2', '2'), ('2', '3'), ('2', '4'),
('3', '1'), ('3', '2'), ('3', '3'), ('3', '4'),
('4', '1'), ('4', '2'), ('4', '3'), ('4', '4');

-- Messages -- 
INSERT INTO `message` (`id`, `author_id`, `course_id`, `title`, `content`, `is_read`, `is_automated`, `is_deleted`, `is_favorited`, `type`, `created_at`) VALUES
('1', '4', '1', 'Email title', 'This is a test email', '0', '0', '0', '0', 'EMAIL', '1900-01-01 12:00:00'),
('2', '4', '2', null, 'This is a test discussion board post', '0', '0', '0', '0', 'DISCUSSION_BOARD_POST', '1950-01-01 12:00:00'),
('3', '4', '3', 'No class tomorrow', 'Class is cancelled tomorrow. I have to attend the national steak conference.', '0', '0', '0', '0', 'ANNOUNCEMENT', '2001-01-01 12:00:00');

FLUSH PRIVILEGES;
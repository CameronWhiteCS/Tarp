DROP USER IF EXISTS `tarp`@`localhost`;
DROP USER IF EXISTS `tarp`@`%`;
DROP DATABASE IF EXISTS `tarp`;

CREATE USER `tarp`@`localhost` IDENTIFIED BY 'password';
CREATE USER `tarp`@`%` IDENTIFIED BY 'password';

CREATE DATABASE `tarp`;

GRANT ALL PRIVILEGES ON tarp.* TO `tarp`@`localhost`;
GRANT ALL PRIVILEGES ON tarp.* TO `tarp`@`%`;

FLUSH PRIVILEGES;
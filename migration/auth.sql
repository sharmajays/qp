CREATE TABLE IF NOT EXISTS `auth` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(60) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `type` VARCHAR(5) NOT NULL
)


/* default USERS */
INSERT INTO `auth` (`id`, `name`, `password`, `type`) VALUES
(NULL, 'admin1', 'admin1pass', 'admin'),
(NULL, 'user1', 'user1pass', 'user');

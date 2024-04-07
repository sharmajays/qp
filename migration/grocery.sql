CREATE TABLE IF NOT EXISTS `grocery` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(100) UNIQUE NOT NULL,
    `quantity` INT NOT NULL,
    `unit` VARCHAR(3) NOT NULL
)

/* DEFAULT ITEMS */
INSERT INTO `grocery` (`name`, `quantity`, `unit`) VALUES
('rice', 58, 'KG'),
('soap', 58, 'NOS');
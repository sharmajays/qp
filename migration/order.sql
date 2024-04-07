CREATE TABLE `orders` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `item_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `auth` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`item_id`) REFERENCES `grocery` (`id`) ON DELETE CASCADE
) 
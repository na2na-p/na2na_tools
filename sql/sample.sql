-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema na2na_tools
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema na2na_tools
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `na2na_tools` ;
USE `na2na_tools` ;

-- -----------------------------------------------------
-- Table `na2na_tools`.`waitlist_template`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `na2na_tools`.`waitlist_template` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `student_no` INT NOT NULL,
  `comment` TEXT(512) NULL,
  `added_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_checked` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `na2na_tools`.`waitlist_current_hold`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `na2na_tools`.`waitlist_current_hold` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_visible` TINYINT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE USER `username`@`localhost` IDENTIFIED BY `password`;
GRANT ALL ON na2na_tools.* to 'username'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

create database ecommerce ; 
use ecommerce;

create table products(idProduct int primary key AUTO_INCREMENT,
                      nomProduct varchar(30),
                      imgProduct varchar(255),
                      desProduct varchar(255),
                      prixProduct float  );
ALTER TABLE `products` ADD `Company` VARCHAR(255) NOT NULL AFTER `imgProduct`;


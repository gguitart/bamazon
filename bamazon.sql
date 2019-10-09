DROP DATABASE IF EXISTS productsDB;
CREATE database productsDB;

USE productsDB;

CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
    stock_quantity INT NULL,

  PRIMARY KEY (item_id)
);

INSERT into products(item_id, product_name, department_name, price, stock_quantity)
 VALUE (1, "toilet paper", "home goods", 10, 100 );
 INSERT into products(item_id, product_name, department_name, price, stock_quantity)
 VALUE (2, "forks", "home goods", 50, 100 );
 INSERT into products(item_id, product_name, department_name, price, stock_quantity)
 VALUE (3, "tea cups", "home goods", 100, 10 );
 INSERT into products(item_id, product_name, department_name, price, stock_quantity)
 VALUE (4, "laptops", "technology", 1000, 1 );

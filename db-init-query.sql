-- -- Create database milena-store
-- -- Create TABLE users (
-- -- 	id serial Primary KEY,
-- -- 	login VARCHAR(100) UNIQUE NOT NULL,
-- -- 	password VARCHAR(50) NOT NULL,
-- -- 	email VARCHAR(100) unique,
-- -- 	phone NUMERIC(15) UNIQUE
-- -- )

-- Create Table categories(
-- 	id serial Primary key,
-- 	parentId INTEGER,
-- 	name VARCHAR(100) UNIQUE NOT NULL,
-- 	FOREIGN KEY (parentId) REFERENCES categories (id)

-- );

-- Create Table products(
-- 	id serial primary key,
-- 	name VARCHAR(100) UNIQUE NOT NULL,
-- 	categoryId INTEGER NOT NULL,
-- 	price NUMERIC(10,2) NOT NULL,
-- 	discount NUMERIC(2,0),
-- 	description VARCHAR(255),
-- 	FOREIGN key (categoryId) references categories(id)
-- );
-- Create table orders(
-- 	id serial primary key,
-- 	userId INTEGER NOT NULL,
-- 	date TIMESTAMP not null,
-- 	status VARCHAR(10) not null,
-- 	cost NUMERIC(10,2) not null,
-- 	FOREIGN key (userId) references users(id)
-- );
-- Create table products_in_orders(
-- 	id serial primary key,
-- 	orderId INTEGER NOT NULL,
-- 	productId INTEGER NOT NULL,
-- 	FOREIGN key (orderId) references orders(id),
-- 	FOREIGN key (productId) references products(id)
-- );

-- Create table products_properties(
-- 	id serial primary key,
-- 	productId integer NOT NULL,
-- 	key VARCHAR(30) NOT NULL,
-- 	value VARCHAR(50) NOT NULL,
-- 	FOREIGN KEY (productId) references products(id)
-- );
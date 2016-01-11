CREATE DATABASE IF NOT EXISTS db_order_dishes CHARACTER SET utf8;

USE db_order_dishes;

CREATE TABLE IF NOT EXISTS t_user (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	icon VARCHAR(1024) NOT NULL DEFAULT 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
    name VARCHAR(50) NOT NULL DEFAULT 'leleliu008',
    password CHAR(32) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6',
    realName VARCHAR(50) NOT NULL DEFAULT '刘富频',
	birthday CHAR(10) NOT NULL DEFAULT '1970-01-01',
    phoneNumber VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(50) NOT NULL DEFAULT '',
	county VARCHAR(50) NOT NULL DEFAULT '中国',
    city VARCHAR(50) NOT NULL DEFAULT '北京',
    level INT NOT NULL DEFAULT 0,
    levelName VARCHAR(50) NOT NULL DEFAULT '江湖小虾');

CREATE TABLE IF NOT EXISTS t_department (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL DEFAULT '研发部',
	birthday CHAR(10) NOT NULL DEFAULT '1970-01-01',
    phoneNumber VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(50) NOT NULL DEFAULT '',
    leaderId CHAR(32) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6e3a');


CREATE TABLE IF NOT EXISTS t_restaurant (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	icon VARCHAR(1024) NOT NULL DEFAULT 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
	name VARCHAR(50) NOT NULL DEFAULT '半亩园',
	phoneNumber VARCHAR(20) NOT NULL DEFAULT '00000000000',
	email VARCHAR(50) NOT NULL DEFAULT '',
	city VARCHAR(50) NOT NULL DEFAULT '北京',
	level INT NOT NULL DEFAULT 0,
	levelName VARCHAR(50) NOT NULL DEFAULT 'xiaoxia',
	classifies VARCHAR(500) NOT NULL DEFAULT '面条类,小菜类');

CREATE TABLE IF NOT EXISTS t_dishes (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(1024) NOT NULL DEFAULT 'https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/logo/bd_logo1_31bdc765.png',
    name VARCHAR(50) NOT NULL DEFAULT '咖喱鸡',
    price FLOAT NOT NULL DEFAULT 0.00,
    level INT NOT NULL DEFAULT 0,
    levelName VARCHAR(50) NOT NULL DEFAULT 'xiaoxia',
	restaurant_id int NOT NULL,
	classify VARCHAR(20) NOT NULL DEFAULT '面条类');

CREATE TABLE IF NOT EXISTS t_order (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    selected_date VARCHAR(50) NOT NULL DEFAULT '2015-12-30',
    user_id int NOT NULL,
	dishes_id int NOT NULL);


INSERT INTO t_user (name, password, realName) VALUES ('fpliu', 'e10adc3949ba59abbe56e057f20f883e', '刘富频');

INSERT INTO t_restaurant (name, classifies) VALUES ('半亩园', '面条类|砂锅类|烧饼类|小菜类|盖饭类|小吃类|饮料类');

INSERT INTO t_dishes (name, price, classify, restaurant_id) VALUES ('番茄鸡蛋拌面', 11.0, '面条类', 1);

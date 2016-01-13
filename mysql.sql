CREATE DATABASE IF NOT EXISTS db_order_dishes CHARACTER SET utf8;

USE db_order_dishes;

CREATE TABLE IF NOT EXISTS t_user (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	icon VARCHAR(1024) NOT NULL DEFAULT '',
    name VARCHAR(50) NOT NULL DEFAULT '',
    password CHAR(32) NOT NULL DEFAULT '',
    realName VARCHAR(50) NOT NULL DEFAULT '',
	birthday CHAR(10) NOT NULL DEFAULT '',
    phoneNumber VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(50) NOT NULL DEFAULT '',
	county VARCHAR(50) NOT NULL DEFAULT '中国',
    city VARCHAR(50) NOT NULL DEFAULT '北京',
    level INT NOT NULL DEFAULT 0,
    levelName VARCHAR(50) NOT NULL DEFAULT '江湖小虾');

CREATE TABLE IF NOT EXISTS t_department (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL DEFAULT '',
	birthday CHAR(10) NOT NULL DEFAULT '',
    phoneNumber VARCHAR(20) NOT NULL DEFAULT '',
    email VARCHAR(50) NOT NULL DEFAULT '',
    leaderId CHAR(32) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6e3a');


CREATE TABLE IF NOT EXISTS t_restaurant (
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	icon VARCHAR(1024) NOT NULL DEFAULT '',
	name VARCHAR(50) NOT NULL DEFAULT '',
	phoneNumber VARCHAR(20) NOT NULL DEFAULT '',
	email VARCHAR(50) NOT NULL DEFAULT '',
	city VARCHAR(50) NOT NULL DEFAULT '北京',
	level INT NOT NULL DEFAULT 0,
	levelName VARCHAR(50) NOT NULL DEFAULT '',
	classifies VARCHAR(500) NOT NULL DEFAULT '');

CREATE TABLE IF NOT EXISTS t_dishes (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(1024) NOT NULL DEFAULT '',
    name VARCHAR(50) NOT NULL DEFAULT '',
    price FLOAT NOT NULL DEFAULT 0.00,
    level INT NOT NULL DEFAULT 0,
    levelName VARCHAR(50) NOT NULL DEFAULT '',
	restaurant_id int NOT NULL,
	classify VARCHAR(20) NOT NULL DEFAULT '');

CREATE TABLE IF NOT EXISTS t_order (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    selected_date VARCHAR(50) NOT NULL DEFAULT '',
    user_id int NOT NULL,
	dishes_id int NOT NULL,
	dishes_count int NOT NULL);

INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'test', 'e10adc3949ba59abbe56e057f20f883e', '测试', '15656059397');

INSERT INTO t_restaurant (icon, name, phoneNumber, classifies) VALUES ('http://1684.dv37.com/upload/agent/201108/dc4b835a07a00f4ceaaa399adf7707ee.jpg', '半亩园', '15656059397', '面条类|砂锅类|烧饼类|小菜类|盖饭类|小吃类|饮料类');
INSERT INTO t_restaurant (icon, name, phoneNumber, classifies) VALUES ('http://1684.dv37.com/upload/agent/201108/dc4b835a07a00f4ceaaa399adf7707ee.jpg', '一亩园', '15656059397', '面条类|砂锅类|烧饼类|小菜类|盖饭类|小吃类|饮料类');

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '番茄鸡蛋拌面', 11.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '茄子肉末拌面', 12.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '香菇肉臊拌面', 12.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '炸酱面', 16.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '榨菜肉丝汤面', 15.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '酸菜老鸭汤面', 18.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '番茄牛肉面（小）', 18.0, '面条类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '番茄牛肉面（大）', 26.0, '面条类', 1);

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '砂锅豆腐', 18.0, '砂锅类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '酸菜白肉砂锅', 18.0, '砂锅类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '丸子砂锅', 18.0, '砂锅类', 1);

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '酱肉烧饼', 8.0, '烧饼类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '拉孜鲜肉烧饼', 8.0, '烧饼类', 1);

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '豇豆花仁', 5.0, '小菜类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '雪莱毛豆百叶', 5.0, '小菜类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '酱萝卜', 5.0, '小菜类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '酸辣黄瓜条', 5.0, '小菜类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '黄豆肉皮冻', 6.0, '小菜类', 1);

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '鱼香肉丝盖饭', 15.0, '盖饭类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '千页豆腐盖饭', 16.0, '盖饭类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '红烧肉骨饭', 16.0, '盖饭类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '红烧牛肉饭', 17.0, '盖饭类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '台式卤肉饭', 18.0, '盖饭类', 1);


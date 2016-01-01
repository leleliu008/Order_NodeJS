CREATE DATABASE IF NOT EXISTS order_dishes CHARACTER SET utf8;

USE order_dishes;

CREATE TABLE IF NOT EXISTS t_user (
        id VARCHAR(50) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6e3a' PRIMARY KEY,
        name VARCHAR(50) NOT NULL DEFAULT 'leleliu008',
        nameName VARCHAR(50) NOT NULL DEFAULT 'leleliu008',
        age INT NOT NULL DEFAULT 20,
        password VARCHAR(32) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6',
        phoneNumber VARCHAR(20) ,
        email VARCHAR(50) ,
        city VARCHAR(50) NOT NULL DEFAULT 'beijing',
        level INT NOT NULL DEFAULT 0,
        levelName VARCHAR(50) NOT NULL DEFAULT 'xiaoxia');

CREATE TABLE IF NOT EXISTS t_restaurant (
	id VARCHAR(50) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6e3a' PRIMARY KEY,
	name VARCHAR(50) NOT NULL DEFAULT '半亩园',
	phoneNumber VARCHAR(20) ,
	email VARCHAR(50) ,
	city VARCHAR(50) NOT NULL DEFAULT 'beijing',
	level INT NOT NULL DEFAULT 0,
	levelName VARCHAR(50) NOT NULL DEFAULT 'xiaoxia');

CREATE TABLE IF NOT EXISTS t_dishes (
        id VARCHAR(50) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6e3a' PRIMARY KEY,
        name VARCHAR(50) NOT NULL DEFAULT '咖喱鸡',
        price FLOAT NOT NULL DEFAULT 0.00,
        level INT NOT NULL DEFAULT 0,
        levelName VARCHAR(50) NOT NULL DEFAULT 'xiaoxia',
	restaurant_id VARCHAR(50) NOT NULL);

CREATE TABLE IF NOT EXISTS t_order (
        id VARCHAR(50) NOT NULL DEFAULT '5b6b8f7018926d3e15bbb5eed75a6e3a' PRIMARY KEY,
        selectd_date VARCHAR(50) NOT NULL DEFAULT '2015-12-30',
	dishes_id VARCHAR(50) NOT NULL);

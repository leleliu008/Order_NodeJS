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
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'wangyunbing', 'e10adc3949ba59abbe56e057f20f883e', '王允兵', '18210430377');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'fengxiankun', 'e10adc3949ba59abbe56e057f20f883e', '冯贤坤', '15656059397');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'fengjie', 'e10adc3949ba59abbe56e057f20f883e', '冯杰', '18810618113');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhangyunyang', 'e10adc3949ba59abbe56e057f20f883e', '张韵杨', '17701321277');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'kangguolong', 'e10adc3949ba59abbe56e057f20f883e', '康国龙', '18518570130');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'songyu', 'e10adc3949ba59abbe56e057f20f883e', '宋宇', '18609814006');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'xuxiaoai', 'e10adc3949ba59abbe56e057f20f883e', '徐小爱', '18701121779');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhoujianwei', 'e10adc3949ba59abbe56e057f20f883e', '周建伟', '13910987983');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'chengxiaonan', 'e10adc3949ba59abbe56e057f20f883e', '程晓男', '15510785675');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'liufupin', 'e10adc3949ba59abbe56e057f20f883e', '刘富频', '15656059397');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'gebaocai', 'e10adc3949ba59abbe56e057f20f883e', '葛宝才', '17090073253');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'wangjianye', 'e10adc3949ba59abbe56e057f20f883e', '王建业', '17710153021');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'sishuhang', 'e10adc3949ba59abbe56e057f20f883e', '司树行', '18034164898');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'yangchaoming', 'e10adc3949ba59abbe56e057f20f883e', '杨朝明', '18911788209');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'gujunyu', 'e10adc3949ba59abbe56e057f20f883e', '古军宇', '13811326144');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'sunhailong', 'e10adc3949ba59abbe56e057f20f883e', '孙海龙', '15801301868');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'songjunjie', 'e10adc3949ba59abbe56e057f20f883e', '宋俊杰', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'chaoxiaoxue', 'e10adc3949ba59abbe56e057f20f883e', '常小雪', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhounengfa', 'e10adc3949ba59abbe56e057f20f883e', '周能发', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'wangxiaowei', 'e10adc3949ba59abbe56e057f20f883e', '王晓伟', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'yufangfang', 'e10adc3949ba59abbe56e057f20f883e', '余芳芳', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'heweiwei', 'e10adc3949ba59abbe56e057f20f883e', '贺伟伟', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'lvfang', 'e10adc3949ba59abbe56e057f20f883e', '吕方', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'kangguoying', 'e10adc3949ba59abbe56e057f20f883e', '康国英', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'liuweixin', 'e10adc3949ba59abbe56e057f20f883e', '刘伟新', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'madong', 'e10adc3949ba59abbe56e057f20f883e', '马东', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'yangchao', 'e10adc3949ba59abbe56e057f20f883e', '杨超', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'liufei', 'e10adc3949ba59abbe56e057f20f883e', '刘飞', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'dongkelin', 'e10adc3949ba59abbe56e057f20f883e', '董科霖', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'gaoyunfeng', 'e10adc3949ba59abbe56e057f20f883e', '高云峰', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'limenglei', 'e10adc3949ba59abbe56e057f20f883e', '李梦磊', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'linhao', 'e10adc3949ba59abbe56e057f20f883e', '林浩', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'liujia', 'e10adc3949ba59abbe56e057f20f883e', '刘佳', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'xunan', 'e10adc3949ba59abbe56e057f20f883e', '许楠', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhangbin', 'e10adc3949ba59abbe56e057f20f883e', '张彬', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhangheyuan', 'e10adc3949ba59abbe56e057f20f883e', '张赫原', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhaozhengqiang', 'e10adc3949ba59abbe56e057f20f883e', '赵政强', '');
INSERT INTO t_user (icon, name, password, realName, phoneNumber) VALUES ('https://avatars3.githubusercontent.com/u/290058?v=3&s=400', 'zhoudan', 'e10adc3949ba59abbe56e057f20f883e', '周丹', '');


INSERT INTO t_restaurant (icon, name, phoneNumber, classifies) VALUES ('http://1684.dv37.com/upload/agent/201108/dc4b835a07a00f4ceaaa399adf7707ee.jpg', '半亩园', '15656059397', '面条类|砂锅类|烧饼类|小菜类|盖饭类|小吃类|饮料类');
INSERT INTO t_restaurant (icon, name, phoneNumber, classifies) VALUES ('/images/yota.png', 'Yota', '15656059397', '组合类');

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('/images/yota.png', '多菜组合盒饭', 28.0, '组合类', 2);
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
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '泡菜五花肉盖饭', 18.0, '盖饭类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '川香鱼柳盖饭', 18.0, '盖饭类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '咖喱鸡肉饭', 20.0, '盖饭类', 1);

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '台式卤蛋', 3.0, '小吃类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '蔬菜浓汤', 6.0, '小吃类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '牛奶南瓜汤', 10.0, '小吃类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '菜肉大馄饨', 12.0, '小吃类', 1);

INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '热豆浆', 3.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '矿泉水', 3.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '百事可乐', 5.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '美年达', 5.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '七喜', 5.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '燕京鲜啤', 9.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '燕京纯生', 12.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '大西洋芭乐汁', 12.0, '饮料类', 1);
INSERT INTO t_dishes (icon, name, price, classify, restaurant_id) VALUES ('http://i3.meishichina.com/attachment/recipe/201009/p320_201009161618302.jpg', '黑松沙士', 12.0, '饮料类', 1);
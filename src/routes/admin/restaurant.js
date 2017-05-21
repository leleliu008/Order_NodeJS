var common = require('../../utils/common.js');
var MySQLClient = require('../../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();
var express = require('express');
var router = express.Router();

/*  后台 - 餐馆管理 */
router.get('/', function (request, response, next) {
    var sql = "SELECT id, name, phoneNumber FROM t_restaurant";
    //查询菜单表
    mysqlClientInstance.exec(sql, null, function (err, restaurants, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!restaurants) {
                restaurants = [];
            }
            response.render('admin/restaurant/index', {restaurants: restaurants});
        }
    });
});

/*  后台 - 添加餐馆  */
router.get('/add', function (request, response, next) {
    response.render('admin/restaurant/add', {});
});

/*  后台 - 添加餐馆  */
router.post('/add', function (request, response, next) {
    var restaurant = request.body;
    console.log('restaurant = ' + JSON.stringify(restaurant));

    if (restaurant) {
        var sql = "INSERT INTO t_restaurant (icon, name, phoneNumber, email, city, address, level, levelName, classifies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var icon = restaurant.icon;
        var name = restaurant.name;
        var phoneNumber = restaurant.phoneNumber;
        var email = restaurant.email;
        var city = restaurant.city;
        var address = restaurant.address;
        var level = restaurant.level;
        var levelName = '三星级';
        var classifies = restaurant.classifies;

        mysqlClientInstance.exec(sql, [icon, name, phoneNumber, email, city, address, level, levelName, classifies], function (err, result, fields) {
            if (err) {
                console.log(err.stack);

                var result = {
                    code: 1,
                    message: '失败'
                };

                response.send(result);
            } else {
                console.log(sql + ' success');

                var result = {
                    code: 0,
                    message: '操作成功'
                };

                response.send(result);
            }
        });
    } else {
        var result = {
            code: 1,
            message: '失败'
        };

        response.send(result);
    }
});

/*  后台 - 删除全部餐馆  */
router.post('/delete/all', function (request, response, next) {
    var sql = "DELETE FROM t_restaurant";
    mysqlClientInstance.exec(sql, null, function (err, result, fields) {
        if (err) {
            console.log(err.stack);

            var result = {
                code: 1,
                message: '失败'
            };

            response.send(result);
        } else {
            console.log(sql + ' success');

            var result = {
                code: 0,
                message: '操作成功'
            };

            response.send(result);
        }
    });
});

/*  后台 - 删除指定ID的餐馆 */
router.post('/:restaurantId/delete', function (request, response, next) {
    var sql = "DELETE FROM t_restaurant WHERE id = ?";
    mysqlClientInstance.exec(sql, [request.params.restaurantId], function (err, result, fields) {
        if (err) {
            console.log(err.stack);

            var result = {
                code: 1,
                message: '失败'
            };

            response.send(result);
        } else {
            console.log(sql + ' success');

            var result = {
                code: 0,
                message: '操作成功'
            };

            response.send(result);
        }
    });
});

/*  后台 - 显示指定ID的餐馆 */
router.get('/:restaurantId/show', function (request, response, next) {
    var sql = "SELECT * FROM t_restaurant WHERE id = ?";
    mysqlClientInstance.exec(sql, [request.params.restaurantId], function (err, rows, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');

            if (!rows || rows.length == 0) {
                var err = {};
                err.stack = '没有给定id的餐馆';
                err.message = '错误';
                handleError(err, response);
                return;
            }

            response.render('admin/restaurant/detail', {restaurant: rows[0]});
        }
    });
});

/*  后台 - 编辑指定ID的餐馆 */
router.get('/:restaurantId/edit', function (request, response, next) {
    var sql = "SELECT * FROM t_restaurant WHERE id = ?";
    mysqlClientInstance.exec(sql, [request.params.restaurantId], function (err, rows, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');

            if (!rows || rows.length == 0) {
                var err = {};
                err.stack = '没有给定id的餐馆';
                err.message = '错误';
                handleError(err, response);
                return;
            }

            response.render('admin/restaurant/edit', {restaurant: rows[0]});
        }
    });
});

/*  后台 - 修改餐馆信息  */
router.post('/:restaurantId/edit', function (request, response, next) {
    var restaurantId = request.params.restaurantId;
    var restaurant = request.body;
    if (restaurantId && restaurant) {
        var sql = "UPDATE t_restaurant SET icon=?, name=?, phoneNumber=?, email=?, city=?, address=?, level=?, levelName=?, classifies=? WHERE id=" + restaurantId;
        var icon = restaurant.icon;
        var name = restaurant.name;
        var phoneNumber = restaurant.phoneNumber;
        var email = restaurant.email;
        var city = restaurant.city;
        var address = restaurant.address;
        var level = restaurant.level;
        var levelName = '三星级';
        var classifies = restaurant.classifies;

        mysqlClientInstance.exec(sql, [icon, name, phoneNumber, email, city, address, level, levelName, classifies], function (err, result, fields) {
            if (err) {
                console.log(err.stack);

                var result = {
                    code: 1,
                    message: '失败'
                };

                response.send(result);
            } else {
                console.log(sql + ' success');

                var result = {
                    code: 0,
                    message: '操作成功'
                };

                response.send(result);
            }
        });
    } else {
        var result = {
            code: 1,
            message: '失败'
        };

        response.send(result);
    }
});

require('./dishes.js').run(router, mysqlClientInstance, common);

module.exports = router;
var express = require('express');
var router = express.Router();

var common = require('../utils/common.js');
var getCookieValue = require('../utils/cookie.js');
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();

/* 提交订单 */
router.post('/', function (request, response, next) {
    var userId = getCookieValue(request, 'userId');
    if (userId) {
        var today = common.getDayFormat();
        console.log('today = ' + today);

        mysqlClientInstance.exec('SELECT * FROM t_order WHERE user_id = ? AND selected_date = ?', [userId, today], function (err, rows, fieds) {
            if (err) {
                console.log(err.stack);

                var error = {
                    code: 1,
                    message: '服务器异常'
                };
                response.send(error);
            } else {
                console.log('SELECT * FROM t_order WHERE user_id = ? AND selected_date = ? success');

                if (rows && rows.length > 0) {
                    var error = {
                        code: 5,
                        message: '今天您已经创建过订单了，不能再创建了'
                    };
                    response.send(error);
                } else {
                    console.log('request.body = ' + JSON.stringify(request.body));
                    console.log('request.body.orders = ' + request.body.orders);

                    var orders = eval(request.body.orders);

                    if (orders && orders.length > 0) {
                        for (var i in orders) {
                            insert_order(today, userId, orders, i, response);
                        }
                    }
                }
            }
        });
    } else {
        var error = {
            code: 1,
            message: '请重新登陆'
        };
        response.send(error);
    }
});

function insert_order(today, userId, orders, i, response) {
    var order = orders[i];
    var dishes_id = order.dishes_id;
    var dishes_count = order.dishes_count;

    console.log('dishes_id = ' + dishes_id);
    console.log('dishes_count = ' + dishes_count);

    mysqlClientInstance.exec('INSERT INTO t_order (selected_date, user_id, dishes_id, dishes_count) VALUES (?, ?, ?, ?)', [today, userId, dishes_id, dishes_count], function (err, rows, fields) {
        if (err) {
            console.log(err.stack);

            var error = {
                code: 1,
                message: '服务器异常'
            };
            response.send(error);
        } else {
            console.log('INSERT INTO t_order (selected_date, user_id, dishes_id, dishes_count) VALUES (?, ?, ?, ?) success');

            //最后一次
            if (i == orders.length - 1) {
                var success = {
                    code: 0,
                    message: '提交订单成功'
                };
                response.send(success);
            }
        }
    });
}

/* 获取我的订单界面 */
router.get('/mine', function (request, response, next) {
    response.render('order/mine', {});
});

/* 获取所有订单界面 */
router.get('/all', function (request, response, next) {
    var today = common.getDayFormat();
    var sql = "SELECT t_user.realName, t_dishes.name, t_dishes.price, t_order.dishes_count FROM t_user, t_order, t_dishes ";
    sql += "WHERE t_order.selected_date = ? AND t_order.user_id = t_user.id AND t_order.dishes_id = t_dishes.id";
    //查询菜单表
    mysqlClientInstance.exec(sql, [today], function (err, rows, fields) {
        if (err) {
            common.handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!rows) {
                rows = [];
            }
            response.render('order/all', {orders: rows});
        }
    });
});

/* 获取提交订单成功界面 */
router.get('/success', function (request, response, next) {
    response.render('order/success', {totalPrice: 28});
});

/* 取消我的订单 */
router.post('/mine/cancel', function (request, response, next) {
    var userId = getCookieValue(request, 'userId');
    if (userId) {
        var today = common.getDayFormat();
        console.log('today = ' + today);

        //查询订单表，看是否已经创建过今天的订单
        mysqlClientInstance.exec('DELETE FROM t_order WHERE user_id = ? AND selected_date = ?', [userId, today], function (err, orders, fieds) {
            if (err) {
                console.log(err.stack);

                var result = {
                    code: 1,
                    message: '服务端异常'
                };
                response.send(result);
            } else {
                var result = {
                    code: 0,
                    message: '您的订单删除成功'
                };
                response.send(result);
            }
        });
    } else {
        var error = {
            code: 4,
            message: '请重新登陆'
        };
        response.send(error);
    }
});

/* 获取我的订单API */
router.get('/mine/api', function (request, response, next) {
    var userId = getCookieValue(request, 'userId');
    if (userId) {
        var today = common.getDayFormat();
        console.log('today = ' + today);

        //查询订单表，看是否已经创建过今天的订单
        mysqlClientInstance.exec('SELECT id, dishes_id, dishes_count FROM t_order WHERE user_id = ? AND selected_date = ?', [userId, today], function (err, orders, fieds) {
            if (err) {
                console.log(err.stack);

                var result = {
                    code: 1,
                    message: '服务端异常'
                };
                response.send(result);
            } else {
                console.log('SELECT id, dishes_id, dishes_count FROM t_order WHERE user_id = ? AND selected_date = ? success');

                if (!orders || orders.length == 0) {
                    var result = {
                        code: 2,
                        message: '今天您还没有订餐'
                    };
                    response.send(result);
                } else {
                    var array = [];
                    for (var i = 0; i < orders.length; i++) {
                        console.log('i = ' + i);

                        queryDishes(orders, i, array, response);
                    }
                }
            }
        });
    } else {
        var error = {
            code: 4,
            message: '请重新登陆'
        };
        response.send(error);
    }
});

function queryDishes(orders, i, array, response) {
    //查询菜单表
    mysqlClientInstance.exec('SELECT name, price FROM t_dishes WHERE id = ?', [orders[i].dishes_id], function (err, dishes, fieds) {
        if (err) {
            console.log(err.stack);

            var result = {
                code: 1,
                message: '服务端异常'
            };
            response.send(result);
        } else {
            console.log('SELECT name, price FROM t_dishes WHERE id = ? success');

            if (dishes.length == 0) {
                var result = {
                    code: 3,
                    message: '数据有异常，请联系管理员'
                };
                response.send(result);
            } else {
                dishes[0].count = orders[i].dishes_count;
                array[i] = dishes[0];

                if (i == orders.length - 1) {
                    var result = {
                        code: 0,
                        message: '成功',
                        dishes: array
                    };
                    response.send(result);
                }
            }
        }
    });
}

module.exports = router;

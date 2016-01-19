var common = require('./common.js');

var MySQLClient = require('./mysql_util.js');
var mysqlClinet = new MySQLClient();
mysqlClinet.connect(function (err) {
    if (err) {
        console.log(err.stack);
    } else {
        console.log('mysql connect success');
    }
});

var express = require('express');
var router = express.Router();

/*  后台. */
router.get('/', function (request, response, next) {
    response.render('admin/admin', {});
});

/*  后台 - 用户管理 */
router.get('/user', function (request, response, next) {
    var sql = "SELECT id, name, realName, phoneNumber FROM t_user";
    //查询菜单表
    mysqlClinet.exec(sql, null, function (err, users, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!users) {
                rows = [];
            }
            response.render('admin/user', {users: users});
        }
    });
});

/*  后台 - 餐馆管理 */
router.get('/restaurant', function (request, response, next) {
    var sql = "SELECT id, name, phoneNumber FROM t_restaurant";
    //查询菜单表
    mysqlClinet.exec(sql, null, function (err, restaurants, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!restaurants) {
                restaurants = [];
            }
            response.render('admin/restaurant/manage', {restaurants: restaurants});
        }
    });
});

/*  后台 - 菜单管理 */
router.get('/dishes/:restaurantId', function (request, response, next) {
    var today = common.getDayFormat();
    var sql = "SELECT t_user.realName, t_dishes.name, t_order.dishes_count FROM t_user, t_order, t_dishes ";
    sql += "WHERE t_order.selected_date = ? AND t_order.user_id = t_user.id AND t_order.dishes_id = t_dishes.id";
    //查询菜单表
    mysqlClinet.exec(sql, [today], function (err, rows, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!rows) {
                rows = [];
            }
            response.render('admin/order', {orders: rows});
        }
    });
});

/*  后台 - 删除指定ID的餐馆 */
router.get('/restaurant/delete/:restaurantId', function (request, response, next) {
    var sql = "DELETE * FROM t_restaurant WHERE id = ?";
    mysqlClinet.exec(sql, [request.params.restaurantId], function (err, result, fields) {
        if (err) {
            console.log(e.stack);

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
router.get('/restaurant/show/:restaurantId', function (request, response, next) {
    var sql = "SELECT * FROM t_restaurant WHERE id = ?";
    mysqlClinet.exec(sql, [request.params.restaurantId], function (err, rows, fields) {
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
router.get('/restaurant/edit/:restaurantId', function (request, response, next) {
    var sql = "SELECT * FROM t_restaurant WHERE id = ?";
    mysqlClinet.exec(sql, [request.params.restaurantId], function (err, rows, fields) {
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

/*  后台 - 删除全部餐馆  */
router.get('/restaurant/add', function (request, response, next) {
    response.render('admin/restaurant/add', {});
});

/*  后台 - 删除全部餐馆  */
router.get('/restaurant/deleteAll', function (request, response, next) {
    var sql = "DELETE FROM t_restaurant";
    mysqlClinet.exec(sql, null, function (err, result, fields) {
        if (err) {
            console.log(e.stack);

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

/*  后台 - 订单管理 */
router.get('/order', function (request, response, next) {
    var today = common.getDayFormat();
    var sql = "SELECT t_user.realName, t_dishes.name, t_order.dishes_count FROM t_user, t_order, t_dishes ";
    sql += "WHERE t_order.selected_date = ? AND t_order.user_id = t_user.id AND t_order.dishes_id = t_dishes.id";
    //查询菜单表
    mysqlClinet.exec(sql, [today], function (err, rows, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!rows) {
                rows = [];
            }
            response.render('admin/order', {orders: rows});
        }
    });
});

function handleError(err, response) {
    console.log(err.stack);
    response.render('error', {'message': err.message, 'error': err});
}

module.exports = router;
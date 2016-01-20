var common = require('./../common.js');

var MySQLClient = require('./../mysql_util.js');
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

module.exports = router;
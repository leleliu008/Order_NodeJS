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

var ArrayList = require('../data_structure/ArrayList.js');
var Map = require('../data_structure/Map.js');

/*  后台 - 订单管理 */
router.get('/order', function (request, response, next) {
    var today = common.getDayFormat();
    var sql = "SELECT t_user.realName, t_dishes.name, t_dishes.price, t_order.dishes_count FROM t_user, t_order, t_dishes ";
    sql += "WHERE t_order.selected_date = ? AND t_order.user_id = t_user.id AND t_order.dishes_id = t_dishes.id";
    //查询菜单表
    mysqlClinet.exec(sql, [today], function (err, rows, fields) {
        if (err) {
            common.handleError(err, response);
        } else {
            console.log(sql + ' success');
            if (!rows) {
                rows = [];
            }

            var personSet = new ArrayList();
            var map1 = new Map();

            var obj = {orders: rows};
            obj.totalPersion = 0;
            obj.totalPrice = 0;

            rows.forEach(function (item) {
                obj.totalPrice += item.price * item.dishes_count;

                //统计人数
                if (!personSet.contains(item.realName)) {
                    personSet.add(item.realName);
                }
                obj.totalPersion = personSet.size();

                //统计不同菜的数量
                var list1 = map1.get(item.name);
                if (list1) {
                    list1.add(item);
                } else {
                    list1 = new ArrayList();
                    list1.add(item);
                    map1.put(item.name, list1);
                }
            });



            response.render('admin/order', obj);
        }
    });
});

module.exports = router;
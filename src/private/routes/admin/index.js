var http = require('http');
var config = require('../../config.js');
var common = require('../../utils/common.js');
var tbSignUtil = require('../../utils/taobaoSign.js');
var ArrayList = require('../../utils/ArrayList.js');
var Map = require('../../utils/Map.js');
var MySQLClient = require('../../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();
var express = require('express');
var router = express.Router();

/*  后台. */
router.get('/', function (request, response, next) {
    response.render('admin/admin', {});
});

/*  后台 - 订单管理 */
router.get('/order', function (request, response, next) {
    var today = common.getDayFormat();
    var sql = "SELECT t_user.realName, t_restaurant.name AS restaurant_name, t_restaurant.phoneNumber AS restaurant_phoneNumber, t_dishes.name AS dishes_name, t_dishes.price, t_order.dishes_count " +
        "FROM t_user, t_order, t_restaurant, t_dishes " +
        "WHERE t_order.selected_date = ? AND t_order.user_id = t_user.id AND t_order.dishes_id = t_dishes.id AND t_dishes.restaurant_id = t_restaurant.id";
    //查询菜单表
    mysqlClientInstance.exec(sql, [today], function (err, rows, fields) {
        if (err) {
            common.handleError(err, response);
        } else {
            console.log(sql + ' success');
            console.log('rows = ' + JSON.stringify(rows));
            if (!rows) {
                rows = [];
            }

            var obj = {orders: rows};
            obj.restaurants = null;
            obj.totalPersion = 0;
            obj.totalPrice = 0;

            var personSet = new ArrayList();
            var restaurantMap = new Map();

            rows.forEach(function (item) {
                if (!restaurantMap.get(item.restaurant_name)) {
                    console.log('item.restaurant_name = ' + item.restaurant_name);
                    restaurantMap.put(item.restaurant_name, item);
                }

                obj.totalPrice += item.price * item.dishes_count;

                //统计人数
                if (!personSet.contains(item.realName)) {
                    personSet.add(item.realName);
                }
                obj.totalPersion = personSet.size();
            });

            var size = restaurantMap.size();
            if (size > 0) {
                obj.restaurants = [];
                var names = restaurantMap.keySet();
                for (var i = 0; i < names.length; i++) {
                    var name = names[i];
                    var restaurant = restaurantMap.get(name);
                    if (restaurant) {
                        var newRestaurant = {};
                        newRestaurant.name = restaurant.restaurant_name;
                        newRestaurant.phoneNumber = restaurant.restaurant_phoneNumber;
                        newRestaurant.dishes = [];

                        var keys = [];
                        var nameCountMap = {};

                        for (var j = 0; j < rows.length; j++) {
                            var item = rows[j];
                            if (name == item.restaurant_name) {
                                var dish = {};
                                dish.realName = item.realName;
                                dish.name = item.dishes_name;
                                dish.count = item.dishes_count;
                                dish.price = item.price;
                                newRestaurant.dishes.push(dish);

                                var count = nameCountMap[dish.name];
                                if (count) {
                                    count += dish.count;
                                    nameCountMap[dish.name] = count;
                                } else {
                                    nameCountMap[dish.name] = dish.count;
                                    keys.push(dish.name);
                                }
                            }
                        }

                        newRestaurant.details = [];
                        keys.forEach(function (name) {
                            var count = nameCountMap[name];
                            newRestaurant.details.push({name: name, count: count});
                        });

                        obj.restaurants.push(newRestaurant);
                    }
                }
            }


            console.log('result = ' + JSON.stringify(obj));

            response.render('admin/order', obj);
        }
    });
});

/*  后台 - 发送订单给商家 */
router.post('/order/send', function (request, response, next) {
    var restaurants = request.body.restaurants;
    console.log('restaurants = ' + restaurants);
    restaurants = JSON.parse(restaurants);

    if (!restaurants || restaurants.length == 0) {
        var result = {
            code: 1,
            message: '缺少参数'
        };

        response.send(result);
        return;
    }

    restaurants.forEach(function (restaurant) {
        sendMessage(restaurant, response);
    });
});

function sendMessage(restaurant, response) {
    console.log('restaurant = ' + JSON.stringify(restaurant));

    var details = '\r\n';
    restaurant.details.forEach(function (detail) {
        details += detail.name + '(' + detail.count + '个）\r\n';
    });

    var params = {dateTime: common.getDayFormat(), detail: details};

    // 短信发送的参数对象
    var obj = {
        format: 'json',
        method: 'alibaba.aliqin.fc.sms.num.send',
        partner_id: config.alidayu.partner_id,
        rec_num: '15656059397',
        sign_method: 'hmac',
        sms_type: 'normal',
        sms_param: JSON.stringify(params),
        sms_free_sign_name: config.alidayu.sms_free_sign_name,
        sms_template_code: config.alidayu.sms_template_code2,
        v: '2.0'
    };

    var result = tbSignUtil.sign(obj);

    obj.sign = result.sign;
    obj.timestamp = result.timestamp;

    console.log(obj);

    var requestEntity = common.getEncodedURL(obj);

    var options = {
        host: 'gw.api.taobao.com',
        path: '/router/rest',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Content-Length': requestEntity.length
        }
    };

    var req = http.request(options, function (res) {
        console.log('STATUS: ' + res.statusCode);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            chunk = JSON.parse(chunk);

            if (chunk.alibaba_aliqin_fc_sms_num_send_response
                && chunk.alibaba_aliqin_fc_sms_num_send_response.result
                && chunk.alibaba_aliqin_fc_sms_num_send_response.result.err_code == '0'
                && chunk.alibaba_aliqin_fc_sms_num_send_response.result.success) {
                var result = {
                    code: 0,
                    message: '成功'
                };

                response.send(result);
            } else {
                var result = {};
                result.code = chunk.error_response.code;
                result.message = chunk.error_response.sub_msg;
                response.send(result);
            }
        });
        res.on('error', function (err) {
            console.log('RESPONSE ERROR: ' + err);

            var result = {
                code: 1,
                message: '失败'
            };

            response.send(result);
        });
    });

    req.on('error', function (err) {
        console.log('REQUEST ERROR: ' + err);

        var result = {
            code: 1,
            message: '失败'
        };

        response.send(result);
    });
    req.write(requestEntity);
    req.end();
}

module.exports = router;
var express = require('express');
var router = express.Router();

var common = require('../utils/common.js');
var ArrayList = require('../utils/ArrayList.js');
var Map = require('../utils/Map.js');
var map = new Map();
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();

/* 获取美食列表 */
router.get('/list/:restaurantId', function (request, response, next) {
    var restaurantId = request.param('restaurantId');

    mysqlClientInstance.exec('SELECT * FROM t_restaurant WHERE id=?', [restaurantId], function (err, restaurants, fields) {
        if (err) {
            common.handleError(err, response)
        } else {
            if (!restaurants || restaurants.length == 0) {
                common.handleError(err, response);
            } else {
                mysqlClientInstance.exec('SELECT * FROM t_dishes WHERE restaurant_id=?', [restaurantId], function (err, dishes, fields) {
                    if (err) {
                        common.handleError(err, response)
                    } else {
                        if (!dishes) {
                            common.handleError(err, response);
                        } else {
                            var map = new Map();

                            var classfies = restaurants[0].classifies.split('|');
                            classfies.forEach(function (classfy) {
                                console.log('classfy = ' + classfy);
                                map.put(classfy, new ArrayList());
                            });

                            dishes.forEach(function (dish) {
                                console.log('dish = ' + JSON.stringify(dish));
                                map.get(dish.classify).add(dish);
                            });

                            var dishes = [];
                            var keySet = map.keySet();
                            for (var i = 0; i < keySet.length; i++) {
                                var item = keySet[i];
                                console.log('item = ' + item);
                                var value = map.get(item).asArray();
                                console.log('value = ' + JSON.stringify(value));
                                dishes[i] = value;
                            }

                            console.log('dishes = ' + JSON.stringify(dishes));

                            var body = {'restaurant': restaurants[0], 'dishes': dishes};
                            console.log('body = ' + JSON.stringify(body));
                            response.render('dishes/list', body);
                        }
                    }
                });
            }
        }
    });
});

module.exports = router;

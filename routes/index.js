var express = require('express');
var router = express.Router();

var getcookieValue = require('./cookies_util.js');
var MySQLClient = require('./mysql_util.js');
var sha = require('./degist_util.js');

var ArrayList = require('./data_structure/ArrayList.js');
var Map = require('./data_structure/Map.js');
var loginMap = new Map();

function homeHanlder(req, res, next) {
    var userId = getcookieValue(req, 'userId');
    if (userId) {
        var mysqlClinet = new MySQLClient();
        mysqlClinet.connect(function (err) {
            if (err) {
                handleError(err, res);
            } else {
                console.log('mysqlClinet.connect() success');

                mysqlClinet.exec('SELECT * FROM t_restaurant limit 0, 10', null, function (err, rows, fieds) {
                    if (err) {
                        handleError(err, res);
                    } else {
                        console.log('mysqlClinet.exec() success');

                        for (var i in rows) {
                            console.log(rows[i]);
                        }

                        res.render('restaurant/list', {'rows': rows});
                    }

                    mysqlClinet.end(function (err) {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log('mysqlClinet.end() success')
                        }
                    });
                });
            }
        });
    } else {
        res.redirect('/login');
    }
}

/* 主页. */
router.get('/', homeHanlder);

router.get('/index', homeHanlder);

/* 获取登陆页面. */
router.get('/login', function (req, res, next) {
    res.render('login', {});
});

/* 执行登陆请求 必须是POST请求，因为涉及到密码 */
router.post('/login', function (request, response, next) {
    var formData = request.body;
    console.log("formData = " + formData);
    console.log("username = " + formData.username);
    console.log("password = " + formData.password);

    var password_md5 = sha('md5', formData.password);
    console.log("password_md5 = " + password_md5);

    var mysqlClinet = new MySQLClient();
    mysqlClinet.connect(function (err) {
        if (err) {
            console.log(err.stack);

            var error = {
                code: 3,
                message: '服务端异常'
            };

            response.send(error);
        } else {
            console.log('mysqlClinet.connect() success');

            mysqlClinet.exec('SELECT name, password FROM t_user WHERE name=? AND password=?', [formData.username, password_md5], function (err, rows, fieds) {
                if (err) {
                    console.log(err.stack);

                    var error = {
                        code: 3,
                        message: '服务端异常'
                    };

                    response.send(error);
                } else {
                    console.log('mysqlClinet.exec() success');

                    for (var i in rows) {
                        console.log(rows[i]);
                    }

                    if (rows.length == 0) {
                        var error = {
                            code: 2,
                            message: '用户名或者密码错误'
                        };

                        response.send(error);
                    } else {
                        response.cookie('userId', formData.username, {
                            maxAge: 30 * 60 * 1000,
                            path: '/',
                            httpOnly: true
                        });

                        var currentTimeMillis = new Date().getMilliseconds();
                        console.log('currentTimeMillis = ' + currentTimeMillis);
                        loginMap.put(formData.username, currentTimeMillis);

                        var success = {
                            code: 0,
                            message: '用户名或者密码错误',
                            userId: formData.username
                        };

                        response.send(success);
                    }
                }

                mysqlClinet.end(function (err) {
                    if (err) {
                        console.log(err.stack);
                    } else {
                        console.log('mysqlClinet.end() success')
                    }
                });
            });
        }
    });
});

/* 获取餐馆列表 */
router.get('/restaurant/list', function (request, response, next) {

});

/* 获取美食列表 */
router.get('/dishes/list/:restaurantId', function (request, response, next) {
    var restaurantId = request.param('restaurantId');

    var mysqlClient = new MySQLClient();
    mysqlClient.connect(function (err) {
        if (err) {
            handleError(err, response);
        } else {
            mysqlClient.exec('SELECT * FROM t_restaurant WHERE id=?', [restaurantId], function (err, restaurants, fields) {
                if (err) {
                    handleError(err, response)
                } else {
                    if (!restaurants) {
                        handleError(err, response);
                    } else {
                        if (restaurants.length == 0) {
                            handleError(err, response);
                        } else {
                            var mysqlClient = new MySQLClient();
                            mysqlClient.connect(function (err) {
                                if (err) {
                                    handleError(err, response);
                                } else {
                                    mysqlClient.exec('SELECT * FROM t_dishes WHERE restaurant_id=?', [restaurantId], function (err, dishes, fields) {
                                        if (err) {
                                            handleError(err, response)
                                        } else {
                                            if (!dishes) {
                                                handleError(err, response);
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

                                                var xx = {};
                                                map.keySet().forEach(function (item) {
                                                    console.log('item = ' + item);
                                                    var value = map.get(item).asArray();
                                                    console.log('value = ' + JSON.stringify(value));
                                                    xx[item] = value;
                                                });
                                                console.log('xx = ' + JSON.stringify(xx));

                                                var body = {'restaurant': restaurants[0], 'dishes': xx};
                                                console.log('body = ' + JSON.stringify(body));
                                                response.render('dishes/list', body);
                                            }
                                        }
                                    });
                                    mysqlClient.end(function (err) {
                                        if (err) {
                                            handleError(err, response)
                                        } else {
                                            console.log('end success')
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
            mysqlClient.end(function (err) {
                if (err) {
                    handleError(err, response)
                } else {
                    console.log('end success')
                }
            });
        }
    });
});

/* 获取提交订单成功界面 */
router.post('/order', function (request, response, next) {
    var success = {
        code: 0,
        message: '服务端异常'
    };
    response.send(success);
});

/* 获取提交订单成功界面 */
router.get('/order/success', function (request, response, next) {
    response.render('order/success', {totalPrice: 28});
});

/* 关于. */
router.get('/about', function (req, res, next) {
    res.render('about', {});
});

/* 关于. */
router.get('/change-password', function (req, res, next) {
    res.render('change-password', {});
});

/*  后台. */
router.get('/admin', function (req, res, next) {
    res.render('admin', {});
});

function handleError(err, response) {
    console.log(err.stack);
    response.render('error', {'message': err.message, 'error': err});
}

module.exports = router;
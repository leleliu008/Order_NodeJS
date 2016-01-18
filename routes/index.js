var express = require('express');
var router = express.Router();

var getcookieValue = require('./cookies_util.js');

var MySQLClient = require('./mysql_util.js');
var mysqlClinet = new MySQLClient();
mysqlClinet.connect(function (err) {
    if (err) {
        console.log(err.stack);
    } else {
        console.log('mysql connect success');
    }
});

var sha = require('./degist_util.js');

var ArrayList = require('./data_structure/ArrayList.js');
var Map = require('./data_structure/Map.js');
var loginMap = new Map();

function homeHanlder(request, response, next) {
    var userId = getcookieValue(request, 'userId');
    if (userId) {
        mysqlClinet.exec('SELECT * FROM t_restaurant limit 0, 10', null, function (err, rows, fieds) {
            if (err) {
                handleError(err, request);
            } else {
                console.log('SELECT * FROM t_restaurant limit 0, 10 success');

                response.render('restaurant/list', {'rows': rows});
            }
        });
    } else {
        response.redirect('/login');
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

    mysqlClinet.exec('SELECT id, name, password FROM t_user WHERE name=? AND password=?', [formData.username, password_md5], function (err, rows, fieds) {
        if (err) {
            console.log(err.stack);

            var error = {
                code: 3,
                message: '服务端异常'
            };

            response.send(error);
        } else {
            console.log('SELECT id, name, password FROM t_user WHERE name=? AND password=? success');

            if (rows.length == 0) {
                var error = {
                    code: 2,
                    message: '用户名或者密码错误'
                };

                response.send(error);
            } else {
                response.cookie('userId', rows[0].id, {
                    maxAge: 30 * 60 * 1000,
                    path: '/',
                    httpOnly: true
                });

                var currentTimeMillis = new Date().getMilliseconds();
                console.log('currentTimeMillis = ' + currentTimeMillis);
                loginMap.put(formData.username, currentTimeMillis);

                var success = {
                    code: 0,
                    message: '成功',
                    userId: rows[0].id
                };

                response.send(success);
            }
        }
    });
});

/* 获取餐馆列表 */
router.get('/restaurant/list', function (request, response, next) {

});

/* 获取美食列表 */
router.get('/dishes/list/:restaurantId', function (request, response, next) {
    var restaurantId = request.param('restaurantId');

    mysqlClinet.exec('SELECT * FROM t_restaurant WHERE id=?', [restaurantId], function (err, restaurants, fields) {
        if (err) {
            handleError(err, response)
        } else {
            if (!restaurants || restaurants.length == 0) {
                handleError(err, response);
            } else {
                mysqlClinet.exec('SELECT * FROM t_dishes WHERE restaurant_id=?', [restaurantId], function (err, dishes, fields) {
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

/* 提交订单 */
router.post('/order', function (request, response, next) {
    var userId = getcookieValue(request, 'userId');
    if (userId) {
        var today = getDayFormat();
        console.log('today = ' + today);

        mysqlClinet.exec('SELECT * FROM t_order WHERE user_id = ? AND selected_date = ?', [userId, today], function (err, rows, fieds) {
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

    mysqlClinet.exec('INSERT INTO t_order (selected_date, user_id, dishes_id, dishes_count) VALUES (?, ?, ?, ?)', [today, userId, dishes_id, dishes_count], function (err, rows, fields) {
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
router.get('/order/mine', function (request, response, next) {
    response.render('order/mine', {});
});

/* 获取所有订单界面 */
router.get('/order/all', function (request, response, next) {
    var today = getDayFormat();
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
            response.render('order/all', {orders: rows});
        }
    });
});

/* 获取提交订单成功界面 */
router.get('/order/success', function (request, response, next) {
    response.render('order/success', {totalPrice: 28});
});

/* 获取我的订单API */
router.get('/order/mine/api', function (request, response, next) {
    var userId = getcookieValue(request, 'userId');
    if (userId) {
        var today = getDayFormat();
        console.log('today = ' + today);

        //查询订单表，看是否已经创建过今天的订单
        mysqlClinet.exec('SELECT id, dishes_id, dishes_count FROM t_order WHERE user_id = ? AND selected_date = ?', [userId, today], function (err, orders, fieds) {
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
                        message: '今天您还没有创建订单'
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
    mysqlClinet.exec('SELECT name, price FROM t_dishes WHERE id = ?', [orders[i].dishes_id], function (err, dishes, fieds) {
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


/* 获取我的信息界面 */
router.get('/mine', function (request, response, next) {
    response.render('mine', {totalPrice: 28});
});

/* 获取我的信息的API */
router.get('/mine/api', function (request, response, next) {
    var userId = getcookieValue(request, 'userId');
    if (userId) {
        mysqlClinet.exec('SELECT * FROM t_user WHERE id = ?', [userId], function (err, rows, fieds) {
            if (err) {
                console.log(err.stack);

                var error = {
                    code: 1,
                    message: '服务器异常'
                };
                response.send(error);
            } else {
                console.log('mysqlClinet.exec() success');

                var data;
                if (rows && rows.length > 0) {
                    data = rows[0];
                } else {
                    data = {};
                }
                var success = {
                    code: 0,
                    message: '成功',
                    data: data
                };
                response.send(success);
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

/* 关于. */
router.get('/about', function (request, response, next) {
    response.render('about', {});
});

/* 关于. */
router.get('/about2', function (request, response, next) {
    response.render('about2', {});
});

router.get('/reset-password', function (request, response, next) {
    response.render('reset-password', {});
});

router.get('/mine/change-password', function (request, response, next) {
    response.render('change-password', {});
});

/* 修改密码. */
router.post('/mine/change-password', function (request, response, next) {
    var userId = getcookieValue(request, 'userId');
    if (userId) {
        var formData = request.body;
        console.log("formData = " + formData);
        console.log("oldPassword = " + formData.oldPassword);
        console.log("newPassword = " + formData.newPassword);

        var oldPassword_md5 = sha('md5', formData.oldPassword);
        console.log("oldPassword_md5 = " + oldPassword_md5);

        mysqlClinet.exec('SELECT id, password FROM t_user WHERE id=? AND password=?', [userId, oldPassword_md5], function (err, rows, fieds) {
            if (err) {
                console.log(err.stack);

                var error = {
                    code: 3,
                    message: '服务端异常'
                };

                response.send(error);
            } else {
                console.log('SELECT id, password FROM t_user WHERE id=? AND password=? success');

                if (rows.length == 0) {
                    var error = {
                        code: 2,
                        message: '您的旧密码错误'
                    };

                    response.send(error);
                } else {
                    var newPassword_md5 = sha('md5', formData.newPassword);
                    mysqlClinet.exec('UPDATE t_user SET password = ? WHERE id=? AND password=?', [newPassword_md5, userId, oldPassword_md5], function (err, rows, fieds) {
                        if (err) {
                            console.log(err.stack);

                            var error = {
                                code: 3,
                                message: '服务端异常'
                            };

                            response.send(error);
                        } else {
                            console.log('UPDATE t_user SET password = ? WHERE id=? AND password=? success');

                            var success = {
                                code: 0,
                                message: '密码修改成功'
                            };

                            response.send(success);
                        }
                    });
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

var config = require('../config.js');
var http = require('http');
var tbSignUtil = require('./taobaoSignUtil.js');

var verifyCodeMap = new Map();

/**
 * 获取短信验证码
 */
router.get('/verifyCode', function (request, response, next) {
    var phoneNumber = request.query.phoneNumber;
    console.log('phoneNumber = ' + phoneNumber);

    if (!phoneNumber) {
        var result = {
            code: 1,
            message: '缺少phoneNumber参数'
        };

        response.send(result);
        return;
    }

    var verifyCode = "1234";
    var params = {code: verifyCode, product: config.alidayu.product};

    // 短信发送的参数对象
    var obj = {
        format: 'json',
        method: 'alibaba.aliqin.fc.sms.num.send',
        partner_id: config.alidayu.partner_id,
        rec_num: phoneNumber,
        sign_method: 'hmac',
        sms_type: 'normal',
        sms_param: JSON.stringify(params),
        sms_free_sign_name: config.alidayu.sms_free_sign_name,
        sms_template_code: config.alidayu.sms_template_code,
        v: '2.0'
    };

    var result = tbSignUtil.sign(obj);

    obj.sign = result.sign;
    obj.timestamp = result.timestamp;

    console.log(obj);

    var requestEntity = xx(obj);

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

                verifyCodeMap.put(phoneNumber, verifyCode);

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
});

router.post('/verifyCode', function (request, response, next) {
    var requestEntity = request.body;
    if (requestEntity) {
        var phoneNumber = requestEntity.phoneNumber;
        var verifyCode = requestEntity.verifyCode;

        console.log('phoneNumber = ' + phoneNumber);
        console.log('verifyCode = ' + verifyCode);

        if (phoneNumber && verifyCode && verifyCodeMap.get(phoneNumber) == verifyCode) {
            mysqlClinet.exec("SELECT id FROM t_user WHERE phoneNumber = ?", [phoneNumber], function (err, rows, fieds) {
                if (err) {
                    console.log(err.stack);

                    var result = {
                        code: 1,
                        message: '失败'
                    };

                    response.send(result);
                    return;
                } else {
                    console.log('SELECT id FROM t_user WHERE phoneNumber = ? success');

                    if (!rows || rows.length == 0) {
                        var result = {
                            code: 1,
                            message: '您输入的手机号与您的注册信息不符合，请联系管理员'
                        };

                        response.send(result);
                    } else if (rows.length == 1) {
                        var password = sha('md5', '123456');
                        mysqlClinet.exec("UPDATE t_user SET password = ? WHERE phoneNumber = ?", [password, phoneNumber], function (err, rows, fieds) {
                            if (err) {
                                console.log(err.stack);

                                var result = {
                                    code: 1,
                                    message: '失败'
                                };

                                response.send(result);
                            } else {
                                console.log('UPDATE t_user SET password = ? WHERE phoneNumber = ? success');

                                var result = {
                                    code: 0,
                                    message: '重置密码成功'
                                };
                                response.send(result);
                            }
                            return;
                        });
                    } else {
                        var result = {
                            code: 1,
                            message: '您输入的手机号与别人有相同，请更换手机号或者联系管理员'
                        };

                        response.send(result);
                    }

                    return;
                }
            });
            return;
        }
    }

    var result = {
        code: 1,
        message: '失败'
    };

    response.send(result);
});

/*  后台. */
router.get('/admin', function (request, response, next) {
    response.render('admin/admin', {});
});

/*  后台 - 用户管理 */
router.get('/admin/user', function (request, response, next) {
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
router.get('/admin/restaurant', function (request, response, next) {
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
            response.render('admin/restaurant', {restaurants: restaurants});
        }
    });
});

/*  后台 - 菜单管理 */
router.get('/admin/dishes/:restaurantId', function (request, response, next) {
    var today = getDayFormat();
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
router.get('/admin/order', function (request, response, next) {
    var today = getDayFormat();
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

function getDayFormat() {
    var today = new Date();
    var year = today.getYear() + 1900;
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var str = year;
    str += '-';
    if (month < 10) {
        str += '0';
    }
    str += month;
    str += '-';
    if (day < 10) {
        str += '0';
    }
    str += day;
    return str;
}

function xx(obj) {
    // 参数数组
    var arr = [];
    // 循环添加参数项
    for (var p in obj) {
        arr.push(p + "=" + urlEncode(obj[p]));
    }
    // 排序
    arr.sort();
    // 参数串
    var msg = arr.join('&');
    console.log(msg);
    return msg;
}

function urlEncode(str) {
    str = (str + '').toString();

    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

module.exports = router;
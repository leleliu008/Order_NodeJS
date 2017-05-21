var express = require('express');
var router = express.Router();

var sha = require('../utils/degist.js');
var getCookieValue = require('../utils/cookie.js');
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();

/* 获取我的信息界面 */
router.get('/', function (request, response, next) {
    response.render('mine', {totalPrice: 28});
});

/* 获取我的信息的API */
router.get('/api', function (request, response, next) {
    var userId = getCookieValue(request, 'userId');
    if (userId) {
        mysqlClientInstance.exec('SELECT * FROM t_user WHERE id = ?', [userId], function (err, rows, fieds) {
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

router.get('/change-password', function (request, response, next) {
    response.render('change-password', {});
});

/* 修改密码. */
router.post('/change-password', function (request, response, next) {
    var userId = getCookieValue(request, 'userId');
    if (userId) {
        var formData = request.body;
        console.log("formData = " + formData);
        console.log("oldPassword = " + formData.oldPassword);
        console.log("newPassword = " + formData.newPassword);

        var oldPassword_md5 = sha('md5', formData.oldPassword);
        console.log("oldPassword_md5 = " + oldPassword_md5);

        mysqlClientInstance.exec('SELECT id, password FROM t_user WHERE id=? AND password=?', [userId, oldPassword_md5], function (err, rows, fieds) {
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
                    mysqlClientInstance.exec('UPDATE t_user SET password = ? WHERE id=? AND password=?', [newPassword_md5, userId, oldPassword_md5], function (err, rows, fieds) {
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

module.exports = router;

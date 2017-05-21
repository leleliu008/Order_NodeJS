var express = require('express');
var router = express.Router();

var sha = require('../utils/degist.js');
var Map = require('../utils/Map.js');
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();

var loginMap = new Map();


/* 获取登陆页面. */
router.get('/', function (req, res, next) {
    res.render('login', {});
});

/* 执行登陆请求 必须是POST请求，因为涉及到密码 */
router.post('/', function (request, response, next) {
    var formData = request.body;
    console.log(formData);
    console.log(formData.username);
    console.log(formData.password);

    var password_md5 = sha('md5', formData.password);
    console.log("password_md5 = " + password_md5);

    mysqlClientInstance.exec('SELECT id, name, password FROM t_user WHERE name=? AND password=?', [formData.username, password_md5], function (err, rows, fields) {
        if (err) {
            console.log(err.stack);

            var error = {
                code: 3,
                message: '服务端异常'
            };

            response.send(error);
        } else {
            console.log('SELECT id, name, password FROM t_user WHERE name=' + formData.username + ' AND password=' + password_md5 + ' success');

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

module.exports = router;

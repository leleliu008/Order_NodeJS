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

/*  后台 - 用户管理 */
router.get('/', function (request, response, next) {
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
            response.render('admin/user/index', {users: users});
        }
    });
});

/*  后台 - 添加用户  */
router.get('/add', function (request, response, next) {
    response.render('admin/user/add', {});
});

/*  后台 - 添加用户  */
router.post('/add', function (request, response, next) {
    var user = request.body;
    console.log('user = ' + JSON.stringify(user));

    if (user) {
        var sql = "INSERT INTO t_user (icon, name, phoneNumber, email, city, address, level, levelName, classifies) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var icon = user.icon;
        var name = user.name;
        var phoneNumber = user.phoneNumber;
        var email = user.email;
        var city = user.city;
        var address = user.address;
        var level = user.level;
        var classifies = user.classifies;

        mysqlClinet.exec(sql, [icon, name, phoneNumber, email, city, address, level, levelName, classifies], function (err, result, fields) {
            if (err) {
                console.log(err.stack);

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
    } else {
        var result = {
            code: 1,
            message: '失败'
        };

        response.send(result);
    }
});

/*  后台 - 删除全部用户  */
router.post('/delete/all', function (request, response, next) {
    var sql = "DELETE FROM t_user";
    mysqlClinet.exec(sql, null, function (err, result, fields) {
        if (err) {
            console.log(err.stack);

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

/*  后台 - 删除指定ID的用户 */
router.post('/delete/:userId', function (request, response, next) {
    var sql = "DELETE FROM t_user WHERE id = ?";
    mysqlClinet.exec(sql, [request.params.userId], function (err, result, fields) {
        if (err) {
            console.log(err.stack);

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

/*  后台 - 显示指定ID的用户 */
router.get('/show/:userId', function (request, response, next) {
    var sql = "SELECT * FROM t_user WHERE id = ?";
    mysqlClinet.exec(sql, [request.params.userId], function (err, rows, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');

            if (!rows || rows.length == 0) {
                var err = {};
                err.stack = '没有给定id的用户';
                err.message = '错误';
                handleError(err, response);
                return;
            }

            response.render('admin/user/detail', {user: rows[0]});
        }
    });
});

/*  后台 - 编辑指定ID的用户 */
router.get('/edit/:userId', function (request, response, next) {
    var sql = "SELECT * FROM t_user WHERE id = ?";
    mysqlClinet.exec(sql, [request.params.ruserId], function (err, rows, fields) {
        if (err) {
            handleError(err, response);
        } else {
            console.log(sql + ' success');

            if (!rows || rows.length == 0) {
                var err = {};
                err.stack = '没有给定id的用户';
                err.message = '错误';
                handleError(err, response);
                return;
            }

            response.render('admin/user/edit', {user: rows[0]});
        }
    });
});

/*  后台 - 修改用户信息  */
router.post('/edit/:userId', function (request, response, next) {
    var userId = request.params.userId;
    var user = request.body;
    if (userId && user) {
        var sql = "UPDATE t_user SET icon=?, name=?, phoneNumber=?, email=?, city=?, address=?, level=?, levelName=?, classifies=? WHERE id=" + userId;
        var icon = user.icon;
        var name = user.name;
        var phoneNumber = user.phoneNumber;
        var email = user.email;
        var city = user.city;
        var address = user.address;
        var level = user.level;
        var classifies = user.classifies;

        mysqlClinet.exec(sql, [icon, name, phoneNumber, email, city, address, level, levelName, classifies], function (err, result, fields) {
            if (err) {
                console.log(err.stack);

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
    } else {
        var result = {
            code: 1,
            message: '失败'
        };

        response.send(result);
    }
});

module.exports = router;
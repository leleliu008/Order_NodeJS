function run(router, mysqlClientInstance, common) {
    /*  后台 - 菜单管理 */
    router.get('/:restaurantId/dishes', function (request, response, next) {
        var restaurantId = request.params.restaurantId;
        var sql = "SELECT * FROM t_dishes WHERE restaurant_id=?";
        //查询菜单表
        mysqlClientInstance.exec(sql, [restaurantId], function (err, rows, fields) {
            if (err) {
                common.handleError(err, response);
            } else {
                console.log(sql + ' success');
                if (!rows) {
                    rows = [];
                }
                response.render('admin/dishes/index', {restaurantId: restaurantId, dishes: rows});
            }
        });
    });

    /*  后台 - 添加菜  */
    router.get('/:restaurantId/dishes/add', function (request, response, next) {
        response.render('admin/dishes/add', {restaurantId: request.params.restaurantId});
    });

    /*  后台 - 添加菜  */
    router.post('/:restaurantId/dishes/add', function (request, response, next) {
        var dishes = request.body;
        console.log('dishes = ' + JSON.stringify(dishes));

        if (dishes) {
            var sql = "INSERT INTO t_dishes (icon, name, price, level, levelName, classify) VALUES (?, ?, ?, ?, ?, ?)";
            var icon = dishes.icon;
            var name = dishes.name;
            var price = dishes.price;
            var level = 0;
            var levelName = '无极';
            var classify = dishes.classify;

            mysqlClientInstance.exec(sql, [icon, name, price, level, levelName, classify], function (err, result, fields) {
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

    /*  后台 - 删除全部菜  */
    router.post('/:restaurantId/dishes/all/delete', function (request, response, next) {
        var sql = "DELETE FROM t_dishes";
        mysqlClientInstance.exec(sql, null, function (err, result, fields) {
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

    /*  后台 - 删除指定ID的菜 */
    router.post('/:restaurantId/dishes/:id/delete', function (request, response, next) {
        var sql = "DELETE FROM t_dishes WHERE id = ?";
        mysqlClientInstance.exec(sql, [request.params.id], function (err, result, fields) {
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

    /*  后台 - 显示指定ID的菜 */
    router.get('/:restaurantId/dishes/:id/show', function (request, response, next) {
        var sql = "SELECT * FROM t_dishes WHERE id = ?";
        mysqlClientInstance.exec(sql, [request.params.id], function (err, rows, fields) {
            if (err) {
                common.handleError(err, response);
            } else {
                console.log(sql + ' success');

                if (!rows || rows.length == 0) {
                    var err = {};
                    err.stack = '没有给定id的餐馆';
                    err.message = '错误';
                    common.handleError(err, response);
                    return;
                }

                response.render('admin/dishes/detail', {dishes: rows[0]});
            }
        });
    });

    /*  后台 - 编辑指定ID的餐馆 */
    router.get('/:restaurantId/dishes/:id/edit', function (request, response, next) {
        var sql = "SELECT * FROM t_dishes WHERE id = ?";
        mysqlClientInstance.exec(sql, [request.params.id], function (err, rows, fields) {
            if (err) {
                common.handleError(err, response);
            } else {
                console.log(sql + ' success');

                if (!rows || rows.length == 0) {
                    var err = {};
                    err.stack = '没有给定id的餐馆';
                    err.message = '错误';
                    common.handleError(err, response);
                    return;
                }

                response.render('admin/dishes/edit', {restaurantId: request.params.restaurantId, dishes: rows[0]});
            }
        });
    });

    /*  后台 - 修改餐馆信息  */
    router.post('/:restaurantId/dishes/:id/edit', function (request, response, next) {
        var id = request.params.id;
        var dishes = request.body;
        if (id && dishes) {
            var sql = "UPDATE t_dishes SET icon=?, name=?, price=?, level=?, levelName=?, classify=? WHERE id=" + id;
            var icon = dishes.icon;
            var name = dishes.name;
            var price = dishes.price;
            var level = 0;
            var levelName = '无极';
            var classify = dishes.classify;

            mysqlClientInstance.exec(sql, [icon, name, price, level, levelName, classify], function (err, result, fields) {
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
}
module.exports.run = run;
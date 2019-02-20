var express = require('express');
var router = express.Router();

var common = require('../utils/common.js');
var getCookieValue = require('../utils/cookie.js');
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();

function indexHandler(request, response, next) {
    var userId = getCookieValue(request, 'userId');
    if (userId) {
        mysqlClientInstance.exec('SELECT * FROM t_restaurant limit 0, 10', null, function (err, rows, fieds) {
            if (err) {
                common.handleError(err, request);
            } else {
                console.log('SELECT * FROM t_restaurant limit 0, 10 success');

                response.render('restaurant/list', {'rows': rows});
            }
        });
    } else {
        response.redirect('/login');
    }
}

router.get('/', indexHandler);

router.get('/index', indexHandler);

module.exports = router;
var express = require('express');
var router = express.Router();

/* 退出登陆 */
router.post('/', function (request, response, next) {
    var success = {
        code: 0,
        message: '成功',
        data: null
    };

    response.send(success);
});

module.exports = router;

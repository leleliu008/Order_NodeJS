var express = require('express');
var router = express.Router();

var http = require('http');

var common = require('../utils/common.js');
var config = require('../config.js');
var tbSignUtil = require('../utils/taobaoSign.js');
var MySQLClient = require('../utils/MySQLClient.js');
var mysqlClientInstance = new MySQLClient();
var verifyCodeMap = new Map();

/**
 * 获取短信验证码
 */
router.get('/', function (request, response, next) {
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

router.post('/', function (request, response, next) {
    var requestEntity = request.body;
    if (requestEntity) {
        var phoneNumber = requestEntity.phoneNumber;
        var verifyCode = requestEntity.verifyCode;

        console.log('phoneNumber = ' + phoneNumber);
        console.log('verifyCode = ' + verifyCode);

        if (phoneNumber && verifyCode && verifyCodeMap.get(phoneNumber) == verifyCode) {
            mysqlClientInstance.exec("SELECT id FROM t_user WHERE phoneNumber = ?", [phoneNumber], function (err, rows, fieds) {
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
                        mysqlClientInstance.exec("UPDATE t_user SET password = ? WHERE phoneNumber = ?", [password, phoneNumber], function (err, rows, fieds) {
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

module.exports = router;

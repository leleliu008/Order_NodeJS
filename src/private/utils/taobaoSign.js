/**
 * 淘宝的API的签名的帮助工具
 *
 * @author 792793182@qq.com 2016-01-15.
 */
var config = require('../config.js');
var md5 = require("blueimp-md5");

// 淘宝网的App信息

function sign(obj) {
    console.log(md5);

    // 时间戳
    var time = new Date();
    var timestamp = time.getFullYear() + "-" +
        ("0" + (time.getMonth() + 1)).slice(-2) + "-" +
        ("0" + time.getDate()).slice(-2) + ' ' +
        ("0" + time.getHours()).slice(-2) + ":" +
        ("0" + time.getMinutes()).slice(-2) + ":" +
        ("0" + time.getSeconds()).slice(-2);
    obj.timestamp = timestamp;

    // 程序key
    obj.app_key = config.alidayu.AppKey;

    // 参数数组
    var arr = [];
    // 循环添加参数项
    for (var p in obj) {
        arr.push(p + obj[p]);
    }
    // 排序
    arr.sort();
    // 参数串
    var msg = arr.join('');
    console.log(msg);

    // Hmac 签名
    var sign = md5(msg, config.alidayu.AppSecret);
    console.log(sign);
    // 返回
    return {
        timestamp: timestamp,
        sign: sign.toUpperCase()
    }
}

module.exports.sign = sign;
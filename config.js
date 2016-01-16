/**
 * 配置
 *
 * @author 792793182@qq.com 2016-01-15.
 */
var db = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'db_order_dishes'
};

var alidayu = {
    AppKey: 'yourAppKey',
    AppSecret: 'yourAppSecret',
    partner_id: 'xinleju',
    product: "乐餐吧",
    sms_free_sign_name: 'youtName',
    sms_template_code: 'SMS_xxxxxxx',
};

module.exports.db = db;
module.exports.alidayu = alidayu;



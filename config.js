/**
 * 配置
 *
 * @author 792793182@qq.com 2016-01-15.
 */
var db = {
    host:'rdsm714n71rv6u0y67d2.mysql.rds.aliyuncs.com',
    port:3306,
    user:'blog',
    password:'zhuting0508',
    database: 'db_order_dishes'
};

var alidayu = {
    AppKey: '23293386',
    AppSecret: '1f50768abecd6640f4c362358b8f1246',
    partner_id: 'xinleju',
    product: "乐餐吧",
    sms_free_sign_name: '新乐居',
    sms_template_code: 'SMS_4060521',
    sms_template_code2: 'SMS_4750789'
};

module.exports.db = db;
module.exports.alidayu = alidayu;



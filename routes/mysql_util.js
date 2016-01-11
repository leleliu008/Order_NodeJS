/**
 * mysql的帮助工具
 *
 * @author 792793182@qq.com 2016-01-03.
 */
var mysql = require('mysql');

function MySQLClient() {

    var connection;

    MySQLClient.prototype.connect = function(callback) {
        connection = mysql.createConnection({
            host:'localhost',
            port:3306,
            user:'root',
            password:'root',
            database:'db_order_dishes'
        });
        connection.connect(callback);
    };

    MySQLClient.prototype.exec = function(sql, values, callback) {
        if (connection) {
            connection.query(sql, values, callback);
        } else {
            console.log("mysql is unconnection");
        }
    };

    MySQLClient.prototype.end = function(callback) {
        if (connection) {
            connection.end(callback);
        } else {
            console.log("mysql is unconnection");
        }
    }
}

module.exports = MySQLClient;

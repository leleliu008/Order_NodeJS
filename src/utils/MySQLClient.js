/**
 * mysql的帮助工具
 *
 * @author 792793182@qq.com 2016-01-03.
 */

var config = require('../config.js');
var mysql = require('mysql');

function MySQLClient() {

    var connection;

    function connect(callback) {
        connection = mysql.createConnection(config.db);
        connection.on('error', function (err) {
            console.log('connection() error', err);

            // 如果是连接断开，自动重新连接
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                connect(callback);
            } else {
                throw err;
            }
        });
        connection.connect(callback);
    }

    MySQLClient.prototype.exec = function(sql, values, callback) {
        if (connection) {
            connection.query(sql, values, callback);
        } else {
            console.log("mysql is unConnection, try to reconnect");
            connect(function (err) {
                if (err) {
                    console.log(err.stack);
                } else {
                    console.log('mysql connect success');
                    connection.query(sql, values, callback);
                }
            });
        }
    };

    MySQLClient.prototype.end = function(callback) {
        if (connection) {
            connection.end(callback);
        } else {
            console.log("mysql is unConnected");
        }
    };
}

module.exports = MySQLClient;

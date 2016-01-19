
function handleError(err, response) {
    console.log(err.stack);
    response.render('error', {'message': err.message, 'error': err});
}

function getDayFormat() {
    var today = new Date();
    var year = today.getYear() + 1900;
    var month = today.getMonth() + 1;
    var day = today.getDate();

    var str = year;
    str += '-';
    if (month < 10) {
        str += '0';
    }
    str += month;
    str += '-';
    if (day < 10) {
        str += '0';
    }
    str += day;
    return str;
}

function getEncodedURL(obj) {
    // 参数数组
    var arr = [];
    // 循环添加参数项
    for (var p in obj) {
        arr.push(p + "=" + urlEncode(obj[p]));
    }
    // 排序
    arr.sort();
    // 参数串
    var msg = arr.join('&');
    console.log(msg);
    return msg;
}

function urlEncode(str) {
    str = (str + '').toString();

    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}

module.exports.handleError = handleError;
module.exports.getDayFormat = getDayFormat;
module.exports.getEncodedURL = getEncodedURL;
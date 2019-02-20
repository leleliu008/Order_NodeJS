/**
 * 获取Cookie值
 *
 * @author 792793182@qq.com 2016-01-03.
 */
function getCookieValue(request, key) {
    var cookies = request.headers.cookie;
    console.log("cookies = " + cookies);

    if (cookies) {
        cookies = cookies.split(';');
        for (var i in cookies) {
            console.log(cookies[i]);
            var index = cookies[i].replace(" ", "").indexOf(key);
            console.log('index = ' + index);

            if (index > -1) {
                var kv = cookies[i].split('=');
                console.log('kv = ' + kv);
                if (kv[0] == key) {
                    console.log('value = ' + kv[1]);
                    return kv[1];
                } else if (kv[0] == ' ' + key) {
                    console.log('value = ' + kv[1]);
                    return kv[1];
                }
            }
        }
    }

    return null;
}

module.exports = getCookieValue;
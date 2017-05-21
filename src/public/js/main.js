/**
 *
 * @author 792793182@qq.com 2016-01-17.
 */

/**
 * 给String扩展一个startWith方法
 * @param prefix      以什么开始
 * @returns {boolean}
 */
String.prototype.startWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix;
};

/**
 * 客户端是否是Android系统
 * @returns {boolean}
 */
function isAndroid() {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('android') > -1);
}

/**
 * 客户端是否是iphone
 * @returns {boolean}
 */
function isIphone() {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('iphone') > -1);
}

/**
 * 客户端是否是iPad
 * @returns {boolean}
 */
function isIpad() {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('ipad') > -1);
}

/**
 * 客户端是否是手机
 * @returns {boolean}
 */
function isPhone() {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('iphone') > -1 ||
    ua.indexOf('android') > -1);
}

/**
 * 客户端是否是移动设备
 * @returns {boolean}
 */
function isMobile() {
    var ua = navigator.userAgent.toLowerCase();
    return (ua.indexOf('iphone') > -1 ||
    ua.indexOf('ipad') > -1 ||
    ua.indexOf('android') > -1);
}

/**
 * 客户端是否是Windows系统
 * @returns {boolean}
 */
function isWindows() {
    var browser = navigator.appName;
    return (browser === "Microsoft Internet Explorer");
}

/**
 * 获得浏览器的版本号
 * @returns {Number}
 */
function getBrowserVersion() {
    return parseFloat(navigator.appVersion);
}

/**
 * 客户端是否是IE8
 * @returns {boolean}
 */
function isIE8() {
    var browser = navigator.appName;
    if (browser === "Microsoft Internet Explorer") {
        var version = parseFloat(navigator.appVersion);
        return (version == 4);
    } else {
        return false;
    }
}

/**
 * 客户端是否是IE10以下的IE
 * @returns {boolean}
 */
function isIE10Below() {
    var browser = navigator.appName;
    if (browser === "Microsoft Internet Explorer") {
        var version = parseFloat(navigator.appVersion);
        return (version <= 5);
    } else {
        return false;
    }
}

function log(msg) {
    if (window.console && console.log) {
        console.log(msg);
    }
}

/**
 * 保存
 * @param url 要保存的资源地址
 */
function saveAs(url) {
    var openedWindow = window.open(url);
    openedWindow.document.execCommand("saveAs", true, url);
}

function showAlert(message, callback) {
    parent.layer.alert(message, {
        title: '',
        closeBtn: 0,
        shift: 2 //动画类型
    }, callback);
}

function asyncGet(url, queryObject, successCallback, errorCallback) {
    if (!queryObject) {
        queryObject = {};
    }
    if (!errorCallback) {
        errorCallback = function () { //默认的请求出错处理
            showAlert('请求失败，请重试！');
        }
    }
    $.ajax({
        url: url,                //请求的url地址，这是相对于现在的位置的地址
        dataType: 'json',        //返回格式为json
        async: true,             //请求是否异步，默认为异步，这也是ajax重要特性
        data: queryObject,       //参数值
        type: 'GET',             //请求方式
        success: successCallback,//成功的回掉函数
        error: errorCallback     //失败的回掉函数
    });
}

function asyncPost(url, requestBody, successCallback, errorCallback) {
    if (!requestBody) {
        requestBody = {};
    }
    if (!errorCallback) {
        errorCallback = function () { //默认的请求出错处理
            showAlert('请求失败，请重试！');
        }
    }
    $.ajax({
        url: url,                //请求的url地址，这是相对于现在的位置的地址
        dataType: 'json',        //返回格式为json
        async: true,             //请求是否异步，默认为异步，这也是ajax重要特性
        data: requestBody,       //参数值
        type: 'POST',            //请求方式
        success: successCallback,//成功的回掉函数
        error: errorCallback     //失败的回掉函数
    });
}

//调整版权信息的所在位置
function resizeCopyright() {
    var panel = $('.panel');
    var bodyHeight = $(document.body).height();
    log('bodyHeight = ' + bodyHeight);
    var margin = 10;
    var containerHeight = bodyHeight - margin;
    panel.css('min-height', containerHeight);
}

function resizeTagClouds(toWidth) {
    var tagClouds = $('.tag-clouds');

    if (!tagClouds) {
        return;
    }

    if (!toWidth) {
        toWidth = 180;
    }

    var tagCloudsItem = $('.tag-clouds-item');

    var marginLeft = parseInt(tagCloudsItem.css('margin-left'));
    var marginRight = parseInt(tagCloudsItem.css('margin-right'));
    log('marginLeft = ' + marginLeft + ', marginRight = ' + marginRight);

    var extWidth = marginLeft + marginRight;
    log('extWidth = ' + extWidth);

    //父容器的宽度
    var parentWidth = tagClouds.width();
    log('parentWidth = ' + parentWidth);

    //看看最多能放几个子容器
    var num = Math.floor(parentWidth / (toWidth + extWidth));
    log('num = ' + num);

    //应该的宽度
    var measuredWidth = Math.floor(parentWidth / num) - extWidth;
    log('measuredWidth = ' + measuredWidth);

    //最后一个应该的宽度
    var y = parentWidth - (num - 1) * (measuredWidth + extWidth) - extWidth;
    log('y = ' + y);

    var length = tagClouds.children().length;
    for (var i = 1; i <= length; i++) {
        if (i % num == 0) {
            tagClouds.children('div:nth-child(' + i + ')').css('width', y + 'px');
        } else {
            tagClouds.children('div:nth-child(' + i + ')').css('width', measuredWidth + 'px');
        }
    }
}

function resizeKeyValue() {
    var keyValueContainer = $('.key-value-container');
    if (keyValueContainer) {
        keyValueContainer.children('.value').each(function (index, item) {
            $(this).parent().css('height', this.scrollHeight);
        });
    }
}

function onResize() {
    resizeTagClouds();
    resizeCopyright();
}

function handleURL() {
    var urlPath = window.location.pathname;

    var items = ['', 'navigation', 'it', 'math', 'book', 'discover', 'words', 'work', 'life'];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (urlPath.startWith("/" + item)) {
            if (urlPath == '/' && item == '') {
                item = 'index';
            }
            $('#' + item).attr("class", "active");
        }
        handleURLInternal(item);
    }

    $('#register').click(function () {
        window.location.href = '/register';
    });
}

function handleURLInternal(item) {
    if (item == '') {
        item = 'index';
    }
    $('#' + item).click(function () {
        window.location.href = '/' + item;
    });
    $('#' + item + '_').click(function () {
        window.location.href = '/' + item;
    });
}

var isSlidingMenuShowing = false;
function toggleSlidingMenu() {
    var slidingMenu = $('.sliding-menu');
    var mask = $('.mask');

    if (isSlidingMenuShowing) {
        slidingMenu.animate({width: 0}, 300, function () {
            isSlidingMenuShowing = false;
            mask.hide();
            slidingMenu.css('display', 'none');
            $(document.body).css('overflow', 'auto');
        });
    } else {
        slidingMenu.css('display', 'block');
        slidingMenu.animate({width: '200px'}, 300, function () {
            isSlidingMenuShowing = true;
            mask.show();
            $(document.body).css('overflow', 'hidden');
        });
    }
}

function handleMenuIcon() {
    $('.menu-icon').click(toggleSlidingMenu);
    var mask = $('.mask');
    //移动端的touch事件
    mask.on('touchstart', function (event) {
        event.preventDefault();

        toggleSlidingMenu();
    });
    mask.click(toggleSlidingMenu);
}

var isQrCodeGenerated = false;
var isFloatingMenuShowing = false;

function closeQRCodePanel(qrCodePanel) {
    qrCodePanel.animate({width: 0, height: 0}, 300, function () {
        qrCodePanel.css('display', 'none');
        isFloatingMenuShowing = false;
    });
}

function showQRCodePanel(qrCodePanel) {
    qrCodePanel.css('display', 'block');
    qrCodePanel.animate({width: 170, height: 210}, 300, function () {
        isFloatingMenuShowing = true;
        if (!isQrCodeGenerated) {
            isQrCodeGenerated = true;
            loadScript('/bower_components/jquery-qrcode/jquery.qrcode.min.js', function () {
                $('.qrcode').qrcode({width: 130, height: 130, text: window.location.href});
            })
        }
    });
}

function handleFloatingMenu() {
    var qrCodeBtn = $('.btn-qrcode');
    //移动端没有必要出现此按钮；IE8不支持该插件，所以就不支持了，反正IE8使用的也不多了
    if (!isMobile() && !isIE8()) {
        qrCodeBtn.css('display', 'block');

        var qrCodePanel = $('.qrcode-panel');
        qrCodeBtn.click(function () {
            if (isFloatingMenuShowing) {
                closeQRCodePanel(qrCodePanel);
            } else {
                showQRCodePanel(qrCodePanel);
            }
        });
        $(document.body).click(function () {
            if (isFloatingMenuShowing) {
                closeQRCodePanel(qrCodePanel);
            }
        });
    }
}

function handleLoginOrQuit() {
    $('#loginOrQuit').click(function () {
        if (isPhone()) {
            var isLogin = false;
            if (isLogin) {
                loadScript("/bower_components/layer/src/layer.js", function () {
                    performQuit();
                });
            } else {
                isLogin = false;
                window.location.href = '/login';
            }
        } else {
            loadScript("/bower_components/layer/src/layer.js", function () {
                var isLogin = false;
                isLogin ? performQuit() : performLogin();
            });
        }
    });
}

function performLogin() {
    layer.open({
        closeBtn: 1,
        shift: 2, //动画类型
        type: 2,
        title: '登陆',
        content: '/login',
        area: ['350px', '280px']
    });
}

function performQuit() {
    layer.alert('您确定要退出吗？', {
        skin: 'layui-layer-molv',  //样式类名
        closeBtn: 0,
        shift: 2, //动画类型
        btn: ['确定', '取消']
    }, function (index) {
        layer.close(index);

        $.ajax({
            url: '/quit',                //请求的url地址，这是相对于现在的位置的地址
            dataType: 'json',            //返回格式为json
            async: true,                 //请求是否异步，默认为异步，这也是ajax重要特性
            data: {},                    //参数值
            type: 'POST',                //请求方式
            success: function (response) {      //请求成功时处理
                var errMsg = '注销失败';

                if (response) {
                    if (response.code == 0) {
                        //TODO
                        return;
                    }

                    if (response.message) {
                        errMsg = response.message;
                    }
                }

                layer.alert(errMsg, {
                    skin: 'layui-layer-molv',  //样式类名
                    closeBtn: 0,
                    shift: 2 //动画类型
                });
            },
            error: function () {          //请求出错处理
                layer.alert('请求失败，请重试！', {
                    skin: 'layui-layer-molv',  //样式类名
                    closeBtn: 0,
                    shift: 2 //动画类型
                });
            }
        });
    });
}

var isMusicPlaying = false;

/**
 * 播放音乐
 * @param viewId audio控件的id
 * @param url    要播放的音频的地址，可以是相对地址
 */
function prepareMusic(viewId, url) {
    var mediaPlayer = document.getElementById(viewId);
    mediaPlayer.src = url;

    if (isMobile()) {
        //iOS和Android高版本上，为了流量的考虑，系统不支持自动播放，必须让用户触发。使用微信JS SDK可以解决此问题
        loadScript(window.location.protocol + '//res.wx.qq.com/open/js/jweixin-1.0.0.js', function () {
            wx.config({});
            wx.ready(function () {
                mediaPlayer.play();
                isMusicPlaying = true;
            });
        });
        //Mobile Safari上必须让用户触发，只要点击了屏幕就触发
        document.addEventListener('touchstart', function () {
            mediaPlayer.play();
            isMusicPlaying = true;
        }, false);
    } else {
        mediaPlayer.play();
        isMusicPlaying = true;
    }
}

function playMusic(viewId) {
    var mediaPlayer = document.getElementById(viewId);
    mediaPlayer.play();
    isMusicPlaying = true;
}

function stopMusic(viewId) {
    var mediaPlayer = document.getElementById(viewId);
    mediaPlayer.pause();
    isMusicPlaying = false;
}

function togglePlayMusic(viewId) {
    isMusicPlaying ? stopMusic(viewId) : playMusic(viewId);
}

var loadedLinkMap = {};
function loadLink(url, callback) {
    if (loadedLinkMap[url]) {
        callback();
        return;
    }
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    if (typeof(callback) != "undefined") {
        if (link.readyState) {
            link.onreadystatechange = function () {
                if (link.readyState == "loaded" || link.readyState == "complete") {
                    link.onreadystatechange = null;
                    loadedLinkMap[url] = true;
                    callback();
                }
            };
        } else {
            link.onload = function () {
                loadedLinkMap[url] = true;
                callback();
            };
        }
    }
    link.href = url;

    var head = document.getElementsByTagName('head')[0];
    head.insertBefore(link, head.getElementsByTagName('link')[1]);
}

var loadedScriptMap = {};
function loadScript(url, callback) {
    if (loadedScriptMap[url]) {
        callback();
        return;
    }
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof(callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    loadedScriptMap[url] = true;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                loadedScriptMap[url] = true;
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

function setCookie(cookieName, cookieValue, cookieExpires, cookiePath) {
    cookieValue = escape(cookieValue);//编码latin-1

    if (!cookieExpires || cookieExpires == "") {
        var nowDate = new Date();
        nowDate.setMonth(nowDate.getMonth() + 6);
        cookieExpires = nowDate.toGMTString();
    }

    if (!cookiePath || coocookiePath == "") {
        cookiePath = "/";
    }
    cookiePath = ";Path=" + cookiePath;

    document.cookie = cookieName + "=" + cookieValue + ";expires=" + cookieExpires + cookiePath;
}

function getCookieValue(cookieName) {
    var cookieValue = document.cookie;
    var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
    if (cookieStartAt == -1) {
        cookieStartAt = cookieValue.indexOf(cookieName + "=");
    }
    if (cookieStartAt == -1) {
        cookieValue = null;
    } else {
        cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
        var cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
        if (cookieEndAt == -1) {
            cookieEndAt = cookieValue.length;
        }
        cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt));//解码latin-1
    }
    return cookieValue;
}

$(document).ready(function () {
    if (isIE10Below()) {
        var tagCloudsItem = $('.tag-clouds-item');
        tagCloudsItem.removeClass('tag-clouds-item');
        tagCloudsItem.addClass('tag-clouds-item-ie');
        var needShowIETip = getCookieValue('needShowIETip');
        if (!needShowIETip) {
            loadScript("/bower_components/layer/src/layer.js", function () {
                var index = layer.alert('您使用的浏览器可能是Internet Explorer，不是符合国际标准的浏览器！' +
                    '为了最好的显示效果，建议您使用Google Chrome、Firefox、Safari、360极速浏览器等！', {
                    btn: ['确定并不再显示', '确定']
                }, function () {
                    setCookie('needShowIETip', 'true');
                    layer.close(index);
                });
            });
        }
    }

    handleURL();
    handleMenuIcon();
    handleFloatingMenu();
    handleLoginOrQuit();
    window.onresize = onResize;
    onResize();
});
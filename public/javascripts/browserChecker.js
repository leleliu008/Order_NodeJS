/**
 *
 * @author 792793182@qq.com 2015-11-12.
 */
var browser = navigator.appName;
var version = parseFloat(navigator.appVersion);

if (browser == "Microsoft Internet Explorer") {
    if(version <= 3) {
        //如果是IE8一下的IE内核，提示用户
        alert("鄙视使用IE的人，如果想看，请使用Google-Chrome、Firefox等浏览器");
    }
}
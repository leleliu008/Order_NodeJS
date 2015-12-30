/**
 *
 * @author 792793182@qq.com 2015-11-12.
 */
var browser = navigator.appName;
var version = parseFloat(navigator.appVersion);

if (browser == "Microsoft Internet Explorer") {
    if(version <= 4) {
        alert("鄙视使用IE的人，如果想看，请使用Google-Chrome、Firefox等浏览器");
    }
}
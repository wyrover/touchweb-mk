/**
 *   对Date的扩展，将 Date 转化为指定格式的String 
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
 */
exports.dateFormat = (date, fmt) => { //author: meizz 
    if (typeof date == 'string' || typeof date == 'number') {
        try {
            date = new Date(date);
        } catch (error) {
            return "";
        }
    }
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * OS
 */
exports.os = {
    ua: navigator.userAgent,
    wechat: function(){return this.ua.match(/(MicroMessenger)\/([\d\.]+)/i)},
    android: function(){return this.ua.match(/(Android);?[\s\/]+([\d.]+)?/)},
    ios: function(){return this.ua.match(/(iPhone\sOS)\s([\d_]+)/)}
};

/** 
 * 获取本地存储的数据
 * @param  {string} key
 */
exports.getStore = (key) => {
    var val = localStorage.getItem(key) || getCookie(key);
    return JSON.parse(val) || {};
}

/**
 * 存储本地数据 both cookie and ls 
 * @param  {any} key
 * @param  {any} val
 */
exports.setStore = (key, val) => {
    var sval = JSON.stringify(val);
    setCookie(key, sval);
    try {
        localStorage.setItem(key, sval);
    } catch (e) {
    }
}



exports._groupBy = (list, fn) => {
    var _r = {}, _k = null;
    for (var i = 0, len = list.length; i < len; i++) {
        _k = fn(list[i]);
        _r[_k] = !_r[_k] ? [] : _r[_k];
        _r[_k].push(list[i]);
    }
    _k = null;
    return _r;
}

exports._find = (list, keyName, val) => {
    var _r = null;
    for (var i = 0, len = list.length; i < len; i++) {
        if (list[i][keyName] == val) {
            _r = list[i];
            break;
        }
    }
    return _r;
}

exports._sortBy = (list, keyName) => {
    var i = list.length, j, _cV;
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (list[j][keyName] > list[j + 1][keyName]) {
                _cV = list[j];
                list[j] = list[j + 1];
                list[j + 1] = _cV;
            }
        }
        i--;
    }
    j = _cV = null;
    return list;
}

exports._filter = (list, fn) => {
    var _r = [], _cV = null;
    for (var i = 0, len = list.length; i < len; i++) {
        _cV = list[i];
        fn(_cV) && _r.push(_cV);
    }
    _cV = null;
    return _r;
}

exports._extend = () => {
    var _arg = arguments;
    if (!_arg.length) return '';
    var _base = _arg[0];
    if (_arg.length > 1)
        for (var i = 1, len = _arg.length; i < len; i++)
            for (var j in _arg[i])
                _base[j] = _arg[i][j];
    return _base;
}

exports.checkPhone = (phone) => {
    return /^[1][0-9]{10}$/.test(phone);
},
exports.checkVerifyCode = (code) => {
    return /^[0-9]{4}$/.test(code);
},
exports.checkNull = (str) => {
    return (!str || !str.replace(/\s+/g, ''));
}
exports.isEmptyObjec = (obj) => {
    for ( var key in obj ) {
        return false;
    }
    return true;
}

//

function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/**
 * 下拉加载的方法
 * @param limitRange number //<可不传>默认：30 距离底部x像素时加载
 * @param fn function //达到下拉加载的条件时运行的方法
*/
/*
************************本版本用不到暂时先隐藏********************************
exports.pullLoadMore = (vm, fn, limitRange) => {
    //》》》》》》仅供参考《《《《《《
    //如果是window的滚动事件会污染其他页面
    (vm || window).onscroll=function(){
        fn && fn(document.body.scrollTop*1+window.innerHeight*1+(limitRange || 30) > document.body.offsetHeight*1);
    }
}
*/

/**
 * 打印页面上面的宽高等数值
 * @param delayTime number //<可不传>默认：0 用于延迟加载
*/
/*
*************************暂时先注释，计算高度时候会用到************************
exports.showPageParams = (delayTime) => {
    showPageParams(delayTime);
}

function showPageParams(delayTime){
    window.setTimeout(function(){
        var parameters={
                "网页可见区域宽 - document.body.clientWidth": document.body.clientWidth,
                "网页可见区域高 - document.body.clientHeight": document.body.clientHeight,
                "网页可见区域宽(包括边线的宽) - document.body.offsetWidth": document.body.offsetWidth ,
                "网页可见区域高(包括边线的高) - document.body.offsetHeight": document.body.offsetHeight ,
                "网页正文全文宽 - document.body.scrollWidth": document.body.scrollWidth,
                "网页正文全文高 - document.body.scrollHeight": document.body.scrollHeight,
                "网页被卷去的高 - document.body.scrollTop": document.body.scrollTop,
                "网页被卷去的左 - document.body.scrollLeft": document.body.scrollLeft,
                "网页正文部分上 - window.screenTop": window.screenTop,
                "网页正文部分左 - window.screenLeft": window.screenLeft,
                "屏幕分辨率的高 - window.screen.height": window.screen.height,
                "屏幕分辨率的宽 - window.screen.width": window.screen.width,
                "屏幕可用工作区高度 - window.screen.availHeight": window.screen.availHeight,
                "屏幕可用工作区宽度 - window.screen.availWidth": window.screen.availWidth,
                "window.innerHeight": window.innerHeight
            },
            outputParam='',
            line='----------------------------------------------------------------',
            linePre='||\t\t'
        for(var key in parameters)
            outputParam+=linePre+parameters[key]+'\n'+linePre+''+key+'\n'+line+'\n';
        console.log('=====================各种宽度和高度的数据=========================');
        console.log(outputParam);
        console.log('================================================================');
    },delayTime || 0);
}
*/

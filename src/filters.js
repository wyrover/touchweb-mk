
var util = require('./libs/util.js');
var widgetDate = require('./libs/widget-date.js');

/**格式化时间
 *  @param {string} val 需要格式化的时间
 *  @param {string} formate 格式
 */
exports.datetime = (val, formate) => {
    return util.dateFormat(new Date(val), formate || 'yyyy-MM-dd hh:mm:ss');
}

/**
 * 字符截取
 * @param  {any} 原值
 * @param  {any} 截取长度
 * @returns val
 */
exports.limit = (val, max) => {
    if (!val) {
        return "";
    }

    return val.length > max ? val.substring(0, max) : val;
}
/**
 * @param  {any} 取整
 * @param  整数
 */
exports.mathFloor = (v) => {
    return !v? 0:~~(v*1);
}

/** 七牛图片缩放
 *  @param {string} url 图片地址
 *  @param {int} width 宽度
 */
exports.qnimg = (url, width) => {
    return url + '?imageView/0/w/' + width;
}

/** 距离显示
 *  @param {int} url 距离显示
 */
exports.distance = (value) => {
    if (value <= 0) {
        return '0';
    } else if (value < 1000) {
        return Math.floor(value) + ' m';
    } else {
        return (value / 1000).toFixed(2) + ' km'
    }
}

/** 时间处理类（参照widget-date.js中的方法）
 * @param funcName  widgetDate中的方法名
 * @param arg1 入参1
 * @param arg2 入参2
 * @param arg3 入参2
 * ========eg：
 * 将页面19700101转成 ‘1970年1月1日’ 可写成：
 * {{startTime | widgetDate '_plainDateStr' 'yyyy年MM月dd日' true}} 
 */
exports.widgetDate = (arg1, funcName, arg2, arg3) => {
    return widgetDate[funcName](arg1, arg2, arg3);
}

/** 根据yyyyMMdd的字符串形式获得当前的星期几
 * @param plainStr string  //20160101
 * @param version  string  //<可不传>  默认：cn_1 可在widget-date.js中workDayName查到
*/
exports.plainStrToWorkDayName = (plainStr, version) => {
    return widgetDate._workDayName(widgetDate._plainDate(plainStr), version || 'cn_1');
}

/** 根据yyyyMMdd的字符串形式获得转成 format形式+workday （eg：2016年3月4日 周五）
 * @param plainStr string  //20160101
 * @param isForceTwo boolean //<可不传> 默认：false 是否输出的日期是控制两位输出的 （eg：03月04日）
 * @param format string //<可不传> 默认：'MM月dd日' 输出日期格式 eg：yyyy-MM-dd
 * @param version string //<可不传>  默认：cn_1 可在widget-date.js中workDayName查到
*/
exports.plainStrToLocalDateName = (plainStr, isForceTwo, format, version) => {
    var _d = widgetDate._plainDate(plainStr);
    return widgetDate._dateToStr(_d, format || 'MM月dd日 ', !!isForceTwo) + widgetDate._workDayName(_d, version || 'cn_1');
}

/** 根据开始时间和结束时间都为yyyyMMdd形式的字符串， 获取相差的时间
 * @param startPlainStr string //开始时间 eg：20160101
 * @param endPlainStr string //结束时间 eg：20160102
 * @param unit string //<可不传> 默认：d 相差时间的单位  d =天 h =小时  m = 分钟 s =秒  ms=毫秒 
*/
exports.plainStrDateDiff = (startPlainStr, endPlainStr ,unit) =>{
    if(!startPlainStr || !endPlainStr) return '';
    var _start=widgetDate._plainDate(startPlainStr),
        _end=widgetDate._plainDate(endPlainStr);
    unit=unit || 'd';
    return ~~widgetDate._diff(_start, _end, unit);
}

/** 手机号格式化 将11位手机号码转成中间四位为 * 号 （eg：13800138000 将转成 138****8000）
 * 如果：1）没有数据将返回匿名，2）有数据但不满足手机号11位格式将源数据返回 
 * @param phoneNum string //手机号码 eg：13800138000
*/
exports.phoneNumFormat = (phoneNum) => {
    var _res='';
    if(!phoneNum || !(phoneNum+'').replace(/\s+/g,'')){
        _res='匿名';
    }else{
        _res=phoneNum+'';
        if(/^\d{1,}$/.test(_res) && 11==_res.length)
           _res=_res.match(/^\d{3}/) + '****' + _res.match(/\d{4}$/);
    }
    return _res;
}

/** 用于详情页面床的单位是否含有单位（米）
 * ps: 因为数据中，去哪儿有单位（米），ots没有单位，故加上本过滤器用于添加相应的单位（米）
 * @param value string //1.2米
*/
exports.bedLengthUnit = (value) => {
    if(value && !/米/g.test(value+'')){
        return value+='米';
    }else{
        return value || '';
    }
}

/** 移除数据的结尾是否含有“省”，“市”字样
 * @param cityName string //上海市
*/
exports.removeCityNameWords = (cityName) =>{
    cityName=cityName || '';
    return cityName.replace(/市|省$/, '');
}




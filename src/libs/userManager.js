
var util = require('./util.js');

module.exports = (function () {
    var apis = {
        sendVerifyCode(phone) {  //send verify code by phone
            var param = { phone: phone };
            return service.getVerifyCode(param);
        },
        getExchangeCodeStatus(code) {    //verify exchange code is valid or not
            var param = { channelcode: code };
            return service.checkExchangeCode(param);
        },
        login(phone, code, unionid) {  //sign in or sign on
            var that = this;
            var isSignon = false;
            //try get unionid form cookie
            // if(!unionid)
            //     unionid = util.getCookie("m29")||'';
            //validate code    
            return that.verifyCode(phone, code)
                .then(function () {
                    return that.checkUser(phone);
                }, function (res) {
                    console.log(res);
                })
                .then(function (data) {
                    if (data.check == 'T') {
                        isSignon = true;
                        data.token && util.setCookie("m28", data.token || '');
                        data.unionid && util.setCookie("m29", data.unionid || '');
                        return data;
                    } else if (data.check == 'F' && data.token) {
                        isSignon = true;
                        return that.bindUserPhone(phone, unionid);
                    } else if (data.check == 'F' && !data.token) {
                        //no token
                        return that.bindUserPhone(phone, unionid);
                    }
                }, function (res) {
                    console.log(res);
                })
                .then(function (data) {
                    data.token && util.setCookie("m28", data.token || '');
                    data.isSignon = isSignon;
                    return data;  //return a Promise
                });
        },
        verifyCode(phone, code) {  //validate the code
            var param = { phone: phone, code: code };
            return new Promise(function (resolve, reject) {
                service.verifyCode(param)
                    .then(function (res) {
                        if (res && res.data.success) {
                            resolve('验证码验证成功');
                        } else {
                            alert('验证码验证失败!')
                            reject('验证码验证失败');
                        }
                    });
            });
        },
        checkUser(phone) { //check if user bind
            var param = { phone: phone, ostype: 3 };
            return new Promise(function (resolve, reject) {
                service.checkBind(param)
                    .then(function (res) {
                        var data = res.data;
                        if (data.success) {
                            resolve(data);
                        } else {
                            reject("接口调用失败！");
                        }
                    }, function (res) {
                        reject("接口调用失败！");
                    });
            });
        },
        bindUserPhone(phone, unionid) {
            var param = { phone: phone, ostype: 3 };
            if (unionid) {
                param.unionid = unionid;
            }
            return new Promise(function (resolve, reject) {
                service.bindPhone(param).then(function (res) {
                    var data = res.data;
                    if (data.token) {
                        resolve(data);
                    } else {
                        alert("没有token!");
                        reject("没有token!");
                    }
                }, function (data) {
                    reject(data.errmsg);
                });
            });
        },
        /////////////////////////////////////////////////////////////////////////
        //登陆
        userLogin(phone, code, unionid,channelid, fn, errFn) {  //sign in or sign on
            var that = this;
            var result = {
                token: '',
                unionid: '',
                phone: phone,
                isSignon: false
            }
            var isBind = false;
            var isReg = false;

                that.getCheckUserStatus({ phone: phone }, function (res) {
                    util.setCookie("phone", phone || '');
                    if (res.check == 'T') {
                        res.token && util.setCookie("m28", res.token || '');
                        res.unionid && util.setCookie("m29", res.unionid || '');
                        result.isSignon = true;
                        result.token = res.token;
                        result.unionid = res.unionid;
                        if (fn)
                            fn(result);
                        if (errFn)
                            errFn();
                        return;
                    } else if (res.check == 'F' && res.token) {
                        result.isSignon = true;
                        isBind = true;
                        isReg = true;
                        if(!unionid){
                            unionid = util.getCookie("m29")||"";
                        }
                        res.token && util.setCookie("m28", res.token || '');
                        result.token = res.token || util.getCookie("m28");
                        if (fn){
                            fn(result);
                        }   
                    } else if (res.check == 'F' && !res.token) {
                        isReg = false;
                        isBind = true;
                    }
                    if (!isReg) {
                        var param = { phone: phone, unionid: unionid,channelid:channelid };
                        that.setUserPhoneBind(param, function (res) {
                            res.token && util.setCookie("m28", res.token || '');
                            result.token = res.token || util.getCookie("m28");
                            result.unionid = unionid || '';
                            if (fn)
                                fn(result);
                        }, errFn)
                    }
                }, errFn)
           /* }, errFn)*/

        },
        //绑定用户
        setUserPhoneBind(param, fn, errFn) {
            var args = { phone: param.phone, ostype: 3 ,comefrom:param.channelid};
            if (param.unionid)
                args.unionid = param.unionid;
            service.bindPhone(args)
                .then(function (res) {
                    res = res.data || {};
                    if (!res.token && !util.getCookie("m28")) {
                        if (errFn)
                            errFn('未获取到用户Token信息!');
                        return alert('未获取到用户Token信息!');
                    }
                    if (fn)
                        fn(res);
                }, function (data) {
                    if (errFn)
                        errFn('调用绑定用户信息接口失败！');
                    return alert('调用绑定用户信息接口失败！');
                });
        }
    };

    return apis;

})();
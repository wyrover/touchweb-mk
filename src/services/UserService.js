var config = require('../config.js');

module.exports = {
    init: function (Vue) {
        return {
            getVerifyCode(data) { //发送验证码
                return Vue.http.post(config.otsHost + 'ots/login/code', data);
            },
            login(data){ //登录
                return Vue.http.post(config.otsHost + 'ots/login/login', data);
            }
        }
    }
};
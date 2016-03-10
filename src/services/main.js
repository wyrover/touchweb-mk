var UserService = require('./UserService.js');
var wxService = require('./wxService.js');

var Vue = require('vue');
var VueResource = require('vue-resource');
var util = require('../libs/util.js');

// Javascript
Vue.use(VueResource);
// HTTP相关
Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true
Vue.http.interceptors.push({
    request(request) {
        //request.data = _.extend(request.data, { callmethod: 6, callversion: 3.5 });
        request.data = util._extend(request.data, { callmethod: 6, callversion: 3.5, callMethod: 6 });
        return request;
    },
    response(response) {
        return response
    }
});

module.exports = (function (Vue) {
    // var apis = _.extend(
    //             UserService.init(Vue),
    //             wxService.init(Vue)
    //         );
    var apis = util._extend(
        UserService.init(Vue),
        wxService.init(Vue)
        );

    return apis;

})(Vue);
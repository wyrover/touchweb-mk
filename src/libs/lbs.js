var util = require('./util.js');

module.exports = {
    ready: function(callback) {
        if (!util.os.wechat){
            return;
        }
        
        if (window.wxIsReady) {
            callback && callback();
            return;
        }

        var param = {};
        param.url = encodeURIComponent(location.protocol + '//' + location.host + location.pathname + location.search);

        services.getWechatConfig(param)
            .then(function(res) {
                var config = res.data;
                
                wx.config({
                    debug: false,
                    appId: config.appId,
                    timestamp: config.timestamp,
                    nonceStr: config.nonceStr,
                    signature: config.signature,
                    jsApiList: [
                        'getLocation'
                    ]
                });

                wx.ready(function() {
                    window.wxIsReady = true;
                    callback && callback();
                });

                wx.error(function(err) {
                    window.wxIsReady = false;
                });
            });
    },
    getLocation: function(success, fail) {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.ready(function() {
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function(res) {
                        success && success(res);
                    },
                    fail: function(err) {
                        fail && fail("error");
                    }
                });
            });
        } else {
            this.getLocationFromBOM(success, fail)
        }
    },
    getLocationFromBOM: function(success, fail) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(data) {
                success(data.coords);
            }, function(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.log("User denied the request for Geolocation.")
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.log("Location information is unavailable.")
                        break;
                    case error.TIMEOUT:
                        console.log("The request to get user location timed out.")
                        break;
                    case error.UNKNOWN_ERROR:
                        console.log("An unknown error occurred.")
                        break;
                }
                fail("getLocation failed");
            }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 * 60 })
        }
    }
}
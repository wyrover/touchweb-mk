(function (win) {
    /**
     * ********************* config *******************
     *   logUrl   => 埋点的请求地址
     */
    var config={
      logUrl: 'http://wechatlog.imike.com:8000/'
    };

    //PV埋点
    /**
     * [logPV description]
     * @param  type   string
     * @param  fn     function
     */
    var logPV = function (type,data, fn) {
        if(!type) return;
        data=data || {};
        var base = baseInfo(),
            pvData = {
                'eventType': 1,
                'dataName': type
            },
            // args = tools.paramSerialize(tools.extendJson(base, data)),
            args = JSON.stringify( tools.extendJson(base, pvData, data));
        tools.postAjax(config.logUrl, args, function (v) {
            if (fn)
                fn(v);
        })
    };

    //Evt埋点
    /**
     * [logEvt description]
     * @param  type   string
     * @param  data   object
     * @param  fn     function
     */
    var logEvt = function (type, data, fn) {
        if(!type) return;
        data=data || {};
        var base = baseInfo(),
            pvData = {
                'eventType': 2,
                'dataName': type
            },
            // args = tools.paramSerialize(tools.extendJson(base, pvData, data)),
            args = JSON.stringify( tools.extendJson(base, pvData, data));
        tools.postAjax(config.logUrl, args, function (v) {
            if (fn)
                fn(v);
        })
    };

    //base基础数据
    function baseInfo() {
        var city = (JSON.parse(tools.getValue('mk-selectCity') || tools.getValue('mk-userCity') || "{}")).cityname || '';
        return {
            // userLocation: tools.getValue('mk-userLocation'),
            district: city,
            deviceId: tools.getValue('m28'),
            userId: tools.getValue('m29'),
            version: '4.0',
            image_url: window.location.href,
            timeStamp: (new Date()) * 1,
            os:'wechat',
        };
    }

    //方法类
    var tools = {
        //获取cookie
        _getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        //获取localstorage
        _getStorage: function (name) {
            return localStorage.getItem(name) || null;
        },
        //获取错误
        _getExceptionResult: function (v, eStr) {
            eStr = eStr || 'null of parameter!';
            if (!v) {
                console.log('参数为空！');
                throw new Error(eStr);
                return false;
            } else {
                return true;
            }
        },
        //获取value（localStorage或cookie）
        getValue: function (name) {
            var self = this,
                eResult = self._getExceptionResult(name);
            if (!eResult) return;
            var res = self._getStorage(name);
            if (!res) {
                res = self._getCookie(name);
                return !res ? '' : res;
            }
            return res;
        },
        //xmlHTTP
        _sendXHR: function (url, data, fn, method) {
            if (!this._getExceptionResult(url, 'null of parameter :url')) return;
            if (!this._getExceptionResult(data, 'null of parameter :data')) return;
            if (!this._getExceptionResult(method, 'null of parameter :method')) return;
            data = data || {};
            var xmlhttp;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            //不用回调
            // xmlhttp.onreadystatechange=function(){
            //     if (xmlhttp.readyState==4 && xmlhttp.status==200){
            //          if(fn)
            //           fn(xmlhttp.responseText)
            //     }
            // }
            xmlhttp.open(method, url, true);
            xmlhttp.setRequestHeader('Content-Type','text/plain;charset=UTF-8')
            xmlhttp.send(data);
        },
        //post xhr
        postAjax: function (url, data, fn) {
           
            this._sendXHR.call(this, url, data, fn, 'POST');
        },
        //get xhr
        getAjax: function (url, data, fn) {
            this._sendXHR.call(this, url, data, fn, 'GET');
        },
        //序列化
        paramSerialize: function (json) {
            if ('string' == typeof (json)) return json;
            var _param = '';
            for (var key in json)
                _param += '&' + key + '=' + ('object' == typeof (json[key]) ? JSON.stringify(json[key]) : json[key]);
            _param = _param.replace(/^.{1}/, '?');
            return _param ? _param : '';
        },
        extendJson: function () {
            var args = arguments;
            if (!args.length) return '';
            var baseJson = args[0];
            if (args.length > 1) {
                for (var i = 1, len = args.length; i < len; i++)
                    for (var j in args[i])
                        baseJson[j] = args[i][j];
            }
            return baseJson;
        }
    }

    win.logPV = logPV;
    win.logEvt = logEvt;
})(window);
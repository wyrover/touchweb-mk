module.exports =(function(){
    var widgetImgPreview=function(settings){
        this.Swiper = settings.swiper || null;
    };
    widgetImgPreview.prototype.init=function(){
        var self=this;
        var imgsObj = {}, groupObj = {} , groupId = 1000, et = null, current;
        var imgPreviewBoxes=document.getElementsByClassName('img_prev_view');
        var dom=null;
        var childNodes=null;
        for(var i=0,len=imgPreviewBoxes.length;i<len;i++){
            dom=imgPreviewBoxes[i];
            groupObj = {};
            groupId += 1;
            imgsObj[groupId] = [];
            (function(groupId){
                dom.onclick=function(evt){
                    et = evt.target;
                    if ("IMG" == et.tagName) {
                        if (/^data:image/.test(et.src)) {
                            current = et.getAttribute("data-img");
                        } else {
                            current = et.src;
                        }
                        if (typeof window.WeixinJSBridge != 'undefined') {
                            WeixinJSBridge.invoke('imagePreview', {'current': current, 'urls': imgsObj[groupId]});
                        } else {
                            self.previewImage({'current': current, 'urls': imgsObj[groupId]});
                        }
                    }
                }
                //childNodes=dom.childNodes;
                childNodes=dom.getElementsByTagName('img');
                for(var j=0,len=childNodes.length;j<len;j++){
                    if("IMG" == childNodes[j].tagName){
                        var dataImg = childNodes[j].getAttribute("data-img")||childNodes[j].src;
                        groupObj[dataImg] = dataImg;
                    }
                }
                //数组去重复
                imgsObj[groupId] = Object.keys(groupObj);
            })(groupId);
        }
    }
    

    widgetImgPreview.prototype.previewImage=function(options) {
        options = options || {};
        var ulHtml = [],
            urls = options.urls || [],
            currIndex = urls.lastIndexOf(options.current),
            winH = window.innerHeight;
        var paginationBox=null;
        urls.forEach(function (url) {
            ulHtml.push('<div style="height:'+ winH +'px;" class="img-wrap swiper-slide"><img src="' + url + '"></div>');
        });
        ulHtml = ulHtml.join('');
        //console.log(ulHtml);
        dialog("", {
            TPL: '<div style="z-index:{zIndex2};" class="widget-preview swiper-container"><div class="swiper-wrapper">' + ulHtml + '</div><div class="widget-preview-indicate swiper-pagination"></div></div>',
            classes:'dialog-preview-widget',
            clickFn: function() {
                this.destroy();
                if(paginationBox)
                    paginationBox.innerHTML="";
            }
        }).open();
        // 渲染Swipe
        new this.Swiper(document.getElementsByClassName('widget-preview')[0],{
            // pagination: '.swiper-pagination',
            // paginationClickable: false,
            initialSlide: 0,
            loop: false,
            onInit: function(){
                paginationBox=document.getElementsByClassName('swiper-pagination')[0];
            }
        });
    }
    return widgetImgPreview;
})();

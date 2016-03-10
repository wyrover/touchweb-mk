module.exports = {

    vue: undefined,
    
    init: function(v) {
        this.vue = v;
        
        //页面高度控制
        this.vue.directive('height-ctrl', {
            update: function(o,n){
                var vm=this;
                setTimeout(function(){
                    //1.得到页面的三个对象 当前的body，header 以及header中的第一个元素
                    var curDom=vm.el,
                        header=vm.el.previousElementSibling,
                        headerHeight=header.children[0].offsetHeight;
                    //2.为了动态计算，故移除原来的body的高度
                    curDom.removeAttribute('style');
                    //3.获得实际高和总高，当实际高小于总高，为总高，如果总高小于实际高，为实际高
                    var scrollH=document.body.scrollHeight,
                        offsetH=document.body.offsetHeight;
                    var winHeight=scrollH>offsetH?scrollH:offsetH,
                        curDomHeight=curDom.offsetHeight,
                        offset=0;
                    //4.给header设置高度
                    header.style.height=headerHeight+'px';
                    //5.高度判断，为当前body设置高度，延迟100ms加载，为了页面渲染时间考虑
                    if(winHeight > (curDomHeight+headerHeight)){
                        offset= winHeight-headerHeight;
                        if(offset != winHeight){
                            curDom.style.height=offset+'px';
                        }else{
                            curDom.style.height=curDomHeight+'px';
                        }
                    }else{
                        curDom.style.height=curDomHeight+'px';
                    }
                },100);
            }
        });
        
    }

};
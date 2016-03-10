
<style>
    /* 自定义弹框样式 支持_customDialog()方法*/
    .dialog_limitBox_tip .widget_mask {
        background: rgba(17,25,41,0.8);
    }
    .dialogLimit-wrapper {
        position: fixed;
        top: 50%;
        border-radius: 11px;
        left: 50%;
        width: 280px;
        margin-left: -140px !important;
        padding: 0;
        background: rgba(39,48,66,0.9);
        -webkit-transform: translateY(-50%);
    }
    .dialogLimit-wrapper header{
        text-align: center;
        font-size:1.6rem;
        line-height: 1.6rem;
        padding-top:2rem;
        color:#fff;
    }

    .phoneLayout .widget_footer a{
        text-decoration: none;
        font-size: 1.6rem;
    }
    .phoneLayout .widget_footer li{
        position: relative;
    }
    .phoneLayout  section.dialog-content{
        line-height: 2rem;
    }

</style>
<template>
	<div class="phoneCall" data-role="widget-phoneCall">
        
   </div>
</template>

<script>
    export default {
        data() {
            return {
                dialog:null
            };
        },
        methods:{
        },
        events: {
            'showPhoneCall': function(telNum, serveTime){
                this.dialog=dialog('',{
                    TPL:'<div class="dialogLimit-wrapper phoneLayout" style="z-index:{zIndex2}">\
                            <header>\
                                提醒\
                            </header>\
                            <section class="dialog-content">\
                            '+(serveTime?'客服时间：'+serveTime+'<br>':'')+'\
                            '+(telNum?'呼叫：'+telNum:'')+'\
                            </section>\
                            <footer class="widget_footer">\
                                <ul>\
                                    <li><button class="cancel-btn text-dark">点错了</button></li>\
                                    <li><a class="confirm-btn text-orange" href="tel:'+telNum+'">呼叫</a></li>\
                                </ul>\
                            </footer>\
                        </div>',
                    classes:'dialog_default_tip',
                    callBack: function(evt){
                        if('cancel-btn' ==evt.target.className || 'confirm-btn' == evt.target.className)
                            console.log('evt.target.className');
                            this.destroy();

                    }
                }).open();
            },
            'hidePhoneCall': function(){
                this.dialog.destroy();
            }
        }
    };
</script>

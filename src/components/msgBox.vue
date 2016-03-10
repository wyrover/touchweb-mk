
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
        width: 28rem;
        margin-left: -14rem !important;
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
    .dialogLimit-wrapper section{
        font-size: 1.3rem;
        color: rgba(255,255,255,0.6);
        line-height: 1.3rem;
        padding: 1.6rem 1rem 2rem;
        text-align: center;
        
    }
    .msgBoxLayout section{
        line-height: 2rem;
    }
</style>
<template>
	<div class="msgBox" data-role="widget-phoneCall">
        
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
            'showMsgBox': function(info,fn){
                this.dialog=dialog('',{
                    TPL:'<div class="dialogLimit-wrapper msgBoxLayout" style="z-index:{zIndex2}">\
                            <header>\
                                提醒\
                            </header>\
                            <section>\
                            '+info+'\
                            </section>\
                            <footer class="widget_footer">\
                                <ul>\
                                    <li><button class="cancel-btn">知道啦</button></li>\
                                </ul>\
                            </footer>\
                        </div>',
                    classes:'dialog_default_tip',
                    callBack: function(evt){
                        if('cancel-btn' ==evt.target.className)
                            this.destroy();
                        if(fn)
                            fn(evt.target.className)
                    }
                }).open();
            },
            'hideMsgBox': function(){
                this.dialog.destroy();
            }
        }
    };
</script>

<style>
    .mikeHeader{
        padding:0 1.3rem;
    }
    .mikeHeader,
    .mikeHeader>*,
    .mikeHeader>*>*,
    .mikeHeader a{
        height: 4.4rem;
        line-height: 4.4rem;
    }
    .mikeHeader>*{
        overflow: hidden;
    }
    .mikeHeader a{
        display: inline-block;
    }
    .mikeHeader a:last-child{
        padding-right:10rem;
    }
    .mikeHeader>*{
        position: relative;
    }
    .mikeHeader .header-title{
        position: absolute;
        left: 0;
        top:0;
        width: 100%;
        text-align: center;
        z-index: 2;
        pointer-events:none;
        font-size: 1.8rem;
    }
    .mikeHeader .header-right{
        padding-left: 1.3rem;
        text-decoration: none;
    }
    .mikeHeader .header-left{
        line-height: 4.6rem;
        padding-right: 1.3rem;
        font-size: 1.8rem;
        text-decoration: none;
    }
    .mikeHeader .header-right:empty{
        padding: 0;
    }
</style>
<template>
    <section class="mikeHeader">
        <div class="">
            <a href="javascript:;" class="header-left pull-left font_18" @click="leftClickFn()">
                <i class="icon-ddxq_btn_back text-white"></i>
            </a>
            <a href="javascript:;" class="text-white font_16 header-right pull-right" @click="rightClickFn()">{{pageRight}}</a>
            <div class="text-white font_18 header-title">{{pageTitle}}</div>
        </div>
    </section>
</template>
<script>
    export default {
        props:['pageTitle','pageRight','leftFn','rightFn'],
		data() {
			return {
                
            };
		},
        methods:{
            leftClickFn(){
                var vm=this;
                if(vm.leftFn){
                    if(!!WeixinJSBridge){
                        return WeixinJSBridge.call('closeWindow');
                    }else{
                        return vm.leftFn(vm);
                    }
                }else{
                    return window.history.go(-1);
                }   
            },
            rightClickFn(){
                var vm=this;
                if(vm.rightFn)
                    vm.rightFn(vm);
            }
        },
        ready(){
            
        }
    };

</script>
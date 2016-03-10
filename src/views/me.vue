<style>
    .person-content{
        border-radius: 0.8rem 0.8rem 0 0;
    }
    .person-content .header-pic img{
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        margin: 1.3rem 0;
        border:0.2rem solid rgba(0,0,0,0.2);
        border:0.3rem solid rgba(17, 25, 41, 0.2);
        background-size: 6rem 6rem;
        background-repeat: no-repeat;
        display: inline-block;
    }
    .person-content .header-pic .login-btn{
        display: block;
        margin-top:0.2rem;
    }
    .person-content .nav-items{
        border-radius: 0.8rem 0.8rem 0 0;

        margin-top:1.5rem;
    }
    .person-content .nav-items li{
        height: 6.4rem;
        line-height: 6.4rem;
        border-top:0.1rem solid rgba(255, 255, 255, 0.1);
        border-radius: 0.8rem 0.8rem 0 0;
        padding-left: 2.2rem;
        box-sizing: border-box;
    }
    .person-content .nav-items li:first-child{
        border:none;
    }
    .person-content .nav-items li i{
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        border-radius: 50%;
        display: inline-block;
        margin-right: 2rem;
        vertical-align: middle;
    }
    .person-wrapper .logout-btn{
        position: fixed;
        bottom: 0;
        height: 5.4rem;
        line-height: 5.4rem;
        width: 100%;
    }
    .person-wrapper .logout-btn a{
        text-decoration: none;
    }
</style>
<template>>
    <div class="person-wrapper">
        <header class="app-page-header">
            <div>
                <page-header :page-title="'个人中心'"></page-header>
            </div>
        </header>
        <div class="app-content person-content bg-cloudburst ">
            <div class="header-pic text-center">
                <img @click="switchState()" class="header-pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                     style="background-image: url(src/assets/images/grzx_pic_touxiang.png?imageView/0/w/100);">
                <div class="font_16 text-white"><span>{{phone}}</span></div>
                <a class="login-btn text-d-dark font_13" @click="login()">手机验证</a>
            </div>
            <ul class="nav-items bg-cloudburst font_14">
                <li>
                    <i class="icon-wddd_icon_wudingdan bg-deepblue  text-white font_23 text-center"></i><span class="text-white">我的订单</span>
                </li>
                <li @click="goPath('/collection')">
                    <i class="icon-grzx_icon_shoucang bg-pastelred  text-white font_23 text-center"></i><span class="text-white">收藏酒店</span>
                </li>
                <li @click="showService()">
                    <i class="icon-grzx_icon_kefurexian bg-green  text-white font_23 text-center"></i><span class="text-white">客服热线</span>
                </li>
                <li @click="goPath('/about')">
                    <i class="icon-grzx_icon_guanyumike bg-burntorange  text-white font_23 text-center"></i><span class="text-white">关于眯客</span>
                </li>
            </ul>
        </div>
        <phone-call></phone-call>
        <login-model></login-model>
        <div class="bg-midnight logout-btn text-center font_18" v-show="isShowLogout" @click="logout()"><a class="text-orange">退出登录</a></div>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    import phoneCall from '../components/phoneCall.vue';
    import loginModel from '../components/login_model.vue';
    var util = require('../libs/util.js');
    export default {
        data() {
        return {
            isShowLogout:false,
            phone:'',
            token:''
        }
    },
    components: {
        pageHeader,
        phoneCall,
        loginModel
    },
    methods: {
        // 退出登录
        logout(){

        },
        //切换登录状态
        switchState(){
            if(this.token){
                this.isShowLogout = !this.isShowLogout;
            }
        },
        //联系客服
        showService(){
            //logEvt('e_order_detailOffline_kefu',{hotelid:this.order.hotelId});
            this.$broadcast('showPhoneCall','021-31236306','9:00am-2:00am');
        },
        //跳转
        goPath(path,query){
            query = query || {};
            this.$route.router.go({path: path, query: query});
        },
        login(){
            this.$root.showLogin();
        }
    },
    computed:{

    },
    created() {
    },
    ready(){
        var vm = this;
        this.$root.getToken(function(token){
            vm.token = !util.isEmptyObjec(token) ? token :'';
            vm.phone = !util.isEmptyObjec(util.getStore('m31')) ? util.getStore('m31'):'';
        });
        //logPV('m_order_cancel');
    }
    };
</script>


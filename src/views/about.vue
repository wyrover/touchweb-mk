<style>
    /*general setting*/
    .mk-about{
        box-sizing: border-box;
        padding:0 1.3rem;
        overflow: hidden;
    }
    .mk-about .ab-title{
        position: relative;
        margin:2rem  auto;
    }
    .mk-about .mk-logo{
        width: 6rem;
        height:6rem;
        border-radius: 50%;
        display: inline-block;
        border:0.3rem solid rgba(17, 25, 41, 0.2);
        background-size: 6rem 6rem;
        background-repeat: no-repeat;
    }
    .mk-about .title div{
        line-height:3rem ;
    }
    .mk-about .mk-t{
        display: inline-block;
        box-sizing: border-box;
        position: relative;
        bottom: 1.2rem;
        margin-left: 1.3rem;
    }
    .mk-about p{
        margin-top:1.3rem;
        line-height: 2rem;
        position: relative;
        left: 0.3rem;
    }
    .mk-about footer{
        position: fixed;
        bottom:2rem;
        width: 100%;
    }

</style>

<template>
    <header class="app-page-header">
        <div>
            <page-header :page-title="'关于眯客'"></page-header>
        </div>
    </header>
    <section class="app-content mk-about  bg-dark" v-height-ctrl="token">
        <div class="ab-title text-center">
            <img  class="mk-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                 data-src="https://dn-imke-pro.qbox.me/e1747212-526e-4f93-9185-deef190b71ee480.jpg"
                 style="background-image: url(src/assets/images/grzx_pic_touxiang.png?imageView/0/w/100);">
            <div class="mk-t">
                <div class="mk-f-title text-left text-white  font_16"><span>眯客-时时低价住酒店</span></div>
                <div class="mk-s-title text-d-dark font_12 text-left"><span>住得起的特价时光</span></div>
            </div>

        </div>
        <p class="text-d-dark font_14">眯客特价酒店（imike）是国内首款基于地理位置帮助用户实现一站式预订入住酒店房间的移动应用程序。</p>
        <p class="text-d-dark font_14">使用者通过眯客能够迅速搜索到 距离自己最近、性价比最高的酒店房间。</p>
        <p class="text-d-dark font_14">主要服务项目：通过眯客预订房间， 用户可实现免去前台手续办理步骤， 直接入住自己喜欢的酒店房间。</p>
        <footer class="font_12 text-bunting">
            <div class="text-center">上海乐住信息技术有限公司</div>
            <div class="text-center">Coryright@2014-2015 imike.All Right Reserved</div>
        </footer>
    </section>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    export default {
        data() {
        return {
            isShowLogout:false,
            phone:'',
            token:''
        }
    },
    components: {
        pageHeader
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
        }
    },
    computed:{
    },
    created() {
    },
    ready(){
        var vm = this;

        this.$root.getToken(function(token){
            vm.token = token;
        });
        //logPV('m_order_cancel');
    }
    };
</script>
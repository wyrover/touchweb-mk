<template>
    <div class="app-content" id="order">
        <header class="app-page-header">
            <div>
                <page-header :page-title="'订单详情'"></page-header>
            </div>
        </header>
        <div class="hotel-info margin bg-dark">
            <div class="order-state text-left padding">
                <span class="text-orange font-16">{{order.statusName}}</span>
                <div class="pay-info font-13 text-d-dark">
                    <span>{{order.roomTypeName}}</span>
                    <span>前台支付￥{{order.orderPrice}}</span>
                </div>
            </div>
            <div class="order-detail-hotel">
                <div class="hotel-pic">
                    <img v-if="order.hotelPic && order.hotelPic!=''" class="hotel-pic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" alt=""
                         v-bind:style="{ backgroundImage:'url('+order.hotelPic+'?imageView/0/w/100)'}">
                    <div v-if="order.hotelPic =='' || !order.hotelPic" class="hotel-pic no-image" >{{firstName}}</div>
                </div>
                <div class="detail-address text-left">
                    <div class="text-white font-16"> {{order.hotelName}}</div>
                    <div class="text-d-dark font-11">{{order.hotelAddr}}</div>
                </div>

            </div>
        </div>
        <div class="m-flex order-date bg-dark text-center">
            <div class="col">
                <div class="text-dark font-11">入住</div>
                <div class="text-white font-13">{{order.beginTime | plainStrToLocalDateName}}</div>
            </div>
            <div class="col">
                <div class="text-dark font-11">退房</div>
                <div class="text-white font-13">{{order.endTime | plainStrToLocalDateName}}</div>
            </div>
            <div class="col">
                <div class="text-dark font-11">天数</div>
                <div class="text-white font-13">共{{order.dayNumber}}晚</div>
            </div>
        </div>
        <div class="separation-line bg-dark">
            <div class="dotted-line"></div>
        </div>
        <div class="checkin-user-info bg-dark margin padding">
            <div class="detail-checkin-user text-left">
                <div class="font-13">
                    <span class="text-dark">入住人</span>
                    <span  v-show="!isModify" class="text-white">{{contacts}}</span>
                    <input v-show="isModify" class="text-white bg-transparent" placeholder="请输入入住人姓名" type="text"  name="contacts" v-model="contacts" value="{{contacts}}">
                </div>
                <div class="font-13">
                    <span class="text-dark">手机号</span>
                    <span  v-show="!isModify" class="text-white">{{contactsPhone}}</span>
                    <input v-show="isModify" class="text-white bg-transparent"  placeholder="请输入入住人手机号"  type="tel" name="contactsPhone" v-model="contactsPhone" value="{{contactsPhone}}">
                </div>
            </div>
            <a v-show="!isModify" class="font-13 text-orange modify-btn" @click="modify()" v-if="order.status == 100 || order.status == 200">修改</a>
            <a v-show="isModify" class="font-13 text-orange modify-btn" @click="saveUser()" v-if="order.status == 100 || order.status == 200">保存</a>
        </div>
        <div class="detail-btn-wrap bg-dark margin">
            <a v-for="btn in order.button" class="text-d-dark text-center font-14"  v-if="showBtn(order.button,'delete')"  @click="delOrder()">删除订单</a>
            <a v-for="btn in order.button" class="text-d-dark text-center font-14" v-if="showBtn(order.button,'cancel')"  @click="cancelOrder()">取消订单</a>
            <a v-for="btn in order.button" class="text-d-dark text-center font-14" v-if="showBtn(order.button,'comment')"  @click="commentOrder()">评价</a>

        </div>
        <div class="order-pay-list font-13 bg-dark margin">
            <div class="splitline"></div>
            <div class="text-dark text-left padding hotel-pay">房费明细</div>
            <ul class="text-white">
                <li class="m-flex" v-for="item in order.costs">
                    <div class="text-left"><span>{{item.date | widgetDate '_plainDateStr' 'yyyy年MM月dd日' true}}</span></div>
                    <div class="text-right"><span>￥{{item.price}}</span></div>
                </li>
            </ul>
            <div class="splitline"></div>
        </div>
        <div class="m-flex order-nav bg-dark margin font-13 text-white">
            <a class="text-center" href="tel:{{order.hotelPhone}}">
                <span class="icon-ddxq_btn_lianxijiudian bg-blue font-18 text-white"></span>
                <span class="nav-txt text-dark" >联系酒店</span>
            </a>
            <a class="text-center " @click="showService()">
                <span class="icon-ddxq_btn_lianxikefu bg-green font-18 text-white"></span>
                <span class="nav-txt text-dark" >联系客服</span>
            </a>
            <div class="text-center" @click="goMap()">
                <span class="icon-ddxq_btn_xianludaohang bg-burntorange font-18"></span>
                <span class="nav-txt text-dark">线路导航</span>
            </div>
        </div>
        <div class="order-state-wrap bg-dark margin padding">
            <div class="splitline"></div>
            <div class="state-title text-dark m-flex font-13">
                <div class="text-left">订单跟踪状态</div>
                <div class="text-right">订单编号：{{order.id}}</div>
            </div>
            <div class="order-state-items">
                <ul>
                    <li class="text-left" v-for="item in order.businessLog">
                        <p class="text-orange font-13">{{item.businessDesc}}</p>
                        <div class="font-12 text-dark state-date">{{item.createTime | widgetDate '_plainDateStr' 'yyyy-MM-dd hh:mm:ss' true}}</div>
                    </li>
                </ul>
            </div>

        </div>
        <phone-call></phone-call>
        <div class="tip bg-dark font-13 text-white text-center" v-show="isShowTip">{{tipTxt}}</div>
    </div>
</template>
<script>
    import pageHeader from '../../components/pageHeader.vue';
    import phoneCall from '../../components/phoneCall.vue';
    export default {
        data() {
            return {
                token:'',
                orderid: this.$route.params.id,
                order: {},
                hotelid:'',
                hotelname:'',
                firstName:'',
                isModify:false,
                contacts:'',
                contactsPhone:'',
                tipTxt:'保存成功',
                isShowTip:false
            }
        },
        components: {
            pageHeader,
            phoneCall
        },
        methods: {
            getOrderDetail() {
                var vm = this;
                services.orderDetail({
                    token: vm.token,
                    orderId: vm.orderid
                }).then(function (resp) {
                    vm.order = resp.data;
                    vm.hotelid = vm.order.hotelId;
                    if((!vm.order.hotelPic || vm.order.hotelPic == '')&& vm.order.hotelName && vm.order.hotelName != ''){
                        vm.firstName = vm.order.hotelName.substr(0,1)
                    }
                    vm.contacts = vm.order.contacts;
                    vm.contactsPhone = vm.order.contactsPhone;
                    //埋点
                    if(vm.online){
                        //logPV("m_order_detail");
                        console.log('m_order_detail');
                    }else{
                       // logPV("m_order_detailOffline");
                        console.log('m_order_detailOffline');
                    }
                    return resp;
                });
            } ,
            //联系客服
            showService(){
                //logEvt('e_order_detailOffline_kefu',{hotelid:this.order.hotelId});
                this.$broadcast('showPhoneCall','021-31236306','9:00am-2:00am');
            },
            showPay(){
                this.pay_detail.isShow = !this.pay_detail.isShow;
            },
            //取消订单
            cancelOrder(){
                var vm = this;
                //logEvt('e_order_detailOffline_cancel',{hotelid:vm.order.hotelId});
                vm.goPath('/cancel/' + vm.order.id);
            },
            // 确认框
            delOrder(id){
                var vm = this;
                vm.confirmOrder('确认删除该订单？',function(){
                    vm.del();
                });
            },
            //删除订单
            del(){
                var vm = this;
                //logEvt('e_order_detail_delete');
                services.delOrder({
                    token:vm.token,
                    orderId:vm.order.id
                }).success(function(resp){
                    if(resp.success === 'F'){
                        tip(resp.errmsg);
                        var currStatus = 'all';
                    }else{
                        tip('删除成功！');
                        setTimeout(function(){
                            vm.goPath('/myorder/all');
                        },1500);
                    }
                });
            },
            //切换可编辑状态（入住人）
            modify(){
                this.isModify = !this.isModify;
            },
            showState(){
                this.state = !this.state;
            },
            //地图导航
            goMap(){
                /*if(vm.online){
                    logEvt('e_order_detail_nvigation');
                }else{
                    logEvt('e_order_detailOffline_nvigation');
                }*/
                window.location.href = this.mapLink;
            },
            goPath(path,query){
                query = query || {};
                this.$route.router.go({path: path, query: query});
            },
            //获取地图URL
            getMapLink(args){
                //基本参数
                args=args || {};
                args.naviBy='car';
                args.key='3fa67c4e45505b429c4bf056773071d8';
                var param=[],
                        linkParam="",
                    url="http://m.amap.com/navi/";
                for(var key in args)
                    if(args[key])
                        param.push(key+'='+args[key]);
                linkParam=param.join('&');
                return url+"?"+linkParam;
            },
            //获取地图参数出发地定位数据
            getMapLocationStr(_location){
                _location=_location || {};
                if(_location.longitude && _location.latitude)
                    return _location.longitude+','+_location.latitude;
                return null;
            },
            //操作按钮显示状态（删除，取消，评价）
            showBtn(btns,code){
                var isShow = false;
                console.log(code);
                for(var i in btns){
                    if(btns[i].code == code){
                        isShow = true;
                        break;
                    }
                }
                return isShow;
            },
            //确认提示框
            confirmOrder(txt,callback){
                confirm(txt, {
                    callBack: function (evt) {
                        if (evt.target.innerText == '确定') {
                            callback();
                        }
                        this.close();
                        return true;
                    }
                });
            },
            //酒店评价
            commentOrder(id){
                //logEvt('e_order_owner_comment');
                this.goPath('/addcomments',{'orderid':id});
            },
            //修改入住人信息
            saveUser() {
                var vm = this,
                    contacts = this.strTrim(vm.contacts),
                        contactsPhone = this.strTrim(vm.contactsPhone);
                    if (contacts === '') {
                        tip('请填写入住人');
                        return;
                    }
                    if (contactsPhone === '') {
                        tip('请填写入住人联系电话');
                        return;
                    } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(contactsPhone))) {
                        tip('请填写正确的手机格式');
                        return;
                    }
                    services.modifyUser({
                        orderId: vm.order.id,
                        token: vm.token,
                        contacts: contacts,
                        contactsPhone: contactsPhone
                    }).then(function (res) {
                        var data = res.data;
                        if (data.success === 'F') {
                            tip(data.errmsg);
                        } else {
                            vm.isShowTip = true;
                            setTimeout(function(){
                                vm.isShowTip = false;
                            },3000);
                            vm.modify();
                        }
                    },function(){
                        tip('保存失败');
                    });

            },
            strTrim(str) {
                return str.replace(/(^\s+)|(\s+$)/g, "");
            }
        },
        computed: {
            mapLink(){
                //地图页面的URL
                var vm=this;
                return vm.getMapLink({
                    start: vm.getMapLocationStr(vm.$root.userLocation),
                    dest: vm.getMapLocationStr(vm.order),
                    destName: vm.order.hotelName
                });
            }
        },
        created() {
        },
        ready(){
            var vm = this;
            this.$root.getToken(function(token){
                vm.token = token;
                vm.getOrderDetail();
            });
        }
    };
</script>
<style>
    #order .order-state{
        position: relative;
        height: 5.4rem;
        line-height: 5.4rem;
    }
    #order .pay-info{
        position: absolute;
        right: 1.3rem;
        top: 0;
    }
    #order .pay-info span:not(:first-child):before{
        content: '';
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-left:1rem;
        border-left:0.1rem solid rgba(255, 255, 255, 0.6);
    }
    #order .order-detail-hotel{
        padding: 2rem 1.3rem 0 1.3rem;
        vertical-align: bottom;
        display: table;
    }
    #order .order-detail-hotel .hotel-pic, .detail-address{
        display: inline-block;
    }
    #order .order-detail-hotel .hotel-pic{
        line-height: 7rem;
        margin-right:1.3rem;
        vertical-align: middle;
    }
    #order .order-detail-hotel .detail-address{
        vertical-align: middle;
        max-width: 20rem;
    }
    #order .detail-checkin-user{
        position: relative;
    }
    #order .detail-checkin-user:after{
        position: absolute;
        content: "";
        height:10px;
        width: 100%;
        bottom:0;
        left: 0;
        border-bottom:1px dotted rgba(255, 255, 255, 0.1);
    }
    #order .detail-checkin-user input{
        margin-left: 2.9rem;
        border:none;
    }
    #order .checkin-user-info{
        position: relative;
        padding:0 1.3rem;
    }
    #order .detail-checkin-user>div{
        padding:1rem 0;
        line-height: 2rem;
    }
    #order .detail-checkin-user>div>span:not(:first-child){
        margin-left:3rem;
    }
    #order .checkin-user-info .modify-btn{
        display: block;
        position: absolute;
        right: 1.3rem;
        top:1rem;
    }
    #order .detail-btn-wrap{
        height: 4.6rem;
        line-height: 4.6rem;
        text-align: right;
        padding-right: 1.3rem;
    }
    #order .detail-btn-wrap a{
        width: 8.2rem;
        height: 3.4rem;
        line-height: 3.4rem;
        border-radius: 0.5rem;
        display: inline-block;
        border:0.1rem solid rgba(255,255,255,0.3);
        margin:0.7rem 0 0 0.6rem;
    }
    #order .order-pay-list ul{
        padding:0 1.3rem;
    }
    #order .order-pay-list ul li{
        position: relative;
        height: 1.8rem;
        line-height: 1.8rem;
        padding: 1.3rem 0;
    }
    #order .hotel-pay{
        height: 4rem;
        line-height: 4rem;
    }
    #order .order-pay-list ul li:before{
        position: absolute;
        content: "";
        height:1px;
        width: 100%;
        top:0;
        left: 0;
        bottom:0;
        border-bottom:1px dotted rgba(255, 255, 255, 0.1);
        -webkit-transform:scaleY(.5);
        -ms-transform:scaleY(.5);
        -o-transform:scaleY(.5);
        transform:scaleY(.5);

    }
    #order .order-nav{
        width: auto;
        padding: 1rem 0 1.3rem 0;
    }
    #order .order-nav a{
        text-decoration: none;
    }
    #order .order-nav .nav-txt{
        display: block;
        margin-top:0.6rem;
        text-decoration:none;
    }
    #order .order-nav span:first-child{
        display: inline-block;
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
        border-radius: 50%;
    }
    #order .order-state-wrap{
        position: relative;
        overflow: hidden;
    }
    #order .order-state-wrap ul:before{
        content:'';
        display:block;
        position: absolute;
        left: 2rem;
        width: 0.1rem;
        height: 100%;
        background: rgba(255,255,255,0.1);
    }
    #order .order-state-wrap ul li{
        position: relative;
        height: 5.4rem;
        margin:1.3rem 1.3rem 1.3rem 3.8rem;
        box-sizing: border-box;
        border-bottom: 0.1rem dotted rgba(255, 255, 255, 0.1);
    }
    #order .order-state-wrap ul li:last-child{
        border:0;
    }
    #order .order-state-wrap ul li p{
        height: 1.5rem;
        line-height: 1.5rem;
        margin-bottom: 0.6rem;
    }
    #order .order-state-wrap ul li:before{
        content: '';
        position: absolute;
        left: -3.15rem;
        top:0;
        width:0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.2);

    }
    #order .order-state-wrap ul li:first-child:before{
        content: '';
        position: absolute;
        left: -3.5rem;
        top:0;
        width:1.6rem;
        height: 1.6rem;
        border-radius: 50%;
        background-color: rgba(255,117,8,1);
        box-shadow: 0 0 0.4rem 0.4rem rgba(255,117,8,0.4) ;

    }
    #order .state-title{
        height: 5rem;
        line-height: 5rem;
        border-bottom: 0.1rem dotted rgba(255, 255, 255, 0.1);
    }
    #order .state-date{
        margin-top:1.6rem;
    }
    #order .no-image{
        font-size: 3rem;
        color: rgba(17, 25, 41, 1);
        line-height: 5.6rem;
        border: .2rem solid rgba(0,0,0,0.1);
        background-color: rgba(24,34,51,0.6);
        text-align: center;
    }
    #order .splitline{
        height: 0.6rem;
        background-color: rgba(0,0,0,0.05);
    }
    #order .tip{
        position: absolute;
        left: 50%;
        margin-left: -4rem;
        top:3rem;
        width: 8rem;
        height: 3rem;
        line-height: 3rem;
        border-radius: 0.5rem;
        z-index: 99;
    }
    @media only screen and (max-width:320px){
        #order .order-detail-hotel .detail-address{
            max-width: 15rem;
        }
    }
</style>

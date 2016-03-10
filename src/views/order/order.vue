<template>
    <div class="app-content text-center" id="order">
        <header class="app-page-header">
            <div>
                <page-header :page-title="'订单确认'"></page-header>
            </div>
        </header>
        <div class="hotel-info margin bg-dark">
            <div class="hotel-pic-wrap">
                <img v-if="order.hotelPic && order.hotelPic!=''" class="hotel-pic" data-src="{{order.hotelPic}}"
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                      v-bind:style="{ backgroundImage:'url('+order.hotelPic+'?imageView/0/w/100)'}">
                <div v-if="order.hotelPic =='' || !order.hotelPic"  class="hotel-pic no-image" >{{firstName}}</div>
            </div>
            <div class="text-white font-16"> {{order.hotelName}}</div>
            <div class="text-d-dark font-13">{{order.roomTypeName}}</div>
        </div>
        <div class="m-flex order-date bg-dark">
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
            <div class="checkin-user">
                <div class="font-13"><span class="text-dark">入住人</span>
                    <input class="text-white" type="text" name="contacts" v-model="contacts" value="{{order.contacts}}">
                </div>
                <div class="font-13"><span class="text-dark">手机号</span>
                    <input class="text-white" type="tel" name="contactsPhone" v-model="contactsPhone" value="{{order.contactsPhone}}">
                </div>
            </div>
        </div>
        <div class="pay-wrap text-center bg-dark margin">
            <div class="text-dark  font-11">前台支付</div>
            <div class="text-white">
                <small class="font-16">￥</small>
                <span v-if="isMax"  class="font-28">{{order.orderPrice}}</span>
                <span v-if="!isMax" data="11"  class="font-48">{{order.orderPrice}}</span>
            </div>
            <a class="bg-orange text-white submit-btn font-16" @click="submitOrder()">提交订单</a>
            <a class="text-white font-11 detail-btn" @click="toggleStatus()">查看明细</a>
        </div>
        <div class="tips-wrap font-11 text-dark text-left bg-dark margin padding">
            <p>温馨提示：</p>
            <ol>
                <li v-if="isNight">订单提交后，9点之后回复您的预定结果，请耐心等待。</li>
                <li v-if="!isNight">订单提交后，15分钟内向您回复预定结果，请耐心等待。</li>
                <li>请您预定成功后及时办理入住，否则酒店可能无法为您保留房间。</li>
                <li>如提前入住或推迟入住，请自行联系酒店。</li>
            </ol>
        </div>
        <div class="detail-wrap bg-lightblue" v-bind:class="{hide:!isShowDetail}">
            <div class="detail-list bg-midnight">
                <div class="pay-detail-bottom">
                    <p class="text-left font-13 text-white padding">房费</p>
                    <ul class="font-12 padding">
                        <li class="m-flex text-d-dark border-top" v-for="item in order.costs">
                            <div class="col text-left">{{item.date | widgetDate '_plainDateStr' 'yyyy年MM月dd日' true}}</div>
                            <div class="col text-right">￥{{item.price}}</div>
                        </li>
                    </ul>
                 </div>
                <div class="text-center border-top font-16" @click="toggleStatus()"><a
                        class="close-btn  text-white">关闭</a></div>
            </div>

        </div>
    </div>
</template>
<script>
    import pageHeader from '../../components/pageHeader.vue';
    var util = require('../../libs/util.js');
    export default {
    data(){
        return {
            tips: '',
            queryParam: this.$route.query,
            isShowDetail: false,
            isNight: false,
            order: {},
            isSending: false,
            firstName: '',
            contacts:'',
            contactsPhone:'',
            isMax:false
        }
    },
    components: {
        pageHeader
    },
    methods: {
        //获取初始化数据
        initOrder(){
            var vm = this;
            services.initOrder(vm.getArgs()).then(function (resp) {
                var data = resp.data;
                if (data.success === 'F') {
                    tip(data.errmsg);
                } else {
                    vm.order = data;
                    vm.contacts = data.contacts;
                    vm.contactsPhone = data.contactsPhone;
                    vm.firstName = (!vm.order.hotelPic || vm.order.hotelPic == '') && vm.order.hotelName.substr(0, 1);

                    vm.isMax = vm.order.orderPrice > 1000000;
                    console.log(vm.isMax);
                }
            });
        },
        //获取参数
        getArgs(){
            var vm = this;
            return {
                token: vm.token,
                hotelId: vm.queryParam.hotelid,
                roomTypeId: vm.queryParam.roomtypeid,
                beginTime: vm.queryParam.start,
                endTime: vm.queryParam.end,
                type: vm.queryParam.type
            };
        },
        //根据时间判断是否显示提示
        showTips(){
            var date = new Date(), time = date.getTime(), hours = date.getHours(), mins = date.getMinutes() / 100, currDate = hours + mins;
            this.isNight = currDate > 2 && currDate < 9;
        },
        toggleStatus(){
            this.isShowDetail = !this.isShowDetail;
        },
        //提交订单
        submitOrder(){
            if (this.isSending)  return;
            var vm = this;
            var user = {
                contacts: vm.contacts,
                contactsPhone: vm.contactsPhone
            };
            if (!vm.contacts || vm.contacts == '') {
                tip('请填写入住人信息');
                return;
            } else if (!vm.contactsPhone || vm.contactsPhone == '') {
                tip('请填写入住人手机号');
                return;
            } else if (!(/^1[3|4|5|7|8]\d{9}$/.test(vm.contactsPhone))) {
                tip('请填写正确的手机格式');
                return;
            }
            var args = util._extend(this.getArgs(), user);
            vm.isSending = true;
            //tip('正在提交订单，请稍后...');
            services.createOrder(args).then(function (resp) {
                var data = resp.data;
                vm.isSending = false;
                if (!data.orderId) {
                    tip('创建失败');
                } else {
                    vm.$route.router.go({path: '/orderdetail/' + data.orderId});
                }

            });
            //logEvt('e_hotel_payOffline_submit',{hotelid:vm.order.hotelId,price:vm.order.orderPrice})
        }
    },
    created(){
    },
    ready(){
        var vm = this;
        this.$root.getToken(function (token) {
            vm.token = token;
            vm.showTips();
            vm.initOrder();
        });
        // logPV('m_order_detailOffline');
    }
    };
</script>
<style>
    #order .hide {
        display: none;
    }

    #order .margin {
        margin: 0 1.3rem;
    }

    #order .padding {
        padding: 0 1rem;
    }

    #order .hotel-info {
        border-top-left-radius: 0.8rem;
        border-top-right-radius: 0.8rem;
    }

    #order .hotel-pic-wrap {
        padding: 0.6rem;
        padding-top: 2rem;
    }

    #order .hotel-pic {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
    }

    #order .font-6 {
        font-size: 0.6rem;
    }
    #order .font-10 {
        font-size: 1rem;
    }
    #order .font-11 {
        font-size: 1.1rem;
    }

    #order .font-12 {
        font-size: 1.2rem;
    }

    #order .font-13 {
        font-size: 1.3rem;
    }
    #order .font-14 {
        font-size: 1.4rem;
    }
    #order .font-16 {
        font-size: 1.6rem;
    }

    #order .font-18 {
        font-size: 1.8rem;
    }
    #order .font-28{
        font-size: 2.8rem;
    }
    #order .font-48 {
        font-size: 4.8rem;
    }

    #order .margin-top-6 {
        margin-top: 0.6rem;
    }

    #order .order-date {
        margin: 0 1.3rem;
        padding: 2rem 0 1rem 0;
        height: 8.5rem;
        box-sizing: border-box;
        position: relative;
        width: auto;
    }

    #order .order-date .col {
        position: relative;
    }

    #order .order-date .col:not(:first-child):before {
        content: '';
        position: absolute;
        width: 0.1rem;
        height: 2.8rem;
        border-left: 1px solid rgba(255, 255, 255, 0.1);
        left: 0;
        top: 50%;
        margin-top: -1.4rem;

    }

    #order .dotted-line {
        position: relative;
        content: "";
        height: 1px;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
        ransform: scaleY(.5);
        -o-transform: scaleY(.5);
        transform: scaleY(.5);;
    }

    #order .checkin-user {
        position: relative;
        padding: 2rem 1.3rem;
        box-sizing: border-box;
    }

    #order .checkin-user:after {
        position: absolute;
        content: "";
        height: 1px;
        width: 100%;
        bottom: 0;
        left: 0;
        bottom: 0;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.1);
        /* -webkit-transform:scaleY(.5);
         -ms-transform:scaleY(.5);
         -o-transform:scaleY(.5);
         transform:scaleY(.5);;*/
    }

    #order .checkin-user div {
        line-height: 2.5rem;
        height: 2.5rem;
    }

    #order .checkin-user input {
        background-color: transparent;
        border: none;
        margin-left: 3rem;
    }

    #order .pay-wrap {
        padding-top: 4rem;
    }

    #order .submit-btn {
        box-sizing: border-box;
        display: inline-block;
        width: 12.5rem;
        height: 3.9rem;
        line-height: 3.9rem;
        border-radius: 5rem;
        margin: 2rem 0 1.3rem 0;
    }

    #order .detail-btn {
        display: block;
    }

    #order .tips-wrap {
        box-sizing: border-box;
        padding: 0 1.3rem 2rem 1.3rem;
        border-bottom-left-radius: 0.8rem;
        border-bottom-right-radius: 0.8rem;

    }

    #order .tips-wrap ol {
        margin: 0;
        padding: 0;
    }

    #order .tips-wrap ol li {
        list-style-type: decimal;
        list-style-position: inside;
        margin-bottom: 0.5rem;
    }

    #order .detail-wrap {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;

    }
    #order .detail-wrap .pay-detail-bottom{
        overflow-y:auto;
        max-height: 26.4rem;
    }
    #order .detail-wrap .detail-list {
        max-height: 30.9rem;
        line-height: 4.4rem;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 999;
    }

    #order .detail-wrap .border-top {
        border-top: 0.1rem solid rgba(255, 255, 255, 0.1);
    }

    #order .detail-wrap .close-btn {

    }

    #order .separation-line {
        position: relative;
        height: 0.8rem;
        width: auto;
        margin: 0 2.1rem;
    }

    #order .separation-line:before {
        content: '';
        background-image: url(../../assets/images/ddqr_pic_bg.png);
        background-size: 0.8rem 0.8rem;
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        left: -0.8rem;
    }

    #order .separation-line:after {
        content: '';
        background-image: url(../../assets/images/ddqr_pic_bg.png);
        transform: rotate(180deg);
        background-size: 0.8rem 0.8rem;
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        position: absolute;
        right: -0.8rem;
        margin-top: -0.2rem;
    }

    #order .separation-line .dotted-line {
        line-height: 0.8rem;
        position: relative;
        top: 0.4rem;
        width: auto;
        margin: 0 0.2rem;
    }
</style>

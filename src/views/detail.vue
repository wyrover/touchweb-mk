<style>
    .hotelDetail{
        /*margin-top: 1.3rem;*/
    }
    /* header */
    .hotelDetail header ul{
        border-radius:0.8rem 0.8rem 0 0;
    }
    .hotelDetail header a{
        text-decoration: none;
        height: 4.4rem;
    }
    .hotelDetail header a i{
        display: inline-block;
        margin-right: 1.3rem;
    }
    .hotelDetail header a>div:first-child{
        width: 100%;
    }
    .hotelDetail header a>div:last-child{
        padding-right:1.5rem;
    }
    
    /* hotelBaseBox */
    .hotelDetail .hotelBaseBox{
        padding-top:2rem;
    }
    .hotelDetail .hotelBaseBox div span img{
        width: 7rem;
        height: 7rem;
        margin: auto;
        border-radius: 50%;
        margin-bottom: 1.3rem;
        border: 0.3rem solid rgba(0,0,0,0.1);
        display: none;
    }
    .hotelDetail .hotelBaseBox div span:first-child img{
        display: block;
    }
    .hotelDetail .hotelBaseBox>h3,
    .hotelDetail .hotelBaseBox>div,
    .hotelDetail .hotelBaseBox>ul{
        text-align: center;
    }
    .hotelDetail .hotelBaseBox>h3{
        font-weight: 300;
        margin-bottom:0.6rem;
    }
    .hotelDetail .hotelBaseBox>div{
        margin-bottom: 0.6rem;
    }
    .hotelDetail .hotelBaseBox>div i:first-child{
         font-size: 0.9rem;
         margin-right: 0.3rem;
    }
    .hotelDetail .hotelBaseBox>div i:last-child{
        font-size: 0.8rem;
        margin-left: 0.6rem;
    }
    .hotelDetail .hotelBaseBox ul a,
    .hotelDetail .hotelBaseBox>div{
        text-decoration: none;
    }
    .hotelDetail .hotelBaseBox ul a i{
        display: block;
        width: 4rem;
        height: 4rem;
        line-height: 4.2rem;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.1);
        margin: auto;
        margin-bottom: 0.6rem;
        color: #fff;
        
        font-size: 1.8rem;
        font-weight: 300;
    }
    .hotelDetail .hotelBaseBox ul{
        margin: 1.4rem 0 2rem;
        text-align: center;
    }
    .hotelDetail .hotelBaseBox ul li{
        display: inline-block;
    }
    .hotelDetail .hotelBaseBox ul li:not(:last-child){
        margin-right: 6%;
    }
    
    /* hotelRoomBox */
    .hotelDetail .hotelRoomBox{
        /*padding-bottom:2rem;*/
    }
    .hotelDetail .no-img {
        height: 7rem;
        width: 7rem;
        font-size: 3.6rem;
        color: rgba(17, 25, 41, 1);
        line-height: 7rem;
        border: .2rem solid rgba(0,0,0,0.1);
        background-color: rgba(24,34,51,0.6);
        text-align: center;
        border-radius: 50%;
        margin: auto;
        margin-bottom:1.3rem;
    }
</style>
<template>
    <section class="hotelDetail">
        <header>
            <ul class="m-list m-list-noline bg-cloudburst font_13">
                <li class="arrow">
                    <a href="javascript:;" class="m-table text-white" @click="pathTo_calendar()">
                        <div>
                            <span class="m-table-full">
                                <i class="icon-jdxq_icon_time"></i>
                                入住{{startTime | widgetDate '_plainDateStr' 'MM月dd日' true}} 
                                离店{{endTime | widgetDate '_plainDateStr' 'MM月dd日' true}} 
                            </span>
                        </div>
                        <div>
                            <span class="m-table-pre">共{{days}}晚</span>
                        </div>
                    </a>
                </li>
            </ul>
        </header>
        <section>
            <div class="hotelBaseBox">
                <div class="img_prev_view">
                    <div class="no-img" v-if="!hotelInfo.hasPicture">{{hotelInfo.hotelName|limit 1}}</div>
                    <span v-for="hotelPic in hotelInfo.hotelPics">
                        <img v-if="hotelPic.pic[0].url" :src="$index==0?hotelPic.pic[0].url+'?imageView/0/w/640':''" :data-image="$index>0?hotelPic.pic[0].url+'?imageView/0/w/640':''" alt="">
                    </span>
                </div>
                <h3 class="font_16 text-white">{{hotelInfo.hotelName}}</h3>
                <div class="font_11 text-dark">
                    {{hotelInfo.detailAddr}}
                </div>
                <div class="font_11 text-dark">
                    <i class="star star_{{~~hotelInfo.grade}}"></i>{{hotelInfo.grade}}分 {{hotelInfo.repairInfo}}
                    <i class="icon-home_icon_wifi" v-if="hasHighLight(hotelInfo.highlights,44)"></i>
                </div>
                <ul>
                    <li>
                        <a href="javascript:;" class="text-dark font_13" @click="pathTo_comments()">
                            <i class="icon-jdxq_btn_pingjia"></i>评价
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" class="text-dark font_13" @click="pathTo_facility()">
                            <i class="icon-jdxq_btn_xiangqing"></i>详情
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" class="text-dark font_13" @click="pathTo_map()">
                            <i class="icon-ddxq_icon_dingwei"></i>位置
                        </a>
                    </li>
                    <li>
                        <a href="tel:{{hotelInfo.hotelPhone}}" class="text-dark font_13">
                            <i class="icon-ddxq_btn_lianxijiudian"></i>电话
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" class="text-dark font_13" @click="setFav()">
                            <i class="" v-bind:class="{'icon-jdxq_btn_shoucang':isFav,'icon-grzx_icon_shoucang':!isFav}"></i>{{favName}}
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="hotelRoomBox">
                <div class="swiper-container marginT10" id="swiper" v-img-preview="hotelInfo" v-bind:class="{'swiper-none': !hotelInfo.roomTypes.length}">
                    <div class="swiper-wrapper" v-bind:class="{'singleActive': hotelInfo.roomTypes.length==1}">
                        
                        <div class="swiper-slide on" v-for="room in hotelInfo.roomTypes" track-by="$index">
                            <div class="orderCard">
                                <header class="bg-burst">
                                    <div>
                                        <i v-if="room.roomTypePic && room.roomTypePic.length && room.roomTypePic[0].pic && room.roomTypePic[0].pic.length && room.roomTypePic[0].pic[0].url">
                                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="{ backgroundImage:'url('+(room.roomTypePic[0].pic[0].url+'?imageView/0/w/100)')}">
                                        </i>
                                        <div v-else class="no-img">{{room.roomTypeName|limit 1}}</div>
                                    </div>
                                    <div>
                                        <span>
                                            <h3>{{room.roomTypeName}}</h3>
                                            <p>
                                                <b v-if="room.area">约{{room.area}}m<sup>2</sup></b> 
                                                <b v-if="room.bed.beds[0].length">床{{room.bed.beds[0].length | bedLengthUnit}}</b>
                                                <b v-if="room.bathRoomType">{{room.bathRoomType}}</b>
                                            </p>
                                        </span>
                                    </div>
                                </header>
                                <section>
                                    <div>
                                        <span>￥</span>{{room.dynamicPrice}}
                                    </div>
                                    <a href="javascript:;" class="orderBtn" @click="pathTo_orderCheck({ roomtypeid: room.roomTypeId, index: $index})">预订</a>
                                </section>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
    var Swiper = require('../libs/swiper.min.js');
    var widgetDate = require('../libs/widget-date.js');
    var widgetImgPreview = require('../libs/widget-imagePreview.js');
    var util = require('../libs/util.js'); 
    
    export default {
        props:{
            hotelId:{
                required: true
            },
            startTime:{
                required: false
            },
            endTime:{
                required: false
            }
        },
		data() {
			return {
                token: util.getStore('m28'),
                hotelInfo: {},
                days: '1',
                isFav: false,
                tips:{
                    hotelExist: '酒店信息为空~'
                },
                widgetImgPreview: '',
                swiper: '',
                canOrderIndex:0,
                favName: '收藏'
            }
        },
        components: {
            
        },
        methods: {
            //跳转地图
            pathTo_map(){
                //logEvt('e_hotel_detail_address');
                window.location.href=this.mapLink;
            },
            //跳转日历
            pathTo_calendar(){
                var vm=this,
                    params={
                        starttime: vm.startTime || '',
                        endtime: vm.endTime || ''
                    };
                vm.$route.router.go({path:'/calendar', query:params});
            },
            //跳转酒店评价页面
            pathTo_comments(){
                var vm=this;
                vm.$route.router.go({path:'/comments/'+vm.hotelId});
            },
            //跳转酒店详情页面
            pathTo_facility(){
                var vm=this;
                vm.$route.router.go({path:'/facility/'+vm.hotelId});
            },
            //跳转确认下单页面
            pathTo_orderCheck(params){
                //params {roomtypeid: string, index: nummber}
                if(this.canOrderIndex != params.index) return; //判断是否点击了当前高亮的按钮
                var vm=this;
                vm.getToken(function(token){
                    var hotelInfo=vm.hotelInfo;
                    if(!hotelInfo.hotelId || !params.roomtypeid) return alert('下单信息缺失~');
                    var args={
                            hotelid: hotelInfo.hotelId,
                            roomtypeid: params.roomtypeid,
                            start: vm.startTime,
                            end: vm.endTime,
                            type: 2
                        };
                    vm.$route.router.go({path:'/order', query: args});
                });
            },
            //显示wifi图标
            hasHighLight(list, id) {
                return !!util._find(list, 'id', id);
             },
            //获取酒店详情信息
            getHotelInfo(fn){
                var vm=this;
                var args={
                        hotelId:vm.hotelId,
                        page:'1',
                        limit:'1',
                        isHotelPic:'T',
                        isRoomType:'T',
                        isFacility:'T',
                        startDateDay: vm.startTime,
                        endDateDay: vm.endTime
                    };
                services.hotelSearch(args)
                    .then(function(res){
                        vm.hotelInfo=res.data.hotel[0];
                        vm.hotelId=vm.hotelInfo.hotelId || '';
                        fn && fn();
                        //console.log(JSON.stringify(vm.hotelInfo));
                    },function(){
                        return alert(vm.tips.hotelExist);
                    })
            },
            //初始化开始时间和结束时间
            timeInit(){
                var vm=this,
                    _startTime=null,
                    _endTime=null;
                if(!vm.startTime || !vm.endTime){
                    var curTime=new Date(),
                        curHour=curTime.getHours();
                    if(curHour > 0 && curHour < 6){
                        _startTime=new Date((curTime.getTime()/1000-86400*1)*1000);
                        _endTime=new Date(curTime);
                    }else{
                        _startTime=new Date(curTime);
                        _endTime=new Date((curTime.getTime()/1000+86400*1)*1000);
                    }
                    vm.startTime=widgetDate._dateToStr(_startTime, 'yyyyMMdd', true);
                    vm.endTime=widgetDate._dateToStr(_endTime, 'yyyyMMdd', true);
                }else{
                    _startTime=widgetDate._plainDate(vm.startTime);
                    _endTime=widgetDate._plainDate(vm.endTime);
                }
                vm.days=widgetDate._diff(_startTime, _endTime, 'd') || 1;
            },
            //初始化Swiper
            swiperInit(){ 
                var vm=this;
                var swiperSettings={
                    slidesPerView: 2,
                    initialSlide: 0,
                    centeredSlides: true,
                    spaceBetween: 20,
                    onInit:function(swiper){
                        this._customAdjust(swiper)
                    },
                    onSlideChangeEnd: function(swiper){
                        this._customAdjust(swiper);
                    },
                    _customAdjust: function(swiper){
                        var _idx=swiper.activeIndex, sliders=[];
                        vm.canOrderIndex=_idx;
                        try{
                            sliders=swiper.container[0].children[0].children;
                        }catch(e){}
                        var sliderLen=sliders.length;
                        if(sliders && sliderLen){
                            for(var i =0;i<sliderLen;i++){
                                if(i==_idx){
                                    if (!(/on/ig.test(sliders[i].className))) 
                                        sliders[i].className += ' on';
                                    continue;
                                }
                                sliders[i].className=sliders[i].className.replace(/on/ig,'');
                            }
                        }
                    }
                };
                //if(vm.hotelInfo.roomTypes.length < 2) return;
                setTimeout(function(){
                    vm.swiper=new Swiper('#swiper', swiperSettings);
                },300)
                //this.swiper = new Swiper('#swiper', swiperSettings);
            },
            //初始化大图预览(需要参数swiper)
            imgPreviewInit(){
                var vm = this;
                if(!vm.hotelInfo.hasPicture) return;
                vm.widgetImgPreview = new widgetImgPreview({ swiper: Swiper });
                setTimeout(function(){
                    vm.widgetImgPreview.init();
                }, 500)
            },
            //设置收藏
            setFav(){
                var vm=this,
                    curIndex=vm.isFav?1:0,
                    favDict={
                        funcName: ['addCollection','removeCollection'],
                        tip: ['收藏成功','取消收藏'],
                        param: [{hotelId: 'hotelId'},{hotelId: 'hotelIdList'}]
                    };
                vm.getToken(function(token){
                    var args={};
                    args.token=vm.token;
                    args[favDict.param[curIndex].hotelId]= vm.hotelId;
                    services[favDict.funcName[curIndex]](args)
                        .then(function (res) {
                            res=res.data || {};
                            vm.isFav=!vm.isFav;
                            vm.favName=(vm.isFav?'已':'')+'收藏';
                            return tip(favDict.tip[curIndex]);
                        }, function(res){
                            console.log('==method:[setFav]====\n'+JSON.stringify(res||{}));
                        });
                });
            },
            //获取收藏状态
            getFav(){
                var vm=this;
                if(!vm.token) return;
                var args={
                    token: vm.token,
                    hotelId: vm.hotelId
                };
                services.collectionStatus(args)
                    .then(function (res) {
                        res=res.data || {};
                        vm.isFav=res.state && res.state=='T'?true:false;
                        vm.favName=vm.isFav?'已':''+'收藏';
                    }, function(res){
                        console.log('==method:[getFav]====\n'+JSON.stringify(res||{}));
                    });
            },
            //获取地图参数出发地定位数据
            getMapLocationStr(_location){
                _location=_location || {};
                if(_location.longitude && _location.latitude)
                    return _location.longitude+','+_location.latitude;
                return null;
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
            //获取用户Token信息
            getToken(fn){
                var vm=this;
                var isloadFav=!vm.token;
                vm.$root.getToken(function(token){
                    vm.token = token;
                    if(!token) return alert('用户Token信息缺失！');
                    fn && fn(token);
                    isloadFav && vm.getFav();
                });
            }
        },
        computed: {
            mapLink(){
                //地图页面的URL
                var vm=this;
                return vm.getMapLink({
                            start: vm.getMapLocationStr(vm.$root.userLocation),
                            dest: vm.getMapLocationStr(vm.hotelInfo),
                            destName: vm.hotelInfo.hotelName
                        });
            }
        },
        beforeDestroy(){
            //销毁swiper对象
            if(this.swiper && this.swiper.destyoy)
                this.swiper.destyoy();
            if(this.widgetImgPreview)
                this.widgetImgPreview='';
        },
        ready(){
            var vm=this;
            vm.timeInit();
            vm.getHotelInfo(function(){
                vm.swiperInit();
                vm.imgPreviewInit();
            });
            //vm.getFav();
            // var hotelDetail=document.getElementsByClassName('hotelDetail')[0];
            // var top=hotelDetail.offsetTop
            // console.log(top);
            // window.scrollTo(0, top);
        }
    }; 
</script>
<style>
    /* swipe */
    /*.singleActive{
        transform:none !important;
    }
    .singleActive .swiper-slide{
        width:normal !important;
    }
    .singleActive .orderCard{
        width:inherit !important;
        margin-left: 0 !important;
    }*/
    .hotelRoomBox .swiper-container {
        width: 100%;
        height: 15rem;
        margin: 2rem auto;
        overflow: hidden;
        overflow-y:visible;
        padding: 2rem 0;
    }
    .hotelRoomBox .swiper-container.swiper-none{
        height:0;
        overflow:hidden;
        padding:0;
    }
    .hotelRoomBox .swiper-slide {
        /*text-align: center;*/
        font-size: 1.8rem;
        width: 100%;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;

        vertical-align: top;
        position: relative;
    }

    /******************************************/

    .hotelRoomBox .orderCard{
        width: 100%;
        height: 14.9rem;
        background-color: rgba(17,25,41,0.2);
        border-radius: 0.8rem;
        position: absolute;
        left:0;
        top:0;
        overflow: hidden;
        color: #ccc;
        /*opacity: 0.4;*/
    }
    .hotelRoomBox .orderCard header{
        display: table;
        padding: 10px;
        background-color:rgba(21,22,37,0.5);
    }
    .hotelRoomBox .orderCard header>*{
        display: table-cell;
        vertical-align: middle;
    }
    .hotelRoomBox .orderCard header>*:last-child{
        width: 100%;
        vertical-align: middle;
    }
    /*图片*/
    .hotelRoomBox .orderCard header i{
        display: inline-block;
        width: 2.5rem;
        border-radius: 50%;
        border: 0.2rem solid rgba(0,0,0,0.1);
    }
    .hotelRoomBox .orderCard header i img{
        width: 100%;
        max-width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;

        border-radius: 50%;
        vertical-align: middle;
    }
    .hotelRoomBox .orderCard header .no-img{
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1.3rem;
        line-height: 2.5rem;
        margin: 0;
    }
    /*描述*/
    .hotelRoomBox .orderCard header span{
        display: table-cell;
        padding-left: 0.6rem;
        height: 2.9rem;
        vertical-align: middle;
    }
    .hotelRoomBox .orderCard header b{
        font-weight: 300;
    }
    .hotelRoomBox .orderCard header h3{
        font-size: 1.1rem;
        font-weight: 300;
        color: rgba(255,255,255,0.4);
        margin-bottom: 0.4rem;
        line-height: 1;
    }
    .hotelRoomBox .orderCard header p{
        font-size: 0.9rem;
        color: rgba(255,255,255,0.1);
        line-height: 1;
    }

    .hotelRoomBox .orderCard section div{
        font-size: 2.9rem;
        text-align:center;
        margin-top: 1.6rem;
        margin-bottom: 0.9rem;
            line-height: 1;
    }
    .hotelRoomBox .orderCard section div span{
        font-size: 1rem;
    }
    .hotelRoomBox .orderCard section a.orderBtn{
        display: block;
        width: 9.3rem;
        height: 3.4rem;
        line-height: 3.4rem;
        background: rgba(255,117,8,0.4);
        border-radius: 4rem;
        text-decoration: none;
        font-size: 1.3rem;
        color: rgba(255,255,255,0.4);
        text-align: center;
        margin: auto;
    }

    .hotelRoomBox .on .orderCard{
        margin-top:-1.3rem;
        height: 17.5rem;
        width: 110%;
        margin-left:-5%;
        color: #fff;
        background-color: rgba(17,25,41,0.6);
        opacity: 1;
    }
    .hotelRoomBox .on .orderCard header{
        padding: 1.1rem 1.3rem;
    }
    .hotelRoomBox .on .orderCard header i{
        width: 3rem;
    }
    .hotelRoomBox .on .orderCard header .no-img{
        width: 3rem;
        height: 3rem;
        font-size: 1.5rem;
        line-height: 3rem;
    }
    .hotelRoomBox .on .orderCard header h3{
        font-size: 1.3rem;
        margin-bottom: 0.6rem;
        color: #fff;
    }
    .hotelRoomBox .on .orderCard header span{
        height: 3.4rem;
    }
    .hotelRoomBox .on .orderCard header p{
        font-size: 1.1rem;
        color: rgba(255,255,255,0.3);
    }
    .hotelRoomBox .on .orderCard section div{
        font-size: 3.4rem;
        line-height: 1;
        margin-top: 1.8rem;
        margin-bottom: 1rem;
    }
    .hotelRoomBox .on .orderCard section div span{
        font-size: 1.2rem;
    }
    .hotelRoomBox .on .orderCard section a.orderBtn{
        width: 11rem;
        height: 4rem;
        line-height: 4rem;
        font-size: 1.6rem;
        color: #fff;
        background: rgba(255,117,8,1);
    }
</style>


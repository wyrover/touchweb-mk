<style>
    .facility-content{
        border-radius: 0.8rem 0.8rem 0 0;
    }
    .facility-content ul{
        border: none;
    }
    .facility-content ul li{
        border-bottom:0.1rem solid rgba(255,255,255,0.1);
        padding: 1.6rem 0;
        padding-right: 1.3rem;
    }
    .facility-content ul li:last-child{
        border-bottom:0.1rem solid rgba(255,255,255,0.1);
    }
    .facility-content .m-table>div>span{
        line-height:  1.8rem;
    }
    .facility-content .m-table>div i{
        margin-right: 0.6rem;
        vertical-align: middle;
    }
    .facility-content .m-table>div:first-child{
        padding-right: 1.3rem;
    }
    .facility-content .m-table>div:last-child{
        width: 100%;
    }
    .facility-content .m-table>div:last-child>span{
        line-height: 1.8rem;
    }
    .facility-content .m-table>div:last-child>span span{
        display: inline-block;
        margin-right: 0.5rem;
    }
</style>
<template>
    <header class="app-page-header  facility-header">
        <div>
            <page-header :page-title="'详情'"></page-header>
        </div>
    </header>
    <div class="app-content facility-content bg-dark" v-height-ctrl="hotelDetail">
        <ul class="m-list">
            <!-- 酒店交通 start -->
            <li v-if="hotelDetail.trafficdec">
                <div class="m-table m-table-top">
                    <div>
                        <span class="m-table-pre font_13 text-white"><i class="icon-jdxq_btn_jiatong font_16 text-d-dark"></i>交通</span>
                    </div>
                    <div>
                        <span class="m-table-full text-d-dark font_13">{{{hotelDetail.trafficdec}}}</span>
                    </div>
                </div>
            </li>
            <!-- 酒店交通 end -->
            <!-- 酒店设施 start -->
            <li v-if="hotelFacility && hotelFacility.length">
                <div class="m-table m-table-top">
                    <div>
                        <span class="m-table-pre font_13 text-white"><i class="icon-jdxq_btn_sheshi font_15 text-d-dark"></i>设施</span>
                    </div>
                    <div>
                        <span class="m-table-full text-d-dark font_13"><span v-for="facility in hotelFacility">{{facility}}</span></span>
                    </div>
                </div>
            </li>
            <!-- 酒店设施 end -->
            <!-- 酒店服务 start -->
            <li v-if="service && service.length">
                <div class="m-table m-table-top">
                    <div>
                        <span class="m-table-pre font_13 text-white"><i class="icon-jdxq_btn_fuwu font_15 text-d-dark"></i>服务</span>
                    </div>
                    <div>
                        <span class="m-table-full text-d-dark font_13"><span v-for="serviceOption in service">{{serviceOption}}</span></span>
                    </div>
                </div>
            </li>
            <!-- 酒店服务 end -->
            <!-- 酒店介绍 start -->
            <li v-if="hotelDetail.introduction">
                <div class="m-table m-table-top">
                    <div>
                        <span class="m-table-pre font_13 text-white"><i class="icon-jdxq_btn_jieshao font_15 text-d-dark"></i>介绍</span>
                    </div>
                    <div>
                        <span class="m-table-full text-d-dark font_13">{{hotelDetail.introduction}}</span>
                    </div>
                </div>
            </li>
            <!-- 酒店介绍 end -->
            <!-- 酒店政策 start -->
            <li v-if="hotelDetail.retentionTime || hotelDetail.defaultLeavlTime">
                <div class="m-table m-table-top">
                    <div>
                        <span class="m-table-pre font_13 text-white"><i class="icon-jdxq_btn_zhence font_15 text-d-dark"></i>政策</span>
                    </div>
                    <div>
                        <span class="m-table-full text-d-dark font_13">
                            最晚保留时间: {{timeStrFormat(hotelDetail.retentionTime)}}
                            <br>
                            默认离店时间: {{timeStrFormat(hotelDetail.defaultLeavlTime)}}    
                        </span>
                    </div>
                </div>
            </li>
            <!-- 酒店政策 end -->
        </ul>
    </div>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    
    export default {
		data() {
			return {
                hotelId: this.$route.params.hotelid,
                hotelInfo: {},
                hotelFacility: [],
                service: [],
                other: []
            }
        },
        components: {
            pageHeader
        },
        methods: {
            timeStrFormat(str){
                if(!str || str.length < 4) return '';
                var dateList=str.split('');
                return dateList[0]+dateList[1]+':'+dateList[2]+dateList[3];
            },
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
            setDetailTraffic(){
                var hotelDetail=this.hotelInfo;
                if(hotelDetail.traffic && 'object'==typeof(hotelDetail.traffic)){
                    var _trafficdec='',traficName='';
                    for(var k in hotelDetail.traffic){
                        switch(k){
                            case 'airport':
                                traficName='航空线路：';
                                break;
                            case 'bus':
                                traficName='公交线路：';
                                break;
                            case 'metro':
                                traficName='地铁线路：';
                                break;
                        }
                        _trafficdec+=(hotelDetail.traffic[k]?traficName+hotelDetail.traffic[k].replace(/\n/g,'<br/>'):'')+'<br/>';
                    }
                    hotelDetail.trafficdec=_trafficdec;
                }
                return hotelDetail;
            },
            setHotelFacilityAndService(){
                var hotelFacility=this.hotelInfo.hotelFacility,
                    vm=this, 
                    eleName="";
                for(var i=0,len=hotelFacility.length;i<len;i++){
                    eleName=hotelFacility[i].facType==1?"hotelFacility":hotelFacility[i].facType==2?"service":"other";
                    vm[eleName].push(hotelFacility[i].facName);
                }
            }
        },
        computed:{
            hotelDetail(){
                return this.setDetailTraffic();
            }
        },
        created(){
            
        },
        ready(){
            window.scrollTo(0,0);
            var vm=this;
            vm.getHotelInfo(function(){
                vm.setHotelFacilityAndService();
            }); 
        }
    };
        
</script>

<template>
    <div class="app-body search-list">
        <header class="app-header text-white">
            <div v-show="!showKeyword" class="fadeIn">
                <span class="header-locate" v-link="{path:'/city'}">{{cityName}} <i class="icon-home_btn_jiantou_down text-dark"></i></span>
                <span class="header-search pull-right" v-link="{path:'/me'}"><i class="icon-home_btn_gerenzhongxin"></i></span>
                <span class="header-me pull-right" @click="toggleKeyword()"><i class="icon-home_btn_sousuo"></i></span>
            </div>
            <div class="m-flex fadeIn" v-show="showKeyword">
                <form action="javascript:;" class="search-input">
                    <input type="search" data-aria-clear-label aria-label v-model="$root.keyword" @search="keyWordSearch()" style="font-family: 'mikeFonts'"
                    placeholder="&#xe901 酒店名/地址/关键字">
                </form>
                <label class="text-right btn-header-cancel" @click="toggleKeyword()">取消</label>
            </div>
        </header>
        <div class="bg-cloudburst">
            <section class="filter-box text-white m-flex">
                <div class="col" v-link="{path:'/areas'}">
                    <span>位置区域</span><i class="icon-home_btn_jiantou_down text-dark"></i>
                </div>
                <div class="col" @click="toggleFilter(rangeOptions)">
                    <span class="disable">{{$root.range.text}}</span><i class="icon-home_btn_jiantou_down text-dark"></i>
                </div>
                <div class="col" @click="toggleFilter(priceOptions)">
                    <span class="disable">{{$root.price.text}}</span><i class="icon-home_btn_jiantou_down text-dark"></i>
                </div>
                <div class="col" @click="toggleFilter(orderByOptions)">
                    <span>{{$root.orderBy.text}}</span><i class="icon-home_btn_jiantou_down text-dark"></i>
                </div>
            </section>
            <section class="filter-option box-shadowed ">
                <ul class="option-list fadeIn" v-show="priceOptions.isShow">
                    <li @click="selectFilter(f,$root.price)" v-for="f in priceOptions.list" :class="{'active':$root.price.value==f.value}">{{f.text}}</li>
                </ul>
                <ul class="option-list fadeIn" v-show="orderByOptions.isShow">
                    <li @click="selectFilter(f,$root.orderBy)" v-for="f in orderByOptions.list" :class="{'active':$root.orderBy.value==f.value}">{{f.text}}</li>
                </ul>
                <ul class="option-list fadeIn" v-show="rangeOptions.isShow">
                    <li @click="selectFilter(f,$root.range)" v-for="f in rangeOptions.list" :class="{'active':$root.range.value==f.value}">{{f.text}}</li>
                </ul>
            </section>
            <!--<div class="filter-bg" v-show="rangeOptions.isShow || priceOptions.isShow || orderByOptions.isShow"></div>-->
            <div class="hotel-list">
                <div class="hotel-list-item-container" v-for="hotel in hotelList">
                    <detail v-if="hotel.visible=='F'" :hotel-id="hotel.hotelId" :start-time="startdate" :end-time="enddate" class="zoomIn hotel-list-detail"></detail>
                    <div v-if="hotel.visible=='T'" class="hotel-list-item m-table" @click="hotelTap(hotel)">
                        <div class="item-image m-table-top">
                            <div class="no-img" v-if="!hotel.hasPicture">{{hotel.hotelName|limit 1}}</div>
                            <img v-if="hotel.hasPicture" class="fadeIn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                            v-bind:style="{ backgroundImage:'url('+hotel.hotelPics[0].pic[0].url+'?imageView/0/w/70)'}" alt="">
                        </div>
                        <div class="item-info">
                            <div class="m-table-full">
                                <div class="text-white hotel-name text-cut">
                                    {{hotel.hotelName}}
                                </div>
                                <div class="hotel-score text-dark">
                                    <span class="star"><i class="star star_{{hotel.grade | mathFloor}}"></i></span>
                                    <span>{{hotel.grade}}分</span>
                                    <span>{{hotel.repairInfo}}</span>
                                    <i class="icon-home_icon_wifi" v-if="hasHighLight(hotel.highlights,44)"></i>
                                </div>
                                <div class="hotel-distance">
                                    <i class="icon-home_icon_dingwei_white text-dark"></i><span class="text-dark">距您 {{hotel.distance|distance}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-right">
                            <div class="item-price text-right">
                                <small class="text-orange">&yen;</small>
                                <span class="price text-orange">{{hotel.dynamicPrice}}</span>
                                <span class="text-dark">起</span>
                            </div>
                        </div>
                    </div>
                </div>
                <load-more @click="loadMoreList()" :is-loading="isLoading" :is-load-all="isLoadAll"></load-more>
            </div>
        </div>
        <div class="no-record" v-show="hotelList.length == 0">
                <i class="icon-scjd_icon_wujiudian"></i>
                <div>
                    未查询到匹配的酒店
                </div>
        </div>
    </div>
</template>
<script>
    var util = require('../libs/util.js');
    import loadMore from '../components/loadMore.vue';
    import detail from './detail.vue';
    
    export default {
		data() {
			return {
                rangeOptions: {
                    isShow: false,
                    list: [
                        { text: "附近1km", value: 1000 },
                        { text: "附近3km", value: 3000 },
                        { text: "附近5km", value: 5000 },
                        { text: "附近10km", value: 10000 },
                        { text: "全城", value: -1 }
                    ]
                },
                priceOptions: {
                    isShow: false,
                    list: [
                        { text: "价格不限", value: 9999 },
                        { text: "30元以下", value: 30 },
                        { text: "80元以下", value: 80 },
                        { text: "100元以下", value: 100 },
                    ]
                },
                orderByOptions: {
                    isShow: false,
                    list: [
                        { text: "默认排序", value: "0" },
                        { text: "价格优先", value: "3" },
                        { text: "距离优先", value: "1" },
                    ]
                },
                pageIndex:1,
                isLoadAll:true,
                isLoading:false,
                noRecord:false,
                cityName:'定位中',
                hotelList:[],
                showKeyword:false,
            }
        },
        components: {
            loadMore,
            detail
        },
        computed: {
            startdate() {
                var vm = this;
                var today = util.dateFormat(vm.getPreCheckDate(), 'yyyyMMdd');
                return this.$route.query.startdate || today;
            },
            enddate() {
                var vm = this;
                var today = vm.getPreCheckDate();
                var tomorrow = today.setDate(today.getDate() + 1);
                var tomorrowStr = util.dateFormat(tomorrow, 'yyyyMMdd');
                return this.$route.query.enddate || tomorrowStr;
            }
        },
        methods: {
             hasHighLight(list, id) {
                return !!util._find(list, 'id', id);
             },
             getPreCheckDate(){
                //当时间在 0点到6点之间，相当于今入明离的适配,天数自动减1
                 var today = new Date(),
                     curHour = today.getHours();
                 if (curHour > 0 && curHour <= 6)
                     return new Date((today.getTime() / 1000 - 86400 * 1) * 1000);
                 return today;
            },
            toggleKeyword(){
                if(this.showKeyword){
                    this.$root.keyword = "";
                    this.load();
                }
                this.showKeyword = !this.showKeyword;
            },
            toggleFilter(filter){
                var toggle = !filter.isShow;
                this.rangeOptions.isShow = this.priceOptions.isShow = this.orderByOptions.isShow = false ;
                filter.isShow = toggle;
            },
            selectFilter(item,rootHandle){
                rootHandle.text = item.text;
                rootHandle.value = item.value;
                this.rangeOptions.isShow = this.priceOptions.isShow = this.orderByOptions.isShow = false ;
                this.load();
            },
            getQueryParams(){
                var vm = this,
                    root = this.$root,
                    params = {
                        page: vm.pageIndex,
                        limit: 10,
                        isHotelPic: "T",
                        keyword: root.keyword || '',
                        searchType: root.searchType,
                        userLongitude: root.userLocation.longitude,
                        userLatitude: root.userLocation.latitude,
                        minPrice: 0,
                        maxPrice: root.price.value,
                        cityCode: root.city.cityCode,
                        range: root.range.value,
                        orderBy: root.orderBy.value,
                        startDateDay: util.dateFormat(this.startdate, 'yyyyMMdd'),
                        endDateDay: util.dateFormat(this.enddate, 'yyyyMMdd')
                    };
                return params;
            },
            keyWordSearch(){
                this.load();
            },
            hotelTap(hotel){
                this.hotelList.forEach(l=>{
                    l.visible = 'T';
                });
                hotel.visible = 'F';
            },
            loadMoreList(){
                this.pageIndex++;
                this.load(true);
            },
            load(isLoadMore) {
                var ldm = null;
                var vm = this;
                vm.cityName = vm.$root.city.cityName;
                
                if (!isLoadMore) {
                    ldm = loading();
                    this.pageIndex = 1;
                } else {
                    vm.isLoading = true;
                }
                var param = vm.getQueryParams();
                
                services.hotelSearch(param)
                    .then(function (res) {
                        var list = res.data.hotel || [];
                        if (isLoadMore) {
                            vm.hotelList = vm.hotelList.concat(list);
                        } else {
                            vm.hotelList = list;
                        }
                        
                        vm.noRecord = vm.hotelList.length == 0;
                        
                        if (!isLoadMore) {
                            ldm.destroy();
                        } else {
                            vm.isLoading = true;
                        }
                        vm.isLoading = false;
                        vm.isLoadAll = list.length < param.limit;
                    }, function () {
                        ldm.destroy();
                        alert("连接不上服务器了")
                    });
            }
        },
        ready(){
            this.load(false);
        }
    };

</script>
<style>
    .search-list .search-input {
        flex: 1;
    }
    
    .search-list .search-input input {
        width: 100%;
        border: none;
        height: 2.8rem;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4rem;
        line-height: 100%;
        outline: none;
        text-align: center;
    }
    
    .search-list .btn-header-cancel {
        width: auto;
        margin-left: 1.3rem;
    }
    
    ::-moz-placeholder,
    ::-webkit-input-placeholder {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.3);
        text-align: center;
    }
    
    .search-list .header-locate i {
        font-size: .5rem;
    }
    
    .search-list .header-search i,
    .search-list .header-me i {
        font-size: 2.2rem;
    }
    
    .search-list .header-search,
    .search-list .header-me {
        margin-top: 1rem;
        line-height: 0;
    }
    
    .search-list .header-me i {
        margin-right: 1rem;
    }
    
    .search-list .filter-box {
        height: 4.4rem;
        border-top-left-radius: .8rem;
        border-top-right-radius: .8rem;
        line-height: 4.4rem;
    }
    
    .search-list .filter-box>div {
        text-align: center;
    }
    
    .search-list .filter-box span {
        font-size: 1.3rem;
    }
    
    .search-list .filter-box i {
        font-size: .6rem;
        margin-left: .6rem;
    }
    
    .search-list .filter-box span.disable {
        color: rgba(255, 255, 255, 0.6);
    }
    
    .hotel-list .hotel-list-item {
        border-top-left-radius: .8rem;
        border-top-right-radius: .8rem;
        height: 9.5rem;
        background: url('../assets/images/home_pic_bg.jpg') repeat-x;
        background-size: 1px 100%;
    }
    
    .hotel-list .hotel-list-detail {
        margin-top: 1.3rem;
    }
    
    .hotel-list .hotel-list-item-container:not(:first-child) {
        margin-top: -1.3rem;
        border-top: .1rem solid rgba(0, 0, 0, 0.2);
    }
    
    .hotel-list .item-image {
        margin: 1.1rem 1.3rem 0 1.3rem;
        width: 6rem;
        display: block;
    }
    
    .hotel-list .item-image .no-img {
        height: 5.6rem;
        width: 5.6rem;
        font-size: 3rem;
        color: rgba(17, 25, 41, 1);
        line-height: 5.6rem;
        border: .2rem solid rgba(17, 25, 41, 1);
        text-align: center;
        border-radius: 50%;
    }
    
    .hotel-list .item-image img {
        height: 5.6rem;
        width: 5.6rem;
        border: .2rem solid rgba(17, 25, 41, 1);
        border-radius: 50%;
        display: block;
        background-size: cover;
    }
    
    .hotel-list .hotel-score,
    .hotel-list .hotel-distance {
        font-size: 1.1rem;
        line-height: 100%;
    }
    
    .hotel-list .hotel-score {
        margin-top: .6rem;
    }
    
    .hotel-list .hotel-distance {
        margin-top: 1rem;
    }
    
    .hotel-list .item-info {
        vertical-align: top;
        width: 100%;
    }
    
    .hotel-list .hotel-name {
        margin-top: 1.3rem;
        font-size: 1.6rem;
        line-height: 100%;
    }
    
    .hotel-list .item-price {
        margin-top: 3rem;
        width: 7.6rem;
        padding-right: 1.3rem;
    }
    
    .hotel-list .item-right {
        vertical-align: top;
    }
    
    .hotel-list .item-price small {
        font-size: 1.2rem;
    }
    
    .hotel-list .item-price .price {
        font-size: 2.4rem;
    }
    
    .hotel-list .item-price span:last-child {
        font-size: 1.1rem;
    }
    
    .search-list .filter-option {
        position: absolute;
        width: 100%;
        z-index: 10;
    }
    
    .search-list .filter-bg {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(17, 25, 41, 0.8);
        z-index: 110;
    }
    
    .search-list .option-list li {
        color: #fff;
        font-size: 1.6rem;
        line-height: 4.4rem;
        padding-left: 1.3rem;
        background-color: rgba(39, 48, 66, 0.9);
        border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    }
    
    .search-list .option-list li.active {
        color: rgba(255, 117, 8, 1);
    }
    
    .search-list .option-list li.active::after {
        content: '\e903';
        font-family: 'mikeFonts' !important;
        float: right;
        color: rgba(39, 48, 66, 0.9);
        background-color: rgba(255, 117, 8, 1);
        border-radius: 50%;
        height: 1.8rem;
        width: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        font-size: 1.1rem;
        margin-top: 1.2rem;
        margin-right: 1.3rem;
    }
</style>
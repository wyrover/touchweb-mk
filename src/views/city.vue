<template>
    <div class="app-body city-list">
        <header class="app-header text-white">
            <div class="m-flex">
                <form action="javascript:;" class="search-input">
                    <input type="search" data-aria-clear-label @focus="searchInput(1)" aria-label v-model="keyword" @keyup="keyWordSearch()"
                    style="font-family: 'mikeFonts'" placeholder="&#xe901 城市名/城市简拼">
                </form>
                <label class="text-right btn-header-cancel" @click="cancel()">取消</label>
            </div>
        </header>
        <section class="city-result" v-show="isFocus">
            <a href="javascript:;" v-for="l in searchList" @click="selectCity(l)">{{l.acronym}} {{l.cityName | removeCityNameWords}}</a>
            <div class="no-record" v-show="searchList.length == 0">
                <i class="icon-scjd_icon_wujiudian"></i>
                <div>
                    此城市暂时无投放酒店
                </div>
            </div>
        </section>
        <section class="city-current" v-show="!isFocus" v-if="isLocatied">
            <h3>当前定位城市</h3>
            <div class="city-btns">
                <a href="javascript:;" @click="selectCity(current)">{{current.cityName | removeCityNameWords}}</a>
            </div>
        </section>
        <section class="city-all" v-show="!isFocus">
            <div v-for="(key,value) in dicList">
                <h3 @click="toggleLetter(key,$event)" :class="{'active':key == selectKey}">{{key}}</h3>
                <div class="city-item fadeIn" v-show="key == selectKey">
                    <a href="javascript:;" v-for="c in value" @click="selectCity(c)">{{c.cityName | removeCityNameWords}}</a>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
		data() {
			return {
                dicList:{},
                searchList:[],
                selectKey:"A",
                keyword:'',
                isFocus:false
            }
        },
        computed:{
            isLocatied(){
                return !!this.$root.userCity.cityCode;  
            },
            current(){
                var city = this.$root.userCity;
                var loca = this.$root.userLocation;
                var current = {
                    cityName:city.cityName,
                    cityCode:city.cityCode,
                    doublelng:loca.longitude,
                    doublelat:loca.latitude
                };
                return current;
            }
        },
        methods: {
            searchInput(f){
                this.isFocus = f;
            },
            cancel(){
                this.keyword = "";
                if(this.isFocus){
                    this.isFocus = 0;
                }else{
                    this.$route.router.go({ path: '/index', query: this.$route.query });
                }
            },
            keyWordSearch(){
                var vm = this;
                //searchCityList
                services.searchCityList({keyword:this.keyword})
                    .then(function(res){
                        vm.searchList = res.data && res.data.cityLists||[];
                    },function(){
                        alert("连接不上服务器了");
                    });
            },
            selectCity(city){
                if(this.$root.userCity.cityCode == city.cityCode){
                    this.$root.range = { text: "附近3km", value: 3000 };
                } else {
                    this.$root.range = { text: "全城", value: 0 };
                }
                
                this.$root.selectCity = {cityCode:city.cityCode,cityName:city.cityName};
                this.$root.selectLocation ={longitude:city.longitude,latitude:city.latitude};
                this.$root.area = {};
                this.$route.router.go({ path: '/index', query: this.$route.query });
            },
            toggleLetter(key,$event){
                this.selectKey = key;
                this.$nextTick(function () {
                   window.scrollTo(0,$event.target.offsetTop); 
                });
            }
        },
        ready(){
            var vm  = this;
            var ld = loading();
            services.cityList()
                .then(function(res){
                    vm.dicList = res.data && res.data.cityLists||[];
                },function(){
                    alert("连接不上服务器了");
                })
                .then(function(){
                    ld.destroy();
                });
        }
    };

</script>
<style>
    .city-list .city-result {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(17, 25, 41, 0.6);
    }
    
    .no-record {
        border-top-left-radius: .8rem;
        border-top-right-radius: .8rem;
        display: block;
        background-color: rgba(17, 25, 41, 0.6);
        color: rgba(255, 255, 255, 0.6);
        text-align: center;
        font-size: 5.9rem;
        height: 100%;
        width: 100%;
        padding: 50% 0;
        position: absolute
    }
  
    .no-record div {
        font-size: 1.5rem;
    }
    
    .city-list .search-input {
        flex: 1;
    }
    
    .city-list .search-input input {
        width: 100%;
        border: none;
        height: 2.8rem;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 4rem;
        line-height: 100%;
        outline: none;
        text-align: center;
    }
    
    .city-list .btn-header-cancel {
        width: auto;
        margin-left: 1.3rem;
    }
    
    .city-current a,
    .city-list a {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.9);
        font-size: 1.6rem;
    }
    
    .city-current h3,
    .city-all h3 {
        font-size: 1.2rem;
        font-weight: normal;
        padding: 2rem 1.3rem .6rem 1.3rem;
        color: rgba(255, 255, 255, 0.3);
        background-color: rgba(17, 25, 41, 0.3);
    }
    
    .city-current h3,
    .city-list .city-result {
        border-top-left-radius: .8rem;
        border-top-right-radius: .8rem;
    }
    
    .city-current .city-btns {
        padding: 0 1.3rem;
        background-color: rgba(17, 25, 41, 0.6);
        height: 5.4rem;
    }
    
    .city-current .city-btns a {
        border: 0.1rem solid rgba(255, 255, 255, 0.9);
        font-size: 1.6rem;
        color: rgba(255, 255, 255, 0.9);
        border-radius: 1.6rem;
        display: inline-block;
        width: 7.4rem;
        height: 2.8rem;
        text-align: center;
        line-height: 2.8rem;
        margin-top: 1.3rem;
    }
    
    .city-all .city-item a,
    .city-result a {
        display: block;
        margin-left: 1.3rem;
        height: 4.4rem;
        line-height: 4.4rem;
    }
    
    .city-all .city-item a:not(:last-child),
    .city-current .city-btns,
    .city-list .city-result a:not(:last-child) {
        border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    }
    
    .city-all h3::after {
        content: '\e90a';
        font-family: 'mikeFonts' !important;
        float: right;
        height: 1.8rem;
        width: 1.8rem;
        line-height: 1.8rem;
        text-align: center;
        font-size: 1.1rem;
    }
    
    .city-all h3.active::after {
        content: '\e908';
        font-family: 'mikeFonts' !important;
    }
</style>
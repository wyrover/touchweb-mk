<style>
    .collection-content .edit-panal .m-table,
    .collection-content .edit-panal,
    .collection-content .edit-panal>div{
        height: 5.6rem
    }
    .collection-content .edit-panal>div{
        position: fixed;
        left: 0;
        bottom:0;
        width: 100%;
        border-top: 0.1rem solid rgba(255,255,255,0.1);
    }
    .collection-content .edit-panal .m-table>*:nth-of-type(2){
        width: 100%;
        padding-left: 1.3rem;
    }
    .collection-content .edit-panal .m-table>*:last-child{
        padding-right: 1.3rem;
    }
    .collection-content .checkico{
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.1);
        border: 0.1rem solid transparent;
        margin-left: 1.3rem;
        overflow: hidden;
    }
    .collection-content .checkico.checked{
        background-color: rgba(255,117,8,1);
    }
    .collection-content .checkico i{
        display: none;
    }
    .collection-content .checkico.checked i{
        text-align: center;
        font-size: 0.9rem;
        display: block;
        line-height: 2rem;
    }
    .collection-content .delete-btn{
        display: block;
        width: 9.8rem;
        line-height: 4rem;
        border-radius: 4rem;
       text-decoration: none;
    }
</style>

<template>
    <header class="app-page-header">
        <div>
            <page-header :page-title="'收藏的酒店'" :page-right="'编辑'" :right-fn="editCollection"></page-header>
        </div>
    </header>
    <section class="app-content collection-content" v-height-ctrl="hotelInfo">
        <div class="hotel-list">
            <div class="hotel-list-item-container" v-for="hotel in hotelList" @click="tapHotel(hotel)">
                <div class="hotel-list-item m-table">
                    <div v-show="isInEditMode">
                        <span class="check-all checkico" :class="{checked:hotel.check}">
                            <i class="icon-home_icon_gou"></i>
                        </span>
                    </div>
                    <div class="item-image m-table-top">
                        <div class="no-img" v-if="!hotel.hasPicture">{{hotel.hotelName|limit 1}}</div>
                        <img v-if="hotel.hasPicture" class="fadeIn" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII="
                        v-bind:style="{ backgroundImage:'url('+hotel.pic[0].url+'?imageView/0/w/70)'}" alt="">
                    </div>
                    <div class="item-info">
                        <div class="m-table-full">
                            <div class="text-white hotel-name">
                                {{hotel.hotelName}}
                            </div>
                            <div class="hotel-score text-dark">
                                <span class="star"><i class="star star_{{~~hotel.grade}}"></i></span>
                                <span>{{hotel.grade}}分</span>
                                <span>{{hotel.repairInfo}}</span>
                                <i class="icon-home_icon_wifi" v-if="hasHighLight(hotel.highLighs,44)"></i>
                            </div>
                            <div class="hotel-distance">
                                <i class="icon-home_icon_dingwei_white text-dark"></i><span class="text-dark">距您 {{hotel.distance|distance}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="item-right">
                        <div class="item-price text-right">
                            <small class="text-orange">&yen;</small>
                            <span class="price text-orange">{{hotel.minPrice}}</span>
                            <span class="text-dark">起</span>
                        </div>
                    </div>
                </div>
            </div>
            <load-more @click="loadMore()" :is-loading="isLoading" :is-load-all="isLoadAll"></load-more>
        </div>
        <section class="edit-panal" v-show="isInEditMode">
            <div class="bg-dark-blue">
                <div class="m-table">
                    <div>
                        <span class="check-all checkico" :class="{checked:checkAll}" @click="selectAll()">
                            <i class="icon-home_icon_gou"></i>
                        </span>
                    </div>
                    <div>
                        <span class="m-table-full font_16 text-white">全选</span>
                    </div>
                    <div>
                        <span class="m-table-pre"><a href="javascript:;" class="delete-btn bg-orange text-center text-white font_18" @click="removeCollection()">删除</a></span>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
    var util = require('../libs/util.js');
    import pageHeader from '../components/pageHeader.vue';
    import loadMore from '../components/loadMore.vue';
    
    export default {
        data() {
            return {
                token: '',
                headerRightWordList: ['取消','编辑'],
                hotelList: [],
                isInEditMode: false,
                pageIndex:1,
                isLoadAll:true,
                isLoading:false,
                noRecord:false,
                checkAll:false,
            }
        },
        components: {
            loadMore,
            pageHeader
        },
        methods: {
            //编辑状态下的item的点击事件，用于选中当前item
            tapHotel(hotel){
                if(this.isInEditMode){
                    hotel.check = !hotel.check;
                    this.checkSelectAll();
                }
            },
            //判断是否有wifi信息
            hasHighLight(list, id) {
                return !!util._find(list, 'id', id);
            },
            //用于判断选中的基类方法
            _baseAllAction(loopFn, countFn){
                var allCount=0,
                    selectedCount=0,
                    vm = this;
                if(vm.hotelList && vm.hotelList.length>0){
                    vm.hotelList.forEach(function(l){
                            if(l.check)
                                selectedCount++;
                            allCount++;
                            loopFn && loopFn(l);
                    })
                }
                countFn && countFn(selectedCount, allCount);
            },
            //全选的点击事件
            selectAll(){
                var vm = this;
                this.checkAll=!this.checkAll;
                this._baseAllAction(function(l){
                    l.check = vm.checkAll;
                },null);
            },
            //判断和获取是否item已经全部选中
            checkSelectAll(){
                var vm = this;
                this._baseAllAction(null,function(s,a){
                    vm.checkAll= (a>0 && a == s);
                });
            },
            //设置顶部右侧的编辑/取消文字切换和页面编辑的显示
            editCollection(headerVm){
                var vm=this;
                vm.isInEditMode=!vm.isInEditMode;
                headerVm.pageRight=vm.headerRightWordList[!vm.isInEditMode?1:0];
            },
            //移除选中的收藏酒店信息
            removeCollection(){
                var vm = this;
                var ids = [];
                if(vm.hotelList && vm.hotelList.length){
                    vm.hotelList.forEach(function(l){
                        if(l.check){
                            ids.push(l.hotelId);
                        }
                    })
                }
                
                if(!ids.length)
                    return alert("请选择要删除的酒店");
                    
                confirm('确认删除选中的酒店？',{
                    callBack: function(evt){
                        this.destroy();
                        if('确定' ==evt.target.innerHTML){
                            var param = {},
                                ldm = loading();
                            vm.$root.getToken(function(tk){
                                param.token = tk;
                                param.hotelIdList = ids.join(',');
                                param.hotelId = ids.join(',');
                                services.removeCollection(param)
                                    .then(function(){
                                        ldm.destroy();
                                        vm.load();
                                    },function(){
                                        ldm.destroy();
                                        alert("数据删除失败！");
                                    });
                            });
                        }
                    }
                })
            },
            //加载显示收藏的酒店信息
            load(isLoadMore){
                var vm = this;
                var ldm = null;
                var param = {
                    page:vm.pageIndex,
                    limit:10,
                }
                param.userLongitude = vm.$root.userLocation.longitude;
                param.userLatitude = vm.$root.userLocation.latitude;
                //get Token
                vm.$root.getToken(function(tk){
                    if(!isLoadMore){
                        ldm = loading();
                        param.page = 1;
                    } else{
                        vm.isLoading = true;
                    }
                    param.token = tk;
                    services.collectionsList(param)
                        .then(function (res) {
                            var list = res.data.hotel || [];
                            /////////////////测试数据输出/////////////////////////////
                            /*
                            var testOutput='';
                            list.forEach(function(l){
                                testOutput+=l.hotelName+'\n';
                            })
                            var paramOutput='';
                            for(var i in param){
                                paramOutput+=i+' : '+param[i]+'\t';
                            }
                            console.log('=============参数数据===============');
                            console.log(paramOutput)
                            console.log('=============酒店名称（数量：'+res.data.count+'）===============');
                            console.log(testOutput)
                            */
                            /////////////////////////////////////////////////////////
                            if(list && list.length>0){
                                list.forEach(function(l){
                                    l.check = false;
                                })
                                vm.checkAll=false;
                            }
                            if(isLoadMore){
                                vm.hotelList = vm.hotelList.concat(list);
                            }else{
                                vm.hotelList = list;
                            }
                            
                            if(!isLoadMore){
                                ldm.destroy();
                            } else{
                                vm.isLoading = true;
                            }
                            vm.noRecord= vm.hotelList.length == 0;
                            vm.isLoading = false;
                            vm.isLoadAll = vm.hotelList.length >= res.data.count;
                            
                        },function(){
                            ldm.destroy();
                            vm.noRecord= true;
                            alert("连接不上服务器了")
                        });
                },function(){
                    vm.noRecord= true;
                });
            },
            //加载更多的点击事件
            loadMore(){
                this.pageIndex +=1;
                this.load(true);
            }
        },
        ready(){
            this.load();
        }
    };
</script>
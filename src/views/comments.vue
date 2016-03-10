<style>
   .comment-content{
       
   }
   /* 头部导航条 */
   .comment-nav{
       border-radius: 0.8rem 0.8rem 0 0;
   }
   .comment-nav a{
        text-decoration: none;
        color: rgba(255,255,255,0.3);
        border-bottom: 0.1rem solid transparent;
        text-align: center;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 1.4rem;
   }
   .comment-nav a.on{
       color: rgba(255,117,8,1);
       border-bottom: 0.1rem solid rgba(255,117,8,1);
   }
   
   
   /* 评价列表 */
   .comment-content .comment-list{}
   .comment-content .comment-list .m-list{
       border: none;
   }
   .comment-content .comment-list .m-list>li{
        border-color: rgba(255,255,255,0.1);
        padding: 2rem 0;
   }
   .comment-content .comment-list .m-list>li:last-child{
       border-bottom:1px solid rgba(255,255,255,0.1);
   }
   .comment-content .comment-list .m-list>li>.m-table>*{
        padding-right: 1.3rem;
    }
    
    /* 评价内容信息 */
    .comment-content .commentPhoto{
        display: inline-block;
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        background-color: transparent;
        overflow: hidden;
        padding-top:0.3rem;
    }
    .comment-content .commentPhoto img{
        width: 100%;
        max-width: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .comment-content section .m-table>div:last-child{
        width: 100%;
        color: rgba(255,255,255,0.5);
    }
    .comment-content .commentTime{
        color: rgba(255,255,255,0.9);
    }
    .comment-content .commentTime div:first-child{
        width: 100%;
        font-size: 14px;
    }
    .comment-content .commentTime div:last-child,
    .comment-content .commentStar{
        color: rgba(255,255,255,0.3) !important;
    }
    .comment-content .commentStar{
        padding: 0.6rem 0;
    }
    .comment-content .commentReply{
        background-color: rgba(0,0,0,0.1);
        padding: 1.3rem;
        position: relative;
        margin-top:1.5rem;
        line-height: 1.6rem;
    }
    .comment-content .commentReply:before{
        content: '';
        display: block;
        position: absolute;
        left: 1rem;
        top: -0.5rem;
        width: 0;
        height: 0;
        border-left: 0.5rem solid transparent;
        border-right: 0.5rem solid transparent;
        border-bottom: 0.5rem solid rgba(17,25,41,0.3);
    }
    
    .comment-content .noComments{
        text-align: center;
        position: absolute;
        left: 0;
        top:50%;
        width: 100%;
        margin-top:-3.9rem;
    }
    .comment-content .noComments i{
        font-size: 5rem;
        font-weight: 300;
    }
    .comment-content .noComments div{
        line-height: 1;
        margin-top:1.3rem;
    }
</style>
<template>
    <header class="app-page-header comment-header">
        <div>
            <page-header :page-title="'评价'"></page-header>
            <nav class="m-flex comment-nav bg-cloudburst">
                <a href="javascript:;" v-bind:class="{'on': pageData.status=='A'}" @click="setStatus('A')">
                    全部({{commentCacheList.A.count}})
                </a>
                <a href="javascript:;" v-bind:class="{'on': pageData.status=='G'}" @click="setStatus('G')">
                    好评({{commentCacheList.G.count}})
                </a>
                <a href="javascript:;" v-bind:class="{'on': pageData.status=='M'}" @click="setStatus('M')">
                    中评({{commentCacheList.M.count}})
                </a>
                <a href="javascript:;" v-bind:class="{'on': pageData.status=='B'}" @click="setStatus('B')">
                    差评({{commentCacheList.B.count}})
                </a>
            </nav>
        </div>
    </header>
    <div class="app-content comment-content bg-dark" v-height-ctrl="pageData.data">
            <section class="comment-list">
                <ul class="m-list" v-if="pageData.data.length">
                    <li v-for="commentOption in pageData.data">
                        <div class="m-table m-table-top">
                            <div>
                                <span class="commentPhoto">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=" :style="{ backgroundImage:'url('+(commentOption.pic?commentOption.pic+'?imageView/0/w/100)':')')}">
                                </span>
                            </div>
                            <div>
                                <div class="m-table-full">
                                    <div class="m-table commentTime">
                                        <div>
                                            <span class="m-table-full text-white font_16">
                                                {{commentOption.telphone | phoneNumFormat}}
                                            </span>
                                        </div>
                                        <div>
                                            <span class="m-table-pre text-dark font_12">{{commentOption.createTime | widgetDate "_plainDateStr" "yyyy-MM-dd"}}</span>
                                        </div>
                                    </div>
                                    <div class="commentStar font_11">
                                        <i class="star star_{{~~commentOption.grade}}"></i>{{commentOption.grade}}分 {{commentOption.roomTypeName}}
                                    </div>
                                    <div class="commentContent text-d-dark font_13">
                                        {{commentOption.comment}}
                                    </div>
                                    <!--<div class="commentReply bg-cloudburst font_12 text-d-dark">
                                        <span class="text-dark">眯客回复: </span>亲爱的用户感谢您的支持，欢迎下次光临。
                                    </div>
                                    <div class="commentReply bg-cloudburst font_12 text-d-dark">
                                        <span class="text-dark">眯客回复: </span>亲爱的用户感谢您的支持，欢迎下次光临。亲爱的用户感谢您的支持，欢迎下次光临。
                                    </div>-->
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-if="!pageData.data.length && !pageData.isLoading" class="noComments">
                    <i class="icon-jdxq_btn_pingjia text-d-dark"></i>
                    <div class="font_15 text-d-dark">暂无酒店评价</div>
                </div>
                    <load-more @click="getCommentsInfo(null)" :is-loading="pageData.isLoading" :is-load-all="pageData.isLoadAll"></load-more >
            </section>
        
    </div>
</template>
<script>
    var widgetDate = require('../libs/widget-date.js');
    import pageHeader from '../components/pageHeader.vue';
    import loadMore from '../components/loadMore.vue';
    
    export default {
		data() {
			return {
                commentCacheList: {
                    A: {page: 0,isLoadAll: false,data: [],count:0},
                    G: {page: 0,isLoadAll: false,data: [],count:0},
                    M: {page: 0,isLoadAll: false,data: [],count:0},
                    B: {page: 0,isLoadAll: false,data: [],count:0},
                },
                pageData:{
                    status: 'A',
                    data: [],
                    isLoadAll: true,
                    isLoading: false
                },
                token: '',
                hotelId: this.$route.params.hotelid,
            }
        },
        components: {
            pageHeader,
            loadMore
        },
        methods: {
            //获取状态的评价数量值（暂时不需要该显示）
            getCommentsCount(fn){
                var vm=this, 
                    args=vm.getMergeTokenInfo({hotelId: vm.hotelId});
                services.hotelCommentsCount(args)
                    .then(function(res){
                        res=res.data || {};
                        fn && fn(res);
                    },function(){
                        return alert('获取Comments数据失败~');
                    });
            },
            //设置评价的数量信息
            setCommentsCount(){
                var vm=this;
                vm.getCommentsCount(function(res){
                    vm.commentCacheList.A.count=res.allNumber;
                    vm.commentCacheList.G.count=res.goodNumber;
                    vm.commentCacheList.M.count=res.nomerNumber;
                    vm.commentCacheList.B.count=res.badNumber;
                })
            },
            //用于控制选中状态
            setStatus(lvl){
                var vm=this;
                if(vm.pageData.isLoading) return;
                if(lvl=='A' || lvl=='G' || lvl=='M' || lvl=='B'){
                    vm.pageData.status=lvl;
                }else{
                     vm.pageData.status='A';
                } 
                window.scrollTo(0,0);
                vm.loadComments();
            },
            //拼接token信息
            getMergeTokenInfo(args){
                if(this.token && args)
                    args.token=this.token;
                return args;
            },
            loadComments(){
                var vm=this;
                if(vm.commentCacheList[vm.pageData.status].data && vm.commentCacheList[vm.pageData.status].data.length){
                    vm.pageData.data=vm.commentCacheList[vm.pageData.status].data;
                    vm.pageData.isLoadAll=vm.commentCacheList[vm.pageData.status].isLoadAll;
                }else{
                    vm.pageData.data=[];
                    vm.pageData.isLoadAll=false;
                    vm.getCommentsInfo(1, function(data){

                    })
                }
            },
            //获取评价信息
            getCommentsInfo(pageNum, fn){
                var vm=this,
                    args=vm.getMergeTokenInfo({hotelId: vm.hotelId, gradeType: vm.pageData.status});
                vm.pageData.isLoading=true;
                vm.pageData.isLoadAll=true;
                args.page=pageNum || ++vm.commentCacheList[vm.pageData.status].page;
                args.limit=10;
                if(pageNum)
                    vm.commentCacheList[vm.pageData.status].page++;
                if(vm.commentCacheList[vm.pageData.status].isLoadAll){
                    vm.pageData.isLoadAll=vm.commentCacheList[vm.pageData.status].isLoadAll;
                    vm.pageData.isLoading=false;
                    return true;
                }
                services.hotelComments(args)
                    .then(function(res){
                        res=res.data || {success: 'F'};
                        if(res.success!="T") return;
                        if(res.list && res.list.length){
                            res.list.forEach(function(obj, i){
                                vm.pageData.data=vm.pageData.data.concat(res.list[i]);
                                vm.commentCacheList[vm.pageData.status].data=vm.commentCacheList[vm.pageData.status].data.concat(res.list[i]);
                            });
                        }
                        vm.commentCacheList[vm.pageData.status].isLoadAll=vm.pageData.isLoadAll=!!(args.page >= res.pigeSize);
                        vm.pageData.isLoading=false;
                        if(fn)
                            fn(res);
                    },function(){
                        return alert('获取评价数据失败~');
                    })
            }
        },
        computed: {
            
        },
        created(){
            
        },
        ready(){
            window.scrollTo(0,0);
            this.setCommentsCount();
            this.loadComments();
        }
    };
        
</script>

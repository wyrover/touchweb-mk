<style>
    /* addComment-content */
    
    .addComment-content {
        border-radius: 0.8rem 0.8rem 0 0;
        padding-bottom:2rem;
    }
    
    .addComment-content ul {
        border: none;
    }
    
    .addComment-content ul li {
        padding-top: 2rem;
        padding-bottom: 2rem;
        border-color: rgba(255, 255, 255, 0.1);
    }
    
    .addComment-content ul li:last-child {
        padding: 0;
    }
    /* addComment-info-header */
    
    .addComment-content .addComment-info-header {}
    
    .addComment-content .addComment-info-header header,
    .addComment-content .addComment-info-header span {
        line-height: 1;
    }
    
    .addComment-content .addComment-info-header span {
        display: block;
        margin-top: 1.3rem;
    }
    
    .addComment-content .addComment-info-header span i {
        font-style: normal;
        padding: 0 0.8rem;
    }
    /* addComment-info-content */
    
    .addComment-content .addComment-info-content header {
        line-height: 1;
        margin-bottom: 1.3rem;
    }
    
    .addComment-content .addComment-info-content section {
        display: block;
        padding: 1rem;
    }
    
    .addComment-content .addComment-info-content textarea {
        display: block;
        width: 100%;
        height: 9.9rem;
        padding: 0;
        border-radius: 0;
        border: none;
        color: #fff;
        text-align: left;
    }
    
    .addComment-content .addComment-info-content textarea::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.2);
        text-align: left;
    }
    /* addComment-info-star */
    
    .addComment-content .addComment-info-star {}
    
    .addComment-content .addComment-info-star header {
        line-height: 1;
        margin-bottom: 1.9rem;
    }
    
    .addComment-content .addComment-info-star ul li {
        padding: 0;
        margin-bottom: 2rem;
    }
    
    .addComment-content .addComment-info-star ul li:last-child {
        margin-bottom: 0;
    }
    
    .addComment-content .addComment-info-star .m-table>*:last-child {
        width: 100%;
        text-align: right;
    }
    
    .addComment-content .addComment-info-star .btn-star,
    .addComment-content .addComment-info-star .btn-star>* {
        letter-spacing: 0;
    }
    
    .addComment-content .addComment-info-star .btn-star>* {
        display: inline-block;
        line-height: 1;
        font-size: 2.2rem;
        margin-right: 0.5rem;
    }
    
    .addComment-content .addComment-info-star .btn-star>*:before {
        content: "\e904";
        color: rgba(255, 255, 255, 0.1);
    }
    
    .addComment-content .addComment-info-star .btn-star_1>*:nth-child(-n+1):before,
    .addComment-content .addComment-info-star .btn-star_2>*:nth-child(-n+2):before,
    .addComment-content .addComment-info-star .btn-star_3>*:nth-child(-n+3):before,
    .addComment-content .addComment-info-star .btn-star_4>*:nth-child(-n+4):before,
    .addComment-content .addComment-info-star .btn-star_5>*:nth-child(-n+5):before {
        content: "\e904";
        color: rgba(255, 210, 0, 1);
        border: none;
    }
    /* addComment-btn */
    
    .addComment-btn {
        display: block;
        margin: 0 auto;
        margin-top: 6rem;
        padding: 0;
        line-height: 1;
        width: 25.4rem;
        height: 5.4rem;
        border-radius: 12rem;
        border: 0.1rem solid rgba(255, 117, 8, 1);
        color: rgba(255, 117, 8, 1);
    }
</style>
<template>
    <header class="app-page-header addComment-header">
        <div>
            <page-header :page-title="'填写评价'"></page-header>
        </div>
    </header>
    <div class="app-content addComment-content bg-dark" v-height-ctrl="orderInfo">
        <div>
            <ul class="m-list">
                <li class="addComment-info-header">
                    <header class="text-white font_13">{{orderInfo.hotelName}}</header>
                    <span class="text-d-dark font_13">
                        {{orderInfo.beginTime | widgetDate '_plainDateStr' 'MM月dd日'}}入住
                        <i class="text-dark">|</i>
                        {{orderInfo.endTime | widgetDate '_plainDateStr' 'MM月dd日'}}退房
                        <i class="text-dark">|</i>
                        共{{orderInfo.beginTime | plainStrDateDiff orderInfo.endTime}}晚
                    </span>
                    <span class="text-d-dark font_13">{{orderInfo.roomTypeName}}</span>
                </li>
                <li class="addComment-info-content">
                    <header class="text-white font_13">发布评论</header>
                    <section class="bg-gray">
                        <textarea class="bg-transparent font_13" placeholder="写下您对酒店的体验" v-model="commentTxt"></textarea>
                    </section>
                </li>
                <li class="addComment-info-star">
                    <header class="text-white font_13">酒店评分（满意请给5星好评）</header>
                    <ul>
                        <li v-for="(index, scoreOption) in scoreList">
                            <div class="m-table">
                                <div>
                                    <span class="m-table-pre text-d-dark font_13">{{scoreOption.subjectName}}</span>
                                </div>
                                <div>
                                    <span class="m-table-full">
                                        <dl class="star btn-star btn-star_{{scoreOption.score}}">
                                            <dd v-for="idx in scoreOption.subjectGrade" @click="setScore(index,idx+1)"></dd>
                                        </dl>
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <button class="addComment-btn bg-transparent font_18" @click="submit()">提交评论</button>
                </li>
            </ul>
        </div>
    </div>
    <msg-box></msg-box>
</template>
<script>
    import pageHeader from '../components/pageHeader.vue';
    import msgBox from '../components/msgBox.vue';
    
    export default {
		data() {
			return {
                isSelfOrder: false,
                isScore: true,
                orderid: this.$route.params.orderid || null,
                orderInfo: {},
                token: '',
                commentTxt: '',
                scoreList:[],
                tips: {
                    defaultTip:'',
                    noOrderExist:'该订单不存在',
                    noPermission: '您没有该订单的评论权限',
                    scored: '该订单已评价',
                    token: '没有Token信息',
                    submit: '感谢您的评价<br/>枕头君期待与您再相会'
                }
            }
        },
        components: {
            pageHeader,
            msgBox
        },
        methods: {
            submit(){
                var vm=this;
                if(vm.tips.defaultTip) return alert(vm.tips.defaultTip);
                if(!vm.token) return alert(vm.tips.token);
                if(!vm.orderid) return alert(vm.tips.noOrderExist);
                if(!vm.isSelfOrder) return alert(vm.tips.noPermission);
                if(vm.isScore) return alert(vm.tips.scored);
                
                //拼接添加评论的入参信息
                var params={
                    orderId: vm.orderid,
                    token: vm.token,
                    comment: vm.commentTxt || '',
                    subjectGrade: JSON.stringify(vm.getSerlizeGradeList())
                };
                
                //添加评论
                var ld=loading();
                vm.setHotelComments(params, 
                    function(res){
                        ld.destroy();
                        vm.showMsgBox(function(className){
                            if('cancel-btn'==className){
                                if(history.length==1){
                                    vm.$route.router.go({path:'/index'});
                                }else{
                                    history.go(-1)
                                }
                            }
                        });
                    },function(res){
                        ld.destroy();
                        alert("调用接口失败，请刷新重试！");
                        //console.log(res);
                    }
                );
            },
            //获取添加评论需求的评分信息
            getSerlizeGradeList(){
                var vm=this,
                    res=[];
                if(!vm.scoreList || !vm.scoreList.length) return res;
                for(var i = 0, len = vm.scoreList.length; i < len; i++){
                    res.push({
                        subjectId: vm.scoreList[i].subjectId,
                        grade: vm.scoreList[i].score
                    });
                }
                return res;
            },
            //获取和设置订单信息
            setOrderInfo(){
                var vm=this,
                    args={
                        token: vm.token,
                        orderId: vm.orderid
                    },
                    ld=loading();
                services.orderDetail(args)
                    .then(function(res){
                        ld.destroy();
                        res=res.data || {};
                        vm.isSelfOrder=!!(res.success=='T');
                        if(vm.isSelfOrder){
                            vm.orderInfo=res;
                            vm.isScore=res.status==400?true:false;
                            vm.isScore && alert(vm.tips.scored);
                            return;
                        }
                        return alert(vm.tips.noOrderExist);
                    },function(res){
                        ld.destroy();
                        return alert(vm.tips.noPermission);
                    })
            },
            //查询系统的已有的酒店评分信息和评价标签
            getScoreSubject(){
                var vm=this,
                    ld=loading();
                services.getScoreSubject({})
                    .then(function(res){
                        res= res.data? res.data.list?res.data.list:[]:[];
                        vm.setDefaultScore(res, 5);
                        ld.destroy();
                    },function(){
                        alert("读取数据失败，请刷新重试！");
                    })
            },
            //用于拼接标签信息的score信息
            setDefaultScore(tabList, defaultScore){
                var vm = this;
                if(!tabList || !tabList.length) return vm.scoreList=[];
                for(var i = 0,len = tabList.length; i < len; i++){
                    tabList[i].score = defaultScore || 5;
                }
                vm.scoreList = tabList;
            },
            //设置 卫生状况/交通状况/性价比 评级
            setScore(idx, v){
                var vm = this;
                vm.scoreList[idx].score = vm.getScore(vm.scoreList[idx].score, v);
            },
            //分数设置逻辑
            getScore(curScore, targetScore){
                return targetScore;
                //return curScore==targetScore?0:targetScore;
            },
            //添加评论信息
            setHotelComments(args, fn, errFn){
                services.addComments(args)
                    .then(function(res){
                        if(fn)
                            fn(res);
                    },function(res){
                        if(errFn)
                            errFn(res);
                    })
            },
            //广播调取弹框信息
            showMsgBox(fn){
                var vm=this;
                vm.$broadcast('showMsgBox', vm.tips.submit, fn);
            }
        },
        ready(){
            var vm = this;
            if(!vm.orderid)  return alert(vm.tips.defaultTip=vm.tips.noOrderExist); 
            vm.getScoreSubject();
            vm.$root.getToken(function(token){
                 vm.token = token;
                 vm.setOrderInfo();
            });
            
            
        }
    };

</script>
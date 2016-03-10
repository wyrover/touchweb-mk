<style>
   
    
    /* calendar body */
    .calendar-content .calendar-body *{
        text-align: center;
    }
    .calendar-content .calendar-body section{
        width: 100%;
    }
    .calendar-content .calendar-body section div{
        float: left;
        width: 14.285714285714286%;
        margin-bottom:1.3rem;
    }
    .calendar-content .calendar-body section div span{
        display: block;
        width: 100%;
        height:5.9rem;
        line-height:5.9rem;
        text-align: center;
        color: #fff;
        font-size: 1.5rem;
    }
    .calendar-content .calendar-body section i{
        display: block;
        width: 0.01rem;
        height: 0.01rem;
        clear: both;
    }
    .calendar-content .calendar-body .disabled{
        color:rgba(255,255,255,0.3);
    }
    .calendar-content .calendar-body .start,
    .calendar-content .calendar-body .end{
        background-color: rgba(255,117,8,1);
    }
    .calendar-content .calendar-body .on{
        background-color: rgba(255,117,8,0.2);
    }
    
    
    .calendar-header{
        height: 16rem !important;
        line-height: normal !important;
        padding: 0 !important;
        margin:0 !important;
        width: 100%;
    }
     /* navigation */
    .calendar-header nav{
        padding: 2rem 0;
        border-radius: 0.8rem 0.8rem 0 0;
    }
    .calendar-header nav *,
    .calendar-header .calendar-title{
        text-align: center;
        font-style: normal;
        line-height: 1;
    }
    .calendar-header nav p{
        color: #fff;
        margin-top:0.6rem;
        font-size: 1.4rem;
    }
    .calendar-header nav div:not(:last-child){
        border-right: 0.1rem solid rgba(255,255,255,0.1);
    }
     .calendar-header nav .on{
         color:rgba(255, 117, 8, 1);
     }
     .calendar-header .calendar-title div,
     .calendar-content .calendar-body header{
         height: 4.4rem;
         line-height: 4.4rem;
     }
     .calendar-content .calendar-body header{
         font-size: 1.8rem;
     }
</style>
<template>
    <header class="app-page-header  calendar-header">
        <div>
            <page-header :page-title="'选择日期'" :page-right="'完成'" :right-fn="completeSelect"></page-header>
            <nav class="m-flex bg-cloudburst">
                <div>
                    <i class="font_11 text-dark">入住</i>
                    <p class="font_14" v-bind:class="{'on':orderDict.highLight.start}">{{orderDict.start}}</p>
                </div>
                <div>
                    <i class="font_11 text-dark">退房</i>
                    <p class="font_14" v-bind:class="{'on':orderDict.highLight.end}">{{orderDict.end}}</p>
                </div>
                <div>
                    <i class="font_11 text-dark">天数</i>
                    <p class="font_14">{{orderDict.days}}</p>
                </div>
            </nav>
            <div class="m-flex calendar-title bg-dark">
                <div v-for="workDay in dayList"  class="font_13 text-dark">{{workDay}}</div>
            </div>
        </div>
    </header>
    <div class="app-content calendar-content">
        <div class="calendar-body bg-dark">
            <div class="" v-for="list in dateList">
                <header class="text-dark">{{list.title}}</header>
                <section>
                    <div v-for="dateOption in list.dateDetail">
                        <span class="" v-bind:class="{'disabled':dateOption.disabled, 'start':dateOption.checkStateCode==2,'on':dateOption.checkStateCode==3,'end':dateOption.checkStateCode==4 }" @click="setClickDate(dateOption)">{{dateOption.day || '&nbsp;'}}</span>
                    </div>
                    <i></i>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
    var widgetDate = require('../libs/widget-date.js');
    import pageHeader from '../components/pageHeader.vue';
    
    export default {
		data() {
			return {
                orderDict:{start:'',end:'',days:'',highLight:{start:false,end:false}},
                curStartDate: '',
                curEndDate: '',
                curDate: new Date(),
                showCalendarCount: 2,
                showCalendarDays: 30,
                isInPeriod: false,
                curDateStr: '',
                dateList: [],
                dayList: widgetDate._dicts.workDayName.cn_1,
                queryParam: this.$route.query,
            }
        },
        components: {
            pageHeader
        },
        methods: {
            //完成按钮返回主页（传递参数开始时间和结束时间）
            completeSelect(){
                var vm=this,
                    data=vm.checkSelected();
                if(!data.status)
                    return alert(data.msg);
                vm.$route.router.go({path:'/index', query:data.data});
            },
            //验证时间
            checkSelected(){
                var vm=this,
                    res={status:false, msg:'', data:{}},
                    _start=vm.curStartDate,
                    _end=vm.curEndDate;
                if(!_start && !_end){
                    res.msg="请选择入住时间";
                }else if(_start && !_end){
                    res.msg="请选择退房时间";
                }else{
                   res.status=true;
                   res.data={
                        startdate: _start,
                        enddate: _end
                   }; 
                }
                return res;
            },
            //设置开始时间和结束时间
            setCurDate(startDate, endDate){
                var vm=this;
                //如果开始时间和结束时间都有值，那么页面的起始时间为入参的两个时间
                if(startDate && endDate){
                    vm.curStartDate=widgetDate._plainDate(startDate);
                    vm.curEndDate=widgetDate._plainDate(endDate);
                }else{
                    //当时间在 0点到6点之间，相当于今入明离的适配
                    var _curDate= new Date(vm.curDate);
                    if(vm.isInPeriod){
                        vm.curEndDate = new Date(vm.curDate);
                        vm.curStartDate = widgetDate._unixToDate(_curDate.setDate(_curDate.getDate() - 1));
                    }else{
                        vm.curStartDate = new Date(vm.curDate);
                        vm.curEndDate = widgetDate._unixToDate(_curDate.setDate(_curDate.getDate() + 1));
                    }
                } 
                vm.curStartDate=widgetDate._dateToStr(vm.curStartDate,'yyyyMMdd',true);
                vm.curEndDate=widgetDate._dateToStr(vm.curEndDate,'yyyyMMdd',true);
            },
            //设置用于显示的数据列表
            setDateList(){
                var vm=this,
                    dateDict={},
                    startDate=new Date(vm.curDate);
                if(vm.isInPeriod)
                    widgetDate._unixToDate(startDate.setDate(startDate.getDate() - 1));
                var startDateFirstDay=widgetDate._curMonth(startDate);
                for(var i=0; i<vm.showCalendarCount; i++){
                    if(i > 0){
                        startDateFirstDay = widgetDate._nextMonth(startDateFirstDay);
                    }
                    dateDict = {
                        firstDay: startDateFirstDay,
                        days: widgetDate._monthHaveDays(startDateFirstDay),
                        dateDay: startDateFirstDay.getDay(),
                        year: startDateFirstDay.getFullYear(),
                        month: startDateFirstDay.getMonth()+1,
                        title: '',
                        loopDays: 0,
                        dateDetail: []
                    };
                    dateDict.loopDays=(dateDict.days+((dateDict.dateDay>0 && dateDict.dateDay<7)?
                                        dateDict.dateDay:0))<=35?35:42;
                    dateDict.title=widgetDate._monthName(startDateFirstDay,'cn_1') + ' '+ dateDict.year;
                    dateDict.dateDetail=vm._getListDateDetail(dateDict);
                    vm.dateList.push(dateDict);
                    dateDict={};
                }
            },
            //时间的0点到6点的判断
            _checkTimePeriod(date){
                var dateHour=date.getHours();
                return (dateHour>0 && dateHour<=6);
            },
            //根据是否在0点到6点区间，获取当前可用时间字符串形式
            _getCurDateStr(date, _isInPeriod){
                if(_isInPeriod){
                    var _d=new Date(date);
                    return widgetDate._unixToStr(_d.setDate(_d.getDate() - 1), 'yyyyMMdd', true);
                }else{
                    return widgetDate._dateToStr(date, 'yyyyMMdd', true);
                }
            },
            //获取用于显示的时间的列表
            _getListDateDetail(dateObj){
                var vm=this,
                    dateResource=0,
                    resList=[],
                    resDict={},
                    diff=dateObj.dateDay;
                if(7==diff) diff=0;
                for(var i=0; i<dateObj.loopDays; i++){
                    if(i>=diff && dateResource<dateObj.days){
                        dateResource++;
                        resDict={
                            day: widgetDate._dateTwoNum(dateResource),
                            date: ''+dateObj.year+widgetDate._dateTwoNum(dateObj.month)+widgetDate._dateTwoNum(dateResource),
                            checkStateCode: 1, //checkStateCode => 1 normal 2 start  3 on  4 end 
                            disabled: false
                        };
                        if(resDict.date < vm.curDateStr || vm.showCalendarDays<=0){
                            resDict.disabled=true;
                        }else{
                            vm.showCalendarDays--;
                        }
                        
                    }
                    resList.push(resDict);
                    resDict={};
                }
                return resList;
            },
            //设置显示状态
            setDataCheckStateCode(){
                var vm=this;
                if(!vm.curStartDate) return;
                var stateCode=0;
                vm.dateList.forEach(function(dateOptionList, i){
                    dateOptionList.dateDetail.forEach(function(dateOption, j){
                        if(!dateOption.disabled && dateOption.date){
                            //checkStateCode => 1 normal 2 start  3 on  4 end 
                            if(dateOption.date == vm.curStartDate){
                                //开始时间
                                stateCode=2;
                            }else if(dateOption.date == vm.curEndDate){
                                //结束时间
                                stateCode=4;
                            }else if(vm.curStartDate && vm.curStartDate && dateOption.date>vm.curStartDate && dateOption.date<vm.curEndDate){
                                //开始/结束之间的
                                stateCode=3;
                            }else{
                                //正常状态
                                stateCode=1;
                            }
                            vm.dateList[i]['dateDetail'][j].checkStateCode=stateCode;
                        }  
                    })
                })
            },
            //点击设置日期
            setClickDate(obj){
                if(obj.disabled || (!obj.date && !obj.checkStateCode)) return;
                var vm=this;
                if(!vm.curEndDate && vm.curStartDate && vm.curStartDate < obj.date){
                    vm.curEndDate=obj.date;
                }else{
                    vm.curStartDate=obj.date;
                    vm.curEndDate='';
                }
                vm.setDataCheckStateCode();
                vm.setTopTip(true);
            },
            //设置顶部时间
            setTopTip(isHighlight){
                var vm=this;
                var startDate=null, endDate=null;
                vm.orderDict={start:'',end:'',days:'',highLight:{start:false,end:false}};
                if(vm.curEndDate || vm.curStartDate){
                    startDate=widgetDate._plainDate(vm.curStartDate);
                    if(isHighlight)
                        vm.orderDict.highLight.start=true;
                    if(vm.curEndDate){
                        endDate=widgetDate._plainDate(vm.curEndDate);
                        if(isHighlight){
                            vm.orderDict.highLight.start=false;
                            vm.orderDict.highLight.end=true;   
                        }
                    }
                }
                vm.orderDict.start=startDate?vm.getTopDateTip(startDate):'';
                vm.orderDict.end=endDate?vm.getTopDateTip(endDate):'';
                
                if(endDate)
                    vm.orderDict.days='共'+widgetDate._diff(startDate, endDate, 'd')+'晚';
            },
            //根据Date获取用于顶部显示的日期数据
            getTopDateTip(date){
                return widgetDate._dateToStr(date, 'MM月dd日 ', true) + widgetDate._workDayName(date,'cn_1');
            }
        },
        computed: {
            
        },
        created(){
            var vm=this;
            vm.isInPeriod=vm._checkTimePeriod(vm.curDate);
            vm.curDateStr=vm._getCurDateStr(vm.curDate, vm.isInPeriod);
            vm.setDateList();
        },
        ready(){
            window.scrollTo(0,0);
            var vm=this;
            this.setCurDate(vm.queryParam.starttime,vm.queryParam.endtime);
            this.setDataCheckStateCode();
            this.setTopTip();
            
            // console.log(JSON.stringify(vm.dateList));
            
        }
    };
        
</script>

<template>
    <div id="order" >
        <header class="app-page-header">
            <div>
                <page-header :page-title="'取消订单'"></page-header>
            </div>
        </header>
        <div class="app-content ord-cancel" v-height-ctrl="reasonItems">
            <p class="c-title text-dark  font-13 bg-cloudburst">选择取消原因</p>
            <div class="c-reason bg-dark">
                <ul class="reason-items text-white font-13">
                    <li @click="selItem(this,1)" :class="{on:reason_id == 1}">
                        <i class="text-dark font-10 text-center" :class="{'icon-home_icon_gou':reason_id == 1}"></i><span>到店无房</span>
                    </li>
                    <li @click="selItem(this,2)" :class="{on:reason_id == 2}">
                        <i class="text-dark font-10 text-center" :class="{'icon-home_icon_gou':reason_id == 2}"></i><span>酒店服务态度差</span>
                    </li>
                    <li @click="selItem(this,3)"  :class="{on:reason_id == 3}">
                        <i class="text-dark font-10 text-center" :class="{'icon-home_icon_gou':reason_id == 3}"></i><span>改变行程</span>
                    </li>
                    <li @click="selItem(this,4)" :class="{on:reason_id == 4}">
                        <i class="text-dark font-10 text-center" :class="{'icon-home_icon_gou':reason_id == 4}"></i><span>环境不满意</span>
                    </li>
                    <li @click="selItem(this,99)" :class="{on:reason_id == 99}" v-el:other>
                        <i class="text-dark font-10 text-center" :class="{'icon-home_icon_gou':reason_id == 99}"></i><span v-show="!other_reason">其他原因</span>
                        <div  contenteditable="true" v-show="other_reason"  @input="outInput()" v-el:reson-el>
                        </div>
                        <span  v-if="input_disabled" class="placeholder text-dark">请填写其他原因</span>
                    </li>
                </ul>
                <div class="c-tips margin text-dark font-13">
                    <span>温馨提示：</span>
                    <p>提交后如有退款，审核通过后会在1-7个工作日内返还到您的账户内，请注意查收。</p>
                </div>
                <a href="javascript:;" @click="submit()" class="cancel-btn text-center text-orange font-18">提交</a>
            </div>
        </div>
    </div>
</template>
<script>
    import pageHeader from '../../components/pageHeader.vue';
    export default {
        data() {
        return {
                reason_id:0,
                other_reason:false,
                input_disabled:false,
                reason:'',
                reasonItems:[]
            }
        },
        components: {
            pageHeader
        },
        methods: {
            selItem(ob,index){
                this.reason_id = index;
                this.toggle(index);
            },
            toggle(index,event){
                var vm = this;
                this.other_reason = index == 99;
                this.input_disabled = index == 99;
                if(index == 99){
                    vm.$els.resonEl.innerHTML = '';
                    var timer = setTimeout(function(){
                        vm.$els.resonEl.focus();
                        clearTimeout(timer);
                    },100);
                }else{
                    index = index > 4 ? 3 : index -1;
                    this.reason = vm.reasonItems[index];
                }
            },
            outInput(){
                var text = event.target.innerText,
                        len = text.length;
                if(len === 0){
                    this.input_disabled = true;
                }else{
                    this.input_disabled = false;
                    this.reason = text;
                }
            },
            submit(){
                var vm = this;
                if(!this.reason_id){
                    tip('请选择取消订单的原因');
                    return;
                }
                services.cancelOrder(this.getArgs()).then(function(resp){
                    var data = resp.data;
                    if(data.success === 'F'){
                        tip('取消订单失败');
                    }else{
                        tip('取消订单成功');
                        setTimeout(function(){
                            vm.$route.router.go('/myorder/all');
                        },1500);
                    }
                },function(){
                    return alert('取消失败');
                });
                //logEvt('e_order_cancel',{text:vm.reason});
                console.log('e_order_cancel:' + vm.reason);
            },
            getArgs(){
                return {
                    token:this.token,
                    orderId:this.$route.params.id,
                    cancelReasonCode:this.reason_id,
                    cancelReason:this.reason
                }
            }
        },
        computed:{
        },
        created() {
        },
        ready(){
            var vm = this;
            vm.reasonItems = ['到店无房','酒店服务态度差','改变行程','环境不满意'];
            this.$root.getToken(function(token){
                vm.token = token;
            });
            //logPV('m_order_cancel');
        }
    };
</script>
<style>
    #order   .ord-cancel .c-reason{
        position: relative;
        width: 100%;
        height: 100%;

    }
    #order .ord-cancel .c-title{
        padding: 1.3rem  1.3rem 0.6rem 1.3rem;
    }
    #order .ord-cancel .reason-items{
        padding: 0 1.3rem 0 1.3rem;
    }
    #order .ord-cancel ul{
        margin-bottom: 1.3rem;
        border-bottom: 0.1rem solid rgba(255, 255, 255, 0.1);
    }
    #order .ord-cancel li{
        min-height: 4.4rem;
        line-height: 4.4rem;
        border-bottom: 0.1rem solid  rgba(255, 255, 255, 0.1);
    }
    #order .ord-cancel li:last-child{
        border-bottom: none;
    }
    #order .reason-items li i{
        display: inline-block;
        width: 1.6rem;
        height:1.6rem;
        border-radius: 50%;
        border:0.1rem solid rgba(255, 255, 255, 0.3);
        margin-right:1.3rem;
        position: relative;
        vertical-align: middle;
    }
    #order .reason-items li.on i{
        border:0.1rem solid rgba(255, 117, 8, 1);
    }
    #order .ord-cancel .cancel-btn{
        display: block;
        text-decoration: none;
        height: 5.2rem;
        width: 30rem;
        line-height: 5.2rem;
        border-radius: 5rem;
        margin:2rem auto;
        border: 0.1rem solid rgba(255, 117, 8, 1)
    }
    #order .ord-cancel li .icon-home_icon_gou:before{
        line-height: 1.6rem;
        color: rgba(255, 117, 8, 1);
    }
    #order .ord-cancel .c-reason li.on div{
        width:88% ;
        display: inline-block;
        vertical-align: middle;
        border: 1px solid #eee;
        min-height: 2.5rem;
        line-height: 2.5rem;
        box-sizing: border-box;
        border: 0;
        position: relative;
        left:-0.5rem;
    }
    #order .ord-cancel .placeholder{
        position: absolute;
        pointer-events:none;
        left:4.2rem;
    }
    @media only screen and (max-width:320px){
        #order .ord-cancel .c-reason li.on div{
            width:83% ;
        }
    }
</style>

<template>
    <section class="login-model" v-show="showLogin">
        <div class="mask_layer"></div>
        <div class="mask-front">
            <div class="login-form clearfix ">
                <div class="login-container bg-midnight">
                    <h4 class="text-center text-white clearfix">手机验证</h4>
                    <div>
                        <ul class="tbox font_14">
                            <li><span class="text-dark">手机号</span></li>
                            <li>
                                <span>
                                    <input type="tel" class="bg-transparent text-white" placeholder="请输入手机号" v-model="phone" maxlength="13">
                                </span>
                            </li>
                        </ul>
                        <ul class="tbox font_14">
                            <li><span class="text-dark">验证码</span></li>
                            <li>
                                <span>
                                    <input type="tel" class="bg-transparent text-white" placeholder="请输入验证码" v-model="code" maxlength="6">
                                </span>
                            </li>
                            <li>
                                <a href="javascript:;" @click="getVerifyCode()"    v-bind:class="{'on': count>0}">{{getCodeText}}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="btn-group text-center">
                        <button class="btn cancle text-dark bg-transparent" @click="cancel()">取消</button>
                        <button class="btn ok text-orange bg-transparent" @click="login()" >确认</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    var util = require('../libs/util.js');
    export default {
        data() {
            return {
                getCodeText:'获取验证码',
                showLogin: false,
                enableLogin:true,
                phone: '',
                code: '',
                count:0
            }
        },
        methods: {
            login() {
                var vm = this;
                if(!vm.enableLogin)
                    return;
                if(util.checkNull(vm.phone))
                    return alert('请输入手机号！');
                if(!util.checkPhone(vm.phone))
                    return alert('手机号码格式不正确！');
                if(util.checkNull(vm.code))
                    return alert('请输入验证码！');

                var ld = loading();
                vm.enableLogin = false;
                var param = {
                    phone:vm.phone,
                    code:vm.code,
                    osType:(util.os.ua.match(/MicroMessenger/i) == 'MicroMessenger') ?3:5
                };
                console.log(param);
                services.login(param).then(function(resp){
                    resp = resp.data || {};
                    vm.enableLogin = true;
                    ld.destroy();
                    vm.cancel();
                    if(resp.success == 'F'){
                        return alert(resp.errmsg);
                    }
                    vm.setUserInfo(resp)
                    //vm.loginSuccess(res);
                },function(){
                    vm.enableLogin = true;
                    ld.destroy();
                });
            },
            getVerifyCode() {
                 var vm = this;
                 if(vm.count > 0){
                    return;     
                 }
                 if(util.checkNull(vm.phone))
                    return alert('请输入手机号！');
                if(!util.checkPhone(vm.phone))
                    return alert('手机号码格式不正确！');
                 var param = { phone: vm.phone, type:1};
                 services.getVerifyCode(param)
                     .then(function (res) {
                        res=res.data || {};
                        if("F"==res.success)
                            return alert(res.errmsg);
                        vm.startCountDown();
                     },function(res){
                         alert('发送验证码失败，请稍后重试！');
                     });
            },
            loginSuccess(data){
                this.$dispatch("loginSuccess",data);
                this.cancle();
            },
            loginFail(data){
                this.$dispatch("loginFail",{});
                this.cancle();
            },
            startCountDown(){
                var vm = this;
                vm.count = 61;
                vm.countDown();
            },
            countDown(){
                var vm = this;
                if (vm.count > 1) {
                    vm.count--;
                    vm.getCodeText = vm.count+'秒后可重发';
                    setTimeout(function () {
                        vm.countDown();
                    }, 1000);
                    
                } else {
                    vm.count--;
                    vm.getCodeText = "获取验证码";
                }
            },
            cancel() {
                this.phone ='';
                this.code ='';
                this.showLogin = false;
            },
            setUserInfo(data){
                data = data;
                var token = data.token || '',
                    unionId = data.unionId || '',
                    phone = data.phone;
                util.setStore('m28',token);
                util.setStore('m29',unionId);
                util.setStore('m31',phone);
            }
        },
        events:{
            popupLogin(callback){
                this.showLogin  = true;
               // logPV("m_userCenter_Login");
            }
        },
        ready() {
        }
	};

</script>

<style>
.login-model{
}
.login-model .mask_layer{
    background: #000;
    width: 100%;
    height:100%;
    position: fixed;
    opacity:0.5;
    top:0;
    left: 0;
    z-index: 100;
}

.login-model .mask-front{
    position: fixed;
    width: 100%;
    height:100%;
    top:0;
    left: 0;
    z-index: 101;
    display: table-cell;
}

.login-model .login-form{
    z-index: 999;
    position: absolute;
    top:50%;
    margin-top:-50%;
    width: 100%;
    left: 0;
}
.login-model .login-container{
    border-radius: 1.5rem;
    padding: 2rem;
}

.login-model .login-form>*{
    margin-left:2rem;
    margin-right:2rem;
}

.login-model h4{
    font-size: 1.8rem;
    color:#616161;
    font-weight: normal;
    margin-bottom: 0rem;
    line-height: 2rem;
    padding-bottom: 1rem !important;
}


.login-model .tbox {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0.9rem 0;
    display: table;
    width: 100%;
    height: 5.4rem;
    line-height: 5.4rem;
    box-sizing: border-box;
}
.login-model .tbox>* {
    height: 2.4rem;
    vertical-align: middle;
    font-size: 1.4rem;
    display: table-cell;
}
.login-model .tbox>:first-child>* {
    margin-right: 1rem;
    line-height: 2.4rem;
    white-space: pre;
    color: #616161;
    font-style: normal;
}
.login-model .tbox>:nth-of-type(2), 
.login-model .tbox>:nth-of-type(2)>* {
    width: 100%;
}
.login-model .tbox>:nth-of-type(3)>a {
    white-space: pre;
    font-style: normal;
    text-decoration: none;
    color: #ff7508;
}
.login-model .tbox>:nth-of-type(3)>a.on{
    color: #ddd;
}
.login-model .tbox input {
    border: none;
    width: 100%;
    height: 2.4rem;
}
@media screen and (max-width: 320px) {
    .login-model .tbox>:first-child>*{
        margin-right: 0.3rem;

    }
}

.login-model .btn{
    height: 4.8rem;
    line-height: 4.8rem;
    padding: 0;
    font-size: 1.6rem;
    text-align: center;
    width:12rem;
    border-radius: 3rem;
    margin:1.3rem 1rem 0 1rem;
    outline: none;
}
.login-model .btn.ok{
    border:1px solid  rgba(255, 117, 8, 1);
    margin-top: 1.5rem;
}
.login-model .btn.cancle{
    border:1px solid  rgba(255, 255, 255, 0.1);
    margin-bottom: 1rem;
}
.login-model .login-header {
    display: block;
    width: 8rem;
    height: 8rem;
    background-size: 100% auto;
    background-position: center 0;
    background-repeat: no-repeat;
    margin: auto;
    background-color: transparent;

}
.login-model h4,.login-model h5,.login-model button{
    margin: 0;
    padding: 0;
}
</style>

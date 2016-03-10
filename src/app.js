var Vue = require('vue');
var VueRouter = require('vue-router');
var filters = require('./filters.js');
var routerMap = require('./routers.js');
var services = require('./services/main.js');
var dialog = require('./libs/widget-myDialog.js');
var util = require('./libs/util.js');
var dirctive = require('./directives/common.js');
var log = require('./libs/widget-userBehavior.js');

require('./assets/styles/fonts.css');
require('./assets/styles/common.css');
require('./assets/styles/normalize.css');
require('./assets/styles/swiper.min.css');
require('./assets/styles/myDialog.css');
require('./assets/styles/animation.css');

Vue.use(VueRouter);


//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
dirctive.init(Vue);

//实例化VueRouter
var router = new VueRouter({
    hashbang: false,
    saveScrollPosition: true,
    transitionOnLoad: true
});

var root = Vue.extend({
    template: '<router-view></router-view>',
    data() {
        return {
            searchType: -1,
            keyword: '',
            area: {},
            price: { text: '价格不限', value: 9999 },
            orderBy: { text: '默认排序', value: "0" },
            range: { text: '附近3km', value: 3000 },
        };
    },
    computed: {
        city: {
            cache: false,
            get() {
                return this.selectCity.cityCode ? this.selectCity : this.userCity;
            }
        },
        userCity: {
            cache: false,
            get() {
                return util.getStore("mk-userCity");
            },
            set(v) {
                util.setStore("mk-userCity", v);
            }
        },
        selectCity: {
            cache: false,
            get() {
                return util.getStore("mk-selectCity");
            },
            set(v) {
                util.setStore("mk-selectCity", v);
            }
        },
        userLocation: {
            cache: false,
            get(){
               return util.getStore("mk-userLocation");
            },
            set(v){
                util.setStore("mk-userLocation",v);
            }
        },
        selectLocation: {
            cache: false,
            get(){
               return util.getStore("mk-selectLocation");
            },
            set(v){
                util.setStore("mk-selectLocation",v);
            }
        }
    },
    methods: {
        getToken(callback, failback) {
            var val = util.getStore('m28') || '';
            if (val) {
                callback(val);
            } else {
                failback && failback();
                this.callback = callback;
                this.failback = failback;
            }
        },
        showLogin(){
            this.$broadcast("popupLogin",);
        },
        resize(){
            this.$el.parentNode.style.minHeight = window.screen.height+'px';
        }
    },
    ready() {
        this.resize();
    }
});

window.services = services;
routerMap(router);


router.start(root, "#main");

// console.info(router);
//默认路由至404
router.redirect({
    '*': '/index'
});
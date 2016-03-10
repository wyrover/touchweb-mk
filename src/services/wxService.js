var config = require('../config.js');

module.exports = {
    init: function (Vue) {
        return {
            hotelSearch(data) { //酒店信息
                return Vue.http.post(config.otsHost + 'ots/search/list', data);
            },
            collectionStatus(data){ //酒店收藏状态
                return Vue.http.post(config.otsHost + 'ots/collection/state', data);
            },
            addCollection(data){    //添加酒店收藏
                return Vue.http.post(config.otsHost + 'ots/collection/add', data);
            },
            removeCollection(data){ //酒店取消收藏
                return Vue.http.post(config.otsHost + 'ots/collection/deletelist', data);
            },
            initOrder(data){ //初始化订单
                return Vue.http.get(config.otsHost + 'ots/order/', data);
            },
            createOrder(data){  //创建订单
                return Vue.http.post(config.otsHost + 'ots/order/', data);
            },
            getScoreSubject(data){  //查询系统的已有的酒店评分信息和评价标签
                return Vue.http.get(config.otsHost + 'ots/score/scoresubjectlist', data);
            },
            orderDetail(data) { //订单详情
                return Vue.http.get(config.otsHost + 'ots/order/detail', data);
            },
            addComments(data){ //添加酒店评价
                return Vue.http.post(config.otsHost + 'ots/score/scoreadd', data);
            },
            hotelCommentsCount(data) { //获取评价的数量统计信息
                return Vue.http.get(config.otsHost + 'ots/score/scoregradetype', data);
            },
            hotelComments(data) { //酒店的评价详情信息
                return Vue.http.get(config.otsHost + 'ots/score/scorelist', data);
            },
            delOrder(data) { //删除订单
                return Vue.http.post(config.otsHost + 'ots/order/hidden', data);
            },
            cancelOrder(data) { //取消订单
                return Vue.http.post(config.otsHost + 'ots/order/cancel', data);
            },
            modifyUser(data) { //修改入住人
                return Vue.http.post(config.otsHost + 'ots/order/contacts', data);
            },
            cityList() {
                return Vue.http.get(config.otsHost + 'ots/search/citylists', {});
            },
            collectionsList(data){ //获取收藏的酒店列表
                return Vue.http.post(config.otsHost + 'ots/collection/querylist', data);
            },
            searchCityList(data) {
                return Vue.http.get(config.otsHost + 'ots/search/city', data);
            }
        }
    }
};
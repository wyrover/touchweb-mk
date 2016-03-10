module.exports = function(router) {
    router.transitionOnLoad = true;
    router.map({
        '/index': { //查询首页
            component: require('./views/index.vue')
        },
        '/calendar': { //日历页面
            component: require('./views/calendar.vue')
        },
        '/detail': { //详情页面
            component: require('./views/detail.vue')
        },
        '/order': { //确认订单页
            component: require('./views/order/order.vue')
        },
        '/orderdetail/:id': { //订单详情页
            component: require('./views/order/orderdetail.vue')
        },
        '/addcomments/:orderid': { //添加评价
            component: require('./views/addComments.vue')
        },
        '/comments/:hotelid': { //酒店评价列表
            component: require('./views/comments.vue')
        },
        '/cancel/:id': {
            component: require('./views/order/cancel.vue')
        },
        '/facility/:hotelid': { //酒店详情（设施，服务，交通等信息）
            component: require('./views/facility.vue')
        },
        '/city': { //查询首页
            component: require('./views/city.vue')
        },
        '/me': { //个人中心
            component: require('./views/me.vue')
        },
        '/about': { //个人中心
            component: require('./views/about.vue')
        },
        '/collection': { //酒店收藏
            component: require('./views/collection.vue')
        }
    });
}
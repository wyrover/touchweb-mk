<style>
    .load-more div[data-role='widget-loadingMore'] {
        padding: 0.5rem 0;
        color: #848484;
        font-size: 1.2rem;
    }
    .load-more{
        text-align: center;
    }
    .load-more .btnLoadNext{
        font-size: 1.5rem;
        color: #848484;
    }
    .load-more .widget-ico-loading {
        display: inline-block;
        width: 2.4rem;
        height: 2.4rem;
        margin: -0.7rem 0;
        background: url(../assets/images/loading.png) no-repeat center center;
        -webkit-background-size: 100%;
    }
    .load-more>*{
        line-height: 5rem;
    }
</style>
<template>
    <div class="load-more">
        <div v-show="isLoading" class="loadingMore" data-role="widget-loadingMore">
            <i class="widget-ico-loading circle"></i> 加载中…
        </div>
        <div v-show="!isLoadAll && !isLoading" class="btnLoadNext">
            加载更多
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: {
            isLoading: {
                default: false
            },
            isLoadAll: {
                default: false
            }
        }
	};

</script>
<style>
	.nav-back{
		position: absolute;
		left:1.3rem;
		height: 4.4rem;
		line-height: 4.4rem;
	}
</style>
<template>
   <span class="icon-ddxq_btn_back nav-back"></span>
</template>

<script>
	export default {
		data() {
			return {};
		},
        methods:{
            back(){
                history.go(-1);
            }
        }
	};
</script>

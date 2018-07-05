<template>
	<div class="tpl html" style="background-color:lightgreen;">
		{{msg}}
    <!-- <router-view /> -->
	</div>
</template>
<script>
	export default {
	  name: 'HtmlTpl',
    // props:['id'], //此处是通过路由props:true传过来的
    data (){
      return {
        msg: '这个是HTML模板组件1'
      }
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      // console.log(to,from)
      next();
    },
    beforeCreate(){
      // console.log('触发：创建之前')
    },
    mounted(){
      console.log(`${this.$options.name} 被渲染了`)
      // console.log(this.$route.params.id)
      // console.log(this.id)//使用路由的props属性传值完全解耦，能尽量不用this.$route就不用
      /*console.log(this.$route)
      console.log(this.$route.meta.aa)*/
    },
    destroyed(){
      console.log(`${this.$options.name} 被销毁了`)
    }
	}
</script>
<style scoped></style>
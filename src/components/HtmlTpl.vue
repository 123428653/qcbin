<template>
	<div class="html">
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
<style scoped>
	.html{background-color:lightgreen;height:100%;}
</style>
<template>
	<div class="tpl WebpackTpl" style="background-color:lightblue;">
		这个是Webpack模板组件
	</div>
</template>
<script>
	export default {
	  name: 'WebpackTpl',
    created(){
      this.$store.commit('nowStatus','end')
      setTimeout(()=>{
        this.$store.commit('nowStatus','hide')
      },800)
    },
    beforeCreate(){
      this.$store.commit('nowStatus','loading')
    },
    mounted(){
      setTimeout(()=>{
        this.$store.commit('nowStatus','normal')
      },1000)
    },
	}
</script>
<style scoped></style>
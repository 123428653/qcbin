<template>
	<div class="tpl JsTpl" style="background-color:hotpink;">
		这个是Js模板组件
	</div>
</template>
<script>
	export default {
	  name: "JsTpl",
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
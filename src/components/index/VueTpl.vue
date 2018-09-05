<template>
	<div class="tpl VueTpl" style="background-color:yellow;">
		这个是Vue模板组件
	</div>
</template>
<script>
	export default {
	  name: 'VueTpl',
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
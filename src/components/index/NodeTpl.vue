<template>
	<div class="tpl NodeTpl" style="background-color:lightgreen;">
		这个是Node模板组件
	</div>
</template>
<script>
	export default {
	  name: 'NodeTpl',
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
<template>
	<div class="tpl cssTpl" style="background-color:pink;">
		<div>
      {{msg}}
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
      <p>88</p>
    </div>
	</div>
</template>
<script>
  import bus from '../../common/bus';
	export default {
	  name: 'CssTpl',
    methods: {},
    data (){
      return {
        msg:'这个是CSS模板组件',
        success:'css模板加载成功了'
      }
    },
    created(){
      // console.log('created')
    },
    beforeCreate(){
      // console.log('beforeCreate')
    },
    mounted(){
      // console.log(this.currentTab)
      /*bus.$on('cssmodel',o => {
        console.log(o.aa)
      })*/
    },
    destroyed(){
      // console.log('Css被销毁了')
    }
	}
</script>
<style scoped></style>
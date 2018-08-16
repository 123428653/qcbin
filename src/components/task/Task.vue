<template>
  <div class="task">
    <div class="avatar"><img :src="avatar()" width="80" alt="Qin"></div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'Task',
    data(){
      return {
        avatar: () => require('../../assets/qin.jpg')
      }
    }
  };
</script>
<style lang="less" scoped>
  .task{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    transition: transform .4s;
  }
  .avatar{
    position:absolute;
    top:50%;
    left:50%;
    margin-top:-25px;
    transform:translate(-50%,-50%);
    width:80px;
    height:80px;
    border-radius:50%;
    overflow: hidden;
  }
</style>
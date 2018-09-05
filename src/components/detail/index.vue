<template>
  <div class="detail">
    <header class="detail-head">
      <div class="avatars"><img src="../../assets/qin.jpg" alt=""></div>
      <div class="info">
        <h3>Qin---{{item}}  </h3>
        <div>
          <p>{{day}}天 , {{hr}} : {{min}} : {{sec}}</p>
          <time>2018年08月29日</time>
          <span>阅读 789</span>
        </div>
      </div>
    </header>
    <h1>Vue.js异步更新及nextTick</h1>
    <div class="main">
      <h2>写在前面</h2>
      <p>前段时间在写项目时对nextTick的使用有一些疑惑。在查阅各种资料之后，在这里总结一下Vue.js异步更新的策略以及nextTick的用途和原理。如有总结错误的地方，欢迎指出！</p>
      <ol>
        <li>为什么Vue.js要异步更新视图？</li>
        <li>JavaScript异步运行的机制是怎样的？</li>
        <li>什么情况下要使用nextTick？</li>
      </ol>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapMutations, mapState, mapGetters, mapActions} from 'vuex'
  export default {
    name: 'Detail',
    data(){
      return {
        list:[],
        day: 0,
        hr: 0,
        min: 0,
        sec: 0,
        timer: null,
      }
    },
    computed:{
      ...mapState({
        item: state => state.AppLoading.item
      })
    },
    mounted(){
      this.countdown();
    },
    methods:{
      countdown: function () {
        // 倒计时
        const end = Date.parse(new Date('2018-09-05 16:03:00'))
        const now = Date.parse(new Date())
        const msec = end - now
        if(msec <= 0){
          clearTimeout(this.timer)
          this.day = 0
          this.hr = '00'
          this.min = '00'
          this.sec = '00'
          return;
        }
        let day = parseInt(msec / 1000 / 60 / 60 / 24)
        let hr = parseInt(msec / 1000 / 60 / 60 % 24)
        let min = parseInt(msec / 1000 / 60 % 60)
        let sec = parseInt(msec / 1000 % 60)
        this.day = day
        this.hr = hr > 9 ? hr : '0' + hr
        this.min = min > 9 ? min : '0' + min
        this.sec = sec > 9 ? sec : '0' + sec
        this.timer=setTimeout(() => {
          this.countdown()
        }, 1000)
      }
    },
    watch:{
      item(newVal, oldVal){
        console.log(newVal)

      }
    }
  };
</script>
<style lang="scss" scoped>
  h1{font-size:24px;}
  h2{font-size:20px;}
  .detail{
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom: 0;
    transition: transform .4s;
    padding: 10px 20px 50px 20px;
  }
  .avatars{
    width: 60px;
    height:60px;
    img{
      width:100%;
    }
  }
</style>
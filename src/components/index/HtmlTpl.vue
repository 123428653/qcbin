<template>
	<div @scroll="scrollBottom" ref="scrollBox">
    <div class="scroll-box">
      <swiper :list="bannerList" auto @on-index-change="demo01_onIndexChange"></swiper>
      <marquee class="marquee">
        <marquee-item>炫酷H5中序列图片视频化播放的高性能实现</marquee-item>
        <marquee-item>微信网页悬浮窗交互效果的web实现</marquee-item>
        <marquee-item>JS实现照片图片变成黑白线条线稿</marquee-item>
        <marquee-item>纯CSS实现蜡烛、火焰以及熄灭后烟雾效果</marquee-item>
      </marquee>
      <panel :list="htmlList" type="1"></panel>
      <load-more tip="正在加载"></load-more>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {Swiper,Marquee,MarqueeItem,Panel,LoadMore,LoadingPlugin} from 'vux';
  import axios from 'axios';
  
  Vue.use(LoadingPlugin)
  // Banner数据
  const bannerList = [{
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg', // 404
    title: '送你一次旅行'
  }];

	export default {
    components: {
      Swiper,
      Marquee,
      MarqueeItem,
      Panel,
      LoadMore,
      LoadingPlugin
    },
	  name: 'HtmlTpl',
    // props:['id'], //此处是通过路由props:true传过来的
    data (){
      return {
        bannerList,
        onFetching: false,
        scrollDom: null,
        page: 1,
        htmlList: []
      }
    },
    methods:{
      demo01_onIndexChange(index){
        // this.demo01_index = index;
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          this.send();
        }
      },
      scrollBottom(){
        var b =this.scrollDom.children[0].offsetHeight - (this.scrollDom.scrollTop + this.scrollDom.offsetHeight);
        // console.log(b)
        if(b < 50 && !this.onFetching){
          this.onFetching = true
          this.send();
        }
      },
      send(){
        var _this = this;
        axios.post('http://imoocnote.calfnote.com/inter/getClasses.php?curPage='+this.page)
        .then(response => {
          if(response.status == 200){
            var newArr=response.data.data.map((el, index) => {
              this.htmlList.push({
                src: el.image,
                title: el.title,
                desc: el.subtitle
              })
            })
            // _this.htmlList.push(newArr);
            this.page ++;

            // _this.$nextTick(() => {
              this.scrollDom = _this.$refs.scrollBox;
            // })
            this.onFetching = false
            this.$vux.loading.hide();
          }
        });
      }
    },
    beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      // console.log(to,from)
      // next();
    },
    beforeCreate(){
      // console.log('触发：创建之前')
    },
    mounted(){
      // console.log(`${this.$options.name} 被渲染了`)
      this.$vux.loading.show({
       text: 'Loading'
      })
      this.send();
      // console.log(this.$route.params.id)
      // console.log(this.id)//使用路由的props属性传值完全解耦，能尽量不用this.$route就不用
      /*console.log(this.$route)
      console.log(this.$route.meta.aa)*/
    },
    destroyed(){
      // console.log(`${this.$options.name} 被销毁了`)
    }
	}
</script>
<style scoped>
  .loading{padding:10px;text-align:center;}
  .list{
    li{
      margin-bottom:20px;
    }
    .img{
      width:130px;
      float:left;
      margin-right:10px;
      img{width:100%}
    }
  }
</style>
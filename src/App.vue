<template>
  <div id="app">
    <view-box>
      <x-header
        class="header"
        slot="header"
        :left-options='{showBack:false}'
      >
        <div>Qin Blog</div>
      </x-header>
      <!-- <div style="position:relative;height:100%;">
        <div class="avatar"><img src="./assets/qin.jpg" width="80" alt="Qin"></div>
      </div> -->
      <!-- <scroller :lock-y="true"> -->
        <div class="tab">
          <tab>
            <tab-item 
            :selected="tabActive === navItem.link" 
            :key="index"
            v-for="(navItem, index) in navData" 
            >
            <router-link :to="navItem.link">{{navItem.name}}</router-link>
          </tab-item>
          </tab> 
        </div>
      <!-- </scroller> -->
      <swiper :list="demo01_list" auto v-model="demo01_index" @on-index-change="demo01_onIndexChange"></swiper>
      <marquee class="marquee">
        <marquee-item>炫酷H5中序列图片视频化播放的高性能实现</marquee-item>
        <marquee-item>微信网页悬浮窗交互效果的web实现</marquee-item>
        <marquee-item>JS实现照片图片变成黑白线条线稿</marquee-item>
        <marquee-item>纯CSS实现蜡烛、火焰以及熄灭后烟雾效果</marquee-item>
      </marquee>
        <div class="content">
          <transition :name="transformName">
            <router-view />
          </transition>
        </div>
        <!-- <router-view name="webpack" /> -->
      <!-- <panel
        :list="panelList"
      >
      </panel> -->
      <tabbar slot="bottom">
        <tabbar-item>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item>
          <span slot="label">发现</span>
        </tabbar-item>
        <tabbar-item>
          <span slot="label">笔记</span>
        </tabbar-item>
        <tabbar-item>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>

    
  </div>
</template>

<script>
import {ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem,Scroller,Swiper,Panel,Marquee,MarqueeItem} from 'vux';
// Banner数据
const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://static.vux.li/demo/5.jpg', // 404
  title: '送你一次旅行',
  fallbackImg: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg'
}];

// 列表数据
const panelList=[];
for(var i=0; i<10; i++){
  panelList.push({
    src: 'http://somedomain.somdomain/x.jpg',
    fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
    title: '标题一',
    desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
    url: '/component/cell'
  })
}
// 顶部导航数据
const navData = [
  {
    name: "HTML",
    link: '/',
    tplName: 'HtmlTpl'
  },
  {
    name: "CSS",
    link: '/css',
    tplName: 'CssTpl'
  },
  {
    name: "JS",
    link: '/js',
    tplName: 'JsTpl'
  },
  {
    name: "Vue",
    link: '/vue',
    tplName: 'VueTpl'
  },
  {
    name: "Webpack",
    link: '/webpack',
    tplName: 'WebpackTpl'
  },
  {
    name: "Node",
    link: '/node',
    tplName: 'NodeTpl'
  }
]


export default {
  name: 'App',
  props: ['id'],
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Tab,
    TabItem,
    Scroller,
    Swiper,
    Marquee,
    MarqueeItem,
    Panel
  },
  methods:{
    demo01_onIndexChange (index) {
      this.demo01_index = index
    }
  },
  watch: {
    '$route' (to, from){
      console.log('to：'+to.meta.activeNumber)
      console.log('from：'+from.meta.activeNumber)
      this.tabActive=to.path
      if(from.name){
        this.transformName = from.meta.activeNumber > to.meta.activeNumber ? 'slide-right' : 'slide-left';
      }
    }
  },
  data(){
    return {
      transformName: 'slide-right',
      navData: navData,
      tabActive: this.$route.fullPath,
      demo01_index: 2,
      demo01_list: baseList
      // panelList:panelList
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

html,body{
  margin:0;
  width:100%;
  height:100%;
  overflow-x:hidden;
  font-size:100%;
}
#app {
  height: 100%;
  .header{
    position:absolute;
    left:0;
    right: 0;
    z-index:9;
  }
  .tab{
    margin-top:46px;
    a{
      display:block;
    }
  }
  .marquee{
    margin:6px 0;
    font-size:13px;
  }
  .marquee ul{
    padding-left:10px;
  }
}
img{
  vertical-align:middle;
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
.content{
  height:380px;
  position: relative;
  overflow: hidden;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}






.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.tpl {
    position: absolute;
    // z-index: 999;
    // top: 0;
    // right: 0;
    // bottom: 0;
    // left: 0;
    width:100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-transition: -webkit-transform .4s cubic-bezier(.55,0,.1,1);
    transition: -webkit-transform .4s cubic-bezier(.55,0,.1,1);
    transition: transform .4s cubic-bezier(.55,0,.1,1);
    transition: transform .4s cubic-bezier(.55,0,.1,1),-webkit-transform .4s cubic-bezier(.55,0,.1,1);
    will-change: transform;
    background: #fff;
    color: #3c3c3c;
    -webkit-overflow-scrolling: touch
}
.tpl.slide-left-enter{
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
}

.tpl.slide-right-enter{
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
}

.tpl.slide-right-leave-active{
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
}

.tpl.slide-left-leave-active{
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
}
</style>

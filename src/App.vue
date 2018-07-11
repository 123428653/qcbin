<template>
  <div id="app">
    <view-box>
      <div class="top" slot="header">
        <x-header
          class="header"
          :left-options='{showBack:false}'
        >
          <div>Qin Blog</div>
        </x-header>
        <div class="tab">
          <tab v-model="currentTab" prevent-default @on-before-index-change="switchTabItem">
            <tab-item 
            :key="index"
            v-for="(navItem, index) in navData" 
            >
            {{navItem.name}}
            <!-- <router-link :to="navItem.link">{{navItem.name}}</router-link> -->
          </tab-item>
          </tab> 
        </div>
      </div>
      
      <!-- <div style="position:relative;height:100%;">
        <div class="avatar"><img src="./assets/qin.jpg" width="80" alt="Qin"></div>
      </div> -->
      
      <bodys :current-tab="currentTab"></bodys>
        <!-- <div class="content">
          <transition :name="transformName">
            <router-view />
          </transition>
        </div> -->
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
import {ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem} from 'vux';
import Bodys from './components/Bodys';
import bus from './common/bus';



// 顶部导航数据
const navData = [
  {
    name: "HTML",
    link: '/',
    tplName: 'HtmlTpl',
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
    Bodys,
  },
  methods:{
    tabHandler (index) {
      // this.currentTab = index;
    },
    switchTabItem(index){
      // console.log('on-before-index-change', index)
        this.currentTab = index
        // console.log(this)
      if(index == 1){
        bus.$emit('cssmodel',{
          aa:index
        })
      }
      /*setTimeout(() => {
        console.log(this)
        this.currentTab = index
      }, 600)*/
    }
  },
  watch: {
    /*'$route' (to, from){
      console.log('to：'+to.meta.activeNumber)
      console.log('from：'+from.meta.activeNumber)
      this.tabActive=to.path
      if(from.name){
        this.transformName = from.meta.activeNumber > to.meta.activeNumber ? 'slide-right' : 'slide-left';
      }
    }*/
  },
  data(){
    return {
      // transformName: 'slide-right',
      navData: navData,
      // tabActive: this.$route.fullPath,
      currentTab: 0,
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
  .weui-tab__panel{padding-top:90px;}
  .top{
    position:absolute;
    left:0;
    right: 0;
    z-index:9;
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

.slide-left-enter{
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
}

.slide-right-enter{
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
}

.slide-right-leave-active{
    -webkit-transform: translate3d(100%,0,0);
    transform: translate3d(100%,0,0)
}

.slide-left-leave-active{
    -webkit-transform: translate3d(-100%,0,0);
    transform: translate3d(-100%,0,0)
}
</style>

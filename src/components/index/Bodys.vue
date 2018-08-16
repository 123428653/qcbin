<template>
  <div class="bodysWrap">
    <view-box>
      <div class="top" slot="header">
        <x-header
          class="header"
          :left-options='{showBack:false}'
        >
          <div>Qin Blog</div>
        </x-header>
        <div class="tab scroll-box-x">
          <ul>
            <li
            :class="{active: index == currentTab}" 
            :key="index" 
            v-for="(navItem, index) in navData"
            @click="switchTabItem(index)"
            >
              <span>{{navItem.name}}</span>
            </li>
          </ul>
          <!-- <tab v-model="currentTab" prevent-default @on-before-index-change="switchTabItem">
            <tab-item 
            :key="index"
            v-for="(navItem, index) in navData" 
            >
            {{navItem.name}}
          </tab-item> -->
          </tab> 
        </div>
      </div>
      <div class="content">
        <transition :name="transitionName">
          
            <div class="bodys" v-show="currentTab == 0">
              <html-tpl />
            </div>
          
        </transition>
        <transition :name="transitionName">
          <div class="bodys" v-show="currentTab == 1">
            <css-tpl v-if="csst" />
          </div>
        </transition>
        <transition :name="transitionName">
          <div class="bodys" v-show="currentTab == 2">
            <js-tpl v-if="jst" />
          </div>
        </transition>
        <transition :name="transitionName">
          <div class="bodys" v-show="currentTab == 3">
            <vue-tpl v-if="vuet" />
          </div>
        </transition>
        <transition :name="transitionName">
          <div class="bodys" v-show="currentTab == 4">
            <webpack-tpl v-if="webpackt" />
          </div>
        </transition>
        <transition :name="transitionName">
          <div class="bodys" v-show="currentTab == 5">
            <node-tpl v-if="nodet" />
          </div>
        </transition>
      </div>
    </view-box>
  </div>
</template>
<script type="text/javascript">
import {ViewBox,XHeader,Tabbar,TabbarItem,Tab,TabItem} from 'vux'
import VueDB from '../../utils/vue-db'

let DB = new VueDB()
// import {Swiper,Marquee,MarqueeItem,Panel} from 'vux';
/*import HtmlTpl from './HtmlTpl';
import CssTpl from './CssTpl';
import JsTpl from './JsTpl';
import VueTpl from './VueTpl';
import WebpackTpl from './WebpackTpl';
import NodeTpl from './NodeTpl';*/
// console.log(axios)
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
    components: {
      ViewBox,
      XHeader,
      Tabbar,
      TabbarItem,
      Tab,
      TabItem,
      HtmlTpl: () => import('./HtmlTpl'),
      CssTpl: () => import('./CssTpl'),
      JsTpl: () => import('./JsTpl'),
      VueTpl: () => import('./VueTpl'),
      WebpackTpl: () => import('./WebpackTpl'),
      NodeTpl: () => import('./NodeTpl')
    },
    methods: {
      switchTabItem(index){
        // console.log('on-before-index-change', index)
          this.currentTab = index
          // console.log(this.currentTab)
        /*if(index == 1){
          bus.$emit('cssmodel',{
            aa:index
          })
        }*/
        /*setTimeout(() => {
          console.log(this)
          this.currentTab = index
        }, 600)*/
      }
    },
    watch:{
      'currentTab'(newTab,oldTab){
        // console.log(oldTab)
        this.transitionName = newTab > oldTab ? 'slide-left' : 'slide-right';
        if(newTab == 1){
          this.csst = true;
        }
        if(newTab == 2){
          this.jst = true;
        }
        if(newTab == 3){
          this.vuet = true;
        }
        if(newTab == 4){
          this.webpackt = true;
        }
        if(newTab == 5){
          this.nodet = true;
        }
      }
    },
    mounted(){
      this.currentTab = DB.getItemOnce('body-currentTab').toNumber() || 0;
    },
    beforeRouteLeave (to, from, next) {
      DB.setItem('body-currentTab', this.currentTab)
      next();
    },
    data (){
      return {
        navData: navData,
        currentTab: 0,
        transitionName:'',
        csst:false,
        jst: false,
        vuet: false,
        webpackt: false,
        nodet: false
      }
    }
  };
</script>
<style lang="scss">
  .bodysWrap{position: relative;transition:all 0.4s cubic-bezier(.55,0,.1,1);height:100%}
  .weui-tab__panel{padding-top:90px;}
  .top{
    position:absolute;
    left:0;
    right: 0;
    top:0;
    z-index:3;
  }
  .tab ul{
    width:auto;
    white-space:nowrap;
    height:44px;
    display: -webkit-box;
    display: -ms-flexbox;
    display:flex;
    box-sizing: content-box;
    padding-bottom:17px;
  }
  .tab ul li{
    display:block;
    // width:100%;
    height:100%;
    line-height:44px;
    -webkit-box-flex:0;
    flex:0 0 22%;
    text-align:center;
    color:#666;
    font-size:14px;
    box-sizing: border-box;
  }
  .tab ul li.active{
    color:#04BE02;
    border-bottom:3px solid #04BE02;
  }
  .marquee{
    margin:6px 0;
    font-size:13px;
  }
  .marquee ul{
    padding-left:10px;
  }

  .content{
    height:100%;
    position: relative;
    overflow: hidden;
    box-sizing:border-box;
    .weui-panel{
      margin-top:0;
    }
  }
  
  .content .weui-media-box_appmsg .weui-media-box__hd{
    width:100px;
    min-width:100px;
    height:auto;
    line-height:normal;
  }
  .bodys{
    position: absolute;
    z-index: 3;
    top: 0;
    right: 0;
    bottom: 0;
    width:100%;
    background: #fff;
    color: #3c3c3c;
    -webkit-overflow-scrolling: touch;
    transition:all 0.4s cubic-bezier(.55,0,.1,1);
    > div{
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width:100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
</style>
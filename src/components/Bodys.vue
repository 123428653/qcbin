<template>
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
</template>
<script type="text/javascript">
// import {Swiper,Marquee,MarqueeItem,Panel} from 'vux';
/*import HtmlTpl from './HtmlTpl';
import CssTpl from './CssTpl';
import JsTpl from './JsTpl';
import VueTpl from './VueTpl';
import WebpackTpl from './WebpackTpl';
import NodeTpl from './NodeTpl';*/
// console.log(axios)

  
  export default {
    props: ['currentTab'],
    components: {
      HtmlTpl: () => import('./HtmlTpl'),
      CssTpl: () => import('./CssTpl'),
      JsTpl: () => import('./JsTpl'),
      VueTpl: () => import('./VueTpl'),
      WebpackTpl: () => import('./WebpackTpl'),
      NodeTpl: () => import('./NodeTpl')
    },
    methods: {
    },
    watch:{
      'currentTab'(newTab,oldTab){
        // console.log(newTab)
        // console.log(newTab,oldTab)
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
        // console.log(this.currentTab)
      }
    },
    mounted(){
      // console.log(this.currentTab);
    },
    data (){
      return {
        transitionName:'slide-left',
        csst:false,
        jst: false,
        vuet: false,
        webpackt: false,
        nodet: false
      }
    }
  };
</script>
<style lang="less">

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
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    width:100%;
    -webkit-transition: -webkit-transform .4s cubic-bezier(.55,0,.1,1);
    transition: -webkit-transform .4s cubic-bezier(.55,0,.1,1);
    transition: transform .4s cubic-bezier(.55,0,.1,1);
    transition: transform .4s cubic-bezier(.55,0,.1,1),-webkit-transform .4s cubic-bezier(.55,0,.1,1);
    will-change: transform;
    background: #fff;
    color: #3c3c3c;
    -webkit-overflow-scrolling: touch;
    > div{
      position: absolute;
      z-index: 999;
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
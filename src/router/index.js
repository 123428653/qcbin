import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HtmlTpl from '@/components/HtmlTpl'
import CssTpl from '@/components/CssTpl'
import JsTpl from '@/components/JsTpl'
import VueTpl from '@/components/VueTpl'
import WebpackTpl from '@/components/WebpackTpl'
import NodeTpl from '@/components/NodeTpl'

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/',
      name: 'HtmlTpl',
      component: HtmlTpl
    },
    {
      path: '/css',
      name: 'CssTpl',
      component: CssTpl
    },
    {
      path: '/js',
      name: 'JsTpl',
      component: JsTpl
    },
    {
      path: '/vue',
      name: 'VueTpl',
      component: VueTpl
    },
    {
      path: '/webpack',
      name: 'WebpackTpl',
      component: WebpackTpl
    },
    {
      path: '/node',
      name: 'NodeTpl',
      component: NodeTpl
    }
  ]
})

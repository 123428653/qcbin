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

const routes = [
    {
      path: '/',
      redirect:'/html'
    },
    {
      // path: '/html/:id',
      // props: true,  //很重要，在HtmlTpl组件内可以通过props直接能获取path路径的id值
      // props:(route) => ({id: route.query.page}),//推荐用props来传递值
      path: '/html',
      name: 'HtmlTpl',
      component: HtmlTpl,
      // components: { //有名的路由模板
      //   default: HtmlTpl,
      //   webpack: WebpackTpl
      // },
      meta: {
        title:'this is html',
        description:'Qin Chao Bin',
        aa: 'KKKKK'
      },
      // 子路由
      /*children: [
        {
          path: 'vue',
          component:VueTpl
        }
      ]*/
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
  ];

export default new Router({
  routes,
  mode: 'history',//清除URL上的#
  base: '/base/',//在所有router链接路径前添加一个相对的名称
  linkActiveClass:'active',//修改默认的选中class名称
  linkExactActiveClass:'exact-active',//修改默认的选中class名称
  scrollBehavior (to, from, savedPosition){
    /*console.log(to)
    console.log(from)
    console.log(savedPosition)*/
    if(savedPosition){
      return savedPosition
    }else{
      return {x:0,y:0}
    }
  },
  /*fallback:true,
  parseQuery(query){
    console.log(query)
  },
  stringifyQuery(obj){
    console.log(obj)
  }*/
})

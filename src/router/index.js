import Vue from 'vue'
import Router from 'vue-router'
/*import HelloWorld from '@/components/HelloWorld'
import HtmlTpl from '@/components/HtmlTpl'
import CssTpl from '@/components/CssTpl'
import JsTpl from '@/components/JsTpl'
import VueTpl from '@/components/VueTpl'
import WebpackTpl from '@/components/WebpackTpl'
import NodeTpl from '@/components/NodeTpl'*/

Vue.use(Router)

const routes = [
    {
      path: '*',
      component:() => import('@/components/HtmlTpl')
    },
    // {
    //   path: '/',
    //   redirect:'/html'
    // },
    {
      // path: '/html/:id',
      // props: true,  //很重要，在HtmlTpl组件内可以通过props直接能获取path路径的id值
      // props:(route) => ({id: route.query.page}),//推荐用props来传递值
      path: '/',
      name: 'HtmlTpl',
      component: () => import('@/components/HtmlTpl'),
      // components: { //有名的路由模板
      //   default: HtmlTpl,
      //   webpack: WebpackTpl
      // },
      meta: {
        title:'this is html',
        description:'Qin Chao Bin',
        activeNumber: 0
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
      component: () => import('@/components/CssTpl'),
      meta: {
        activeNumber: 1
      }
    },
    {
      path: '/js',
      name: 'JsTpl',
      component: () => import('@/components/JsTpl'),
      meta: {
        activeNumber: 2
      }
    },
    {
      path: '/vue',
      name: 'VueTpl',
      component: () => import('@/components/VueTpl'),
      meta: {
        activeNumber: 3
      }
    },
    {
      path: '/webpack',
      name: 'WebpackTpl',
      component: () => import('@/components/WebpackTpl'),
      meta: {
        activeNumber: 4
      }
    },
    {
      path: '/node',
      name: 'NodeTpl',
      component: () => import('@/components/NodeTpl'),
      meta: {
        activeNumber: 5
      }
    }
  ];

export default new Router({
  routes,
  // mode: 'history',//清除URL上#号，模拟真实路径(history模式需要后端配置)
  // base: '/base/',//在所有router链接路径前添加一个相对的名称
  linkActiveClass:'nav-active',//修改默认的选中class名称
  linkExactActiveClass:'nav-exact-active',//修改默认的选中class名称
  scrollBehavior (to, from, savedPosition){
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

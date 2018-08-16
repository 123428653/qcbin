// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueResource)

Vue.config.productionTip = false

// 此处很有用，可以判断某些页面需要登录才能打开的，可在此判断
/*router.beforeEach((to, from, next) => {
  console.log('before each invoked');
  console.log(to)
  next()
  if(to.fullPath === '/html'){
    next('/css')
  }else{
    next()
  }
  
})

router.beforeResolve((to, from, next) => {
  // console.log('before esolve invoked')
  next()
})

router.afterEach((to, from) => {
  // console.log('after each invoked')
})*/

/* eslint-disable no-new */
var vm=new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
  /*components: { App },
  template: '<App/>'*/
}).$mount('#app')

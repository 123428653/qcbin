import Vue from 'vue'
import Vuex from 'vuex'

import PlayService from './PlayService'


Vue.use(Vuex)

const AppLoading = { // 路由状态
  state: {
    nowStatus: 'loading',
    item:''
  },
  mutations: {
    nowStatus (state, data) {
      state.nowStatus = data
    },
    setItem (state, data){
      state.item = data
    }
  },
  getters: {
    nowStatus: state => {
      return state.nowStatus
    }
  }
}

export default new Vuex.Store({
  modules: {
    AppLoading,
    PlayService
  }
})
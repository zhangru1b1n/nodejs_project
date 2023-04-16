import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
    isGetterRouter:false,
    isCollapse:false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    changeCollapse(state,value){
      state.isCollapse = !state.isCollapse
    },
    changeuserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state,value){
      state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  //vuex持久化
  plugins:[createPersistedState({
    paths:['isCollapse','userInfo'] //控制某个属性持久化
  })]
})

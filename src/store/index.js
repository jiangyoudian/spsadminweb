import { getUserInfoAPI } from '@/api';
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    token:'',
    userInfo:{}
  },
  getters: {
    nickname:state =>state.userInfo.nickname,//昵称
    username:state =>state.userInfo.username,//用户名
    user_pic:(state)=>{
      return state.userInfo.user_pic //用户头像
    }
  },
  mutations: {
    //将获取到的token保存到state当中
    UPDATATOKEN(state,val){
      state.token = val
    },
    //更新用户的信息
    UPDATAUSERINFO(state,info){
      state.userInfo = info
    }
  },
  actions: {
    //定义初始化用户基本信息的action函数
    async initUserInfo(store){
      // console.log('这个好像是min版的仓库',store)
      const {data:res} = await getUserInfoAPI()
      console.log(res)
      if(res.code === 0){
        store.commit('UPDATAUSERINFO',res.data)
      }
    }
  },
  modules: {
  },
  //配置为vuex的插件
  plugins:[createPersistedState()],  //配置了之后刷新浏览器vuex的内容不会消失
})  

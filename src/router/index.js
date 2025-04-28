import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/content'
  },
  // {
  //   path: '/reg',
  //   component: () => import('@/views/register')
  //   /* webpack提供import函数来路由懒加载导入组件
  //   路由懒加载，就是页面路由路径切换到/reg，才去加载对应组件代码
  //   好处：让首页加载文件体积更新,打开更快 */
  // },
  // {
  //   path: '/login',
  //   // component:()=>{
  //   //   return import('@/views/login')
  //   // },
  //   component: () => import('@/views/login')
  // },
  {
    path: '/layout',
    component: () => import('@/views/layout'),
    children: [{
      path: '/content',
      name: 'content',
      component: () => import('@/views/content')
    },{
      path: '/reportList',
      name: 'reportList',
      component: () => import('@/views/reportList')
    },{
      path: '/schoolList',
      name: 'schoolList',
      component: () => import('@/views/schoolList')
    },{
      path: '/exploreList',
      name: 'exploreList',
      component: () => import('@/views/exploreList')
    },{
      path: '/volunteerList',
      name: 'volunteerList',
      component: () => import('@/views/volunteerList')
    },{
      path: '/contactList',
      name: 'contactList',
      component: () => import('@/views/contactList')
    },{
      path: '/thaliList',
      name: 'thaliList',
      component: () => import('@/views/thaliList')
    },{
      path: '/scoreList',
      name: 'scoreList',
      component: () => import('@/views/scoreList')
    }]
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

// const whiteList = ['/login','/reg']

/* 全局前置路由守卫
知识点1：浏览器第一次打开项目页面，会触发一次全局前置路由守卫函数
知识点2：判断登录与否：有token就证明登录了，无token表示未登录
知识点3：next()如果强制切换路由地址,会再次走路由守卫再次去匹配路由表
 */

// router.beforeEach((to, from, next) => {
//   const token = store.state.token
//   if (token) {
//       //有token表示登录了
//     if (!store.state.userInfo.username) {
//       // 有token但是没有用户信息, 才去请求用户信息保存到vuex里
//       // 调用actions里方法请求数据
//       store.dispatch('initUserInfo')
//       // 下次切换页面vuex里有用户信息数据就不会重复请求用户信息
//     }
//     next()
//   }else{
//     /* 未登录 
//     数组.includes(值),作用:判断值是否在数组里出现过，出现过原地返回true*/
//     if(whiteList.includes(to.path)){
//       next()
//     }else{
//       //如果其他页面请强制拦截并跳转到登录页面
//       next('/login')
//     }
//   }

// })
export default router

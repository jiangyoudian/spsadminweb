import store from '@/store'
import axios from 'axios'



// import store from 'vuex';
// import { reject } from 'core-js/fn/promise'
// 创建一个自定的axios方法(比原axios多了个基地址)
// axios函数请求的url地址前面会被拼接基地址, 然后axios请求baseURL+url后台完整地址
const myAxios = axios.create({
  // baseURL: 'http://big-event-vue-api-t.itheima.net'
   baseURL: 'http://172.18.14.16:5000'
  //baseURL: 'http://adminapi.planwiai.com:8082'
})



//定义请求拦截器
//api里每次调用request都会先走这个请求拦截器
myAxios.interceptors.request.use(function (config) {
  //在请求前会触发一次
  //它返回给axios内源码,config配置对象（要请求的后台的参数都在这个对象上）
  // 为请求头挂载 Authorization 字段
  if(store.state.token){
    config.headers.Authorization = store.state.token
  }
  console.log("这就是config",config)
  return config
}, function (error) {
  /* 
  请求发起前的代码，如果有异常报错，会直接进入这里面
  返回一个拒绝状态的Promise对象（axios留在原地的Promise对象状态就是失败结果为error变量值）
  此函数类似catch函数（）里return
  口诀：return非Promise对象值，会作为成功的结果，返回给下一个Promise对象(axios留在原地)
  口诀:returnPromise对象,这个Promise对象状态,返回给下一个Promise对象
  Promise.reject（）原地留下一个新的Promise对象(状态为失败)它是Promise的类方法reject()
  */
  return Promise.reject(error)
  /*   等同于
    return new Promise((resolve,reject)=>{
      reject(error)
    }) */
})




//定义响应拦截器
myAxios.interceptors.response.use(function(response){
  /* 响应状态码为2XX开头时触发成功的回调，形参中的response包含成功的结果 */
  // console.log("这里是response的成功信息",response)
  return response
},function(error){
  //响应状态码不是2XX时触发失败的回调，形参中的error中包含失败的结果
  if(error.response.status === 401){
    //无效的token
    //把vuex中的token重置为空，并跳转到登录页面
    store.commit('UPDATETOKEN','')
    store.commit('UPDATAUSERINFO','')
    // console.log("这里是response的错误信息",error)
    this.$router.push('/login')
  }
  // console.dir("查看一下",error)
  return Promise.reject(error)
})


// 导出自定义的axios方法, 供外面调用传参发请求
export default myAxios




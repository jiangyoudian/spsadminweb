//封装的是具体的接口请求方式
//注意：每个方法只负责请求一个url地址
import request from '@/utils/request'
import store from '@/store'

//导出接口方法,为了在逻辑页面引入后调用  
export const registerAPI = ({ username, password, repassword }) => {
  //return出的结果是一个Promise对象（内部包含原生ajax请求）    
  //return这个Promise对象到逻辑页面，去那边对Promise对象提取结果    
  return request({
    url: '/api/reg',
    method: 'POST',
    /* axios传参params,data
    params的对象参数名和值，axios源码会把参数和值，拼接在url？后面给后台(query查询字符串)
    data的对象参数名和值，axios源码会把参数和值，拼接在请求体里（body参数）
    */
    data: {
      username,
      password,
      repassword
    }
  })
}

/**
 * 
 * @param {*} param0 {username:用户名，pasword:密码} 
 * @returns Promise对象
 */
export const loginAPI = ({ username , password }) => {
  return request({
    url: '/api/login',
    method:'POST',
    data:{
      username,
      password
    }
  })

}

/**
 * 获取用户信息
 * @returns Promise对象
 */
export const getUserInfoAPI = () =>{
  return request({
    url:'/my/userinfo',
    headers:{
      Authorization:store.state.token
    }
  })
}

/**
 * 获取-侧边栏菜单数据
 * @returns Promise对象
 */
export const getMenusAPI =()=>{
  return request({
    url:'/my/menus',
    headers:{
      Authorization:store.state.token
    }
  })
}

//学校列表
export const getSchoolList = (data) => {
  return request({
    url: '/Report/QuerySchoolAdmin',
    method:'POST',
    data: data
  })
}

//是否推荐
export const RecommendedSchool = (data) => {
  return request({
    url: '/Report/RecommendedSchool',
    method:'POST',
    data: data
  })
}

//修改学校星级
export const UpdateSchoolStar = (data) => {
  return request({
    url: '/Report/UpdateSchoolStar',
    method:'POST',
    data: data
  })
}


//新增学校
export const AddSchool = (data) => {
  return request({
    url: '/Report/AddSchool',
    method:'POST',
    data: data, // 使用 FormData 作为请求体
    headers: {
      'Content-Type': 'multipart/form-data' // 明确指定内容类型
    }
    
  })
}

//修改学校
export const UpdateSchool = (data) => {
  return request({
    url: '/Report/UpdateSchool',
    method:'POST',
    data: data, // 使用 FormData 作为请求体
    headers: {
      'Content-Type': 'multipart/form-data' // 明确指定内容类型
    }
  })
}


//删除学校
export const DeleteSchool = (data) => {
  return request({
    url: '/Report/DeleteSchool',
    method:'POST',
    data: data
  })
}

//获取探校记录
export const QueryProbeSchool = (data) => {
  return request({
    url: '/Report/QueryProbeSchool',
    method:'POST',
    data: data
  })
}

//导出探校记录
export const ExportProbeSchool = (data) => {
  return request({
    url: '/Report/ExportProbeSchool',
    method:'POST',
    responseType: 'blob',
    data: data
  })
}

//获取调查问题
export const GetQuestion = (data) => {
  return request({
    url: '/Report/GetQuestion?nType='+data,
    method:'GET',
  })
}

//修改或新增调查问题
export const AddOrUpdateQuestion = (data) => {
  return request({
    url: '/Report/AddOrUpdateQuestion',
    method:'POST',
    data: data
  })
}

//删除调查问题
export const DeletQuestion = (data) => {
  return request({
    url: '/Report/DeletQuestion?nCode='+data,
    method:'GET',
  })
}

//获取套餐列表
export const GetThaliList = () => {
  return request({
    url: '/Report/GetThali',
    method:'GET',
  })
}

//修改套餐
export const UpdateThali = (data) => {
  return request({
    url: '/Report/UpdateThali',
    method:'POST',
    data: data
  })
}

//获取探校记录
export const QueryQuestionnaire = (data) => {
  return request({
    url: '/Report/QueryQuestionnaire',
    method:'POST',
    data: data
  })
}

//统计
export const QueryTotal = (data) => {
  return request({
    url: '/Report/QueryTotal',
    method:'POST',
    data: data
  })
}

//获取学校分数线列表
export const QuerySchoolScore = (data) => {
  return request({
    url: '/Report/QuerySchoolScore',
    method:'POST',
    data: data
  })
}


//获取市县
export const GetCityCounty = () => {
  return request({
    url: '/Report/GetCityCounty',
    method:'GET',
  })
}

//新增分数线
export const AddSchoolScore = (data) => {
  return request({
    url: '/Report/AddSchoolScore',
    method:'POST',
    data: data
  })
}

//修改分数线
export const UpdateSchoolScore = (data) => {
  return request({
    url: '/Report/UpdateSchoolScore',
    method:'POST',
    data: data
  })
}

//删除分数线
export const DeletSchoolScore = (nId) => {
  return request({
    url: '/Report/DeletSchoolScore?nId='+nId,
    method:'GET',
  })
}
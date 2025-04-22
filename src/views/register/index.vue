<template>
    <!-- 注册页面的整体盒子 -->
    <div class="reg-container">
        <!-- 注册的盒子 -->
        <div class="reg-box">
            <!-- 标题的盒子 -->
            <div class="title-box"></div>
            <!-- 注册的表单区域 -->
            <!-- rules	表单验证规则 -->
            <el-form ref="regRef" :model="regForm" :rules="regRules">
                <!-- prop	表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 -->
                <el-form-item prop="username">
                    <el-input v-model="regForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input type="password" v-model="regForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item  prop="repassword">
                    <el-input type="password" v-model="regForm.repassword" placeholder="再次确认密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el_btn" @click="regNewUserFn">注册</el-button><br>
                    <el-link type="info" @click="$router.push('./layout')">去登录</el-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { registerAPI } from '@/api'
export default {
    name: 'my-register',
    data() {
        const samePwd = (rule, value, callback) => {
            if (value !== this.regForm.password) {
                //如果验证失败，则调用回调函数时，指定一个Error对象。
                callback(new Error('两次输入的密码不一致'))
            } else {
                //如果验证成功，则直接调用callback回调函数即可
                callback()
            }
        }
        return {
            // 注册表单的数据对象
            regForm: {
                username: '',
                password: '',
                repassword: ''
            },
            //注册表单的验证规则对象
            regRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {
                        pattern: /^[a-zA-Z0-9]{1,10}$/,
                        message: '用户名必须是1-10的大小写字符数字',
                        trigger: 'blur'
                    }
                ],
                password: [
                    { requitred: true, message: '请输入密码', trigger: 'blur' },
                    {
                        pattern: /^\S{6,15}$/,
                        message: '密码必须是6-15的非空字符',
                        trigger: 'blur'
                    }
                ],
                repassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { pattern: /^\S{6,15}$/, message: '密码必须是6-15的非空字符', trigger: 'blur' },
                    { validator: samePwd, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        //注册新用户
        regNewUserFn() {
            //进行表单预验证 
            this.$refs.regRef.validate(async valid => {
                if(valid){
                    //通过效验，拿到绑定的数据
                    console.log('regForm内容',this.regForm)
                    //1、调用注册接口
                    //这里又是一个结构赋值，把axios返回的数据对象里data字段对应的值保存在res上
                    const {data:res} = await registerAPI(this.regForm)
                    console.log("我们获取到的res信息为",res)
                    //2.注册失败,提示用户
                    //elementUI还在vue的原型链上添加了弹窗提示，$message属性
                    //return必须：阻止代码往下执行
                    if(res.code !== 0) return this.$message.error(res.message)
                    //3.注册成功，提示用户
                    this.$message.success(res.message)
                    //4.跳转到登录页面
                    this.$router.push('/login')
                }else{
                    return false //阻止默认提交行为（表单下方的提示字符会自动显示）
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
.reg-container {
    background: url('../../assets/images/login_bg.jpg') center;
    background-size: cover;
    height: 100%;
    .reg-box {
        width: 400px;
        height: 335px;
        background-color: #fff;
        border-radius: 3px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 0 30px;
        box-sizing: border-box;
        .title-box {
            height: 60px;
            background: url('../../assets/images/login_title.png') center no-repeat;
        }
        .btn-reg {
            width: 100%;
        }
    }
    .el_btn{
        width:100%;
    }
}
</style>
  
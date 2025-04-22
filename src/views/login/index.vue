<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <el-form ref="loginform" :model="form" :rules="rulesObj">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="el_btn" @click="loginFn">登录</el-button>
          <el-link @click="$router.push('/login')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
  
<script>
import { loginAPI } from '@/api';
import { mapMutations } from 'vuex';
export default {
  name: 'my-login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      /* 
      
      required: true: 该字段是必填的。
      message: '请输入账号': 当该字段为空时显示的错误消息。
      trigger: 'blur': 当输入框失去焦点时触发验证。
      
      */
      rulesObj: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,10}/, message: '账号必须是1-10的字母数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '长度在 6到 15个字符', trigger: 'blur' }
        ],
      }
    }

  },
  methods: {
    //借助mapMutations生成计算属性,从mapMutations中读取数据。
    // ...mapMutations(['updataToken']),
    //登录验证
    loginFn() {
      this.$router.push('/layout')
      // this.$refs.loginform.validate(async valid => {
      //   if (valid) {
      //     //验证通过时
      //     console.log(this.form)
      //     //为了拿到后台真正的数据
      //     const { data: res } = await loginAPI(this.form)
      //     console.log(res)
      //     if (res.code === 0) {
      //       //成功
      //       this.$message.success(res.message)
      //       // 4. 保存到vuex中
      //       // console.log(this.updataToken(res.token))
      //       // this.updateToken(res.token)
      //       this.$store.commit('UPDATATOKEN',res.token)
      //       //登录成功之后，跳转到后台主页
      //       this.$router.push('/layout')
      //     } else {
      //       //失败
      //       this.$message.error(res.message)
      //     }
      //   } else {
      //     return false
      //   }
      // })

    }
  }

}
</script>
<style lang="less" scoped>
.login-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;
  .login-box {
    width: 400px;
    height: 270px;
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

    .btn-login {
      width: 100%;
    }

    .el_btn {
      width: 100%;
    }
  }
}
</style>
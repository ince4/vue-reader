<template>
<div>
  <div class="login">
    <img src="../assets/logo.jpg" alt="logo">
    <!-- 输入手机号 -->
    <Input
      type="string"
      v-model="telNumber"
      placeholder="手机号"
      :btnText="btnText"
      :btnDisabled="btnDisabled"
      :errorMessage="error.tel"
      @btnClick="getVerifyCode"
      />
    <!-- 输入验证码 -->
    <Input
      type="string"
      v-model="verifyCode"
      placeholder="验证码"
      :errorMessage="error.code"
    />
    <!-- 登录按钮 -->
    <button>登录</button>
  </div>
</div>
</template>

<script>
import Input from '../components/Input'
export default {
  name: 'login',
  data () {
    return {
      telNumber: '',
      verifyCode: '',
      error: {},
      btnText: '获取验证码',
      btnDisabled: false
    }
  },
  methods: {
    // 验证手机号码是否有效
    telNumberValid () {
      if (!this.telNumber) {
        this.$set(this.error, 'tel', '手机号码不能为空')
        return false
      } else if (!/^1[345678]\d{9}$/.test(this.telNumber)) {
        this.$set(this.error, 'tel', '手机号码不正确')
        return false
      } else {
        this.error = {}
        return true
      }
    },
    // 按钮事件 获取验证码
    getVerifyCode () {
      if (this.telNumberValid()) {
        this.btnCountDown()
      }
    },
    btnCountDown () {
      let time = 40
      let timer = setInterval(() => {
        if (time <= 0) {
          clearInterval(timer)
          this.btnDisabled = false
          this.btnText = '获取验证码'
        } else {
          this.btnDisabled = true
          this.btnText = time + '后再次发送'
          time--
        }
      }, 1000)
    }
  },
  components: {
    Input
  }
}
</script>
<style lang="scss" scoped>
  .login {
    background: white;
    padding:0 10vw;
    margin-top: 45%;
    img{
      width: 60vw;
      margin: 0 auto;
      display: block;
    }
    button {
      width: 100%;
      padding: 3vw;
      background-color: #48ca38;
      border-radius: 2vw;
      color: white;
      font-size: 4vw;
      border: none;
      outline: none;
      margin-top: 3vh;
    }
  }
</style>

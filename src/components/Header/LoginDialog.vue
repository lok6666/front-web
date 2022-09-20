<!-- 登录弹框组件 -->
<template>
  <el-dialog
    top="25vh"
    width="318px"
    custom-class="login-dialog"
    :visible="login_visible"
    :close-on-click-modal="true"
    :lock-scroll="false"
  >
    <i class="el-dialog__close el-icon el-icon-close" @click="bClose" style="float: right;"/>
    <h2>
      <img src="../../images/nobgcolor-wtlogo.png"/>
      <div>
        <span
          v-for="(item, index) in tabs"
          :key="index"
          class="btn tab"
          :class="{ active: active === index }"
          @click="tabClick(index)"
        >{{ item }}</span>
      </div>
    </h2>
    <el-input v-if="active === 0" v-model="username" placeholder="用户名或手机号" />
    <el-input v-else v-model="mobile" placeholder="手机号" />
    <el-input v-if="active === 0" type="password" v-model="password" placeholder="密码" />
    <el-input v-else v-model="code" placeholder="验证码">
      <span v-show="!codeCount" slot="suffix" class="code-btn btn" @click="sendCode">获取验证码</span>
      <el-button
        v-show="codeCount"
        slot="suffix"
        type="primary"
        size="mini"
        disabled
        style="margin-top: 6px;"
      >{{ codeCount }}s</el-button>
    </el-input>
    <el-button style="background: #D99447;border-radius: 30px;border: none;" type="primary" size="medium" :loading="loading" @click="login">登录</el-button>
    <p class="tip">
      <el-checkbox v-if="active === 0" v-model="checked">记住密码</el-checkbox>
      <span class="active btn" :class="{ right: active === 0 }" @click="forgetClick">忘记密码</span>
    </p>
    <p style="clear: both;">
      注册登录即表示同意
      <span style="color: #007fff;">
        <span class="btn" @click="terms">用户协议</span>
        <span class="btn" @click="privacy">隐私政策</span>
      </span>
    </p>
    <!-- <div class="third-login">
      <p class="name">社交账号登录</p>
      <div class="icon-box">
        <a href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101881036&redirect_uri=https://www.poile.cn/oauth&state=1">
          <svg-icon icon-class="qq-login" class="icon" />
        </a>
        <a href="https://github.com/login/oauth/authorize?client_id=bded74b0f0213e6d1a85&scope=user:email&state=2">
          <svg-icon icon-class="github-login" class="icon" />
        </a>
        <a href="https://gitee.com/oauth/authorize?client_id=18348ed893d47d047a79fb0a395fe1c8c481720021096bc5afe2a90a4e6ec557&redirect_uri=https%3A%2F%2Fwww.poile.cn%2Foauth&response_type=code&state=3">
          <svg-icon icon-class="gitee-login" class="icon" />
        </a>
      </div>
    </div> -->
  </el-dialog>
</template>

<script>
import { validMobile } from '@/utils/validate.js'
import { mapGetters } from 'vuex'
import { setRemember, getRemember } from '@/utils/auth.js'
import { sendCode } from '@/api/code.js'
export default {
  data() {
    return {
      username: '',
      password: '',
      mobile: '',
      code: '',
      tabs: ['密码登录', '免密登录'],
      active: 0,
      checked: false,
      loading: false,
      codeCount: 0,
      timer: null
    }
  },
  computed: {
    ...mapGetters(['login_visible', 'login_username', 'login_password'])
  },

  mounted() {
    this.username = this.login_username || '17732236736'
    this.password = this.login_password || '123456'
    this.checked = getRemember() === '1'
  },

  methods: {

    // 关闭弹框跳转用户协议
    terms() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/terms')
    },
    // 关闭弹框跳转隐私政策
    privacy() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/privacy')
    },

    // 关闭弹框事件
    bClose() {
      this.code = ''
      this.active = 0
      this.$store.commit('login/CHANGE_VISIBLE', false)
    },

    // tab切换
    tabClick(index) {
      this.active = index
    },

    // 登录
    login() {
      this.$store.commit('user/SET_TOKEN', null)
      if (this.active === 0) {
        this.passwordLogin()
      } else {
        this.codeLogin()
      }
    },

    // 密码登录
    passwordLogin() {
      const username = this.username
      const password = this.password
      if (username === '') {
        this.$message('请输入用户名')
        return
      }
      if (this.password === '') {
        this.$message('请输入密码')
        return
      }
      const params = {
        username: username,
        password: password
      }
      this.loading = true
      new Promise(async(resolve, reject) => {
        try {
          await this.$store.dispatch('user/accountLogin', params)
          const { roles } = await this.$store.dispatch('user/getUserInfo')
          const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
          this.$router.addRoutes(accessRoutes)
          const checked = this.checked
          setRemember(checked ? '1' : '0')
          if (checked) {
            this.$store.dispatch('login/setUsernameAndPassword', params)
          } else {
            this.$store.dispatch('login/clearUsernameAndPassword')
          }
          this.loading = false
          this.bClose()
          resolve()
        } catch (error) {
          this.loading = false
          console.error(error)
          reject(error)
        }
      })
    },

    // 验证码登录
    codeLogin() {
      const mobile = this.mobile
      const code = this.code
      if (mobile === '') {
        this.$message('请输入手机号')
        return
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return
      }
      if (code === '') {
        this.$message('请输入验证码')
        return
      }
      const params = {
        mobile: mobile,
        code: code
      }
      this.loading = true
      new Promise(async(resolve, reject) => {
        try {
          await this.$store.dispatch('user/codeLogin', params)
          const { roles } = await this.$store.dispatch('user/getUserInfo')
          const accessRoutes = await this.$store.dispatch('permission/generateRoutes', roles)
          this.$router.addRoutes(accessRoutes)
          this.loading = false
          this.bClose()
          resolve()
        } catch (error) {
          this.loading = false
          console.error(error)
          reject(error)
        }
      })
    },

    // 发送验证码
    sendCode() {
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return
      }

      // 120倒数计时
      const TIME_COUNT = 120
      if (!this.timer) {
        this.codeCount = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.codeCount > 0 && this.codeCount <= TIME_COUNT) {
            this.codeCount--
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      const params = { mobile: mobile }
      sendCode(params).then(
        res => {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }
      )
    },

    // 忘记密码点击
    forgetClick() {
      this.$store.commit('login/CHANGE_VISIBLE', false)
      this.$router.push('/reset-password')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

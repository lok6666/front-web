<!-- 注册弹框组件 -->
<template>
  <el-dialog
    top="25vh"
    width="818px"
    custom-class="register-dialog"
    :visible.sync="visible"
    :close-on-click-modal="false"
    :lock-scroll="false"
  >
    <i class="el-dialog__close el-icon el-icon-close" @click="bClose" style="float: right;margin-top: 18px;margin-right: 18px;cursor: pointer;"/>
    <div style="    width: 100%;
    display: flex;">
      <img src="../../images/nobgcolor-wtlogo.png" style="margin: 0 auto;"/>
    </div>
    <el-steps :active="active" align-center>
      <el-step title="注册账号" />
      <el-step title="企业认证" />
    </el-steps>
    <div style="width: 60%;margin: 0 auto">
      <div style="width: 100%;" v-if="active === 0">
      <!-- <div style="width: 50%"> -->
        <el-input v-model="mobile" placeholder="手机号"  @blur.stop="checkMobile"/>
        <el-input v-model="imgCode" placeholder="图形验证码">
          <span slot="suffix" class="imgCode-btn btn" @click.stop="getCode"><img :src="img" style="height: 35px;"></span>
        </el-input>
        <el-input v-model="code" placeholder="验证码">
          <span v-show="!codeCount" slot="suffix" class="code-btn btn" @click.stop="sendCode">获取验证码</span>
          <el-button
            v-show="codeCount"
            slot="suffix"
            type="primary"
            size="mini"
            disabled
            style="margin-top: 6px;"
          >{{ codeCount }}s</el-button>
        </el-input>
        <el-input v-model="username" placeholder="用户名字母开头, 允许2-16字节" @blur.stop="checkUserName"/>
        <el-input v-model="password" type="password" placeholder="密码不能少于6位数" />
        <el-button style="background: #D99447;border-radius: 30px;border: none;" type="primary" size="medium" :loading="loading" @click.stop="submit">下一步</el-button>
      <!-- </div> -->
      </div>
      <div style="width: 100%;" v-if="active === 1">
        <!-- <div style="width: 50%"> -->
          <el-input v-model="entName" placeholder="请输入公司名称"/>
          <el-input v-model="shxydm" placeholder="社会统一代码" />
          <el-input v-model="frdb" placeholder="法人"/>
          <el-input v-model="frdbPhone" placeholder="法人手机号"/>
          <el-input v-model="frdbCard" placeholder="法人身份证"/>
          <div style="display: flex;">
            <el-button style="border-radius: 30px;border: none;" type="primary" size="medium" @click.stop="prev">上一步</el-button>
            <el-button style="background: #D99447;border-radius: 30px;border: none;" type="primary" size="medium" @click.stop="finish">完成</el-button>
          </div>
        <!-- </div> -->
      </div>
    </div>
<!--     <el-button style="background: #D99447;border-radius: 30px;border: none;" type="primary" size="medium" :loading="loading" @click="submit">注册</el-button>
    <p>注册登录即表示同意
    <span style="color: #007fff;">
      <span class="btn" @click="terms">用户协议</span>
      <span class="btn" @click="privacy">隐私政策</span>
    </span>
    </p> -->
  </el-dialog>
</template>

<script>
import {
  entFilingInsert,
  authGetCode
 } from "@/config/api";
 import _ from 'lodash';
 
import request from '@/utils/request';
import { sendRegCode } from '@/api/code.js'
import { register, validate } from '@/api/user.js'
import { validMobile } from '@/utils/validate.js'
export default {
  data() {
    return {
      entFilingInsert,
      username: '',
      entName: '',
      userId: '',
      shxydm: '',
      frdb: '',
      frdbPhone: '',
      frdbCard: '',
      mobile: '',
      code: '',
      imgCode: '',
      password: '',
      codeCount: 0,
      timer: null,
      loading: false,
      visible: false,
      active: 0,
      key: "",
      img: ""
    }
  },
  methods: {
    getCode() {
      request({
        url: `${authGetCode}`,
        method: 'GET'
      }).then(res => {
        let {img, key} = res.data;
        this.img = img;
        this.key = key;
      });
    },
    bClose() {
      this.visible = false
      this.username = ''
      this.entName = ''
      this.shxydm = ''
      this.frdb = ''
      this.frdbPhone = ''
      this.frdbCard = ''
      this.mobile = ''
      this.code = ''
      this.password = ''
    },
    // 校验用户名
    checkUserName() {
      this.username && validate({
        username: this.username
      }).catch(e => {
          this.$message({
            message: '用户名已注册',
            type: 'erroe'
          })
      })
    },
    // 校验手机号
    checkMobile() {
      this.mobile && validate({
        contactsPhone: this.mobile
      }).catch(e => {
/*           this.$message({
            message: '手机号已注册',
            type: 'erroe'
          }) */
      })
    },
    // 身份证

    open() {
      this.visible = true
      this.getCode();
    },
    
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
    // 完成
    finish() {
      request({
        url: `${entFilingInsert}`,
        method: 'POST',
        // todo 考虑 id怎么传进去
        data: {
          entId: this.userId,
          entName: this.entName,
          shxydm: this.shxydm,
          frdb: this.frdb,
          frdbPhone: this.frdbPhone,
          frdbCard: this.frdbCard
        }
      }).then(res => {
          new Promise(async(resolve, reject) => {
            try {
              const params = { username: this.username, password: this.password, entName: this.entName }
              await this.$store.dispatch('user/accountLogin', params)
              // const { roles } = await this.$store.dispatch('user/getUserInfo')
              const accessRoutes = await this.$store.dispatch('permission/generateRoutes', ["ordinary"])
              this.$router.addRoutes(accessRoutes)
              this.$message({
                message: '认证成功',
                type: 'success'
              })
              this.loading = false
              this.bClose()
              resolve()
            } catch (error) {
              this.loading = false
              console.error(error)
              reject(error)
            }
          })
      }).catch(e => {
/*         this.$message({
          message: e.msg,
          type: 'error'
        }); */
      });
    },
    // 提交
    async submit() {
      if (this.vsubmit()) {
        const data = {
          username: this.username,
          entName: this.entName,
          password: this.password,
          mobile: this.mobile,
          code: this.code
        }
        //  this.loading = true;
        register(data).then(e => {
          this.userId = e.data;
          this.active = 1;
        });
      }
    },
    prev() {
      this.active = 0;
    },
    // 提交验证
    vsubmit() {
      
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return false
      }
      if (!validMobile(mobile)) {
        this.$message('手机号格式不正确')
        return false
      }
      const imgCode = this.imgCode
      if (imgCode === '') {
        this.$message('请输入图形验证码')
        return
      }
      const code = this.code
      if (code === '') {
        this.$message('请输入验证码')
        return false
      }
      const username = this.username
      if (username === '') {
        this.$message('请输入用户名')
        return false
      }
      if (!(/^[a-zA-Z][a-zA-Z0-9_]{1,15}$/.test(username))) {
        this.$message('用户名格式不正确')
        return false
      }
      const password = this.password
      if (password === '') {
        this.$message('请输入密码')
        return false
      }

      if (password.length < 6) {
        this.$message('密码不能少于6位数')
        return false
      }
      return true
    },

    // 发送验证码
    sendCode() {
      const mobile = this.mobile
      if (mobile === '') {
        this.$message('请输入手机号')
        return
      }
      if (this.imgCode === '') {
        this.$message('请输入图形验证码')
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
      const params = { mobile: mobile, key: this.key, code: this.imgCode }
      sendRegCode(params).then(
        res => {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }
      ).catch(e => {
        this.getCode();
        clearInterval(this.timer);
        this.timer = null;
        this.codeCount = 0;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

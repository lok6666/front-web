<!-- 头部导航栏 -->
<template>
  <div class="main-header-box">
    <policy-calculate :dialogVisible="dialogVisible" @handleClose="handleClose"></policy-calculate>
    <img src="../../images/logo.png" @click="$router.push('/')" style="cursor:pointer;z-index: 251; position: fixed; left: 57px;">
    <header class="main-header">
        <div class="header">
          <div class="header-left">
                <span><img src="../../images/sdzc.png" /></span>
                <span><img class="index-icon" src="../../images/微信.png" />公众号</span>
                <span><img class="index-icon" src="../../images/路径.png" />平台热线： 400-400-400</span>
          </div>
          <div class="header-right">
                  <span>
                    <!-- 搜索框 -->
                    <div class="search-box">
                      <el-input
                        v-model="keyword"
                        size="medium"
                        placeholder="搜索文章"
                        @focus="inputFocus"
                        @blur="inputBlur"
                        @keyup.enter.native="search"
                      >
                        <i slot="suffix"
                        class="el-input__icon el-icon-search"
                        :style="'color:' + inputIconColor"
                        @click="search"
                        />
                      </el-input>
                    </div>
                </span>
                <span><img class="index-icon" src="../../images/历史记录.png" />我的浏览记录</span>
                <span><img class="index-icon" src="../../images/客服.png" />招商申请</span>
                <span><img class="index-icon" src="../../images/客服.png" />线上客服</span>
          </div>
        </div>
        <div class="content">
          <div class="content-left">
                <span style="font-size: 30px;font-weight: bold;font-family: SourceHanSerifSC-Bold, SourceHanSerifSC;">石文创服</span>
                <span>助理企业梦想腾飞</span>
          </div>
          <div class="content-right">
                <span @click="$router.push('/')" style="cursor: pointer;"><img class="index-icon" src="../../images/首页.png" />企业首页</span>
                <span><img class="index-icon" src="../../images/CombinedShape.png" />+3</span>
                              <!-- 右边box -->
              <div class="right-box">
                <!-- 登录·注册 -->
                <div v-if="!userInfo" class="nologin">
                  <img src="../../images/默认头像.png" style="width: 50px; height: 50px; margin-right: 14px;">
                  <div class="login-btn" @click="loClick">登录</div><div class="reg-btn" @click="reClick">注册</div>
                </div>
                <div v-else class="logined">
                  <router-link to="/user" class="console">个人中心</router-link>
                  <el-dropdown trigger="click" placement="bottom">
                    <div class="avatar-wrapper">
                      <img :src="userInfo.avatar || defaultAvatar" class="user-avatar">
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <router-link v-if="!userInfo.mobile" to="/bind-mobile">
                        <el-dropdown-item>绑定手机号</el-dropdown-item>
                      </router-link>
                      <router-link v-if="!userInfo.email" to="/email-validate">
                        <el-dropdown-item>绑定邮箱</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item>
                        <span style="display:block;" @click="logout">退 出</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
          </div>
        </div>
        <div class="footer">
            <div class="footer-desc">石景山文化创意产业政企 综合服务平台</div>
            <div class="logo">
              <div v-if="device !== 'desktop'" class="menu-wrapper">
                <el-dropdown trigger="click" placement="bottom">
                  <span style="color: #fff;font-weight: 700;">
                    {{
                      navItemActive === 0?'首页'
                      :navItemActive===1?'金融服务'
                        :navItemActive===2?'管家服务'
                          :navItemActive===3?'知识产权'
                            :navItemActive===4?'行业培训':'首页'
                    }}
                    <i class="el-icon-caret-bottom" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <a v-for="(nav,index) in navItems" :key="index" @click="$router.push(nav.to)">
                      <el-dropdown-item>{{ nav.name }}</el-dropdown-item>
                    </a>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <nav class="main-nav">
              <!-- 导航栏目 -->
              <ul class="main-nav-list">
                <li
                  v-for="(nav,index) in navItems"
                  :key="index"
                  class="main-nav-item"
                  :class="[navItemActive === index?'main-nav-item-active':'']"
                  @click="routerTo(nav.to, index)"
                >
                  <div :class="`index-icon nav-icon-${index}`"></div>
                  {{ nav.name }}
                </li>
              </ul>
            </nav>
        </div>
    </header>
    <register-dialog ref="reDialog" />
    <login-dialog ref="loDialog" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PolicyCalculate from '@/components/Policycalculate/index'
import RegisterDialog from './RegisterDialog'
import LoginDialog from './LoginDialog'
export default {
  name: 'Header',
  components: {
    PolicyCalculate,
    RegisterDialog,
    LoginDialog
  },
  props: {
    navItemActive: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      dialogVisible: false,
      keyword: '',
      inputIconColor: '',
      navItems: [
        {
          name: '首页',
          to: '/',
          
        },
         {
          name: '政策匹配',
          to: '/policy-match',
        },
        {
          name: '人才服务',
          to: '/category'
        },
        {
          name: '产品大厅',
          to: '/archives'
        },
        {
          name: '行业培训',
          to: '/friend-link'
        },
        {
          name: '金融服务',
          to: '/finance'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'defaultAvatar',
      'device'
    ])
  },

  mounted() {
    if (this.$route.path === '/search') {
      this.keyword = this.$route.query && this.$route.query.keyword
    }
  },

  methods: {
    routerTo(to, index) {
      if(to === '/policy-match') {
        this.dialogVisible = true;
      } else {
        this.$router.push(to);
        this.navItemActive = index;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 抽屉关闭
    drawerClose() {
      this.drawer = false
    },

    // 搜索框聚焦
    inputFocus() {
      this.inputIconColor = '#1989fa'
    },

    // 搜索框失焦
    inputBlur() {
      this.inputIconColor = ''
    },

    // 注册点击
    reClick() {
      this.$refs.reDialog.open()
    },

    // 登录点击
    loClick() {
      this.$store.commit('login/CHANGE_VISIBLE', true)
    },

    // 退出
    logout() {
      this.$store.dispatch('user/logout').then(res => { this.$router.push('/') })
    },

    // 搜索
    search() {
      const keyword = this.keyword
      if (keyword) {
        this.$router.push(
          {
            path: '/search',
            query: { keyword: keyword }
          }
        )
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.main-header-box {
  // height: 60px;
  width: 100%;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);

  .main-header {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    color: #fff;
    z-index: 250;
    .index-icon {
      height: 18px;
      width: 18px;
      margin-right: 3px;
    }
    .nav-icon-1 {
      background-image: url('../../images/政策匹配.png');
    }
    .nav-icon-2 {
      background-image: url('../../images/人才服务.png');
    }
    .nav-icon-3 {
      background-image: url('../../images/产品大厅.png');
    }
    .nav-icon-4 {
      background-image: url('../../images/行业培训.png');
    }
    .nav-icon-5 {
      background-image: url('../../images/金融.png');
    }
    .header {
      display: flex;
      justify-content: space-between;
      padding-left: 196px;
      line-height: 25px;  
      height: 50px;
      align-items: center;
      color: #555555;
      background: #F5F6F9;
      .header-left {
        display: flex;
        align-items: center;
        span {
          margin-right: 29px;
          display: flex;
          align-items: center;
        }
      }
      .header-right {
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          margin-right: 50px;
        }
      }
    }
    .content {
      background-image: url('../../images/headerbg1.png');
      display: flex;
      justify-content: space-between;
      color: #F8F2F2;
      padding-left: 196px;
      height: 50px;
      .content-left {
        display: flex;  
        align-items: center;
        span {
          display: flex;
          align-items: center;
          margin-right: 28px;
        }
      }
      .content-right {
        display: flex;
        align-items: center;
        span {
          display: flex;
          align-items: center;
          margin-right: 35px;
        }   
        .right-box {
          display: flex;
          align-items: center;
          width: 200px;
          flex-direction: row-reverse;
          position: relative;
          top: 15px;
          z-index: 1;
          @media screen and (max-width: 922px){
            width: auto;
          }

          .nologin {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            width: 200px;
            height: 80px;
            background: #FFFFFF;
            border-radius: 46px 0px 0px 46px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiR;
            color: #000000;
            line-height: 27px;
            .login-btn {
              cursor: pointer;
              line-height: 60px;

              &:after {
                content: "/";
                font-weight: bold;
                margin: 0 5px;
              }
            }

            .reg-btn {
              cursor: pointer;
              line-height: 60px;
            }
          }

          .logined {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            width: 200px;
            height: 80px;
            background: #FFFFFF;
            border-radius: 46px 0px 0px 46px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiR;
            color: #000000;
            line-height: 27px;
            .console {
              font-size: 12px;
              font-weight: 600;
              padding: 0 8px;
              margin-right: 8px;
              border-right: 1px solid hsla(0,0%,59.2%,.2);

              @media screen and (max-width: 922px){
                font-weight: 700;
              }
            }

            .avatar-wrapper {
              margin-top: 5px;
              position: relative;

              .user-avatar {
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid rgba(0, 0, 0, 0.1);
              }
            }
          }
        }
      }
    }
    .footer {
        background-image: url('../../images/heaederbg2.png');
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 196px;
        padding-right: 285px;
        overflow: hidden;
        height: 50px;
        opacity: 0.8;
        .footer-desc {
          // width: 197px;
          height: 20px;
          font-size: 14px;
          line-height: 20px;
          font-family: AlibabaPuHuiTiR;
          color: #FFFFFF;
        }
        @media screen and (max-width: 922px){
          padding: 0 15px;
        }

        .logo {
          min-width: 80px;
          color: #007fff;
          display: flex;
          align-items: center;

          .menu-icon {
            margin: 5px;
            margin-right: 10px;
            color: #444;
            width: 25px;
            height: 25px;
          }

          // .logo-img {
          //   width: 32px;
          //   height: 32px;

          //   @media screen and (max-width: 922px){
          //     width: 25px;
          //     height: 25px;
          //   }
          // }

          // .logo-title {
          //   font-size: 20px;
          //   display: inline-block;
          //   font-weight: bold;
          //   padding-left: 5px;

          //   @media screen and (max-width: 922px){
          //     font-size: 18px;
          //   }
          // }
        }

        .main-nav {
          // flex: 1;
          height: 100%;
          align-items: center;
          display: flex;
          flex-wrap: nowrap;

          @media screen and (max-width: 922px){
            justify-content: flex-end;
          }

          .main-nav-list {
            margin: 0;
            display: flex;
            align-items: center;
            cursor: pointer;
            height: 100%;
            .main-nav-item {
              display: flex;
              align-items: center;
              margin-right: 4px;
              list-style: none;
              // line-height: 60px;
              padding: 0px 5px;
              white-space: nowrap;
              transition: all .3s;
              height: 100%;

              &:hover {
                color: #007fff;
              }
            }

            .main-nav-item-active {
              background: #FF6B03;
              color: #fff;
            }

            @media screen and (max-width: 922px){
              display: none;
            }
          }
        }
      }
    }
}

</style>

<!-- 头部导航栏 -->
<template>
  <div class="main-header-box">
    <policy-calculate
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
      @dialogClose="dialogClose"
    ></policy-calculate>
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      title="入驻石景山"
      width="880px"
      :before-close="closeDialog"
    >
      <form-template
        v-if="applydialogVisible"
        style="padding: 0px 20px 20px 20px"
        :customStyle="{
          display: 'flex',
          'flex-wrap': 'wrap',
          'justify-content': 'space-between',
        }"
        @likeCountChanges="likeCountChanges"
        @closeDialog="closeDialog"
        :labelWidth="140"
        :formConfig="applyMessageForm"
        :showBtn="true"
        :disabled="false"
      />
    </el-dialog>
    <AI v-if="AIDialogVisible || isShowAIDialogVisible" @bClose="bClose" />
    <img
      src="../../images/logo.png"
      @click="$router.push('/')"
      style="cursor:pointer;z-index: 251; position: fixed; left: 57px;"
    />
    <header class="main-header">
      <div class="header">
        <div class="header-left">
          <span @click="openWtUrl()"
            ><img
              style="cursor:pointer;width: 45px;height: 45px;"
              src="../../images/sdzc.png"
          /></span>
          <span @click="wxdialogVisible = !wxdialogVisible" class="index-icon"
            ><img src="../../images/微信.png" />公众号</span
          >
          <img
            style="z-index: 1;width: 100px;height: 100px;position: absolute;top: 52px;left: 262px;z-index: 1;"
            v-if="wxdialogVisible"
            src="../../images/wx-wt.png"
          />
          <span class="index-icon"
            ><img src="../../images/路径.png" />平台热线: 010-56939760</span
          >
        </div>
        <div class="header-right">
          <span>
            <!-- 搜索框 -->
            <div class="search-box">
              <!-- <el-input
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
                      </el-input> -->
            </div>
          </span>
          <span class="index-icon" @click="applydialogVisible = true"
            ><img src="../../images/招商.png" />入驻石景山</span
          >
          <span class="index-icon" @click="AIDialogVisible = true"
            ><img src="../../images/客服.png" />智能客服</span
          >
        </div>
      </div>
      <div class="content">
        <div class="content-left">
          <span
            style="font-size: 30px;font-weight: bold;font-family: SourceHanSerifSC-Bold, SourceHanSerifSC;"
            >石文创服</span
          >
          <span>助力企业梦想腾飞</span>
        </div>
        <div class="content-right">
          <span
            @click="busneissIndex()"
            v-if="userInfo"
            class="index-icon"
            style="cursor: pointer;"
            ><img src="../../images/首页.png" />企业首页</span
          >
          <!-- <span class="index-icon" @click="$router.push('/user/info?categoryId=8')"><img src="../../images/CombinedShape.png" />+3</span> -->
          <!-- 右边box -->
          <div class="right-box">
            <!-- 登录·注册 -->
            <div v-if="!userInfo" class="nologin">
              <img
                src="../../images/默认头像.png"
                style="width: 50px; height: 50px; margin-right: 14px;margin: 5px 16px 0px 30px;"
              />
              <div class="login-btn" @click="loClick">登录</div>
              <div class="reg-btn" @click="reClick">注册</div>
            </div>
            <div v-else class="logined">
              <div class="avatar-wrapper">
                <img
                  :src="userInfo.avatar || defaultAvatar"
                  class="user-avatar"
                />
              </div>
              <div
                style="display: flex;align-items: center;flex-direction: column;"
              >
                <div style="display: flex;width: 100%">
                  <!-- <div @click="routerTo('user')">个人中心</div> -->
                  <router-link to="/user" class="console">个人中心</router-link>
                  <el-dropdown trigger="click" placement="bottom">
                    <div
                      style="cursor: pointer;display: inline-block;margin-left: 10px;width:1px;height:1px;border:5px solid transparent;border-top-color:black;"
                    ></div>
                    <el-dropdown-menu slot="dropdown">
                      <!-- <router-link v-if="!userInfo.mobile" to="/bind-mobile">
                            <el-dropdown-item>绑定手机号</el-dropdown-item>
                          </router-link>
                          <router-link v-if="!userInfo.email" to="/email-validate">
                            <el-dropdown-item>绑定邮箱</el-dropdown-item>
                          </router-link> -->
                      <el-dropdown-item>
                        <span style="display:block;" @click="logout"
                          >退 出</span
                        >
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div
                  style="width: 167px;font-size: 14px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;text-overflow: ellipsis;overflow: hidden;"
                >
                  {{ entName }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footer-desc">石景山区文化产业综合服务平台</div>
        <div class="logo">
          <div v-if="device !== 'desktop'" class="menu-wrapper">
            <el-dropdown trigger="click" placement="bottom">
              <span style="color: #fff;font-weight: 700;">
                {{
                  navItemActive === 0
                    ? "首页"
                    : navItemActive === 1
                    ? "金融服务"
                    : navItemActive === 2
                    ? "灵活用工"
                    : navItemActive === 3
                    ? "知识产权"
                    : navItemActive === 4
                    ? "行业培训"
                    : "首页"
                }}
                <i class="el-icon-caret-bottom" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <a
                  v-for="(nav, index) in navItems"
                  :key="index"
                  @click="$router.push(nav.to)"
                >
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
              v-for="(nav, index) in navItems"
              :key="index"
              class="main-nav-item"
              :class="[navItemActive === index ? 'main-nav-item-active' : '']"
              @click="routerTo(nav.to, index)"
            >
              <div
                style="display: flex;align-items: end;align-content: stretch;"
              >
                <div :class="`nav-icon nav-icon-${index}`"></div>
                <div>{{ nav.name }}</div>
              </div>
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
import { policyMatchTagsGet } from "@/config/api";
import { messageForm, applyMessageForm } from "@/config/constant.js";
import { entApplyInsert } from "@/config/api.js";
import { mapGetters } from "vuex";
import { MessageBox } from "element-ui";
import request from "@/utils/request";
import AI from "@/components/AI/index";
import PolicyCalculate from "@/components/Policycalculate/index";
import FormTemplate from "@/components/Form/index.vue";
// import customerService from '@/components/customer-service/index'
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
export default {
  name: "Header",
  components: {
    PolicyCalculate,
    RegisterDialog,
    FormTemplate,
    LoginDialog,
    AI,
  },
  props: {
    navItemActive: {
      type: String,
      default: "0",
    },
    isShowAIDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    navItemActive: function(a, b) {
      // this.navItemActive = a;
      console.log("navItemActive--", a, b);
    },
  },
  data() {
    return {
      entName: window.localStorage.getItem("userinfo")
        ? JSON.parse(window.localStorage.getItem("userinfo")).entName
        : "",
      companyid: window.localStorage.getItem("USERID"),
      dialogVisible: false,
      wxdialogVisible: false,
      applydialogVisible: false,
      AIDialogVisible: false,
      messageForm,
      applyMessageForm,
      keyword: "",
      inputIconColor: "",
      navItems: [
        {
          name: "首页",
          to: "/",
        },
        {
          name: "政策匹配",
          to: "/policy-match/政策匹配",
        },
        {
          name: "灵活用工",
          to: "/category",
        },
        {
          name: "产品大厅",
          to: "/archives",
        },
        {
          name: "行业培训",
          to: "/friend-link",
        },
        {
          name: "金融服务",
          to: "/finance",
        },
        {
          name: "楼宇信息",
          to: "/building",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["userInfo", "defaultAvatar", "device", "data_selection"]),
  },

  mounted() {
    if (this.$route.path === "/search") {
      this.keyword = this.$route.query && this.$route.query.keyword;
    }
  },

  methods: {
    busneissIndex() {
      this.$router.push(
        `/business-detail/${window.localStorage.getItem("USERID")}`
      );
    },
    openWtUrl() {
      window.open("http://www.bjwt.com/");
    },
    bClose() {
      this.AIDialogVisible = false;
      this.$emit("bClose");
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    likeCountChanges(formData) {
      request({
        url: `${entApplyInsert}`,
        method: "post",
        data: {
          ...formData,
        },
      }).then((res) => {
        // todo 修改后台返回字段
        this.$message({
          message: res.msg,
          type: "success",
          duration: 5 * 1000,
        });
        this.applyMessageForm = this.applyMessageForm.map((e, b) => {
          let result = { ...e };
          delete result[e.prop];
          return result;
        });
        this.applydialogVisible = false;
      });
    },
    routerTo(to, index) {
      let mess;
      if (to === "/policy-match/政策匹配") {
        let userinfo = window.localStorage.getItem("userinfo");
        if (!userinfo) {
          this.$store.commit("login/CHANGE_VISIBLE", true);
        } else {
          request({
            url: `${policyMatchTagsGet}`,
            method: "GET",
            // todo 考虑 id怎么传进去
            params: {
              companyid: this.companyid,
            },
          }).then(({ data }) => {
            if (!data) {
              this.$messageBox({
                title: "温馨提示",
                center: true,
                message: "您的企业标签未填写,请前往个人中心基本信息处填写",
                showConfirmButton: true,
                beforeClose: (action, instance, done) => {
                  done();
                },
              });
            } else {
              this.$router.push(to);
            }
          });
        }
      } else {
        this.$router.push(to);
        // this.navItemActive = index;
      }
    },
    closeDialog(done) {
      this.applydialogVisible = false;
      done();
    },
    handleClose() {
      this.dialogVisible = false;
      this.$router.push("/policy-match/政策匹配");
    },
    // 抽屉关闭
    drawerClose() {
      this.drawer = false;
    },

    // 搜索框聚焦
    inputFocus() {
      this.inputIconColor = "#1989fa";
    },

    // 搜索框失焦
    inputBlur() {
      this.inputIconColor = "";
    },

    // 注册点击
    reClick() {
      this.$refs.reDialog.open();
    },

    // 登录点击
    loClick() {
      this.$store.commit("login/CHANGE_VISIBLE", true);
    },

    // 退出
    logout() {
      this.$store.dispatch("user/logout");
      // this.$store.dispatch('user/logout').then(res => { this.$router.push('/') })
    },

    // 搜索
    search() {
      const keyword = this.keyword;
      if (keyword) {
        this.$router.push({
          path: "/search",
          query: { keyword: keyword },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-header-box {
  // height: 60px;
  width: 100%;
  position: relative;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

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
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
      cursor: pointer;
      img {
        height: 18px;
        width: 18px;
        margin-right: 3px;
      }
    }
    .nav-icon {
      height: 21px;
      width: 21px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .nav-icon-0 {
      background-image: url("../../images/nav-首页.png");
    }
    .nav-icon-1 {
      background-image: url("../../images/nav-政策匹配.png");
    }
    .nav-icon-2 {
      background-image: url("../../images/nav-灵活用工.png");
    }
    .nav-icon-3 {
      background-image: url("../../images/nav-产品大厅.png");
    }
    .nav-icon-4 {
      background-image: url("../../images/nav-行业培训.png");
    }
    .nav-icon-5 {
      background-image: url("../../images/nav-金融.png");
    }
    .nav-icon-6 {
      background-image: url("../../images/nav-楼宇信息.png");
    }
    .header {
      display: flex;
      justify-content: space-between;
      padding-left: 196px;
      line-height: 25px;
      height: 50px;
      align-items: center;
      color: #555555;
      background: #f5f6f9;
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
      background-image: url("../../images/headerbg1.png");
      display: flex;
      justify-content: space-between;
      color: #f8f2f2;
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
          // width: 200px;
          flex-direction: row-reverse;
          position: relative;
          top: 16px;
          z-index: 1;
          @media screen and (max-width: 922px) {
            width: auto;
          }

          .nologin {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            // width: 200px;
            height: 80px;
            background: #ffffff;
            padding-right: 46px;
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
            padding-right: 46px;
            // width: 200px;
            height: 80px;
            background: #ffffff;
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
              display: flex;
              align-items: center;
              // border-right: 1px solid hsla(0,0%,59.2%,.2);

              @media screen and (max-width: 922px) {
                font-weight: 700;
              }
            }

            .avatar-wrapper {
              margin: 5px 16px 0px 30px;
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
      background-image: url("../../images/heaederbg2.png");
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
        word-break: keep-all;
        white-space: nowrap;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        font-family: AlibabaPuHuiTiR;
        color: #ffffff;
      }
      @media screen and (max-width: 922px) {
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

        @media screen and (max-width: 922px) {
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
            transition: all 0.3s;
            height: 100%;

            &:hover {
              // color: #007fff;
            }
          }

          .main-nav-item-active {
            background: #ff6b03;
            color: #fff;
          }

          @media screen and (max-width: 922px) {
            display: none;
          }
        }
      }
    }
  }
}
</style>

<!-- 头部导航栏 -->
<template>
  <div class="main-header-box">
<!--       <policy-calculate
      :dialogVisible="dialogVisible"
      @handleClose="handleClose"
      @dialogClose="dialogClose"
    ></policy-calculate> -->
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      title="入驻申请"
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
      @click="toIndex()"      
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
            >
            <img src="../../images/微信.png" />公众号</span>
          <img
            style="z-index: 1;width: 100px;height: 100px;position: absolute;top: 52px;left: 262px;z-index: 1;"
            v-if="wxdialogVisible && $router.isBeijing() === '#/beijing'"
            src="../../images/wx-wt.png"
          />
          <img
            style="z-index: 1;width: 100px;height: 100px;position: absolute;top: 52px;left: 262px;z-index: 1;"
            v-if="wxdialogVisible && $router.isBeijing() === '#/shijingshan'"
            src="../../images/sjs_wx.jpg"
          />
          <img
            style="z-index: 1;width: 100px;height: 100px;position: absolute;top: 52px;left: 262px;z-index: 1;"
            v-if="wxdialogVisible && $router.isBeijing() === '#/chaoyang'"
            src="../../images/cy_wx.jpg"
          />
          <span
            ><img src="../../images/路径.png" />平台热线: {{'17190033790'}}</span
          >
          <!--非北京站展示跳转北京站按钮-->
          <el-button round size="small" v-if="$router.isBeijing() !== '#/beijing'" style="display: flex;justify-content: center;width: 90px;font-weight: bolder;" icon="el-icon-s-promotion" @click="tabChange('#/beijing', 'TO_BEIJING', '点击北京站')">北京站</el-button>
          <!--北京站展示跳转按钮-->
          <el-button round size="small" v-if="$router.isBeijing() === '#/beijing'" style="display: flex;justify-content: center;width: 90px;font-weight: bolder;" icon="el-icon-s-promotion" @click="tabChange('#/shijingshan', 'TO_SHIJINGSHAN', '点击石景山站')">石景山站</el-button>
          <!--北京站展示跳转按钮-->
          <el-button round size="small" v-if="$router.isBeijing() === '#/beijing'" style="display: flex;justify-content: center;width: 90px;font-weight: bolder;" icon="el-icon-s-promotion" @click="tabChange('#/chaoyang', 'TO_CHAOYANG', '点击朝阳站')">朝阳站</el-button>
 <!--          <span class="index-icon">
            <el-select v-model="locationOption"
            placeholder="请选择"
            size="small"
            @change="tabChange" style="width: 125px;">
              <template #prefix>
                <span style="padding-left: 7px;padding-top: 6px;color: #0E9CEC;">
                  <img src="../../images/local-icon.png"/>
                </span>
              </template>
              <el-option
                style="border-radius: 10px;"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span> -->
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
          <span v-if="$router.isBeijing() !== '#/beijing'" class="index-icon" @click="SettleIn()"
            ><img src="../../images/招商.png" />入驻{{locationhashMap[$router.isBeijing()]}}</span
          >
<!--           <span v-if="$router.isBeijing() === '#/chaoyang'" class="index-icon" @click="applydialogVisible = true"
            ><img src="../../images/招商.png" />入驻朝阳</span
          > -->
          <span class="index-icon" @click="openAiDialogVisBle()"
            ><img src="../../images/客服.png" />智能客服</span
          >
        </div>
      </div>
      <div class="content">
        <div class="content-left">
          <span
            style="font-size: 24px;font-weight: bold;font-family: SourceHanSerifSC-Bold, SourceHanSerifSC;"
            >文惠企服</span
          >
          <!-- <span>助力企业梦想腾飞</span> -->
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
              <div @click.pr="showLogin" style="margin-left: 12px;margin-right: 10px;cursor: pointer;" :class="[loginShow ? 'date-left' : 'arrow-right']"></div>
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
                        <span style="display:block;" @click="resetPassword">修改密码</span>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <span style="display:block;" @click="logout">退出</span>
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
        <div style="display: flex;">
          <div class="footer-desc" >文化产业综合服务平台（{{locationhashMap[$router.isBeijing()]}}站）</div>
        </div>
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
              :class="[navItemActive === nav.index ? 'main-nav-item-active' : '']"
              @click="routerTo(nav.to, index, nav.logName, nav.name)"
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
import {imgDatalogV3} from "@/utils/util.js";
import { mapGetters } from "vuex";
import { MessageBox } from "element-ui";
import request from "@/utils/request";
import AI from "@/components/AI/index";
// import PolicyCalculate from "@/components/Policycalculate/index";
import FormTemplate from "@/components/Form/index.vue";
// import customerService from '@/components/customer-service/index'
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import store from "@/store";
export default {
  name: "Header",
  components: {
    // PolicyCalculate,
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
    "$store.state.app.location": {
      handler: function(val) {
        this.locationOption = val;
        !window.location.hash.includes(val) && this.$router.changelocation(val, this.$store.state.app.location);
      }
    }
  },
  data() {
    return {
      locationhashMap: {
        '#/beijing': '北京',
        '#/shijingshan': '石景山',
        '#/chaoyang': '朝阳'
      },
      entLocationhashMap: {
        '#/shijingshan': 'shijingshan',
        '#/chaoyang': 'chaoyang'
      },
      options: [{
          value: '#/beijing',
          label: '北京站'
        }, {
          value: '#/shijingshan',
          label: '石景山站'
        }],
      loginShow: true,
      entName: window.localStorage.getItem("userinfo")
        ? JSON.parse(window.localStorage.getItem("userinfo")).entName
        : "",
      locationOption: this.$router.isBeijing(),
      companyid: window.localStorage.getItem("USERID"),
      policyCalculate:{
          "jigou": "不符合",
          "diyu": "不符合",
          "shangshi": "不符合",
          "keyan": "不符合",
          "fenlei": "不符合",
          "xiangmu": "不符合",
          "zuzhi": "不符合",
          "yewu": "不符合",
          "chuangxin": "不符合",
          "caiwu": "不符合",
          "zizhi": "不符合",
          "guimo": "全部",
          "nianxian": "全部",
          "quxian": "石景山区",
      },
      dialogVisible: false,
      wxdialogVisible: false,
      applydialogVisible: false,
      AIDialogVisible: false,
      messageForm,
      applyMessageForm,
      keyword: "",
      inputIconColor: "",
      navItems: this.$router.isBeijing() === '#/beijing' ? [
        { 
          logName: "NAV_INDEX",
          name: "首页",
          to: "/",
          index: 0
        },
        {
          logName: "NAV_POLICY_MATCH",
          name: "政策匹配",
          to: "/policy-match/政策匹配",
          index: 1
        },
        {
          logName: "NAV_CATEGORY_LINK",
          name: "灵活用工",
          to: "/category",
          index: 2
        },
        {
          logName: "NAV_PRODUCTION",
          name: "产品大厅",
          to: "/archives",
          index: 3
        },
        {
          logName: "NAV_FRIEND_LINK",
          name: "行业培训",
          to: "/friend-link",
          index: 4
        },
        {
          logName: "NAV_FINANCE",
          name: "金融服务",
          to: "/finance",
          index: 5
        },
        {
          logName: "NAV_BUILDING",
          name: "楼宇信息",
          to: "/building",
          index: 6
        },
      ] : [
        {
          logName: "NAV_INDEX",
          name: "首页",
          to: "/",
          index: 0
        },
        {
          logName: "NAV_POLICY_MATCH",
          name: "政策匹配",
          to: "/policy-match/政策匹配",
          index: 1
        },
        {
          logName: "NAV_ARCHTIVES",
          name: "知识产权",
          to: "/archives",
          index: 3
        },
        {
          logName: "NAV_FRIEND_LINK",
          name: "行业培训",
          to: "/friend-link",
          index: 4
        },
        {
          logName: "NAV_FINANCE",
          name: "金融服务",
          to: "/finance",
          index: 5
        },
        {
          logName: "NAV_BUILDING",
          name: "楼宇信息",
          to: "/building",
          index: 6
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["userInfo", "defaultAvatar", "device", "data_selection", 'location']),
  },
  mounted() {
    if (this.$route.path === "/search") {
      this.keyword = this.$route.query && this.$route.query.keyword;
    }
  },

  methods: {
    settleIn() {
      imgDatalogV3({
        eventCode: 'HEADER_SETTLE_IN',
        eventName: '首页入驻埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.applydialogVisible = true
    },
    toIndex() {
      imgDatalogV3({
        eventCode: 'TO_INDEX',
        eventName: '打开首页埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$router.push('/')
    },
    openAiDialogVisBle() {
      imgDatalogV3({
        eventCode: 'OPEN_AI',
        eventName: '打开智能客服埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.AIDialogVisible = true
    },
    async tabChange(tab, eventCode, eventName) {
      imgDatalogV3({
        eventCode,
        eventName,
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      await store.dispatch('app/changeLocation', tab)
    },
    busneissIndex() {
      imgDatalogV3({
        eventCode: "TO_ENTERPRISE_INDEX",
        eventName: '点击企业首页埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$router.push(
        `/business-detail/${window.localStorage.getItem("USERID")}`
      );
    },
    openWtUrl() {
      imgDatalogV3({
        eventCode: 'TO_BJWT',
        eventName: '点击北文投logo埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
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
          entLocation: this.entLocationhashMap[this.$router.isBeijing()]
        },
      }).then((res) => {
        // todo 修改后台返回字段
        this.$message({
          message: '提交成功',
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
    routerTo(to, index, logName, name) {
      imgDatalogV3({
        eventCode: logName,
        eventName: `点击${name}埋点`,
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
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
            let limit = 0;
            data && Object.keys(this.policyCalculate).forEach(e => {
              if(data[e]) {
                ++limit;
              };
            });
            if (!data) {
              this.$messageBox({
                title: "温馨提示",
                center: true,
                message: "您的企业标签数量较少，请尽快前往企业个人中心的基本信息处进行完善，可让政策匹配更精准。",
                cancelButtonText: '继续匹配',
                confirmButtonText: '立即前往',
                distinguishCancelAndClose: true,
                showCancelButton: true,
                showConfirmButton: true,
                beforeClose: (action, instance, done) => {
                  if(action === 'confirm') {
                    this.$router.push('/user');
                  } else if(action === 'cancel'){
                    this.$router.push(to);
                  }
                  done();
                },
              }).then((res) => {
                console.log('res', res);
              }).catch((e) => {
                console.log('e---', e);
              });
            } else if(limit < 5) {
              this.$messageBox({
                title: "温馨提示",
                center: true,
                message: "您的企业标签数量较少，请尽快前往企业个人中心的基本信息处进行完善，可让政策匹配更精准。",
                cancelButtonText: '继续匹配',
                confirmButtonText: '立即前往',
                distinguishCancelAndClose: true,
                showCancelButton: true,
                showConfirmButton: true,
                beforeClose: (action, instance, done) => {
                  if(action === 'confirm') {
                    this.$router.push('/user');
                  } else if(action === 'cancel'){
                    this.$router.push(to);
                  }
                  done();
                },
              }).then((res) => {
                console.log('res', res);
              }).catch((e) => {
                console.log('e---', e);
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
      imgDatalogV3({
        eventCode: 'REGISTER',
        eventName: '点击注册埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$refs.reDialog.open();
    },

    // 登录点击
    loClick() {
      imgDatalogV3({
        eventCode: "LOGIN",
        eventName: '点击登录锚点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$store.commit("login/CHANGE_VISIBLE", true);
    },

    showLogin() {
      let logined = document.getElementsByClassName("logined")[0];
      if(logined.style['right']) {
        logined.style['right'] = '';
        this.loginShow = true;
      } else {
        logined.style['right'] = '-239px';
        this.loginShow = false;
      }
    },

    // 退出
    logout() {
      imgDatalogV3({
        eventCode: 'LOGOUT',
        eventName: '点击退出埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$store.dispatch("user/logout").then(e => {
        this.$router.push('/');
      });
    },
    resetPassword() {
      // this.$store.commit('login/CHANGE_VISIBLE', false)
      imgDatalogV3({
        eventCode: 'RESET_PASSWORD',
        eventName: '点击修改密码埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$router.push('/reset-password')
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
        .index-icon {
          .el-select {
          color: #000;
          // background-color: red;
          & /deep/ .el-input {
              .el-input__inner {
                color: #000 !important;
                border-radius: 10px;
                padding: 0px 10px 0px 34px;
                background: rgba(179,216,255, 0.7);
              }
              .el-input__suffix {
                margin-right: -1px;
              }
            }
          }
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
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            padding-right: 20px;
            // width: 200px;
            height: 80px;
            background: #ffffff;
            border-radius: 46px 0px 0px 46px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiR;
            color: #000000;
            line-height: 27px;
             
            //左箭头
            .date-left {
              width: 7px;
              height: 7px;
              border-top: 2px solid #867f7a;
              border-right: 2px solid #867f7a;
              transform: rotate(45deg);
            }
            
            ///右箭头
            .arrow-right {
              width: 7px;
              height: 7px;
              border-top: 2px solid #867f7a;
              border-right: 2px solid #867f7a;
              transform: rotate(-135deg);
            }
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
              margin: 5px 16px 0px 10px;
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
        // cursor: pointer;
        margin-right: 10px;
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

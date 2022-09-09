<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <!--980+305-->
    <div class="finance-detail-bg">
      <div style="width: 1285px;display: flex;"><div style="width: 310px;height: 10px;"></div>
        银担合作疫情期间专项融资方案
      </div>
    </div>
    <div class="finance-detail-container">
      <div class="finance-detail-header">
        <div style="display: flex;width: 100%;">
          <div style="display: flex;flex-direction: column;justify-content: space-around;">
            <div style="width: 980px;height: 95px;display: flex;justify-content: space-between;">
              <img class="header-logo" src="../../images/finance-header.png" />
              <div style="display: flex;justify-content: space-around;width: 100%;">
                <img src="../../images/bankLogo.png" />
                <div style="display: flex;align-items: center;">
                  <img src="../../images/safe.png" />
                  <div>担保方式:信用</div>
                </div>
              </div>
            </div>
            <div class="fw-model">
              <div class="fw-model-item" v-for="(i, index) in fwList" key="index">
                <div class="title">{{ i.title }}</div>
                <div class="data">
                  <span>{{ i.num }}</span>
                </div>
              </div>
            </div>
          </div>
          <img src="../../images/applyBg.png" />
        </div>
      </div>
      <div class="finance-detail-content">
        <div class=""></div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import AppHeader from "@/components/Header/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      fwList: [
        {
          title: "参考利率范围",
          num: "4.18%～5.25%",
          type: "天",
        },
        {
          title: "期限",
          num: "1-60月",
          type: "天",
        },
        {
          title: "额度:",
          num: "2000万",
          type: "天",
        }
      ],
      categorys: [
        { id: 0, name: "首页" },
        { id: 1, name: "基本信息维护" },
        { id: 2, name: "宣传资料" },
      ],
      propertys: [
        { id: 3, name: "财税数据填报" },
        { id: 4, name: "企业备案信息" },
      ],
      services: [
        { id: 5, name: "我的政策" },
        { id: 6, name: "我的服务" },
        { id: 7, name: "我的活动" },
        { id: 8, name: "站内信息" },
        { id: 9, name: "账户管理" },
      ],
      opVisible: {
        nickname: false,
        birthday: false,
        gender: false,
        brief: false,
      },
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
      files: [],
      loading: false,
      userInfo: "",
      form: {
        nickname: "",
        mobile: "",
        email: "",
        gender: 0,
        birthday: "",
        brief: "",
      },
    };
  },
  components: {
    AppHeader,
    AppFooter
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
    headers() {
      var val = {
        Authorization: "Bearer " + getAccessToken(),
      };
      return val;
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    // 初始化
    init() {
      const userInfo = this.$store.getters.userInfo;
      this.userInfo = userInfo;
      this.username = userInfo.username;
      this.form.nickname = userInfo.nickname;
      this.form.mobile = this.sensitiveMobile(userInfo.mobile);
      this.form.email = this.sensitiveEmail(userInfo.email);
      this.form.gender = userInfo.gender;
      this.originalGender = userInfo.gender;
      this.form.birthday = userInfo.birthday;
      this.originalBirthday = userInfo.birthday;
      this.form.brief = userInfo.brief;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  // padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #eee;
  min-height: calc(100vh - 50px);
  position: relative;

  @media screen and (max-width: 922px) {
    padding: 0;
    margin: 0;
  }
  .finance-detail-bg {
    display: flex;
    align-items: end;
    justify-content: center;
    height: 442px;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    padding-bottom: 7px;
    background-size: cover;
    background-image: url('../../images/financedetailBg.png');
  }
  .finance-detail-container {
    max-width: 1440px;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 60px;
    .finance-detail-header {
      display: flex;
      justify-content: space-between;
      background: #fff;
      flex-direction: column;
      border-bottom-right-radius: 64px;
      // margin: 0 60px;
      .header-logo {
        position: relative;
        top: -127px;
        width: 310px;
        height: 237px;
      }
      .fw-model {
        display: flex;
        background: #fff;
        border-radius: 4px;
        .fw-model-item {
          height: 120px;
          width: 100%;
          // min-width: 193px;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 25px;
          .title {
          }
          .data {
            span {
              font-size: 40px;
              font-family: Futura-Bold, Futura;
              font-weight: bold;
              color: #222222;
              line-height: 53px;
            }
          }
        }
      }
    }
    .finance-detail-content {

    }
  }
}
</style>

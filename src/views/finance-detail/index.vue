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
        <div style="display: flex;width: 100%;justify-content: space-around;">
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
        <div class="title">项目详情</div>
        <div class="content">
          <p>
          产品简介
          （一）审批高效。
          对于贷款资料齐全的业务，随到随审，原则上3个工作日内完成审批。
          （二）利率优惠
          1.符合再贷款政策支持名单内的小微企业，贷款利率最高为贷款发放时最近一次公布的一年期LPR减100基点。
          2.不在上述名单内，但疫情期间直接参与防疫重点医用物品和生活物资生产、运输和销售的小微企业紧急融资需求，贷款利率最低为我行最低指导
          （三）担保费优惠
          担保公司在疫情期间给予符合要求的企业担保费优惠。
          （四）应续尽续
          对受疫情影响经营暂时出现困难但有发展前景的企业不抽贷、不断贷、不压贷，应续尽续。
          适用客户
          无
          申请条件
          1.符合《中国人民银行关于发放专项再贷款支持防控新型冠状病毒感染的肺炎疫情有关事项的通知》（银发〔2020〕28号，以下简称《通知》）要求，且符合监管部门对北京地区法人银行再贷款政策支持名单内的小微企业。
          2.不在上述名单内，担疫情期间直接参与防疫的重点医用物品和生活物资生产、运输和销售的小微企业
          提交材料
          无
          申请流程
          无</p>
        </div>
      </div>
      <div class="finance-detail-other-content">
        <div class="title">其他产品</div>
        <Loan :loanList="loanList"/>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import AppHeader from "@/components/Header/index";
import loanBg1 from "../../images/loan-card-header1.png";
import bank1 from "../../images/bank1.png";
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      loanList: [
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
        {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "200万",
          loanBg: loanBg1,
          bank: bank1,
        },
      ],
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
    Loan,
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
      background: #FFFFFF;
      margin-top: 28px;
      padding: 37px 46px;
      .title {
        font-size: 28px;
        font-family: AlibabaPuHuiTiB;
        color: #000000;
        line-height: 38px;
        padding-bottom: 18px;
        border-bottom: 1px solid #979797;
      }
      .content {
        p {
          padding-top: 28px;
        }
      }
    }
    .finance-detail-other-content {
      margin-top: 49px;
      .title {
        font-size: 28px;
        font-family: AlibabaPuHuiTiB;
        color: #000000;
        line-height: 38px;
        padding-bottom: 18px;
        border-bottom: 1px solid #979797;
      }
    }
  }
}
</style>

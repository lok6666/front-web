<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      :before-close="closeDialog">
      <form-template
      style="padding: 0px 20px"
      :customStyle="{display: 'grid', 'grid-template-columns': '400px 400px'}"
      @likeCountChanges="closeDialog"
      :labelWidth="140"
      title="服务申请"
      :formConfig="applyMessageForm2"
      :showBtn="true"
      :disabled="false"/> 
    </el-dialog>
    <!--980+305-->
    <div class="finance-detail-bg">
      <div style="width: 1285px;display: flex;"><div style="width: 310px;height: 10px;"></div>
        {{loanTail.title}}
      </div>
    </div>
    <div class="finance-detail-container">
      <div class="finance-detail-header">
        <div style="display: flex;width: 100%;justify-content: space-between;">
          <div style="display: flex;flex-direction: column;justify-content: space-around;">
            <div style="width: 980px;height: 95px;display: flex;justify-content: space-between;">
              <img class="header-logo" :src="loanTail.loanBg" />
              <div style="display: flex;justify-content: space-around;width: 100%;">
                <img :src="loanTail.bank" />
                <div style="display: flex;align-items: center;">
                  <img src="../../images/safe.png" />
                  <div>担保方式:信用</div>
                </div>
              </div>
            </div>
            <div class="fw-model">
              <div class="fw-model-item">
                <div class="title">参考利率范围</div>
                <div class="data rate-class">
                  <span>{{ loanTail.num }}</span>
                </div>
              </div>
              <div class="fw-model-item">
                <div class="title">期限</div>
                <div class="data limit-class">
                  <span>{{ loanTail.limit }}月</span>
                </div>
              </div>
              <div class="fw-model-item">
                <div class="title">参考利率范围</div>
                <div class="data ed-class">
                  <span>{{ loanTail.quota }}</span>
                </div>
              </div>
            </div>
          </div>
          <img @click="applydialogVisible = true" src="../../images/applyBg.png" />
        </div>
      </div>
      <div class="finance-detail-content">
        <div class="title">项目详情</div>
        <div class="content">
          <p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">产品简介 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">（一）审批高效。 对于贷款资料齐全的业务，随到随审，原则上3个工作日内完成审批。 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">（二）利率优惠 1.符合再贷款政策支持名单内的小微企业，贷款利率最高为贷款发放时最近一次公布的一年期LPR减100基点。 2.不在上述名单内，但疫情期间直接参与防疫重点医用物品和生活物资生产、运输和销售的小微企业紧急融资需求，贷款利率最低为我行最低指导 （三）担保费优惠 担保公司在疫情期间给予符合要求的企业担保费优惠。 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">（四）应续尽续 对受疫情影响经营暂时出现困难但有发展前景的企业不抽贷、不断贷、不压贷，应续尽续。</span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;"> 适用客户</span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;"> 无要求 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">申请条件 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">1.符合《中国人民银行关于发放专项再贷款支持防控新型冠状病毒感染的肺炎疫情有关事项的通知》（银发〔2020〕28号，以下简称《通知》）要求，且符合监管部门对北京地区法人银行再贷款政策支持名单内的小微企业。</span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;"> 2.不在上述名单内，担疫情期间直接参与防疫的重点医用物品和生活物资生产、运输和销售的小微企业 提交材料 无要求 申请流程 无要求</span></p>
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
import { applyMessageForm2 } from "@/config/constant.js";
import FormTemplate from "@/components/Form/index.vue"
import loanBg0 from "../../images/loan-card-header0.png";
import loanBg1 from "../../images/loan-card-header1.png";
import loanBg2 from "../../images/loan-card-header2.png";
import loanBg3 from "../../images/loan-card-header3.png";
import loanBg4 from "../../images/loan-card-header4.png";
import loanBg5 from "../../images/loan-card-header5.png";
import bj_bank from "../../images/bank1.png";
import jt_bank from "../../images/jt_bank.png";
import hx_bank from "../../images/hx_bank.png";
import zs_bank from "../../images/zs_bank.png";
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      applydialogVisible: false,
      applyMessageForm2,
      loanTail: JSON.parse(window.localStorage.getItem('loan-tail')),
      loanList: [
      {
          title: "短贷宝",
          num: "4.18% - 5.25%",
          bank: "北京银行",
          limit: "1-60",
          quota: "100万",
          loanBg: loanBg0,
          bank: bj_bank,
        },
        {
          title: "小额智融宝",
          num: "4.23% - 5.15%",
          bank: "北京银行",
          limit: "1-30",
          quota: "300万",
          loanBg: loanBg1,
          bank: hx_bank,
        },
        {
          title: "科创e贷",
          num: "4.19% - 5.30%",
          bank: "北京银行",
          limit: "1-40",
          quota: "1000万",
          loanBg: loanBg2,
          bank: hx_bank,
        },
        {
          title: "高新e贷",
          num: "3.59% - 5.30%",
          bank: "北京银行",
          limit: "1-35",
          quota: "400万",
          loanBg: loanBg3,
          bank: hx_bank,
        },
        {
          title: "小企业流动资金贷款",
          num: "4.08% - 5.15%",
          bank: "北京银行",
          limit: "1-27",
          quota: "500万",
          loanBg: loanBg4,
          bank: jt_bank,
        },
        {
          title: "创业贷",
          num: "3.59% - 4.35%",
          bank: "北京银行",
          limit: "1-50",
          quota: "150万",
          loanBg: loanBg5,
          bank: zs_bank,
        }
      ],
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
    FormTemplate,
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
    },
    closeDialog(done) {
      this.applydialogVisible = false;
      done();
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
          .rate-class {
            font-size: 40px;
          }
          .limit-class {
            color: #4B4B4B;
            font-size: 30px;
          }
          .ed-class {
            color: #D0021B; 
            font-size: 34px;
          }
          .data {
            span {
              
              font-family: AlibabaPuHuiTiR;
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
        padding-top: 28px;
        line-height: 25px;
        font-family: AlibabaPuHuiTiR;
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

<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      width="450px"
      title="服务申请"
      :before-close="closeDialog">
      <form-template
      style="width: 400px;padding: 0px 20px"
      @likeCountChanges="closeDialog"
      :labelWidth="80"
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
              <img class="header-logo" :src="loanTail.bank" />
              <div style="display: flex;justify-content: space-around;width: 100%;">
                  <div style="display: flex;align-items: center;justify-content: center;">
                    <div style="background: #ecf5ff;padding: 4px 8px;margin:0 5px 0px;height: 24px" v-for="(item, index) in loanTail.tagList">{{item}}</div>
                  </div>
                <div style="display: flex;align-items: center;">
                  <img src="../../images/safe.png" style="margin-right: 10px;"/>
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
                  <span>{{ loanTail.limit }}</span>
                </div>
              </div>
              <div class="fw-model-item">
                <div class="title">额度</div>
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
          <p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-weight: bolder; font-size: 16px;">产品简介 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">（一）审批高效。 对于贷款资料齐全的业务，随到随审，原则上3个工作日内完成审批。 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">（二）利率优惠 1.符合再贷款政策支持名单内的小微企业，贷款利率最高为贷款发放时最近一次公布的一年期LPR减100基点。 2.不在上述名单内，但疫情期间直接参与防疫重点医用物品和生活物资生产、运输和销售的小微企业紧急融资需求，贷款利率最低为我行最低指导 （三）担保费优惠 担保公司在疫情期间给予符合要求的企业担保费优惠。 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">（四）应续尽续 对受疫情影响经营暂时出现困难但有发展前景的企业不抽贷、不断贷、不压贷，应续尽续。</span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-weight: bolder;font-weight: bolder;font-size: 16px;"> 适用客户</span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;"> 无要求 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-weight: bolder;font-size: 16px;">申请条件 </span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">1.符合《中国人民银行关于发放专项再贷款支持防控新型冠状病毒感染的肺炎疫情有关事项的通知》（银发〔2020〕28号，以下简称《通知》）要求，且符合监管部门对北京地区法人银行再贷款政策支持名单内的小微企业。</span></p><p style="line-height: 1.5;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;"> 2.不在上述名单内，担疫情期间直接参与防疫的重点医用物品和生活物资生产、运输和销售的小微企业 提交材料 无要求 申请流程 无要求</span></p>
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
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
import bj_bank from "../../images/bj_bank.png";
import jh_bank from "../../images/bank2.png";
const bjDataJron = [
{
    title: "善新贷",
    num: "3.19% ",
    bank: "建设银行",
    limit: "1-36月",
    quota: "500万",
    loanBg: loanBg1,
    bank: jh_bank,
    tagList: ['北京市', '专精特新','正常经营', '信用良好'],
    browseNum: 1100,
    applyNum: 42
  },
  {
    title: "信用快贷",
    num: "3.95% ",
    bank: "建设银行",
    limit: "1-12月",
    quota: "300万",
    loanBg: loanBg1,
    bank: jh_bank,
    tagList: ['北京市', '正常经营', '信用良好'],
    browseNum: 3020,
    applyNum: 20
  },
  {
    title: "科技云贷",
    num: "4.45%",
    bank: "建设银行",
    limit: "1-12月",
    quota: "200万",
    loanBg: loanBg1,
    bank: jh_bank,
    tagList: ['北京市', '正常经营', '信用良好', '知识产权'],
    browseNum: 1240,
    applyNum: 27
  },
  {
    title: "政采云贷",
    num: "4.45%",
    bank: "建设银行",
    limit: "1-12月",
    quota: "200万",
    loanBg: loanBg1,
    bank: jh_bank,
    tagList: ['北京市', '正常经营', '信用良好', '政府采购中标通知'],
    browseNum: 3302,
    applyNum: 44
  }
];
const jsDataJron = [
{
    title: "创业担保贷",
    num: "2.2%",
    bank: "北京银行",
    limit: "1-24月",
    quota: "300万",
    loanBg: loanBg1,
    bank: bj_bank,
    tagList: ['北京市', '小微企业'],
    browseNum: 1243,
    applyNum: 14
  },
  {
    title: "科企贷",
    num: "LPR加减点",
    bank: "北京银行",
    limit: "随借随还",
    quota: "300万",
    loanBg: loanBg1,
    bank: bj_bank,
    tagList: ['石景山', '中型企业'],
    browseNum: 1243,
    applyNum: 14
  },
  {
    title: "银税贷",
    num: "LPR加减点",
    bank: "北京银行",
    limit: "随借随还",
    quota: "200万",
    loanBg: loanBg1,
    bank: bj_bank,
    tagList: ['北京市', '大型企业'],
    browseNum: 1552,
    applyNum: 34
  },
  {
    title: "融信宝",
    num: "LPR加减点",
    bank: "北京银行",
    limit: "1-24月",
    quota: "200万",
    loanBg: loanBg1,
    bank: bj_bank,
    tagList: ['北京市', '大型企业','正常经营', '信用良好'],
    browseNum: 2193,
    applyNum: 50
  },
  {
    title: "票易贷",
    num: "LPR加减点",
    bank: "北京银行",
    limit: "随借随还",
    quota: "200万",
    loanBg: loanBg1,
    bank: bj_bank,
    tagList: ['北京市', '正常经营', '信用良好'],
    browseNum: 1693,
    applyNum: 28
  }
];
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      applydialogVisible: false,
      applyMessageForm2,
      loanTail: JSON.parse(window.localStorage.getItem('loan-tail')),
      loanList: JSON.parse(window.localStorage.getItem('loan-tail')).bank.includes('bank2') ? jsDataJron : bjDataJron,
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
    ...mapGetters(["defaultAvatar", "device", "data_loandetail"]),
    headers() {
      var val = {
        Authorization: "Bearer " + getAccessToken(),
      };
      return val;
    },
  },
  created() {
      console.log('data_loandetail--------', this.data_loandetail);
  },
  watch: {
    data_loandetail: function (val, oldVal) {
      this.loanTail = val,
      this.loanList = val.bank.includes('bank2') ? jsDataJron : bjDataJron,
      console.log('data_loandetail---', val, oldVal);
    }
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
        box-shadow: -10px 10px 5px #888888;
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

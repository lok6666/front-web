<template>
  <div class="app-container">
    <app-header :nav-item-active="5" />
    <div class="finance-bg">
      <div>金融服务</div>
    </div>
    <div class="finance-container">
      <div class="select-btn">
        <div>金融机构:</div>
        <div v-for="(btn, index) in btnList" :key="index">
          <el-button
            class="button-new-tag "
            :class="[btn.isSelect ? 'button-new-tag-select' : '']"
            size="small"
            @click="select(index)"
            >{{ btn.message }}</el-button
          >
        </div>
      </div>
      <!-- <div class="select-btn">
        <div>利率范围:</div>
        <div>
          <el-input style="width: 200px; margin-left: 10px;"  placeholder="最低利率" v-model="minRate" :inline="true"></el-input>-
          <el-input style="width: 200px; margin-left: 10px;"  placeholder="最高利率" v-model="maxRate" :inline="true"></el-input>
        </div>
      </div>
      <div class="select-btn">
        <div>贷款期限:</div>
        <div>
          <el-input style="width: 200px; margin-left: 10px;"  placeholder="最低期限" v-model="minRate" :inline="true"></el-input>-
          <el-input style="width: 200px; margin-left: 10px;"  placeholder="最高期限" v-model="maxRate" :inline="true"></el-input>
        </div>
      </div>
      <div class="select-btn">
        <div>贷款额度:</div>
        <div>
          <el-input style="width: 200px; margin-left: 10px;"  placeholder="最低额度" v-model="minRate" :inline="true"></el-input>-
          <el-input style="width: 200px; margin-left: 10px;"  placeholder="最高额度" v-model="maxRate" :inline="true"></el-input>
        </div>
      </div> -->
      <Loan :loanList="loanList"/>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
// import { bjDataJron, jsDataJron } from "@/config/constant.js";
import loanBg1 from "../../images/loan-card-header1.png";
import bj_bank from "../../images/bj_bank.png";
import jh_bank from "../../images/bank2.png";
import AppHeader from "@/components/Header/index";
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
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
      minRate: '',
      maxRate: '',
      btnList: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "建设银行",
          isSelect: false,
        },
        {
          message: "北京银行",
          isSelect: false,
        }
      ],
      loanList: bjDataJron.concat(jsDataJron),
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
    };
  },
  components: {
    AppHeader,
    Loan,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  mounted() {},
  methods: {
    select(index) {
      console.log("this---------", this.btnList[index]);
    },
    detail(index) {
      this.$router.push({
        path: `/finance-detail/:${index}`
      })
    },
  },
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
  .finance-bg {
    padding-left: 73px;
    padding-bottom: 123px;
    display: flex;
    align-items: flex-end;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    height: 442px;
    background-size: cover;
    background-image: url('../../images/finance-bg.png');
  }
  @media screen and (max-width: 922px) {
    padding: 0;
    margin: 0;
  }
  .finance-container {
    max-width: 1440px;
    margin-top: 31px;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 60px;
    .select-btn {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .button-new-tag-select {
        border-radius: 5px;
        background: #D99447;
        border: 1px solid rgba(0,0,0,0);
      }
    }
  }
}
</style>

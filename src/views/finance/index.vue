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
      <div class="select-btn">
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
      </div>
      <Loan :loanList="loanList"/>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
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
import AppHeader from "@/components/Header/index";
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
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
      // Vue.set(vm.obj, propertyName, newValue);
      // this.btnList[index].isSelect = !this.btnList[index].isSelect;
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
    background-image: url('../../images/financeBg.png');
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

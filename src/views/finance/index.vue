<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <img src="../../images/financeBg.png" style="width: 100%" />
    <div class="finance-container">
      <div class="select-btn">
        <div>筛选条件:</div>
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
      <Loan :loanList="loanList"/>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import loanBg1 from "../../images/loan-card-header1.png";
import bank1 from "../../images/bank1.png";
import AppHeader from "@/components/Header/index";
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      btnList: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
        {
          message: "条件一",
          isSelect: false,
        },
      ],
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
      display: flex;
      align-items: center;
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
  }
}
</style>

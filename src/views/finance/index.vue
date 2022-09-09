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
      <div class="finance-loan">
        <div
          class="finance-loan-item"
          v-for="(loan, index) in loanList"
          :key="index"
        >
          <div
            class="item-intro"
            :style="`background-image: url(${loan.loanBg})`"
          >
            <div style="flex: 0.6;font-size: 24px;">{{ loan.title }}</div>
            <div style="font-size: 18px;font-family: AlibabaPuHuiTiR;">
              参考利率
            </div>
            <div style="font-size: 34px;">{{ loan.num }}</div>
          </div>
          <div class="item-content">
            <div class="bank">
              <div
                class="bankBg"
                :style="`background-image: url(${loan.bank})`"
              ></div>
              <div class="limit">期限:{{ loan.limit }}月</div>
            </div>
            <div
              style="height: 66px; width: 135px;display: flex;flex-direction: column;align-items: center;justify-content: center;"
            >
              额度:
              <div class="item-num">{{ loan.quota }}</div>
            </div>
            <div class="bank-detail" @click="detail(index)">查看详情</div>
          </div>
        </div>
      </div>
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
  .finance-loan {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 330px);
    grid-template-rows: repeat(1, 430px);
    .finance-loan-item {
      height: 410px;
      width: 310px;
      background: #ffffff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
      border-radius: 8px;
      .item-intro {
        height: 172px;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: AlibabaPuHuiTiB;
      }
      .item-content {
        display: flex;
        flex-direction: column;
        /* justify-content: space-around; */
        align-items: center;
        .bank {
          display: flex;
          align-items: center;
          margin-left: 10px;
          margin-right: 10px;
          border-bottom: 1px solid #979797;
          .bankBg {
            height: 58px;
            width: 142px;
          }
          .limit {
            margin-left: 20px;
          }
        }
        .item-num {
          font-size: 20px;
          font-family: AlibabaPuHuiTiR;
          color: #d0021b;
        }
        .bank-detail {
          width: 220px;
          height: 53px;
          border-radius: 50px;
          border: 2px solid #b48859;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>

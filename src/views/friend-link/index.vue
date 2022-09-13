<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <div class="trade-bg">
      <div class="trade-title">行业培训</div>
      <div class="fw-model">
        <div class="fw-model-item" v-for="(i, index) in fwList" key="index">
          <div class="title">{{ i.title }}</div>
          <span class="data">{{ i.num }}</span>
          <span class="type">{{i.type}}</span>
        </div>
      </div>
    </div>
    <div class="trade-container">
      <div class="trade-center">
      <userTable/>
      <userTable2/>
      <teacher />
      <collage />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import loanBg1 from "../../images/loan-card-header1.png";
import userTable from "./components/userTable.vue";
import userTable2 from "./components/userTable2.vue";
import collage from "@/components/guide/collage.vue";
import teacher from "./components/teacher.vue";
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
      fwList: [
        {
          title: "共有公开课程",
          num: "1888",
          type: "节",
        },
        {
          title: "定制课程",
          num: "2000",
          type: "节",
        },
        {
          title: "签约名师:",
          num: "2000",
          type: "位",
        }
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
    userTable,
    teacher,
    collage,
    userTable2,
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
        path: `/trade-detail/:${index}`
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
  .trade-bg {
    display: flex;
    justify-content: end;
    align-items: flex-start;
    flex-direction: column;
    height: 442px;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    padding-left: 78px;
    padding-bottom: 7px;
    background-size: cover;
    background-image: url('../../images/行业培训Bg.png');
    .trade-title {
      font-size: 80px;
      font-family: AlibabaPuHuiTiH;
      color: #FFFFFF;
    }
    .fw-model {
      display: flex;
      border-radius: 4px;
      .fw-model-item {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #fff;
        padding-right: 13px;
        .title {
        }
        .data {
          font-size: 40px;
          font-family: Futura-Bold, Futura;
          font-weight: bold;
          color: #fff;
          line-height: 53px;
        }
        .type {
          border-right: solid;
          padding-right: 20px;
        }
      }
    }
  }
  .trade-container {
    max-width: 1440px;
    margin-top: 31px;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 60px;
    .trade-center {
      width: 100%;
      min-width: 1298px;
    }
  }
}
</style>

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
            :class="[btn.isSelect ? 'button-new-tag-select' : 'button-new-tag-not-select']"
            size="small"
            @click="select(index)"
            >{{ btn.branchName }}</el-button
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
import {hostList} from '@/config/index'
import { mapGetters } from "vuex";
import {imgDatalogV3} from "@/utils/util.js";
import { financialServicesAll,dictionariesGetByCode } from "@/config/api.js";
import { getDictionariesGetByCode } from "@/utils/util";
import { getAccessToken } from "@/utils/auth";
import request from '@/utils/request';
import bj_bank from "../../images/bj_bank.png";
import jh_bank from "../../images/bank2.png";
import AppHeader from "@/components/Header/index.vue";
import Loan from "@/components/loan/index.vue";
import AppFooter from "@/components/footer/index.vue";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      minRate: '',
      maxRate: '',
      serviceBank: '',
      btnList: [
        {
          branchName: "全部",
          branchCode: '',
          isSelect: true,
        },
      ],
      loanList: [],
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
    };
  },
  watch: {
    $route(val) {
      this.getFinancialServicesAll();
      // getDictionariesGetByCode();
    },
  },
  components: {
    AppHeader,
    Loan,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  async created() {
    this.btnList = await getDictionariesGetByCode('finance', this.btnList);
    this.getFinancialServicesAll();
  },
  mounted() {},
  methods: {
    getFinancialServicesAll() {
      request({
        url: `${financialServicesAll}`,
        method: 'post',
        data: {
          serviceFlag: 1,
          serviceTypes: this.serviceBank,
          serviceLocation: hostList.filter(e => {
              if(window.location.hash.includes(e)) {
                  return e;
              }
          })[0].replace('#/', ''),
        }
      })
      .then((res) => {
          this.loanList = res.data.list;
      })
    },
    select(index) {
      this.btnList = this.btnList.map(e=> {
        e.isSelect = false;
        return e;
      });
      this.btnList[index].isSelect = !this.btnList[index].isSelect;
      this.serviceBank = this.btnList[index].branchCode;
/*       if(this.serviceBank.indexOf(this.btnList[index].value) > -1) {
        this.serviceBank.splice(this.serviceBank.indexOf(this.btnList[index].value), 1);
      } else {
        this.serviceBank.push(this.btnList[index].value);
      } */
      this.getFinancialServicesAll();
    },
    detail(index) {
      imgDatalogV3({
        eventCode: 'FINACE_DETAIL',
        eventName: '金融服务详情埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
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
    background-image: url('http://minio.bjwcxf.com/cultural-image/cultural-web/金融服务.png');
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
        color: #409EFF;
        background: #ecf5ff;
        border: 1px solid rgba(0,0,0,0);
      }
      .button-new-tag-not-select {
        color: rgb(96, 98, 102);
        background: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="app-container">
    <app-header :nav-item-active="6" />
    <div class="finance-bg">
      <div>楼宇信息</div>
    </div>
    <div class="finance-container">
      <div>
        <div class="select-btn">
          <div>楼宇名称:</div>
          <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="请输入" @input="changeTitle(minValue)">
            <i slot="suffix" class="el-input__icon el-icon-search" :style="'color:#D99447'"/>
          </el-input>
         <!--  <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="最低价格" @input="changePrice(minValue, 'minValue')"></el-input>-
          <el-input style="width: 200px" v-model="maxValue" placeholder="最高价格" @input="changePrice(maxValue, 'maxValue')"></el-input> -->
          <div v-for="(btn, index) in priceList" :key="index">
            <el-button
              class="button-new-tag "
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select(index)"
              >{{ btn.message }}</el-button
            >
          </div>
        </div>
      </div>
      <buildItem :loanList="loanList"/>
    </div>
    <app-footer />
  </div>
</template>

<script>
import {hostList} from '@/config/index'
import { mapGetters } from "vuex";
import { buildings } from "@/config/api.js";
import { getAccessToken } from "@/utils/auth";
import request from '@/utils/request';
import bj_bank from "../../images/bj_bank.png";
import jh_bank from "../../images/bank2.png";
import AppHeader from "@/components/Header/index";
import buildItem from "@/components/buildItem/index";
import AppFooter from "@/components/footer/index";
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
          message: "不限",
          value: '',
          isSelect: false,
        },
        {
          message: "建设银行",
          value: '建设银行',
          isSelect: false,
        },
        {
          message: "北京银行",
          value: '北京银行',
          isSelect: false,
        }
      ],
      loanList: [],
      buildingName: "",
      minValue: "",
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
    };
  },
  components: {
    AppHeader,
    buildItem,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  created() {
    this.getbuildings();
  },
  mounted() {},
  methods: {
    changeTitle(value) {
      if(this.timer1) clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        this.buildingName = value;
        this.getbuildings();
      }, 1000);    
    },
    getbuildings() {
      request({
        url: `${buildings}`,
        method: 'post',
        data: {
          buildingLocation: hostList.filter(e => {
              if(window.location.hash.includes(e)) {
                  return e;
              }
          })[0].replace('#/', ''),
          buildingName: this.buildingName
        }
      })
      .then((res) => {
          this.loanList = res.data.list;
      })
    },
    select(index) {
      this.serviceBank = this.btnList[index].value;
      this.getbuildings();
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

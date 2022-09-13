<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <div class="policy-search-bg">
      <div style="display: flex;align-items: center;">政策申报<p class="policy-search-agile">Cultural industry</p></div>
    </div>
    <div class="policy-search-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>政策申报</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="search">
        <el-input class="a" v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @keyup.enter.native="inputConfirm">
        <template slot="append">
        <div style="display: flex; align-item: center;">
        <img src="../../images/search.png" style="width: 23px; height: 23px;" />查找
        </div>
        </template>
        </el-input>
      </div>
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
      <div v-for="(item, index) in policyList" :key="index" :class="`item-${index} policy-search-container-item`">
        <div class="message">{{item.message}}</div>
        <div class="time">{{item.time}}</div>
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
      inputValue: '',
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
      policyList: [
        {
          message: "信息列表标题信息列表标题信息列表标题信息",
          time: '2022/9/1'
        },
        {
          message: "信息列表标题信息列表标题信息列表标题信息",
          time: '2022/9/1'
        },
        {
          message: "信息列表标题信息列表标题信息列表标题信息",
          time: '2022/9/1'
        },
        {
          message: "信息列表标题信息列表标题信息列表标题信息",
          time: '2022/9/1'
        },
        {
          message: "信息列表标题信息列表标题信息列表标题信息",
          time: '2022/9/1'
        }
      ]
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
        path: `/policy-search-detail/:${index}`
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
  .policy-search-bg {
    margin-top: 100px;
    padding-left: 74px;
    padding-bottom: 24px;
    display: flex;
    align-items: flex-end;
    font-size: 60px;
    font-family: Helvetica;
    color: #FFFFFF;
    width: 100%;
    height: 256px;
    background-size: cover;
    background-image: url('../../images/policysearchBg.png');
    .policy-search-agile {
        margin-left: 8px;
        font-size: 26px;
        font-family: AlibabaPuHuiTiM;
        line-height: 35px;
    }
  }
  .search {
    width: 100%;
    padding: 28px 67px 36px;
    justify-content: center;
    align-items: center;
    .a {
      .input {
        height: 42px !important;
      }
      .el-input-group__append {
        background: white;
      }
    }
  }
  .policy-search-container {
    max-width: 1440px;
    width: 100%;
    padding: 0px 70px 10px;
    .select-btn {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
    }
    &-item {
      padding-left: 21px;
      padding-right: 45px;
      //min-width: 1304px;
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    //偶数行
    &-item:nth-of-type(even) {
      background: #fff
    }
  }
}
</style>

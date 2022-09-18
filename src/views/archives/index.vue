<template>
  <div class="app-container">
    <app-header :nav-item-active="3" />
    <div class="protect-bg">
      <div>产品大厅</div>
    </div>
    <div class="search">
      <el-input class="a" v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @keyup.enter.native="inputConfirm">
       <i slot="suffix"
                  class="el-input__icon el-icon-search"
                  :style="'color:' + inputIconColor"
                  @click="search"
                  />
      </el-input>
    </div>
    <div class="finance-container">
      <div style="margin: 36px 60px;">
        <div class="select-btn">
          <div>产品类目:</div>
          <div v-for="(btn, index) in serviceList" :key="index">
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
          <div>价格范围:</div>
          <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="最低价格"></el-input>-
          <el-input style="width: 200px" v-model="maxValue" placeholder="最高价格"></el-input>
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
        <div class="select-btn">
          <div>发布时间:</div>
            <div v-for="(btn, index) in timeList" :key="index">
              <el-button
                class="button-new-tag "
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select(index)"
                >{{ btn.message }}</el-button
              >
            </div>
             <el-date-picker style="margin-left: 20px;" v-model="value2" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
        </div>
      </div>
      <protect/>
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
import protect from "./components/protect.vue";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      inputValue: '',
      categoryId: 0,
      serviceList: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "文化/互联网科技资讯",
          isSelect: false,
        },
        {
          message: "法律服务",
          isSelect: false,
        },
        {
          message: "政策资质",
          isSelect: false,
        },
        {
          message: "知识产权",
          isSelect: false,
        },
        {
          message: "工商财税",
          isSelect: false,
        }
      ],
      timeList: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "近7天",
          isSelect: false,
        },
        {
          message: "近30天",
          isSelect: false,
        },
        {
          message: "近半年",
          isSelect: false,
        },
        {
          message: "近一年",
          isSelect: false,
        }
      ]
    };
  },
  components: {
    AppHeader,
    protect,
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
  .protect-bg {
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
    background-image: url('../../images/protectBg.png');
  }
  .search {
    width: 100%;
    height: 118px;
    padding: 62px 137px;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    .a {
      .input {
        height: 42px !important;
      }
      .el-input-group__append {
        background: white;
      }
    }
  }
  .finance-container {
    max-width: 1440px;
    margin-top: 31px;
    margin-left: 70px;
    margin-right: 70px;
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
      .button-new-tag-select {
        border-radius: 5px;
        background: #D99447;
        border: 1px solid rgba(0,0,0,0);
      }
    }
  }
}
</style>

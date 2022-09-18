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
          <div>服务分类:</div>
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
          message: "政策资质",
          isSelect: false,
        },
        {
          message: "工商",
          isSelect: false,
        },
        {
          message: "审计",
          isSelect: false,
        }
      ],
      priceList: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "1-500",
          isSelect: false,
        },
        {
          message: "月计价",
          isSelect: false,
        },
        {
          message: "天计价",
          isSelect: false,
        },
        {
          message: "面议",
          isSelect: false,
        }
      ],
      timeList: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "当月",
          isSelect: false,
        },
        {
          message: "三月半",
          isSelect: false,
        },
        {
          message: "半年内",
          isSelect: false,
        },
        {
          message: "一年内",
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
    }
  }
}
</style>

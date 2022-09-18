<template>
    <div class="app-container">
      <app-header :nav-item-active="-1" />
      <div class="new-more-search-bg">
        <div style="display: flex;align-items: center;">{{message}}
        <div class="new-more-search-agile">
        <div class="limit-desc">Comperehensive platf</div>
        Cultural industry
        </div>
        </div>
      </div>
      <div class="new-more-search-container">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{message}}</el-breadcrumb-item>
      </el-breadcrumb>
        <div class="search">
          <el-input v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @keyup.enter.native="inputConfirm">
          <i slot="suffix"
                        class="el-input__icon el-icon-search"
                        :style="'color:' + inputIconColor"
                        @click="search"
                        />
          </el-input>
        </div>
        <div v-for="(item, index) in policyList" :key="index" :class="`item-${index} new-more-search-container-item`">
          <div class="message">{{item.message}}</div>
          <div class="time">{{item.time}}</div>
        </div>
        <div class="pagination-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 40, 70, 100]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100">
          </el-pagination>
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
        currentPage: 4,
        inputValue: '',
        message: this.$route.query.message,
        categoryId: 0,
        policyList: [
          {
            message: "2022年第16届动漫游戏产业发展国际论坛即将启幕",
            time: '2022/9/19'
          },
          {
            message: "2022年北京市文化企业“投贷奖”项目申报解读",
            time: '2022/9/18'
          },
          {
            message: "关于启动2022年北京市文化企业“投贷奖”项目申报工作的通知",
            time: '2022/9/17'
          },
          {
            message: "第三届“好汉杯”八达岭长城文创大赛公告",
            time: '2022/9/16'
          },
          {
            message: "领航中国·新兴产业投融资合作大会”参展报名通知",
            time: '2022/9/1'
          },
          {
            message: "新一批“国家对外文化贸易基地”开始申报",
            time: '2022/9/15'
          },
          {
            message: "炉音乐会”即将再次奏响，2022北京西山永定河文化节开幕式现场提前探访",
            time: '2022/9/14'
          },
          {
            message: "2022年度北京文化消费品牌榜征集公告",
            time: '2022/9/13'
          },
          {
            message: "关于征集2022年度北京文化消费促进行动合作单位的通知",
            time: '2022/9/12'
          },
          {
            message: "PIN行宇宙——DADA数字艺术创意大赛作品征集中",
            time: '2022/9/11'
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
      search() {
        
      },
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      select(index) {
        // Vue.set(vm.obj, propertyName, newValue);
        // this.btnList[index].isSelect = !this.btnList[index].isSelect;
        console.log("this---------", this.btnList[index]);
      },
      detail(index) {
        this.$router.push({
          path: `/new-more-search-detail/:${index}`
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
    .new-more-search-bg {
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
      .new-more-search-agile {
          margin-left: 8px;
          font-size: 26px;
          font-family: AlibabaPuHuiTiM;
          margin-left: 8px;
          .limit-desc {
              font-size: 14px;
              font-family: AlibabaPuHuiTiR;
          }
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
    .new-more-search-container {
      max-width: 1440px;
      width: 100%;
      padding: 0px 70px 10px;
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
      &-item:nth-of-type(odd) {
        background: #fff
      }
    }
    .pagination-block {
      display: flex;
      justify-content: center;
      height: 80px;
      align-items: center;
    }
  }
  </style>
  
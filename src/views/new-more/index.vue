<template>
    <div class="app-container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <app-header :nav-item-active="-1" />
      <div class="new-more-search-bg">
        <div style="display: flex;align-items: center;">{{message}}
        <div class="new-more-search-agile">
        <div class="limit-desc">Comperehensive platform</div>
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
          <el-input v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @change="inputConfirm">
          <i slot="suffix"
                        class="el-input__icon el-icon-search"
                        :style="'color:' + inputIconColor"
                        @click="search"
                        />
          </el-input>
        </div>
        <div style=" margin-bottom: 16px; width: 100%;border-bottom: 0.1px solid;padding-bottom: 10px;">共找到<span style="color: red">{{total}}</span>查询结果</div>
        <div v-for="(item, index) in contentList" :key="index" :class="`item-${index} new-more-search-container-item`" @click="detail(item)">
          <div class="message">{{item.title || item.policyTitle}}</div>
          <div class="time" v-if="item.releaseDate || item.policyTime">{{(item.releaseDate || item.policyTime).substring(0, 10)}}</div>
        </div>
        <div class="pagination-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 40, 70, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  
  <script>
  import { articleList, policyList } from "@/config/api.js";
  import request from '@/utils/request';
  import { mapGetters } from "vuex";
  import { getAccessToken } from "@/utils/auth";
  import bank1 from "../../images/bank1.png";
  import AppHeader from "@/components/Header/index";
  import AppFooter from "@/components/footer/index";
  import { updateUser, bindUsername } from "@/api/user.js";
  export default {
    name: "User",
    data() {
      return {
        pageSize: 10,
        pageNum: 1,
        total: 0,
        title: '',
        loading: true,
        policyTitle: '',
        inputValue: '',
        message: this.$route.query.message,
        contentList: [],
      };
    },
    components: {
      AppHeader,
      AppFooter,
    },
    computed: {
      ...mapGetters(["defaultAvatar", "device"]),
    },
     created() {
      this.getPolicyList();
     },
    mounted() {},
    methods: {
      inputConfirm(val) {
        this.loading = true;
        this.policyTitle = val;
        this.title = val;
        this.getPolicyList();
      },
      search() {
        
      },
      getPolicyList() {
        let that = this;
        this.contentList = this.$route.query.message === '最新新闻' ? 
        // 新闻列表
        request({
          url: `${articleList}`,
          method: 'post',
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            title: this.title,
            deleteState: 0
          }
        }).then(res => {
          that.contentList = res.data.list;
          that.total = res.data.total;
          that.loading = false;
        }) :
        //政策列表
        request({
          url: `${policyList}`,
          method: 'post',
          data: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            policyTitle: this.policyTitle
          }
        }).then(res => {
          that.contentList = res.data.list;
          that.total = res.data.total;
          that.loading = false;
        });
      },
      handleSizeChange(val) {
        this.loading = true;
      console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getPolicyList();
      },
      handleCurrentChange(val) {
        this.loading = true;
        console.log(`当前页: ${val}`);
        this.pageNum = val;
        this.getPolicyList();
      },
      detail(item) {
        this.$router.push(`${this.message === '最新新闻' ? '/new-detail' : '/policy-detail'}/:artId=${item.id}`);
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
        cursor: pointer;
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
  
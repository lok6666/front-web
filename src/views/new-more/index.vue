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
        <div style=" margin-bottom: 16px; width: 100%;border-bottom: 0.1px solid;padding-bottom: 10px;">共找到<span style="color: red">100</span>查询结果</div>
        <div v-for="(item, index) in contentList" :key="index" :class="`item-${index} new-more-search-container-item`">
          <div class="message">{{item.message}}</div>
          <div class="time">{{item.time}}</div>
        </div>
        <div class="pagination-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 40, 70, 100]"
            :page-size="10"
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
        contentList: [],
        categoryId: 0,
        newList: [{
          message: '石景山区启动开学保障执法检查 石景山园开展2022年“共产党员献爱心” 捐献活动',
          time: '2022/9/19',
          detailType: '/new-detail'
        },{
          message: '石景山区市场监管局全力做好服贸会食品和特种设备安全服务保障工作',
          time: '2022/9/18',
          detailType: '/new-detail'
        },{
          message: '金顶街街道老楼加梯',
          time: '2022/9/17',
          detailType: '/new-detail'
        },{
          message: '让居民幸福感再“梯”升',
          time: '2022/9/16',
          detailType: '/new-detail'
        },{
          message: '2021年数字经济背景下文化品牌价值提升与创新发展人才培养高级研修班成功举办',
          time: '2022/9/15',
          detailType: '/new-detail'
        },{
          message: '迎接“服贸会”，广宁街道各社区开展消防安全主题宣传活动',
          time: '2022/9/13',
          detailType: '/new-detail'
        },{
          message: '第11届北京国际网络电影展荣誉盛典在北京举办',
          time: '2022/9/11',
          detailType: '/new-detail'
        },{
          message: '市委常委、统战部部长游钧到八角街道接访下访',
          time: '2022/9/10',
          detailType: '/new-detail'
        }],
        policyList: [
          {
            message: "关于印发《石景山区继续加大中小微企业帮扶力度加快困难企业恢复发展若干措施》的通知",
            time: '2019/9/19'
          },
          {
            message: "关于印发《石景山区关于促进 “专精特新”中小企业高质量发展的若干措施》的通知",
            time: '2019/9/18'
          },
          {
            message: "关于印发《石景山区加快“新基建”促进新一代信息技术产业发展暂行办法》的通知",
            time: '2019/9/17'
          },
          {
            message: "关于印发《石景山区关于支持中小微企业应对疫情影响保持平稳发展的若干措施》的通知",
            time: '2019/9/16'
          },
          {
            message: "关于印发《石景山区关于共同应对新型冠状病毒感染的肺炎疫情支持企业发展的若干措施（暂行）》的通知",
            time: '2019/9/1'
          },
          {
            message: "政府关于印发《石景山区鼓励企业上市发展实施办法》的通知",
            time: '2019/9/15'
          },
          {
            message: "关于印发《中关村科技园区石景山园加快创新发展的支持办法》的通知",
            time: '2019/9/14'
          },
          {
            message: "石景山区促进文化创意产业发展暂行办法",
            time: '2019/9/13'
          },
          {
            message: "石景山区吸引和鼓励高层次 人才创业和工作计划实施办法(试行",
            time: '2019/9/12'
          },
          {
            message: "石景山区关于促进楼宇经济高质量发展的若干措施",
            time: '2019/9/11'
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
     created() {
       this.contentList = this.$route.query.message === '最新新闻' ? this.newList : this.policyList;
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
  
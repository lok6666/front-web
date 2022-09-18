<template>
    <div ref="container" class="home-container">
      <app-header />
      <div class="policy-search-bg"></div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;margin-left: 70px;margin-bottom: 49px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>最新新闻</el-breadcrumb-item>
          <el-breadcrumb-item>新闻动态</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="policy-container">
        <div class="side-left">
            <div class="content">
                <div class="content-header">
                    <div class="title">{{title}}</div>
                    <div class="desc">
                        <div style="flex: 0.2;">发布日期:{{time}}</div>
                        <div>来源:{{address}}</div>
                    </div>
                </div>
                <div class="content-center"><p><span style="color: rgb(47, 46, 63); font-size: 24px;">9月3日，区委书记常卫到服贸会区企指挥部检查服贸会疫情防控和服务保障工作。区委副书记、政法委书记刘海涛参加检查。</span></p><p style="text-align: center;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-16/1663299087366.jpg" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-16/1663299087366.jpg" style="width: 100%;"></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">常卫指出，今天是服贸会公众开放日首日，观展人员数量较前两日有所增长。要压紧压实各方责任，严格落实落细各项措施，全力做好服贸会疫情防控和服务保障工作，确保万无一失。 常卫强调，要严格登录厅人员进入查验，严防“北京健康宝”异常、核酸检测不符合规定的人员入内。做好服务保障人员检录，确保一人一证，不得转借、出售、私自带人出入。做好弹窗人员处理工作，保障服贸会防疫安全。各场馆要加强远端管控，做好引导疏导、人员限流，降低人员聚集风险。 要强化交通接驳，增加班车频次，宣传倡导绿色交通出行方式，缓解周边交通压力。加强停车场动态监测，推进停车资源高效利用。做好场馆周边交通保障，加强巡逻劝导。要加强场馆运行和环境保障，严格展台用电安全巡查检查，做好园区垃圾分类收集清运，加大卫生间等设施消毒消杀和清理频次，确保安全有序稳定。要优化餐饮服务，做好食品供应保障，加大抽查检查，筑牢食品安全防线。要强化会展及配套活动组织，做好招商招展和促消费工作。</span></p><p style="text-align: right;"><span style="color: rgb(47, 46, 63); font-size: 24px;">区领导迟志禹、王智勇、葛强参加检查。</span></p><p style="text-align: right;"><span style="color: rgb(47, 46, 63); font-size: 24px;">来源：文投大数据媒体中心</span></p></div>
                  <div class="relation-policy">
                    <div class="relation-policy-item" v-for="(item, index) in list" :key="index">
                      <div style="color: #8B572A;">{{item.title}}</div>
                      <div>{{item.time}}</div>
                    </div>
                  </div>
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  <script>
  import { mapGetters } from "vuex";
  import "swiper/css/swiper.css";
  import AppHeader from "@/components/Header/index";
  import AppFooter from "@/components/footer/index";
  import { pagePublishedArticle } from "@/api/article.js";
  export default {
    name: "Index",
    components: {
      AppHeader,
      AppFooter
    },
    data() {
      return {
        title: '石景山：以精准有力监督推动服贸会顺利举办',
        address: '文投大数据媒体中心',
        time: '2022-9-7',
        list: [{
          title: '石景山区启动开学保障执法检查',
          time: '2022/9/1'
        },{
          title: '石景山区启动开学保障执法检查',
          time: '2022/9/1'
        },{
          title: '石景山区启动开学保障执法检查',
          time: '2022/9/1'
        },{
          title: '石景山区启动开学保障执法检查',
          time: '2022/9/1'
        },{
          title: '石景山区启动开学保障执法检查',
          time: '2022/9/1'
        }]
      };
    },
    created() {},
    computed: {
      orderBy() {
        return this.mainActive === 0 ? "publish_time" : "view_count";
      },
      ...mapGetters(["device"]),
    },
  
    mounted() {
    },
  
    methods: {

    },
  };
  </script>
  
  <style lang="scss" scoped>
  .home-container {
    @import "~@/styles/variables";
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: -webkit-overlay;
    overflow-y: overlay;
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
    }
    @import '~@/styles/variables';
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: -webkit-overlay;
    overflow-y: overlay;
    .policy-container {
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      margin-bottom: 104px;
      max-width: $ContentContainerW;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 0px 196px;
      //top: 36px;
      @media screen and (max-width: 960px) {
        margin-top: 0;
      }
      .side-left {
        .content {
            .content-header {
                margin-bottom: 25px;
                .title {
                    font-size: 48px;
                    font-family: AlibabaPuHuiTiB;
                    color: #000000;
                    margin-bottom: 26px;
                }
                .desc {
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: AlibabaPuHuiTiR;
                  color: #2B292D;
                }
            }
            .content-center {
              padding-top: 39px;
              border-top: 1px solid #8B572A;
              border-bottom: 1px solid #8B572A;
            }
            .relation-policy {
              margin-top: 67px;
              margin-bottom: 78px;
              &-item {
                font-size: 24px;
                font-family: AlibabaPuHuiTiR;
                color: #212121;
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
            }
        }
        @media screen and (max-width: 960px) {
          width: 100%;
        }
      }
    }
  }
  </style>
  
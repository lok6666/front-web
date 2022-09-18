<template>
    <div ref="container" class="home-container">
      <app-header />
      <div class="policy-search-bg"></div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 70px; margin-top: 20px;margin-bottom: 49px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>最新政策</el-breadcrumb-item>
          <el-breadcrumb-item>政策信息</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="new-container">
        <div class="side-left">
            <div class="content">
                <div class="content-header">
                    <div class="title">{{title}}</div>
                <div class="content-center"><p><img src="http://minio.bjwcxf.com/cultural-image/2022-09-16/微信截图_20220916111246.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-16/微信截图_20220916111246.png" style=""/></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">连日来，石景山区纪委监委将服务保障服贸会各项任务落实情况作为当前最重要的任务，注重强化展会期间监督，督促主责单位以“首善标准”做好各项服务保障工作。 </span></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">为切实做到统一领导、有序监督，区纪委监委成立专项监督组，建立主要领导牵头总领、相关监督室统筹协调、各派驻（出）机构协作配合的监督机制，紧密围绕区服贸会属地筹办工作任务清单、督办事项清单，强化跟踪督办。区委常委、区纪委书记、区监委主任王晓东多次带队到首钢园展区，围绕展厅运行、疫情防控、现场秩序、交通保障等重点任务落实情况开展监督检查，确保各项任务不折不扣执行到位。</span></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">结合服贸会保障任务重、涉及单位多等特点，区纪委监委注重加强统筹协作，牢固树立“一盘棋”思想，充分发挥“室组地”联动优势，主动对接首钢集团纪委，联合相关派驻（出）机构、区商务局、区城管委、区市场监管局、区环卫中心等部门，围绕服贸会筹备、食品卫生安全、安全生产等工作，到首钢园区红线内及周边工业企业、商业设施开展实地监督检查，督促主责单位履职尽责。</span></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">区领导迟志禹、王智勇、葛强参加检查。</span></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">来源：文投大数据媒体中心</span></p></div>
                  <div class="desc">
                    <div class="desc-left">
                      <div style="font-size: 40px;color: #8B572A;flex: 0.4">政策原文</div>
                      <div class="policy-explain">政策解读</div>
                    </div>
                    <div class="desc-right">
                      <div>发文机构:{{address}}</div>
                      <div>发布日期:{{time}}</div>
                    </div>
                  </div>
                </div>
                  <div class="relation-policy">
                    <div style="font-size: 28px;font-family: AlibabaPuHuiTiM;color: #000000;;">政策关联</div>
                    <div class="relation-policy-item" v-for="(item, index) in list" :key="index">
                      <div style="color: #8B572A;">{{item.title}}</div>
                      <div>{{item.time}}</div>
                    </div>
                  </div>
                <div class="content-footer policy-opration">
                  <div style="display: flex;">
                    <div class="opration-block policy-opration-collage"><img src="../../images/policy-collage.png"/>收藏本政策</div>
                    <div class="opration-block policy-opration-share"><img src="../../images/policy-share.png"/>分享本政策</div>
                  </div>
                  <div class="opration-block policy-opration-apply"><img src="../../images/policy-apply.png"/>申报政策</div>
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
    .new-container {
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      margin-bottom: 104px;
      max-width: $ContentContainerW;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      //top: 36px;
      padding: 0px 196px;
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
            }
            .desc {
              display: flex;
              width: 100%;
              justify-content: space-between;
              &-left {
                display: flex;
                font-family: Helvetica;
                width: 100%;
                height: 62px;
                .policy-explain {
                  background-repeat: no-repeat;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-size: 100% 100%;
                  width: 262px;
                  font-size: 32px;
                  color: #FFFFFF;
                  background-image: url('../../images/poliy-explain-bg.png')
                }
              }
              &-right {
                width: 300px;
                font-size: 18px;
                font-family: AlibabaPuHuiTiR;
                color: #2B292D;
              }
            }
            .relation-policy {
              margin-top: 67px;
              margin-bottom: 78px;
              &-item {
                border-left: 2px solid #B48859;
                font-size: 24px;
                font-family: AlibabaPuHuiTiR;
                width: 100%;
                display: flex;
                justify-content: space-between;
              }
            }
            &-footer, .policy-opration {
              font-size: 24px;
              font-family: AlibabaPuHuiTiM;
              color: #FFFFFF;
              display: flex;
              justify-content: space-between;
              .opration-block {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0px 10px;
                img {
                  margin-right: 10px;
                }
              }
              &-collage {
                width: 307px;
                height: 82px;
                background: #FF6B03;
                border-radius: 20px 0px 0px 20px;
              }
              &-share {
                width: 307px;
                height: 82px;
                background: #038F6E;
                border-radius: 0px 20px 20px 0px;
              }
              &-apply {
                width: 460px;
                height: 82px;
                background: #B48859;
                border-radius: 20px;
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
  
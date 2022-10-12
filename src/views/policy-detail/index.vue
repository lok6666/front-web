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
                <div class="content-center" v-html="policyDetail.policyContent"></div>
                  <div class="desc">
                    <div class="desc-left">
                      <!-- <div style="font-size: 40px;color: #8B572A;flex: 0.4">政策原文</div>
                      <div class="policy-explain">政策解读</div> -->
                    </div>
                    <div class="desc-right">
                      <div>发文机构:{{policyDetail.policySource}}</div>
                      <div>发布日期:{{policyDetail.policyTime}}</div>
                    </div>
                  </div>
                </div>
                  <div class="relation-policy">
                    <div style="font-size: 28px;font-family: AlibabaPuHuiTiM;color: #000000;margin-bottom: 20px;">政策关联</div>
                    <div class="relation-policy-item" v-for="(item, index) in list" :key="index" @click="routeTo(item)">
                      <div style="color: #8B572A;">{{item.noticeTitle}}</div>
                      <!-- <div>{{item.storageTime}}</div> -->
                    </div>
                  </div>
                <!-- <div class="content-footer policy-opration">
                  <div style="display: flex;">
                    <div class="opration-block policy-opration-collage"><img src="../../images/policy-collage.png"/>收藏本政策</div>
                    <div class="opration-block policy-opration-share"><img src="../../images/policy-share.png"/>分享本政策</div>
                  </div>
                  <div class="opration-block policy-opration-apply" @click="applydialogVisible = true"><img src="../../images/policy-apply.png"/>申报政策</div>
                </div> -->
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  <script>
  import { applyPolicyForm } from "@/config/constant.js";
  import { policyRelationList, policyDetail } from "@/config/api.js";
  import request from '@/utils/request';
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
        policyDetail: {},
        applydialogVisible: false,
        time: '2022-9-7',
        list: []
      };
    },
    created() {
      let that = this;
      request({
        url: `${policyDetail}/${that.$route.params.artId.replace(':artId=', '')}`,
        method: 'get'
      }).then(res => {
        that.policyDetail = res.data;
        request({
          url: `${policyRelationList}`,
          method: 'post',
          data: {
            policyId: res.data.id,
            relationType: "政策解读",
          }
        }).then(res => {
          that.list = res.data.list;
        });
      });
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          let that = this;
          request({
          url: `${policyDetail}/${that.$route.params.artId.replace(':artId=', '')}`,
          method: 'get'
          }).then(res => {
            that.newDetail = res.data;
            request({
              url: `${policyRelationList}`,
              method: 'post',
              data: {
                policyId: res.data.id,
                relationType: "政策解读",
              }
            }).then(res => {
              that.list = res.data.list;
            });
        });
        },
        // 深度观察监听
        deep: true
      }
    },
    computed: {
      orderBy() {
        return this.mainActive === 0 ? "publish_time" : "view_count";
      },
      ...mapGetters(["device"]),
    },
  
    mounted() {
    },
  
    methods: {
      routeTo(item) {
        this.$router.push(`/policy-detail/:artId=${item.noticeId}`);
      }
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
                cursor: pointer;
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
  
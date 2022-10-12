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
                    <div class="title">{{newDetail.title}}</div>
                    <div class="desc">
                        <div style="flex: 0.3;">发布日期:{{newDetail.releaseDate}}</div>
                        <div>来源:{{newDetail.dataSources}}</div>
                    </div>
                </div>
                <div class="content-center" v-html="newDetail.content"></div>
                  <div class="relation-policy">
                    <div class="relation-policy-item" v-for="(item, index) in list" :key="index" @click="routeTo(item)">
                      <div style="color: #8B572A;overflow: hidden;
                          text-overflow: ellipsis;
                          display: -webkit-box;
                          -webkit-line-clamp: 1;
                          -webkit-box-orient: vertical;">
                          {{item.title}}
                      </div>
                      <div>{{new Date(item.releaseDate).getFullYear()}}-{{new Date(item.releaseDate).getMonth()}}-{{new Date(item.releaseDate).getDate()}}</div>
                    </div>
                  </div>
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  <script>
  import { policyListByRecommend, articleGet } from "@/config/api.js";
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
        newDetail: {},
        list: []
      };
    },
    created() {
      // 后期优化
      let that = this;
      request({
        url: `${articleGet}/${that.$route.params.artId.replace(':artId=', '')}`,
        method: 'get'
      }).then(res => {
        that.newDetail = res.data;
        request({
          url: `${policyListByRecommend}`,
          method: 'post',
          data: {
            releaseDate: that.newDetail.releaseDate
          }
        }).then(res => {
          that.list = res.data;
        });
      });
    },
    computed: {
      orderBy() {
        return this.mainActive === 0 ? "publish_time" : "view_count";
      },
      ...mapGetters(["device", "data_newdetail"]),
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          let that = this;
          request({
          url: `${articleGet}/${that.$route.params.artId.replace(':artId=', '')}`,
          method: 'get'
          }).then(res => {
            that.newDetail = res.data;
            request({
              url: `${policyListByRecommend}`,
              method: 'post',
              data: {
                releaseDate: that.newDetail.releaseDate
              }
            }).then(res => {
              that.list = res.data;
            });
        });
        },
        // 深度观察监听
        deep: true
      }
    },
    mounted() {
    },
  
    methods: {
      routeTo(item) {
        let that = this;
        this.$router.push(`/new-detail/:artId=${item.id}`);
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
    .policy-container {
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
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
                min-width: 1048px;
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
  
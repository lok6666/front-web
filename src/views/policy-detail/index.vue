<template>
    <div ref="container" class="home-container">
      <app-header />
      <el-dialog
          :visible.sync="applydialogVisible"
          :center="true"
          title="政策申报"
          style="overflow: scroll;"
          width="1056px"
          :lock-scroll="false"
          :before-close="closeDialog">
          <form-template
          v-if="applydialogVisible"
          style="padding: 0px 20px 20px 20px"
          :customStyle="{'margin': `0px 0px 0px 100px`}"
          @likeCountChanges="likeCountChanges(isExist?  policyApplyUpdateOne : policyApplyInsert, 'POST', $event)"
          @closeDialog="closeDialog"
          :labelWidth="160"
          :formConfig="applyForm"
          :disabled="false"
          :showBtn="true"
          /> 
          <!-- <iframe style="width: 100%; height: 1000px;border: none;" src="https://wwo.wps.cn/office/w/2c9ebac580c36fc50183ca284d771141?_w_userid=3&_w_filetype=db&_w_filepath=%E7%A9%BA%E6%96%87%E6%A1%A3.docx&_w_appid=5b8f173bd752464d81b7aa78001c697f&_w_redirectkey=123456&_w_signature=enR248IrgRS1JbWCRfwDC3IDJJA%3D" /> -->
      </el-dialog>
      <div class="policy-search-bg"></div>
      <div class="new-container">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 70px; margin-top: 20px;margin-bottom: 49px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/policy-search' }">最新政策</el-breadcrumb-item>
          <el-breadcrumb-item>政策信息</el-breadcrumb-item>
      </el-breadcrumb>
        <div class="side-left">
            <div class="content">
                <div class="content-header">
                  <div class="content-footer policy-opration" style="float: right;padding-right: 20px;">
                  <!-- <div style="display: flex;">
                    <div class="opration-block policy-opration-collage"><img src="../../images/policy-collage.png"/>收藏本政策</div>
                    <div class="opration-block policy-opration-share"><img src="../../images/policy-share.png"/>分享本政策</div>
                  </div> -->
        <!--           <div 
                  v-if="$route.params.artId.replace(':artId=', '') === '11611'"
                  style="font-size: 14px;display: flex;align-items: center;justify-content: center;width: 100px;height: 40px;background: #B48859;border-radius: 10px;" @click="applyPolicy()">
                  <img style="width: 10px;height:10px;" src="../../images/policy-apply.png"/>
                  申报政策</div> -->
                </div> 
                <div class="title">{{policyDetail.policyTitle}}</div>
                <div style="margin-bottom: 20px;float: right;width: 100%;display: flex;justify-content: space-between;padding-right: 30px;"><span>发文机构:{{policyDetail.policySource}}</span>
                    <span>发布日期:{{policyDetail.policyTime.substring(0, 10)}}</span>
                </div>
                <div class="content-center" v-html="policyDetail.policyContent.replace('扫一扫在手机打开当前页', '')"></div>
                  <div class="desc">
                    <div class="desc-left">
                      <!-- <div style="font-size: 40px;color: #8B572A;flex: 0.4">政策原文</div>
                      <div class="policy-explain">政策解读</div> -->
                    </div>
         <!--            <div class="desc-right">
                      <div>发文机构:{{policyDetail.policySource}}</div>
                      <div>发布日期:{{policyDetail.policyTime}}</div>
                    </div> -->
                  </div>
                </div>
                  <div class="relation-policy" v-if="list.length">
                    <div style="font-size: 28px;font-family: AlibabaPuHuiTiM;color: #000000;margin-bottom: 20px;">政策关联</div>
                    <div class="relation-policy-item" v-for="(item, index) in list" :key="index" @click="routeTo(item)">
                      <div style="color: #8B572A;">{{item.noticeTitle}}</div>
                      <!-- <div>{{item.storageTime}}</div> -->
                    </div>
                  </div>
                  <div class="content-footer policy-opration">
                  <!-- <div style="display: flex;">
                    <div class="opration-block policy-opration-collage"><img src="../../images/policy-collage.png"/>收藏本政策</div>
                    <div class="opration-block policy-opration-share"><img src="../../images/policy-share.png"/>分享本政策</div>
                  </div> -->
                  <!-- <div 
                  v-if="$route.params.artId.replace(':artId=', '') === '11611'"
                  class="opration-block policy-opration-apply" @click="applyPolicy()"><img src="../../images/policy-apply.png"/>申报政策</div> -->
                </div> 
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  <script>
  import { MessageBox, Message } from 'element-ui'
  import { applyPolicyForm, applyForm } from "@/config/constant.js";
  import { policyRelationList, policyDetail,policyApplyById,policyApplyUpdateOne,policyApplyInsert } from "@/config/api.js";
  import request from '@/utils/request';
  import { mapGetters } from "vuex";
  import "swiper/css/swiper.css";
  import FormTemplate from "./priceForm.vue";
  import AppHeader from "@/components/Header/index";
  import AppFooter from "@/components/footer/index";
  import { pagePublishedArticle } from "@/api/article.js";
  export default {
    name: "Index",
    components: {
      AppHeader,
      AppFooter,
      FormTemplate
    },
    data() {
      return {
        policyDetail: {},
        applydialogVisible: false,
        policyApplyUpdateOne,
        policyApplyInsert,
        time: '2022-9-7',
        list: [],
        applyForm,
        userid: window.localStorage.getItem('USERID'),
        isExist: false,
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
      closeDialog(done) {
        this.applydialogVisible = false;
        done();
      },
      likeCountChanges(url, method = 'POST', formData) {
        request({
          url: `${url}`,
          method,
          // todo 考虑 id怎么传进去
          data: {
            id: this.primaryId,
            companyid: this.userid,
            policyId: this.$route.params.artId.replace(':artId=', ''),
            policyName: this.policyDetail.policyTitle,
            companyName: JSON.parse(window.localStorage.getItem('userinfo')).entName,
            ...formData,
            policyFile: JSON.stringify(formData.policyFile),

          }
        }).then(res => {
          Message({
              message: '提交成功',
              type: 'success',
              duration: 5 * 1000
            });
            this.applydialogVisible = false;
        });
      },
      routeTo(item) {
        this.$router.push(`/policy-detail/:artId=${item.noticeId}`);
      },
      applyPolicy() {
        let that = this;
        request({
          url: `${policyApplyById}`,
          method: 'get',
          params: {
            companyid: this.userid,
            policyId: that.$route.params.artId.replace(':artId=', '')
          }
        }).then(res => {
           this.applyForm = this.applyForm.map(el => {
             if(JSON.parse(res.data.policyFile)[el.prop]) {
               el[el.prop] = JSON.parse(res.data.policyFile)[el.prop]
             };
            return el;
           });
          this.primaryId = res.data.id;
          this.applydialogVisible = true;
          this.isExist = res.data.id !== '';
        });
      }
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .home-container {
    @import "~@/styles/variables";
    width: 100%;
    height: 100vh;
    overflow-x: overlay;
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
    overflow-x: overlay;
    overflow-y: -webkit-overlay;
    overflow-y: overlay;
    .new-container {
      // background: #fff;
      // width: 100%;
      // box-sizing: border-box;
      // margin: 0 auto;
      // margin-bottom: 104px;
      // max-width: $ContentContainerW;
      // position: relative;
      // display: flex;
      // align-items: flex-start;
      // justify-content: center;
      //top: 36px;
      padding: 0px 196px;
      @media screen and (max-width: 960px) {
        margin-top: 0;
      }
      .side-left {
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        margin-bottom: 104px;
        max-width: $ContentContainerW;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 0px 106px;
        .content {
            .content-header {
                // margin-bottom: 25px;
                .title {
                    text-align: center;
                    font-size: 36px;
                    font-family: AlibabaPuHuiTiB;
                    color: #000000;
                    margin-top: 30px;
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
              justify-content: center;
              margin-bottom: 10px;
              .opration-block {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 0px 10px;
                img {
            /*       width:10px;
                  height: 10px; */
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
  
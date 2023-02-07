<template>
    <div ref="container" class="home-container" style="background: #fff;">
      <app-header />
      <el-dialog
          :visible.sync="applydialogVisible"
          :center="true"
          title="活动报名"
          width="880px"
          :before-close="closeDialog">
          <form-template
          v-if="applydialogVisible"
          style="padding: 0px 20px 20px 20px;"
          :customStyle="{display: 'grid', 'grid-template-columns': '380px 380px','margin': `0px 0px 0px 30px`}"
          @likeCountChanges="likeCountChanges(applyId, $event)"
          :labelWidth="140"
          :formConfig="activtyForm"
          @closeDialog="closeDialog"
          :showBtn="true"
          :disabled="false"/> 
        </el-dialog>
      <div class="policy-search-bg">活动详情</div>
<!--       <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;margin-left: 70px;margin-bottom: 49px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="collage-container">
        <div class="side-left">
            <div class="left">
                <div class="teacher-name">
                  <!-- <img src="../../images/avatar.png" style="width: 100px; height: 100px;margin-bottom: 23px;"/> -->
                  <div class="collage-title" v-cloak>
                    {{data_collagedetail.activityName}}
                  </div>
                  <div style="border: 1px solid #ccc;border-radius: 16px;display:flex;flex-direction:column">
                    <div style="display:flex;flex-direction:row;padding:20px;">
                      <img :src="data_collagedetail.activityThumbnail" style="width: 300px;margin-right: 10px;"/>
                      <div class="collage-message">
                        <div v-cloak>活动地点:{{data_collagedetail.activityAddress}}</div>  
                        <div v-if="data_collagedetail.activityDateTo" v-cloak>活动日期:{{data_collagedetail.activityDateFrom.substring(0, 10)}} 至 {{data_collagedetail.activityDateTo.substring(0, 10)}}</div>
                        <div v-if="data_collagedetail.activityDateFrom" v-cloak>活动时间:{{data_collagedetail.activityDateFrom.substring(11, 16)}}</div>   
                        <div v-cloak>联系人:{{data_collagedetail.contactPerson}}</div>
                        <div v-cloak>联系电话:{{data_collagedetail.contactPhone}}</div>   
                      </div>
                      <div class="block1" style="color: #fff;">
                        <div class="apply-num" style="display: flex;">
                            <div style="font-size: 18px;font-family: AlibabaPuHuiTiM;color: #000000;">报名人数/总数</div>
                            <div class="apply-count">{{data_collagedetail.applyNum}}/{{data_collagedetail.activityNum}}</div>
                        </div>         
                        <div class="block" @click.stop="applyAcitivty(data_collagedetail.id)">立即报名</div>               
                      </div>
                    </div>
                    <div class="collage-desc" style="padding: 0 20px">{{data_collagedetail.activityAbstract}}</div>     
                  </div>
                      
                </div>
                <!-- <div class="teacher-desc">文化赋能</div> -->
                <!-- <div class="block"><img src="../../images/basic-location-black.png"/>定位</div> -->
            </div>
            <div class="content">
                <h3>活动介绍</h3>
                <div class="content-center" v-html="data_collagedetail.activityContent"></div>
            </div>
            <div class="right">
                <h3>活动地点</h3>
                <!-- <img :src="data_collagedetail.activityImg" style="width: 380px; height: 456px;"/> -->
                <baidu-map class="map" :center="center" :zoom="15">
                  <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                  <bm-marker :icon="{url: 'http://minio.bjwcxf.com/cultural-image/cultural-web/map-marker.png', size: {width: 32, height: 32}}" :position="center" :dragging="true" @click="infoWindowOpen" :scroll-wheel-zoom="true">
                    <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
                      <div style="font-size: 12px;font-family: AlibabaPuHuiTiM;">
                        <div>活动名称:{{data_collagedetail.activityName}}</div>
                      </br>
                        <div>活动地点:{{data_collagedetail.activityAddress}}</div>
                      </br>
                        <div style="width: 288px;" v-if="data_collagedetail.activityDateFrom">活动时间: {{data_collagedetail.activityDateFrom.substring(0, 16)}} 至 {{data_collagedetail.activityDateTo.substring(0, 16)}}</div>
                    </div>
                    </bm-info-window>
                  </bm-marker>
                </baidu-map>
            </div> 
        </div>
      </div>

      <app-footer />
    </div>
  </template>
  <script>
  import { MessageBox, Message } from 'element-ui'
  import { mapGetters } from "vuex";
  import "swiper/css/swiper.css";
  import 'vue-bmap-gl/dist/style.css'
  import AppHeader from "@/components/Header/index";
  import FormTemplate from "@/components/Form/index.vue";
  import request from '@/utils/request';
  import { activtyForm } from "@/config/constant.js";
  import { actionAll, activityApplyAddOne, actionGetById, locatiion } from "@/config/api.js";
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
        show: true,
        loading: true,
        center: {},
        companyid: window.localStorage.getItem('USERID'),
        activtyForm,
        applyId: null,
        applydialogVisible: false,
        data_collagedetail: {},
        time: '2022-9-7',
        list: [{
        title: '石景山区启动开学保障执法检查 石景山园开展2022年“共产党员献爱心” 捐献活动',
        time: '2022/9/19',
        detailType: '/new-detail'
      },{
        title: '让居民幸福感再“梯”升',
        time: '2022/9/16',
      },{
        title: '2021年数字经济背景下文化品牌价值提升与创新发展人才培养高级研修班成功举办',
        time: '2022/9/15'
      },{
        title: '迎接“服贸会”，广宁街道各社区开展消防安全主题宣传活动',
        time: '2022/9/13'
      },{
        title: '第11届北京国际网络电影展荣誉盛典在北京举办',
        time: '2022/9/11'
      }]
      };
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
          let that = this;
          that.data_collagedetail = [];
          request({
            url: `${actionGetById}/${this.$route.params.collageId.replace(':collageId=', '')}`,
            method: 'get',
            data: {}
          })
          .then((res) => {
            that.loading = true;
            that.data_collagedetail = res.data;
            this.getlocation(res.data.activityAddress);
          });
        },
        // 深度观察监听
        deep: true
      }
    },
    created() {
      let that = this;
      request({
        url: `${actionGetById}/${this.$route.params.collageId.replace(':collageId=', '')}`,
        method: 'get',
        data: {}
      })
      .then((res) => {
        that.data_collagedetail = res.data;
        this.getlocation(res.data.activityAddress);
      });
    },
    computed: {
      orderBy() {
        return this.mainActive === 0 ? "publish_time" : "view_count";
      },
      ...mapGetters(["device"]),
    },
    computed: {
        ...mapGetters([""]),
    },
    methods: {
      getlocation(address) {
        /* let that = this;
        window.handleResponse = function(response){
            that.center = response.result.location;
            console.log('The responsed data is: ', response);
        }
        var script = document.createElement('script');
        script.src = `https://api.map.baidu.com/geocoding/v3/?output=json&ak=wG6VDtVecU2vdgXQmNIswVrNHnl3oKNv&address=${address}&callback=handleResponse`;
        document.body.insertBefore(script, document.body.firstChild); */
        request({
          url: `${locatiion}/${address}`,
          method: 'get',
          data: {}
        })
        .then((res) => {
          this.center = res.data;
        });
      },
      infoWindowClose () {
        this.show = false
      },
      infoWindowOpen () {
        this.show = true
      },
      closeDialog(done) {
        this.applydialogVisible = false;
      },
      applyAcitivty(id) {
        let userinfo = window.localStorage.getItem('userinfo');
        !userinfo && this.$store.commit('login/CHANGE_VISIBLE', true);
        if(userinfo) {
          this.applyId = id;
          this.applydialogVisible = true;
        };
      },
      likeCountChanges(id, formData) {
      request({
        url: `${activityApplyAddOne}`,
        method: 'post',
        data: {
          act_id: id,
          companyid: this.companyid,
          ...formData
        }
      }).then((res) => {
        // todo 修改后台返回字段
        if(res.code === '2001') {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          });
        } else {
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          });
          this.activtyForm = this.activtyForm.map((e, b) => {
            let result = { ...e };  
            delete result[e.prop];
            return result;
          });
          this.applydialogVisible = false;
        }
        });
    },
    }
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
    [v-cloak] {
        display: none !important;
    }
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
    .collage-container {
      background: #fff;
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      // margin-bottom: 104px;
      max-width: $ContentContainerW;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 0px 196px;
      margin-bottom: 10px;
      //top: 36px;
      @media screen and (max-width: 960px) {
        margin-top: 0;
      }
      .side-left {
        // display: flex;
        .left {
          .block1 {
            position: relative;
            top: 72px;
            right: -215px;       
            flex-direction: revert;
            float: right;
            font-size: 14px;
            flex-direction: revert;
            .block {
              cursor: pointer;
              width: 116px;
              height: 40px;
              background: #B48859;
              color:　#fff !important;
              // border: 2px solid #8B572A;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .apply-num {
              margin-bottom: 19px;
              margin-top: -23px;
              font-family: AlibabaPuHuiTiM;
              font-size: 18px;
              color: #B48859;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .apply-count {
                color: #B48859;
                display: flex;
              }
            }
            margin-left: 20px;
          }
          .collage-title {
            display: flex;
            align-items: center;
            font-size: 60px;
            font-family: YouSheBiaoTiHei;
            color: #B48859;
            line-height: 78px;
          }
          .collage-message {
            font-family: AlibabaPuHuiTiM;
            color: #B48859;
            line-height: 27px;
            margin-bottom: 10px;
            font-size: 18px;display: flex;flex-direction: column;justify-content: space-around;
          }
          .collage-desc {
            // width: 290px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiM;
            color: #B48859;
            line-height: 27px;
            margin-bottom: 10px;
/*             overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical; */
          }
          padding-top: 36px;
          // width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .teacher-name {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 20px;
          }
/*           .teacher-desc {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            margin-bottom: 67px;
          } */
        }
        .content {
          border: 1px solid #ccc;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          // width: 640px;
          &-center {
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
          }
        }
        .right {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          padding-bottom: 20px;
          margin: 20px 0px 20px;
          border: 1px solid #ccc;
          border-radius: 16px;
          .map {
            width: 1020px;
            height: 500px;
          }
          .teacher-time {
            font-size: 14px;
            font-family: AlibabaPuHuiTiM;
/*             display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 10px;
            font-family: AlibabaPuHuiTiM;
            color: #000000;
            line-height: 47px;
            margin-bottom: 45px; */
          }
        }
        @media screen and (max-width: 960px) {
          width: 100%;
        }
      }
    }
  }
  </style>
  
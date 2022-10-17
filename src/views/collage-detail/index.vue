<template>
    <div ref="container" class="home-container">
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
      <div class="policy-search-bg">课程详情</div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;margin-left: 70px;margin-bottom: 49px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="collage-container">
        <div class="side-left">
            <div class="left">
                <div class="teacher-name">
                  <img src="../../images/avatar.png" style="width: 100px; height: 100px;margin-bottom: 23px;"/>
                  {{data_collagedetail.activityName}}
                </div>
                <!-- <div class="teacher-desc">文化赋能</div> -->
                <div class="teacher-time">
                  <div style="font-size: 46px;font-family: AlibabaPuHuiTiM;">{{data_collagedetail.xs}}</div>
                  <div>{{data_collagedetail.activityDateFrom}}</div>
                </div>
                <div class="block"><img src="../../images/basic-location-black.png"/>定位</div>
                <div class="block" @click.stop="applyAcitivty(data_collagedetail.id)"><img src="../../images/apply.png"/>报名</div>
            </div>
            <div class="content">
                <div class="content-center" v-html="data_collagedetail.activityContent"></div>
            </div>
            <div class="right">
                <div class="collage-title">培训课程</div>
                <div class="collage-desc">{{data_collagedetail.activityAbstract}}</div>
                <img :src="data_collagedetail.activityImg" style="width: 380px; height: 456px;"/>
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
  import FormTemplate from "@/components/Form/index.vue";
  import request from '@/utils/request';
  import { activtyForm } from "@/config/constant.js";
  import { actionAll, activityApplyAddOne, actionGetById } from "@/config/api.js";
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
    created() {
      let that = this;
      request({
        url: `${actionGetById}/${this.$route.params.collageId.replace(':collageId=', '')}`,
        method: 'get',
        data: {}
      })
      .then((res) => {
        that.data_collagedetail = res.data;
      })
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
      closeDialog(done) {
        this.applydialogVisible = false;
      },
      applyAcitivty(id) {
        this.applyId = id;
        this.applydialogVisible = true;
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
        })
      this.applydialogVisible = false;
    },
    }
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
    .collage-container {
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
      //top: 36px;
      @media screen and (max-width: 960px) {
        margin-top: 0;
      }
      .side-left {
        display: flex;
        .left {
          padding-top: 36px;
          width: 200px;
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
          .teacher-time {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-family: AlibabaPuHuiTiM;
            color: #000000;
            line-height: 47px;
            margin-bottom: 45px;
          }
          .block {
            width: 147px;
            height: 116px;
            background: #FFFFFF;
            border: 2px solid #8B572A;
            display: flex;
            justify-content: center;
            align-items: center;           
            flex-direction: column;
            margin-bottom: 60px;
          }
        }
        .content {
          width: 640px;
          &-center {
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
          }
        }
        .right {
          margin-left: 16px;
          .collage-title {
            font-size: 60px;
            font-family: YouSheBiaoTiHei;
            color: #B48859;
            line-height: 78px;
          }
          .collage-desc {
            width: 290px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiM;
            color: #B48859;
            line-height: 27px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        @media screen and (max-width: 960px) {
          width: 100%;
        }
      }
    }
  }
  </style>
  
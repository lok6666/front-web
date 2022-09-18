<template>
  <div ref="container" class="home-container">
    <app-header />
    <div class="protect-detail-bg">国内商标注册业务</div>
    <div class="policy-container">
      <div class="side-left">
        <div class="protect-block">
          <div class="title">
            <div>商标是重要的无形资产</div>
            <div>可以帮助企业</div>
          </div>
          <div class="protect-show">
            <div v-for="(item, index) in list" :key="index">
              <div :class="`protect-show-block img-bg-${index}`"></div>
              <div class="protect-message">{{item.message}}</div>
            </div>
          </div>
          <div class="protect--big-show">
            <div :class="`protect-show-block`"></div>
            <div class="protect-message">打造知名品牌，积累知名度，使企业维持商品备份</div>
          </div>
        </div>
        <div class="protect-regist">
          <div class="title">
            <div>商标注册相关问题</div>
          </div>
          <div class="protect-regist-show">
            <div v-for="(item, index) in list" :key="index">
              <div :class="`protect-show-block img-bg-${index}`"></div>
            </div>
          </div>
        </div>
        <div class="protect-regist-process">
          <div class="title">
            <div>商标注册流程:</div>
          </div>
          <div class="protect-regist-process-bg">
          </div>
        </div>
        <div class="protect-apply">
          <div class="title">
            <div>双享商标注册：商标注册不成功，免费再注册</div>
          </div>
          <div class="protect-apply-btn">
            申请服务
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
      list: [{
        message: '⼊驻天猫京东等电商⽹站必须要有商标资质'
      },{
        message: '开通微信、微博认证时必备'
      },{
        message: '区分商品和服务的来源， 防⽌名称被他⼈使'
      },{
        message: '可通过交易变现获得财富'
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
  .protect-detail-bg {
      margin-top: 100px;
      padding-left: 74px;
      padding-bottom: 24px;
      display: flex;
      align-items: flex-end;
      font-size: 56px;
      font-family: AlibabaPuHuiTiR;
      color: #FFFFFF;
      width: 100%;
      height: 422px;
      background-size: cover;
      background-image: url('../../images/protect-detail-bg.png');
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
    //top: 36px;
    @media screen and (max-width: 960px) {
      margin-top: 0;
    }
    .side-left {
      .protect-block {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
        .title {
          height: 201px;
          font-size: 36px;
          font-family: AlibabaPuHuiTiB;
          color: #2B292D;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
        }
        .protect-show {
          display: grid;
          grid-template-columns: 50% 50%;
          grid-gap: 20px 10px;
          .protect-show-block {
            width: 608px;
            height: 230px;
          }
          .img-bg-0 {
            background-image: url('../../images/protect-0-bg.png');
          }
          .img-bg-1 {
            background-image: url('../../images/protect-1-bg.png');
          }
          .img-bg-2 {
            background-image: url('../../images/protect-2-bg.png');
          }
          .img-bg-3 {
            background-image: url('../../images/protect-3-bg.png');
          }
          .protect-message {
            height: 155px;
            width: 608px;
            font-size: 30px;
            font-family: AlibabaPuHuiTiM;
            color: #2C3241;
            line-height: 34px;
            background: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .protect-regist {
          
          .protect-regist-show {
            display: flex;
          }
          .protect-show-block {
            width: 325px;
            height: 525px;
            margin-right: 10px;
          }
          .img-bg-0 {
            background-image: url('../../images/regist-0-bg.png');
          }
          .img-bg-1 {
            background-image: url('../../images/regist-1-bg.png');
          }
          .img-bg-2 {
            background-image: url('../../images/regist-2-bg.png');
          }
          .img-bg-3 {
            background-image: url('../../images/regist-3-bg.png');
          }
        }
        .protect-regist-process {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 91px;
          &-bg {
            height: 376px;
            width: 1030px;
            background-image: url('../../images/商标注册流程.png');
          }
        }
        .protect--big-show {
          .protect-show-block {
            width: 1232px;
            height: 226px;
            background-image: url('../../images/protect-big-show.png');
          }
          .protect-message {
            background: #FFFFFF;
            font-size: 36px;
            font-family: AlibabaPuHuiTiB;
            color: #2B292D;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
        }
        .protect-apply {
          display: flex;
          flex-direction: column;
          /* justify-content: center; */
          align-items: center;
          .title {
            height: 44px;
            font-size: 16px;
            font-family: AlibabaPuHuiTiR;
            color: #8B8B8B;
            line-height: 22px;
          }
          .protect-apply-btn {
            width: 460px;
            height: 82px;
            background: #B48859;
            border-radius: 20px;
            font-size: 24px;
            font-family: AlibabaPuHuiTiM;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      @media screen and (max-width: 960px) {
        width: 100%;
      }
    }
  }
}
</style>

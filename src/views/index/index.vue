<template>
  <div ref="container" class="home-container">
    <app-header :nav-item-active="0"/>
    <div class="content-container">
      <div class="side-left">
        <div style="height: 601px;">
            <swiper class="swiper" :options="swiperOption">
              <swiper-slide
              v-for="(item, index) in swiperConfig"
              v-bind:class="`swiper-slide-${index}`"
              :key="index"
              ></swiper-slide>
              <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
            </swiper>
        </div>
        <new/>
        <policy-enter/>
        <!-- <policyMatch /> -->
        <busniess-service />
        <industrial />
        <sjs-industrial />
        <ExcellentBusniess />
        <bank />
      </div>

      <div v-if="false" class="content-right-side-container">
        <right-side-about />
        <right-side-tags />
        <right-side-comment />
        <right-side-recommend />
        <right-side-section />
      </div>
    </div>
    <app-footer />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { swiperConfig } from '@/config/index'
import 'swiper/css/swiper.css'
import AppHeader from '@/components/Header/index'
import AppFooter from '@/components/footer/index'
import ArticleList from '@/components/ArticleList'
import Advantage from '@/components/Advantage'
import New from '@/components/new/index.vue'
import PolicyMatch from '@/components/guide/PolicyMatch.vue'
import sjsIndustrial from '@/components/guide/sjsIndustrial.vue'
import policyEnter from '@/components/guide/policyEnter.vue'
import busniessService from '@/components/guide/busniessService.vue'
import ExcellentBusniess from '@/components/guide/ExcellentBusniess.vue'
import industrial from '@/components/guide/industrial.vue'
import RightSideAbout from './components/RightSideAbout'
import RightSideTags from './components/RightSideTags'
import RightSideComment from './components/RightSideComment'
import RightSideRecommend from './components/RightSideRecommend'
import RightSideSection from './components/RightSideSection'
import { pagePublishedArticle } from '@/api/article.js'
export default {
  name: 'Index',
  components: {
    AppHeader,
    AppFooter,
    ArticleList,
    policyEnter,
    PolicyMatch,
    sjsIndustrial,
    busniessService,
    ExcellentBusniess,
    industrial,
    New,
    Swiper,
    SwiperSlide,
    Advantage,
    RightSideAbout,
    RightSideTags,
    RightSideComment,
    RightSideRecommend,
    RightSideSection
  },
  data() {
    return {
      current: 1,
      size: 6,
      total: 0,
      mainActive: 0,
      loading: false,
      swiperConfig,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet(index, className) {
            return `<span class="${className} swiper-pagination-bullet-custom" style="color: red;"></span>`
          }
        }
      }
    }
  },
  created() {
  },
  computed: {
    orderBy() {
      return this.mainActive === 0 ? 'publish_time' : 'view_count'
    },
    ...mapGetters([
      'device'
    ])
  },

  mounted() {
    // this.getArtList()
  },

  methods: {
    pagination() {
      return {
        clickable: true,
        renderBullet: (index, className) => `<span style="color: red;">' + (${index} + 1) + "</span>`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .thumb-example {
    height: 480px;
    background-color: black;
  }
  .test {
    .swiper {
      .swiper-slide {
        background-size: cover;
        background-position: center;

        &.slide-1 {
          background-image:url('../../images/swiper.png');
        }
        &.slide-2 {
          background-image:url('../../images/swiper1.png');
        }
        &.slide-3 {
          background-image:url('../../images/swiper2.png');
        }
        &.slide-4 {
          background-image:url('../../images/swiper3.png');
        }
        &.slide-5 {
          background-image:url('../../images/swiper.png');
        }
      }
    }
  }
  .swiper {
    height: 601px;
    width: 100%;
    max-width: 1440px;
    .swiper-slide {
      width: 100% !important;
      height: 601px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: 700;
      font-size: 36.4px;
      background-color: #fff !important;
      background-position: center !important;
      background-repeat:no-repeat !important;
      background-size: cover;
    }
    .swiper-slide-0 {
      background-image: url("../../images/swiper.png");
    }
    .swiper-slide-1 {
      background-image: url("../../images/swiper1.png");
    }
    .swiper-slide-2 {
      background-image: url("../../images/swiper2.png");
    }
    .swiper-slide-3 {
      background-image: url("../../images/swiper3.png");
    }
    /deep/ .swiper-pagination-bullet-custom {
      @import '~@/styles/word';
      width: 88px;
      height: 5px;
      background: #FFFFFF;
      border-radius: 3px;
      opacity: 0.49;
      text-align: center;
      color: $textColor;
      opacity: 0.7;
      background: rgba($textColor, 0.2);
      transition: all $transitionTimeNormal;

      &:hover {
        opacity: 1;
      }

      &.swiper-pagination-bullet-active {
        opacity: 1;
        color: $white;
        background: #007aff;
      }
    }
  }
  @import '~@/styles/variables';
	width: 100%;
  height: 100vh;
	overflow-x: overlay;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;

  .content-container {
    width: 100%;
    padding-top: 93px; // 轮播图
    max-width: $ContentContainerW;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    display: flex;
    color: #909090;
    align-items: flex-start;
    //top: 36px;
    @media screen and (max-width: 960px){
      margin-top: 0;
    }

    .side-left {
      flex: 1;
      border-radius: 2px;

      @media screen and (max-width: 960px){
        width: 100%;
      }

      .list-header {
        margin: 0;
        box-sizing: border-box;
        padding: 15px 12px;
        display: flex;
        align-items: center;
        font-size: 14px;
        border-bottom: 1px solid hsla(0,0%,59.2%,.1);

        .list-header-item {
          list-style: none;
          padding: 0 15px;
          border-right: 1px solid hsla(0,0%,59.2%,.2);
          cursor: pointer;

          &:last-child {
            border-right: none;
          }

          &:hover {
            color: #007fff;
          }
        }

        .main-active {
          color: #007fff;
        }
      }

      .el-pagination {
        padding: 30px;
        text-align: center;
        background: #eee;
      }
    }

    .content-right-side-container {
      width: $ContentRightSideW;
      box-sizing: border-box;
      margin-left: 20px;
      font-size: 14px;
      position: relative;

      @media screen and (max-width: 960px){
        display: none;
      }
    }
  }
}
</style>

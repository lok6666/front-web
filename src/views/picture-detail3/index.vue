<template>
  <div ref="container" class="home-container">
    <app-header />
    <div class="protect-bg">
      <div>showPictureDetail3</div>
    </div>
    <div class="content-container">
      <div class="side-left">
        <swiper
          class="swiper gallery-top"
          :options="swiperOptionTop"
          ref="swiperTop"
        >
          <swiper-slide
            v-for="(item, index) in swiperConfig2"
            v-bind:class="`swiper-slide-${index}`"
            :key="index"
          >
            <div>
              <video
                ref="video"
                class="video-js vjs-default-skin vjs-big-play-centered"
                style="height: 644px; max-height: 1300px; width: 100%"
                :poster="item.poster"
                controls
              >
                <source
                  :src="item.videoSrc"
                  type="video/mp4"
                />
              </video>
              <div class="video-desc">
                {{item.videoDesc}}
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <swiper
          class="swiper gallery-thumbs"
          :options="swiperOptionThumbs"
          ref="swiperThumbs"
        >
          <swiper-slide v-for="(item, index) in swiperConfig2"  :key="index">
            <div v-bind:class="`swiper-bg swiper-slide-${index}`" :style="`background-image: url(${item.poster})`"></div>
            <div class="swiper-desc">{{item.desc}}</div>
          </swiper-slide>
        </swiper>
      </div>
      <imgEl :excellentBusniessList="excellentBusniessList"/>
    </div>
    <app-footer />
  </div>
</template>
<script>
import { swiperConfig2 } from "@/config/index";
import imgEl from "@/components/guide/img.vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import AppHeader from "@/components/Header/index.vue";
import AppFooter from "@/components/footer/index.vue";
import { pagePublishedArticle } from "@/api/article.js";
export default {
  name: "Index",
  components: {
    AppHeader,
    AppFooter,
    imgEl,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      player: null,
      swiperConfig2,
      excellentBusniessList: [{
        excellentBusniessName: '租赁部',
        bg: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00228-773.jpg'
      },
      {
        excellentBusniessName: '冬奥会',
        bg: 'https://img1.baidu.com/it/u=4080935398,2327224438&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500'
      },
      {
        excellentBusniessName: '三高炉',
        bg: "https://img2.baidu.com/it/u=2098021062,2407661013&fm=253&fmt=auto&app=120&f=JPEG?w=729&h=500"
      },
      {
        excellentBusniessName: '首钢乐园',
        bg: "https://img2.baidu.com/it/u=1553228315,310649274&fm=253&fmt=auto&app=120&f=JPEG?w=749&h=500"
      },
      {
        excellentBusniessName: '首钢旧址',
        bg: "https://img1.baidu.com/it/u=2078752601,1190630527&fm=253&fmt=auto&app=120&f=JPEG?w=660&h=440"
      },
      {
        excellentBusniessName: '冬日首钢',
        bg: "https://img0.baidu.com/it/u=2821957628,2195078758&fm=253&fmt=auto&app=138&f=JPEG?w=711&h=500"
      },
      {
        excellentBusniessName: '走心馆',
        bg: "https://img2.baidu.com/it/u=3363086927,1001912848&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
      },
      {
        excellentBusniessName: '蒸汽朋克',
        bg: "https://img1.baidu.com/it/u=2570294743,884006829&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
      }],
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        touchRatio: 0.2,
        slideToClickedSlide: true,
      },
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
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.$swiper;
      const swiperThumbs = this.$refs.swiperThumbs.$swiper;
      swiperTop.controller.control = swiperThumbs;
      swiperThumbs.controller.control = swiperTop;
    });
  },

  methods: {
    pagination() {
      return {
        clickable: true,
        renderBullet: (index, className) =>
          `<span style="color: red;">' + (${index} + 1) + "</span>`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  .protect-bg {
    padding-left: 73px;
    padding-bottom: 123px;
    display: flex;
    align-items: flex-end;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #ffffff;
    width: 100%;
    height: 442px;
    background-size: cover;
    background-image: url("../../images/protectBg.png");
  }
  @import "~@/styles/variables";
  width: 100%;
  height: 100vh;
  overflow-x: overlay;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;
  .content-container {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    // align-items: flex-start;
    //top: 36px;
    @media screen and (max-width: 960px) {
      margin-top: 0;
    }
    .side-left {
      background: #000;
      flex: 1;
      border-radius: 2px;
      .swiper {
        // height: 1232px;
        width: 100%;
        max-width: 1440px;
        .swiper-slide {
          background-size: cover;
          background-position: center;
          .video-desc {
            background-color: black;
            width: 100%;
            height: 78px;
            font-size: 18px;
            font-family: AlibabaPuHuiTiR;
            color: #ffffff;
            padding-top: 22px;
          }
          .swiper-desc {
            width: 100%;
            height: 78px;
            font-size: 18px;
            font-family: AlibabaPuHuiTiR;
            color: #ffffff;
          }
          .swiper-bg {
            height: 226px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
          }
        }

        &.gallery-top {
          height: 72%;
          width: 100%;
        }
        &.gallery-thumbs {
          height: 26%;
          box-sizing: border-box;
          padding: 10 0;
        }
        &.gallery-thumbs .swiper-slide {
          width: 25% !important;
          height: 100%;
          opacity: 0.4;
        }
        &.gallery-thumbs .swiper-slide-active {
          opacity: 1;
        }
      }
      @media screen and (max-width: 960px) {
        width: 100%;
      }
    }
  }
}
</style>

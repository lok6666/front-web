<template>
  <div ref="container" class="home-container">
    <app-header />
    <div class="protect-bg">
      <div>朗园</div>
    </div>
    <div class="content-container">
      <div class="side-left">
        <swiper
          class="swiper gallery-top"
          :options="swiperOptionTop"
          ref="swiperTop"
        >
          <swiper-slide
            v-for="(item, index) in swiperConfig"
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
                  src="../../video/7ba8526361db302c7fb5236ff570a98e.mp4"
                  type="video/webm"
                />
              </video>
              <div class="video-desc">
                视频信息的文字介绍，可不配置，未配置隐藏不显示。视频信息的文字介绍，可不配置，未配置隐藏不显示。视频信息的文字介绍，可不配置，未配置隐藏不显示。视频信息的文字介绍，可不配置，未配置隐藏不显示。
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <swiper
          class="swiper gallery-thumbs"
          :options="swiperOptionThumbs"
          ref="swiperThumbs"
        >
          <swiper-slide v-for="(item, index) in swiperConfig"  :key="index">
            <div v-bind:class="`swiper-bg swiper-slide-${index}`"></div>
            <div class="swiper-desc">视频信息的文字介绍。</div>
          </swiper-slide>
        </swiper>
      </div>
      <imgEl />
    </div>
    <app-footer />
  </div>
</template>
<script>
import { swiperConfig } from "@/config/index";
import imgEl from "@/components/guide/img.vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { mapGetters } from "vuex";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import AppHeader from "@/components/Header/index";
import AppFooter from "@/components/footer/index";
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
      swiperConfig,
      swiperOptionTop: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
      },
      options: {
        autoplay: true,
        poster:
          "https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png",
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
    // this.player = videojs(this.$refs.video, this.options, () => {
    //   console.log("播放器渲染完成");
    // });
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
  overflow-x: hidden;
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
          .swiper-slide-0 {
            background-image: url("https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png");
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
          .swiper-slide-4 {
            background-image: url("../../images/swiper.png");
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

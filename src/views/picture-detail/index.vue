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
            v-for="(item, index) in swiperConfig3"
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
                  type="video/webm"
                />
              </video>
              <div class="video-desc">{{item.videoDesc}}</div>
            </div>
          </swiper-slide>
        </swiper>
        <swiper
          class="swiper gallery-thumbs"
          :options="swiperOptionThumbs"
          ref="swiperThumbs"
        >
          <swiper-slide v-for="(item, index) in swiperConfig3"  :key="index">
            <div v-bind:class="`swiper-bg swiper-slide-${index}`" :style="`background-image: url(${item.poster})`"></div>
            <div class="swiper-desc">视频信息的文字介绍。</div>
          </swiper-slide>
        </swiper>
      </div>
      <imgEl :excellentBusniessList="excellentBusniessList"/>
    </div>
    <app-footer />
  </div>
</template>
<script>
import { swiperConfig3 } from "@/config/index";
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
      swiperConfig3,
      excellentBusniessList: [{
        excellentBusniessName: '艺术园区',
        bg: 'https://img2.baidu.com/it/u=1381099266,376447922&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=333'
      },
      {
        excellentBusniessName: 'vintage',
        bg: 'https://img0.baidu.com/it/u=3268367170,2023500465&fm=253&fmt=auto&app=138&f=JPEG?w=900&h=500'
      },
      {
        excellentBusniessName: '首创',
        bg: "https://img1.baidu.com/it/u=1779030509,995191853&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333"
      },
      {
        excellentBusniessName: '朗园咖啡',
        bg: "https://img2.baidu.com/it/u=3094745482,1814621851&fm=253&fmt=auto&app=138&f=JPEG?w=886&h=500"
      },
      {
        excellentBusniessName: '第三空间',
        bg: "https://img2.baidu.com/it/u=1611515097,1272369993&fm=253&fmt=auto&app=138&f=JPEG?w=818&h=460"
      },
      {
        excellentBusniessName: '无追搜索',
        bg: "data:image/jpeg;base64,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"
      },
      {
        excellentBusniessName: '创意园',
        bg: "https://img0.baidu.com/it/u=755017611,4288408033&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500"
      },
      {
        excellentBusniessName: '租售中心',
        bg: "https://img1.baidu.com/it/u=17108377,3553810979&fm=253&fmt=auto&app=138&f=JPEG?w=928&h=500"
      }],
      swiperOptionTop: {
        loop: true,
        loopedSlides: 2, // looped slides should be the same
        spaceBetween: 10,
      },
      swiperOptionThumbs: {
        loop: true,
        loopedSlides: 2, // looped slides should be the same
        spaceBetween: 80,
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

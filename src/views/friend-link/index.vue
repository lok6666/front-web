<template>
  <div class="app-container">
    <app-header :nav-item-active="4" />
    <div class="trade-bg">
      <div class="trade-title">行业培训</div>
    </div>
    <div class="trade-container">
      <div class="trade-center">
      <div class="collage-video">
        <video
          ref="video"
          class="video-js vjs-default-skin vjs-big-play-centered"
          style="height: 644px; max-height: 1300px; width: 100%"
          :poster="currentVideo.poster"
          controls
        >
          <source
            src="../../video/7ba8526361db302c7fb5236ff570a98e.mp4"
            type="video/webm"
          />
        </video>
      </div>
      <div class="collage-list">
        <div style="display: flex;align-items: center;margin-left: 41px;"><img src="../../images/collage-choose.png"/>系列选集</div>
        <ul>
          <li v-for="(item, index) in list" :key="index">{{item}}</li>
        </ul>
      </div>
      <div>
        <div class="header">
          <div class="collage-title">系列课程往期回顾</div>
          <div>查看全部</div>
        </div>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperConfig">
            <div :class="`swiper-item swiper-item-${index}`"></div>
            <div class="video-desc">
              {{item.desc}}
              <div>{{item.time}}</div>
              <div>{{item.learnNum}}人参与学习</div>
            </div>
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
        </swiper>
      </div>
      <!-- <userTable/>
      <userTable2/>
      <teacher />
      <collage /> -->
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import loanBg1 from "../../images/loan-card-header1.png";
import collagePoster from "../../images/collage-poster.png";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { swiperConfig1 } from "@/config/index";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
// import userTable from "./components/userTable.vue";
// import userTable2 from "./components/userTable2.vue";
// import collage from "@/components/guide/collage.vue";
// import teacher from "./components/teacher.vue";
import bank1 from "../../images/bank1.png";
import AppHeader from "@/components/Header/index";
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      player: null,
      currentVideo: {
        poster: collagePoster
      },
      swiperConfig: swiperConfig1,
      categoryId: 0,
      list: ['第一期', '第二期'],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        direction: 'horizontal',
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          resize: () => {
            this.$refs.swiper.$swiper.changeDirection(
              window.innerWidth <= 960
                ? 'vertical'
                : 'horizontal'
            )
          }
        }
      }
    };
  },
  components: {
    AppHeader,
    Swiper,
    SwiperSlide,
    // Loan,
    // userTable,
    // teacher,
    // collage,
    // userTable2,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  mounted() {
    this.player = videojs(this.$refs.video, this.options, () => {
      console.log("播放器渲染完成");
    });
  },
  methods: {
    select(index) {
      console.log("this---------", this.btnList[index]);
    },
    detail(index) {
      this.$router.push({
        path: `/trade-detail/:${index}`
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  // padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background: #eee;
  min-height: calc(100vh - 50px);
  position: relative;

  @media screen and (max-width: 922px) {
    padding: 0;
    margin: 0;
  }
  .trade-bg {
    display: flex;
    justify-content: end;
    align-items: flex-start;
    flex-direction: column;
    height: 442px;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    padding-left: 78px;
    padding-bottom: 20px;
    background-size: cover;
    background-image: url('../../images/行业培训Bg.png');
    .trade-title {
      font-size: 80px;
      font-family: AlibabaPuHuiTiH;
      color: #FFFFFF;
    }
  }
  .trade-container {
    max-width: 1440px;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 60px;
    background-color: #DFAF75;
    .trade-center {
      width: 100%;
      min-width: 1298px;
      .collage-list {
        height: 78px;
        background: #8B572A;
        display: flex;
        align-items: center;
        font-size: 24px;
        font-family: AlibabaPuHuiTiR;
        color: #FFFFFF;
        line-height: 33px;
        ul {
          display: flex;
          li {
            color: #fff;
            list-style: none;
            margin-right: 27px;
            border-right: solid #fff;
            padding-right: 27px;
          }
        }
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: AlibabaPuHuiTiM;
        color: #FFFFFF;
        padding: 0px 36px;
        .collage-title {
          font-size: 42px;
          line-height: 58px;
          margin-bottom: 27px;
          margin-top: 27px;
          // padding: 0px 35px;
        }
        .collage-more {
          color: #FFFFFF;
          line-height: 33px;
        }
      }
      .swiper {
        // height: 126px;
        // width: 100%;
        // max-width: 1440px;
        margin-left: 35px;
        .swiper-slide {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          width: 240px !important;
          .swiper-item {
            width: 224px;
            height: 126px;
          }
          .swiper-item-0 {
            background-image: url('../../images/collage-bg-0.png');
          }
          .swiper-item-1 {
            background-image: url('../../images/collage-bg-1.png');
          }
          .swiper-item-2 {
            background-image: url('../../images/collage-bg-2.png');
          }
          .swiper-item-3 {
            background-image: url('../../images/collage-bg-3.png');
          }
          .swiper-item-4 {
            background-image: url('../../images/collage-bg-4.png');
          }
          .video-desc {
            margin-top: 8px;
            text-align: left;
            width: 224px;
            // width: 100%;
            // height: 78px;
            // padding-top: 22px;
          }
        }
        .swiper-slide:nth-child(2n) {
          width: 40%;
        }
        .swiper-slide:nth-child(3n) {
          width: 20%;
        }
      }
    }
  }
}
</style>

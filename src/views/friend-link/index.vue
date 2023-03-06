<template>
  <div class="app-container">
    <app-header :nav-item-active="4" />
    <div class="trade-bg">
      <div class="trade-title">行业培训</div>
    </div>
    <div class="trade-container">
      <div class="trade-center">
      <div class="collage-video">
        <iframe style="width: 100%; height: 750px;border: none;" :src="`${serviceUrl}`"></iframe>
      </div>
      <div>
        <div class="header" style="background-color: #DFAF75;">
          <div class="collage-title">系列课程</div>
          <!-- <div>查看全部</div> -->
        </div>
        <div style="background-color: #DFAF75;padding: 0px 36px 0px 36px;">
          <div style="width: 1348px;">
            <swiper class="swiper" :options="swiperOption" style="background-color: #DFAF75;">
              <swiper-slide v-for="(item, index) in swiperConfig" style="width:400px">
                <img class="swiper-item" :src="item.serviceImages"  @click="chooseCollage(item)"/>
                <div class="video-desc">
                  {{item.serviceName}}
                  <div>{{item.time}}</div>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <collage></collage>
      </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import collagePoster from "../../images/collage-poster.png";
import collage from '@/components/guide/collage.vue'
import { swiperConfig1 } from "@/config/index";
import { trainingServicesList } from "@/config/api.js";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import request from '@/utils/request'
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
      serviceUrl: '',
      swiperConfig: [],
      categoryId: 0,
      swiperOption: {
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        slidesPerView: 5,
        spaceBetween: 37,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
/*         on: {
          resize: () => {
            this.$refs.swiper.$swiper.changeDirection(
              window.innerWidth <= 960
                ? 'vertical'
                : 'horizontal'
            )
          }
        } */
      }
    };
  },
  components: {
    AppHeader,
    Swiper,
    SwiperSlide,
    AppFooter,
    collage
  },
  created() {
    request({
        url: `${trainingServicesList}`,
        method: 'post',
        data: {
          serviceStatus:1
        }
      }).then(res => {
        this.swiperConfig = res.data.list;
        this.serviceUrl = this.swiperConfig[0].serviceUrl;
      });
  },
  mounted() {
  },
  methods: {
    select(index) {
    },
    detail(index) {
      this.$router.push({
        path: `/trade-detail/:${index}`
      })
    },
    chooseCollage(item) {
      this.serviceUrl = item.serviceUrl;
    }
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
    padding-left: 73px;
    padding-bottom: 123px;
    display: flex;
    align-items: flex-end;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    height: 442px;
    background-size: 100% 142%;
    background-image: url('http://minio.bjwcxf.com/cultural-image/cultural-web/行业培训.png');
  }
  .trade-container {
    max-width: 1440px;
    margin-left: 70px;
    margin-right: 70px;
    // padding-bottom: 60px;
    .trade-center {
      width: 100%;
      min-width: 1298px;
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
        // margin-left: 35px;
        // height: 300px;
        width: 100%;
        .swiper-wrapper {
          // margin-left: 35px !important;
        }
        .swiper-slide {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          // margin-left: 33px;
          margin-bottom: 33px;
          width: 240px !important;
          .swiper-item {
            height: 246px;
            width: 240px;  
   /*         width: 224px;
            height: 126px;
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer; */
          } 
          .video-desc {
            margin-top: 8px;
            text-align: left;
            width: 224px;
          } 
        }
/*          .swiper-slide:nth-child(2n) {
          width: 40%;
        }
        .swiper-slide:nth-child(3n) {
          width: 20%;
        }  */
      }
    }
  }
}
</style>

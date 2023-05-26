<template>
  <div class="guide-wrap" style="display: flex;justify-content: center;">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png"/>
        楼宇信息
        <div class="guide-agile">
            <div class="limit-desc">comprehensive platform</div>
            Cultural industry
            </div>
      </div>
      <div class="guide-excellent-busniess-content">
        <div style="display: flex;justify-content: center;">
          <div style="width: 1320px;">
            <swiper class="swiper" :options="swiperOption">
                <swiper-slide
                v-for="(item, index) in excellentBusniessList"
                style="display: flex;flex-direction: column;cursor: pointer;"
                :key="index"
                >
                <!--v-bind:style="`background-size: 100% 100%;background-repeat: no-repeat;background-image:url(${item.buildingImages})`"-->
                <img class="swiper-item" :src="item.buildingImages"  @click="routeTo(item.id)"/>
                <div class="video-desc">{{item.buildingName}}</div>
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination" style="bottom: 1px;"></div>
              <!-- <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div> -->
          </swiper>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {imgDatalogV3} from "@/utils/util.js";
import { buildings } from "@/config/api.js";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import request from '@/utils/request';
export default {
  name: "excellent-busniess",
  data() {
    return {
      locationhashMap: {
        '#/beijing': 'beijing',
        '#/shijingshan': 'shijingshan',
        '#/chaoyang': 'chaoyang'
      },
      excellentBusniessList: [],
      swiperOption: {
          slidesPerView: 4,
          slidesPerColumn: 2,
          // spaceBetween: 20,
/*           autoplay: {
            delay: 2500,
            disableOnInteraction: false
          }, */
          // loop: true,
          // loopFillGroupWithBlank: true,
          pagination: {
             el: '.swiper-pagination',
             clickable: true
           },
/*           direction: 'horizontal',
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }, */
        }
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  async created() {
     let that = this;
     request({
         url: `${buildings}`,
         method: 'post',
         data: {
          attestationStatus: 1,
          buildingLocation: this.locationhashMap[this.$router.isBeijing()]
         }
       })
       .then((res) => {
        that.excellentBusniessList = res.data.list
       });
   },
  methods: {
    routeTo(entid) {
      imgDatalogV3({
        eventCode: 'INDEX_BUILDING_TO_DETAIL',
        eventName: '首页楼宇跳详情埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      // this.$router.push(`/business-detail/:id=9fb9596f386b46f4b6cef429019c8393`)
      this.$router.push(`/building-detail/${entid}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.guide-wrap {
    //background: #F5F6F9;
    .container {
      // margin: 0px 60px;
      .guide-excellent-busniess-content {
        // padding: 0px 65px;
/*           display: grid;
          grid-template-columns: repeat(4, 332px);
          grid-template-rows: repeat(2, 300px);
          justify-content: center; */
          .swiper {
            width: 100%;
            height: 480px;
            margin-left: auto;
            margin-right: auto;
            max-width: 1440px;
            // padding: 0px 58px 0px 58px;
            .swiper-slide {
              // width: 100% !important;
              border-radius: 10px;
              // border: 1px solid #D99447;
              height: 216px;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
              font-weight: 700;
              width: 310px !important;
              font-size: 36.4px;
              // background-color: #fff !important;
              background-position: center !important;
              background-repeat:no-repeat !important;
              background-size: cover;
              .swiper-item {
            height: 184px;
            width: 310px;
           
   /*         width: 224px;
            height: 126px;
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer; */
          } 
              .video-desc {
                  margin-top: 5px;
                  text-align: left;
                  width: 224px;
                  font-size: 17px;
                  text-align: center;
                } 
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
          &-item {
            border-radius: 10px;
            border: 1px solid #D99447;
            display: flex;
            cursor: pointer;
            flex-direction: column;
            align-items: center;
            margin-right: 10px;
            margin-bottom: 10px;
            .item-bg {
              // margin-right: 31px;
              // margin-bottom: 30px;
              border-radius: 10px;
              width: 320px;
              height: 320px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .item-name {
              margin: 10px 0px 10px 0px;
            }
          }

      }
    }
}
</style>

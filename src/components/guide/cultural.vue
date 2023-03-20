<template>
    <div class="guide-wrap">
      <div class="container">
        <div class="guide-header">
          <img class="guide-header-logo" src="../../images/guide-logo.png" />
          文化产业园区
          <div class="guide-agile">
              <div class="limit-desc">Comperehensive platform</div>
              Cultural industry
              </div>
        </div>
        <div class="guide-sjsIndustrial-content">
<!--           <video
            ref="video"
            class="video-js vjs-default-skin vjs-big-play-centered"
            poster="http://vjs.zencdn.net/v/oceans.png"
            style="height: 746px; max-height: 1300px; width: 100%"
            controls
          >
            <source
              src="http://minio.bjwcxf.com/culture-video/7ba8526361db302c7fb5236ff570a98e.mp4" type="video/webm"
            />
          </video> -->
          <div class="guide-sjsIndustrial-show">
            <div class="sjs-img-show sjsIndustrial-left" @click="showPictureDetail1">首钢园 SHOUGANG PARK</div>
            <div class="sjs-img-show sjsIndustrial-right" @click="showPictureDetail">郎园Park 文化创意产业园
              <!-- <div class="sjs-img-show r-top" @click="showPictureDetail3">中关村科幻产业创新中心</div> -->
              <!-- <div class="r-bottom"> -->
                <!-- <div class="sjs-img-show ly-show" @click="showPictureDetail">郎园Park 文化创意产业园</div> -->
                <!-- <div class="more">
                  <div class="more-icon"></div>
                  查看更多
                </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import videojs from "video.js";
  import "video.js/dist/video-js.css";
  export default {
    name: "sjsIndustrial",
    data() {
      return {
        player: null,
        options: {
          poster: "http://minio.bjwcxf.com/cultural-image/shijingshan.png"
        },
      };
    },
    mounted() {
      this.player = videojs(this.$refs.video, this.options, () => {
        console.log("播放器渲染完成");
      });
    },
    methods: {
      showPictureDetail() {
        this.$router.push('/picture-detail')
      },
      showPictureDetail1() {
        this.$router.push('/picture-detail2')
      },
      showPictureDetail3() {
        this.$router.push('/picture-detail3')
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
        default: true,
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .guide-wrap {
    .container {
      // margin: 0 60px;
      .guide-sjsIndustrial-content {
        .guide-sjsIndustrial-show {
          display: flex;
          width: 100%;
          margin-top: 19px;
          font-family: AlibabaPuHuiTiR;
          color: #FFFFFF;
          .sjs-img-show {
            display: flex;
            align-items: flex-end;
            padding: 0px 0px 23px 23px;
          }
          .video-js {
            display: none !important
          }
          .sjsIndustrial-left {
            margin-right: 10px;
            cursor: pointer;
            font-size: 24px;
            display: flex;
            align-items: flex-end;
            padding: 0px 0px 23px 47px;
            width: 50%;
            height: 630px;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("../../images/首钢园.png");
          }
          .sjsIndustrial-right {
              font-size: 24px;
              display: flex;
              cursor: pointer;
              align-items: flex-end;
              padding: 0px 0px 23px 47px;
              width: 50%;
              height: 630px;
              background-repeat: no-repeat;
              background-size: cover;
              background-image: url("../../images/朗园.png");
            .r-top {
              // width: 50%;
              font-size: 24px;
              height: 305px;
              background-size: cover;
              background-image: url("../../images/中关村科幻产业创新中心.png");
            }
            // .r-bottom {
              // width: 100%;
              // display: flex;
              // margin-top: 20px;
              // justify-content: space-between;
              .ly-show {
                font-size: 18px;
                width: 50%;
                height: 100%;
                background-size: cover !important;
                background-repeat: no-repeat;
                background: url("../../images/朗园.png");
              }
              .more {
                width: 49%;
                height: 305px;
                background: #d99447;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-size: 34px;
                font-family: AlibabaPuHuiTiR;
                color: #ffffff;
                &-icon {
                  width: 68px;
                  height: 68px;
                  background-size: cover;
                  background: url("../../images/查看更多.png");
                  background-repeat: no-repeat;
                  background-size: cover;
                  margin-bottom: 13px;
                }
              }
            // }
          }
        }
      }
    }
  }
  </style>
  
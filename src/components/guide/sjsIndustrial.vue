<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        石景山风貌
        <p class="guide-agile">Cultural industry</p>
      </div>
      <div class="guide-sjsIndustrial-content">
        <video
          ref="video"
          class="video-js vjs-default-skin vjs-big-play-centered"
          style="height: 746px; max-height: 1300px; width: 100%"
          controls
        >
          <source
            src="../../video/7ba8526361db302c7fb5236ff570a98e.mp4" type="video/webm"
          />
        </video>
        <div class="guide-sjsIndustrial-show">
          <div class="sjsIndustrial-left">首钢园 SHOUGANG PARK</div>
          <div class="sjsIndustrial-right">
            <div class="r-top">中关村科幻产业创新中心</div>
            <div class="r-bottom">
              <div class="ly-show"></div>
              <div class="more">
                <div class="more-icon"></div>
                查看更多
              </div>
            </div>
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
        autoplay: true,
        poster: "http://minio.bjwcxf.com/cultural-image/shijingshan.png"
      },
    };
  },
  mounted() {
    this.player = videojs(this.$refs.video, this.options, () => {
      console.log("播放器渲染完成");
    });
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
    margin: 0 60px;
    .guide-sjsIndustrial-content {
      .guide-sjsIndustrial-show {
        display: flex;
        width: 100%;
        margin-top: 19px;
        .video-js {
          display: none !important
        }
        .sjsIndustrial-left {
          width: 50%;
          height: 630px;
          background-repeat: no-repeat;
          background-size: cover;
          background-image: url("../../images/首钢园.png");
        }
        .sjsIndustrial-right {
          width: 50%;
          margin-left: 20px;
          .r-top {
            // width: 50%;
            height: 305px;
            background-size: cover;
            background-image: url("../../images/中关村科幻产业创新中心.png");
          }
          .r-bottom {
            width: 100%;
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
            .ly-show {
              width: 49%;
              height: 305px;
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
          }
        }
      }
    }
  }
}
</style>

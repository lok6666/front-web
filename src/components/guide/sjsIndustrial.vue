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
        controls
        preload="auto"
        paused="true"
        width="640"
        height="264"
        poster="MY_VIDEO_POSTER.jpg"
        data-setup="{}"
      >
        <source src="../../video/7ba8526361db302c7fb5236ff570a98e.mp4" type="video/webm">
        </p>
      </video>
        <div class="guide-sjsIndustrial-show">
          <div class="sjsIndustrial-left">首钢园 SHOUGANG PARK</div>
          <div class="sjsIndustrial-right">
            <div class="r-top">中关村科幻产业创新中心</div>
            <div class="r-bottom">
              <div class="ly-show"></div>
              <div class="more"><div class="more-icon"></div>查看更多</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="https://vjs.zencdn.net/7.20.2/video.min.js"></script>
<script>
export default {
  name: "sjsIndustrial",
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
  }
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
        .sjsIndustrial-left {
            width: 50%;
            height: 630px;
            background-repeat: no-repeat;
            background-size: cover;
            background-image: url("../../images/首钢园.png")
        }
        .sjsIndustrial-right {
          width: 50%;
          margin-left: 20px;
          .r-top {
            // width: 50%;
            height: 305px;
            background-image: url("../../images/中关村科幻产业创新中心.png");
          }
          .r-bottom {
            width: 100%;
            display: flex;
            margin-top: 20px;
            .ly-show {
              width: 50%;
              height: 305px;
              background-size: cover;
              background-repeat: no-repeat;
              background: url("../../images/朗园.png");
            }
            .more {
              width: 50%;
              height: 305px;
              background: #D99447;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              font-size: 34px;
              font-family: AlibabaPuHuiTiR;
              color: #FFFFFF;
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

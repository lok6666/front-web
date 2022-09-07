<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        企业风貌
        <p class="guide-agile">Cultural industry</p>
      </div>
      <div class="guide-busniessService-content">
        <div class="busniessService-right">
          <div class="r-top">
            <div class="finance"></div>
            <div class="manage"></div>
          </div>
          <div class="r-bottom">中关村科幻产业创新中心</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "busniessService",
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
    .guide-busniessService-content {
      .busniessService-right {
        .r-bottom {
          margin-top: 10px;
          height: 305px;
          background-repeat: no-repeat;
          background-size:100% 100%;
          background-image: url("../../images/培训中心.png");
        }
        .r-top {
          width: 100%;
          display: flex;
          margin-top: 20px;
          .finance {
            width: 50%;
            height: 305px;
            background-size:100% 100%;
            background-repeat: no-repeat;
            background: url("../../images/金融服务.png");
          }
          .manage {
            width: 50%;
            height: 305px;
            background-size:100% 100%;
            background-repeat: no-repeat;
            background: url("../../images/管家服务.png");
          }
        }
      }
    }
  }
}
</style>

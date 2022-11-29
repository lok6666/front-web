<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        企业服务
        <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
      </div>
      <div class="guide-busniess-service-content">
        <div class="busniess-service">
          <div class="r-top">
            <div class="busniess-service-block finance" @click="$router.push('finance')">
              <div class="busniess-service-block-title">金融服务</div>
              <div class="busniess-service-block-desc">贴心的金融服务管家</div>
            </div>
            <div class="busniess-service-block manage"@click="$router.push('category')">
              <div class="busniess-service-block-title">灵活用工</div>
              <div class="busniess-service-block-desc">省心的合法合规雇佣帮手</div>
            </div>
          </div>
          <div class="r-bottom" style="cursor: pointer;" @click="$router.push('friend-link')">
              <div>行业培训</div>
              <div style="font-size: 26px;">专业的企业精英商学院</div>
          </div>
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
    .guide-busniess-service-content {
      .busniess-service {
        font-size: 56px;
        font-family: AlibabaPuHuiTiR;
        color: #FFFFFF;
        .r-bottom {
          margin-top: 10px;
          height: 300px;
          // width: 1300px;
          padding-left: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-repeat: no-repeat;
          background-size:100% 100%;
          background-image: url("http://minio.bjwcxf.com/cultural-image/cultural-web/培训中心.png");
        }
        .r-top {
          width: 100%;
          display: flex;
          margin-top: 20px;
          justify-content: space-between; 
          .busniess-service-block {
            cursor: pointer;
            width: 49.5%;
            height: 480px;
            background-size: cover !important;
            background-repeat: no-repeat;
            display: flex;
            justify-content: end;
            align-items: center;
            flex-direction: column;
            // &-title {
            //   font-size: 26px;
            // }
            &-desc {
              font-size: 26px;
              flex: 0.2;
            }
          }
          .finance {
            background: url("http://minio.bjwcxf.com/cultural-image/cultural-web/index-金融服务.png");
            justify-content: flex-end;
          }
          .manage {
            background: url("http://minio.bjwcxf.com/cultural-image/cultural-web/index-管家服务.png");
            justify-content: flex-end;
          }
        }
      }
    }
  }
}
</style>

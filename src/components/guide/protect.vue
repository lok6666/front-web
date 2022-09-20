<template>
    <div class="guide-wrap">
      <div class="container">
        <div class="guide-header">
          <img class="guide-header-logo" src="../../images/guide-logo.png" />
          我的产品
        </div>
        <div class="guide-excellent-busniess-content">
          <!-- <div class="guide-excellent-busniess-content-item"
              v-for="(item,index) in excellentBusniessList"
              :key="index">
              <div :class="`item-icon item-icon-${index}`"></div>
          </div> -->
          <h2 style="line-height: 1.5;">
            <span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">物联网业务</span>
          </h2>
          <p style="text-align: center;">
            <img src="http://minio.bjwcxf.com/cultural-image/2022-09-20/1.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-20/1.png" style="width: 848.50px;height: 466.81px;"></p>
          <p style="text-align: center;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-20/2.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-20/2.png" style="width: 849.80px;height: 473.16px;"></p>
          <h2 style="text-align: left;">
            <span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">文投数通</span>
          </h2>
          <p style="text-indent: 16pt; line-height: 1.5;"><span style="color: black;">文投数字（北京）通信技术有限公司，于2021年8月27日成立，由北京文投大数据有限公司、杭州微聊网络科技有限公司、北京持真信息技术服务有限公司共同设立，注册资金为800万元人民币。公司是中关村高新技术企业，并已获取软件著作权16个。</span></p>
          <p style="text-align: center;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-20/3.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-20/3.png" style="width: 853.80px;height: 479.19px;"></p>
          <p style="text-align: center;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-20/4.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-20/4.png" style="width: 853.80px;height: 483.20px;"></p>
          <h2 style="text-align: left;"><span style="color: rgb(0, 0, 0); background-color: rgb(255, 255, 255); font-size: 16px;">纳宇智慧</span></h2>
          <p style="text-align: center;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-20/6.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-20/6.png" style="width: 858.80px;height: 480.23px;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-20/5.png" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-20/5.png" style="width: 858.80px;height: 486.45px;"></p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "excellent-busniess",
    data() {
      return {
        excellentBusniessList: [{
          excellentBusniessName: '文投大数据'
        },
        {
          excellentBusniessName: '华录新媒'
        },
        {
          excellentBusniessName: '畅游'
        },
        {
          excellentBusniessName: 'cri'
        },
        {
          excellentBusniessName: '六工汇'
        },
        {
          excellentBusniessName: '红云'
        },
        {
          excellentBusniessName: '漫游谷'
        },
        {
          excellentBusniessName: '航天云网'
        }]
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
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .guide-wrap {
      .container {
        margin: 0px 60px;
        padding-bottom: 58px;
        .guide-excellent-busniess-content {
            // display: grid;
            // grid-template-columns: repeat(4, 310px);
            // grid-gap: 20px 20px;
            &-item {
              text-align: center;
              border-radius: 8px;
              border: 1px solid #D99447;
            }
             .item-icon {
                  height: 210px;
                  background-size: cover;
                  background-repeat: no-repeat;
                  &-0 {
                  background-image: url("../../images/collage1.png");
                  }
                  &-1 {
                  background-image: url("../../images/collage2.png");
                  }
                  &-2 {
                  background-image: url("../../images/collage3.png");
                  }
                  &-3 {
                  background-image: url("../../images/collage4.png");
                  }
                  &-4 {
                  background-image: url("../../images/collage5.png");
                  }
                  &-5 {
                  background-image: url("../../images/collage6.png");
                  }
                  &-6 {
                  background-image: url("../../images/collage7.png");
                  }
                  &-7 {
                  background-image: url("../../images/collage8.png");
                  }
                  &-8 {
                  background-image: url("../../images/collage9.png");
                  }
              }
        }
      }
  }
  </style>
  
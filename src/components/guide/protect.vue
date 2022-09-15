<template>
    <div class="guide-wrap">
      <div class="container">
        <div class="guide-header">
          <img class="guide-header-logo" src="../../images/guide-logo.png" />
          我的产品
        </div>
        <div class="guide-excellent-busniess-content">
          <div class="guide-excellent-busniess-content-item"
              v-for="(item,index) in excellentBusniessList"
              :key="index">
              <div :class="`item-icon item-icon-${index}`"></div>
          </div>
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
      background: #FFFFFF;
      .container {
        margin: 0px 60px;
        padding-bottom: 58px;
        .guide-excellent-busniess-content {
            display: grid;
            grid-template-columns: repeat(4, 310px);
            grid-gap: 20px 20px;
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
  
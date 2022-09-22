<template>
    <div class="guide-wrap img-location">
      <div class="container">
        <div class="guide-header">
          <img class="guide-header-logo" src="../../images/guide-logo.png" />
          精美图集
          <div class="guide-agile">
            <div class="limit-desc">Comperehensive platf</div>
            Cultural industry
            </div>
        </div>
        <div class="guide-excellent-busniess-content">
          <div class="guide-excellent-busniess-content-item"
              v-for="(item,index) in excellentBusniessList"
              :key="index">
              <div :class="`item-icon item-icon-${index}`" :style="`background-image: url(${item.bg})`"></div>
              {{item.excellentBusniessName}}
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
      }
    },
    props: {
      excellentBusniessList: {
        type: Array,
        default() {
          return [];
        },
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
.img-location {
    display: flex;
    justify-content: center;
}
  .guide-wrap {
      background: #FFFFFF;
      .container {
        margin: 10px 60px;
        padding-bottom: 58px;
        .guide-excellent-busniess-content {
            display: grid;
            grid-template-columns: repeat(4, 310px);
            grid-gap: 20px 20px;
            &-item {
              text-align: center;
              padding-bottom: 17px;
              border-radius: 8px;
              border: 1px solid #D99447;
            }
             .item-icon {
                  height: 210px;
                  margin-bottom: 15px;
                  background-size: cover;
                  background-repeat: no-repeat;
              }
        }
      }
  }
  </style>
  
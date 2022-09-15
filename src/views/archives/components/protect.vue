<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-excellent-busniess-content">
        <div class="guide-excellent-busniess-content-item"
            @click="routeTo(item.id)" 
            v-for="(item,index) in excellentBusniessList"
            :key="index">
            <div :class="`item-icon item-icon-${index}`"></div>
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
      excellentBusniessList: [{
        excellentBusniessName: '国内商标注册',
        id: 0
      },
      {
        excellentBusniessName: '著作权申请',
        id: 1
      },
      {
        excellentBusniessName: '专利申请',
        id: 2
      },
      {
        excellentBusniessName: '政策资质-国高新认证',
        id: 3
      },
      {
        excellentBusniessName: '政策资质-创新型中小企业',
        id: 4
      },
      {
        excellentBusniessName: '政策资质-专精特新中小企业',
        id: 5
      },
      {
        excellentBusniessName: '政策资质-专精特新企业',
        id: 5
      },
      {
        excellentBusniessName: '公司注册套餐产品',
        id: 6
      },
      {
        excellentBusniessName: '公司注册套餐产品',
        id: 7
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
  },
  methods: {
    routeTo(index) {
      this.$router.push({
        path: `/protect-detail/:${index}`
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.guide-wrap {
    .container {
      margin: 0px 60px;
      .guide-excellent-busniess-content {
          display: grid;
          grid-template-columns: repeat(4, 310px);
          grid-gap: 20px 20px;
          &-item {
            text-align: center;
            padding-bottom: 17px;
            border-radius: 8px;
            font-size: 22px;
            font-family: AlibabaPuHuiTiR;
            color: #2B292D;
            box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.06);
            border-radius: 5px;
          }
           .item-icon {
                height: 117px;
                margin-bottom: 15px;
                background-size: cover;
                background-repeat: no-repeat;
                &-0 {
                background-image: url("../../../images/proect0.png");
                }
                &-1 {
                background-image: url("../../../images/proect1.png");
                }
                &-2 {
                background-image: url("../../../images/proect2.png");
                }
                &-3 {
                background-image: url("../../../images/proect3.png");
                }
                &-4 {
                background-image: url("../../../images/proect4.png");
                }
                &-5 {
                background-image: url("../../../images/proect5.png");
                }
                &-6 {
                background-image: url("../../../images/proect6.png");
                }
                &-7 {
                background-image: url("../../../images/proect7.png");
                }
                &-8 {
                background-image: url("../../../images/proect8.png");
                }
            }
      }
    }
}
</style>

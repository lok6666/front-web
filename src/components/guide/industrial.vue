<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        产品大厅
        <p class="guide-agile">Cultural industry</p>
      </div>
      <div class="guide-Industrial-content">
        <div class="guide-Industrial-content-item" v-for="(item,index) in industrialList" :key="index">
          <div :class="`item-icon item-icon-${index}`"></div>{{item.industrialName}}
        </div>
        <div class="guide-Industrial-content-item guide-Industrial-content-more">
          <div :class="`item-icon item-icon-${index}`"></div>查看更多
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Industrial",
  data() {
    return {
      industrialList: [{
        industrialName: '国内商标注册'
      },
      {
        industrialName: '著作权申请'
      },
      {
        industrialName: '专利申请'
      },
      {
        industrialName: '政策资质'
      },
      {
        industrialName: '工商财税(套餐一)'
      },
      {
        industrialName: '工商财税(套餐二)'
      },
      {
        industrialName: '工商财税(套餐三)'
      }]
    }
  }
};
</script>

<style lang="scss" scoped>
.guide-wrap {
  background: #F5F6F9;
  .container {
    margin: 0 60px;
    .guide-Industrial-content {
        display: grid;
        grid-template-columns: repeat(4, 330px);
        grid-template-rows: repeat(2, 150px);
        justify-content: center;
        &-item {
          width: 310px;
          height: 130px;
          background: #FFFFFF;
          border-radius: 20px;
          margin-right: 20px;
          margin-bottom: 20px;
          font-size: 26px;
          font-family: AlibabaPuHuiTiR;
          color: #2B292D;
          display: flex;
          justify-content: flex-start;
          align-items: center;
            .item-icon {
              width: 60px;
              height: 60px;
              margin-left: 19px;
              margin-right: 10px;
              &-0 {
                background-image: url("../../images/商标.png");
              }
              &-1 {
                background-image: url("../../images/著作权.png");
              }
              &-2 {
                background-image: url("../../images/专利.png");
              }
              &-3 {
                background-image: url("../../images/政治资质.png");
              }
              &-4 {
                background-image: url("../../images/财税.png");
              }
              &-5 {
                background-image: url("../../images/财税.png");
              }
              &-6 {
                background-image: url("../../images/财税.png");
              }
            }
        }
        &-more {
           background-image: url("../../images/查看更多按钮.png")
        }
    }
  }
}
</style>

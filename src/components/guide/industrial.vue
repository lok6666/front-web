<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        产品大厅
        <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
      </div>
      <div class="guide-Industrial-content">
        <div class="guide-Industrial-content-item" v-for="(item,index) in industrialList" :key="index" @click="routeTo(item)">
          <div :class="`item-icon`" :style="`background-image: url(${item.serviceTags ? item.serviceTags : ''})`"></div>{{item.serviceName}}
        </div>
        <div class="guide-Industrial-content-item guide-Industrial-content-more" @click="$router.push('/archives')">
          <div :class="`item-icon item-icon-${index}`"></div>查看更多
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { entServiceDockingAll } from "@/config/api.js";
import request from '@/utils/request';
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
  },
  created() {
    request({
        url: `${entServiceDockingAll}`,
        method: 'post',
        data: {
          serviceFlag: 1
        }
      })
      .then((res) => {
          this.industrialList = res.data.list.length > 7 ? res.data.list.slice(0, 7): res.data.list;
      })
  },
  methods: {
    routeTo(item) {
      this.$store.dispatch('data/setBusneissDetail', _.cloneDeep(item));
      window.localStorage.setItem('busneiss-detail', JSON.stringify(item));
      this.$router.push({
        path: `/protect-detail/:${item.id}`
      })
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
          cursor: pointer;
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
              background-repeat: no-repeat;
              background-size: 100% 100%;
              margin-left: 19px;
              margin-right: 10px;
            }
        }
        &-more {
           color: #fff;
           background-image: url("../../images/查看更多按钮.png")
        }
    }
  }
}
</style>

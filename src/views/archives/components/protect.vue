<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-excellent-busniess-content">
        <div class="guide-excellent-busniess-content-item"
            @click="routeTo(item)" 
            v-for="(item,index) in excellentBusniessList"
            :key="index">
            <div :style="`background-image: url(${item.serviceImage})`" class="item-icon"></div>
            <div>{{item.serviceName}}</div>
            <div style="color: red;margin-top: 10px;">{{item.servicePrice}}</div>
            <div style="color: #909090;font-size: 16px;display:flex;justify-content: space-between;padding: 0 10px;margin-top: 20px;">
              <div>{{item.serviceHits}}次浏览</div>
              <div>{{item.serviceTurnover}}次申请</div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { entServiceDockingAll } from "@/config/api.js";
import request from '@/utils/request';
export default {
  name: "excellent-busniess",
  data() {
    return {
      excellentBusniessList: []
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
  created() {
    request({
        url: `${entServiceDockingAll}`,
        method: 'post',
        data: {}
      })
      .then((res) => {
          // console.log('res----', res.data.list);
          this.excellentBusniessList = res.data.list;
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
            background: #fff;
          }
           .item-icon {
                height: 117px;
                margin-bottom: 15px;
                background-size: cover;
                background-repeat: no-repeat;
            }
      }
    }
}
</style>

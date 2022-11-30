<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        企业风采
        <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
      </div>
      <div class="guide-excellent-busniess-content">
        <div :class="`guide-excellent-busniess-content-item`"  @click="routeTo(item.entId)" 
        v-for="(item,index) in excellentBusniessList" :key="index">
        <div class="item-bg" :style="`background-image: url(${item.logoImage})`"></div>
        <div class="item-name">{{item.entName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { entInfoList } from "@/config/api.js";
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
  async created() {
     let that = this;
     request({
         url: `${entInfoList}`,
         method: 'post',
         data: {
          attestationStatus: 1
         }
       })
       .then((res) => {
        that.excellentBusniessList = res.data.list.splice(0, 8);
       });
   },
  methods: {
    routeTo(entid) {
      // this.$router.push(`/business-detail/:id=9fb9596f386b46f4b6cef429019c8393`)
      this.$router.push(`/business-detail/:id=${entid}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.guide-wrap {
    //background: #F5F6F9;
    .container {
      margin: 0px 60px;
      .guide-excellent-busniess-content {
          display: grid;
          grid-template-columns: repeat(4, 332px);
          grid-template-rows: repeat(2, 300px);
          justify-content: center;
          &-item {
            border-radius: 10px;
            border: 1px solid #D99447;
            display: flex;
            cursor: pointer;
            flex-direction: column;
            align-items: center;
            margin-right: 10px;
            margin-bottom: 10px;
            .item-bg {
              // margin-right: 31px;
              // margin-bottom: 30px;
              border-radius: 10px;
              width: 320px;
              height: 320px;
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            .item-name {
              margin: 10px 0px 10px 0px;
            }
          }

      }
    }
}
</style>

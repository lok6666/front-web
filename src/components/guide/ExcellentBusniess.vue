<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        企业风采
        <div class="guide-agile">
            <div class="limit-desc">Comperehensive platf</div>
            Cultural industry
            </div>
      </div>
      <div class="guide-excellent-busniess-content">
        <div :class="`guide-excellent-busniess-content-item item-icon item-icon-${index}`" @click="routeTo(item.entId)" 
        v-for="(item,index) in excellentBusniessList" :key="index">
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
  },
  async created() {
     let that = this;
     request({
         url: `${entInfoList}`,
         method: 'post',
         data: {}
       })
       .then((res) => {
         //如果未添加宣传资料
         console.log('data----', res);
        that.excellentBusniessList = res.data.list;
       });
   },
  methods: {
    routeTo(entid) {
      this.$router.push(`/business-detail/:id=9fb9596f386b46f4b6cef429019c8393`)
      // this.$router.push(`/business-detail/:id=${entid}`)
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
          grid-template-rows: repeat(2, 230px);
          justify-content: center;
          .item-icon {
            margin-right: 31px;
            margin-bottom: 30px;
            background-size: cover;
            background-repeat: no-repeat;
            &-0 {
              background-image: url("../../images/文投大数据.png");
            }
            &-1 {
              background-image: url("../../images/华录新媒.png");
            }
            &-2 {
              background-image: url("../../images/畅游.png");
            }
            &-3 {
              background-image: url("../../images/cri.png");
            }
            &-4 {
              background-image: url("../../images/六工汇.png");
            }
            &-5 {
              background-image: url("../../images/红云.png");
            }
            &-6 {
              background-image: url("../../images/漫游谷.png");
            }
            &-7 {
              background-image: url("../../images/航天云网.png");
            }
          }
      }
    }
}
</style>

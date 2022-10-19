<template>
  <div class="user-echarts-wrap">
      <div :id="`myChart${id}`" class="user-echarts-content" :style="styleVar"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "echarts",
  data() {
    return {
      width: '100%'
    }
  },
  props: {
    echartsOptions: {
      type: Object,
      required: true
    },
    id: {
      type: String
    },
    height: {
      type: String
    }
  },
  computed: {
      styleVar() {
          return {
              'height': this.height + 'px',
              'width': this.width
          }
      }
  },
  mounted() {
    var dom = document.getElementById(`myChart${this.id}`);
    var myChart = echarts.init(dom, null, {
      renderer: "canvas",
      useDirtyRect: false,
    });
    
    myChart.setOption(this.echartsOptions);
    window.onresize =  function  () {
      console.log('onresize----');
      myChart.resize({width: '100%'});
     }
  },
};
</script>

<style lang="scss" scoped>
.user-echarts-wrap {
  background: #ffffff;
  border-radius: 4px;
  padding-top: 10px;
  padding-left: 10px;
  .user-echarts-content {
    width: 100%;
    height: 100%;
  }
}
</style>

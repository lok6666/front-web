<template>
  <div id="live2d-container">
    <canvas
      id="live2d"
      :style="!visible?'visibility:hidden':''"
      width="220"
      height="300"
      class="live2d"
    />
    <div class="btn visible-btn" @click="visible=!visible">
      <img src="https://poile-img.nos-eastchina1.126.net/1584865141362.png">
      <svg-icon v-show="visible" icon-class="line" class="line-icon" />
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
import { mapGetters } from 'vuex'
import load from './dynamicLoadScript'
import ResizeMixin from '@/components/mixin/ResizeHandler.js'
const live2dJs = 'https://public-share-file.nos-eastchina1.126.net/js/live2d.js'
// 拖动
$(function() { $('#live2d').draggable() })
export default {
  name: 'Live2d',
  mixins: [ResizeMixin],
  data() {
    return {
      visible: true
    }
  },

  computed: {
    ...mapGetters([
      'device'
    ])
  },

  mounted() {
    if (this.device !== 'mobile') {
      this.init()
    }
  },

  methods: {
    init() {
      // dynamic load live2d from cdn
      try{
        load(live2dJs, (err) => {
          if (err) {
            this.$message.error(err.message)
            return
          }
          loadlive2d('live2d', 'https://poile-img.nos-eastchina1.126.net/live2d/model.json')
        })
      }catch(e){
        //TODO handle the exception
      }
    }
  }
}
</script>

<style lang="scss" scoped>

#live2d-container {

  .live2d {
    position: fixed;
    right: 0;
    bottom: -15px;
    z-index: 9999;
  }

  .visible-btn {
    position: fixed;
    z-index: 9999;
    right: 10px;
    bottom: 10px;
    background:  rgba(74, 59, 114, 0.9);
    font-size: 12px;
    color: #fff;
    border-radius: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
    overflow: hidden;

    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0,0,0,.3);
      border-radius: 50%;
      z-index: 9;
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .line-icon {
      position: absolute;
      z-index: 99;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      transform: translate(-50%,-50%);
      opacity: .6;
    }
  }
}
</style>

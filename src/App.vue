<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.fullPath"/>
    </keep-alive>
    <!-- <live2d v-if="device === 'desktop'" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Live2d from '@/components/Live2d/index.vue'
import ResizeMixin from '@/components/mixin/ResizeHandler.js'
export default {
  name: 'App',
  components: {
    Live2d
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters([
      'device'
    ])
  }
}
</script>

<template>
  <div class="policy-calculate">
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="dialog-bg"
      :top="0"
      :center="true"
      :show-close="false"
      :before-close="handleClose">
      <div style="font-size: 80px;font-family: YouSheBiaoTiHei;color: #FFFFFF;">政策计算器</div>
      <div style="margin-bottom: 25px;margin-top:5px;">请选择您的条件，我将为您计算出适合您的政</div>
      <div class="select-btn">
        <div class="title">政策级别:</div>
        <div class="select-item">
          <div v-for="(btn, index) in locationOptions" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('locationOptions', index)"
              >{{ btn.label }}</el-button>
          </div>
        </div>
      </div>
      <div class="select-btn">
        <div class="title">企业属性:</div>
        <div class="select-item">
          <div v-for="(btn, index) in businessOptions" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('businessOptions', index)"
              >{{ btn.label }}</el-button>
          </div>
        </div>
      </div>
      <div class="select-btn">
        <div class="title">企业属性:</div>
        <div class="select-item">
          <div v-for="(btn, index) in businessAttributeOptions" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('businessAttributeOptions', index)"
              >{{ btn.label }}</el-button>
          </div>
        </div>
      </div>
      <div class="select-btn">
        <div class="title">成立年限:</div>
        <div class="select-item">
          <div v-for="(btn, index) in yearOptions" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('yearOptions', index)"
              >{{ btn.label }}</el-button>
          </div>
        </div>
      </div>
      <div class="select-btn">
        <div class="title">成立年限:</div>
        <div class="select-item">
          <div v-for="(btn, index) in themeOptions" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select(themeOptions, index)"
              >{{ btn.label }}</el-button>
          </div>
        </div>
      </div>
      <div class="calculate" @click="calculate(themeOptions)">开始计算</div>
    </el-dialog>
  </div>
</template>

<script>
import {
  locationOptions, businessOptions, businessAttributeOptions, yearOptions, themeOptions
} from "@/config/constant.js";
export default {
  name: "Advantage",
  data() {
    return {
      locationOptions,
      businessOptions,
      businessAttributeOptions,
      yearOptions,
      themeOptions,
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$forceUpdate();
          this.$emit('handleClose');
          done();
        })
        .catch(_ => {});
    },
    select(options, index) {
      this[options][index].isSelect = true;
    },
    calculate() {
      this.$router.push('/policy-match')
    }
  }
};
</script>

<style lang="scss" scoped>
.policy-calculate {
  background: #fff;
}
</style>

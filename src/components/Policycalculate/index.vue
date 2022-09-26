<template>
  <div class="policy-calculate">
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="dialog-bg"
      :top="0"
      :lock-scroll="false"
      :center="true"
      :show-close="false"
      :before-close="handleClose">
      <i class="el-dialog__close el-icon el-icon-close" @click="bClose" style="color: #000;cursor: pointer;position: absolute;top: 51px;right: 17px;"></i>
      <div style="font-size: 80px;font-family: YouSheBiaoTiHei;color: #FFFFFF;">政策计算器</div>
      <div style="margin-bottom: 25px;margin-top:5px;">请选择您的条件，我将为您计算出适合您的政</div>
      <div class="calculate-warpper">
          <div class="select-btn">
            <span class="title">政策级别:</span>
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
            <span class="title">企业组织形式:</span>
            <div class="select-item">
              <div v-for="(btn, index) in xsOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('xsOptions', index)"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">主要业务:</span>
            <div class="select-item">
              <div v-for="(btn, index) in favourablebusinessOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('favourablebusinessOptions', index, 'more')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">企业资质:</span>
            <div class="select-item">
              <div v-for="(btn, index) in zzOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('zzOptions', index, 'more')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">企业规模:</span>
            <div class="select-item">
              <div v-for="(btn, index) in businessAttributeOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('businessAttributeOptions', index, 'more')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">惠企方式:</span>
            <div class="select-item">
              <div v-for="(btn, index) in favourablebusinessOptions1" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('favourablebusinessOptions1', index, 'more')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">政策主题:</span>
            <div class="select-item">
              <div v-for="(btn, index) in themeOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('themeOptions', index)"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">成立年限:</span>
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
      </div>
      <div class="calculate" @click="calculate(themeOptions)">开始计算</div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import {
  locationOptions1, businessOptions, businessAttributeOptions, yearOptions, themeOptions,xsOptions,
  zzOptions, projectSubjectOptions, favourablebusinessOptions, favourablebusinessOptions1
} from "@/config/constant.js";
export default {
  name: "Advantage",
  data() {
    return {
      zzOptions,
      favourablebusinessOptions,
      favourablebusinessOptions1,
      projectSubjectOptions,
      locationOptions: locationOptions1,
      businessOptions,
      businessAttributeOptions,
      yearOptions,
      themeOptions,
      xsOptions,
      selectOptions: [],
      optionsList: []
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters(["data_selection"]),
  },
  methods: {
    bClose() {
      this.$emit('handleClose');
    },
    handleClose(done) {
      this.$forceUpdate();
      this.$emit('handleClose');
    },
    select(options, index, more) {
      if(more === 'more') {
        this[options][index].isSelect = !this[options][index].isSelect;
        // 更新选中列表
        if(this[options][index].isSelect) {
          this.selectOptions.push(this[options][index]);
        } else {
          this.selectOptions = this.selectOptions.filter(el => el.label !== this[options][index].label);
        }
      } else {
        this[options] = this[options].map((e, i) => {
          if(i === index) {
            e.isSelect = !e.isSelect;
            // 更新选中列表
            if(e.isSelect) {
              this.selectOptions.push(this[options][index]);
            } else {
              this.selectOptions = this.selectOptions.filter(el => el.label !== this[options][index].label);
            }
          }
          return e;
        });
      }
      this.optionsList.push(options);
    },
    async calculate() {
      let that = this;
      await this.$store.dispatch('data/setSelection', _.cloneDeep(this.selectOptions));
       this.optionsList.forEach(element => {
        that[element].forEach(el => {
           el.isSelect = false;
         });
       });
      this.optionsList = [];
      this.selectOptions = [];
      that.$emit('handleClose');
    }
  }
};
</script>

<style lang="scss" scoped>
.policy-calculate {
  background: #fff;
}
</style>

<template>
  <div class="guide-wrap policy-bg">
    <policy-calculate :dialogVisible="dialogVisible" @handleClose="handleClose" @dialogClose="dialogClose"/>
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        政策匹配
        <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
      </div>
      <div class="guide-policy-desc">
        <div class="guide-policy-desc-policy">
          最新政策
          <div class="policy-desc">石景山区人民政府办公室关于印发《石景山区推进医疗保障基金监管制度体系改革的实施方案》的通知</div>
        </div>
        <span class="guide-policy-desc-time">
          2022 / 9/ 1
        </span>
      </div>
      <div class="guide-policy-show">
        <div class="guide-policy-show-left">
        </div>
        <div class="guide-policy-show-right">
            <div :class="`guide-policy-fn-item guide-policy-fn-${index}`" v-for="(item,index) in fnList" :key="index">
              <div></div>{{item.title}}<div>{{item.num}}{{item.type}}</div>
            </div>
        </div>
      </div>
      <div class="guide-policy-query" @click="dialogVisible = true">
          匹配政策
      </div>
    </div>
  </div>
</template>

<script>
import PolicyCalculate from '@/components/Policycalculate/index'
import {
  locationOptions, businessOptions, businessAttributeOptions, yearOptions, themeOptions
} from "@/config/constant.js";
export default {
  name: "Advantage",
  data() {
    return {
      dialogVisible: false,
      locationOptions,
      businessOptions,
      businessAttributeOptions,
      yearOptions,
      themeOptions,
      btnList: [],
      fnList: [
        {
          title: '政策文件',
          num: '38690',
          type: '条'
        },
        {
          title: '匹配企业',
          num: '8869',
          type: '家'
        },
        {
          title: '政策兑现',
          num: '5709',
          type: '项'
        }
      ]
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
      default: true,
    },
  },
  components: {
    PolicyCalculate
  },
  methods: {
    dialogClose() {
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
      this.$router.push('/policy-match/政策匹配');
    },
  }
};
</script>

<style lang="scss" scoped>
.policy-bg {
  background: #fff;
}
.guide-wrap {
  .container {
    margin: 0 60px;
    .guide-header {
          display: flex;
          align-items: center;
        }
        .guide-policy {
          &-desc {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 39px;
            &-policy {
              display: flex;
              align-items: center;
              font-size: 24px;
              font-family: AlibabaPuHuiTiM;
              color: #000000;
              .policy-desc {
                margin-left: 23px;
                font-size: 18px;
              }
            }
            &-time {
              font-size: 18px;
              font-family: AlibabaPuHuiTiR;
              color: #000000;
            }
          }
          &-show {
            display: flex;
            justify-content: space-between;
            &-left {
              width: 640px;
              height: 390px;
              background-image: url('../../images/policyTotal.png');
            }
            &-right {
              .guide-policy-fn-item {
                width: 630px;
                height: 130px;
                font-size: 34px;
                font-family: AlibabaPuHuiTiB;
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .guide-policy-fn {
                &-0 {
                  background-image: url('../../images/政策文件.png');
                  color: #F06700;
                }
                &-1 {
                  background-image: url('../../images/匹配企业.png');
                  color: #4558B7;
                }
                &-2 {
                  background-image: url('../../images/政策兑现.png');
                  color: #F73F56;
                }
              }
            }
          }
          &-query {
            background-image: url('../../images/匹配按钮.png');
            width: 554px;
            height:102px;
            background-repeat: no-repeat;
            background-size: contain;
            margin: auto;
            font-size: 32px;
            font-family: AlibabaPuHuiTiM;
            color: #FFFFFF;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            top: 49px;
            cursor: pointer;
          }
        }
  }
}
</style>

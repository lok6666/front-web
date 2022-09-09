<template>
  <div class="guide-wrap policy-enter-bg">
    <div class="container">
      <div class="guide-policyEnter-content">
        <div class="policy-block search" @click="$router.push('/policy-search')" >
            <div></div>
            <img class="guide-header-logo" src="../../images/guide-logo.png" />
            政策查询
            <p class="guide-agile">Cultural industry</p>
        </div>
        <div class="divide"></div>
        <div class="policy-block apply" @click="$router.push('/policy-report')" >
            <div></div>
            <img class="guide-header-logo" src="../../images/guide-logo.png" />
            政策申报
            <p class="guide-agile">Cultural industry</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "policyEnter",
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
  }
};
</script>

<style lang="scss" scoped>
.policy-enter-bg {
    background: #fff;
};
.guide-wrap {
  .container {
    padding: 30px 60px;
    .guide-policyEnter-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .policy-block {
        display: flex;
        align-items: end;
        justify-content: center;
        width: 596px;
        font-size: 56px;
        padding-bottom: 33px;
        color: #212121;
        height: 517px;
        background-size: cover !important;
        background-repeat: no-repeat;
        }
        .search {
        background: url("../../images/政策查询.png");
        }
        .divide {
        width: 1px;
        height: 512px;
        border: 1px solid #979797;
        }
        .apply {
        background: url("../../images/政策申报.png");
        }
    }
  }
}
</style>

<template>
      <div class="finance-loan">
        <div
          class="finance-loan-item"
          v-for="(loan, index) in loanList"
          :key="index"
        >
          <div
            class="item-intro"
            :style="`background-image: url(${loan.loanBg})`"
          >
            <div style="flex: 0.6;font-size: 24px;">{{ loan.title }}</div>
            <div style="font-size: 18px;font-family: AlibabaPuHuiTiR;">
              参考利率
            </div>
            <div style="font-size: 34px;">{{ loan.num }}</div>
          </div>
          <div class="item-content">
            <div class="bank">
              <div
                class="bankBg"
                :style="`background-image: url(${loan.bank})`"
              ></div>
              <div class="limit">期限:{{ loan.limit }}月</div>
            </div>
            <div
              style="height: 66px; width: 135px;display: flex;flex-direction: column;align-items: center;justify-content: center;"
            >
              额度:
              <div class="item-num">{{ loan.quota }}</div>
            </div>
            <div class="bank-detail" @click="detail(index)">查看详情</div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "User",
  props: {
    loanList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
    };
  },
  methods: {
    detail(index) {
      this.$router.push({
        path: `/finance-detail/:${index}`
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.finance-loan {
margin-top: 40px;
display: grid;
grid-template-columns: repeat(4, 25%);
grid-gap: 20px 20px;
.finance-loan-item {
    height: 410px;
    width: 310px;
    background: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    .item-intro {
    height: 172px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: AlibabaPuHuiTiB;
    }
    .item-content {
    display: flex;
    flex-direction: column;
    /* justify-content: space-around; */
    align-items: center;
    .bank {
        display: flex;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;
        border-bottom: 1px solid #979797;
        .bankBg {
        height: 58px;
        width: 142px;
        }
        .limit {
        margin-left: 20px;
        }
    }
    .item-num {
        font-size: 20px;
        font-family: AlibabaPuHuiTiR;
        color: #d0021b;
    }
    .bank-detail {
        width: 220px;
        height: 53px;
        border-radius: 50px;
        border: 2px solid #b48859;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    }
}
}
</style>

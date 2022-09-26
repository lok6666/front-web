<template>
  <div class="user-policy-wrap">
    <div class="container">
      <div class="user-policy-content">
            <div class="user-policy-content-list">
                <div class="user-policy-content-list-item" v-for="(item, index) in newList" :key="index">
                    <p class="user-policy-content-list-title">{{item.title}}</p>
                    <p class="user-policy-content-list-time">{{item.time}}</p>
                </div>
            </div>
      </div>
      <div class="user-policy-more" @click="checkAll">
            <img src="../../../images/CombinedShape2.png"/>
            <p>查看全部消息</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-policy",
  data() {
    return {
      mainTabs: ['最新', '热门'],
      current: 1,
      newList: [{
        title: '平台新上线了“专精特新中心企业”资质申请服务包，请您及时关注',
        time: '2022/9/22'
      },{
        title: '建设银行信用快贷产品申请已被受理，请您耐心等待。',
        time: '2022/9/20'
      },{
        title: '石景山区政府办印发了《石景山区继续加大中小微企业帮扶力度加快困难企业...',
        time: '2022/5/19'
      },{
        title: '文化产业高峰论坛将于首钢园举办，如有需要请您及时报名。',
        time: '2022/5/04'
      },{
        title: '石景山区经信局印发了《石景山区关于促进 “专精特新”中小企业高质量发展的...',
        time: '2022/4/20'
      }]
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    checkAll() {
      this.$emit('checkAll', 8);
    }
  }
};
</script>

<style lang="scss" scoped>
.user-policy-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  margin-top: 10px;
  .container {
    // margin: 60px 92px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    .user-policy-content {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;
        font-family: PingFangSC-Light, PingFang SC;
        .user-policy-content-list {
            width: 100%;
            max-height: 242px;
            overflow: scroll;
            color: #212121;
            margin-right: 5px;
            font-weight: 300;
            color: #000000;
            &::-webkit-scrollbar {
              display: none;
            }
            &-item {
                // width: 659px;
                display: flex;
                justify-content: space-between;
                line-height: 5px;
                // white-space: nowrap;
                // text-overflow:ellipsis;
            }
            &-time {
                font-weight: 300;
                color: #A23C3C;
                -webkit-background-clip: text;
            }
        }
    }
    .user-policy-more {
      width: 138px;
      height: 112px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #E1E1E1;
      margin-left: 35px;
      margin-right: 25px;
    }
  }
}
</style>

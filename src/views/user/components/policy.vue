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
      <div class="user-policy-more">
            <img src="../../../images/CombinedShape2.png"/>
            <p>查看全部信息</p>
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
        title: '申请的政策服务02955号已审核通过',
        time: '2022/9/1'
      },{
        title: '申请的政策服务02955号已审核通过',
        time: '2022/9/1'
      },{
        title: '申请的政策服务02955号已审核通过',
        time: '2022/9/1'
      },{
        title: '申请的政策服务02955号已审核通过',
        time: '2022/9/1'
      },{
        title: '申请的政策服务02955号已审核通过',
        time: '2022/9/1'
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
                display: flex;
                justify-content: space-between;
                line-height: 5px;
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

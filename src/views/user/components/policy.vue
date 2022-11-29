<template>
  <div class="user-policy-wrap">
    <div class="container">
      <div class="user-policy-content">
            <div class="user-policy-content-list">
                <div class="user-policy-content-list-item" v-for="(item, index) in newList" :key="index">
                    <p class="user-policy-content-list-title">{{item.messageContent}}</p>
                    <div class="user-policy-content-list-time">
                      <div style="display: flex;
    align-items: center;
    justify-content: center;width: 100px;text-align: left;">{{item.messageTime.substring(0, 10)}}</div>
                      <div style="display: flex;
    align-items: center;
    justify-content: center;width: 85px;text-align: left;">{{item.messageTime.substring(11, 19)}}</div>
                    </div>
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
import {
  messageList
 } from "@/config/api";
 import request from '@/utils/request';
export default {
  name: "user-policy",
  data() {
    return {
      mainTabs: ['最新', '热门'],
      current: 1,
      newList: []
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
  created() {
    let that = this;
    request({
      url: `${messageList}`,
      method: 'post',
      data: {
        entId: `${this.userId}`
    }}).then(res => {
      that.newList = res.data.list.splice(0, 6);
    });
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
              font-family: 'AlibabaPuHuiTiR';
                font-weight: 300;
                color: #A23C3C;
                display: flex;
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

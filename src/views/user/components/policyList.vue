<template>
  <div class="user-policy-list-wrap apply-bg">
    <div class="user-table-title">
      <div class="user-table-service">站内信息</div>
    </div>
    <div class="container">
      <div class="user-policy-list-content">
            <div class="user-policy-list-content-list">
                <div class="user-policy-list-content-list-item" v-for="(item, index) in newList" :key="index">
                    <p class="user-policy-list-content-list-title">{{item.messageContent}}</p>
                    <p class="user-policy-list-content-list-time">{{item.messageTime}}</p>
                </div>
            </div>
      </div>
      <div class="pagination-block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[10, 40, 70, 80]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
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
      total: 0,
      pageSize: 10,
      pageNum: 1,
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
    this.getNewList();
  },
  methods: {
    getNewList() {
      let that = this;
      request({
        url: `${messageList}`,
        method: 'post',
        data: {
          entId: `${this.userId}`,
          pageNum: this.pageNum,
          pageSize: this.pageSize
      }}).then(res => {
        that.newList = res.data.list;
        that.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getNewList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getNewList();
    }
  }
};
</script>

<style lang="scss" scoped>
.apply-bg {
  background-repeat: no-repeat !important;
  background-image: url("../../../images/已申请服务背景.png") !important;
}
.user-policy-list-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  // margin-top: 10px;
  .user-table-title {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 18px;
    height: 148px;
    .user-table-service {
      flex: 0.7;
      display: flex;
      align-items: center;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
    .user-table-all {
      display: flex;
      justify-content: center;
      width: 118px;
      height: 40px;
      margin-right: 10px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e1e1e1;
      /* justify-content: center; */
      align-items: center;
    }
  }
  .container {
    // margin: 60px 92px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
    .user-policy-list-content {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;
        font-family: PingFangSC-Light, PingFang SC;
        .user-policy-list-content-list {
            width: 100%;
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
    .user-policy-list-more {
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
    .pagination-block {
        display: flex;
        justify-content: center;
        height: 80px;
        align-items: center;
    }
  }
}
</style>

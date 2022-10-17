<template>
  <div class="user-table-wrap collect-bg">
    <div class="user-table-title">
      <div class="user-table-service">
        我的政策
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @row-click="routeTo">
      <el-table-column v-for="(item, index) in tableItem" :key="index" :min-width="item.width">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;"><img class="table-item-icon" :src="item.src" />{{ item.label }}</div>
        </template>
        <template slot-scope="scope">
          <span>{{item.showKey === 'policyTime' ? scope.row[item.showKey].replace('00:00:00', ''): scope.row[item.showKey]}}</span>
        </template>
      </el-table-column>
    </el-table>
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
</template>

<script>
import {
  entPolicyCollectList
 } from "@/config/api";
 import request from '@/utils/request';
import levelImg from "@/images/等级.png";
import policyTitleImg from "@/images/形状.png";
import addressImg from "@/images/转发文.png";
import dateImg from "@/images/time.png";
export default {
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      tableItem: [
        {
          label: "级别",
          src: levelImg,
          showKey: "policyLevel",
          width: 50
        },
        {
          label: "政策标题",
          src: policyTitleImg,
          showKey: "policyTitle",
          width: 340
        },
        {
          label: "发文机构",
          src: addressImg,
          showKey: "policyAgency",
          width: 200
        },
        {
          label: "发布时间",
          src: dateImg,
          showKey: "policyTime",
          width: 100
        },
      ],
    };
  },
  created() {
    this.getPolicyList();
  },
  methods: {
    routeTo(item) {
      this.$router.push(`/policy-detail/:artId=${item.policyId}`);
    },
    getPolicyList() {
      let that = this;
      request({
        url: `${entPolicyCollectList}`,
        method: 'post',
        data: {
          entId: window.localStorage.getItem('USERID'),
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        that.tableData = res.data.list;
        that.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPolicyList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getPolicyList();
    }
  }
};
</script>

<style lang="scss" scoped>
.collect-bg {
  background-repeat: no-repeat !important;
  background-image: url("../../../images/已收藏政策背景.png") !important;
}
.user-table-wrap {
  background: #ffffff;
  border-radius: 4px;
  padding-top: 12px;
  padding-left: 20px;
  padding-right: 20px;
  .table-icon {
    width: 17px !important;
    height: 17px;
    margin-right: 2px;
  }
  .table-item-icon {
    width: 15px !important;
    height: 15px;
    margin-right: 2px;
  }
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
  .pagination-block {
    display: flex;
    justify-content: center;
    height: 80px;
    align-items: center;
  }
}
</style>

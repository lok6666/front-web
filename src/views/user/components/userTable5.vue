<template>
  <div class="user-table-wrap apply-bg">
    <div class="user-table-title">
      <div class="user-table-service">金融服务</div>
    </div>
    <el-table :data="tableData" style="width: 100%" @row-click="routeTo">
      <el-table-column v-for="(item, index) in tableItem" :key="index">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;"><img class="table-item-icon" :src="item.src" />{{ item.label }}</div>
        </template>
        <template slot-scope="scope">
          <span>{{ item.showKey === 'dockStatus' ? option[scope.row[item.showKey]] : scope.row[item.showKey]}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 40, 70, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  financialServicesAll
 } from "@/config/api";
 import request from '@/utils/request';
import levelImg from "@/images/修改名称.png";
import policyTitleImg from "@/images/类别.png";
import addressImg from "@/images/account.png";
import statusImg from "@/images/符号-状态-警告.png";
import dateImg from "@/images/time.png";
export default {
  data() {
    return {
      currentPage4: 4,
      pageSize: 10,
      pageNum: 1,
      total: 0,
      tableData: [],
      option: {
        0: '待对接',
        1: '已对接'
      },
      tableItem: [
        {
          label: "服务名称",
          src: levelImg,
          showKey: "serviceName",
        },
        {
          label: "额度范围",
          src: policyTitleImg,
          showKey: "serviceQuota",
        },
        {
          label: "期限",
          src: addressImg,
          showKey: "serviceTerm",
        },
        {
          label: "利率范围",
          src: statusImg,
          showKey: "serviceRange",
        },
        {
          label: "担保方式",
          src: dateImg,
          showKey: "serviceType",
        },
      ],
    };
  },
  created() {
    this.getPolicyList();
  },
  methods: {
    routeTo(item) {
      this.$router.push(`/protect-detail/:${item.id}`);
    },
    getPolicyList() {
      let that = this;
      request({
      url: `${financialServicesAll}`,
      method: 'post',
      data: {
        companyid: window.localStorage.getItem('USERID'),
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
.apply-bg {
  background-repeat: no-repeat !important;
  background-image: url("../../../images/已申请服务背景.png") !important;
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

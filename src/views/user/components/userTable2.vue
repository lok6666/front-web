<template>
  <div class="user-table-wrap apply-bg">
    <div class="user-table-title">
      <div class="user-table-service">已申请的服务</div>
      <div class="user-table-all" @click="checkAll">
        <img
          class="table-icon"
          src="../../../images/列表.png"
          style="width: 17px; heigth: 17px;"
        />查看全部
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @row-click="routeTo" cell-style="cursor: pointer;">
      <el-table-column v-for="(item, index) in tableItem" :key="index">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;"><img class="table-item-icon" :src="item.src" />{{ item.label }}</div>
        </template>
        <template slot-scope="scope">
          <span v-if="item.showKey == 'dockStatus'">{{ applyStatusObj[scope.row[item.showKey]]}}</span>
          <span v-else>{{scope.row[item.showKey]}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  financialServiceDockingAll
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
      tableData: [],
      applyStatusObj: {
        0: '申请中',
        1: '申请成功',
        2: '申请失败'
      },
      applyStatus1Obj: {
        0: '税务服务',
        1: '注销及其他',
        2: '工商业务类',
        3: '资质类',
        4: '公司变更',
        5: '财税服务'
      },
      tableItem: [
        {
          label: "产品名称",
          src: levelImg,
          showKey: "serviceName",
        },
        {
          label: "服务商名称",
          src: policyTitleImg,
          showKey: "supplierName",
        },
        {
          label: "申请时间",
          src: dateImg,
          showKey: "dockTime",
        },
        {
          label: "状态",
          src: statusImg,
          showKey: "dockStatus",
        }
      ],
    };
  },
  created() {
    request({
      url: `${financialServiceDockingAll}`,
      method: 'post',
      data: {
        companyid: window.localStorage.getItem('USERID')
      }
    }).then(res => {
      this.tableData = res.data.list.length > 5 ? res.data.list.slice(0, 5) : res.data.list;
    });
  },
  methods: {
    checkAll() {
      this.$emit('checkAll', 6);
    },
    cellStyle() {
      return 'cursor: pointer';
    },
    routeTo(item) {
      this.$router.push(`/protect-detail/:${item.id}`);
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
  margin-top: 10px;
  padding-top: 12px;
  padding-left: 20px;
  padding-right: 20px;
  .table-icon {
    custor: pointer;
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
}
</style>

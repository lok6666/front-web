<template>
  <div class="user-table-wrap collect-bg">
    <div class="user-table-title">
      <div class="user-table-service">
        已收藏的政策
      </div>
      <div class="user-table-all" @click="checkAll">
        <img
          class="table-icon"
          src="../../../images/列表.png"
          style="width: 17px; heigth: 17px;"
        />查看全部
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%" @row-click="routeTo" cell-style="cursor: pointer;">
      <el-table-column v-for="(item, index) in tableItem" :key="index" :min-width="item.width" style="custor: pointer;">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;"><img class="table-item-icon" :src="item.src" />{{ item.label }}</div>
        </template>
        <template slot-scope="scope">
          <span v-if="item.showKey === 'policyTime'">{{scope.row[item.showKey].replace('00:00:00', '')}}</span>
          <span v-else-if="item.showKey === 'policyLevel'">{{policyLevelStatus[scope.row[item.showKey]]}}</span>
          <span v-else>{{scope.row[item.showKey]}}</span>
        </template>
      </el-table-column>
    </el-table>
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
      tableData: [],
      policyLevelStatus: {
        1: '区级',
        2: '市级',
        3: '国家级',
      },
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
    request({
      url: `${entPolicyCollectList}`,
      method: 'post',
      data: {
        entId: window.localStorage.getItem('USERID')
      }
    }).then(res => {
      this.tableData = res.data.list.length > 5 ? res.data.list.slice(0, 5) : res.data.list;
    });
  },
  methods: {
    checkAll() {
      this.$emit('checkAll', 5);
    },
    routeTo(item) {
      this.$router.push(`/policy-detail/:artId=${item.policyId}`);
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

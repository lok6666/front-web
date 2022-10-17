<template>
<div class="user-table-wrap apply-bg">
  <div class="user-table-title">
    <div class="user-table-service">已报名的培训/活动</div>
    <div class="user-table-all" @click="checkAll">
        <img class="table-icon" src="../../../images/列表.png" style="width: 17px; heigth: 17px;"/>查看全部
    </div>
  </div>
  <el-table :data="tableData" style="width: 100%" @row-click="routerTo">
      <el-table-column v-for="(item, index) in tableItem" :key="index" :align="item.align" :min-width="item.width">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;"><img class="table-item-icon" :src="item.src" />{{ item.label }}</div>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row[item.showKey] }}</span>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
  import {
    activityApplyList
  } from "@/config/api";
  import _ from 'lodash';
 import request from '@/utils/request';
  import levelImg from "@/images/gift.png";
  import policyTitleImg from "@/images/单位.png";
  import dateImg from "@/images/time.png";
  export default {
    data() {
      return {
        tableData: [],
        tableItem: [
        {
          label: "序号",
          src: levelImg,
          showKey: "actId",
          align: 'center',
          width: '25'
        },
        {
          label: "培训/活动名称",
          src: policyTitleImg,
          showKey: "actName",
          align: 'left',
          width: '120'
        },
        {
          label: "报名人数",
          src: dateImg,
          showKey: "applyCount",
          align: 'left',
          width: '50'
        },
        {
          label: "报名日期",
          src: dateImg,
          showKey: "activityDateFrom",
          align: 'left',
          width: '50'
        },
        {
          label: "举办日期",
          src: dateImg,
          showKey: "applyTimeTo",
          align: 'left',
          width: '50'
        }
      ]
      }
    },
    created() {
    request({
      url: `${activityApplyList}`,
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
        this.$emit('checkAll', 7);
      },
      routerTo(item) {
        this.$store.dispatch('data/collagedetail', _.cloneDeep(item));
        this.$router.push(`/collage-detail/:collageId=${item.actId}`);
      },
    }
  }
</script>


<style lang="scss" scoped>
.apply-bg {
  background-repeat: no-repeat !important;
  background-image: url('../../../images/已申请服务背景.png') !important;
}
.user-table-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  margin-top: 10px;
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
          background: #FFFFFF;
          border-radius: 4px;
          border: 1px solid #E1E1E1;
          /* justify-content: center; */
          align-items: center;
      }
  }
}
</style>
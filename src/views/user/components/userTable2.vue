<template>
<div class="user-table-wrap apply-bg">
  <div class="user-table-title">
    <div class="user-table-service">已申请的服务</div>
    <div class="user-table-all">
        <img class="table-icon" src="../../../images/列表.png" style="width: 17px; heigth: 17px;"/>查看全部
    </div>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      min-width="90px"
      label="级别">
      <template slot="header" slot-scope="scope">
        <img class="table-item-icon" src="../../../images/修改名称.png" style="width: 17px; heigth: 17px;"/>服务名称
      </template>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.level }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名">
      <template slot="header" slot-scope="scope">
        <img class="table-item-icon" src="../../../images/类别.png" style="width: 17px; heigth: 17px;"/>类别
      </template>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.level }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
       <template slot="header" slot-scope="scope">
        <img class="table-item-icon" src="../../../images/account.png" style="width: 17px; heigth: 17px;"/>招商服务
      </template>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column label="日期">
      <template slot="header" slot-scope="scope">
        <img class="table-item-icon" src="../../../images/符号-状态-警告.png" style="width: 17px; heigth: 17px;"/>状态
      </template>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.status }}</span>
      </template>
    </el-table-column>
    <el-table-column label="日期">
      <template slot="header" slot-scope="scope">
        <img class="table-item-icon" src="../../../images/time.png" style="width: 17px; heigth: 17px;"/>申请日期
      </template>
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          level: '石景山区2',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普',
          status: '已申请',
          date: '2016.05.03'
        }, {
          level: '石景山区4',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普',
          status: '已申请',
          date: '2016.05.03'
        }, {
          level: '石景山区1',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普',
          status: '已申请',
          date: '2016.05.03'
        }, {
          level: '石景山区3',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普',
          status: '已申请',
          date: '2016.05.03'
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
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
  // padding-top: 12px;
  // padding-left: 20px;
  // padding-right: 20px;
  .table-icon {
    width: 17px !important;
    height: 17px;
    margin-right: 2px;
  }
  .table-item-icon {
    width: 12px !important;
    height: 16px;
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
          background: #FFFFFF;
          border-radius: 4px;
          border: 1px solid #E1E1E1;
          /* justify-content: center; */
          align-items: center;
      }
  }
}
</style>
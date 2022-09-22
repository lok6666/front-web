<template>
  <div class="user-table-wrap apply-bg">
    <div class="user-table-title">
      <div class="user-table-service">我的活动</div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(item, index) in tableItem" :key="index">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;">{{ item.label }}</div>
        </template>
        <template slot-scope="scope">
          <span>{{ scope.row[item.showKey] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 40, 70, 100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import levelImg from "@/images/修改名称.png";
import policyTitleImg from "@/images/类别.png";
import addressImg from "@/images/account.png";
import statusImg from "@/images/符号-状态-警告.png";
import dateImg from "@/images/time.png";
export default {
  data() {
    return {
      currentPage4: 4,
      tableData: [
        {
          level: "12",
          title: "DSF24",
          address: "招商报名",
          status: "2016.03.08",
          date: "2016.05.29",
        },
        {
          level: "345",
          title: "DED23",
          address: "运动健康线上培训",
          status: "2016.04.03",
          date: "2016.06.13",
        },
        {
          level: "67",
          title: "323D2",
          address: "全民阅读活动报名",
          status: "2016.05.08",
          date: "2016.05.08",
        },
        {
          level: "11",
          title: "REG54",
          address: "郎园艺术展",
          status: "2016.05.08",
          date: "2016.05.03",
        },
      ],
      tableItem: [
        {
          label: "活动id",
          src: levelImg,
          showKey: "level",
        },
        {
          label: "企业id",
          src: policyTitleImg,
          showKey: "title",
        },
        {
          label: "活动名称",
          src: addressImg,
          showKey: "address",
        },
        {
          label: "开始时间",
          src: statusImg,
          showKey: "status",
        },
        {
          label: "结束时间",
          src: dateImg,
          showKey: "date",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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

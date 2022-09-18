<template>
  <div class="user-table-wrap collect-bg">
    <div class="user-table-title">
      <div class="user-table-service">
        已收藏的政策
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(item, index) in tableItem" :key="index">
        <template slot="header" slot-scope="scope">
          <div style="display: flex;align-items:center;"><img class="table-item-icon" :src="item.src" />{{ item.label }}</div>
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
        :page-sizes="[10, 40, 70, 80]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import levelImg from "@/images/等级.png";
import policyTitleImg from "@/images/形状.png";
import addressImg from "@/images/转发文.png";
import dateImg from "@/images/time.png";
export default {
  data() {
    return {
      currentPage4: 4,
      tableData: [
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.19",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.18",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.17",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.16",
        },{
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.13",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.11",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.08",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.07",
        },{
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.05",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.03",
        }
      ],
      tableItem: [
        {
          label: "级别",
          src: levelImg,
          showKey: "level",
        },
        {
          label: "政策标题",
          src: policyTitleImg,
          showKey: "title",
        },
        {
          label: "发文机构",
          src: addressImg,
          showKey: "address",
        },
        {
          label: "发布时间",
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

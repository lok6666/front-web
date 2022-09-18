<template>
  <div class="user-table-wrap collect-bg">
    <div class="user-table-title">
      <div class="user-table-service">
        已报名的课程
      </div>
      <div class="user-table-all">
        <img
          class="table-icon"
          src="../../../images/列表.png"
          style="width: 17px; heigth: 17px;"
        />查看全部
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
      tableData: [
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
          date: "2016.05.13",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.03",
        },
        {
          level: "石景山区",
          title: "推进国际科技创新中心建设加快…",
          address: "北京市星座大厦",
          date: "2016.05.01",
        },
      ],
      tableItem: [
        {
          label: "上课时间",
          src: levelImg,
          showKey: "level",
        },
        {
          label: "课程名称",
          src: policyTitleImg,
          showKey: "title",
        },
        {
          label: "讲课名称",
          src: addressImg,
          showKey: "address",
        },
        {
          label: "归属系列",
          src: dateImg,
          showKey: "date",
        },
      ],
    };
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

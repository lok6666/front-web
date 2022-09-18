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
import levelImg from "@/images/修改名称.png";
import policyTitleImg from "@/images/类别.png";
import addressImg from "@/images/account.png";
import statusImg from "@/images/符号-状态-警告.png";
import dateImg from "@/images/time.png";
export default {
  data() {
    return {
      tableData: [
        {
          level: "石景山区",
          title: "石政办发〔2022〕6号...",
          address: "北京市星座大厦",
          status: "已申请",
          date: "2016.05.09",
        },
        {
          level: "石景山区",
          title: "北京市石景山区人民政府办公…",
          address: "北京市星座大厦",
          status: "已申请",
          date: "2016.05.07",
        },
        {
          level: "石景山区",
          title: "关于促进中关村虚拟现实…",
          address: "北京市星座大厦",
          status: "已申请",
          date: "2016.05.04",
        },
        {
          level: "石景山区",
          title: "石景山区科普基地认定办法…",
          address: "北京市星座大厦",
          status: "已申请",
          date: "2016.05.03",
        }
      ],
      tableItem: [
        {
          label: "服务名称",
          src: levelImg,
          showKey: "level",
        },
        {
          label: "类别",
          src: policyTitleImg,
          showKey: "title",
        },
        {
          label: "招商服务",
          src: addressImg,
          showKey: "address",
        },
        {
          label: "状态",
          src: statusImg,
          showKey: "status",
        },
        {
          label: "申请日期",
          src: dateImg,
          showKey: "date",
        },
      ],
    };
  },
  methods: {
    checkAll() {
      this.$emit('checkAll', 6);
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

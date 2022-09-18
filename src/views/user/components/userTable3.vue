<template>
<div class="user-table-wrap apply-bg">
  <div class="user-table-title">
    <div class="user-table-service">已报名的服务</div>
    <div class="user-table-all" @click="checkAll">
        <img class="table-icon" src="../../../images/列表.png" style="width: 17px; heigth: 17px;"/>查看全部
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
  import levelImg from "@/images/gift.png";
  import policyTitleImg from "@/images/单位.png";
  import dateImg from "@/images/time.png";
  export default {
    data() {
      return {
        tableData: [{
          level: '石景山区2',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普陀区金沙江路',
          date: '2016.05.03'
        }, {
          level: '石景山区4',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普陀区金沙江路',
          date: '2016.05.03'
        }, {
          level: '石景山区1',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普陀区金沙江路',
          date: '2016.05.03'
        }, {
          level: '石景山区3',
          title: '推进国际科技创新中心建设加快…',
          address: '上海市普陀区金沙江路',
          date: '2016.05.03'
        }],
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
          src: dateImg,
          showKey: "date",
        },
        {
          label: "发布时间",
          src: dateImg,
          showKey: "date",
        },
      ]
      }
    },
    methods: {
      checkAll() {
        this.$emit('checkAll', 5);
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
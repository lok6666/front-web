<template>
  <div class="user-policy-list-wrap apply-bg">
    <div class="user-table-title">
      <div class="user-table-service">站内信息</div>
    </div>
    <div class="container">
      <div class="user-policy-list-content">
            <div class="user-policy-list-content-list">
                <div class="user-policy-list-content-list-item" v-for="(item, index) in newList" :key="index">
                    <p class="user-policy-list-content-list-title">{{item.title}}</p>
                    <p class="user-policy-list-content-list-time">{{item.time}}</p>
                </div>
            </div>
      </div>
      <div class="pagination-block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[10, 40, 70, 80]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="8">
        </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-policy",
  data() {
    return {
      currentPage4: 4,
      mainTabs: ['最新', '热门'],
      current: 1,
      newList: [{
        title: '平台新上线了“建设银行-善心贷”金融产品，请您及时关注',
        time: '2022/9/22'
      },{
        title: '平台新上线了“北京银行-科创贷”金融产品，请您及时关注',
        time: '2022/9/22'
      },{
        title: '平台新上线了“北京银行-创业担保贷”金融产品，请您及时关注',
        time: '2022/9/22'
      },{
        title: '平台新上线了“专精特新中心企业”资质申请服务包，请您及时关注',
        time: '2022/9/22'
      },{
        title: '建设银行信用快贷产品申请已被受理，请您耐心等待。',
        time: '2022/9/20'
      },{
        title: '石景山区政府办印发了《石景山区继续加大中小微企业帮扶力度加快困难企业...',
        time: '2022/5/19'
      },{
        title: '文化产业高峰论坛将于首钢园举办，如有需要请您及时报名。',
        time: '2022/5/04'
      },{
        title: '石景山区经信局印发了《石景山区关于促进 “专精特新”中小企业高质量发展的...',
        time: '2022/4/20'
      }]
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
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
.user-policy-list-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  margin-top: 10px;
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
  .container {
    // margin: 60px 92px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
    .user-policy-list-content {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;
        font-family: PingFangSC-Light, PingFang SC;
        .user-policy-list-content-list {
            width: 100%;
            overflow: scroll;
            color: #212121;
            margin-right: 5px;
            font-weight: 300;
            color: #000000;
            &::-webkit-scrollbar {
              display: none;
            }
            &-item {
                display: flex;
                justify-content: space-between;
                line-height: 5px;
            }
            &-time {
                font-weight: 300;
                color: #A23C3C;
                -webkit-background-clip: text;
            }
        }
    }
    .user-policy-list-more {
      width: 138px;
      height: 112px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #E1E1E1;
      margin-left: 35px;
      margin-right: 25px;
    }
    .pagination-block {
        display: flex;
        justify-content: center;
        height: 80px;
        align-items: center;
    }
  }
}
</style>

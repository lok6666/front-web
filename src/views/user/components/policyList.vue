<template>
  <div class="user-policy-list-wrap">
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
            :total="100">
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
        title: '关于促进中关村虚拟现实产业创新发展的若干',
        time: '2022/9/17'
      },{
        title: '石景山区关于促进冰雪体育产业快 速发展的若干措施(试行)',
        time: '2022/9/16'
      },{
        title: '石景山区促进招商引资的支持办法',
        time: '2022/9/13'
      },{
        title: '石政发〔2019〕7号- 北京市石景山区人民政府关于印发...',
        time: '2022/9/12'
      },{
        title: '北京市石景山区人民政府办公室关于印发《石景山区推进国际科技创...',
        time: '2022/9/11'
      },{
        title: '关于促进中关村虚拟现实产业创新发展的若干',
        time: '2022/9/17'
      },{
        title: '石景山区关于促进冰雪体育产业快 速发展的若干措施(试行)',
        time: '2022/9/16'
      },{
        title: '石景山区促进招商引资的支持办法',
        time: '2022/9/13'
      },{
        title: '石政发〔2019〕7号- 北京市石景山区人民政府关于印发...',
        time: '2022/9/12'
      },{
        title: '北京市石景山区人民政府办公室关于印发《石景山区推进国际科技创...',
        time: '2022/9/11'
      },{
        title: '关于促进中关村虚拟现实产业创新发展的若干',
        time: '2022/9/17'
      },{
        title: '石景山区关于促进冰雪体育产业快 速发展的若干措施(试行)',
        time: '2022/9/16'
      },{
        title: '石景山区促进招商引资的支持办法',
        time: '2022/9/13'
      },{
        title: '石政发〔2019〕7号- 北京市石景山区人民政府关于印发...',
        time: '2022/9/12'
      },{
        title: '北京市石景山区人民政府办公室关于印发《石景山区推进国际科技创...',
        time: '2022/9/11'
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
.user-policy-list-wrap {
  background: #FFFFFF;
  border-radius: 4px;
  margin-top: 10px;
  .container {
    // margin: 60px 92px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    flex-direction: column;
    .user-policy-list-content {
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

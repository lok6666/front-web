<template>
  <div class="new-wrap">
    <div class="container">
      <div class="new-header">
        <div>
          <span class="new-title" v-for="(item, index) in mainTabs" :key="index" @click="changeTab(item.itemType)">{{item.message}}</span>
       </div>
        <span class="new-more">了解更多<div class="new-more-icon"></div></span>
      </div>
      <div class="new-content">
            <img style="margin-right: 20px;width: 427px; height: 304px;" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload.qianlong.com%2F2019%2F0213%2F1550024337804.jpg&refer=http%3A%2F%2Fupload.qianlong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1664933673&t=365d4ee62f00b425cb088bcaf8fb9ebd" alt="">
            <div class="new-content-list">
                <div class="new-content-list-item" @click="routeTo(item.detailType)" v-for="(item, index) in contentList" :key="index">
                    <p class="new-content-list-title">{{item.title}}</p>
                    <p class="new-content-list-time">{{item.time}}</p>
                </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "new",
  data() {
    return {
      mainTabs: [
        {message: '最新新闻', itemType: 'newList'},
        {message: '最新政策', itemType: 'newPolicyList'}
      ],
      current: 1,
      newList: [{
        title: '石景山区启动开学保障执法检查11',
        time: '2022/9/1',
        detailType: '/new-detail'
      },{
        title: '石景山区启动开学保障执法检查11',
        time: '2022/9/1',
        detailType: '/new-detail'
      },{
        title: '石景山区启动开学保障执法检查11',
        time: '2022/9/1',
        detailType: '/new-detail'
      },{
        title: '石景山区启动开学保障执法检查11',
        time: '2022/9/1',
        detailType: '/new-detail'
      },{
        title: '石景山区启动开学保障执法检查11',
        time: '2022/9/1',
        detailType: '/new-detail'
      },{
        title: '石景山区启动开学保障执法检查11',
        time: '2022/9/1',
        detailType: '/new-detail'
      }],
      contentList: [],
      newPolicyList: [{
        title: '石景山区启动开学保障执法检查112',
        time: '2022/9/1',
        detailType: 'policy-detail'
      },{
        title: '石景山区启动开学保障执法检查112',
        time: '2022/9/1',
        detailType: 'policy-detail'
      },{
        title: '石景山区启动开学保障执法检查112',
        time: '2022/9/1',
        detailType: 'policy-detail'
      },{
        title: '石景山区启动开学保障执法检查121',
        time: '2022/9/1',
        detailType: 'policy-detail'
      },{
        title: '石景山区启动开学保障执法检查112',
        time: '2022/9/1',
        detailType: 'policy-detail'
      },{
        title: '石景山区启动开学保障执法检查112',
        time: '2022/9/1',
        detailType: 'policy-detail'
      }]
    }
  },
  created() {
    this.contentList = this.newList;
  },
  methods: {
    changeTab(key) {
      console.log('changeTab', key);
      this.contentList = this[key];
    },
    routeTo(detailType) {
      this.$router.push(detailType)
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
  }
};
</script>

<style lang="scss" scoped>
.new-wrap {
  padding-bottom: 60px;
  .container {
    margin: 60px 92px 60px;
    .new-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: AlibabaPuHuiTiR;
        margin-bottom: 22px;
        .new-title {
            width: 188px;
            height: 55px;
            font-size: 40px;
            color: #212121;
            line-height: 55px;
            cursor: pointer;
        }
        .new-more {
            margin-left: 3px;
            display: flex;
            align-items: center;
            font-size: 24px;
            color: #212121;
            line-height: 39px;
        }
        .new-more-icon {
            display: inline-block;
            height: 25px;
            width: 21px;
            background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngb15678c90c3e40cdc3337341cdd296766fa5f68f7cdd680dcb7959d4e978f376)
                0px 0px no-repeat;
            background-size: 21px 25px;
        }
    }
    .new-content {
        display: flex;
        flex-direction: row;
        align-items: end;
        .new-content-list {
            width: 100%;
            max-height: 242px;
            overflow: scroll;
            color: #212121;
            &::-webkit-scrollbar {
              display: none;
            }
            &-item {
                display: flex;
                justify-content: space-between;
                line-height: 5px;
            }
        }
    }
  }
}
</style>

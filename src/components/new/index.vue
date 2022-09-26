<template>
  <div class="new-wrap">
    <div class="container">
      <div class="new-header">
        <div>
          <span class="new-title" :class="[item.isSelect? 'new-title-select': '']" v-for="(item, index) in mainTabs" :key="index" @click="changeTab(index)">{{item.message}}{{index === 0 ? '/': ''}}</span>
       </div>
        <span class="new-more"  @click="routeTo('/new-more', message)">了解更多<div class="new-more-icon"></div></span>
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
        {message: '最新新闻', itemType: 'newList', isSelect: true},
        {message: '最新政策', itemType: 'newPolicyList', isSelect: false}
      ],
      message: '最新新闻',
      current: 1,
      newList: [{
        title: '石景山区启动开学保障执法检查 石景山园开展2022年“共产党员献爱心” 捐献活动',
        time: '2022/9/19',
        detailType: '/new-detail'
      },{
        title: '石景山区市场监管局全力做好服贸会食品和特种设备安全服务保障工作',
        time: '2022/9/18',
        detailType: '/new-detail'
      },{
        title: '金顶街街道老楼加梯',
        time: '2022/9/17',
        detailType: '/new-detail'
      },{
        title: '让居民幸福感再“梯”升',
        time: '2022/9/16',
        detailType: '/new-detail'
      },{
        title: '2021年数字经济背景下文化品牌价值提升与创新发展人才培养高级研修班成功举办',
        time: '2022/9/15',
        detailType: '/new-detail'
      },{
        title: '迎接“服贸会”，广宁街道各社区开展消防安全主题宣传活动',
        time: '2022/9/13',
        detailType: '/new-detail'
      },{
        title: '第11届北京国际网络电影展荣誉盛典在北京举办',
        time: '2022/9/11',
        detailType: '/new-detail'
      },{
        title: '市委常委、统战部部长游钧到八角街道接访下访',
        time: '2022/9/10',
        detailType: '/new-detail'
      }],
      contentList: [],
      newPolicyList: [{
        title: '关于印发《石景山区鼓励企业上市发展实施办法》的通知',
        time: '2022/9/18',
        detailType: '/policy-detail'
      },{
        title: '关于实施促进就业优惠政策的通知',
        time: '2022/9/17',
        detailType: '/policy-detail'
      },{
        title: '吸引和鼓励高层次 人才创业和工作计划实施办法(试行',
        time: '2022/9/15',
        detailType: '/policy-detail'
      },{
        title: '关于印发《石景山区促进应用场景建设加快创新发展支持办法》的通知',
        time: '2022/9/14',
        detailType: '/policy-detail'
      },{
        title: '提升科技创新能力促进知识产权服务业发展暂行办法',
        time: '2022/9/13',
        detailType: '/policy-detail'
      },{
        title: '关于印发《石景山区鼓励企业上市发展实施办法》的通知',
        time: '2022/9/12',
        detailType: '/policy-detail'
      },{
        title: '关于印发《石景山区非物质文化遗产保护传承专项资金管理暂行办法》的通知',
        time: '2022/9/11',
        detailType: '/policy-detail'
      },{
        title: '关于促进楼宇经济高质量发展的若干措施',
        time: '2022/9/10',
        detailType: '/policy-detail'
      }]
    }
  },
  created() {
    this.contentList = this.newList;
  },
  methods: {
    changeTab(i) {
      this.mainTabs.forEach((el, index) => {
        if(index === i) {
          this.message = el.message;
          el.isSelect = true;
        }
        else {
          el.isSelect = false;
        }
      });
      this.contentList = this[this.mainTabs[i].itemType];
    },
    routeTo(detailType, message) {
      this.$router.push(`${detailType}?message=${message}`);
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
            opacity: 0.5;
        }
        .new-title-select {
          opacity: 1;
           color: #212121;   
        }
        .new-more {
            cursor: pointer;
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
            background: url('../../images/了解更多.png')
                0px 0px no-repeat;
            background-size: 21px 25px;
            margin-left: 5px;
        }
    }
    .new-content {
        display: flex;
        flex-direction: row;
        align-items: end;
        .new-content-list {
            width: 100%;
            max-height: 304px;
            overflow: scroll;
            color: #212121;
            &::-webkit-scrollbar {
              display: none;
            }
            &-item {
                padding-right: 10px;
                white-space: nowrap;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                line-height: 5px;
            }
        }
    }
  }
}
</style>

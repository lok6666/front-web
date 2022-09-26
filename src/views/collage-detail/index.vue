<template>
    <div ref="container" class="home-container">
      <app-header />
      <div class="policy-search-bg">课程详情</div>
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;margin-left: 70px;margin-bottom: 49px;">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>课程详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="policy-container">
        <div class="side-left">
            <div class="left">
                <div class="teacher-name">
                  <img src="../../images/user-logo.png"/>
                  卢孝华
                </div>
                <div class="teacher-desc">金牌教师</div>
                <div class="teacher-time">
                  <div style="font-size: 46px;font-family: AlibabaPuHuiTiM;">9:30</div>
                  <div>{{data_collagedetail.activTime}}</div>
                </div>
                <div class="block"><img src="../../images/basic-location-black.png"/>定位</div>
                <div class="block"><img src="../../images/apply.png"/>报名</div>
            </div>
            <div class="content">
                <div class="content-header">
                    <div class="title">{{title}}</div>
                    <div class="desc">
                        <div style="flex: 0.2;">发布日期:{{time}}</div>
                        <div>来源:{{address}}</div>
                    </div>
                </div>
                <div class="content-center"><p><span style="color: rgb(47, 46, 63); font-size: 24px;">9月3日，区委书记常卫到服贸会区企指挥部检查服贸会疫情防控和服务保障工作。区委副书记、政法委书记刘海涛参加检查。</span></p><p style="text-align: center;"><img src="http://minio.bjwcxf.com/cultural-image/2022-09-16/1663299087366.jpg" alt="使用说明" data-href="http://minio.bjwcxf.com/cultural-image/2022-09-16/1663299087366.jpg" style="width: 100%;"></p><p><span style="color: rgb(47, 46, 63); font-size: 24px;">常卫指出，今天是服贸会公众开放日首日，观展人员数量较前两日有所增长。要压紧压实各方责任，严格落实落细各项措施，全力做好服贸会疫情防控和服务保障工作，确保万无一失。 常卫强调，要严格登录厅人员进入查验，严防“北京健康宝”异常、核酸检测不符合规定的人员入内。做好服务保障人员检录，确保一人一证，不得转借、出售、私自带人出入。做好弹窗人员处理工作，保障服贸会防疫安全。各场馆要加强远端管控，做好引导疏导、人员限流，降低人员聚集风险。 要强化交通接驳，增加班车频次，宣传倡导绿色交通出行方式，缓解周边交通压力。加强停车场动态监测，推进停车资源高效利用。做好场馆周边交通保障，加强巡逻劝导。要加强场馆运行和环境保障，严格展台用电安全巡查检查，做好园区垃圾分类收集清运，加大卫生间等设施消毒消杀和清理频次，确保安全有序稳定。要优化餐饮服务，做好食品供应保障，加大抽查检查，筑牢食品安全防线。要强化会展及配套活动组织，做好招商招展和促消费工作。</span></p><p style="text-align: right;"><span style="color: rgb(47, 46, 63); font-size: 24px;">区领导迟志禹、王智勇、葛强参加检查。</span></p><p style="text-align: right;"><span style="color: rgb(47, 46, 63); font-size: 24px;">来源：文投大数据媒体中心</span></p></div>
            </div>
            <div class="right">
                <div class="collage-title">培训课程</div>
                <div class="collage-desc">{{data_collagedetail.desc}}</div>
                <img src="../../images/collage-time.jpg" />
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  <script>
  import { mapGetters } from "vuex";
  import "swiper/css/swiper.css";
  import AppHeader from "@/components/Header/index";

  import AppFooter from "@/components/footer/index";
  import { pagePublishedArticle } from "@/api/article.js";
  export default {
    name: "Index",
    components: {
      AppHeader,
      AppFooter
    },
    data() {
      return {
        title: '石景山：以精准有力监督推动服贸会顺利举办',
        address: '文投大数据媒体中心',
        time: '2022-9-7',
        list: [{
        title: '石景山区启动开学保障执法检查 石景山园开展2022年“共产党员献爱心” 捐献活动',
        time: '2022/9/19',
        detailType: '/new-detail'
      },{
        title: '让居民幸福感再“梯”升',
        time: '2022/9/16',
      },{
        title: '2021年数字经济背景下文化品牌价值提升与创新发展人才培养高级研修班成功举办',
        time: '2022/9/15'
      },{
        title: '迎接“服贸会”，广宁街道各社区开展消防安全主题宣传活动',
        time: '2022/9/13'
      },{
        title: '第11届北京国际网络电影展荣誉盛典在北京举办',
        time: '2022/9/11'
      }]
      };
    },
    created() {},
    computed: {
      orderBy() {
        return this.mainActive === 0 ? "publish_time" : "view_count";
      },
      ...mapGetters(["device"]),
    },
  
    mounted() {
    },
    computed: {
        ...mapGetters(["data_collagedetail"]),
    },
    created() {
        console.log('data_collagedetail--------', this.data_collagedetail);
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .home-container {
    @import "~@/styles/variables";
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: -webkit-overlay;
    overflow-y: overlay;
    .policy-search-bg {
        margin-top: 100px;
        padding-left: 74px;
        padding-bottom: 24px;
        display: flex;
        align-items: flex-end;
        font-size: 60px;
        font-family: Helvetica;
        color: #FFFFFF;
        width: 100%;
        height: 256px;
        background-size: cover;
        background-image: url('../../images/policysearchBg.png');
    }
    @import '~@/styles/variables';
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: -webkit-overlay;
    overflow-y: overlay;
    .policy-container {
      width: 100%;
      box-sizing: border-box;
      margin: 0 auto;
      margin-bottom: 104px;
      max-width: $ContentContainerW;
      position: relative;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 0px 196px;
      //top: 36px;
      @media screen and (max-width: 960px) {
        margin-top: 0;
      }
      .side-left {
        display: flex;
        .left {
          width: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          .teacher-name {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 20px;
          }
          .teacher-desc {
            font-size: 18px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            margin-bottom: 67px;
          }
          .teacher-time {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 30px;
            font-family: AlibabaPuHuiTiM;
            color: #000000;
            line-height: 47px;
            margin-bottom: 45px;
          }
          .block {
            width: 147px;
            height: 116px;
            background: #FFFFFF;
            border: 2px solid #8B572A;
            display: flex;
            justify-content: center;
            align-items: center;           
            flex-direction: column;
            margin-bottom: 60px;
          }
        }
        .content {
          width: 640px;
            .content-header {
                margin-bottom: 25px;
                .title {
                    font-size: 48px;
                    font-family: AlibabaPuHuiTiB;
                    color: #000000;
                    margin-bottom: 26px;
                }
                .desc {
                  display: flex;
                  width: 100%;
                  justify-content: space-between;
                  font-size: 18px;
                  font-family: AlibabaPuHuiTiR;
                  color: #2B292D;
                }
            }
            .content-center {
              padding-top: 39px;
              border-top: 1px solid #8B572A;
              border-bottom: 1px solid #8B572A;
            }
        }
        .right {
          margin-left: 16px;
          .collage-title {
            font-size: 60px;
            font-family: YouSheBiaoTiHei;
            color: #B48859;
            line-height: 78px;
          }
          .collage-desc {
            width: 290px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiM;
            color: #B48859;
            line-height: 27px;
          }
        }
        @media screen and (max-width: 960px) {
          width: 100%;
        }
      }
    }
  }
  </style>
  
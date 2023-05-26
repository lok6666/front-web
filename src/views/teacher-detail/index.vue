<template>
    <div class="app-container">
      <app-header :nav-item-active="-1" />
      <!--980+305-->
      <div class="teacher-detail-bg">
        <div style="width: 1285px;display: flex;"><div style="width: 310px;height: 10px;"></div>
            黄凌（微观金融专业）
        </div>
      </div>
      <div class="teacher-detail-container">
        <div class="teacher-detail-header">
          <div style="display: flex;width: 100%;justify-content: space-around;">
            <div style="display: flex;flex-direction: column;justify-content: space-around;">
              <div style="width: 980px;height: 95px;display: flex;justify-content: space-between;">
                <img class="header-logo" src="../../images/teaher-logo.png" />
                <div style="display: flex;align-items: center;width: 100%;font-size: 40px;font-family: AlibabaPuHuiTiM;color: #000000;">
                  <img src="../../images/school.png" /><div>南开大学金融学院</div>
                </div>
              </div>
              <div class="fw-model">
                <div class="fw-model-item" v-for="(i, index) in fwList" key="index">
                  <div class="title">{{ i.title }}</div>
                  <div class="data">
                    <span>{{ i.num }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="attention">关注老师</div>
          </div>
        </div>
        <div class="teacher-detail-content">
          <div class="title">教师简介</div>
          <div class="content">
            黄凌，女，汉族，1972年10月生，贵州安顺人，中共党员。1993年7月毕业于贵州师范大学教育系，教育学学士,2000年至2002年12月就读于北京师范大学中文系课程与教学论专业研究生课程班，获硕士研究生毕业同等学力。2009年学校升本为兴义民族师范学院，在教育科学学院任教至今，教育心理学副教授。2008年任黔西南民族师范高等专科学校团委副书记，2011年挂职于兴义团市委，任团市委副书记，2012年任兴义民族师范学院计划财务处处长。2015年1月任经济贸易学院党总支书记，2016年7月任文学与传媒学院党总支书记。2018年11月任物理与工程技术学院党总支书记。论文《党建工作中要坚持文化引领》荣获2017年全省高校党建理论研讨优秀论文暨基层党建主题实践活动优秀成果三等奖。 教学工作：先后担任幼师、大专、本科《心理学》、《教育学》、《教育心理学》、《小学语文教育学》、《小学数学教育学》、《幼儿园课程》、《心理健康教育》《秘书心理学》等十多门课程的教学工作任务。主要研究方向：教育心理学。其他获奖情况：多次获得校级“优秀共产党员”荣誉称号，获三十年州庆“先进工作者”荣誉称号，获省送教下乡“先进工作者”荣誉称号。主要论文和著作：发表专业论文十多篇，主要有《心理健康教育中要充分重视育人环境的建设》、《自主、合作学习方式在作文教学中的运用》、《关于建立基础教育开放、多元学生评价体系的探讨》、《新课程：赋予课堂以生活意义和生命价值》、《关于建立预防性与发展性心理健康教育的思考》、《学前教育发展及专业就业前景的探析》、《贵州省少数民族居民社会支持状况调查》。
          </div>
        </div>
        <div class="teacher-detail-other-content">
          <teacger-collage />
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import { getAccessToken } from "@/utils/auth";
  import AppHeader from "@/components/Header/index.vue";
  import teacgerCollage from "@/components/guide/teacher-collage.vue";
  import bank1 from "../../images/bank1.png";
  import AppFooter from "@/components/footer/index.vue";
  import { updateUser, bindUsername } from "@/api/user.js";
  export default {
    name: "User",
    data() {
      return {
        categoryId: 0,
        fwList: [
          {
            title: "学历",
            num: "教育学博士",
          },
          {
            title: "专业课程",
            num: "1-60月",
          },
          {
            title: "成就",
            num: "25年银行经历",
          }
        ]
      };
    },
    components: {
      AppHeader,
      teacgerCollage,
      AppFooter
    },
    computed: {
      ...mapGetters(["defaultAvatar", "device"]),
      headers() {
        var val = {
          Authorization:getAccessToken(),
        };
        return val;
      },
    },
  
    mounted() {
      this.init();
    },
  
    methods: {
      // 初始化
      init() {
        const userInfo = this.$store.getters.userInfo;
        this.userInfo = userInfo;
        this.username = userInfo.username;
        this.form.nickname = userInfo.nickname;
        this.form.mobile = this.sensitiveMobile(userInfo.mobile);
        this.form.email = this.sensitiveEmail(userInfo.email);
        this.form.gender = userInfo.gender;
        this.originalGender = userInfo.gender;
        this.form.birthday = userInfo.birthday;
        this.originalBirthday = userInfo.birthday;
        this.form.brief = userInfo.brief;
      }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .app-container {
    // padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background: #eee;
    min-height: calc(100vh - 50px);
    position: relative;
  
    @media screen and (max-width: 922px) {
      padding: 0;
      margin: 0;
    }
    .teacher-detail-bg {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 442px;
      font-size: 56px;
      font-family: AlibabaPuHuiTiR;
      color: #FFFFFF;
      width: 100%;
      padding-bottom: 7px;
      background-size: cover;
      background-image: url('../../images/financedetailBg.png');
    }
    .teacher-detail-container {
      max-width: 1440px;
      margin-left: 70px;
      margin-right: 70px;
      padding-bottom: 60px;
      .teacher-detail-header {
        display: flex;
        justify-content: space-between;
        background: #fff;
        flex-direction: column;
        padding: 12px;
        // margin: 0 60px;
        .header-logo {
          position: relative;
          top: -127px;
          width: 310px;
          height: 237px;
        }
        .fw-model {
          display: flex;
          background: #fff;
          border-radius: 4px;
          .fw-model-item {
            height: 120px;
            width: 100%;
            // min-width: 193px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 25px;
            .title {
              font-size: 24px;
              font-family: AlibabaPuHuiTiR;
              color: #4B4B4B;
              line-height: 55px;
            }
            .data {
              span {
                height: 119px;
                font-family: AlibabaPuHuiTiR;
                font-size:40px;
                font-weight: bold;
                color: #4B4B4B;
                line-height: 55px;
              }
            }
          }
        }
        .attention {
          height: 220px;
          width: 220px;
          background-image: url('../../images/attention.png');
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          font-family: Helvetica;
          color: #FFFFFF;
          line-height: 38px;
        }
      }
      .teacher-detail-content {
        background: #FFFFFF;
        margin-top: 28px;
        padding: 37px 46px;
        .title {
          font-size: 28px;
          font-family: AlibabaPuHuiTiB;
          color: #000000;
          line-height: 38px;
          padding-bottom: 18px;
          border-bottom: 1px solid #979797;
        }
        .content { 
          font-size: 18px;
          font-family: AlibabaPuHuiTiR;
          color: #000000;
          line-height: 25px;
        }
      }
      .teacher-detail-other-content {
        margin-top: 49px;
      }
    }
  }
  </style>
  
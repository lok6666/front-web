<template>
  <div class="guide-wrap">
    <div class="container">
      <div class="guide-header">
        <img class="guide-header-logo" src="../../images/guide-logo.png" />
        企业面对面
        <div class="guide-agile">
            <div class="limit-desc">Comperehensive platf</div>
            Cultural industry
            </div>
      </div>
      <el-dialog
        :visible.sync="applydialogVisible"
        :center="true"
        title="活动报名"
        :before-close="closeDialog">
        <form-template
        style="padding: 0px 20px 20px 20px"
        :customStyle="{display: 'flex', 'flex-wrap': 'wrap','justify-content': 'space-between'}"
        @likeCountChanges="likeCountChanges"
        :labelWidth="140"
        :formConfig="activtyForm"
        :showBtn="true"
        :disabled="false"/> 
      </el-dialog>
      <div style="padding: 0 70px;">
        <div class="collage-block">
          <img :src="indexCollage.bdImg" />
          <div style="margin-left: 18px;">
            <div class="title">{{indexCollage.collageName}}</div>
            <div class="desc">{{indexCollage.desc}}</div>
            <div class="apply-time-and-location">
              <div class="applyTime">报名时间:{{indexCollage.applyTimeFrom}}</div>
              <div class="location">培训地点:{{indexCollage.location}}</div>
            </div>
            <div class="footer">
              <div class="apply-num">
                  <div style="font-size: 18px;font-family: AlibabaPuHuiTiR;color: #000000;">报名人数/总数</div>
                  <div class="apply-count"><img src="../../images/apply-user.png" />{{indexCollage.num}}/{{indexCollage.totalNum}}</div>
              </div>
              <div class="other">
                <div class="other-item" style="border: 2px solid #8B572A;">
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">{{indexCollage.xs}}</div>
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{indexCollage.activTime}}</div>
                  <div>2022</div>
                </div>
                <div class="other-item location"><img src="../../images/basic-location.png"/>定位</div>
                <div class="other-item apply"><img src="../../images/user-plus.png" @click="applydialogVisible = true"/>报名</div>
              </div>
            </div>
          </div>
        </div>
        <div class="guide-excellent-busniess-content">
          <div class="guide-excellent-busniess-content-item"
              v-for="(item,index) in collageList"
              :key="index">
              <img :src="item.bdImg" />
              <div style="width: 100%">
                <div class="title">{{item.collageName}}</div>
                <div class="desc">{{item.desc}}</div>
                <!-- <div class="apply-time-and-location">
                  <div class="applyTime">报名时间:{{item.applyTimeFrom}}</div>
                  <div class="location">培训地点:{{item.location}}</div>
                </div> -->
                <div class="other">
                  <div class="other-item" style="border: 2px solid #8B572A;">
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">{{item.xs}}</div>
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{item.activTime}}</div>
                    <div>2022</div>
                  </div>
                  <div class="other-item location"><img src="../../images/basic-location.png"/>定位</div>
                  <div class="other-item apply"><img src="../../images/user-plus.png" @click="applydialogVisible = true"/>报名</div>
                </div>
              </div>
              <div class="check-data" @click="routerTo(item)">查看日程</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { activtyForm } from "@/config/constant.js";
import collagePoster from "../../images/collage-poster.png";
import FormTemplate from "@/components/Form/index.vue";
import collageBg0 from "../../images/collage-bg-0.png";
import collageBg1 from "../../images/collage-bg-1.png";
import collageBg2 from "../../images/collage-bg-2.png";
import collageBg3 from "../../images/collage-bg-3.png";
import basicLocation from "../../images/basic-location.png";
import userPlus from "../../images/user-plus.png";
import applyUser from "../../images/apply-user.png";
import _ from 'lodash';
export default {
  name: "excellent-busniess",
  data() {
    return {
      applydialogVisible: false,
      activtyForm,
      indexCollage: {
        collageName: '如何赋能实体、联动营销”主题沙龙',
        desc: `数藏营销具有哪些优势?谁在玩数藏营销?
        企业在数藏营销落地化

方面做了哪些实践?有什么可复制的经验分享吗?

数藏 赋能私域，

怎么玩才能抓住用户的心?数字藏品怎样

激活线下? 影视联合

数藏有哪些新的可能性?数藏x

元宇宙，新赛道谁能率先领跑?`,
        location: '北京市东城区',
        applyTimeFrom: '2022-09-25',
        num: 19,
        xs: `14:00`,
        basicLocation,
        userPlus,
        totalNum: 40,
        activTime: '9月27日',
        bdImg: collageBg0
      },
      collageList: [{
        collageName: '2022城市更新高级研修班',
        desc: '系统提升城市更新主管单位及项目团队的专业能力与管理能力，为城市更新与文化产业高质量协同发展提供人才支撑。',
        location: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        xs: `9:30`,
        totalNum: 40,
        activTime: '9月21日',
        bdImg: collageBg1
      },
      {
        collageName: '第16届动漫游戏产业发展国际论坛',
        desc: '由市文旅局、市文资中心、经开区管委会主办，市文促中心承办的第 16 届动漫游戏产业发展国际论坛将于 9 月 2 日（星期五）举办。',
        location: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        xs: `9:00`,
        totalNum: 40,
        activTime: '09月02日',
        bdImg: collageBg2
      },{
        collageName: '手作活动邀您纸上徜徉大运河',
        desc: '由北京文化艺术基金支持的“千年水道，文明纸现”大运河文化非遗纸艺展系列的12个大运河主题156场。',
        location: '南锣鼓巷福祥胡同',
        applyTimeFrom: '2022-09-30',
        num: 19,
        xs: `10:00`,
        totalNum: 40,
        activTime: '03月01日',
        bdImg: collageBg3
      }]
    }
  },
  components: {
    FormTemplate,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    debugger;
  },
  methods: {
    routerTo(item) {
      this.$store.dispatch('data/collagedetail', _.cloneDeep(item));
      this.$router.push("/collage-detail");
    },
    likeCountChanges(formConfig) {
      this.applydialogVisible = false;
    },
}
};
</script>

<style lang="scss" scoped>
.guide-wrap {
    background: #fff;
    margin-bottom: none !important;
    .container {
      // margin: 0px 60px;
      padding:30px 0px 58px 0px;
      .guide-excellent-busniess-content {
        margin: 0 auto;
        margin-top: 19px;
        display: flex;
        justify-content: space-between;
        // width: 93%;
        &-item {
          width: 416px;
          // height: 525px;
          background: #FFFFFF;
          border: 1px solid #8B572A;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title {
            font-size: 36px;
            font-family: AlibabaPuHuiTiB;
            color: #212121;
            height: 100px;
            margin: 0 5px;
            display: flex;
            align-items: center;
          }
          .desc {
            // width: 576px;
            // height: 184px;
            margin: 8px 5px 10px 5px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiB;
          }
          .apply-time-and-location {
            font-size: 24px;
            font-family: AlibabaPuHuiTiM;
            color: #000000;
            margin: 14px 0px 21px 0px;
          }
          .other {
            display: flex;
            justify-content: space-around;
            &-item {
              width: 101px;
              height: 116px;
              border-radius: 10px;
              color: #000;
              font-size: 24px;
              background: #FFFFFF;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .location {
              font-size: 18px;
              font-family: AlibabaPuHuiTiR;
              color: #fff;
              background: #EB7F31;
            }
            .apply {
              font-size: 18px;
              font-family: AlibabaPuHuiTiR;
              color: #fff;
              background: #378A44;
            }
          }
          .check-data {
            margin-top: 11px;
            margin-bottom: 12px;
            width: 385px;
            height: 50px;
            background: #2E8ADE;
            border-radius: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            font-family: AlibabaPuHuiTiM;
            color: #FFFFFF;
          }
        }
      }
      .collage-block {
        margin: 0 auto;
        // margin-top: 19px;
        display: flex;
        justify-content: space-between;
        // width: 91%;
        .title {
          font-size: 36px;
          font-family: AlibabaPuHuiTiB;
          color: #212121;
        }
        .desc {
          width: 576px;
          line-height: 43px;
          // height: 184px;
          height: 184px;
          font-size: 20px;
          font-family: AlibabaPuHuiTiB;
        }
        .apply-time-and-location {
          font-size: 24px;
          font-family: AlibabaPuHuiTiM;
          color: #000000;
          margin: 14px 0px 21px 0px;
        }
        .footer {
          .apply-num {
            display: flex;
            justify-content: center;
            align-items: baseline;
            flex-direction: column;
          }
          display: flex;
          justify-content: space-between;
          .apply-count {
            font-size: 50px;
            font-family: AlibabaPuHuiTiM;
            color: #000000;
          }
          .other {
            width: 330px;
            display: flex;
            justify-content: space-between;
            &-item {
              width: 101px;
              height: 116px;
              border-radius: 10px;
              color: #000;
              font-size: 24px;
              background: #FFFFFF;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
            .location {
              font-size: 18px;
              font-family: AlibabaPuHuiTiR;
              color: #fff;
              background: #EB7F31;
            }
            .apply {
              font-size: 18px;
              font-family: AlibabaPuHuiTiR;
              color: #fff;
              background: #378A44;
            }
          }
        }
      }
    }
}
</style>

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
                <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">9:30</div>
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
            <div>
              <div class="title">{{item.collageName}}</div>
              <div class="desc">{{item.desc}}</div>
              <!-- <div class="apply-time-and-location">
                <div class="applyTime">报名时间:{{item.applyTimeFrom}}</div>
                <div class="location">培训地点:{{item.location}}</div>
              </div> -->
              <div class="other">
                <div class="other-item" style="border: 2px solid #8B572A;">
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">9:30</div>
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{indexCollage.activTime}}</div>
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
        collageName: 'Spark+ClickHouse',
        desc: '现阶段的数据开发领域，数据仓库作为企业战略决策的“大脑”，地位日益凸显，对数仓技术的掌握程度也成了大厂面试必考的一环。本课程结合ClickHouse+Spark 这一对数据处理的“黄金搭档”，选取“大数据量企业数据仓库“这一典型场景，实战大数据量下数仓的建模、设计与调优等实用技巧，快速掌握ClickHouse+Spark核心技能，为晋级大数据架构师铺路！',
        location: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        basicLocation,
        userPlus,
        totalNum: 40,
        activTime: '10月05日',
        bdImg: collageBg0
      },
      collageList: [{
        collageName: '公务员考试国考省考',
        desc: '公务员考试国...',
        location: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        totalNum: 40,
        activTime: '10月05日',
        bdImg: collageBg1
      },
      {
        collageName: 'Vue3 + React18',
        desc: '前端项目开发...',
        location: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        totalNum: 40,
        activTime: '10月05日',
        bdImg: collageBg2
      },{
        collageName: '2022升级，重学C++ ',
        desc: 'C++是一门“见效慢”的语言...',
        location: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        totalNum: 40,
        activTime: '10月05日',
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
  methods: {
    async routerTo(item) {
      await this.$store.dispatch('data/collagedetail', _.cloneDeep(item));
      this.$router.push("collage-detail");
    },
    likeCountChanges(formConfig) {
      this.applydialogVisible = false;
    },
}
};
</script>

<style lang="scss" scoped>
.guide-wrap {
    background: #F5F6F9;
    .container {
      margin: 0px 60px;
      padding:30px 0px 58px 0px;
      .guide-excellent-busniess-content {
        margin-top: 19px;
        display: flex;
        justify-content: space-between;
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
          }
          .desc {
            // width: 576px;
            // height: 184px;
            margin-top: 8px;
            margin-bottom: 10px;
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
        display: flex;
        .title {
          font-size: 36px;
          font-family: AlibabaPuHuiTiB;
          color: #212121;
        }
        .desc {
          width: 576px;
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

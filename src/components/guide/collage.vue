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
      <div style="padding: 0 70px;">
        <div class="collage-block">
          <img :src="indexCollage.bdImg" />
          <div style="margin-left: 18px;">
            <div class="title">{{indexCollage.activityName}}</div>
            <div class="desc">{{indexCollage.desc}}</div>
            <div class="apply-time-and-location">
              <div class="applyTime">报名时间:{{indexCollage.applyTimeFrom}}</div>
              <div class="location">培训地点:{{indexCollage.activityAddress}}</div>
            </div>
            <div class="footer">
              <div class="apply-num">
                  <div style="font-size: 18px;font-family: AlibabaPuHuiTiR;color: #000000;">报名人数/总数</div>
                  <div class="apply-count"><img src="../../images/apply-user.png" />{{indexCollage.num}}/{{indexCollage.activiactivityNumber}}</div>
              </div>
              <div class="other">
                <div class="other-item" style="border: 2px solid #8B572A;">
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">{{indexCollage.xs}}</div>
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{indexCollage.activityDateFrom}}</div>
                </div>
                <div class="other-item location"><img src="../../images/basic-location.png"/>定位</div>
                <div class="other-item apply"><img src="../../images/user-plus.png" @click="applyAcitivty()"/>报名</div>
              </div>
            </div>
          </div>
        </div>
        <div class="guide-excellent-busniess-content">
          <div class="guide-excellent-busniess-content-item"
              v-for="(item,index) in collageList"
              :key="index">
              <img :src="item.bdImg" />
              <el-dialog
                :visible.sync="applydialogVisible"
                :center="true"
                title="活动报名"
                width="880px"
                :before-close="closeDialog">
                <div>活动名称:{{indexCollage.activityName}}</div>
                <div>活动名称:{{indexCollage.location}}</div>
                <div>活动开始时间:{{'xxx'}}</div>
                <div>活动结束时间:{{'xxx'}}</div>
                <div>活动报名开始时间:{{'xxx'}}</div>
                <div>活动报名结束时间:{{'xxx'}}</div>
                <form-template
                v-if="applydialogVisible"
                style="padding: 0px 20px 20px 20px;"
                :customStyle="{display: 'grid', 'grid-template-columns': '380px 380px','margin': `0px 0px 0px 30px`}"
                @likeCountChanges="likeCountChanges(item.id, $event)"
                :labelWidth="140"
                :formConfig="activtyForm"
                :showBtn="true"
                :disabled="false"/> 
              </el-dialog>
              <div style="width: 100%">
                <div class="title">{{item.activityName}}</div>
                <div class="desc">{{item.activityAbstract}}</div>
                <!-- <div class="apply-time-and-location">
                  <div class="applyTime">报名时间:{{item.applyTimeFrom}}</div>
                  <div class="location">培训地点:{{item.location}}</div>
                </div> -->
                <div class="other">
                  <div class="other-item" style="border: 2px solid #8B572A;">
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">{{item.xs}}</div>
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{item.activityDateFrom}}</div>
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
import request from '@/utils/request';
import { activtyForm } from "@/config/constant.js";
import { actionAll, activityApplyAddOne } from "@/config/api.js";
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
      companyid: window.localStorage.getItem('USERID'),
      applydialogVisible: false,
      activtyForm,
      indexCollage: {
        activityName: '如何赋能实体、联动营销”主题沙龙',
        activityAbstract: `数藏营销具有哪些优势?谁在玩数藏营销?
        企业在数藏营销落地化

方面做了哪些实践?有什么可复制的经验分享吗?

数藏 赋能私域，

怎么玩才能抓住用户的心?数字藏品怎样

激活线下? 影视联合

数藏有哪些新的可能性?数藏x

元宇宙，新赛道谁能率先领跑?`,
        activityAddress: '北京市东城区',
        applyTimeFrom: '2022-09-25',
        num: 19,
        xs: `14:00`,
        basicLocation,
        userPlus,
        activiactivityNumber: 40,
        activityDateFrom: '9月27日',
        bdImg: collageBg0
      },
      collageList: [{
        activityName: '2022城市更新高级研修班',
        activityAbstract: '系统提升城市更新主管单位及项目团队的专业能力与管理能力，为城市更新与文化产业高质量协同发展提供人才支撑。',
        activityAddress: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        xs: `9:30`,
        activiactivityNumber: 40,
        activityDateFrom: '9月21日',
        bdImg: collageBg1
      },
      {
        activityName: '第16届动漫游戏产业发展国际论坛',
        activityAbstract: '由市文旅局、市文资中心、经开区管委会主办，市文促中心承办的第 16 届动漫游戏产业发展国际论坛将于 9 月 2 日（星期五）举办。',
        activityAddress: '北京-紫竹院香格里拉',
        applyTimeFrom: '2022-09-30',
        num: 19,
        xs: `9:00`,
        activiactivityNumber: 40,
        activityDateFrom: '09月02日',
        bdImg: collageBg2
      },{
        activityName: '手作活动邀您纸上徜徉大运河',
        activityAbstract: '由北京文化艺术基金支持的“千年水道，文明纸现”大运河文化非遗纸艺展系列的12个大运河主题156场。',
        activityAddress: '南锣鼓巷福祥胡同',
        applyTimeFrom: '2022-09-30',
        num: 19,
        xs: `10:00`,
        activiactivityNumber: 40,
        activityDateFrom: '03月01日',
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
  created() {
    request({
        url: `${actionAll}`,
        method: 'post',
        data: {}
      })
      .then((res) => {
          console.log('res----', res.data.list);
          this.collageList = res.data.list;
      })
  },
  mounted() {
  },
  methods: {
    routerTo(item) {
      this.$store.dispatch('data/collagedetail', _.cloneDeep(item));
      this.$router.push("/collage-detail");
    },
    applyAcitivty() {
      this.applydialogVisible = true;
    },
    likeCountChanges(id, formData) {
      request({
        url: `${activityApplyAddOne}`,
        method: 'post',
        data: {
          act_id: id,
          companyid: this.companyid,
          ...formData
        }
      }).then((res) => {
        // todo 修改后台返回字段
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          });
          this.applyMessageForm = this.applyMessageForm.map((e, b) => {
            let result = { ...e };  
            delete result[e.prop];
            return result;
          });
          this.applydialogVisible = false;
        })
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

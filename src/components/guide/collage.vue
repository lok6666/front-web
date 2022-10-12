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
        <div class="collage-block" @click="routerTo(indexCollage)">
          <img :src="indexCollage.activityThumbnail" style="width: 600px;"/>
          <div style="margin-left: 18px;">
            <div class="title">{{indexCollage.activityName}}</div>
            <div class="desc">{{indexCollage.activityAbstract}}</div>
            <div class="apply-time-and-location">
              <div class="applyTime">报名时间:{{indexCollage.applyTimeFrom}}</div>
              <div class="location">培训地点:{{indexCollage.activityAddress}}</div>
            </div>
            <div class="footer">
              <div class="apply-num">
                  <div style="font-size: 18px;font-family: AlibabaPuHuiTiR;color: #000000;">报名人数/总数</div>
                  <div class="apply-count">{{indexCollage.applyNum}}/{{indexCollage.activityNum}}</div>
              </div>
              <div class="other">
                <div class="other-item" style="border: 2px solid #8B572A;">
                  <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{indexCollage.activityDateFrom}}</div>
                </div>
                <div class="other-item location"><img src="../../images/basic-location.png"/>定位</div>
                <div class="other-item apply"><img src="../../images/user-plus.png" @click="applyAcitivty(indexCollage.id)"/>报名</div>
              </div>
            </div>
          </div>
        </div>
        <el-dialog
          :visible.sync="applydialogVisible"
          :center="true"
          title="活动报名"
          width="880px"
          :before-close="closeDialog">
          <form-template
          v-if="applydialogVisible"
          style="padding: 0px 20px 20px 20px;"
          :customStyle="{display: 'grid', 'grid-template-columns': '380px 380px','margin': `0px 0px 0px 30px`}"
          @likeCountChanges="likeCountChanges(applyId, $event)"
          :labelWidth="140"
          :formConfig="activtyForm"
          :showBtn="true"
          :disabled="false"/> 
        </el-dialog>
        <div class="guide-excellent-busniess-content">
          <div class="guide-excellent-busniess-content-item"
              v-for="(item,index) in collageList"
              :key="index">
              <img  class="activityThumbnail" :src="item.activityThumbnail" />
              <div style="width: 100%">
                <div class="title">{{item.activityName}}</div>
                <div class="desc">{{item.activityAbstract}}</div>
                <!-- <div class="apply-time-and-location">
                  <div class="applyTime">报名时间:{{item.applyTimeFrom}}</div>
                  <div class="location">培训地点:{{item.location}}</div>
                </div> -->
                <div class="other">
                  <div class="other-item" style="border: 2px solid #8B572A;">
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 36px;">{{new Date(item.activityDateFrom).getFullYear()}}</div>
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{new Date(item.activityDateFrom).getMonth()}}-{{new Date(item.activityDateFrom).getDate()}}</div>
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{new Date(item.activityDateFrom).getHours()}}:{{new Date(item.activityDateFrom).getMinutes()}}</div>
                  </div>
                  <div class="other-item location"><img src="../../images/basic-location.png"/>定位</div>
                  <div class="other-item apply"><img src="../../images/user-plus.png" @click="applyAcitivty(item.id)"/>报名</div>
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
      applyId: null,
      indexCollage: {},
      collageList: []
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
          // console.log('res----', res.data.list);
          this.indexCollage = res.data.list[0];
          this.collageList = res.data.list.slice(1, 4);
      })
  },
  mounted() {
  },
  methods: {
    routerTo(item) {
      this.$store.dispatch('data/collagedetail', _.cloneDeep(item));
      this.$router.push("/collage-detail");
    },
    applyAcitivty(id) {
      this.applyId = id;
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
          this.activtyForm = this.activtyForm.map((e, b) => {
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
          .activityThumbnail {
            height: 186px;
            width: 416px;
          }
          .title {
            font-size: 36px;
            font-family: AlibabaPuHuiTiB;
            color: #212121;
            height: 100px;
            margin: 0 5px;
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .desc {
            // width: 576px;
            // height: 184px;
            margin: 8px 5px 10px 5px;
            height: 45px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiB;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
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
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
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

<template>
  <div class="app-container">
    <app-header :nav-item-active="4" />
    <div class="trade-bg">
      <div class="trade-title">企业面对面</div>
    </div>
    <div class="trade-container">
      <el-dialog
          :visible.sync="applydialogVisible"
          :center="true"
          title="活动报名"
          height="100%"
          width="880px"
          :lock-scroll="false"
	        :append-to-body="true"
          :before-close="closeDialog">
          <form-template
          v-if="applydialogVisible"
          style="padding: 0px 20px 20px 20px;"
          :customStyle="{display: 'grid', 'grid-template-columns': '380px 380px','margin': `0px 0px 0px 30px`}"
          @likeCountChanges="likeCountChanges(applyId, $event)"
          :labelWidth="140"
          :formConfig="activtyForm"
          @closeDialog="closeDialog"
          :showBtn="true"
          :disabled="false"/> 
        </el-dialog>
        <div style="margin-top: 10px;">活动名称:
          <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="请输入" @input="changeTitle(minValue)">
            <i slot="suffix" class="el-input__icon el-icon-search" :style="'color:#D99447'"/>
          </el-input>
        </div>
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
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 20px;">{{item.activityDateFrom.substring(0, 4)}}年</div>
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{item.activityDateFrom.substring(5, 7)}}月{{item.activityDateFrom.substring(8, 10)}}日</div>
                    <div style="font-family: AlibabaPuHuiTiM;font-size: 22px;">{{item.activityDateFrom.substring(11, 16)}}</div>              
                  </div>
                  <div class="other-item location" @click="routerTo(item)"><img src="../../images/detail.png"  style="height: 40px; width: 40px;"/>查看详情</div>
                  <div class="other-item apply" @click.stop="applyAcitivty(item.id)"><img style="height: 40px; width: 40px;" src="../../images/user-plus1.png"/>报名</div>
                </div>
              </div>
              <!-- <div class="check-data" @click="routerTo(item)">查看日程</div> -->
          </div>
        </div>
    </div>
    <div style="margin: 10px 0px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[6, 40, 70, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <app-footer />
  </div>
</template>

<script>
import FormTemplate from "@/components/Form/index.vue";
import collage from '@/components/guide/collage.vue'
import { actionAll, activityApplyAddOne } from "@/config/api.js";
import { activtyForm } from "@/config/constant.js";
import 'swiper/css/swiper.css';
import request from '@/utils/request'
import AppHeader from "@/components/Header/index";
import AppFooter from "@/components/footer/index";
export default {
  name: "User",
  data() {
    return {
      applydialogVisible: false,
      activtyForm,
      timer1: null,
      buildingName: '',
      minValue: '',
      collageList: [],
      pageSize: 6,
      pageNum: 1,
      total: 0,
    };
  },
  components: {
    AppHeader,
    AppFooter,
    FormTemplate
  },
  created() {
    this.getactionAll();
  },
  mounted() {
  },
  methods: {
    changeTitle(value) {
      if(this.timer1) clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        this.buildingName = value;
        this.getactionAll();
      }, 1000);    
    },
    closeDialog(done) {
      this.applydialogVisible = false;
    },
    getactionAll() {
      request({
        url: `${actionAll}`,
        method: 'post',
        data: {
          activityName: this.buildingName,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      })
      .then((res) => {
        this.total = res.data.total;
        this.collageList = res.data.list;
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getactionAll();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getactionAll();
    },
    routerTo(item) {
      this.$store.dispatch('data/collagedetail', _.cloneDeep(item));
      this.$router.push(`/collage-detail/:collageId=${item.id}`);
    },
    applyAcitivty(id) {
      let userinfo = window.localStorage.getItem('userinfo');
      !userinfo && this.$store.commit('login/CHANGE_VISIBLE', true);
      if(userinfo) {
        this.applyId = id;
        this.applydialogVisible = true;
      };

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
  },
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
  .trade-bg {
    padding-left: 73px;
    padding-bottom: 123px;
    display: flex;
    align-items: flex-end;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    height: 442px;
    background-size: 100% 142%;
    background-image: url('http://minio.bjwcxf.com/cultural-image/cultural-web/行业培训.png');
  }
  .trade-container {
    max-width: 1303px;
    margin-left: 70px;
    margin-right: 70px;
    // padding-bottom: 60px;
    .guide-excellent-busniess-content {
      width: 1300px;
      flex-wrap: wrap;
        margin: 0 auto;
        margin-top: 19px;
        display: flex;
        justify-content: space-between;
        // width: 93%;
        &-item {
          margin-top: 10px;
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
            font-size: 30px;
            font-family: AlibabaPuHuiTiB;
            color: #212121;
            height: 100px;
            margin: 0 5px;
            display: flex;
            align-items: center;
            // white-space: nowrap;
            // overflow: hidden;
            // text-overflow: ellipsis;
          }
          .desc {
            // width: 576px;
            // height: 184px;
            margin: 8px 5px 10px 5px;
            color: #212121;
            height: 45px;
            font-size: 20px;
            font-family: AlibabaPuHuiTiR;
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
            margin-bottom: 10px;
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
              cursor: pointer;
              font-size: 18px;
              font-family: AlibabaPuHuiTiR;
              color: #fff;
              background: #EB7F31;
            }
            .apply {
              cursor: pointer;
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
    .trade-center {
      width: 100%;
      min-width: 1298px;
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: AlibabaPuHuiTiM;
        color: #FFFFFF;
        padding: 0px 36px;
        .collage-title {
          font-size: 42px;
          line-height: 58px;
          margin-bottom: 27px;
          margin-top: 27px;
          // padding: 0px 35px;
        }
        .collage-more {
          color: #FFFFFF;
          line-height: 33px;
        }
      }
      .swiper {
        // margin-left: 35px;
        // height: 300px;
        width: 100%;
        .swiper-wrapper {
          // margin-left: 35px !important;
        }
        .swiper-slide {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
          // margin-left: 33px;
          margin-bottom: 33px;
          width: 240px !important;
          .swiper-item {
            height: 126px;
            width: 240px;  
   /*         width: 224px;
            height: 126px;
            background-size: cover;
            background-repeat: no-repeat;
            cursor: pointer; */
          } 
          .video-desc {
            margin-top: 8px;
            text-align: left;
            width: 224px;
          } 
        }
/*          .swiper-slide:nth-child(2n) {
          width: 40%;
        }
        .swiper-slide:nth-child(3n) {
          width: 20%;
        }  */
      }
    }
  }
}
</style>

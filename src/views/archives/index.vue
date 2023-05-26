<template>
  <div class="app-container">
    <app-header :nav-item-active="3" />
    <div class="protect-bg">
      <div>{{$router.isBeijing() === '#/beijing'? '产品大厅' : '知识产权'}}</div>
    </div>
    <div class="finance-container">
      <div>
         <div class="select-btn" v-if="$router.isBeijing() === '#/beijing'">
          <div>产品类目:</div>
          <div v-for="(btn, index) in serviceList" :key="index">
            <el-button
              class="button-new-tag "
              :class="[btn.isSelect ? 'button-new-tag-select' : 'button-new-tag-not-select']"
              size="small"
              @click="select(index, 'serviceList', btn.branchCode)"
              >{{ btn.branchName }}</el-button
            >
          </div>
        </div>
        <div class="select-btn">
          <div>产品名称:</div>
          <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="请输入" @input="changeTitle(minValue)">
            <i slot="suffix" class="el-input__icon el-icon-search" :style="'color:#D99447'"/>
          </el-input>
         <!--  <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="最低价格" @input="changePrice(minValue, 'minValue')"></el-input>-
          <el-input style="width: 200px" v-model="maxValue" placeholder="最高价格" @input="changePrice(maxValue, 'maxValue')"></el-input> -->
          <div v-for="(btn, index) in priceList" :key="index">
            <el-button
              class="button-new-tag "
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select(index)"
              >{{ btn.message }}</el-button
            >
          </div>
        </div>
<!--         <div class="select-btn">
          <div>发布时间:</div>
            <div v-for="(btn, index) in timeList" :key="index">
              <el-button
                class="button-new-tag "
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select(index, 'time', btn.value)"
                >{{ btn.message }}</el-button
              >
            </div>
             <el-date-picker style="margin-left: 20px;" @click="date" v-model="value2" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
        </div> -->
      </div>
      <div v-if="excellentBusniessList.length !== 0" class="guide-excellent-busniess-content">
        <div  class="guide-excellent-busniess-content-item"
            @click="routeTo(item)" 
            v-for="(item,index) in excellentBusniessList"
            :key="index">
            <img :src="item.serviceImage" class="item-icon"/>
            <!-- <div class="item-icon"  :style="`background-image: url(${item.serviceImage})`"></div> -->
            <div style="height:50px;display: flex;flex-direction:row; align-items:center;justify-content: center;">{{item.serviceName}}</div>
            <div v-if="$router.isBeijing() === '#/beijing'" style="color: red;margin-top: 10px;height:50px;">{{item.servicePrice}}</div>
            <div style="color: #909090;font-size: 16px;display:flex;justify-content: space-between;padding: 0 10px;margin-top: 20px;">
              <div>{{item.serviceHits}}次浏览</div>
              <div v-if="$router.isBeijing() === '#/beijing'">{{item.supplierName}}</div>
            </div>
        </div>
      </div>
      <div v-else class="finance-tooltip">
        <img class="guide-header-logo" style="width: 128px; height: 148px;" src="../../images/noResult.png" />
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import {imgDatalogV3} from "@/utils/util.js";
import {hostList} from '@/config/index'
import { entServiceDockingAll, entServiceUpdate, dictionariesGetByCode } from "@/config/api.js";
import { getDictionariesGetByCode } from "@/utils/util";
import request from '@/utils/request';
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import loanBg1 from "../../images/loan-card-header1.png";
import bank1 from "../../images/bank1.png";
import AppHeader from "@/components/Header/index.vue";
import { MessageBox, Message } from 'element-ui'
// import protect from "./components/protect.vue";
import AppFooter from "@/components/footer/index.vue";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      userId: window.localStorage.getItem('USERID'),
      inputValue: '',
      minValue: '',
      maxValue: '',
      value2: '',
      categoryId: 0,
      serviceType: '',
      startTime: '',
      endTime: '',
      timer: null,
      timer1: null,
      serviceName: '',
      excellentBusniessList: [],
      serviceList: [
        {
          branchName: "全部",
          isSelect: true,
          branchCode: ''
        }
      ],
      timeList: [
      {
          message: "不限",
          isSelect: false,
          value: 0
        },
        {
          message: "近7天",
          isSelect: false,
          value: 7
        },
        {
          message: "近30天",
          isSelect: false,
          value: 30
        },
        {
          message: "近半年",
          isSelect: false,
          value: 180
        },
        {
          message: "近一年",
          isSelect: false,
          value: 360
        }
      ]
    };
  },
  components: {
    AppHeader,
    // protect,
    AppFooter,
  },
  async created() {
    this.serviceList = await getDictionariesGetByCode('archives', this.serviceList);
    this.getEntServiceDockingList();
  },
  watch: {
    $route(val) {
      this.getEntServiceDockingList();
    },
    value2:　function (val, oldVal) {
      this.endTime = val[1].getTime()/1000;
      this.startTime = val[0].getTime()/1000;
      this.getEntServiceDockingList();
    }
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  mounted() {},
  methods: {
    changeTitle(value) {
      if(this.timer1) clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        this.serviceName = value;
        this.getEntServiceDockingList();
      }, 1000);    
    },
    changePrice(value, type) {
      if(this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this[type] = value;
        this.getEntServiceDockingList();
      }, 1000);     
    },
    getEntServiceDockingList() {
      request({
        url: `${entServiceDockingAll}`,
        method: 'post',
        data: {
          serviceLocation: hostList.filter(e => {
              if(window.location.hash.includes(e)) {
                  return e;
              }
          })[0].replace('#/', ''),
          serviceFlag: 1,
          serviceTypes: this.serviceType,
          startTime: this.startTime,
          endTime: this.startTime,
          entId: this.userId,
          // servicePriceStart: this.minValue,
          // servicePriceEnd: this.maxValue,
          serviceName: this.minValue
        }
      })
      .then((res) => {
        this.excellentBusniessList = res.data.list;
      }).catch(e => {
        // 后期可能统一登录
        let userinfo = window.localStorage.getItem('userinfo');
        !userinfo && this.$store.commit('login/CHANGE_VISIBLE', true);
      })
    },
    updateHits(item) {
      request({
        url: `${entServiceUpdate}`,
        method: 'post',
        data: {
          id: item.id,
          serviceHits: item.serviceHits + 1
        }
      });
    },
    select(index, type, value) {
/*       if(type === 'time') {
        let ed = new Date();
        let sd = new Date(ed.getTime() - value*24*60*60*1000);
        this.endTime = ed.getTime()/1000;
        this.startTime = sd.getTime()/1000;
        // this.endTime = `${ed.getFullYear()}-${ed.getMonth()}-${ed.getDate()} ${ed.getHours()}:${ed.getMinutes()}:${ed.getSeconds()}`;
        // this.startTime = `${sd.getFullYear()}-${sd.getMonth()}-${sd.getDate()} ${sd.getHours()}:${sd.getMinutes()}:${sd.getSeconds()}`;
      } else {
        this[type] = value;
      } */
       this[type] = this[type].map(e=> {
        e.isSelect = false;
        return e;
      });
      this[type][index].isSelect = !this[type][index].isSelect;
      this.serviceType = this[type][index].branchCode;
/*       if(this.serviceType.indexOf(this[type][index].value) > -1) {
        this.serviceType.splice(this.serviceType.indexOf(this[type][index].value), 1);
      } else {
        this.serviceType.push(this[type][index].value);
      } */
      this.getEntServiceDockingList();
    },
    detail(index) {
      this.$router.push({
        path: `/finance-detail/:${index}`
      })
    },
    routeTo(item) {
      this.updateHits(item);
      this.$store.dispatch('data/setBusneissDetail', _.cloneDeep(item));
      window.localStorage.setItem('busneiss-detail', JSON.stringify(item));
      this.$router.push({
        path: `/protect-detail/:${item.id}`
      })
    }
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
  .protect-bg {
    padding-left: 73px;
    padding-bottom: 123px;
    display: flex;
    align-items: flex-end;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #FFFFFF;
    width: 100%;
    height: 442px;
    background-size: cover;
    background-image: url('http://minio.bjwcxf.com/cultural-image/cultural-web/产品大厅.png');
  }
  .search {
    width: 100%;
    height: 118px;
    padding: 62px 137px;
    justify-content: center;
    align-items: center;
    background: #FFFFFF;
    .a {
      .input {
        height: 42px !important;
      }
      .el-input-group__append {
        background: white;
      }
    }
  }
  .finance-container {
    max-width: 1440px;
    margin: 31px 70px 0px 70px;
    .finance-tooltip {
      width: 1300px;
      display: flex;
      height: 300px;
      align-items: center;
      font-size: 30px;
      justify-content: center;
    }
    .guide-excellent-busniess-content {
      margin-top: 40px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: repeat(4, 310px);
      grid-gap: 20px 20px;
      &-item {
        cursor: pointer;
        text-align: center;
        padding-bottom: 17px;
        border-radius: 8px;
        font-size: 22px;
        font-family: AlibabaPuHuiTiR;
        color: #2B292D;
        box-shadow: 0px 0px 16px 0px rgba(0,0,0,0.06);
        border-radius: 5px;
        background: #fff;
      }
        .item-icon {
            width: 100%;
            height: 117px;
            margin-bottom: 15px;
            background-size: cover;
            background-repeat: no-repeat;
        }
    }
    .select-btn {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      height: 40px;
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .button-new-tag-select {
        border-radius: 5px;
        background: #ecf5ff;
        color: #409EFF;
        border: 1px solid rgba(0,0,0,0);
      }
      .button-new-tag-not-select {
        color: rgb(96, 98, 102);
        background: #fff;
      }
    }
  }
}
</style>

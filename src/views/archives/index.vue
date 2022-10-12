<template>
  <div class="app-container">
    <app-header :nav-item-active="3" />
    <div class="protect-bg">
      <div>产品大厅</div>
    </div>
    <div class="finance-container">
      <div style="margin: 36px 60px;">
        <div class="select-btn">
          <div>产品类目:</div>
          <div v-for="(btn, index) in serviceList" :key="index">
            <el-button
              class="button-new-tag "
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select(index, 'serviceType', btn.value)"
              >{{ btn.message }}</el-button
            >
          </div>
        </div>
        <div class="select-btn">
          <div>价格范围:</div>
          <el-input style="width: 200px; margin-left: 10px;" v-model="minValue" placeholder="最低价格"></el-input>-
          <el-input style="width: 200px" v-model="maxValue" placeholder="最高价格"></el-input>
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
        <div class="select-btn">
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
        </div>
      </div>
      <div class="guide-excellent-busniess-content">
        <div class="guide-excellent-busniess-content-item"
            @click="routeTo(item)" 
            v-for="(item,index) in excellentBusniessList"
            :key="index">
            <div :style="`background-image: url(${item.serviceImage})`" class="item-icon"></div>
            <div>{{item.serviceName}}</div>
            <div style="color: red;margin-top: 10px;">{{item.servicePrice}}</div>
            <div style="color: #909090;font-size: 16px;display:flex;justify-content: space-between;padding: 0 10px;margin-top: 20px;">
              <div>{{item.serviceHits}}次浏览</div>
              <div>{{item.serviceTurnover}}次申请</div>
            </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { entServiceDockingAll } from "@/config/api.js";
import request from '@/utils/request';
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import loanBg1 from "../../images/loan-card-header1.png";
import bank1 from "../../images/bank1.png";
import AppHeader from "@/components/Header/index";
// import protect from "./components/protect.vue";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      inputValue: '',
      value2: '',
      categoryId: 0,
      serviceType: '',
      startTime: '',
      endTime: '',
      excellentBusniessList: [],
      serviceList: [
        {
          message: "不限",
          isSelect: false,
          value: ''
        },
        {
          message: "税务服务",
          isSelect: false,
          value: 0
        },
        {
          message: "工商业务类",
          isSelect: false,
          value: 2
        },
        {
          message: "资质类",
          isSelect: false,
          value: 3
        },
        {
          message: "公司变更",
          isSelect: false,
          value: 4
        },
        {
          message: "注销及其他",
          isSelect: false,
          value: 1
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
  created() {
    this.getEntServiceDockingList();
  },
  watch: {
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
    getEntServiceDockingList() {
      request({
        url: `${entServiceDockingAll}`,
        method: 'post',
        data: {
          serviceType: this.serviceType,
          startTime: this.startTime,
          endTime: this.startTime
        }
      })
      .then((res) => {
          this.excellentBusniessList = res.data.list;
      })
    },
    select(index, type, value) {
      if(type === 'time') {
        let ed = new Date();
        let sd = new Date(ed.getTime() - value*24*60*60*1000);
        this.endTime = ed.getTime()/1000;
        this.startTime = sd.getTime()/1000;
        // this.endTime = `${ed.getFullYear()}-${ed.getMonth()}-${ed.getDate()} ${ed.getHours()}:${ed.getMinutes()}:${ed.getSeconds()}`;
        // this.startTime = `${sd.getFullYear()}-${sd.getMonth()}-${sd.getDate()} ${sd.getHours()}:${sd.getMinutes()}:${sd.getSeconds()}`;
      } else {
        this[type] = value;
      }
      this.getEntServiceDockingList();
    },
    detail(index) {
      this.$router.push({
        path: `/finance-detail/:${index}`
      })
    },
    routeTo(item) {
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
    background-image: url('../../images/protectBg.png');
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
    margin: 31px 70px 60px 70px;
    .guide-excellent-busniess-content {
      display: grid;
      grid-template-columns: repeat(4, 310px);
      grid-gap: 20px 20px;
      &-item {
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
        background: #D99447;
        border: 1px solid rgba(0,0,0,0);
      }
    }
  }
}
</style>

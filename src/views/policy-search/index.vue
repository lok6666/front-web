<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <div class="policy-search-bg">
      <div style="display: flex;align-items: center;">最新政策<p class="policy-search-agile">Cultural industry</p></div>
    </div>
    <div class="policy-search-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>最新政策</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="search">
        <el-input class="a" v-model="inputValue" style="border-radius: 18px;" placeholder="请输入政策标题" @change="inputConfirm">
       <i slot="suffix"
                        class="el-input__icon el-icon-search"
                        :style="'color:' + inputIconColor"
                        @click="search"
                        />
        </el-input>
      </div>
      <div class="select-btn">
        <div>政策级别:</div>
          <div v-for="(btn, index) in btnList1" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('btnList1', index, 'policyLevel')"
              >{{ btn.message }}</el-button
            >
        </div>
      </div>
      <div class="select-btn">
        <div>发文时间:</div>
          <div v-for="(btn, index) in btnList2" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('btnList2', index, 'time')"
              >{{ btn.message }}</el-button>
        </div>
        <el-date-picker style="margin-left: 20px;"
        @click="date"
        v-model="value2"
        type="daterange"
        align="right"
        start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']"></el-date-picker>
      </div>
      <div class="select-btn">
        <div>政策类型:</div>
          <div v-for="(btn, index) in btnList4" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('btnList4', index, 'policyKind')"
              >{{ btn.message }}</el-button
            >
        </div>
      </div>
<!--       <div class="select-btn">
        <div>惠企方式:</div>
          <div v-for="(btn, index) in btnList3" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('btnList3', index)"
              >{{ btn.message }}</el-button
            >
        </div>
      </div> -->
      <div style="margin-top: 30px;">
            <div style=" margin-bottom: 16px; width: 100%;border-bottom: 0.1px solid;padding-bottom: 10px;">共找到<span style="color: red">{{total}}</span>查询结果</div>
            <div v-for="(item, index) in policyList" :key="index"
              :class="`item-${index} policy-search-container-item`" @click="routeTo(item)">
              <div class="message" style="max-width: 1045px;overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis">{{item.policyTitle}}</div>
              <div class="time" style="display: flex;align-items: center;">
                <div style="background: #409eff;
                  font-size: 12px;
                  padding: 0px 8px;
                  margin-right: 5px;
                  height: 24px;
                  border-radius: 3px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: #fff;" @click.stop="check(index)">
                  <i :class="[item.isCollect? `el-icon-star-on` : `el-icon-star-off`]" style="cursor: pointer;"/>收藏
                </div>
                <div v-if="item.policyTime">
                  {{item.policyTime.substring(0, 10)}}
                </div>
                <div v-else style="width: 81px;">
                  暂无时间
                </div>
              </div>
            </div>
      </div>
      <div class="pagination-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { collagePolicyList, entPolicyCollectInsert, entPolicyCollectDelete } from "@/config/api.js";
import request from '@/utils/request';
import _ from 'lodash';
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import bank1 from "../../images/bank1.png";
import AppHeader from "@/components/Header/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      inputValue: '',
      total: 0,
      policyKind: '',
      startTime: '',
      endTime: '',
      policyTitle: '',
      policyLevel: '',
      categoryId: 0,
      pageSize: 20,
      value2: '',
      pageNum: 1,
      policyList: [],
      policyLocation: '',
      btnList1: [
        {
          message: "不限",
          isSelect: true,
          value: '',
        },
        {
          message: "国家级",
          isSelect: false,
          value: 3,
        },
        {
          message: "北京市",
          isSelect: false,
          value: 2,
        },
        {
          message: "石景山区",
          isSelect: false,
          policyLocation: 'shijingshan',
          value: 1,
        }
      ],
      btnList2: [
        {
          message: "不限",
          isSelect: true,
          value: 1
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
      ],
      btnList4: [
        {
          message: "不限",
          value: '',
          isSelect: true,
        },
        {
          message: "政策文件",
          value: '政策文件',
          isSelect: false,
        },
        {
          message: "政策解读",
          value: '政策解读',
          isSelect: false,
        },
        {
          message: "通知公告",
          value: '通知公告',
          isSelect: false,
        }
      ],
      btnList3: [
        {
          message: "不限",
          isSelect: true,
        },
        {
          message: "奖励",
          isSelect: false,
        },
        {
          message: "评选认定",
          isSelect: false,
        },
        {
          message: "资金扶持",
          isSelect: false,
        },
        {
          message: "降低成本",
          isSelect: false,
        },
        {
          message: "规范管理",
          isSelect: false,
        },
        {
          message: "简化审批",
          isSelect: false,
        },
        {
          message: "其他",
          isSelect: false,
        }
      ]
    };
  },
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  created() {
    this.getPolicyList();
  },
  mounted() {
  },
  watch: {
    value2:　function (val, oldVal) {
      if(val) {
        this.endTime = val[1].getTime();
        this.startTime = val[0].getTime();
      } else {
        this.endTime = '';
        this.startTime = '';
      }
      this.btnList2 = this.btnList2.map(e => {
        e.isSelect = false;
        return e;
      });
      this.getPolicyList();
        }
  },
  methods: {
    inputConfirm(val) {
      this.policyTitle = val;
      this.getPolicyList();
    },
    getPolicyList() {
      let that = this;
      request({
        url: `${collagePolicyList}`,
        method: 'post',
        data: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          policyKind: this.policyKind,
          policyLevel: this.policyLevel,
          startTime: this.startTime,
          endTime: this.endTime,
          policyTitle: this.policyTitle,
          policyLocation: this.policyLocation,
          entId: window.localStorage.getItem('USERID')
        }
      }).then(res => {
        that.policyList = res.data.list;
        that.total = res.data.total;
      });
    },
    routeTo(item, message = '政策') {
      this.$router.push(`${this.message === '最新新闻' ? '/new-detail' : '/policy-detail'}/:artId=${item.id}`);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getPolicyList();
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.getPolicyList();
    },
    check(index) {
      this.policyList[index].isCollect
      ? request({
          url: `${entPolicyCollectDelete}`,
          method: 'delete',
          data: {
            entId: window.localStorage.getItem('USERID'),
            policyId: this.policyList[index].id,
            isCollect: this.policyList[index].isCollect
          }
        }).then(e => {
          this.policyList[index].isCollect = this.policyList[index].isCollect === 0 ? 1 : 0;
          this.policyList = _.cloneDeep(this.policyList);
        })
       
      : request({
          url: `${entPolicyCollectInsert}`,
          method: 'post',
          data: {
            entId: window.localStorage.getItem('USERID'),
            policyId: this.policyList[index].id,
            isCollect: this.policyList[index].isCollect
          }
        }).then(e => {
          this.policyList[index].isCollect = this.policyList[index].isCollect === 0 ? 1 : 0;
          this.policyList = _.cloneDeep(this.policyList);
        });
    },
    search() {

    },
    select(list,index, type) {
      this[list] = this[list].map(e => {
          e.isSelect = false;
          return e;
        });
      this[list][index].isSelect = true;
      this.policyLocation = this[list][index].policyLocation ? this[list][index].policyLocation : this.policyLocation ;
      if(type === 'time') {
        this.value2 = [];
        let ed = new Date();
        let sd = new Date(ed.getTime() - this[list][index].value*24*60*60*1000);
        this.endTime = ed.getTime();
        this.startTime = sd.getTime();
        if(this[list][index].value === 1) {
          this.endTime = '';
          this.startTime = '';
        };
        // this.endTime = `${ed.getFullYear()}-${ed.getMonth()}-${ed.getDate()} ${ed.getHours()}:${ed.getMinutes()}:${ed.getSeconds()}`;
        // this.startTime = `${sd.getFullYear()}-${sd.getMonth()}-${sd.getDate()} ${sd.getHours()}:${sd.getMinutes()}:${sd.getSeconds()}`;
      } else {
        this[type] = this[list][index].value;
      }
      this.getPolicyList();
    },
    detail(index) {
      this.$router.push({
        path: `/policy-search-detail/:${index}`
      })
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
    .policy-search-agile {
        margin-left: 8px;
        font-size: 26px;
        font-family: AlibabaPuHuiTiM;
        line-height: 35px;
    }
  }
  .search {
    width: 100%;
    padding: 28px 67px 36px;
    justify-content: center;
    align-items: center;
    .a {
      .input {
        height: 42px !important;
      }
      .el-input-group__append {
        background: white;
      }
    }
  }
  .policy-search-container {
    max-width: 1440px;
    width: 100%;
    padding: 0px 70px 10px;
    .select-btn {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .button-new-tag {
        margin-left: 10px;
        width: 86px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,0.31);
        &:hover {
          border-radius: 5px;
          background: #fdf6ec;
          color: #e6a23c;
          border: 1px solid rgba(0,0,0,0);
          }
      }
      .button-new-tag-select {
        border-radius: 5px;
        background: #D99447;
        color: #fff;
        border: 1px solid rgba(0,0,0,0);
      }
    }
    &-item {
      cursor: pointer;
      padding-left: 21px;
      padding-right: 45px;
      min-width: 1304px;
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    //偶数行
    &-item:nth-of-type(even) {
      background: #fff
    }
    .pagination-block {
      display: flex;
      justify-content: center;
      height: 80px;
      align-items: center;
    }
  }
}
</style>

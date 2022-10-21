<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      width="450px"
      title="服务申请"
      :before-close="closeDialog">
      <form-template
      style="width: 400px;padding: 0px 20px"
      @closeDialog="closeDialog"
      @likeCountChanges="likeCountChanges"
      :labelWidth="80"
      :formConfig="applyMessageForm2"
      :showBtn="true"
      :disabled="false"/> 
    </el-dialog>
    <!--980+305-->
    <div class="finance-detail-bg">
      <div style="width: 1285px;display: flex;"><div style="width: 310px;height: 10px;"></div>
        {{loanTail.serviceName}}
      </div>
    </div>                     
    <div class="finance-detail-container">
      <div class="finance-detail-header">
        <div style="display: flex;width: 100%;justify-content: space-between;">
          <div style="display: flex;flex-direction: column;justify-content: space-around;">
            <div style="width: 980px;height: 95px;display: flex;justify-content: space-between;">
              <img class="header-logo" :src="loanTail.serviceImages" />
              <div style="display: flex;justify-content: space-around;width: 100%;">
                  <div style="display: flex;align-items: center;justify-content: center;">
                    <div style="background: #ecf5ff;padding: 4px 8px;margin:0 5px 0px;height: 24px" v-for="(item, index) in loanTail.tagList">{{item}}</div>
                  </div>
                <div style="display: flex;align-items: center;">
                  <img src="../../images/safe.png" style="margin-right: 10px;"/>
                  <div>担保方式: {{ loanTail.serviceType }}</div>
                </div>
              </div>
            </div>
            <div class="fw-model">
              <div class="fw-model-item">
                <div class="title">参考利率范围</div>
                <div class="data rate-class">
                  <span>{{ loanTail.serviceRange }}</span>
                </div>
              </div>
              <div class="fw-model-item">
                <div class="title">期限</div>
                <div class="data limit-class">
                  <span>{{ loanTail.serviceTerm }}</span>
                </div>
              </div>
              <div class="fw-model-item">
                <div class="title">额度</div>
                <div class="data ed-class">
                  <span>{{ loanTail.serviceQuota }}</span>
                </div>
              </div>
            </div>
          </div>
          <img @click="applyService()" src="../../images/applyBg.png" />
        </div>
      </div>
      <div class="finance-detail-content">
        <div class="title">产品详情</div>
        <div class="content" v-html="loanTail.serviceContent">
        </div>
      </div>
      <div class="finance-detail-other-content">
        <div class="title">其他产品</div>
        <Loan :loanList="loanList"/>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import AppHeader from "@/components/Header/index";
import { applyMessageForm2 } from "@/config/constant.js";
import { MessageBox, Message } from 'element-ui'
import { financialServicesAll, financialServicesInsert } from "@/config/api.js";
import FormTemplate from "@/components/Form/index.vue";
import request from '@/utils/request';
import Loan from "@/components/loan/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      applydialogVisible: false,
      applyMessageForm2,
      loanTail: JSON.parse(window.localStorage.getItem('loan-detail')),
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
      files: [],
      loanList: [],
      loading: false,
      userInfo: "",
      form: {
        nickname: "",
        mobile: "",
        email: "",
        gender: 0,
        birthday: "",
        brief: "",
      },
    };
  },
  components: {
    AppHeader,
    Loan,
    FormTemplate,
    AppFooter
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device", "data_loandetail"]),
    headers() {
      var val = {
        Authorization:getAccessToken(),
      };
      return val;
    },
  },
  created() {
      request({
        url: `${financialServicesAll}`,
        method: 'post',
        data: {}
      })
      .then((res) => {
          this.loanList = res.data.list.filter(e=> {
            return e.id !== this.loanTail.id;
          });
      })
  },
  watch: {
    data_loandetail: function (val, oldVal) {
      this.loanTail = val;
    }
  },
  mounted() {
    this.init();
  },

  methods: {
    // 初始化
    async applyService() {
      const { data } = await this.$store.dispatch('user/getUserInfo');
      this.applydialogVisible = true
    },
    closeDialog(done) {
      this.applydialogVisible = false;
      done();
    },
    likeCountChanges(formData) {
      request({
        url: `${financialServicesInsert}`,
        method: 'post',
        data: {
          serviceName: this.data_loandetail.serviceName,
          serviceId: this.data_loandetail.id,
          companyId: window.localStorage.getItem('USERID'),
          companyName: JSON.parse( window.localStorage.getItem('userinfo')).entName,
          ...formData
        }
      }).then((res) => {
        // todo 修改后台返回字段
          Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
          });
          this.applyMessageForm2 = this.applyMessageForm2.map((e, b) => {
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
  .finance-detail-bg {
    display: flex;
    align-items: end;
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
  .finance-detail-container {
    max-width: 1440px;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 60px;
    .finance-detail-header {
      display: flex;
      justify-content: space-between;
      background: #fff;
      flex-direction: column;
      border-bottom-right-radius: 64px;
      // margin: 0 60px;
      .header-logo {
        position: relative;
        top: -127px;
        width: 310px;
        height: 237px;
        box-shadow: -10px 10px 5px #888888;
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
          .rate-class {
            font-size: 40px;
          }
          .limit-class {
            color: #4B4B4B;
            font-size: 30px;
          }
          .ed-class {
            color: #D0021B; 
            font-size: 34px;
          }
          .data {
            span {
              
              font-family: AlibabaPuHuiTiR;
              line-height: 53px;
            }
          }
        }
      }
    }
    .finance-detail-content {
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
        padding-top: 28px;
        line-height: 25px;
        font-family: AlibabaPuHuiTiR;
      }
    }
    .finance-detail-other-content {
      margin-top: 49px;
      .title {
        font-size: 28px;
        font-family: AlibabaPuHuiTiB;
        color: #000000;
        line-height: 38px;
        padding-bottom: 18px;
        border-bottom: 1px solid #979797;
      }
    }
  }
}
</style>

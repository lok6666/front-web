<template>
  <div ref="container" class="home-container">
    <app-header />
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      width="450px"
      title="服务申请"
      :before-close="closeDialog">
      <form-template
      style="width: 400px;padding: 0px 20px"
      @likeCountChanges="likeCountChanges"
      :labelWidth="80"
      :formConfig="applyMessageForm2"
      :showBtn="true"
      :disabled="false"/> 
    </el-dialog>
    <div class="protect-detail-bg">{{busneissData.serviceName}}</div>
    <div class="policy-container">
      <div class="side-left">
        <div class="protect-block" v-html="busneissData.serviceSynopsis">
          
        </div>
        <div class="protect-apply">
          <div class="protect-apply-btn" v-if="authorization">
            <span>联系人:{{busneissData.supplierPerson}}</span>
            <span>联系电话:{{busneissData.supplierContactX}}</span>
          </div>
          <div class="protect-apply-btn" v-else>
            <span>请登录查看联系人及联系方式</span>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAccessToken } from '@/utils/auth'
import "swiper/css/swiper.css";
import { entServiceDockingInsert } from "@/config/api.js";
import request from '@/utils/request';
import { MessageBox, Message } from 'element-ui'
import { applyMessageForm2 } from "@/config/constant.js";
import FormTemplate from "@/components/Form/index.vue"
import AppHeader from "@/components/Header/index";
import AppFooter from "@/components/footer/index";
import { pagePublishedArticle } from "@/api/article.js";
export default {
  name: "Index",
  components: {
    AppHeader,
    FormTemplate,
    AppFooter
  },
  data() {
    return {
      authorization: getAccessToken(),
      applydialogVisible: false,
      applyMessageForm2,
      busneissData: null,
      userinfo: window.localStorage.getItem('userinfo'),
      list: [{
        message: '⼊驻天猫京东等电商⽹站必须要有商标资质'
      },{
        message: '开通微信、微博认证时必备'
      },{
        message: '区分商品和服务的来源， 防⽌名称被他⼈使'
      },{
        message: '可通过交易变现获得财富'
      }]
    };
  },
  created() {
    this.busneissData = JSON.parse(window.localStorage.getItem('busneiss-detail'));
  },
  computed: {
    orderBy() {
      return this.mainActive === 0 ? "publish_time" : "view_count";
    },
    ...mapGetters(["device", "data_busneissdetail"]),
  },

  mounted() {
  },

  methods: {
    closeDialog(done) {
      this.applydialogVisible = false;
      // done();
    },
    likeCountChanges(formData) {
      request({
        url: `${entServiceDockingInsert}`,
        method: 'post',
        data: {
          serviceName: this.data_busneissdetail.serviceName,
          serviceId: this.data_busneissdetail.id,
          companyId: window.localStorage.getItem('USERID'),
          companyName: window.localStorage.getItem('userinfo').entName,
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
  },
};
</script>

<style lang="scss" scoped>
.home-container {
  @import "~@/styles/variables";
  width: 100%;
  height: 100vh;
  overflow-x: overlay;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;
  .protect-detail-bg {
      margin-top: 100px;
      padding-left: 74px;
      padding-bottom: 24px;
      display: flex;
      align-items: flex-end;
      font-size: 56px;
      font-family: AlibabaPuHuiTiR;
      color: #FFFFFF;
      width: 100%;
      height: 422px;
      background-size: cover;
      background-image: url('../../images/protect-detail-bg.png');
  }
  @import '~@/styles/variables';
  width: 100%;
  height: 100vh;
  overflow-x: overlay;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;
  .policy-container {
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    margin-bottom: 104px;
    max-width: $ContentContainerW;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    //top: 36px;
    @media screen and (max-width: 960px) {
      margin-top: 0;
    }
    .side-left {
      .protect-block {
        // padding-top: 8px;
        padding-top: 20px;
        background: #fff;
        width: 1200px;
        // padding: 20px 20px 0px 20px;
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        p {
          text-indent: 0em;
          padding: 0px 31px 0px 31px;
        }
      }
      .protect-apply {
        display: flex;
        flex-direction: column;
        /* justify-content: center; */
        align-items: center;
        .title {
          height: 44px;
          font-size: 16px;
          font-family: AlibabaPuHuiTiR;
          color: #8B8B8B;
          line-height: 22px;
        }
        .protect-apply-btn {
          width: 460px;
          height: 82px;
          background: #B48859;
          border-radius: 20px;
          font-size: 24px;
          font-family: AlibabaPuHuiTiM;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      @media screen and (max-width: 960px) {
        width: 100%;
      }
    }
  }
}
</style>

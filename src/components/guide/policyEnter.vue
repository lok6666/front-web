<template>
  <div class="guide-wrap policy-enter-bg">
    <policy-calculate :dialogVisible="dialogVisible" @handleClose="handleClose" @dialogClose="dialogClose"/>
      <el-dialog
          :visible.sync="applydialogVisible"
          :center="true"
          title="政策申报"
          style="overflow: scroll;"
          width="50%"
          :lock-scroll="false"
          :before-close="closeDialog">
          <form-template
          v-if="applydialogVisible"
          style="padding: 0px 20px 20px 20px"
          :customStyle="{display: 'flex', 'flex-wrap': 'wrap','justify-content': 'space-between'}"
          @likeCountChanges="likeCountChanges()"
          @closeDialog="closeDialog"
          :labelWidth="140"
          :formConfig="applyForm"
          :showBtn="true"
          :disabled="false"/> 
          <!-- <iframe style="width: 100%; height: 1000px;border: none;" src="https://wwo.wps.cn/office/w/2c9ebac580c36fc50183ca284d771141?_w_userid=3&_w_filetype=db&_w_filepath=%E7%A9%BA%E6%96%87%E6%A1%A3.docx&_w_appid=5b8f173bd752464d81b7aa78001c697f&_w_redirectkey=123456&_w_signature=enR248IrgRS1JbWCRfwDC3IDJJA%3D" /> -->
      </el-dialog>
    <div class="container">
      <div class="guide-policyEnter-content">
        <div class="policy-block search" @click="policyMatch()" >
            <div></div>
            <img class="guide-header-logo" src="../../images/guide-logo.png" />
            政策计算器
            <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
        </div>
        <div class="divide"></div>
        <div class="policy-block apply" @click="policyClu()" >
            <div></div>
            <img class="guide-header-logo" src="../../images/guide-logo.png" />
            政策匹配
            <div class="guide-agile">
            <div class="limit-desc">Comperehensive platform</div>
            Cultural industry
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import { policyMatchTagsGet } from "@/config/api";
import request from "@/utils/request";
import { applyForm } from "@/config/constant.js";
import PolicyCalculate from '@/components/Policycalculate/index'
import FormTemplate from "@/components/Form/index.vue";
import { Message } from 'element-ui'
export default {
  name: "policyEnter",
  data() {
    return {
      applyForm,
      dialogVisible: false,
      applydialogVisible: false,
      userId: window.localStorage.getItem("USERID"),
    }
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
  components: {
    PolicyCalculate,
    FormTemplate
  },
  methods: {
    getpolicyMatchTagsGet() {
      request({
        url: `${policyMatchTagsGet}`,
        method: "GET",
        // todo 考虑 id怎么传进去
        params: {
          companyid: this.userId,
        },
      }).then(({ data }) => {
        if(!data) {
          MessageBox({
            title: '温馨提示',
            center: true,
            message: '您的企业标签未填写,请前往个人中心基本信息处填写',
            showConfirmButton: true,
            beforeClose:(action, instance, done) => {
              done();
            }
          })
        } else {
          this.$router.push('/policy-match/政策匹配')
        }
      });
    },
    policyMatch() {
      this.dialogVisible = true;
      // this.$router.push('/policy-match/政策匹配');
    },
    policyClu() {
      // 判断是否填写基本信息
      let userinfo = window.localStorage.getItem('userinfo');
      !userinfo && this.$store.commit('login/CHANGE_VISIBLE', true);
      userinfo && this.getpolicyMatchTagsGet();
    },
    handleClose() {
      this.dialogVisible = false;
      this.$router.push('/policy-cul/政策计算器');
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    likeCountChanges() {
    },
    submit() {
      Message({
        message: '保存成功',
        type: 'success',
        duration: 5 * 1000
      });
      this.applydialogVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.policy-enter-bg {
    background: #fff;
};
.guide-wrap {
  .container {
    padding: 30px 60px;
    .guide-policyEnter-content {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        .policy-block {
          cursor: pointer;
          display: flex;
          align-items: flex-end;
          align-items: flex-end;
          justify-content: center;
          width: 596px;
          font-size: 56px;
          padding-bottom: 33px;
          color: #212121;
          height: 517px;
          background-size: cover !important;
          background-repeat: no-repeat;
        }
        .search {
        background: url("http://minio.bjwcxf.com/cultural-image/cultural-web/index-政策查询.png");
        }
        .divide {
        width: 1px;
        height: 512px;
        border: 1px solid #979797;
        }
        .apply {
        background: url("http://minio.bjwcxf.com/cultural-image/cultural-web/index-政策申报.png");
        }
    }
  }
}
</style>

<template>
  <div class="app-container">
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      custom-class="vip-dialog"
      title="会员权益"
      width="1240px"
      top="100px"
      :lock-scroll="false"
      :append-to-body="true"
      :before-close="closeDialog"
    >
      <el-descriptions title="" direction="vertical" :column="6" :border="true">
        <el-descriptions-item
          label="大项"
          label-class-name="type-label"
          content-class-name="big-content"
        >
        <div>
          <div class="border-bottom flex-1 height-21">灵活用工</div>
          <div class="border-bottom flex-1 height-63">资质类</div>
          <div class="border-bottom flex-1 height-126">公司变更</div>
          <div class="border-bottom flex-1 height-63">其他</div>
          <div class="border-bottom flex-1 height-84">财税服务</div>
          <div class="border-bottom flex-1 height-84">税务服务</div>
          <div class="border-bottom flex-1 height-126">知识产权</div>
          <div class="border-bottom flex-1 height-147">资质认定</div>
          <div class="border-bottom flex-1 height-42">政府补贴</div>
          <div class="border-bottom flex-1 height-21">税收优惠</div>
        </div>
        </el-descriptions-item>
        <el-descriptions-item
          label="小项"
          label-class-name="type-label"
          content-class-name="type-content">
          <div>
            <!--灵活用工-->
          <div class="border-bottom flex-1 height-21">提供灵活用工服务</div>
          <!--资质类-->
          <div class="border-bottom flex-2 height-63">
            <div>广播电视节目制作许可证</div>
            <div>营业性演出经纪许可证</div>
            <div>出版物经营许可证</div>
          </div>
          <!--公司变更-->
          <div class="border-bottom flex-2 height-126">
            <div>股权变更</div>
            <div>注册地址变更</div>
            <div>经营范围变更</div>
            <div>法人/监事变更</div>
            <div>名称变更</div>
            <div>改制</div>
          </div>
          <!--其他-->
          <div class="border-bottom flex-2 height-63">
            <div>执照印章补办</div>
            <div>工商解异常</div>
            <div>工商年报</div>
          </div>
          <!--财税服务-->
          <div class="border-bottom flex-2 height-84">
            <div>小规模代理记账</div>
            <div>小规模+税控托管</div>
            <div>一般人代理记账</div>
            <div>一般人+税控托管</div>
          </div>
          <!--税务服务-->
          <div class="border-bottom flex-2 height-84">
            <div>税务报道</div>
            <div>申请税控</div>
            <div>税务解锁</div>
            <div>税控解锁</div>
          </div>
          <!--知识产权-->
          <div class="border-bottom flex-2 height-126">
            <div>专家快速商标注册</div>
            <div>双享商标注册</div>
            <div>担保商标注册</div>
            <div>文字或美术著作权申请</div>
            <div>外观设计专利-单个申请减缴</div>
            <div>文字或美术著作权申请</div>
          </div>
          <!--资质认定-->
          <div class="border-bottom flex-2 height-147">
            <div>国高新技术企业资格申报</div>
            <div>国高新技术企业资格维护</div>
            <div>中关村高新企业认定</div>
            <div>双软认定</div>
            <div>企业技术中心认定</div>
            <div>北京市创新中小企业认定（专精特新）</div>
            <div>专精特新“小巨人”资格申请</div>
          </div>
          <!--政府补贴-->
          <div class="border-bottom flex-2 height-42">
            <div>
              科技型中小微企业研发经费补贴申报
            </div>
            <div>政府资金补贴/奖励专项申报</div>
          </div>
          <!--税收优惠-->
          <div class="border-bottom flex-2 height-21">
            <div>研发费用加计扣除申报</div>
          </div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="一万权益"
          :label-class-name="oneLevel"
          :content-class-name="oneContent">
          <div class="border-bottom flex-1">服务费费率7.6%</div>
          <div style="display: flex;">
            <div class="border-right width-100">
              <!--灵活用工-->
              <!--资质类-->
              <div class="border-bottom flex-1 height-63">
                <div>无</div>
              </div>
              <!--公司变更-->
              <div class="border-bottom flex-1 height-126">
                <div>六选一</div>
              </div>
              <!--其他-->
              <div class="border-bottom flex-1 height-63">
                <div>三选一</div>
              </div>
              <!--财税服务-->
              <div class="border-bottom flex-1 height-84">
                <div>四选一</div>
              </div>
              <!--税务服务-->
              <div class="border-bottom flex-1 height-84">
                <div>四选二</div>
              </div>
              <!--知识产权-->
              <div class="border-bottom flex-1 height-126">
                <div>五选二</div>
              </div>
              <!--资质认定-->
              <div class="border-bottom flex-1 height-147">
                <div>无</div>
              </div>
              <!--政府补贴-->
              <div class="border-bottom flex-1 height-42">
                <div>无</div>
              </div>
              <!--税收优惠-->
              <div class="border-bottom flex-1 height-21">
                <div>无</div>
              </div>
            </div>
            <div class="border-bottom flex-1 width-100">五选二</div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="三万权益"
          :label-class-name="thirdLevel"
          :content-class-name="thirdContent">
          <div class="border-bottom flex-1">服务费费率7.2%</div>
          <div style="display: flex;">
            <div class="border-right width-100">
              <!--灵活用工-->
              <!--资质类-->
              <div class="border-bottom flex-1 height-63">
                <div>三选一</div>
              </div>
              <!--公司变更-->
              <div class="border-bottom flex-1 height-126">
                <div>六选三</div>
              </div>
              <!--其他-->
              <div class="border-bottom flex-1 height-63">
                <div>每项1次</div>
              </div>
              <!--财税服务-->
              <div class="border-bottom flex-1 height-84">
                <div>四选一</div>
              </div>
              <!--税务服务-->
              <div class="border-bottom flex-1 height-84">
                <div>每项1次</div>
              </div>
              <!--知识产权-->
              <div class="border-bottom flex-1 height-126">
                <div>五选三</div>
              </div>
              <!--资质认定-->
              <div class="border-bottom flex-1 height-147">
                <div>七选一</div>
              </div>
              <!--政府补贴-->
              <div class="border-bottom flex-1 height-42">
                <div>累计优惠5000</div>
              </div>
              <!--税收优惠-->
              <div class="border-bottom flex-1 height-21">
                <div>2次</div>
              </div>
            </div>
            <div class="border-bottom flex-1 width-100">九选四</div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="五万权益"
          :label-class-name="fiveLevel"
          :content-class-name="fiveContent">
          <div class="border-bottom flex-1">服务费费率6.8%</div>
          <div style="display: flex;">
            <div class="border-right width-100">
              <!--灵活用工-->
              <!--资质类-->
              <div class="border-bottom flex-1 height-63">
                <div>三选二</div>
              </div>
              <!--公司变更-->
              <div class="border-bottom flex-1 height-126">
                <div>每项1次</div>
              </div>
              <!--其他-->
              <div class="border-bottom flex-1 height-63">
                <div>每项1次</div>
              </div>
              <!--财税服务-->
              <div class="border-bottom flex-1 height-84">
                <div>四选一</div>
              </div>
              <!--税务服务-->
              <div class="border-bottom flex-1 height-84">
                <div>每项1次</div>
              </div>
              <!--知识产权-->
              <div class="border-bottom flex-1 height-126">
                <div>五选四</div>
              </div>
              <!--资质认定-->
              <div class="border-bottom flex-1 height-147">
                <div>七选二</div>
              </div>
              <!--政府补贴-->
              <div class="border-bottom flex-1 height-42">
                <div>累计优惠10000</div>
              </div>
              <!--税收优惠-->
              <div class="border-bottom flex-1 height-21">
                <div>3次</div>
              </div>
            </div>
            <div class="border-bottom flex-1 width-100">九选四</div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="十万权益"
          :label-class-name="tenLevel"
          :content-class-name="tenContent">
          <div class="border-bottom flex-1 height-21">服务费费率6.4%</div>
          <div style="display: flex;">
            <div class="border-right width-100">
              <!--灵活用工-->
              <!--资质类-->
              <div class="border-bottom flex-1 height-63">
                <div>每项1次</div>
              </div>
              <!--公司变更-->
              <div class="border-bottom flex-1 height-126">
                <div>每项1次</div>
              </div>
              <!--其他-->
              <div class="border-bottom flex-1 height-63">
                <div>每项1次</div>
              </div>
              <!--财税服务-->
              <div class="border-bottom flex-1 height-84">
                <div>四选一</div>
              </div>
              <!--税务服务-->
              <div class="border-bottom flex-1 height-84">
                <div>每项1次</div>
              </div>
              <!--知识产权-->
              <div class="border-bottom flex-1 height-126">
                <div>每项2次</div>
              </div>
              <!--资质认定-->
              <div class="border-bottom flex-1 height-147">
                <div>七选二</div>
              </div>
              <!--政府补贴-->
              <div class="border-bottom flex-1 height-42">
                <div>累计优惠15000</div>
              </div>
              <!--税收优惠-->
              <div class="border-bottom flex-1 height-21">
                <div>4次</div>
              </div>
            </div>
            <div class="border-bottom flex-1 width-100">九选七</div>
          </div>
        </el-descriptions-item>
        <el-descriptions-item :span="5">
          <div style="font-weight:bolder;font-size: 20px;text-align:center">注：所有服务项目均为会员期内按单次或者单年计算，所选服务项目除特殊注明外均只能享有一次服务权益，不得重复选择。</div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <app-header :nav-item-active="-1" />
    <AI v-if="AIDialogVisible" @bClose="bClose" />
    <img src="../../images/userBg.png" style="width: 100%;height: 362px;" />
    <div class="user-caontainer">
      <div class="user-header">
        <img :src="logoImg || totalPng" class="logo-img"/>
        <span style="display: inline-block; margin-left: 20px; width: 100%">
          <div
            style="    display: flex;
    justify-content: space-between;"
          >
            <h1>{{ entName }}</h1>
   <!--          <div
              style="cursor: pointer;    display: flex;
    align-items: center;"
            >
              <img class="vip-img" :src="vipImgObj[vipType[entLevel]]">
              <h1 @click="vipColorChoose(vipType[entLevel])">
                {{ vipType[entLevel] }}
              </h1>
            </div> -->
          </div>
          <div class="fw-model">
            <div class="fw-model-item" v-for="(i, index) in fwList" key="index">
              <div class="title">{{ i.title }}</div>
              <div class="data">
                <span>{{ i.num }}</span
                >{{ i.type }}
              </div>
            </div>
          </div>
        </span>
      </div>
      <div class="setting-box">
        <ul v-if="device === 'desktop'" class="left-list">
          <li
            v-for="(category, index) in categorys"
            :key="index"
            class="left-list-item"
            :class="{ 'left-list-item-active': categoryId === category.id }"
            @click="chageTab(category.id, category.formType)"
          >
            <div
              :class="[
                categoryId === category.id
                  ? `user-icon-${category.id}-active`
                  : `user-icon-${category.id}`,
              ]"
              style="width: 20px; height: 20px;"
            ></div>
            <!-- <img src="../../images/home.png"> -->
            {{ category.name }}
            <!-- <span class="item-content">{{ category.name }}</span> -->
          </li>
          <div class="list-title">资产管理</div>
          <li
            v-for="(property, index) in propertys"
            :key="index"
            class="left-list-item"
            :class="{ 'left-list-item-active': categoryId === property.id }"
            @click="chageTab(property.id, property.formType)"
          >
            <div
              :class="[
                categoryId === property.id
                  ? `user-icon-${property.id}-active`
                  : `user-icon-${property.id}`,
              ]"
              style="width: 20px; height: 20px;"
            ></div>
            <!-- <img src="../../images/home.png"> -->
            {{ property.name }}
            <!-- <span class="item-content">{{ category.name }}</span> -->
          </li>
          <div class="list-title">服务管理</div>
          <li
            v-for="(service, index) in services"
            :key="index"
            class="left-list-item"
            :class="{ 'left-list-item-active': categoryId === service.id }"
            @click="chageTab(service.id, service.formType)"
          >
            <div
              :class="[
                categoryId === service.id
                  ? `user-icon-${service.id}-active`
                  : `user-icon-${service.id}`,
              ]"
              style="width: 20px; height: 20px;"
            ></div>
            <!-- <img src="../../images/home.png"> -->
            {{ service.name }}
            <!-- <span class="item-content">{{ category.name }}</span> -->
          </li>
        </ul>
        <div class="setting-box-center">
          <div v-if="categoryId === 0 && echartsOptions.dataset">
            <echarts :echartsOptions="echartsOptions" id="1" height="300" />
            <policy @checkAll="checkAll" />
            <userTable @checkAll="checkAll" />
            <userTable2 @checkAll="checkAll" />
            <userTable3 @checkAll="checkAll" />
          </div>
          <div v-else-if="categoryId === 1">
            <form-template
              style="padding: 0px 20px;"
              :customStyle="{
                display: 'grid',
                'grid-template-columns': '400px 400px',
                margin: `0px 0px 0px 100px`,
              }"
              @likeCountChanges="
                likeCountChanges(
                  isExist ? entInfoUpdate : entInfoInsert,
                  'POST',
                  $event,
                  policyExist ? policyMatchTagsUpdate : policyMatchTagsInsert
                )
              "
              :labelWidth="140"
              title="基本信息"
              :formConfig="messageForm"
              :showBtn="true"
              :showCanelBtn="false"
              :disabled="false"
            />
          </div>
          <div v-else-if="categoryId === 2">
            <form-template
              style="padding: 0px 20px 20px 20px"
              :customStyle="{ margin: `0px 0px 0px 100px` }"
              @likeCountChanges="
                likeCountChanges(
                  isExist ? entPropagateTemplateUpdate : entPropagateTemplateInsert,
                  'POST',
                  $event
                )
              "
              :labelWidth="100"
              title="宣传信息管理"
              :formConfig="propagandaForm"
              :showBtn="true"
              :showCanelBtn="false"
              :disabled="false"
            />
          </div>
          <div v-else-if="categoryId === 3">
            <price-form-template
              style="padding:20px 20px 20px; min-height: 700px;"
              @likeCountChanges="
                likeCountChanges(
                  isExist ? entIncomeUpdate : entIncomeInsert,
                  'POST',
                  $event
                )
              "
              :labelWidth="220"
              :showBtn="true"
              :showCanelBtn="false"
              :disabled="false"
            />
          </div>
          <div v-else-if="categoryId === 4" style="display: flex;">
            <img style="float: left" src="../../images/认证.png" />
            <div style="margin-top: 157px;width: 50%;">
              <h2 style="margin-bottom: 50px;">您已通过企业认证</h2>
              <div v-for="(item, index) in baForm1" style="height:50px;">
                <span>{{ item.label }}：</span>
                <span>{{ item[item.prop] }}</span>
              </div>
            </div>
          </div>
          <div v-else-if="categoryId === 5">
            <userTable4 />
          </div>
          <div v-else-if="categoryId === 6">
            <userTable5 />
          </div>
          <div v-else-if="categoryId === 7">
            <userTable6 />
          </div>
          <div v-else-if="categoryId === 8">
            <policyList />
          </div>
          <!--           <div v-else-if="categoryId === 9">
            <form-template
              style="padding: 0px 20px 20px 20px"
              :customStyle="{'margin': `0px 0px 0px 100px`}"
              @likeCountChanges="likeCountChanges(true?  entReset : entReset, 'POST', $event)"
              :labelWidth="140"
              title="账户信息"
              :formConfig="accountForm"
              :showBtn="true"
              :disabled="false"/> 
          </div> -->
        </div>
        <!-- <div class="setting-box-right">
          <div class="enterprise-service">
            <div class="enterprise-service-echarts-title">企业服务占比：</div>
            <echarts :echartsOptions="echartsOptions2" id="2"  height="260"/>
          </div>
          <div class="enterprise-service-manage" @click="AIDialogVisible = true">
            <div class="enterprise-service-manage-bg"></div>
            <div class="enterprise-service-manage-content">
              <div class="enterprise-service-manage-content-title">
                服务管家
              </div>
              <div class="enterprise-service-manage-content-desc">
                量身定制，1对1针对性服务，精准解决您的
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import {
  entInfoInsert,
  entInfoUpdate,
  entInfoGetById,
  entPropagateTemplateInsert,
  entPropagateTemplateUpdate,
  entPropagateTemplateGetById,
  entIncomeInsert,
  entIncomeUpdate,
  entFilingUpdate,
  entFilingInsert,
  entFilingGetById,
  entPolicyCollectList,
  policyMatchTagsGet,
  policyMatchTagsInsert,
  policyMatchTagsUpdate,
  entReset,
  fincialDataStatisticsGetByEntId,
} from "@/config/api";
import _ from "lodash";
import {
  propagandaForm,
  messageForm,
  priceForm,
  baForm,
  baForm1,
  accountForm,
  createForm,
} from "@/config/constant.js";
import totalPng from "../../images/total.png";
import echarts from "./components/echarts.vue";
import policy from "./components/policy.vue";
import AI from "@/components/AI/index";
import request from "@/utils/request";
import policyList from "./components/policyList.vue";
import userTable from "./components/userTable.vue";
import userTable2 from "./components/userTable2.vue";
import userTable3 from "./components/userTable3.vue";
import userTable4 from "./components/userTable4.vue";
import userTable5 from "./components/userTable5.vue";
import userTable6 from "./components/userTable6.vue";
import AppHeader from "@/components/Header/index";
import FormTemplate from "@/components/Form/index.vue";
import priceFormTemplate from "@/components/Form/priceForm.vue";
import AppFooter from "@/components/footer/index";
import { MessageBox, Message } from "element-ui";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      vipType: {
        0: "非会员",
        1: "一万权益包",
        2: "三万权益包",
        3: "五万权益包",
        4: "十万权益包",
      },
      oneLabel: '',
      oneContent: '',
      thirdLevel: '',
      thirdContent: 'baseContent',
      fiveLevel: '',
      fiveContent: 'baseContent',
      tenLevel: '',
      tenContent: 'baseContent',
      policyMatchTagsInsert,
      policyMatchTagsUpdate,
      categoryId: Number(this.$route.query.categoryId) || 0,
      userId: window.localStorage.getItem("USERID"),
      entName: JSON.parse(window.localStorage.getItem("userinfo")).entName,
      entLevel: JSON.parse(window.localStorage.getItem("userinfo")).entLevel,
      categoryObj: {
        1: entInfoGetById,
        2: entPropagateTemplateGetById,
        4: entFilingGetById,
      },
      totalPng,
      entInfoInsert,
      entInfoUpdate,
      entInfoGetById,
      entPropagateTemplateInsert,
      entPropagateTemplateUpdate,
      entPropagateTemplateGetById,
      entIncomeInsert,
      entIncomeUpdate,
      entFilingUpdate,
      entFilingInsert,
      entFilingGetById,
      entReset,
      isExist: false,
      AIDialogVisible: false,
      messageForm,
      priceForm,
      propagandaForm,
      baForm,
      baForm1,
      accountForm,
      createForm,
      applydialogVisible: false,
      vipImgObj: {
        '非会员': 'http://minio.bjwcxf.com/cultural-image/cultural-web/VIP-未认证.png',
        '一万权益包': 'http://minio.bjwcxf.com/cultural-image/cultural-web/vip1.png',
        '三万权益包': 'http://minio.bjwcxf.com/cultural-image/cultural-web/vip3.png',
        '五万权益包': 'http://minio.bjwcxf.com/cultural-image/cultural-web/vip5.png',
        '十万权益包': 'http://minio.bjwcxf.com/cultural-image/cultural-web/vip10.png'
      },
      echartsOptions: {},
      echartsOptions2: {
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            label: {
              show: true,
              position: "inside",
              color: "#fff",
              fontSize: 10,
            },
            data: [
              { value: 1048, name: "金融服务" },
              { value: 735, name: "灵活用工" },
              { value: 580, name: "企业服务" },
              { value: 484, name: "行业培训" },
            ],
          },
        ],
      },
      fwList: [
        {
          title: "已在平台注册",
          num: JSON.parse(window.localStorage.getItem("userinfo")).registTimes,
          type: "天",
        },
        {
          title: "共被访问次数",
          num: JSON.parse(window.localStorage.getItem("userinfo")).hits,
          type: "",
        },
        {
          title: "已报名活动",
          num: JSON.parse(window.localStorage.getItem("userinfo")).policyCount,
          type: "场",
        },
        {
          title: "我的政策",
          num: JSON.parse(window.localStorage.getItem("userinfo")).policyNum,
          type: "项",
        },
      ],
      categorys: [
        { id: 0, name: "首页" },
        { id: 1, name: "基本信息", formType: "messageForm" },
        { id: 2, name: "宣传资料", formType: "propagandaForm" },
      ],
      propertys: [
        { id: 3, name: "财税数据填报", formType: "priceForm" },
        { id: 4, name: "企业认证信息", formType: "baForm1" },
      ],
      services: [
        { id: 5, name: "我的政策" },
        { id: 6, name: "我的服务" },
        { id: 7, name: "我的活动" },
        { id: 8, name: "站内信息" },
        // { id: 9, name: "账户管理" },
      ],
      opVisible: {
        nickname: false,
        birthday: false,
        gender: false,
        brief: false,
      },
      logoImg: "",
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
      files: [],
      policyExist: null,
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
    AppFooter,
    AI,
    FormTemplate,
    priceFormTemplate,
    echarts,
    policy,
    policyList,
    userTable,
    userTable2,
    userTable3,
    userTable4,
    userTable5,
    userTable6,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
    headers() {
      var val = {
        Authorization: getAccessToken(),
      };
      return val;
    },
  },
  created() {
    let userinfo = window.localStorage.getItem("userinfo");
    !userinfo && this.$store.commit("login/CHANGE_VISIBLE", true);
    let that = this;
    request({
      url: `${entPropagateTemplateGetById}`,
      method: "get",
      params: {
        approvalStatus: 0,
        entId: `${this.userId}`,
      },
    }).then(({ data }) => {
      //如果未添加宣传资料
      if (data.logoImg) {
        this.logoImg = data.logoImg;
      }
    });
    request({
      url: `${fincialDataStatisticsGetByEntId}/${this.userId}`,
      method: "get",
    }).then((res) => {
      let echartsOptions = {
        title: {
          text: "财税数据",
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["年份", "营业收入", "纳税总额", "资产总额", "负债总额"],
          source: res.data,
        },
        xAxis: { type: "category" },
        yAxis: {
          name: "单位（万元）",
          axisLabel: {
            //这种做法就是在y轴的数据的值旁边拼接单位，貌似也挺方便的
            formatter: "{value} 万元",
          },
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: "bar" ,
          tooltip: {
            formatter: (params) => {
              let seriesName = params.seriesName;
              let year = params.name;
              let data = params.data['营业收入']
              return seriesName + '<br />' + year + '&nbsp;' + data + '万元';
            }
          },
          label: {
        show: true,
        position: 'top',
        color: '#333',
        formatter: (params) => {
          
          return params.data['营业收入']
        }
      },},
          { type: "bar",
          tooltip: {
            formatter: (params) => {
              let seriesName = params.seriesName;
              let year = params.name;
              let data = params.data['纳税总额']
              return seriesName + '<br />' + year + '&nbsp;' + data + '万元';
            }
          },label: {
        show: true,
        position: 'top',
        color: '#333',
        formatter: (params) => {
          
          return params.data['纳税总额']
        }
      }, },
          { type: "bar" ,
          tooltip: {
            formatter: (params) => {
              let seriesName = params.seriesName;
              let year = params.name;
              let data = params.data['资产总额']
              return seriesName + '<br />' + year + '&nbsp;' + data + '万元';
            }
          },label: {
        show: true,
        position: 'top',
        color: '#333',
        formatter: (params) => {
          
          return params.data['资产总额']
        }
      },},
          { type: "bar",tooltip: {
            formatter: (params) => {
              let seriesName = params.seriesName;
              let year = params.name;
              let data = params.data['负债总额']
              return seriesName + '<br />' + year + '&nbsp;' + data + '万元';
            }
          },label: {
        show: true,
        position: 'top',
        color: '#333',
        formatter: (params) => {
          
          return params.data['负债总额']
        }
      }, },
        ],
      };
      that.echartsOptions = echartsOptions;
    });
  },
  mounted() {
    this.init();
  },

  methods: {
    // 初始化
    init() {
      const userInfo = this.$store.getters.userInfo;
    },
    bClose() {
      this.AIDialogVisible = false;
    },
    vipColorChoose(value) {
      if('一万权益包') {
        this.oneLevel = 'other-label';
        this.oneContent = 'other-content'
      }
      else if('三万权益包') {
        this.thirdLevel = 'other-label';
        this.thirdContent = 'other-content'
      }
      else if('五万权益包') {
        this.fiveLevel = 'other-label';
        this.fiveContent = 'other-content'
      }
      else if('十万权益包') {
        this.tenLevel = 'other-label';
        this.tenContent = 'other-content'
      }
      this.applydialogVisible = true;
      // this.
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    async chageTab(id, formType) {
      this.categoryId = id;
      let params = {
            approvalStatus: 0,
            entId: `${this.userId}`
          };
/*       //财税数据 再加入年份月份
      if(this.categoryId === 4) {
        params.incomeYear = "2022";
        params.incomeMonth = "1-12月";
      }; */
      // 企业id
      if (this.categoryObj[this.categoryId]) {
        let { data } = await request({
          url: `${this.categoryObj[this.categoryId]}`,
          method: "GET",
          params,
        });
        this.isExist = data ? true : false;
        this.id = data && data.id ? data.id : "";
        // 企业信息认证兼容,认证成功后,只显示部分字段
  /*       if (data.authStatus) {
          this[formType] = this.baForm1;
        } */
        this[formType] = data
          ? this[formType].map((e, b) => {
              let result = { ...e };
              result[e.prop] = data[e.prop] ? data[e.prop] : result[e.prop];
              result.readonly = data.authStatus === 1;
              return result;
            })
          : this[formType];
        if (formType === "messageForm") {
          this.getpolicyMatchTagsGet();
        }
      }
    },
    getpolicyMatchTagsGet() {
      request({
        url: `${policyMatchTagsGet}`,
        method: "GET",
        // todo 考虑 id怎么传进去
        params: {
          companyid: this.userId,
        },
      }).then(({ data }) => {
        //todo 后面封装
        this.policyExist = data ? true : false,
          (this["messageForm"] = data
          ? this["messageForm"].map((e, b) => {
              let result = { ...e };
              result[e.prop] = data[e.prop] ? data[e.prop] : result[e.prop];
              return result;
            })
          : this["messageForm"]);
      });
    },
    likeCountChanges(url, method = "POST", formData, policyMatchTags) {
      request({
        url: `${url}`,
        method,
        // todo 考虑 id怎么传进去
        data: {
          entId: this.userId,
          approvalStatus: 0,
          id: this.id,
          contactsPhone: JSON.parse(window.localStorage.getItem("userinfo"))
            .contactsPhone,
          ...formData,
        },
      })
        .then((res) => {
          this.$message({
            message: "提交成功",
            type: "success",
            duration: 5 * 1000,
          });
        })
        .catch((e) => {
          this.$message({
            message: e.msg,
            type: "error",
            duration: 5 * 1000,
          });
        });
        policyMatchTags && request({
          url: `${policyMatchTags}`,
          method: "POST",
          // todo 考虑 id怎么传进去
          data: {
            companyid: this.userId,
            approvalStatus: 0,
            id: this.id,
            ...formData,
          },
        }).then(e => {
/*           this.$message({
            message: "提交成功",
            type: "success",
            duration: 5 * 1000,
          }); */
          this.policyExist = true;
        });
    },
    checkAll(id) {
      this.categoryId = id;
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
  .user-caontainer {
    max-width: 1440px;
    margin-left: 70px;
    margin-right: 70px;
    padding-bottom: 60px;
    .user-header {
      display: flex;
      justify-content: space-between;
      // margin: 0 60px;
      .vip-img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
      }
      .logo-img {
        width: 325px;
        height: 325px;
        position: relative;
        top: -127px;
      }
    }
    .fw-model {
      display: flex;
      flex-direction: inherit;
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
        .title {
        }
        .data {
          span {
            font-size: 40px;
            font-family: Futura-Bold, Futura;
            font-weight: bold;
            color: #222222;
            line-height: 53px;
          }
        }
      }
    }
    .setting-box {
      // padding: 20px;
      // padding-top: 10px;
      // margin-right: 60px;
      width: 1440px;
      margin-top: -111px;
      display: flex;
      justify-content: space-between;
      // margin-left: 60px;
      h1 {
        font-size: 20px;
        font-weight: 700;
        padding: 0;
        padding-bottom: 10px;
      }
      .left-list {
        border-radius: 4px;
        font-weight: 500;
        background: #fff;
        width: 250px;
        margin: 0;
        margin-right: 10px;
        padding: 0;
        text-align: center;
        box-sizing: border-box;
        color: #909090;
        border-radius: 2px;
        background: #fff;
        .list-title {
          width: 100%;
          padding-left: 16px;
          text-align: left;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
          line-height: 20px;
          margin-top: 10px;
        }
        .left-list-item {
          display: flex;
          align-items: center;
          text-align: left;
          font-size: 14px;
          list-style: none;
          cursor: pointer;
          position: relative;
          padding-left: 16px;
          margin-top: 10px;
          height: 36px;
          width: 250px;
          display: flex;
          align-items: center;
          .user-icon-0 {
            background-image: url("../../images/home.png");
            margin-right: 1px;
          }
          .user-icon-0-active {
            background-image: url("../../images/home-active.png");
            margin-right: 1px;
          }
          .user-icon-1 {
            background-image: url("../../images/基本信息.png");
            margin-right: 1px;
          }
          .user-icon-1-active {
            background-image: url("../../images/基本信息-active.png");
            margin-right: 1px;
          }
          .user-icon-2 {
            background-image: url("../../images/宣传资料.png");
            margin-right: 1px;
          }
          .user-icon-2-active {
            background-image: url("../../images/宣传资料-active.png");
            margin-right: 1px;
          }
          .user-icon-3 {
            background-image: url("../../images/财税数据填报.png");
            margin-right: 1px;
          }
          .user-icon-3-active {
            background-image: url("../../images/财税数据填报-active.png");
            margin-right: 1px;
          }
          .user-icon-4 {
            background-image: url("../../images/企业备案信息.png");
            margin-right: 1px;
          }
          .user-icon-4-active {
            background-image: url("../../images/企业备案信息-active.png");
            margin-right: 1px;
          }
          .user-icon-5 {
            background-image: url("../../images/我的政策.png");
            margin-right: 1px;
          }
          .user-icon-5-active {
            background-image: url("../../images/我的政策-active.png");
            margin-right: 1px;
          }
          .user-icon-6 {
            background-image: url("../../images/我的服务.png");
            margin-right: 1px;
          }
          .user-icon-6-active {
            background-image: url("../../images/我的服务-active.png");
            margin-right: 1px;
          }
          .user-icon-7 {
            background-image: url("../../images/我的活动.png");
            margin-right: 1px;
          }
          .user-icon-7-active {
            background-image: url("../../images/我的活动-active.png");
            margin-right: 1px;
          }
          .user-icon-8 {
            background-image: url("../../images/站内信息.png");
          }
          .user-icon-8-active {
            background-image: url("../../images/站内信息-active.png");
          }
          .user-icon-9 {
            background-image: url("../../images/账户管理.png");
          }
          .user-icon-9-active {
            background-image: url("../../images/账户管理-active.png");
          }
          img {
            margin-right: 1px;
          }
          &:last-child {
            margin-bottom: 10px;
          }

          .item-content {
            padding: 7px 0;
            display: inline-block;
            min-width: 86px;
            cursor: pointer;
            border-radius: 3px;
            color: #666666;
            &:hover {
              color: #007fff;
              background: #f4f5f5;
            }
          }
        }

        .left-list-item-active {
          background: linear-gradient(
            90deg,
            rgba(16, 85, 152, 0.2) 0%,
            rgba(74, 144, 226, 0) 100%
          );
          color: #0052d9;
          line-height: 22px;
          .item-content {
            background: #007fff;

            &:hover {
              color: #fff;
              background: #007fff;
            }
          }
        }
      }
      .setting-box-center {
        width: 100%;
        background-color: #fff;
        padding-bottom: 20px;
        //min-width: 732px;
      }
      .setting-box-right {
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #222222;
        margin-left: 10px;
        .enterprise-service {
          background: #ffffff;
          &-echarts-title {
            margin-left: 15px;
            font-size: 18px;
            line-height: 25px;
            padding-top: 20px;
          }
          &-list {
            display: flex;
            flex-wrap: wrap;
            align-content: space-between;
            width: 265px;
            margin-top: 17px;
            padding-left: 15px;
            padding-bottom: 25px;
            &-item {
              display: flex;
              margin-right: 40px;
            }
          }
        }
        .enterprise-service-manage {
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url("../../images/service-manage.png");
          height: 301px;
          margin-top: 5px;
          &-bg {
            height: 172px;
          }
          &-content {
            padding-left: 20px;
            &-title {
              margin-bottom: 5px;
              font-size: 18px;
              line-height: 25px;
            }
            &-desc {
              font-size: 14px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>

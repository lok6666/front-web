<template>
  <div ref="container" class="container">
    <app-header :nav-item-active="2" />
    <el-dialog
      :visible.sync="applydialogVisible"
      :center="true"
      :before-close="closeDialog">
      <form-template
      style="padding: 0px 20px"
      :customStyle="{display: 'grid', 'grid-template-columns': '400px 400px'}"
      @likeCountChanges="closeDialog"
      :labelWidth="140"
      title="灵活用工申请"
      :formConfig="applyMessageForm1"
      :showBtn="true"
      :disabled="false"/> 
    </el-dialog>
    <div class="service-bg">
        <div style="width: 100%;display: flex;display: flex;flex-direction: column;align-items: end;">
        <div style="width: 310px;height: 10px;"></div>
          <div>高效专业的</div>
          <div>企业共享服务科技提供商</div>
          <div style="font-size: 18px;font-family: AlibabaPuHuiTiR;">帮助企业规模化使用共享产品，并提供需求匹</div>
        </div>
      </div>
    <div class="content-container">
      <div class="service">
        <div class="service-title">面对日趋多元化的需求，企业如何能轻运营、快发展</div>
        <div class="service-desc">使用身边云提供的共享产品，“多快好省”为企业运营提效降本</div>
        <div class="service-content">
          <div class="service-content-item"  :style="`background-image: url(${item.bgImg})`" v-for="(item, index) in list" :key="index">
            {{item.title}}
            <ui style="font-size: 10px;width: 264px; margin: 10px;">
              <li v-for="(i, index) in item.liList" :key="index">{{i}}</li>
            </ui>
          </div>
        </div>
      </div>
      <flow/>
      <div class="solve">
        <div class="solve-title">我们还将为您提供更多行业 热门实用资源包</div>
        <div class="solve-desc">更多行业解决方案等您来解锁</div>
        <div class="solve-content">
        </div>
        <div class="more-solve" @click="applydialogVisible = true">申请服务</div>
      </div>
      <!-- <div class="resource">
        <div class="resource-title">我们还将为您提供更多行业 热门实用资源包</div>
        <div class="resource-content">
        </div>
      </div> -->
    </div>
    <app-footer />
  </div>
</template>

<script>
import { applyMessageForm1 } from "@/config/constant.js";
import { mapGetters } from 'vuex'
import { categoryList } from '@/api/category.js'
import AppHeader from '@/components/Header/index'
import FormTemplate from "@/components/Form/index.vue"
import AppFooter from '@/components/footer/index'
import Flow from '@/components/flow/index.vue'
import ArticleList from '@/components/ArticleList'
import { pagePublishedArticle } from '@/api/article.js'
import service1Img from "@/images/service_1.png";
import service2Img from "@/images/service_2.png";
import service3Img from "@/images/service_3.png";
import service4Img from "@/images/service_4.png";
export default {
  name: 'Category',
  components: {
    AppHeader,
    AppFooter,
    ArticleList,
    FormTemplate,
    Flow
  },
  data() {
    return {
      applyMessageForm1,
      applydialogVisible: false,
      list: [{
        title: '我是企业负责人',
        bgImg: service1Img,
        liList: ['采用共享服务,真正做到企业降本增效','满足企业灵活的组织架构与运营方式的需求']
      },{
        title: '我是财务负责人',
        bgImg: service2Img,
        liList: ['金税四期严控下,建立企业合规结算屏障','完成线上鉴证,批量结算,省时省力']
      },{
        title: '我是人力负责人',
        bgImg: service3Img,
        liList: ['优化人员结构,无需在匆忙招人,降低用人风险','节省招聘、培训、福利等隐形成本']
      },{
        title: '我是项目执行方',
        bgImg: service4Img,
        liList: ['采用共享服务,不受限于公司自有员工的技能','共享产品超多选择,可以实现短期,批量化产出']
      }]
    }
  },

  computed: {
    ...mapGetters([
      'device'
    ])
  },

  mounted() {
    this.init()
  },

  methods: {
    // 获取分类列表
    init() {
    },
    closeDialog(done) {
      this.applydialogVisible = false;
      done();
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @import '~@/styles/variables';
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;
  .service-bg {
    display: flex;
    align-items: end;
    justify-content: center;
    font-size: 50px;
    font-family: AlibabaPuHuiTiM;
    color: #000000;
    width: 100%;
    height: 442px;
    padding-right: 143px;
    padding-bottom: 60px;
    background-size: cover;
    background-image: url('../../images/peopleServiceBg.png');
  }
  .content-container {
    margin: 0 auto;
    max-width: 1440px;
    // margin-left: 70px;
    // margin-right: 70px;
    padding-bottom: 60px;
    @media screen and (max-width: 960px){
      margin-top: 0;
    }
    .service {
      margin: 30px 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &-title {
        font-size: 36px;
        font-family: AlibabaPuHuiTiM;
        color: #212121;
        line-height: 50px;
      }
      &-desc {
        margin-top: 2px;
        font-size: 24px;
        font-family: AlibabaPuHuiTiR;
        color: #212121;
        line-height: 33px;
      }
      &-content {
        display: flex;
        margin-top: 68px;
        &-item {
          display: flex;
          justify-content: end;
          align-items: center;
          flex-direction: column;
          margin-right: 9px;
          padding-bottom: 49px;
          font-size: 36px;
          font-family: AlibabaPuHuiTiR;
          color: #212121;
          width: 326px;
          height: 517px;
          img {
            margin-top: 25px;
          }
        }
      }
    }
    .solve {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #fff;
      margin-top: 16px;
      padding-top: 32px;
      padding-bottom: 40px;
      &-title {
        font-size: 28px;
        font-family: AlibabaPuHuiTiR;
        color: #212121;
      }
      &-desc {
        margin-top: 2px;
        font-size: 36px;
        font-family: AlibabaPuHuiTiM;
        color: #212121;
        line-height: 50px;
      }
      &-content {
        background-image: url("../../images/solve.png");
        height: 556px;
        width: 100%;
        background-size: 100% 100%;
      }
      .more-solve {
        margin-top: 46px;
        margin-bottom: 30px;
        width: 358px;
        height: 82px;
        background: #B48859;
        border-radius: 20px;
        font-size: 24px;
        font-family: AlibabaPuHuiTiM;
        color: #FFFFFF;
        line-height: 33px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .resource {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 40px;
      padding-top: 32px;
      padding-bottom: 40px;
      &-title {
        font-size: 36px;
        font-family: AlibabaPuHuiTiM;
        color: #212121;
        line-height: 50px;
      }
      &-content {
        display: flex;
        margin-top: 68px;
      }
    }
  }
}
</style>

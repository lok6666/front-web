<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <!--980+305-->
    <div class="busniess-detail-bg">
      <div style="display: flex;">
        <!--img占位图-->
        <div style="width: 485px;height: 10px;"></div>
        <!-- <div
          @click="changeImg(item)"
          v-for="(item, index) in imgList"
          :key="index"
        >
          <img :src="item.imgSrc" style="margin-right:9px;" />
        </div> -->
      </div>
    </div>
    <div class="busniess-detail-container">
      <div class="busniess-detail-cotent">
        <img class="header-logo" :src="showImg" />
        <div
          style="display: flex;flex-direction: column;;width: 100%;padding: 0 27px;"
        >
          <div class="title">关于我们</div>
          <div class="content">
            {{ showDesc }}
            公司始终坚持以“满天星计划”党建品牌为引领，聚焦主责把握机遇、立足主业谋划布局，以文化为内核、科技为手段、数据为支撑，按照“数据+算法+算力”的产业技术创新体系，凝神聚力将公司打造成为全国文化中心建设文化大数据生产力的推动者、文化领域企业的算力支撑者商、不同文化业态应用场景的算法服务商、“文化+”行业的数据生产资料的集成商。
          </div>
        </div>
      </div>
      <div>
        <div class="guide-excellent-busniess-content">
          <div
            class="guide-excellent-busniess-content-item"
            v-for="(item, index) in excellentBusniessList"
            :key="index"
          >
            <div :class="`item-icon item-icon-${index}`"></div>
            {{ item.excellentBusniessName }}
          </div>
        </div>
        <protect />
        <div class="busniess-detail">
          <div style="display: flex;align-items: center;">
            <img :src="busniessLogo" style="height: 180px; margin-right: 10px;"/>
            <div class="busniess-detail-message">
                <div>企业全称：北京文投大数据有限公司</div>
                <div>注册资本：8000万元</div>
                <div>企业类型：国有企业</div>
                <div>所属行业：互联网和相关服务</div>
                <div>人员规模：100以下</div>
                <div>统一社会信用代码：91110114MA017CY134</div>
            </div>
          </div>
          <div class="tag-list">
            <div
              :class="`tag-list-item item-block-${index}`"
              v-for="(item, index) in tagList"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import request from '@/utils/request';
import {entInfoGetById} from '@/config/api.js'
import AppHeader from "@/components/Header/index";
import busniessLogo from "../../images/busneiss-logo.png";
import bank1 from "../../images/about-busneiss2.png";
import bank2 from "../../images/bank1.png";
import protect from "@/components/guide/protect.vue";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
      busniessLogo,
      tagList: ["国有企业","物联网", "文化产业", "大数据",  "高新技术企业", "瞪羚企业", "专精特新企业", "文化科技融合", "语音通信","中小微企业"],
      excellentBusniessList: [
        {
          excellentBusniessName: "中关村高新技术企业",
        },
        {
          excellentBusniessName: "高新技术企业证书",
        },
        {
          excellentBusniessName: "等保三级",
        },
        {
          excellentBusniessName: "科博会",
        },
      ],
      // imgList: [
      //   {
      //     imgSrc: bank2,
      //     desc:
      //       "1中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
      //   },
      //   {
      //     imgSrc: bank2,
      //     desc:
      //       "2中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
      //   },
      //   {
      //     imgSrc: bank2,
      //     desc:
      //       "中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
      //   },
      //   {
      //     imgSrc: bank2,
      //     desc:
      //       "中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
      //   },
      // ],
      showImg: "",
      showDesc: "",
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
    };
  },
  components: {
    AppHeader,
    protect,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
    headers() {
      var val = {
        Authorization: "Bearer " + getAccessToken(),
      };
      return val;
    },
  },
  created() {
    request({
      url: `${entInfoGetById}/1`,
      method: 'get'
    }).then(
      res => {
        console.log('res---', res);
      });
    this.showImg = bank1;
    this.showDesc = '公司成立于2017年9月，为北京市文投集团的控股子公司，注册资本金8000万元。主营业务包括物联网业务、数据能力要素核验平台、产业服务平台、文化投资、智能语音通信。战略定位为全国文化中心建设文化大数据生产力的推动者、文化领域企业的算力支撑者、不同文化业态应用场景的算法服务者、“文化+”行业的数据生产资料的奠基者。';
  },
  mounted() {
    this.init();
  },

  methods: {
    // 初始化
    init() {
      const userInfo = this.$store.getters.userInfo;
      this.userInfo = userInfo;
      this.username = userInfo.username;
      this.form.nickname = userInfo.nickname;
      this.form.mobile = this.sensitiveMobile(userInfo.mobile);
      this.form.email = this.sensitiveEmail(userInfo.email);
      this.form.gender = userInfo.gender;
      this.originalGender = userInfo.gender;
      this.form.birthday = userInfo.birthday;
      this.originalBirthday = userInfo.birthday;
      this.form.brief = userInfo.brief;
    },
    changeImg({ imgSrc, desc }) {
      this.showImg = imgSrc;
      this.showDesc = desc;
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
  // background: #ffffff;
  min-height: calc(100vh - 50px);
  position: relative;

  @media screen and (max-width: 922px) {
    padding: 0;
    margin: 0;
  }
  .busniess-detail-bg {
    display: flex;
    align-items: end;
    justify-content: center;
    height: 442px;
    font-size: 56px;
    font-family: AlibabaPuHuiTiR;
    color: #ffffff;
    width: 100%;
    padding-bottom: 7px;
    background-size: cover;
    background-image: url("../../images/business-detail-bg1.png");
    background-size: 100% 100%;
    margin-top: 150px;
  }
  .busniess-detail-container {
    max-width: 1440px;
    //   margin-left: 70px;
    //   margin-right: 70px;
    padding-bottom: 60px;
    .busniess-detail-cotent {
      height: 310px;
      max-width: 1440px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      // background: #fff;
      padding: 0 70px;
      .header-logo {
        position: relative;
        top: -127px;
        width: 485px;
        height: 435px;
        box-shadow: -10px 10px 5px #888888;
      }
      .title {
        font-size: 30px;
        font-family: Helvetica;
        color: #2c3241;
        margin-top: 46px;
        margin-bottom: 12px;
      }
      .content {
        text-indent: 2em;
        line-height: 25px;
        font-size: 18px;
        font-family: AlibabaPuHuiTiR;
        color: #2c3241;
        //max-width: 777px;
      }
    }
    .guide-excellent-busniess-content {
      display: grid;
      grid-template-columns: repeat(4, 310px);
      grid-gap: 20px 20px;
      margin: 76px 60px;
      &-item {
        text-align: center;
        border-radius: 8px;
        border: 1px solid #d99447;
        padding-bottom: 15px;
      }
      .item-icon {
        height: 210px;
        margin-bottom: 15px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &-0 {
          background-image: url("../../images/collage-0.jpg");
        }
        &-1 {
          background-image: url("../../images/collage-1.jpg");
        }
        &-2 {
          background-image: url("../../images/collage-2.jpg");
        }
        &-3 {
          background-image: url("../../images/collage-3.png");
        }
      }
    }
    .busniess-detail {
      padding: 0 70px;
      display: flex;
      justify-content: space-between;
      &-message {
        width: 353px;
        height: 180px;
        font-size: 18px;
        font-family: AlibabaPuHuiTiR;
        color: #000000;
        line-height: 28px;
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
      .tag-list {
        max-width: 330px;
        display: flex;
        flex-wrap: wrap;
        color: #FFFFFF;
        .tag-list-item {
            // color: #fff;
            // min-width: 117px;
            margin-right: 13px;
            border-radius: 16px;
            height: 32px;
            display: flex;
            padding: 4px 10px;
            align-items: center;
            justify-content: center;
        }
        .item-block-0 {
          background: #ff6b03;
        }
        .item-block-1 {
          background: #8b572a;
        }
        .item-block-2 {
          background: #038f6e;
        }
        .item-block-3 {
          background: #f5a623;
        }
        .item-block-4 {
          background: #d0021b;
        }
        .item-block-5 {
          background: #038f6e;
        }
        .item-block-6 {
          background: #f5a623;
        }
        .item-block-7 {
          background: #d0021b;
        }
        .item-block-8 {
          background: #f5a623;
        }
        .item-block-9 {
          background: #d0021b;
        }
      }
    }
  }
}
</style>

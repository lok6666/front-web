<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <!--980+305-->
    <div class="busniess-detail-bg">
      <div style="display: flex;">
        <!--img占位图-->
        <div style="width: 485px;height: 10px;"></div>
        <div
          @click="changeImg(item)"
          v-for="(item, index) in imgList"
          :key="index"
        >
          <img :src="item.imgSrc" style="margin-right:9px;" />
        </div>
      </div>
    </div>
    <div class="busniess-detail-container">
      <div class="busniess-detail-cotent">
        <img class="header-logo" :src="showImg" />
        <div
          style="display: flex;flex-direction: column;;width: 100%;padding: 0 27px;"
        >
          <div class="title">关于我们</div>
          <div class="content">{{ showDesc }}</div>
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
            <img :src="busniessLogo" />
            <div class="busniess-detail-message">
                <div>企业全称：北京文投大数据有限公司</div>
                <div>注册资本：8000</div>
                <div>企业类型：国有企业</div>
                <div>所属行业：互联网和相关服务</div>
                <div>人员规模：2000</div>
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
import AppHeader from "@/components/Header/index";
import busniessLogo from "../../images/busniess-logo.png";
import bank1 from "../../images/about-busniess.png";
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
      tagList: ["国有企业","高新技术企业", "专精特新企业", "瞪羚企业", "2021年纳税前十名税前十名企"],
      excellentBusniessList: [
        {
          excellentBusniessName: "文投大数据",
        },
        {
          excellentBusniessName: "华录新媒",
        },
        {
          excellentBusniessName: "畅游",
        },
        {
          excellentBusniessName: "cri",
        },
      ],
      imgList: [
        {
          imgSrc: bank2,
          desc:
            "1中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
        },
        {
          imgSrc: bank2,
          desc:
            "2中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
        },
        {
          imgSrc: bank2,
          desc:
            "中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
        },
        {
          imgSrc: bank2,
          desc:
            "中国石油化工集团有限公司（以下简称公司）的前身是成立于1983年7月的中国石油化工总公司。1998年7月，按照党中央关于实施石油石化行业战略性重组的部署，在原中国石油化工总公司基础上重组成立中国石油化工集团公司，2018年8月，经公司制改制为中国石油化工集团有限公司。公司是特大型石油石化企业集团，注册资本3265亿元人民币，董事长为法定代表人，总部设在北京。公司对其全资企业、控股企业、参股企业的有关国有资产行使资产受益、重大决策和选择管理者等出资人的权力，对国有资产依法进行经营、管理和监督，并相应承担保值增值责任。 公司主营业务范围包括：实业投资及投资管理；石油、天然气的勘探、开采、储运（含管道运输）、销售和综合利用；煤炭生产、销售、储存、运输；石油炼制；成品油储存、运输、批发和零售；石油化工、天然气化工、煤化工及其他化工产品的生产、销售、储存、运输；新能源产品的生产、销售、储存、运输；新能源汽车充换电业务及相关服务；石油石化工程的勘探、设计、咨询、施工、安装；石油石化设备检修、维修；机电设备研发、制造与销售；电力、蒸汽、水务和工业气体的生产销售；技术、电子商务及信息、替代能源产品的研究、开发、应用、咨询服务；自营和代理有关商品和技术的进出口；对外工程承包、招标采购、劳务输出；国际化仓储与物流业务等。",
        },
      ],
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
    this.showImg = bank1;
    this.showDesc = this.imgList[0].desc;
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
  background: #ffffff;
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
    background-image: url("../../images/business-detail-bg.png");
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
      background: #fff;
      padding: 0 70px;
      .header-logo {
        position: relative;
        top: -127px;
        width: 485px;
        height: 435px;
      }
      .title {
        font-size: 30px;
        font-family: Helvetica;
        color: #2c3241;
        margin-top: 46px;
        margin-bottom: 12px;
      }
      .content {
        line-height: 20px;
        font-size: 14px;
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
        background-size: cover;
        background-repeat: no-repeat;
        &-0 {
          background-image: url("../../images/collage1.png");
        }
        &-1 {
          background-image: url("../../images/collage2.png");
        }
        &-2 {
          background-image: url("../../images/collage3.png");
        }
        &-3 {
          background-image: url("../../images/collage4.png");
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
      }
      .tag-list {
        max-width: 330px;
        display: flex;
        flex-wrap: wrap;
        .tag-list-item {
            min-width: 117px;
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
      }
    }
  }
}
</style>

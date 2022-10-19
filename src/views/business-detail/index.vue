<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <!--980+305-->
    <div class="busniess-detail-bg" :style="`background-image: url(${busneissMessage.bgImg})`">
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
        <img class="header-logo" :src="busneissMessage.logoImg" />
        <div
          style="display: flex;flex-direction: column;;width: 100%;padding: 0 27px;"
        >
          <div class="title">关于我们</div>
          <div class="content">
            {{ busneissMessage.busneissDesc }}
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
            <div :class="`item-icon item-icon-${index}`" :style="`background-image: url(${item.url})`"></div>
          </div>
        </div>
        <div class="guide-header">
          <img class="guide-header-logo" src="../../images/guide-logo.png" />
          我的产品
        </div>
        <div class="guide-excellent-busniess-content" v-html="busneissMessage.productDesc">
          
        </div>
        <div class="busniess-detail">
          <div style="display: flex;align-items: center;">
            <!-- <img :src="busniessLogo" style="height: 180px; margin-right: 10px;"/> -->
            <div class="busniess-detail-message">
                <div>企业全称：{{busneissMessage2.entName}}</div>
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
import { MessageBox } from 'element-ui'
import {entPropagateGetById} from '@/config/api.js'
import AppHeader from "@/components/Header/index";
import busniessLogo from "../../images/busneiss-logo.png";
import bank1 from "../../images/about-busneiss2.png";
import bank2 from "../../images/bank1.png";
// import protect from "@/components/guide/protect.vue";
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
      ],
      busneissMessage: {},
      busneissMessage2: {},
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
    };
  },
  components: {
    AppHeader,
    // protect,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
    headers() {
      var val = {
        Authorization:getAccessToken(),
      };
      return val;
    },
  },
  async created() {
    let that = this;
    request({
        url: `${entPropagateGetById}`,
        method: 'get',
        params: {
          entId: `${that.$route.params.id.replace(':id=', '')}`
        }
      })
      .then(({data}) => {
        //如果未添加宣传资料
        if(!data) {
          MessageBox({
            title: '温馨提示',
            center: true,
            message: '请点击个人中心添加宣传资料',
            showConfirmButton: false,
            beforeClose:(action, instance, done) => {
              this.$router.push('/user/info');
              done();
            }
          })
        } else {
          that.busneissMessage = {...data};
          if(data.honorImg) {
            that.excellentBusniessList = JSON.parse(data.honorImg);
          };
        }
      });
      const { data } = await this.$store.dispatch('user/getUserInfo');
      console.log('data------', that.busneissMessage);
      that.busneissMessage2 = {...data};
  },
  mounted() {
    this.init();
  },

  methods: {
    // 初始化
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
      }
      .item-icon {
        height: 210px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
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

<template>
  <div class="main-footer-box">
    <div class="container">
      <div class="footer-about">
        <div class="footer-about-logo" style="font-size: 20px;">
          <img
            src="../../images/guide-logo.png"
            style="width: 48px; height: 52px;"
          />{{$router.isBeijing() ? '文化产业综合服务平台' : '文化产业综合服务平台（石景山站）'}}
        </div>
        <div class="about">
          <div class="contact-title">友情链接</div>
          <div class="about-item" v-for="(item, index) in list" :key="index">

            <a :href="item.src" target="_blank">{{ item.desc }}</a>
          </div>
        </div>
        <div class="contact">
          <div class="contact-title">联系我们</div>
          <div class="contact-content">
            <div class="contact-email">客服信箱：wtdsj@bjwcxf.com</div>
            <div class="contact-telephone">客服热线：{{'17190033790'}}</div>
          </div>
        </div>
        <div class="contact">
          <div class="contact-title">微信公众号</div>
          <div class="contact-content">
            <img style="width: 100px;height: 100px;margin-left: -8px;" src="../../images/wx-wt.png"/>
          </div>
        </div>
      </div>
       <div class="footer-report">
<!--         <div class="footer-direct">
          主办：北京文投大数据有限公司
          京公网安备 1101070200067 京ICP备18006354号-2
        </div> -->
        <div class="footer-direct">
          © 2012-2022 石文创服<img
            src="../../images/ga.png"
            style="width: 17px;height: 17px;"
          />京公网安备 1101070200067 京ICP备18006354号-2
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: this.$router.isBeijing() ? [
        // { id: 0, desc: "北京市石景山区政府", src: 'http://www.bjsjs.gov.cn/index.shtml' },
        { id: 2, desc: "北京文化产业投融资协会", src: 'http://www.bciifa.org.cn/' },
        { id: 3, desc: "中国文化管理协会", src: 'http://www.ccasn.com/' },
        { id: 4, desc: "北京银行",src: 'http://www.bankofbeijing.com.cn/' },
        { id: 5, desc: "建设银行", src: 'http://www.ccb.com' },
      ] : [
        { id: 0, desc: "北京市石景山区政府", src: 'http://www.bjsjs.gov.cn/index.shtml' },
        { id: 2, desc: "北京文化产业投融资协会", src: 'http://www.bciifa.org.cn/' },
        { id: 3, desc: "中国文化管理协会", src: 'http://www.ccasn.com/' },
        { id: 4, desc: "北京银行",src: 'http://www.bankofbeijing.com.cn/' },
        { id: 5, desc: "建设银行", src: 'http://www.ccb.com' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main-footer-box {
  background: #ffffff;
  width: 100%;
  border-radius: 4px;
  // margin-top: 10px;
  // padding-top: 12px;
  // padding-left: 94px;
  .container {
    max-width: 1440px;
    width: 100%;
    margin: auto;
    padding-top: 48px;
    .footer-about {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-bottom: 10px;
      &-logo {
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 36px;
        font-family: SourceHanSerifSC-Bold, SourceHanSerifSC;
        font-weight: bold;
        color: #000000;
      }
      .about {
/*         display: grid;
        grid-template-columns: 130px 130px;
        grid-template-rows: 60px 60px;
        padding-top: 10px; */
        &-item {
          margin-top: 18px;
          font-size: 18px;
          font-family: AlibabaPuHuiTiR;
          color: rgba(43,41,45,0.6);
        }
      }
      .contact {
        // flex: 0.1;
        .contact-content {
          margin-top: 18px;
          font-size: 18px;
          font-family: AlibabaPuHuiTiR;
          color: rgba(43,41,45,0.6);
          .contact-telephone {
            margin-top: 15px;
          }
        }
      }
    }
    .footer-report {
      text-align: center;
      /* padding-left: 100px;
      margin-top: 10px; */
      .footer-direct {
        font-size: 14px;
        font-family: AlibabaPuHuiTiR;
        color: rgba(43, 41, 45, 0.6);
        line-height: 20px;
        height: 30px;
      }
    }
  }
}
</style>

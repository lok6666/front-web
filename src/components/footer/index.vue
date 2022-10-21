<template>
  <div class="main-footer-box">
    <div class="container">
      <div class="footer-about">
        <div class="footer-about-logo">
          <img
            src="../../images/guide-logo.png"
            style="width: 48px; height: 52px;"
          />石文创服
        </div>
        <div class="about">
          <div class="about-item" v-for="(item, index) in list" :key="index">

            <a :href="item.src" target="_blank">{{ item.desc }}</a>
          </div>
        </div>
        <div class="contact">
          <div class="contact-title">联系我们</div>
          <div class="contact-content">
            <div class="contact-email">客服信箱：wtdsj@bjwcxf.com</div>
            <div class="contact-telephone">客服热线：010-56939760</div>
          </div>
        </div>
      </div>
      <div class="footer-report">
        <div class="footer-direct">
          主办：北京文投大数据有限公司
          京公网安备 11010502039640 京ICP备18006354号
        </div>
        <div class="footer-direct">
          © 2012-2022 石文创服<img
            src="../../images/ga.png"
            style="width: 17px;height: 17px;"
          />京公网安备100000303030303
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { id: 0, desc: "北京市石景山区政府", src: 'http://www.bjsjs.gov.cn/index.shtml' },
        { id: 1, desc: "北京市文化投资发展集团有限责任公司", src: 'http://www.bjwt.com/' },
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
          height: 20px;
          font-size: 14px;
          font-family: AlibabaPuHuiTiR;
          color: rgba(43, 41, 45, 0.6);
        }
      }
      .contact {
        padding-top: 10px;
        flex: 0.4;
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
      padding-left: 100px;
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

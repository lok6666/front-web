<template>
<div class="mian-footer-box">
  <div class="footer-about">
      <div class="footer-about-logo">
      <img src="../../images/guide-logo.png" style="width: 48px; height: 52px;"/>石文创服</div>
      <div class="about">
        <div class="about-item" v-for="(item, index) in list" :key="index">{{item.desc}}</div>
      </div>
      <div class="contact">
        <div class="contact-title">联系我们</div>
        <div class="contact-content">
            <div class="contact-email">客服信箱：wentou@xxx.cn 政</div>
            <div class="contact-telephone">政务服务热线：12345</div>
        </div>
      </div>
  </div>
  <div class="footer-report">
    <div class="footer-direct">主办：北京市人民政府办公厅承办：北京市政务服务管理局、北京市经济和信息化局政府网站标识码：1100000088 京公网安备 11010502039640 京ICP备05060933号</div>
    <div class="footer-direct">
    © 2012-2022 石文创投<img src="../../images/ga.png" style="width: 17px;height: 17px;"/>京公网安备100000303030303
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
            {id: 0, desc: '关于我们'},
            {id: 1, desc: '站点地图'},
            {id: 2, desc: '建议意见'},
            {id: 3, desc: '法律声明'}
        ]
      }
    }
  }
</script>


<style lang="scss" scoped>
.mian-footer-box {
  background: #FFFFFF;
  width: 100%;
  border-radius: 4px;
  // margin-top: 10px;
  padding-top: 12px;
  padding-left: 94px;
  .footer-about {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
        display: grid;
        grid-template-columns: 130px 130px;
        grid-template-rows: 60px 60px;
        padding-top: 10px;
    }
    .contact {
        padding-top: 10px;
        flex: 0.4;
        .contact-content {
            margin-top: 18px;
            .contact-telephone {
                margin-top: 15px;
            }
        }
    }
  }
  .footer-report {
    .footer-direct {
        font-size: 14px;
        font-family: AlibabaPuHuiTiR;
        color: rgba(43,41,45,0.6);
        line-height: 20px;
    }
  }
}
</style>
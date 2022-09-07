<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <img src="../../images/userBg.png" style="width: 100%" />
    <div class="user-caontainer">
      <div class="user-header">
        <img src="../../images/total.png" />
        <span style="display: inline-block; margin-left: 20px; width: 100%">
          <h1>北京文投大数据有限公司</h1>
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
            @click="chageTab(category.id)"
          >
            <div
              :class="`user-icon-${category.id}`"
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
            @click="chageTab(property.id)"
          >
            <div
              :class="`user-icon-${property.id}`"
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
            @click="chageTab(service.id)"
          >
            <div
              :class="`user-icon-${service.id}`"
              style="width: 20px; height: 20px;"
            ></div>
            <!-- <img src="../../images/home.png"> -->
            {{ service.name }}
            <!-- <span class="item-content">{{ category.name }}</span> -->
          </li>
        </ul>
        <div class="setting-box-center">
          <echarts :echartsOptions="echartsOptions" id="1" height="300"/>
          <policyList />
          <userTable />
          <userTable2 />
          <userTable3 />
        </div>
        <div class="setting-box-right">
          <div class="enterprise-service">
            <div class="enterprise-service-echarts-title">企业服务占比：</div>
            <echarts :echartsOptions="echartsOptions2" id="2"  height="260"/>
            <!-- <div class="enterprise-service-list">
              <div
                class="enterprise-service-list-item"
                v-for="(item, index) in serviceList"
                :key="index"
              >
                <div
                  :style="`width: 15px;height: 15px;background: ${item.color}`"
                ></div>
                {{ item.name }}
              </div>
            </div> -->
          </div>
          <div class="enterprise-service-manage">
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
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";
import echarts from "./components/echarts.vue";
import policyList from "./components/policy.vue";
import userTable from "./components/userTable.vue";
import userTable2 from "./components/userTable2.vue";
import userTable3 from "./components/userTable3.vue";
import AppHeader from "@/components/Header/index";
import AppFooter from "@/components/footer/index";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      categoryId: 0,
/*       serviceList: [
        {
          name: "金融服务",
          color: "#F52323",
        },
        {
          name: "知识产权",
          color: "#F5A623",
        },
        {
          name: "企业服务",
          color: "#52CCA3",
        },
        {
          name: "培训服务",
          color: "#4A90E2",
        },
      ], */
      echartsOptions: {
        title: {
          text: '财政数据图'
        },
        legend: {},
        tooltip: {},
        dataset: {
          dimensions: ["product", "2015", "2016", "2017"],
          source: [
            { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
            { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
            { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
            { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      },
      echartsOptions2: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            label: {
              show: true,
              position: 'inside',
              color: '#fff',
              fontSize: 10
            },
            data: [
              { value: 1048, name: '金融服务' },
              { value: 735, name: '知识产权' },
              { value: 580, name: '企业服务' },
              { value: 484, name: '培训服务' }
            ]
          }
        ]
      },
      fwList: [
        {
          title: "平台注册",
          num: "111",
          type: "天",
        },
        {
          title: "平台注册",
          num: "111",
          type: "天",
        },
        {
          title: "平台注册",
          num: "111",
          type: "天",
        },
        {
          title: "平台注册",
          num: "111",
          type: "天",
        },
      ],
      categorys: [
        { id: 0, name: "首页" },
        { id: 1, name: "基本信息维护" },
        { id: 2, name: "宣传资料" },
      ],
      propertys: [
        { id: 3, name: "财税数据填报" },
        { id: 4, name: "企业备案信息" },
      ],
      services: [
        { id: 5, name: "我的政策" },
        { id: 6, name: "我的服务" },
        { id: 7, name: "我的活动" },
        { id: 8, name: "站内信息" },
        { id: 9, name: "账户管理" },
      ],
      opVisible: {
        nickname: false,
        birthday: false,
        gender: false,
        brief: false,
      },
      path: process.env.VUE_APP_BASE_API + "/user/avatar/update",
      files: [],
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
    echarts,
    policyList,
    userTable,
    userTable2,
    userTable3,
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

    // 昵称输入框焦点事件
    nicknameIputFocus() {
      this.$refs.nicknameIput.focus();
      this.opVisible.nickname = true;
    },

    // 昵称取消保存
    cancelNickname() {
      this.form.nickname = this.userInfo.nickname;
      this.opVisible.nickname = false;
    },

    // 昵称保存
    saveNickname() {
      const data = { nickname: this.form.nickname, userId: this.userInfo.id };
      this.updateUser(data, 0);
    },

    // 生日栏聚焦
    birthdayIputFocus() {
      this.opVisible.birthday = true;
    },

    // 生日取消保存
    cancelBirthday() {
      this.form.birthday = this.userInfo.birthday;
      this.opVisible.birthday = false;
    },

    // 保存生日
    saveBirthday() {
      const data = { birthday: this.form.birthday, userId: this.userInfo.id };
      this.updateUser(data, 1);
    },

    // 性别栏聚焦
    genderIputFocus() {
      this.$refs.genderIput.focus();
      this.opVisible.gender = true;
    },

    // 性别取消保存
    cancelGender() {
      this.form.gender = this.userInfo.gender;
      this.opVisible.gender = false;
    },

    // 性别保存
    saveGender() {
      const data = { gender: this.form.gender, userId: this.userInfo.id };
      this.updateUser(data, 2);
    },

    // 简介聚焦
    briefIputFocus() {
      this.$refs.briefIput.focus();
      this.opVisible.brief = true;
    },

    // 简介取消保存
    cancelBrief() {
      this.form.brief = this.userInfo.brief;
      this.opVisible.brief = false;
    },

    // 保存简介
    saveBrief() {
      const data = { brief: this.form.brief, userId: this.userInfo.id };
      this.updateUser(data, 3);
    },

    // 更新用户信息
    updateUser(data, index) {
      return new Promise(async (resolve, reject) => {
        await updateUser(data).then(
          (res) => {
            switch (index) {
              case 0:
                this.opVisible.nickname = false;
                break;
              case 1:
                this.opVisible.birthday = false;
                break;
              case 2:
                this.opVisible.gender = false;
                break;
              case 3:
                this.opVisible.brief = false;
                break;
            }
            this.$message({
              message: "保存成功",
              type: "success",
            });
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
        await this.$store.dispatch("user/getUserInfo");
        this.init();
      });
    },

    // 超出个数限制
    onExceed() {
      this.loading = false;
    },

    // 上传成功
    uploadSuccess(res, file, fileList) {
      if (res.code !== 0) {
        console.error(res.message);
        this.$message.error("文件上传失败");
        return;
      }
      this.loading = false;
      this.$message({
        message: "上传成功",
        type: "success",
      });
      this.$store.dispatch("user/getUserInfo").then((res) => this.init());
    },

    // 上传失败
    uploadError(err) {
      console.error(err);
      this.loading = false;
      this.$message.error("文件上传失败");
    },

    // 上传前，对文件校验
    beforeUpload(file) {
      this.loading = true;
      const isImg =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg";
      const isLt300KB = file.size / 1000 < 300;
      if (!isImg) {
        this.$message.error("文件格式不正确");
        this.loading = false;
      }
      if (!isLt300KB) {
        this.$message.error("文件大小不能大于300KB");
        this.loading = false;
      }
      return isImg && isLt300KB;
    },

    // 用户名输入弹框
    usernamePrompt() {
      this.$prompt(
        "字母开头，允许2-16字节，允许字母数字下划线，并且用户名成功填写后不允许修改。",
        "填写用户名",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputPattern: /^[a-zA-Z][a-zA-Z0-9_]{1,15}$/,
          inputErrorMessage: "用户名格式不正确",
        }
      )
        .then(({ value }) => {
          const params = { username: value };
          bindUsername(params).then((res) => {
            this.$message({
              message: "绑定成功",
              type: "success",
            });
            this.$store.dispatch("user/getUserInfo").then((res) => this.init());
          });
        })
        .catch(() => {
          // TODO
        });
    },

    // 邮箱脱敏
    sensitiveEmail(email) {
      return email
        ? email.substr(0, 2) + "****" + email.substr(email.indexOf("@"))
        : "";
    },

    // 手机号脱敏
    sensitiveMobile(mobile) {
      var pat = /(\d{3})\d*(\d{4})/;
      return mobile ? mobile.toString().replace(pat, "$1****$2") : "";
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
      img {
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
          color: rgba(0,0,0,0.4);
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
          .user-icon-1 {
            background-image: url("../../images/基本信息.png");
            margin-right: 1px;
          }
          .user-icon-2 {
            background-image: url("../../images/宣传资料.png");
            margin-right: 1px;
          }
          .user-icon-3 {
            background-image: url("../../images/财税数据填报.png");
            margin-right: 1px;
          }
          .user-icon-4 {
            background-image: url("../../images/企业备案信息.png");
            margin-right: 1px;
          }
          .user-icon-5 {
            background-image: url("../../images/我的政策.png");
            margin-right: 1px;
          }
          .user-icon-6 {
            background-image: url("../../images/我的服务.png");
            margin-right: 1px;
          }
          .user-icon-7 {
            background-image: url("../../images/我的活动.png");
            margin-right: 1px;
          }
          .user-icon-8 {
            background-image: url("../../images/站内信息.png");
          }
          .user-icon-9 {
            background-image: url("../../images/账户管理.png");
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
        min-width: 732px;
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
          background-image: url("../../images/service-manage.png");
          height: 319px;
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

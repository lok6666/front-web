<template>
  <div class="policy-calculate">
    <el-dialog
      :visible.sync="dialogVisible"
      custom-class="dialog-bg"
      :top="0"
      :lock-scroll="false"
      :center="true"
      :show-close="false"
      :before-close="handleClose"
    >
      <i
        class="el-dialog__close el-icon el-icon-close"
        @click="bClose"
        style="color: #000;cursor: pointer;position: absolute;top: 51px;right: 17px;"
      ></i>
      <div class="text">
        政策计算器
      </div>
      <div style="margin-bottom: 25px;margin-top:5px;">
        请选择您的条件，我将为您计算出适合您的政策
      </div>
      <div class="calculate-warpper">
        <!-- <div class="select-btn">
            <span class="title">产业空间:</span>
            <div class="select-item">
              <div v-for="(btn, index) in industrialOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('industrialOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">地域:</span>
            <div class="select-item">
              <div v-for="(btn, index) in regionOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('regionOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">上市状态:</span>
            <div class="select-item">
              <div v-for="(btn, index) in equityMarketOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('equityMarketOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">研发机构:</span>
            <div class="select-item">
              <div v-for="(btn, index) in developmentOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('developmentOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">项目分类:</span>
            <div class="select-item">
              <div v-for="(btn, index) in projectOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('projectOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">企业分类:</span>
            <div class="select-item">
              <div v-for="(btn, index) in busneissOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('busneissOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">组织形式:</span>
            <div class="select-item">
              <div v-for="(btn, index) in organizationOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('organizationOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">创新成果:</span>
            <div class="select-item">
              <div v-for="(btn, index) in createOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('createOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div>
          <div class="select-btn">
            <span class="title">财务数据:</span>
            <div class="select-item">
              <div v-for="(btn, index) in taxOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('taxOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div> -->
        <!--           <div class="select-btn">
            <span class="title">企业组织形式:</span>
            <div class="select-item">
              <div v-for="(btn, index) in xsOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('xsOptions', index, 'single')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div> -->
        <div class="select-btn">
          <span class="title">业务领域</span>
          <div class="select-item">
            <div v-for="(btn, index) in favourablebusinessOptions" :key="index">
              <el-button
                class="button-new-tag"
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select('favourablebusinessOptions', index, 'more')"
                >{{ btn.label }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="select-btn">
          <span class="title">企业资质</span>
          <div class="select-item">
            <div v-for="(btn, index) in zzOptions" :key="index">
              <el-button
                class="button-new-tag"
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select('zzOptions', index, 'more')"
                >{{ btn.label }}</el-button
              >
            </div>
          </div>
        </div>
        <div class="select-btn">
          <span class="title">企业规模</span>
          <div class="select-item">
            <div v-for="(btn, index) in businessAttributeOptions" :key="index">
              <el-button
                class="button-new-tag"
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select('businessAttributeOptions', index, 'more')"
                >{{ btn.label }}</el-button
              >
            </div>
          </div>
        </div>
        <!--           <div class="select-btn">
            <span class="title">惠企方式:</span>
            <div class="select-item">
              <div v-for="(btn, index) in favourablebusinessOptions1" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('favourablebusinessOptions1', index, 'more')"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div> -->
        <!--           <div class="select-btn">
            <span class="title">政策主题:</span>
            <div class="select-item">
              <div v-for="(btn, index) in themeOptions" :key="index">
                <el-button
                  class="button-new-tag"
                  :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                  size="small"
                  @click="select('themeOptions', index)"
                  >{{ btn.label }}</el-button>
              </div>
            </div>
          </div> -->
        <div class="select-btn">
          <span class="title">成立年限</span>
          <div class="select-item">
            <div v-for="(btn, index) in yearOptions" :key="index">
              <el-button
                class="button-new-tag"
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select('yearOptions', index, 'more')"
                >{{ btn.label }}</el-button
              >
            </div>
          </div>
        </div>
<!--         <div class="select-btn">
          <span class="title">区县</span>
          <div class="select-item">
            <div v-for="(btn, index) in locationOptions" :key="index">
              <el-button
                class="button-new-tag"
                :class="[btn.isSelect ? 'button-new-tag-select' : '']"
                size="small"
                @click="select('locationOptions', index, 'more')"
                >{{ btn.label }}</el-button
              >
            </div>
          </div>
        </div> -->
      </div>
      <div
        class="calculate"
        style="cursor: pointer;"
        @click="calculate(themeOptions)"
      >
        开始计算
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox, Message } from "element-ui";
import { mapGetters } from "vuex";
import _ from "lodash";
import { policyMatchTagsGet } from "@/config/api";
import request from "@/utils/request";
import {
  industrialOptions,
  regionOptions,
  equityMarketOptions,
  locationOptions1,
  organizationOptions,
  createOptions,
  businessAttributeOptions,
  yearOptions,
  themeOptions,
  xsOptions,
  developmentOptions,
  projectOptions,
  ywOptions,
  zzOptions,
  projectSubjectOptions,
  favourablebusinessOptions,
  favourablebusinessOptions1,
  busneissOptions,
  taxOptions,
} from "@/config/constant.js";
export default {
  name: "Advantage",
  data() {
    return {
      userId: window.localStorage.getItem("USERID"),
      zzOptions,
      favourablebusinessOptions,
      favourablebusinessOptions1,
      createOptions,
      taxOptions,
      projectSubjectOptions,
      industrialOptions: industrialOptions,
      equityMarketOptions: equityMarketOptions,
      developmentOptions: developmentOptions,
      projectOptions: projectOptions,
      regionOptions: regionOptions,
      locationOptions: locationOptions1,
      busneissOptions,
      organizationOptions: organizationOptions,
      businessAttributeOptions,
      yearOptions,
      themeOptions,
      xsOptions,
      typeObj: {
        yewu: "favourablebusinessOptions",
        zizhi: "zzOptions",
        guimo: "businessAttributeOptions",
        nianxian: "yearOptions",
        quxian: "locationOptions",
      },
      selectOptions: [{
    value: "shijingshan",
    label: "石景山区",
    isSelect:　false,
    type: 'quxian'
  }],
      isRequiredList: [
        "locationOptions",
        "yearOptions",
        "businessAttributeOptions",
      ],
      optionsList: [],
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dialogVisible(route) {
      let options = window.localStorage.getItem('cul-detail-options');
      let detail = window.localStorage.getItem('cul-detail');
      this.optionsList = options ? JSON.parse(window.localStorage.getItem('cul-detail')) : [];
      this.selectOptions = detail ? JSON.parse(window.localStorage.getItem('cul-detail-options')) : [];
      this.selectOptions.forEach(e => {
        // 获取listName
        let listName = this.typeObj[e.type];
        this[listName].map(i => {
          if (e.label === i.label) {
            i.isSelect = true;
          };
          return i;
        });
      });
    }
  },
  computed: {
    ...mapGetters(["data_selection"]),
  },
   created() {
    // this.userId && this.getpolicyMatchTagsGet();
/*     let options = window.localStorage.getItem('cul-detail-options');
    let detail = window.localStorage.getItem('cul-detail');
    this.optionsList = options ? JSON.parse(window.localStorage.getItem('cul-detail-options')) : [];
    this.selectOptions = detail ? JSON.parse(window.localStorage.getItem('cul-detail')) : [];
    this.selectOptions.forEach(e => {
        // 获取listName
        let listName = this.typeObj[e.type];
        this[listName].map(i => {
          if (e.label === i.label) {
            i.isSelect = true;
          };
          return i;
        });
      }); */
  },
  updated() {
/*     console.log('updated----');
    let options = window.localStorage.getItem('cul-detail-options');
    let detail = window.localStorage.getItem('cul-detail');
    this.optionsList = options ? JSON.parse(window.localStorage.getItem('cul-detail-options')) : [];
    this.selectOptions = detail ? JSON.parse(window.localStorage.getItem('cul-detail')) : [];
    this.selectOptions.forEach(e => {
      // 获取listName
      let listName = this.typeObj[e.type];
      this[listName].map(i => {
        if (e.label === i.label) {
          i.isSelect = true;
        };
        return i;
      });
    }); */
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
          this.$message.error('请前往个人中心填写基本信息方可使用')
        };
      });
    },
    bClose() {
      this.$emit("dialogClose");
    },
    handleClose(done) {
      this.$forceUpdate();
      this.$emit("handleClose");
    },
    reSelect() {

    },
    select(options, index, type) {
      // 多选
      if (type === "more") {
        this[options][index].isSelect = !this[options][index].isSelect;
        // 更新选中列表
        // 选中放到选中列表
        if (this[options][index].isSelect) {
          this.selectOptions.push(this[options][index]);
          // 取消则过滤选中列表
        } else {
          this.selectOptions = this.selectOptions.filter(
            (el) => el.label !== this[options][index].label
          );
        }
      } else {
        // 单选
        this[options] = this[options].map((e, i) => {
          if (i === index) {
            e.isSelect = !e.isSelect;
          } else {
            e.isSelect = false;
          }
          // 更新选中列表
          if (e.isSelect) {
            this.selectOptions.push(this[options][i]);
          } else {
            this.selectOptions = this.selectOptions.filter(
              (el) => el.label !== this[options][i].label
            );
          }
          return e;
        });
      }
      this.optionsList.push(options);
    },
    async calculate() {
      let that = this;
      // if (!this.isRequiredList.every((e) => that[e].some((el) => el.isSelect))) {
/*         if (this.selectOptions.length === 0) {
        Message({
          message: "请选择必填项",
          type: "error",
          duration: 2 * 1000,
        });
      } else { */
          window.localStorage.setItem('cul-detail', JSON.stringify(this.optionsList));
          window.localStorage.setItem('cul-detail-options', JSON.stringify(this.selectOptions));
         await this.$store.dispatch(
          "data/setSelection",
          _.cloneDeep(this.selectOptions)
        );
        // 清空选中的列表select状态
        this.optionsList.forEach((element) => {
          that[element].forEach((el) => {
            el.isSelect = false;
          });
        });
         this.optionsList = [];
        // this.selectOptions.length && that.$emit("handleClose");
        that.$emit("handleClose");
         this.selectOptions = [];
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.policy-calculate {
  background: #fff;
}
</style>

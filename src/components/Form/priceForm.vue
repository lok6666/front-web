<template>
    <div>
      <h2>企业财务数据</h2>
      <!--看了源码,为了required校验,必须在form标签循环-->
      <div style="display: grid;grid-template-columns: 450px 450px;">
        <el-form
        ref="formRef"
        :inline="true"
        v-for="(item, i) in priceForm"
        :key="i"
        :disabled="disabled || item.disabled"
        :model="item"
        size="mini"
        class="demo-dynamic"
        :label-width="`${labelWidth}px`"
        label-position="right"
      >
        <el-form-item
          :rules="[{ required: item.required, message: `${item.label}为必填项` }]"
          :prop="item.prop"
          :label="item.label"
        >
          <!--todo有待改造-->
          <el-select
            v-model="item[item.prop]"
            placeholder="请选择"
            :filterable="item.filterable"
            v-if="item.showSelect"
          >
            <el-option
              v-for="i in item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </el-form-item>
        </el-form>
      </div>
      <h2>纳税情况</h2>
      <div style="display: grid;grid-template-columns: 450px 450px;">
        <el-form
        ref="formRef"
        :inline="true"
        v-for="(item, i) in payTaxesForm"
        :key="i"
        :disabled="disabled || item.disabled"
        :model="item"
        size="mini"
        class="demo-dynamic"
        :label-width="`${labelWidth}px`"
        label-position="right"
      >
        <el-form-item
          :rules="[{ required: item.required, message: `${item.label}为必填项` }]"
          :prop="item.prop"
          :label="item.label"
        >
          <!--todo有待改造-->
          <el-select
            v-model="item[item.prop]"
            placeholder="请选择"
            :filterable="item.filterable"
            v-if="item.showSelect"
          >
            <el-option
              v-for="i in item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      </div>
      <h2>创汇情况</h2>
      <div style="display: grid;grid-template-columns: 450px 450px;">
        <el-form
        ref="formRef"
        :inline="true"
        v-for="(item, i) in createForm"
        :key="i"
        :disabled="disabled || item.disabled"
        :model="item"
        size="mini"
        class="demo-dynamic"
        :label-width="`${labelWidth}px`"
        label-position="right"
      >
        <el-form-item
          :rules="[{ required: item.required, message: `${item.label}为必填项` }]"
          :prop="item.prop"
          :label="item.label"
        >
          <!--todo有待改造-->
          <el-select
            v-model="item[item.prop]"
            placeholder="请选择"
            :filterable="item.filterable"
            v-if="item.showSelect"
          >
            <el-option
              v-for="i in item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
      </div>
      <div v-if="showBtn" style="float: right">
        <el-button type="primary" @click="submitForm('formRef')">保存</el-button>
        <el-button @click="resetForm('formRef')">取消</el-button>
      </div>
    </div>
  </template>
  
  <script>
    // import { upLoad } from "@/config/api";
    export default {
    name: "User",
    props: {
      priceForm: {
        type: Object,
        default() {
          return []
        }
      },
      payTaxesForm: {
        type: Object,
        default() {
          return []
        }
      },
      createForm: {
        type: Object,
        default() {
          return []
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false
        }
      },
      labelWidth: {
        type: Number,
        default() {
          return 120
        }
      },
      showBtn: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        categoryId: 0
      };
    },
    components: {
    },
    updated() {
      console.log('this---------', this.formConfig);
    },
    mounted() {
      this.init();
    },
  
    methods: {
      // 初始化
      init() {
        // const userInfo = this.$store.getters.userInfo;
        const userInfo = {
          username: 'cesium',
          mobile: '17722331111',
          email: 'xxx@wtdsj.com',
  
        };
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
      // 提交表单
      async submitForm(formName) {
        console.log('this.', this.formConfig);
        this.$emit('likeCountChanges', this.formConfig);
      }
    },
  };
  </script>
  
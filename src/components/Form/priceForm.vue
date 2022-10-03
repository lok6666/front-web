<template>
    <div>
      <h2 style="display: inline; margin-bottom: 20px;">企业财务数据</h2>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin: 10p x 0px;">
        <el-tab-pane label="2022年" name="first"></el-tab-pane>
        <el-tab-pane label="2021年" name="second"></el-tab-pane>
        <el-tab-pane label="2020年" name="third"></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeName1" @tab-click="handleClick" style="margin: 10px 0px 30px;">
        <el-tab-pane :label="i.label" :name="i.label" v-for="(i, index) in yearOptions" :key="index"></el-tab-pane>
      </el-tabs>
      <!--看了源码,为了required校验,必须在form标签循环-->
      <div style="display: grid;grid-template-columns: 450px 450px;">
        <el-form
        style="height: 80px;"
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
           <!--输入框-->
          <el-input v-model="item[item.prop]" v-if="item.showInput" />
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
        formData: {},
        value: 2022,
        categoryId: 0,
        activeName: 'first',
        activeName1: '1-12月',
        yearOptions: [{
          value: '选项2',
          label: '1-12月'
        }, {
          value: '选项3',
          label: '1-11月'
        }, {
          value: '选项4',
          label: '1-10月'
        }, {
          value: '选项5',
          label: '1-9月'
        }, {
          value: '选项1',
          label: '1-8月'
        }, {
          value: '选项6',
          label: '1-7月'
        }, {
          value: '选项7',
          label: '1-6月'
        }, {
          value: '选项8',
          label: '1-5月'
        }, {
          value: '选项9',
          label: '1-4月'
        }, {
          value: '选项10',
          label: '1-3月'
        }, {
          value: '选项11',
          label: '1-2月'
        }, {
          value: '选项12',
          label: '1月'
        }],
        options: [{
          value: '选项1',
          label: '2022'
        }, {
          value: '选项2',
          label: '2021'
        }, {
          value: '选项3',
          label: '2020'
        }, {
          value: '选项4',
          label: '2019'
        }, {
          value: '选项5',
          label: '2018'
        }],
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
        let formData = this.formData;
        this.priceForm.forEach((v) => {
          formData[v.prop] = v[v.prop];
        });
        this.$emit('likeCountChanges', formData);
      }
    },
  };
  </script>
  
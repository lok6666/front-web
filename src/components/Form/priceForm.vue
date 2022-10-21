<template>
    <div>
      <h2 style="display: inline; margin-bottom: 20px;">企业财务数据(万元)</h2>
      <el-tabs v-model="activeYear" @tab-click="handleClickYear" style="margin: 10p x 0px;">
        <el-tab-pane label="2022年" name="2022"></el-tab-pane>
        <el-tab-pane label="2021年" name="2021"></el-tab-pane>
        <el-tab-pane label="2020年" name="2020"></el-tab-pane>
      </el-tabs>
      <el-tabs v-model="activeMonth" @tab-click="handleClickMonth" style="margin: 10px 0px 30px;">
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
          :rules="[item.rules]"
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
      </div>
    </div>
  </template>
  
  <script>
  import {
    entIncomeGetById,
    entIncomeInsert,
    entIncomeUpdate,
  } from "@/config/api";
  import { MessageBox, Message } from 'element-ui'
  import { priceForm } from "@/config/constant.js";
  import _ from 'lodash';
  import request from '@/utils/request';
    export default {
    name: "User",
    props: {
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
        userId: window.localStorage.getItem('USERID'),
        priceForm: priceForm,
        isExist: null,
        formData: {},
        value: 2022,
        categoryId: 0,
        activeYear: '2021',
        activeMonth: '1-12月',
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
    created() {
      this.getPolicyList();
    },
  
    methods: {
      getPolicyList() {
        let that = this;
        request({
          url: `${entIncomeGetById}`,
          method: 'get',
          params: {
            entId: window.localStorage.getItem('USERID'),
            incomeMonth: this.activeMonth,
            incomeYear: this.activeYear
          }
        }).then(res => {
          this.id = res.data && res.data.id ? res.data.id: '';
          this.isExist = res.data ? true: false;
          this.priceForm = _.cloneDeep(this.priceForm.map((v) => {
           v[v.prop] = res.data ? res.data[v.prop] : '';
          !v[v.prop] ? delete v[v.prop] : '';
            return v;
          }));
        });
      },
      updatePolicyList() {},
      handleClickYear(tab, event) {
        console.log('handleClickYear----', this.activeYear);
        // this.activeYear = tab.$options.propsData.name;
        this.getPolicyList();
      },
      handleClickMonth(tab, event) {
        console.log('handleClickMonth----', this.activeMonth);
        // this.incomeMonth = tab.$options.propsData.name;
        this.getPolicyList();
      },
      validateForm(formEl) {
        let add = 0;
        return new Promise((resolve, reject) => {
          formEl.forEach(async (el) => {
            el.validate((v) => {
              ++add;
              // 当存在校验失败的情况直接返回
              if (!v) {
                resolve(false);
              }
              // 遍历结束返回
              else if (add === formEl.length) {
                resolve(true);
              }
            });
          });
        });
      },
      // 提交表单
      async submitForm(formName) {
        let formData = this.formData;
        if (await this.validateForm(this.$refs.formRef)) {
          this.priceForm.forEach((v) => {
            formData[v.prop] = v[v.prop];
          });
          formData.incomeYear = this.activeYear;
          formData.incomeMonth = this.activeMonth;
          request({
            url: `${this.isExist ? entIncomeUpdate : entIncomeInsert}`,
            method: "POST",
            // todo 考虑 id怎么传进去
            data: {
              entId: this.userId,
              id: this.id,
              ...formData,
            }
          }).then(res => {
            Message({
                message: '提交成功',
                type: 'success',
                duration: 5 * 1000
              });
          })
        };
      }
    },
  };
  </script>
  
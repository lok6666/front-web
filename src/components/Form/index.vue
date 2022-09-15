<template>
  <div>
    <!--看了源码,为了required校验,必须在form标签循环-->
    <el-form
      ref="formRef"
      :inline="true"
      v-for="(item, i) in formConfig"
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
        {{ item[i] }}
        <!--输入框-->
        <el-input v-model="item[item.prop]" v-if="item.showInput" />
        <!--时间选择器-->
        <el-date-picker
          v-model="item[item.prop]"
          type="datetime"
          v-if="item.showDatePicker"
          :placeholder="item[placeholder]"
          format="YYYY/MM/DD hh:mm:ss"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
        <!--年选择器-->
        <el-date-picker
          v-model="item[item.prop]"
          type="year"
          v-if="item.showYearPicker"
          placeholder="Pick a year"
        />
        <!--月选择器-->
        <el-date-picker
          v-model="item[item.prop]"
          type="month"
          v-if="item.showMonthPicker"
          placeholder="Pick a month"
        />
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
        <el-checkbox-group v-model="item[item.prop]" v-if="item.showCheckbox">
          <el-checkbox
            v-for="(i, index) in item.options"
            :key="index"
            :label="i"
            name="type"
          ></el-checkbox>
        </el-checkbox-group>
        <!--上传图片-->
        <el-upload
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          v-if="item.upload"
          @click="getIndex(i, item)"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="item.picture"
            :src="item.picture"
            style="width: 178px; height: 178px"
            class="avatar"
          />
          <video
            v-else-if="item.video"
            :src="item.video"
            controls
            style="width: 178px; height: 178px"
            class="avatar"
          ></video>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <!--富文本编辑-->
        <editor
          v-if="item.showWangEditor"
          @click="getIndex(i)"
          :content="content"
          @handle="changeContent"
        ></editor>
      </el-form-item>
    </el-form>
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
    formConfig: {
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

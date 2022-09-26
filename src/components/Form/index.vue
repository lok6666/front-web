<template>
  <div>
    <h2 style="margin-left: 20px;">{{title}}</h2>
    <div :style="customStyle">
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
      label-position="left"
    >
      <el-form-item
        :rules="[{ required: item.required, message: `${item.label}为必填项` }]"
        :prop="item.prop"
        :label="item.label"
      >
        {{ item[i] }}
        <!--输入框-->
        <el-input v-model="item[item.prop]" v-if="item.showInput" />
         <!--textarea输入框-->
        <el-input style="width: 200px" type="textarea" :rows="3" v-model="item[item.prop]" v-if="item.showTextarea" />
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
          :show-file-list="false"
          v-if="item.upload"
          @click.self="getIndex(i)"
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
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!--照片墙-->
        <el-upload
          v-else-if="item.listupload"
          list-type="picture-card"
          :file-list="fileList"
          @click.self="getIndex(i)"
          :before-upload="beforeAvatarUpload1"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <!--认证资料-->
        <el-upload
          class="upload-demo"
          v-else-if="item.zlupload"
          drag
          @click.self="getIndex(i)"
          :before-upload="beforeAvatarUpload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!--富文本编辑-->
        <editor
          v-if="item.showWangEditor"
          @click:native="getIndex(i)"
          :content="content"
          @handle="changeContent"
        ></editor>
      </el-form-item>
    </el-form>
  </div>
  <div v-if="showBtn" style="text-align: right;">
    <el-button type="primary" @click="submitForm('formRef')">提交</el-button>
    <el-button @click="resetForm('formRef')">取消</el-button>
  </div>
  </div>
</template>

<script>
  // import { upLoad } from "@/config/api";
  import request from '@/utils/request';
  export default {
  name: "User",
  props: {
    formConfig: {
      type: Object,
      default() {
        return []
      }
    },
    insertUrl: {
      type: String
    },
    customStyle: {
      type: Object,
      default() {
        return ''
      }
    },
    title: {
      type: String
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
      categoryId: 0,
      itemIndex: null,
      fileList: [],
      formData: {}
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
    // 获取索引
    getIndex(i) {
      this.itemIndex = i;
      console.log('this.itemIndex', this.itemIndex);
    },
    // 提交表单
    async submitForm(formName) {
      let formData = this.formData;
      this.formConfig.forEach((v) => {
        formData[v.prop] = v[v.prop];
      });
        this.$emit('likeCountChanges', formData);
      },
    async resetForm(formName) {
        this.$emit('likeCountChanges', this.formConfig);
      },
      
    beforeAvatarUpload(rawFile) {
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("file", rawFile); // file 即选中的文件
      data.append("userId", 1);
      data.append("type", "image");
      let formConfig = this.formConfig;
      let itemIndex = this.itemIndex;
      var config = {
        method: "post",
        url: `http://172.16.12.8:28182/upload`, //上传图片地址
        type: 'image',
        data: data
      };
      axios.defaults.crossDomain = true;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios(config)
        .then(function (res) {
          formConfig[itemIndex][uploadType.value === 'image' ? 'picture': 'video'] = 'http://' + res;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    beforeAvatarUpload1(rawFile) {
      let fileList = this.fileList;
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("file", rawFile); // file 即选中的文件
      data.append("userId", 1);
      data.append("type", "image");
      var config = {
        method: "post",
        url: `http://172.16.12.8:28182/upload`, //上传图片地址
        type: 'image',
        data: data
      };
      axios.defaults.crossDomain = true;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios(config)
        .then(function ({data}) {
          fileList.push({
            name: '1',
            url: data
        });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

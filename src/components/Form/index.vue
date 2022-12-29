<template>
  <div>
    <h2 style="margin-left: 20px;">{{title}}</h2>
    <div :style="customStyle">
    <!--看了源码,为了required校验,必须在form标签循环-->
    <el-form
      :ref="`formRef`"
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
        :rules="item.rules || [{ required: item.required, message: `${item.label}为必填项`,validator: item.validator }]"
        :required="item.required"
        :prop="item.prop"
        :label="item.label"
      >
        {{ item[i] }}
        <!--输入框-->
        <el-input :readonly="disabled || item.disabled" v-model="item[item.prop]" v-if="item.showInput" :placeholder="item.placeholder" style="width: 184px"/>
        <!--密码-->
        <el-input v-model="item[item.prop]" v-if="item.showPassWord" type="password" :placeholder="item.placeholder"/>
         <!--textarea输入框-->
        <el-input style="width: 500px" type="textarea" :rows="4" v-model="item[item.prop]" v-if="item.showTextarea" />
        <!--时间选择器-->
        <el-date-picker
          v-model="item[item.prop]"
          type="datetime"
          v-if="item.showDatePicker"
          :placeholder="item[placeholder]"
          format="YYYY/MM/DD HH:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
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
          clearable
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
          >
          <div style="text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{i.label}}</div>
 <!--          <el-tooltip effect="dark" :content="i.label" placement="top-start">
            <div style="text-overflow: ellipsis;width: 40px;overflow: hidden;white-space: nowrap;">{{i.label}}</div>
          </el-tooltip> -->
          </el-option>
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
        <div @click="getIndex(i)" v-else-if="item.upload">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUploadSingle"
          >
            <img
              v-if="item[item.prop]"
              :src="item[item.prop]"
              style="width: 178px; height: 178px"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"  @click="getIndex(i)"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <!--上传附件-->
        <div @click="getIndex(i)" v-else-if="item.file">
          <el-upload
            :file-list="item[item.prop] ? JSON.parse(item[item.prop]): ''"
            class="upload-demo"
            :indexValue="i"
            ref="uploadFile"
            :on-preview="handlePreview"
            :on-remove="handleRemoveFile"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUploadFile"
            :limit="1"
            :on-exceed="handleExceed"
          >
            <el-button type="primary">请上传附件</el-button>
            <!-- <template #tip>
              <div class="el-upload__tip">
                请上传附件
              </div>
            </template> -->
          </el-upload>
        </div>
        <!--照片墙-->
        <div @click="getIndex(i)" v-else-if="item.zlupload">
          <el-upload
            class="upload-demo"
            :indexValue="i"
            ref="uploadSingle"
            list-type="picture"
            drag
            :file-list="item[item.prop] ? JSON.parse(item[item.prop]): ''"
            :on-remove="handleRemove"
            :before-upload="beforeAvatarUpload"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div style="border: 1px solid #ccc;width: 723px" v-if="item.showWangEditor" @click="getIndex(i)">
          <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
              :mode="mode"
          />
          <Editor
              style="height: 500px; overflow-y: hidden;"
              v-model="item[item.prop]"
              :defaultConfig="editorConfig"
              :mode="mode"
              :indexValue="i"
              ref="editor"
              @onCreated="onCreated"
              @onChange="onChange"
          />
      </div>
      </el-form-item>
    </el-form>
  </div>
  <div v-if="showBtn" style="text-align: right;">
    <el-button type="warning" @click="submitForm('formRef')">提交</el-button>
    <el-button v-if="showCanelBtn" @click="resetForm('formRef')">取消</el-button>
    <div v-if="!showCanelBtn"style="width:70px; height:39px;display: inline-table;"></div>
  </div>
  </div>
</template>

<script>
  import { validMobile } from '@/utils/validate.js'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
  import { MessageBox, Message } from 'element-ui'
  import { upload } from "@/config/api.js";
  import request from '@/utils/request';
  import _ from 'lodash';
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
    },
    showCanelBtn: {
      type: Boolean,
      default() {
        return true
      }
    },
  },
  components: { Editor, Toolbar },
  data() {
    return {
      categoryId: 0,
      codeCount: 0,
      itemIndex: null,
      formData: {},
      editor: null,
      toolbarConfig: {
          // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
          // excludeKeys: [ /* 隐藏哪些菜单 */ ],
      },
      editorConfig: {
           // 在编辑器中，点击选中“附件”节点时，要弹出的菜单
        hoverbarKeys: {
          attachment: {
            menuKeys: ["downloadAttachment"], // “下载附件”菜单
          },
        },
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadAttachment: {
            customUpload(file, insertFn) {
              var axios = require("axios");
              var FormData = require("form-data");
              var data = new FormData();
              data.append("file", file); // file 即选中的文件
              data.append("userId", window.localStorage);
              data.append("type", "file");
              // 插入节点
              const editor = editorRef.value;
              var config = {
                method: "post",
                url: `${upLoad}`, //上传图片地址
                data,
              };
              axios(config)
                .then(function (res) {
                  const node = { type: 'link', url: res, children: [{ text: 'simple text' }] }
                  editor.insertNode(node);
                })
                .catch(function (error) {
                  console.log(error);
                });
            },
          },
          uploadImage: {
            customUpload(file, insertFn) {
              var axios = require("axios");
              var FormData = require("form-data");
              var data = new FormData();
              data.append("file", file); // file 即选中的文件
              data.append("userId", window.localStorage.getItem('USERID'));
              data.append("type", "image");
              // todo 查看图片链接
              var config = {
                method: "post",
                url: `${upload}`, //上传图片地址
                userId: 1,
                type: "image",
                data: data,
              };
              axios.defaults.crossDomain = true;
              //Access-Control-Allow-Origin 指向前端 ip:port
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
              axios(config)
              .then(function (res) {
                let url = res.data; //拼接成可浏览的图片地址
                insertFn(url, "使用说明", url); //插入图片
              })
              .catch(function (error) {
                console.log(error);
              });
            },
          },
          uploadVideo: {
            customUpload(file, insertFn) {
              var axios = require("axios");
              var FormData = require("form-data");
              var data = new FormData();
              data.append("file", file); // file 即选中的文件
              data.append("userId", window.localStorage.getItem('USERID'));
              data.append("type", "video");
              var config = {
                method: "post",
                url: `${upload}`,
                data: data,
              };
              axios.defaults.crossDomain = true;
              //Access-Control-Allow-Origin 指向前端 ip:port
              axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
              axios(config)
                .then(function (res) {
                  let url = res.data; //拼接成可浏览的图片地址
                  insertFn(url, "使用说明", url); //插入图片
                })
                .catch(function (error) {
                  console.log(error);
                });
            },
          },
        },
      }
    };
  },
  beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁 editor ，重要！！！
  },
  methods: {
    onCreated(editor) {
        this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
    },
    onChange(editor) {
        let itemIndex = this.$refs.editor[0].$attrs.indexValue;
        this.formConfig[itemIndex][this.formConfig[itemIndex].prop] = editor.getHtml();
        console.log('onChange', this.formConfig[itemIndex].prop, editor.getHtml()) // onChange 时获取编辑器最新内容
    },
    // 获取索引
    getIndex(i) {
      this.itemIndex = i;
      console.log('this.itemIndex', this.itemIndex);
    },
    validateForm(formEl) {
      return new Promise((resolve, reject) => {
        formEl.forEach(async (el, i) => {
          el.validate((v) => {
            // 当存在校验失败的情况直接返回
            if (!v) {
              resolve(false);
            }
            // 遍历结束返回
            else if (i === (formEl.length - 1)) {
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
        this.formConfig.forEach((v) => {
          formData[v.prop] = v[v.prop];
        });
        this.$emit('likeCountChanges', formData);
      };
      },
    async resetForm(formName) {
        this.$emit('closeDialog', this.formConfig);
      },
    handleRemove(file) {
      let index = '';
      let that = this;
      let itemIndex = this.$refs.uploadSingle[0].$attrs.indexValue;
      let fileList = that.formConfig[itemIndex][that.formConfig[itemIndex].prop];
      let list = fileList? JSON.parse(fileList): [];
      list.forEach((item, i) => {
        if(item.name === file.name) {
          index = i;
        };
      });
      list.splice(index, 1);
      that.formConfig[itemIndex][that.formConfig[itemIndex].prop] = JSON.stringify(list);
      that.formConfig = _.cloneDeep(that.formConfig);
    },
    // 单独上传附件
    handleRemoveFile(file) {
      let index = '';
      let that = this;
      let itemIndex = this.itemIndex;
      let fileList = that.formConfig[itemIndex][that.formConfig[itemIndex].prop];
      let list = fileList? JSON.parse(fileList): [];
      list.forEach((item, i) => {
        if(item.name === file.name) {
          index = i;
        };
      });
      list.splice(index, 1);
      that.formConfig[itemIndex][that.formConfig[itemIndex].prop] = JSON.stringify(list)
      delete that.formConfig[itemIndex][that.formConfig[itemIndex].prop];
      that.formConfig = _.cloneDeep(that.formConfig);
    },
    beforeAvatarUpload(rawFile) {
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("file", rawFile); // file 即选中的文件
      data.append("userId", window.localStorage.getItem('USERID'));
      data.append("type", "image");
      let that = this;
      let itemIndex = this.$refs.uploadSingle[0].$attrs.indexValue;
      var config = {
        method: "post",
        url: `${upload}`, //上传图片地址
        type: 'image',
        data: data
      };
      axios.defaults.crossDomain = true;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios(config)
        .then(function ({data}) {
          let fileList = that.formConfig[itemIndex][that.formConfig[itemIndex].prop];
          let list = fileList? JSON.parse(fileList): [];
          list.push({
            name: data.substring(data.lastIndexOf('\/') + 1),
            url: data,
            itemIndex
          });
          that.formConfig[itemIndex][that.formConfig[itemIndex].prop] = JSON.stringify(list);
          that.formConfig = _.cloneDeep(that.formConfig);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    beforeAvatarUploadFile(rawFile) {
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("file", rawFile); // file 即选中的文件
      data.append("userId", window.localStorage.getItem('USERID'));
      data.append("type", "file");
      let that = this;
      let itemIndex = this.itemIndex;
      var config = {
        method: "post",
        url: `${upload}`, //上传图片地址
        type: 'file',
        data: data
      };
      axios.defaults.crossDomain = true;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios(config)
        .then(function ({data}) {
          let fileList = that.formConfig[itemIndex][that.formConfig[itemIndex].prop];
          let list = fileList? JSON.parse(fileList): [];
          list.push({
            name: data.substring(data.lastIndexOf('\/') + 1),
            url: data,
            itemIndex,
            label: that.formConfig[itemIndex].label
          });
          that.formConfig[itemIndex][that.formConfig[itemIndex].prop] = JSON.stringify(list);
          that.formConfig = _.cloneDeep(that.formConfig);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    beforeAvatarUploadSingle(rawFile) {
      var axios = require("axios");
      var FormData = require("form-data");
      var data = new FormData();
      data.append("file", rawFile); // file 即选中的文件
      data.append("userId", window.localStorage.getItem('USERID'));
      data.append("type", "image");
      let that = this;
      let itemIndex = this.itemIndex;
      var config = {
        method: "post",
        url: `${upload}`, //上传图片地址
        type: 'image',
        data: data
      };
      axios.defaults.crossDomain = true;
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios(config)
        .then(function ({data}) {
          that.formConfig[itemIndex][that.formConfig[itemIndex].prop] = data;
          that.formConfig = _.cloneDeep(that.formConfig);
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
<style src="@wangeditor/editor/dist/css/style.css"></style>

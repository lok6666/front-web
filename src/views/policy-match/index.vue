<template>
    <div class="app-container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.2)">
      <policy-calculate :dialogVisible="dialogVisible" @handleClose="dialogVisible = false" @dialogClose="dialogClose"/>/>
      <app-header :nav-item-active="1" :isShowAIDialogVisible="isShowAIDialogVisible" @bClose="bClose"/>
      <div class="policy-match-bg">
        <div>匹配结果</div>
      </div>
      <div class="policy-match-container">
        <div class="policy-total">
            <div class="policy-total-content">
                <div class="total-num">
                    <div class="title">已为您计算出适合的政策</div>
                    <div class="num">{{realPolicyList.length}}条</div>
                </div>
                <div class="total-price">
                    <div class="title">政策可提供最大扶持资金</div>
                    <div class="num">{{price}}万元</div>
                </div>
            </div>
            <div class="policy-total-footer">
                <div class="select-btn">
                    <div class="title">已选条件:</div>
                    <div class="select-item">
                    <div v-for="(btn, index) in selectedOptions" :key="index">
                        <el-button
                        class="button-new-tag"
                        size="mini"
                        type="warning"
                        plain
                        >{{ btn.label }}</el-button>
                    </div>
                    </div>
                </div>
                <div style="display: flex;">
                  <div class="policy-calculate" v-if="$route.params.type === '政策匹配'" style="cursor: pointer;" @click="changePolicy()">换一批</div>
                  <div class="policy-calculate" @click="dialogVisible = true">政策计算器</div>
                </div>
            </div>
        </div>
        <div class="policy-result">
            <div class="policy-result-title">
                <div style="display: flex;align-items: center;"><img src="../../images/result-bg.png"/>计算结果</div>
                <div style="display: flex; justify-content: space-between; align-item:center;width: 80%;">
                  <div class="search">
                      <el-input v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @change="inputConfirm">
                          <i slot="suffix"
                          class="el-input__icon el-icon-search"
                          :style="'color:' + inputIconColor"
                          @click="search"
                          />
                      </el-input>
                  </div>
                  <div class="select">
                      <div
                      class="select-item"
                      :class="[siftIndex === index ? 'selected-item' : '']"
                      v-for="(item,index) in siftOptions" :key="index"
                      @click="selectSift(index)">
                      {{item.label}}
                      </div>
                  </div>
              </div>
          </div>
            <div class="policy-list">
              <div class="list-item" v-for="(item, index) in policyList" :key="index" @click="routeTo(item.policyId)">
                <div class="left">
                  <div class="title">
                    <div class="tag-block">
                      <div class="tag-item" style="background: #409eff;">
                        <i :class="[item.policyCollect? `el-icon-star-on` : `el-icon-star-off`]" style="cursor: pointer;" @click.stop="check(index)" />收藏
                      </div>
                      <div class="tag-item location"><img src="../../images/location.png"/><div>{{locationMap[item.policyLocation]}}</div></div>
                      <div class="tag-item location" style="background: #909399"><div>{{item.policyType === 1 ? '申报中' : '已结束'}}</div></div>
                      <!-- <div class="tag-item process-1">{{item.process}}</div> -->
                    </div>
                    <div style="max-width: 720px; display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
                        overflow: hidden;">{{item.policyTitle}}</div>
                  </div>
                  <div v-if="item.policyTheme" class="content">主题：{{item.policyTheme}}</div>
                  <div class="footer">
                    <span style="display: flex;align-item: center;">发文部门：</span>
                    <div class="address">{{item.policyAgency}}</div>
                    <span style="margin-left: 100px;display: flex;align-item: center;">发布时间：</span>
                    <div class="time">{{item.policyTime.substring(0, 10)}}</div>
                  </div>
                </div>
                <div class="right">
                  <div style="font-size: 26px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #D99447;">{{item.policyMaxMoney ? `${item.policyMaxMoney}万元`: '评选认定中'}}</div>
                  <div class="measure">
                    <div v-for="(i, index) in opacition" :key="index" @click.stop="test(i.message,item.policyId)">{{i.message}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pagination-block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[5, 10 ,20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="realPolicyList.length">
              </el-pagination>
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  
  <script>
  import { policyHost,entPolicyCollectInsert,entPolicyCollectDelete,policyMatchTagsGet } from "@/config/api.js";
  import request from '@/utils/request';
  import PolicyCalculate from '@/components/Policycalculate/index'
  import { mapGetters } from "vuex";
  import { getAccessToken } from "@/utils/auth";
  import AppHeader from "@/components/Header/index";
  import AppFooter from "@/components/footer/index";
  import { updateUser, bindUsername } from "@/api/user.js";
  export default {
    name: "User",
    data() {
      return {
        // data_selection: [],
        pageNum: 1,
        pageSize: 5,
        timer: null,
        dialogVisible: false,
        loading: true,
        siftIndex: 0,
        inputValue: '',
        categoryId: 0,
        isShowAIDialogVisible: false,
        price: '0',
        locationMap: {
          beijing: '北京',
          shijingshan: '石景山'
        },
        change: 0,
        isHandler: 0,
        policyCalculate:{
          "jigou": "不符合",
          "diyu": "不符合",
          "shangshi": "不符合",
          "keyan": "不符合",
          "fenlei": "不符合",
          "xiangmu": "不符合",
          "zuzhi": "不符合",
          "yewu": "不符合",
          "chuangxin": "不符合",
          "caiwu": "不符合",
          "zizhi": "不符合",
          "guimo": "全部",
          "nianxian": "全部",
          "quxian": "石景山区",
      },
        policyList: [],
        realPolicyList: [],
        opacition: [{
          message: '奖励措施'
          },
          // {
          //   message: '政策依据'
          // },
          {
            message: '立即咨询'
          }],
/*         siftOptions: [
            {
                value: "1企业",
                label: "智能排序",
                isSelect:　false
            },
            {
                value: "3-5年",
                label: "申报截至时间",
                isSelect:　false
            },
            {
                value: "beijing",
                label: "最高奖励金额",
                isSelect:　false
            }
        ], */
        selectedOptions: []
      };
    },
    components: {
      AppHeader,
      AppFooter,
      PolicyCalculate
    },
    computed: {
      ...mapGetters(["defaultAvatar", "device", "data_selection"]),
    },
    watch:{
      $route: {
        handler: async function(now,old) {
          // this.$route.params.type === '政策匹配' && (this.change = 1);
          // this.$route.params.type === '政策计算器' && (this.change = 0);
          // this.$route.params.type === '政策匹配' && await this.getpolicyMatchTagsGet();
          // this.$route.params.type === '政策计算器' && await this.getPolicyList();
        },
        deep: true
      },
      data_selection: function(val, oldVal) {
        this.change = 0;
        this.getPolicyList(val);
      }
    },
      async created() {
/*       this.$route.params.type === '政策匹配' && (this.change = 1);
      this.$route.params.type === '政策计算器' && (this.change = 0);
      this.$route.params.type === '政策匹配' && await this.getpolicyMatchTagsGet(); */
      this.getPolicyList();
    }, 
    methods: {
      changePolicy() {
        debugger;
        this.change = 1;
        this.getPolicyList();
      },
      bClose() {
        this.isShowAIDialogVisible = false;
      },
      test(message, id) {
        if(message === '立即咨询') {
          this.isShowAIDialogVisible = true;
        } else {
          window.open(`${location.origin}/#/policy-detail/:artId=${id}`)
        }
      },
      dialogClose() {
        this.dialogVisible = false;
      },
      routeTo(id) {
        // this.$router.push(`/policy-detail/:artId=${id}`);
        window.open(`${location.origin}/#/policy-detail/:artId=${id}`)
      },
      getpolicyMatchTagsGet() {
        return request({
          url: `${policyMatchTagsGet}`,
          method: "GET",
          params: {
            companyid: this.userId,
          }
        }).then(({data}) => {
          this.data_selection = Object.keys(data).map(e => {
            return {
              type: e,
              label: data[e]
            }
          });
          this.getPolicyList(this.data_selection);
        });
      },
      getPolicyList(val) {
          this.loading = true;
          let that = this;
          // if(this.$route.params.type === '政策计算器') {
           this.selectedOptions = val || this.data_selection.length >= 1 ? this.data_selection :
            window.localStorage.getItem('selection-detail') ? JSON.parse(window.localStorage.getItem('selection-detail')): [];
            that.selectedOptions.forEach(res => {
              that.policyCalculate[res.type] = res.label || that.policyCalculate[res.type];
             });
          // };
          let tagData = {
            ...JSON.parse(window.localStorage.getItem('entTags')),
            ...that.policyCalculate,
          };
          request({
            url: `${policyHost}`,
            method: 'post',
            data: {
              ...tagData,
              change: this.change,
              entId: window.localStorage.getItem('USERID')
            }
          }).then(res => {
            // this.$route.params.type === '政策匹配' && (this.selectedOptions = []);
            that.loading = false,
            that.realPolicyList = res.data.dataList;
            that.policyList = res.data.dataList.slice(0,5);
            that.price = res.data.dataPlant;
          });
      },
      check(index) {
        this.policyList[index].policyCollect = !this.policyList[index].policyCollect
        request({
          url: `${this.policyList[index].policyCollect ? entPolicyCollectDelete: entPolicyCollectInsert}`,
          method: 'delete',
          data: {
            entId: window.localStorage.getItem('USERID'),
            policyId: this.policyList[index].policyId,
            isCollect: this.policyList[index].policyCollect
          }
        });
      },
      inputConfirm(val) {
        if(this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          if(val === '') {
            this.policyList = this.realPolicyList.slice(0,5);
          } else {
            this.policyList = this.policyList.filter(e => e.policyTitle.includes(val));
          }
        }, 1000);
      },
      search() {},
      handleSizeChange(val) {
        this.pageSize = val;
        let prePage = this.pageSize*(this.pageNum - 1) > this.realPolicyList.length ? 0 : this.pageSize*(this.pageNum - 1);
        let nextPage = this.pageSize*this.pageNum > this.realPolicyList.length? this.realPolicyList.length : this.pageSize*this.pageNum;
        this.policyList = this.realPolicyList.slice(prePage, nextPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        let prePage = this.pageSize*(this.pageNum - 1);
        let nextPage = this.pageSize*this.pageNum > this.realPolicyList.length? this.realPolicyList.length : this.pageSize*this.pageNum;
        this.policyList = this.realPolicyList.slice(prePage, nextPage);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      selectSift(index) {
        this.siftIndex = index;
      },
      select(index) {
        // Vue.set(vm.obj, propertyName, newValue);
        // this.btnList[index].isSelect = !this.btnList[index].isSelect;
      },
      detail(index) {
        window.open(`${location.origin}/#/policy-match-detail/:${index}`)
    /*     this.$router.push({
          path: `/policy-match-detail/:${index}`
        }) */
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
    .policy-match-bg {
      padding-left: 73px;
      padding-bottom: 123px;
      display: flex;
      align-items: flex-end;
      font-size: 56px;
      font-family: AlibabaPuHuiTiR;
      color: #FFFFFF;
      width: 100%;
      height: 442px;
      background-size: cover;
      background-image: url('../../images/policy-match-bg.png');
    }
    .policy-match-container {
      max-width: 1440px;
      margin-top: 31px;
      margin-left: 70px;
      margin-right: 70px;
      margin-bottom: 60px;
      .policy-total {
        height: 340px;
        width: 1300px;
        background-image: url('../../images/match-total.png');
        &-content {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 240px;
            border-bottom: 1px solid #B48859;
            .total-num {
                flex: 0.2;
            }
            .total-price {
                flex: 0.3;
            }
            .title {
                width: 144px;
                font-size: 24px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                line-height: 33px;
            }
            .num {
                font-size: 60px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #000000;
                line-height: 84px;
            }
        }
        &-footer {
            display: flex;
            justify-content: space-between;
            margin: 24px 10px 0px 10px;
            .select-btn {
                display: flex;
                align-items: baseline;
                margin-bottom: 31px;
                .title {
                    font-size: 20px;
                    font-family: AlibabaPuHuiTiR;
                    padding-top: 10px;
                    color: #212121;
                    margin-right: 20px;
                }
                .select-item {
                    display: flex;
                    // grid-template-columns: repeat(9, 86px);
                    // grid-gap: 10px 15px;
                    cursor: pointer;
                    div {
                      margin-right: 5px;
                    }
                }
                .button-new-tag {
                    font-size: 12px;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    border-radius: 5px;
                }
            }
            .policy-calculate {
                width: 160px;
                height: 45px;
                background: #D99447;
                border-radius: 23px;
                font-size: 16px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
      }
      .policy-result {
        &-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 20px;
            margin-top: 20px;
            font-family: CKTKingKong;
            color: #000000;
            line-height: 35px;
            // margin-bottom: 17px;
            // margin-top: 20px;
        }
        .title {
            display: flex;
            align-items: center;
            font-size: 20px;
            font-family: CKTKingKong;
            color: #000000;
            line-height: 35px;
            // margin-bottom: 17px;
            // margin-top: 20px;
        }
        .policy-list {
          margin-top: 30px;
          .list-item {
            margin-bottom: 20px;
            height: 160px;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 10px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 600;
            color: #000000;
            display: flex;
            cursor: pointer;
            .left {
              height: 88%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 100%;
              margin-left: 20px;
              .title {
                font-size: 22px;
              }
              .tag-block {
                display: flex;
                font-size: 12px;
                color: #fff;
                .tag-item {
                  padding: 0px 8px;
                  margin-right: 5px;
                  height: 24px;
                  border-radius: 3px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .location {
                  background: #D99447;
                }
                .process-1 {;
                  background: #00A870;
                }
                .process_2 {
                  background: #EEEEEE;
                }
              }
              .content {
                color: rgb(151,151,151);
                // font-size: 18px;  
              }
              .footer {
                color: rgb(151,151,151);
              }
            }
            // .center {
            //   height: 96%;
            //   width: 100px;
            //   height: 100%;
            //   font-size: 30px;
            //   display: flex;
            //   color: #f28b11;
            //   align-items: center;
            //   border-right: 1px solid rgba(151,151,151, 0.28) !important;
            // }
            .right {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;   
              .measure {
                margin-top: 24px;
                width: 330px;
                display: flex;
                justify-content: space-around;
              }
            }
            .footer {
              display: flex;
              font-size: 14px;
              .address {
                flex: 0.6
              }
            }
          }
        }
        .search {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 70%;
            .a {
                .input {
                    height: 42px !important;
                }
                .el-input-group__append {
                    background: white;
                }
            }
        }
        .select {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          display: flex;
          align-items: center;
          width: 280px;
          justify-content: space-around;
          .select-item {
            cursor: pointer;
          }
          .selected-item {
            color: #D99447;
          }
        }
        .pagination-block {
          display: flex;
          justify-content: center;
          height: 80px;
          align-items: center;
        }
      }
    }
  }
  </style>
  
<template>
    <div class="app-container">
      <policy-calculate :dialogVisible="dialogVisible" @handleClose="dialogVisible = false"/>
      <app-header :nav-item-active="1" />
      <div class="policy-match-bg">
        <div>匹配结果</div>
      </div>
      <div class="policy-match-container">
        <div class="policy-total">
            <div class="policy-total-content">
                <div class="total-num">
                    <div class="title">已为您计算 出适合的政策</div>
                    <div class="num">{{num}}</div>
                </div>
                <div class="total-price">
                    <div class="title">预计可获取 奖励资金</div>
                    <div class="num">{{price}}</div>
                </div>
            </div>
            <div class="policy-total-footer">
                <div class="select-btn">
                    <div class="title">已选条件:</div>
                    <div class="select-item">
                    <div v-for="(btn, index) in selectedOptions" :key="index">
                        <el-button
                        class="button-new-tag"
                        size="small"
                        @click="select(index)"
                        >{{ btn.label }}</el-button>
                    </div>
                    </div>
                </div>
                <div class="policy-calculate" @click="dialogVisible = true">政策计算器</div>
            </div>
        </div>
        <div class="policy-result">
            <div class="title"><img src="../../images/result-bg.png"/>计算结果</div>
            <div style="display: flex; justify-content: space-between; align-item:center;">
                <div class="search">
                    <el-input v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @keyup.enter.native="inputConfirm">
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
            <div class="policy-list">
              <div class="list-item" v-for="(item, index) in policyList" :key="index">
                <div class="left">
                  <div class="title">
                    <div class="tag-block">
                      <div class="tag-item location"><img src="../../images/location.png"/>{{item.location}}</div>
                      <div class="tag-item process-1">{{item.process}}</div>
                    </div>
                  {{item.title}}</div>
                  <div class="content">{{item.content}}</div>
                  <div class="footer">
                    <span style="display: flex;align-item: center;">发文部门:</span>
                    <div class="address">{{item.address}}</div>
                    <span style="display: flex;align-item: center;">申报时间:</span>
                    <div class="time">{{item.time}}</div>
                  </div>
                </div>
                <div class="right">
                  <div style="font-size: 26px;font-family: PingFangSC-Semibold, PingFang SC;font-weight: 600;color: #D99447;">{{item.maxMoney ? `${item.maxMoney}万元`: '评选认定中'}}</div>
                  <div class="measure">
                    <div v-for="(item, index) in opacition" :key="index">{{item.message}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pagination-block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20 ,40]"
                :page-size="5"
                layout="total, sizes, prev, pager, next, jumper"
                :total="50">
              </el-pagination>
            </div>
        </div>
      </div>
      <app-footer />
    </div>
  </template>
  
  <script>
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
        currentPage4: 4,
        dialogVisible: false,
        siftIndex: 0,
        inputValue: '',
        categoryId: 0,
        num: 50,
        price: '3,763.67',
        policyList: [{
          title: '《石景山区推进国际科技创新中心建设加快创新发展支持办法》的通知',
          content: '政策主题： 发展规划;就业创业;科技创新',
          address: '区科委',
          time: '2022-08-01 03:57:00',
          location: '北京市',
          maxMoney: '100',
          process: '进行中',
        },
        {
          title: '《石景山区继续加大中小微企业帮扶力度加快困难企业恢复发展若干措施》的通知',
          content: '政策主题： 发展规划;投资审批;就业创业',
          address: '区政府办',
          time: '2022-05-19 06:01:00',
          location: '北京市',
          process: '进行中',
        },
        {
          title: '《石景山区继续加大中小微企业帮扶力度加快困难企业恢复发展若干措施》的通知',
          content: '高新技术企业;外资企业;中小企业',
          address: '区经信局',
          time: '2022-04-20 10:15:00',
          location: '石景山',
          process: '进行中',
        },
        {
          title: '石景山区促进应用场景建设加快创新发展支持办法》的通知',
          content: '科技创新 公共服务 发展规划 教育科研',
          address: '区科学技术委员会',
          time: '2019-12-16 04:17:00',
          location: '石景山',
          process: '进行中',
        },
        {
          title: '《石景山区鼓励企业上市发展实施办法》的通知',
          content: '发展规划 投资审批',
          address: '区人民政府办公室',
          time: '2022-04-20 10:15:00',
          location: '石景山',
          process: '进行中',
        }],
        opacition: [{
          message: '奖励措施'
          },
          {
            message: '政策依据'
          },
          {
            message: '立即咨询'
          }],
        siftOptions: [
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
        ],
        selectedOptions: []
      };
    },
    components: {
      AppHeader,
      AppFooter,
      PolicyCalculate
    },
    computed: {
      ...mapGetters(["defaultAvatar", "device"]),
    },
    created() {
      this.selectedOptions = JSON.parse(window.localStorage.getItem('selectOptions'));
    },
    mounted() {},
    methods: {
      search() {},
      handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
        console.log("this---------", this.btnList[index]);
      },
      detail(index) {
        this.$router.push({
          path: `/policy-match-detail/:${index}`
        })
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
            justify-content: space-around;
            margin-top: 24px;
            .select-btn {
                display: flex;
                margin-bottom: 31px;
                .title {
                    font-size: 20px;
                    font-family: AlibabaPuHuiTiR;
                    padding-top: 10px;
                    color: #212121;
                }
                .select-item {
                    display: grid;
                    grid-template-columns: repeat(9, 86px);
                    grid-gap: 10px 15px;
                    cursor: pointer;
                }
                .button-new-tag {
                    background-color:rgba(0,0,255,0);
                    // height: 40px;
                    // width: 86px;
                    font-size: 16px;
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
            .left {
              height: 88%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 100%;
              margin-left: 20px;
              .title {
                font-size: 18px;
              }
              .tag-block {
                display: flex;
                font-size: 12px;
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
                color: rgba(151,151,151, 0.5);
                // font-size: 18px;  
              }
              .footer {
                color: rgba(151,151,151, 0.5);
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
                flex: 0.4
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
  
<template>
  <div class="app-container">
    <app-header :nav-item-active="-1" />
    <div class="policy-search-bg">
      <div style="display: flex;align-items: center;">政策申报<p class="policy-search-agile">Cultural industry</p></div>
    </div>
    <div class="policy-search-container">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 20px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>政策申报</el-breadcrumb-item>
    </el-breadcrumb>
      <div class="search">
        <el-input v-model="inputValue" style="border-radius: 18px;" placeholder="请输入" @keyup.enter.native="inputConfirm">
        <i slot="suffix"
                        class="el-input__icon el-icon-search"
                        :style="'color:' + inputIconColor"
                        @click="search"
                        />
        </el-input>
      </div>
      <div class="select-btn">
        <div>政策级别:</div>
          <div v-for="(btn, index) in btnList1" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('btnList1', index)"
              >{{ btn.message }}</el-button
            >
        </div>
      </div>
      <div class="select-btn">
        <div>政策有效性:</div>
          <div v-for="(btn, index) in btnList2" :key="index">
            <el-button
              class="button-new-tag"
              :class="[btn.isSelect ? 'button-new-tag-select' : '']"
              size="small"
              @click="select('btnList2', index)"
              >{{ btn.message }}</el-button
            >
        </div>
      </div>
      <div style="margin-top: 30px;">
            <div style=" margin-bottom: 16px; width: 100%;border-bottom: 0.1px solid;padding-bottom: 10px;">共找到<span style="color: red">100</span>查询结果</div>
            <div v-for="(item, index) in policyList" :key="index"
            :class="`item-${index} policy-search-container-item`">
            <div class="message">{{item.message}}</div>
            <div class="time">
              <i :class="[item.collage? `el-icon-star-on` : `el-icon-star-off`]" style="cursor: pointer;" @click="check(index)"/>
              <i :class="[item.collage? `el-icon-document-checked` : `el-icon-document-add`]" style="cursor: pointer;" @click="check(index)"/>
              {{item.time}}</div>
      </div>
      <div class="pagination-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 40, 70, 100]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="9">
          </el-pagination>
        </div>
      </div>
    </div>
    <app-footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getAccessToken } from "@/utils/auth";;
import bank1 from "../../images/bank1.png";
import AppHeader from "@/components/Header/index.vue";
import AppFooter from "@/components/footer/index.vue";
import { updateUser, bindUsername } from "@/api/user.js";
export default {
  name: "User",
  data() {
    return {
      currentPage: 4,
      inputValue: '',
      categoryId: 0,
      btnList1: [
        {
          message: "不限",
          isSelect: false,
        },
        {
          message: "国家级",
          isSelect: false,
        },
        {
          message: "北京市",
          isSelect: false,
        },
        {
          message: "石景山区",
          isSelect: false,
        }
      ],
      btnList2: [
        {
          message: "正在申报",
          isSelect: false,
        },
        {
          message: "以往政策",
          isSelect: false,
        }
      ],
      policyList: [
        {
          message: "北京市石景山区人民政府办公室关于印发《石景山区推进国际科技创新中心建设加快创新发展支持办法》的通知",
          time: '2022/9/19',
          collage: false,
          apply: false
        },
        {
          message: "北京市石景山区人民政府办公室关于印发《石景山区继续加大中小微企业帮扶力度加快困难企业恢复发展若干措施》的通知",
          time: '2022/9/18',
          collage: false,
          apply: false
        },
        {
          message: "北京市石景山区人民政府关于实施2022至2024年度促进就业优惠政策的通知",
          time: '2022/9/17',
          collage: false,
          apply: false
        },
        {
          message: "北京市石景山区人民政府办公室关于印发《石景山区促进应用场景建设加快创新发展支持办法》的通知",
          time: '2022/9/16',
          collage: false,
          apply: false
        },
        {
          message: "石景山区科普基地认定办法",
          time: '2022/9/15',
          collage: false,
          apply: false
        },
        {
          message: "关于促进中关村虚拟现实产业创新发展的若干措施",
          time: '2022/9/14',
          collage: false,
          apply: false
        },
        {
          message: "石景山区关于促进冰雪体育产业快 速发展的若干措施(试行)",
          time: '2022/9/13',
          collage: false,
          apply: false
        },
        {
          message: "石景山区促进招商引资的支持办法",
          time: '2022/9/12',
          collage: false,
          apply: false
        },
        {
          message: "石政发〔2019〕7号- 北京市石景山区人民政府关于印发《石景山区鼓励企业上市发展实施办法》的通知",
          time: '2022/9/11',
          collage: false,
          apply: false
        },
      ]
    };
  },
  components: {
    AppHeader,
    AppFooter,
  },
  computed: {
    ...mapGetters(["defaultAvatar", "device"]),
  },
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    check(index) {
      this.policyList[index].collage = true
    },
    search() {},
    select(options, index) {
      // this[options] = this[options].map(e => {
      //     e.isSelect = false;
      //     return e;
      //   });
      // this[options][index].isSelect = true;
    },
    detail(index) {
      this.$router.push({
        path: `/policy-search-detail/:${index}`
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
  .policy-search-bg {
    margin-top: 100px;
    padding-left: 74px;
    padding-bottom: 24px;
    display: flex;
    align-items: flex-end;
    font-size: 60px;
    font-family: Helvetica;
    color: #FFFFFF;
    width: 100%;
    height: 256px;
    background-size: cover;
    background-image: url('../../images/policysearchBg.png');
    .policy-search-agile {
        margin-left: 8px;
        font-size: 26px;
        font-family: AlibabaPuHuiTiM;
        line-height: 35px;
    }
  }
  .search {
    width: 100%;
    padding: 28px 67px 36px;
    justify-content: center;
    align-items: center;
    .a {
      .input {
        height: 42px !important;
      }
      .el-input-group__append {
        background: white;
      }
    }
  }
  .policy-search-container {
    max-width: 1440px;
    width: 100%;
    padding: 0px 70px 10px;
    .select-btn {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .button-new-tag {
        margin-left: 10px;
        width: 86px;
        height: 40px;
        border-radius: 5px;
        border: 1px solid rgba(0,0,0,0.31);
      }
      .button-new-tag-select {
        border-radius: 5px;
        background: #D99447;
        border: 1px solid rgba(0,0,0,0);
      }
    }
    &-item {
      padding-left: 21px;
      padding-right: 45px;
      //min-width: 1304px;
      height: 48px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    //偶数行
    &-item:nth-of-type(even) {
      background: #fff
    }
     .pagination-block {
      display: flex;
      justify-content: center;
      height: 80px;
      align-items: center;
    }
  }
}
</style>

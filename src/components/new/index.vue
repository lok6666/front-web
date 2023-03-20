<template>
  <div class="new-wrap">
    <div class="container">
      <div class="new-header">
        <div>
          <span class="new-title" :class="[item.isSelect? 'new-title-select': '']" v-for="(item, index) in mainTabs" :key="index" @click="changeTab(index)">{{item.message}}{{index === 0 ? '/': ''}}</span>
       </div>
        <span class="new-more"  @click="routeTo2()">了解更多<div class="new-more-icon"></div></span>
      </div>
      <div class="new-content">
            <img style="margin-right: 20px;width: 427px; height: 304px;" :src="indexImg" alt="">
            <div class="new-content-list">
                <div class="new-content-list-item" @click="routeTo(item)" v-for="(item, index) in contentList" :key="index">
                    <span class="new-content-list-item-title">{{item.title || item.policyTitle}}</span>
                    <span class="new-content-list-item-time">{{(item.releaseDate || item.policyTime).substring(0, 10)}}</span>
                </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import {hostList} from '@/config/index'
import policyIcon from "../../images/policy-icon.png";
import newIcon from "../../images/new-icon.png";
import { articleList, indexPolicyList, sjsindexPolicyList } from "@/config/api.js";
import request from '@/utils/request';
import _ from 'lodash';
export default {
  name: "new",
  data() {
    return {
      mainTabs: [
        {message: '最新新闻', itemType: 'newList', isSelect: true},
        {message: '最新政策', itemType: 'newPolicyList', isSelect: false}
      ],
      indexImg: '',
      message: '最新新闻',
      policyIcon,
      newIcon,
      current: 1,
      newList: [],
      policyList: [],
      contentList: []
    }
  },
  created() {
    let that = this;
    // 最新新闻
    request({
      url: `${articleList}`,
      method: 'post',
      data: {
        contentType: hostList.filter(e => {
              if(window.location.hash.includes(e)) {
                  return e;
              }
          })[0].replace('#/', ''),
        pageNum: 1,
        pageSize: 10,
        recommend: 1,
        deleteState: 0
      }
    }).then(res => {
      that.newList = res.data.list;
      that.contentList = res.data.list;
      this.indexImg = this.contentList[0].picture || (this.mainTabs[0].isSelect ? newIcon : policyIcon);
    });
    request({
      url: `${this.$router.isBeijing() ? indexPolicyList : sjsindexPolicyList}`,
      method: 'post',
      data: {
      }
    }).then(res => {
      that.policyList = res.data;
    });
  },
  methods: {
    changeTab(i) {
      this.mainTabs.forEach((el, index) => {
        if(index === i) {
          this.message = el.message;
          el.isSelect = true;
        }
        else {
          el.isSelect = false;
        }
      });
      // todo 切换数据
      this.contentList = this.mainTabs[i].message === '最新新闻' ? this.newList : this.policyList;
      this.indexImg = this.contentList[0].picture || (this.mainTabs[0].isSelect ? newIcon : policyIcon);
    }, 
    routeTo(item) {
      this.$router.push(`${this.message === '最新新闻' ? '/new-detail' : '/policy-detail'}/:artId=${item.id}`);
    },
    routeTo2() {
      this.message === '最新新闻' ?this.$router.push(`/new-more?message=${this.message}`) :this.$router.push(`/policy-search`) ;
    }
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss" scoped>
.new-wrap {
/*   display: flex;
  justify-content: center; */
  .container {
    margin: 60px 92px 60px;
    // margin: 60px 92px;
/*     max-width: 1440px;
    width: 100%; */
    .new-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: AlibabaPuHuiTiR;
        margin-bottom: 22px;
        .new-title {
            width: 188px;
            height: 55px;
            font-size: 40px;
            color: #212121;
            line-height: 55px;
            cursor: pointer;
            opacity: 0.5;
        }
        .new-title-select {
          opacity: 1;
           color: #212121;   
        }
        .new-more {
            cursor: pointer;
            margin-left: 3px;
            display: flex;
            align-items: center;
            font-size: 24px;
            color: #212121;
            line-height: 39px;
        }
        .new-more-icon {
            display: inline-block;
            height: 25px;
            width: 21px;
            background: url('../../images/了解更多.png')
                0px 0px no-repeat;
            background-size: 21px 25px;
            margin-left: 5px;
        }
    }
    .new-content {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        // justify-content: space-between;
        .new-content-list {
            width: 816px;
            max-height: 304px;
            overflow: scroll;
            color: #212121;
            &::-webkit-scrollbar {
              display: none;
            }
            &-item {
                line-height: 30px;
                padding-right: 10px;
                white-space: nowrap;
                cursor: pointer;
                display: flex;
                justify-content: space-between;
                &-title {
                  width: 626px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
            }
        }
    }
  }
}
</style>

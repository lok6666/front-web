<template>
  <ul
    v-loading="loading"
    class="note-list"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <transition-group name="fade-list">
      <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="wrap-img">
          <img :src="item.cover">
        </div>
        <div class="wrapper-meta">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="item.user.avatar">
          </div>
          <span class="right-solt">{{ item.user.nickname }}</span>
          <span class="right-solt">{{ formatDate(item.publishTime) }}</span>
          <span class="active" @click="categoryClick(item.categoryId)">{{ item.categoryName }}</span>
        </div>

        <div class="content">
          <!-- <router-link :to="'/article/' + item.id" class="title"><span v-if="item.original !== 1">【转载】</span>北京字节跳动网络技术有限公司</router-link> -->
          <router-link :to="'/article/' + item.id" class="title"><span v-if="item.original !== 1">【转载】</span> {{ item.title }}</router-link>
          <!-- <p class="abstract multi-ellipsis--l3"><p title="字节跳动成立于2012年3月，是一家技术驱动的移动互联网公司，公司致力于采用先进的推荐引擎技术，提供基于移动设备的信息分发解决方案。 随着大众用户的阅读行为广泛向移动设备迁移，字节跳动获得了高速发展，在行业内已建立起了极高的品牌知名度与影响力。在此过程中，字节跳动帮助内容创造者们更方便的进行内容的分发，助力各类媒体更好地适应移动互联网时代。 在夯实国内市场的同时，字节跳动也在积极进行国际化部署，目标在全球范围内提供先进的移动互联网信息分发服务，成为全球领先的移动互联网公司。" class="textId" style="color: #747474;font-size: 1em;">字节跳动成立于2012年3月，是一家技术驱动的移动互联网公司，公司致力于采用先进的推荐引擎技术，提供基于移动设备的信息分发解决方案。 随着大众用户的阅读行为广泛向移动设备迁移，字节跳动获得了高速发展字节跳动获得了高速发展字节跳动获得了高速发展字节跳动获得了高速发展字节跳动获得了高速发展字节跳动获得了高速发展，...</p> -->
          <p class="abstract multi-ellipsis--l3">{{ item.summary }}</p>
          <div class="tags-wrapper">
            <span
              v-for="(tag, index2) in item.tagList"
              :key="index2"
              class="tag active btn"
              @click="tagClick(tag.id)"
            >
              {{ tag.name }}
            </span>
          </div>
          <div class="meta">
            <span>{{ item.commentCount }}&ensp;评论</span>
            <span>{{ item.likeCount }}&ensp;点赞</span>
            <span>{{ item.collectCount }}&ensp;收藏</span>
            <span>{{ item.viewCount }}&ensp;浏览</span>
          </div>
        </div>
      </li>
    </transition-group>
    <div v-show="list.length === 0 && !loading" class="list-empty">列表为空</div>
  </ul>
</template>

<script>
import { formatDate } from '@/utils/index.js'
export default {
  name: 'ArticleList',
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: true
    }
  },
  methods: {

    // 日期格式化
    formatDate(str) {
      // ios NAN问题
      str = str.replace(/-/g, '/')
      const date = new Date(str)
      const now = new Date()
      return date.getFullYear() === now.getFullYear()
        ? formatDate(new Date(str), 'MM月dd日') : formatDate(new Date(str), 'yyyy年MM月dd日')
    },

    // 分类点击
    categoryClick(id) {
      if (this.$route.path !== '/category') {
        this.$router.push(
          {
            path: '/category',
            query: { id: id }
          }
        )
      }
    },

    // 标签点击
    tagClick(id) {
      if (this.$route.path !== '/tag') {
        this.$router.push(
          {
            path: '/tag',
            query: { id: id }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.note-list {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #999;
  min-height: 50px;

  .list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    position: relative;
    min-height: 200px;
    width: 100%;
    border-bottom: 1px solid #f0f0f0;
    padding: 15px 2px 15px 30px;
    margin-top: 5px;

    @media screen and (max-width: 922px){
      padding-left: 15px;
      width: 100vw;
    }

    .active {
      cursor: pointer;

      &:hover {
        color: #007fff;
      }
    }

    .wrap-img {
      // position: absolute;
      width: 150px;
      height: 90px;
      // top: 50%;
      // transform: translateY(-50%);
      // right: 18px;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid #f3f7fa;
      margin-right: 10px;

      @media screen and (max-width: 922px){
        width: 100px;
        height: 60px;
        right: 10px;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .wrapper-meta {
      font-size: 13px;
      font-weight: 700;
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .avatar-wrapper {
        position: relative;
        display: inline-block;
        margin-right: 5px;

        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }

      .right-solt:after{
        content: "·";
        margin: 0 5px;
        color: #b2bac2;
      }
    }

    .content {
      width: 100%;
      padding-right: 180px;

      @media screen and (max-width: 922px){
       padding-right: 120px;
      }

      .title {
        margin: -7px 0 4px;
        display: inline-block;
        font-size: 18px;
        font-weight: 700;
        line-height: 1.5;
        color: #2f2f2f;

        @media screen and (max-width: 922px){
          width: 100%;
          font-size: 15px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        &:hover {
          text-decoration: underline;
        }
      }

      .abstract {
        margin: 0;
        font-size: 13px;
        line-height: 24px;
        color: #999;
        margin-bottom: 5px;

        @media screen and (max-width: 922px){
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .tags-wrapper {
        font-size: 11px;
        margin-bottom: 15px;
        display: flex;
        flex-wrap: wrap;

        .tag {
          border: 1px #999 solid;
          border-radius: 14px;
          padding: 5px 12px;
          margin-right: 3px;

          &:hover {
            border: 1px #007fff solid;
          }
        }
      }

      .meta {
        padding-right: 0!important;
        font-size: 12px;
        font-weight: normal;
        line-height: 20px;

        span {
          margin-right: 10px;
        }
      }
    }
  }

  .list-empty {
    background: #fff;
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
  }
}
</style>

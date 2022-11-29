<template>
  <ul
    v-loading="loading"
    class="advantage-list"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="#fff"
  >
    <transition-group name="fade-list">
<!--       <li v-for="(item, index) in list" :key="index" class="list-item">
        <div class="wrap-top">
            <div class="wrap-img">
                <img :src="item.cover">
            </div>
            <div class="wrapper-meta">
                <div class="avatar-wrapper">
                    平台优势1
                </div>
            <span class="right-solt">{{ item.user.nickname }}</span>
            </div>
        </div>
        <div class="wrap-desc">
        </div>
      </li> -->
    </transition-group>
  </ul>
</template>

<script>
export default {
  name: 'Advantage',
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
  }
}
</script>

<style lang="scss" scoped>
.advantage-list {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #999;
  min-height: 50px;

  .list-item {
    display: flex;
    flex-direction: column;
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
    .wrap-top {
        display: flex;
        justify-content: center;
        align-items: center;
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
        flex-direction: column;
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

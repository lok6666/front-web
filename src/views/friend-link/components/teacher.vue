<template>
  <div class="user-table-wrap collect-bg">
    <div class="user-table-title">
      <div class="user-table-service">
        已关注的老师
      </div>
      <div class="user-table-all">
        <img
          class="table-icon"
          src="../../../images/列表.png"
          style="width: 17px; heigth: 17px;"
        />查看全部
      </div>
    </div>
    <div class="teacher-list">
        <div class="teacher-list-item" v-for="(i, index) in userList" :key="index">
            <img class="user-img" :src="i.userImg"/>
            <div class="name">{{i.name}}</div>
            <div class="desc">{{i.desc}}</div>
            <div class="tag">{{i.tag}}</div>
        </div>
    </div>
  </div>
</template>

<script>
import userPicture from "@/images/userPicture.png";
export default {
  data() {
    return {
      userList: [
        {
          name: '卢孝华',
          userImg: userPicture,
          desc: "10字个人评述信息",
          tag: 'aaaa'
        },
        {
          name: '卢孝华',
          userImg: userPicture,
          desc: "10字个人评述信息",
          tag: 'aaaa'
        },
        {
          name: '卢孝华',
          userImg: userPicture,
          desc: "10字个人评述信息",
          tag: 'aaaa'
        },
        {
          name: '卢孝华',
          userImg: userPicture,
          desc: "10字个人评述信息",
          tag: 'aaaa'
        },
        {
          name: '卢孝华',
          userImg: userPicture,
          desc: "10字个人评述信息",
          tag: 'aaaa'
        },
        {
          name: '卢孝华',
          userImg: userPicture,
          desc: "10字个人评述信息",
          tag: 'aaaa'
        }
      ],
    };
  }
};
</script>

<style lang="scss" scoped>
.collect-bg {
  background-repeat: no-repeat !important;
  background-image: url("../../../images/已收藏政策背景.png") !important;
}
.user-table-wrap {
  background: #ffffff;
  border-radius: 4px;
  margin-top: 10px;
  margin-bottom: 27px;
  padding-top: 12px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 13px;
  .table-icon {
    width: 17px !important;
    height: 17px;
    margin-right: 2px;
  }
  .table-item-icon {
    width: 15px !important;
    height: 15px;
    margin-right: 2px;
  }
  .user-table-title {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 18px;
    height: 148px;
    .user-table-service {
      flex: 0.7;
      display: flex;
      align-items: center;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
    .user-table-all {
      display: flex;
      justify-content: center;
      width: 118px;
      height: 40px;
      margin-right: 10px;
      background: #ffffff;
      border-radius: 4px;
      border: 1px solid #e1e1e1;
      /* justify-content: center; */
      align-items: center;
    }
  }
  .teacher-list {
        display: flex;
        justify-content: space-around;
        &-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .name {
                font-size: 24px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 33px;
            }
            .tag {
                width: 117px;
                height: 32px;
                background: #B48859;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 16px;
            }
        }
    }
}
</style>

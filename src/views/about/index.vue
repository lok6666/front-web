<template>
  <div class="container">
    <app-header :nav-item-active="-1" />
    <div class="content-container markdown-body animated fadeIn">
      <h3>简介</h3>
      <p>本站点主要维护人程序员小姚同学，一个主web开发90后普通程序员，然后活在这个不痛不痒的世界里。因为以前比较喜欢玩电脑，而且觉得写代码很牛逼的亚子，所以大学学了计算机，之后便在程序袁的不归路上越走越远......  </p>
      <p>于我个人而言，编程算是一个爱好<code>我永远喜欢编程.jpg</code>，起码编程这件事能让我孜孜不倦的做下去。其实我也怕当爱好成为我的工作后会失去原本属于这份爱好的兴趣,但我更无法忍受我的工作是我不喜欢做事情，我也没信心做好任何一份我不热爱的工作。编程并不是一件容易的事情，头秃卡bug是常有的事,<code>沧桑脸.jpg</code> 但是能怎么办呢，平凡人生的常态也许就是这样子,某得办法，都是为了生活，且行且努力吧。希望能通过我自己的一点点努力拉近自己理想生活的距离，出任CEO，迎娶白富美，走上人生巅峰​(<span class="ql-emojiblot" data-name="peach">﻿<span contenteditable="false"><span class="ap ap-peach">?</span></span>﻿</span>真好吃，甚至有点想开潘<span class="ql-emojiblot" data-name="peach">﻿<span contenteditable="false"><span class="ap ap-peach">?</span></span>﻿</span>大会)。  </p>
      <p style="background-color: #99CCFF;color: #fff;padding: 10px;border-radius: 2px;">医生说我牙不好，怕是以后只能吃软饭了，所以有没有那种，就是那种能包.......那没有的话我等下再来问下。</p>
      <h3>宗旨</h3>
      <p>本号的宗旨主要分享作者在生活和工作中读过的好文章，以及作者在生活和工作过程中遇到的一些问题的记录，一些心得以及总结的输出。希望通过文章记录的这种方式沉淀下自己，同时也希望能帮到更多的人，交到更多志同道合的朋友，聊聊<code>哲学♂</code>，谈谈<code>橘子♀</code>。咳咳~~~</p>
      <h3>项目开源</h3>
      <p>项目包括前后端，都是臭弟弟程序员小姚同学本人写的，前端项目使用Vue全家桶 + Element-UI编写，后端使用SpringBoot + MyBatis-Plus + Security搭建的博客服务Api。项目目前都已在Github上开源，欢迎star哦～</p>
      <ul>
        <li>前端项目：<a href="https://github.com/copoile/blog-web" target="_blank">https://github.com/copoile/blog-web</a></li>
        <li>后端项目：<a href="https://github.com/copoile/blog-api" target="_blank">https://github.com/copoile/blog-api</a></li>
      </ul>
      <h3>意见反馈</h3>
      <p>若本号内容有涉及版权问题请及时联系站长进行整改，站内错误或是其他内容建议也欢迎反馈到站长。</p>
      <h3>联系方式</h3>
      <ul>
        <li>谷歌邮箱：<a href="mailto:yaohw484@gmail.com">yaohw484@gmail.com</a></li>
        <li>QQ邮箱：<a href="mailto:copoile@qq.com">copoile@qq.com</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import '@/styles/heilingt.css'
import AppHeader from '@/components/Header/index'
export default {
  name: 'About',
  components: {
    AppHeader
  }
}
</script>

<style lang="scss" scoped>
.container {
  @import '~@/styles/variables';
  width: 100%;
  height: 100vh;
  overflow-x: overlay;
  overflow-y: -webkit-overlay;
  overflow-y: overlay;

  .content-container {
    background: #fff;
    max-width: 720px;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 2px;
    font-size: 15px;
    box-sizing: border-box;
    padding: 15px;
    margin-bottom: 20px;

    @media screen and (max-width: 922px){
      margin-top: 0;
    }
  }
}
</style>

<template>
  <div class="ai-home">
    <div class="chatroom">
      <div class="header">
        <p>智能客服</p> 
        <i class="el-dialog__close el-icon el-icon-close" @click="bClose" style="color: #fff;cursor: pointer;"></i>
      </div>
      <div class="content">
        <!-- 聊天区域 -->
        <div class="chatBox">
          <!-- 聊天窗 -->
          <div class="chatWindow" id="chatWindow">
            <!-- <div class="loading" v-if="isLoading">
              <img
                class="loadingImg"
                src="../../assets/loading.gif"
                alt="加载中"
              />
            </div> -->
            <div
              class="chatBubbleBox"
              v-for="(item, index) in chats"
              :key="index"
            >
              <div
                class="chatBubbleTime"
                v-if="item.send_timestamp && item.time_show"
              >
                <span>{{ item.show_time }}</span>
              </div>
              <div
                class="chatBubble"
                :class="{ chatBubbleUser: item.sender != 0 }"
              >
                <div name="亮亮" class="avatar" v-if="item.sender == 0"></div>
                <div class="msgBox">
                  <div class="bubbleBox" v-if="item.sender == 1">
                    <p>{{ item.send_con }}</p>
                  </div>
                  <div
                    class="bubbleBox"
                    v-else-if="item.sender == 0 && item.send_con[0].msgInfo"
                  >
                    <p
                      v-for="(item_msg, index_msg) in item.send_con"
                      :key="index_msg"
                    >
                      {{ item_msg.msgInfo }}
                    </p>
                  </div>
                  <div class="bubbleBox" v-else-if="item.sender == 0">
                    <p>{{ item.send_con }}</p>
                  </div>
                  <div
                    class="bubbleBox listBox"
                    v-if="item.sender == 0 && item.list"
                  >
                    <div
                      class="bubbleList"
                      v-for="(item_list, index_list) in item.list"
                      :key="index_list"
                      @click="goDetail(item_list)"
                    >
                      <div class="listTitle">
                        {{
                          item_list.title ||
                            item_list.lawTitle ||
                            item_list.contractName ||
                            item_list.caseTitle
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 聊天输入框 -->
          <div class="chatInput">
            <textarea
              placeholder="请输入您的问题..."
              v-model="message"
              @keydown="stopEnter"
              @keyup.enter="send"
            ></textarea>
            <div class="sendBtn" @click="send">发送</div>
          </div>
        </div>
        <!-- 辅助工具 -->
        <!-- <div class="tools">
            <div class="toolsBox" v-if="tool_show == -1">
              <img
                v-for="(item, index) in tools"
                :key="index"
                :src="item.img"
                :alt="item.name"
                @click="getTool(index)"
              />
            </div>
            <legislation v-else-if="tool_show == 0"></legislation>
            <lawcase v-else-if="tool_show == 1"></lawcase>
            <dispute v-else-if="tool_show == 2"></dispute>
            <aidedtools v-else-if="tool_show == 3"></aidedtools>
            <replayDetail
              :detail="replyDetail"
              v-else-if="tool_show == -2"
            ></replayDetail>
          </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {imgDatalogV3} from "@/utils/util.js";
//   import legislation from "../components/tool_legislation";
//   import lawcase from "../components/tool_case";
//   import dispute from "../components/tool_dispute";
//   import aidedtools from "../components/tool_aidedtools";
//   import replayDetail from "../components/tool_replayDetail";
export default {
  name: "Home",
  data() {
    return {
      userid: "23941",
      // 待发送信息
      message: "",
      isEnter: false, //是否处于停止回车
      // 聊天记录(假设)
      chats: [
        {
          sender: 0, //发送人，0机器人1用户
          send_con: "你好，我是智能客服小文，有问题请咨询我!",
          send_timestamp: "1607731220000", //发送时间,存时间戳好进行判断，若聊天间隔3分钟内，不重复显示时间
        },
        {
          sender: 1,
          send_con: "你好，你能干嘛？",
          send_timestamp: "1608872420000",
        },
        {
          sender: 0,
          send_con: "你可以让我帮你找合同模板、法律案例、这些东西",
          send_timestamp: "1608873420000",
        },
        {
          sender: 1,
          send_con: "我需要一些劳动仲裁官司的案例",
          send_timestamp: "1609138820000",
        },
        {
          sender: 0,
          send_con: "好的，我这就为你去找...",
          send_timestamp: "1609138830000",
        },
      ],
      // 答复详情
      replyDetail: {},
      // 辅助工具
      // tools: [
      //   {
      //     name: "法规搜索",
      //     url: "",
      //     img: require("../assets/chatroom/tool_1.png")
      //   },
      //   {
      //     name: "案例搜索",
      //     url: "",
      //     img: require("../assets/chatroom/tool_2.png")
      //   },
      //   {
      //     name: "解纷方式",
      //     url: "",
      //     img: require("../assets/chatroom/tool_3.png")
      //   },
      //   {
      //     name: "辅助工具",
      //     url: "",
      //     img: require("../assets/chatroom/tool_4.png")
      //   }
      // ],
      tool_show: -1, //展示的工具，-1工具栏，0法规搜索，1案例搜索，2解纷方式，3辅助工具
      isLoading: 0, //是否正在加载中，0否1是,
      client: null,
    };
  },
  props: {},
  components: {
    //   legislation,
    //   lawcase,
    //   dispute,
    //   aidedtools,
    //   replayDetail
  },
  created() {
    // localStorage.removeItem("chatsHistory");
    this.chats = JSON.parse(localStorage.getItem("chatsHistory"));
    if (!this.chats) {
      var chat = [
        {
          sender: 0, //发送人，0机器人1用户
          send_con: "你好，我是智能客服小文，有问题请咨询我!",
        },
      ];
      chat[0].send_timestamp = this.getTime();
      localStorage.setItem("chatsHistory", JSON.stringify(chat));
      this.chats = JSON.parse(localStorage.getItem("chatsHistory"));
      this.getIsShowTime();
    } else {
      this.getIsShowTime();
    }

    /*       const mqtt = require("mqtt");
      const clientId =
        "mqttjs_" +
        Math.random()
          .toString(16)
          .substr(2, 8);
      const host = "ws://172.16.130.92:15675/ws";
      const topic = "push_message_topic";
      const options = {
        keepalive: 60,
        clientId: 1,
        protocolId: "MQTT",
        protocolVersion: 4,
        username: "admin",
        password: "Ip0s0cKw2p1ua0wugyUkmHkTIlQ6tjsQ",
        clean: true,
        reconnectPeriod: 1000,
        will: {
          topic: "push_message_topic-1",
          qos: 0,
          retain: false
        }
      };
      this.client = mqtt.connect(host, options);
      let client = this.client;
      this.client.on("connect", function(e) {
          client.subscribe("push_message_topic-2", function(err) {
            console.log('订阅成功');
            if (!err) {
              console.log("presence");
              
            }
          });
        }); */
    //   let chats = this.chats;
    //   let getIsShowTime = this.getIsShowTime;
    //   let getTime = this.getTime;
    //   let chatWindowActive = this.chatWindowActive;
    /*       this.client.on("message", function(topic, message) {
        // message is Buffer
        console.log("topic----------------1", topic, message.toString());
        message.toString() && chats.push({
          sender: 0,
          send_con: message.toString(),
          send_timestamp: getTime(),
          type: 'MSG'
        });
        message.toString() && getIsShowTime();
        message.toString() && chatWindowActive();
        // client.end();
      }); */
  },
  mounted() {
    
    this.chatWindowActive();
  },
  methods: {
    // 关闭弹窗
    bClose() {
      imgDatalogV3({
        eventCode: 'CLOSE_AI',
        eventName: '智能客服关闭埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      this.$emit('bClose');
    },
    // 原回车键失去回车功能
    stopEnter(event) {
      if (event.keyCode === 13) {
        event.preventDefault(); // 阻止浏览器默认换行操作
        return false;
      }
    },
    // 获取当前时间戳
    getTime() {
      var now_timestamp = Date.parse(new Date());
      return now_timestamp;
    },
    // 获取是否展示时间的标志
    getIsShowTime() {
      var now_timestamp = Date.parse(new Date());
      var minute_timestamp = 3 * 60 * 1000; //3分钟
      var day_timestamp = 24 * 60 * 60 * 1000; //1天
      var week_timestamp = day_timestamp * 7; //7天

      var i = 0;
      for (var chat of this.chats) {
        var howlong = now_timestamp - chat.send_timestamp;
        var time = new Date(parseInt(chat.send_timestamp));
        var hour = time.getHours().toString();
        if (hour.length < 2) {
          hour = "0" + hour;
        }
        var minute = time.getMinutes().toString();
        if (minute.length < 2) {
          minute = "0" + minute;
        }
        // 展示时间格式
        if (howlong > week_timestamp) {
          //距今7天以上，显示日期
          var year = time.getFullYear().toString();
          var month = (time.getMonth() + 1).toString();
          if (month.length < 2) {
            month = "0" + month;
          }
          var day = time.getDate().toString();
          if (day.length < 2) {
            day = "0" + day;
          }
          chat.show_time =
            year + "年" + month + "月" + day + "日 " + hour + ":" + minute;
        } else if (howlong > day_timestamp) {
          // 距今7天以内超过1天，显示星期
          var weekdays = [
            "星期天",
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
          ];
          var weekday = time.getDay().toString();
          chat.show_time = weekdays[weekday] + " " + hour + ":" + minute;
        } else {
          // 24小时内，显示今天
          var day_now = new Date(parseInt(now_timestamp)).getDate();
          var day_time = time.getDate();
          if (day_now == day_time) {
            chat.show_time = "今天 " + hour + ":" + minute;
          } else {
            chat.show_time = "昨天 " + hour + ":" + minute;
          }
        }
        // 是否展示时间
        this.chats[0].time_show = true;
        if (i > 0) {
          var interval = chat.send_timestamp - this.chats[i - 1].send_timestamp;
          if (interval > minute_timestamp) {
            chat.time_show = true;
          } else {
            chat.time_show = false;
          }
        }
        i++;
      }
    },
    // 查看详情
    goDetail(item) {
      imgDatalogV3({
        eventCode: 'AI_TO_POLICY_DETAIL',
        eventName: '智能客户查看政策详情埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      var that = this;
      axios({
        url: `http://enterprise.bjwcxf.com:9288/getAnswer/${item.lawTitle}`,
        method: "get",
      }).then((res) => {
        that.chats.push({
          sender: 0,
          send_con: res.data,
          send_timestamp: that.getTime(),
          type: "MSG",
        });
        that.isLoading = 0;
        that.getIsShowTime();
        that.chatWindowActive();
        that.updateHistory(that.chats.length);
      });
      // if (item.contractName) {
      //   //答复类型为“合同”
      //   alert("程序员还在开发中...");
      //   return;
      // } else {
      //   this.tool_show = -2;
      //   this.replyDetail = item;
      // }
    },
    // 聊天窗内容置底
    chatWindowActive() {
      this.$nextTick(() => {
        var div = document.getElementById("chatWindow");
        div.scrollTop = div.scrollHeight;
      });
    },
    // 发送消息
    send() {
      imgDatalogV3({
        eventCode: 'AI_TO_SEND',
        eventName: '智能客户发送埋点',
        location: this.$router.isBeijing(),
        page: this.$route.path
      });
      if (this.message == "") {
        alert("不能发送空白信息");
        return;
      }
      this.chats.push({
        sender: 1,
        send_con: this.message,
        send_timestamp: this.getTime(),
      });
      this.getIsShowTime();
      this.chatWindowActive();
      let message = this.message;
      this.message = "";
      this.isLoading = 1; //加载中
      axios({
        url:
          `http://enterprise.bjwcxf.com:9288/getSimilarQuestion/${message}`,
        method: "get",
      }).then((res) => {
        res.data.replyLawDatas = Object.keys(res.data).map((el) => {
          return { lawTitle: el };
        });
        res.data.msgInfos =
          "为您找到了以下问题，可点击标题查看详情";
        res.data.replayType = "LAW";
        // 请求接口无结果兼容
        if(res.data.replyLawDatas.length === 0) {
          res.data.msgInfos = '小文还在学习,暂时理解不了您说的问题';
          res.data.replayType = "MSG";
        };
        var that = this;
        if (
          res.data.replayType == "NEEDCONTRACTUSER" ||
          res.data.replayType == "MSG" ||
          res.data.replayType == "UNKNOWN"
        ) {
          setTimeout(function() {
            that.chats.push({
              sender: 0,
              send_con: res.data.msgInfos,
              send_timestamp: that.getTime(),
              type: res.data.replayType,
            });
            that.isLoading = 0;
            that.getIsShowTime();
            that.chatWindowActive();
            that.updateHistory(that.chats.length);
          }, 1000);
        } else {
          let all;
          if (res.data.replayType == "QA") {
            //输入"你能做些什么"测试，右侧进入问答页面
            all = res.data.replyQADatas;
          } else if (res.data.replayType == "CONTRACT") {
            //输入"劳动合同"测试，跳转下载链接
            all = res.data.replyContractDatas;
          } else if (res.data.replayType == "LAW") {
            //输入"宪法"测试，右侧进入法律页面
            all = res.data.replyLawDatas;
          } else if (res.data.replayType == "CASE") {
            //输入"强奸案案例"测试，右侧进入案例页面
            all = res.data.replyCaseDatas;
          }
          let list = [];
          for (let i = 0; i < 5; i++) {
            if (all[i]) {
              list.push(all[i]);
            }
          }
          setTimeout(function() {
            that.chats.push({
              sender: 0,
              send_con: res.data.msgInfos,
              send_timestamp: that.getTime(),
              type: res.data.replayType,
              list,
            });
            that.isLoading = 0;
            that.getIsShowTime();
            that.chatWindowActive();
            that.updateHistory(that.chats.length);
          }, 1000);
        }
      });
      // this.client.publish("push_message_topic-1", message);
      //   url: "http://rpai.365lawhelp.com/api/Reply/getReply",
      //   method: "post",
      //   data: {
      //     message,
      //     appuid: "23941" //测试使用id
      //   }
      // }).then(res => {
      //   var that = this;
      //   if (
      //     res.data.replayType == "NEEDCONTRACTUSER" ||
      //     res.data.replayType == "MSG" ||
      //     res.data.replayType == "UNKNOWN"
      //   ) {
      //     setTimeout(function() {
      //       that.chats.push({
      //         sender: 0,
      //         send_con: res.data.msgInfos,
      //         send_timestamp: that.getTime(),
      //         type: res.data.replayType
      //       });
      //       that.isLoading = 0;
      //       that.getIsShowTime();
      //       that.chatWindowActive();
      //       that.updateHistory(that.chats.length);
      //     }, 1000);
      //   } else {
      //     let all;
      //     if (res.data.replayType == "QA") {
      //       //输入"你能做些什么"测试，右侧进入问答页面
      //       all = res.data.replyQADatas;
      //     } else if (res.data.replayType == "CONTRACT") {
      //       //输入"劳动合同"测试，跳转下载链接
      //       all = res.data.replyContractDatas;
      //     } else if (res.data.replayType == "LAW") {
      //       //输入"宪法"测试，右侧进入法律页面
      //       all = res.data.replyLawDatas;
      //     } else if (res.data.replayType == "CASE") {
      //       //输入"强奸案案例"测试，右侧进入案例页面
      //       all = res.data.replyCaseDatas;
      //     }
      //     let list = [];
      //     for (let i = 0; i < 5; i++) {
      //       if (all[i]) {
      //         list.push(all[i]);
      //       }
      //     }
      //     setTimeout(function() {
      //       that.chats.push({
      //         sender: 0,
      //         send_con: res.data.msgInfos,
      //         send_timestamp: that.getTime(),
      //         type: res.data.replayType,
      //         list
      //       });
      //       that.isLoading = 0;
      //       that.getIsShowTime();
      //       that.chatWindowActive();
      //       that.updateHistory(that.chats.length);
      //     }, 1000);
      //   }
      // });
    },
    // 更新聊天记录
    updateHistory(len) {
      let chats = [];
      for (let i = 1; i <= 20; i++) {
        // unshift 将新项添加到数组起始位置
        // 这里是倒着把this.chats的最近20条数据作为历史记录插入chats数组
        if (this.chats[len - i]) {
          chats.unshift(this.chats[len - i]);
        }
      }
      localStorage.setItem("chatsHistory", JSON.stringify(chats));
    },
    // 获取工具
    getTool(index) {
      this.tool_show = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.ai-home {
  width: 482px;
  // height: 100vh;
  z-index: 100;
  position: fixed;
  /* top: 100px; */
  right: 15px;
  /* background: #c0cad5; */
  bottom: 0;

  .chatroom {
    //   width: 73%;
    min-width: 482px;
    //   position: absolute;
    //   top: 222px;
    //   left: 50%;
    //   transform: translateX(-50%);

    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0px 5px 24px 0px rgba(0, 0, 0, 0.2);

    .header {
      width: 100%;
      height: 40px;
      padding: 0px 20px;
      background: #d99447;
      display: flex;
      justify-content: space-between;
      align-items: center;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      img {
        width: 42px;
        height: 42px;
        display: block;
        margin-left: 40px;
        margin-right: 12px;
      }
      p {
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .content {
      width: 100%;
      // height: 720px;
      display: flex;
      .chatBox {
        width: 100%;
        //   720px;
        border-right: 4px solid #e6e6e6;
        .chatWindow {
          height: 271px;
          background: #f2f2f2;
          border-bottom: 4px solid #e6e6e6;
          overflow-y: scroll;
          padding: 0 40px;
          position: relative;
          .loading {
            // position: fixed;
            // top: 48%;
            // left: 36.5%;
            transform: translate(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              display: block;
              width: 240px;
              height: 60px;
            }
          }
          .chatBubbleBox {
            .chatBubbleTime {
              text-align: center;
              span {
                display: inline-block;
                margin: 4px 0 16px;

                padding: 4px 8px;
                text-align: center;
                background: #dadada;
                border-radius: 4px;

                font-size: 12px;
                font-family: PingFang SC;
                color: #ffffff;
              }
            }
            .chatBubble {
              margin-bottom: 16px;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
              flex-wrap: wrap;
              .avatar {
                width: 45px;
                height: 45px;
                border-radius: 50%;
                // background-color: #ffffff;
                background-image: url("../../images/avatar.png");
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                margin-right: 10px;
              }
              .msgBox {
                max-width: 75%;
                .bubbleBox {
                  p {
                    font-size: 8px;
                    font-family: PingFang SC;
                    color: #3b3b3b;
                    display: inline-block;
                    padding: 12.5px 20px;
                    background: #ffffff;
                    border-radius: 10px;
                    margin-bottom: 16px;
                  }
                }
                .listBox {
                  padding: 12.5px 20px;
                  background: #ffffff;
                  border-radius: 10px;
                  .bubbleList {
                    cursor: pointer;
                    border-bottom: 1px solid #f2f2f2;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .listTitle {
                      width: 90%;
                      height: 30px;
                      line-height: 30px;

                      font-size: 14px;
                      font-family: PingFang SC;
                      color: #3699ff;

                      text-overflow: ellipsis;
                      overflow: hidden;
                      white-space: nowrap;
                    }
                    img {
                      width: 9px;
                      height: 16px;
                    }
                  }
                }
              }
            }
            .chatBubbleUser {
              justify-content: flex-end;
            }
          }
          .chatBubbleBox:first-child {
            margin-top: 30px;
          }
        }
        .chatWindow::-webkit-scrollbar {
          width: 8px;
        }
        .chatWindow::-webkit-scrollbar-thumb {
          background-color: #d2d2d2;
          border-radius: 5px;
        }
        .chatInput {
          width: 100%;
          height: 70px;
          position: relative;

          textarea {
            width: 93%;
            height: 60px;
            position: absolute;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);

            display: block;
            border: 0;
            resize: none;
            outline: none;
            cursor: default;

            font-size: 16px;
            font-family: PingFang SC;
          }

          textarea::-webkit-scrollbar {
            width: 8px;
          }
          textarea::-webkit-scrollbar-thumb {
            background-color: #d2d2d2;
            border-radius: 5px;
          }

          .sendBtn {
            width: 80px;
            height: 32px;
            text-align: center;
            line-height: 32px;

            font-size: 16px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;

            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;

            background: #3699ff;
            border-radius: 4px;

            position: absolute;
            right: 45px;
            bottom: 14px;
          }
        }
      }
      .tools {
        width: 27%;
        min-width: 268px;
        height: 720px;
        .toolsBox {
          margin-top: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          img {
            width: 81px;
            height: 80px;
            display: block;
            cursor: pointer;
            padding: 15px 30px;
          }
        }
      }
    }
  }
}
</style>

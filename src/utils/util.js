import request from '@/utils/request';
import { dictionariesGetByCode,eventLogList } from "@/config/api.js";
export const getDictionariesGetByCode = (type, list) => {
    return new Promise((r, j) => {
        request({
            url: `${dictionariesGetByCode}/${type}`,
            method: 'get'
          })
          .then((res) => {
            list = list.concat(res.data.map(e => {
              return {...e, isSelect: false}
            }));
            r(list);
          }).catch(e => {
            j('error');
          })
    });
};


/**
* 使用img标签打点，Promise实现版，新版打点。
* 前端打点带上后端所需的所有参数，后端对新增打点进行注册展现。
* 通过uid标识用户，通过vc防攻击。
*
* 管理员:shixinzhe
* @param {Object} data 打点传入参数
* 字段          |   类型    |   是否必传  |   字段描述          |   备注
* --------------------------------------------------------------------------------------------
* eventCode    |   string  |   是       |   事件唯一标识别     |
* eventName    |   string  |   是       |   事件名称          |
* timestamp    |   long    |   是       |   打点时间       |   毫秒数
* content      |   object  |   是       |   参数内容       |   格式为json串
*
* content:
* page          |  string  |   否       |   事件所在页面标识    |   （1）唯一标识，非强制字段，可省略。（2）默认值为页面 urlKey。如普通页/developer/home/admin.html?appId=1482745005 取值 'admin'。如Tab页 /developer/home/violation.html?appId=1482745005&tabCur=feedback 取值 'violation|feedback'。
* location      |  string  |   否       |   站点 |  
* @return {Object} Promise对象
*/
export const imgDatalogV3 = async (inputData = {}) => {
  const {
      eventName = '',
      eventCode = '',
      location = '',
  } = inputData;
  if (!eventCode) {
      console.log(new Error('请传入eventCode'));
      return Promise.resolve();
  }
  if (!eventName) {
      console.log(new Error('请传入eventName'));
      return Promise.resolve();
  }

  const submitData = {
      ...inputData,
      location: inputData.location.replace('#/', ''),
      page: window.location.hash.replace(/^#\/([^\/]*)/, ''),
      storageTime: (new Date()).getTime(),
  };

  const data = JSON.stringify(submitData);
  
  // let dataHost = 'https://smartprogram.baidu.com';
  let dataHost = '';
  const DATA_LOG = `${dataHost}/smp/mapplog/log`;
  let url = `${DATA_LOG}?data=${encodeURIComponent(data)}`;

  if (url.length > 2000) {
      console.log(new Error('参数过长.超过2000字节'));
      return Promise.resolve();
  }

  return new Promise((r, j) => {
    request({
      url: `${eventLogList}`,
      method: 'post',
      data: submitData
    })
    .then((res) => {
      r();
    }).catch(e => {
      j('error');
    })
  });
};

// 点击打点精简
export const imgDatalogV3Click = (eventCode = '', eventName = '', from = '') => imgDatalogV3({
  eventCode,
  eventName: eventName || eventCode,
  eventType: EventType.ClickLog,
  from
});



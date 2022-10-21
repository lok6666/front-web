import request from '@/utils/request'
import { authSendVerCode } from "@/config/api.js";

/**
 * 发送验证码
 * @param {Object} params
 */
export function sendCode({mobile, type}) {
  return request({
    url: authSendVerCode,
    method: 'post',
    params: {phoneNumber: mobile, type}
  })
}

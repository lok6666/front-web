import request from '@/utils/request'
import { authSendVerCode, authSendRegVerCode } from "@/config/api.js";

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

/**
 * 发送验证码
 * @param {Object} params
 */
 export function sendRegCode({mobile, key, code}) {
  return request({
    url: authSendRegVerCode,
    method: 'post',
    params: {phoneNumber: mobile, key, code}
  })
}

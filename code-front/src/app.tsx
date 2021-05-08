import { RequestConfig } from 'umi';
import qs from 'qs';
import MD5 from 'md5.js';

/**
 * 配置request请求时的默认参数
 */
const headers = { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

// 具体参考：https://umijs.org/zh-CN/plugins/plugin-request#运行时配置
// https://github.com/umijs/umi-request/blob/master/README_zh-CN.md
export const request: RequestConfig = {
  timeout: 5000,
  errorConfig: {
    adaptor: resData => {
      return {
        ...resData,
        errorMessage: resData.message,
        errorCode:resData.code,
        list:resData.data?resData.data.datas:[],
        total:resData.data?resData.data.totalRecords:0
      };
    },
  },
  middlewares: [
    async function middlewareA(ctx, next) {
      // console.log('A before');
      await next();
      // console.log('A after');
    },
    async function middlewareB(ctx, next) {
      // console.log('B before');
      await next();
      // console.log('B after');
    },
  ],
  requestInterceptors: [
    function getway(url, options) {
      // console.log('B before getway');
      if ('getway' === options.requestType) {
        return {
          url: window.gateway,
          options: {
            ...options,
            body: getGetwayParams(options.params, url),
            params: { d: url },
            headers,
            method: 'post',
            requestType: 'form',
          },
        };
      } else {
        return { url, options };
      }
    },
  ],
  responseInterceptors: [],
};

//组装网关的请求参数
function getGetwayParams(data: object, url: string) {
  var bizParamsContent = JSON.stringify(data) || '{}';
  var appId = window.appid || '201805112394525';
  var key = window.key || 'bcf0f5cfa4c82f80ed8d0bd4aa013b37';
  var method = url;
  var token = window.token || '16f4d4290423482f96a1dd2284ceda6d';
  var timestamp = new Date().getTime().toString();
  var sign_str = [
    `bizParamsContent=${bizParamsContent}`,
    `appId=${appId}`,
    `key=${key}`,
    `method=${method}`,
    `timestamp=${timestamp}`,
  ]
    .sort()
    .join('&');

  var md5stream = new MD5();
  md5stream.end(sign_str);
  var sign = md5stream.read().toString('hex');
  const params = {
    bizParamsContent,
    appId,
    method,
    timestamp,
    sign,
    token,
  };
  return qs.stringify(params);
}

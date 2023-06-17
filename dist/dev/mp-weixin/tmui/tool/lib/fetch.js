"use strict";
const common_vendor = require("../../../common/vendor.js");
let config = {
  url: "",
  data: {},
  statusCode: 200,
  header: {
    // "content-type":"application/json"
  },
  method: "POST",
  timeout: 6e4,
  dataType: "json",
  responseType: "text",
  sslVerify: true,
  withCredentials: false,
  firstIpv4: false
};
function request(cog = config, complete, beforeRequest2, afterRequest2) {
  let newConfig = { ...config, ...cog };
  return new Promise(async (resolve, reject) => {
    if (typeof beforeRequest2 === "function") {
      let opts = await beforeRequest2(newConfig);
      if (typeof opts !== "object") {
        opts = {};
      }
      newConfig = { ...newConfig, ...opts };
    }
    common_vendor.index.request({
      url: newConfig.url || "",
      data: newConfig.data,
      header: newConfig.header,
      method: newConfig.method,
      timeout: newConfig.timeout,
      dataType: newConfig.dataType,
      responseType: newConfig.responseType,
      sslVerify: newConfig.sslVerify,
      withCredentials: newConfig.withCredentials,
      firstIpv4: newConfig.firstIpv4,
      async success(result) {
        var _a;
        if (result.statusCode !== (newConfig == null ? void 0 : newConfig.statusCode)) {
          reject(result);
          return;
        }
        if (typeof afterRequest2 === "function") {
          let opts = await afterRequest2(result);
          try {
            if (typeof opts !== "object") {
              opts = result;
            }
            if (typeof opts === "object" && ((_a = Object.keys(opts)) == null ? void 0 : _a.length) == 0) {
              opts = result;
            }
          } catch (e) {
            console.error("tmui:", e);
          }
          result = { ...opts };
        }
        resolve(result);
      },
      fail(result) {
        reject(result);
      },
      complete(result) {
        if (typeof complete === "function") {
          complete(result);
        }
      }
    });
  });
}
var beforeRequest = (val) => val;
var afterRequest = (val) => val;
class fetchNet {
  /**
   * 构建新的请求
   * @param cog 请示配置见：fetchConfig
   * @param beforeRequest 访问前执行的函数，可以是Promise,你可以对执行前的参数进行修改之类的，将以你最新的修改参数为准进行请求。
   * @param afterRequest 访问后执行的函数，可以是Promise,提供请示后的数据，你可以在这里修改，返回，这样所有请求的数据返回后都为返回你修改后的数据。
   */
  constructor(cog, beforeRequestFun, afterRequesFunt) {
    config = { ...config, ...cog || {} };
    if (typeof beforeRequestFun == "function") {
      beforeRequest = beforeRequestFun;
    }
    if (typeof afterRequesFunt == "function") {
      afterRequest = afterRequesFunt;
    }
  }
  static get(url, data = {}, opts = {}) {
    let cfg = { ...config, ...opts || {}, url, method: "GET", data };
    return request(cfg);
  }
  static post(url, data = {}, opts = {}) {
    let cfg = { ...config, ...opts || {}, url, method: "POST", data };
    return request(cfg);
  }
  /**
   * 请求
   * @param cog 配置
   * @param complete 访问结束后执行的函数
   */
  static async request(cog = config, beforeFun, afterFun, complete) {
    let newConfig = { ...config, ...cog };
    if (typeof beforeFun == "function") {
      let testFun = await beforeFun();
      let cb = { errMsg: "中止请求" };
      if (!testFun)
        return cb;
    }
    return request(newConfig, complete, beforeFun || beforeRequest, afterFun || afterRequest);
  }
}
exports.fetchNet = fetchNet;

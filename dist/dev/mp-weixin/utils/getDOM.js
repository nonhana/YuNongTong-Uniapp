"use strict";
const common_vendor = require("../common/vendor.js");
const getDOM = (id) => {
  return new Promise((resolve, reject) => {
    const instance = common_vendor.getCurrentInstance();
    const query = common_vendor.index.createSelectorQuery().in(instance);
    query.select(`#${id}`).boundingClientRect((rect) => {
      if (rect) {
        resolve(rect);
      } else {
        reject("获取不到元素");
      }
    }).exec();
  });
};
exports.getDOM = getDOM;

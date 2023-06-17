"use strict";
const common_vendor = require("../../../common/vendor.js");
const share = (args = {}) => {
  let defaultWxshareConfig = {
    ...args
  };
  let shareAppOptions = {};
  let shareTimeOptions = {};
  const shareApp = (options = {}) => {
    common_vendor.onShareAppMessage((res) => {
      return {
        ...defaultWxshareConfig,
        ...options,
        ...shareAppOptions
      };
    });
  };
  const setShareApp = (options = {}) => {
    shareAppOptions = options;
  };
  const shareTime = (options = {}) => {
    common_vendor.onShareTimeline(() => {
      return {
        ...defaultWxshareConfig,
        ...options,
        ...shareTimeOptions
      };
    });
  };
  const setShareTime = (options = {}) => {
    shareTimeOptions = options;
  };
  return {
    onShareAppMessage: shareApp,
    onShareTimeline: shareTime,
    setShareApp,
    setShareTime
  };
};
exports.share = share;

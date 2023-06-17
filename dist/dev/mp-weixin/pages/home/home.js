"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_app)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      label: "我是首页"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Folders/裕农通/uniapp/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);

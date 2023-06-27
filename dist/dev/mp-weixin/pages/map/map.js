"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  _easycom_tm_app2();
}
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  _easycom_tm_app();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "map",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_assets.bigmap),
        b: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-be366bed"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/map/map.vue"]]);
wx.createPage(MiniProgramPage);

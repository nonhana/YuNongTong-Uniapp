"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "resultItem",
  props: {
    resultItem: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: __props.resultItem.result_img,
        b: common_vendor.t(__props.resultItem.result_name),
        c: common_vendor.t(__props.resultItem.result_details),
        d: common_vendor.t(__props.resultItem.result_start),
        e: common_vendor.t(__props.resultItem.result_end),
        f: common_vendor.unref(common_assets.price),
        g: common_vendor.t(__props.resultItem.result_price.people),
        h: __props.resultItem.result_price.family
      }, __props.resultItem.result_price.family ? {
        i: common_vendor.t((_a = __props.resultItem.result_price) == null ? void 0 : _a.family)
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c04dc1d0"], ["__file", "D:/Folders/裕农通/uniapp/src/little/resultItem.vue"]]);
wx.createComponent(Component);

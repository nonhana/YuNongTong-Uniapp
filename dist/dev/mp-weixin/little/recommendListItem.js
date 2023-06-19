"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recommendListItem",
  props: {
    itemInfo: null,
    type: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_assets.hot),
        b: common_vendor.t(__props.itemInfo.item_hot),
        c: common_vendor.t(__props.itemInfo.item_title),
        d: __props.type === 0 ? "500rpx" : "240rpx",
        e: __props.itemInfo.item_img,
        f: common_vendor.f(__props.itemInfo.item_star, (_, k0, i0) => {
          return {};
        }),
        g: common_vendor.unref(common_assets.star),
        h: __props.type === 0 ? "500rpx" : "240rpx"
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6b8a1000"], ["__file", "D:/Folders/裕农通/uniapp/src/little/recommendListItem.vue"]]);
wx.createComponent(Component);

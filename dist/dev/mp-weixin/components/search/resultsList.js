"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_divider2 + _easycom_tm_app2)();
}
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (resultItem + _easycom_tm_divider + _easycom_tm_app)();
}
const resultItem = () => "../../little/resultItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "resultsList",
  props: {
    resultList: null
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.resultList, (item, k0, i0) => {
          return {
            a: "e66e7515-1-" + i0 + ",e66e7515-0",
            b: common_vendor.p({
              ["result-item"]: item
            }),
            c: "e66e7515-2-" + i0 + ",e66e7515-0"
          };
        }),
        b: common_vendor.p({
          color: "#fff"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e66e7515"], ["__file", "D:/Folders/裕农通/uniapp/src/components/search/resultsList.vue"]]);
wx.createComponent(Component);

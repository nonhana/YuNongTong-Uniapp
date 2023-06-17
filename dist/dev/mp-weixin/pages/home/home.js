"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tm_col2 = common_vendor.resolveComponent("tm-col");
  const _easycom_tm_input2 = common_vendor.resolveComponent("tm-input");
  const _easycom_tm_row2 = common_vendor.resolveComponent("tm-row");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_col2 + _easycom_tm_input2 + _easycom_tm_row2 + _easycom_tm_app2)();
}
const _easycom_tm_col = () => "../../tmui/components/tm-col/tm-col.js";
const _easycom_tm_input = () => "../../tmui/components/tm-input/tm-input.js";
const _easycom_tm_row = () => "../../tmui/components/tm-row/tm-row.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_col + _easycom_tm_input + _easycom_tm_row + pictureSlide + _easycom_tm_app)();
}
const pictureSlide = () => "../../components/home/pictureSlide.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          col: 2
        }),
        b: common_vendor.p({
          col: 8
        }),
        c: common_vendor.p({
          width: 700,
          column: 10
        }),
        d: common_vendor.p({
          col: 10
        }),
        e: common_vendor.p({
          width: 700,
          height: 350,
          column: 10
        }),
        f: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0cd09a48"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);

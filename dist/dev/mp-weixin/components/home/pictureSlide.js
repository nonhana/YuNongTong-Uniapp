"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_tm_carousel2 = common_vendor.resolveComponent("tm-carousel");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_carousel2 + _easycom_tm_app2)();
}
const _easycom_tm_carousel = () => "../../tmui/components/tm-carousel/tm-carousel.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_carousel + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "pictureSlide",
  setup(__props) {
    const listimg = [
      "https://picsum.photos/200/300?id=43335",
      "https://picsum.photos/200/300?id=433",
      "https://picsum.photos/200/300?id=439",
      "https://picsum.photos/200/300?id=459"
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          autoplay: true,
          width: 700,
          height: 350,
          list: listimg
        }),
        b: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Folders/裕农通/uniapp/src/components/home/pictureSlide.vue"]]);
wx.createComponent(Component);

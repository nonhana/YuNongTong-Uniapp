"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_getDOM = require("../../utils/getDOM.js");
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_col2 = common_vendor.resolveComponent("tm-col");
  const _easycom_tm_row2 = common_vendor.resolveComponent("tm-row");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_col2 + _easycom_tm_row2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_col = () => "../../tmui/components/tm-col/tm-col.js";
const _easycom_tm_row = () => "../../tmui/components/tm-row/tm-row.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_col + _easycom_tm_row + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "hotelList",
  setup(__props) {
    let img_height = common_vendor.ref(0);
    const hotelList = common_vendor.ref([
      {
        item_id: 1,
        item_img: common_assets.minsu2
      },
      {
        item_id: 2,
        item_img: common_assets.minsu2
      },
      {
        item_id: 3,
        item_img: common_assets.minsu2
      }
    ]);
    common_vendor.onMounted(() => {
      utils_getDOM.getDOM("left_img").then((res) => {
        img_height.value = res.height;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          label: "民宿"
        }),
        b: common_vendor.p({
          margin: [20, 0, 0, 0],
          col: 2,
          height: 60,
          align: "start"
        }),
        c: common_vendor.unref(common_assets.more),
        d: common_vendor.p({
          margin: [0, 0, 20, 0],
          col: 8,
          height: 60,
          align: "end"
        }),
        e: common_vendor.p({
          column: 10,
          width: 700
        }),
        f: hotelList.value[0].item_img,
        g: (common_vendor.unref(img_height) - 10) / 2 + "px",
        h: hotelList.value[1].item_img,
        i: (common_vendor.unref(img_height) - 10) / 2 + "px",
        j: hotelList.value[2].item_img,
        k: common_vendor.p({
          column: 10,
          width: 700
        }),
        l: common_vendor.p({
          color: "#fff"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-87387611"], ["__file", "D:/Folders/裕农通/uniapp/src/components/home/hotelList.vue"]]);
wx.createComponent(Component);

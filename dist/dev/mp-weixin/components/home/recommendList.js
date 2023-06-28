"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
  (_easycom_tm_text + _easycom_tm_col + _easycom_tm_row + recommendListItem + _easycom_tm_app)();
}
const recommendListItem = () => "../../little/recommendListItem.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "recommendList",
  setup(__props) {
    const recommendList = common_vendor.ref([
      {
        item_id: 1,
        item_img: common_assets.tangbomeijing,
        item_title: "塘波美景",
        item_hot: 123,
        item_star: 5
      },
      {
        item_id: 2,
        item_img: common_assets.hongsegushi,
        item_title: "红色故事",
        item_hot: 123,
        item_star: 4
      },
      {
        item_id: 3,
        item_img: common_assets.jubensha,
        item_title: "剧本杀",
        item_hot: 123,
        item_star: 4
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          label: "兴趣推荐"
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
        f: common_vendor.p({
          type: 0,
          ["item-info"]: recommendList.value[0]
        }),
        g: common_vendor.p({
          type: 1,
          ["item-info"]: recommendList.value[1]
        }),
        h: common_vendor.p({
          type: 1,
          ["item-info"]: recommendList.value[2]
        }),
        i: common_vendor.p({
          column: 10,
          width: 700
        }),
        j: common_vendor.p({
          color: "#fff"
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-361ab573"], ["__file", "D:/Folders/裕农通/uniapp/src/components/home/recommendList.vue"]]);
wx.createComponent(Component);

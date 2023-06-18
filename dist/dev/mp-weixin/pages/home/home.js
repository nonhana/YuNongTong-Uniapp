"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_tm_col2 = common_vendor.resolveComponent("tm-col");
  const _easycom_tm_row2 = common_vendor.resolveComponent("tm-row");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_col2 + _easycom_tm_row2 + _easycom_tm_text2 + _easycom_tm_app2)();
}
const _easycom_tm_col = () => "../../tmui/components/tm-col/tm-col.js";
const _easycom_tm_row = () => "../../tmui/components/tm-row/tm-row.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_col + _easycom_tm_row + pictureSlide + _easycom_tm_text + recommendList + _easycom_tm_app)();
}
const pictureSlide = () => "../../components/home/pictureSlide.js";
const recommendList = () => "../../components/home/recommendList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const keywords = common_vendor.ref("");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_assets.sideButton),
        b: common_vendor.p({
          height: 80,
          col: 2,
          align: "start"
        }),
        c: keywords.value,
        d: common_vendor.o(($event) => keywords.value = $event.detail.value),
        e: common_vendor.p({
          height: 80,
          col: 8,
          align: "start"
        }),
        f: common_vendor.p({
          width: 700,
          column: 10
        }),
        g: common_vendor.p({
          col: 10
        }),
        h: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          height: 350,
          column: 10
        }),
        i: common_vendor.unref(common_assets.goupiao),
        j: common_vendor.p({
          label: "购票"
        }),
        k: common_vendor.p({
          col: 2,
          height: 180
        }),
        l: common_vendor.unref(common_assets.huodong),
        m: common_vendor.p({
          label: "活动"
        }),
        n: common_vendor.p({
          col: 2,
          height: 180
        }),
        o: common_vendor.unref(common_assets.minsu),
        p: common_vendor.p({
          label: "民宿"
        }),
        q: common_vendor.p({
          col: 2,
          height: 180
        }),
        r: common_vendor.unref(common_assets.wenchuang),
        s: common_vendor.p({
          label: "文创"
        }),
        t: common_vendor.p({
          col: 2,
          height: 180
        }),
        v: common_vendor.unref(common_assets.changdi),
        w: common_vendor.p({
          label: "场地"
        }),
        x: common_vendor.p({
          col: 2,
          height: 180
        }),
        y: common_vendor.unref(common_assets.techan),
        z: common_vendor.p({
          label: "特产"
        }),
        A: common_vendor.p({
          col: 2,
          height: 180
        }),
        B: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          column: 12
        }),
        C: common_vendor.p({
          margin: [0, 20, 0, 0],
          column: 10,
          width: 700
        }),
        D: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0cd09a48"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);

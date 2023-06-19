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
  (_easycom_tm_col + _easycom_tm_row + pictureSlide + _easycom_tm_text + recommendList + hotelList + _easycom_tm_app)();
}
const pictureSlide = () => "../../components/home/pictureSlide.js";
const recommendList = () => "../../components/home/recommendList.js";
const hotelList = () => "../../components/home/hotelList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const keywords = common_vendor.ref("");
    const inputClick = () => {
      common_vendor.index.navigateTo({
        url: "../search/search",
        animationType: "slide-in-bottom",
        animationDuration: 200
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_assets.sideButton),
        b: common_vendor.p({
          height: 80,
          col: 2,
          align: "start"
        }),
        c: common_vendor.o(inputClick),
        d: keywords.value,
        e: common_vendor.o(($event) => keywords.value = $event.detail.value),
        f: common_vendor.p({
          height: 80,
          col: 8,
          align: "start"
        }),
        g: common_vendor.p({
          width: 700,
          column: 10
        }),
        h: common_vendor.p({
          col: 10
        }),
        i: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          height: 350,
          column: 10
        }),
        j: common_vendor.unref(common_assets.goupiao),
        k: common_vendor.p({
          label: "购票"
        }),
        l: common_vendor.p({
          col: 2,
          height: 180
        }),
        m: common_vendor.unref(common_assets.huodong),
        n: common_vendor.p({
          label: "活动"
        }),
        o: common_vendor.p({
          col: 2,
          height: 180
        }),
        p: common_vendor.unref(common_assets.minsu),
        q: common_vendor.p({
          label: "民宿"
        }),
        r: common_vendor.p({
          col: 2,
          height: 180
        }),
        s: common_vendor.unref(common_assets.wenchuang),
        t: common_vendor.p({
          label: "文创"
        }),
        v: common_vendor.p({
          col: 2,
          height: 180
        }),
        w: common_vendor.unref(common_assets.changdi),
        x: common_vendor.p({
          label: "场地"
        }),
        y: common_vendor.p({
          col: 2,
          height: 180
        }),
        z: common_vendor.unref(common_assets.techan),
        A: common_vendor.p({
          label: "特产"
        }),
        B: common_vendor.p({
          col: 2,
          height: 180
        }),
        C: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          column: 12
        }),
        D: common_vendor.p({
          margin: [0, 20, 0, 0],
          column: 10,
          width: 700
        }),
        E: common_vendor.p({
          margin: [0, 20, 0, 0],
          column: 10,
          width: 700
        }),
        F: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0cd09a48"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);

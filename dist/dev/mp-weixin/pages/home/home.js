"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_tm_col2 = common_vendor.resolveComponent("tm-col");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_row2 = common_vendor.resolveComponent("tm-row");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_drawer2 = common_vendor.resolveComponent("tm-drawer");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_col2 + _easycom_tm_text2 + _easycom_tm_row2 + _easycom_tm_divider2 + _easycom_tm_drawer2 + _easycom_tm_app2)();
}
const _easycom_tm_col = () => "../../tmui/components/tm-col/tm-col.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_row = () => "../../tmui/components/tm-row/tm-row.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_drawer = () => "../../tmui/components/tm-drawer/tm-drawer.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_col + _easycom_tm_text + _easycom_tm_row + _easycom_tm_divider + _easycom_tm_drawer + pictureSlide + recommendList + hotelList + _easycom_tm_app)();
}
const pictureSlide = () => "../../components/home/pictureSlide.js";
const recommendList = () => "../../components/home/recommendList.js";
const hotelList = () => "../../components/home/hotelList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "home",
  setup(__props) {
    const keywords = common_vendor.ref("");
    const pos = common_vendor.ref("left");
    const showWin = common_vendor.ref(false);
    const user_info = {
      user_id: 1,
      user_header: "https://dummyimage.com/400X400",
      user_name: "用户名称"
    };
    const openSide = () => {
      showWin.value = true;
    };
    const inputClick = () => {
      common_vendor.index.navigateTo({
        url: "../search/search",
        animationType: "slide-in-bottom",
        animationDuration: 200
      });
    };
    return (_ctx, _cache) => {
      return {
        a: user_info.user_header,
        b: common_vendor.p({
          height: 60,
          col: 2,
          align: "center"
        }),
        c: common_vendor.p({
          label: user_info.user_name
        }),
        d: common_vendor.p({
          height: 60,
          col: 3,
          align: "center"
        }),
        e: common_vendor.unref(common_assets.doubleArrow),
        f: common_vendor.p({
          height: 60,
          col: 5,
          align: "start"
        }),
        g: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: "550",
          column: 10
        }),
        h: common_vendor.p({
          color: "#ff5d5d",
          label: "退出登录"
        }),
        i: common_vendor.o(($event) => showWin.value = $event),
        j: common_vendor.p({
          width: 550,
          ["hide-header"]: true,
          placement: pos.value,
          show: showWin.value
        }),
        k: common_vendor.o(openSide),
        l: common_vendor.unref(common_assets.sideButton),
        m: common_vendor.p({
          height: 80,
          col: 2,
          align: "start"
        }),
        n: common_vendor.o(inputClick),
        o: keywords.value,
        p: common_vendor.o(($event) => keywords.value = $event.detail.value),
        q: common_vendor.p({
          height: 80,
          col: 8,
          align: "start"
        }),
        r: common_vendor.p({
          width: 700,
          column: 10
        }),
        s: common_vendor.p({
          col: 10
        }),
        t: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          height: 350,
          column: 10
        }),
        v: common_vendor.unref(common_assets.goupiao),
        w: common_vendor.p({
          label: "购票"
        }),
        x: common_vendor.p({
          col: 2,
          height: 180
        }),
        y: common_vendor.unref(common_assets.huodong),
        z: common_vendor.p({
          label: "活动"
        }),
        A: common_vendor.p({
          col: 2,
          height: 180
        }),
        B: common_vendor.unref(common_assets.minsu),
        C: common_vendor.p({
          label: "民宿"
        }),
        D: common_vendor.p({
          col: 2,
          height: 180
        }),
        E: common_vendor.unref(common_assets.wenchuang),
        F: common_vendor.p({
          label: "文创"
        }),
        G: common_vendor.p({
          col: 2,
          height: 180
        }),
        H: common_vendor.unref(common_assets.changdi),
        I: common_vendor.p({
          label: "场地"
        }),
        J: common_vendor.p({
          col: 2,
          height: 180
        }),
        K: common_vendor.unref(common_assets.techan),
        L: common_vendor.p({
          label: "特产"
        }),
        M: common_vendor.p({
          col: 2,
          height: 180
        }),
        N: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          column: 12
        }),
        O: common_vendor.p({
          margin: [0, 20, 0, 0],
          column: 10,
          width: 700
        }),
        P: common_vendor.p({
          margin: [0, 20, 0, 0],
          column: 10,
          width: 700
        }),
        Q: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0cd09a48"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);

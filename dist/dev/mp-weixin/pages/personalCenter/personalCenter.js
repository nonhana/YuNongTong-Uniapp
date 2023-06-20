"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_tm_col2 = common_vendor.resolveComponent("tm-col");
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_row2 = common_vendor.resolveComponent("tm-row");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_col2 + _easycom_tm_text2 + _easycom_tm_row2 + _easycom_tm_app2)();
}
const _easycom_tm_col = () => "../../tmui/components/tm-col/tm-col.js";
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_row = () => "../../tmui/components/tm-row/tm-row.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_col + _easycom_tm_text + _easycom_tm_row + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "personalCenter",
  setup(__props) {
    const user_info = {
      user_id: 1,
      user_img: common_assets.user,
      user_name: "请进行登录",
      user_info: "该用户暂未设置签名哦"
    };
    return (_ctx, _cache) => {
      return {
        a: user_info.user_img,
        b: common_vendor.p({
          height: 140,
          col: 3,
          align: "center"
        }),
        c: common_vendor.p({
          ["font-size"]: 36,
          color: "#3d3d3d",
          label: user_info.user_name
        }),
        d: common_vendor.p({
          ["font-size"]: 24,
          color: "#B3B2B2",
          label: user_info.user_info
        }),
        e: common_vendor.p({
          height: 140,
          col: 7,
          align: "start"
        }),
        f: common_vendor.p({
          column: 10
        }),
        g: common_vendor.unref(common_assets.flower),
        h: common_vendor.p({
          ["font-size"]: 24,
          color: "#838383",
          label: "小红花"
        }),
        i: common_vendor.p({
          borderGutter: [0, 0, 5, 0],
          height: 140,
          col: 4
        }),
        j: common_vendor.unref(common_assets.store),
        k: common_vendor.p({
          ["font-size"]: 24,
          color: "#838383",
          label: "积分商城"
        }),
        l: common_vendor.p({
          borderGutter: [0, 0, 5, 0],
          height: 140,
          col: 4
        }),
        m: common_vendor.unref(common_assets.event),
        n: common_vendor.p({
          ["font-size"]: 24,
          color: "#838383",
          label: "活动中心"
        }),
        o: common_vendor.p({
          height: 140,
          col: 4
        }),
        p: common_vendor.p({
          column: 12
        }),
        q: common_vendor.unref(common_assets.xinxirenzheng),
        r: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "center"
        }),
        s: common_vendor.p({
          label: "信息认证"
        }),
        t: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "start"
        }),
        v: common_vendor.unref(common_assets.fanhui),
        w: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 6,
          align: "end"
        }),
        x: common_vendor.p({
          column: 10
        }),
        y: common_vendor.unref(common_assets.fuwuguanli),
        z: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "center"
        }),
        A: common_vendor.p({
          label: "服务管理"
        }),
        B: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "start"
        }),
        C: common_vendor.unref(common_assets.fanhui),
        D: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 6,
          align: "end"
        }),
        E: common_vendor.p({
          column: 10
        }),
        F: common_vendor.unref(common_assets.fabutiezi),
        G: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "center"
        }),
        H: common_vendor.p({
          label: "发布帖子"
        }),
        I: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "start"
        }),
        J: common_vendor.unref(common_assets.fanhui),
        K: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 6,
          align: "end"
        }),
        L: common_vendor.p({
          column: 10
        }),
        M: common_vendor.unref(common_assets.guanzhudehuodong),
        N: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "center"
        }),
        O: common_vendor.p({
          label: "关注的活动"
        }),
        P: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "start"
        }),
        Q: common_vendor.unref(common_assets.fanhui),
        R: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 6,
          align: "end"
        }),
        S: common_vendor.p({
          column: 10
        }),
        T: common_vendor.unref(common_assets.shiyongbangzhu),
        U: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "center"
        }),
        V: common_vendor.p({
          label: "使用帮助"
        }),
        W: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "start"
        }),
        X: common_vendor.unref(common_assets.fanhui),
        Y: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 6,
          align: "end"
        }),
        Z: common_vendor.p({
          column: 10
        }),
        aa: common_vendor.unref(common_assets.shezhi),
        ab: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "center"
        }),
        ac: common_vendor.p({
          label: "设置"
        }),
        ad: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 2,
          align: "start"
        }),
        ae: common_vendor.unref(common_assets.fanhui),
        af: common_vendor.p({
          height: 100,
          borderGutter: [0, 2, 0, 0],
          col: 6,
          align: "end"
        }),
        ag: common_vendor.p({
          column: 10
        }),
        ah: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28a22860"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/personalCenter/personalCenter.vue"]]);
wx.createPage(MiniProgramPage);

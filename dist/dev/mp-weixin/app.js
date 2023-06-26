"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const tmui_index = require("./tmui/index.js");
const config = require("./config.js");
require("./tmui/tool/lib/fetch.js");
require("./tmui/tool/function/util.js");
require("./tmui/tool/function/preview.js");
require("./tmui/tool/lib/language.js");
require("./tmui/tool/lib/share.js");
require("./tmui/tool/lib/tmuiconfigDefault.js");
require("./tmui/tool/router/index.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/community/community.js";
  "./pages/search/search.js";
  "./pages/map/map.js";
  "./pages/jubensha/jubensha.js";
  "./pages/personalCenter/personalCenter.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Folders/裕农通/uniapp/src/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(tmui_index.tmui, { ...config.config });
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

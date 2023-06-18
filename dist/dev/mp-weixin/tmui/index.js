"use strict";
var _a;
const common_vendor = require("../common/vendor.js");
const tmui_tool_lib_fetch = require("./tool/lib/fetch.js");
const tmui_tool_function_util = require("./tool/function/util.js");
const tmui_tool_lib_language = require("./tool/lib/language.js");
const tmui_tool_lib_share = require("./tool/lib/share.js");
const tmui_tool_lib_tmuiconfigDefault = require("./tool/lib/tmuiconfigDefault.js");
const tmui_tool_function_preview = require("./tool/function/preview.js");
const easycom = {
  autoscan: true,
  custom: {
    "^tm-(.*)": "@/tmui/components/tm-$1/tm-$1.vue"
  }
};
const pages$1 = [
  {
    path: "pages/home/home",
    style: {
      navigationBarTitleText: "首页",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/search/search",
    style: {
      navigationBarTitleText: "搜索",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/community/community",
    style: {
      navigationBarTitleText: "社区",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/map/map",
    style: {
      navigationBarTitleText: "地图",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/jubensha/jubensha",
    style: {
      navigationBarTitleText: "剧本杀",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/personalCenter/personalCenter",
    style: {
      navigationBarTitleText: "个人中心",
      enablePullDownRefresh: false
    }
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "裕农通",
  navigationBarBackgroundColor: "#f5f5f5",
  backgroundColor: "#f5f5f5"
};
const tabBar$1 = {
  fontSize: "24rpx",
  color: "#9EA3AE",
  selectedColor: "#6A320F",
  list: [
    {
      pagePath: "pages/home/home",
      text: "首页",
      iconPath: "static/tabBar/home_0.png",
      selectedIconPath: "static/tabBar/home_1.png"
    },
    {
      pagePath: "pages/community/community",
      text: "村情民意",
      iconPath: "static/tabBar/community_0.png",
      selectedIconPath: "static/tabBar/community_1.png"
    },
    {
      pagePath: "pages/map/map",
      text: "地图",
      iconPath: "static/tabBar/map_0.png",
      selectedIconPath: "static/tabBar/map_1.png"
    },
    {
      pagePath: "pages/jubensha/jubensha",
      text: "剧本杀专区",
      iconPath: "static/tabBar/jubensha_0.png",
      selectedIconPath: "static/tabBar/jubensha_1.png"
    },
    {
      pagePath: "pages/personalCenter/personalCenter",
      text: "个人中心",
      iconPath: "static/tabBar/personalCenter_0.png",
      selectedIconPath: "static/tabBar/personalCenter_1.png"
    }
  ]
};
const PageJsonInit = {
  easycom,
  pages: pages$1,
  globalStyle,
  tabBar: tabBar$1
};
let pages = [];
if (typeof (PageJsonInit == null ? void 0 : PageJsonInit.pages) == "undefined") {
  PageJsonInit.pages = [];
}
PageJsonInit.pages.forEach((el) => {
  var _a2, _b, _c, _d, _e;
  let customType = ((_a2 = el == null ? void 0 : el.style) == null ? void 0 : _a2.navigationStyle) ?? "default";
  let bg = (((_b = el.style) == null ? void 0 : _b.navigationBarBackgroundColor) ?? ((_c = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _c.navigationBarBackgroundColor) ?? "#FFFFFF") || "#FFFFFF";
  let txtColor = (((_d = el.style) == null ? void 0 : _d.navigationBarTextStyle) ?? ((_e = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _e.navigationBarTextStyle) ?? "black") || "black";
  pages.push({
    path: el.path,
    custom: customType,
    navigationBarBackgroundColor: bg,
    navigationBarTextStyle: txtColor
  });
});
if (Array.isArray((PageJsonInit == null ? void 0 : PageJsonInit.subPackages) ?? null)) {
  PageJsonInit == null ? void 0 : PageJsonInit.subPackages.forEach((el) => {
    let rootPath = el.root;
    el.pages.forEach((el2) => {
      var _a2, _b, _c, _d, _e;
      let elany = el2;
      let bg = (((_a2 = el2.style) == null ? void 0 : _a2.navigationBarBackgroundColor) ?? ((_b = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _b.navigationBarBackgroundColor) ?? "#FFFFFF") || "#FFFFFF";
      let txtColor = (((_c = el2.style) == null ? void 0 : _c.navigationBarTextStyle) ?? ((_d = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _d.navigationBarTextStyle) ?? "black") || "black";
      pages.push({
        path: rootPath + "/" + elany.path,
        custom: ((_e = elany == null ? void 0 : elany.style) == null ? void 0 : _e.navigationStyle) ?? "default",
        navigationBarBackgroundColor: bg,
        navigationBarTextStyle: txtColor
      });
    });
  });
}
let pagers = PageJsonInit;
let tabBar = (pagers == null ? void 0 : pagers.tabBar) ?? {
  color: "",
  selectedColor: "",
  borderStyle: "",
  backgroundColor: "",
  list: []
};
let cusutomIconList = [];
let $tm = {
  tabBar,
  pages,
  isOpenDarkModel: ((_a = PageJsonInit == null ? void 0 : PageJsonInit.globalStyle) == null ? void 0 : _a.navigationBarBackgroundColor).indexOf("@") > -1,
  isColor: (color) => {
    const reg1 = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    const reg2 = /^(rgb|RGB|rgba|RGBA)/;
    return reg1.test(color) || reg2.test(color);
  },
  /**tmui3.0工具函数 */
  u: { ...tmui_tool_function_util.util, preview: tmui_tool_function_preview.preview },
  /**tmui3.0国际化语言辅助函数 */
  language: tmui_tool_lib_language.language,
  fetch: tmui_tool_lib_fetch.fetchNet,
  tmicon: [
    {
      font: "tmicon",
      prefix: "tmicon-",
      fontJson: cusutomIconList
    }
  ],
  config: tmui_tool_lib_tmuiconfigDefault.tmuiconfigdefault
};
const tmui = {
  /**
   * tmui3.0
   * @param app Vue
   * @param options tmui3.0配置
   */
  install: (app, options = {}) => {
    common_vendor.index.addInterceptor("navigateTo", {
      invoke(result) {
        common_vendor.nextTick$1(() => {
          linsInko({
            path: result.url,
            context: null,
            openType: "navigateTo"
          });
        });
      },
      success(result) {
      }
    });
    common_vendor.index.addInterceptor("redirectTo", {
      success(result) {
        let pages2 = getCurrentPages().pop();
        let path = (pages2 == null ? void 0 : pages2.route) ?? "";
        let msg = result.errMsg ?? "";
        let opentype = msg.split(":")[0] ?? "";
        linsInko({
          path,
          context: null,
          openType: opentype
        });
      }
    });
    common_vendor.index.addInterceptor("reLaunch", {
      success(result) {
        let pages2 = getCurrentPages().pop();
        let path = (pages2 == null ? void 0 : pages2.route) ?? "";
        let msg = result.errMsg ?? "";
        let opentype = msg.split(":")[0] ?? "";
        linsInko({
          path,
          context: null,
          openType: opentype
        });
      }
    });
    common_vendor.index.addInterceptor("navigateBack", {
      invoke(result) {
        common_vendor.nextTick$1(() => {
          let pages2 = getCurrentPages().pop();
          let path = (pages2 == null ? void 0 : pages2.route) ?? "";
          let msg = result.errMsg ?? "";
          msg.split(":")[0] ?? "";
          linsInko({
            path,
            context: null,
            openType: "navigateBack"
          });
        });
      },
      success(result) {
      }
    });
    function linsInko(obj) {
      obj.path = obj.path[0] == "/" ? obj.path.substr(1) : obj.path;
    }
    options = tmui_tool_function_util.deepObjectMerge($tm.config, options);
    const pinia = app.config.globalProperties.$pinia || null;
    const tmPiniaPlugin = (context) => {
      if (context.store.$id === "tmpinia") {
        context.store.tmuiConfig = options;
        context.store.$state.tmuiConfig = options;
      }
    };
    if (pinia) {
      pinia.use(tmPiniaPlugin);
    } else {
      const pinia2 = common_vendor.createPinia();
      pinia2.use(tmPiniaPlugin);
      app.use(pinia2);
    }
    app.use(tmui_tool_lib_language.languageByGlobal());
    let appconfig = {};
    if ($tm.config.shareDisable) {
      const { onShareAppMessage, onShareTimeline } = tmui_tool_lib_share.share();
      appconfig = { ...appconfig, onShareAppMessage, onShareTimeline };
    }
    app.mixin({
      ...appconfig,
      onShow() {
      }
    });
    $tm = {
      ...$tm,
      config: options
    };
    common_vendor.index.$tm = $tm;
    app.config.globalProperties.tm = $tm;
  }
};
exports.tmui = tmui;

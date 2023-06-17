"use strict";
const tmui_tool_router_index = require("../router/index.js");
const tmuiconfigdefault = {
  autoDark: false,
  theme: {},
  themeConfig: {
    theme: {},
    globalFontSizeRatio: 1,
    /** 是否关闭弹层背景的模糊 */
    overflowBlur: false,
    /** 开启全局分离功能，默认关闭 */
    shareDisable: true,
    dark: {
      /**一般的卡片项目暗黑背景 */
      cardcolor: "#0A0A0B",
      /**输入框，表单等暗黑背景 */
      inputcolor: "#111112",
      /**禁用输入框，表单等暗黑背景 */
      disablecolor: "rgba(30, 30, 30, 1.0)",
      /**暗黑下的页面背景 */
      bodycolor: "rgb(5, 5, 5)",
      /**文本禁用色. */
      textDisableColor: "rgba(100, 100, 100, 1.0)"
    },
    component: {
      button: {
        round: 2,
        shadow: 2
      }
    }
  },
  router: { useTmRouterAfter: tmui_tool_router_index.useTmRouterAfter, useTmRouterBefore: tmui_tool_router_index.useTmRouterBefore },
  custom: {}
};
exports.tmuiconfigdefault = tmuiconfigdefault;

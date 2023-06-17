"use strict";
const common_vendor = require("../../../common/vendor.js");
const tmui_tool_lib_minxs = require("../../tool/lib/minxs.js");
const tmui_tool_lib_tmpinia = require("../../tool/lib/tmpinia.js");
require("../../tool/theme/theme.js");
require("../../tool/theme/colortool.js");
require("../../tool/lib/interface.js");
require("../../tool/function/util.js");
require("../../tool/function/preview.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "tm-row",
  props: {
    ...tmui_tool_lib_minxs.custom_props,
    height: {
      type: [Number, String],
      default: 0
    },
    margin: {
      type: Array,
      default: () => [0, 0]
    },
    width: {
      type: [Number, String],
      default: 0
    },
    round: {
      type: [Number, String],
      default: 0
    },
    //总列数。
    column: {
      type: Number,
      default: 12
    },
    //横向排列
    justify: {
      type: String,
      default: "start"
      //'start' | 'center' | 'end' | 'around' | 'between'
    },
    //纵向排列
    align: {
      type: String,
      default: "center"
      //'start' | 'center' | 'end' | 'stretch'
    },
    color: {
      type: String,
      default: "white"
    }
  },
  emits: ["click"],
  setup(__props, { emit: emits }) {
    var _a;
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const proxy = ((_a = common_vendor.getCurrentInstance()) == null ? void 0 : _a.proxy) ?? null;
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(
      () => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value)
    );
    const colWidth = common_vendor.inject("TmColWidth", common_vendor.computed(() => 0));
    const width_px_rect = common_vendor.ref(common_vendor.index.upx2px(Number(props.width)));
    const width_px_rect_rp = common_vendor.computed(() => width_px_rect.value);
    const justifyAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      around: "space-around",
      between: "space-between"
    };
    const justify_rp = common_vendor.computed(() => justifyAlign[props.justify] || "start");
    const AlignAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      stretch: "stretch"
    };
    const align_rp = common_vendor.computed(() => AlignAlign[props.align] || "start");
    function wxmpGetRect() {
      if (width_px_rect.value > 0)
        return;
      common_vendor.index.createSelectorQuery().in(proxy).select(".tm-row").boundingClientRect().exec(function(res) {
        var _a2, _b;
        if ((_a2 = res[0]) == null ? void 0 : _a2.width) {
          width_px_rect.value = (_b = res[0]) == null ? void 0 : _b.width;
        } else {
          wxmpGetRect();
        }
      });
    }
    common_vendor.onMounted(() => {
      wxmpGetRect();
    });
    common_vendor.onUpdated(() => {
      wxmpGetRect();
    });
    common_vendor.provide("TmRowWidth", width_px_rect_rp);
    common_vendor.provide(
      "TmRowColumn",
      common_vendor.computed(() => props.column)
    );
    common_vendor.watchEffect(() => {
      if (colWidth.value > 0) {
        width_px_rect.value = colWidth.value;
      }
    });
    let textColor = common_vendor.computed(() => tmcomputed.value.textColor);
    common_vendor.provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => emits("click", $event)),
        b: common_vendor.n(`round-${props.round}`),
        c: common_vendor.n(common_vendor.unref(customClass)),
        d: common_vendor.n(`mx-${props.margin[0]} my-${__props.margin[1]}`),
        e: common_vendor.s({
          flexDirection: "row",
          flexWrap: "wrap"
        }),
        f: common_vendor.s(props.height ? {
          height: props.height + "rpx"
        } : ""),
        g: common_vendor.s(common_vendor.unref(width_px_rect_rp) ? {
          width: width_px_rect.value + "px"
        } : ""),
        h: common_vendor.s({
          justifyContent: common_vendor.unref(justify_rp),
          alignItems: common_vendor.unref(align_rp)
        }),
        i: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).backgroundColorCss : ""),
        j: common_vendor.s(!props.transprent ? common_vendor.unref(tmcomputed).shadowColor : ""),
        k: common_vendor.s(common_vendor.unref(customCSSStyle))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Folders/裕农通/uniapp/src/tmui/components/tm-row/tm-row.vue"]]);
wx.createComponent(Component);

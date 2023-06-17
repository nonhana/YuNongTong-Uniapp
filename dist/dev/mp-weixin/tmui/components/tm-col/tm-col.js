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
  __name: "tm-col",
  props: {
    ...tmui_tool_lib_minxs.custom_props,
    height: {
      type: [Number, String],
      default: 50
    },
    color: {
      type: String,
      default: "white"
    },
    //占据的列数。
    col: {
      type: Number,
      default: 1
    },
    transprent: {
      type: [Boolean, String],
      default: false
    },
    align: {
      type: String,
      default: "center"
      //'start' | 'center' | 'end'
    },
    margin: {
      type: Array,
      default: () => [0]
    },
    //这里因为这个组件可能会被大量使用嵌套
    //为了性能，其它属性不再使用主题，而是直接使用值，对性能来说更为重要。
    borderColor: {
      type: String,
      default: "rgba(0,0,0,0.04)"
    },
    //表示四周的边线，这里与原有的border属性不关联，为了不与前面的属性产生混乱，
    //重新取一个属性作为值来使用。
    borderGutter: {
      type: Array,
      default: () => [0, 0, 0, 0]
    },
    hoverClass: {
      type: String,
      default: ""
    }
  },
  emits: ["click"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const store = tmui_tool_lib_tmpinia.useTmpiniaStore();
    const tmcfg = common_vendor.computed(() => store.tmStore);
    const customCSSStyle = common_vendor.computed(() => tmui_tool_lib_minxs.computedStyle(props));
    const customClass = common_vendor.computed(() => tmui_tool_lib_minxs.computedClass(props));
    const isDark = common_vendor.computed(() => tmui_tool_lib_minxs.computedDark(props, tmcfg.value));
    const tmcomputed = common_vendor.computed(
      () => tmui_tool_lib_minxs.computedTheme(props, isDark.value, tmcfg.value)
    );
    const _borderColor = common_vendor.computed(() => {
      if (isDark.value)
        return "rgba(255,255,255,0.02)";
      return props.borderColor || "rgba(0,0,0,0.04)";
    });
    const _margin = common_vendor.computed(() => {
      if (props.margin.length == 1)
        return [props.margin[0], props.margin[0], props.margin[0], props.margin[0]];
      if (props.margin.length == 2)
        return [props.margin[0], props.margin[1], props.margin[0], props.margin[1]];
      if (props.margin.length == 3)
        return [props.margin[0], props.margin[1], props.margin[2], 0];
      if (props.margin.length == 4)
        return [props.margin[0], props.margin[1], props.margin[2], props.margin[3]];
      return [0, 0, 0, 0];
    });
    const TmRowWidth = common_vendor.inject(
      "TmRowWidth",
      common_vendor.computed(() => 0)
    );
    const TmRowColumn = common_vendor.inject(
      "TmRowColumn",
      common_vendor.computed(() => 0)
    );
    const colWidth = common_vendor.computed(() => {
      if (TmRowWidth.value == 0)
        return 0;
      let w = Number(TmRowWidth.value / TmRowColumn.value * props.col).toFixed(4);
      return w;
    });
    common_vendor.provide("TmColWidth", common_vendor.computed(() => Number(colWidth.value) - common_vendor.index.upx2px(_margin.value[0] + _margin.value[2])));
    let justifyAlign = {
      start: "flex-start",
      end: "flex-end",
      center: "center"
    };
    const alignComputed = common_vendor.computed(() => justifyAlign[props.align]);
    let textColor = common_vendor.computed(() => tmcomputed.value.textColor);
    common_vendor.provide("appTextColor", textColor);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(colWidth)
      }, common_vendor.unref(colWidth) ? {
        b: common_vendor.s({
          marginLeft: common_vendor.unref(_margin)[0] + "rpx",
          marginTop: common_vendor.unref(_margin)[1] + "rpx",
          marginRight: common_vendor.unref(_margin)[2] + "rpx",
          marginBottom: common_vendor.unref(_margin)[3] + "rpx",
          borderLeft: `${props.borderGutter[0]}rpx solid ${common_vendor.unref(_borderColor)}`,
          borderTop: `${props.borderGutter[1]}rpx solid ${common_vendor.unref(_borderColor)}`,
          borderRight: `${props.borderGutter[2]}rpx solid ${common_vendor.unref(_borderColor)}`,
          borderBottom: `${props.borderGutter[3]}rpx solid ${common_vendor.unref(_borderColor)}`
        }),
        c: common_vendor.s(!__props.transprent && props.shadow > 0 ? common_vendor.unref(tmcomputed).shadowColor : ""),
        d: common_vendor.s(props.height ? {
          height: props.height + "rpx"
        } : ""),
        e: common_vendor.s(!__props.transprent ? common_vendor.unref(tmcomputed).backgroundColorCss : ""),
        f: common_vendor.s({
          alignItems: common_vendor.unref(alignComputed),
          justifyContent: "center"
        }),
        g: common_vendor.s(common_vendor.unref(customCSSStyle)),
        h: common_vendor.n(`round-${props.round}`),
        i: common_vendor.n(common_vendor.unref(customClass)),
        j: props.hoverClass,
        k: common_vendor.o(($event) => emits("click", $event)),
        l: common_vendor.unref(colWidth) + "px"
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Folders/裕农通/uniapp/src/tmui/components/tm-col/tm-col.vue"]]);
wx.createComponent(Component);

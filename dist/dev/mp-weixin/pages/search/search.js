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
  (_easycom_tm_col + _easycom_tm_row + _easycom_tm_text + resultsList + _easycom_tm_app)();
}
const resultsList = () => "../../components/search/resultsList.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "search",
  setup(__props) {
    const keywords = common_vendor.ref("");
    const resultList = common_vendor.ref([
      {
        result_id: 0,
        result_name: "小火车",
        result_details: "穿梭诗画里，梦栖美景中，欣赏城乡梦幻大自然...",
        result_price: {
          people: 100,
          family: 200
        },
        result_start: "8:30",
        result_end: "20:00",
        result_img: common_assets.xiaohuoche
      },
      {
        result_id: 1,
        result_name: "高山蔬菜",
        result_details: "山野风味，原滋原味，来自自然，吃出健康...",
        result_price: {
          people: 100
        },
        result_start: "8:30",
        result_end: "20:00",
        result_img: common_assets.gaoshanshucai
      },
      {
        result_id: 0,
        result_name: "露天烧烤",
        result_details: "这美滋滋的户外烧烤，叫人如何拒绝得了...",
        result_price: {
          people: 100
        },
        result_start: "8:30",
        result_end: "20:00",
        result_img: common_assets.lutianshaokao
      },
      {
        result_id: 0,
        result_name: "博物馆",
        result_details: "这里流淌着红色的革命血液，这里是我们革命的发源地...",
        result_price: {
          people: 100
        },
        result_start: "8:30",
        result_end: "20:00",
        result_img: common_assets.bowuguan
      }
    ]);
    const label_list = common_vendor.ref([
      {
        name: "小火车",
        selected: true
      },
      {
        name: "民宿",
        selected: false
      },
      {
        name: "美食",
        selected: false
      },
      {
        name: "烧烤",
        selected: false
      },
      {
        name: "博物馆",
        selected: false
      },
      {
        name: "剧本杀",
        selected: false
      }
    ]);
    const chooselabel = (num) => {
      label_list.value.forEach((item, index) => {
        item.selected = index === num;
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack({
        delta: -1
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_assets.back),
        b: common_vendor.o(goBack),
        c: common_vendor.p({
          height: 80,
          col: 2,
          align: "start"
        }),
        d: keywords.value,
        e: common_vendor.o(($event) => keywords.value = $event.detail.value),
        f: common_vendor.p({
          height: 80,
          col: 8,
          align: "start"
        }),
        g: common_vendor.unref(common_assets.search),
        h: common_vendor.p({
          width: 700,
          column: 10
        }),
        i: common_vendor.unref(common_assets.history),
        j: common_vendor.p({
          col: 1,
          align: "center",
          height: 60
        }),
        k: common_vendor.p({
          label: "历史搜索"
        }),
        l: common_vendor.p({
          col: 8,
          align: "start",
          height: 60
        }),
        m: common_vendor.p({
          color: "#777777",
          label: "清空"
        }),
        n: common_vendor.p({
          col: 1,
          align: "center",
          height: 60
        }),
        o: common_vendor.p({
          margin: [0, 20, 0, 0],
          width: 700,
          column: 10
        }),
        p: common_vendor.f(label_list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: common_vendor.n(item.selected ? "labelSelected" : "label"),
            d: common_vendor.o(($event) => chooselabel(index), index)
          };
        }),
        q: common_vendor.p({
          ["result-list"]: resultList.value
        }),
        r: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfa925e"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);

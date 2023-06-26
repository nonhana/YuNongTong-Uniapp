"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  _easycom_tm_app2();
}
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  _easycom_tm_app();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "jubensha",
  setup(__props) {
    const jubensha_details = {
      id: 0,
      title: "黎明",
      labels: ["7人", "现实", "近代", "烧脑"],
      team: "6男1女",
      time: "2~3h",
      level: "进阶",
      rate: {
        score: 8.6,
        people_num: 3e4,
        rate_details: [100, 80, 60, 40, 20]
      },
      want_play: 78,
      played: 108,
      introduce: "1948年，中共浙东临委为贯彻依靠路西、发展浙西、打通浙皖通道的战略部署，9月15日，在浦江马剑乡石门村（今诸暨市）以原会稽山人民抗暴游击司令部等游击队为基础，成立浙东人民解放军金萧支队，支队长蒋明达，政委张凡，下辖7个大队。金萧支队以诸暨、浦江、桐庐、富阳四县毗邻地区为作战中心，以四管乡（新合乡）为后勤基地，广泛开展斗争。",
      charactor_list: [
        { "id": 0, "name": "张修", "sex": "男", "identity": "旅店老板" },
        { "id": 1, "name": "黄煜", "sex": "男", "identity": "地主家少爷" },
        { "id": 2, "name": "刘浩", "sex": "男", "identity": "国军特务" },
        { "id": 3, "name": "叶伟", "sex": "男", "identity": "县警察厅厅长" },
        { "id": 4, "name": "王柏", "sex": "男", "identity": "为旅店送菜的农民" },
        { "id": 5, "name": "陈绍", "sex": "男", "identity": "店小二" },
        { "id": 6, "name": "钟宛", "sex": "女", "identity": "处长秘书" }
      ]
    };
    const instance = common_vendor.getCurrentInstance();
    const cWidth = common_vendor.ref(400);
    const cHeight = common_vendor.ref(300);
    const pixelRatio = common_vendor.ref(2);
    let uChartsInstance = {};
    const approximateNumber = (num) => {
      if (num >= 8 && num <= 10) {
        return 5;
      } else if (num >= 6 && num < 8) {
        return 4;
      } else if (num >= 4 && num < 6) {
        return 3;
      } else if (num >= 2 && num < 4) {
        return 2;
      } else {
        return 1;
      }
    };
    const getServerData = () => {
      let res = {
        categories: ["5", "4", "3", "2", "1"],
        series: [
          {
            name: "评分人数",
            data: jubensha_details.rate.rate_details
          }
        ]
      };
      drawCharts("GQHyXuwXpAFOnlpVnLHuMJMIsiiCUNbu", res);
    };
    const drawCharts = (id, data) => {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#" + id).fields({ node: true, size: true }).exec((res) => {
        if (res[0]) {
          const canvas = res[0].node;
          const ctx = canvas.getContext("2d");
          canvas.width = res[0].width * pixelRatio.value;
          canvas.height = res[0].height * pixelRatio.value;
          uChartsInstance[id] = new common_vendor.uCharts({
            type: "bar",
            context: ctx,
            width: cWidth.value * pixelRatio.value,
            height: cHeight.value * pixelRatio.value,
            categories: data.categories,
            series: data.series,
            pixelRatio: pixelRatio.value,
            animation: true,
            background: "#FFFFFF",
            color: ["#000000"],
            padding: [15, 30, 0, 5],
            enableScroll: false,
            legend: {},
            xAxis: {
              boundaryGap: "justify",
              disableGrid: false,
              min: 0,
              axisLine: false,
              max: 70
            },
            yAxis: {},
            extra: {
              bar: {
                type: "stack",
                width: 30,
                meterBorde: 1,
                meterFillColor: "#FFFFFF",
                activeBgColor: "#000000",
                activeBgOpacity: 0.08,
                categoryGap: 2
              }
            }
          });
        } else {
          console.error("[uCharts]: 未获取到 context");
        }
      });
    };
    const tap = (e) => {
      uChartsInstance[e.target.id].touchLegend(e);
      uChartsInstance[e.target.id].showToolTip(e);
    };
    common_vendor.onShow(() => {
      cWidth.value = common_vendor.index.upx2px(400);
      cHeight.value = common_vendor.index.upx2px(300);
      pixelRatio.value = common_vendor.index.getSystemInfoSync().pixelRatio;
      getServerData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(jubensha_details.title),
        b: common_vendor.unref(common_assets.fenxiang),
        c: common_vendor.unref(common_assets.jubensha_info),
        d: common_vendor.t(jubensha_details.title),
        e: common_vendor.f(jubensha_details.labels, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        f: common_vendor.unref(common_assets.zudui),
        g: common_vendor.t(jubensha_details.team),
        h: common_vendor.unref(common_assets.shijian),
        i: common_vendor.t(jubensha_details.time),
        j: common_vendor.unref(common_assets.dengji),
        k: common_vendor.t(jubensha_details.level),
        l: common_vendor.unref(common_assets.xiangwan),
        m: common_vendor.unref(common_assets.wanguo),
        n: common_vendor.t(jubensha_details.rate.score),
        o: common_vendor.f(approximateNumber(jubensha_details.rate.score), (_, k0, i0) => {
          return {};
        }),
        p: common_vendor.unref(common_assets.star2),
        q: common_vendor.t((jubensha_details.rate.people_num / 1e4).toFixed(1)),
        r: common_vendor.o(tap),
        s: common_vendor.t(jubensha_details.introduce),
        t: common_vendor.unref(common_assets.charactor1),
        v: common_vendor.unref(common_assets.charactor2),
        w: common_vendor.f(jubensha_details.charactor_list, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.sex),
            c: common_vendor.t(item.identity)
          };
        }),
        x: common_vendor.p({
          color: "#fff"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-13ce01db"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/jubensha/jubensha.vue"]]);
wx.createPage(MiniProgramPage);

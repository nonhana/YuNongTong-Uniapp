"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_tm_text2 = common_vendor.resolveComponent("tm-text");
  const _easycom_tm_divider2 = common_vendor.resolveComponent("tm-divider");
  const _easycom_tm_app2 = common_vendor.resolveComponent("tm-app");
  (_easycom_tm_text2 + _easycom_tm_divider2 + _easycom_tm_app2)();
}
const _easycom_tm_text = () => "../../tmui/components/tm-text/tm-text.js";
const _easycom_tm_divider = () => "../../tmui/components/tm-divider/tm-divider.js";
const _easycom_tm_app = () => "../../tmui/components/tm-app/tm-app.js";
if (!Math) {
  (_easycom_tm_text + _easycom_tm_divider + _easycom_tm_app)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "community",
  setup(__props) {
    const introduce = "塘波村位于浦江西部，隶属于花桥乡，南与兰溪市交界，西北与建德市毗邻。村庄始建于明代永乐年间，距今约有600多年的历史，人文底蕴深厚，红色资源丰富，是浦江母亲河浦阳江的发源地，也是浦江县饮用水源保护区。";
    const details = [{
      title: "江东县革命根据地的建立",
      info: "1948年1月，金良昆组成二大五中突击队，开始在浦西、建东一带发展革命武装。4月间，组成了长枪队一个小队，约20人，中队长金良昆，副中队长张镜中（又名张若鲁）；短枪部队——突击队约10人，队长黄成信，重建了浦江革命武装。1948年1月，金良昆组成二大五中突击队，开始在浦西、建东一带发展革命武装。4月间，组成了长枪队一个小队，约20人，中队长金良昆，副中队长张镜中（又名张若鲁）；短枪部队——突击队约10人，队长黄成信，重建了浦江革命武装。"
    }, {
      title: "江东县政府的成立",
      info: "在面临敌人围剿、异常残酷的斗争环境里，江东县委、县政府领导浦江、桐庐、建德、兰溪四县边境地区的人民边打游击边开展各项建设，巩固和发展了革命根据地。浙东解放军金萧支队以江东革命根据地为支撑点，渡过富春江，同皖南游击总队会师，打通了浙皖走廊，为1949年4月配合解放军大部队在皖南渡过长江作出了贡献。"
    }];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(common_assets.shequ),
        b: common_vendor.p({
          color: "#3d3d3d",
          ["font-size"]: 36,
          label: "简介"
        }),
        c: common_vendor.p({
          color: "#999999",
          ["font-size"]: 24,
          label: "红色塘波欢迎您"
        }),
        d: common_vendor.p({
          label: introduce
        }),
        e: common_vendor.p({
          color: "#3d3d3d",
          ["font-size"]: 36,
          label: "革命历史"
        }),
        f: common_vendor.p({
          color: "#999999",
          ["font-size"]: 24,
          label: "听红色故事，学红色精神"
        }),
        g: common_vendor.f(details, (item, k0, i0) => {
          return {
            a: "38f92639-8-" + i0 + ",38f92639-0",
            b: common_vendor.p({
              label: " · " + item.title
            }),
            c: "38f92639-9-" + i0 + ",38f92639-0",
            d: common_vendor.p({
              color: "#999999",
              ["font-size"]: 24,
              label: item.info
            })
          };
        }),
        h: common_vendor.p({
          color: "#f5f5f5"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-38f92639"], ["__file", "D:/Folders/裕农通/uniapp/src/pages/community/community.vue"]]);
wx.createPage(MiniProgramPage);

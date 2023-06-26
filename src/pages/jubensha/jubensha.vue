<template>
  <tm-app color="#fff">
    <view class="header">
      <view class="header-title">
        <text>{{ jubensha_details.title }}</text>
      </view>
      <img style="position: absolute;right: 30rpx;" class="icon" :src="fenxiang" alt="fenxiang" />
    </view>
    <view class="info">
      <img class="info-pic" :src="jubensha_info" alt="jubensha_info" />
      <view class="info-details">
        <text class="title">{{ jubensha_details.title }}</text>
        <view class="labels">
          <view v-for="item in jubensha_details.labels" class="label">
            <text>{{ item }}</text>
          </view>
        </view>
        <view class="special">
          <view class="special-item">
            <img class="icon" :src="zudui" alt="zudui" />
            <text>{{ jubensha_details.team }}</text>
          </view>
          <view class="special-item">
            <img class="icon" :src="shijian" alt="shijian" />
            <text>{{ jubensha_details.time }}</text>
          </view>
          <view class="special-item">
            <img class="icon" :src="dengji" alt="dengji" />
            <text>{{ jubensha_details.level }}</text>
          </view>
        </view>
        <view class="status">
          <view class="status-item">
            <img class="icon" :src="xiangwan" alt="xiangwan" />
            <text>想玩</text>
          </view>
          <view class="status-item">
            <img class="icon" :src="wanguo" alt="wanguo" />
            <text>玩过</text>
          </view>
        </view>
      </view>
    </view>
    <view class="rate">
      <view class="rate-stars">
        <text class="score">{{ jubensha_details.rate.score }}</text>
        <view class="star">
          <img class="icon" v-for="_ in approximateNumber(jubensha_details.rate.score)" :src="star2" alt="star" />
        </view>
        <text class="people">{{ (jubensha_details.rate.people_num / 10000).toFixed(1) }}万人评</text>
      </view>
      <view>
        <canvas canvas-id="GQHyXuwXpAFOnlpVnLHuMJMIsiiCUNbu" id="GQHyXuwXpAFOnlpVnLHuMJMIsiiCUNbu" type="2d"
          class="charts" @touchend="tap" />
      </view>
    </view>
    <view class="script">
      <text class="title">剧本介绍</text>
      <text class="details">{{ jubensha_details.introduce }}</text>
    </view>
    <view class="mission">
      <text class="title">任务简介</text>
      <view>
        <view class="mission-imgs">
          <img class="charactor" :src="charactor1" alt="charactor1" />
          <img class="charactor" :src="charactor2" alt="charactor2" />
        </view>
        <view class="mission-charactors">
          <text v-for="item in jubensha_details.charactor_list">
            {{ item.name }}，{{ item.sex }}，{{ item.identity }}
          </text>
        </view>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import uCharts from '../../../node_modules/@qiun/ucharts/u-charts.js'
import jubensha_info from '@/static/img/jubensha_info.png'
import charactor1 from '@/static/img/charactor1.png'
import charactor2 from '@/static/img/charactor2.png'
import fenxiang from '@/static/svg/fenxiang.svg'
import zudui from '@/static/svg/zudui.svg'
import shijian from '@/static/svg/shijian.svg'
import dengji from '@/static/svg/dengji.svg'
import xiangwan from '@/static/svg/xiangwan.svg'
import wanguo from '@/static/svg/wanguo.svg'
import star2 from '@/static/svg/star2.svg'

const jubensha_details = {
  id: 0,
  title: "黎明",
  labels: ["7人", "现实", "近代", "烧脑"],
  team: "6男1女",
  time: "2~3h",
  level: "进阶",
  rate: {
    score: 8.6,
    people_num: 30000,
    rate_details: [100, 80, 60, 40, 20]
  },
  want_play: 78,
  played: 108,
  introduce: "1948年，中共浙东临委为贯彻依靠路西、发展浙西、打通浙皖通道的战略部署，9月15日，在浦江马剑乡石门村（今诸暨市）以原会稽山人民抗暴游击司令部等游击队为基础，成立浙东人民解放军金萧支队，支队长蒋明达，政委张凡，下辖7个大队。金萧支队以诸暨、浦江、桐庐、富阳四县毗邻地区为作战中心，以四管乡（新合乡）为后勤基地，广泛开展斗争。",
  charactor_list: [
    { 'id': 0, 'name': '张修', 'sex': '男', 'identity': '旅店老板' },
    { 'id': 1, 'name': '黄煜', 'sex': '男', 'identity': '地主家少爷' },
    { 'id': 2, 'name': '刘浩', 'sex': '男', 'identity': '国军特务' },
    { 'id': 3, 'name': '叶伟', 'sex': '男', 'identity': '县警察厅厅长' },
    { 'id': 4, 'name': '王柏', 'sex': '男', 'identity': '为旅店送菜的农民' },
    { 'id': 5, 'name': '陈绍', 'sex': '男', 'identity': '店小二' },
    { 'id': 6, 'name': '钟宛', 'sex': '女', 'identity': '处长秘书' }
  ]
}
const instance = getCurrentInstance()
const cWidth = ref(400);
const cHeight = ref(300);
const pixelRatio = ref(2);

let uChartsInstance = {};

// 对评分进行四舍五入
const approximateNumber = (num: number): number => {
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
}

const getServerData = () => {
  let res = {
    categories: ["5", "4", "3", "2", "1"],
    series: [
      {
        name: "评分人数",
        data: jubensha_details.rate.rate_details
      },
    ]
  };
  drawCharts('GQHyXuwXpAFOnlpVnLHuMJMIsiiCUNbu', res);
}

const drawCharts = (id: any, data: any) => {
  const query = uni.createSelectorQuery().in(instance);
  query.select('#' + id).fields({ node: true, size: true }).exec(res => {
    if (res[0]) {
      const canvas = res[0].node;
      const ctx = canvas.getContext('2d');
      canvas.width = res[0].width * pixelRatio.value;
      canvas.height = res[0].height * pixelRatio.value;
      uChartsInstance[id] = new uCharts({
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
}

const tap = (e: any) => {
  uChartsInstance[e.target.id].touchLegend(e);
  uChartsInstance[e.target.id].showToolTip(e);
}

onShow(() => {
  cWidth.value = uni.upx2px(400);
  cHeight.value = uni.upx2px(300);
  pixelRatio.value = uni.getSystemInfoSync().pixelRatio;
  getServerData();
});
</script>

<style scoped lang="less">
.icon {
  width: 50rpx;
  height: 50rpx;
}

.header {
  position: relative;
  margin: 10rpx 0 0 0;
  width: 100%;
  height: 80rpx;
  box-shadow: 0rpx -5rpx 10rpx rgba(0, 0, 0, 0.2);
  border: 1px solid #888888;
  display: flex;
  align-items: center;
  justify-content: center;

  &-title {
    width: 70%;
    height: 50rpx;
    border: 1px solid #888888;
    display: flex;
    align-items: center;
    justify-content: center;

    text {
      font-size: 30rpx;
      font-weight: lighter;
      color: #888888;
    }
  }
}

.info {
  position: relative;
  margin: 30rpx auto 0;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-pic {
    width: 254rpx;
    height: 354rpx;
  }

  &-details {
    width: 400rpx;
    height: 300rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;

    .title {
      font-size: 48rpx;
      font-weight: bold;
      color: #3d3d3d;
    }

    .labels {
      display: flex;
      justify-content: space-between;

      .label {
        margin: 0 10rpx 0 0;
        padding: 5rpx 20rpx;
        background-color: #ACBFD5;
        border-radius: 50rpx;

        text {
          font-size: 24rpx;
          font-weight: normal;
          color: #3d3d3d;
        }
      }
    }

    .special {
      display: flex;
      justify-content: space-between;


      &-item {
        display: flex;
        align-items: center;

        text {
          font-size: 24rpx;
          font-weight: normal;
          color: #3d3d3d;
        }
      }
    }

    .status {
      display: flex;
      justify-content: space-between;


      &-item {
        width: 184rpx;
        height: 64rpx;
        background-color: #E6E6E6;
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        text {
          margin: 0 0 0 10rpx;
          font-size: 30rpx;
          font-weight: normal;
          color: #3d3d3d;
        }
      }

    }
  }
}

.rate {
  position: relative;
  margin: 30rpx auto 0;
  width: 95%;
  background-color: #E3EDF9;
  display: flex;
  justify-content: space-between;

  &-stars {
    display: flex;
    width: 300rpx;
    padding: 30rpx 0;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .score {
      font-size: 42rpx;
      font-weight: normal;
      color: #3d3d3d;
    }

    .star {
      display: flex;
      justify-content: space-between;
    }

    .people {
      font-size: 30rpx;
      font-weight: lighter;
      color: #888888;
    }
  }

  .charts {
    width: 400rpx;
    height: 300rpx;
  }
}

.script {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 30rpx auto 0;
  width: 95%;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #3d3d3d;
  }

  .details {
    font-size: 30rpx;
    font-weight: normal;
    color: #3d3d3d;
  }
}

.mission {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 30rpx auto 0;
  width: 95%;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: #3d3d3d;
  }

  view {
    margin: 10rpx 0 0 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .mission-imgs {
      display: flex;
      height: 400rpx;
      flex-direction: column;
      justify-content: space-between;

      .charactor {
        width: 146rpx;
        height: 192rpx;
      }
    }

    .mission-charactors {
      margin: 0 0 0 50rpx;
      height: 300rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: start;

      text {
        font-size: 30rpx;
        font-weight: normal;
        color: #3d3d3d;
      }
    }
  }
}
</style>
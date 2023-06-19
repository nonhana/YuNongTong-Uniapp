<template>
  <tm-app color="#f5f5f5">
    <view class="background">
      <tm-row :width="700" :column="10">
        <tm-col @click="goBack" :height="80" :col="2" align="start">
          <img class="icon" :src="back" alt="back">
        </tm-col>
        <tm-col :height="80" :col="8" align="start">
          <input v-model="keywords" class="searchInput" type="text" placeholder="搜索">
        </tm-col>
        <img style="position: absolute;right: 80rpx;" class="icon" :src="search" alt="search">
      </tm-row>
      <tm-row :margin="[0, 20, 0, 0]" :width="700" :column="10">
        <tm-col :col="1" align="center" :height="60">
          <img class="little-icon" :src="history" alt="history">
        </tm-col>
        <tm-col :col="8" align="start" :height="60">
          <tm-text label="历史搜索"></tm-text>
        </tm-col>
        <tm-col :col="1" align="center" :height="60">
          <tm-text color="#777777" label="清空"></tm-text>
        </tm-col>
      </tm-row>
      <scroll-view scroll-x>
        <view class="labels">
          <view v-for="(item, index) in label_list as any[]" :key="index"
            :class="item.selected ? 'labelSelected' : 'label'" @click="chooselabel(index)">
            <text class="labels-text">
              {{ item.name }}
            </text>
          </view>
        </view>
      </scroll-view>
      <view style="margin: 20rpx 0 0 0;">
        <resultsList :result-list="resultList" />
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import resultsList from '@/components/search/resultsList.vue'
import back from '@/static/svg/back.svg'
import search from '@/static/svg/search.svg'
import history from '@/static/svg/history.svg'
import xiaohuoche from '@/static/img/xiaohuoche.png'
import gaoshanshucai from '@/static/img/gaoshanshucai.png'
import lutianshaokao from '@/static/img/lutianshaokao.png'
import bowuguan from '@/static/img/bowuguan.png'
import { ref } from 'vue'

type label = {
  name: string,
  selected: boolean
}

type resultItem = {
  result_id: number,
  result_name: string,
  result_details: string,
  result_price: {
    people: number,
    family?: number,
  },
  result_start: string,
  result_end: string,
  result_img: string
}

const keywords = ref<string>('')

const resultList = ref<resultItem[]>([
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
    result_img: xiaohuoche
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
    result_img: gaoshanshucai
  },
  {
    result_id: 0,
    result_name: "露天烧烤",
    result_details: "这美滋滋的户外烧烤，叫人如何拒绝得了...",
    result_price: {
      people: 100,
    },
    result_start: "8:30",
    result_end: "20:00",
    result_img: lutianshaokao
  },
  {
    result_id: 0,
    result_name: "博物馆",
    result_details: "这里流淌着红色的革命血液，这里是我们革命的发源地...",
    result_price: {
      people: 100,
    },
    result_start: "8:30",
    result_end: "20:00",
    result_img: bowuguan
  },
])

const label_list = ref<label[]>([
  {
    name: '小火车',
    selected: true,
  },
  {
    name: '民宿',
    selected: false,
  },
  {
    name: '美食',
    selected: false,
  },
  {
    name: '烧烤',
    selected: false,
  },
  {
    name: '博物馆',
    selected: false,
  },
  {
    name: '剧本杀',
    selected: false,
  },
])

const chooselabel = (num: number) => {
  label_list.value.forEach((item: any, index: number) => {
    item.selected = (index === num)
  })
}

const goBack = () => {
  uni.navigateBack({
    delta: -1
  })
}

</script>

<style scoped lang="less">
.background {
  position: relative;
  width: 100%;
  margin: 0 0 50rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 50rpx;
  height: 50rpx;
  margin: 0 0 0 10rpx;
}

.little-icon {
  width: 30rpx;
  height: 30rpx;
}

.searchInput {
  padding: 10rpx;
  width: 500rpx;
  border-radius: 5rpx;
  border: 2rpx solid #E5E6EB;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 28rpx;
  height: 28rpx;
}

.labels {
  display: flex;
  width: 1000rpx;

  &-text {
    font-size: 28rpx;
    margin: 0 18rpx;
  }
}

.label,
.labelSelected {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 20rpx;
  padding: 0 10rpx;
  height: 60rpx;
  border-radius: 40rpx;
}

.label {
  color: black;
  border: solid 2rpx #E5E6EB;
  background-color: #fff;
}

.labelSelected {
  color: #fff;
  border: solid 2rpx #FF7A28;
  background-color: #FF7A28;
}
</style>
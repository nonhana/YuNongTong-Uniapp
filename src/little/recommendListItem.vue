<template>
  <view class="recommendListItem">
    <view class="hot">
      <img class="hot-icon" :src="hot" alt="hot">
      <text class="hot-num">{{ itemInfo.item_hot }}</text>
    </view>
    <text class="title">{{ itemInfo.item_title }}</text>
    <img :src="itemInfo.item_img" alt="img">
    <view class="stars">
      <img class="stars-item" v-for="_ in itemInfo.item_star" :src="star" alt="star">
    </view>
  </view>
</template>

<script setup lang="ts">
import hot from '@/static/svg/hot.svg'
import star from '@/static/svg/star.svg'
import { defineProps } from 'vue'
defineProps<
  {
    itemInfo: {
      item_id: number,
      item_img: string,
      item_title: string,
      item_hot: number,
      item_star: number
    }
  }>()

</script>

<style scoped lang="less">
.recommendListItem {
  position: relative;
  width: 340rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hot {
  position: absolute;
  top: 10rpx;
  right: 10rpx;
  width: 96rpx;
  height: 34rpx;
  border-radius: 17rpx;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  &-icon {
    width: 24rpx;
    height: 24rpx;
  }

  &-num {
    margin: 0 0 0 10rpx;
    font-size: 24rpx;
    color: #3d3d3d;
  }
}

.title {
  position: absolute;
  bottom: 34rpx;
  left: 10rpx;
  font-size: 36rpx;
  color: #fff;
}

.stars{
  position: absolute;
  bottom: 34rpx;
  right: 10rpx;
  display: flex;

  &-item {
    width: 24rpx;
    height: 24rpx;
    margin: 0 0 0 10rpx;
  }
}
</style>
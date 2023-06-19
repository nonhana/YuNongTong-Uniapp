<template>
  <view class="result">
    <view class="result-img">
      <img :src="resultItem.result_img" alt="result-img" />
    </view>
    <view class="result-main">
      <view class="title">
        <text>{{ resultItem.result_name }}</text>
      </view>
      <view class="details">
        <text>{{ resultItem.result_details }}</text>
      </view>
      <view style="display: flex;justify-content: space-between;">
        <view class="time">
          <text>{{ resultItem.result_start }}-{{ resultItem.result_end }}</text>
        </view>
        <view class="price">
          <img class="little-icon" :src="price" alt="price" />
          <view style="display: flex;flex-direction: column;">
            <text>{{ resultItem.result_price.people }}元/人</text>
            <text v-if="resultItem.result_price.family">{{ resultItem.result_price?.family }}元/家庭</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import price from '@/static/svg/price.svg'
import { defineProps } from 'vue'
defineProps<
  {
    resultItem: {
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
  }>()
</script>

<style scoped lang="less">
.result {
  position: relative;
  width: 660rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-img {
    width: 300rpx;
    height: 200rpx;
    border-radius: 10rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    img {
      width: 320rpx;
    }
  }

  &-main {
    width: 340rpx;
    height: 200rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #3d3d3d;
    }

    .details {
      font-size: 24rpx;
      font-weight: normal;
      color: #6D6767;
    }

    .time {
      font-size: 30rpx;
      font-weight: normal;
      color: #6D6767;
    }

    .price {
      display: flex;
      align-items: center;

      .little-icon {
        width: 40rpx;
        height: 40rpx;
        margin: 0 5rpx 0 0;
      }

      text {
        font-size: 21rpx;
        font-weight: normal;
        color: #777777;
      }
    }
  }
}
</style>
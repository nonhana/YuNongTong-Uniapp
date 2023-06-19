<template>
  <tm-app color="#fff">
    <view class="resultsList">
      <view v-for="item in resultList">
        <resultItem :result-item="item" />
        <tm-divider></tm-divider>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import resultItem from '@/little/resultItem.vue'
import { defineProps } from 'vue'
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

defineProps<
  {
    resultList: Array<resultItem>
  }>()

</script>

<style scoped lang="less">
.resultsList {
  position: relative;
  width: 660rpx;
  padding: 20rpx;
}
</style>
<template>
  <tm-app color="#fff">
    <tm-row :column="10" :width="700">
      <tm-col :margin="[20, 0, 0, 0]" :col="2" :height="60" align="start">
        <tm-text label="民宿"></tm-text>
      </tm-col>
      <tm-col :margin="[0, 0, 20, 0]" :col="8" :height="60" align="end">
        <img class="icon" :src="more" alt="more">
      </tm-col>
    </tm-row>
    <tm-row :column="10" :width="700">
      <view class="hotelList">
        <view style="margin: 0 20rpx 0 0;">
          <img id="left_img" style="border-radius: 10rpx;width: 330rpx;" :src="hotelList[0].item_img" alt="minsu1" />
        </view>
        <view>
          <view>
            <img :style="{
              height: (img_height - 10) / 2 + 'px',
            }" style="border-radius: 10rpx;width: 330rpx;" :src="hotelList[1].item_img" alt="minsu2" />
          </view>
          <view style="margin: 5px 0 0 0;">
            <img :style="{
              height: (img_height - 10) / 2 + 'px',
            }" style="border-radius: 10rpx;width: 330rpx;" :src="hotelList[2].item_img" alt="minsu2" />
          </view>
        </view>
      </view>
    </tm-row>
  </tm-app>
</template>

<script setup lang="ts">
import minsu1 from '@/static/img/minsu1.png'
import minsu2 from '@/static/img/minsu1.png'
import more from '../../static/svg/more.svg'
import getDOM from '@/utils/getDOM'
import { ref, onMounted, getCurrentInstance } from 'vue'

type hotelListType = {
  item_id: number,
  item_img: string,
}

let img_height = ref<number>(0)

const hotelList = ref<hotelListType[]>([
  {
    item_id: 1,
    item_img: minsu1,
  },
  {
    item_id: 2,
    item_img: minsu2,
  },
  {
    item_id: 3,
    item_img: minsu2,
  }
])

onMounted(() => {
  getDOM('left_img').then((res: any) => {
    img_height.value = res.height
  })
})

</script>

<style scoped lang="less">
.icon {
  width: 50rpx;
  height: 50rpx;
  margin: 0 0 0 10rpx;
}

.hotelList {
  width: 100%;
  margin: 0 0 30rpx 0;
  display: flex;
  justify-content: center;
}
</style>
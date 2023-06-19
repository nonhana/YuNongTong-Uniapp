<template>
  <tm-app color="#f5f5f5">
    <view class="background">
      <tm-row :width="700" :column="10">
        <tm-col :height="80" :col="2" align="start">
          <img class="icon" :src="sideButton" alt="sideButton">
        </tm-col>
        <tm-col :height="80" :col="8" align="start">
          <input @click="inputClick" v-model="keywords" class="searchInput" type="text" placeholder="搜索">
        </tm-col>
      </tm-row>
      <tm-row :margin="[0, 20, 0, 0]" :width="700" :height="350" :column="10">
        <tm-col :col="10">
          <pictureSlide />
        </tm-col>
      </tm-row>
      <tm-row :margin="[0, 20, 0, 0]" :width="700" :column="12">
        <tm-col :col="2" :height="180">
          <img class="service" :src="goupiao" alt="goupiao">
          <tm-text label="购票"></tm-text>
        </tm-col>
        <tm-col :col="2" :height="180">
          <img class="service" :src="huodong" alt="huodong">
          <tm-text label="活动"></tm-text>
        </tm-col>
        <tm-col :col="2" :height="180">
          <img class="service" :src="minsu" alt="minsu">
          <tm-text label="民宿"></tm-text>
        </tm-col>
        <tm-col :col="2" :height="180">
          <img class="service" :src="wenchuang" alt="wenchuang">
          <tm-text label="文创"></tm-text>
        </tm-col>
        <tm-col :col="2" :height="180">
          <img class="service" :src="changdi" alt="changdi">
          <tm-text label="场地"></tm-text>
        </tm-col>
        <tm-col :col="2" :height="180">
          <img class="service" :src="techan" alt="techan">
          <tm-text label="特产"></tm-text>
        </tm-col>
      </tm-row>
      <view class="buttons">
        <button class="buttons-item">
          <span>红色游</span>
        </button>
        <button class="buttons-item">
          <span>研学游</span>
        </button>
      </view>
      <tm-row :margin="[0, 20, 0, 0]" :column="10" :width="700">
        <recommendList />
      </tm-row>
      <tm-row :margin="[0, 20, 0, 0]" :column="10" :width="700">
        <hotelList />
      </tm-row>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
// 引入组件
import pictureSlide from '../../components/home/pictureSlide.vue'
import recommendList from '../../components/home/recommendList.vue'
import hotelList from '@/components/home/hotelList.vue'
// 引入图片
import sideButton from '../../static/svg/sideButton.svg'
import goupiao from '../../static/png/goupiao.png'
import huodong from '../../static/png/huodong.png'
import minsu from '../../static/png/minsu.png'
import wenchuang from '../../static/png/wenchuang.png'
import changdi from '../../static/png/changdi.png'
import techan from '../../static/png/techan.png'
// 引入vue相关
import { ref } from 'vue'
const keywords = ref<string>('')


const inputClick = () => {
  uni.navigateTo({
    url: '../search/search',
    animationType: 'slide-in-bottom',
    animationDuration: 200
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

.searchInput {
  padding: 10rpx;
  width: 500rpx;
  border-radius: 5rpx;
  border: 2rpx solid #E5E6EB;
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 500;
  font-size: 28rpx;
  /* 防止input内部字体无法完全显示 */
  height: 28rpx;
}

.service {
  width: 80rpx;
  height: 80rpx;
}

.buttons {
  width: 720rpx;
  display: flex;
  justify-content: space-between;

  &-item {
    background-color: #fff;
    width: 340rpx;
    height: 90rpx;
  }
}
</style>
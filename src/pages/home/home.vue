<template>
  <tm-app color="#f5f5f5">
    <view class="background">
      <tm-row :width="700" :column="10">
        <tm-col :col="2">
        </tm-col>
        <tm-col :col="8">
          <tm-input></tm-input>
        </tm-col>
      </tm-row>
      <tm-row :width="700" :height="350" :column="10">
        <tm-col :col="10">
          <pictureSlide />
        </tm-col>
      </tm-row>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
// 引入组件
import pictureSlide from '../../components/home/pictureSlide.vue'
// 引入svg组件
import sideButton from '../../static/svg/sideButton.svg'
</script>

<style scoped lang="less">
.background {
  position: relative;
  top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
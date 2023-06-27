<template>
  <tm-app color="#f5f5f5">
    <view>
      <view class="uni-padding-wrap uni-common-mt">
        <movable-area scale-area>
          <movable-view direction="all" scale="true" scale-min="3" scale-max="10">
            <image :src="bigmap" mode="widthFix"></image>
          </movable-view>
        </movable-area>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import bigmap from '@/static/img/bigmap.jpg'
</script>

<style scoped lang="less">
movable-view {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  left: -100%;
  width: 100%;
  height: 100%;
}

movable-area {
  width: 100%;
  height: 100%;
  position: fixed;
}

movable-view image {
  width: 100%;
}
</style>
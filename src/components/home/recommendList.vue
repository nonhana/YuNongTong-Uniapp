<template>
  <tm-app color="#fff">
    <tm-row :column="10" :width="700">
      <tm-col :margin="[20, 0, 0, 0]" :col="2" :height="60" align="start">
        <tm-text label="兴趣推荐"></tm-text>
      </tm-col>
      <tm-col :margin="[0, 0, 20, 0]" :col="8" :height="60" align="end">
        <img class="icon" :src="more" alt="more">
      </tm-col>
    </tm-row>
    <tm-row :column="10" :width="700">
      <tm-col :height="500" :col="5">
        <recommendListItem :item-info="recommendList[0]" />
      </tm-col>
      <tm-col :height="500" :col="5">
        <tm-row :column="10">
          <tm-col :height="250" :col="10">
            <recommendListItem :item-info="recommendList[1]" />
          </tm-col>
        </tm-row>
        <tm-row :column="10">
          <tm-col :height="250" :col="10">
            <recommendListItem :item-info="recommendList[2]" />
          </tm-col>
        </tm-row>
      </tm-col>
    </tm-row>
  </tm-app>
</template>

<script setup lang="ts">
import recommendListItem from '@/little/recommendListItem.vue';
import more from '../../static/svg/more.svg'
import tangbomeijing from '@/static/img/tangbomeijing.png'
import hongsegushi from '@/static/img/hongsegushi.png'
import jubensha from '@/static/img/jubensha.png'
import { ref } from 'vue'

type recommendListType = {
  item_id: number,
  item_img: string,
  item_title: string,
  item_hot: number,
  item_star: number,
}

const recommendList = ref<recommendListType[]>([
  {
    item_id: 1,
    item_img: tangbomeijing,
    item_title: '唐博美景',
    item_hot: 123,
    item_star: 5
  },
  {
    item_id: 2,
    item_img: hongsegushi,
    item_title: '红色故事',
    item_hot: 123,
    item_star: 4
  },
  {
    item_id: 3,
    item_img: jubensha,
    item_title: '聚本纱',
    item_hot: 123,
    item_star: 4
  }
])
</script>

<style scoped lang="less">
.icon {
  width: 50rpx;
  height: 50rpx;
  margin: 0 0 0 10rpx;
}
</style>
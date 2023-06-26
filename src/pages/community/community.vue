<template>
  <tm-app color="#f5f5f5">
    <img class="headpic" :src="shequ" alt="shequ" />
    <view class="introduce">
      <view style="display: flex;justify-content: center;margin: 20rpx 0 0 0;">
        <tm-text color="#3d3d3d" :font-size="36" label="简介"></tm-text>
      </view>
      <view style="display: flex;justify-content: center;margin: 20rpx 0 0 0;">
        <tm-text color="#999999" :font-size="24" label="红色塘波欢迎您"></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view style="display: flex;justify-content: center;margin: 0 10rpx 20rpx;">
        <tm-text :label="introduce"></tm-text>
      </view>
    </view>
    <view class="details">
      <view style="display: flex;justify-content: center;margin: 20rpx 0 0 0;">
        <tm-text color="#3d3d3d" :font-size="36" label="革命历史"></tm-text>
      </view>
      <view style="display: flex;justify-content: center;margin: 20rpx 0 0 0;">
        <tm-text color="#999999" :font-size="24" label="听红色故事，学红色精神"></tm-text>
      </view>
      <tm-divider></tm-divider>
      <view v-for="item in details" class="details-text">
        <view style="margin:0 0 20rpx 0;">
          <tm-text :label="' · ' + item.title"></tm-text>
        </view>
        <tm-text color="#999999" :font-size="24" :label="item.info"></tm-text>
      </view>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import shequ from '@/static/img/shequ.png'
const introduce: string = "塘波村位于浦江西部，隶属于花桥乡，南与兰溪市交界，西北与建德市毗邻。村庄始建于明代永乐年间，距今约有600多年的历史，人文底蕴深厚，红色资源丰富，是浦江母亲河浦阳江的发源地，也是浦江县饮用水源保护区。"
const details: Array<{
  title: string,
  info: string
}> = [{
  title: "江东县革命根据地的建立",
  info: "1948年1月，金良昆组成二大五中突击队，开始在浦西、建东一带发展革命武装。4月间，组成了长枪队一个小队，约20人，中队长金良昆，副中队长张镜中（又名张若鲁）；短枪部队——突击队约10人，队长黄成信，重建了浦江革命武装。1948年1月，金良昆组成二大五中突击队，开始在浦西、建东一带发展革命武装。4月间，组成了长枪队一个小队，约20人，中队长金良昆，副中队长张镜中（又名张若鲁）；短枪部队——突击队约10人，队长黄成信，重建了浦江革命武装。"
}, {
  title: "江东县政府的成立",
  info: "在面临敌人围剿、异常残酷的斗争环境里，江东县委、县政府领导浦江、桐庐、建德、兰溪四县边境地区的人民边打游击边开展各项建设，巩固和发展了革命根据地。浙东解放军金萧支队以江东革命根据地为支撑点，渡过富春江，同皖南游击总队会师，打通了浙皖走廊，为1949年4月配合解放军大部队在皖南渡过长江作出了贡献。"
},]

</script>

<style scoped lang="less">
.headpic {
  position: absolute;
  width: 100%;
  height: 500rpx;
}

.introduce {
  position: relative;
  margin: 450rpx 0 0 0;
  width: 100%;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
}

.details {
  position: relative;
  margin: 30rpx 0 0 0;
  padding: 0 0 30rpx 0;
  width: 100%;
  background-color: #fff;

  &-text {
    margin: 20rpx 10rpx 0;
  }
}
</style>
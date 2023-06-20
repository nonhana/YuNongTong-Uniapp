<template>
  <tm-app color="#f5f5f5">
    <tm-row :column="10">
      <tm-col :height="140" :col="3" align="center">
        <view class="header">
          <img class="header-img" :src="user_info.user_img" alt="header" />
        </view>
      </tm-col>
      <tm-col :height="140" :col="7" align="start">
        <view class="userinfo">
          <tm-text :font-size="36" color="#3d3d3d" :label="user_info.user_name"></tm-text>
          <tm-text :font-size="24" color="#B3B2B2" :label="user_info.user_info"></tm-text>
        </view>
      </tm-col>
    </tm-row>
    <tm-row :column="12">
      <tm-col :borderGutter="[0, 0, 5, 0]" :height="140" :col="4">
        <img class="icon" :src="flower" alt="flower" />
        <tm-text :font-size="24" color="#838383" label="小红花"></tm-text>
      </tm-col>
      <tm-col :borderGutter="[0, 0, 5, 0]" :height="140" :col="4">
        <img class="icon" :src="store" alt="store" />
        <tm-text :font-size="24" color="#838383" label="积分商城"></tm-text>
      </tm-col>
      <tm-col :height="140" :col="4">
        <img class="icon" :src="event" alt="event" />
        <tm-text :font-size="24" color="#838383" label="活动中心"></tm-text>
      </tm-col>
    </tm-row>
    <view style="margin: 30rpx 0 0 0;">
      <tm-row :column="10">
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="center">
          <img class="little-icon" :src="xinxirenzheng" alt="xinxirenzheng" />
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="start">
          <tm-text label="信息认证"></tm-text>
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="6" align="end">
          <img style="margin: 0 20rpx 0 0;" class="little-icon" :src="fanhui" alt="fanhui" />
        </tm-col>
      </tm-row>
      <tm-row :column="10">
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="center">
          <img class="little-icon" :src="fuwuguanli" alt="fuwuguanli" />
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="start">
          <tm-text label="服务管理"></tm-text>
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="6" align="end">
          <img style="margin: 0 20rpx 0 0;" class="little-icon" :src="fanhui" alt="fanhui" />
        </tm-col>
      </tm-row>
    </view>
    <view style="margin: 30rpx 0 0 0;">
      <tm-row :column="10">
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="center">
          <img class="little-icon" :src="fabutiezi" alt="fabutiezi" />
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="start">
          <tm-text label="发布帖子"></tm-text>
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="6" align="end">
          <img style="margin: 0 20rpx 0 0;" class="little-icon" :src="fanhui" alt="fanhui" />
        </tm-col>
      </tm-row>
      <tm-row :column="10">
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="center">
          <img class="little-icon" :src="guanzhudehuodong" alt="guanzhudehuodong" />
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="start">
          <tm-text label="关注的活动"></tm-text>
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="6" align="end">
          <img style="margin: 0 20rpx 0 0;" class="little-icon" :src="fanhui" alt="fanhui" />
        </tm-col>
      </tm-row>
    </view>
    <view style="margin: 30rpx 0 0 0;">
      <tm-row :column="10">
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="center">
          <img class="little-icon" :src="shiyongbangzhu" alt="shiyongbangzhu" />
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="start">
          <tm-text label="使用帮助"></tm-text>
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="6" align="end">
          <img style="margin: 0 20rpx 0 0;" class="little-icon" :src="fanhui" alt="fanhui" />
        </tm-col>
      </tm-row>
      <tm-row :column="10">
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="center">
          <img class="little-icon" :src="shezhi" alt="shezhi" />
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="2" align="start">
          <tm-text label="设置"></tm-text>
        </tm-col>
        <tm-col :height="100" :borderGutter="[0, 2, 0, 0]" :col="6" align="end">
          <img style="margin: 0 20rpx 0 0;" class="little-icon" :src="fanhui" alt="fanhui" />
        </tm-col>
      </tm-row>
    </view>
  </tm-app>
</template>

<script setup lang="ts">
import user from '@/static/svg/user.svg'
import flower from '@/static/svg/flower.svg'
import store from '@/static/svg/store.svg'
import event from '@/static/svg/event.svg'
import xinxirenzheng from '@/static/svg/xinxirenzheng.svg'
import fuwuguanli from '@/static/svg/fuwuguanli.svg'
import fabutiezi from '@/static/svg/fabutiezi.svg'
import guanzhudehuodong from '@/static/svg/guanzhudehuodong.svg'
import shiyongbangzhu from '@/static/svg/shiyongbangzhu.svg'
import shezhi from '@/static/svg/shezhi.svg'
import fanhui from '@/static/svg/fanhui.svg'
const user_info = {
  user_id: 1,
  user_img: user,
  user_name: '请进行登录',
  user_info: '该用户暂未设置签名哦',
}
</script>

<style scoped lang="less">
.header {
  position: relative;
  width: 98rpx;
  height: 98rpx;
  border: 1px solid #3d3d3d;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  &-img {
    width: 80rpx;
    height: 80rpx;
  }
}

.userinfo {
  position: relative;
  height: 90rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon {
  width: 70rpx;
  height: 70rpx;
}

.little-icon {
  width: 50rpx;
  height: 50rpx;
}
</style>
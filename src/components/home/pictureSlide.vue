<template>
  <tm-app color="#f5f5f5">
    <tm-carousel autoplay :width="700" :height="350" :list="listimg"></tm-carousel>
  </tm-app>
</template>

<script setup lang="ts">
import lunbotu1 from '@/static/img/lunbotu1.jpg'
import lunbotu2 from '@/static/img/lunbotu2.jpg'
import lunbotu3 from '@/static/img/lunbotu3.jpg'
import lunbotu4 from '@/static/img/lunbotu4.jpg'
const listimg = [
  lunbotu1,
  lunbotu2,
  lunbotu3,
  lunbotu4,
]
</script>

<style scoped lang="less"></style>
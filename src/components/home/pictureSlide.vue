<template>
  <tm-app color="#f5f5f5">
    <tm-carousel autoplay :width="700" :height="350" :list="listimg"></tm-carousel>
  </tm-app>
</template>

<script setup lang="ts">
const listimg = [
  "https://picsum.photos/200/300?id=43335",
  "https://picsum.photos/200/300?id=433",
  "https://picsum.photos/200/300?id=439",
  "https://picsum.photos/200/300?id=459",
]
</script>

<style scoped lang="less"></style>
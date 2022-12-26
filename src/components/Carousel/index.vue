<template>
  <!-- 轮播图 -->
  <el-carousel :interval="5000" arrow="always" height="464px">
    <el-carousel-item v-for="carousel in carouselList" :key="carousel.id">
      <img :src="carousel.imgUrl" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousels",
  props: ["carouselList"],
  watch: {
    carouselList: {
      immediate: true,
      handler() {
        this.$nextTick(function () {
          new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-slide {
  img {
    width: 100%;
  }
}
</style>

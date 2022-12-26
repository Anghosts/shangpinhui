<template>
  <!--下方的缩略图-->
  <div class="specScroll">
    <!--左按钮-->
    <!-- <a class="prev">&lt;</a> -->
    <!-- 中间可滑动区域 -->
    <div class="items">
      <div class="itemsCon" style="transition: all 0.5s ease 0s">
        <el-carousel
          :interval="0"
          arrow="always"
          height="56px"
          indicator-position="none"
          type="card"
          @change="changeImage"
          ref="carousel"
        >
          <el-carousel-item v-for="(image, index) in skuImageList" :key="index">
            <img
              :src="image.imgUrl"
              :class="{ active: carouselIndex == index }"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--右按钮-->
    <!-- <a class="next">&gt;</a> -->
  </div>
</template>

<script>
export default {
  name: "SpecScroll",
  props: ["skuImageList"],
  data() {
    return {
      carouselIndex: 0,
    };
  },
  methods: {
    // 切换图片回调
    changeImage(index) {
      this.carouselIndex = index;
      this.$bus.$emit("changeImage", index);
    },
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        // 显示默认图片
        this.skuImageList.forEach((item, index) => {
          if (item.isDefault == "1") {
            this.carouselIndex = index;
            this.$refs.carousel.setActiveItem(index);
            return;
          }
        });
      });
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.specScroll {
  margin-top: 5px;
  width: 400px;
  overflow: hidden;
  .prev,
  .next {
    text-align: center;
    width: 10px;
    height: 54px;
    line-height: 54px;
    border: 1px solid #ccc;
    background: #ebebeb;
    cursor: pointer;
  }
  .prev {
    float: left;
    margin-right: 4px;
  }
  .next {
    float: right;
  }
  .items {
    float: left;
    position: relative;
    width: 400px;
    height: 56px;
    overflow: hidden;
    .itemsCon {
      position: absolute;
      width: 100%;
      height: 56px;
      left: 0;
      img {
        box-sizing: border-box;
        float: left;
        text-align: center;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        margin-right: 20px;
        &.active {
          border: 2px solid #b95309;
        }
      }
    }
  }
}
</style>
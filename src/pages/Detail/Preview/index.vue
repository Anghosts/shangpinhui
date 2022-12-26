<template>
  <!--放大镜效果-->
  <div class="preview">
    <div class="jqzoom" @mouseleave="isShow = false">
      <img v-lazy="defaultImg.imgUrl" />
      <div class="event" @mousemove="showZoom"></div>
      <div class="mask" v-show="isShow" ref="mask"></div>
    </div>
    <div class="maxbox" v-show="isShow" ref="maxbox">
      <img :src="defaultImg.imgUrl" ref="bigImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: ["skuImageList", "skuDefaultImg"],
  data() {
    return {
      imgIndex: 0,
      isShow: false,
    };
  },
  computed: {
    defaultImg() {
      return this.skuImageList[this.imgIndex] || {};
    },
  },
  methods: {
    showZoom(event) {
      this.isShow = true;

      let mask = this.$refs.mask;
      let maxBox = this.$refs.maxbox;
      let bigImg = this.$refs.bigImg;

      let left = event.offsetX - mask.offsetWidth / 2;
      let top = event.offsetY - mask.offsetHeight / 2;

      if (left < 0) left = 0;
      if (left >= mask.offsetWidth) left = mask.offsetWidth - 4;
      if (top < 0) top = 0;
      if (top >= mask.offsetHeight) top = mask.offsetHeight - 4;

      let maskMove = event.target.offsetWidth - mask.offsetWidth;
      let bigImgMove = bigImg.offsetWidth - maxBox.offsetWidth;
      let scale = maskMove / bigImgMove;

      bigImg.style.top = -top / scale + "px";
      bigImg.style.left = -left / scale + "px";

      mask.style.left = left + "px";
      mask.style.top = top + "px";
    },
  },
  mounted() {
    this.$bus.$on("changeImage", (index) => {
      this.imgIndex = index;
    });
  },
};
</script>

<style lang="less" scoped>
.preview {
  width: 400px;
  height: 400px;
  border: 1px solid #dfdfdf;
  .jqzoom {
    cursor: pointer;
    width: 400px;
    height: 400px;
    position: relative;
    overflow: hidden;
    img {
      width: 400px;
      height: 100%;
    }
    .event {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
    }
    .mask {
      // display: none;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.5);
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid #ddd;
    }
  }
  .maxbox {
    // display: none;
    width: 400px;
    height: 400px;
    position: absolute;
    left: 420px;
    top: 0px;
    overflow: hidden;
    z-index: 20;
    border: 1px solid #ddd;
    img {
      position: absolute;
      width: 800px;
      height: 800px;
      display: block;
    }
  }

  // &:hover {
  //   & .mask {
  //     display: block;
  //   }
  //   & .maxbox {
  //     display: block;
  //   }
  // }
}
</style>
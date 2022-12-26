<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <GoodsRank />
    <YouLike />
    <GoodsFloor v-for="floor in floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import GoodsRank from "@/pages/Home/GoodsRank";
import YouLike from "@/pages/Home/YouLike";
import GoodsFloor from "@/pages/Home/GoodsFloor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    TodayRecommend,
    GoodsRank,
    YouLike,
    GoodsFloor,
    Brand,
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  mounted() {
    // 获取 floor 数据
    this.$store.dispatch("home/getFloorList");
    // 获取用户信息
    this.$store.dispatch("user/getUserInfo");
  },
};
</script>

<style>
</style>
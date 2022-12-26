<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHideFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 发送请求, 获取导航数据
    this.$store.dispatch("home/categoryList");
  },
};
</script>

<style lang="less">
</style>

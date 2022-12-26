<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="enterShow" @mouseleave="leaveHide">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShowSort">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
                @mouseleave="leaveIndex"
              >
                <!-- 一级导航 -->
                <h3
                  @mouseenter="changeIndex(index)"
                  :data-category-name="c1.categoryName"
                  :data-category1-id="c1.categoryId"
                >
                  <a
                    :data-category-name="c1.categoryName"
                    :data-category1-id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <!-- 二级导航 -->
                        <a
                          :data-category-name="c2.categoryName"
                          :data-category2-id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <!-- 三级导航 -->
                          <a
                            :data-category-name="c3.categoryName"
                            :data-category3-id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShowSort: false,
    };
  },
  mounted() {
    // 在 home 页面, 显示 sort 区域
    if (this.$route.path === "/home") {
      this.isShowSort = true;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // 鼠标移入 sort, 防抖
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    // 鼠标离开 sort
    leaveIndex() {
      this.currentIndex = -1;
    },
    // 鼠标移入商品分类
    enterShow() {
      // 进行显示 sort 区域
      this.isShowSort = true;
    },
    // 鼠标移出商品分类
    leaveHide() {
      // 除 home 页面外, 进行隐藏 sort 区域
      if (this.$route.path !== "/home") {
        this.isShowSort = false;
      }
    },
    // 跳转搜索页面
    goSearch(event) {
      let { categoryName, category1Id, category2Id, category3Id } =
        event.target.dataset;
      // 封装数据
      let location = { name: "search" };
      let query = { categoryName };
      let params = this.$route.params;
      // 合并参数
      if (params) location.params = params;

      // 过滤出一级、二级和三级导航, 并跳转路由
      if (categoryName) {
        if (category1Id) {
          // 一级导航
          query.category1Id = category1Id;
        } else if (category2Id) {
          // 二级导航
          query.category2Id = category2Id;
        } else {
          // 三级导航
          query.category3Id = category3Id;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
  },
};
</script>

<style lang="less" scope>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 47px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            cursor: pointer;

            a {
              color: #333;
              cursor: pointer;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              a {
                cursor: pointer;

                &:hover {
                  color: red;
                }
              }

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
          &.cur {
            background-color: skyblue;
          }
        }
      }
    }

    .sort-enter,
    .sort-leave-to {
      opacity: 0;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.15s linear;
    }
    .sort.leave,
    .sort-enter-to {
      opacity: 1;
    }
  }
}
</style>
<template>
  <!-- 分页器 -->
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li
          class="prev"
          :class="{ disabled: pageNo == 1 || total == 0 }"
          @click="prev"
        >
          <a>«上一页</a>
        </li>
        <li v-show="startAndEnd.start >= 2" @click="$emit('getPageInfo', 1)">
          <a>1</a>
        </li>
        <li class="dotted" v-show="startAndEnd.start > 2">
          <span>...</span>
        </li>

        <li
          v-for="(page, index) in startAndEnd.end"
          :key="index"
          :class="{ active: pageNo == page }"
          v-show="page >= startAndEnd.start"
          @click="$emit('getPageInfo', page)"
        >
          <a>{{ page }}</a>
        </li>

        <li class="dotted" v-show="startAndEnd.end < this.pageTotal - 1">
          <span>...</span>
        </li>
        <li
          v-show="startAndEnd.end < this.pageTotal"
          @click="$emit('getPageInfo', pageTotal)"
        >
          <a>{{ pageTotal }}</a>
        </li>
        <li
          class="next"
          :class="{ disabled: pageNo == pageTotal || total == 0 }"
          @click="next"
        >
          <a>下一页»</a>
        </li>
      </ul>
      <div>共 {{ total }} 条</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 页面总数
    pageTotal() {
      return Math.ceil(this.total / this.pageSize);
    },
    startAndEnd() {
      let start = 0,
        end = 0;
      if (this.continues > this.pageTotal) {
        start = 1;
        end = this.pageTotal;
      } else {
        start = this.pageNo - 2;
        end = this.pageNo + 2;

        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.pageTotal) {
          end = this.pageTotal;
          start = end - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    // 上一页
    prev() {
      if (this.pageNo <= 1 || this.total == 0) {
        return;
      }
      this.$emit("getPageInfo", this.pageNo - 1);
    },
    // 下一页
    next() {
      if (this.pageNo >= this.pageTotal || this.total == 0) {
        return;
      }
      this.$emit("getPageInfo", this.pageNo + 1);
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  margin: 0 auto;
  width: 830px;
  height: 66px;
  overflow: hidden;
  .sui-pagination {
    margin: 18px 0;
    ul {
      margin-left: 0;
      margin-bottom: 0;
      margin-right: 15px;
      vertical-align: middle;
      float: left;
      li {
        margin: 0 3px;
        line-height: 18px;
        display: inline-block;
        cursor: pointer;
        a {
          position: relative;
          float: left;
          line-height: 18px;
          text-decoration: none;
          background-color: #fff;
          border: 1px solid #e0e9ee;
          margin-left: -1px;
          font-size: 14px;
          padding: 9px 18px;
          color: #333;
        }
        &:first-child {
          a {
            margin-left: 0;
          }
        }
        &.active {
          a {
            margin-left: 0;
            background-color: #fff;
            color: #fff;
            border-color: #fff;
            cursor: pointer;
            background-color: #e1251b;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
          }
        }
        &.disabled {
          a {
            color: #999;
            cursor: default;
          }
        }
        &.dotted {
          cursor: default;
          span {
            margin-left: 0;
            position: relative;
            float: left;
            line-height: 18px;
            text-decoration: none;
            background-color: #fff;
            font-size: 14px;
            // border: 1px solid #f6f6f6;
            padding: 9px 18px;
            color: #333;
          }
        }
        &.next {
          a {
            background-color: #fafafa;
          }
        }
      }
    }
    div {
      float: left;
      padding: 0 10px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #333;
      border: 1px solid #e0e9ee;
      background-color: #fafafa;
    }
  }
}
</style>
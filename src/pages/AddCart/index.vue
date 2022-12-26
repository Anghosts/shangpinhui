<template>
  <div class="cart">
    <div class="w">
      <div class="top clearfix">
        <span></span>
        <p class="title">商品已成功加入购物车!</p>
      </div>
      <div class="bottom clearfix">
        <div class="left">
          <div class="shopImg"><img :src="skuInfo.skuImg" /></div>
          <div class="shopData">
            <p class="title">{{ skuInfo.skuName }}</p>
            <p class="attr">
              <span v-for="attr in skuInfo.attr" :key="attr.id">
                {{ attr.saleAttrName }}：{{ attr.saleAttrValueName }}
              </span>
            </p>
            <p class="count">数量：{{ skuNum }}</p>
          </div>
        </div>
        <div class="right">
          <router-link class="detail" :to="`/detail/${skuInfo.skuId}`">
            查看商品详情
          </router-link>
          <router-link class="goCart" to="/shopcart">
            去购物车结算 &gt;
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCart",
  computed: {
    skuNum() {
      return this.$route.query.skuNum;
    },
    skuInfo() {
      return JSON.parse(sessionStorage.getItem("SKUINFO"));
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  padding-top: 10px;
  height: 150px;
  background-color: #f4f4f4;
  .w {
    width: 1200px;
    margin: 0 auto;

    .top {
      > span {
        float: left;
        width: 2px;
        height: 30px;
        border: 2px solid #79963e;
        border-radius: 3px;
        background-color: #79963e;
      }
      .title {
        float: left;
        margin-left: 5px;
        line-height: 30px;
        font-size: 18px;
        font-weight: 600;
        color: #79963e;
      }
    }

    .bottom {
      margin-top: 20px;
      .left {
        float: left;
        width: 740px;
        .shopImg {
          float: left;
          margin-right: 20px;
          width: 80px;
          height: 80px;
          border: 1px solid #999;

          img {
            width: 80px;
            height: 80px;
          }
        }

        .shopData {
          padding-top: 3px;

          .title {
            font-size: 14px;
            font-weight: 500;
          }

          .attr {
            margin-top: 5px;
            color: #999;

            > span {
              margin-right: 20px;
            }
          }

          .count {
            margin-top: 2px;
            color: #999;
          }
        }
      }

      .right {
        box-sizing: border-box;
        float: right;
        height: 32px;
        text-align: center;
        border: 1px solid #ccc;
        background-color: #ededed;

        .detail,
        .goCart {
          float: left;
          width: 200px;
          height: 100%;
          font-size: 14px;
          line-height: 30px;
          cursor: pointer;
        }

        .goCart {
          border-left: 1px solid #ccc;
        }
      }
    }
  }
}
</style>
<template>
  <!-- 购物车列表 -->
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo in cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked == 1"
              @change="updateCheck(cartInfo.skuId, $event.target.checked)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handlerCount('minus', -1, cartInfo)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                handlerCount('change', $event.target.value * 1, cartInfo)
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handlerCount('add', 1, cartInfo)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShopCartList(cartInfo.skuId)">
              删除
            </a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          :disabled="cartInfoList.length == 0"
          @change="checkAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalPrice.count }}</span> 件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice.sum }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade"> 结算 </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";

export default {
  name: "ShopCart",
  methods: {
    // 请求购物车数据
    getData() {
      this.$store.dispatch("shopCart/getShopCartList");
    },
    // 修改商品购买数量
    handlerCount: throttle(async function (type, count, cart) {
      switch (type) {
        case "add":
          count = 1;
          break;
        case "minus":
          count = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(count) || count < 1) {
            count = 0;
          } else {
            count = parseInt(count) - cart.skuNum;
          }
          break;
      }
      // 向服务器更新数据
      this.$store
        .dispatch("detail/addShopCartOrUpdate", {
          skuId: cart.skuId,
          skuNum: count,
        })
        .then(
          () => {
            // 更新页面请求
            this.getData();
          },
          () => {
            alert("操作失败!");
          }
        );
    }, 1000),
    // 删除某一个商品
    deleteShopCartList(skuId) {
      this.$store.dispatch("shopCart/deleteShopCartList", skuId).then(
        () => {
          // 更新页面请求
          this.getData();
        },
        () => {
          alert("操作失败!");
        }
      );
    },
    // 切换商品选中状态
    async updateCheck(skuId, isChecked) {
      isChecked = isChecked ? 1 : 0;
      await this.$store
        .dispatch("shopCart/updateCheck", { skuId, isChecked })
        .then(
          () => {
            this.getData();
          },
          () => {
            alert("操作失败!");
          }
        );
    },
    // 删除选中商品
    async deleteCheckedAll() {
      await this.$store.dispatch("shopCart/deleteCheckedAll").then(
        () => {
          this.getData();
        },
        () => {
          alert("操作可能有误!");
        }
      );
    },
    // 全选或取消全选
    async checkAll(event) {
      await this.$store
        .dispatch("shopCart/checkAll", event.target.checked)
        .then(
          () => {
            this.getData();
          },
          () => {
            alert("操作可能有误!");
          }
        );
    },
  },
  computed: {
    ...mapGetters("shopCart", ["shopCartList"]),
    // 购物车数据
    cartInfoList() {
      return this.shopCartList.cartInfoList || [];
    },
    // 总价格和选中的商品数量
    totalPrice() {
      let sum = 0;
      let count = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          sum += item.cartPrice * item.skuNum;
          count++;
        }
      });
      return { sum, count };
    },
    // 是否为全选状态
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0 4px;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 10px 0 15px;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 4.1667%;
        }
        .cart-list-con2 {
          width: 25%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con3 {
          width: 20.8333%;
          .item-txt {
            text-align: center;
          }
        }
        .cart-list-con4 {
          width: 12.5%;
        }
        .cart-list-con5 {
          width: 12.5%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }
          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }
        .cart-list-con6 {
          width: 12.5%;
          .sum {
            font-size: 16px;
          }
        }
        .cart-list-con7 {
          width: 12.5%;
          a {
            color: #666;
            cursor: pointer;

            &:hover {
              color: red;
            }
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      span {
        vertical-align: middle;
      }
      input {
        vertical-align: middle;
        margin-right: 5px;
      }
    }
    .option {
      padding: 10px;
      overflow: hidden;
      float: left;
      a {
        float: left;
        padding: 0 10px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
    .money-box {
      float: right;
      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }
      .sumprice {
        vertical-align: middle;
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        > em {
          vertical-align: middle;
        }
        .summoney {
          vertical-align: middle;
          color: #c81623;
          font-size: 16px;
          line-height: 22px;
        }
      }
      .sumbtn {
        float: right;
        margin-left: 20px;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
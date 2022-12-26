<template>
  <div>
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go">
          我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
          type="text"
          placeholder="请输入你的手机号"
          v-model="phone"
          @blur="BlurPhone"
        />
        <span class="error-msg" v-text="phoneMsg"></span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
          type="text"
          placeholder="请输入验证码"
          v-model="code"
          @blur="BlurCode"
        />
        <button class="getCode" @click="getCode">获取验证码</button>
        <span class="error-msg" v-text="codeMsg"></span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          placeholder="请输入你的登录密码"
          v-model="password"
          @blur="BlurPassword"
        />
        <span class="error-msg" v-text="passwordMsg"></span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          placeholder="请输入确认密码"
          v-model="samePassword"
          @blur="BlurSamePassword"
        />
        <span class="error-msg" v-text="samePasswordMag"></span>
      </div>
      <div class="controls">
        <input
          name="m1"
          type="checkbox"
          :checked="agree"
          @click="agree = !agree"
          @change="changeAgree"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg" v-text="agreeMsg"></span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: "",
      code: "",
      password: "",
      samePassword: "",
      agree: false,

      phoneMsg: "",
      codeMsg: "",
      passwordMsg: "",
      samePasswordMag: "",
      agreeMsg: "",
    };
  },
  methods: {
    // 发送请求,获取验证码
    getCode() {
      // 验证手机号格式
      this.BlurPhone();
      if (this.phoneMsg) return;

      this.$store.dispatch("user/getCode", this.phone).then(
        (code) => {
          this.code = code;
        },
        (error) => {
          alert(error);
        }
      );
    },
    // 注册
    userRegister() {
      this.BlurAgree();
      this.BlurPhone();
      this.BlurPassword();
      this.BlurSamePassword();

      let { phone, code, password, samePassword, agree } = this;
      let { phoneMsg, codeMsg, passwordMsg, samePasswordMsg, agreeMsg } = this;
      let userData = phone && code && samePassword == password && agree;
      let errMsg =
        phoneMsg && codeMsg && samePasswordMsg && passwordMsg && agreeMsg;

      if (userData && !errMsg) {
        this.$store
          .dispatch("user/userRegister", { phone, code, password })
          .then(
            () => {
              alert("注册成功！请牢记您的手机号和密码！");
              this.$router.push({ path: "/login" });
            },
            (error) => {
              alert(error);
            }
          );
      }
    },

    // 手机号验证
    BlurPhone() {
      this.phoneMsg = "";
      if (!this.phone) {
        this.phoneMsg = "手机号不能为空！";
      } else if (this.phone.length != 11) {
        this.phoneMsg = "手机号格式不对！";
      }
    },
    // 验证码验证
    BlurCode() {
      this.codeMsg = "";
      if (!this.code) {
        this.codeMsg = "请输入验证码！";
      }
    },
    // 密码验证
    BlurPassword() {
      this.passwordMsg = "";
      if (!this.password) {
        this.passwordMsg = "密码不能为空！";
      } else if (this.password.length < 6 || this.password.length > 20) {
        this.passwordMsg = "密码不能小于6位或者大于20位！";
      }
    },
    // 确认密码验证
    BlurSamePassword() {
      this.samePasswordMag = "";
      if (this.samePassword != this.password) {
        this.samePasswordMag = "确认密码必须要跟登录密码一致！";
      }
    },
    // 用户协议验证
    BlurAgree() {
      this.agreeMsg = "";
      if (this.agree === false) {
        this.agreeMsg = "请勾选同意协议！";
      }
    },
    changeAgree() {
      if (this.agree) this.agreeMsg = "";
    },
  },
};
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 23px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    .getCode {
      vertical-align: top;
      padding: 0 10px;
      margin-left: 5px;
      height: 38px;
      cursor: pointer;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: top;
      margin-right: 5px;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 20px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
  }
}

.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>
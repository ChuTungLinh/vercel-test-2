<template>
  <div class="login mt-6">
    <el-card class="d-lext align-items-centers">
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="userName">
          <el-input v-model="model.userName" placeholder="Username" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login</el-button>
        </el-form-item>
        <a class="forgot-password" href="https://oxfordinformatics.com/">Forgot password ?</a>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Card, Form, FormItem, Input, Button } from "element-ui";
import { Message } from 'element-ui';
import Cookies from "js-cookie"
export default {
  name: "login",
  components: {
    [Card.name]:Card,
    [Form.name]:Form,
    [FormItem.name]:FormItem,
    [Input.name]:Input,
    [Button.name]:Button,
    [Message.name]:Message
  },
  data() {
    return {
      validCredentials: {
        username: "lightscope",
        password: "lightscope"
      },
      model: {
        userName: "",
        password: ""
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
        ]
      }
    };
  },
  methods: {
  
   async  login() {
       this.loading = true
            let params = Object.assign({}, this.model)
            this.$api.login.login(params).then((res) => {
        if (res.msg != null) {
          if (res.code == 300) {
               Message({
              message: 'Đăng nhập thành công!',
              type: 'success',
            })

          } else {
            Message({
              message: 'sai đăng nhập',
              type: 'error'
            })
          }

        } else {
          Cookies.set('token', res.data.token)
          Cookies.set('user', res.data.name) // Place a token in a cookie
          // sessionStorage.setItem('user', res.data.name) //save user to local session
          // this.$store.commit('menuRouteLoaded', false)  //request to reload the navigation menu

          this.$router.push('/')
       
        }
        this.loading = false
      })
      .catch((res) => {
        Message({
           message: 'Đăng nhập thất bại!',
         type: 'error'
        })
        this.loading = false
      });
    },}}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">

.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}

.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>

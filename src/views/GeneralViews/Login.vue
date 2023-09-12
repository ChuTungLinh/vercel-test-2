<template>
  <div id="wrapper">
    <div id="login-popup">      
      <el-form id="form-login" :model="loginForm">
          <h1 class="form-heading">HỆ THỐNG</h1>
          <h1 class="form-heading mb-4">QUẢN LÝ CẤP NƯỚC</h1>      
          <card class="card">
            <label>Tên đăng nhập:</label>
            <el-input placeholder="Tên đăng nhập" v-model="loginForm.userName">
              <template slot="prepend">
                <i class="fas fa-user"></i>
              </template>
            </el-input>

            <label class="mt-2">Mật khẩu:</label>
            <el-input placeholder="Nhập mật khẩu"  v-model="loginForm.password" @keyup.enter.native="handleLogin" show-password>
              <template slot="prepend">
                <i class="fas fa-lock"></i>
              </template>
            </el-input>

            <el-button type="success" class="mt-4" style="width: 100%" @click.native.prevent="handleLogin" :loading="loading">ĐĂNG NHẬP</el-button>

            <div class="pt-3 pl-1">
              <base-checkbox :checked="true" :inline ="true"> Ghi nhớ mật khẩu</base-checkbox>
            </div>
          </card>
      </el-form>
    </div>
  </div>
 
</template>
<script>
import Cookies from "js-cookie"

export default{
  name: 'Login',
  components:{
    // selectcompany
  },
  data(){
    return{
      loading: false,
      dialogVisible: false,
      loginForm:{
        userName:'',
        password: '',
      },
    }
    
  },
  methods:{
    handleLogin() {
      this.loading = true
      let userInfo = {userName: this.loginForm.userName, password: this.loginForm.password}      
      this.$api.login.login(userInfo).then((res) => {
        if (res.code == 200 && res.data) 
        {
          Cookies.set('token', res.data.token)
          Cookies.set('user', res.data.cTenTaiKhoan) // Place a token in a cookie
          localStorage.setItem('token',res.data.token)    
          this.$store.commit("setUserInfo", userInfo)

          if(res.data.nMaNhomQuyen == 1)
            this.$router.push('/admin/dashboard')
          else
            this.$router.push('/SelectCompany')          
        }
        else 
            this.$message({ message: (res.msg), type: 'error' })
        
        this.loading = false
      }).catch((res) => {
        this.$message({ message: (res.message), type: 'error'})
        this.loading = false
      });
    },
  }
}
</script>
<style scoped>
  label {
    margin-bottom: 0.2rem;
  }

  #wrapper{
    min-height: 100vh;
    width: 100%;
    background: url('../../../public/img/background/bg2.jpg');
    background-size: cover;
    background-position-y: -80px;
    font-size: 16px;
  }
  
  
  #login-popup {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
  }

  #form-login{
    width: 100%;
    justify-content: center;
    align-items: center;
    max-width: 450px;
    background: #eff1f3; 
    flex-grow: 1;
    padding: 20px 15px 15px 15px;
    
    /* box-shadow: 0px 0px 17px 1px rgba(255, 255, 255, 0.8); */
  }
  .form-heading {
    font-size: 25px;
    color: #555;
    text-align: center;
    /* margin-bottom: 30px; */
  }
  
  .card {
    margin-bottom: 15px;
    background-color: #f7f7f7;
  }
  
</style>

<style>
    #form-login .form-input input.el-input__inner {
        background: transparent;
        border: 0;
        outline: 0;
        color: #000000;
        flex-grow: 1;
    }

    #form-login .el-input-group__prepend {
      width: 50px;
      padding: 0px;
      text-align: center;
      color: #495057;
      font-size: 16px;
    }
</style>

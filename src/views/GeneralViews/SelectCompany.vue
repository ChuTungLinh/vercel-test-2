<template>
  <div class="content">
    
    <div id="container">
      <div class="text-container text-center">
        <h1>HỆ THỐNG QUẢN LÝ BÁN HÀNG</h1>
      </div>
      <!-- <div class="">abc</div> -->
      <div class="list-item-container text-center container text-lg row">
        <div class="item-container col-2 test" v-for="item in listcompany" :key="item.id">
          <div  @click="selectCompany(item)">
            <div class="company-item-container ">
            <img :src="item.nImage" >
            <!-- <img src="/img/background/company.jpg" alt=""> -->
          </div>
          <div class="icon-item-container">{{item.cTenCongTy}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie"
import {baseUrl} from '@/util/global'
import {mapState} from 'vuex'
  export default{
    data(){
      return{
        listcompany:null,
      }
    },
    computed:{
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    methods:{
      delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
      selectcompany(){
        this.$api.selectcompany.selectcompany({}).then((res)=> {
          if(res.code == 200 && res.data)
          {
            let list = res.data.content
            for(let i = 0; i < list.length; i++) {
              if(list[i].image)
                  list[i].nImage = baseUrl + "/package/img/" + list[i].image
              else
                  list[i].nImage = "/img/background/logo2.png"
            }
            this.listcompany = list
          }
          else
          {
            this.listcompany = []
          }
        })
      },
      logout(){
        this.$confirm('Bạn có muốn thoát không?', 'Thoát',{
              confirmButtonText:'Đồng ý',
              cencelButtonText: 'Hủy'
        }).then(() => {
          Cookies.remove("user");
          Cookies.remove("token");
          localStorage.removeItem("id")
          localStorage.removeItem("token");
          this.$router.push("/login")
        })
      },

      
      selectCompany:function(val){

        // Reset token 
        const data = this.userInfo
        data.companyId = val.nMaCongTy
       
        this.$api.login.updateToken(data) .then((res) => {
          Cookies.set('token', res.msg)
          localStorage.setItem('token', res.msg)
        })

        localStorage.setItem("companyName", val.cTenCongTy)
        localStorage.setItem('id',val.nMaCongTy)
        Cookies.set('id',val.nMaCongTy)
        this.$router.push('/dashboard')
        
      },
      handleHover(){
          
      }
    },
    mounted(){
      this.selectcompany()
      
    },
  }
</script>
<style scoped>
.content{
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100%;
  background: url("../../../public/img/background/bg3.jpg") no-repeat ;
  -webkit-background-size: cover;  
  -moz-background-size: cover;  
  -o-background-size: cover;  
  background-size: cover;
}

#container {
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  position: absolute;
  /* display: flex; */
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
}

#header-selectCompany{
  background: #5fb0be;
  height: 90px;
  padding: 0;
}

#header-selectCompany .left-header-selectCompany{
  float: left;
  width: 216px;
}

#header-selectCompany .right-header-selectCompany {
  float: right;
}

.text-container {
  height: 100px;
}

.text-container h1 {
  font-size: 48px;
  color: #ffffff;
}

#header-selectCompany .right-header-selectCompany .item{
  position: relative;
  padding-bottom: 60px;
  padding-top: 30px;
  padding-left: 15px;
  padding-right: 15px;
  margin-right: 40px;
}

#header-selectCompany .right-header-selectCompany  li{
  list-style-type: none;
  height: 36px;
  font-size: 16px;
  text-align: center;
  padding: 2px;

}

#header-selectCompany .right-header-selectCompany .subnav{
  position: absolute;
  left: 0;
  right: auto;
  max-width: 245px;
  width: 198px;
  background-color: #E3E6F0;
  margin-top: 60px;
  padding-left: 0;
  display: none;
}

#header-selectCompany .right-header-selectCompany a{
  text-decoration: none;
  color: black;
}

.right-header-selectCompany > li:hover,
.subnav li:hover{
  color: black;
  background-color: #c4c4c5;
  cursor: pointer;
  z-index: 1;
}

.subnav li{
  border-bottom: 2px solid #ccc;
}

.right-header-selectCompany > li:hover .subnav{
  display: block !important;
  background: red;
}

#header-selectCompany .right-header-selectCompany img{
  margin-left: 5px;
  margin-top: -3px;
  height: 32px;
  display: inline-block;
  float: left;
}

.list-item-container{
  opacity: 1;
}

.list-item-container.text-center.container.text-lg.row {
  padding: 0;
  margin: auto;
  justify-content: center;
}

.item-container{
  margin: 3px;
  min-width: 24%;
  height: auto;
  padding-bottom: 40px;
  padding-top:20px;
/*   background-color: #42C2FF; */
}

.item-container img {
  width: 40%;
  border-radius: 15px;
  border: 1px solid #ccc;
}

.icon-item-container {
  font-size: 24px;
  color: white;
  margin-top: 10px;
}

.icon-item-container::after{
  content: "";
  border-bottom: 1px solid #fff;
  display: flex;
  width: 26%;
  position: relative;
  padding-top: 3px;
  left: 37%;
}

.item-container:hover >.icon-item-container::after {
  width: 25%;
  left: 38%;
}
.item-container:hover{
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
$color: #0cf;

@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}


@keyframes opacityChange {
	50% {
		opacity:1;
	}
	100% {
		opacity: .5;
	}
}

.test {
  border-radius: 5px;
  display: inline-block;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  background-color: $color;
  &:hover {
	&::before {
		content: '';
		position: absolute;
		z-index: -2;
		left: -50%;
		top: -50%;
		width: 200%;
		height: 200%;
		background-color: #399953;
		background-repeat: no-repeat;
		background-size: 50% 50%, 50% 50%;
		background-position: 0 0, 100% 0, 100% 100%, 0 100%;
		background-image: linear-gradient(#399953, #399953), linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
		animation: rotate 4s linear infinite;
	}
	
	&::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 3px;
		top: 3px;
		width: calc(100% - 6px);
		height: calc(100% - 6px);
		background: $color;
		border-radius: 2px;
	}



    /* &::before {
		content: '';
		position: absolute;
		z-index: -2;
		left: -50%;
		top: -50%;
		width: 200%;
		height: 200%;
		background-color: $color;
		background-repeat: no-repeat;
		background-size: 50% 50%;
		background-position: 0 0;
		background-image: conic-gradient(white,rgb(245, 253, 255), #0cf,#0cf,#0cf);
		animation: rotate 4s linear infinite;
	}
	
	&::after {
		content: '';
		position: absolute;
		z-index: -1;
		left: 6px;
		top: 6px;
		width: calc(100% - 12px);
		height: calc(100% - 12px);
		background: $color;
		border-radius: 5px;
	} */
    .icon-item-container{
      &:after{
        width:50%;
        left: 25%;
        transition: all .3s;
      }
    }
  }
}

/* optional reset for presentation *//* 
.container {
  padding-top: 50px;
  margin: 0 auto;
  width: 100%;
  text-align: center;
}
span {
  display: block;
  margin-top: 2rem;
  font-size: .7rem;
  color: #777;
  a {
    font-size: .7rem;
    color: #999;
    text-decoration: underline;
  }
} */


</style>

<template>
     <body>
  <div id="header-selectCompany" class="container">
    <div class="left-header-selectCompany d-flex align-items-center">
      <img src="https://app.citywork.vn/gCloudWeb/gHomeAppCloud/Resources/images/logo.png" alt="">
    
    </div>
    <div class="right-header-selectCompany">
      <li class="item">
        <a>
          <img src="https://app.citywork.vn/Data/Sites/1/skins/gCityWork/img/user.png" alt=""></a>
        <ul class="subnav" style="text-align: center">
        </ul>
      </li>
    </div>

  </div>
  <div id="container-selectCompany container">
    <div class="text-container text-center" style="margin-top:12px;">
      <h1>Hệ thống quản lý bán hàng</h1>
    </div>

    <div class ="d-flex justify-content-center flex-wrap" style="gap: 20px">
        <div class="item-select color-dash" @click="selected(1)">
            <div class="image">
                <img src="../../../public/img/monitor.png"/>
            </div>
            <span class="text">Dashboard</span>
        </div>
        <div class="item-select color-selectCorp" @click="selected(2)">
            <div class="image">
                <img src="../../../public/img/company.png"/>
            </div>
            <span class="text">Quản lý công ty</span>
        </div>
     

    </div>

    </div>
  <div id="footer-selectCompany"></div>

  </body>
</template>

<script>
    export default{
    data(){
        return {
           
        }
    },

    methods:{
        selected(value){
           if(value == 1){
            this.$router.push("/dashboard");
           }
           if(value == 2){
            this.$router.push("/company/findByUserId")
           }
        }
    },
    mounted(){
      
    }
} 


</script>



<style scoped>
    body{
      margin: 0;
      padding: 0;
      background: url("../../../public/img/background/background-company.jpg") no-repeat ;
      -webkit-background-size: cover;  
      -moz-background-size: cover;  
      -o-background-size: cover;  
      background-size: cover;  
    }

    .item-select{
        cursor: pointer;
        width: 200px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 25px 0px;
       
    }

    .color-dash{
        background-color: #27ae60bf;
    }

    .color-selectCorp{
        background-color: #f1c40fbf;
    }

    .image img {
        width: 70px;
        height: 70px;
    }

    .text {
        margin-top: 25px;
        font-size: 24px;
        font-weight: 500;
    }

    #header-selectCompany{
      background: #5fb0be;
      height: 90px;
      padding: 0;
    }
    #header-selectCompany .left-header-selectCompany{
      float: left
    }
    #header-selectCompany .right-header-selectCompany{
    
      float: right;
    }
    .text-container{
      height: 75px;
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
    /*#header-selectCompany .right-header-selectCompany > li{*/
    /*  display: inline-block;*/
    /*}*/
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
      padding-bottom: 10px;
      padding-top:6px
    }
    .item-container img {
      width: 40%;
      border-radius: 15px;
      border: 1px solid #ccc;
    }
    .icon-item-container{
      font-size: 26px;
    }
    .icon-item-container::after{
      content: "";
      border-bottom: 1px solid black;
      display: flex;
      width: 15%;
      position: absolute;
      left: 43%;
    }
    .item-container:hover >.icon-item-container::after {
      width: 25%;
      left: 38%;
    }
    .item-container:hover{
      cursor: pointer;
    }
    </style>
    
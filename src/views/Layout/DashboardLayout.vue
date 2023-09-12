<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboards',
            icon: 'ni ni-shop text-primary',
            path: '/dashboard',
          }"
        >
        </sidebar-item>
        <sidebar-item
          v-for="(link) in navTree"
          :key="link.nMaChucNang"
          :link="{
            name: link.cTenChucNang,
            icon: link.cIcon,
          }"
        >
          <sidebar-item
            v-for="(link) in link.children"
            :key="link.nMaChucNang"
            :link="{
              name: link.cTenChucNang,
              icon: link.cIcon,
              path: link.cUrl,
            }"
          >
          </sidebar-item>
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <BaseNav
        class="navbar-horizontal navbar-main BN"
        type="white"
        expand="lg"
        menu-classes="justify-content-end"
        style="box-shadow: 1px 1px 5px 0px #ccc; position: relative"
      >
        <div class="mr-auto d-flex align-items-center BN-i">
          <a href="#" slot="brand" class="navbar-wrapper">
            <img
              :src="logoURL"
              style=" width: 50px; border-radius:50%"
            />
          </a>
          <h5>{{ this.companyName }}</h5>
        </div>

        <b-navbar>
          <b-navbar-nav>
            <b-navbar-brand>
              <span class="BN-t" style="margin-right: 10px; text-transform: capitalize"
                >Xin chào {{ this.user }}</span
              >
              <img
                src="/img/avata-default.jpg"
                alt="Kitten"
                style="border-radius: 50%; width: 40px; height: 40px"
              />
            </b-navbar-brand>
            <b-nav-item-dropdown text="" right>
              <b-dropdown-item href="#" @click="handleOpenInfo">Thông tin tài khoản</b-dropdown-item>
              <b-dropdown-item href="#" @click="handleOpenChangePW">Đổi mật khẩu</b-dropdown-item>
              <b-dropdown-item @click="logout" >Đăng xuất</b-dropdown-item>              
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar>
      </BaseNav>

      <div @click="$sidebar.displaySidebar(false)">
        <zoom-center-transition
          :duration="200"
          origin="center top"
          mode="out-in"
        >
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import { ZoomCenterTransition } from "vue2-transitions";
import { BaseNav } from "../../components";
import Cookies from "js-cookie";
import { mapState } from "vuex";
import store from "../../store"

export default {
  components: {
    BaseNav,
    ZoomCenterTransition,
  },
  data() {
    return {
      user: "",
      companyName: "",
      logoURL: '',
    };
  },
  computed: {
    ...mapState({
      navTree: (state) => state.menu.navTree,
    }),
  },

  methods: {
    handleOpenChangePW(){
      this.$router.push("/changePW")
    },
    handleOpenInfo(){
      this.$router.push("/accountInfo")
    },
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    },
    getuser() {
      const user = Cookies.get("user");
      this.companyName = localStorage.getItem("companyName");
      this.user = user;
    },
    logout() {
      this.$confirm("Bạn có muốn thoát không?", "Thoát", {
        confirmButtonText: "Đồng ý",
        cencelButtonText: "Hủy",
      }).then(() => {
        Cookies.remove("user");
        Cookies.remove("token");
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        store.commit('menuRouteLoaded', false);
        this.$router.push("/login");
      });
    },
  },

  mounted() {
    this.$api.account.checkAdmin().then((res) => {
      if(res.data == 1) this.$router.push('/admin/dashboard')
    }).catch((err) => {
      
    });
    this.$api.company.getLogo().then((res) => {
      this.logoURL = '/img/company/' + res.msg
    }).catch((err) => {
      
    });
    this.initScrollbar();
    this.getuser();
  },
};
</script>
<style lang="scss" scoped>
h5 {
  margin-left: 10px;
    font-size: 1.25rem;
}
.BN-i{
  margin: 10px 0 10px 0;
}
@media (max-width: 750px){
  .BN{
    .BN-i{
      display: none !important;;
    }
  }
}
@media(max-width: 375px){
  .BN{
    .BN-t{
      display: none !important;
    }
  }
}

</style>

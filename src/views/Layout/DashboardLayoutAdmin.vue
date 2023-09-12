<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        
        <sidebar-item
          :link="{
            name: 'Trang chủ',
            icon: 'ni ni-shop text-primary',
            path: '/admin/dashboard',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Quản lý hệ thống',
            icon: 'fa fa-cog',
          }"
        >        
          <sidebar-item
            :link="{
              name: 'Quản lý tài khoản',
              icon: '',
              path: '/admin/account',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Quản lý công ty',
              icon: '',
              path: '/admin/company',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Quản lý phân quyền',
              icon: '',
              path: '/admin/role',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Quản lý chức năng',
              icon: '',
              path: '/admin/menu',
            }"
          >
          </sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Hỗ trợ nhập dữ liệu',
            icon: 'fa fa-cog',
          }"
        >        
          <sidebar-item
            :link="{
              name: 'Nhập dữ liệu khách hàng',
              icon: '',
              path: '/admin/import-customer',
            }"
          >
          </sidebar-item>
          
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Quản lý danh mục',
            icon: 'el-icon-folder',
          }"
        >
          <sidebar-item
            :link="{
              name: 'Ngân hàng',
              icon: '',
              path: '/admin/bank',
            }"
          >
          </sidebar-item>
          <sidebar-item
            :link="{
              name: 'Trạng thái đọc chỉ số',
              icon: '',
              path: '/admin/record-status',
            }"
          >
          </sidebar-item>
        </sidebar-item>

      </template>
    </side-bar>
    <div class="main-content">
      <BaseNav
        class="navbar-horizontal navbar-main"
        type="white"
        expand="lg"
        menu-classes="justify-content-end"
        style="box-shadow: 1px 1px 5px 0px #ccc; position: relative"
      >
        <div class="mr-auto d-flex align-items-center">
          <a href="#" slot="brand" class="navbar-wrapper">
            <img
              src="../../../public/img/logo.jpg"
              style="height: 60px; width: 60px"
            />
          </a>
          <h5>{{ this.companyName }}</h5>
        </div>

        <b-navbar>
          <b-navbar-nav>
            <b-navbar-brand>
              <span style="margin-right: 10px; text-transform: capitalize"
                >Xin chào {{ this.user }}</span>
              <img
                src="/img/avata-default.jpg"
                alt="Kitten"
                style="border-radius: 50%; width: 40px; height: 40px"
              />
            </b-navbar-brand>
            <b-nav-item-dropdown text="" right>
              <b-dropdown-item href="#" @click="handleOpenInfo">Thông tin tài khoản</b-dropdown-item>
              <b-dropdown-item href="#" @click="handleOpenChangePW">Đổi mật khẩu</b-dropdown-item>
              <b-dropdown-item @click="logout">Đăng xuất</b-dropdown-item>
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
    };
  },
  computed: {
    ...mapState({
      navTree: (state) => state.menu.navTree,
    }),
  },

  methods: {
    handleOpenChangePW(){
      this.$router.push("/admin/changePW")
    },
    handleOpenInfo(){
      this.$router.push("/admin/accountInfo")
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
      if(res.data != 1) this.$router.push('/')
    }).catch((err) => {
      
    });
    this.initScrollbar();
    this.getuser();
  },
};
</script>
<style lang="scss">
</style>

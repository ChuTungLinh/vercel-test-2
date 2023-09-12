<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-light">404!</h1>
              <p class="text-lead text-white">Có lỗi xảy ra. Không tìm thấy trang hiện tại.</p>

              <!-- <router-link to="/dashboard" class="font-weight-bold text-white mt-5">Quay lại trang chủ</router-link> -->
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'not-found'
};
</script>

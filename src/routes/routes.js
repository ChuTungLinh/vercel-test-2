import NotFound from '@/views/GeneralViews/NotFoundPage.vue';
import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import DashboardLayoutAdmin from '@/views/Layout/DashboardLayoutAdmin.vue';
import login from '@/views/GeneralViews/Login.vue';
import SelectCompany from '@/views/GeneralViews/SelectCompany.vue';
import Dashboard from '@/views/Pages/Dashboard.vue';
import HomePage from '@/views/Layout/HomePage.vue';

// Hệ thống
const Account = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Sys/AccountPage.vue');
const changePW = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Account/ChangePassword.vue');
const accountInfo = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Account/AccountInfo.vue');
// HoaDon
const sochiso = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/SoChiSo.vue');
const Inhoadon = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/InHoaDon.vue');
const Nhapchiso = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/Nhapchiso.vue');

const PaymentPage = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/PaymentPage.vue');
//Báo cáo hóa đơn
const Totalwater = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/Totalwater.vue');
const Totalpayment = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/totalpayment.vue');
const kekhaikhachhang = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/kekhaikhachhang.vue');
const hoadontheonv = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/HoaDon/hoadontheonv.vue');


// Danh mục
const Doituonggia = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/DanhMuc/Doituonggia.vue');
const LoaiKhachHang = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/LoaiKhachHang.vue');
const PtThanhToan = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/PhuongThucThanhToan.vue');
const TuyenDoc = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/TuyenDoc.vue');
const Ky = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/DanhMuc/Ky.vue');
const HangSanXuat = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/HangSanXuat.vue');
const LoaiDongHo = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/LoaiDongHo.vue');
const DongHo = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/DongHo.vue');
const BangGia = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/BangGia.vue');
const Tuyen = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/Tuyen.vue');
const LoaiOng = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/LoaiOng.vue');
// const DongHoTong = () => import(/* webpackChunkName: "pages" */'@/views/Pages/DanhMuc/DongHoTong.vue');

//hợp đồng
const ContractPage = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Contract/ContractPage.vue');
const bangkekhachhangtheotuyen = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Contract/bangkekhachhangtheotuyen.vue');
const bangkekhaidanhsachkhachhang = () => import(/* webpackChunkName: "pages" */ '@/views/Pages/Contract/bangkekhaidanhsachkhachhang.vue');
//



//Quản trị viên hệ thống
const AccountPage = () => import('@/views/Pages/SysAdmin/AccountPage.vue');
const CompanyPage = () => import('@/views/Pages/SysAdmin/CompanyPage.vue');
const BankPage = () => import('@/views/Pages/SysAdmin/BankPage.vue');
const RecordStatusPage = () => import('@/views/Pages/SysAdmin/RecordStatusPage.vue');
const RolePage = () => import('@/views/Pages/SysAdmin/RolePage.vue');
const MenuPage = () => import('@/views/Pages/SysAdmin/MenuPage.vue');




const routes = [

  {
    path: '/login',
    component: login,
    name: 'login',
  },
  {
    path: '/HomePage',
    component: HomePage,
    name: 'HomePage',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import("@/views/Pages/CustomerSide/Home.vue"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/TraCuu',
        name: 'TraCuu',
        component: () => import("@/views/Pages/CustomerSide/TraCuu.vue"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/YeuCau',
        name: 'YeuCau',
        component: () => import("@/views/Pages/CustomerSide/YeuCau.vue"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/KhaoSat',
        name: 'KhaoSat',
        component: () => import("@/views/Pages/CustomerSide/KhaoSat.vue"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/Article',
        name: 'Article',
        component: () => import("@/views/Pages/CustomerSide/Article.vue"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/CheckOut',
        name: 'CheckOut',
        component: () => import("@/views/Pages/CustomerSide/CheckOut.vue"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/CheckOutFinish',
        name: 'CheckOutFinish',
        component: () => import("@/views/Pages/CustomerSide/CheckOutFinish.vue"),
        meta: {
          noBodyBackground: true
        }
      },
    ]
  },

  {
    path: '/SelectCompany',
    component: SelectCompany,
    name: 'SelectCompany',
  },

  {
    path: '/',
    component: DashboardLayout,
    name: 'Authentication',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/changePW',
        name: 'changePW',
        component: changePW,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/accountInfo',
        name: 'accountInfo',
        component: accountInfo,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/sysTaikhoan',
        name: 'quanlytaikhoan',
        component: Account,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/sochiso',
        name: 'sochiso',
        component: sochiso,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/inhoadon',
        name: 'inhoadon',
        component: Inhoadon,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/doituonggia',
        name: 'doituonggia',
        component: Doituonggia,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/loaikhachhang',
        name: 'loaikhachhang',
        component: LoaiKhachHang,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/nganhang',
        name: 'nganhang',
        component: BankPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/ptthanhtoan',
        name: 'ptthanhtoan',
        component: PtThanhToan,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/tuyendoc',
        name: 'tuyendoc',
        component: TuyenDoc,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/TuyenSuaChua',
        name: 'TuyenSuaChua',
        component: () => import('@/views/Pages/DanhMuc/TuyenSuaChua.vue'),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/ttdocchiso',
        name: 'ttdocchiso',
        component: RecordStatusPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/ky',
        name: 'ky',
        component: Ky,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/loaiong',
        name: 'loaiong',
        component: LoaiOng,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/hangsanxuat',
        name: 'hangsanxuat',
        component: HangSanXuat,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/loaidongho',
        name: 'loaidongho',
        component: LoaiDongHo,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/dongho',
        name: 'dongho',
        component: DongHo,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/banggia',
        name: 'banggia',
        component: BangGia,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/contract',
        name: '/Contract',
        component: ContractPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/bangkekhaidanhsachkhachhang',
        name: '/bangkekhaidanhsachkhachhang',
        component: bangkekhaidanhsachkhachhang,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/bangkekhachhangtheotuyen',
        name: '/bangkekhachhangtheotuyen',
        component: bangkekhachhangtheotuyen,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/nhapchiso',
        name: '/nhapchiso',
        component: Nhapchiso,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/nhapchisoQR',
        name: 'nhapchisoQR',
        component: () => import("@/views/Pages/HoaDon/nhapchisoQR"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/cauhinh',
        name: '/cauhinh',
        component: () => import("@/views/Pages/Sys/CauHinh")
      },
      {
        path: '/mangXaHoi',
        name: '/mangXaHoi',
        component: () => import("@/views/Pages/LienHe/MangXaHoi")
      },
      {
        path: '/paymentbook',
        name: '/paymentbook',
        component: () => import("@/views/ThanhToan/paymentbook"),
      },
      // {
      //   path: '/payment',
      //   name: '/payment',
      //   component: () => import("@/views/ThanhToan/payment"),

      // },
      {
        path: '/Totalwater',
        name: '/Totalwater',
        component: Totalwater,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/Totalpayment',
        name: '/Totalpayment',
        component: Totalpayment,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/kekhaikhachhang',
        name: '/kekhaikhachhang',
        component: kekhaikhachhang,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/hoadontheonv',
        name: '/hoadontheonv',
        component: hoadontheonv,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/Tuyen',
        name: 'Tuyen',
        component: Tuyen,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/Nhanvien',
        name: 'Nhanvien',
        component: () => import("@/views/Pages/Sys/Employee")
      },
      {
        path: '/KhachHang',
        name: 'KhachHang',
        component: () => import("@/views/Pages/Sys/Customer")
      },
      {
        path: '/Nhatky',
        name: 'Nhatky',
        component: () => import("@/views/Pages/Sys/NhatKy")
      },
      {
        path: '/payment',
        name: 'Payment',
        component: PaymentPage
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import("@/views/Pages/Map/Map"),
      },

      {
        path: '/water-usage-report',
        name: 'WaterUsage',
        component: () => import("@/views/Pages/Report/WaterUsage"),
      },
      {
        path: '/hoadondt',
        name: 'HoaDonDT',
        component: () => import("@/views/Pages/HoaDon/hoadondt"),
      },
      {
        path: '/water-sales-report',
        name: 'WaterSales',
        component: () => import("@/views/Pages/Report/WaterSales"),
      },
      {
        path: '/record-year-report',
        name: 'Stats',
        component: () => import("@/views/Pages/Report/Stats"),
      },
      {
        path: '/pipes-report',
        name: 'PipesReport',
        component: () => import("@/views/Pages/Report/Pipes"),
      },
      {
        path: '/pipes',
        name: 'Pipes',
        component: () => import("@/views/Pages/DanhMuc/TuyenOng.vue"),
      },
      {
        path: '/install-request',
        name: 'InstallRequest',
        component: () => import("@/views/Pages/LienHe/YeuCauLapDat.vue"),
      },
      {
        path: '/questions',
        name: 'Questions',
        component: () => import("@/views/Pages/DanhMuc/CauHoi.vue"),
      },
      {
        path: '/lienHe',
        name: 'LienHe',
        component: () => import("@/views/Pages/LienHe/YeuCauLienHe.vue"),
      },
    ]
  },

  {
    path: '/admin',
    component: DashboardLayoutAdmin,
    name: 'DashboardAdmin',
    children: [
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/changePW',
        name: 'changePW',
        component: changePW,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/accountInfo',
        name: 'accountInfo',
        component: accountInfo,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/account',
        name: 'Account',
        component: AccountPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/import-customer',
        name: 'Account',
        component: () => import("@/views/Pages/Sys/ImportCustomer"),
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: 'company',
        name: 'Company',
        component: CompanyPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/role',
        name: 'Role',
        component: RolePage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/menu',
        name: 'Menu',
        component: MenuPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/bank',
        name: 'Bank',
        component: BankPage,
        meta: {
          noBodyBackground: true
        }
      },
      {
        path: '/admin/record-status',
        name: 'RecordStatus',
        component: RecordStatusPage,
        meta: {
          noBodyBackground: true
        }
      },
    ]
  }
];

export default routes;

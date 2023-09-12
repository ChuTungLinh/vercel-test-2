<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
        <div class="col-md-6 d-flex">
        <Label text="Từ:" />
        <el-date-picker
          v-model="pageRequest.columnFilters.tuNgay.value"
          class="item-date-control"
          placeholder="Chọn ngày"
          type="date"
          format="dd/MM/yyyy"
          value-format="dd/MM/yyyy"
        >
        </el-date-picker>
        
      </div>
      <div class="col-md-6 d-flex">
        <Label text="Đến:" />
        <el-date-picker
          v-model="pageRequest.columnFilters.denNgay.value"
          class="item-date-control"
          placeholder="Chọn ngày"
          type="date"
          format="dd/MM/yyyy"
          value-format="dd/MM/yyyy"
        >
        </el-date-picker>
        
      </div>
    </div>
    <div class="col-md-12 form-row pt-2">
        <div class="d-flex col-md-6">
        <Label text="Tên tài khoản:" />
        <Input
          placeholder="Nhập tên tài khoản"
          v-model="pageRequest.columnFilters.cTenTaiKhoan.value"
        />
      </div>
        <div class="d-flex col-md-6">
        <Label text="Hành động:" />
        <DropdownList placeholder="Hành động" v-model="pageRequest.columnFilters.nHanhDong.value">
          <el-option value="0" label="Tất cả">Tất cả</el-option>
          <el-option value="1" label="Tạo mới"></el-option>
          <el-option value="2" label="Cập nhật"></el-option>
          <el-option value="3" label="Xuất"></el-option>
          <el-option value="4" label="Xóa"></el-option>
        </DropdownList>

        <base-button type="primary" native-type="submit" style="max-height:28px; margin-top:0px; margin-left: 5px;" @click="handleSearch">
            <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
            <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
        
      </div>
    </div>
    
    <el-card class="box-card">
      <template #header class="el-card-header" > 
            <div style="padding: 8px 20px;" class="form-row">             
              <h6>Nhật ký dữ liệu</h6>
            </div>
      </template>
      
      <div class="col-md-12 tbl">
        <el-table
          :data="dataLogComputed"
          fit
          header-row-class-name="thead-light"
          height="100%"
          :border="true"
        >
        <el-table-column label="Địa chỉ IP" width="180" prop="cIP"> </el-table-column>
          <el-table-column label="Tên tài khoản" width="180" prop="cTenTK">
          </el-table-column>
          <el-table-column label="Hành động" width="150" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.nHanhDong == 1" type="success"
                >
                <Icon icon="material-symbols:add-circle-rounded" :width="16" :height="20"/>
                Tạo mới</el-tag
              >
              <el-tag v-if="scope.row.nHanhDong == 3" type="warning"
                > 
                <Icon icon="grommet-icons:update" />
                Cập nhật</el-tag
              >
              <el-tag v-if="scope.row.nHanhDong == 4" type="danger"
                ><i class="fas fa-trash-alt"></i> Xóa</el-tag
              >
              <el-tag v-if="scope.row.nHanhDong == 2" 
                ><i class="fas fa-cloud-download-alt"></i> Xuất</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="Thời gian" width="180">
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayTao">{{
                moment(scope.row.dNgayTao).format("DD/MM/YYYY hh:mm:ss")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Mô tả" width="260" prop="cMoTa"> </el-table-column>
          <el-table-column label="Tham số" prop="cThamSo"> </el-table-column>
          <el-table-column label="Chi tiết" align="center" width="100">
            <template slot-scope="scope">
                <el-button type="primary" @click="showDetail(scope.row.cThamSo)" circle style="padding: 6px 8px;">
                <Icon icon="bxs:comment-detail" style="font-size: 12px;" />
              </el-button>
            </template>
        </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination
          :page-sizes="[5, 10, 20, 30, 50]"
          background
          layout="total,sizes,  prev, pager, next"
          :page-size="pageRequest.pageSize"
          :current-page.sync="pageRequest.pageNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="dataLog.totalSize"
        >
        </el-pagination>
        
      </div>
    </el-card>
    <modal :show.sync="showLogDetail" :model="thamsoDT">
        <div class="log-container">
            <fieldset>
                <legend>Trước</legend>
                <VueJsonPretty style="padding: 16px;" :data="thamsoTruoc"/>
            </fieldset>
            <fieldset>
                <legend>Sau</legend>
                <VueJsonPretty style="padding: 16px;" :data="thamsoSau"/>
            </fieldset>
        </div>
    </modal>
    <div class="log-bg" @click="showLogDetail=false" v-show="showLogDetail"></div>
  </div>
</template>
<script>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
import { Icon } from '@iconify/vue2';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
import DropdownList from "../components/DropdownList.vue";
import moment from "moment";
export default {
  components: {
    Label,
    Input,
    Icon,
    VueJsonPretty,
    DropdownList
  },
  computed: {
    dataLogComputed() {
      return this.dataLog.content.map((record) => {
        const d = {
          cTenTK: record.c_ten_tai_khoan,
          dThoigian: record.d_ngay_tao,
          cIP: record.c_ip,
          cThamSo: record.c_tham_so,
          dNgayTao: record.d_ngay_tao,
        };
        let table = "";
        switch(record.c_thao_tac){
            case "SysChucNang": 
                table = "Chức năng";
                break;
            case "SysCongTy": 
                table = "Công ty";
                break;
            case "SysDoiTuongGia": 
                table = "Đối tượng giá";
                break;
            case "SysDongHo": 
                table = "Đồng hồ";
                break;
            case "SysDongHoTong": 
                table = "Đồng hồ tổng";
                break;
            case "SysGiaDT": 
                table = "Bảng giá chi tiết";
                break;
            case "SysGiaHD": 
                table = "Bảng giá";
                break;
            case "SysHangSanXuat": 
                table = "Hãng sản xuất";
                break;
            case "SysHoaDonHD": 
                table = "Hóa đơn";
                break;
            case "SysHopDong": 
                table = "Hợp đồng";
                break;
            case "SysKhachHang": 
                table = "Khách hàng";
                break;
            case "SysKy": 
                table = "Kỳ";
                break;
            case "SysLoaiDongHo": 
                table = "Loại đồng hồ";
                break;
            case "SysLoaiKhachHang": 
                table = "Loại khách hàng";
                break;
            case "SysNganHang": 
                table = "Ngân hàng";
                break;
            case "SysNhanVien": 
                table = "Nhân viên";
                break;
            case "SysNhomQuyen": 
                table = "Nhóm quyền";
                break;
            case "SysPhuongThucThanhToan": 
                table = "Phương thức thanh toán";
                break;
            case "SysSoChiSoHD": 
                table = "Sổ chỉ số";
                break;
            case "SysSoChiSoDT": 
                table = "Sổ chỉ số chi tiết";
                break;
            case "SysTaiKhoan": 
                table = "Tài khoản";
                break;
            case "SysTuyen": 
                table = "Tuyến";
                break;
            case "SysTuyenNhanVien": 
                table = "Tuyến nhân viên";
                break;
            case "SysPipe": 
                table = "Ống nước";
                break;
            case "SysGia":
                table = "Giá";
                break;
            default:
                table = "unknow";
                break;
        }
        let hanhdong = "";
        if (
          record.c_hanh_dong.startsWith("insert") 
        ){
            d.cMoTa = `Tạo ${table.toLowerCase()} mới`
            d.nHanhDong = 1;

        }
        else if (record.c_hanh_dong.startsWith("download")){
            d.nHanhDong = 2;
            switch(record.c_hanh_dong){
                case "downloadPDFPhieuThu":
                    d.cMoTa = "Xuất phiếu thu .PDF";
                    break;
                case "downloadInvoice":
                    d.cMoTa = "Tải hóa đơn điện tử .PDF"
            }
        }
        else if (record.c_hanh_dong.startsWith("update")||
          record.c_hanh_dong.startsWith("save")) {
            d.nHanhDong = 3;
            switch(record.c_hanh_dong){
                case "saveGhiChiSo":
                    d.cMoTa = "Ghi sổ chỉ số";
                    break;
                case "updateChiSoMoiHD":
                    d.cMoTa = "Cập nhật chỉ số nước tại trang hóa đơn";
                    break;
                case "updateHoaDonDT":
                  d.cMoTa = "Phát hành hóa đơn điện tử";
                  break;
                default:
                    d.cMoTa = `Cập nhật ${table.toLowerCase()}`
                    break;
            }
          }
        else if (record.c_hanh_dong.startsWith("delete")) {
            d.nHanhDong = 4;
            d.cMoTa = `Xóa ${table.toLowerCase()}`
        }
        else
        {
          d.nHanhDong = 3;
          d.cMoTa = record.c_hanh_dong;
        }


        return d;
      });
    },
  },
  data() {
    return {
      tableData: [],
      showLogDetail: false,
      rules: {
        cTenTuyen: [{ required: true, message: "Bạn chưa nhập tên tuyến" }],
      },
      pageRequest: {
        pageNum: 1,
        pageSize: 30,
        columnFilters: {
          nHanhDong: {value: "0"},
          cTenTaiKhoan: { value: "" },
          tuNgay: { value: moment(Date.now()).format("01/MM/YYYY") },
          denNgay: { value: moment(Date.now()).format("DD/MM/YYYY") },
        },
      },
      dialogForm: false,
      search: "",
      dataForm: {
        cTen: "",
        dNgaySinh: "",
        nSoDienThoai: "",
        cDiaChiNhanVien: "",
        cEmailNhanVien: "",
        bDocChiSo: false,
        nThuTien: false,
      },
      operation: false,
      dataLog: {
        totalSize: 0,
        content: [],
      },
      thamsoDT: "",
      thamsoTruoc: "",
      thamsoSau: ""
    };
  },
  methods: {
    showDetail(val){
        // console.log(val);
        this.thamsoDT = JSON.parse(val);
        this.thamsoTruoc = this.thamsoDT.old;
        this.thamsoSau = this.thamsoDT.new;
        if(!this.thamsoSau) this.thamsoSau = this.thamsoDT;
        if(!this.thamsoTruoc) this.thamsoTruoc = {};
        this.showLogDetail = true;
    },
    findLog(a, b) {
      this.pageRequest.pageNum = a;
      this.pageRequest.pageSize = b;
      this.$api.report.findLog(this.pageRequest).then((res) => {
        if (res.code == 200) this.dataLog = res.data;
      });
    },
    handleAdd() {
      // this.$refs.dataForm.resetFields();
      this.dialogForm = true;
      this.operation = false;
      this.dataForm = {
        cTen: "",
        dNgaySinh: "",
        nSoDienThoai: "",
        cDiaChiNhanVien: "",
        cEmailNhanVien: "",
        bDocChiSo: false,
        nThuTien: false,
      };
    },
    handleEdit(index, item) {
      this.dialogForm = true;
      this.dataForm = Object.assign({}, item);
    },

    handleDelete(index, item) {
      this.$confirm("Bạn có muốn xóa tuyến này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = { nMaTuyen: item.nMaTuyen };
          this.$api.route.deleteRoute(params).then((res) => {
            if (res.code == 200) {
              this.$message({ message: `Xóa thành công `, type: "success" });
            } else {
              this.$message({ message: `Xóa  thất bại`, type: "error" });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Hủy xóa",
          });
        });
    },
    handleSearch() {
      const tuPart = this.pageRequest.columnFilters.tuNgay.value.split('/');
      const tu = new Date(+tuPart[2],tuPart[1]-1,+tuPart[0])
      const denPart = this.pageRequest.columnFilters.denNgay.value.split('/');
      const den = new Date(+denPart[2],denPart[1]-1,+denPart[0])
      if(tu>den || tu>Date.now()) this.$message({message: "Mốc thời gian không hợp lệ !", type: "error"})
      else this.findLog(1,30);
      // this.findLog(1, 10);
    },
    close() {
      this.$refs.dataForm.resetFields();
      this.dialogForm = false;
    },

    showE() {
      this.$api.employee.showemployee({}).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
    },

    handleSizeChange(val) {
      this.findLog(this.pageRequest.pageNum, val);
      //   console.log(val);
    },
    handleCurrentChange(val) {
      //   console.log(val);
      this.findLog(val, this.pageRequest.pageSize);
    },
  },
  mounted() {
    // this.showE()
    this.findLog(1, 30);
  },
};
</script>
<style scoped>
fieldset {
  border: 1px solid rgb(223, 215, 215) !important;
  font-size: 13px !important;
}
fieldset.ttkhachhang {
  height: calc(100% - 36px);
}
legend {
  width: auto !important;
  font-size: 13px !important;
  margin-left: 32px !important;
}
.log-bg{
    
    /* height: 100vh;
    width: 100vw; */
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
}
.log-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.modal-log__detail{
    margin: auto;
    margin-top: 16px;
    margin-bottom: 16px;
    padding: 10px;
    border: 1px #c1c1c1 solid;
    width: 80%;
}
.btn__xacnhan{
    background-color: #66b1ff;
    color: white;
    width: fit-content;
    border-radius: 5px;
    padding: 0px 7px;
    cursor: pointer;
    margin-bottom: 10px;
    margin-left: calc(100% - 100px);
}
.tbl {
  height: calc(100vh - 250px);
}
.item-date-control {
  flex: auto;
  width: auto;
}
.box-card {
  margin: 10px;
}

h6 {
  margin-bottom: 0px;
}
</style>
<style>
.item-date-control .el-input__inner {
  color: #000;
  border: 1px solid #b1b4b8;
  height: 1.6rem;
}

.item-date-control .el-input__icon {
  line-height: 1.6rem;
  height: 1.6rem;
}
</style>

<template lang="">
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 d-flex">
        <Label text="Chọn ngày bắt đầu:" />
        <el-date-picker
          v-model="search.startDate"
          placeholder="Chọn ngày bắt đầu"
          type="date"
          size="mini"
          format="dd/MM/yyyy"
          value-format="dd/MM/yyyy"
        ></el-date-picker>
      </div>
      <div class="col-md-6 d-flex">
        <Label text="Chọn ngày kết thúc:" />
        <el-date-picker
          class="date-picker__report"
          v-model="search.endDate"
          placeholder="Chọn ngày kết thúc"
          type="date"
          size="mini"
          format="dd/MM/yyyy"
          value-format="dd/MM/yyyy"
        ></el-date-picker>
      </div>
    </div>
    <div class="col-md-12 form-row mt-2 pt-2">
      <div class="col-md-5 d-flex">
        <Label text="Nhân viên:" />
        <DropdownList placeholder="Chọn nhân viên" v-model="search.nMaNhanVien" @onChange="getRouteByName">
          <el-option label="Toàn bộ" value="0" key="0" v-if="listEmployee.length > 1"></el-option>
          <el-option
            v-for="emp in listEmployee"
            :key="emp.nMaNhanVien"
            :value="String(emp.nMaNhanVien)"
            :label="emp.cTenNhanVien"
          ></el-option>
        </DropdownList>
      </div>
      <div class="col-md-5 d-flex">
        <Label text="Chọn tuyến:" />
        <DropdownList
          placeholder="Chọn tuyến cần xem chỉ số"
          v-model="search.nMaTuyen"
        >
          <el-option label="Toàn bộ" value="0" key="0"></el-option>
          <el-option
            v-for="r in listRoutes"
            :key="r.nMaTuyen"
            :value="String(r.nMaTuyen)"
            :label="r.cTenTuyen"
          ></el-option>
        </DropdownList>
      </div>
      <div class="col-md-2 d-flex">
        <base-button
          type="primary"
          native-type="submit"
          style="margin-top: 0px; margin-left: 5px"
          @click="handleSearch"
        >
          <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
          <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
      </div>
    </div>
    <el-card class="box-card">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px" class="form-row">
          <!-- <el-dropdown trigger="click"> -->
            <base-button type="primary" outline native-type="submit" @click="downloadReport">
              <span class="btn-inner--icon"
                ><i class="el-icon-download"></i
              ></span>
              <span class="btn-inner--text">&nbsp;Xuất báo cáo</span>
            </base-button>
          <!-- </el-dropdown> -->
        </div>
      </template>
      <div class="col-md-12 pt-2 tbl">
        <el-table header-row-class-name="thead-light"
          highlight-current-row height="100%" :border="true"
          stripe :data="listReports.content" :fit="true">
          <el-table-column label="STT" type="index"></el-table-column>
          <el-table-column label="Tên tuyến" width="100"
          prop="c_ten_tuyen"
          ></el-table-column>
          <el-table-column label="Nhân viên phụ trách" width="200"
          prop="c_ten_nhan_vien"></el-table-column>
          <el-table-column label="Số lượng KH"
          width="110"
          align="center"
          prop="n_so_luong_khach_hang"></el-table-column>
          <el-table-column label="SL hợp đồng"
          width="110"
          align="center"
          prop="n_so_luong_hop_dong"></el-table-column>
          <el-table-column label="SL hóa đơn"
          width="110"
          align="center"
          prop="n_so_luong_hoa_don"
          ></el-table-column>
          <el-table-column label="Tiêu thụ (m3)"
          width="110"
          align="center"
          prop="n_so_luong_tieu_thu"></el-table-column>
          <el-table-column label="Tiền nước (VND)"
          align="center"
          prop="n_thanh_tien"></el-table-column>
          <el-table-column label="Thuế VAT (VND)"
          align="center"
          prop="n_vat"></el-table-column>
          <el-table-column label="Tổng tiền (VND)"
          align="center"
          prop="n_tong_tien"></el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination
          :page-sizes="[5, 10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="listReports.pageSize"
          :total="listReports.totalSize"
          :current-page.sync="listReports.pageNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
import DropdownList from "../components/DropdownList.vue";
import { saveAs } from "file-saver";

export default {
  components: {
    Label,
    Input,
    DropdownList,
  },
  data() {
    return {
      search: {
        nMaNhanVien: "0",
        nMaTuyen: "0",
        endDate: new Date(),
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
      listEmployee: [],
      listRoutes: [],
      listReports: {},
      isLoadingReport: false,
      pageRequest: {},
    };
  },
  mounted() {
    this.getEmployee()
    //convert định dạng ngày
    if (typeof this.search.startDate == "object") {
        this.search.startDate = `${this.search.startDate.getDate()}/${
          this.search.startDate.getMonth() + 1
        }/${this.search.startDate.getFullYear()}`;
      }
      if (typeof this.search.endDate == "object") {
        this.search.endDate = `${this.search.endDate.getDate()}/${
          this.search.endDate.getMonth() + 1
        }/${this.search.endDate.getFullYear()}`;
      }
      this.findReport();
  },
  methods: {
    handleSearch() {
      this.findReport()
    },
    findReport(pageNum,pageSize){
      this.isLoadingReport = true;
        if(typeof pageNum === 'number') this.pageRequest.pageNum = pageNum;
        else this.pageRequest.pageNum = 1;
        if(typeof pageSize === 'number') this.pageRequest.pageSize = pageSize;
        else this.pageRequest.pageSize = 30;
        this.pageRequest.columnFilters = {
          nMaTuyen: {value: this.search.nMaTuyen},
          nMaNhanVien: {value: this.search.nMaNhanVien},
          startDate: {value: this.search.startDate},
          endDate: {value: this.search.endDate}
        }
        this.$api.report.findWaterSalesReport(this.pageRequest).then(res=>{
          if(res.code === 200 && res.data){
            this.listReports = res.data;
            this.listReports.content = this.listReports.content.map(i=>{
              if(!i.n_so_luong_tieu_thu) i.n_so_luong_tieu_thu = 0;
              if(!i.n_so_luong_hoa_don) i.n_so_luong_hoa_don = 0;
              if(!i.n_thanh_tien) i.n_thanh_tien = 0;
              i.n_thanh_tien= i.n_thanh_tien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if(!i.n_vat) i.n_vat = 0;
              i.n_vat= i.n_vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              if(!i.n_tong_tien) i.n_tong_tien = 0;
              i.n_tong_tien=i.n_tong_tien.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return i;
            })
          }
          else
            this.$message({message: "Lấy báo cáo thất bại hoặc không tìm thấy báo cáo nào",type:"error"});
            this.isLoadingReport = false;
        })

          
    },
    handleSizeChange(val){
      this.findReport(this.pageRequest.pageNum,val);
    },
    handleCurrentChange(val){
      this.findReport(val,this.pageRequest.pageSize);
    },
    downloadReport() {
      this.$api.report.recordWaterSalesDownload(this.pageRequest).then((response) => {
        saveAs(
        new Blob([response]),
        "Bao_cao_tong_hop_san_luong_nuoc_" + this.search.startDate + '_' + this.search.endDate + ".xlsx"
        );
      });
    },
    getEmployee() {
      const data = {};
      this.$api.employee.findAll(data).then((res) => {
        this.listEmployee = res.data;
        if(res.data.length == 1) {
          this.search.nMaNhanVien = res.data[0].nMaNhanVien.toString()
          this.getRouteByName(res.data[0].nMaNhanVien)
        }
      });
    },
    getRouteByName(id) {
      this.$api.route.showById({ nMaNhanVien: id }).then((res) => {
        this.listRoutes = res.data;
        this.search.nMaTuyen = "0"
      });
    }
  },

};
</script>
<style scoped>
.el-date-editor {
  width: 80%;
  display: flex;
  align-items: center;
}
.d-flex {
  align-items: center;
}
.tbl {
  height: calc(100vh - 255px);
}

.box-card {
  margin: 10px;
}

.card-header {
  padding: 0px;
}
</style>

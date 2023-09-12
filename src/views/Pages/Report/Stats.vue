<template>
  <div class="wrapper m-2">
    <div class="" id="loading-screen">
      <div class="" id="loader"></div>
      <div class="" v-if="isDownloading" style="font-size: 1.5rem; font-weight: 700;">Đang tải dữ liệu xuống</div>
    </div>
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-2 d-flex">
        <Label text="Năm:" />
        <el-date-picker @change="yearChanged = true" v-model="search.dYear" placeholder="Chọn năm cần xem" type="year"
          size="mini" format="yyyy" value-format="dd/MM/yyyy"></el-date-picker>
      </div>
      <div class="col-md-4 d-flex">
        <Label text="Nhân viên:" />
        <DropdownList placeholder="Chọn nhân viên" v-model="search.nMaNhanVien" @onChange="getRouteByName">
          <el-option label="Toàn bộ" value="0" key="0" v-if="listEmployee.length > 1"></el-option>
          <el-option v-for="emp in listEmployee" :key="emp.nMaNhanVien" :value="String(emp.nMaNhanVien)"
            :label="emp.cTenNhanVien"></el-option>
        </DropdownList>
      </div>
      <div class="col-md-4 d-flex">
        <Label text="Chọn tuyến:" />
        <DropdownList placeholder="Chọn tuyến cần xem chỉ số" v-model="search.nMaTuyen">
          <el-option label="Toàn bộ" value="0" key="0"></el-option>
          <el-option v-for="r in listRoutes" :key="r.nMaTuyen" :value="String(r.nMaTuyen)"
            :label="r.cTenTuyen"></el-option>
        </DropdownList>
      </div>
      <div class="col-md-2 d-flex">
        <base-button type="primary" native-type="submit" style="margin-top: 0px; margin-left: 5px"
          :loading="isLoadingReport" @click="handleSearch">
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
            <span class="btn-inner--icon"><i class="el-icon-download"></i></span>
            <span class="btn-inner--text">&nbsp;Xuất báo cáo</span>
          </base-button>
          <!-- </el-dropdown> -->
        </div>
      </template>
      <div v-loading="isLoadingReport" class="col-md-12 pt-2 tbl">
        <el-table header-row-class-name="thead-light" stripe height="100%" align="center" :fit="true" :border="true"
          highlight-current-row :data="listReports" v-if="listReports.length != 0">
          <el-table-column label="Mã KH" prop="n_ma_khach_hang" width="65">
            <template slot-scope="scope">
              <span>{{ scope.row.n_ma_khach_hang.toString() }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Tên khách hàng" prop="c_ten_khach_hang" width="145"></el-table-column>
          <el-table-column label="Địa chỉ" prop="c_dia_chi" width="175"></el-table-column>
          <el-table-column label="Đối tượng" prop="c_ten_phuong_thuc" width="120"></el-table-column>
          <el-table-column label="Tháng 1" prop="n_thang_1" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_1 != null">{{ scope.row.n_thang_1.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 2" prop="n_thang_2" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_2 != null">{{ scope.row.n_thang_2.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 3" prop="n_thang_3" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_3 != null">{{ scope.row.n_thang_3.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 4" prop="n_thang_4" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_4 != null">{{ scope.row.n_thang_4.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 5" prop="n_thang_5" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_5 != null">{{ scope.row.n_thang_5.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 6" prop="n_thang_6" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_6 != null">{{ scope.row.n_thang_6.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 7" prop="n_thang_7" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_7 != null">{{ scope.row.n_thang_7.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 8" prop="n_thang_8" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_8 != null">{{ scope.row.n_thang_8.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 9" prop="n_thang_9" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_9 != null">{{ scope.row.n_thang_9.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 10" prop="n_thang_10" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_10 != null">{{ scope.row.n_thang_10.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 11" prop="n_thang_11" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_11 != null">{{ scope.row.n_thang_11.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column label="Tháng 12" prop="n_thang_12" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.n_thang_12 != null">{{ scope.row.n_thang_12.toString() }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination :page-sizes="[30, 60, 100]" layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageRequest.pageSize" :total="total" :current-page.sync="pageRequest.pageNum"
          @current-change="handleCurrentChange" @size-change="handleSizeChange">
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
        dYear: new Date(),
      },
      listEmployee: [],
      listRoutes: [],
      listReports: [],
      isLoadingReport: false,
      pageRequest: {
        pageSize: 30,
        pageNum: 1,
      },
      total: null,
      inv: [],
      yearChanged: false,
      isDownloading: false
    };
  },
  mounted() {
    this.getEmployee()
    if (typeof this.search.dYear == "object") {
      this.search.dYear = `1/1/${this.search.dYear.getFullYear()}`;
    }
    this.findReport()
  },
  watch: {
    isDownloading() {
      if (this.isDownloading) {
        document.getElementById("loading-screen").classList.add("loading-screen")
        document.getElementById("loader").classList.add("loader")
      }

      else {
        document.getElementById("loading-screen").classList.remove("loading-screen")
        document.getElementById("loader").classList.remove("loader")
      }
    },
  },
  methods: {
    handleSizeChange(val) {
      this.pageRequest.pageSize = val,
        this.findReport();
    },
    handleCurrentChange(val) {
      this.pageRequest.pageNum = val
      this.findReport();
    },
    handleSearch() {
      if (this.search.nMaNhanVien == '')
        this.search.nMaNhanVien = '0'
      if (this.search.nMaTuyen == '')
        this.search.nMaTuyen = '0'
      if (this.search.dYear == null) {
        this.search.dYear = new Date()
        this.search.dYear = `1/1/${this.search.dYear.getFullYear()}`
      }
      this.findReport()
    },
    findReport() {
      this.inv = []
      this.listReports = []
      this.total = null
      this.isLoadingReport = true;
      if (typeof (this.pageRequest.pageNum) != 'number') {
        this.pageRequest.pageNum = 1;
      }
      if (typeof (this.pageRequest.pageSize) != 'number') {
        this.pageRequest.pageSize = 30;
      }

      this.pageRequest.columnFilters = {
        nMaTuyen: { value: this.search.nMaNhanVien },
        nMaNhanVien: { value: this.search.nMaTuyen },
        dYear: { value: this.search.dYear }
      }
      this.$api.report.recordByYear(this.pageRequest).then(res => {
        if (res.code == 200 && res.data) {
          this.inv = res.data
          this.total = res.data.totalSize
          this.pageRequest.pageNum = res.data.pageNum
              this.listReports = res.data.content
              this.isLoadingReport = false
        }
        else {
          this.$message({ message: "Lấy báo cáo thất bại hoặc không tìm thấy báo cáo nào", type: "error" });
          this.isLoadingReport = false;
        }
      })
    },
    downloadReport() {
      this.isDownloading = true
      this.$api.report.recordByYearDownload({
        ...this.pageRequest,
        columnFilters: {
          nMaTuyen: { value: 0 },
          nMaNhanVien: { value: 0 },
          dYear: { value: this.search.dYear },
          csIDEnd: { value: 0 },
          csIDStart: { value: 0 }
        },
      }).then((response) => {
        saveAs(
          new Blob([response]),
          "Bao_cao_theo_doi_chi_so_nam_" +
          this.search.dYear + ".xlsx"
        );
        this.isDownloading = false
      });
    },
    getEmployee() {
      const data = {};
      this.$api.employee.findAll(data).then((res) => {
        this.listEmployee = res.data;
        if (res.data.length == 1) {
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

.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 1049;
  height: calc(100vh - 60px);
  width: calc(100vw - 60px);
  background-color: rgba(128, 128, 128, 0.616);
}

.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
.el-date-editor {
  width: 80%;
  display: flex;
  align-items: center;
}

.d-flex {
  align-items: center;
}

.tbl {
  height: calc(100vh - 210px);
}

.flex {
  display: flex;
}

.box-card {
  margin: 10px;
}

.card-header {
  padding: 0px;
}

.modalTemp .modal-footer {
  justify-self: start;
}

.select-item {
  flex: auto;
  width: auto;
}
</style>
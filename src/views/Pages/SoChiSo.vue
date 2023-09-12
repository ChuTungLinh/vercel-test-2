<template>
  <div class="wrapper mb-2">
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-3 flex">
        <Label text="Tháng:" />
        <DatePicker v-model="filters.month" />
      </div>
      <div class="col-md-3 flex">
        <Label text="Cán bộ đọc:" />
        <DropdownList
          placeholder="Chọn cán bộ"
          v-model="filters.nMaNhanVienDocChiSo"
          @onChange="getRouteByName"
        >
          <el-option
            v-for="i in employeeList"
            :key="i.nMaNhanVien"
            :value="String(i.nMaNhanVien)"
            :label="i.cTenNhanVien"
          ></el-option>
        </DropdownList>
      </div>
      <div class="col-md-6 flex">
        <Label text="Tuyến đọc:" />
        <DropdownList
          placeholder="Chọn tuyến đọc"
          v-model="filters.nMaTuyenDoc"
        >
          <el-option
            v-for="i in routeList"
            :key="i.nMaTuyen"
            :value="String(i.nMaTuyen)"
            :label="i.cTenTuyen"
          ></el-option>
        </DropdownList>
      </div>
    </div>
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-4 flex">
        <Label text="Trạng thái:" />
        <DropdownList
          placeholder="Chọn trạng thái"
          v-model="filters.nTinhTrang"
        >
          <el-option value="" label="Tất cả"></el-option>
          <el-option value="5" label="Đã ngừng"></el-option>
          <el-option value="6" label="Chưa ngừng"></el-option>
        </DropdownList>
      </div>
      <div class="col-md-8 flex">
        <Label text="Tên sổ:" />
        <Input placeholder="" v-model="filters.cTenSo" />
        <base-button
          type="primary"
          native-type="submit"
          style="margin-top: 0px; margin-left: 5px"
          :loading="isSearchLoading"
          @click="handleSearchRecord"
        >
          <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
          <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
      </div>
    </div>

    <el-card class="box-card">
      <template #header class="el-card-header">
        <!-- <el-row class="card-header"> -->
        <div style="padding: 5px 10px" class="form-row">
          <div class="col-md-6">
            <base-button
              type="primary"
              outline
              native-type="submit"
              :loading="isLoading"
              @click="handleShowModalAdd"
            >
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">&nbsp;Tạo sổ</span>
            </base-button>

            <base-button
              type="info"
              :disabled="row.nChotSo == 4 || row == '' || row.nKhoaSo == 1"
              outline
              native-type="submit"
              :loading="isLoading"
              @click="lockAndBill"
            >
              <span class="btn-inner--icon"><i class="fas fa-lock"></i></span>
              <span class="btn-inner--text">&nbsp;Khóa sổ & tính tiền</span>
            </base-button>
            <base-button
              type="info"
              outline
              native-type="submit"
              :loading="isLoading"
              @click="handleView"
            >
              <span class="btn-inner--icon"><i class="fas fa-eye"></i></span>
              <span class="btn-inner--text">&nbsp;Xem chi tiết sổ</span>
            </base-button>
          </div>
        </div>
        <!-- </el-row> -->
      </template>
      <div class="col-md-12 tbl tbl1">
        <el-table
          :data="tableData.content"
          header-row-class-name="thead-light"
          size="mini"
          stripe
          height="100%"
          :border="true"
          highlight-current-row
          @row-click="handleRow"
        >
          <el-table-column
            label="Tuyến đọc"
            prop="cTenTuyen"
            header-align="center"
            width="200"
            fixed=""
          >
          </el-table-column>
          <el-table-column
            label="Cán bộ đọc"
            prop="cTen"
            header-align="center"
            width="150"
          >
          </el-table-column>
          <el-table-column
            label="Tên sổ"
            prop="cTenSo"
            header-align="center"
            width="290"
          >
          </el-table-column>
          <el-table-column
            label="Chưa ghi"
            prop="nTongChuaGhi"
            header-align="center"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.nTongChuaGhi }}</span
              >/<span>{{ scope.row.nTongDongHo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Khóa sổ"
            prop="nKhoaSo"
            header-align="center"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.nKhoaSo == 1"
                >Đã khóa sổ</el-tag
              >
              <el-tag type="success" v-if="scope.row.nKhoaSo == 2"
                >Chưa khóa sổ</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="Chốt sổ"
            prop="nChotSo"
            header-align="center"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.nChotSo == 3"
                >Đã chốt</el-tag
              >
              <el-tag type="success" v-if="scope.row.nChotSo == 4"
                >Chưa chốt</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="Trạng thái"
            prop="nTinhTrang"
            header-align="center"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.nTinhTrang == 5"
                >Đã ngừng</el-tag
              >
              <el-tag type="success" v-if="scope.row.nTinhTrang == 6"
                >Chưa ngừng</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="Ngày chốt"
            prop="dNgayChot"
            header-align="center"
            width="120"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayChot">{{
                moment(scope.row.dNgayChot).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column width="340" align="center">
            <template slot-scope="scope">              
              <base-button
                type="primary"
                v-if="scope.row.nChotSo == 4"
                :disabled="scope.row.nKhoaSo == 1"
                size="mini"
                @click="close(scope.$index, scope.row)"
              >
                <span class="btn-inner--icon"><i class="fas fa-check mr-1"></i></span>
                <span class="btn-inner--text">Chốt sổ</span>
              </base-button>

              <base-button
                type="primary"
                v-if="scope.row.nChotSo == 3"
                :disabled="scope.row.nKhoaSo == 1"
                size="mini"
                @click="open(scope.$index, scope.row)"
              >
                <span class="btn-inner--icon"><i class="fas fa-check mr-1"></i></span>
                <span class="btn-inner--text">Mở chốt</span>
              </base-button>

              <base-button
                type="primary"
                v-if="scope.row.nTinhTrang == 6"
                :disabled="scope.row.nChotSo == 3 || scope.row.nKhoaSo == 1"
                size="mini"
                @click="stop(scope.$index, scope.row)"
              >
                <span class="btn-inner--icon"><i class="fas fa-ban mr-1"></i></span>
                <span class="btn-inner--text">Dừng ghi</span>
              </base-button>

              <base-button
                type="primary"
                 v-if="scope.row.nTinhTrang == 5"
                :disabled="scope.row.nChotSo == 3 || scope.row.nKhoaSo == 1"
                size="mini"
                @click="start(scope.$index, scope.row)"
              >
                <span class="btn-inner--icon"><i class="fas fa-ban mr-1"></i></span>
                <span class="btn-inner--text">Mở ghi</span>
              </base-button>


              <!-- <el-button
                type="danger"
                size="mini"
                :disabled="scope.row.nKhoaSo == 1"
                @click="deleteBatch(scope.$index, scope.row)"
              >
                <i class="fas fa-trash-alt mr-1"></i>
                Xóa sổ
              </el-button> -->

              <base-button
                type="danger"
                size="mini"
                :disabled="scope.row.nKhoaSo == 1"
                @click="deleteBatch(scope.$index, scope.row)"
              >
                <span class="btn-inner--icon"><i class="fas fa-trash-alt mr-1"></i></span>
                <span class="btn-inner--text">Xóa sổ</span>
              </base-button>


            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: space-between">
        <div class="progress-container">
          <progress id="progress" :progress-label="`${CSTotal - CSLeft} / ${ CSTotal }`" 
          :hover-label="`Đã ghi ${ CSTotal - CSLeft } trên tổng số ${ CSTotal } khách hàng`" 
          :value="CSTotal - CSLeft" :max="CSTotal"></progress>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
            :page-size="tableData.pageSize"
            :total="tableData.totalSize"
            :current-page.sync="tableData.pageNum"
            :page-sizes="[5, 10, 20, 30, 50]"
            layout="total, sizes, prev, pager, next,jumper"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>
   
    <modal
      :show.sync="showModal"
      class="modalTemp"
      dataBackDrop="static"
      size="lg"
    >
      <h6 slot="header" class="modal-title">Tạo sổ chỉ số</h6>

      <div class="col-md-12 form-row pt-2">
        <div class="col-md-3 flex">
          <Label text="Tháng:" />
          <DatePicker v-model="modalAddFilters.month" />
        </div>
        <div class="col-md-3 flex">
          <Label text="Kỳ:" />
          <DropdownList
            placeholder="Chọn kỳ"
            v-model="modalAddFilters.nMaKy"
            @change="findByTerm"
          >
            <el-option
              v-for="it in termList"
              :key="it.cMaKy"
              :value="String(it.nMaKy)"
              :label="it.cTenKy"
            ></el-option>
          </DropdownList>
        </div>
        <div class="col-md-3 flex">
          <base-button
            type="primary"
            :loading="isLoading"
            @click="handleSearch"
          >
            <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
            <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
          </base-button>
        </div>
      </div>
      <div class="col-md-12 form-row pt-2" style="color: rgba(0, 0, 0, 0.479);">(Sổ chỉ số đã tạo vẫn tồn tại sau khi xóa hợp đồng)</div>
      <div class="col-md-12 tbl pt-2">
        <el-table
          :data="recordList.content"
          :border="true"
          row-key="id"
          header-row-class-name="thead-light"
          stripe
          style="height: 100%"
          height="100%"
        >
          <el-table-column label="Nhân viên" prop="cTen" header-align="center">
          </el-table-column>
          <el-table-column
            label="Mã tuyến đọc"
            prop="nMaTuyen"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="Tuyến đọc"
            prop="cTenTuyen"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="Kỳ ghi chỉ số"
            prop="cTenKy"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="Ngày ghi chỉ số từ"
            prop="dNgayBatDau"
            header-align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayBatDau">{{
                moment(scope.row.dNgayBatDau).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="Ngày ghi chỉ số đến"
            prop="dNgayKetThuc"
            header-align="center"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayKetThuc">{{
                moment(scope.row.dNgayKetThuc).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Đã tạo" header-align="center">
            <template slot-scope="scope">
              <span
                >{{ scope.row.nTongTaoSo }}/{{ scope.row.nTongDongHo }}</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination
          @current-change="handleCurrentPageChange"
          @size-change="handleSizeChange"
          :page-sizes="[5, 10, 20, 30, 50]"
          background
          layout="sizes, total, prev, pager, next"
          :page-size="pageResult.pageSize"
          :current-page.sync="pageResult.pageNum"
          :total="pageResult.totalSize"
        >
        </el-pagination>
      </div>

      <template slot="footer">
        <base-button type="primary" @click="save" :loading="isLoading"
          >Tạo sổ đồng loạt</base-button
        >
        <base-button outline type="danger" @click="showModal = false"
          >Thoát</base-button
        >
      </template>
    </modal>
  </div>
  
</template>


<script>
import Input from "./components/Input.vue";
import Label from "./components/Label.vue";
// import { Table, TableColumn, Pagination, Card, Option } from "element-ui";
import DatePicker from "./components/DatePicker.vue";
import DropdownList from "./components/DropdownList.vue";
import moment from "moment";
export default {
  components: {
    Input,
    Label,
    DropdownList,
    DatePicker,
    // [Table.name]: Table,
    // [TableColumn.name]: TableColumn,
    // [Pagination.name]: Pagination,
    // [Card.name]: Card,
    // [Option.name]: Option,
  },

  data() {
    return {
      isLoading: false,
      isSearchLoading: false,
      disabled: true,
      checked: false,
      pageRequest: { pageNum: 1, pageSize: 30 },
      pageResult: {
        content: [],
      },
      CSTotal:0,
      CSLeft:0,
      tableData: [],
      recordList: [],
      statusList: [],
      termList: [],
      employeeList: [],

      routeList: [],
      row: "",
      filters: {
        month: new Date(),
        cTenSo: "",
        nMaNhanVienDocChiSo: "",
        nMaTuyenDoc: "",
        nTinhTrang: "",
        nChotSo: "",
        nKhoaSo: "",
      },

      modalAddFilters: {
        month: new Date(),
        nMaKy: "",
      },

      showModal: false,
      index: "",
      checkIndex: "",
    };
  },

  methods: {
    handleShowModalAdd() {
      this.modalAddFilters.month = new Date();
      if (this.termList.length > 0)
        this.modalAddFilters.nMaKy = this.termList[0].nMaKy.toString();
      this.showModal = true;
    },

    handleSearchRecord() {
      this.getRecord();
    },

    handleSearch: function () {
      this.findByTerm();
    },

    handleCurrentPageChange: function (val) {
      this.getRecord(val, this.pageRequest.pageSize);
      this.findByTerm(val, this.pageRequest.pageSize);
    },

    handleSizeChange: function (val) {
      this.getRecord(this.pageRequest.pageNum, val);
      this.findByTerm(this.pageRequest.pageNum, val);
    },

    onReaderChange(val) {
      this.getRouteList();
    },

    getRecord(pageNum, pageSize) {
      this.isSearchLoading = true;
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 30;

      this.pageRequest.columnFilters = {
        cTenSo: { value: this.filters.cTenSo },
        dThang: { value: moment(this.filters.month).format("01/MM/YYYY") },
        nMaNhanVienDocChiSo: { value: this.filters.nMaNhanVienDocChiSo },
        nMaTuyenDoc: { value: this.filters.nMaTuyenDoc },
        nTinhTrang: { value: this.filters.nTinhTrang },
      };
      this.$api.record.getRecord(this.pageRequest).then((res) => {
        this.isSearchLoading = false;
        if (res.code == 200 && res.data) {
          this.tableData = res.data;
          this.findProgress();
        } else {
          this.tableData = [];
          this.$message({ message: "Tải dữ liệu thất bại!", type: "danger" });
        }
      });
      
    },
    findProgress() {
      this.CSTotal = 0,
      this.CSLeft = 0,
      this.pageRequest.columnFilters = {
        cTenSo: { value: this.filters.cTenSo },
        dThang: { value: moment(this.filters.month).format("01/MM/YYYY") },
        nMaNhanVienDocChiSo: { value: this.filters.nMaNhanVienDocChiSo },
        nMaTuyenDoc: { value: this.filters.nMaTuyenDoc },
        nTinhTrang: { value: this.filters.nTinhTrang },
      };
      this.$api.record.getRecord({...this.pageRequest, pageNum: 1, pageSize:1000000 }).then((res) => {
        if (res.code == 200 && res.data) {
          let test = res.data.content
                //console.log(test)
                for (let i = 0; i < test.length; i++) {
                    this.CSTotal += test[i].nTongDongHo
                    this.CSLeft += test[i].nTongChuaGhi 
                  }
        }
      });
      
    },

    findByTerm(pageNum, pageSize) {
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 5;

      this.pageRequest.columnFilters = {
        cTenKy: { value: this.modalAddFilters.nMaKy },
        dThang: {
          value: moment(this.modalAddFilters.month).format("DD/MM/YYYY"),
        },
      };

      this.$api.record.findByTerm(this.pageRequest).then((res) => {
        if (res.code == 200) {
          this.recordList = res.data;
        } else {
          this.$message({ message: "Tải dữ liệu thất bại! ", type: "error" });
        }
      });
    },

    save() {
      const data = {
        nMaKy: this.modalAddFilters.nMaKy,
        dThang: moment(this.modalAddFilters.month).format("YYYY-MM-DD"),
      };

      this.$api.record.save(data).then((res) => {
        if (res.code == 200) {
          this.$message({ message: "Tạo sổ thành công", type: "success" });
          this.showModal = false;
          this.getRecord();
        } else {
          this.$message({ message: res.msg, type: "error" });
        }
      });
    },

    deleteBatch(index, item) {
      this.$confirm("Bạn có muốn xóa sổ chỉ số này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = item;
          this.$api.record.deleteBatch(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: `Xóa sổ chỉ số thành công `,
                type: "success",
              });
              this.getRecord();
            } else {
              this.$message({ message: `Xóa thất bại`, type: "error" });
            }
          });
        })
        .catch(() => {});
    },

    getTerm() {
      let data = {};
      this.$api.term.getTerm(data).then((res) => {
        if (res.code == 200 && res.data) {
          this.termList = res.data;
        } else
          this.$message({ message: "Load dữ liệu thất bại ", type: "error" });
      });
    },

    stop(index, item) {
      this.$confirm("Bạn có muốn dừng ghi sổ chỉ số này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          const data = Object.assign({}, item);
          this.$api.record.stop(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Dừng ghi chỉ số thành công",
                type: "success",
              });
              this.getRecord();
            } else {
              this.$message({
                message: "Dừng ghi chỉ số thất bại",
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },

    start(index, item) {
      this.$confirm("Bạn có muốn mở ghi sổ chỉ số này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          const data = Object.assign({}, item);
          this.$api.record.start(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Mở ghi chỉ số thành công",
                type: "success",
              });
              this.getRecord();
            } else {
              this.$message({
                message: "Mở ghi chỉ số thất bại",
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },

    open(index, item) {
      this.$confirm("Bạn có muốn mở chốt sổ chỉ số này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          const data = Object.assign({}, item);
          this.$api.record.open(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Mở chốt sổ chỉ số thành công",
                type: "success",
              });
              this.getRecord();
            } else {
              this.$message({
                message: "Mở chốt chỉ số thất bại",
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },

    close(index, item) {
      this.$confirm("Bạn có muốn chốt sổ chỉ số này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let data = Object.assign({}, item);
          this.$api.record.close(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Chốt sổ chỉ số thành công",
                type: "success",
              });
              this.getRecord();
            } else {
              this.$message({
                message: "Chốt sổ chỉ số thất bại",
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },

    tableRowClassName({ row, rowIndex }) {
      // Put the index of each row in row
      row.index = rowIndex;
    },

    handleRow(row) {
      this.row = row;

      this.index = row.index;
    },

    rowSelect(index, row) {
      this.checkIndex = index;
    },

    handleView() {      
      this.$store.commit("setRecordList", this.row);
      this.$router.push("/Nhapchiso");
    },

    lockAndBill() {
      this.$confirm("Bạn có muốn khóa sổ chỉ số này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          const data = this.row;
          this.$api.record.lockAndBill(data).then((res) => {
            //console.log(res)
            if (res.code == 200) {
              this.$message({
                message: "Khóa sổ chỉ số thành công",
                type: "success",
              });
              this.getRecord();
            } else {
              this.$message({
                message: "Khóa sổ chỉ số thất bại! " + res.msg,
                type: "error",
              });
            }
          });
        })
        .catch(() => {});
    },
    getEmployee() {
      const data = {};
      this.$api.employee.findAll(data).then((res) => {
        this.employeeList = res.data;
      });
    },

    getRouteByName(id) {
      this.$api.route.showById({ nMaNhanVien: id }).then((res) => {
        this.routeList = res.data;
      });
    },
  },

  mounted() {
    this.getRecord();
    this.getTerm();
    this.getEmployee();
    this.getRouteByName();
  },
};
</script>

<style lang="scss" scoped>
.progress-container{
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  padding: 0px 10px 0px 10px ; 
  align-items: center
}
progress{
  width: 300px;
  -webkit-appearance: none;
  border-radius: 10px;
  border: 1px solid #c0c4cc;
  overflow: hidden;
  height: 28px;
}
#progress::-webkit-progress-bar {
  background-color: rgb(255, 255, 255);
}
#progress::-webkit-progress-value {
  background-color: #46a2fd;
}
#progress::-moz-progress-bar {
  background-color: rgb(255, 255, 255);
}
#progress:hover::before{
  content: attr(hover-label);
}
#progress::before{
  position:relative;
  height: 28px;
  content: attr(progress-label);
  top: 0px;
  left: 0;
  font-size: 0.7rem;
  width: 100%;
  font-weight: bold;
  display: flex;
  color: black;
  flex-direction: row;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin-bottom: -28px;
  padding-bottom:2px;
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

.tbl {
  height: calc(100vh - 240px);
}

.modalTemp .modal-footer {
  justify-self: start;
}
.statistics{
  font-weight: bold;
  color: blue;
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

.tbl1 .el-table__row {
    background: #fff !important;
}

.tbl1 .el-table__fixed .el-table__header .cell {
    padding-top: 10px !important;
}

</style>

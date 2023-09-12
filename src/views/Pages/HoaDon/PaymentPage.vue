<template>
  <div class="wrapper m-2">
    <div class="form-row col-md-12 pt-2">
      <div class="d-flex col-md-4">
        <Label text="Tháng:" />
        <DatePicker v-model="search.month" />
      </div>
      <div class="d-flex col-md-4">
        <Label text="Cán bộ đọc:" />
        <DropdownList
          placeholder="Chọn cán bộ đọc"
          v-model="search.nMaNhanVien"
          @onChange="getRouteByName"
        >
          <el-option label="Tất cả " value="0" key="0" v-if="employeeList.length > 1"></el-option>
          <el-option
            v-for="i in employeeList"
            :key="i.id"
            :value="String(i.nMaNhanVien)"
            :label="i.cTenNhanVien"
          ></el-option>
        </DropdownList>
      </div>
      <div class="d-flex col-md-4">
        <Label text="Tuyến đọc:" />
        <DropdownList placeholder="Chọn tuyến đọc" v-model="search.nMaTuyenDoc">
          <el-option label="Tất cả " value="0" key="0"></el-option>
          <el-option
            v-for="i in routeList"
            :key="i.nMaTuyen"
            :value="String(i.nMaTuyen)"
            :label="i.cTenTuyen"
          ></el-option>
        </DropdownList>
      </div>
    </div>
    <div class="form-row col-md-12 pt-2">
      <div class="col-md-6 d-flex">
        <Label text="Tên KH:" />
        <Input
          placeholder="Nhập tên khách hàng"
          v-model="search.cTenKhachHang"
        />
      </div>

      <div class="d-flex col-md-6">
        <Label text="Tình trạng:" />
        <DropdownList placeholder="Tình trạng" v-model="search.nTinhTrang">
          <el-option value="10" label="Tất cả"></el-option>
          <el-option value="0" label="Chưa thanh toán"></el-option>
          <el-option value="1" label="Đã thanh toán"></el-option>
        </DropdownList>

        <base-button
          type="primary"
          native-type="submit"
          style="margin-top: 0px; margin-left: 5px"
          :loading="isSearchLoading"
          @click="handleSearch"
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
            <base-button type="info" outline native-type="submit" :disabled="multipleSelection.length == 0" @click="handlePayment" :loading="isPaymentLoading" title="Xác nhận đã thu tiền khách hàng">
              <span class="btn-inner--icon"><i class="fas fa-check"></i></span>
              <span class="btn-inner--text">&nbsp;Xác nhận thu tiền</span>
            </base-button>
            <base-button type="primary" outline native-type="submit" :disabled="multipleSelection.length == 0" @click="handleSubmit" :loading="isSubmitLoading" title="Xác nhận đã nộp tiền kế toán">
              <span class="btn-inner--icon"><i class="fas fa-check"></i></span>
              <span class="btn-inner--text">&nbsp;Xác nhận nộp tiền</span>
            </base-button>
          </div>
        </div>
        <!-- </el-row> -->
      </template>
      <div class="col-md-12 tbl">
        <el-table
          ref="multipleTable"
          :data="tableData.content"
          header-row-class-name="thead-light"
          size="mini"
          stripe
          height="100%"
          :border="true"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            header-align="center"
            align="center"
            :selectable="canSelectRow"
          >
          </el-table-column>

          <el-table-column
            label="Tên khách hàng"
            prop="cTenKhachHang"
            width="150"
          >
          </el-table-column>

          <el-table-column
            label="Địa chỉ"
            prop="cDiaChi"
            min-width="250"
          ></el-table-column>

          <el-table-column label="Tháng" prop="dThang" width="100">
            <template slot-scope="scope">
              {{ moment(scope.row.dThang).format("MM/YYYY") }}
            </template>
          </el-table-column>

          <el-table-column
            label="Chỉ số cũ"
            prop="nChiSoCu"
            width="100"
            align="right"
          ></el-table-column>

          <el-table-column
            label="Chỉ số mới"
            prop="nChiSoMoi"
            width="100"
            align="right"
          ></el-table-column>

          <el-table-column
            label="Số tiêu thụ"
            prop="nSoLuongTieuThu"
            width="150"
            align="right"
          >
          </el-table-column>

          <el-table-column
            label="Tổng tiền"
            prop="nTongTien"
            width="100"
            align="right"
          >
            <template slot-scope="scope">
              <span>{{ convertToMoney(scope.row.nTongTien) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="nTinhTrang"
            label="Trạng thái"
            width="130"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.nTinhTrang == 2"
                >Đã nộp tiền</el-tag
              >
              <el-tag type="warning" v-if="scope.row.nTinhTrang == 1"
                >Đã thu tiền</el-tag
              >
              <el-tag type="danger" v-if="scope.row.nTinhTrang == 0"
                >Chưa thanh toán</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="downDocx(scope.$index, scope.row)"
                ><i class="el-icon-download mr-1"></i>Xuất phiếu</el-button>
                <!-- @click="getPaymentData(scope.row)"
                @click="downDocx(scope.$index, scope.row)"-->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: space-between">
        <div style="display:flex; justify-content: flex-start;">
        <div class="progress-container">
          <progress id="progress" :progress-label="`${CSDone} / ${ CSTotal }`" 
          :hover-label="`${ CSDone } trên tổng số ${ CSTotal } khách hàng đã thanh toán`" 
          :value="CSDone" :max="CSTotal"></progress>
        </div>
        <div style="display: flex; align-items: center; justify-items: center;">
          <!-- <div style="background-color: #0065cd; display: flex; padding:5px 5px 5px 10px;border-radius: 10px; font-weight: bold; color: white;">
            Đã thanh toán 
            <div style="background-color: white; padding: 0px 10px 0px 10px; margin-left: 10px;border-radius: 5px;color: #0065cd;">
              {{ convertToMoney(CSPaid) }}đ/{{ convertToMoney(CSAmount) }}đ 
            </div>
          </div> -->
          <div class="progress-container">
            <progress id="progress2" :progress-label="`${convertToMoney(CSPaid)} đ/ ${ convertToMoney(CSAmount) } đ`" 
            :hover-label="` Đã thanh toán ${convertToMoney(CSPaid)} đ/ ${ convertToMoney(CSAmount) } đ`" 
            :value="CSPaid" :max="CSAmount"></progress>
          </div>
        </div></div>
        <div>
          <el-pagination
            :page-sizes="[5, 10, 20, 30, 50]"
            background
            layout="sizes,  prev, pager, next"
            :current-page.sync="tableData.pageNum"
            @current-change="handleCurrentPageChange"
            @size-change="handleSizeChange"
            :total="tableData.totalSize"
            :page-size="tableData.pageSize"
          >
          </el-pagination>
        </div>
      </div>
    </el-card>


    <modal :show.sync="errorDetailDialogVisible">
      <h6 slot="header" style="color: black">
        <i class="el-icon-s-grid"></i> Danh sách bản ghi lỗi
      </h6>

      <el-form :show-message="false" label-width="130px" size="mini">
        <el-card class="box-card">
          <template #header class="el-card-header">
            <div
              style="padding: 5px 10px"
              class="form-row justify-content-center"
            >
              <div class="col-md-12">
                <span>Danh sách bản ghi lỗi</span>
              </div>
            </div>
          </template>
          <div class="col-md-12 py-3">
            <base-alert dismissible type="success" >
              {{updateStatus == 1 ? 'Thu' : 'Nộp'}} thành công <strong>{{ successList.length }}</strong> hóa đơn
            </base-alert>
            <base-alert dismissible type="danger" >
              {{updateStatus == 1 ? 'Thu' : 'Nộp'}} lỗi <strong>{{ errorList.length }}</strong> hóa đơn
            </base-alert>
          </div>
          <div class="col-md-12 pb-3 tbl">
            <el-table
              :data="errorList"
              highlight-current-row
              stripe
              height="100%"
              header-align="center"
              header-row-class-name="thead-light"
              :border="true"
              size="mini"
            >
              <el-table-column label="Dòng thứ" header-align="center" width="150" prop="rowIndex" align="center" >
              </el-table-column>

              <el-table-column label="Tên khách hàng" header-align="center" width="150" prop="cTenKhachHang" align="left" >
              </el-table-column>

              <el-table-column label="Thông tin lỗi" header-align="center" min-width="300" prop="error" align="left" >
              </el-table-column>            
            </el-table>
          </div>
        </el-card>
      </el-form>

      <template slot="footer">
        <base-button type="primary" @click="errorDetailDialogVisible = false">Đóng</base-button>
      </template>
    </modal>

  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Label from "../components/Label.vue";
import DatePicker from "../components/DatePicker.vue";
import DropdownList from "../components/DropdownList.vue";
import moment from "moment";
import { saveAs } from "file-saver";
import { convertToMoney } from "../../../util/stringUtils";

export default {
  components: {
    Input,
    Label,
    DatePicker,
    DropdownList,
  },
  data() {
    return {
      CSDone:0,
      CSTotal:0,
      CSPaid:0,
      CSAmount:0,
      errorDetailDialogVisible: false,
      isSearchLoading: false,
      isPaymentLoading: false,
      isSubmitLoading: false,
      tableData: [],
      employeeList: [],
      routeList: [],
      pageRequest: { pageNum: 1, pageSize: 30 },
      listPrint: [],
      dialogForm: false,
      search: {
        month: new Date(),
        nMaNhanVien: "0",
        nMaTuyenDoc: "0",
        nTinhTrang: "10",
        cTenKhachHang: "",
      },
      multipleSelection: [],
      errorList: [],
      successList: [],
      updateStatus: 0
    };
  },
  methods: {
    handleSearch() {
      this.findPage();
    },

    findPage(pageNum, pageSize) {
      this.isSearchLoading = true;
      this.multipleSelection = [];
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 30;

      this.pageRequest.columnFilters = {
        dThang: { value: moment(this.search.month).format("01/MM/YYYY") },
        nMaNhanVien: { value: this.search.nMaNhanVien },
        nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
        nTinhTrang: { value: this.search.nTinhTrang },
      };


      this.$api.bill.findPagePrintBill(this.pageRequest).then((res) => {
        this.isSearchLoading = false;
        if (res.code == 200 && res.data) {
          this.tableData = res.data;
          this.findProgress()
        }
      });
    },

    findProgress() {
      this.CSAmount = 0;
      this.CSDone = 0;
      this.CSPaid = 0;
      this.CSTotal = 0;
      this.pageRequest.columnFilters = {
        dThang: { value: moment(this.search.month).format("01/MM/YYYY") },
        nMaNhanVien: { value: this.search.nMaNhanVien },
        nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
        nTinhTrang: { value: this.search.nTinhTrang },
      };


      this.$api.bill.findPagePrintBill({...this.pageRequest, pageNum: 1, pageSize:1000000 }).then((res) => {
        this.isSearchLoading = false;
        if (res.code == 200 && res.data) {
          let test = res.data.content
          for (let i = 0; i < test.length; i++) {
            this.CSAmount += test[i].nTongTien
            if(test[i].nTinhTrang == 2 ||test[i].nTinhTrang == 1){
              this.CSDone ++
              this.CSPaid += test[i].nTongTien
            }
            
          }
          this.CSTotal = test.length
        }
      });
    },

    downPDF() {
      this.pageRequest.columnFilters = {
        dThang: { value: moment(this.search.month).format("01/MM/YYYY") },
        nMaNhanVien: { value: this.search.nMaNhanVien },
        nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
        nTinhTrang: { value: this.search.nTinhTrang },
      };
      this.$api.bill.billdPDF(this.pageRequest).then((response) => {
        saveAs(
          new Blob([response]),
          "Hoa_don_tien_nuoc_" +
            moment(this.search.month).format("MM.YYYY") +
            ".PDF"
        );
      });
    },

    downXlsx() {
      this.pageRequest.columnFilters = {
        dThang: { value: moment(this.search.month).format("01/MM/YYYY") },
        nMaNhanVien: { value: this.search.nMaNhanVien },
        nMaTuyenDoc: { value: this.search.nMaTuyenDoc },
        nTinhTrang: { value: this.search.nTinhTrang },
      };
      this.$api.bill.billXlsx(this.pageRequest).then((response) => {
        saveAs(
          new Blob([response]),
          "Hoa_don_tien_nuoc_" +
            moment(this.search.month).format("MM.YYYY") +
            ".xlsx"
        );
      });
    },
    getPaymentData(item){
      this.pageRequest.columnFilters = {
        nMaHoaDonHd: { value: item.nMaHoaDonHd },
      };
      this.$api.bill.paymentData(this.pageRequest).then(res =>{
        console.log(res)
      })
    },

    downDocx(index, item) {
      this.pageRequest.columnFilters = {
        nMaHoaDonHd: { value: item.nMaHoaDonHd },
      };
      this.$api.bill.billpdfPC(this.pageRequest).then((response) => {
        saveAs(
          new Blob([response]),
          "Phieu_tien_nuoc_" +
            moment(this.search.month).format("MM.YYYY") +
            ".pdf"
        );
      });
    },

    handleCurrentPageChange: function (val) {      
      if(this.multipleSelection.length > 0)
        this.$confirm("Việc thay đổi này sẽ làm mất các dữ liệu đã chọn. Bạn muốn tiếp tục không?", "Xác nhận", {confirmButtonText: "Xác nhận", cancelButtonText: "Hủy", type: "warning"})
        .then(() => {
          this.findPage(val, this.pageRequest.pageSize);
        })
        .catch(() => {});
      else
        this.findPage(val, this.pageRequest.pageSize);
    },

    handleSizeChange: function (val) {
      if(this.multipleSelection.length > 0)
        this.$confirm("Việc thay đổi này sẽ làm mất các dữ liệu đã chọn. Bạn muốn tiếp tục không?", "Xác nhận", {confirmButtonText: "Xác nhận", cancelButtonText: "Hủy", type: "warning"})
        .then(() => {
          this.findPage(this.pageRequest.pageNum, val);
        })
        .catch(() => {});
      else
        this.findPage(this.pageRequest.pageNum, val);      
    },

    getEmployee() {
      return this.$api.employee.findAll({}).then((res) => {
        this.employeeList = res.data;
        if(res.data.length == 1) {
          this.search.nMaNhanVien = res.data[0].nMaNhanVien.toString()
          this.getRouteByName(res.data[0].nMaNhanVien)
        }
      });
    },

    getRouteByName(id) {
      this.$api.route.showById({ nMaNhanVien: id }).then((res) => {
        this.routeList = res.data;
        this.search.nMaTuyenDoc = "0";
      });
    },

    handlePayment() {
      this.$confirm("Bạn muốn tiếp tục ghi nhận không?", "Xác nhận", {confirmButtonText: "Xác nhận", cancelButtonText: "Hủy", type: "warning"}).then(() => {
          try {
              this.isPaymentLoading = true
              this.updateStatus = 1
              this.$api.bill.paymentList(this.multipleSelection).then((res) => {
                if(res.code == 200 && res.data) {
                  const data = res.data
                  let errorList = []
                  let successList= []
                  for(let i = 0; i < data.length; i++) {
                    if(data[i].error)
                      errorList.push(data[i])
                    else
                      successList.push(data[i])
                  }
                  
                  this.errorList = errorList
                  this.successList = successList

                  if(errorList.length > 0)
                    this.errorDetailDialogVisible = true
                  else
                    this.$message({message: "Thu thành công " + successList.length + " hóa đơn", type: "success"});
                  this.findPage();
                }
                else 
                    this.$message({message: res.msg, type: "error"})
                                
                this.isPaymentLoading = false
              });
          }
          catch(ex) {
            console.log(ex)
            this.isPaymentLoading = false
          }
        })
        .catch(() => {});
    },

    handleSubmit() {
      this.$confirm("Bạn muốn tiếp tục ghi nhận không?", "Xác nhận", {confirmButtonText: "Xác nhận", cancelButtonText: "Hủy", type: "warning"}).then(() => {
          try {
              this.isSubmitLoading = true
              this.updateStatus = 2
              this.$api.bill.paymentList2(this.multipleSelection).then((res) => {
                if(res.code == 200 && res.data) {
                  const data = res.data
                  let errorList = []
                  let successList= []
                  for(let i = 0; i < data.length; i++) {
                    if(data[i].error)
                      errorList.push(data[i])
                    else
                      successList.push(data[i])
                  }
                  
                  this.errorList = errorList
                  this.successList = successList

                  if(errorList.length > 0)
                    this.errorDetailDialogVisible = true
                  else
                    this.$message({message: "Nộp thành công " + successList.length + " hóa đơn", type: "success"});
                  this.findPage();
                }
                else 
                    this.$message({message: res.msg, type: "error"})
                                
                this.isSubmitLoading = false
              });
          }
          catch(ex) {
            console.log(ex)
            this.isSubmitLoading = false
          }
        })
        .catch(() => {});
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    canSelectRow(row, index) {
      return row.nTinhTrang == 0 ;
    },

    convertToMoney(number) {
      return convertToMoney(number);
    },
  },

  mounted() {
    Promise.all([this.getEmployee()]).then(res => {
      this.findPage();
    })    
  },
};
</script>

<style scoped>
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
  background-color: aliceblue;
}
#progress::-webkit-progress-value {
  background-color: #0065cd;
}
#progress::-moz-progress-bar {
  background-color: aliceblue;
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
  padding-bottom:3px;
}
#progress2{
  -webkit-appearance: none;
  border-radius: 10px;
  border: 1px solid #c0c4cc;
  overflow: hidden;
  height: 28px;
}
#progress2::-webkit-progress-bar {
  background-color: aliceblue;
}
#progress2::-webkit-progress-value {
  background-color: green;
}
#progress2::-moz-progress-bar {
  background-color: aliceblue;
}
#progress2:hover::before{
  content: attr(hover-label);
}
#progress2::before{
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
.tbl {
  height: calc(100vh - 250px);
}
.select-item {
  width: 100%;
}
.date-item {
  width: 100%;
}
.box-card {
  margin: 10px;
}
</style>

<style>

.modal-show .modal-dialog {
  justify-content: center;
}

.modal-show .modal-content {
  max-width: 600px;
}

.box-card {
  margin: 10px;
}

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

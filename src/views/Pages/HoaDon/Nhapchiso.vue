<template>
  <div class="nhapchiso">
    <div class="col-md-12 form-row pt-2">      
      <div class="col-md-2 flex">
        <Label text="Tháng:" />
        <el-date-picker
          v-model="searchForm.dThang"
          type="month"
          size="mini"
          format="MM/yyyy"
          placeholder="Chọn tháng"
        >
        </el-date-picker>
      </div>

      <div class="col-md-5 flex">
        <Label text="Cán bộ đọc:" />
        <DropdownList
          placeholder="Chọn cán bộ đọc"
          v-model="searchForm.nMaNhanVien"
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

      <div class="col-md-5 flex">
        <Label text="Tuyến đọc:" />
        <DropdownList
          placeholder="Chọn tuyến đọc"
          v-model="searchForm.nMaTuyenDoc"
        >
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

    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 d-flex">
        <Label text="Tên KH:" />
        <Input
          placeholder="Nhập tên khách hàng"
          v-model="searchForm.cTenKhachHang"
        />
      </div>

      <div class="col-md-6 d-flex">
        <Label text="Trạng thái:" />
        <DropdownList
          placeholder="Chọn trạng thái"
          v-model="searchForm.nTrangThaiDongHo"
        >
          <el-option label="Tất cả " value="0"></el-option>
          <el-option label="Chưa ghi" value="1"></el-option>
          <el-option label="Đã ghi" value="2"></el-option>
          <el-option label="ĐH cắt" value="3"></el-option>
          <el-option label="ĐH không sử dụng" value="4"></el-option>
          <el-option label="Vắng chủ" value="5"></el-option>
          <el-option label="Tạm thu" value="6"></el-option>
          <el-option label="Tạm ngưng" value="7"></el-option>
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
        <div style="padding: 5px 10px" class="form-row justify-content-center">
          <div class="col-md-12">
            <base-button
              :loading="isLoadingEnterIndexDownload"
              outline
              native-type="submit"
              type="primary"
              @click="recordDownload"
            >
              <span class="btn-inner--icon"
                ><i class="el-icon-download"></i
              ></span>
              <span class="btn-inner--text">&nbsp;Xuất danh sách</span>
            </base-button>
            <base-button
              :loading="uploadLoading"
              type="primary"
              outline
              native-type="submit"
            >
              <el-upload
                id="btn_upload"
                :auto-upload="false"
                action=""
                :file-list="fileList"
                :on-change="recordUpload"
                name="file"
                ref="upload"
                :show-file-list="false"
                :multiple="false"
                :limit="1"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              >
                <span class="btn-inner--icon"
                  ><i class="el-icon-upload2"></i
                ></span>
                <span class="btn-inner--text">&nbsp;Tải lên danh sách</span>
              </el-upload>
            </base-button>
          </div>
        </div>
      </template>
      <div class="col-md-12 tbl">
        <el-table
          :data="listInputIndex.content"
          :border="true"
          highlight-current-row
          header-row-class-name="thead-light"
          stripe
          style="height: 100%"
          height="100%"
          fit
          size="mini"
          v-loading="isSearchLoading"
        >
          <el-table-column
            label="STT"
            header-align="center"
            type="index"
            width="65px"
          >
          </el-table-column>

          <el-table-column
            label="Tuyến đọc"
            header-align="center"
            prop="cTenTuyen"
            min-width="200px"
          >
          </el-table-column>

          <el-table-column label="Số HĐ" prop="nMaHopDong"> </el-table-column>

          <el-table-column
            label="Seri ĐH"
            header-align="center"
            prop="cSerial"
            min-width="100px"
          >
          </el-table-column>

          <el-table-column
            label="Tên khách hàng"
            header-align="center"
            prop="cTenKhachHang"
            min-width="150px"
          >
          </el-table-column>

          <el-table-column
            label="Địa chỉ"
            header-align="center"
            prop="cDiaChiKhachHang"
            min-width="300px"
          >
          </el-table-column>

          <el-table-column
            label="Chỉ số cũ"
            header-align="center"
            prop="nChiSoCu"
            class-name="chisocu"
            min-width="100px"
          >
          </el-table-column>

          <el-table-column
            label="Chỉ số mới"
            header-align="center"
            prop="nChiSoMoi"
            class-name="chisomoi"
            width="100px"
          >
            <template slot-scope="scope">
              <b-form-input
                v-if="scope.row.isEdit && selectedCell === 'chisomoi'"
                v-model="scope.row.nChiSoMoi"
                style="height:30px"
                @change="saveRecord(scope.$index, scope.row)"
              >
              </b-form-input>
              <p
                style="font-size: 12px; margin-bottom: 0px"
                v-else
                @click="editCellHandler(scope, 'chisomoi')"
              >
                {{ scope.row.nChiSoMoi }}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            label="Tiền thắp sáng"
            header-align="center"
            prop="nTienThapSang"
            class-name="tienthapsang"
            width="180"
          >
            <template slot-scope="scope">
              <div class="tien_thap_sang"
              @click="unlockEdit(scope.$index)"
              >
                <b-form-input
                style="height:30px"
                :disabled="scope.row.nChotSo != 4 || scope.row.nKhoaSo != 2 || scope.row.nTinhTrang != 6"
                v-model="scope.row.nPhiDichVu"
                @blur="saveServiceFee(scope.$index, scope.row)"              
              >
              </b-form-input>
              <!-- <el-button size="mini" 
              type="primary"><i class="fas fa-edit"></i></el-button> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Số khẩu"
            header-align="center"
            prop="nSoKhau"
            class-name="tienthuho"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="Ngày đọc"
            header-align="center"
            prop="dNgayDoc"
            min-width="200px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayDoc">{{
                moment(scope.row.dNgayDoc).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column
            label="Ngày đồng bộ"
            header-align="center"
            prop="dDongBo"
            min-width="130px">
            <template slot-scope="scope">
                <span v-if="scope.row.dDongBo">{{moment(scope.row.dDongBo).format('DD/MM/YYYY')}}</span>
            </template>
          </el-table-column> -->

          <!-- <el-table-column
            label="Trạng thái ghi"
            header-align="center"
            min-width="130px"
          >
          </el-table-column> -->

          <el-table-column
            label="Ngày đầu kỳ"
            header-align="dNgayDauKy"
            prop="dNgayDauKy"
            min-width="120px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayDauKy">{{
                moment(scope.row.dNgayDauKy).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="Ngày cuối kỳ"
            header-align="center"
            prop="dNgayCuoiKy"
            min-width="120px"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayCuoiKy">{{
                moment(scope.row.dNgayCuoiKy).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="Trạng thái đồng hồ"
            header-align="center"
            prop="nTrangThaiDongHo"
            width="120px"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.nTrangThaiDongHo == 0">Ngưng sử dụng</el-tag>
              <el-tag type="warning" v-if="scope.row.nTrangThaiDongHo == 1">Chờ sử dụng</el-tag>
              <el-tag type="success" v-if="scope.row.nTrangThaiDongHo == 2">Đang sử dụng</el-tag
              >
            </template>
          </el-table-column>

          <el-table-column
            label="Ghi chú"
            header-align="center"
            prop="cGhiChu"
            min-width="150px"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: space-between">
        <div  class="progress-container">
          <progress id="progress" :progress-label="`${CSDone} / ${ CSTotal }`" 
          :hover-label="`Đã ghi ${ CSDone } trên tổng số ${ CSTotal } khách hàng`" 
          :value="CSDone" :max="CSTotal"></progress>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="listInputIndex.pageNum"
            :page-size="listInputIndex.pageSize"
            :total="listInputIndex.totalSize"
            :page-sizes="[5, 10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper"
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
              Ghi nhận thành công <strong>{{ successList.length }}</strong> bản ghi
            </base-alert>
            <base-alert dismissible type="danger" >
              Ghi nhận lỗi <strong>{{ errorList.length }}</strong> bản ghi
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
import {
  Table,
  Button,
  TableColumn,
  Pagination,
  Card,
  Option,
} from "element-ui";
import DropdownList from "../components/DropdownList.vue";
import { saveAs } from "file-saver";
import moment from "moment";
import { mapState } from "vuex";

export default {
  components: {
    [Button.name]: Button,
    Input,
    Label,
    DropdownList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Card.name]: Card,
    [Option.name]: Option,
  },
  data() {
    return {      
      selectedDate: [moment().startOf("month"), moment().endOf("month")],
      isSearchLoading: false,
      isLoadingEnterIndexDownload: false,
      uploadLoading: false,
      listInputIndex: {},
      fileList: [],
      selectedCell: null,
      employeeList: [],
      routeList: [],

      pageRequest: { pageNum: 1, pageSize: 30 },
      searchForm: {
        cTenKhachHang: "",
        cTen: "",
        dThang: new Date(),
        dToDate: "",
        nMaNhanVien: "0",
        nMaTuyenDoc: "0",
        cTenSo: "",
        nTrangThaiDongHo: "0",
      },
      listRecord: {
        nMaSoChiSoDt: "",
        nChiSoCu: "",
        nChiSoMoi: "",
      },
      errorDetailDialogVisible: false,
      errorList: [],
      successList: [],
      CSDone:0,
      CSTotal:0,
    };
  },
  computed: {
    ...mapState({
      recordList: (state) => state.record.recordList,
    }),
  },
  methods: {
    unlockEdit(id) {
      if(this.listInputIndex.content[id].nKhoaSo != 1)
      this.listInputIndex.content[id].nLock = 2;
    },

    saveServiceFee(id,item){
      item.nLock = 1;
      if(!(/^\d+$/.test(item.nPhiDichVu)))
      {
        this.$message({
          type: "error",
          message: "Phí dịch vụ phải là số nguyên dương",
        });
        item.nPhiDichVu = 0;
        return;
      }
      else{

        this.$api.record.updateServiceFee({id: item.nMaSoChiSoDt, nPhiDichVu: item.nPhiDichVu, nMaCT: item.nMaCongTy}).then(res => {
          if(res.code == 200)
          this.$message({
            type: "success",
            message: "Cập nhật phí dịch vụ thành công",
          });
          else
          this.$message({
            type: "error",
            message: "Cập nhật phí dịch vụ thất bại: " + res.msg,
          });
        }).catch(err => {
          this.$message({
            type: "error",
            message: "Cập nhật phí dịch vụ thất bại",
          });
      })
      }
      
    },

    handleSizeChange(val) {
      this.findRecordDT(this.pageRequest.pageNum, val);
    },

    handleCurrentChange(val) {
      this.findRecordDT(val, this.pageRequest.pageSize);
    },

    findRecordDT(pageNum, pageSize) {
      try {
          this.isSearchLoading = true
          if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
          else this.pageRequest.pageNum = 1;

          if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
          else this.pageRequest.pageSize = 30;
          if (this.recordList.nMaSoChiSoHd) {
            this.searchForm = {
              cTenKhachHang: this.searchForm.cTenKhachHang,
              nMaNhanVien: this.recordList.nMaNhanVienDocChiSo.toString(),
              dThang: this.recordList.dThang,
              nMaTuyenDoc: this.recordList.nMaTuyenDoc.toString(),
              nTrangThaiDongHo: this.searchForm.nTrangThaiDongHo,
            };
            this.getRouteByName(this.recordList.nMaNhanVienDocChiSo)
          }

          this.$store.commit("setRecordList", {});

          this.pageRequest.columnFilters = {        
            dThang: { value: moment(this.searchForm.dThang).format("01/MM/YYYY") },
            nMaNhanVien: { value: this.searchForm.nMaNhanVien },
            nMaTuyenDoc: { value: this.searchForm.nMaTuyenDoc },
            cTenKhachHang: { value: this.searchForm.cTenKhachHang },
            nTrangThaiDongHo: { value: this.searchForm.nTrangThaiDongHo },
          };

          this.$api.record.findRecordDT(this.pageRequest).then((res) => {
            this.isSearchLoading = false
            if (res.code == 200 && res.data) {
              
              this.listInputIndex = res.data;
              this.listInputIndex.content = this.listInputIndex.content.map(i=>({...i, nLock: 1}))
              // console.log(this.listInputIndex)
              this.findProgress()
            } else this.listInputIndex = {};
          });
      }
      catch(ex) {
          console.log(ex)
          this.isSearchLoading = false
      }      
    },
    findProgress(){
      try {
        this.CSDone = 0;
        this.CSTotal = 0;
          if (this.recordList.nMaSoChiSoHd) {
            this.searchForm = {
              cTenKhachHang: this.searchForm.cTenKhachHang,
              nMaNhanVien: this.recordList.nMaNhanVienDocChiSo.toString(),
              dThang: this.recordList.dThang,
              nMaTuyenDoc: this.recordList.nMaTuyenDoc.toString(),
              nTrangThaiDongHo: this.searchForm.nTrangThaiDongHo,
            };
            this.getRouteByName(this.recordList.nMaNhanVienDocChiSo)
          }

          this.$store.commit("setRecordList", {});

          this.pageRequest.columnFilters = {        
            dThang: { value: moment(this.searchForm.dThang).format("01/MM/YYYY") },
            nMaNhanVien: { value: this.searchForm.nMaNhanVien },
            nMaTuyenDoc: { value: this.searchForm.nMaTuyenDoc },
            cTenKhachHang: { value: this.searchForm.cTenKhachHang },
            nTrangThaiDongHo: { value: this.searchForm.nTrangThaiDongHo },
          };

          this.$api.record.findRecordDT({...this.pageRequest, pageNum: 1, pageSize:1000000 }).then((res) => {
            if (res.code == 200 && res.data) {
              for (let i = 0; i < res.data.content.length; i++) {
                if(res.data.content[i].nChiSoCu < res.data.content[i].nChiSoMoi){
                  this.CSDone ++
                }
                
              }
              this.CSTotal= res.data.content.length
            }
          });
      }
      catch(ex) {
          console.log(ex)
      }      
    },
    editCellHandler(data, name) {
      this.listInputIndex.content = this.listInputIndex.content.map((data) => ({
        ...data,
        isEdit: false,
      }));
      if (
        data.row.nChotSo == 4 &&
        data.row.nKhoaSo == 2 &&
        data.row.nTinhTrang == 6
      ) {
        this.listInputIndex.content[data.$index].isEdit = true;
      } else {
        this.listInputIndex.content[data.$index].isEdit = false;
      }

      this.selectedCell = name;
    },

    saveRecord(index, data) {
      this.listInputIndex.content[index].isEdit = false;
      let panma = {
        nMaSoChiSoDt: data.nMaSoChiSoDt,
        nChiSoCu: data.nChiSoCu,
        nChiSoMoi: data.nChiSoMoi,
      };
      this.$api.record.saveRecord(panma).then((res) => {
        if (res.code == 200) {
          this.findRecordDT();
          this.$message({
            message: "Cập nhật chỉ số thành công",
            type: "success",
          });
        } else {
          this.$message({
            message: "Cập nhật chỉ số không thành công! " + res.msg,
            type: "error",
          });
        }
      });
    },

    recordDownload: function () {
      try {
        let dThang = "";
        if (this.selectedDate && this.selectedDate.length == 1) {
          dThang = moment(this.selectedDate[0]).format("DD/MM/YYYY");
        }
        this.isLoadingEnterIndexDownload = true;
        this.pageRequest.columnFilters = {
          cTenKhachHang: { value: this.searchForm.cTenKhachHang },
          nMaNhanVien: { value: this.searchForm.nMaNhanVien },
          dThang: { value: moment(this.searchForm.dThang).format("01/MM/YYYY"), },
          nMaTuyenDoc: { value: this.searchForm.nMaTuyenDoc },
          nTrangThaiDongHo: { value: this.searchForm.nTrangThaiDongHo },
        };

        this.$api.record.recordDownload(this.pageRequest).then((res) => {
          saveAs(
            new Blob([res]),
            "Nhap_Chi_So_Thang " +
              moment(this.searchForm.dThang).format("MM-YYYY") +
              ".xlsx"
          );
          this.isLoadingEnterIndexDownload = false;
        });
      } catch (ex) {
        this.$message({ message: "Tải xuống thất bại", type: "warning" });
      }
    },

    recordUpload: function (file, fileList) {
      this.uploadLoading = true;
      if (!file.raw.name.endsWith(".xlsx")) {
        this.fileList = [];
        this.uploadLoading = false;
        this.$message({message: "Vui lòng chọn file '.xlsx", type: "error"});
        return;
      }
      const formData = new FormData();
      formData.append("file", file.raw);
      this.$api.record.recordUpload(formData).then((res) => {        
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
          this.errorDetailDialogVisible = true

          this.findRecordDT();
          this.fileList = [];          
        }
        else {
            this.$message({message: res.msg, type: "error"});
        }  
        this.uploadLoading = false;      
      });
    },

    handleSearch: function () {
      this.findRecordDT();
    },
    
    getEmployee() {
      return this.$api.employee.findAll({}).then((res) => {
        this.employeeList = res.data;
        if(res.data.length == 1) {
          this.searchForm.nMaNhanVien = res.data[0].nMaNhanVien.toString()
          this.getRouteByName(res.data[0].nMaNhanVien)
        }
      });
    },
    getRouteByName(id) {
      this.$api.route.showById({ nMaNhanVien: id }).then((res) => {
        this.routeList = res.data;
        this.searchForm.nMaTuyenDoc = "0"
      });
    },
  },

  mounted() {
    Promise.all([this.getEmployee()]).then(res => {
      this.findRecordDT();
    })    
  },
};
</script>

<style>
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
  padding-bottom:2px;
}
.tien_thap_sang{
  display: flex;
  justify-content: space-between;
}
.tien_thap_sang .el-button{
  margin-left: 5px;
}
.chisomoi {
  background: #d8e8db !important;
}
.chisomoi:hover {
  cursor: text;
}
.tbl .el-table .thead-light th {
  background-color: #28527a !important;
}

.select-item .el-input__inner {
  color: #000;
  border: 1px solid #b1b4b8;
  height: 1.6rem !important;
}

.select-item .el-input__icon {
  line-height: 1.6rem;
}
</style>

<style scoped>
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
  height: calc(100vh - 245px);
}
.modalTemp .modal-footer {
  justify-self: start;
}

.select-item {
  flex: auto;
  width: auto;
}
</style>

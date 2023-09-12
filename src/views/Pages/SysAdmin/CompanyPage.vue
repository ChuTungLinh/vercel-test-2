<template>
  <div class="wrapper m-2">
    <!-- Button thêm -->
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-4">
        <Label text="Công ty:" />
        <Input placeholder="Nhập tên công ty" v-model="search.cTenCongTy" />
      </div>
      <div class="d-flex col-md-4">
        <Label text="Người đại diện:" />
        <Input placeholder="Nhập tên người đại điện " v-model="search.cNguoiDaiDien" />
      </div>
      <div class="d-flex col-md-4">
        <Label text="Mã viết tắt:" />
        <Input placeholder="Nhập mã viết tắt " v-model="search.cMaVietTat" />
      </div>
    </div>
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-4">
        <Label text="Điện thoại:" />
        <Input placeholder="Nhập số điện thoại " v-model="search.cDienThoai" />
      </div>
      <div class="d-flex col-md-3">
        <Label text="Địa chỉ:" />
        <Input placeholder="Nhập địa chỉ " v-model="search.cDiaChi" />
      </div>
      <div class="d-flex col-md-5">
        <Label text="Trạng thái:" />
        <DropdownList placeholder="Chọn trạng thái" v-model="search.nTinhTrang" @onChange="findCompany">
          <el-option label="Trạng thái tài khoản" value="5"></el-option>
          <el-option label="Hoạt động" value="1"></el-option>
          <el-option label="Đã khóa" value="0"></el-option>
        </DropdownList>
        <base-button type="primary" native-type="submit" style="margin-left: 5px" @click="handleSearch">
          <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
          <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
      </div>
    </div>

    <!-- Bảng thông tin công ty -->
    <el-card class="box-card">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px" class="form-row">
          <div class="col-md-6">
            <base-button type="primary" outline native-type="submit" :loading="isLoading" @click="handleAdd">
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">&nbsp;Thêm công ty</span>
            </base-button>
            <base-button type="primary" outline native-type="submit" :loading="isLoading" @click="companyDownload">
              <span class="btn-inner--icon"><i class="fa fa-download"></i></span>
              <span class="btn-inner--text">&nbsp;Tải về</span>
            </base-button>
          </div>
        </div>
      </template>

      <div class="col-md-12 tbl">
        <el-table :data="Data" header-row-class-name="thead-light" :border="true" size="mini" height="100%" stripe>
          <el-table-column prop="cTenCongTy" label="Tên công ty" width="350">
            <template slot-scope="scope">
              <el-button style="font-weight: 400" type="text" @click="handleView(scope.$index, scope.row)"><span
                  class="ml-4">{{ scope.row.cTenCongTy }}</span></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="cNguoiDaiDien" label="Người đại diện" width="180">
          </el-table-column>
          <el-table-column prop="cDiaChi" label="Địa chỉ" width="200">
          </el-table-column>

          <el-table-column prop="cEmail" label="Email" width="200">
          </el-table-column>

          <el-table-column prop="cDienThoai" label="Điện thoại" width="150">
          </el-table-column>

          <el-table-column prop="cMaVietTat" label="Mã viết tắt" width="120">
          </el-table-column>

          <el-table-column prop="cAVT" label="Hình ảnh" width="100">
            <template slot-scope="scope">
              <el-image style="width: 50px; height: 50px" :src="src" v-if="scope.row.cAVT == null">
              </el-image>
              <el-image style="" :src="scope.row.url" v-if="scope.row.url">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="dNgayTao" label="Ngày tạo" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayTao">{{
                moment(scope.row.dNgayTao).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cToken" label="URL" width="120" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleGetURL(scope.row.cToken)" width="100">Lấy URL</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="nTinhTrang" label="Tình trạng" width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.nTinhTrang == 1">Hoạt Động</el-tag>
              <el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Đã khóa</el-tag>
            </template>
          </el-table-column>
          <!-- Button hành động -->
          <el-table-column width="200" align="center" style="padding: 0">
            <template slot-scope="scope">
              <el-button :disabled="scope.row.nTinhTrang == 0" size="mini" type="warning"
                style="margin-bottom: 5px; padding-left: 28px; padding-right: 28px;"
                @click="handleAddData(scope.$index, scope.row)"><i class="el-icon-edit mr-1"></i>Nhập dữ liệu</el-button>
              <br>
              <el-button :disabled="scope.row.nTinhTrang == 0" size="mini" type="primary"
                @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit mr-1"></i>Sửa</el-button>
              <el-button :disabled="scope.row.nTinhTrang == 0" size="mini" type="danger"
                @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete mr-1"></i>Xóa</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="tableData.pageNum" :page-sizes="[5, 10, 20, 30, 40]" :page-size="tableData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.totalSize">
        </el-pagination>
      </div>
    </el-card>
    <modal :show.sync="addDataCompany" dataBackDrop="static">
      <h6 slot="header">Nhập dữ liệu cho công ty</h6>
      <fieldset>
        <legend>Nhập dữ liệu đồng hồ</legend>
        <div class="" style="display: flex;justify-content: space-around; margin-bottom: 5px;">
          <el-button type="primary" plain @click="downloadClockTemplate">
            <span>Tải mẫu nhập đồng hồ</span>
          </el-button>
          <div class="">
            <label>Nhập file excel chứa dữ liệu đồng hồ</label>
            <br>
            <input type="file" ref="clockExcel" placeholder="Chọn file" @change="addClockExcel" />
          </div>
          <el-button type="primary" @click="handleUpdateClock">Nhập đồng hồ</el-button>
        </div>
      </fieldset>
      <div class="" style="display: flex; justify-content: space-between">
        <fieldset style="width: 48%;">
          <legend>Nhập dữ liệu khách hàng</legend>
          <el-button style="margin:10px" type="primary" @click="downloadCustomerTemplate">Tải file mẫu</el-button>
          <fieldset style="padding:10px; padding-top: 0;">
            <legend>Nhập dữ liệu khách hàng</legend>
            <input type="file" ref="customerExcel" placeholder="Chọn file" @change="addCustomerExcel" />
            <el-button style="margin-left: 10px;" type="primary" @click="handleUpdateCustomer">Nhập khách hàng</el-button>

          </fieldset>
        </fieldset>
        <fieldset style="width: 48%;">
          <legend>Lưu ý khi nhập dữ liệu khách hàng</legend>
          <ul style="margin-left: 20px;">
            <li>Định dạng file excel phải là .xlsx</li>
            <li>File excel phải có cấu trúc như mẫu tải về</li>
            <li>Cột tiêu đề màu đỏ là bắt buộc, còn lại có thể bỏ trống</li>
            <li>Các trường :"Đối tượng giá","Phương thức thanh toán","Serial đồng hồ nước","Tuyến đọc số nước" tại sheet
              "import data" có thể chọn giá trị tại trường</li>
            <li>Nếu trong thanh chọn của một trường không có giá trị nào hiển thị thì danh sách tương ứng với trường đó
              hiện tại không có giá trị nào có hợp lệ để thêm, xin vui lòng thêm giá trị cho danh sách đó và tải lại file
              mẫu.</li>
            <li>Tên ngân hàng copy từ sheet "Danh sách ngân hàng", copy đúng tên ngân hàng</li>
            <li>Để dễ dàng tìm kiếm ngân hàng sử dụng tổ hợp phím "Ctrl +F"</li>
            <li>Kinh độ, vĩ độ của đồng hồ nước thể hiện vị trí cụ thể của đồng hồ. Điền tọa độ chính xác để có thể theo
              dõi trong mục "Bản đồ"</li>
          </ul>
        </fieldset>
      </div>
      <template slot="footer">
        <base-button outline type="danger" @click="addDataCompany = false">Thoát</base-button>
      </template>
    </modal>
    <!-- Modal -->
    <modal :show.sync="centerDialogVisible" class="modalTemp" dataBackDrop="static">
      <h6 slot="header" class="modal-title" v-if="!operation">Thêm công ty</h6>
      <h6 slot="header" class="modal-title" v-if="operation">
        Cập nhật thông tin
      </h6>
      <el-form :model="dataForm" ref="dataForm" :rules="rules" label-width="150px" class="demo-ruleForm" size="mini">
        <div class="row">
          <div class="col-sm">
            <el-form-item label="Tên công ty" prop="cTenCongTy" width="150">
              <el-input v-model="dataForm.cTenCongTy" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Mã viết tắt" prop="cMaVietTat">
              <el-input v-model="dataForm.cMaVietTat" autocomplete="off" :disabled="operation"></el-input>
            </el-form-item>

            <el-form-item label="Người đại diện" prop="cNguoiDaiDien">
              <el-input v-model="dataForm.cNguoiDaiDien" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Địa chỉ" prop="cDiaChi">
              <el-input v-model="dataForm.cDiaChi" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Số điện thoại" prop="cDienThoai">
              <el-input v-model="dataForm.cDienThoai" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="cEmail">
              <el-input v-model="dataForm.cEmail" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Chọn ảnh:" prop="cAVT">
              <el-upload class="upload-demo" action="#" :auto-upload="false" :on-change="handleImg" accept="image/*" :limit="1"
                ref="upload1" list-type="picture">
                <el-button slot="trigger" size="small" type="primary"><i class="el-icon-upload"></i> Tải lên</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="Chữ ký:" prop="cSignature">
              <el-upload class="upload-demo" action="#" :auto-upload="false" :on-change="handleSignature" accept="image/*" :limit="1"
                ref="upload2" list-type="picture">
                <el-button slot="trigger" size="small" type="primary"><i class="el-icon-upload"></i> Tải lên</el-button>
              </el-upload>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <template slot="footer">
        <base-button v-if="!operation" type="primary" @click="saveCompany()" :loading="isLoading">Thêm</base-button>
        <base-button v-if="operation" type="primary" @click="saveCompany()" :loading="isLoading">Lưu</base-button>
        <base-button outline type="danger" @click="closeForm('dataForm')">Thoát</base-button>
      </template>
    </modal>
    <!-- Modal chi tiết công ty -->
    <modal :show.sync="detailDiaglog">
      <h6 slot="header" class="modal-title">Chi tiết công ty</h6>
      <div class="d-flex justify-content-center">
        <div class="user d-flex flex-column" style="align-items: center; flex: 1">
          <img style="width: 200px; height: 200px" :src="this.dataForm.url" />
          <span class="font-details" style="font-size: 20px;text-align: center;">
            {{ this.dataForm.cTenCongTy }}</span>
        </div>
        <div style="padding: 5px 15px; border-left: 1px solid #ccc; flex: 1">
          <div class="d-flex flex-column pl-4">
            <div class="d-flex mt-2">
              <span class="font-details">Người đại diện:</span>
              <span class="ml-4">{{ this.dataForm.cNguoiDaiDien }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Mã viết tắt: </span>
              <span class="ml-4">{{ this.dataForm.cMaVietTat }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Email: </span>
              <span class="ml-4">{{ this.dataForm.cEmail }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Số điện thoại: </span>
              <span class="ml-4">{{ this.dataForm.cDienThoai }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Địa chỉ: </span>
              <span class="ml-4">{{ this.dataForm.cDiaChi }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Tình trạng:</span>
              <span v-if="this.dataForm.nTinhTrang == 1" class="ml-4">Hoạt động</span>
              <span v-if="this.dataForm.nTinhTrang == 0" class="ml-4">Đã xóa</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Người tạo: </span>
              <span class="ml-4">{{ this.dataForm.cNguoiTao }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Ngày tạo: </span>
              <span class="ml-4">{{
                moment(this.dataForm.dNgayTao).format("DD/MM/YYYY")
              }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Người cập nhật cuối: </span>
              <span class="ml-4">{{ this.dataForm.cNguoiCapNhatCuoi }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Ngày cập nhật cuối: </span>
              <span class="ml-4">{{
                moment(this.dataForm.dNgayCapNhatCuoi).format("DD/MM/YYYY")
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <base-button outline type="danger" @click="detailDiaglog = false">Thoát</base-button>
      </template>
    </modal>
    <modal :show.sync="showResult" dataBackDrop="static">
      <h6>Kết quả nhập dữ liệu</h6>
      <h6 v-if="showType == 0">Nhập thành công <span style="color: green;">{{ success }}</span> đồng hồ, <span
          style="color: red;">{{ fail }}</span> thất bại !</h6>
      <h6 v-if="showType == 1">Nhập thành công <span style="color: green;">{{ success }}</span> khách hàng, <span
          style="color: red;">{{ fail }}</span> thất bại !</h6>
      <el-table max-height="400px" :data="resultTable" class="table-result" header-row-class-name="thead-light"
        :border="true" size="mini">
        <el-table-column prop="result" label="Kết quả" />
        <el-table-column v-if="showType == 0" prop="serial" label="Serial" />
        <el-table-column v-if="showType == 1" prop="cTenKhachHang" label="Tên Khách Hàng" />
        <el-table-column label="Chi Tiết">
          <template #default="scope">
            <div>
              <span style="word-break: break-word;">{{ scope.row.msg }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <template slot="footer">
        <base-button outline type="success" @click="handleDownloadResult"><i class="fa fa-download"></i>Tải
          xuống</base-button>
        <base-button outline type="danger" @click="showResult = false, type = ''">Thoát</base-button>

      </template>
    </modal>
    <modal :show.sync="showURL" dataBackDrop="static">
      <h6>URL</h6>
      <div style="display: flex; flex-wrap: nowrap; ">
        <el-input id="url" v-model="URL" readonly></el-input>
        <el-button type="primary" @click="handleCopyToClipBoard">Copy</el-button>
      </div>

      <template slot="footer">
        <base-button outline type="danger" @click="showURL = false, type = 'primary'">Thoát</base-button>
      </template>
    </modal>
  </div>
</template>


<script>
import { saveAs } from "file-saver";
import moment from "moment";
import Input from "../components/Input.vue";
import Label from "../components/Label.vue";
import DropdownList from "../components/DropdownList.vue";
import {baseUrl} from '@/util/global'
export default {
  components: {
    Input,
    Label,
    DropdownList,
  },
  data() {
    return {
      URL: "",
      showURL: false,
      type: '',
      tableData: {
        content: []
      },
      addDataCompany: false,
      isLoading: false,
      file: null,
      isLoadingEnterIndexDownload: false,
      search: {
        cTenCongTy: "",
        cDiaChi: "",
        cNguoiDaiDien: "",
        cMaVietTat: "",
        cEmail: "",
        cDienThoai: "",
        nTinhTrang: "5",
      },
      pageRequest: { pageNum: 1, pageSize: 10 },
      centerDialogVisible: false,
      operation: false,
      editLoading: false,
      detailDiaglog: false,
      currCompany: null,
      dataForm: {
        nMaCongTy: "",
        cTenCongTy: "",
        cNguoiDaiDien: "",
        cDiaChi: "",
        cEmail: " ",
        cMaVietTat: "",
        nTinhTrang: 1,
        cDienThoai: "",
        cAVT: "",
        cToken: "",
        cSignature:""
      },
      rules: {
        cTenCongTy: [{ required: true, message: "Bạn chưa nhập Tên công ty" }],
        cDiaChi: [{ required: true, message: "Bạn chưa nhập Địa chỉ" }],
        cMaVietTat: [{ required: true, message: "Bạn chưa nhập Mã viết tắt" }],
        cNguoiDaiDien: [
          { required: true, message: "Bạn chưa nhập Người đại diện" },
        ],
      },
      src: "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600-768x576.png",
      success: 0,
      fail: 0,
      resultTable: [],
      showResult: false,
      showType: 0,
      test: '',
      img: null,
      signature:null,
      result: '',
      key: 'water'
    };
  },
  computed: {
    Data() {
      return this.tableData.content.map(i => {
        if (i.cAVT != null){
          return {
            ...i,
            url: `/img/company/${i.cAVT}`
          }
        }
        else {
          return i
        }
      })
    }
  },
  methods: {
    delay(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
    handleImg(res) {
      this.img = res
    },
    handleSignature(res){
      this.signature = res
    },
    handleGetURL(val) {
      this.showURL = true
      this.URL = window.location.origin + "/Home?token=" + val
    },
    handleCopyToClipBoard() {
      var copyText = document.getElementById("url");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(copyText.value);
    },
    generateUniqueString(keyString, inputString, length) {
      let hash = 0;
      for (let i = 0; i < inputString.length; i++) {

        hash = (hash << 5) - hash + inputString.charCodeAt(i);
        hash |= 0;
      }
      for (let i = 0; i < keyString.length; i++) {
        hash = (hash << 5) - hash + keyString.charCodeAt(i);
        hash |= 0;
      }
      this.result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      if (hash < 0) {
        hash = hash * (-1)
      }
      for (let i = 0; i < length; i++) {
        this.result += characters.charAt(hash % characters.length);
        hash = Math.floor(hash / characters.length);
      }

    },
    handleUpdateCustomer() {
      const formData = new FormData();
      if (!this.file) {
        this.$message({ message: "Bạn chưa chọn file", type: "error" });
        return;
      }
      formData.append("file", this.file);
      formData.append("id", this.currCompany);
      this.$api.company.updateCustomerExcel(formData).then(res => {
        if (res.code == 200) {
          this.showType = 1;
          this.success = 0;
          this.fail = 0;
          this.resultTable = res.data;
          for (let i = 0; i < this.resultTable.length; i++) {
            this.resultTable[i].serial = ""
          }
          this.addDataCompany = false;
          this.showResult = true;
          res.data.forEach(item => {
            if (item.result == 'success')
              this.success++;
            else
              this.fail++;
          });
        }
        else
          this.$message({ message: res.msg, type: "error" });
      })
    },
    handleUpdateClock() {
      const formData = new FormData();
      if (!this.file) {
        this.$message({ message: "Bạn chưa chọn file", type: "error" });
        return;
      }
      formData.append("file", this.file);
      formData.append("id", this.currCompany);
      this.$api.company.updateClockExcel(formData).then(res => {
        if (res.code == 200) {
          this.showType = 0;
          this.success = 0;
          this.fail = 0;
          this.resultTable = res.data;
          for (let i = 0; i < this.resultTable.length; i++) {
            this.resultTable[i].cTenKhachHang = ""
          }
          this.addDataCompany = false;
          this.showResult = true;
          res.data.forEach(item => {
            if (item.result == 'Thành công')
              this.success++;
            else
              this.fail++;
          });
        }
        else
          this.$message({ message: res.msg, type: "error" });
      })
    },
    addCustomerExcel() {
      this.file = this.$refs.customerExcel.files[0];
    },
    addClockExcel() {
      this.file = this.$refs.clockExcel.files[0];
    },
    handleDownloadResult() {
      this.$api.company.downloadResult(this.resultTable).then(res => {
        saveAs(new Blob([res]), 'Ket_qua_nhap.xlsx')
      })
        .catch(err => {
          console.log(err)
        })

    },
    downloadCustomerTemplate() {
      this.$api.company.downloadCustomerTemplate({ id: this.currCompany }).then(res => {
        if (res.status == 500) {
          this.$message({ message: "Xảy ra lỗi khi tải file", type: "error" });
        }
        else {
          try {
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'customer_template.xlsx');
          } catch (error) {
            this.$message({ message: "Xảy ra lỗi khi tải file", type: "error" });
          }
        }
      })
    },
    downloadClockTemplate() {
      this.$api.company.downloadClockTemplate({ id: this.currCompany }).then(res => {
        if (res.status == 500) {
          this.$message({ message: "Xảy ra lỗi khi tải file", type: "error" });
        }
        else {
          try {
            const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'clock_template.xlsx');
          } catch (error) {
            this.$message({ message: "Xảy ra lỗi khi tải file", type: "error" });
          }
        }
      })
    },
    handleAddData(id, item) {
      this.addDataCompany = true;
      this.dataForm = Object.assign({}, item);
      this.currCompany = item.nMaCongTy;
    },
    handleAdd() {
      this.img = null
      this.signature = null
      this.$refs.dataForm.resetFields();
      this.$refs.upload1.clearFiles();
      this.dataForm = {
        cTenCongTy: "",
        cNguoiDaiDien: "",
        cDiaChi: "",
        cEmail: "",
        cMaVietTat: "",
        nTinhTrang: 1,
        cDienThoai: "",
        cAVT: "",
        cToken: "",
        cSignature:"",
      };
      (this.centerDialogVisible = true), (this.operation = false);
    },

    handleEdit(index, item) {
      (this.centerDialogVisible = true), (this.operation = true);
      this.dataForm = Object.assign({}, item);
      this.img = null
    },
    handleSearch() {
      this.findCompany();
    },

    handleView(index, item) {
      this.detailDiaglog = true;
      this.dataForm = Object.assign({}, item);
    },

    closeForm(check) {
      (this.centerDialogVisible = false), this.$refs[check].resetFields();
      this.$refs.upload1.clearFiles();
    },

    saveCompany() {
      console.log("testing")
      this.$refs.dataForm.validate((valid) => {
        if (this.img != null) {
          this.dataForm.cAVT = this.dataForm.cMaVietTat + "-AVT-" + this.img.name
        }
        if (this.signature != null) {
          this.dataForm.cSignature = this.dataForm.cMaVietTat + "-SIGNATURE-" + this.signature.name
        }
        if (valid) {
          if (this.operation == false) {
            console.log("testing1")
            let dupCheck = 1
            let inputString = this.dataForm.cMaVietTat
            let i = 0
            while (dupCheck == 1) {
              dupCheck = 0
              this.generateUniqueString(this.key, inputString, 6)
              this.dataForm.cToken = this.result
              this.$api.company.duplicateCheck(this.result).then(res => {
                dupCheck = res.data
              })
              inputString = inputString + i
              i++
            }
          }
          this.editLoading = true;
          const data = Object.assign({}, this.dataForm);
          const formData = new FormData();
          this.$api.company
            .saveCompany(data)
            .then((res) => {
              if (res.code == 200) {
                if (this.img != null) {
                  const formData2 = new FormData();
                  formData2.append("file", this.img.raw);
                  formData2.append("name", this.dataForm.cAVT)
                  this.$api.company.processIMG(formData2).then(res => {
                  })
                }
                if(this.signature != null){
                  const formData3 = new FormData();
                  formData3.append("file", this.signature.raw);
                  formData3.append("name", this.dataForm.cSignature)
                  this.$api.company.processSignature(formData3).then(res => {
                  })
                }

                this.editLoading = true;
                if (this.operation == false) {
                  this.$message({
                    message: "Thêm công ty thành công!",
                    type: "success",
                  });
                } else {
                  this.$message({
                    message: "Cập nhật công ty thành công!",
                    type: "success",
                  });
                }
                this.centerDialogVisible = false;
                this.$refs.dataForm.resetFields();
                this.$refs.upload1.clearFiles();
                this.$refs.upload2.clearFiles();
                this.delay(500).then(a=>{
                  this.findCompany();
                })
              } else {
                this.$message({ type: "error", message: res.msg });
              }
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "Thêm thất bại",
              });
            });
        }
      });
    },

    handleDelete(index, item) {
      this.$confirm("Bạn có muốn xóa công ty này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = { nMaCongTy: item.nMaCongTy };

          this.$api.company.deleteCompany(params).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: `Xóa thành công công ty ${item.cTenCongTy}`,
                type: "success",
              });
              this.findCompany();
            } else {
              this.$message({ message: `Xóa thất bại`, type: "error" });
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

    handleSizeChange(val) {
      this.findCompany(this.dataForm.pageNum, val);
    },
    handleCurrentChange(val) {
      this.findCompany(val, this.dataForm.pageSize);
    },

    findCompany(pageNum, pageSize) {
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 10;
      this.pageRequest.columnFilters = {
        cTenCongTy: { value: this.search.cTenCongTy },
        cNguoiDaiDien: { value: this.search.cNguoiDaiDien },
        cDiaChi: { value: this.search.cDiaChi },
        cEmail: { value: this.search.cEmail },
        cDienThoai: { value: this.search.cDienThoai },
        cMaVietTat: { value: this.search.cMaVietTat },
        nTinhTrang: { value: this.search.nTinhTrang },
      };

      this.$api.company.findCompany(this.pageRequest).then((res) => {
        if (res.code == 200 && res.data) {
          this.tableData = res.data;
        }
      });
    },
    submitUpload() {
      this.$refs.upload1.submit();
    },

    companyDownload() {
      try {
        this.isLoadingEnterIndexDownload = true;
        this.pageRequest.columnFilters = {
          cTenCongTy: { value: this.search.cTenCongTy },
          cNguoiDaiDien: { value: this.search.cNguoiDaiDien },
          cDiaChi: { value: this.search.cDiaChi },
          cEmail: { value: this.search.cEmail },
          cDienThoai: { value: this.search.cDienThoai },
          cMaVietTat: { value: this.search.cMaVietTat },
          nTinhTrang: { value: this.search.nTinhTrang },
        };
        this.$api.company.companyDownload(this.pageRequest).then((res) => {
          saveAs(
            new Blob([res]),
            "Danh_sach_cong_ty_" + moment().format("DD.MM.YYYY") + ".xlsx"
          );
          this.isLoadingEnterIndexDownload = false;
        });
      } catch (ex) {
        console.log(ex);
      }
    },
  },

  // Tải dánh sách công ty
  mounted() {
    this.findCompany();
  },
};
</script>
<style lang="scss" scoped>
.tbl {
  height: calc(100vh - 275px);
}

.box-card {
  margin: 10px;
}
</style>
<style>
.table-result {
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.modalTemp .modal-body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.card-header {
  padding: 0px;
}

.font-details {
  font-size: 18px;
  font-weight: 500;
}

fieldset {
  border: 1px solid rgb(223, 215, 215) !important;
  font-size: 13px !important;
}

legend {
  width: auto !important;
  font-size: 13px !important;
  margin-left: 32px !important;
}
</style>




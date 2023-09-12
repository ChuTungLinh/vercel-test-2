<template>
  <div class="wrapper m-2">
    <!-- Tìm kiếm -->
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-4">
        <Label text="Tài khoản:" />
        <Input placeholder="Nhập tên tài khoản" v-model="search.cTenTaiKhoan" />
      </div>
      <div class="d-flex col-md-4">
        <Label text="Họ tên:" />
        <Input placeholder="Nhập họ tên " v-model="search.cHoTen" />
      </div>
      <div class="d-flex col-md-4">
        <Label text="Số điện thoại:" />
        <Input
          placeholder="Nhập số điện thoại "
          v-model="search.cSoDienThoai"
        />
      </div>
    </div>
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-4">
        <Label text="Công ty:" />
        <DropdownList
          placeholder="Chọn công ty"
          v-model="search.nMaCongTy"
          @onChange="findUser"
        >
          <el-option label="Tất cả" value="-1" selected></el-option>
          <el-option
            v-for="item in companyList"
            :key="item.nMaCongTy.toString()"
            :label="item.cTenCongTy"
            :value="item.nMaCongTy.toString()"
          ></el-option>
        </DropdownList>
      </div>
      <div class="d-flex col-md-4">
        <Label text="Quyền hệ thống:" />
        <DropdownList
          placeholder="Chọn quyền hệ thống"
          v-model="search.nMaNhomQuyen"
          @onChange="findUser"
        >
          <el-option label="Tất cả" value="-1" selected></el-option>
          <el-option
            v-for="item in roleData"
            :key="item.nMaNhomQuyen"
            :label="item.cTenNhomQuyen"
            :value="item.nMaNhomQuyen.toString()"
          ></el-option>
        </DropdownList>
      </div>

      <div class="d-flex col-md-4">
        <Label text="Trạng thái:" style="width: 80px;" />
        <DropdownList
          placeholder="Chọn trạng thái"
          v-model="search.nTinhTrang"
          @onChange="findUser"
        >
          <el-option label="Tất cả" value="-1"></el-option>
          <el-option label="Hoạt động" value="1"></el-option>
          <el-option label="Đã khóa" value="0"></el-option>
        </DropdownList>
        <base-button
          type="primary"
          native-type="submit"
          style="margin-left: 5px; width: 130px;"
          @click="handleSearch"
          :loading="searchLoading"
        >
          <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
          <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
      </div>
    </div>

    <!-- Bảng tài khoản -->
    <el-card class="box-card">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px" class="form-row">
          <div class="col-md-6">
            <base-button
              type="primary"
              outline
              native-type="submit"
              @click="handleAdd"
            >
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">&nbsp;Thêm tài khoản</span>
            </base-button>
            <base-button
              type="primary"
              outline
              native-type="submit"
              :loading="isLoadingEnterIndexDownload"
              @click="userDownload"
            >
              <span class="btn-inner--icon"
                ><i class="fa fa-download"></i
              ></span>
              <span class="btn-inner--text">&nbsp;Tải về</span>
            </base-button>
          </div>
        </div>
      </template>
      <div class="col-md-12 tbl">
        <el-table
          :data="tableData.content"
          header-row-class-name="thead-light"
          :border="true"
          size="mini"
          height="100%"
          fit
          highlight-current-row
        >
          <el-table-column
            prop="cTenTaiKhoan"
            label="Tên tài khoản"
            header-align="center"
            sortable
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                style="font-weight: 400"
                type="text"
                @click="handleView(scope.$index, scope.row)"
                ><span>{{ scope.row.cTenTaiKhoan }}</span></el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            prop="cHoTen"
            label="Họ tên"
            min-width="200"
          ></el-table-column>
          <el-table-column prop="cEmail" label="Email" width="180">
          </el-table-column>
          <el-table-column
            prop="cSoDienThoai"
            label="Số điện thoại"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="cTenNhomQuyen"
            label="Quyền hệ thống"
            width="150"
          >
          </el-table-column>

          <el-table-column label="Thuộc công ty" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.compNameArray">{{ scope.row.compNameArray.toString() }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="dNgayTao" label="Ngày tạo" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.dNgayTao">{{
                moment(scope.row.dNgayTao).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="nTinhTrang"
            label="Trạng thái"
            width="100"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.nTinhTrang == 1"
                >Hoạt Động</el-tag
              >
              <el-tag type="danger" v-if="scope.row.nTinhTrang == 0"
                >Đã khóa</el-tag
              >
            </template>
          </el-table-column>

          <!-- Button hành động -->
          <el-table-column  align="center" width="260">
            <template slot-scope="scope">
              <el-button
                :disabled="scope.row.nTinhTrang == 0"
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                ><i class="el-icon-edit mr-1"></i>Sửa</el-button
              >
              <el-button
                size="mini"
                type="warning"
                @click="blockAccount(scope.$index, scope.row)"
              >
                <i
                  v-if="scope.row.nTinhTrang == 1"
                  class="el-icon-lock mr-1"
                ></i>
                <i
                  v-if="scope.row.nTinhTrang == 0"
                  class="el-icon-unlock mr-1"
                ></i>
                <span v-if="scope.row.nTinhTrang == 1">Khóa</span>
                <span
                  v-if="scope.row.nTinhTrang == 0"
                  style="padding-right: 8px"
                  >Mở</span
                >
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="deleteAccount(scope.$index, scope.row)"
                ><i class="el-icon-delete mr-1"></i>Xóa</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="tableData.pageNum"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="tableData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.totalSize"
        >
        </el-pagination>
      </div>
    </el-card>

    <modal
      :show.sync="centerDialogVisible"
      class="modalTemp"
      dataBackDrop="static"
    >
      <h6 slot="header" class="modal-title" v-if="!operation">
        Thêm tài khoản
      </h6>
      <h6 slot="header" class="modal-title" v-if="operation">
        Cập nhật tài khoản
      </h6>

      <el-form
        :model="validateForm"
        :rules="rules"
        ref="validateForm"
        label-width="150px"
        class="demo-ruleForm"
        size="mini"
      >
        <div class="row">
          <div class="col-sm">
            <el-form-item label="Tên tài khoản" prop="cTenTaiKhoan">
              <el-input
                v-if="!operation"
                v-model="validateForm.cTenTaiKhoan"
                autocomplete="off"
              ></el-input>
              <el-input
                v-if="operation"
                v-model="validateForm.cTenTaiKhoan"
                autocomplete="off"
                :disabled="true"
              ></el-input>
            </el-form-item>

            <el-form-item label="Mật khẩu" prop="cMatKhau" v-if="!operation">
              <el-input
                v-model="validateForm.cMatKhau"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>

            <el-form-item label="Họ và tên" prop="cHoTen">
              <el-input
                v-model="validateForm.cHoTen"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="cEmail">
              <el-input
                v-model="validateForm.cEmail"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="Số điện thoại" prop="cSoDienThoai">
              <el-input
                v-model="validateForm.cSoDienThoai"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="Công ty">
              <el-select
                v-model="validateForm.compIdArray"
                multiple
                placeholder="Chọn công ty"
                style="width: 100%"
              >
                <el-option
                  v-for="item in companyList"
                  :key="item.nMaCongTy.toString()"
                  :label="item.cTenCongTy"
                  :value="item.nMaCongTy.toString()"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="Quyền hệ thống">
              <el-select
                placeholder="Chọn quyền hệ thống"
                v-model="validateForm.nMaNhomQuyen"
              >
                <el-option
                  v-for="item in roleData"
                  :key="item.nMaNhomQuyen"
                  :label="item.cTenNhomQuyen"
                  :value="item.nMaNhomQuyen"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="col-sm" v-if="operation">
            <fieldset style="border: 1px solid #ccc" class="p-4">
              <legend style="width: 110px; font-size: 18px">
                Đổi mật khẩu
              </legend>
              <el-form
                :model="passwordForm"
                label-width="150px"
                class="demo-ruleForm"
                :rules="rules"
                ref="passwordForm"
                size="mini"
              >
<!--                 <el-form-item label="Mật khẩu cũ" prop="oldPassword">
                  <el-input
                    type="password"
                    v-model="passwordForm.oldPassword"
                    show-password
                  ></el-input>
                </el-form-item> -->

                <el-form-item label="Mật khẩu mới" prop="newPassword">
                  <el-input
                    type="password"
                    v-model="passwordForm.newPassword"
                    show-password
                  ></el-input>
                </el-form-item>

                <el-form-item label="Xác nhận mật khẩu" prop="confirmPassword">
                  <el-input
                    type="password"
                    v-model="passwordForm.confirmPassword"
                    show-password
                  ></el-input>
                </el-form-item>
              </el-form>
              <el-button
                style="float: right"
                v-if="operation"
                type="primary"
                @click="changePass()"
                >Đổi mật khẩu</el-button
              >
            </fieldset>
          </div>
        </div>
      </el-form>
      <template slot="footer">
        <base-button
          v-if="!operation"
          type="primary"
          @click="saveAccount()"
          :loading="isLoading"
          >Thêm</base-button
        >
        <base-button
          v-if="operation"
          type="primary"
          @click="saveAccount()"
          :loading="isLoading"
          >Lưu</base-button
        >
        <base-button v-if="operation" outline type="danger" @click="closeForm"
          >Thoát</base-button
        >
        <base-button v-if="!operation" outline type="danger" @click="closeForm1"
          >Thoát</base-button
        >
      </template>
    </modal>

    <!-- Chi tiết tài khoản -->
    <modal :show.sync="detailDiaglog">
      <h6 slot="header" class="modal-title">Chi tiết tài khoản</h6>
      <div class="d-flex justify-content-center">
        <div
          class="user d-flex flex-column"
          style="align-items: center; flex: 1"
        >
          <img
            style="width: 200px; height: 200px"
            src="../../../../public/img/avata-default.jpg"
          />
          <span style="font-size: 20px"
            >Tên tài khoản: {{ this.validateForm.cTenTaiKhoan }}</span
          >
        </div>
        <div style="padding: 5px 15px; border-left: 1px solid #ccc; flex: 1">
          <div class="d-flex flex-column pl-4">
            <div class="d-flex mt-2">
              <span class="font-details">Họ và tên:</span>
              <span class="ml-4">{{ this.validateForm.cHoTen }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Email: </span>
              <span class="ml-4">{{ this.validateForm.cEmail }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Số điện thoại: </span>
              <span class="ml-4">{{ this.validateForm.cSoDienThoai }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Quyền hệ thống: </span>
              <span class="ml-4">{{ this.validateForm.cTenNhomQuyen }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Tình trạng:</span>
              <span v-if="this.validateForm.nTinhTrang == 1" class="ml-4"
                >Hoạt động</span
              >
              <span v-if="this.validateForm.nTinhTrang == 0" class="ml-4"
                >Đã khóa</span
              >
            </div>

            <div class="d-flex mt-2">
              <span class="font-details">Người tạo: </span>
              <span class="ml-4">{{ this.validateForm.cNguoiTao }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Ngày tạo: </span>
              <span class="ml-4">{{
                moment(this.validateForm.dNgayTao).format("DD/MM/YYYY")
              }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Người cập nhật cuối: </span>
              <span class="ml-4">{{
                this.validateForm.cNguoiCapNhatCuoi
              }}</span>
            </div>
            <div class="d-flex mt-2">
              <span class="font-details">Ngày cập nhật cuối: </span>
              <span class="ml-4">{{
                moment(this.validateForm.dNgayCapNhatCuoi).format("DD/MM/YYYY")
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <template slot="footer">
        <base-button outline type="danger" @click="detailDiaglog = false"
          >Thoát</base-button
        >
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
export default {
  components: {
    Input,
    Label,
    DropdownList,
  },
  data() {
    // Check đổi mật khẩu
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Bạn chưa nhập mật khẩu mới"));
      } else {
        if (this.passwordForm.confirmPassword !== "") {
          this.$refs.validateForm.validateField("Xác nhận mật khẩu");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Bạn chưa nhập mật khẩu xác nhận"));
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error("Mật khẩu không trùng khớp"));
      } else {
        callback();
      }
    };

    return {
      rules: {
        /* oldPassword: [
          {
            required: true,
            message: "Bạn chưa nhập mật khẩu cũ",
            trigger: "blur",
          },
        ], */
        newPassword: [
          { validator: validatePass, trigger: "blur" },
          { min: 8, message: "Mật khẩu tối thiểu 8 ký tự" },
        ],
        confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
        cTenTaiKhoan: [
          {
            required: true,
            message: "Bạn chưa nhập tên tài khoản",
            trigger: "blur",
          },
        ],
        cMatKhau: [
          { required: true, message: "Bạn chưa nhập mật khẩu" },
          { min: 8, message: "Mật khẩu tối thiểu 8 ký tự" },
        ],
        cHoTen: [
          { required: true, message: "Bạn chưa nhập họ tên", trigger: "blur" },
        ],
        nMaNhomQuyen: [
          {
            required: true,
            message: "Bạn chưa chọn quyền hệ thống",
            trigger: "blur",
          },
        ],

        cEmail: [
          {
            type: "email",
            message: "Bạn phải nhập đúng địa chỉ Email",
            trigger: "blur",
          },
        ],
      },

      isLoading: false,
      searchLoading: false,
      tableData: [],
      roleData: [],
      companyList: [],
      search: {
        cTenTaiKhoan: "",
        cHoTen: "",
        cSoDienThoai: "",
        nMaCongTy: "-1",
        nMaNhomQuyen: "-1",
        nTinhTrang: "-1",
      },
      pageRequest: { pageNum: 1, pageSize: 10 },
      centerDialogVisible: false,
      detailDiaglog: false,
      operation: false,
      isLoadingEnterIndexDownload: false,
      passwordForm: {
        /* oldPassword: "", */
        newPassword: "",
        confirmPassword: "",
      },
      validateForm: {
        nMaTaiKhoan: "",
        cMatKhau: "",
        cTenTaiKhoan: null,
        cHoTen: null,
        cQuyenHeThong: "",
        nMaNhomQuyen: "",
        nTinhTrang: "1",
        cEmail: null,
        cSoDienThoai: null,
        cNguoiTao: "",
        dNgayTao: "",
        cNguoiCapNhatCuoi: "",
        dNgayCapNhatCuoi: "",
        dNgayBatDau: "",
        dNgayKetThuc: "",
        compIdArray: [],
      },
      menuRole: [
        {
          label: "Quyền quản trị hệ thống",
          value: "roleht",
        },
        {
          label: "Quyền quản trị người dùng",
          value: "rolecustomer",
        },

        {
          label: "Quyền quản lý công ty",
          value: "rolecompany",
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      this.$refs.validateForm.resetFields();
      this.centerDialogVisible = true;
      this.operation = false;
      this.validateForm = {
        cTenTaiKhoan: null,
        cHoTen: null,
        nMaNhomQuyen: "",
        cQuyenHeThong: "",
        cEmail: null,
        cSoDienThoai: null,
        cMatKhau: "",
        compIdArray: [],
      };
    },

    handleEdit(index, item) {
      this.$refs.validateForm.resetFields();
      this.centerDialogVisible = true;
      this.operation = true;
      this.passwordForm = {
        /* oldPassword: "", */
        newPassword: "",
        confirmPassword: "",
      };
      this.validateForm = Object.assign({}, item);
    },

    handleView(index, item) {
      this.detailDiaglog = true;
      this.validateForm = Object.assign({}, item);
    },

    handleSearch() {
      this.findUser();
    },

    closeForm() {
      this.$refs.validateForm.resetFields();
      this.$refs.passwordForm.resetFields();
      this.centerDialogVisible = false;
    },

    closeForm1() {
      this.$refs.validateForm.resetFields();
      this.centerDialogVisible = false;
    },

    findUser(pageNum, pageSize) {
      this.searchLoading = true;
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 10;

      this.pageRequest.columnFilters = {
        cTenTaiKhoan: { value: this.search.cTenTaiKhoan },
        cHoTen: { value: this.search.cHoTen },
        cSoDienThoai: { value: this.search.cSoDienThoai },
        nMaNhomQuyen: { value: this.search.nMaNhomQuyen },
        nTinhTrang: { value: this.search.nTinhTrang },
        nMaCongTy: { value: this.search.nMaCongTy },
      };
      this.$api.account.findPageWithRoot(this.pageRequest).then((res) => {
        this.searchLoading = false;
        if (res.code == 200 && res.data) this.tableData = res.data;
        else this.tableData = [];
      });
    },

    saveAccount() {
      this.$refs.validateForm.validate((valid) => {
        if (valid) {
          let params = Object.assign({}, this.validateForm);
          this.$api.account.saveAccount(params).then((res) => {
            if (res.code == 200) {
              if (this.operation == false) {
                this.$message({
                  message: "Thêm tài khoản thành công!",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "Cập nhật tài khoản thành công!",
                  type: "success",
                });
              }
              this.$refs["validateForm"].resetFields();
              this.centerDialogVisible = false;
              this.findUser();
            } else {
              if (this.operation == false) {
                this.$message({
                  message: "Thêm tài khoản thất bại! " + res.msg,
                  type: "error",
                });
              } else {
                this.$message({
                  message: "Cập nhật tài khoản thất bại! " + res.msg,
                  type: "error",
                });
              }
            }
          });
        }
      });
    },

    deleteAccount(index, item) {
      this.$confirm("Bạn có muốn xóa tài khoản này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = { nMaTaiKhoan: item.nMaTaiKhoan };
          this.$api.account.deleteAccount([params]).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: `Xóa thành công tài khoản ${item.cTenTaiKhoan}`,
                type: "success",
              });
              this.findUser();
            } else {
              this.$message({ message: 'Xóa thất bại! ' + res.msg, type: "error" });
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
    // Đổi mật khẩu
    changePass() {
      let params = {
        nMaTaiKhoan: this.validateForm.nMaTaiKhoan,
        /* oldPassword: this.passwordForm.oldPassword, */
        newPassword: this.passwordForm.newPassword,
        confirmPassword: this.passwordForm.confirmPassword,
      };

      this.$api.account
        .changePassword(params)
        .then((res) => {
          if (res.code == 200) {
            this.$message({
              message: "Đổi mật khẩu thành công",
              type: "success",
            });
            this.findUser();
            this.centerDialogVisible = false;
            this.$refs.passwordForm.resetFields();
          } else {
            this.$message({
              type: "error",
              message: "Cập nhật mật khẩu thất bại! " + res.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "Cập nhật mật khẩu thất bại!",
          });
        });
    },

    // Khóa tài khoản
    blockAccount(index, item) {
      let params = { nMaTaiKhoan: item.nMaTaiKhoan };

      this.$api.account.blockAccount(params).then((res) => {
        if (res.code == 200) {
          if (item.nTinhTrang == 1) {
            this.$message({
              message: `Khóa tài khoản ${item.cTenTaiKhoan} thành công`,
              type: "success",
            });
          } else if (item.nTinhTrang == 0) {
            this.$message({
              message: `Mở tài khoản ${item.cTenTaiKhoan} thành công`,
              type: "success",
            });
          }
          this.findUser();
        } else {
          this.$message({ message: "Thất bại! " + res.msg, type: "error" });
        }
      });
    },

    // Tải về
    userDownload() {
      try {
        this.isLoadingEnterIndexDownload = true;
        this.pageRequest.columnFilters = {
          cTenTaiKhoan: { value: this.search.cTenTaiKhoan },
          cHoTen: { value: this.search.cHoTen },
          cSoDienThoai: { value: this.search.cSoDienThoai },
          nMaNhomQuyen: { value: this.search.nMaNhomQuyen },
          nTinhTrang: { value: this.search.nTinhTrang },
          nMaCongTy: { value: this.search.nMaCongTy },
        };
        this.$api.account.userDownload(this.pageRequest).then((res) => {
          saveAs(
            new Blob([res]),
            "Danh_sach_tai__khoan_" + moment().format("DD.MM.YYYY") + ".xlsx"
          );
          this.isLoadingEnterIndexDownload = false;
        });
      } catch (ex) {
        console.log(ex);
      }
    },
    //
    handleSizeChange(val) {
      // this.showAccount(this.validateForm.pageNum, val)
      this.findUser(this.pageRequest.pageNum, val);
    },
    handleCurrentChange(val) {
      this.findUser(val, this.pageRequest.pageSize);
      // this.showAccount(val, this.validateForm.pageSize)
    },

    getRole() {
      const data = Object.assign({}, this.dataForm);
      this.$api.role.findAll(data).then((res) => {
        this.roleData = res.data;
      });
    },

    getCompanyList() {
      this.$api.company.findAll().then((res) => {
        if (res.code == 200 && res.data) this.companyList = res.data;
        else this.companyList = [];
      });
    },
  },
  mounted() {
    this.findUser();
    this.getRole();
    this.getCompanyList();
  },
};
</script>

<style scoped>
.el-card-header {
    padding: 10px;
}

.box-card {
    margin: 10px;
}

.tbl {
    height: calc(100vh - 255px);
}
</style>




 

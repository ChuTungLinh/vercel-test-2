<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-4">
        <Label text="Tên nhân viên:" />
        <Input placeholder="Nhập tên nhân viên" v-model="search.cTenNhanVien" />
      </div>

      <div class="d-flex col-md-4">
        <Label text="Số điện thoại:" />
        <Input
          placeholder="Nhập số điện thoại "
          v-model="search.cSoDienThoai"
        />
      </div>

      <div class="d-flex col-md-4">
        <Label text="Email:" />
        <Input placeholder="Nhập email" v-model="search.cEmail" />
      </div>
    </div>
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-6">
        <Label text="Địa chỉ:" />
        <Input placeholder="Nhập địa chỉ " v-model="search.cDiaChi" />
      </div>

      <div class="col-md-6 d-flex">
        <Label text="Trạng thái:" />
        <DropdownList placeholder="Trạng thái " v-model="search.nTinhTrang">
          <el-option label="Tất cả" value="5"></el-option>
          <el-option label="Đang làm việc" value="1"></el-option>
          <el-option label="Đã nghỉ việc" value="0"></el-option>
        </DropdownList>
        <base-button
          type="primary"
          native-type="submit"
          style="margin-top: 0px; margin-left: 5px"
          @click="findPage"
        >
          <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
          <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
      </div>
    </div>

    <el-card class="box-card">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px" class="form-row">
          <base-button type="primary" outline @click="handleAdd">
            <span class="btn-inner--icon"><i class="fa fa-plus"></i></span>
            <span class="btn-inner--text">&nbsp;Thêm nhân viên</span>
          </base-button>
        </div>
      </template>
      <div class="col-md-12 tbl">
        <el-table
          :data="tableData.content"
          fit
          stripe
          highlight-current-row
          header-row-class-name="thead-light"
          height="100%"
          :border="true"
          @row-click="handleRow"
        >
          <el-table-column label="Mã nhân viên" prop="nMaNhanVien" width="130">
          </el-table-column>
          <el-table-column
            label="Tên nhân viên"
            prop="cTenNhanVien"
            width="150"
          >
          </el-table-column>

          <el-table-column
            label="Tên tài khoản"
            prop="cTenTaiKhoan"
            width="150"
          >
          </el-table-column>
          <el-table-column label="Ngày sinh" prop="dNgaySinh" width="150">
            <template slot-scope="scope">
              <span v-if="scope.row.dNgaySinh">{{
                moment(scope.row.dNgaySinh).format("DD/MM/YYYY")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Địa chỉ" prop="cDiaChi" width="200">
          </el-table-column>
          <el-table-column label="Email" prop="cEmail" width="180">
          </el-table-column>
          <el-table-column
            label="Số điện thoại"
            prop="cSoDienThoai"
            width="120"
          >
          </el-table-column>
          <el-table-column label="Thu tiền" prop="nThuTien" width="100" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.nThuTien == 0"
                >Không</el-tag
              >
              <el-tag type="success" v-if="scope.row.nThuTien == 1">Có</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Đọc chỉ số" prop="nDocChiSo" width="120" align="center">
            <template slot-scope="scope">
              <el-tag type="danger" v-if="scope.row.nDocChiSo == 0"
                >Không</el-tag
              >
              <el-tag type="success" v-if="scope.row.nDocChiSo == 1">Có</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="Tình trạng" prop="cTinhTrang" width="150" align="center" tooltip-effect>
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.nTinhTrang == 1"
                >Đang làm việc</el-tag
              >
              <el-tag type="danger" v-if="scope.row.nTinhTrang == 0"
                >Đã nghỉ việc</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column  align="center" width="170">
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="scope.row.nTinhTrang == 0"
                @click="handleEdit(scope.$index, scope.row)"
              >
                <i class="el-icon-edit mr-1"></i>
                Sửa
              </el-button>
              <el-button
                type="danger"
                :disabled="scope.row.nTinhTrang == 0"
                size="mini"
                @click="deleteBatch(scope.$index, scope.row)"
              >
                <i class="el-icon-delete mr-1"></i>
                Xóa
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
          :page-size="30"
          :current-page.sync="tableData.pageNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="tableData.totalSize"
        >
        </el-pagination>
      </div>
    </el-card>
    <modal :show.sync="dialogForm">
      <h6 slot="header" class="modal-title" v-if="!operation">
        Thêm nhân viên
      </h6>
      <h6 slot="header" class="modal-title" v-if="operation">
        Cập nhật thông tin nhân viên
      </h6>
      <el-form
        :model="dataForm"
        :rules="rules"
        ref="dataForm"
        label-width="150px"
        size="mini"
      >
        <div class="row">
          <div class="col-sm">
            <el-form-item label="Tên nhân viên" prop="cTenNhanVien">
              <el-input size="mini" v-model="dataForm.cTenNhanVien"></el-input>
            </el-form-item>

            <el-form-item label="Ngày sinh" prop="dNgaySinh">
              <el-date-picker
                v-model="dataForm.dNgaySinh"
                class="item-date-control"
                placeholder="Chọn ngày sinh"
                format="dd/MM/yyyy"
                type="date"
                size="mini"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item label="Địa chỉ" prop="cDiaChi">
              <el-input size="mini" v-model="dataForm.cDiaChi"></el-input>
            </el-form-item>

            <el-form-item label="Số điện thoại" prop="cSoDienThoai">
              <el-input size="mini" v-model="dataForm.cSoDienThoai"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="cEmail">
              <el-input size="mini" v-model="dataForm.cEmail"></el-input>
            </el-form-item>

            <el-form-item
              v-if="!operation"
              label="Tên tài khoản"
              prop="cTenTaiKhoan"
            >
              <el-input size="mini" v-model="dataForm.cTenTaiKhoan"></el-input>
            </el-form-item>

            <el-form-item v-if="!operation" label="Mật khẩu" prop="cMatKhau">
              <el-input
                type="password"
                size="mini"
                v-model="dataForm.cMatKhau"
              ></el-input>
            </el-form-item>

            <el-form-item
              v-if="!operation"
              label="Quyền hệ thống"
              prop="nMaNhomQuyen"
            >
              <el-select
                v-model="dataForm.nMaNhomQuyen"
                placeholder="Chọn quyền hệ thống"
              >
                <el-option
                  v-for="item in roleData"
                  :key="item.nMaNhomQuyen"
                  :value="item.nMaNhomQuyen"
                  :label="item.cTenNhomQuyen"
                ></el-option>
              </el-select>
            </el-form-item>
            <div class="d-flex">
              <el-form-item label="Đọc chỉ số" prop="nDocChiSo">
                <el-select v-model="dataForm.nDocChiSo">
                  <el-option :value="1" label="Có đọc chỉ số"></el-option>
                  <el-option :value="0" label="Không đọc chỉ số"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Thu tiền" prop="nThuTien">
                <el-select v-model="dataForm.nThuTien">
                  <el-option :value="1" label="Có thu tiền"></el-option>
                  <el-option :value="0" label="Không thu tiền"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <template slot="footer">
        <base-button v-if="!operation" type="primary" @click="save"
          >Thêm</base-button
        >
        <base-button v-if="operation" type="primary" @click="update"
          >Lưu</base-button
        >
        <base-button outline type="danger" @click="close()">Thoát</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
import DropdownList from "../components/DropdownList.vue";

export default {
  components: {
    Label,
    Input,
    DropdownList,
  },
  data() {
    return {
      tableData: [],
      modalForm: false,
      roleData: [],
      rules: {
        cTenNhanVien: [
          { required: true, message: "Bạn chưa nhập tên nhân viên" },
        ],
        cTenTaiKhoan: [
          { required: true, message: "Bạn chưa nhập tên tài khoản" },
        ],
        cMatKhau: [{ required: true, message: "Bạn chưa nhập mật khẩu" }],
        nMaNhomQuyen: [
          { required: true, message: "Bạn chưa chọn quyền hệ thống" },
        ],
      },
      pageRequest: { pageNum: 1, pageSize: 30 },
      dialogForm: false,
      search: {
        cTenNhanVien: "",
        dNgaySinh: "",
        cSoDienThoai: "",
        cEmail: "",
        cDiaChi: "",
        nTinhTrang: "5",
      },
      dataForm: {
        cTenNhanVien: "",
        dNgaySinh: "",
        cSoDienThoai: "",
        cDiaChi: "",
        cEmail: "",
        nDocChiSo: "",
        nThuTien: "",
        nTinhTrang: "",
        cMatKhau: "",
        cTenTaiKhoan: null,
        nMaNhomQuyen: "",
      },
      accountForm: {
        nMaNhanVien: "",
        nMaTaiKhoan: "",
      },

      operation: false,
    };
  },
  methods: {
    handleAdd() {
      this.$refs["dataForm"].resetFields();
      this.dialogForm = true;
      this.operation = false;
    },
    handleEdit(index, item) {
      this.dialogForm = true;
      this.operation = true;
      this.dataForm = Object.assign({}, item);
    },
    handleRow(row) {
      this.accountForm.nMaNhanVien = row.nMaNhanVien;
    },

    handleSearch() {
      this.findPage();
    },

    handleAddAcc() {
      this.modalForm = true;
    },

    addAccount() {
      const data = Object.assign({}, this.accountForm);
      this.$api.account.insertEmployee(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "Thêm tài khoản cho nhân viên thành công",
            type: "success",
          });
          this.modalForm = false;
        } else {
          this.$message({
            message: "Thêm tài khoản cho nhân viên thất bại ",
            type: "error",
          });
        }
      });
    },

    close() {
      this.$refs["dataForm"].resetFields();
      this.dialogForm = false;
    },
    findPage(pageNum, pageSize) {
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 30;

      this.pageRequest.columnFilters = {
        cTenNhanVien: { value: this.search.cTenNhanVien },
        cSoDienThoai: { value: this.search.cSoDienThoai },
        dNgaySinh: { value: this.search.dNgaySinh },
        cEmail: { value: this.search.cEmail },
        nTinhTrang: { value: this.search.nTinhTrang },
        cDiaChi: { value: this.search.cDiaChi },
      };
      this.$api.employee.findPage(this.pageRequest).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        } else {
          this.$message({ message: "Tải dữ liệu thất bại", type: "error" });
        }
      });
    },
    save() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.dataForm);
          this.$api.employee
            .insert(data)
            .then((res) => {
              if (res.code == 200) {
                this.$message({
                  message: "Thêm nhân viên thành công",
                  type: "success",
                });
                this.dialogForm = false;
                this.findPage();
                this.$refs["dataForm"].resetFields();
              } else {
                this.$message({
                  message: "Thêm nhân viên thất bại : " + res.msg,
                  type: "error",
                });
              }
            })
            .catch(() => {});
        }
      });
    },
    update() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.dataForm);
          this.$api.employee.update(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Cập nhật nhân viên thành công",
                type: "success",
              });
              this.dialogForm = false;
              this.findPage();
            } else {
              this.$message({
                message: "Cập nhật nhân viên thất bại ",
                type: "error",
              });
            }
          });
        }
      });
    },
    deleteBatch(index, item) {
      this.$confirm("Bạn có muốn xóa nhân viên này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = item.nMaNhanVien;
          this.$api.employee.deleteBatch(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: `Xóa thành công nhân viên ${item.cTenNhanVien}`,
                type: "success",
              });
              this.findPage();
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

    handleCurrentChange() {
      this.findPage(this.pageRequest.pageNum, val);
    },
    handleSizeChange() {
      this.findPage(this.pageRequest.pageNum, val);
    },    
    getRole() {
      this.$api.role.findAllByCompany().then((res) => {
        this.roleData = res.data;
      });
    },
  },

  mounted() {
    this.findPage();
    this.getRole();
  },
};
</script>
<style scoped>
.tbl {
  height: calc(100vh - 255px);
}
.item-date-control {
  flex: auto;
  width: auto;
}
.box-card {
  margin: 10px;
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

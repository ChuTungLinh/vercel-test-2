<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
      <div class="d-flex col-md-5">
        <Label text="Quyền hệ thống:" />
        <Input placeholder="Nhập tên quyền hệ thống" v-model="search" />
      </div>
      <base-button
        type="primary"
        native-type="submit"
        style="margin-left: 5px"
        @click="handleSearch"
      >
        <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
        <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
      </base-button>
    </div>
    <!-- Bảng nhóm quyền-->
    <el-card class="box-card">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px" class="form-row">
          <div class="col-md-6">
            <base-button
              type="primary"
              outline
              native-type="submit"
              :loading="isLoading"
              @click="handleAdd"
            >
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">&nbsp;Thêm quyền</span>
            </base-button>
          </div>
        </div>
      </template>
      <div class="col-md-12 tbl">
        <el-table
          :data="tableData.content"
          :border="true"
          height="100%"
          header-row-class-name="thead-light"
          size="mini"
        >
          <el-table-column
            prop="nMaNhomQuyen"
            label="Mã nhóm quyền"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="cTenNhomQuyen" label="Tên nhóm quyền" sortable>
          </el-table-column>

          <el-table-column prop="cMoTa" label="Mô tả"> </el-table-column>

          <el-table-column  align="center" width="300">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                @click="findMenu(scope.$index, scope.row)"
                ><i class="el-icon-view mr-1"></i> Xem</el-button
              >

              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                ><i class="el-icon-edit mr-1"></i>Sửa</el-button
              >

              <el-button
                size="mini"
                type="danger"
                @click="deleteRole(scope.$index, scope.row)"
                ><i class="el-icon-delete mr-1"></i> Xóa</el-button
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
    <!-- Modal thêm  -->
    <modal
      :show.sync="centerDialogVisible"
      class="modalTemp"
      dataBackDrop="static"
    >
      <h6 slot="header" class="modal-title" v-if="!operation">
        Thêm quyền hệ thống
      </h6>
      <h6 slot="header" class="modal-title" v-if="operation">
        Cập nhật quyền hệ thống
      </h6>
      <el-form
        size="mini"
        :model="dataForm"
        ref="dataForm"
        :rules="rules"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Tên nhóm quyền"
          prop="cTenNhomQuyen"
          header-align="center"
        >
          <el-input
            v-model="dataForm.cTenNhomQuyen"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item label="Mô tả" prop="cMoTa" header-align="center">
          <el-input v-model="dataForm.cMoTa" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <base-button
          type="primary"
          @click="saveRole()"
          :loading="isLoading"
          v-if="!operation"
          >Thêm</base-button
        >
        <base-button
          type="primary"
          @click="saveRole()"
          :loading="isLoading"
          v-if="operation"
          >Lưu</base-button
        >
        <base-button outline type="danger" @click="close">Thoát</base-button>
      </template>
    </modal>

    <div class="m-2 list-tree">
      <h5>Phân quyền hệ thống: {{ this.selectRole.cTenNhomQuyen }}</h5>
      <el-row>
        <div
          style="
            float: left;
            padding-left: 24px;
            padding-top: 12px;
            padding-bottom: 4px;
          "
        >
          <el-checkbox
            :disabled="this.selectRole.nMaNhomQuyen == null"
            @change="handleCheckAll"
            v-model="checkAll"
          >
            <b>Chọn tất cả</b>
          </el-checkbox>
        </div>

        <div
          style="
            float: right;
            padding-right: 15px;
            padding-top: 4px;
            padding-bottom: 10px;
          "
        >
          <el-button
            :disabled="this.selectRole.nMaNhomQuyen == null"
            size="small"
            @click="saveRoleMenu()"
            type="primary"
            >Lưu</el-button
          >

          <el-button
            :disabled="this.selectRole.nMaNhomQuyen == null"
            size="small"
            @click="resetRoleMenu"
            type="warning"
            >Thiết lập lại</el-button
          >
        </div>
      </el-row>
      <!-- Quản lý chức năng -->
      <el-tree
        :data="data"
        show-checkbox
        node-key="nMaChucNang"
        :props="defaultProps"
        style="width: 100%; padding-top: 10px"
        :render-content="renderContent"
        :default-checked-keys="[5]"
        ref="menuTree"
        default-expand-all
        :highlight-current="true"
        :check-strictly="true"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
export default {
  components: {
    Label,
    Input,
  },
  data() {
    return {
      tableData: [],
      dataForm: {
        nMaNhomQuyen: "",
        cTenNhomQuyen: "",
        cMoTa: "",
        nTinhTrang: 1,
        cNguoiTao: " ",
        dNgayTao: "",
        cNguoiCapNhatCuoi: "",
        dNgayCapNhatCuoi: "",
      },
      rules: {
        cTenNhomQuyen: [
          {
            required: true,
            message: "Bạn chưa nhập tên nhóm quyền",
            trigger: "blur",
          },
        ],
        cMoTa: [
          { required: true, message: "Bạn chưa nhập mô tả", trigger: "blur" },
        ],
      },
      centerDialogVisible: false,
      operation: false,
      isLoading: false,
      search: "",
      pageRequest: { pageNum: 1, pageSize: 10 },
      selectRole: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      currentRoleMenu: [],
      checkAll: false,
    };
  },

  methods: {
    handleAdd() {
      this.$refs.dataForm.resetFields();
      this.centerDialogVisible = true;
      this.operation = false;
      this.dataForm = {
        cTenNhomQuyen: null,
        cMoTa: null,
      };
    },

    handleEdit(index, item) {
      this.centerDialogVisible = true;
      this.operation = true;
      this.dataForm = Object.assign({}, item);
    },

    handleSearch() {
      this.findAll();
    },

    close() {
      this.centerDialogVisible = false;
      this.$refs["dataForm"].resetFields();
    },

    findAll(pageNum, pageSize) {
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 10;
      this.pageRequest.columnFilters = {
        cTenNhomQuyen: { value: this.search },
      };

      this.$api.role.findRole(this.pageRequest).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        }
      });
      //   let data = Object.assign({}, this.dataForm)
      //  this.$api.role.findRole(this.pageRequest).then((res) => {
      //       if(res.code == 200){
      //         this.tableData = res.data
      //       }
      // })
    },

    saveRole() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.editLoading = true;
          let params = Object.assign({}, this.dataForm);
          this.$api.role.saveRole(params).then((res) => {
            
            if (res.code == 200) {
              this.$message({ message: "Thêm thành công!", type: "success" });
              this.$refs["dataForm"].resetFields();
              this.centerDialogVisible = false;
              this.findAll();
            } else {
              //console.log("lỗi")
            }
          });
        }
      });
    },

    deleteRole(index, item) {
      this.$confirm("Bạn có muốn xóa quyền này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = { nMaNhomQuyen: item.nMaNhomQuyen };
          this.$api.role.deleteRole([params]).then((res) => {
            this.$message({
              message: `Xóa thành công ${item.cTenNhomQuyen}`,
              type: "success",
            });
            this.findAll();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Xóa thất bại",
          });
        });
    },

    findMenu(index, item) {
      const data = { nMaNhomQuyen: item.nMaNhomQuyen };
      this.selectRole = item;
      this.$api.role.findRoleMenu(data).then((res) => {
        this.currentRoleMenu = res.data;
        this.$refs.menuTree.setCheckedNodes(res.data);
      });
    },
 
    findMenuTree() {
      this.$api.menu.findMenu({}).then((res) => {
        this.data = res.data;
      });
    },

    saveRoleMenu() {
      let roleId = this.selectRole.nMaNhomQuyen;
      let checkedNodes = this.$refs.menuTree.getCheckedNodes(false, true);
      let roleMenus = [];

      for (let i = 0, len = checkedNodes.length; i < len; i++) {
        let roleMenu = {
          nMaNhomQuyen: roleId,
          nMaChucNang: checkedNodes[i].nMaChucNang,
        };
        roleMenus.push(roleMenu);
      }
      this.$api.role.saveRoleMenu(roleMenus).then((res) => {
        
        if (res.code == 200) {
          this.$message({ message: "Lưu thành công", type: "success" });
        } else {
          this.$message({ message: "Lưu thất bại", type: "error" });
        }
      });
    },
    resetRoleMenu() {
      this.checkAll = false;
      this.$refs.menuTree.setCheckedNodes(this.currentRoleMenu);
    },

    handleCheckAll() {
      if (this.checkAll) {
        let allMenus = [];
        this.checkAllMenu(this.data, allMenus);
        this.$refs.menuTree.setCheckedNodes(allMenus);
      } else {
        this.$refs.menuTree.setCheckedNodes([]);
      }
    },

    checkAllMenu(data, allMenus) {
      data.forEach((menu) => {
        allMenus.push(menu);
        if (menu.children) {
          this.checkAllMenu(menu.children, allMenus);
        }
      });
    },

    renderContent(h, { node, data, store }) {
      return (
        <span
          span
          style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 16px; padding-right: 8px;"
        >
          <span style="width:30%; text-align: left; ">{data.cTenChucNang}</span>
          <span style="width:30%; text-align: left; ">
            {data.nLoai === 1
              ? "Menu Gốc"
              : data.nLoai === 2
              ? "Menu"
              : data.nLoai === 3
              ? "Button"
              : data.nLoai === 4
              ? "Liên kết ngoài"
              : ""}
          </span>
          <span style="width:30%; text-align: left; ">
            <i class={data.cIcon}></i>
          </span>
          <span style="width:30%; text-align: left; ">{data.nQuyen}</span>
          <span style="width:30%; text-align: left; ">{data.cUrl}</span>
        </span>
      );
    },
    handleSizeChange(val) {
      // this.showAccount(this.validateForm.pageNum, val)
      this.findAll(this.pageRequest.pageNum, val);
    },
    handleCurrentChange(val) {
      this.findAll(val, this.pageRequest.pageSize);
      // this.showAccount(val, this.validateForm.pageSize)
    },
  },

  mounted() {
    this.findAll();
    this.findMenuTree();
  },
};
</script>

<style lang ="scss">
.tbl {
  height: calc(90vh - 450px);
}
.box-card {
  margin: 10px;
}
.modalTemp .modal-body {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.list-tree {
  border: 1px solid #ccc;
  height: calc(100vh - 200px);
  overflow: auto;
  box-shadow: 1px 1px 5px 0px #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
}
</style>


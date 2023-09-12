<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 d-flex">
        
      </div>
      <div class="col-md-6 d-flex">
        <Label text="Nhân viên sửa chữa:" />
        <DropdownList
          placeholder="Chọn nhân viên sửa chữa"
          v-model="search.cTenNhanVien"
        >
          <el-option
            v-for="i in employeeList"
            :key="i.id"
            :value="i.cTenNhanVien"
            :label="i.cTenNhanVien"
          ></el-option>
        </DropdownList>
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

    <el-card style="margin-top: 10px">
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
              <span class="btn-inner--text">&nbsp;Thêm tuyến đọc</span>
            </base-button>
          </div>
        </div>
      </template>

      <div class="col-md-12 pt-2 tbl">
        <el-table
          :data="tableData.content"
          header-row-class-name="thead-light"
          height="100%"
          :border="true"
        >
          <el-table-column
            label="Nhân viên"
            prop="cTenNhanVien"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            label="Sửa chữa tuyến"
            prop="cTenNhanVien"
            header-align="center"
          >
            <template slot-scope="scope">
              <div class="" v-if="scope.row.cTenTuyen">
              {{ scope.row.cTenTuyen }}
              </div>
              <div class="" v-else>
                <span class="text-danger">Chưa có tuyến, chọn tuyến sửa chữa: </span>
              </div>
              <el-button
                  type="primary"
                  size="mini"
                  @click="handleAddFix(scope.row)"
                >
                  <i class="fas fa-plus"></i>
                  Thêm
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 py-2 pagination" style="justify-content: end">
        <el-pagination
          :page-sizes="[5, 10, 20, 30, 50]"
          background
          layout="total, sizes,  prev, pager, next"
          :page-size="20"
          :current-page.sync="tableData.pageNum"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :total="tableData.totalSize"
        >
        </el-pagination>
      </div>      
    </el-card>
    <modal :show.sync="dialogForm">
      <h6 slot="header" class="modal-title">
        Thêm tuyến sửa chữa
      </h6>
      <span>Chọn tuyến sửa chữa: </span>
      <el-select
      v-model="currRoute"
      >
        <el-option
              v-for="item in routeList"
              :key="item.id"
              :label="item.cTenTuyen"
              :value="item.nMaTuyen"
            >
            </el-option>
      </el-select>
      <template slot="footer">
        <base-button type="primary" @click="save">Thêm</base-button>
        <base-button outline type="danger" @click="close">Thoát</base-button>
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
    DropdownList,
  },
  data() {
    return {
      tableData: [],
      routeList: [],
      employeeList: [],
      currentEmployee: null,
      currRoute: null,
      termList: [],
      operation: 1,
      pageRequest: { pageNum: 1, pageSize: 20 },
      dialogForm: false,
      search: {
        nMaKy: "",
        cTenNhanVien: "",
        cTenTuyen: "",
      },
      dataForm: {
        nMaNhanVien: "",
        nMaTuyen: "",
      },
    };
  },
  methods: {
    findNonFixRoute(){
      const data = {};
      this.$api.route.findNonFix(data).then((res) => {
        this.routeList = res.data;
      });
    },
    handleAddFix(item){
      this.findNonFixRoute();
      this.dialogForm = true;
      this.currentEmployee = item.nMaNhanVien;
      this.currRoute = null;
    },
    handleAdd() {
      this.dataForm= {
        nMaNhanVien: "",
        nMaTuyen: "",
      },
      this.dialogForm = true;
      this.operation = 1;
    },

    handleEdit() {
      this.dialogForm = true;
      this.operation = 2;
    },
    handleSearch() {
      this.findPage();
    },

    close() {
      this.dataForm= {
        nMaNhanVien: "",
        nMaTuyen: "",
      },
      this.dialogForm = false;
    },
    findPage(pageNum, pageSize) {
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 20;

      this.pageRequest.columnFilters = {
        cTenNhanVien: { value: this.search.cTenNhanVien },
        cTenTuyen: { value: this.search.cTenTuyen },
      };

      this.$api.routeemployee.findPageFix(this.pageRequest).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        } else {
          this.$message({ message: "Tải dữ liệu thất bại ", type: "error" });
        }
      });
    },
    save() {
      const data = {
        nMaNhanVien: this.currentEmployee,
        nMaTuyen: this.currRoute,
      };
      this.$api.routeemployee.saveFixRoute(data).then((res) => {
        if (res.code == 200) {
          this.$message({ message: res.msg, type: "success" });
          this.dialogForm = false;
          this.findPage();
        } else {
          this.$message({ message: res.msg + res.msg, type: "error" });
        }
      });
      
    },
    update() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.dataForm);
          this.$api.routeemployee.update(data).then((res) => {
            if (res.code == 200) {
              this.$message({ message: res.msg, type: "success" });
              this.dialogForm = false;
              this.findPage();
            } else {
              this.$message({ message: res.msg + res.msg, type: "error" });
            }
          });
        }
      });
    },
    deleteBatch(index, item) {
      this.$confirm("Bạn có muốn xóa tuyến này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = { nMaTuyen: item.nMaTuyen };
          this.$api.routeemployee.deleteBatch(params).then((res) => {
            if (res.code == 200) {
              this.$message({ message: res.msg, type: "success" });
              this.findPage();
            } else {
              this.$message({ message: res.msg, type: "error" });
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
      this.findPage(this.dataForm.pageNum, val);
    },
    handleCurrentChange(val) {
      this.findPage(val, this.dataForm.pageSize);
    },
    // getRoute() {
    //   const data = {};
    //   this.$api.route.findAll(data).then((res) => {
    //     this.routeList = res.data;
    //   });
    // },
    getEmployee() {
      const data = {};
      this.$api.employee.findAll(data).then((res) => {
        this.employeeList = res.data;
      });
    },
    getTerm() {
      const data = {};
      this.$api.term.findAll(data).then((res) => {
        this.termList = res.data;
      });
    },
  },
  mounted() {
    this.findPage();
    // this.getRoute();
    this.getEmployee();
    this.getTerm();
  },
};
</script>
<style scoped>
.el-card-header {
  padding: 10px;
}
.tbl {
  height: calc(100vh - 210px);
}
.form-item {
  margin-bottom: 15px;
}
</style>

<style lang="scss">
.form-item .el-form-item__error {
  padding-top: 0;
}

.form-item .el-select {
  width: 100%;
}

.subtbl {
  width: 95%;
  margin-left: 45px;
}
.el-table th {
  background-color: #ebeef5;
}
</style>

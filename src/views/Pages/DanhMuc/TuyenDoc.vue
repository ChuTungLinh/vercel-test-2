<template>
  <div class="wrapper m-2">
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 d-flex">
        <Label text="Tuyến đọc:" />
        <DropdownList placeholder="Chọn tuyến đọc" v-model="search.Tuyen">
          <el-option
            v-for="i in routeList"
            :key="i.nMaTuyen"
            :value="i.nMaTuyen+''"
            :label="i.cTenTuyen"
          ></el-option>
        </DropdownList>
      </div>
      <div class="col-md-6 d-flex">
        <Label text="Nhân viên thu tiền:" />
        <DropdownList
          placeholder="Chọn nhân viên thu tiền"
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
    <div style="display:flex; justify-content: space-between;">

    <el-card style="margin-top: 10px; width: 59%;">
      <template #header class="el-card-header">
        <div style="padding: 5px 10px" class="form-row">
          <div style=" margin-left: 10px;">
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
          <div style=" margin-left: 10px;">
            <base-button
              type="primary"
              outline
              native-type="submit"
              @click="handleFindIntertwined"
            >
              <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
              <span class="btn-inner--text">&nbsp;Kiểm tra trùng tuyến</span>
            </base-button>
          </div>
        </div>
      </template>

      <div class="col-md-12 tbl">
        <!-- @row-click="handleRowClick" -->
        <el-table
          stripe
          :empty-text="isLoadingHD ? ' ':'Không có dữ liệu'"
          v-loading="isLoadingHD"
          :data="tableData.content"
          header-row-class-name="thead-light"
          height="calc(100% - 20px)"
          :border="true"
          highlight-current-row
        >
          <el-table-column
            width="160px"
            label="Nhân viên thu tiền"
            prop="cTenNhanVien"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            width="100px"
            align="center"
            label="Số tuyến "
            header-align="center"
          >
          <template slot-scope="scope">
            {{scope.row.sysTuyen.length}}
          </template>
          </el-table-column>
          <el-table-column
            
            label="Tuyến đọc"
            header-align="center"
          >
          <template slot-scope="scope">
            <span v-for="item,index in scope.row.sysTuyen"><span v-if="index > 0">, </span>{{ item.cTenTuyen }}</span>
          </template>
          </el-table-column>
          <el-table-column 
          width="150"
          label="Hành Động"
          align="center">
            <template slot-scope="scope">
              <el-button
              style="min-width: fit-content;"
            type="info"
            size="mini"
            class="setting-btn"
            @click="handleRowClick(scope.row)"
          >
            <i class="el-icon-view"></i>
            Xem
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
    <el-card style="margin-top: 10px;width:40%">
      <div style="padding:5px 10px 3px 10px; width: 100%; border-bottom:1px solid #EBEEF5;">Thông tin chi tiết tuyến</div>
      <div class="col-md-12 tbl" style="margin-top: 5px; margin-bottom: 10px;">
        <el-table
          :data="routeData"
          :empty-text="isLoadingDT ? ' ':'Không có dữ liệu'"
          v-loading="isLoadingDT"
          header-row-class-name="thead-light"
          height="100%"
          max-height="110%"
          :border="true"
        >
          <el-table-column
            label="Tên tuyến"
            prop="cTenTuyen"
            header-align="center"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="Số khách hàng"
            prop="csAmount"
            header-align="center"
          >
          </el-table-column>
          <el-table-column label="hành động" width="100" align="center">
              <template slot-scope="scope"> 
              <el-button
                style="padding-top: 8px"
                type="danger"
                size="mini"
                @click="deleteBatch(scope.$index, scope.row, currentRow.nMaNhanVien)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </el-card>
    </div>
    <modal :show.sync="dialogForm">
      <h6 slot="header" class="modal-title" v-if="operation == 1">
        Thêm tuyến đọc
      </h6>
      <h6 slot="header" class="modal-title" v-if="operation == 2">
        Cập nhật thông tin tuyến đọc
      </h6>
      <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
        <!-- <el-form-item class="form-item" label="Nhân viên" :rules="[{required: true, message:'Bạn chưa chọn nhân viên'}]">
                    <el-select class="select-item" v-model="value" filterable placeholder="Chọn nhân viên">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item> -->
        <el-form-item
          class="form-item"
          prop="nMaNhanVien"
          label="Nhân viên thu tiền"
          :rules="[
            { required: true, message: 'Bạn chưa chọn nhân viên thu tiền' },
          ]"
        >
          <el-select
            class="select-item"
            v-model="dataForm.nMaNhanVien"
            filterable
            placeholder="Chọn nhân viên thu tiền"
          >
            <el-option
              v-for="item in employeeList"
              :key="item.id"
              :label="item.cTenNhanVien"
              :value="item.nMaNhanVien"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          class="form-item"
          label="Tên tuyến đọc"
          prop="nMaTuyen"
          :rules="[{ required: true, message: 'Bạn chưa chọn tuyến đọc' }]"
        >
          <el-select
            class="select-item"
            v-model="dataForm.nMaTuyen"
            filterable
            placeholder="Chọn tuyến đọc"
          >
            <el-option
              v-for="item in routeList"
              :key="item.id"
              :label="item.cTenTuyen"
              :value="item.nMaTuyen"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item class="form-item"   label="Kỳ ghi chỉ số" :rules="[{required: true, message:'Bạn chưa chọn kỳ ghi chỉ số'}]">
                    <el-select class="select-item" v-model="value" filterable placeholder="Chọn kỳ ghi chỉ số">
                        <el-option
                        v-for="item in termList"
                        :key="item.value"
                        :label="item.cTenKy"
                        :value="item.nMaKy">
                        </el-option>
                    </el-select>
                    </el-form-item> -->
      </el-form>
      <template slot="footer">
        <base-button type="primary" @click="save">Thêm</base-button>
        <base-button outline type="danger" @click="close">Thoát</base-button>
      </template>
    </modal>
    <modal :show.sync="routeIntertwine">
      <h6 slot="header" class="modal-title">
        Danh sách tuyến bị trùng
      </h6>
      <div class="col-md-12 tbl" style="height: 100%;">
        <el-table
          :data="intertwinedRoutes"
          header-row-class-name="thead-light"
          height="100%"
          :border="true"
        >
          <el-table-column align="center" width="100px" prop="maTuyen" label="Mã tuyến" ></el-table-column>
          <el-table-column width="200px" prop="tenTuyen" label="Tên tuyến" ></el-table-column>
          <el-table-column prop="tenNV" label="Tên nhân viên" >
            <template #default="scope">
              <div style="white-space: normal;">
                {{ scope.row.tenNV }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="modal-footer">
        <el-button size="small" type="primary" @click="routeIntertwine = false">Đóng</el-button>
      </div>

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
      isLoadingHD:false,
      isLoadingDT:false,
      selected:[],
      tableData: [],
      routeList: [],
      employeeList: [],
      termList: [],
      operation: 1,
      pageRequest: { pageNum: 1, pageSize: 20 },
      dialogForm: false,
      search: {
        nMaKy: "",
        cTenNhanVien: "",
        Tuyen: "",
      },
      routeIntertwine:false,
      intertwinedRoutes:[],
      dataForm: {
        nMaNhanVien: "",
        nMaTuyen: "",
      },
      routeData:[],
      currentRow: {},
    };

  },
  methods: {
    delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },
    handleFindIntertwined(){
      this.$api.routeemployee.findRouteIntertwined().then(res =>{
        if(res.code==200){
          let n = 0
          //console.log(res)
          let intertwined = []
          this.routeIntertwine = true
          for (let i = 0; i < res.data.length; i++) {
            //console.log(i +" run--------")
            if(intertwined.length == 0){
              //console.log(intertwined)
              intertwined.push(res.data[i])
            }
            else if(intertwined[n].maTuyen == res.data[i].maTuyen ){
              if(intertwined[n].tenNV != res.data[i].tenNV){
                intertwined[n].tenNV += ", "+res.data[i].tenNV
              }
            }
            else{
              intertwined.push(res.data[i])
              n++
            }
          }
          
          this.intertwinedRoutes = intertwined
        }
        else {
          this.$message({ message: "Tải dữ liệu thất bại ", type: "error" });
        }

      })
    },
    handleRowClick(val){
      this.routeData =[]
      this.isLoadingDT = true
      if(val.sysTuyen.length == 0){
        this.isLoadingDT = false
      this.routeData = null
      }
      else{
          for (let i = 0; i < val.sysTuyen.length; i++) {
            this.$api.routeemployee.findCSAmount(val.sysTuyen[i].nMaTuyen).then(res =>{
              
            val.sysTuyen[i].csAmount= res.data
          }).then(()=>{
              if(i == val.sysTuyen.length-1){
                this.delay(500).then(()=>{
                  this.currentRow = val
                  this.routeData = val.sysTuyen
                  this.isLoadingDT = false
                })
                
              }
            }
          )
        }
      }
      //console.log(val.sysTuyen)
      
      //console.log(val.sysTuyen)
    },
    handleAdd() {
      this.$refs["dataForm"].resetFields();
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
      this.$refs["dataForm"].resetFields();
      this.dialogForm = false;
    },
    findPage(pageNum, pageSize) {
      this.tableData = []
      this.isLoadingHD = true
      this.routeData=[]
      //console.log(this.search.Tuyen)
      if (typeof pageNum == "number") this.pageRequest.pageNum = pageNum;
      else this.pageRequest.pageNum = 1;

      if (typeof pageSize == "number") this.pageRequest.pageSize = pageSize;
      else this.pageRequest.pageSize = 10;

      this.pageRequest.columnFilters = {
        cTenNhanVien: { value: this.search.cTenNhanVien },
        Tuyen: { value: this.search.Tuyen },
      };

      this.$api.routeemployee.findPage(this.pageRequest).then((res) => {
        
        if (res.code == 200) {
          this.isLoadingHD = false
          this.tableData = res.data;
        } else {
          this.$message({ message: "Tải dữ liệu thất bại ", type: "error" });
        }
      });
    },
    save() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          let data = Object.assign(
            { sysTuyen: [this.dataForm.sysTuyen] },
            this.dataForm
          );
          this.$api.routeemployee
            .insert(data)
            .then((res) => {
              if ((res.code == 200)) {
                this.$message({ message: res.msg, type: "success" });
                this.dialogForm = false;
                this.findPage();
                this.$refs["dataForm"].resetFields();
              } else {
                if(res.msg.indexOf("Cannot insert duplicate key row in object") !=-1)
                  res.msg = "Tuyến đã chọn bị trùng"
                this.$message({ message: res.msg, type: "error" });
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
    deleteBatch(index, item,idNV) {
      this.$confirm("Bạn có muốn xóa tuyến này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = { nMaTuyen: item.nMaTuyen, nMaNhanVien: idNV };
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
    getRoute() {
      const data = {};
      this.$api.route.findAll(data).then((res) => {
        this.routeList = res.data;
      });
    },
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
    this.getRoute();
    this.getEmployee();
    this.getTerm();
  },
};
</script>
<style scoped>
.modal-footer{
  display: flex; justify-content: flex-end;padding: 5px;margin: 10px -0.5em -0.5em -0.5em;; border-top: 1px solid #ced4da;background-color: #e9ecef;
}
.guide-note{
  font-weight: bold;
  font-size: small;
}
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

<template>
  <div class="wrapper m-2" @click="handleTest">
    <div class="col-md-12 form-row pt-2">
      <div class="col-md-6 d-flex">
        <Label text="Đối tượng giá:" />
        <Input placeholder="Nhập đối tượng giá" v-model="search" />
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
              <span class="btn-inner--text">&nbsp;Thêm bảng giá</span>
            </base-button>
          </div>
        </div>
      </template>

      
        <div class="col-md-12 pt-2 tbl" style="height: 250px">
          <el-table
            class="dataTable"
            :data="tableData.content"
            fit
            header-row-class-name="thead-light"
            height="100%"
            :border="false"
            :default-expand-all="true"
          >
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-table 
                :border="true"
                max-width="100%"
                class="subTB"
                style="border: none;"
                :resizable="false" 
                :data="scope.row.sysGiaHDs" 
                :show-header="false" 
                :scrollbar-always-on="false"
                >
                 <el-table-column align="center" type="index" width="48">
                  </el-table-column>
                  <el-table-column min-width="200px" :resizable="false">
                    <div>
                      {{ scope.row.cTenDoiTuong }}
                    </div>
                  </el-table-column>
                  <el-table-column :resizable="false" align="center" :width="tableStyle.symbol">
                    <div>
                      {{ scope.row.cKyHieu }}
                    </div>
                  </el-table-column>
                  <el-table-column :resizable="false" align="center" :width="tableStyle.counter">
                    <div>
                      {{ scope.row.cDonViTinh }}
                    </div>
                  </el-table-column>
                  <el-table-column align="right" :resizable="false" :width="tableStyle.Sdate">
                    <template #default="scoped">
                      <span>{{ moment(scoped.row.dNgayBatDau).format("DD/MM/YYYY") }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="right" :resizable="false" :width="tableStyle.Edate">
                    <template #default="scoped">
                      <span>{{  moment(scoped.row.dNgayKetThuc).format("DD/MM/YYYY") }}</span>
                    </template></el-table-column>
                  <el-table-column :resizable="false" align="center" prop="nVat" :width="tableStyle.VAT"></el-table-column>
                  <el-table-column :resizable="false" align="center" prop="nPhiBvmt" :width="tableStyle.bvmt"></el-table-column>
                  <el-table-column :resizable="false" :width="tableStyle.action">
                  <template #default="scoped">
                    <el-button
                            type="primary"
                            size="mini"
                            @click="handleView(scoped.$index, scoped.row)"
                          >
                            <i class="el-icon-view mr-1"></i>
                            Xem
                          </el-button>
                          <el-button
                            type="primary"
                            size="mini"
                            @click="handleEdit(scoped.$index, scoped.row)"
                          >
                            <i class="el-icon-edit mr-1"></i>
                            Sửa
                          </el-button>
                          <el-button
                            type="danger"
                            size="mini"
                            @click="deleteBatch(scoped.$index, scoped.row)"
                          >
                            <i class="el-icon-delete mr-1"></i>
                            Xóa
                          </el-button>
                  </template>  
                  </el-table-column>

                </el-table>
              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              min-width="200px"
              label="Tên đối tượng giá"
              prop="cTenDoiTuong"
              header-align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cTenDoiTuong }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :resizable="false"
              :width="tableStyle.symbol"
              label="Ký hiệu"
              
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              :resizable="false"
              :width="tableStyle.counter"
              label="Đơn vị tính"
              
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              :resizable="false"
              :width="tableStyle.Sdate"
              label="Từ ngày"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              :resizable="false"
              :width="tableStyle.Edate"
              label="Đến ngày"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              :resizable="false"
              :width="tableStyle.VAT"
              label="Thuế VAT (%)"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              :resizable="false"
              :width="tableStyle.bvmt"
              label="Phí bảo vệ môi trường (%)"
              header-align="center"
            >
            </el-table-column>
            <el-table-column :resizable="false" :width="tableStyle.action" label="hành động">
            </el-table-column>
          </el-table>
        </div>
        <div class="col-12 py-2 pagination" style="justify-content: end">
          <el-pagination
            :page-sizes="[5, 10, 20, 30, 50]"
            background
            layout="total,sizes,  prev, pager, next"
            :page-size="10"
            :current-page.sync="tableData.pageNum"
            @current-change="handleCurrentPageChange"
            @size-change="handleSizeChange"
            :total="tableData.totalSize"
          >
          </el-pagination>
        </div>
    </el-card>
    <fieldset class="p-2" style="border: 1px solid #ccc">
      <legend style="width: 120px; font-size: 14px">Chi tiết bảng giá</legend>
      <el-card>
        <div class="col-md-12 py-2 tbl" >
          <el-table
            :data="subTableData"
            fit
            stripe
            header-row-class-name="thead-light"
            height="200"
            :border="true"
          >
            <el-table-column label="Tên" prop="cTen" header-align="center">
            </el-table-column>
            <el-table-column
              label="Mô tả"
              prop="cMoTa"
              width="400"              
              header-align="center"
            >
            </el-table-column>
            <el-table-column label="Từ số" prop="nTuSo" header-align="center">
            </el-table-column>
            <el-table-column label="Đến số" prop="nDenSo" header-align="center">
            </el-table-column>
            <el-table-column
              label="Giá có VAT"
              prop="nDonGiaGomVat"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              label="Đơn giá"
              prop="nDonGia"
              header-align="center"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </fieldset>
    <modal
      :show.sync="dialogForm"
      class="modalTemp"
      dataBackDrop="static"
      size="lg"
    >
      <h6 slot="header" class="modal-title" v-if="operation == 1">
        Thêm bảng giá
      </h6>
      <h6 slot="header" class="modal-title" v-if="operation == 2">
        Cập nhật bảng giá
      </h6>
      <h6 slot="header" class="modal-title" v-if="operation == 3">
        Bảng giá chi tiết
      </h6>

      <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
        <fieldset class="p-2" style="border: 1px solid #ccc">
          <legend style="width: 120px; font-size: 14px; white-space: nowrap;">
            Thông tin bảng giá
          </legend>
          <el-form-item
            class="form-item"
            label="Đối tượng giá"
            prop="nMaDoiTuongGia"
            :rules="[
              { required: true, message: 'Bạn chưa chọn đối tượng giá' },
            ]"
          >
            <el-select
              filterable
              placeholder="Chọn đối tượng giá"
              v-model="dataForm.nMaDoiTuongGia"
            >
              <el-option
                v-for="item in priceOjb"
                :key="item.id"
                :label="item.cTenDoiTuong"
                :value="item.nMaDoiTuong"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <div class="d-flex">
            <el-form-item class="form-item" label="Ngày bắt đầu" prop="cMota">
              <el-date-picker
                v-model="dataForm.dNgayBatDau"
                format="dd/MM/yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="form-item" label="Ngày kết thúc" prop="cMota">
              <el-date-picker
                v-model="dataForm.dNgayKetThuc"
                format="dd/MM/yyyy"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="d-flex">
            <el-form-item class="form-item" label="Phí BVMT (%)">
              <el-input
                placeholder="Nhập phí BVMT"
                v-model="dataForm.nPhiBvmt"
              ></el-input>
            </el-form-item>
            <el-form-item class="form-item">
            </el-form-item>
          </div>
          <div class="d-flex">
            <el-form-item
              class="form-item item-vat"
              label="Có VAT"
              prop="cDonvitinh"
            >
              <el-checkbox v-model="VAT"></el-checkbox>
            </el-form-item>

            <el-form-item
              class="form-item"
              label="Thuế VAT (%)"
              prop="cDonvitinh"
              v-if="VAT == true"
            >
              <el-input
                type="number"
                min="0"
                placeholder="Nhập thuế VAT(%)"
                v-model="dataForm.nVat"
                @change="getVAT"
              ></el-input>
            </el-form-item>
          </div>

          <div class="d-flex">
            <el-form-item
              class="form-item item-vat"
              label="Có tối thiểu"
              prop="cDonvitinh"
            >
              <el-checkbox v-model="toithieu"></el-checkbox>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="Tối thiểu"
              prop="cDonvitinh"
              v-if="toithieu == true"
            >
              <el-input
                placeholder="Nhập tối thiếu"
                v-model="dataForm.nToiThieu"
              ></el-input>
            </el-form-item>
          </div>
        </fieldset>
      </el-form>
      <div style="display: flex; justify-self: space-between; flex-wrap: wrap; justify-content: space-between; padding-bottom: 5px;">
        <div style="width: 70%;">
        <fieldset
          style="border: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 1px;height: 100%;"
        >
          <legend style="width: 140px; font-size: 14px; margin-left: 10px">
            Danh sách chi tiết giá
          </legend>
          <div class="tbl" style="display: flex; margin-left: 38px">
            <el-table
              :data="dataForm.sysGiaDTs"
              header-row-class-name="thead-light"
              height="250"
              :border="true"
              stripe
              @row-click="handleRow"
              ref="priceDetail"
            >
              <el-table-column label="Tên" header-align="center">
                <template slot-scope="scope">
                  <el-input class="input-row" v-model="scope.row.cTen"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Mô tả" header-align="center">
                <template slot-scope="scope">
                  <el-input
                    class="input-row"
                    v-model="scope.row.cMoTa"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Từ số" header-align="center">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    class="input-row"
                    v-model="scope.row.nTuSo"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Đến số" header-align="center">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    class="input-row"
                    v-model="scope.row.nDenSo"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Đơn giá" header-align="center">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    min="0"
                    class="input-row"
                    v-model="scope.row.nDonGia"
                    @input="getVAT"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="Giá có VAT" header-align="center">
                <template slot-scope="scope">
                  <el-input
                    type="number"
                    class="input-row"
                    v-model="scope.row.nDonGiaGomVat"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
            <div
              class="d-flex flex-column align-items-center"
              style="gap: 10px; padding: 5px"
            >
              <div>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-plus"
                  @click="addRow"
                  circle
                ></el-button>
              </div>
              <div>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-minus"
                  @click="removeRow"
                  circle
                ></el-button>
              </div>
            </div>
          </div>
        </fieldset>
        </div>
        <div style="width: 29%;">
        <fieldset
          style="border: 1px solid #ccc; padding-bottom: 20px; margin-bottom: 1px;height: 100%;"
        > 
        <legend class="highlight" style="width: 140px; font-size: 14px; margin-left: 10px">
            Cách nhập chi tiết
          </legend>
          <div style="padding:5px">
            <ol style="margin-left: 15px;text-align: justify;height: 100%;">
              <li> Đơn giá chi tiết theo bậc bắt đầu từ <span class="highlight">0 đến -1</span></li>
              <li> Chỉ số kết thúc của bậc trước bằng chỉ số bắt đầu bậc tiếp theo</li>
              <li >Ví dụ:
                <div style="width: 100%;"> 0   ->   20</div>
                <div style="width: 100%;">20   ->   40</div>
                <div style="width: 100%;">40   ->   -1</div>
              </li>
              <!-- <li>Giá trị <span class="highlight">"từ số"</span> bắt đầu bảng giá phải bằng <span class="highlight">0</span></li>
              <li>Giá trị <span class="highlight">"từ số"</span> bằng gái trị <span class="highlight">"đến số"</span> của khoảng giá trước khoảng giá đang nhập</li>
              <li>Giá trị <span class="highlight">"đến số"</span> kết thúc bảng giá phải bằng <span class="highlight">-1</span></li> -->
            </ol>
          </div>
        </fieldset>
      </div>
    </div>
      <template slot="footer">
        <base-button v-if="operation == 1" type="primary" @click="save"
          >Thêm</base-button
        >
        <base-button v-if="operation == 2" type="primary" @click="update"
          >Lưu</base-button
        >
        <base-button outline type="danger" @click="close">Thoát</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import Input from "../components/Input.vue";
import Label from "../components/Label.vue";
export default {
  components: {
    Input,
    Label,
  },
  data() {
    return {
      tableData: [],
      subTableData: [],
      priceOjb: [],
      Expandkeys: [],
      pageRequest: { pageNum: 1, pageSize: 10 },
      dialogForm: false,
      VAT: false,
      toithieu: false,
      operation: 1,
      search: "",
      dataForm: {
        dNgayBatDau: new Date(),
        dNgayKetThuc: new Date(),
        nVat: "",
        nPhiBvmt: "",
        nToiThieu: "",
        sysGiaDTs: [
          {
            cTen: "",
            cMoTa: "",
            nTuSo: "",
            nDenSo: "",
            nDonGiaGomVat: "",
            nDonGia: "",
          },
        ],
      },
      tableStyle:{
        name:"auto",
        symbol:100,
        counter:100,
        Sdate:150,
        Edate:150,
        VAT:100,
        bvmt:200,
        action:270,
      },

      row: "",
    };
  },

  methods: {
    handleTest(val){
      //console.log(val)
    },
    handleAdd() {
      this.$refs["dataForm"].resetFields()
      this.dialogForm = true
      this.toithieu = false
      this.operation = 1
      this.VAT = false
      this.dataForm = {
        nVat: "",
        nPhiBvmt: "",
        nToiThieu: "",
        sysGiaDTs: [
            {
                cTen: "",
                cMoTa: "",
                nTuSo: "",
                nDenSo: "",
                nDonGiaGomVat: "",
                nDonGia: "",
            },
        ]
      }
    },

    handleEdit(index, item) {
      this.dialogForm = true;
      this.operation = 2;
      this.dataForm = Object.assign({}, item);
      if (this.dataForm.nVat && this.dataForm.nVat > 0) {
        this.VAT = true;
      } else {
        this.VAT = false;
      }
      if (this.dataForm.nToiThieu != null) {
        this.toithieu = true;
      } else {
        this.toithieu = false;
      }
    },

    handleSearch() {
      this.findPage();
    },

    handleView(index, item) {
      const data = {
        nMaGiaHd: item.nMaGiaHd,
        nMaCongTy: localStorage.getItem("id"),
      };
      this.$api.price.findGiaDT(data).then((res) => {
        this.subTableData = res.data;
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
      else this.pageRequest.pageSize = 10;

      this.pageRequest.columnFilters = {
        nMaDoiTuongGia: { value: this.search },
      };

      this.$api.price.findPage(this.pageRequest).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
        } else {
          this.$message({ message: "Tải dữ liệu thất bại ", type: "error" });
        }
      });
    },

    save() {
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.dataForm);
          this.$api.price
            .insert(data)
            .then((res) => {
              if ((res.code == 200)) {
                this.$message({ message: res.msg, type: "success" });
                this.dialogForm = false;
                this.findPage();
                this.$refs["dataForm"].resetFields();
              } else {
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
          if(!this.VAT) 
            data.nVat = 0

          this.$api.price.update(data).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "Cập nhật bảng giá thành công",
                type: "success",
              });
              this.dialogForm = false;
              this.findPage();
            } else {
              this.$message({
                message: "Cập nhật bảng giá thất bại " + res.msg,
                type: "error",
              });
            }
          });
        }
      });
    },

    deleteBatch(index, item) {
      this.$confirm("Bạn có muốn xóa bảng giá này không?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "warning",
      })
        .then(() => {
          let params = item.nMaGiaHd;
          this.$api.price.deleteBatch(params).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: `Xóa thành công bảng giá`,
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

    handleCurrentPageChange(val) {
      this.findPage(val, this.dataForm.pageSize);
    },
    handleSizeChange(val) {
      this.findPage(this.pageRequest.pageNum, val);
    },

    handleRow(row) {
      this.row = this.dataForm.sysGiaDTs.indexOf(row);
    },

    addRow: function () {
        this.dataForm.sysGiaDTs.push({
            cTen: "",
            cMoTa: "",
            nTuSo: "",
            nDenSo: "",
            nDonGiaGomVat: "",
            nDonGia: "",
        });
    },

    removeRow() {
      this.dataForm.sysGiaDTs.splice(this.row, 1);
    },

    getVAT() {
      const VAT = this.dataForm.nVat;
      const price = this.dataForm.sysGiaDTs[this.row].nDonGia;
      const priceVAT = Number(price) + Number(price) * (VAT / 100);
      this.dataForm.sysGiaDTs[this.row].nDonGiaGomVat = priceVAT;
    },

    getPriceOjb() {
      this.$api.priceobject.findAll().then((res) => {
        this.priceOjb = res.data;
      });
    },
  },
  mounted() {
    this.findPage();
    this.getPriceOjb();
    this.handleTest()
  },
};
</script>
<style scoped>
.highlight{
  color: red;
}
.el-card-header {
  padding: 10px;
}
.tbl {
  /* height: calc(100vh - 405px); */
}
.form-item {
  margin-bottom: 5px;
  flex: 1;
}
.box-card {
  margin: 10px;
}
</style>

<style lang ="scss">
.form-item .el-form-item__error {
  padding-top: 0;
  position: relative;
}

.item-vat .el-form-item__content {
  display: flex;
  gap: 9px;
}

.item-vat .el-select {
  flex: 0 0 329px;
}

.form-item .el-input {
  display: block;
}
.el-date-editor.el-input {
  width: 100%;
}

.el-select {
  display: block;
}

.select-item .el-input .el-input__inner {
  width: 330px;
}
.el-card__body {
  padding: 0 !important;
}
.input-row .el-input__inner {
  border: none;
  padding: 0 5px;
}

.subtbl {
  width: 95%;
  margin-left: 45px;
}

.el-table th {
  background-color: #ebeef5;
}

.subTB {
 border: none !important;
}
</style>
<style>
.el-table__expanded-cell[class*=cell]{
  padding: 0!important;
}
.dataTable .el-table__body-wrapper {
  
  background-color: whitesmoke;
}
.subTB .el-table__body-wrapper{
  overflow-y:visible;
  overflow-x: visible;
  background-color: white
}
</style>

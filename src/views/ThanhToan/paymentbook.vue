<template>
<div class="paymentbook">
  <div class="col-md-12 form-row pt-2">
    <div class="col-md-2 flex">
        <Label text="Tháng:" />
        <el-date-picker
          class="item-date-control"
          type="month"
  
          value-format="dd/MM/yyyy"
          format="MM/yyyy"
          placeholder="Chọn tháng">
        </el-date-picker>       
      </div>
      <div class="col flex">
        <Label text="Cán bộ đọc:" />
        <Input placeholder="Nhập cán bộ đọc"  />
      </div>
      <div class="col flex">
        <Label text="Tuyến thu:" />
        <Input placeholder="Nhập tuyến thu"  />
      </div>
      <div class="col flex">
      <Label text="Tên sổ:" />
      <Input placeholder="Nhập tên sổ"  />
    </div>
  </div>
  <div class="col-md-12 form-row pt-2">
    <div class="col flex">
      <Label text="Khu vực:" />
      <Input placeholder="Nhập khu vực"  />
    </div>
    
    <div class="col flex">
      <Label text="Cán bộ đọc:" />
      <Input placeholder="Nhập cán bộ đọc"  />
    </div>
    <div class="col-md-5 flex">
      <Label text="Tuyến đọc:" />
      <Input placeholder="Nhập tuyến đọc"  />
      <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;" >
        <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
        <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
      </base-button>
    </div>
  </div>
    
    <el-card class="box-card">

      <template #header class="el-card-header">
        <div style="padding: 5px 10px;" class="form-row justify-content-center">
        <!-- <div class="col-md-6"> -->
          <div class="col-md-6" >
            <base-button type="primary" outline native-type="submit"  @click="centerDialogVisible = true">
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">&nbsp;Tạo sổ</span>
            </base-button>
            <base-button type="primary" outline native-type="submit"  @click="allpaymentbook = true">
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">&nbsp;Tạo sổ đồng loạt</span>
            </base-button>
            <base-button type="primary" outline native-type="submit" :loading="isLoadingPaymentbookDownload" @click="recordDownload">
              <span class="btn-inner--icon"><i class="el-icon-download"></i></span>
              <span class="btn-inner--text">&nbsp;Xuất dữ liệu</span>
            </base-button>
          </div>

          <div class="col-md-6" style="text-align: end;">
            <base-button type="primary" outline native-type="submit" style="margin-top:0px"  @click="handleSearch">
              <span class="btn-inner--icon"><i class="fas fa-check"></i></span>
              <span class="btn-inner--text">&nbsp;Chốt sổ</span>
            </base-button>

            <base-button type="primary" outline native-type="submit" style="margin-top:0px"  @click="handleSearch">
              <span class="btn-inner--icon"><i class="fas fa-ban"></i></span>
              <span class="btn-inner--text">&nbsp;Ngừng tất cả</span>
            </base-button>
          </div>
        </div>
      </template>

        <div class="col-md-12 tbl">
            <el-table
            :data="test"
            header-row-class-name="thead-light"
            :border="true"
            size="mini"
            stripe>

            <el-table-column
            label="Tuyến thu"
            header-align="center"
            prop="cTuyenThu">
            
            </el-table-column>

            <el-table-column
            label="Cán bộ thu"
            header-align="center"
            prop="cCanBoThu"
            >
            </el-table-column>

            <el-table-column
            label="Tên sổ"
            header-align="center"
            prop="cTenSo"
            min-width="50px"
            >
            </el-table-column>

            <el-table-column
            label="Đã thanh toán"
            header-align="center"
            prop="nThanhToan">
            </el-table-column>

            <el-table-column
            label="Tổng hóa đơn"
            header-align="center"
            prop="nTongHoaDon">
            <!-- <template slot-scope="scope">
                            <i :class="scope.row.cIcon"></i> 
                </template> -->
            </el-table-column>

            <el-table-column
            label="Chốt sổ"
            header-align="center"
            prop="cChotSo">
            
            </el-table-column>

            <el-table-column
            label="Trạng thái"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Ngày chốt"
            header-align="center"
            prop="dNgayChot">
            
            </el-table-column>

            <el-table-column
            label="Hành động"
            min-width="200px">
            <template slot-scope="scope">
  
              <el-button
                type="info"
                size="mini"
                @click="handleView(scope.$index, scope.row)">
                <i class="el-icon-view"></i>
                Xem
              </el-button>

              <el-button
              size="mini"
              type="warning"
              @click="lockpayment(scope.$index,scope.row)">
              <i v-if="scope.row.nTrangThai==1" class="el-icon-lock"> Mở</i> 
              <i v-if="scope.row.nTrangThai==0" class="el-icon-unlock"> Chốt</i> </el-button>
  
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
                Xóa
              </el-button>
            </template>
          </el-table-column>
        </el-table>
            
        </div>
        <div class="col-12 py-2 pagination" style="justify-content: end;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
          </div>
    </el-card>
    

    <div class="addapaymentbook">
      <modal
        :show.sync="centerDialogVisible" class="modalTemp" dataBackDrop="static" size="lg"
      >
      <h6 slot="header"><i class="fa fa-plus" style="margin-right: 3px;"></i>Tạo sổ thanh toán</h6>
      <el-form ref="sizeForm" label-width="120px" size="mini">
          <div>
            <div class="col-md-12 form-row pt-2">
              <div class="col-md-2 flex">
                <Label text="Tháng:" />
                <el-date-picker
                  class="item-date-control"
                  type="month"
                  value-format="dd/MM/yyyy"
                  format="MM/yyyy"
                  placeholder="Chọn tháng">
                </el-date-picker>       
              </div>
              <div class="col flex">
                <Label text="Cán bộ đọc:" />
                <Input placeholder="Nhập cán bộ đọc" />
              </div>
              <div class="col-md-5 flex">
                <Label text="Tuyến đọc:" />
                <Input placeholder="Nhập tuyến đọc" />
              </div>
            </div>
            <div class="col-md-12 form-row pt-2">
              <div class="col flex">
                  <Label text="Số hợp đồng:" />
                  <Input placeholder="Nhập số hợp đồng" />
              </div>
              <div class="col flex">
                <Label text="Thanh toán:" />
                  <DropdownList placeholder="Chọn thanh toán">
                    <el-option label="Chưa ghi" value="1"></el-option>
                    <el-option label="Đã ghi" value="2"></el-option>
                    <el-option label="ĐH cắt" value="3"></el-option>
                    <el-option label="ĐH không sử dụng" value="4"></el-option>
                    <el-option label="Vắng chủ" value="5"></el-option>
                    <el-option label="Tạm thu" value="6"></el-option>
                    <el-option label="Tạm ngưng" value="7"></el-option>
                  </DropdownList>
              </div>
              <div class="col-md-5 flex">
                  <Label text="Tuyến thu:" />
                  <Input placeholder="Nhập tuyến thu" />
                  <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"  @click="handleSearch">
                    <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                    <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                  </base-button>
              </div>
            </div>

          <el-card class="box-card">
            <div class="col-md-12 tbl">
              <el-table
                style="width: 100%"
                header-row-class-name="thead-light"
                :border="true"
                size="mini"
                @selection-change="handleSelectionChange"
                stripe>

                <el-table-column
                  type="selection"
                  min-width="55">
                  
                </el-table-column>

                <el-table-column
                  label="Tháng"
                  header-align="center"
                  min-width="50px"
                  prop="cTuyenDoc">
                  
                </el-table-column>

                <el-table-column
                  label="Năm"
                  prop="cTenChucNang"
                  min-width="50px"
                  >
                </el-table-column>

                <el-table-column
                  label="Số hóa đơn"
                  header-align="center"
                  prop="cUrl"
                  min-width="50px"
                  >
                  
                </el-table-column>

                <el-table-column
                  label="Số HĐ"
                  header-align="center"
                  min-width="50px"
                  prop="nLoai">
                </el-table-column>

                <el-table-column
                  label="Mã ĐH"
                  header-align="center"
                  min-width="50px"
                  prop="cIcon">
                  <!-- <template slot-scope="scope">
                    <i :class="scope.row.cIcon"></i> 
                  </template> -->
                </el-table-column>

                <el-table-column
                  label="Tên khách hàng"
                  header-align="center"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Địa chỉ"
                  header-align="center"
                  min-width="100px"
                  prop="nMaChucNang">
                  
                </el-table-column>

                <el-table-column
                  label="Tổng tiền"
                  header-align="center"
                  prop="nMaChucNang">
                  
                </el-table-column>

              </el-table>
              
            </div>

            <div class="col-12 py-2 pagination" style="justify-content:end">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-sizes="[5, 10, 20, 30, 40]"
                  layout="total, sizes, prev, pager, next, jumper"
                  >
                </el-pagination>
            </div>
          </el-card>        
          
      <div class="col-md-12 form-row pt-2" style="margin-bottom:10px">
        <div class="col-md-6 flex">
           <Label text="Cán bộ thu:" />
           <Input placeholder="Nhập cán bộ thu"/>
        </div>

        <div class="col-md-6 flex">
           <Label text="Tên sổ:" />
           <Input placeholder="Nhập tên sổ" />
        </div>
      </div>
          
    </div>  
    </el-form> 
    <template slot="footer">

      <base-button @click="closeForm()">Đóng</base-button>
      <base-button type="primary" @click="onSubmit('sizeForm')">Tạo sổ và đóng</base-button>
      <base-button type="primary" @click="onSubmit('sizeForm')">Tạo sổ và tạo tiếp</base-button>
        
    </template>
                                 
      </modal>
    </div>

    <div class="addallpaymentbook">
      <modal
        :show.sync="allpaymentbook" class="modalTemp" dataBackDrop="static" size="lg">
      <h6 slot="header" class="modal-title"><i class="fa fa-plus" style="margin-right: 3px;"></i>Tạo sổ thanh toán đồng loạt</h6>
      <el-form ref="sizeForm"  label-width="120px" size="mini">
          <div>
            <div class="col-md-12 form-row pt-2">
              <div class="col-md-2 flex">
                <Label text="Tháng:" />
                <el-date-picker
                  class="item-date-control"
                  type="month"
                  value-format="dd/MM/yyyy"
                  format="MM/yyyy"
                  placeholder="Chọn tháng">
                </el-date-picker>       
              </div>
              <div class="col flex">
                <Label text="Cán bộ đọc:" />
                <Input placeholder="Nhập cán bộ đọc" />
              </div>
              <div class="col-md-5 flex">
                <Label text="Tuyến đọc:" />
                <Input placeholder="Nhập tuyến đọc" />
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;">
                  <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                  <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                </base-button>
              </div>
            </div>

          <el-card class="box-card">
            <div class="col-md-12 tbl pt-2">
              <el-table
                style="width: 100%"
                header-row-class-name="thead-light"
                :border="true"
                size="mini"
                @selection-change="handleSelectionChange"
                stripe>

                <el-table-column
                  type="selection"
                  min-width="55">
                  
                </el-table-column>

                <el-table-column
                  label="Nhân viên"
                  header-align="center"
                  min-width="120px"
                  prop="cTuyenDoc">
                  
                </el-table-column>

                <el-table-column
                  label="Mã tuyến thu"
                  prop="cTenChucNang"
                  min-width="120px"
                  >
                </el-table-column>

                <el-table-column
                  label="Tên tuyến thu"
                  header-align="center"
                  prop="cUrl"
                  min-width="120px"
                  >
                  
                </el-table-column>

                <el-table-column
                  label="Đã tạo"
                  header-align="center"
                  min-width="50px"
                  prop="nLoai">
                </el-table-column>

              

              </el-table>
            </div>
            <div class="col-12 py-2 pagination" style="justify-content: end;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[5, 10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                >
              </el-pagination>
          </div>
          </el-card>
        </div>  
        </el-form> 
        <template slot="footer">
          <base-button type="primary" @click="onSubmit('sizeForm')">Tạo sổ đồng loạt</base-button>
          <base-button @click="closeForm()">Đóng</base-button>
        </template>
                                 
      </modal>
    </div>
</div>
</template>

<script>
  import Input from "../Pages/components/Input.vue"
  import Label from "../Pages/components/Label.vue"
  import { Table,Button, TableColumn, Pagination, Card, Option } from 'element-ui'
  import DatePicker from "../Pages/components/DatePicker.vue"
  import DropdownList from "../Pages/components/DropdownList.vue"

export default{
  components:{
    [Button.name]: Button,
    Input, Label, DropdownList, 
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
    [Card.name]: Card,
    [Option.name]: Option

  },
  data(){
      return{
          centerDialogVisible:false,
          allpaymentbook:false,
          isLoadingPaymentbookDownload:false,
          test:[
            {
              cTuyenThu:'Đông thái',
              cCanBoThu:'Đại',
              cTenSo:'1234',
              nThanhToan:'25',
              cChotSo:'đã chốt',
              nTongHoaDon:'25',
              nTrangThai:'1',
              dNgayChot:'25/3/2021',

            },
            {
              cTuyenThu:'Đông thái 1',
              cCanBoThu:'Đại',
              cTenSo:'1234',
              nThanhToan:'20',
              cChotSo:'chưa chốt',
              nTongHoaDon:'25',
              nTrangThai:'0',
              dNgayChot:'25/3/2021',

            },
          ],
      }
    },
    methods:{

    handleSizeChange(val) {
      // this.viewchucnang(this.pageRequest.pageNum, val)
      this.findContractDetail(this.pageRequest.pageNum, val)
    },
    handleCurrentChange(val) {    
      // this.viewchucnang(val, this.pageRequest.pageSize)
      this.findContractDetail(val, this.pageRequest.pageSize)
    },
    findContractDetail(pageNum, pageSize){
      if(typeof pageNum == "number")
        this.pageRequest.pageNum = pageNum 
      else
        this.pageRequest.pageNum = 1

      if (typeof pageSize == "number")
        this.pageRequest.pageSize = pageSize
      else
        this.pageRequest.pageSize = 5
      
        this.pageRequest.columnFilters = {
          cTenKhachHang: {value: this.searchForm.cTenKhachHang},
          cDiaChiKhachHang: {value: this.searchForm.cDiaChiKhachHang},
          nDienThoai: {value: this.searchForm.nDienThoai},
          cEmail: {value: this.searchForm.cEmail}
        }

        this.$api.khachhang.findContractDetail(this.pageRequest).then((res) => {
          if(res.code == 200 && res.data)
            this.listhopdong = res.data
          else
            this.listhopdong = {}
        })
    }, 

    handleSearch: function() {
      this.findContractDetail()
    },

    onSubmit(check){
      this.$refs.sizeForm.validate((valid) => {
        if (valid) 
        {
          
          this.$api.contract.addqlhopdong(this.sizeForm).then((res) => {
          if (res.code == 200) 
          {
            
            this.findContractDetail()
            this.centerDialogVisible=false
            if(this.operationbuttonadd===true)
            {
              this.$message({message: 'Tạo sổ thanh toán thành công', type: 'success'})
            }
            else if(this.operationbuttonedit===true)
            {
              
              this.$message({message: 'Sửa hợp đồng thành công', type: 'success'})
            }
          }
          else
          {
            if(this.operationbuttonadd===true)
            {
              this.$message({message: 'Thêm hợp đồng không thành công', type: 'warning'})
            }
            else if(this.operationbuttonedit===true)
            {
              this.$message({message: 'Sửa hợp đồng không thành công', type: 'warning'})
            }
            return false;
          }
        })
        }
      });
    },

    handleDelete(index,itemDelete){
      let panma = {nMaHopDong: itemDelete.nMaHopDong}
      this.$confirm(`Bạn có muốn xóa sổ thanh toán ${item.cTenSo} không`, 'Thông báo', {
        confirmButtonText: 'Đồng ý',
        cancelButtonText: 'Hủy bỏ',
        type: 'warning'
      }).then(()=>{
        this.$api.contract.deletehopdong([panma]).then((res) => {    
        
        this.$message({message: `Xóa thành công sổ thanh toán ${item.cTenSo}`, type:'success'})
        this.findContractDetail()  
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `Xóa sổ thanh toán ${item.cTenSo} không thành công`
        }); 
      });      
      
    },

    lockpayment(index,item){
      // let params = {nMaTaiKhoan: item.nMaTaiKhoan}
        
      this.$api.account.blockAccount().then((res) => {
        if (res.code == 200) {
            if(item.nTrangThai == 1) {
              this.$message({message: `Khóa sổ thanh toán ${item.cTenSo} thành công`, type:'success'})
            }
            else if(item.nTrangThai== 0){
              this.$message({message: `Mở sổ thanh toán ${item.cTenSo} thành công`, type:'success'})

            }
                this.findUser()
        } else{
        this.$message({message: 'Thất bại', type:'error'})
        }
         })
      },
    closeForm(){
      this.centerDialogVisible = false
      this.allpaymentbook = false
    },
    handleSelectionChange(val) {
      //console.log(val)
    },
    recordDownload:function(){
      try 
      {
        let dThang = "";
        if (this.selectedDate && this.selectedDate.length == 1) {
          dThang = moment(this.selectedDate[0]).format("DD/MM/YYYY")
        }
        this.isLoadingPaymentbookDownload = true
        this.pageRequest.columnFilters = {
          cTenKhachHang: {value: this.searchForm.cTenKhachHang},
          nMaHopDong: {value: this.searchForm.nMaHopDong},
          cTen: {value: this.searchForm.cTen},
          dThang: {value: this.searchForm.dThang},
          cTenTuyen: {value: this.searchForm.cTenTuyen},
          nTrangThaiDongHo: {value: this.searchForm.nTrangThaiDongHo},
        }

        this.$api.record.recordDownload(this.pageRequest).then((res) => {
          saveAs(new Blob([res]), 'Nhap_Chi_So' + moment().format("DD.MM.YYYY") + '.xlsx')
          this.isLoadingPaymentbookDownload = false
        })
      }
      catch(ex) {
         this.$message({message: 'Tải xuống thất bại', type: 'warning'})
      }        
    },
  }
}
</script>

<style scoped>
.flex {
  display:flex;
}
.box-card {
  margin: 10px;
}

.card-header {
  padding: 0px;
}
.tbl {
  height: calc(100vh - 275px);
}
.modalTemp .modal-footer{
        justify-self: start;
    }
</style>
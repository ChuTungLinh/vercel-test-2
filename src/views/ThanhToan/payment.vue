<template>
<div class="paymentbook">
    <div class="col-md-12 form-row pt-2">
        <div class="col-md-2 flex">
            <Label text="Tháng:" />
            <el-date-picker
                    class="item-date-control"
                    placeholder="Chọn tháng"
                    type="month"
                    format="MM/yyyy"
                 
                    v-model="search.dThang"
                    >
                    </el-date-picker>
        </div>
        <div class="col-md-5 flex">
            <Label text="Cán bộ đọc:" />
            <DropdownList placeholder="Chọn cán bộ" v-model="search.cTenNhanVien">
                <el-option v-for="item in employeeList" :key="item.id " :value="item.cTenNhanVien" :label="item.cTenNhanVien"></el-option>
            </DropdownList>
        </div>
        <div class="col-md-5 flex">
            <Label text="Tuyến đọc:" />
            <DropdownList placeholder="Chọn Tuyến đọc" v-model = "search.cTenTuyen">
                <el-option v-for="item in routeList" :key="item.id " :value="item.cTenTuyen" :label="item.cTenTuyen"></el-option>

            </DropdownList>
        </div>
    </div>

    <div class="col-md-12 form-row pt-2">

        <div class="col flex">
            <Label text="Trạng thái:" />
            <DropdownList placeholder="Chọn trạng thái" v-model = "search.nTinhTrang">
                <el-option label="Chưa thanh toán" value="1" ></el-option>
                <el-option label="Đã thanh toán" value="0" ></el-option>

            </DropdownList>
        </div>
        <div class="col-md-7 flex">
            <Label text="Tên KH:" />
            <DropdownList placeholder="Chọn tên khách hàng" v-model="search.cTenKhachHang">
                <el-option v-for="item in customerList" :key="item.id " :value="item.cTenKhachHang" :label="item.cTenKhachHang"></el-option>
            </DropdownList>
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;" @click="handleSearch">
            <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
            <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
        </base-button>
        </div>           
    </div>

    <el-card class="box-card">
        <template #header class="el-card-header">
            <div style="padding: 5px 10px;" class="form-row">
                <div class="col-md-12" >
                    <base-button type="primary" outline native-type="submit"  @click="paymentDownload">
                        <span class="btn-inner--icon"><i class="el-icon-download"></i></span>
                        <span class="btn-inner--text">&nbsp;Xuất dữ liệu</span>
                    </base-button>
                </div>
            </div>
        </template>
        <div class="col-md-12 tbl" >
            <el-table
            header-row-class-name="thead-light"
            :border="true"
            stripe style="height:100%" height="100%" fit
            :data="tableData.content">


            <el-table-column
            label="Mã hóa đơn"
            header-align="center"
            prop="nMaHoaDonHd">
            
            </el-table-column>

            <el-table-column
            label="Tên khách hàng"
            header-align="center"
            prop="cTenKhachHang"
            >
            </el-table-column>

            <el-table-column
            label="Người thu tiền"
            header-align="center"
            prop="cTenNhanVien"
            >
            </el-table-column>

            <el-table-column
            label="Đơn giá"
            header-align="center"
            prop="nDonGia">
            </el-table-column>

            <el-table-column
            label="Thành tiền"
            header-align="center"
            prop="nThanhTien">
            </el-table-column>

            <el-table-column
            label="Phí VAT"
            header-align="center"
            prop="nVat">
            
            </el-table-column>

            <el-table-column
            label="Tổng tiền"
            header-align="center"
            prop="nTongTien">
            
            </el-table-column>

            <el-table-column
            width="150"
            label="Tình trạng"
            header-align="center"
            prop="nTinhTrang">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.nTinhTrang == 1">Chưa thanh toán</el-tag>
                    <el-tag type="infor" v-if="scope.row.nTinhTrang == 0">Đã thanh toán</el-tag>
                </template>
            
            </el-table-column>

            <el-table-column
            width="140">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        size="mini"
                        data-toggle="modal" data-target=".bd-example-modal-sm"
                        :disabled="scope.row.nTinhTrang==0"
                        @click="payment(scope.$index, scope.row)"
                        >
                       <i class="fas fa-credit-card"></i>
                        Thanh toán
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
            
        </div>
        <div class="col-12 py-2 pagination" style="justify-content: end;">
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


    
</div>
</template>

<script>
  import Input from "../Pages/components/Input.vue"
  import Label from "../Pages/components/Label.vue"
  import { Table,Button, TableColumn, Pagination, Card, Option } from 'element-ui'
  import DatePicker from "../Pages/components/DatePicker.vue"
  import DropdownList from "../Pages/components/DropdownList.vue"
  import moment from "moment"
  import {saveAs} from "file-saver";


export default{
    components: {
       Label, DropdownList, 
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Pagination.name]: Pagination,
        [Card.name]: Card,
        [Option.name]: Option
    },
    data(){
        return{
            tableData:[],
            employeeList : [],
            routeList : [],
            customerList : [],
            pageRequest: {pageNum: 1, pageSize: 10},
            search:{
                dThang: new Date(),
                cTenNhanVien: "",
                cTenTuyen: "",
                cTenKhachHang: "", 
                nTinhTrang: "1",
            }
        }
    },

    methods:{
   

    handleSizeChange(val) {
      // this.viewchucnang(this.pageRequest.pageNum, val)
      this.findPagePayment(this.pageRequest.pageNum, val)
    },
    handleCurrentChange(val) {    
      // this.viewchucnang(val, this.pageRequest.pageSize)
      this.findPagePayment(val, this.pageRequest.pageSize)
    },
    handleSearch() {
        this.findPagePayment()
    },
    findPagePayment(pageNum, pageSize){
      if(typeof pageNum == "number")
        this.pageRequest.pageNum = pageNum 
      else
        this.pageRequest.pageNum = 1

      if (typeof pageSize == "number")
        this.pageRequest.pageSize = pageSize
      else
        this.pageRequest.pageSize = 5
      
        this.pageRequest.columnFilters = {
          cTenKhachHang: {value: this.search.cTenKhachHang},
          cTenNhanVien: {value: this.search.cTenNhanVien},
          nTinhTrang: {value: this.search.nTinhTrang},
          dThang: {value: moment(this.search.dThang).format("01/MM/YYYY")},
          cTenTuyen: {value: this.search.cTenTuyen},
        }
      

        this.$api.bill.findPagePayment(this.pageRequest).then((res) => {
          if(res.code == 200 && res.data)
            this.tableData = res.data
         
        })
    },  

    payment(index, item){
        const data = {nMaHoaDonHd: item.nMaHoaDonHd}
        this.$api.bill.payment(data) .then((res) => {
            if(res.code == 200){
                this.$message({message:"Thanh toán hóa đơn thành công", type:"success"})
                this.findPagePayment()
            } else{
                this.$message({message:"Thanh toán hóa đơn thất bại", type:"error"})
            }
        })
    },


    paymentDownload:function(){
      try 
      {
        let dThang = "";
        if (this.selectedDate && this.selectedDate.length == 1) {
          dThang = moment(this.selectedDate[0]).format("DD/MM/YYYY")
        }
        
        this.pageRequest.columnFilters = {
          cTenKhachHang: {value: this.search.cTenKhachHang},
          cTenNhanVien: {value: this.search.cTenNhanVien},
          nTinhTrang: {value: this.search.nTinhTrang},
          dThang: {value: moment(this.search.dThang).format("01/MM/YYYY")},
          cTenTuyen: {value: this.search.cTenTuyen},
        }



        this.$api.bill.paymentDownload(this.pageRequest).then((res) => {
          saveAs(new Blob([res]), 'thanh_toan_hoa_don' + moment().format("DD.MM.YYYY") + '.xlsx')
        })
      }
      catch(ex) {
         this.$message({message: 'Tải xuống thất bại', type: 'error'})
      }        
    },
    getEmployee(){
        const data = {}
        this.$api.employee.findAll(data).then((res) => {
            this.employeeList = res.data
        })
    },
    getRoute(){
        const data = {}
        this.$api.route.findAll(data).then((res) => {
            this.routeList = res.data
        })
     },
     getCustomer(){
        const data = {}
        this.$api.khachhang.findAll(data).then((res) => {
            this.customerList = res.data
        })
     }

  },
  mounted() {
      this.findPagePayment()
      this.getEmployee()
      this.getRoute()
      this.getCustomer()
    },
}
</script>

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
.modal-payment .modal-content {
       max-width: 219px;

}
.modal-payment .modal-dialog{
    justify-content: center;
}

/* div#data {
    opacity: 1;
    display: block !important;
} */
</style>

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
.inhoadon p{
    margin:0px;
}

</style>
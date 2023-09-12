<template>
<div class="paymentbook">
    <div class="col-md-12 form-row pt-2">
        <div class="col-md-2 flex">
            <Label text="Năm:" />
            <el-date-picker
                    class="item-date-control"
                    placeholder="Từ ngày"
                    type="year"
                    format="yyyy"
                    value-format="dd/MM/yyyy"
                    >
                    </el-date-picker>
        </div>
        <div class="col-md-3 flex">
            <Label text="Tên KH:" />
            <Input placeholder="Nhập tên khách hàng" />
        </div>
        <div class="col flex">
            <Label text="Nhân viên:" />
            <DropdownList placeholder="Chọn nhân viên" >
                <el-option key="" value="" label="Tất cả"></el-option>
                <el-option v-for="it in statusList" :key="it.nMaTrangThai" :value="it.nMaTrangThai" :label="it.cTenTrangThai"></el-option>
            </DropdownList>
        </div>
        <div class="col flex">
            <Label text="Loại KH:" />
            <DropdownList placeholder="Chọn loại KH" >
                <el-option key="" value="" label="Tất cả"></el-option>
                <el-option v-for="it in statusList" :key="it.nMaTrangThai" :value="it.nMaTrangThai" :label="it.cTenTrangThai"></el-option>
            </DropdownList>
        </div>
    </div>

    <div class="col-md-12 form-row pt-2">

        <div class="col flex">
            <Label text="Tuyến đọc:" />
            <DropdownList placeholder="Chọn tuyến đọc" >
                <el-option key="" value="" label="Tất cả"></el-option>
                <el-option v-for="it in statusList" :key="it.nMaTrangThai" :value="it.nMaTrangThai" :label="it.cTenTrangThai"></el-option>
            </DropdownList>
        </div>
        
        <div class="col flex">
            <Label text="Vùng:" />
            <DropdownList placeholder="Chọn vùng" >
                <el-option key="" value="" label="Tất cả"></el-option>
                <el-option v-for="it in statusList" :key="it.nMaTrangThai" :value="it.nMaTrangThai" :label="it.cTenTrangThai"></el-option>
            </DropdownList>
        </div>
        <div class="col-md-5 flex">
            <Label text="Khu vực:" />
            <DropdownList placeholder="Chọn khu vực" >
                <el-option key="" value="" label="Tất cả"></el-option>
                <el-option v-for="it in statusList" :key="it.nMaTrangThai" :value="it.nMaTrangThai" :label="it.cTenTrangThai"></el-option>
            </DropdownList>
            <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;" :loading="isLoading" @click="handleSearch">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
        </div>           
    </div>

    <el-card class="box-card">
        <div class="col-md-12 tbl" >
            <el-table
            header-row-class-name="thead-light"
            :border="true"
            size="mini"
            stripe>

            <el-table-column
            label="STT"
            type="index"
            width="50">
            </el-table-column>

            <el-table-column
            label="Mã KH"
            header-align="center"
            prop="cTuyenThu">
            
            </el-table-column>

            <el-table-column
            label="Tên khách hàng"
            header-align="center"
            prop="cCanBoThu"
            min-width="150px"
            >
            </el-table-column>

            <el-table-column
            label="Địa chỉ"
            header-align="center"
            prop="cTenSo"
            >
            </el-table-column>

            <el-table-column
            label="Tháng 1"
            header-align="center"
            prop="nThanhToan">
            </el-table-column>

            <el-table-column
            label="Tháng 2"
            header-align="center"
            prop="nTongHoaDon">
            </el-table-column>

            <el-table-column
            label="Tháng 3"
            header-align="center"
            prop="nTongHoaDon">
            </el-table-column>

            <el-table-column
            label="Tháng 4"
            header-align="center">
            
            </el-table-column>

            <el-table-column
            label="Tháng 5"
            header-align="center">
            
            </el-table-column>

            <el-table-column
            label="Tháng 6"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Tháng 7"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Tháng 8"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Tháng 9"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Tháng 10"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Tháng 11"
            header-align="center"
            prop="nTrangThai">
            
            </el-table-column>

            <el-table-column
            label="Tháng 12"
            header-align="center"
            prop="nTrangThai">
            
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
</template>

<script>
  import Input from "../components/Input.vue"
  import Label from "../components/Label.vue"
  import { Table,Button, TableColumn, Pagination, Card, Option } from 'element-ui'
  import DatePicker from "../components/DatePicker.vue"
  import DropdownList from "../components/DropdownList.vue"
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
        }
    },
    methods:{
    closeForm(){
      this.centerDialogVisible = false
      this.allpaymentbook = false
    },
  }
}
</script>

<style>
  .el-dialog__wrapper {
    overflow: hidden;
}
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

button.el-dialog__headerbtn {
    margin-top: -12px;
}
.tbl {
  height: calc(100vh - 275px);
}
  
.modalTemp .modal-footer{
    justify-self: start;
}
</style>
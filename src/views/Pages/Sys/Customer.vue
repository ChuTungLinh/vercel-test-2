<template>
    <div class="wrapper m-2">
        <div class="col-md-12 form-row pt-2">
        
          <div class="d-flex col-md-4">
              <Label text="Khách hàng:" />
              <Input placeholder="Nhập tên khách hàng" v-model="search.cTenKhachHang"/>
          </div>
          <div class="d-flex col-md-4">
            <Label text="Số điện thoại:" />
              <Input placeholder="Nhập số điện thoại " v-model="search.cDienThoai"/>
          </div>
         
        <div class="d-flex col-md-4">
            <Label text="Địa chỉ:" />
              <Input placeholder="Nhập địa chỉ " v-model="search.cDiaChi"/>
          </div>
          
       

        </div>
       
        <div class="col-md-12 form-row pt-2">
             <div class="d-flex col-md-6">
                <Label text="Số tài khoản:" />
                <Input placeholder="Nhập Số tài khoản" v-model="search.cSoTaiKhoanNganHang"/>
            </div>
       
            <div class="col-md-6 d-flex">
                <Label text="Trạng thái:" />
                <DropdownList  v-model="search.nTinhTrang">
                    <el-option value="1" label="Còn hợp đồng"></el-option>
                    <el-option value="0" label="Hết hợp đồng"></el-option>

                </DropdownList>
                <base-button type="primary" native-type="submit" style="max-height:28px; margin-top:0px; margin-left: 5px;" @click="handleSearch">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
            </div>           
        </div>
       
            <el-card class="box-card">
                <template #header class="el-card-header" > 
                     <div style="padding: 8px 20px;" class="form-row">
                        <!-- <base-button type="primary" outline @click="handleAdd">

                        <span  class="btn-inner--icon"><i class="fa fa-plus"></i></span>
                        <span class="btn-inner--text">&nbsp;Thêm nhân viên</span>   
                        </base-button> -->
                        <h6>Danh sách khách hàng</h6>
                     </div>
                </template>
                     <div class="col-md-12 tbl" >
                        <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true" stripe>
                            <el-table-column label="Tên khách hàng" prop="c_ten_khach_hang" min-width="150" >

                            </el-table-column>
                            <el-table-column label="Địa chỉ" prop="c_dia_chi" width="150" >
    
                            </el-table-column>
                            <el-table-column label="Email" prop="c_email" width="180" >
    
                            </el-table-column>
                            <el-table-column label="Số điện thoại" prop="c_dien_thoai" width="120">
    
                            </el-table-column>
                             <el-table-column label="Số CCCD" prop="c_cccd" width="120">
    
                            </el-table-column>
                            
                            <el-table-column label="Ngân hàng" prop="c_ten_ngan_hang" width="250" >

                            </el-table-column>
                            <el-table-column label="Số tài khoản " prop="c_so_tai_khoan_ngan_hang" width="120" >

                            </el-table-column>
                            <el-table-column label="Chủ tài khoản" prop="c_ten_chu_tai_khoan" width="150" >

                            </el-table-column>
                            <el-table-column label="Trạng thái" prop="" width="140" align="center" >
                                <template slot-scope="scope">
                                    <el-tag type ="success" v-if="scope.row.n_tinh_trang==1" >Còn hợp đồng</el-tag>
                                    <el-tag type ="info" v-if="scope.row.n_tinh_trang==0" >Hết hợp đồng</el-tag>

                                </template>
                            </el-table-column>

                            <el-table-column  align="center" width="170" >
                            <template slot-scope="scope">
                                    <el-button type="primary" size ="mini"
                                    :disabled="scope.row.n_tinh_trang==0"
                                    @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit mr-1"
                                    
                                    ></i>
                                       Sửa
                                    </el-button>
                                    <el-button type="danger" 
                                    :disabled="scope.row.n_tinh_trang==0"
                                    size ="mini" @click="deleteBatch(scope.$index,scope.row)">
                                    <i class="el-icon-delete mr-1"
                                    ></i>
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
                                    :current-page.sync="tableData.pageNum"
                                    :page-sizes="[5, 10, 20, 30, 40]"
                                    :page-size="tableData.pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="tableData.totalSize">
                            </el-pagination>
                    </div>
        </el-card>
        <modal :show.sync="dialogForm"> 
         <h6 slot="header" class="modal-title">Cập nhật thông tin khách hàng</h6>
                <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="150px" size="mini">
            <div class="row">
            <div class ="col-sm">
                <el-form-item label="Tên khách hàng" prop="cTenKhachHang">
                <el-input size ="mini" v-model="dataForm.cTenKhachHang"></el-input>
                </el-form-item>

                <el-form-item label="Địa chỉ" prop="cDiaChiKhachHang">
                <el-input size ="mini" v-model="dataForm.cDiaChi"></el-input>
                </el-form-item>

                <el-form-item label="Số điện thoại" prop="cDienThoai">
                <el-input size ="mini" v-model="dataForm.cDienThoai"></el-input>
                </el-form-item>

                <el-form-item label="Email" prop="cEmail">
                <el-input size ="mini" v-model="dataForm.cEmail"></el-input>
                </el-form-item>
                <el-form-item label="Số CCCD" prop="cSoCccd">
                <el-input size ="mini" v-model="dataForm.cCccd"></el-input>
                </el-form-item>
                <div class="d-flex ">
                    <el-form-item label="Nơi cấp" prop="cNoiCapCccd" style="flex:1">
                    <el-input size ="mini" v-model="dataForm.cNoiCapCccd"></el-input>
                    </el-form-item>
                    <el-form-item label="Ngày cấp" prop="dNgayCapCccd">
                    <el-date-picker
                            v-model="dataForm.dNgayCapCccd"
                            class="item-date-control"
                            placeholder="Chọn ngày cấp"
                            type="date"
                            format="dd/MM/yyyy"
                            size="mini"
                         >
                         </el-date-picker>
                    </el-form-item>

                </div>
                 <el-form-item label="Tên ngân hàng:" prop="nMaNganHang">
                      <el-select style="width: 100%;"  v-model="dataForm.nMaNganHang" placeholder="Chọn ngân hàng">
                        <el-option
                          v-for="item in listnganhang"
                          :key="item.nMaNganHang"
                          :label="item.cTenNganHang"
                          :value="item.nMaNganHang" >
                        </el-option>
                      </el-select>
                  </el-form-item>
                <el-form-item label="Số tài khoản" prop="cSoTaiKhoanNganHang">
                <el-input size ="mini" v-model="dataForm.cSoTaiKhoanNganHang"></el-input>
                </el-form-item>
                <el-form-item label="Tên chủ tài khoản" prop="cTenChuTaiKhoan">
                    <el-input size ="mini" v-model="dataForm.cTenChuTaiKhoan"></el-input>
                </el-form-item>
                <div class="d-flex">
                    <el-form-item label="Mã số thuế" prop="cMaSoThue">
                    <el-input size ="mini" v-model="dataForm.cMaSoThue"></el-input>
                </el-form-item>
                    <el-form-item label="Số khẩu" prop="nSoKhau">
                    <el-input size ="mini" v-model="dataForm.nSoKhau"></el-input>
                </el-form-item>
                </div>
                <el-form-item label="Loại khách hàng" prop="nMaLoaiKhachHang">
                    <el-select v-model="dataForm.nMaLoaiKhachHang" placeholder="Chọn khách hàng">
                        <el-option
                          v-for="item in customerTypeList"
                          :key="item.nMaLoaiKhachHang"
                          :label="item.cTenLoaiKhachHang"
                          :value="item.nMaLoaiKhachHang" >
                        </el-option>
                      </el-select>
                </el-form-item>

                </div>
                   </div>
                </el-form>
            <template slot="footer">
                <base-button type="primary" @click="update">Lưu</base-button>
                <base-button outline type="danger" @click="close()" >Thoát</base-button>
            </template>
        </modal>
    </div>

</template>
<script>
import Label from "../components/Label.vue"
import Input from "../components/Input.vue"
import DropdownList  from "../components/DropdownList.vue"

        export default {
            components: {
    Label,
    Input,
    DropdownList,

},
            data(){
                return {
                    tableData:[],
                    customerTypeList:[],
                    rules:{
                    },
                    pageRequest: {pageNum: 1, pageSize: 30},
                    dialogForm: false,
                    search:{
                        cTenKhachHang: '',
                        cDienThoai:"",
                        cDiaChi: "",
                        cCccd: "",
                        cSoTaiKhoanNganHang: "",
                        nMaLoaiKhachHang:"",
                        nTinhTrang:"1"
                    },
                    listnganhang:[],
                    dataForm:{
                       cTenKhachHang:'',
                        cDiaChi: '',
                        cDienThoai:"",
                        cEmail: "",
                        cNoiCapCccd:"",
                        dNgayCapCccd: "",
                        cTenChuTaiKhoan: "",
                        nMaNganHang:"",
                        cCccd: "",
                        cSoTaiKhoanNganHang: "",
                        nMaLoaiKhachHang:"",
                        nTinhTrang:"",
                    },
                    operation: false,
                }
            },
            methods: {
 
                    handleEdit(index, item){  
                      this.dialogForm = true
                      this.dataForm = {
                        cTenKhachHang: item.c_ten_khach_hang,
                        cMaSoThue: item.c_ma_so_thue,
                        cDiaChi: item.c_dia_chi,
                        nSoKhau: item.n_so_khau,
                        cDienThoai: item.c_dien_thoai,
                        cEmail: item.c_email,
                        cNoiCapCccd: item.c_noi_cap_cccd,
                        dNgayCapCccd: item.d_ngay_cap_cccd,
                        cTenChuTaiKhoan: item.c_ten_chu_tai_khoan,
                        nMaNganHang: item.n_ma_ngan_hang,
                        cCccd: item.c_cccd,
                        cSoTaiKhoanNganHang: item.c_so_tai_khoan_ngan_hang,
                        nMaLoaiKhachHang: item.n_ma_loai_khach_hang,
                        nTinhTrang: item.n_tinh_trang,
                        nMaKhachHang: item.n_ma_khach_hang,
                      }
                        
                    },  

                    handleSearch(){
                            this.findPage()
                    },
                    close(){
                        this.$refs.dataForm.resetFields();
                        this.dialogForm = false;
                    },


                    findPage(pageNum,pageSize){
                        if(typeof pageNum == "number")
                            this.pageRequest.pageNum = pageNum 
                            else
                            this.pageRequest.pageNum = 1

                        if (typeof pageSize == "number")
                        this.pageRequest.pageSize = pageSize
                            else
                        this.pageRequest.pageSize = 30

                        this.pageRequest.columnFilters = { 
                            cTenKhachHang: { value: this.search.cTenKhachHang},
                            cDienThoai: {value: this.search.cDienThoai},
                            cDiaChi: { value: this.search.cDiaChi},
                            cSoTaiKhoanNganHang: {value: this.search.cSoTaiKhoanNganHang},
                            nMaLoaiKhachHang: {value: this.search.nMaLoaiKhachHang},
                            nTinhTrang: {value: this.search.nTinhTrang},
                        }
                        this.$api.khachhang.findPage(this.pageRequest).then((res) => {
                            if(res.code == 200){
                                this.tableData = res.data;
                            }
                            else{
                                this.$message({message: "Tải dữ liệu thất bại", type: "error"})
                            }
                        })
                    },

                     update(){
                            this.$refs.dataForm.validate((valid) =>{
                                if(valid){
                                    let data = Object.assign({}, this.dataForm)
                                    this.$api.khachhang.update(data).then((res) => {
                                        if(res.code == 200){
                                            this.$message({message:"Cập nhật khách hàng thành công", type:"success"})
                                            this.dialogForm = false
                                            this.findPage()
                                        } else {
                                            this.$message({message:"Cập nhật khách hàng thất bại " , type:"error"})
                                        }
                                    })
                                }
                            })
                        },
                        deleteBatch(index,item){
                            console.log(item)
                            this.$confirm("Bạn có muốn xóa khách hàng này không?",'Xác nhận',{
                                confirmButtonText: 'Xác nhận',
                                cancelButtonText: 'Hủy',
                                type: 'warning'
                                }).then(()=>{
                                let params = item.n_ma_khach_hang
  
                                this.$api.khachhang.deleteBatch(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({message: `Xóa thành công khách hàng ${item.c_ten_khach_hang}`, type:'success'})
                                    this.findPage()
                                } else {
                                    this.$message({message: `Xóa thất bại`, type:'error'})
                                }
                                })
                                
                            })
                            .catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: 'Hủy xóa'
                                });          
                                });
                            
                                },

                    bankShow(){
                        this.$api.bank.bankShow({}).then((res) =>{
                            if(res.code == 200)
                            {
                            this.listnganhang = res.data
                            }
                        })
                        },
                  
                    handleSizeChange(val) {
                        // this.showAccount(this.validateForm.pageNum, val)
                        this.findPage(this.pageRequest.pageNum, val)
                        },
                        handleCurrentChange(val) {
                        this.findPage(val, this.pageRequest.pageSize)
                        // this.showAccount(val, this.validateForm.pageSize)
                        },
                        getCustomerType(){
                            const data = {}
                            this.$api.customertype.findAll(data) .then((res) => {
                                this.customerTypeList = res.data

                            })
                        }

            },
        mounted() {
            this.findPage()
            this.bankShow()
            this.getCustomerType()
        }

        }
</script>
<style scoped>
 .tbl {
        height: calc(100vh - 250px);
    }
 .item-date-control {
        flex: auto;
        width: auto;
    }
    .box-card {
        margin: 10px;
    }

    h6 {
        margin-bottom: 0px;
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

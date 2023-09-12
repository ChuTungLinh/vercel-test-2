<template>
    <div class="wrapper m-2">
        <div class="col-md-12 form-row pt-2">
            <div class="col-md-8 d-flex">
                <Label text="Kỳ:" />
                <Input placeholder="Nhập tên kỳ" v-model="search.cTenKy" />                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;" @click="handleSearch">
                    <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                    <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                </base-button>
            </div>
        </div>
            <el-card style="margin-top: 10px">
                <template #header class="el-card-header" > 
                    <el-row style="padding: 5px 10px;" class="form-row">
                        <div class="col-md-6">
                            <base-button type="primary" outline native-type="submit" @click="handleAdd">
                                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                                <span class="btn-inner--text">&nbsp;Thêm kỳ</span>
                            </base-button>
                        </div>
                    </el-row>               
                </template>

                <div class="col-md-12 tbl" >
                        <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true" stripe>
                            <el-table-column label="Mã kỳ" prop="nMaKy" header-align="center">

                            </el-table-column>
                            <el-table-column label="Tên kỳ" prop="cTenKy" header-align="center">

                            </el-table-column>
                            <el-table-column label="Ngày bắt đầu" prop="dNgayBatDau"  header-align="center">
                                <template slot-scope="scope">

                                    <span v-if="scope.row.dNgayBatDau">{{moment(scope.row.dNgayBatDau).format('DD/MM/YYYY')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Ngày kết thúc" prop="dNgayKetThuc"  header-align="center">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.dNgayKetThuc">{{moment(scope.row.dNgayKetThuc).format('DD/MM/YYYY')}}</span>

                                </template>
                            </el-table-column>
                            <el-table-column label="Ngày hóa đơn" prop="dNgayHoaDon"  header-align="center">
                                <template slot-scope="scope">
                                <span v-if="scope.row.dNgayHoaDon">{{moment(scope.row.dNgayHoaDon).format('DD/MM/YYYY')}}</span>

                            </template>
                            </el-table-column>          
                            <el-table-column label="Trạng thái" prop="nTinhTrang" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.nTinhTrang == 1">Hoạt động</el-tag>
                                    <el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Đã xóa</el-tag>

                                </template>
                               
                            </el-table-column>
                            <el-table-column width = "180" align="center">
                            <template slot-scope="scope">
                                    <el-button type="primary" :disabled="scope.row.nTinhTrang == 0" size ="mini" @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit mr-1"></i>
                                       Sửa
                                    </el-button>
                                    <el-button type="danger" :disabled="scope.row.nTinhTrang == 0" size ="mini" @click="deleteBatch(scope.$index, scope.row)">
                                    <i class="el-icon-delete mr-1"></i>
                                       Xóa
                                    </el-button>
                            </template>
                            </el-table-column>
                           
                        </el-table>
                     </div>
                  <div class="col-12 py-2 pagination" style="justify-content: end;">
                                <el-pagination
                                :page-sizes="[5, 10, 20, 30, 50]"
                                background
                                layout="total,sizes,  prev, pager, next"
                                :page-size="20"
                                :current-page.sync="tableData.pageNum"
                                @current-change="handleCurrentPageChange"
                                @size-change="handleSizeChange"
                                :total="tableData.totalSize">
                            </el-pagination>
                    </div>
            </el-card>
         <modal :show.sync="dialogForm">
            <h6 slot="header" class="modal-title" v-if="!operation">Thêm kỳ</h6>
            <h6 slot="header" class="modal-title" v-if = "operation">Cập nhật thông tin kỳ</h6>

                <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
                    <el-form-item label="Tên kỳ" prop="cTenKy" :rules="[{required: true, message:'Bạn chưa nhập tên kỳ'}]">
                        <el-input v-model="dataForm.cTenKy"></el-input>
                    </el-form-item>
                    <el-form-item  label="Ngày bắt đầu" prop="dNgayBatDau" :rules="[{required: true, message:'Bạn chưa nhập ngày bắt đầu'}]">
                        <el-date-picker  type="date" v-model="dataForm.dNgayBatDau" format="dd/MM/yyyy"></el-date-picker>
                    </el-form-item>
                    <el-form-item  label="Ngày kết thúc" prop="dNgayKetThuc" :rules="[{required: true, message:'Bạn chưa nhập ngày kết thúc'}]">
                        <el-date-picker  v-model="dataForm.dNgayKetThuc" format="dd/MM/yyyy"></el-date-picker>
                    </el-form-item>
                    <el-form-item  label="Ngày hóa đơn" prop="dNgayHoaDon" :rules="[{required: true, message:'Bạn chưa nhập ngày hóa đơn'}]">
                        <el-date-picker  v-model="dataForm.dNgayHoaDon" format="dd/MM/yyyy" ></el-date-picker>
                    </el-form-item>
                </el-form>
            <template slot="footer">
                <base-button v-if="!operation" type="primary" @click="save">Thêm</base-button>
                <base-button v-if="operation" type="primary" @click="update">Lưu</base-button>
                <base-button outline type="danger" @click="close">Thoát</base-button>
            </template>
        </modal>
    </div>

</template>
<script>
    import Label from "../components/Label.vue"
    import Input from "../components/Input.vue"
    import moment from "moment"

        export default {
             components: {
                Label,Input,
            },
            data(){
                return {
                    tableData:[],
                    pageRequest: {pageNum: 1, pageSize: 20},
                    dialogForm: false,
                    operation: false,
                    search:{
                        cTenKy:"",
                        dNgayBatDau: new Date(),
                        dNgayKetThuc: new Date(), 
                        dNgayHoaDon: new Date(),
                    },
                    dataForm:{
                        cTenKy:"",
                        dNgayBatDau: new Date(),
                        dNgayKetThuc: new Date(), 
                        dNgayHoaDon: new Date(),
                    }
                }
            },
            methods: {
 
                        handleAdd(){
                            this.$refs["dataForm"].resetFields();
                            this.dialogForm = true;
                            this.operation = false;
                        },
                        handleEdit(index, item){
                            this.dialogForm = true;
                            this.operation = true;
                            this.dataForm = Object.assign({},item)
                        },

                        handleSearch(){
                            this.findPage()
                        },


                        close(){
                            this.$refs["dataForm"].resetFields();
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
                            this.pageRequest.pageSize = 20

                            this.pageRequest.columnFilters = { 
                                cTenKy: {value: this.search.cTenKy},
                                dNgayBatDau: {value: moment(this.search.dNgayBatDau).format('DD/MM/YYYY')},
                                dNgayHoaDon: {value: moment(this.search.dNgayHoaDon).format('DD/MM/YYYY')},
                                dNgayKetThuc: {value: moment(this.search.dNgayKetThuc).format('DD/MM/YYYY')},
                            }
                            this.$api.term.findPage(this.pageRequest).then((res) => {
    
                                if(res.code == 200){
                                    this.tableData = res.data;
                                
                                } else
                                {
                                    this.$message({message:"Tải dữ liệu thất bại " , type:"error"});
                                }
                            })
                        },
                        save(){
                            this.$refs.dataForm.validate((valid) =>{
                                if(valid){
                                    let data = Object.assign({}, this.dataForm)
                                    this.$api.term.insert(data) 
                                    .then((res) => {
                                        if(res.code == 200){    
                                            this.$message({message:res.msg, type:"success"})
                                            this.dialogForm = false
                                            this.findPage()
                                            this.$refs["dataForm"].resetFields()
                                        } else {
                                            this.$message({message:res.msg, type:"error"})
                                        }
                                    })
                                    .catch(() => {
                                    })
                                }

                            });
                        },
                        update(){
                            this.$refs.dataForm.validate((valid) =>{
                                if(valid){
                                    let data = Object.assign({}, this.dataForm)
                                    this.$api.term.update(data).then((res) => {
                                    
                                        if(res.code == 200){
                                            this.$message({message:res.msg, type:"success"})
                                            this.dialogForm = false
                                            this.findPage()
                                        } else {
                                            this.$message({message:res.msg+ res.code, type:"error"})
                                        }
                                    })
                                }
                            })
                        },
                        deleteBatch(index,item){
                            this.$confirm("Bạn có muốn xóa kỳ này không?",'Xác nhận',{
                                confirmButtonText: 'Xác nhận',
                                cancelButtonText: 'Hủy',
                                type: 'warning'
                                }).then(()=>{
                                let params = item.nMaKy  
                                this.$api.term.deleteBatch(params).then((res) => {
                                if (res.code == 200) {
                                    this.$message({message: res.msg, type:'success'})
                                    this.findPage()
                                } else {
                                    this.$message({message: res.msg, type:'error'})
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

                                handleCurrentPageChange(val){
                        this.findPage(val, this.dataForm.pageSize)
                    },
                    handleSizeChange(val){
                        this.findPage(this.pageRequest.pageNum, val)
                    }


            },
            mounted(){
                this.findPage()
            }

        }
</script>
<style scoped>
.el-card-header {
    padding: 10px;
}
 .tbl {
        height: calc(100vh - 210px);
    }
     .item-date-control {
        flex: auto;
        width: auto;
    }
</style>

<style lang ="scss">
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
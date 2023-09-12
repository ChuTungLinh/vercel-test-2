<template>
    <div class="wrapper m-2">
        <div class="col-md-12 form-row pt-2">
            <div class="col-md-8 d-flex">
                <Label text="Ngân hàng:" />
                <Input placeholder="Nhập tên ngân hàng" v-model="search" />
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;" @click="handleSearch">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
            </div>           
        </div>
       
            <el-card class="box-card">
                <template #header class="el-card-header" > 
                     <div style="padding: 5px 10px;" class="form-row">
                        <base-button type="primary" outline @click="handleAdd">
                                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                                <span class="btn-inner--text">&nbsp;Thêm ngân hàng</span>
                        </base-button>
                     </div>
                </template>
                     <div class="col-md-12 tbl" >
                        <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true">
                            <el-table-column label="Mã ngân hàng" width="150px" prop="nMaNganHang" header-align="center">
                                
                            </el-table-column>
                            <el-table-column label="Icon" width="70px"  header-align="center">
                                <template slot-scope="props">
                                <img :src="`/img/banklogo/${props.row.nMaNganHang}.png`" alt=""  style="max-height: 30px;">
                                </template>
                            </el-table-column>
                            <el-table-column label="Tên ngân hàng" prop="cTenNganHang" header-align="center">

                            </el-table-column>
                            <el-table-column label="Trạng thái" width="150px" prop="nTinhTrang" header-align="center">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.nTinhTrang == 1">Hoạt động</el-tag>
                                    <el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Đã xóa</el-tag>

                                </template>
                               
                            </el-table-column>
                            <el-table-column width = "180" >
                            <template slot-scope="scope">
                                   <el-button type="primary" size ="mini" @click="handleEdit(scope.$index, scope.row)"
                                   :disabled="scope.row.nTinhTrang==0"
                                   >
                                    <i class="el-icon-edit mr-1"></i>
                                       Sửa
                                    </el-button>
                                    <el-button type="danger" size ="mini" @click="deleteBatch(scope.$index, scope.row)"
                                    :disabled="scope.row.nTinhTrang==0"
                                    >
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
                                :current-page.sync="pageRequest.pageNum"
                                @current-change="handleCurrentChange"
                                @size-change="handleSizeChange"
                                :total="tableData.totalSize">
                            </el-pagination>
                    </div>
        </el-card>
        <modal :show.sync="dialogForm"> 
            <h6 slot="header" class="modal-title" v-if="!operation">Thêm ngân hàng</h6>
            <h6 slot="header" class="modal-title" v-if="operation">Cập nhật thông tin ngân hàng</h6>
                <el-form :model="dataForm" :rules="rules" ref="dataForm" label-width="150px" >
                    <el-form-item label="Tên ngân hàng" prop="cTenNganHang" 
                    >
                        <el-input size ="mini" v-model="dataForm.cTenNganHang"></el-input>
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

        export default {
            components: {
                Label, Input,
            },
            data(){
                return {
                    tableData:[],
                    rules:{
                        cTenNganHang: [{required: true, message:'Bạn chưa nhập tên ngân hàng'}]
                    },
                    pageRequest: {pageNum: 1, pageSize: 20},
                    dialogForm: false,
                    search:'',
                    dataForm:{
                        cTenNganHang:"",
                    },
                    operation: false,
                }
            },
            methods: {
 
                    handleAdd(){
                            this.$refs["dataForm"].resetFields();
                            this.dialogForm = true
                            this.operation = false;
                            this.dataForm ={
                                cTenNganHang:"",
                            }
                    },
                    handleEdit(index, item){  
                      this.dialogForm = true
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
                    save(){
                        this.$refs.dataForm.validate((valid) =>{
                            if(valid){
                                let data = Object.assign({}, this.dataForm)
                                this.$api.bank.insert(data)
                                .then((res) => {
                                    if(res.code == 200){
                                        this.$message({message:res.msg, type:"success"})
                                        this.$refs["dataForm"].resetFields();
                                        this.dialogForm = false
                                        this.findPage()
                                    }
                                    else {
                                        this.$message({message:res.msg   , type:"error"})
                                    }
                                })
                            }
                        })
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
                            cTenNganHang: { value: this.search}
                        }
                       
                        this.$api.bank.findPage(this.pageRequest).then((res) => {
                                this.tableData = res.data;
                        })
                    },
                    update(){
                        this.$refs.dataForm.validate((valid) =>{
                            if(valid){
                                let data = Object.assign({}, this.dataForm)
                                this.$api.bank.update(data).then((res) => {
                                   
                                    if(res.code == 200){
                                        this.$message({message:res.msg, type:"success"})
                                        this.dialogForm = false
                                        this.findPage()
                                    } else {
                                        this.$message({message:res.msg, type:"error"})
                                    }
                                })
                            }
                        })
                    },

                     deleteBatch(index,item){
                        this.$confirm("Bạn có muốn xóa ngân hàng này không?",'Xác nhận',{
                            confirmButtonText: 'Xác nhận',
                            cancelButtonText: 'Hủy',
                            type: 'warning'
                            }).then(()=>{
                            let params = item.nMaNganHang  
                            this.$api.bank.deleteBatch(params).then((res) => {
                            if (res.code == 200) {
                                this.$message({message:res.msg, type:'success'})
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
                    
                    handleSizeChange(val) {
                        // this.showAccount(this.validateForm.pageNum, val)
                        this.findPage(this.pageRequest.pageNum, val)
                        },
                        handleCurrentChange(val) {
                        this.findPage(val, this.pageRequest.pageSize)
                        // this.showAccount(val, this.validateForm.pageSize)
                        },

            },
        mounted() {
            this.findPage()
        }

        }
</script>
<style scoped>
 .tbl {
        height: calc(100vh - 275px);
    }

    .box-card {
        margin: 10px;
    }
</style>

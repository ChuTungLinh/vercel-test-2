<template>
    <div class="wrapper m-2">
        <div class="col-md-12 form-row pt-2">
            <div class="col-md-6 d-flex">
                    <Label text="Trạng thái đọc:" />
                    <Input placeholder="Nhập trạng thái đọc" v-model="search" />
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;" @click="handleSearch">
                    <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                    <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                </base-button>
            </div>
        </div>
            <el-card style="margin-top: 10px">
                <template #header class="el-card-header" > 
                     <div style="padding: 5px 10px;" class="form-row">
                         <div class="col-md-6">
                            <base-button type="primary" outline native-type="submit" @click="handleAdd">
                                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                                <span class="btn-inner--text">&nbsp;Thêm trạng thái đọc chỉ số</span>
                            </base-button>
                        </div>
                     </div>

                     <div class="col-md-12 tbl">
                        <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true">
                            <el-table-column label="Tên trạng thái" prop="cTenTrangThai" header-align="center" >
                                <template slot-scope="scope">
                                     <span :style="{color: scope.row.cMaMau}">{{scope.row.cTenTrangThai}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Mô tả" prop="cMoTa"  header-align="center">
                                 <template slot-scope="scope">
                                     <span :style="{color: scope.row.cMaMau}">{{scope.row.cMoTa}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Mã màu" prop="cMaMau"  header-align="center">
                                <template slot-scope="scope">
                                     <span :style="{color: scope.row.cMaMau}">{{scope.row.cMaMau}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Thứ tự" prop="nThuTu"  header-align="center">
                                     <template slot-scope="scope">
                                     <span :style="{color: scope.row.cMaMau}">{{scope.row.nThuTu}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Cho phép ghi" prop="nChoPhepGhi"  header-align="center">
                                <template slot-scope="scope">
                                     <span :style="{color: scope.row.cMaMau}">{{scope.row.nChoPhepGhi}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Cho phép hiện thị" prop="nChoPhepHienThi"  header-align="center">
                                <template slot-scope="scope">
                                     <span style="{color: #ccc}">{{scope.row.nChoPhepHienThi}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Tình trạng" prop="nTinhTrang"  header-align="center">
                                <template slot-scope="scope">
                                     <span :style="{color: scope.row.cMaMau}">{{scope.row.nTinhTrang}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column width = "180">
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
                                :page-size="10"
                                :current-page.sync="tableData.pageNum"
                                @current-change="handleCurrentPageChange"
                                @size-change="handleSizeChange"
                                :total="tableData.totalSize">
                            </el-pagination>
                    </div>


               
                </template>
            </el-card>
        <modal :show.sync="dialogForm">
            <h6 slot="header" class="modal-title" v-if="!operation">Thêm trạng thái đọc</h6>
            <h6 slot="header" class="modal-title" v-if = "operation">Cập nhật trạng thái đọc</h6>
                <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
                    <el-form-item  label="Tên trạng thái" prop="cTenTrangThai" :rules="[{required: true, message:'Bạn chưa nhập tên trạng thái đọc'}]">
                        <el-input size="small" v-model="dataForm.cTenTrangThai"></el-input>
                    </el-form-item>
                    <el-form-item   label="Mô tả" prop="cMoTa" >
                        <el-input size="small" v-model="dataForm.cMoTa"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Mã màu" prop="cMaMau" >
                        <div class="d-flex" >
                        <el-input  size="small" v-model="dataForm.cMaMau"></el-input>
                        <el-color-picker class="ml-2" v-model="dataForm.cMaMau"></el-color-picker>
                        </div>
                    </el-form-item>
                     <el-form-item   label="Thứ tự" prop="nThuTu" :rules="[{required: true, message:'Bạn chưa nhập thứ tự'}]">
                        <el-input size="small" v-model="dataForm.nThuTu"></el-input>
                    </el-form-item>
                     <!-- <el-form-item   label="Cho phép ghi" prop="nChoPhepGhi" :rules="[{required: true, message:'Bạn chưa nhập mô tả'}]">
                        <el-input size="small" v-model="dataForm.nChoPhepGhi"></el-input>
                    </el-form-item>
                     <el-form-item   label="Cho phép hiển thị" prop="nChoPhepHienThi" :rules="[{required: true, message:'Bạn chưa nhập mô tả'}]">
                        <el-input size="small" v-model="dataForm.nChoPhepHienThi"></el-input>
                    </el-form-item> -->
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
                    pageRequest: {pageNum: 1, pageSize: 10},
                    dialogForm: false,
                    operation: false,
                    search:'',
                    dataForm:{
                        cTenTrangThai:"",
                        cMoTa:"",
                        nThuTu:"",
                        cMaMau:'',
                        nChoPhepGhi:"",
                        nChoPhepHienThi:"",
                        nTinhTrang:"",
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
                        this.pageRequest.pageSize = 10

                        this.pageRequest.columnFilters = { 
                            cTenTrangThai: {value: this.search}
                        }
                        this.$api.recordstatus.findPage(this.pageRequest).then((res) => {
                             if(res.code == 200){
                                 this.tableData = res.data;
                               
                             } else
                             {
                                this.$message({message:"Tải dữ liệu thất bại" , type:"error"});
                             }
                        })
                    },
                    save(){
                        this.$refs.dataForm.validate((valid) =>{
                            if(valid){
                                let data = Object.assign({}, this.dataForm)
                                this.$api.recordstatus.insert(data) 
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
                                this.$api.recordstatus.update(data).then((res) => {
                                   
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
                        this.$confirm("Bạn có muốn xóa trạng thái đọc chỉ số này không?",'Xác nhận',{
                            confirmButtonText: 'Xác nhận',
                            cancelButtonText: 'Hủy',
                            type: 'warning'
                            }).then(()=>{
                            let params = item.nMaTrangThai  
                            this.$api.recordstatus.deleteBatch(params).then((res) => {
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
        height: calc(100vh - 275px);
    }
 h4 {
    padding-top: 15px;
    }
</style>

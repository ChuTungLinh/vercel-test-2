<template>
    <div class="wrapper m-2">
         <div class="col-md-12 form-row pt-2">
            <div class="col-md-6 d-flex">
                <Label text="Loại đồng hồ:" />
                <Input placeholder="Nhập loại đồng hồ" v-model="search.cTenLoai" />
            </div>

           
            <div class="col-md-6 d-flex">
                    <Label text="Hãng sản xuất:" />
                    <DropdownList placeholder="Chọn hãng sản xuất" v-model="search.nMaHangSanXuat">
                    <el-option v-for="item in producerList" :key="item.nMaHang" :value="item.nMaHang" :label="item.cTenHang"></el-option>
                </DropdownList>
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"  @click="handleSearch">
                    <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                    <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                </base-button>
            </div>
        </div>
            <el-card style="margin-top: 10px;">
                <template #header class="el-card-header" > 
                     <div style="padding: 5px 10px;" class="form-row">
                        <div class="col-md-6">
                            <base-button type="primary" outline native-type="submit" @click="handleAdd">
                                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                                <span class="btn-inner--text">&nbsp;Thêm loại đồng hồ</span>
                            </base-button>
                        </div>
                     </div>                     
                </template>

                <div class="col-md-12 pt-2 tbl" >
                        <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true" stripe>
                            <el-table-column label="Loại đồng hồ" prop="cTenLoai" header-align="center">

                            </el-table-column>
                            <el-table-column label="Hãng sản xuất" prop="cTenHang" header-align="center">

                            </el-table-column>
                            <el-table-column label="Là đồng hồ block" prop="cLaDongHoBlock" header-align="center">

                            </el-table-column>
                            <el-table-column label="Trạng thái" prop="nTinhTrang" header-align="center" align="center">
                                <template slot-scope="scope">
                                    <el-tag type="success" v-if="scope.row.nTinhTrang == 1">Hoạt động</el-tag>
                                    <el-tag type="danger" v-if="scope.row.nTinhTrang == 0">Đã xóa</el-tag>
                                </template>                               
                            </el-table-column>
                            <el-table-column width = "180" align="center">
                            <template slot-scope="scope">
                                    <el-button type="primary" size ="mini" :disabled="scope.row.nTinhTrang == 0" @click="handleEdit(scope.$index, scope.row)">
                                    <i class="el-icon-edit mr-1"></i>
                                       Sửa
                                    </el-button>
                                    <el-button type="danger" size ="mini" :disabled="scope.row.nTinhTrang == 0" @click="deleteBatch(scope.$index, scope.row)">
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
            <h6 slot="header" class="modal-title" v-if="!operation">Thêm loại đồng hồ</h6>
            <h6 slot="header" class="modal-title" v-if = "operation">Cập nhật thông tin loại đồng hồ</h6>
                <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
                    <el-form-item label="Loại đồng hồ" prop="cTenLoai" 
                    :rules="[{required: true, message:'Bạn chưa nhập tên Loại đồng hồ'}]">
                        <el-input v-model="dataForm.cTenLoai"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Là đồng hồ block" prop="cLaDongHoBlock">
                         <el-input v-model="dataForm.cLaDongHoBlock"></el-input>
                    </el-form-item>

                    <el-form-item label="Hãng sản xuất" prop="nMaHangSanXuat"
                    :rules="[{required: true, message:'Bạn chọn hãng sản xuất'}]"
                    >
                        <el-select v-model="dataForm.nMaHangSanXuat">
                            <el-option v-for="item in producerList" :key="item.nMaHang" 
                            :label="item.cTenHang" :value="item.nMaHang">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Màu">
                        <input v-model="dataForm.cColor" type="color">
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
    import DropdownList from "../components/DropdownList.vue"

        export default {
            components: {
                Label,Input, DropdownList
            },
            data(){
                return {
                    tableData:[],
                    producerList:[],
                    pageRequest: {pageNum: 1, pageSize: 20},
                    dialogForm: false,
                    operation: false,
                    search:{
                        cTenLoai: "",
                        nMaHangSanXuat: "",
                    },
                    dataForm:{
                        cTenLoai:"",
                        cLaDongHoBlock:"",
                        nMaHangSanXuat:"",
                        nTinhTrang: "",
                        cColor:null,
                    }
                }
            },
            methods: {
                    handleTest(){
                        console.log(this.test)
                    },
                     handleAdd(){
                        this.$refs["dataForm"].resetFields()
                        this.dialogForm = true;
                        this.operation = false;
                    },
                    handleEdit(index, item){
                        if(item.cColor == null){
                            item.cColor = "#000000"
                        }
                        this.dialogForm = true;
                        this.operation = true;
                        this.dataForm = Object.assign({},{...item, cColor: item.cColor.substring(0,item.cColor.length -2)})
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
                        this.pageRequest.pageSize = 20

                        this.pageRequest.columnFilters = { 
                            cTenLoai: {value: this.search.cTenLoai},
                            nMaHangSanXuat: {value: this.search.nMaHangSanXuat}
                        }
                        this.$api.clocktype.findPage(this.pageRequest).then((res) => {
                             if(res.code == 200){
                                 this.tableData = res.data;
                               
                             } else
                             {
                                this.$message({message:"Tải dữ liệu thất bại lỗi code  " , type:"error"});
                             }
                        })
                    },
                    save(){
                        this.$refs.dataForm.validate((valid) =>{
                            if(valid){
                                if(this.dataForm.cColor != null){
                                    this.dataForm.cColor = this.dataForm.cColor +"BF"
                                }
                                let data = Object.assign({}, this.dataForm)
                                this.$api.clocktype.insert(data) .then((res) => {
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
                                if(this.dataForm.cColor != null){
                                    this.dataForm.cColor = this.dataForm.cColor +"BF"
                                }
                                let data = Object.assign({}, this.dataForm)
                                this.$api.clocktype.update(data).then((res) => {
                                   
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
                        this.$confirm("Bạn có muốn xóa loại đồng hồ này không?",'Xác nhận',{
                            confirmButtonText: 'Xác nhận',
                            cancelButtonText: 'Hủy',
                            type: 'warning'
                            }).then(()=>{
                            let params = item.nMaLoai  
                            this.$api.clocktype.deleteBatch(params).then((res) => {
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
                    getProducer() {
                        const data = {}
                        this.$api.producer.findAll(data) .then((res) => {
                          
                                this.producerList = res.data
                            
                           
                        }) 

                    },

                    handleCurrentPageChange(val){
                        this.findPage(val, this.dataForm.pageSize)
                    },
                    handleSizeChange(val){
                        this.findPage(this.pageRequest.pageNum, val)
                    }

            },
            mounted() {
                this.findPage()
                this.getProducer()
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
</style>

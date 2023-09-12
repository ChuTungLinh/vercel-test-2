<template>
    <div class="wrapper m-2">
            <el-card>
                <template #header class="el-card-header" > 
                     <div style="padding: 5px 10px;" class="form-row">
                        <el-button type="primary" size = "mini" @click="dialogForm = true">
                        <i class="fa fa-plus"></i>
                            Thêm
                        </el-button>
                        <div style="margin-left:auto">
                            <div class = "d-flex" style="gap: 12px">
                                <el-input class="input-search" size="small"  prefix-icon="el-icon-search" placeholder="Nhập số serial đồng hồ"></el-input>
                                <el-input  class="input-search" size="small"  prefix-icon="el-icon-search" placeholder="Nhập chỉ số đầu"></el-input>
                                <el-input  class="input-search" size="small"  prefix-icon="el-icon-search" placeholder="Nhập chỉ số hiện tại"></el-input>
                                <el-select  size="small" type="date" v-model="dataForm.nMaloaidongho" placeholder="Chọn loại đồng hồ"></el-select>
                            </div>
                        </div>
                     </div>

                     <div class="tbl" >
                        <el-table :data="tableData" fit header-row-class-name="thead-light" height="100%" :border="true">
                            <el-table-column label="Mã cấu hình" prop="nMacauhinh" header-align="center">

                            </el-table-column>
                            <el-table-column label="Tên cấu hình" prop="cTencauhinh"  header-align="center">

                            </el-table-column>
                            <el-table-column label="Loại cấu hình" prop="cLoaicauhinh"  header-align="center">

                            </el-table-column>
                            <el-table-column label="Gía trị" prop="nGiatri"  header-align="center">

                            </el-table-column>
                            <el-table-column label="Tình trạng" prop="nTinhtrang"  header-align="center">

                            </el-table-column>
                            <el-table-column align="center">
                            <template slot-scope="scope">
                                    <el-button type="primary" size ="mini">
                                    <i class="el-icon-edit"></i>
                                       
                                    </el-button>
                                    <el-button type="danger" size ="mini">
                                    <i class="el-icon-delete"></i>
                                       
                                    </el-button>
                            </template>
                            </el-table-column>
                           
                        </el-table>
                     </div>
                    <div class="col-12 py-2 pagination">
                                <el-pagination
                                :page-sizes="[5, 10, 20, 30, 50]"
                                background
                                layout="sizes, total, prev, pager, next"
                                :page-size="10"
                                :current-page.sync="pageRequest.pageNum"
                                @current-change="handleCurrentPageChange"
                                @size-change="handleSizeChange"
                                :total="100">
                            </el-pagination>
                    </div>


               
                </template>
            </el-card>
        <el-dialog :visible.sync="dialogForm" width="500px" class="dialog">
            <h4>Thêm đối tượng giá</h4>
                <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
                    <el-form-item label="Số serial" prop="cSerial" :rules="[{required: true, message:'Bạn chưa nhập tên Loại đồng hồ'}]">
                        <el-input v-model="dataForm.cSerial"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="Chỉ số đầu" prop="nChisodau" :rules="[{required: true, message:'Bạn chưa nhập mô tả'}]">
                         <el-input v-model="dataForm.nChisodau"></el-input>
                    </el-form-item>

                    <el-form-item label="Chỉ số hiện tại" prop="nChisohientai" :rules="[{required: true, message:'Bạn chưa nhập mô tả'}]">
                         <el-input v-model="dataForm.nChisohientai"></el-input>
                    </el-form-item>

                    <el-form-item label="Loại đồng hồ" prop="nMaloaidongho" :rules="[{required: true, message:'Bạn chưa nhập mô tả'}]">
                        <el-select>
                                
                        </el-select>
                    </el-form-item>
                </el-form>
            <template slot="footer">
                <el-button size="small" type="primary" @click="save">Thêm</el-button>
                <el-button size="small" outline type="default" >Thoát</el-button>
            </template>
        </el-dialog>
    </div>

</template>
<script>
        export default {
            data(){
                return {
                    tableData:[
                        {
                            id: 1,
                            cSerial: "KH1",
                            cMota: "Kí hiệu 1",
                            cDonvitinh: "m3"
                        },
                        {
                            id: 2,
                            cSerial: "KH2",
                            cMota: "Kí hiệu 2",
                            cDonvitinh: "m3"
                        },
                        {
                            id: 1,
                            cSerial: "KH3",
                            cMota: "Kí hiệu 3",
                            cDonvitinh: "m3"
                        },
                    ],
                    pageRequest: {pageNum: 1, pageSize: 10},
                    dialogForm: false,
                    search:'',
                    dataForm:{
                        cSerial:"",
                        nMaloaidongho:"",
                        nChisodau:"",
                        nChisohientai:"",
                    }
                }
            },
            methods: {
 
                    handleAdd(){

                    },
                    save(){
                        this.$refs.dataForm.validate((valid) =>{
                            if(valid){}
                        })
                    },

                    handleCurrentPageChange(){
                    },
                    handleSizeChange(){}

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
.input-search{
    width: auto;
}
</style>

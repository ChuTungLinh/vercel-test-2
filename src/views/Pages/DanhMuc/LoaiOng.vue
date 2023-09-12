<template>
    <div class="wrapper m-2">
        <div class="col-md-12 form-row pt-2">
            <Label text="Tên loại:" />
            <Input placeholder="Tên loại ống nước" v-model="search.TypeName" class="filter-info" />
            <Label text="Tình trạng:" />
            <DropdownList placeholder="Chọn hãng sản xuất" v-model="search.nTinhTrang">
                <el-option :key="-1" value="-1" label="Tất cả"></el-option>
                <el-option :key="0" value="0" label="Đã xóa"></el-option>
                <el-option :key="1" value="1" label="Hoạt động"></el-option>
            </DropdownList>
            <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"
                @click="handleFindPage">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
        </div>
        <div>
            <el-card style="margin-top: 10px">
                <template #header class="el-card-header">
                    <div style="padding: 5px 10px;" class="form-row">
                        <div class="col-md-6">
                            <base-button type="primary" outline native-type="submit" @click="handleOpenAdd">
                                <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                                <span class="btn-inner--text">&nbsp;Thêm loại ống nước</span>
                            </base-button>
                        </div>
                    </div>
                </template>
                <div class="col-md-12 pt-2 tbl">
                    <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%" :border="true"
                        stripe>
                        <el-table-column label="Tên loại" prop="c_ten_loai_ong" header-align="center">

                        </el-table-column>
                        <el-table-column label="Kích thước(mm)" prop="n_kich_thuoc_ong" header-align="center">

                        </el-table-column>
                        <el-table-column label="Trạng thái" prop="n_tinh_trang" header-align="center" align="center">
                            <template slot-scope="scope">
                                <el-tag type="success" v-if="scope.row.n_tinh_trang == 1">Hoạt động</el-tag>
                                <el-tag type="danger" v-if="scope.row.n_tinh_trang == 0">Đã xóa</el-tag>
                            </template>
                        </el-table-column>

                        <el-table-column width="180" align="center" label="Hành Động">
                            <template slot-scope="scope">
                                <el-button type="primary" :disabled="scope.row.n_tinh_trang == 0" size="mini"
                                    @click="handleOpenEdit(scope.row)">
                                    <i class="el-icon-edit mr-1"></i>
                                    Sửa
                                </el-button>
                                <el-button type="danger" :disabled="scope.row.n_tinh_trang == 0" size="mini"
                                    @click="handleDelete(scope.row)">
                                    <i class="el-icon-delete mr-1"></i>
                                    Xóa
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="col-12 py-2 pagination" style="justify-content: end;">
                    <el-pagination :page-sizes="[5, 10, 20, 30, 50]" background layout="total,sizes,  prev, pager, next"
                        :page-size="20" 
                        :current-page.sync="tableData.pageNum" 
                        @current-change="handleCurrentPageChange"
                        @size-change="handleSizeChange" 
                        :total="tableData.totalSize">
                    </el-pagination>
                </div>
            </el-card>
        </div>
        <modal :show.sync="dialogForm">
            <h6 slot="header" class="modal-title" v-if="!operation">Thêm loại ống nước</h6>
            <h6 slot="header" class="modal-title" v-if="operation">Cập nhật thông tin loại ống nước</h6>
            <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
                <el-form-item label="Tên loại" prop="TypeName"
                    :rules="[{ required: true, message: 'Bạn chưa nhập tên Loại ống nước' }]">
                    <el-input v-model="dataForm.TypeName"></el-input>
                </el-form-item>

                <el-form-item label="Kích thước" prop="size"
                    :rules="[{ required: true, message: 'Bạn chưa nhập kích thước' }]">
                    <el-input v-model="dataForm.size"></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <base-button v-if="!operation" type="primary" @click="handleAdd">Thêm</base-button>
                <base-button v-if="operation" type="primary" @click="handleUpdate">Lưu</base-button>
                <base-button outline type="danger" @click="handleClose">Thoát</base-button>
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
        Label, Input, DropdownList
    },
    data() {
        return {
            pageRequest: {
                pageNum: 1,
                pageSize: 20,
            },
            search: {
                TypeName: "",
                nTinhTrang: "-1",
            },
            tableData: [],
            dataForm: {
                ID: null,
                TypeName: "",
                size: "",
            },
            dialogForm: false,
            operation: false,
        }
    },
    computed: {

    },
    methods: {
        handleCurrentPageChange(val){
            this.pageRequest.pageNum = val
            this.handleFindPage()
        },
        handleSizeChange(val){
            this.pageRequest.pageSize = val
            this.handleFindPage()
        },
        handleDelete(val) {
            this.$confirm("Bạn có muốn xóa loại ống này không?", 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                this.pageRequest.columnFilters = {
                    ID: { value: val.n_ma_loai_ong.toString() },
                }
                this.$api.pipes.deleteType(this.pageRequest).then((res) => {
                    if (res.code == 200) {
                        this.$message({ message: res.msg, type: 'success' })
                        this.handleFindPage()
                    } else {
                        this.$message({ message: res.msg, type: 'error' })
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
        handleClose() {
            this.dataForm = {
                TypeName: null,
                size: null,
            }
            this.dialogForm = false
        },
        handleOpenEdit(val) {
            this.dataForm.ID = val.n_ma_loai_ong
            this.dataForm.TypeName = val.c_ten_loai_ong
            this.dataForm.size = val.n_kich_thuoc_ong
            this.dialogForm = true
            this.operation = true
        },
        handleUpdate() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.pageRequest.columnFilters = {
                        ID: { value: this.dataForm.ID },
                        TypeName: { value: this.dataForm.TypeName },
                        size: { value: this.dataForm.size },
                    }
                    this.$api.pipes.updateType(this.pageRequest).then((res) => {

                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: "success" })
                            this.dialogForm = false
                            this.handleFindPage()
                        } else {
                            this.$message({ message: res.msg, type: "error" })
                        }
                    })
                }
            })

        },
        handleOpenAdd() {
            this.$refs["dataForm"].resetFields()
            this.dialogForm = true
            this.operation = false
        },
        handleAdd() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.pageRequest.columnFilters = {
                        TypeName: { value: this.dataForm.TypeName },
                        size: { value: this.dataForm.size },
                    }
                    this.$api.pipes.addType(this.pageRequest).then((res) => {

                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: "success" })
                            this.dialogForm = false
                            this.handleFindPage()
                        } else {
                            this.$message({ message: res.msg, type: "error" })
                        }
                    })
                }
            })
        },
        handleFindPage() {
            this.pageRequest.columnFilters = {
                TypeName: { value: this.search.TypeName },
                nTinhTrang: { value: this.search.nTinhTrang },
            }
            this.$api.pipes.findPage(this.pageRequest).then((res) => {

                if (res.code == 200) {
                    this.tableData = res.data;

                } else {
                    this.$message({ message: "Tải dữ liệu thất bại ", type: "error" });
                }
            })
        }
    },
    mounted() {
        this.handleFindPage();
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

.filter-info {
    padding-right: 10px;
}
</style>
<template>
    <div class="wrapper m-2">
        <div class="filters">
            <div class="filter">
                <Label text="Tên tuyến:" />
                <Input placeholder="Nhập tên tuyến" v-model="search.PipeName" style="width: 100%;" />
            </div>
            <div class="filter">
                <Label text="Tính trạng:" />
                <DropdownList placeholder="Tính trạng" v-model="search.Status" style="width: 100%;">
                    <el-option key="-1" label="Tất cả" value="-1"></el-option>
                    <el-option key="1" label="Hoạt động" value="1"></el-option>
                    <el-option key="2" label="Đang sửa" value="2"></el-option>
                    <el-option key="0" label="Đã xóa" value="0"></el-option>
                </DropdownList>
            </div>
            <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"
                @click="handleFindPipe">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
        </div>
        <el-card class="box-card">
            <div class="col-md-12 tbl" style="margin-top: 20px;">
                <el-table :data="tableData.content" header-row-class-name="thead-light" height="100%" :border="true" stripe>
                    <el-table-column label="STT" type="index"></el-table-column>
                    <el-table-column label="Tên tuyến ống " width="150" prop="c_ten_tuyen_ong"
                        header-align="center"></el-table-column>
                    <el-table-column label="Tên loại ống " width="150" prop="c_ten_loai_ong"
                        header-align="center"></el-table-column>
                    <el-table-column label="Kích thước(mm) " prop="n_kich_thuoc_ong" width="150"
                        header-align="center"></el-table-column>
                    <el-table-column label="Độ dài" prop="n_do_dai" width="150" header-align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.n_do_dai.toFixed(3) }}</span><span v-if="scope.row.n_don_vi_do_dai == 1">
                                km</span><span v-if="scope.row.n_don_vi_do_dai == 0"> m</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Tình trạng" width="120" prop="n_tinh_trang" header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <el-tag type="warning" v-if="scope.row.n_tinh_trang == 2">Đang sửa</el-tag>
                            <el-tag type="success" v-if="scope.row.n_tinh_trang == 1">Hoạt động</el-tag>
                            <el-tag type="danger" v-if="scope.row.n_tinh_trang == 0">Đã xóa</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" min-width="450">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.n_tinh_trang == 2" type="danger" size="mini"
                                @click="handleCancelMaintenance(scope.row)">
                                <i class="fa fa-ban"></i>
                                Hủy
                            </el-button>
                            <el-button v-if="scope.row.n_tinh_trang == 2" type="success" size="mini"
                                @click="handleFinishMaintenance(scope.row)">
                                <i class="fa fa-check"></i>
                                Xác nhận
                            </el-button>
                            <el-button v-if="scope.row.n_tinh_trang != 2" type="primary" size="mini"
                                :disabled="scope.row.n_tinh_trang == 0" @click="handleOpenMaintenanace(scope.row)">
                                <i class="fa fa-wrench"></i>
                                Thay ống
                            </el-button>
                            <el-button type="primary" size="mini" :disabled="scope.row.n_tinh_trang == 0"
                                @click="handleOpenEdit(scope.row)">
                                <i class="el-icon-edit mr-1"></i>
                                Thay loại ống
                            </el-button>
                            <el-button type="danger" :disabled="scope.row.n_tinh_trang == 0 || scope.row.n_tinh_trang == 2"
                                size="mini" @click="handlePipeDelete(scope.row)">
                                <i class="el-icon-delete mr-1"></i>
                                Xóa
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div class="col-12 py-2 pagination" style="justify-content: end;">
                <el-pagination :page-sizes="[5, 10, 20, 30, 50]" background layout="total,sizes,  prev, pager, next"
                    :page-size="20" :current-page.sync="tableData.pageNum" @current-change="handleCurrentPageChange"
                    @size-change="handleSizeChange" :total="tableData.totalSize">
                </el-pagination>
            </div>
        </el-card>
        <modal :show.sync="dialogForm">
            <h6 v-if="!operation" slot="header" class="modal-title">Yêu cầu thay ống nước</h6>
            <h6 v-if="operation" slot="header" class="modal-title">Cập nhật thông tin tuyến ống</h6>
            <el-form :model="dataForm" ref="dataForm" label-width="200px">
                <el-form-item label="Tên tuyến ống" prop="PipeName">
                    <el-input size="mini" v-model="PipeName" disabled></el-input>
                </el-form-item>
                <el-form-item v-if="!operation" label="Độ dài đoạn thay(m)" prop="MLength"
                    :rules="[{ required: true, message: 'Xin vui lòng nhập độ dài đoạn thay' }]">
                    <el-input size="mini" v-model="dataForm.MLength" type="number" step="0.01"></el-input>
                </el-form-item>
                <el-form-item v-if="operation" label="Loại ống" prop="PipeType">
                    <el-select placeholder="Chọn loại ống" v-model="PipeType" style="width: 100%;">
                        <el-option v-for="item in PipeTypes" :key="item.n_ma_loai_ong" :label="item.c_ten_loai_ong"
                            :value="item.n_ma_loai_ong"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <base-button v-if="operation" type="primary" @click="handleEdit">Lưu</base-button>
                <base-button v-if="!operation" type="primary" @click="handleRequestMaintenance">Xác nhận</base-button>
                <base-button outline type="danger" @click="dialogForm = false">Thoát</base-button>
            </template>
        </modal>
    </div>
</template>
<script>
import Label from "../components/Label.vue"
import Input from "../components/Input.vue"
import DropdownList from '../components/DropdownList.vue';

export default {
    components: {
        Label, Input, DropdownList
    },
    data() {
        return {
            tableData: [],
            pageRequest: { pageNum: 1, pageSize: 20 },
            dialogForm: false,
            PipeName: "",
            PipeID: null,
            PipeType: null,
            PipeInfo: "",
            OldType: "",
            NewType: "",
            PipeLenght: 0,
            PipeUnit: 0,
            search: {
                Status: "-1",
                PipeName: "",
            },
            dataForm: {
                PipeName: "",
                MLength: null,
            },
            pipeDataform: {

            },
            pipeTypes: [],
            TypePageRequest: {},
            operation: false,
        }
    },
    methods: {
        handleCurrentPageChange(val) {
            this.pageRequest.pageNum = val
            this.handleFindPipe()
        },
        handleSizeChange(val) {
            this.pageRequest.pageSize = val
            this.handleFindPipe()
        },
        handleFindPipe() {
            let PipeName = this.search.PipeName
            let SearchType = 0
            if (PipeName.indexOf('"') != -1) {
                PipeName = PipeName.substring(1, PipeName.length - 1)
                SearchType = 1
            } else {
                PipeName = this.PipeName
                SearchType = 0
            }
            this.pageRequest.columnFilters = {
                PipeName: { value: PipeName },
                Status: { value: this.search.Status },
                SearchType: { value: SearchType }
            },
                this.$api.pipes.findPipePage(this.pageRequest).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data;
                    } else {
                        this.$message({ message: "Tải dữ liệu loại thất bại ", type: "error" });
                    }
                })
        },
        handleOpenMaintenanace(val) {
            this.$refs['dataForm'].resetFields();
            this.PipeID = val.n_ma_tuyen_ong
            this.PipeName = val.c_ten_tuyen_ong
            this.dialogForm = true
            this.operation = false
        },
        handleRequestMaintenance() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    this.dataForm.columnFilters = {
                        ID: { value: this.PipeID },
                        PipeName: { value: this.PipeName },
                        RType: { value: "maintenance" },
                        MLength: { value: this.dataForm.MLength }
                    }
                    if (this.MLength <= 0) {
                        this.$message({ message: "Độ dài đoạn thay không hợp lệ", type: "error" })
                    }
                    else {
                        this.$api.pipes.requestMaintenance(this.dataForm).then(res => {
                            if (res.code == 200) {
                                this.$api.pipes.createPipeReport(this.dataForm).then(res => { })
                                this.$message({ message: "Yêu cầu thành công", type: "success" })
                                this.handleCloseModal();
                                this.handleFindPipe();
                            }
                        })
                    }
                }
            })
        },
        handleFindPipeType() {
            this.TypePageRequest.columnFilters = {
                TypeName: { value: "" },
                nTinhTrang: { value: 1 },
            }
            this.TypePageRequest.pageSize = 100
            this.TypePageRequest.pageNum = 1
            this.$api.pipes.findPage(this.TypePageRequest).then((res) => {

                if (res.code == 200) {
                    this.PipeTypes = res.data.content;

                } else {
                    this.$message({ message: "Tải dữ liệu loại thất bại ", type: "error" });
                }
            })
        },
        handleOpenEdit(val) {
            this.$refs['dataForm'].resetFields();
            this.PipeID = val.n_ma_tuyen_ong
            this.PipeName = val.c_ten_tuyen_ong
            this.PipeType = val.n_ma_loai_ong
            this.OldType = val.n_ma_loai_ong
            this.PipeInfo = val.c_thong_tin_ve_tuyen_ong
            this.PipeLenght = val.n_do_dai
            this.PipeUnit = val.n_don_vi
            this.dialogForm = true
            this.operation = true
        },
        handleEdit() {
            this.pipeDataform.columnFilters = {
                PipeName: { value: this.PipeName },
                PipeInfo: { value: this.PipeInfo },
                PipeType: { value: this.PipeType },
                PipeLength: { value: this.PipeLenght.toFixed(3) },
                LengthUnit: { value: this.PipeUnit },
                ID: { value: this.PipeID }
            }
            this.$api.pipes.updatePipe(this.pipeDataform).then(res => {
                if (res.code == 200) {
                    let ReportForm = {
                        columnFilters: {
                            RType: { value: "edit" },
                            PipeName: { value: this.PipeName },
                            OldType: { value: this.OldType },
                            NewType: { value: this.PipeType }
                        }
                    }
                    this.$api.pipes.createPipeReport(ReportForm).then(res => { })

                    this.$message({ message: res.msg, type: "success" })
                    this.handleCloseModal()
                    this.handleFindPipe();

                } else {
                    this.$message({ message: res.msg, type: "error" })
                }
            })
        },
        handleCloseModal() {
            this.$refs['dataForm'].resetFields();
            this.Status = "-1",
                this.PipeName = "",
                this.PipeID = null,
                this.PipeType = null,
                this.dialogForm = false
        },

        //Hủy thay ống
        handleCancelMaintenance(val) {
            this.$confirm("Bạn có muốn hủy yêu cầu thay ống này không?", 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                this.pipeDataform.columnFilters = {
                    ID: { value: val.n_ma_tuyen_ong }
                }
                this.$api.pipes.cancelRequest(this.pipeDataform).then(res => {
                    if (res.code == 200) {
                        let ReportForm = {
                            columnFilters: {
                                RType: { value: "cancel" },
                                PipeName: { value: val.c_ten_tuyen_ong },
                            }
                        }
                        this.$api.pipes.createPipeReport(ReportForm).then(res => { })
                        this.$message({ message: "Hủy yêu cầu thành công", type: "success" })
                        this.handleFindPipe();
                    }
                })
            })
        },

        //Hoàn thành thay ống
        handleFinishMaintenance(val) {
            this.$confirm("Bạn có muốn xác nhận yêu cầu thay ống này đã hoàn thành này không?", 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                this.pipeDataform.columnFilters = {
                    ID: { value: val.n_ma_tuyen_ong }
                }
                this.$api.pipes.completeRequest(this.pipeDataform).then(res => {
                    if (res.code == 200) {
                        let ReportForm = {
                            columnFilters: {
                                RType: { value: "finish" },
                                PipeName: { value: val.c_ten_tuyen_ong },
                            }
                        }
                        this.$api.pipes.createPipeReport(ReportForm).then(res => { })
                        this.$message({ message: "Hoàn thành yêu cầu thành công", type: "success" })
                        this.handleFindPipe();
                    }
                })
            })
        },
        handlePipeDelete(val) {
            this.$confirm("Bạn có muốn xóa ống nước này không?", 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning'
            }).then(() => {
                this.pipeDataform.columnFilters = {
                    ID: { value: val.n_ma_tuyen_ong },
                }
                this.$api.pipes.deletePipe(this.pipeDataform).then((res) => {
                    if (res.code == 200) {
                        this.$message({ message: res.msg, type: 'success' })
                        let ReportForm = {
                            columnFilters: {
                                RType: { value: "delete" },
                                PipeName: { value: val.c_ten_tuyen_ong },
                                OldType: { value: -1 },
                                NewType: { value: -1 }
                            }
                        }
                        this.$api.pipes.createPipeReport(ReportForm).then(res => { })
                        this.handleFindPipe()
                    } else {
                        this.$message({ message: res.msg, type: 'error' })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Hủy xóa'
                });
            });
        },
    },
    mounted() {
        this.handleFindPipe()
        this.handleFindPipeType()
    }


}
</script>
<style lang="scss" scoped>
.filters {
    margin-left: 20px;
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    .filter {
        width: 30%;
        margin-right: 20px;
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;
    }
}

.tbl {
    height: calc(100vh - 210px);
}

.box-card {
    margin: 10px;
}
</style>

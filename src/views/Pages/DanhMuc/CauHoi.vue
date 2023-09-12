<template>
    <div class="wrapper m-2">
        <div class="filters">
            <div class="filter">
                <Label text="Loại câu hỏi:" />
                <DropdownList placeholder="Loại câu hỏi" v-model="search.Type" style="width: 100%;">
                    <el-option key="-1" label="Tất cả" value="-1"></el-option>
                    <el-option key="0" label="Ghi chú" value="0"></el-option>
                    <el-option key="1" label="Mức độ" value="1"></el-option>
                    <el-option key="2" label="Có/Không" value="2"></el-option>
                </DropdownList>
            </div>
            <div class="filter">
                <Label text="Tính trạng:" />
                <DropdownList placeholder="Tính trạng" v-model="search.Status" style="width: 100%;">
                    <el-option key="-1" label="Tất cả" value="-1"></el-option>
                    <el-option key="1" label="Đang chờ" value="1"></el-option>
                    <el-option key="2" label="Hoạt động" value="2"></el-option>
                    <el-option key="0" label="Đã xóa" value="0"></el-option>
                </DropdownList>
            </div>
            <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"
                @click="handleFindPage">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
        </div>
        <el-card class="box-card">
            <div style="padding: 5px 10px" class="form-row">
                <div class="col-md-12">
                    <base-button type="primary" outline native-type="submit" @click="handleOpenCreate">
                        <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                        <span class="btn-inner--text">&nbsp;Thêm câu hỏi</span>
                    </base-button>

                    <base-button type="success" outline native-type="submit" @click="handleOpenOverall">

                        <span class="btn-inner--text"><i class="fa fa-file"></i>&nbsp;Tổng quát theo tháng</span>
                    </base-button>
                </div>
            </div>
            <div class="col-md-12 tbl" style="margin-top: 20px;">
                <el-table :data="tableData.content" header-row-class-name="thead-light" height="100%" :border="true" stripe>
                    <el-table-column label="STT" type="index"></el-table-column>
                    <el-table-column label="Câu hỏi" prop="c_noi_dung_cau_hoi" header-align="center"></el-table-column>
                    <el-table-column label="Loại câu hỏi" width="120" prop="n_loai_cau_hoi" header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.n_loai_cau_hoi == 0">Ghi chú</span>
                            <span v-if="scope.row.n_loai_cau_hoi == 1">Mức độ</span>
                            <span v-if="scope.row.n_loai_cau_hoi == 2">Có/Không</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Tình trạng" width="120" prop="n_tinh_trang" header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.n_tinh_trang == 2">Hoạt động</el-tag>
                            <el-tag type="warning" v-if="scope.row.n_tinh_trang == 1">Đang chờ</el-tag>
                            <el-tag type="danger" v-if="scope.row.n_tinh_trang == 0">Đã xóa</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="Thứ tự" prop="n_thu_tu" header-align="center" align="center"
                        width="100"></el-table-column>
                    <el-table-column align="center" width="350">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.n_tinh_trang == 1"
                                type="success" size="mini" @click="handleActivate(scope.row)">
                                <i class="fa fa-upload"></i>
                                Kích hoạt
                            </el-button>
                            <el-button v-if="scope.row.n_tinh_trang != 0" :disabled="scope.row.n_tinh_trang == 0"
                                type="primary" size="mini" @click="handleOpenEdit(scope.row)">
                                <i class="fa fa-edit"></i>
                                Sửa
                            </el-button>
                            <el-button v-if="scope.row.n_tinh_trang != 1" type="primary" size="mini"
                                @click="handleOpenResult(scope.row)">
                                <i class="fa fa-file"></i>
                                Kết quả
                            </el-button>
                            <el-button :disabled="scope.row.n_tinh_trang == 0" type="danger" size="mini"
                                @click="handleDelete(scope.row)">
                                <i class="fa fa-trash"></i>
                                xóa
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div class="col-12 py-2 pagination" style="justify-content: end;">
                <el-pagination :page-sizes="[5, 10, 20, 30, 50]" background layout="total,sizes,prev,pager,next"
                    :page-size="20" :current-page.sync="tableData.pageNum" @current-change="handleCurrentPageChange"
                    @size-change="handleSizeChange" :total="tableData.totalSize">
                </el-pagination>
            </div>
        </el-card>
        <modal :show.sync="dialogForm">
            <h6 v-if="!operation" slot="header" class="modal-title">Tạo câu hỏi</h6>
            <h6 v-if="operation" slot="header" class="modal-title">Sửa câu hỏi</h6>

            <el-form :model="dataForm" ref="dataForm" label-width="150px">
                <el-form-item label="Nội dung câu hỏi" prop="QDetail"
                    :rules="[{ required: true, message: 'xin vui lòng nhập nội dung câu hỏi' }]">
                    <el-input :disabled="selected.n_tinh_trang == 2" size="mini" type="textarea"
                        v-model="dataForm.QDetail"></el-input>
                </el-form-item>
                <el-form-item label="Loại câu hỏi" prop="QType"
                    :rules="[{ required: true, message: 'Xin vui chọn loại câu hỏi' }]">
                    <el-select size="mini" :disabled="selected.n_tinh_trang == 2" placeholder="Loại câu hỏi"
                        v-model="dataForm.QType" style="width: 100%;">
                        <el-option key="0" label="Ghi chú" value="0"></el-option>
                        <el-option key="1" label="Mức độ" value="1"></el-option>
                        <el-option key="2" label="Có/Không" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Thứ tự" prop="nThuTu"
                    :rules="[{ required: true, message: 'xin vui lòng nhập thứ tự câu hỏi' }]">
                    <el-input-number size="mini" type="number" v-model="dataForm.nThuTu"></el-input-number>
                </el-form-item>

            </el-form>
            <template slot="footer">
                <base-button v-if="operation && selected.n_tinh_trang == 2" 
                    type="warning" @click="handleDeactivate(selected)">Hủy kích hoạt</base-button>
                <base-button v-if="!operation" type="primary" @click="handleCreateQuestion">Tạo</base-button>
                <base-button v-if="operation" type="primary" @click="handleEditQuestion">Sửa</base-button>
                <base-button outline type="danger" @click="dialogForm = false, selected = {}">Thoát</base-button>
            </template>
        </modal>

        <modal :show.sync="resultModal">
            <h6 slot="header" class="modal-title">{{ selected.c_noi_dung_cau_hoi }}</h6>
            <div class="filters" v-if="QuestionType != 0" style="padding-bottom: 10px; padding-top: 0px;">
                <div class="filter">
                    <Label text="Câu trả lời:" />
                    <DropdownList v-if="QuestionType == 1" v-model="resultSearch.Answer" style="width: 100%;">
                        <el-option key="-3" label="Tất cả" value="-3"></el-option>
                        <el-option key="-2" label="Rất tệ" value="-2"></el-option>
                        <el-option key="-1" label="Tệ" value="-1"></el-option>
                        <el-option key="0" label="Bình thường" value="0"></el-option>
                        <el-option key="1" label="Tốt" value="1"></el-option>
                        <el-option key="2" label="Rất tốt" value="2"></el-option>
                    </DropdownList>
                    <DropdownList v-if="QuestionType == 2" v-model="resultSearch.Answer" style="width: 100%;">
                        <el-option key="-3" label="Tất cả" value="-3"></el-option>
                        <el-option key="0" label="Không" value="0"></el-option>
                        <el-option key="1" label="Có" value="1"></el-option>
                    </DropdownList>

                </div>
                <div class="filter">
                    <span style="margin-right: 5px;">Tháng:</span>
                    <el-date-picker size="mini" v-model="submitDate" type="month" placeholder="Chọn tháng"
                        format="MM/yyyy" clearable/>
                </div>
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"
                    @click="handleFindResult(selected.n_ma_cau_hoi_hd)">
                    <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                    <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                </base-button>
            </div>

            <div class="col-md-12 tbl" style="margin-top: 20px;height: calc(100vh - 300px);">
                <el-table :data="resultData.content" header-row-class-name="thead-light" height="100%" :border="true"
                    stripe>
                    <el-table-column label="Khách hàng" prop="c_ten_khach_hang" width="200px"></el-table-column>
                    <el-table-column label="Hợp đồng" align="center" prop="c_ma_hop_dong" width="150px"></el-table-column>
                    <el-table-column label="Câu trả lời">
                        <template slot-scope="scope">
                            <div v-if="QuestionType == 0">
                                <span>{{ scope.row.c_cau_tra_loi }}</span>
                            </div>
                            <div v-if="QuestionType == 1">
                                <span v-if="scope.row.c_cau_tra_loi == '-2'">Rất tệ</span>
                                <span v-if="scope.row.c_cau_tra_loi == '-1'">Tệ</span>
                                <span v-if="scope.row.c_cau_tra_loi == '0'">Bình thường</span>
                                <span v-if="scope.row.c_cau_tra_loi == '1'">Tốt</span>
                                <span v-if="scope.row.c_cau_tra_loi == '2'">Rất tốt</span>
                            </div>
                            <div v-if="QuestionType == 2">
                                <span v-if="scope.row.c_cau_tra_loi == '0'">Không</span>
                                <span v-if="scope.row.c_cau_tra_loi == '1'">có</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="Ngày tạo" align="center" prop="d_ngay_tao" width="150px"></el-table-column>
                </el-table>

            </div>
            <div class="col-12 py-2 pagination" style="justify-content: end;">
                <el-pagination :page-sizes="[5, 10, 20, 30, 50]" background layout="total,sizes,prev,pager,next"
                    :page-size="20" :current-page.sync="resultData.pageNum" @current-change="handleResultCurrentPageChange"
                    @size-change="handleResultSizeChange" :total="resultData.totalSize">
                </el-pagination>
            </div>
            <template slot="footer">
                <base-button outline type="danger"
                    @click="resultModal = false, resultSearch.Answer = '-3'">Thoát</base-button>
            </template>
        </modal>

        <modal :show.sync="overall">
            <h6 slot="header" class="modal-title">Kết quả tổng quát theo tháng</h6>
            <div class="filters">
                <div class="filter">
                    <span style="margin-right: 5px;">Tháng:</span>
                    <el-date-picker size="mini" v-model="submitDate" type="month" placeholder="Chọn tháng"
                        format="MM/yyyy" />
                </div>
                <base-button type="primary" native-type="submit" style="margin-top:0px; margin-left: 5px;"
                    @click="handleFindOverall">
                    <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                    <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
                </base-button>
            </div>

            <div class="col-md-12 tbl" style="margin-top: 20px;height: calc(100vh - 300px);">
                <div v-for="item, index in overallResult" style="margin-bottom: 20px;">
                    <h5>{{ (index + 1) + "." + item.c_noi_dung_cau_hoi }}</h5>
                    <div v-if="item.n_loai_cau_hoi == 0">
                        <span class="Stats">{{ item.Suggestions }} câu trả lời</span>
                    </div>
                    <div v-if="item.n_loai_cau_hoi == 1">
                        <span class="Stats">{{ item.vBad }} Rất tệ</span>
                        <span class="Stats">{{ item.Bad }} Tệ</span>
                        <span class="Stats">{{ item.NeuOrNo }} Bình thường</span>
                        <span class="Stats">{{ item.GoodOrYes }} Tốt</span>
                        <span class="Stats">{{ item.vGood }} Rất tốt</span>
                    </div>
                    <div v-if="item.n_loai_cau_hoi == 2">
                        <span class="Stats">{{ item.NeuOrNo }} Không</span>
                        <span class="Stats">{{ item.GoodOrYes }} Có</span>
                    </div>
                </div>
            </div>
            <template slot="footer">
                <base-button outline type="danger" @click="overall = false">Thoát</base-button>
            </template>
        </modal>
    </div>
</template>
<script>
import Label from "../components/Label.vue"
import Input from "../components/Input.vue"
import DropdownList from '../components/DropdownList.vue';
import moment from "moment";

export default {
    components: {
        Label, Input, DropdownList
    },
    data() {
        return {
            operation: false,
            dialogForm: false,
            overall: false,
            overallResult: [],
            submitDate: new Date(),
            search: {
                Type: "-1",
                Status: "-1",
                pageNum: 1,
                pageSize: 30,
            },
            dataForm: {
                QDetail: "",
                QType: null,
                QID: 0,
                nThuTu: 0,
            },
            QuestionType: 0,
            selected: {},
            resultData: [],
            resultModal: false,
            resultSearch: {
                Answer: '-3',
                pageNum: 1,
                pageSize: 30,
            },
            tableData: {}
        }
    },
    methods: {
        handleOpenOverall() {
            this.operation = false
            this.dialogForm = false
            this.resultModal = false
            this.submitDate = new Date()
            this.overall = true
            this.handleFindOverall()
        },
        handleFindOverall() {
            let pageRequest = {
                columnFilters: {
                    submitDate: { value: moment(this.submitDate).format("DD/MM/YYYY") }
                }
            }
            this.$api.question.findOverall(pageRequest).then(res => {
                if (res.code == 200) {
                    this.overallResult = res.data
                }
                else {
                    this.$message({ message: res.msg, type: 'error' });
                }
            })
        },
        handleOpenResult(val) {
            this.selected = val
            this.QuestionType = val.n_loai_cau_hoi
            this.resultModal = true
            this.handleFindResult(val.n_ma_cau_hoi_hd)
        },
        handleFindPage() {
            let pageRequest = {
                columnFilters: {
                    CID: { value: "0" },
                    Type: { value: this.search.Type },
                    Status: { value: this.search.Status }
                },
                pageNum: this.resultSearch.pageNum,
                pageSize: this.resultSearch.pageSize
            }
            this.$api.question.findPageQuestion(pageRequest).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data
                } else {
                    this.$message({ message: res.msg, type: 'error' });
                }
            })
        },
        handleFindResult(val) {
            let pageRequest = {
                columnFilters: {
                    Answer: { value: this.resultSearch.Answer },
                    QID: { value: val },
                    submitDate: { value: moment(this.submitDate).format("DD/MM/YYYY") }
                },
                pageNum: this.resultSearch.pageNum,
                pageSize: this.resultSearch.pageSiz
            }
            this.$api.question.findResult(pageRequest).then(res => {
                if (res.code == 200) {
                    this.resultData = res.data
                } else {
                    this.$message({ message: res.msg, type: 'error' });
                }
            })
        },
        handleCurrentPageChange(val) {
            this.pageNum = val
            this.handleFindPage()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.handleFindPage()
        },
        handleResultSizeChange(val) {

        },
        handleResultCurrentPageChange(val) {

        },
        handleOpenCreate() {
            this.$refs['dataForm'].resetFields();
            this.selected = {}
            this.dialogForm = true
            this.operation = false
        },
        handleCreateQuestion() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    let pageRequest = {
                        columnFilters: {
                            QDetail: { value: this.dataForm.QDetail },
                            QType: { value: this.dataForm.QType },
                            nThuTu: { value: this.dataForm.nThuTu }
                        }
                    }
                    this.$api.question.createQuestion(pageRequest).then(res => {
                        if (res.code == 200) {
                            this.search = {
                                Type: "-1",
                                Status: "-1"
                            }
                            this.handleFindPage()
                            this.dialogForm = false
                            this.$message({ message: res.msg, type: 'success' });
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    })
                }
            })
        },
        handleOpenEdit(val) {
            this.$refs['dataForm'].resetFields();
            this.dialogForm = true
            this.operation = true
            this.selected = val
            this.dataForm.QID = val.n_ma_cau_hoi_hd
            this.dataForm.QDetail = val.c_noi_dung_cau_hoi
            this.dataForm.QType = val.n_loai_cau_hoi.toString()
            this.dataForm.nThuTu = val.n_thu_tu
        },
        handleEditQuestion() {
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    let pageRequest = {
                        columnFilters: {
                            QID: { value: this.dataForm.QID },
                            QDetail: { value: this.dataForm.QDetail },
                            QType: { value: this.dataForm.QType },
                            nThuTu: { value: this.dataForm.nThuTu }
                        }
                    }
                    this.$api.question.editQuestion(pageRequest).then(res => {
                        if (res.code == 200) {
                            this.search = {
                                Type: "-1",
                                Status: "-1"
                            }
                            this.handleFindPage()
                            this.dialogForm = false
                            this.$message({ message: res.msg, type: 'success' });
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    })
                }
            })
        },
        handleDeactivate(val) {
            this.$confirm('Bạn có muốn hủy kích hoạt câu hỏi này không?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning',
            })
                .then(() => {
                    let pageRequest = {
                        columnFilters: {
                            QID: { value: val.n_ma_cau_hoi_hd },
                        }
                    }
                    this.$api.question.deactivateQuestion(pageRequest).then((res) => {
                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: 'success' });
                            this.handleFindPage();
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Hủy',
                    });
                });
        },
        handleActivate(val) {
            this.$confirm('Bạn có muốn kích hoạt câu hỏi này không?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning',
            })
                .then(() => {
                    let pageRequest = {
                        columnFilters: {
                            QID: { value: val.n_ma_cau_hoi_hd },
                        }
                    }
                    this.$api.question.activateQuestion(pageRequest).then((res) => {
                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: 'success' });
                            this.handleFindPage();
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Hủy',
                    });
                });
        },
        handleDelete(val) {
            this.$confirm('Bạn có muốn xóa câu hỏi này không?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning',
            })
                .then(() => {
                    let pageRequest = {
                        columnFilters: {
                            QID: { value: val.n_ma_cau_hoi_hd },
                        }
                    }
                    this.$api.question.deleteQuestion(pageRequest).then((res) => {
                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: 'success' });
                            this.handleFindPage();
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Hủy xóa',
                    });
                });
        }
    },
    mounted() {
        this.handleFindPage()
    }


}
</script>
<style lang="scss" scoped>
.Stats {
    margin-right: 10px;
    font-weight: bold;
}

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
    height: calc(100vh - 250px);
}

.box-card {
    margin: 10px;
}
</style>

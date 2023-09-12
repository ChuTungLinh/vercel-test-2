<template>
    <div class="wrapper m-2">
        <div class="filters">
            <div class="filter" style="width: 50%;">
                <Label text="Tên khách hàng:" />
                <Input placeholder="Nhận tên khách hàng" v-model="search.CSName" style="width: 100%;" />
            </div>
            <div class="filter" style="width: 50%;">
                <Label text="Tháng:" />
                <DatePicker v-model="search.month" />
            </div>
        </div>
        <div class="filters">
            <div class="filter">
                <Label text="Tính trạng:" />
                <DropdownList placeholder="Tính trạng" v-model="search.Status" style="width: 100%;">
                    <el-option key="-1" label="Tất cả" value="-1"></el-option>
                    <el-option key="1" label="Đang chờ" value="1"></el-option>
                    <el-option key="2" label="Đã xác nhận" value="2"></el-option>
                    <el-option key="0" label="Đã xóa" value="0"></el-option>
                </DropdownList>
            </div>
            <div class="filter">
                <Label text="Đối tượng giá:" />
                <DropdownList placeholder="Đối tượng giá" v-model="search.PriceObject" style="width: 100%;">
                    <el-option key="-1" label="Tất cả" value="-1"></el-option>
                    <el-option v-for="item in listdoituonggia" :key="item.nMaDoiTuong" :label="item.cTenDoiTuong"
                        :value="item.nMaDoiTuong"></el-option>
                </DropdownList>
            </div>
            <base-button type="primary" native-type="submit" style=" margin-left: 5px;white-space: nowrap;"
                @click="handleFindPage">
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                <span class="btn-inner--text">&nbsp;Tìm kiếm</span>
            </base-button>
        </div>
        <el-card class="box-card">
            <div class="col-md-12 tbl" style="margin-top: 20px;">
                <el-table :data="tableData.content" header-row-class-name="thead-light" height="100%" :border="true" stripe>
                    <el-table-column label="STT" type="index"></el-table-column>
                    <el-table-column label="Tên khách hàng" width="150" prop="c_ten_khach_hang" header-align="center"></el-table-column>
                    <el-table-column label="Ngày yêu cầu" width="150" prop="d_ngay_tao" header-align="center">
                        <template slot-scope="scope">
                            {{ moment(scope.row.d_ngay_tao).format('DD/MM/YYYY') }}
                        </template>
                    </el-table-column>
                    <el-table-column label="Số điện thoại" prop="c_dien_thoai" width="150"
                        header-align="center"></el-table-column>

                    <el-table-column label="Tình trạng" width="120" prop="n_tinh_trang" header-align="center"
                        align="center">
                        <template slot-scope="scope">
                            <el-tag type="success" v-if="scope.row.n_tinh_trang == 2">Đã xác nhận</el-tag>
                            <el-tag type="warning" v-if="scope.row.n_tinh_trang == 1">Đang chờ</el-tag>
                            <el-tag type="danger" v-if="scope.row.n_tinh_trang == 0">Đã hủy</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" min-width="300">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="handleOpenDetail(scope.row)"><i
                                    clas="fa fa-info" />Chi tiết</el-button>
                            <el-button size="mini" type="success" :disabled="scope.row.n_tinh_trang != 1"
                                @click="handleComfirm(scope.row)"><i clas="fa fa-check" />Xác nhận</el-button>
                            <el-button size="mini" type="danger" :disabled="scope.row.n_tinh_trang != 1"
                                @click="handleCancel(scope.row)"><i clas="fa fa-time" />Hủy yêu cầu</el-button>
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
            <H5>Thông tin chi tiết</H5>
            <div class="info">
                <label class="info-label">Tên khách hàng:</label>
                <span class="info-text">{{ this.selected.c_ten_khach_hang }}</span>
            </div>
            <div class="info">
                <label class="info-label">Điện thoại:</label>
                <span class="info-text">{{ this.selected.c_dien_thoai }}</span>
            </div>
            <div class="info">
                <label class="info-label">Địa chỉ:</label>
                <span class="info-text">{{ this.selected.c_dia_chi }}</span>
            </div>
            <div class="info">
                <label class="info-label">Email:</label>
                <span class="info-text">{{ this.selected.c_email }}</span>
            </div>
            <div class="info">
                <label class="info-label">CCCD:</label>
                <span class="info-text">{{ this.selected.c_cccd }}</span>
            </div>
            <div class="info">
                <label class="info-label">Đối tượng giá:</label>
                <el-select size="mini" placeholder="Đối tượng giá" v-model="this.selected.n_ma_doi_tuong" :disabled="true"
                    class="POSelect">
                    <el-option v-for="item in listdoituonggia" :key="item.nMaDoiTuong" :label="item.cTenDoiTuong"
                        :value="item.nMaDoiTuong"></el-option>
                </el-select>
            </div>
            <div class="info">
                <label class="info-label">Mục đích sử dụng:</label>
                <span>{{ this.selected.c_muc_dich_su_dung }}</span>
            </div>
            <template slot="footer">
                <base-button type="success" @click="handleComfirm(selected)" v-if="this.selected.n_tinh_trang == 1">Xác
                    nhận</base-button>
                <base-button type="danger" @click="handleCancel(selected)"
                    v-if="this.selected.n_tinh_trang == 1">Hủy</base-button>
                <base-button outline type="primary" @click="dialogForm = false">Thoát</base-button>
            </template>
        </modal>
    </div>
</template>
<script>
import Label from "../components/Label.vue";
import Input from "../components/Input.vue";
import DropdownList from '../components/DropdownList.vue';
import DatePicker from "../components/DatePicker.vue";
import moment from "moment";

export default {
    components: {
        Label,
        Input,
        DropdownList,
        DatePicker,
    },
    data() {
        return {
            tableData: {
                content: [
                    {}
                ],
                pageNum: 1,
                totalSize: 0,
                pageSize: 20,
            },
            search: {
                CSName: '',
                Status: "-1",
                month: new Date(),
                PriceObject: "-1",
                pageNum: 1,
                pageSize: 20,
            },
            dialogForm: false,
            selected: {},
            listdoituonggia: [],
        }
    },
    computed: {

    },
    methods: {
        handleCurrentPageChange(val) {
            this.search.pageNum = val
            this.handleFindPage()
        },
        handleSizeChange(val) {
            this.search.pageSize = val
            this.handleFindPage()
        },
        handleFindPage() {
            let CSName = this.search.CSName
            let SearchType = 0
            if (CSName.substring(0,1) == '"' && CSName.substring(CSName.length-1) == '"') {
                CSName = CSName.substring(1, CSName.length - 1)
                SearchType = 1
            } else {
                CSName = this.search.CSName
                SearchType = 0
            }
            let pageRequest = {
                columnFilters: {
                    CSName: { value: CSName },
                    Status: { value: this.search.Status },
                    SearchType: { value: SearchType },
                    PriceObject: { value: this.search.PriceObject },
                    Month: { value: moment(new Date(this.search.month)).format("01/MM/YYYY") }
                },
                pageNum: this.search.pageNum,
                pageSize: this.search.pageSize,
            }
            this.$api.install.findInstallRequest(pageRequest).then(res => {
                if (res.code == 200) {
                    this.tableData = res.data;
                } else {
                    this.$message({ message: "Tải dữ liệu loại thất bại ", type: "error" });
                }
            })
        },
        handleOpenDetail(val) {
            this.selected = val
            this.dialogForm = true
        },
        showPrice() {
            this.$api.priceobject.findAll({}).then((res) => {
                if (res.code == 200) {
                    this.listdoituonggia = res.data;
                }
            });
        },
        handleComfirm(val) {
            this.$confirm('Bạn có chắc muốn xác nhận yêu cầu này không?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning',
            }).then(() => {
                let request = {
                    columnFilters: {
                        requestID: { value: val.n_ma_yeu_cau }
                    }
                }
                this.$api.install.comfirmRequest(request).then(res => {
                    if (res.code == 200) {
                        this.$message({ message: res.msg, type: "success" })
                        this.dialogForm = false
                        this.handleFindPage()
                    } else {
                        this.$message({ message: res.msg, type: "error" })
                    }
                })
            })
        },
        handleCancel(val) {
            this.$confirm('Bạn có chắc muốn hủy yêu cầu này không?', 'Xác nhận', {
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Hủy',
                type: 'warning',
            }).then(() => {
                let request = {
                    columnFilters: {
                        requestID: { value: val.n_ma_yeu_cau }
                    }
                }
                this.$api.install.cancelRequest(request).then(res => {
                    if (res.code == 200) {
                        this.$message({ message: res.msg, type: "success" })
                        this.handleFindPage()
                    } else {
                        this.$message({ message: res.msg, type: "error" })
                    }
                })
            })
        },
    },
    mounted() {
        this.handleFindPage()
        this.showPrice()
    }
}

</script>
<style lang="scss" scoped>
.info {
    display: flex;
    justify-content: flex-start;

    .info-label {
        min-width: 150px;
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
        font-weight: bold;
    }

    .info-text {
        font-weight: bold;
        color: #32325d;
    }
}

.filters {
    margin-left: 20px;
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;

    .filter {
        width: 45%;
        margin-right: 20px;
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;
    }
}

.btn-inner--text {
    white-space: nowrap;
}

.tbl {
    height: calc(100vh - 210px);
}

.box-card {
    margin: 10px;
}
</style>
<style lang="scss">
.POSelect {
    .el-input {
        .el-input__inner:disabled {
            background-color: transparent;
            font-weight: bold;
            color: #32325d;
        }
    }

}
</style>
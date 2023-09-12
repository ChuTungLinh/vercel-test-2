<template>
    <div class="wrapper">
        <div id="Main">
            <div class="HomePage-body">
                <div class="content">
                    <div class="PageTitle">
                        <h2 class="title">TRA CỨU THÔNG TIN</h2>
                    </div>
                    <div class="body-content">
                        <div class="body-part">
                            <Label class="part-label" text="MÃ HỢP ĐỒNG:" />
                            <el-input size="small" v-model="MaHopDong"></el-input>
                        </div>
                        <div class="body-part">
                            <Label class="part-label" text="TÌNH TRẠNG:" />
                            <el-select v-model="Status" size="small" style="width: 100%;">
                                <el-option :value="-1" label="Tất cả"></el-option>
                                <el-option :value="0" label="Chưa thanh toán"></el-option>
                                <el-option :value="1" label="Đã thanh toán"></el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="body-part">
                        <el-button @click="findPage" type="primary">
                            <i class="fa fa-search" style="margin-right: 10px;"></i>
                            TÌM KIẾM</el-button>
                    </div>
                    <el-card style="margin-top: 10px;" v-if="showTable" class="content-table">
                        <div class="customer-name ">
                            <h6>Tên khách hàng: {{ tableData.content[0].c_ten_khach_hang }}</h6>
                        </div>
                        <div class="col-md-12 pt-2 tbl">
                            <el-table :data="tableData.content" fit header-row-class-name="thead-light" height="100%"
                                :border="true" stripe>
                                <el-table-column label="Tên khách hàng" prop="c_ten_khach_hang" v-if="!isMobile"
                                    header-align="center">
                                </el-table-column>
                                <el-table-column label="Tháng" width="70" header-align="center" align="center">
                                    <template slot-scope="scope">
                                        <span>{{ moment(scope.row.d_thang).format("MM/YYYY") }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Tổng tiền" prop="n_tong_tien" header-align="center" align="center">
                                    <template slot-scope="scope">
                                        <span>{{ convertToMoney(scope.row.n_tong_tien) }} đ</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="Tình trạng" min-width="120px" prop="n_tinh_trang"
                                    header-align="center" align="center">
                                    <template slot-scope="scope">
                                        <el-tag type="success" v-if="scope.row.n_tinh_trang == 2">Đã nộp tiền</el-tag>
                                        <el-tag type="warning" v-if="scope.row.n_tinh_trang == 1">Đã thu tiền</el-tag>
                                        <el-tag type="danger" v-if="scope.row.n_tinh_trang == 0">Chưa thanh toán</el-tag>
                                    </template>
                                </el-table-column>

                            </el-table>
                        </div>
                        <div class="col-12 py-2 pagination" style="justify-content: end;">
                            <el-pagination :page-sizes="[20, 30, 50]" background
                                :layout="isMobile ? 'total, prev, pager, next' : 'total,sizes,  prev, pager, next'"
                                :page-size="pageRequest.pageSize" :current-page.sync="pageRequest.pageNum"
                                @current-change="handleCurrentPageChange" @size-change="handleSizeChange" :total="total">
                            </el-pagination>
                        </div>
                    </el-card>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { convertToMoney } from "../../../util/stringUtils";
import Label from "../../Pages/components/Label.vue";
import moment from "moment";

export default {
    components: {
        Label,
        VueperSlides,
        VueperSlide,
    },

    data() {
        return {
            slides: [
                { title: '', content: '', image: '/img/banner/banner.jpg' },
                { title: '', content: '', image: '/img/banner/banner1.jpg' },
                { title: '', content: '', image: '/img/banner/banner2.jpg' },
            ],
            MaHopDong: null,
            Status: -1,
            tableData: {
                content: []
            },
            pageRequest: {
                pageNum: 1,
                pageSize: 20
            },
            total: 0,
            windowWidth: window.innerWidth
        }
    },
    computed: {
        token() {
            return this.$route.query.token
        },
        showTable() {
            if (this.total > 0)
                return true
            else
                return false
        },
        isMobile() {
            if (this.windowWidth <= 500) {
                return true
            }
            else {
                return false
            }
        },
        isTablet() {
            if (this.windowWidth <= 900) {
                return true
            }
            else {
                return false
            }
        }
    },
    methods: {
        handleCurrentPageChange(val) {
            this.pageRequest.pageNum = val
            this.findPage()
        },
        handleSizeChange(val) {
            this.pageRequest.pageSize = val
            this.findPage()

        },
        findPage() {
            if (this.pageRequest.pageNum < 1)
                this.pageRequest.pageNum = 1;
            if (this.pageRequest.pageSize < 20)
                this.pageRequest.pageSize = 20;

            this.pageRequest.columnFilters = {
                MaHopDong: { value: this.MaHopDong },
                Status: { value: this.Status },
                cToken: { value: this.token }
            };

            this.$api.bill.findBillByOrder(this.pageRequest).then((res) => {
                if (res.code == 200) {
                    this.tableData = res.data;
                    this.total = res.data.totalSize;
                    this.isSearchLoading = false;
                }

            });
        },
        convertToMoney(number) {
            return convertToMoney(number);
        },
    }
}
</script>
<style lang="scss" scoped>
.HomePage-body{
    padding-bottom: 30px;
}
.body-content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    padding-bottom: 10px;
}

.part-label {
    white-space: nowrap;
    margin-right: 10px;
    font-weight: bold;
}

.PageTitle {
    display: flex;
    justify-content: center;
    padding: 30px 0 20px 0
}

.body-part {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
}

.content-table {
    width: 80%;
}

.customer-name {
    display: none;
}

@media (max-width:850px) {
    .content-table {
        width: 100%;
    }
}

@media(max-width:500px) {
    .title {
        font-size: 1.5rem;
    }

    .customer-name {
        display: block;
        padding-top: 10px;
        padding-left: 20px;
    }

    .body-content {
        flex-direction: column;
        padding: 10px;
        width: 100%;

        .body-part {
            flex-direction: column;
            align-items: flex-start;
            padding-bottom: 10px;
        }
    }
}
</style>
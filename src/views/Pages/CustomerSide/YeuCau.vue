<template>
    <div class="wrapper">
        <div id="Main">
            <div class="HomePage-body">
                <div class="PageTitle">
                    <h2>YÊU CẦU LẮP ĐẶT</h2>
                </div>

                <el-form ref="sizeForm" :rules="rules" :show-message="false" :model="sizeForm" label-width="130px"
                    size="mini">
                    <div class="row">
                        <div class="col">
                            <el-form-item label="Tên khách hàng" prop="cTenKhachHang">
                                <el-input v-model="sizeForm.cTenKhachHang"></el-input>
                            </el-form-item>
                            <fieldset class="ttkhachhang">
                                <legend>Thông tin khách hàng</legend>


                                <el-form-item class="test1" label="Điện thoại:" prop="cDienThoai">
                                    <el-input v-model="sizeForm.cDienThoai"></el-input>
                                </el-form-item>


                                <el-form-item class="test1" label="Địa chỉ:" prop="cDiaChi">
                                    <el-input v-model="sizeForm.cDiaChi"></el-input>
                                </el-form-item>

                                <el-form-item class="test1" label="Email:" prop="cEmail">
                                    <el-input v-model="sizeForm.cEmail"></el-input>
                                </el-form-item>

                                <el-form-item class="test1" label="Số CMND:" prop="cCCCD">
                                    <el-input v-model="sizeForm.cCCCD"></el-input>
                                </el-form-item>

                            </fieldset>
                        </div>


                    </div>
                    <div class="row">
                        <div class="col">
                            <fieldset style="padding: 10px">
                                <legend>Nhu cầu sử dụng</legend>
                                <el-form-item class="test1" label="ĐT giá:" prop="nMaDoiTuongGia">
                                    <el-select v-model="sizeForm.nMaDoiTuongGia" filterable
                                        placeholder="Chọn đối tượng giá">
                                        <el-option v-for="item in listdoituonggia" :key="item.nMaDoiTuong"
                                            :label="item.cTenDoiTuong" :value="item.nMaDoiTuong">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item class="test1" label="Mục đích SD:" prop="cMucDich">
                                    <el-input v-model="sizeForm.cMucDich"></el-input>
                                </el-form-item>
                            </fieldset>
                        </div>
                    </div>
                    <div
                        style="display: flex; align-items: center; justify-content: center; width: 100%; margin-top: 20px;">
                        <el-button type="success" @click="handleCreateInstallRequest">Gửi</el-button>
                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>
<script>
import Label from "../../Pages/components/Label.vue";
import moment from "moment";

export default {
    components: {
        Label,
    },
    data() {
        return {
            listdoituonggia: [],
            rules: {
                cTenKhachHang: [{ required: true }],
                cTen: [{ required: true }],
                cDienThoai: [{ required: true }],
                cDiaChi: [{ required: true }],
                cCCCD: [{ required: true }],
                nMaDoiTuongGia: [{ required: true }],
            },
            sizeForm: {
                cTenKhachHang: "",
                cDiaChi: "",
                cEmail: "",
                cDienThoai: "",
                cCCCD: "",
                nMaDoiTuongGia: "",
                cMucDich: "",   
            },
            windowWidth: window.innerWidth
        }
    },
    computed: {
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
        findByID() {
            let CompanyID = localStorage.getItem("CompanyID")
            this.$api.priceobject.findByID(CompanyID).then((res) => {
                if (res.code == 200) {
                    this.listdoituonggia = res.data;
                }
            });
        },
        handleCreateInstallRequest() {
            this.$refs.sizeForm.validate((valid) => {
                if (valid) {
                    let pageRequest = {
                        columnFilters: {
                            cTenKhachHang: { value: this.sizeForm.cTenKhachHang },
                            cDiaChi: { value: this.sizeForm.cDiaChi },
                            cEmail: { value: this.sizeForm.cEmail },
                            cDienThoai: { value: this.sizeForm.cDienThoai },
                            cCCCD: { value: this.sizeForm.cCCCD },
                            nMaDoiTuongGia: { value: this.sizeForm.nMaDoiTuongGia },
                            cMucDich: { value: this.sizeForm.cMucDich },
                            nMaCongTy:{ value: localStorage.getItem("CompanyID")}
                        }
                    }
                    this.$api.install.createInstallRequest(pageRequest).then(res => {
                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: 'success' });
                            this.$refs['sizeForm'].resetFields();
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    })
                        .catch(() => { });
                }
            })
        }
    },
    mounted() {
        this.findByID()
    }
}
</script>
<style lang="scss" scoped>
.el-scrollbar{
    overflow-y: auto;
    overflow-x: hidden;
}

.el-form-item__label {
    width: 100px !important;
}

.body-content {
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

.HomePage-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 30px;
}

.body-part {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    margin-bottom: 10px;
}

.part-label {
    margin-right: 20px;
    white-space: nowrap;
}

.PageTitle {
    display: flex;
    justify-content: center;
    padding: 30px 0 20px 0
}

///////

fieldset {
    border: 1px solid rgb(223, 215, 215) !important;
    font-size: 13px !important;
}

fieldset.ttkhachhang {
    height: calc(100% - 36px);
}

legend {
    width: auto !important;
    font-size: 13px !important;
    margin-left: 32px !important;
}

.test {
    display: flex;
    margin-right: 12px;
}

.el-form {
    width: 95%;
}

.el-form-item.el-form-item--mini {
    margin: 0;
}

.test1 {
    margin-right: 12px !important;
}
</style>
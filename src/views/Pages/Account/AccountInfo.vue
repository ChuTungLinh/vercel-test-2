<template>
    <div class="wrapper m-2">
        <div style="display: flex; align-items: center; justify-content: center;height: 70vh;">
            <div class="info-table">
                <div class="info-Header">
                    <span>Thông tin tài khoản</span>
                </div>
                <div class="info-Body">
                    <div class="info">
                        <span class="tittle">Tên tài khoản:</span><span class="detail">{{ cAccount }}</span>
                    </div>
                    <div class="info">
                        <span class="tittle">Họ và tên:</span><span v-if="!action" class="detail">{{ cFullName }}</span>
                        <el-input v-model="dataForm.cFullName" v-if="action"></el-input>
                    </div>
                    <div class="info">
                        <span class="tittle">Tên công ty:</span><span class="detail">{{ cCompanyName }}</span>
                    </div>
                    <!-- <div class="info">
                    <span class="tittle">Mã Nhân viên:</span><span class="detail">{{ nEmployeeID }}</span>
                </div> -->
                    <div class="info">
                        <span class="tittle">Email:</span><span v-if="!action" class="detail">{{ cEmail }}</span>
                        <el-input v-model="dataForm.cEmail" v-if="action"></el-input>
                    </div>
                    <div class="info">
                        <span class="tittle">Số điện thoại:</span><span v-if="!action" class="detail">{{ cSDT }}</span>
                        <el-input v-model="dataForm.cSDT" v-if="action"></el-input>
                    </div>
                    <div class="info">
                        <span class="tittle">Quyền hệ thống:</span><span class="detail">{{ cRole }}</span>
                    </div>
                </div>
                <div class="info-Footer">
                    <el-button size="small" v-if="!action" type="primary" @click="handleOpenEdit">Sửa thông tin</el-button>
                    <el-button size="small" v-if="!action" type="primary" @click="handleChangePW">Đổi mật khẩu</el-button>
                    <el-button size="small" v-if="action" type="primary" @click="handleEdit">Xác nhận sửa</el-button>
                    <el-button size="small" v-if="action" type="danger" @click="handleCancel">Hủy</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            action: false,
            cAccount: '',
            cFullName: '',
            cCompanyName: '',
            /* nEmployeeID:'', */
            cEmail: '',
            cSDT: '',
            cRole: '',
            dataForm: {

            }
        }
    },
    methods: {
        handleChangePW() {
            this.$router.push("/changePW")
        },
        handleOpenEdit() {
            this.dataForm = Object.assign({}, { cFullName: this.cFullName, cEmail: this.cEmail, cSDT: this.cSDT })
            this.action = true
        },
        handleCancel() {
            this.action = false
            this.dataForm = { }
        },
        handleEdit() {
            this.action = false
            this.$api.account.updateSelf(this.dataForm).then(res => {
                if (res.code == 200) {
                    this.$message({
                        message: "Sửa thông tin thành công",
                        type: "success",
                    });
                    this.action = false
                    this.dataForm = {
                    }
                    this.handleFindInfo()
                }
                else {
                    this.$message({
                        message: "Sửa thông tin không thành công: " + res.msg,
                        type: "error",
                    });
                }
            })
        },
        handleFindInfo() {
            this.$api.account.findUserByName().then(res => {
                if (res.code == 200) {
                    this.cAccount = res.data[0].cTenTaiKhoan
                    this.cFullName = res.data[0].cHoTen
                    this.cCompanyName = res.data[0].cTenCongTy
                    /*                     this.nEmployeeID = res.data[0]. */
                    this.cEmail = res.data[0].cEmail
                    this.cSDT = res.data[0].cSoDienThoai
                    this.cRole = res.data[0].cQuyenHeThong
                } else {
                    this.$message({ message: res.msg, type: "error" })
                }
            })
        }
    },
    mounted() {
        this.handleFindInfo()
    }
}
</script>
<style lang="scss" scoped>
.info-table {
    border: 2px solid;
    border-radius: 5%;
    padding: 10px;
    overflow: hidden;
}

.info-Header {
    margin: -10px -10px 0 -10px;
    padding: 10px;
    background-color: darken(white, 25%);
    border-bottom: 2px solid;
    text-align: center;
    span {
        color: #32325d;
        font-weight: bold;
        font-size: 2rem;
    }
}

.info-Body {
    .info {
        color: #32325d;
        padding: 5px;
        font-weight: bold;

        /*       .tittle{
            color: black;
        }*/
        .detail {
            margin-left: 10px;
            color: #009688;
        }
    }
}

.info-Footer {
    padding-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}</style>
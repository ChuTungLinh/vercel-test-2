<template>
    <div class="wrapper m-2">
        <div class="card-block">
            <div class="card-title">
                MẠNG XÃ HỘI
                <div style="padding: 5px 10px">
                    <el-button type="primary" @click="handleOpenEdit">
                        <i class="el-icon-edit"></i>
                        Sửa
                    </el-button>
                </div>
            </div>
            <div class="card-info">
                <span class="info-title">FACEBOOK:</span><a :href="data.cFacebook" target="_blank" class="info-detail">{{
                    data.cFacebook }}</a>
            </div>
            <div class="card-info">
                <span class="info-title">TWITTER:</span><a :href="data.cTwitter" target="_blank" class="info-detail">{{
                    data.cTwitter }}</a>
            </div>
            <div class="card-info">
                <span class="info-title">INSTAGRAM:</span><a :href="data.cInstagram" target="_blank" class="info-detail">{{
                    data.cInstagram }}</a>
            </div>
            <div class="card-info">
                <span class="info-title">LINKEDIN:</span><a :href="data.cLinkedin" target="_blank" class="info-detail">{{
                    data.cLinkedin }}</a>
            </div>
            <div class="card-info">
                <span class="info-title">TIKTOK:</span><a :href="data.cTiktok" target="_blank" class="info-detail">{{
                    data.cTiktok }}</a>
            </div>
        </div>
        <modal :show.sync="dialogForm">
            <h6 slot="header" class="modal-title">Sửa thông tin mạng xã hội</h6>
            <el-form :model="dataForm" label-width="150px" ref="dataForm" size="mini">
                <div style="width: 100%; text-align: center; font-weight: 500; font-size: 0.8rem; color: rgba(0, 0, 0, 0.459);">
                    (Xin vui lòng sao chép toàn bộ đường dẫn đến trang của bạn)
                </div>
                <el-form-item label="Facebook" prop="cFacebook">
                    <el-input v-model="dataForm.cFacebook"></el-input>
                </el-form-item>
                <el-form-item label="Twitter" prop="cTwitter">
                    <el-input v-model="dataForm.cTwitter"></el-input>
                </el-form-item>
                <el-form-item label="Instagram" prop="cInstagram">
                    <el-input v-model="dataForm.cInstagram"></el-input>
                </el-form-item>
                <el-form-item label="Linkedin" prop="cLinkedin">
                    <el-input v-model="dataForm.cLinkedin"></el-input>
                </el-form-item>
                <el-form-item label="Tiktok" prop="cTiktok">
                    <el-input v-model="dataForm.cTiktok"></el-input>
                </el-form-item>
            </el-form>
            <template slot="footer">
                <base-button type="primary" @click="handleEdit">Lưu</base-button>
                <base-button outline type="danger" @click="close">Thoát</base-button>
            </template>
        </modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dataForm: {},
            dialogForm: false,
            data: {}
        }
    },
    methods: {
        handleFindSM() {
            this.$api.social.findAccountCompany().then(res => {
                this.data = res.data
            })
        },
        handleOpenEdit() {
            this.dataForm = Object.assign({}, this.data)
            this.dialogForm = true
        },
        handleEdit() {
            let pageRequest = {
                columnFilters: {
                    cFacebook: { value: this.dataForm.cFacebook },
                    cTwitter: { value: this.dataForm.cTwitter },
                    cInstagram: { value: this.dataForm.cInstagram },
                    cLinkedin: { value: this.dataForm.cLinkedin },
                    cTiktok: { value: this.dataForm.cTiktok },
                }
            }
            this.$api.social.updateSocialMedia(pageRequest).then(res => {
                if (res.code == 200) {
                    this.$message({ message: res.msg, type: "success" });
                    this.handleFindSM();
                    this.close();
                } else {
                    this.$message({ message: res.msg, type: "error" });
                }
            })
        },
        close() {
            this.$refs["dataForm"].resetFields();
            this.dialogForm = false;
        }
    },
    mounted() {
        this.handleFindSM()
    }
}
</script>
<style lang="scss" scoped>
.card-block {
    margin: 30px;
    border-radius: 20px;
    color: #32325d;
    border: 1px solid #32325d;
    background-color: aliceblue;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.3) 1.95px 1.95px 10px;

    .card-title {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
        padding: 10px;
        font-weight: 500;
        font-size: 1.5rem;
    }

    .card-info {
        padding: 10px;
        padding-left: 20px;
        font-weight: bold;
        border-top: 1px solid #32325d;

        .info-title {
            margin-right: 10px;
        }

        .info-detail {}
    }
}</style>
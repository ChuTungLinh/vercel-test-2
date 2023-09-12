<template>
    <div class="wrapper" id="main-wrapper">
        <div class="HomePage-header">
            <div class="running-text">
                <span>
                    {{ company.cTenCongTy + ", " }}
                </span>
                <span>Số điện thoại liên hệ: {{ company.cDienThoai }}</span>
            </div>
        </div>
        <div id="pixel-to-watch"></div>
        <div class="HomePage-nav" id="home-nav">
            <div class="nav">
                <div style="display: flex; justify-content: flex-start; align-items: center;">
                    <img v-if="tokenCheck" :src="'/img/company/' + company.cAVT" style="height: 70px; margin-right:10px"
                        @click="HandleHomePage" class="Brand">
                </div>
                <div class="option">
                    <div class="tab option" @click="HandleHomePage">
                        <h5 class="text">Trang chủ</h5>
                    </div>
                    <div class="tab" @click="HandleSearch">
                        <h5 class="text">Tra cứu</h5>
                    </div>
                    <div class="tab" @click="handleInstallation">
                        <h5 class="text">Yêu cầu lắp đặt</h5>
                    </div>
                    <div class="tab" @click="handleSurvey">
                        <h5 class="text">Khảo sát</h5>
                    </div>
                    <div class="tab" @click="handleContact">
                        <h5 class="text">Liên hệ</h5>
                    </div>
                </div>
            </div>
            <div class="mobile-menu">
                <div class="menu-button" id="menu-button" @click="handleOpenMenu"><i id="fa-bars" class="fa fa-bars"></i>
                </div>
                <div class="mobile-option display-none" id="mobile-option">
                    <div class="tab" @click="HandleHomePage">
                        <h5 class="text">Trang chủ</h5>
                    </div>
                    <div class="tab" @click="HandleSearch">
                        <h5 class="text">Tra cứu</h5>
                    </div>
                    <div class="tab" @click="handleInstallation">
                        <h5 class="text">Yêu cầu lắp đặt</h5>
                    </div>
                    <div class="tab" @click="handleSurvey" style="border-bottom: none;">
                        <h5 class="text">Khảo sát</h5>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <zoom-center-transition :duration="200" origin="center top" mode="out-in">
                <router-view></router-view>
            </zoom-center-transition>
        </div>
        <div class="message">
            <img src="../../../public/img/icons/contact/messenger_3670042.png" style="height: 100%;">
        </div>
        <div class="message-box closed"></div>
        <div class="counters">
            <div class="counter" v-for="counter in counters">
                <i class="icon" :class="'fa ' + counter.icon"></i>
                <div class="count">{{ handleHandleNum(counter.count) }}</div>
                <div class="unit">{{ counter.unit }}</div>
            </div>
        </div>
        <div class="contact" id="contact">
            <div>
                <h3>Liên hệ với chúng tôi</h3>
            </div>
            <el-form ref="sizeForm" :rules="rules" :show-message="true" :model="sizeForm" class="contact-info" size="mini">
                <div class="info">
                    <el-form-item class="info-input" prop="cNguoiGui">
                        <el-input v-model="sizeForm.cNguoiGui" size="mini" placeholder="Họ và Tên..."></el-input>
                    </el-form-item>
                    <el-form-item class="info-input" prop="cEmail">
                        <el-input v-model="sizeForm.cEmail" size="mini"  placeholder="Email..."></el-input>
                    </el-form-item>
                    <el-form-item class="info-input" prop="cDienThoai">
                        <el-input v-model="sizeForm.cDienThoai" size="mini"  placeholder="Số điện thoại..."></el-input>
                    </el-form-item>
                </div>
                <div class="info">
                    <el-form-item class="info-input" prop="cNoiDung">
                        <el-input v-model="sizeForm.cNoiDung" type="textarea" placeholder="Nội dung..."></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <el-button class="button" @click="handleCreateContactRequest">Gửi</el-button>

        </div>
        <div class="HomePageFooter">
            <div class="footer-info">

                <div class="Footer-1">
                    <div style="display: flex;">
                        <img v-if="tokenCheck" :src="'/img/company/' + company.cAVT" style="height: 50px; margin-right:10px"
                            class="Brand">
                        <span class="highlight-text attribute"
                            style="margin-bottom: 0; display: flex; align-items: center; border-bottom: none;">{{
                                company.cTenCongTy }}</span>
                    </div>
                </div>
                <div class="Footer-2">
                    <div class="highlight-text attribute">
                        <span>Chức năng:</span>
                    </div>
                    <div class="highlight-text">
                        <span class="funct" @click="HandleSearch">
                            Tra cứu
                        </span>
                    </div>
                    <div class="highlight-text">
                        <span class="funct" @click="handleInstallation">
                            Yêu cầu lắp đặt
                        </span>
                    </div>
                    <div class="highlight-text">
                        <span class="funct" @click="handleSurvey">
                            Khảo sát
                        </span>
                    </div>
                </div>
                <div class="Footer-2">
                    <div class="highlight-text attribute">
                        <span>Ảnh và icon:</span>
                    </div>
                    <div class="highlight-text">
                        <a class="funct" href="https://www.freepik.com/author/freepik" target="_blank">Freepik</a>
                    </div>
                </div>
                <div class="Footer-3">
                    <div class="highlight-text attribute">
                        <span>Thông tin liên hệ:</span>
                    </div>
                    <div class="highlight-text">
                        <i class="fa fa-home" /><span class="text">Địa chỉ: {{ company.cDiaChi }}</span>
                    </div>
                    <div class="highlight-text">
                        <i class="fa fa-phone" /><span class="text">SĐT: {{ company.cDienThoai }}</span>
                    </div>
                    <div class="highlight-text">
                        <i class="fa fa-envelope" /><span class="text">Email: {{ company.cEmail }}</span>
                    </div>
                    <div class="icons">
                        <a v-if="company.cFacebook != null && company.cFacebook != ''" class="icon-holder" target="_blank"
                            :href="company.cFacebook">
                            <img src="/img/icons/contact/facebook_889100.png" class="icon">
                        </a>
                        <a v-if="company.cTwitter != null && company.cTwitter != ''" class="icon-holder" target="_blank"
                            :href="company.cTwitter">
                            <img src="/img/icons/contact/twitter.png" class="icon">
                        </a>
                        <a v-if="company.cInstagram != null && company.cInstagram != ''" class="icon-holder" target="_blank"
                            :href="company.cInstagram">
                            <img src="/img/icons/contact/instagram.png" class="icon">
                        </a>
                        <a v-if="company.cLinkedin != null && company.cLinkedin != ''" class="icon-holder" target="_blank"
                            :href="company.cLinkedin">
                            <img src="/img/icons/contact/linkedin.png" class="icon">
                        </a>
                        <a v-if="company.cTiktok != null && company.cTiktok != ''" class="icon-holder" target="_blank"
                            :href="company.cTiktok">
                            <img src="/img/icons/contact/tiktok.png" class="icon">
                        </a>
                    </div>

                </div>
            </div>
            <div class="notes">
                <div class="note">
                    <span class="funct" @click="handleNoteClick(1)">Giới thiệu</span>
                </div>
                <div class="note">
                    <span class="funct" @click="handleNoteClick(2)">Điều khoản & dịch vụ</span>
                </div>
                <div class="note" style="border: none;">
                    <span class="funct" @click="handleNoteClick(3)">Bảo mật</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import { ZoomCenterTransition } from "vue2-transitions";
import { convertToMoney } from "../../util/stringUtils";
export default {
    components: {
        ZoomCenterTransition,

    },
    data() {
        return {
            tokenCheck: false,
            token: null,
            company: {},
            counters: [
                { icon: "fa-plug", count: 1622, unit: "Lượt truy cập" },
                { icon: "fa-tint", count: 0, unit: "Khối nước đã cấp" },
                { icon: "fa-user", count: 0, unit: "Khách hàng sử dụng" },
            ],
            sizeForm: {
                cNguoiGui: "",
                cDienThoai: "",
                cEmail: "",
                cNoiDung: "",
            },
            rules: {
                cNguoiGui: [{ required: true,message:"Xin vui lòng điền họ và tên" }],
                cDienThoai: [{ required: true,message:"Xin vui lòng điền số điện thoại"  }],
                cEmail: [{ required: true,message:"Xin vui lòng điền email"  }],

            }
        }
    },
    watch: {
        token() {
            if (this.token != null && this.token != undefined) {
                this.tokenCheck = true
            } else {
                this.tokenCheck = false
            }
        },
        URL() {
            let a = document.getElementById("mobile-option").classList
            if (!Object.values(a).includes("display-none")) {
                this.handleOpenMenu()
            }
        }
    },
    computed: {
        URL() {
            return this.$route.path
        },
        avatar() {
            return "../../../public/img/company/" + company.cAVT
        }
    },
    methods: {
        handleCreateContactRequest() {
            this.$refs.sizeForm.validate((valid) => {
                if (valid) {
                    let pageRequest = {
                        columnFilters: {
                            cNguoiGui: { value: this.sizeForm.cNguoiGui },
                            cDienThoai: { value: this.sizeForm.cDienThoai },
                            cEmail: { value: this.sizeForm.cEmail },
                            cNoiDung: { value: this.sizeForm.cNoiDung },
                            nMaCongTy: { value: this.company.nMaCongTy }
                        }
                    }
                    this.$api.contactrequest.createContactRequest(pageRequest).then(res => {
                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: 'success' });
                            this.$refs['sizeForm'].resetFields();
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    })
                        .catch(() => { });
                }else{
                    
                }
            })
        },
        handleConvertToMoney(val) {
            return convertToMoney(val)
        },
        handleGetCountData() {
            this.$api.company.getCountData(this.token).then(res => {
                if (res.code == 200) {
                    this.counters[1].count = res.data.nTongTieuThu
                    this.counters[2].count = res.data.nNguoiDung
                }
            })
        },
        handleHandleNum(val) {

            let result = this.handleConvertToMoney(val)
            if (val >= 10000000000) {
                result = this.handleConvertToMoney(parseInt((val / 1000000000))) + "B"
                if (val % 1000000000 > 0)
                    result = result + "+"
            }
            else if (val >= 10000000) {
                result = this.handleConvertToMoney(parseInt((val / 1000000))) + "M"
                if (val % 1000000 > 0)
                    result = result + "+"
            }
            else if (val >= 10000) {
                result = this.handleConvertToMoney(parseInt((val / 1000))) + "K"
                if (val % 1000 > 0)
                    result = result + "+"
            }
            return result
        },
        handleContact() {
            const element = document.getElementById("contact");
            element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        },
        HandleHomePage() {
            this.$router.push("/Home?token=" + this.token).catch(() => { /* ignore */ })
        },
        HandleSearch() {
            this.$router.push("/TraCuu?token=" + this.token).catch(() => { /* ignore */ })
        },
        handleInstallation() {
            this.$router.push("/YeuCau?token=" + this.token).catch(() => { /* ignore */ })
        },
        handleSurvey() {
            this.$router.push("/KhaoSat?token=" + this.token).catch(() => { /* ignore */ })
        },
        handleOpenMenu() {
            let a = document.getElementById("mobile-option").classList
            if (!Object.values(a).includes("display-none")) {
                document.getElementById("mobile-option").classList.add("display-none")
                document.getElementById("menu-button").classList.remove("open")
            } else {
                document.getElementById("mobile-option").classList.remove("display-none")
                document.getElementById("menu-button").classList.add("open")
            }
        },
        handleGetCompany() {
            this.$api.company.findCompanyByToken(this.token).then(res => {
                if (res.code == 200) {
                    this.company = res.data[0]
                    localStorage.setItem("CompanyID", this.company.nMaCongTy)
                    localStorage.setItem("CompanyName", this.company.cTenCongTy)
                }
            })
        }
    },
    mounted() {
        localStorage.clear()
        this.token = this.$route.query.token
        this.handleGetCountData()
        localStorage.setItem("token", this.$route.query.token)
        this.handleGetCompany()
        document.getElementById('main-wrapper').onclick = function (e) {
            let a = document.getElementById("mobile-option").classList
            if (e.target != document.getElementById('mobile-option')
                && e.target != document.getElementById('menu-button')
                && e.target != document.getElementById('fa-bars')) {
                if (!Object.values(a).includes("display-none")) {
                    document.getElementById("mobile-option").classList.add("display-none")
                }
            }
        }
        /* let observer = new IntersectionObserver(entries => {
            if (entries[0].boundingClientRect.y < 0) {
                document.getElementById("home-nav").classList.add("sticky-nav")
            } else {
                document.getElementById("home-nav").classList.remove("sticky-nav")
            }
        });
        observer.observe(document.querySelector("#pixel-to-watch")); */
    }
}
</script>
<style lang="scss" scoped>
/* #pixel-to-watch {
    position: absolute;
    top: 30px;
    height: 1;
    width: 1;
    background: transparent;
}

.sticky-nav {
    position: fixed !important;
    top: 0 !important;
}*/

.counters {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px 0 40px;
    background-color: #deecf9;

    .counter {
        margin: 30px;
        height: 150px;
        min-width: 150px;
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .icon {
            font-size: 4rem;
            height: fit-content;
            width: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
            background: -webkit-gradient(linear, left top, right bottom, from(#0033a3), to(#568bff));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .count {
            font-size: 2rem;
            font-weight: 500;
        }

        .unit {
            font-size: 1rem;
            font-weight: 500;
            font-style: italic;
            color: gray;
        }
    }
}

.contact {
    h3 {
        color: white;
    }

    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #272834;

    .contact-info {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .info {
            padding: 20px;
            width: 40%;
            max-width: 500px;
            

            .info-input {
                width: 100%;
                margin: 20px 0 20px 0;
            }
        }
    }
}

.icons {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.notes {
    padding: 20px;
    justify-content: center;
    border-top: 1px solid rgb(4, 96, 243);
    display: flex;
    align-items: center;
    width: 100%;

    .note {
        text-align: center;
        color: rgb(178, 222, 255);
        font-size: 1rem;
        width: 100%;
        width: auto;
        padding: 0 10px 0 10px;
        border-right: 1px solid rgb(4, 96, 243);
    }
}

.icon-holder {
    margin: 10px 20px 10px 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
        height: 30px;
        width: 30px;
    }
}

.icon-holder:hover {
    cursor: pointer;
}

.footer-info {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}

.message {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    position: fixed;
    z-index: 10000;
    bottom: 20px;
    right: 20px;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 5px;
}

.message:hover {
    box-shadow: rgb(0, 162, 255) 0 0 15px;
    cursor: pointer;
}

.message-box {}


.HomePage-header {
    position: absolute;
    z-index: 1000;
    width: 100%;
    top: 0;
    height: 30px;
    background-color: #00c3ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.HomePage-header {
    width: 100%;
    overflow: hidden;
}

.running-text {
    width: 100%;
    -webkit-animation: slide-left 30s linear;
    animation-iteration-count: infinite;
    white-space: nowrap;
}

.HomePage-header:hover {
    .running-text {
        animation-play-state: paused;
    }
}

@keyframes slide-left {
    0% {
        margin-left: 100%;
        margin-right: -50%;
    }

    100% {
        margin-left: -50%;
        margin-right: 100%;
    }
}

.HomePageFooter {
    width: 100%;
    //background-image: linear-gradient(to top, black 0%, #000014 50%, rgb(19, 19, 19) 100%);
    background-color: #0033a3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .highlight-text {
        margin-bottom: 10px;
        color: rgb(178, 222, 255);
        font-size: 1rem;
        width: 100%;

        .fa {
            width: 20px;
            margin-left: 10px;
            margin-right: 10px;
        }

        .text {
            color: rgb(178, 222, 255);
            font-weight: normal;
            font-size: 1rem;
            white-space: normal;
        }
    }

    .funct {
        color: rgb(178, 222, 255);
        font-size: 1rem;
        margin-left: 10px;
        font-weight: 500;
        transition: all 0.5s ease;
    }

    .attribute {
        font-weight: bold;
        font-size: 1.2rem;
        margin-left: 10px;
        color: rgb(139, 203, 255);
        padding-bottom: 5px;
        border-bottom: 1px solid rgb(0, 80, 213);
    }

    .funct:hover {
        cursor: pointer;
        color: white;
        transition: all 0.5s ease;
    }

    .CompanyName {
        color: rgb(233, 233, 233);
        font-size: 1.2rem;
    }

    .Footer-1 {
        margin: 0px 10px 0px 10px;
        padding: 20px 20px 20px 0;
        height: 100%;
        width: 30%;
        display: flex;
        flex-direction: column;
    }

    .Footer-2 {
        margin: 0px 10px 0px 10px;
        padding: 20px 0 20px 0;
        height: 100%;
        width: 15%;
        display: flex;
        flex-direction: column;
    }

    .Footer-3 {
        margin: 0px 10px 0px 10px;
        padding: 20px 0 20px 0;
        height: 100%;
        width: 30%;
        display: flex;
        flex-direction: column;
    }
}

.HomePage-nav {
    position: absolute;
    top: 30px;
    z-index: 1000;
    width: 100%;
    height: 90px;
    display: flex;
    padding: 10px 50px 10px 50px;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    background-color: #deecf9;

    .nav {
        width: 90%;
        min-width: 770px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
    }
}

.option {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
}

.tab {
    margin-left: 20px;
    padding: 10px;
    border-radius: 10px;

    .text {
        //color: white;
        color: #272834b9;
        transition: all 0.3s ease;
        white-space: nowrap;
    }

    .text:hover {
        color: #2753ff;
        transition: all 0.3s ease;
    }
}

.CompanyName {
    color: white;
}

.tab:hover {
    cursor: pointer;
}

.mobile-menu {
    display: none;
}

.Brand:hover {
    cursor: pointer;
}

@media (max-width:850px) {
    .icons {
        justify-content: space-between;

        .icon-holder {
            margin: 10px 5px 10px 5px;
        }
    }

    .counters {
        flex-direction: column;
    }

    .notes {
        flex-direction: column;
        padding: 0;

        .note {
            width: 100%;
            padding: 10px;
            border-right: none;
            border-bottom: 1px solid rgb(4, 96, 243);
        }
    }

    .message {
        width: 50px;
        height: 50px;
    }

    .HomePage-header {
        display: none;
    }

    .option {
        display: none;
    }

    .mobile-menu {
        display: block;
    }

    .menu-button {
        height: 40px;
        width: 40px;
        border-radius: 5px;
        border: 1px solid gray;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.5);
        transition: all 0.3s ease;
    }

    .mobile-option {
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 180px;
        width: 100%;
        z-index: 2000;
        top: 70px;
        left: 0;
        border: 1px solid #72bdff;
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        background-color: #1069b8;
        overflow: hidden;
        transition: all 1s ease;

        .tab {
            margin-left: 0;
            padding: 10px 20px 10px 20px;
            border-radius: 0;
            border-bottom: 1px solid #72bdff;

            .text {
                color: white;
                margin-bottom: 0;
            }
            .text:hover {
                color: #72bdff;
                transition: all 0.3s ease;
            }
        }
    }

    .display-none {
        transition: all 1s ease;
        height: 0;
        overflow: hidden;
        border: 0px solid #72bdff;
    }

    .HomePage-nav {
        position: fixed;
        padding: 0 20px 0 20px;
        height: 70px;
        top: 0;

        .nav {
            min-width: 0;
        }
    }

    .HomePageFooter {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 20px 0px 0px 0;

        .footer-info {
            flex-direction: column;
        }

        .highlight-text {
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 1rem;
            width: 100%;

            .text {
                font-weight: normal;
                font-size: 0.8rem;
                white-space: normal;
            }
        }

        .funct {
            font-size: 1rem;
        }

        .Footer-1 {
            margin: 0px 10px 0px 10px;
            padding: 0 0 20px 0;
            height: fit-content;
            width: 90%;
        }

        .Footer-2 {
            margin: 0px 10px 0px 10px;
            padding: 0 0 20px 0;
            height: fit-content;
            width: 90%;
        }

        .Footer-3 {
            margin: 0px 10px 0px 10px;
            padding: 0 0 20px 0;
            height: fit-content;
            width: 90%;
        }
    }
}
</style>
<style lang="scss">
.contact {
    .contact-info {
        .info-input {
            .el-textarea__inner {
                height: 220px;
                background-color: #272834;
                color: white;
                border: 1px solid #858485;
            }

            .el-input__inner {
                height: 60px;
                background-color: #272834;
                color: white;
                border: 1px solid #858485;
            }
        }
    }
}

.HomePage-body {
    padding: 120px 0 0 0;
    background-color: white;
}

@media (max-width:850px) {
    .HomePage-body {
        padding-top: 70px;
    }

}

@media (max-width:550px) {
    .contact {
        padding: 20px !important;

        .contact-info {
            flex-direction: column;

            .info {
                width: 100% !important;
                padding: 10px !important;
            }

            .info-input {

                .el-textarea__inner {
                    width: 100%;
                    height: 120px;
                }

                .el-input__inner {
                    width: 100%;
                    height: 60px;
                }
            }
        }
    }
}

.button {
    min-width: 100px;
    background: #2753ff;
    background-size: 300% 300%;
    color: white;
    border: none;
    overflow: hidden;
}

.button:hover {
    transition: 0.2s ease;
    background: #568bff;
    color: white;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    100% {
        background-position: 100% 50%;
    }

}

.vueperslides__inner {
    box-shadow: rgba(0, 0, 0, 0.3) 1.95px 1.95px 10px;
}

.vueperslides__arrow--prev {
    left: 0 !important;
    height: 100%;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, rgba(255, 255, 255, 0) 100%);
}

.vueperslides__arrow--next {
    right: 0 !important;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
}

.vueperslides__track-inner {
    .vslide {
        -webkit-background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        -o-background-size: 100% 100%;
        background-size: 100% 100%;
    }
}
</style>
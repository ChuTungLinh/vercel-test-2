<template>
    <div class="wrapper">
        <div id="Main">
            <div class="HomePage-body">
                <div class="content" v-if="id == 0">
                    <div style="width: 100%;max-height: 500px; overflow: hidden;">
                        <img src="/img/banner/banner2.jpg" style="max-width: 100vw; width: 100%;">
                    </div>
                    <div class="PageTitle">
                        <h2 class="title">Hệ thống cấp nước</h2>
                    </div>
                    <div class="body-content">
                        <span class="article-text">
                            Hệ thống cấp nước là gì? Hệ thống cấp nước có cấu tạo như thế nào?… Chúng ta thường ngày vẫn
                            luôn
                            cần sử dụng nước. Nước là nhu cầu thiết yếu trong sinh hoạt, sản xuất của con người. Và hệ thống
                            cấp
                            nước là hạ tầng không thể thiếu cho đời sống sinh hoạt và sản xuất. Vậy Bạn biết bao nhiêu về hệ
                            thống này? Có lẽ gia đình Bạn cũng đã từng sở hữu một hệ thống cấp nước loại nhỏ mà Bạn không
                            biết.
                        </span>
                        <h4 class="header">
                            Hệ thống cấp nước là gì?
                        </h4>
                        <span class="article-text">
                            Hệ thống cấp nước một hệ thống các công trình (hoặc thiết bị) làm các nhiệm vụ: thu thập nước,
                            vận chuyển nước, xử lý nước, điều hòa và phân phối đến các khu vực nhỏ hơn, hoặc đến nơi có
                            nhu cầu sử dụng nước.
                        </span>
                        <div class="article-img">
                            <div class="image" style="padding: 5px;background-color: rgb(213, 225, 235);">
                                <img src="/img/Articles/article-1-1.jpg" style="width: 100%;">
                            </div>
                        </div>
                        <span class="article-text">
                            Một ví dụ cho hệ thống cấp nước gia đình: Những năm 1990 – 2000, người dân thường sử dụng nước
                            giếng khoan gia đình. Đây là một hệ thống cấp nước loại nhỏ gồm:
                        </span>
                        <ul class="article-text" style="margin-left: 20px;">
                            <li>Máy bơm: thu thập nước ngầm và bơm lên bể lọc</li>
                            <li>Bể lọc xử lý nước gồm các thành phần: than hoa(than gỗ), xỉ than, cát vàng,…</li>
                            <li>Bể chứa nước đã lọc</li>
                            <li>Mạng lưới ống dẫn đến các vòi nước</li>
                        </ul>
                        <div class="article-img">
                            <div class="image" style="padding: 5px; background-color: rgb(213, 225, 235);">
                                <img src="/img/Articles/article-1-2.jpg" style="width: 100%;">
                            </div>
                        </div>
                        <span class="article-text">
                            Như vậy, Bạn đã thấy hệ thống cấp nước trở nên giản dị và gần gũi với đời sống thường ngày của
                            chúng ta chưa?
                        </span>
                    </div>
                </div>

                <div class="content" v-if="id == 1">
                    <div class="image" style="width: 100%;max-height: 500px; overflow: hidden;">
                        <img src="/img/invoice1.jpg" style="max-width: 100vw;width: 100%;">
                    </div>
                    <div class="PageTitle">
                        <h2 class="title">Hướng dẫn tra cứu thông tin</h2>
                    </div>
                    <div class="body-content">
                        <h4>Mục đích tra cứu</h4>
                        <span class="article-text">
                            Tra cứu thông tin nhằm tìm kiếm thông tin chi tiết thanh toán tiền nước hàng tháng
                        </span>
                        <h4>Hướng dẫn</h4>
                        <div>
                            <span class="article-text">
                                Để bắt đầu tra cứu thông tin bạn cần có Mã hợp đồng. Mã hợp đồng được in trên hóa đơn thanh
                                toán thông thường bắt đầu với "HD" và một hoặc một dãy số(VD:"HD30410")
                            </span>
                        </div>
                        <span class="article-text">Nhập mã Hợp đồng của bạn vào trường sau để bắt đầu tra cứu:</span>
                        <div class="article-img" style="width: 100%;">
                            <div class="image" style="padding: 5px; background-color: rgb(213, 225, 235);">
                                <img src="/img/Articles/article-2-1-2.jpg" style="width: 100%;">
                            </div>
                        </div>
                        <span class="article-text">Đồng thời bạn cũng có thể tìm kiếm theo tình trạng thanh toán của các
                            tháng</span>
                        <div class="article-img">
                            <div style="padding: 5px; background-color: rgb(213, 225, 235);">
                                <img class="image" src="/img/Articles/article-2-3.jpg" style="width: 100%;">
                            </div>
                        </div>
                        <h4>Kết quả:</h4>
                        <div class="article-img" style="width: 100%;">
                            <div style="padding: 5px; background-color: rgb(213, 225, 235);">
                                <img class="image" src="/img/Articles/article-2-2-2.jpg" style="max-width: 500px;">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="content" v-if="id == 2">
                    <div style="width: 100%;max-height: 500px; overflow: hidden;">
                        <img class="image" src="/img/test.jpg" style="max-width: 100vw;width: 100%;">
                    </div>
                    <div class="PageTitle">
                        <h2 class="title">Chi tiết yêu cầu lắp đặt</h2>
                    </div>
                    <div class="body-content">
                        <h4>Mục đích tạo yêu cầu lắp đặt.</h4>
                        <div>
                            <span class="article-text">
                                Khi quý khách có nhu cầu lắp đặt đường ồng nước từ phía của chúng tôi, quý khách có thể tạo
                                1 phiếu yêucầu lắp đặt.
                                Sau khi tạo phiếu bạn sẽ được nhân viên của công ty chúng tôi liên hệ và thỏa thuận các điều
                                khoản hợp đồng cũng
                                như hoàn chỉnh các tông tin cần thiết cho hợp đồng.
                            </span>
                        </div>
                    </div>
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
            articles: [
            ],
            article: {},
            windowWidth: window.innerWidth
        }
    },
    computed: {
        token() {
            return this.$route.query.token
        },
        id() {
            return this.$route.query.id
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

    },
    mounted() {
    }
}
</script>
<style lang="scss" scoped>
.article-text {
    font-size: 1.2rem;
}

.article-img {
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
}
.image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.body-content {
    width: 80%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    flex-direction: column;
}


.PageTitle {
    display: flex;
    justify-content: center;

    padding: 30px 30px 20px 30px;
    text-align: center;
}

.HomePage-body {
    padding-bottom: 30px;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}



@media (max-width:700px) {}


@media(max-width:500px) {


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
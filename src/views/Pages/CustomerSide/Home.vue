<template>
    <div class="wrapper">
        <div id="Main">
            <div class="HomePage-body">
                <div class="PageHero">
                    <div class="HeroImage">
                        <div class="HeroInfo">
                            <div class="HeroTitle">
                                <h1>{{ companyName }}</h1>
                            </div>
                            <div class="HeroText">
                                <span>
                                    Thông qua hệ thống xử lý nước của mình, chúng tôi mang nước sạch đến với mọi nhà
                                </span>
                                <div class="HeroButton">
                                    <el-button type="primary" @click="ToArticle(0)">
                                        Tìm kiểu thêm
                                    </el-button>
                                    <el-button plain type="primary" @click="handleJump(1)">
                                        Tạo yêu cầu
                                    </el-button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="body-content">
                        <div class="function-group">
                            <div class="funct-card" v-for="item, index in Function" @click="handleJump(index)">
                                <div class="card-img">
                                    <img :src="item.icon" style="width: 100%; height: 300px; object-fit: cover;">
                                    <div class="card-name">
                                        <span>{{ item.Name }}</span>
                                    </div>
                                </div>
                                <div class="card-description">
                                    <span>{{ item.description }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body-content hero">
                    <div class="hero-text">
                        <div class="hero-title">
                            <h4>
                                CHÚNG TÔI CAM KẾT ĐẢM BẢO CHẤT LƯỢNG NƯỚC VÀ GIÁ THÀNH HỢP LÝ
                            </h4>
                        </div>
                        <div class="hero-descriptions">
                            Chọn dịch vụ của chúng tôi để có một dịch vụ cung cấp nước đáng tin cậy, có giá thành hợp lý.
                            Đồng thời chúng tôi cũng mong nhận đc ý kiến phản hồi của bạn để có thể tiếp tục cải thiện và
                            phát triển.
                        </div>
                        <div class="hero-parts">
                            <div class="part">
                                <i class="fa fa-star icon"></i>
                                <div class="hero-sub-title">
                                    <h5>Chất lượng</h5>
                                </div>
                                <div class="hero-sub-text">
                                    Chúng tôi xin cam kết cung cấp dịch vụ nước sạch đảm bảo chất lượng cho mọi khách
                                    hàng.
                                </div>
                            </div>
                            <div class="part">
                                <i class="fa fa-dollar-sign icon"></i>
                                <div class="hero-sub-title">
                                    <h5>Giá thành hợp lý</h5>
                                </div>
                                <div class="hero-sub-text">
                                    Chúng tôi cung cấp dịch vụ nước sạch với giá thành hợp lý mà không để ảnh hưởng đến
                                    chất lượng.
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="hero-img">
                    </div>
                </div>



                <div class="body-content" style="background-color: white;">
                    <h2 style="padding: 20px;">Bài viết</h2>
                    <div class="articles">
                        <div v-for="card, index in cards" class='article'>
                            <div class="article-info">
                                <div style="width: 100%;">
                                    <div style="width: fit-content;">
                                        <h5 @click="ToArticle(index)">{{ card.title }}</h5>
                                    </div>
                                    <div style="width: 100%;font-size: 0.8rem; color: gray;">
                                        <span class="description">{{ card.content }}</span>
                                    </div>
                                </div>
                                <div>
                                    <el-button size="large" class="button" @click="ToArticle(index)">Tìm hiểu</el-button>
                                </div>
                            </div>
                            <div class="article-image" @click="ToArticle(index)">
                                <img class="image" :src="card.image">
                            </div>
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
import Label from "../../Pages/components/Label.vue"
import { mapState } from "vuex";

export default {
    components: {
        Label,
        VueperSlides,
        VueperSlide,
    },
    data() {
        return {
            screenHeight: window.screen.height,
            slides: [
                { title: '', content: '', image: '/img/banner/banner.jpg' },
                { title: '', content: '', image: '/img/banner/banner1.jpg' },
                { title: '', content: '', image: '/img/banner/banner2.jpg' },
            ],

            cards: [
                {
                    title: 'Hệ thống nước sạch',
                    content: 'Giới thiệu chung về hệ thống xử lý lọc nước của chúng tôi',
                    image: '/img/banner/banner2.jpg'
                },
                {
                    title: 'Hướng dẫn tra cứu',
                    content: 'Hướn dẫn cách tra cứu thông tin thanh toán của người dùng',
                    image: '/img/invoice1.jpg'
                },
                {
                    title: 'Giải đáp yêu cầu lắp đặt',
                    content: 'Giải đáp 1 vài câu hỏi về yêu cầu lắp đặt',
                    image: '/img/test.jpg'
                },
            ],
            Function: [
                { Name: "TRA CỨU HÓA ĐƠN", icon: '/img/invoice.jpg', description: "Tra cứu hóa đơn tiền nước là trạng thái đóng tiền." },
                { Name: "YÊU CẦU LẮP ĐẶT", icon: '/img/installation.jpg', description: "Tạo yêu cầu lắp đặt đường ống nước đến nhà của bạn." },
                { Name: "KHẢO SÁT", icon: '/img/survey1.jpg', description: "Khảo sát dịch vụ hàng tháng." },
            ],
            windowWidth: window.innerWidth
        }
    },
    computed: {
        isMobile() {
            if (this.windowWidth <= 700) {
                return true
            }
            else {
                return false
            }
        },
        token() {
            return localStorage.getItem("token")
        },
        companyName() {
            return this.company.cTenCongTy
        },
        ...mapState({
            company: (state) => state.company.companyList,
        }),
    },
    methods: {
        handleJump(index) {
            if (index == 0)
                this.$router.push("/TraCuu?token=" + this.token).catch(() => { /* ignore */ })
            else if (index == 1)
                this.$router.push("/YeuCau?token=" + this.token).catch(() => { /* ignore */ })
            else if (index == 2)
                this.$router.push("/KhaoSat?token=" + this.token).catch(() => { /* ignore */ })
        },
        ToArticle(id) {
            this.$router.push("/Article?token=" + this.token + "&id=" + id).catch(() => { /* ignore */ })
        }
    },
}
</script>
<style lang="scss" scoped>
.PageHero {
    margin-bottom: 50px;

    .HeroImage {
        height: 600px;
        background-image: url("../../../../public/img/banner/banner2.jpg");
        background-size: cover;
        background-position: center;

        .HeroInfo {
            display: flex;
            padding: 20px 50px 20px 50px;
            justify-content: center;
            flex-wrap: nowrap;
            flex-direction: column;
            background-color: rgba(0, 0, 0, 0.555);
            height: 100%;

            .HeroTitle {
                width: 50%;

                h1 {
                    font-size: 2.5rem;
                    color: white;
                }
            }

            .HeroText {
                margin-top: 20px;
                width: 50%;
                color: white;

                .HeroButton {
                    margin-top: 20px;
                }
            }
        }
    }


}

.articles {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    //background-color: #f2f7f8;

    .article {
        width: 25%;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column-reverse;
        margin: 30px;
        background-color: aliceblue;
        box-shadow: rgba(0, 0, 0, 0.466) 2px 2px 5px 1px;

        .article-info {
            padding: 20px;
            padding-top: 10px;
            height: 200px;
            font-size: 1.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;

            h5:hover {
                color: #0245d4;
                cursor: pointer;
                transition: 0.5s ease;
            }

            h5 {
                font-size: 1.25rem;
                transition: 0.5s ease;
            }

            .description {
                display: -webkit-box;
                -webkit-line-clamp: 4;
            }
        }

        .article-image {
            height: 300px;

            .image {
                height: 100%;
                width: 100%;
                object-fit: fill;
            }
        }

        .article-image:hover {
            cursor: pointer;
        }
    }
}



.funct-card {
    background-color: white;
    margin: 10px;
    width: 30%;
    max-width: 300px !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.082);
    box-shadow: rgba(0, 0, 0, 0.466) 2px 2px 5px 1px;
    transition: all 0.2s ease;
}

.funct-card:hover {
    transition: all 0.5s ease;
    margin-top: 0;
    box-shadow: rgba(0, 0, 0, 0.212) 12px 12px 5px 1px;
    cursor: pointer;

    .card-name {
        transition: all 0.5s ease;
        background-color: #0245d4;
        color: white;
    }
}

.card-img {
    font-weight: bold;
    font-size: large;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.card-name {
    width: 80%;
    height: 50px;
    padding: 10px;
    border: 1px solid rgb(214, 214, 214);
    margin-top: -25px;
    background-color: aliceblue;
    text-align: center;
}

.card-description {
    margin-top: -25px;
    padding: 30px 20px 20px 20px;
    height: 100px;
    text-align: center;
    display: -webkit-box;
    -webkit-line-clamp: 2;
}

.function-group {
    padding: 50px 0 50px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 20px 20px 40px 20px;
}

.text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.img {
    height: 100px;
    width: 150px;
    margin-right: 10px;
    object-fit: cover;
    border-radius: 10px;
}

.HomePage-body {
    .body-content {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;

        .item {
            height: 120px;
            width: 100%;
            margin: 10px 0px 10px 0px;
            justify-content: flex-start;

            .text {
                -webkit-line-clamp: 3;
                font-size: 0.9rem;

                h4 {
                    font-size: 1.2rem;
                }
            }
        }

    }

    .hero {
        background-color: #0033a3;
        color: white;
        padding: 50px;
        align-items: center;

        .hero-img {
            display: inline-block;
            height: 0;
            padding-bottom: 35%;
            width: 40%;
            background-image: url("../../../../public/img/background/bg3.jpg");
            background-size: cover;
        }

        .hero-text {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 60%;

            .hero-title {
                width: 70%;
                margin-bottom: 10px;

                h4 {
                    font-size: 1.75rem;
                    color: white;
                }
            }

            .hero-descriptions {
                width: 90%;
            }

            .hero-parts {
                display: flex;
                justify-content: space-between;
                width: 90%;

                .part {
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 45%;

                    .icon {
                        font-size: 2rem;
                    }
                }
            }

            .hero-sub-title {
                h5 {
                    font-size: 1.25rem;
                    color: white;
                }
            }
        }

    }

    .body-part {
        display: flex;
        width: 100%;
        padding: 10px;
        justify-content: flex-start;
        align-items: flex-start;
        background-color: white;
        overflow: hidden;
        text-overflow: ellipsis;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.212) 0px 0px 20px;
    }

    .body-part:hover {
        cursor: pointer;
        /*         transition: all 0.5s ease;
        background-color: #97FEED; */
    }
}

@media(max-width:700px) {

    .PageHero {
        .HeroImage {

            .HeroInfo {
                display: flex;
                flex-direction: column;
                padding: 5px;

                .HeroTitle {
                    width: 100%;
                    margin-bottom: 20px;

                    h1 {
                        font-size: 2.5rem;
                    }
                }

                .HeroText {
                    width: 100%;
                }
            }
        }


    }

    .HomePage-body {
        .hero {
            color: white;
            padding: 20px;
            align-items: center;
            text-align: justify;

            flex-direction: column-reverse;

            .hero-img {
                height: 0;
                padding-bottom: 55%;
                width: 100%;
                margin-bottom: 20px;
            }

            .hero-text {
                width: 100%;

                .hero-title {
                    width: 100%;
                    margin-bottom: 10px;
                    text-align: left;

                    h4 {
                        font-size: 1.25rem;
                        color: white;
                    }
                }

                .hero-descriptions {
                    width: 100%;

                }

                .hero-parts {
                    width: 100%;
                    flex-direction: column;

                    .part {
                        align-items: center;
                        justify-content: center;
                        width: 100%;

                        .icon {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }

                .hero-sub-title {
                    h5 {
                        font-size: 1.1rem;
                    }
                }
            }

        }
    }



    .articles {
        flex-direction: column-reverse !important;
        justify-content: flex-end;

        .article {
            width: 100%;
        }

        .article-image {
            height: 300px;
            width: 100%;
        }

        .article-info {
            width: 100%;
        }
    }

    .img {
        width: 100px;
    }

    .function-group {
        flex-wrap: wrap;
        flex-direction: row;
    }

    .funct-card {
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .item0 {
        width: 100% !important;
        height: 290px !important;
        margin-bottom: 20px;
        overflow: hidden;

        .body-part {
            height: 290px;
            max-height: 290px;
        }

        .text {
            -webkit-line-clamp: 3 !important;
        }
    }

    .item12 {
        width: 100% !important;

        .text {
            -webkit-line-clamp: 3
        }
    }
}
</style>
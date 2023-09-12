<template>
    <div class="wrapper">
        <div id="Main">
            <div class="HomePage-body">

                <div class="body-content">
                    <el-form ref="sizeForm" :rules="rules" :show-message="false" :model="sizeForm" label-width="150px"
                        size="mini" class="survey-form">
                        <div class="PageTitle">
                            <h2>KHẢO SÁT</h2>
                            <span class="note">( Mỗi khách hàng chỉ được gửi 1 đơn khảo sát mỗi tháng )</span>
                        </div>
                        <div class="info-input">
                            <el-form-item class="test1" label="Tên khách hàng:" prop="name">
                                <el-input v-model="sizeForm.name"></el-input>
                            </el-form-item>
                            <el-form-item class="test1" label="Mã hợp đồng:" prop="orderID">
                                <el-input v-model="sizeForm.orderID"></el-input>
                            </el-form-item>
                        </div>
                        <div class="questions">
                            <div class="question" v-for="item, index in questions">
                                <h5 class="question-title">{{ (index + 1) + "." + item.c_noi_dung_cau_hoi }}</h5>
                                <div v-if="item.n_loai_cau_hoi == 0">
                                    <div style="padding-bottom: 10px;">
                                        <el-input type="textarea" v-model="answers[index]"
                                            placeholder="Nhập câu trả lời..."></el-input>
                                    </div>
                                </div>
                                <div v-if="item.n_loai_cau_hoi == 1">
                                    <div>
                                        <el-radio-group v-model="answers[index]" class="ml-4 options">
                                            <el-radio label="-2" size="large">Rất tệ</el-radio>
                                            <el-radio label="-1" size="large">Tệ</el-radio>
                                            <el-radio label="0" size="large">Bình thường</el-radio>
                                            <el-radio label="1" size="large">Tốt</el-radio>
                                            <el-radio label="2" size="large">Rất tốt</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div v-if="item.n_loai_cau_hoi == 2">
                                    <el-radio-group v-model="answers[index]" class="ml-4 options">
                                        <el-radio label="1" size="large">Có</el-radio>
                                        <el-radio label="0" size="large">Không</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>

                        <div
                            style="width: 100%; display: flex; align-items: center;justify-content: center; padding-top: 20px;">
                            <el-button type="success" @click="handleSubmit">Gửi</el-button>
                        </div>
                    </el-form>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    data() {
        return {
            questions: [],
            rules: {
                name: [{ required: true }],
                orderID: [{ required: true }],
            },
            sizeForm: {
                name: "",
                orderID: "",

            },
            answers: []

        }
    },
    computed: {

    },
    methods: {
        delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },
        handleSubmit() {
            console.log(moment(new Date()).format("DD/MM/YYYY"))
            console.log(typeof moment(new Date()).format("DD/MM/YYYY"))
            this.$refs.sizeForm.validate((valid) => {
                if (valid) {
                    let answersSet = []
                    for (let i = 0; i < this.answers.length; i++) {
                        answersSet[i] = {
                            questionID: this.questions[i].n_ma_cau_hoi_hd,
                            answer: this.answers[i]
                        }
                    }
                    let pageRequest = {
                        columnFilters: {
                            name: { value: this.sizeForm.name },
                            orderID: { value: this.sizeForm.orderID },
                            Answers: { value: JSON.stringify(answersSet) },
                            CompanyID: { value: localStorage.getItem("CompanyID") },
                            submitDate: { value: moment(new Date()).format("DD/MM/YYYY") }
                        }
                    }
                    this.$api.question.createAnswer(pageRequest).then(res => {
                        if (res.code == 200) {
                            this.$message({ message: res.msg, type: 'success' });
                            this.answers = []
                            this.$refs["sizeForm"].resetFields();
                        } else {
                            this.$message({ message: res.msg, type: 'error' });
                        }
                    })
                }
            })
        },
        handleFindpage() {
            this.delay(200).then(() => {
                let pageRequest = {
                    columnFilters: {
                        CID: { value: localStorage.getItem("CompanyID") },
                        Type: { value: "-1" },
                        Status: { value: "2" }
                    },
                    pageNum: this.pageNum,
                    pageSize: this.pageSize
                }

                this.$api.question.findPageQuestion(pageRequest).then(res => {
                    if (res.code == 200) {
                        this.questions = res.data.content
                    }

                })
            })
        }
    },
    mounted() {
        this.handleFindpage()
    }
}

</script>
<style lang="scss" scoped>
.questions {
    padding: 0px 20px 0px 20px
}

.note {
    color: #80808075;
    font-weight: 600;
    font-style: italic;
    font-size: 0.8rem;
}

.info-input {
    width: 90%;
}

.row-header {
    width: 25%;
}

th {
    min-width: 130px;
    padding: 5px 10px 5px 10px;
    border: 1px solid black;
    background-color: aliceblue;
}

td {
    min-width: 130px;
    padding: 5px 10px 5px 10px;
    border: 1px solid black;
}

.survey-form {
    background-color: aliceblue;
    width: 80%;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.37) 1.95px 1.95px 2.6px;
    padding: 20px;

    .survey-table {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.column {
    width: 15%;
    text-align: center;
}

.body-content {
    padding-top: 30px;
    min-height: 400px;
    display: flex;
    justify-content: center;
}

.HomePage-body {
    padding-bottom: 30px;
}

.PageTitle {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    padding: 0px 0 20px 0
}

@media(max-width:850px) {
    th {
        font-size: 0.7rem;
        min-width: 50px;
    }

    td {
        font-size: 0.7rem;
        min-width: 50px;
    }

    .row-header {
        text-align: center;
    }

    .survey-form {
        width: 90%;
    }
}

@media (max-width:600px) {
    .HomePage-body{
        background-color: aliceblue;
    }
    h2 {
        font-size: 1.5rem;
    }

    .questions {
        padding: 0;
    }

    .note {
        font-size: 0.7rem;
        margin: 0 -10px 0 -10px;
    }

    .question-title {
        font-size: 1.1rem;
    }

    .options {
        display: flex;
        flex-direction: column;
    }

    .survey-form {
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: 10px;
        box-shadow: none;
        width: 100%;
    }
}
</style>

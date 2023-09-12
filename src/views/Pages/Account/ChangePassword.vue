<template>
    <div class="wrapper m-2">
        <div class="flex">
            <div class="PCBox">
                <div class="PCHeader">
                    Sửa mật khẩu
                </div>
                <div class="PCBody">
                    <el-form
                    :model="dataForm"
                    :rules="dataRule"
                    ref="dataForm" 
                    size="mini"
                    label-width="200px">
                        <el-form-item label="Mật khẩu cũ:" prop="oldPassword">    
                                <el-input v-model="dataForm.oldPassword" type="password" show-password></el-input>    
                        </el-form-item>
                        <el-form-item label="Mật khẩu mới:" prop="newPassword">
                                <el-input v-model="dataForm.newPassword" type="password" show-password></el-input>    
                        </el-form-item>
                        <el-form-item label="Xác nhận mật khẩu mới:" prop="confirmPassword">    
                                <el-input v-model="dataForm.confirmPassword" type="password" show-password></el-input>    
                        </el-form-item>
                    </el-form>
                </div>
                <div class="PCFooter">
                    <el-button size="small" @click="handleConfirm" type="primary">Xác nhận</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
        dataForm:{
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
        },
        dataRule:{
            oldPassword:[{required: true, message:'Xin vui lòng nhập mật khẩu cũ', trigger:"blur"}],
            newPassword:[{validator:this.validator1, required: true, trigger:"blur"}],
            confirmPassword:[{validator:this.validator2, required: true, trigger:"blur"}],
        }
        }
    },
    computed:{
    },
    methods:{
        validator1(rule,value,callback){
            if (value === '') {
                callback(new Error('Xin vui lòng nhập xác nhận mật khẩu mới'))
            } /* else if (value.length <8) {
                callback(new Error("Mật khẩu phài dài ít nhất 8 ký tự"))
            } */ else {
                callback()
            }
        },
        validator2(rule,value,callback){
            if (value === '') {
                callback(new Error('Xin vui lòng nhập xác nhận mật khẩu'))
            } else if (value !== this.dataForm.newPassword) {
                callback(new Error("Xác nhận mật khẩu không khớp với mật khẩu mới"))
            } else {
                callback()
            }
        },
        handleConfirm(){
            this.$refs.dataForm.validate((valid) =>{
                try{
                    if(valid){
                        this.$confirm("Xác nhận thay đổi mật khẩu", "Thông báo", {
                            confirmButtonText: "Đồng ý",
                            cancelButtonText: "Hủy bỏ",
                            type: "warning",
                        }).then(()=> {
                            this.$api.account.changePasswordSelf(this.dataForm).then(res =>{
                                if(res.code==200){
                                    this.$message({
                                        message: "Đổi mật khẩu thành công",
                                        type: "success",
                                    });
                                    this.dataForm={
                                        oldPassword:'',
                                        newPassword:'',
                                        confirmPassword:'',
                                    }
                                }
                                else{
                                    this.$message({
                                        message: "Đổi mật khẩu không thành công, "+res.msg,
                                        type: "error",
                                    });
                                }
                            })
                        })
                    }
                    
                }catch (ex) {
                console.log(ex);
                }
            })
            
        }
    },
    mounted(){
    }

}

</script>
<style lang="scss" scoped>
.password::before{
    color: red;
    content: "*";
}
.PCBox{
width: 600px;
border-radius: 10px;
border: 1px solid gray;
padding: 10px;
overflow: hidden;
.PCHeader{
    padding:10px 0 10px 0;
    text-align: center;
    font-weight: bold;
    margin: -10px -10px 0 -10px;
    border-bottom: 1px solid #ced4da;
}
.PCBody{
    padding:10px 10px 0 10px
}
.PCFooter{
    border-top: 1px solid #ced4da;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 -10px -10px -10px;
    padding: 10px 0 10px 0;
    background-color:#e9ecef;
}
}
.flex{
    margin-top: 20px;
    display:flex;
    align-items:center;
    justify-content: center;
}
</style>
<template>
    <div class="login_bg">
        <div class="login_box">
            <h2>用户登录</h2>
            <el-form label-position="top" ref="loginFormRef" :rules="rules" label-width="80px" :model="formData">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-button type="primary" class="" @click="handleLogin">登录</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            formData: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleLogin(){
            this.$refs.loginFormRef.validate(async val=>{
                if(!val) return;
                const {data:res} =await this.$http.post('login',this.formData);
                console.log(res)
                if(res.meta.status !==200){
                    this.$message.error('登录失败');
                }else{
                    this.$message({
                        showClose: true,
                        message: '登录成功',
                        duration: 1000,
                        type: 'success'
                    });
                    //保存token
                    window.sessionStorage.setItem('token',res.data.token)
                    //跳转到home
                    this.$router.push('/Home')
                }
            })
            // this.$http.post('login',this.formData).then(res=>{
            //     console.log(res)
            // })
        }
    }
}
</script>

<style lang="less" scoped>
h2{
    font-size: 20px;
    text-align: center;
    margin: 0 0 20px;
}
.login_bg{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3d566f;
}
.login_box{
    width: 330px;
    box-sizing: border-box;
    padding:20px;
    background: #fff;
    box-shadow: 0 0 12px rgba(0,0,0,.3);
    border-radius: 5px;
    margin-bottom: 30px;
    .el-button--primary{
        width: 100%;
    }
}

</style>
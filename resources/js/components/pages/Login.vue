<template>
    <div class="login-panel">
        <h1>ログイン</h1>
        <el-form :model="loginForm" ref="loginForm" :rules="rules">
            <el-form-item label="ログインID" prop="loginId">
                <el-input type="text" v-model="loginForm.loginId" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="パスワード" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleLogin">ログイン</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            rules: {
                loginId: [
                    { required: true, message: '必ず入力してください。' },
                    { max: 30, message: '30文字以内で入力してください。' }
                ],
                password: [
                    { required: true, message: '必ず入力してください。' },
                    { max: 30, message: '30文字以内で入力してください。' }
                ],
            },
            loginForm: {
                loginId: 'admin',
                password: '123456'
            }
        }
    },
    methods: {
        handleLogin() {
            this.$refs['loginForm'].validate((valid) => {
                // バリデーションエラーがなかったら保存
                if (valid) {
                    this.$store.dispatch('auth/login', {
                        loginId: this.loginForm.loginId,
                        password: this.loginForm.password
                    }).then(res => {
                        if (res === true) {
                            this.$router.push({path: '/'});
                        } else {
                            this.$notify({
                                title: 'エラー',
                                message: 'ログインに失敗しました。',
                                type: 'error'
                            });
                        }
                    });
                }
            });
        }
    }
}
</script>

<style>
.login-panel {
    width: 500px;
    margin: 0 auto;
}
</style>
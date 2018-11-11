<template>
    <div class="login-panel">
        <h1>ログイン</h1>
        <el-form>
            <el-form-item label="メールアドレス">
                <el-input type="email" v-model="email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="パスワード">
                <el-input type="password" v-model="password" autocomplete="off"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleLogin">ログイン</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
        return {
            email: 'admin@example.com',
            password: '123456',
        }
    },
    methods: {
        handleLogin() {
            this.$store.dispatch('auth/login', {
                email: this.email,
                password: this.password
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
    }
}
</script>

<style>
.login-panel {
    width: 500px;
    margin: 0 auto;
}
</style>
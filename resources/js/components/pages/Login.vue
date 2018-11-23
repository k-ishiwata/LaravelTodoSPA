<template>
    <div class="login-panel">
        <h1>ログイン</h1>
        <el-form>
            <el-form-item label="ユーザーネーム">
                <el-input type="text" v-model="name" autocomplete="off"></el-input>
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
            name: 'admin',
            password: '123456',
        }
    },
    methods: {
        handleLogin() {
            this.$store.dispatch('auth/login', {
                name: this.name,
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
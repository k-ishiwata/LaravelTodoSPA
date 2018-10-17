<template>
    <div>
        <form @submit.prevent="login">
            <h1>ログイン</h1>
            メールアドレス: <input type="email" v-model="email">
            パスワード: <input type="password" v-model="password">
            <button type="submit" class="btn btn-primary">ログイン</button>
        </form>
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
            login() {
                this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
</script>

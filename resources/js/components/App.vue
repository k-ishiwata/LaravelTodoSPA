<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div v-bind:class="'alert alert-' + alertType" v-if="alertMessage">{{ alertMessage }}</div>
                <ul>
                    <li><router-link to="/">ホーム</router-link></li>
                    <li><router-link to="/tasks">タスク</router-link></li>
                    <li v-if="!isLogin"><router-link to="/login">ログイン</router-link></li>
                    <li v-if="isLogin"><router-link to="/user">ユーザー情報</router-link></li>
                    <li @click="logout" v-if="isLogin">ログアウト</li>
                </ul>
                <hr>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex';

    export default {
        computed: {
            ...mapState('alert', {
                'alertMessage': 'message',
                'alertType': 'type'
            }),
            ...mapGetters('auth', [
                'isLogin'
            ])
        },
        /*
        computed: {
            // ...mapGetters('auth', [
            //     'alert'
            // ])

            // alert() {
            //     return this.$store.getters['auth/alert'];
            // }
        },
        */
        methods: mapActions('auth', [
            'logout'
        ])
    }
</script>

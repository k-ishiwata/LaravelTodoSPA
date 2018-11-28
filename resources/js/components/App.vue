<template>
    <div class="container">
        <el-menu :default-active="activeIndex"
                 class="el-menu"
                 mode="horizontal"
                 v-if="$route.path !== '/login'">
            <el-menu-item index="1"><router-link to="/">ダッシュボード</router-link></el-menu-item>
            <el-menu-item index="2"><router-link to="/tasks">タスク</router-link></el-menu-item>
            <el-menu-item index="4"><router-link to="/users">ユーザー</router-link></el-menu-item>
            <el-submenu index="5" class="nav-user">
                <template slot="title"><i class="el-icon-menu"></i></template>
                <el-menu-item index="5-1"><router-link to="/me">ユーザー情報</router-link></el-menu-item>
                <el-menu-item index="5-2" @click="handleLogout" icon="el-icon-share">ログアウト</el-menu-item>
            </el-submenu>
        </el-menu>
        <router-view class="main"></router-view>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        data() {
            return {
                activeIndex: '1'
            }
        },
        computed: {
            ...mapGetters('auth', [
                'isLogin'
            ])
        },
        methods: {
            handleLogout() {
                this.$store.dispatch('auth/logout').then(res => {
                    if (res === true) {
                        this.$router.push({path: '/login'});
                    } else {
                        this.$notify({
                            title: 'エラー',
                            message: 'ログアウトに失敗しました。',
                            type: 'error'
                        });
                    }
                });
            }
        }
    }
</script>

<style>
    .nav-user.el-submenu {
        float: right;
    }
</style>
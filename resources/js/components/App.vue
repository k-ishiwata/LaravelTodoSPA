<template>
    <div class="container">
        <!-- メニューはログイン画面では表示しない -->
        <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            :router="true"
            class="el-menu"
            v-if="$route.path !== '/login'">
            <el-menu-item index="dashboard" :route="{ name:'dashboard' }">ダッシュボード</el-menu-item>
            <el-menu-item index="tasks" :route="{ name:'tasks' }">タスク</el-menu-item>
            <el-menu-item index="projects" :route="{ name:'projects' }">プロジェクト</el-menu-item>
            <el-menu-item index="users" :route="{ name:'users' }">ユーザー</el-menu-item>
            <el-submenu index="5" class="nav-user">
                <template slot="title"><i class="el-icon-menu"></i></template>
                <el-menu-item index="me" :route="{ name:'me' }">ユーザー情報</el-menu-item>
                <el-menu-item index="logout"  @click="handleLogout" icon="el-icon-share">ログアウト</el-menu-item>
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
                activeIndex: ''
            }
        },
        mounted() {
            // 読み込まれたページをアクティブ
            this.activeIndex = this.$route.name;
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
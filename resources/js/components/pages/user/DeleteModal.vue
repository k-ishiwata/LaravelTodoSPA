<template>
    <el-dialog
            title="削除確認"
            :visible.sync="$parent.isDeleteModal"
            width="30%">
        <span>タスクID:{{ deleteUser.id }}を削除しますか？</span>
        <span slot="footer" class="dialog-footer">
                <el-button @click="$parent.isDeleteModal = false">キャンセル</el-button>
                <el-button type="primary" @click="handleDalete">削除</el-button>
            </span>
    </el-dialog>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                deleteUser: {}
            }
        },
        methods: {
            ...mapActions('user', [
                'delete'
            ]),
            setUser(user) {
                this.deleteUser = user;
            },
            // 削除
            handleDalete() {
                this.delete(this.deleteUser).then(res => {
                    if(res === true) {
                        this.$notify({
                            title: '成功',
                            message: 'ユーザーを削除しました。',
                            type: 'success'
                        });
                    } else {
                        this.$notify({
                            title: 'エラー',
                            message: 'ユーザーの削除に失敗しました。',
                            type: 'error'
                        });
                    }
                });
                this.$parent.isDeleteModal = false;
            },
        }
    }
</script>

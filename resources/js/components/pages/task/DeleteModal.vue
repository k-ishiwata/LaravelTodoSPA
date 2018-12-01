<template>
    <el-dialog
            title="削除確認"
            :visible.sync="$parent.isDeleteModal"
            width="30%">
        <span>タスクID:{{ deleteTask.id }}を削除しますか？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$parent.isDeleteModal = false">キャンセル</el-button>
            <el-button type="primary" @click="handleDelete">削除</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                deleteTask: {}
            }
        },
        methods: {
            ...mapActions('task', [
                'delete'
            ]),
            setTask(task) {
                this.deleteTask = task;
            },
            // 削除
            handleDelete() {
                this.delete(this.deleteTask).then(res => {
                    if(res === true) {
                        this.$notify({
                            title: '成功',
                            message: 'タスクを削除しました。',
                            type: 'success'
                        });
                    } else {
                        this.$notify({
                            title: 'エラー',
                            message: 'タスクの削除に失敗しました。',
                            type: 'error'
                        });
                    }
                });
                this.$parent.isDeleteModal = false;
            },
        }
    }
</script>

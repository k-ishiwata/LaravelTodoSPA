<template>
    <el-dialog
            title="削除確認"
            :visible.sync="$parent.isDeleteModal"
            width="30%">
        <span>タスクID:{{ deleteProject.id }}を削除しますか？</span>
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
                deleteProject: {}
            }
        },
        methods: {
            ...mapActions('project', [
                'delete'
            ]),
            setProject(project) {
                this.deleteProject = project;
            },
            // 削除
            handleDelete() {
                this.delete(this.deleteProject).then(res => {
                    if(res === true) {
                        this.$notify({
                            title: '成功',
                            message: 'プロジェクトを削除しました。',
                            type: 'success'
                        });
                    } else {
                        this.$notify({
                            title: 'エラー',
                            message: 'プロジェクトの削除に失敗しました。',
                            type: 'error'
                        });
                    }
                });
                this.$parent.isDeleteModal = false;
            },
        }
    }
</script>

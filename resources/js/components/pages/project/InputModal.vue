<template>
    <el-dialog title="プロジェクトの編集" :visible.sync="$parent.isInputModal">
        <el-form :model="editProject" status-icon ref="editProject" :rules="rules" label-width="120px">
            <el-form-item label="タイトル" prop="title">
                <el-input
                    v-model="editProject.title"
                    name="editProject.title"
                    autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$parent.isInputModal = false">キャンセル</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        data () {
            return {
                editProject: {},
                rules: {
                    title: [
                        { required: true, message: '必ず入力してください。', trigger: 'blur' },
                        { max: 100, message: '100文字以内で入力してください。' }
                    ],
                },
            }
        },
        methods: {
            ...mapActions('project', [
                'store', 'update'
            ]),
            setProject(project) {
                this.editProject = Object.assign({}, project);
            },
            // 保存
            handleSave() {
                this.$refs['editProject'].validate((valid) => {
                    // バリデーションエラーがなかったら保存
                    if (valid) {
                        // idがあったらupdateなければstore
                        if (this.editProject.id) {
                            this.update(this.editProject).then(res => {
                                if(res === true) {
                                    this.$notify({
                                        title: '成功',
                                        message: 'プロジェクトを更新しました。',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify({
                                        title: 'エラー',
                                        message: 'プロジェクトの更新に失敗しました。',
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            this.store(this.editProject).then(res => {
                                if(res === true) {
                                    this.$notify({
                                        title: '成功',
                                        message: 'プロジェクトを追加しました。',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify({
                                        title: 'エラー',
                                        message: 'プロジェクトの追加に失敗しました。',
                                        type: 'error'
                                    });
                                }
                            });
                        }
                        this.$parent.isInputModal = false;
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>

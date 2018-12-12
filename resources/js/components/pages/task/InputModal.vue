<template>
    <el-dialog title="タスクの編集" :visible.sync="$parent.isInputModal">
        <el-form :model="editTask" status-icon ref="editTask" :rules="rules" label-width="120px">
            <el-form-item label="タイトル" prop="title">
                <el-input
                    v-model="editTask.title"
                    name="editTask.title"
                    autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="状態">
                <el-select v-model="editTask.state_id">
                    <el-option
                        v-for="(item, index) in $parent.status"
                        :key="index"
                        :label="item.name"
                        :value="index">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="期日">
                <el-date-picker
                    v-model="editTask.due_at"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="担当">
                <el-select v-model="editTask.user_id" clearable>
                    <el-option
                        v-for="item in getSingleUsers"
                        :key="item.index"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="プロジェクト">
                <el-select v-model="editTask.project_id" clearable>
                    <el-option
                            v-for="item in getProjects"
                            :key="item.index"
                            :label="item.title"
                            :value="item.id">
                    </el-option>
                </el-select>
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
                editTask: {},
                rules: {
                    title: [
                        { required: true, message: '必ず入力してください。', trigger: 'blur' },
                        { max: 100, message: '100文字以内で入力してください。' }
                    ],
                },
            }
        },
        computed: {
            ...mapGetters('user', [
                'getSingleUsers'
            ]),
            ...mapGetters('project', [
                'getProjects'
            ])
        },
        methods: {
            ...mapActions('task', [
                'store', 'update'
            ]),
            setTask(task) {
                this.editTask = Object.assign({}, task);
            },
            // 保存
            handleSave() {
                this.$refs['editTask'].validate((valid) => {
                    // バリデーションエラーがなかったら保存
                    if (valid) {
                        // idがあったらupdateなければstore
                        if (this.editTask.id) {
                            this.update(this.editTask).then(res => {
                                if(res === true) {
                                    this.$notify({
                                        title: '成功',
                                        message: 'タスクを更新しました。',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify({
                                        title: 'エラー',
                                        message: 'タスクの更新に失敗しました。',
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            this.store(this.editTask).then(res => {
                                if(res === true) {
                                    this.$notify({
                                        title: '成功',
                                        message: 'タスクを追加しました。',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify({
                                        title: 'エラー',
                                        message: 'タスクの追加に失敗しました。',
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

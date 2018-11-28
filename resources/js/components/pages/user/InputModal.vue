<template>
    <el-dialog title="ユーザーの編集" :visible.sync="$parent.isInputModal">
        <el-form :model="editUser" ref="editUser" :rules="rules" label-width="120px">
            <el-form-item label="メールアドレス" prop="email">
                <el-input
                        v-model="editUser.email"
                        name="editUser.email"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="ログインID" prop="login_id">
                <el-input
                        v-model="editUser.login_id"
                        name="editUser.login_id"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="名前" prop="name">
                <el-input
                        v-model="editUser.name"
                        name="editUser.name"
                        autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="パスワード" prop="password">
                <el-input
                        v-model="editUser.password"
                        name="editUser.password"
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
    import { mapActions } from 'vuex'

    export default {
        data () {
            return {
                editUser: {},
                rules: {
                    login_id: [
                        { required: true, message: '必ず入力してください。', trigger: 'blur' },
                        { max: 30, message: '30文字以内で入力してください。' }
                    ],
                    name: [
                        { required: true, message: '必ず入力してください。', trigger: 'blur' },
                        { max: 10, message: '10文字以内で入力してください。' }
                    ],
                    password: [
                        { required: true, message: '必ず入力してください。', trigger: 'blur' },
                        { max: 30, message: '30文字以内で入力してください。' }
                    ],
                },
            }
        },
        methods: {
            ...mapActions('user', [
                'store', 'update'
            ]),
            setUser(user) {
                this.editUser = Object.assign({}, user);
            },
            // 保存
            handleSave() {
                this.$refs['editUser'].validate((valid) => {
                    if (valid) {
                        // idがあったら更新なければ新規
                        if (this.editUser.id) {
                            this.update(this.editUser).then(res => {
                                if(res === true) {
                                    this.$notify({
                                        title: '成功',
                                        message: 'ユーザーを更新しました。',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify({
                                        title: 'エラー',
                                        message: 'ユーザーの更新に失敗しました。',
                                        type: 'error'
                                    });
                                }
                            });
                        } else {
                            this.store(this.editUser).then(res => {
                                if (res === true) {
                                    this.$notify({
                                        title: '成功',
                                        message: 'ユーザーを追加しました。',
                                        type: 'success'
                                    });
                                } else {
                                    this.$notify({
                                        title: 'エラー',
                                        message: 'ユーザーの追加に失敗しました。',
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

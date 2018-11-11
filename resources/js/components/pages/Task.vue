<template>
    <div>
        <el-row justify="space-between">
            <el-col :span="22">
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handleAddModal()" style="width: 100%;">追加</el-button>
            </el-col>
        </el-row>
        <el-table :data="getTasks" :row-key="row => row.id" border stripe size="small">
            <el-table-column prop="id" label="ID" width="60" sortable></el-table-column>
            <el-table-column label="状態" prop="state_id" width="100" sortable>
                <template slot-scope="scope">
                    <span class="tag" :style="{ background: status[scope.row.state_id].color }">
                        {{ status[scope.row.state_id].name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="タイトル" width="320"></el-table-column>
            <el-table-column prop="due_at" label="期日" width="180" sortable></el-table-column>
            <el-table-column prop="user_id" :formatter="userFormatter" label="担当" width="100" sortable></el-table-column>
            <el-table-column label="アクション" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEditModal(scope.row)" icon="el-icon-edit-outline">編集</el-button>
                    <el-button size="mini" type="danger" @click="handleDaleteModal(scope.row)" icon="el-icon-delete">削除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="タスクの編集" :visible.sync="isInputModal">
            <el-form ref="form" :model="newTask" label-width="120px">
                <el-form-item label="タイトル">
                    <el-input v-model="newTask.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状態">
                    <el-select v-model="newTask.state_id">
                        <el-option
                            v-for="(item, index) in status"
                            :key="index"
                            :label="item.name"
                            :value="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="期日">
                    <el-date-picker
                            v-model="newTask.due_at"
                            type="datetime"
                            value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="担当">
                    <el-select v-model="newTask.user_id" clearable>
                        <el-option
                            v-for="item in getUsers"
                            :key="item.index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isInputModal = false">キャンセル</el-button>
                <el-button type="primary" @click="handleSave(newTask)">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="削除確認"
            :visible.sync="isDeleteModal"
            width="30%">
            <span>タスクID:{{ deleteTask.id }}を削除しますか？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isDeleteModal = false">キャンセル</el-button>
                <el-button type="primary" @click="handleDalete(deleteTask)">削除</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                isInputModal: false,
                isDeleteModal: false,
                newTask: {},
                deleteTask: {},
                // status: ['未着手','実行中', '完了'],
                status: [{
                    name: '未着手',
                    color: '#999'
                },{
                    name: '実行中',
                    color: '#E6A23C'
                }, {
                    name: '完了',
                    color: '#67C23A'
                }],
            }
        },
        computed: {
            ...mapGetters('user', [
                'getUsers', 'getUserById'
            ]),
            ...mapGetters('task', [
                'getTasks'
            ]),
        },

        mounted() {
            this.fetch();
        },
        methods: {
            ...mapActions('task', [
                'fetch', 'store', 'update', 'delete'
            ]),
            // 保存
            handleSave(task) {
                // idがあったらupdateなければstore
                if (task.id) {
                    this.update(task).then(res => {
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
                    this.store(task).then(res => {
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
                this.isInputModal = false;
            },
            // 新規作成モーダル
            handleAddModal() {
                this.newTask = {};
                this.isInputModal = true;
            },
            // 編集モーダル
            handleEditModal(task) {
                console.log(task);

                this.newTask = Object.assign({}, task);
                this.isInputModal = true;
            },
            // 削除
            handleDaleteModal(task) {
                this.deleteTask = task;
                this.isDeleteModal = true;
            },
            handleDalete(task) {
                this.delete(task).then(res => {
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
                this.isDeleteModal = false;
            },
            statusFormatter(row, column) {
                return this.status[row.state_id];
            },
            userFormatter (row, column) {
                return this.getUserById(row.user_id);
            }
        }
    }
</script>

<style>
    .el-row {
        margin-bottom: 15px;
    }
</style>
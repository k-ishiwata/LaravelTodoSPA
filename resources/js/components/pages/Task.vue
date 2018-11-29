<template>
    <div>
        <el-row justify="space-between">
            <el-col :span="22">
                <el-form :inline="true" class="search-form">
                    <el-form-item>
                        <el-input
                            v-model="filterQuery.title"
                            size="small"
                            placeholder="タイトル"
                            @change="handleChangeQuery"
                            clearable></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-select
                           v-model="filterQuery.state_id"
                           size="small"
                           placeholder="状態"
                           @change="handleChangeQuery"
                           clearable>
                            <el-option
                                v-for="(item, index) in status"
                                :key="index"
                                :label="item.name"
                                :value="index">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-select
                            v-model="filterQuery.user_id"
                            size="small"
                            placeholder="担当"
                            @change="handleChangeQuery"
                            clearable>
                            <el-option
                                v-for="item in getUsers"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-date-picker
                            v-model="filterQuery.created_at"
                            size="small"
                            type="date"
                            placeholder="登録日"
                            @change="handleChangeQuery">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handleAddModal()" style="width: 100%;">追加</el-button>
            </el-col>
        </el-row>
        <el-table v-if="filteredTasks.length > 0" :data="filteredTasks" :row-key="row => row.id" border stripe size="small">
            <el-table-column prop="id" label="ID" width="60" sortable></el-table-column>
            <el-table-column label="状態" prop="state_id" width="100" sortable>
                <template slot-scope="scope">
                    <span class="tag" :style="{ background: status[scope.row.state_id].color }">
                        {{ status[scope.row.state_id].name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="タイトル"></el-table-column>
            <el-table-column prop="due_at" :formatter="dateTimeFormatter" label="期日" sortable></el-table-column>
            <el-table-column prop="user_id" :formatter="userFormatter" label="担当" width="100" sortable></el-table-column>
            <el-table-column prop="created_at" :formatter="dateTimeFormatter" label="登録日" sortable></el-table-column>
            <el-table-column label="アクション" fixed="right" width="190">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleEditModal(scope.row)" icon="el-icon-edit-outline">編集</el-button>
                    <el-button size="mini" type="danger" @click="handleDaleteModal(scope.row)" icon="el-icon-delete">削除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div v-else>
            データはありません。
        </div>

        <el-dialog title="タスクの編集" :visible.sync="isInputModal">
            <el-form :model="newTask" status-icon ref="newTask" :rules="rules" label-width="120px">
                <el-form-item label="タイトル" prop="title">
                    <el-input
                        v-model="newTask.title"
                        name="newTask.title"
                        autocomplete="off"></el-input>
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
    import dayjs from 'dayjs';
    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                rules: {
                    title: [
                        { required: true, message: 'タイトルは必ず入力してください。', trigger: 'blur' },
                        { max: 100, message: '100文字以内で入力してください。' }
                    ],
                },
                filterQuery: {
                    title: "",
                    state_id: "",
                    user_id: "",
                    created_at: null
                },
                isInputModal: false,
                isDeleteModal: false,
                newTask: {},
                deleteTask: {},
                status: [{
                    name: '未着手',
                    color: '#999'
                },{
                    name: '進行中',
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
                'getTasks', 'filteredTasks'
            ]),
        },
        mounted() {
            this.userFetch();
            this.fetch();
            this.setFilterQuery(this.filterQuery);
        },
        beforeDestroy() {
            this.allDelete();
        },
        methods: {
            ...mapActions('task', [
                'fetch', 'store', 'update', 'delete'
            ]),
            ...mapMutations('task', [
                'allDelete', 'setFilterQuery'
            ]),
            ...mapActions('user', {
                userFetch: 'fetch'
            }),
            // 保存
            handleSave(task) {
                this.$refs['newTask'].validate((valid) => {
                    // バリデーションエラーがなかったら保存
                    if (valid) {
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
                    } else {
                        return false;
                    }
                });
            },
            // 新規作成モーダル
            handleAddModal() {
                this.newTask = {};
                this.isInputModal = true;
            },
            // 編集モーダル
            handleEditModal(task) {
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
            handleChangeQuery() {
                this.setFilterQuery(this.filterQuery);
            },
            statusFormatter(row, column) {
                return this.status[row.state_id];
            },
            userFormatter (row, column) {
                return this.getUserById(row.user_id);
            },
            dateFormatter (row, col) {
                return dayjs(row.created_at).format('YY/MM/DD');
            },
            dateTimeFormatter (row, col) {
                if (row[col.property]) {
                    return dayjs(row[col.property]).format('YY/MM/DD HH:mm');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .search-form {
        .el-form-item {
            margin-bottom: 10px;
        }
    }
</style>
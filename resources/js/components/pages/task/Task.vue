<template>
    <div>
        <el-row justify="space-between" class="table-head">
            <el-col :span="22">
                <search-form :status="status" :users="getSingleUsers" :projects="getProjects"></search-form>
            </el-col>
            <el-col :span="2">
                <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="handleOpenInputModal()" style="width: 100%;">追加</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="filteredTasks"
                :row-key="row => row.id"
                border stripe size="small">
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
            <el-table-column prop="project_id" :formatter="projectFormatter" label="プロジェクト" sortable></el-table-column>
            <el-table-column prop="created_at" :formatter="dateTimeFormatter" label="登録日" sortable></el-table-column>
            <el-table-column label="アクション" fixed="right" width="190">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="handleOpenInputModal(scope.row)" icon="el-icon-edit-outline">編集</el-button>
                    <el-button size="mini" type="danger" @click="handleOpenDeleteModal(scope.row)" icon="el-icon-delete">削除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <input-modal ref="inputModal"></input-modal>
        <delete-modal ref="deleteModal"></delete-modal>
    </div>
</template>

<script>
    import dayjs from 'dayjs';
    import InputModal from './InputModal';
    import DeleteModal from './DeleteModal';
    import SearchForm from './SearchForm';
    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                isInputModal: false,
                isDeleteModal: false,
                status: [{
                    name: '未着手',
                    color: '#999'
                },{
                    name: '進行中',
                    color: '#E6A23C'
                }, {
                    name: '完了',
                    color: '#67C23A'
                }]
            }
        },
        components: {
            InputModal, DeleteModal, SearchForm
        },
        computed: {
            ...mapGetters('user', [
                'getSingleUsers', 'getUserById'
            ]),
            ...mapGetters('project', [
                'getProjects', 'getProjectById'
            ]),
            ...mapGetters('task', [
                'getTasks', 'filteredTasks'
            ]),
        },
        mounted() {
            this.projectFetch();
            this.userFetch();
            this.fetch();
        },
        // 遷移時データ削除
        beforeDestroy() {
            this.allDelete();
        },
        methods: {
            ...mapActions('task', [
                'fetch'
            ]),
            ...mapMutations('task', [
                'allDelete'
            ]),
            ...mapActions('user', {
                userFetch: 'fetch'
            }),
            ...mapActions('project', {
                projectFetch: 'fetch'
            }),
            handleOpenInputModal(task = {}) {
                this.$refs.inputModal.setTask(task);
                this.isInputModal = true;
            },
            handleOpenDeleteModal(task) {
                this.$refs.deleteModal.setTask(task);
                this.isDeleteModal = true;
            },
            statusFormatter(row, column) {
                return this.status[row.state_id];
            },
            userFormatter (row, column) {
                if (row.user_id) {
                    return this.getUserById(row.user_id);
                } else {
                    return '未定';
                }
            },
            projectFormatter (row, column) {
                return this.getProjectById(row.project_id);
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
</style>